import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LocationIcon, SparkleIcon } from './Icons';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section about-section">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-eyebrow">{t.about.eyebrow}</span>
            <h2 className="section-title">{t.about.title}</h2>

            <p className="about-text-lead">{t.about.lead}</p>
            <p className="about-text-body">{t.about.body}</p>

            <div className="about-highlights">
              <div className="highlight-item">
                <SparkleIcon className="highlight-icon" />
                <div>
                  <strong>{t.about.highlight1Title}</strong>
                  <p>{t.about.highlight1Desc}</p>
                </div>
              </div>

              <div className="highlight-item">
                <LocationIcon className="highlight-icon" />
                <div>
                  <strong>{t.about.highlight2Title}</strong>
                  <p>{t.about.highlight2Desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card-showcase">
            <div className="craft-badge-card">
              <div className="craft-stat">
                <span className="stat-number">{t.about.statNumber}</span>
                <span className="stat-label">{t.about.statLabel}</span>
              </div>
              <blockquote className="craft-quote">
                {t.about.quote}
              </blockquote>
              <div className="craft-author">
                <strong>{t.ownerName}</strong>
                <span>{t.about.authorTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
