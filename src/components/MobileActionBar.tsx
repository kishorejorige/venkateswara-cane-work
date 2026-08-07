import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneIcon, WhatsAppIcon } from './Icons';

export const MobileActionBar: React.FC = () => {
  const { t } = useLanguage();

  const waText = encodeURIComponent(t.whatsappMessages.general);

  return (
    <aside className="mobile-bottom-action-bar" aria-label="Quick Mobile Actions">
      <a href="tel:+919966232996" className="mobile-action-btn call-action">
        <PhoneIcon className="icon-sm" />
        <span>{t.mobileBar.call}</span>
      </a>

      <a
        href={`https://wa.me/919966232996?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-action-btn whatsapp-action"
      >
        <WhatsAppIcon className="icon-sm" />
        <span>{t.mobileBar.whatsapp}</span>
      </a>
    </aside>
  );
};
