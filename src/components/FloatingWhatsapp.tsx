import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { WhatsAppIcon } from './Icons';

export const FloatingWhatsapp: React.FC = () => {
  const { t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);

  return (
    <a
      className="floating-whatsapp-btn"
      href={`https://wa.me/919966232996?text=${waText}`}
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
