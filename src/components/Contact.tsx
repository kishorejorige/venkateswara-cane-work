import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, WhatsAppIcon, LocationIcon, NavigationIcon } from './Icons';

// Centralized Config for Google Maps URL. Update when verified shop URL is available.
const GOOGLE_MAPS_URL: string | null = null;

export const Contact: React.FC = () => {
  const { lang, t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);
  const waLocationText = encodeURIComponent(
    lang === 'te'
      ? "నమస్కారం కొండ పవన్ కుమార్ గారు, దయచేసి మీ వర్క్‌షాప్ లొకేషన్ పంపండి."
      : "Hi Konda Pavan Kumar, please share your shop/workshop location in Nellore."
  );

  const handleDirectionsClick = (e: React.MouseEvent) => {
    if (!GOOGLE_MAPS_URL) {
      e.preventDefault();
      window.open(`https://wa.me/919966232996?text=${waLocationText}`, '_blank');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card">
            <span className="section-eyebrow">{t.contact.eyebrow}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="contact-intro">{t.contact.intro}</p>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <LocationIcon className="info-icon" />
                </div>
                <div>
                  <strong>{t.contact.addressTitle}</strong>
                  <p>{t.brandName}</p>
                  <p className="sub-text">{t.contact.proprietorLabel} {t.ownerName}</p>
                  <p className="sub-text">{t.locationName}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <PhoneIcon className="info-icon" />
                </div>
                <div>
                  <strong>{t.contact.phoneTitle}</strong>
                  <p>
                    <a href="tel:+919966232996" className="phone-link">+91 9966232996</a>
                  </p>
                  <p className="sub-text">{t.contact.phoneHours}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <WhatsAppIcon className="info-icon" />
                </div>
                <div>
                  <strong>{t.contact.waTitle}</strong>
                  <p>
                    <a 
                      href={`https://wa.me/919966232996?text=${waText}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      +91 9966232996
                    </a>
                  </p>
                  <p className="sub-text">{t.contact.waSubtext}</p>
                </div>
              </div>
            </div>

            <div className="contact-actions-row">
              <a href="tel:+919966232996" className="btn primary-btn">
                <PhoneIcon className="btn-icon" />
                <span>{t.contact.callBtn}</span>
              </a>

              <a
                href={`https://wa.me/919966232996?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{t.contact.waBtn}</span>
              </a>

              <a
                href={GOOGLE_MAPS_URL || '#'}
                onClick={handleDirectionsClick}
                target={GOOGLE_MAPS_URL ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="btn secondary-light-btn"
              >
                <NavigationIcon className="btn-icon" />
                <span>{t.contact.getDirectionsBtn}</span>
              </a>
            </div>
          </div>

          {/* Clean Map Placeholder Frame */}
          <div className="contact-map-wrapper">
            <div className="map-placeholder-card">
              <div className="map-badge">
                <LocationIcon className="icon-sm" />
                <span>{t.contact.workshopTitle}</span>
              </div>
              
              <div className="map-visual">
                <div className="map-pin">📍</div>
                <h3>{t.brandName}</h3>
                <p>{t.locationName}</p>
                <span className="map-sub">{t.ownerName}</span>
              </div>

              <div className="map-footer-note">
                <p>📍 {t.contact.locationNote}</p>
                <a
                  href={`https://wa.me/919966232996?text=${waLocationText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-location"
                >
                  {t.contact.locationReqBtn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
