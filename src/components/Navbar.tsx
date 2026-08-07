import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, MenuIcon, CloseIcon, GlobeIcon } from './Icons';

export const Navbar: React.FC = () => {
  const { lang, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="brand-logo" onClick={closeMobileMenu}>
          <span className="brand-title">Venkateswara Cane Work</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <a href="#home">{t.nav.home}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#how-to-order">{t.nav.howToOrder}</a>
          <a href="#why-us">{t.nav.whyUs}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>

        {/* Desktop Language Switcher & Call Action */}
        <div className="nav-actions">
          <div className="lang-switcher-pill" role="radiogroup" aria-label="Language selection">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={lang === 'en'}
              title="English"
            >
              English
            </button>
            <span className="lang-divider">|</span>
            <button
              className={`lang-btn telugu-font ${lang === 'te' ? 'active' : ''}`}
              onClick={() => setLanguage('te')}
              aria-pressed={lang === 'te'}
              title="తెలుగు"
            >
              తెలుగు
            </button>
          </div>

          <a href="tel:+919966232996" className="btn-call-nav">
            <PhoneIcon className="icon-sm" />
            <span>{t.nav.callNow}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileMenu}>
          <nav className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Language Switcher */}
            <div className="mobile-lang-row">
              <span className="mobile-lang-label">
                <GlobeIcon className="icon-sm" /> Language / భాష:
              </span>
              <div className="mobile-lang-options">
                <button
                  className={`mobile-lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => { setLanguage('en'); closeMobileMenu(); }}
                >
                  English
                </button>
                <button
                  className={`mobile-lang-btn telugu-font ${lang === 'te' ? 'active' : ''}`}
                  onClick={() => { setLanguage('te'); closeMobileMenu(); }}
                >
                  తెలుగు
                </button>
              </div>
            </div>

            <a href="#home" onClick={closeMobileMenu}>{t.nav.home}</a>
            <a href="#about" onClick={closeMobileMenu}>{t.nav.about}</a>
            <a href="#services" onClick={closeMobileMenu}>{t.nav.services}</a>
            <a href="#gallery" onClick={closeMobileMenu}>{t.nav.gallery}</a>
            <a href="#how-to-order" onClick={closeMobileMenu}>{t.nav.howToOrder}</a>
            <a href="#why-us" onClick={closeMobileMenu}>{t.nav.whyUs}</a>
            <a href="#contact" onClick={closeMobileMenu}>{t.nav.contact}</a>
            
            <div className="mobile-nav-cta">
              <a href="tel:+919966232996" className="btn primary-btn full-width" onClick={closeMobileMenu}>
                <PhoneIcon className="icon-sm" /> {t.hero.callBtn}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
