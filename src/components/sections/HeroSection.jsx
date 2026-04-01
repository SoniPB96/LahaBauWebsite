import React from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import EstimatorCard from '../calculator/EstimatorCard';

function HeroSection({ scrollToSection }) {
  return (
    <section id="start" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            {siteConfig.hero.badge}
          </div>

          <h1 className="hero-headline">
            {siteConfig.hero.headline}
          </h1>

          <p className="hero-subheadline">
            {siteConfig.hero.subheadline}
          </p>

          <div className="hero-trust">
            {siteConfig.hero.trustLine}
          </div>

          <div className="hero-cta">
            <button 
              className="cta-primary"
              onClick={() => scrollToSection('anfrage')}
            >
              Projekt anfragen
            </button>
            <button 
              className="cta-secondary"
              onClick={() => scrollToSection('rechner')}
            >
              Kostenrechner öffnen
            </button>
          </div>
        </div>

        <div className="hero-estimator" id="rechner">
          <EstimatorCard scrollToSection={scrollToSection} />
        </div>
      </div>

      <button 
        className="scroll-indicator"
        onClick={() => scrollToSection('leistungen')}
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}

export default HeroSection;
