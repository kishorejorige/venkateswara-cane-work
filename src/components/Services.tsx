import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ChairIcon, SofaIcon, SwingIcon, RepairIcon } from './Icons';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const Services: React.FC = () => {
  const { t } = useLanguage();

  const services: ServiceItem[] = [
    {
      id: 'chairs',
      title: t.services.chairsTitle,
      description: t.services.chairsDesc,
      icon: <ChairIcon className="service-icon" />,
      tag: t.services.chairsTag
    },
    {
      id: 'sofas',
      title: t.services.sofasTitle,
      description: t.services.sofasDesc,
      icon: <SofaIcon className="service-icon" />,
      tag: t.services.sofasTag
    },
    {
      id: 'swings',
      title: t.services.swingsTitle,
      description: t.services.swingsDesc,
      icon: <SwingIcon className="service-icon" />,
      tag: t.services.swingsTag
    },
    {
      id: 'repairs',
      title: t.services.repairsTitle,
      description: t.services.repairsDesc,
      icon: <RepairIcon className="service-icon" />,
      tag: t.services.repairsTag
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-eyebrow">{t.services.eyebrow}</span>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-top">
                <div className="icon-box">
                  {service.icon}
                </div>
                <span className="service-tag">{service.tag}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="#contact" className="service-link">
                <span>{t.services.inquireFor} {service.title}</span>
                <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
