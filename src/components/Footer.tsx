import React from 'react';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <span className="footer-brand-telugu">వెంకటేశ్వర కేన్ వర్క్</span>
            <strong className="footer-brand-title">Venkateswara Cane Work</strong>
            <p className="footer-tagline">
              Handcrafted Cane Furniture & Expert Restoration • Nellore, Andhra Pradesh
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Our Craft</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Our Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-col-heading">Direct Contact</h4>
            <p className="footer-owner">Konda Pavan Kumar</p>
            <p className="footer-phone">
              <PhoneIcon className="icon-xs inline-icon" /> Phone: <a href="tel:+919966232996">9966232996</a>
            </p>
            <p className="footer-wa">
              <WhatsAppIcon className="icon-xs inline-icon" /> WhatsApp: <a href="https://wa.me/919966232996" target="_blank" rel="noopener noreferrer">+91 9966232996</a>
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Venkateswara Cane Work, Nellore. All rights reserved.
          </p>

          <p className="footer-birthday-note">
            Website launched with love on Konda Pavan Kumar&apos;s Birthday — 7 August 2026 🎂
          </p>
        </div>
      </div>
    </footer>
  );
};
