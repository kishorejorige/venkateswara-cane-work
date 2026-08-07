import React, { useState } from 'react';
import type { GalleryItem } from './LightboxModal';
import { LightboxModal } from './LightboxModal';
import { ZoomIcon, SparkleIcon } from './Icons';

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: 'Classic Handcrafted Cane Chair',
      category: 'Cane Chair',
      image: '/images/chair.png',
      description: 'Ergonomically designed traditional cane arm chair with intricate hand-woven rattan backing and sturdy structure.',
      dimensions: 'Standard Home & Veranda Size'
    },
    {
      id: 'item-2',
      title: 'Handmade Cane Swing (Jhula)',
      category: 'Cane Swing',
      image: '/images/hanging-chair.png',
      description: 'Luxurious drop-shaped hanging cane swing designed for balcony, patio, or living room relaxation.',
      dimensions: 'Single/Double Seater Options'
    },
    {
      id: 'item-3',
      title: 'Masterpiece Workshop Showcase',
      category: 'Cane Sofa Set',
      image: '/images/shop-banner.jpg',
      description: 'A glimpse of custom cane sofa sets, center tables, and handcrafted chairs made in our Nellore workshop.',
      dimensions: 'Customized to Order'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-container">
        <div className="gallery-header-row">
          <div>
            <div className="eyebrow-badge green">
              <SparkleIcon className="icon-badge" />
              <span>OUR WORK GALLERY</span>
            </div>
            <h2 className="section-title">Furniture Made By Hand in Nellore</h2>
          </div>

          <p className="gallery-header-desc">
            Explore authentic photographs of cane furniture handcrafted by Konda Pavan Kumar. Click any item to enlarge and inquire.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="gallery-filter-tabs">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Work
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'chair' ? 'active' : ''}`}
            onClick={() => setActiveFilter('chair')}
          >
            Cane Chairs
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'swing' ? 'active' : ''}`}
            onClick={() => setActiveFilter('swing')}
          >
            Cane Swings
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'sofa' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sofa')}
          >
            Sofa Sets
          </button>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="gallery-grid-cards">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => setSelectedItem(item)}
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
                    <span>View Details</span>
                  </div>
                </div>
                <span className="gallery-card-category-badge">{item.category}</span>
              </div>

              <div className="gallery-card-content">
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-sub">{item.description}</p>
                <div className="gallery-card-footer">
                  <span className="craft-tag">Handcrafted Rattan</span>
                  <span className="inquire-arrow">View & Inquire →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  );
};
