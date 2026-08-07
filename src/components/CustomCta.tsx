import React from 'react';
import { WhatsAppIcon, PhoneIcon } from './Icons';

export const CustomCta: React.FC = () => {
  return (
    <section className="custom-cta-section">
      <div className="section-container">
        <div className="custom-cta-card">
          <div className="custom-cta-content">
            <span className="custom-cta-eyebrow">CUSTOM ORDERS & RESTORATION</span>
            <h2 className="custom-cta-title">Have a Design in Mind?</h2>
            <p className="custom-cta-text">
              We create custom cane furniture designed specifically for your space, balcony, or veranda—and expertly restore your old cane pieces.
            </p>
            <div className="custom-cta-buttons">
              <a
                href="https://wa.me/919966232996?text=Hi%20Konda%20Pavan%20Kumar,%20I%20have%20a%20custom%20cane%20furniture%20design%20in%20mind."
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
              >
                <WhatsAppIcon className="btn-icon" />
                <span>Discuss Your Design on WhatsApp</span>
              </a>

              <a href="tel:+919966232996" className="btn secondary-light-btn">
                <PhoneIcon className="btn-icon" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
