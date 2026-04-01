import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import Logo from './Logo';

function Header({ activeSection, scrollToSection }) {
  return (
    <header className="header">
      <div className="header-container">
        <Logo />

        <nav className="nav">
          {siteConfig.navigation.items.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.key)}
              className={activeSection === item.key ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          className="cta-button"
          onClick={() => scrollToSection('anfrage')}
        >
          {siteConfig.navigation.ctaLabel}
        </button>
      </div>
    </header>
  );
}

export default Header;
