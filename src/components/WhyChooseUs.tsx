import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CheckIcon } from './Icons';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t.whyUs.reason1Title,
      description: t.whyUs.reason1Desc
    },
    {
      title: t.whyUs.reason2Title,
      description: t.whyUs.reason2Desc
    },
    {
      title: t.whyUs.reason3Title,
      description: t.whyUs.reason3Desc
    },
    {
      title: t.whyUs.reason4Title,
      description: t.whyUs.reason4Desc
    },
    {
      title: t.whyUs.reason5Title,
      description: t.whyUs.reason5Desc
    }
  ];

  return (
    <section id="why-us" className="section why-us-section">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-eyebrow">{t.whyUs.eyebrow}</span>
          <h2 className="section-title">{t.whyUs.title}</h2>
          <p className="section-subtitle">{t.whyUs.subtitle}</p>
        </div>

        <div className="why-us-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="why-us-card">
              <div className="check-badge">
                <CheckIcon className="check-icon" />
              </div>
              <h3 className="why-us-card-title">{reason.title}</h3>
              <p className="why-us-card-text">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
