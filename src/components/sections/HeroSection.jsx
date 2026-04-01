import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import EstimatorCard from '../calculator/EstimatorCard';
import CalculatorPanel from '../calculator/CalculatorPanel';

function HeroSection({ scrollToSection }) {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <section id="start" className="hero">
      <div className={`hero-container ${showCalculator ? 'calculator-open' : ''}`}>
        <div className={`hero-content ${showCalculator ? 'hidden' : ''}`}>
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
              onClick={() => setShowCalculator(true)}
            >
              Kostenrechner öffnen
            </button>
          </div>
        </div>

        <div className={`hero-estimator ${showCalculator ? 'hidden' : ''}`} id="rechner">
          <EstimatorCard onOpenCalculator={() => setShowCalculator(true)} />
        </div>

        {showCalculator && (
          <div className="calculator-full">
            <CalculatorPanel 
              onOpenRequestPage={() => {
                setShowCalculator(false);
                scrollToSection('anfrage');
              }}
              onClose={() => setShowCalculator(false)}
            />
          </div>
        )}
      </div>

      {!showCalculator && (
        <button 
          className="scroll-indicator"
          onClick={() => scrollToSection('leistungen')}
        >
          <ChevronDown size={24} />
        </button>
      )}
    </section>
  );
}

export default HeroSection;
