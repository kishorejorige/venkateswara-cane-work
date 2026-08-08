import React, { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CloseIcon, WhatsAppIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  dimensions?: string;
  filterKey?: string;
}

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
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
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  const whatsappText = encodeURIComponent(
    t.whatsappMessages.productQuery(item.title)
  );

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="lightbox-close-btn" onClick={onClose} aria-label={t.lightbox.close} title={t.lightbox.close}>
          <CloseIcon />
        </button>

        {/* Prev Button */}
        {hasPrev && (
          <button className="lightbox-nav-btn prev-btn" onClick={onPrev} aria-label={t.lightbox.prev} title={t.lightbox.prev}>
            <ChevronLeftIcon />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button className="lightbox-nav-btn next-btn" onClick={onNext} aria-label={t.lightbox.next} title={t.lightbox.next}>
            <ChevronRightIcon />
          </button>
        )}

        <div className="lightbox-grid">
          <div className="lightbox-image-container">
            <img src={item.image} alt={item.title} className="lightbox-img" />
          </div>

          <div className="lightbox-details">
            <span className="lightbox-category">{item.category}</span>
            <h3 className="lightbox-title">{item.title}</h3>
            <p className="lightbox-description">{item.description}</p>

            <div className="lightbox-meta">
              <div className="meta-badge">{t.lightbox.handcrafted}</div>
              <div className="meta-badge">{t.lightbox.customSizes}</div>
            </div>

            <div className="lightbox-actions">
              <a
                href={`https://wa.me/919966232996?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn full-width"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{t.lightbox.askWhatsapp}</span>
              </a>

              <a href="tel:+919966232996" className="btn primary-btn full-width">
                <PhoneIcon className="btn-icon" />
                <span>{t.lightbox.call}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
