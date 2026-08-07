import React, { useState, useEffect } from 'react';
import { PhoneIcon, MenuIcon, CloseIcon } from './Icons';

export const Navbar: React.FC = () => {
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
          <span className="brand-telugu">వెంకటేశ్వర కేన్ వర్క్</span>
          <span className="brand-title">Venkateswara Cane Work</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Our Work</a>
          <a href="#why-us">Why Us</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Desktop Call Button */}
        <div className="nav-actions">
          <a href="tel:+919966232996" className="btn-call-nav">
            <PhoneIcon className="icon-sm" />
            <span>Call Now</span>
          </a>

          {/* Mobile Menu Toggle */}
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
            <a href="#home" onClick={closeMobileMenu}>Home</a>
            <a href="#about" onClick={closeMobileMenu}>About</a>
            <a href="#services" onClick={closeMobileMenu}>Services</a>
            <a href="#gallery" onClick={closeMobileMenu}>Our Work</a>
            <a href="#why-us" onClick={closeMobileMenu}>Why Choose Us</a>
            <a href="#contact" onClick={closeMobileMenu}>Contact</a>
            
            <div className="mobile-nav-cta">
              <a href="tel:+919966232996" className="btn primary-btn full-width" onClick={closeMobileMenu}>
                <PhoneIcon className="icon-sm" /> Call 9966232996
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
