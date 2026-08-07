import React, { useEffect } from 'react';
import { CloseIcon, WhatsAppIcon, PhoneIcon } from './Icons';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  dimensions?: string;
}

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const whatsappText = encodeURIComponent(
    `Hi Konda Pavan Kumar, I am interested in your ${item.title} (${item.category}) shown on your website.`
  );

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Close modal">
          <CloseIcon />
        </button>

        <div className="lightbox-grid">
          <div className="lightbox-image-container">
            <img src={item.image} alt={item.title} className="lightbox-img" />
          </div>

          <div className="lightbox-details">
            <span className="lightbox-category">{item.category}</span>
            <h3 className="lightbox-title">{item.title}</h3>
            <p className="lightbox-description">{item.description}</p>

            <div className="lightbox-meta">
              <div className="meta-badge">Handcrafted in Nellore</div>
              <div className="meta-badge">Custom Sizes Available</div>
            </div>

            <div className="lightbox-actions">
              <a
                href={`https://wa.me/919966232996?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn full-width"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a href="tel:+919966232996" className="btn primary-btn full-width">
                <PhoneIcon className="btn-icon" />
                <span>Call 9966232996</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
