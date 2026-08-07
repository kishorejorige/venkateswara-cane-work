import React from 'react';
import { WhatsAppIcon } from './Icons';

export const FloatingWhatsapp: React.FC = () => {
  return (
    <a
      className="floating-whatsapp-btn"
      href="https://wa.me/919966232996?text=Hi%20Konda%20Pavan%20Kumar,%20I%20am%20interested%20in%20your%20cane%20furniture%20work."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Venkateswara Cane Work on WhatsApp"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon className="floating-wa-icon" />
      <span className="floating-wa-label">WhatsApp</span>
    </a>
  );
};
