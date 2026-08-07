import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, WhatsAppIcon, SparkleIcon } from './Icons';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Hero Content */}
        <div className="hero-left">
          <div className="eyebrow-badge">
            <SparkleIcon className="icon-badge" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 className="hero-headline">
            {t.hero.titleMain}
            <span className="headline-accent"> {t.hero.titleAccent}</span>
          </h1>

          <p className="hero-description">
            {t.hero.description}
          </p>

          <div className="hero-cta-group">
            <a href="tel:+919966232996" className="btn primary-btn">
              <PhoneIcon className="btn-icon" />
              <span>{t.hero.callBtn}</span>
            </a>

            <a
              href={`https://wa.me/919966232996?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp-btn"
            >
              <WhatsAppIcon className="btn-icon" />
              <span>{t.hero.whatsappBtn}</span>
            </a>
          </div>

          <div className="hero-trust-line">
            <span className="trust-dot">•</span>
            <span>{t.hero.trustItems[0]}</span>
            <span className="trust-dot">•</span>
            <span>{t.hero.trustItems[1]}</span>
            <span className="trust-dot">•</span>
            <span>{t.hero.trustItems[2]}</span>
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
                loading="eager"
                className="hero-furniture-img"
              />
              <div className="hero-image-tag">
                <span className="tag-label">{t.hero.tagLabel}</span>
                <span className="tag-sub">{t.hero.tagSub}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
