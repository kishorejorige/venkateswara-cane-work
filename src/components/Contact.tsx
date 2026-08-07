import React from 'react';
import { PhoneIcon, WhatsAppIcon, LocationIcon } from './Icons';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card">
            <span className="section-eyebrow">VISIT OR CALL US</span>
            <h2 className="section-title">Get in Touch with Konda Pavan Kumar</h2>
            <p className="contact-intro">
              Whether you want to buy new cane furniture, order custom designs, or restore existing pieces in Nellore, we are just a call or WhatsApp message away.
            </p>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <LocationIcon className="info-icon" />
                </div>
                <div>
                  <strong>Business Name & Address</strong>
                  <p>Venkateswara Cane Work</p>
                  <p className="sub-text">Proprietor: Konda Pavan Kumar</p>
                  <p className="sub-text">Nellore, Andhra Pradesh, India</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <PhoneIcon className="info-icon" />
                </div>
                <div>
                  <strong>Phone / Call Directly</strong>
                  <p>
                    <a href="tel:+919966232996" className="phone-link">+91 9966232996</a>
                  </p>
                  <p className="sub-text">Available Mon - Sat (8:00 AM - 8:00 PM)</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-wrapper">
                  <WhatsAppIcon className="info-icon" />
                </div>
                <div>
                  <strong>WhatsApp Direct Inquiry</strong>
                  <p>
                    <a 
                      href="https://wa.me/919966232996" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      Chat on WhatsApp (+91 9966232996)
                    </a>
                  </p>
                  <p className="sub-text">Send photos of your old furniture for repair quotes!</p>
                </div>
              </div>
            </div>

            <div className="contact-actions-row">
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
          </div>

          {/* Clean Map Placeholder Frame */}
          <div className="contact-map-wrapper">
            <div className="map-placeholder-card">
              <div className="map-badge">
                <LocationIcon className="icon-sm" />
                <span>Nellore Workshop Location</span>
              </div>
              
              <div className="map-visual">
                <div className="map-pin-pulse"></div>
                <div className="map-pin">📍</div>
                <h3>Venkateswara Cane Work</h3>
                <p>Nellore, Andhra Pradesh</p>
                <span className="map-sub">Konda Pavan Kumar</span>
              </div>

              <div className="map-footer-note">
                <p>📍 Visiting our workshop? Call +91 9966232996 for direct directions and doorstep service across Nellore.</p>
                <a
                  href="https://wa.me/919966232996?text=Hi%20Konda%20Pavan%20Kumar,%20please%20send%20your%20workshop%20location."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-map-location"
                >
                  Request Shop Location on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
