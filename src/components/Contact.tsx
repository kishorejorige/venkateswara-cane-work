import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, WhatsAppIcon, LocationIcon, NavigationIcon } from './Icons';

// Centralized Config for Verified Google Maps Location URL
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/14%C2%B027'21.6%22N+79%C2%B059'14.0%22E/@14.456006,79.9846477,17z/data=!3m1!4b1!4m4!3m3!8m2!3d14.456006!4d79.9872226?hl=en&entry=ttu";

export const Contact: React.FC = () => {
  const { lang, t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);

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
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn secondary-light-btn"
              >
                <NavigationIcon className="btn-icon" />
                <span>{t.contact.getDirectionsBtn}</span>
              </a>
            </div>
          </div>

          {/* Interactive Verified Map Card */}
          <div className="contact-map-wrapper">
            <div className="map-placeholder-card">
              <div className="map-badge">
                <LocationIcon className="icon-sm" />
                <span>{t.contact.workshopTitle}</span>
              </div>
              
              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-visual"
                title="Open Google Maps Location"
              >
                <div className="map-pin">📍</div>
                <h3>{t.brandName}</h3>
                <p>{t.locationName}</p>
                <span className="map-sub">14°27'21.6"N 79°59'14.0"E • {t.ownerName}</span>
              </a>

              <div className="map-footer-note">
                <p>📍 {t.contact.locationNote}</p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-location"
                >
                  {lang === 'te' ? "గూగుల్ మ్యాప్స్‌లో షాప్ లొకేషన్ చూడండి →" : "View Shop Location on Google Maps →"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
