import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { DesignIcon, PhoneIcon, ChairIcon } from './Icons';

export const HowToOrder: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "1",
      title: t.howToOrder.step1Title,
      description: t.howToOrder.step1Desc,
      icon: <DesignIcon className="step-icon" />
    },
    {
      number: "2",
      title: t.howToOrder.step2Title,
      description: t.howToOrder.step2Desc,
      icon: <PhoneIcon className="step-icon" />
    },
    {
      number: "3",
      title: t.howToOrder.step3Title,
      description: t.howToOrder.step3Desc,
      icon: <ChairIcon className="step-icon" />
    }
  ];

  return (
    <section id="how-to-order" className="section how-to-order-section">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-eyebrow">{t.howToOrder.eyebrow}</span>
          <h2 className="section-title">{t.howToOrder.title}</h2>
          <p className="section-subtitle">{t.howToOrder.subtitle}</p>
        </div>

        <div className="how-to-order-grid">
          {steps.map((step, index) => (
            <div key={index} className="order-step-card">
              <div className="step-number-badge">{step.number}</div>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
