import React, { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/admin';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateHome }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(() => isSupabaseConfigured());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Toast banner state
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'danger' } | null>(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const showToast = useCallback((text: string, type: 'success' | 'danger' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    try {
      setErrorMsg(null);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        throw new Error('Could not load product catalog. Please refresh the page.');
      }
      setProducts(data || []);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Could not load product catalog. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!isSupabaseConfigured()) {
        if (!ignore) setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!ignore) {
          if (error) {
            console.error('Supabase initial fetch error:', error);
            setErrorMsg('Could not load product catalog. Please refresh the page.');
          } else {
            setProducts(data || []);
          }
        }
      } catch (err: unknown) {
        console.error(err);
        if (!ignore) {
          setErrorMsg('Could not load product catalog. Please refresh the page.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSaveSuccess = (message: string) => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
    showToast(message, 'success');
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleToggleSuccess = (isNowVisible: boolean) => {
    fetchProducts();
    showToast(
      isNowVisible ? 'Product is now visible.' : 'Product hidden from website.',
      'success'
    );
  };

  const handleDeleteSuccess = () => {
    fetchProducts();
    showToast('Product deleted.', 'success');
  };

  const totalCount = products.length;
  const visibleCount = products.filter((p) => p.is_visible).length;
  const hiddenCount = products.filter((p) => !p.is_visible).length;
  const nextSortOrder = totalCount > 0 ? Math.max(...products.map((p) => p.sort_order || 0)) + 1 : 0;

  return (
    <div className="admin-dashboard-wrapper">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-brand-block">
            <span className="admin-brand-sub">Venkateswara Cane Work</span>
            <h1 className="admin-brand-main">Shop Owner Admin</h1>
          </div>

          <div className="admin-header-actions">
            <button
              onClick={handleOpenAddForm}
              className="admin-btn admin-btn-success"
              aria-label="Add a new product"
            >
              <span className="btn-icon">+</span> Add Product
            </button>
            <button
              onClick={onNavigateHome}
              className="admin-btn admin-btn-secondary"
            >
              View Website
            </button>
            <button
              onClick={onLogout}
              className="admin-btn admin-btn-outline-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main-content">
        <div className="admin-container">
          {/* Summary Cards */}
          <div className="admin-summary-cards" role="region" aria-label="Catalog Summary">
            <div className="summary-card">
              <span className="summary-card-icon">📦</span>
              <div className="summary-card-info">
                <span className="summary-card-value">{totalCount}</span>
                <span className="summary-card-label">Total Products</span>
              </div>
            </div>

            <div className="summary-card summary-card-visible">
              <span className="summary-card-icon">👁️</span>
              <div className="summary-card-info">
                <span className="summary-card-value">{visibleCount}</span>
                <span className="summary-card-label">Visible on Site</span>
              </div>
            </div>

            <div className="summary-card summary-card-hidden">
              <span className="summary-card-icon">🙈</span>
              <div className="summary-card-info">
                <span className="summary-card-value">{hiddenCount}</span>
                <span className="summary-card-label">Hidden Products</span>
              </div>
            </div>
          </div>

          {/* Toast / Alert Message */}
          {toast && (
            <div
              className={`admin-alert admin-alert-${toast.type} admin-toast-banner`}
              role="alert"
            >
              <span>{toast.text}</span>
              <button
                className="toast-close-btn"
                onClick={() => setToast(null)}
                aria-label="Dismiss notification"
              >
                &times;
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="admin-alert admin-alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <ProductList
              products={products}
              onEdit={handleOpenEditForm}
              onAddProduct={handleOpenAddForm}
              onToggleSuccess={handleToggleSuccess}
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
        </div>
      </main>

      {/* Product Add / Edit Modal */}
      {isFormOpen && (
        <ProductForm
          productToEdit={editingProduct}
          defaultSortOrder={nextSortOrder}
          onSaveSuccess={handleFormSaveSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

