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

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        throw new Error(error.message);
      }
      setProducts(data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch products.';
      setErrorMsg(msg);
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
            setErrorMsg(error.message);
          } else {
            setProducts(data || []);
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          const msg = err instanceof Error ? err.message : 'Failed to fetch products.';
          setErrorMsg(msg);
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

  const handleFormSaveSuccess = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-brand-block">
            <span className="admin-brand-sub">Venkateswara Cane Work</span>
            <h1 className="admin-brand-main">Admin Dashboard</h1>
          </div>

          <div className="admin-header-actions">
            <button
              onClick={handleOpenAddForm}
              className="admin-btn admin-btn-success"
            >
              + Add Product
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
          <div className="admin-content-header">
            <div>
              <h2>Product Catalog</h2>
              <p className="admin-subtitle">
                Manage products shown in the public gallery. Toggle visibility, edit details, or add new items.
              </p>
            </div>
            <div className="admin-stats">
              <span className="stat-pill">
                Total Products: <strong>{products.length}</strong>
              </span>
              <span className="stat-pill">
                Visible: <strong>{products.filter((p) => p.is_visible).length}</strong>
              </span>
              <span className="stat-pill">
                Hidden: <strong>{products.filter((p) => !p.is_visible).length}</strong>
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="admin-alert admin-alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="admin-loading-spinner">
              <div className="spinner"></div>
              <p>Loading catalog...</p>
            </div>
          ) : (
            <ProductList
              products={products}
              onEdit={handleOpenEditForm}
              onRefresh={fetchProducts}
            />
          )}
        </div>
      </main>

      {/* Product Add / Edit Modal */}
      {isFormOpen && (
        <ProductForm
          productToEdit={editingProduct}
          onSaveSuccess={handleFormSaveSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};
