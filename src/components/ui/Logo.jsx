import React from 'react';
import { siteConfig } from '../../config/siteConfig';

function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">
        <div className="logo-bars">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="logo-text">
        <div className="logo-name">{siteConfig.company.name}</div>
        <div className="logo-subtitle">{siteConfig.company.subtitle}</div>
      </div>
    </div>
  );
}

export default Logo;
