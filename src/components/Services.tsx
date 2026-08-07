import React from 'react';
import { ChairIcon, SofaIcon, SwingIcon, RepairIcon } from './Icons';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: 'chairs',
      title: 'Cane Chairs',
      description: 'Handcrafted cane chairs for homes, balconies and verandas. Designed for comfort and durability.',
      icon: <ChairIcon className="service-icon" />,
      tag: 'Popular Choice'
    },
    {
      id: 'sofas',
      title: 'Sofa Sets',
      description: 'Custom-made cane sofa sets with traditional craftsmanship, built to fit your living room aesthetic.',
      icon: <SofaIcon className="service-icon" />,
      tag: 'Custom Sizes'
    },
    {
      id: 'swings',
      title: 'Swings & Custom Work',
      description: 'Handmade swings (jhula) and furniture designed according to customer requirements and spatial dimensions.',
      icon: <SwingIcon className="service-icon" />,
      tag: 'Made to Order'
    },
    {
      id: 'repairs',
      title: 'Repair & Restoration',
      description: 'Expert repair, re-weaving and restoration of old or damaged cane furniture to bring them back to life.',
      icon: <RepairIcon className="service-icon" />,
      tag: 'Restoration Expert'
    }
  ];

  return (
    <section id="services" className="section services-section">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-eyebrow">WHAT WE DO</span>
          <h2 className="section-title">Handcrafted Services Built to Last</h2>
          <p className="section-subtitle">
            From single veranda chairs to complete living room sets and antique furniture repairs, we craft each piece with precision.
          </p>
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
                <span>Inquire for {service.title}</span>
                <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
