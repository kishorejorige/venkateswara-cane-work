import React, { useState, useEffect, useCallback } from 'react';
import type { Product, ProductFormData } from '../types/admin';
import { supabase, STORAGE_BUCKET, isStorageImagePath } from '../lib/supabase';

interface ProductFormProps {
  productToEdit?: Product | null;
  defaultSortOrder?: number;
  onSaveSuccess: (message: string) => void;
  onCancel: () => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
  defaultSortOrder = 0,
  onSaveSuccess,
  onCancel,
}) => {
  const isEditing = Boolean(productToEdit);

  const [formData, setFormData] = useState<ProductFormData>({
    name_en: productToEdit?.name_en || '',
    name_te: productToEdit?.name_te || '',
    description_en: productToEdit?.description_en || '',
    description_te: productToEdit?.description_te || '',
    is_visible: productToEdit?.is_visible ?? true,
    sort_order: productToEdit?.sort_order ?? defaultSortOrder,
    image_file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleCancelWithCheck = useCallback(() => {
    if (loading) return;
    if (isDirty) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    onCancel();
  }, [loading, isDirty, onCancel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancelWithCheck();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancelWithCheck]);

  const handleInputChange = (field: keyof ProductFormData, value: unknown) => {
    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, image_file: null }));
      setPreviewUrl(null);
      setSelectedFileName(null);
      setSelectedFileSize(null);
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    const isValidType = ALLOWED_TYPES.includes(file.type) || ['jpg', 'jpeg', 'png', 'webp'].includes(fileExt);

    if (!isValidType || file.size > MAX_FILE_SIZE) {
      setErrorMsg('Please choose a JPG, PNG or WebP image under 5 MB.');
      e.target.value = '';
      setFormData((prev) => ({ ...prev, image_file: null }));
      setPreviewUrl(null);
      setSelectedFileName(null);
      setSelectedFileSize(null);
      return;
    }

    setIsDirty(true);
    setFormData((prev) => ({ ...prev, image_file: file }));
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFileName(file.name);
    setSelectedFileSize(formatFileSize(file.size));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name_en.trim()) {
      setErrorMsg('Please enter a product name.');
      return;
    }

    if (!isEditing && !formData.image_file) {
      setErrorMsg('Please select a photo for the product.');
      return;
    }

    try {
      setLoading(true);
      let newImagePath = productToEdit?.image_path || '';

      // Upload new image if provided
      if (formData.image_file) {
        const fileExt = formData.image_file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(uniqueFileName, formData.image_file, {
            contentType: formData.image_file.type,
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          setErrorMsg('Could not upload photo. Please try again.');
          setLoading(false);
          return;
        }

        newImagePath = uniqueFileName;
      }

      if (isEditing && productToEdit) {
        // Update database record
        const { error: updateError } = await supabase
          .from('products')
          .update({
            name_en: formData.name_en.trim(),
            name_te: formData.name_te.trim() || null,
            description_en: formData.description_en.trim() || null,
            description_te: formData.description_te.trim() || null,
            image_path: newImagePath,
            is_visible: formData.is_visible,
            sort_order: productToEdit.sort_order, // Automatically preserve existing sort order
            updated_at: new Date().toISOString(),
          })
          .eq('id', productToEdit.id);

        if (updateError) {
          console.error('Supabase update error:', updateError);
          setErrorMsg('Could not save product. Please try again.');
          setLoading(false);
          return;
        }

        // Clean up old image if replaced
        if (
          formData.image_file &&
          productToEdit.image_path &&
          isStorageImagePath(productToEdit.image_path)
        ) {
          await supabase.storage.from(STORAGE_BUCKET).remove([productToEdit.image_path]);
        }

        onSaveSuccess('Changes saved.');
      } else {
        // Create database record with automatically calculated sort_order
        const { error: insertError } = await supabase.from('products').insert([
          {
            name_en: formData.name_en.trim(),
            name_te: formData.name_te.trim() || null,
            description_en: formData.description_en.trim() || null,
            description_te: formData.description_te.trim() || null,
            image_path: newImagePath,
            is_visible: formData.is_visible,
            sort_order: defaultSortOrder, // Automatically set
          },
        ]);

        if (insertError) {
          console.error('Supabase insert error:', insertError);
          setErrorMsg('Could not save product. Please try again.');
          setLoading(false);
          return;
        }

        onSaveSuccess('Product added successfully.');
      }
    } catch (err: unknown) {
      console.error('Unexpected form submit error:', err);
      setErrorMsg('Could not save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancelWithCheck();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <h2 id="form-modal-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button
            type="button"
            className="admin-close-btn"
            onClick={handleCancelWithCheck}
            aria-label="Close form modal"
          >
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="admin-alert admin-alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-product-form" noValidate>
          <div className="admin-form-stack">
            {/* Product Name (English) */}
            <div className="admin-form-group">
              <label htmlFor="name_en">
                Product Name <span className="req">*</span>
              </label>
              <input
                id="name_en"
                type="text"
                required
                autoFocus
                placeholder="e.g. Handcrafted Cane Chair"
                value={formData.name_en}
                onChange={(e) => handleInputChange('name_en', e.target.value)}
                className="admin-input"
              />
            </div>

            {/* Telugu Name */}
            <div className="admin-form-group">
              <label htmlFor="name_te">Telugu Name (Optional)</label>
              <input
                id="name_te"
                type="text"
                placeholder="e.g. చేతిపని కేన్ కుర్చీ"
                value={formData.name_te}
                onChange={(e) => handleInputChange('name_te', e.target.value)}
                className="admin-input"
              />
            </div>

            {/* Description (English) */}
            <div className="admin-form-group">
              <label htmlFor="description_en">Description (Optional)</label>
              <textarea
                id="description_en"
                rows={3}
                placeholder="Add details like dimensions, color, or cane material..."
                value={formData.description_en}
                onChange={(e) => handleInputChange('description_en', e.target.value)}
                className="admin-textarea"
              />
              <span className="admin-help-text">Visible on item details in gallery</span>
            </div>

            {/* Telugu Description */}
            <div className="admin-form-group">
              <label htmlFor="description_te">Telugu Description (Optional)</label>
              <textarea
                id="description_te"
                rows={3}
                placeholder="తెలుగులో వివరణ అందించండి..."
                value={formData.description_te}
                onChange={(e) => handleInputChange('description_te', e.target.value)}
                className="admin-textarea"
              />
            </div>

            {/* Product Photo */}
            <div className="admin-form-group">
              <label htmlFor="image_file">
                Product Photo {!isEditing && <span className="req">*</span>}
              </label>
              
              <div className="admin-file-picker-wrapper">
                <input
                  id="image_file"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="admin-file-input"
                />
              </div>
              <span className="admin-help-text">
                Accepted: JPG, PNG or WebP (Max size: 5 MB)
              </span>

              {/* Image Preview Box */}
              {previewUrl && (
                <div className="admin-image-preview-box">
                  <div className="preview-header">
                    <span className="preview-badge-valid">✓ Photo selected</span>
                    {selectedFileSize && <span className="preview-size">{selectedFileSize}</span>}
                  </div>
                  <img src={previewUrl} alt="Selected photo preview" className="admin-img-preview" />
                  {selectedFileName && <p className="preview-filename">{selectedFileName}</p>}
                </div>
              )}
            </div>

            {/* Show on Website Toggle */}
            <div className="admin-form-group admin-toggle-group">
              <label className="admin-toggle-label" htmlFor="is_visible">
                <input
                  id="is_visible"
                  type="checkbox"
                  checked={formData.is_visible}
                  onChange={(e) => handleInputChange('is_visible', e.target.checked)}
                  className="admin-toggle-checkbox"
                />
                <span className="admin-toggle-switch"></span>
                <div className="admin-toggle-text">
                  <span className="toggle-title">Show on Website</span>
                  <span className="toggle-sub">
                    {formData.is_visible
                      ? 'Item will be visible to public gallery visitors'
                      : 'Item will be hidden from public gallery'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="admin-modal-actions">
            <button
              type="button"
              onClick={handleCancelWithCheck}
              disabled={loading}
              className="admin-btn admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="admin-btn admin-btn-success"
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

