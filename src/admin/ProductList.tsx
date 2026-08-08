import React, { useState } from 'react';
import type { Product } from '../types/admin';
import { supabase, STORAGE_BUCKET, getPublicImageUrl, isStorageImagePath } from '../lib/supabase';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onRefresh }) => {
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleToggleVisibility = async (product: Product) => {
    setActionError(null);
    try {
      setToggleLoadingId(product.id);
      const { error } = await supabase
        .from('products')
        .update({
          is_visible: !product.is_visible,
          updated_at: new Date().toISOString(),
        })
        .eq('id', product.id);

      if (error) {
        throw new Error(error.message);
      }
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update visibility.';
      setActionError(msg);
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
        throw new Error(`Database deletion failed: ${dbError.message}`);
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
      onRefresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete product.';
      setActionError(msg);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="admin-empty-state">
        <p>No products found in database.</p>
        <p className="admin-empty-sub">Click &quot;Add Product&quot; above to create your first product listing.</p>
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
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12">No Image</text></svg>';
                  }}
                />
                <div className="admin-card-badges">
                  <span className={`status-badge ${product.is_visible ? 'badge-visible' : 'badge-hidden'}`}>
                    {product.is_visible ? '● Visible' : '○ Hidden'}
                  </span>
                  <span className="sort-badge">Order: {product.sort_order}</span>
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
                  onClick={() => handleToggleVisibility(product)}
                  disabled={toggleLoadingId === product.id}
                  className="admin-btn-sm admin-btn-toggle"
                  title={product.is_visible ? 'Hide from public gallery' : 'Show in public gallery'}
                >
                  {toggleLoadingId === product.id
                    ? '...'
                    : product.is_visible
                    ? 'Hide'
                    : 'Show'}
                </button>

                <button
                  onClick={() => onEdit(product)}
                  className="admin-btn-sm admin-btn-edit"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeletingProduct(product)}
                  className="admin-btn-sm admin-btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card admin-confirm-modal">
            <h3 className="confirm-title">Delete &quot;{deletingProduct.name_en}&quot;?</h3>
            <p className="confirm-warning">
              This action cannot be undone. This product record and its stored image will be permanently deleted.
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
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
