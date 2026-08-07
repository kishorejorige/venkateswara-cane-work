import React from 'react';
import { LocationIcon, SparkleIcon } from './Icons';

export const About: React.FC = () => {
  return (
    <section id="about" className="section about-section">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-eyebrow">OUR CRAFT & HERITAGE</span>
            <h2 className="section-title">
              Traditional Craftsmanship for Modern Homes.
            </h2>

            <p className="about-text-lead">
              At <strong>Venkateswara Cane Work</strong>, led by <strong>Konda Pavan Kumar</strong> in <strong>Nellore</strong>, we bring decades of traditional rattan and cane weaving artistry directly into your living spaces.
            </p>

            <p className="about-text-body">
              Every chair, sofa set, swing, and custom piece is meticulously crafted by hand using selected natural cane. Whether you need custom-designed furniture tailored to your veranda or expert restoration of cherished family heirlooms, we craft every detail with pride, durability, and elegance.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <SparkleIcon className="highlight-icon" />
                <div>
                  <strong>Authentic Hand Weaving</strong>
                  <p>100% natural rattan woven with traditional precision.</p>
                </div>
              </div>

              <div className="highlight-item">
                <LocationIcon className="highlight-icon" />
                <div>
                  <strong>Nellore Workshop</strong>
                  <p>Direct service from Konda Pavan Kumar without middlemen.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card-showcase">
            <div className="craft-badge-card">
              <div className="craft-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Handmade in Nellore</span>
              </div>
              <blockquote className="craft-quote">
                &ldquo;Cane furniture isn&apos;t just seating—it&apos;s a timeless Indian art form that brings warmth and natural comfort to any home.&rdquo;
              </blockquote>
              <div className="craft-author">
                <strong>Konda Pavan Kumar</strong>
                <span>Master Craftsman & Proprietor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
