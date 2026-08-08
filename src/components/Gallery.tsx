import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import type { GalleryItem } from './LightboxModal';
import { LightboxModal } from './LightboxModal';
import { ZoomIcon, SparkleIcon } from './Icons';
import { supabase, isSupabaseConfigured, getPublicImageUrl } from '../lib/supabase';
import type { Product } from '../types/admin';

export const Gallery: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadPublicProducts() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_visible', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true });

        if (!error && data && isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Notice: Unable to fetch products from Supabase, using standard gallery items.', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPublicProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fallback static items if Supabase is not configured or returns no items yet
  const staticItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: t.gallery.items.item1Title,
      category: t.gallery.items.item1Cat,
      image: `${import.meta.env.BASE_URL}images/chair.png`,
      description: t.gallery.items.item1Desc,
      filterKey: 'chair',
    },
    {
      id: 'item-2',
      title: t.gallery.items.item2Title,
      category: t.gallery.items.item2Cat,
      image: `${import.meta.env.BASE_URL}images/hanging-chair.png`,
      description: t.gallery.items.item2Desc,
      filterKey: 'swing',
    },
  ];

  // Map database products to GalleryItem format
  const dynamicItems: GalleryItem[] = products.map((prod) => {
    const isTe = lang === 'te';
    const title = isTe && prod.name_te ? prod.name_te : prod.name_en;
    const description =
      isTe && prod.description_te ? prod.description_te : prod.description_en || '';

    // Infer category for filter buttons based on product title
    let category = t.gallery.items.item1Cat;
    let filterKey = 'chair';
    const lowerEn = prod.name_en.toLowerCase();
    if (lowerEn.includes('swing') || lowerEn.includes('jhula')) {
      category = t.gallery.items.item2Cat;
      filterKey = 'swing';
    } else if (lowerEn.includes('sofa')) {
      category = t.gallery.items.item3Cat || 'Cane Sofa Set';
      filterKey = 'sofa';
    }

    return {
      id: prod.id,
      title,
      category,
      image: getPublicImageUrl(prod.image_path),
      description,
      filterKey,
    };
  });

  const galleryItems = dynamicItems.length > 0 ? dynamicItems : staticItems;

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.filterKey === activeFilter);

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] ?? null : null;

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < filteredItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-container">
        <div className="gallery-header-row">
          <div>
            <div className="eyebrow-badge green">
              <SparkleIcon className="icon-badge" />
              <span>{t.gallery.eyebrow}</span>
            </div>
            <h2 className="section-title">{t.gallery.title}</h2>
          </div>

          <p className="gallery-header-desc">{t.gallery.desc}</p>
        </div>

        {/* Filter Badges */}
        <div className="gallery-filter-tabs">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter('all');
              setSelectedIndex(null);
            }}
          >
            {t.gallery.filterAll}
          </button>
          <button
            className={`filter-btn ${activeFilter === 'chair' ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter('chair');
              setSelectedIndex(null);
            }}
          >
            {t.gallery.filterChairs}
          </button>
          <button
            className={`filter-btn ${activeFilter === 'swing' ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter('swing');
              setSelectedIndex(null);
            }}
          >
            {t.gallery.filterSwings}
          </button>
        </div>

        {loading ? (
          <div className="admin-loading-spinner" style={{ padding: '3rem 0' }}>
            <div className="spinner"></div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Loading products...</p>
          </div>
        ) : (
          /* Responsive Gallery Grid */
          <div
            className={`gallery-grid-cards ${
              filteredItems.length === 2 ? 'two-column' : ''
            }`}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedIndex(index);
                  }
                }}
                aria-label={`${item.title} - ${t.gallery.viewDetails}`}
              >
                <div className="gallery-card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-card-img"
                  />
                  <div className="gallery-card-overlay">
                    <div className="zoom-badge">
                      <ZoomIcon className="icon-sm" />
                      <span>{t.gallery.viewDetails}</span>
                    </div>
                  </div>
                  <span className="gallery-card-category-badge">{item.category}</span>
                </div>

                <div className="gallery-card-content">
                  <h3 className="gallery-card-title">{item.title}</h3>
                  <p className="gallery-card-sub">{item.description}</p>
                  <div className="gallery-card-footer">
                    <span className="craft-tag">{t.gallery.handcraftedTag}</span>
                    <span className="inquire-arrow">{t.gallery.inquireArrow}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
        hasNext={selectedIndex !== null && selectedIndex < filteredItems.length - 1}
      />
    </section>
  );
};
