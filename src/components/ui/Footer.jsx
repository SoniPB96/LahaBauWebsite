import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import Logo from './Logo';

function Footer({ scrollToSection }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Logo />
          <p>Elektroarbeiten & Baubegleitung im Raum Paderborn.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Leistungen</h4>
            <button onClick={() => scrollToSection('leistungen')}>Elektroinstallation</button>
            <button onClick={() => scrollToSection('rechner')}>Kostenrechner</button>
            <button onClick={() => scrollToSection('begleitung')}>Baubegleitung</button>
          </div>

          <div>
            <h4>Kontakt</h4>
            <a href={siteConfig.company.phoneLink}>{siteConfig.company.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
            <a href={siteConfig.company.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <div>
            <h4>Rechtliches</h4>
            <button>Impressum</button>
            <button>Datenschutz</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 LAHA Baudienstleistungen · Paderborn</p>
      </div>
    </footer>
  );
}

export default Footer;
