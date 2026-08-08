import React, { useState } from 'react';
import type { Product, ProductFormData } from '../types/admin';
import { supabase, STORAGE_BUCKET, isStorageImagePath } from '../lib/supabase';

interface ProductFormProps {
  productToEdit?: Product | null;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
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
    sort_order: productToEdit?.sort_order ?? 0,
    image_file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, image_file: null }));
      setPreviewUrl(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg('Unsupported file format. Please upload JPEG, PNG, or WebP images only.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg('File size exceeds 5 MB. Please select a smaller image.');
      return;
    }

    setFormData((prev) => ({ ...prev, image_file: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name_en.trim()) {
      setErrorMsg('English Product Name is required.');
      return;
    }

    if (!isEditing && !formData.image_file) {
      setErrorMsg('Product image is required for new products.');
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
          throw new Error(`Image upload failed: ${uploadError.message}`);
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
            sort_order: Number(formData.sort_order) || 0,
            updated_at: new Date().toISOString(),
          })
          .eq('id', productToEdit.id);

        if (updateError) {
          throw new Error(`Database update failed: ${updateError.message}`);
        }

        // If replaced image and old image was a storage file (not a static fallback), delete old storage file
        if (
          formData.image_file &&
          productToEdit.image_path &&
          isStorageImagePath(productToEdit.image_path)
        ) {
          await supabase.storage.from(STORAGE_BUCKET).remove([productToEdit.image_path]);
        }
      } else {
        // Create database record
        const { error: insertError } = await supabase.from('products').insert([
          {
            name_en: formData.name_en.trim(),
            name_te: formData.name_te.trim() || null,
            description_en: formData.description_en.trim() || null,
            description_te: formData.description_te.trim() || null,
            image_path: newImagePath,
            is_visible: formData.is_visible,
            sort_order: Number(formData.sort_order) || 0,
          },
        ]);

        if (insertError) {
          throw new Error(`Failed to save product: ${insertError.message}`);
        }
      }

      onSaveSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while saving.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-card">
        <div className="admin-modal-header">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="admin-close-btn" onClick={onCancel} aria-label="Close modal">
            &times;
          </button>
        </div>

        {errorMsg && (
          <div className="admin-alert admin-alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-product-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="name_en">
                English Name <span className="req">*</span>
              </label>
              <input
                id="name_en"
                type="text"
                required
                placeholder="e.g. Classic Handcrafted Cane Chair"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="name_te">Telugu Name</label>
              <input
                id="name_te"
                type="text"
                placeholder="e.g. క్లాసిక్ చేతిపని కేన్ కుర్చీ"
                value={formData.name_te}
                onChange={(e) => setFormData({ ...formData, name_te: e.target.value })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group full-width">
              <label htmlFor="description_en">English Description</label>
              <textarea
                id="description_en"
                rows={3}
                placeholder="Describe materials, features, dimensions, etc."
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-group full-width">
              <label htmlFor="description_te">Telugu Description</label>
              <textarea
                id="description_te"
                rows={3}
                placeholder="తెలుగు వివరణ వివరించండి"
                value={formData.description_te}
                onChange={(e) => setFormData({ ...formData, description_te: e.target.value })}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="sort_order">Sort Order</label>
              <input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group flex-align">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.is_visible}
                  onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                  className="admin-checkbox"
                />
                <span>Visible in Public Gallery</span>
              </label>
            </div>

            <div className="admin-form-group full-width">
              <label htmlFor="image_file">
                Product Image {!isEditing && <span className="req">*</span>}
              </label>
              <input
                id="image_file"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="admin-file-input"
              />
              <span className="admin-help-text">
                Allowed formats: JPEG, PNG, WebP (Max 5 MB)
              </span>

              {previewUrl && (
                <div className="admin-image-preview-box">
                  <p className="preview-label">Image Preview:</p>
                  <img src={previewUrl} alt="Selected preview" className="admin-img-preview" />
                </div>
              )}
            </div>
          </div>

          <div className="admin-modal-actions">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="admin-btn admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="admin-btn admin-btn-primary"
            >
              {loading ? 'Saving Product...' : isEditing ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
