import React, { useState } from 'react';
import type { Product } from '../types/admin';
import { supabase, STORAGE_BUCKET, getPublicImageUrl, isStorageImagePath } from '../lib/supabase';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAddProduct: () => void;
  onToggleSuccess: (isNowVisible: boolean) => void;
  onDeleteSuccess: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onAddProduct,
  onToggleSuccess,
  onDeleteSuccess,
}) => {
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleToggleVisibility = async (product: Product) => {
    setActionError(null);
    try {
      setToggleLoadingId(product.id);
      const newVisibility = !product.is_visible;
      const { error } = await supabase
        .from('products')
        .update({
          is_visible: newVisibility,
          updated_at: new Date().toISOString(),
        })
        .eq('id', product.id);

      if (error) {
        console.error('Supabase toggle visibility error:', error);
        setActionError('Could not update status. Please try again.');
        return;
      }
      onToggleSuccess(newVisibility);
    } catch (err: unknown) {
      console.error(err);
      setActionError('Could not update status. Please try again.');
    } finally {
      setToggleLoadingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;
    setActionError(null);
    try {
      setDeleteLoading(true);

      // 1. Delete database record
      const { error: dbError } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingProduct.id);

      if (dbError) {
        console.error('Supabase delete db error:', dbError);
        setActionError('Could not delete product. Please try again.');
        setDeleteLoading(false);
        return;
      }

      // 2. Delete storage file if not local asset
      if (deletingProduct.image_path && isStorageImagePath(deletingProduct.image_path)) {
        const { error: storageError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .remove([deletingProduct.image_path]);

        if (storageError) {
          console.warn('Storage deletion notice:', storageError.message);
        }
      }

      setDeletingProduct(null);
      onDeleteSuccess();
    } catch (err: unknown) {
      console.error(err);
      setActionError('Could not delete product. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="admin-empty-state">
        <div className="empty-state-icon">🧺</div>
        <h3 className="empty-state-title">No products added yet</h3>
        <p className="empty-state-sub">
          Your product catalog is empty. Click below to add your first handcrafted cane item.
        </p>
        <button
          onClick={onAddProduct}
          className="admin-btn admin-btn-success admin-btn-lg"
        >
          + Add Your First Product
        </button>
      </div>
    );
  }

  return (
    <div className="admin-product-list-container">
      {actionError && (
        <div className="admin-alert admin-alert-danger" role="alert">
          {actionError}
        </div>
      )}

      <div className="admin-grid-cards">
        {products.map((product) => {
          const imageUrl = getPublicImageUrl(product.image_path);

          return (
            <div
              key={product.id}
              className={`admin-product-card ${!product.is_visible ? 'hidden-product' : ''}`}
            >
              <div className="admin-card-media">
                <img
                  src={imageUrl}
                  alt={product.name_en}
                  className="admin-card-thumb"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12">No Photo</text></svg>';
                  }}
                />
                <div className="admin-card-badges">
                  <span className={`status-badge ${product.is_visible ? 'badge-visible' : 'badge-hidden'}`}>
                    {product.is_visible ? '● Visible on Site' : '○ Hidden'}
                  </span>
                </div>
              </div>

              <div className="admin-card-body">
                <h3 className="admin-card-name-en">{product.name_en}</h3>
                {product.name_te && <p className="admin-card-name-te">{product.name_te}</p>}
                {product.description_en && (
                  <p className="admin-card-desc">{product.description_en}</p>
                )}
              </div>

              <div className="admin-card-footer">
                <button
                  onClick={() => onEdit(product)}
                  className="admin-btn-action admin-btn-edit"
                  aria-label={`Edit ${product.name_en}`}
                >
                  <span className="action-icon">✏️</span> Edit
                </button>

                <button
                  onClick={() => handleToggleVisibility(product)}
                  disabled={toggleLoadingId === product.id}
                  className={`admin-btn-action ${product.is_visible ? 'admin-btn-hide' : 'admin-btn-show'}`}
                  aria-label={product.is_visible ? `Hide ${product.name_en}` : `Show ${product.name_en}`}
                >
                  {toggleLoadingId === product.id ? (
                    '...'
                  ) : product.is_visible ? (
                    <>
                      <span className="action-icon">🙈</span> Hide
                    </>
                  ) : (
                    <>
                      <span className="action-icon">👁️</span> Show
                    </>
                  )}
                </button>

                <button
                  onClick={() => setDeletingProduct(product)}
                  className="admin-btn-action admin-btn-delete"
                  aria-label={`Delete ${product.name_en}`}
                >
                  <span className="action-icon">🗑️</span> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div
          className="admin-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleteLoading) setDeletingProduct(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
        >
          <div className="admin-modal-card admin-confirm-modal">
            <h3 id="delete-confirm-title" className="confirm-title">
              Delete &quot;{deletingProduct.name_en}&quot;?
            </h3>
            <p className="confirm-warning">
              This item will be permanently deleted and removed from your website gallery.
            </p>

            <div className="admin-modal-actions">
              <button
                onClick={() => setDeletingProduct(null)}
                disabled={deleteLoading}
                className="admin-btn admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="admin-btn admin-btn-danger"
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

