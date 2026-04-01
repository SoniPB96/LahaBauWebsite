import React from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

function RequestSection() {
  return (
    <section id="anfrage" className="request">
      <div className="request-container">
        <div className="section-header">
          <span className="eyebrow">{siteConfig.requestPage.eyebrow}</span>
          <h2>{siteConfig.requestPage.title}</h2>
          <p>{siteConfig.requestPage.text}</p>
        </div>

        <div className="request-content">
          <div className="contact-methods">
            <h3>{siteConfig.requestPage.quickTitle}</h3>
            <p className="contact-intro">{siteConfig.requestPage.quickText}</p>

            <div className="contact-buttons">
              <a 
                href={siteConfig.company.whatsappLink}
                className="contact-button whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                <div>
                  <div className="button-label">WhatsApp</div>
                  <div className="button-sublabel">Empfohlen</div>
                </div>
              </a>

              <a 
                href={`mailto:${siteConfig.company.email}`}
                className="contact-button"
              >
                <Mail size={20} />
                <div className="button-label">E-Mail</div>
              </a>

              <a 
                href={siteConfig.company.phoneLink}
                className="contact-button"
              >
                <Phone size={20} />
                <div className="button-label">Anrufen</div>
              </a>
            </div>

            <div className="request-help">
              <h4>Was für die Rückmeldung hilft</h4>
              <ul>
                {siteConfig.requestPage.listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="contact-form-placeholder">
            <h3>Projektanfrage</h3>
            <p>Für strukturierte Anfragen mit Unterlagen oder Fotos.</p>
            <div className="form-note">
              Das Formular ist visuell vorbereitet, aber noch nicht an einen Versand angebunden.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RequestSection;
