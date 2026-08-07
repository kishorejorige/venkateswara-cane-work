import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import type { GalleryItem } from './LightboxModal';
import { LightboxModal } from './LightboxModal';
import { ZoomIcon, SparkleIcon } from './Icons';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: t.gallery.items.item1Title,
      category: t.gallery.items.item1Cat,
      image: `${import.meta.env.BASE_URL}images/chair.png`,
      description: t.gallery.items.item1Desc,
    },
    {
      id: 'item-2',
      title: t.gallery.items.item2Title,
      category: t.gallery.items.item2Cat,
      image: `${import.meta.env.BASE_URL}images/hanging-chair.png`,
      description: t.gallery.items.item2Desc,
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => {
        if (activeFilter === 'chair') return item.id === 'item-1';
        if (activeFilter === 'swing') return item.id === 'item-2';
        return true;
      });

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

          <p className="gallery-header-desc">
            {t.gallery.desc}
          </p>
        </div>

        {/* Filter Badges */}
        <div className="gallery-filter-tabs">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => { setActiveFilter('all'); setSelectedIndex(null); }}
          >
            {t.gallery.filterAll}
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'chair' ? 'active' : ''}`}
            onClick={() => { setActiveFilter('chair'); setSelectedIndex(null); }}
          >
            {t.gallery.filterChairs}
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'swing' ? 'active' : ''}`}
            onClick={() => { setActiveFilter('swing'); setSelectedIndex(null); }}
          >
            {t.gallery.filterSwings}
          </button>
        </div>

        {/* Responsive Gallery Grid (2-column layout for 2 products) */}
        <div className="gallery-grid-cards two-column">
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
