import React from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

function BegleitungSection({ scrollToSection }) {
  return (
    <section id="begleitung" className="begleitung">
      <div className="begleitung-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.begleitung.eyebrow}</span>
          <h2>{siteConfig.begleitung.title}</h2>
          <p>{siteConfig.begleitung.text}</p>
        </div>

        <div className="begleitung-content">
          <div className="begleitung-highlight">
            <h3>Passend zum Umfang, Budget und gewünschten Ergebnis.</h3>
            <ul className="begleitung-points">
              {siteConfig.begleitung.points.map((point, index) => (
                <li key={index}>
                  <Check size={20} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button 
              className="cta-primary"
              onClick={() => scrollToSection('anfrage')}
            >
              Projekt anfragen
            </button>
          </div>

          <div className="begleitung-cards">
            {siteConfig.begleitung.cards.map((card, index) => (
              <div key={index} className="begleitung-card">
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BegleitungSection;
