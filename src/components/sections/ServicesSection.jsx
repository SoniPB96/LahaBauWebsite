import React from 'react';
import { Zap, Wrench, Sun, Network, Calculator, Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const iconMap = {
  zap: Zap,
  wrench: Wrench,
  sun: Sun,
  network: Network,
  calculator: Calculator,
  check: Check,
};

function ServicesSection() {
  return (
    <section id="leistungen" className="services">
      <div className="services-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.services.eyebrow}</span>
          <h2>{siteConfig.services.title}</h2>
        </div>

        <div className="services-grid">
          {siteConfig.services.items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.key} className="service-card">
                <div className="service-icon">
                  <Icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
