import React from 'react';
import { PhoneIcon, WhatsAppIcon, SparkleIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Hero Content */}
        <div className="hero-left">
          <div className="eyebrow-badge">
            <SparkleIcon className="icon-badge" />
            <span>HANDCRAFTED IN NELLORE</span>
          </div>

          <h1 className="hero-headline">
            Beautiful Cane Furniture,
            <span className="headline-accent"> Made With Care.</span>
          </h1>

          <p className="hero-description">
            Traditional handcrafted cane furniture, custom designs, repairs and restoration in Nellore.
          </p>

          <div className="hero-cta-group">
            <a href="tel:+919966232996" className="btn primary-btn">
              <PhoneIcon className="btn-icon" />
              <span>Call 9966232996</span>
            </a>

            <a
              href="https://wa.me/919966232996"
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp-btn"
            >
              <WhatsAppIcon className="btn-icon" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          <div className="hero-trust-line">
            <span className="trust-dot">•</span>
            <span>Handmade</span>
            <span className="trust-dot">•</span>
            <span>Custom Designs</span>
            <span className="trust-dot">•</span>
            <span>Repair & Restoration</span>
          </div>
        </div>

        {/* Right Hero Showcase */}
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <div className="hero-backdrop-glow"></div>
            <div className="hero-image-card">
              <img
                src="/images/chair.png"
                alt="Handcrafted Cane Chair by Venkateswara Cane Work in Nellore"
                className="hero-furniture-img"
              />
              <div className="hero-image-tag">
                <span className="tag-label">Handcrafted Quality</span>
                <span className="tag-sub">Nellore, Andhra Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
