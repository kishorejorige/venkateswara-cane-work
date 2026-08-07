import React from 'react';
import { CheckIcon } from './Icons';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      title: 'Handcrafted Work',
      description: 'Artisanal hand weaving using 100% natural rattan for superior comfort and long-lasting quality.'
    },
    {
      title: 'Custom Designs',
      description: 'Tailored dimensions, patterns, and seating arrangements created precisely according to your preferences.'
    },
    {
      title: 'Repair & Restoration',
      description: 'Expert re-weaving and refurbishment to revive your classic and sentimental cane furniture.'
    },
    {
      title: 'Local Nellore Service',
      description: 'Prompt local delivery, personal consultation, and reliable after-sales service right here in Nellore.'
    },
    {
      title: 'Direct Contact',
      description: 'Speak directly with owner Konda Pavan Kumar for transparent pricing, custom quotes, and guidance.'
    }
  ];

  return (
    <section id="why-us" className="section why-us-section">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-eyebrow">OUR PROMISE</span>
          <h2 className="section-title">Why Choose Venkateswara Cane Work</h2>
          <p className="section-subtitle">
            Dedicated to traditional Indian cane craftsmanship with unmatched personal attention to detail.
          </p>
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
