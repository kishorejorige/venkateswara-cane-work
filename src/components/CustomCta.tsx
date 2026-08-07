import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WhatsAppIcon, PhoneIcon } from './Icons';

export const CustomCta: React.FC = () => {
  const { t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.customCta);

  return (
    <section className="custom-cta-section">
      <div className="section-container">
        <div className="custom-cta-card">
          <div className="custom-cta-content">
            <span className="custom-cta-eyebrow">{t.customCta.eyebrow}</span>
            <h2 className="custom-cta-title">{t.customCta.title}</h2>
            <p className="custom-cta-text">{t.customCta.text}</p>
            <div className="custom-cta-buttons">
              <a
                href={`https://wa.me/919966232996?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>{t.customCta.whatsappBtn}</span>
              </a>

              <a href="tel:+919966232996" className="btn secondary-light-btn">
                <PhoneIcon className="btn-icon" />
                <span>{t.customCta.callBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
