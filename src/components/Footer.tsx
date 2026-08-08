import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <strong className="footer-brand-title">{t.brandName}</strong>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-heading">{t.footer.quickLinks}</h4>
            <ul className="footer-links-list">
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#services">{t.nav.services}</a></li>
              <li><a href="#gallery">{t.nav.gallery}</a></li>
              <li><a href="#how-to-order">{t.nav.howToOrder}</a></li>
              <li><a href="#why-us">{t.nav.whyUs}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-heading">{t.footer.directContact}</h4>
            <p className="footer-owner">{t.ownerName}</p>
            <p className="footer-phone">
              <PhoneIcon className="icon-xs inline-icon" /> Phone: <a href="tel:+919966232996">9966232996</a>
            </p>
            <p className="footer-wa">
              <WhatsAppIcon className="icon-xs inline-icon" /> WhatsApp:{" "}
              <a 
                href={`https://wa.me/919966232996?text=${waText}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                +91 9966232996
              </a>
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {t.brandName}, {t.locationName}. {t.footer.rights}
          </p>

          <p className="footer-birthday-note">
            {t.footer.birthdayNote}
          </p>
        </div>
      </div>
    </footer>
  );
};
