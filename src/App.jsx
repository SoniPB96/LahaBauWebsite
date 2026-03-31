import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  CheckCircle2, MessageCircle, Phone, Mail, Menu, X, Zap, Wrench, Network, Sun, Calculator,
  ClipboardList, Handshake, Gem, Hammer, Upload
} from "lucide-react";
import { siteConfig } from "./config/siteConfig";
import { calculatorConfig } from "./config/calculatorConfig";
import { estimatePrice, formatEUR } from "./components/calculatorLogic";
import CalculatorPanel from "./components/CalculatorPanel";

const serviceIconMap = {
  zap: Zap,
  wrench: Wrench,
  network: Network,
  sun: Sun,
  calculator: Calculator,
  check: CheckCircle2,
};

function Button({ children, href, outline = false, onClick, type = "button", className = "", target }) {
  const cls = `btn ${outline ? "btn-outline" : ""} ${className}`.trim();
  if (href) {
    return <a className={cls} href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} type={type}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div>;
}

function Logo() {
  return (
    <div className="logo-lockup">
      <div className="logo-mark" aria-hidden="true">
        <span className="logo-bar b1" /><span className="logo-bar b2" /><span className="logo-bar b3" /><span className="logo-bar b4" />
        <span className="logo-cut c1" /><span className="logo-cut c2" /><span className="logo-cut c3" />
      </div>
      <div className="logo-text">
        <div className="brand-name">LAHA</div>
        <div className="brand-sub">BAUDIENSTLEISTUNGEN</div>
      </div>
    </div>
  );
}

export default function App() {
  const cfg = siteConfig;
  const [activeTab, setActiveTab] = useState("start");
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestMode, setRequestMode] = useState("whatsapp");
  const [showSticky, setShowSticky] = useState(false);
  const heroRef = useRef(null);

  const heroExampleResult = useMemo(() => estimatePrice(calculatorConfig.defaults), []);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting && !menuOpen && (activeTab === "start" || activeTab === "begleitung");
        setShowSticky(shouldShow);
      },
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [menuOpen, activeTab]);

  useEffect(() => {
    if (menuOpen) setShowSticky(false);
  }, [menuOpen]);

  const openTab = (key) => {
    setActiveTab(key);
    setMenuOpen(false);
  };

  return (
    <div className="page">
      <div className="bg-orb orb-1" /><div className="bg-orb orb-2" /><div className="bg-orb orb-3" />

      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => openTab("start")} aria-label="Startseite">
            <Logo />
          </button>

          <nav className="nav desktop-nav">
            {cfg.navigation.items.map((item) => (
              <button
                key={item.key}
                className={activeTab === item.key ? "nav-active" : ""}
                onClick={() => openTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="desktop-cta">
            <Button onClick={() => openTab("anfrage")}>{cfg.navigation.ctaLabel}</Button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Menü">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="container mobile-menu-inner">
              {cfg.navigation.items.map((item) => (
                <button
                  key={item.key}
                  className={activeTab === item.key ? "nav-active" : ""}
                  onClick={() => openTab(item.key)}
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => openTab("anfrage")}>{cfg.navigation.ctaLabel}</Button>
            </div>
          </div>
        )}
      </header>

      {activeTab === "start" && (
        <main>
          <section className="hero" ref={heroRef}>
            <div className="container hero-grid">
              <div className="hero-copy clean-hero-copy">
                <div className="badge-row">
                  <span className="badge">{cfg.hero.badgePrimary}</span>
                  <span className="badge muted">{cfg.hero.badgeSecondary}</span>
                </div>

                <h1>{cfg.hero.headline}</h1>
                <h2 className="hero-subheadline">{cfg.hero.subheadline}</h2>
                <p>{cfg.hero.text}</p>
                <p className="hero-trust">{cfg.hero.trustLine}</p>

                <div className="button-row hero-cta-row">
                  <Button onClick={() => openTab("anfrage")}>Anfrage stellen</Button>
                </div>
              </div>

              <div className="hero-side">
                <div className="card liquid-card glow hero-main-card">
                  <div className="hero-accent-line" aria-hidden="true" />
                  <div className="card-pad hero-card-pad">
                    <div className="hero-card-head">
                      <div className="eyebrow">Digitale Ersteinschätzung</div>
                      <h3 className="card-title hero-card-title">Erste Kosteneinschätzung Elektrik</h3>
                      <p className="hero-card-intro">Schnelle Orientierung für Privatkunden im Raum Paderborn, bevor ein Vor-Ort-Termin nötig wird.</p>
                    </div>

                    <div className="result-box glass-inset hero-result-box">
                      <div className="hero-result-meta-grid">
                        <div className="hero-meta-item">
                          <span className="hero-meta-label">Objekt</span>
                          <strong>Wohnung</strong>
                        </div>
                        <div className="hero-meta-item">
                          <span className="hero-meta-label">Fläche</span>
                          <strong>{calculatorConfig.defaults.sqm} m²</strong>
                        </div>
                        <div className="hero-meta-item hero-meta-item-wide">
                          <span className="hero-meta-label">Projektart</span>
                          <strong>Sanierung / Altbau</strong>
                        </div>
                      </div>

                      <div className="hero-price-wrap">
                        <div className="hero-price-label">Unverbindlicher Richtpreis</div>
                        <div className="hero-price hero-price-strong hero-price-gradient">{formatEUR(heroExampleResult.low)} – {formatEUR(heroExampleResult.high)}</div>
                      </div>

                      <p className="hero-result-note">{cfg.hero.estimatorCardInfo}</p>
                    </div>

                    <div className="hero-mini-boxes hero-mini-boxes-compact">
                      <div className="soft-box liquid-card subtle hero-feature-pill">
                        <span className="hero-feature-title">Mehrstufige Eingabe</span>
                        <span className="hero-feature-text">Schritt für Schritt statt unübersichtlichem Formular.</span>
                      </div>
                      <div className="soft-box liquid-card subtle hero-feature-pill">
                        <span className="hero-feature-title">Richtpreis statt Festpreis</span>
                        <span className="hero-feature-text">Ehrliche Preisspanne vor der Detailplanung.</span>
                      </div>
                    </div>

                    <Button className="full hero-main-cta" onClick={() => openTab("rechner")}>
                      Rechner öffnen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <SectionTitle eyebrow={cfg.services.eyebrow} title={cfg.services.title} text={cfg.services.text} />
              <div className="services-grid">
                {cfg.services.items.map((service) => {
                  const Icon = serviceIconMap[service.icon] || CheckCircle2;
                  return (
                    <div key={service.key} className="card liquid-card subtle service-card">
                      <div className="card-pad">
                        <div className="service-icon"><Icon size={22} /></div>
                        <h3 className="card-title">{service.title}</h3>
                        <p className="body-text">{service.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section testimonials-section">
            <div className="container">
              <SectionTitle eyebrow={cfg.testimonials.eyebrow} title={cfg.testimonials.title} text={cfg.testimonials.text} />
              <div className="testimonials-grid">
                {cfg.testimonials.items.map((item) => (
                  <div key={item.name} className="card liquid-card subtle testimonial-card">
                    <div className="card-pad">
                      <div className="testimonial-quote-mark">“</div>
                      <p className="testimonial-quote">{item.quote}</p>
                      <div className="testimonial-person">
                        <div className="testimonial-avatar" aria-hidden="true">{item.initials}</div>
                        <div>
                          <div className="testimonial-name">{item.name}</div>
                          <div className="testimonial-location">{item.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "begleitung" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={cfg.begleitung.eyebrow} title={cfg.begleitung.title} text={cfg.begleitung.text} />
            <p className="begleitung-subline">{cfg.begleitung.subline}</p>
            <div className="begleitung-hero liquid-card glow">
              <div className="begleitung-main">
                <p className="begleitung-intro">{cfg.begleitung.intro}</p>
                <div className="feature-list">
                  {cfg.begleitung.points.map((point, i) => {
                    const icons = [ClipboardList, Handshake, Hammer, Gem];
                    const Icon = icons[i] || CheckCircle2;
                    return (
                      <div key={point} className="feature-row">
                        <div className="feature-icon"><Icon size={18} /></div>
                        <div className="feature-text">{point}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="button-row feature-cta-row">
                  <Button onClick={() => openTab("anfrage")}>Anfrage stellen</Button>
                </div>
              </div>
            </div>

            <div className="begleitung-cards">
              {cfg.begleitung.cards.map((card) => (
                <div key={card.title} className="card liquid-card subtle">
                  <div className="card-pad">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="body-text">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === "rechner" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={calculatorConfig.titleEyebrow} title={calculatorConfig.title} text={calculatorConfig.text} />
            <CalculatorPanel onOpenRequestPage={() => openTab("anfrage")} />
          </div>
        </main>
      )}

      {activeTab === "anfrage" && (
        <main className="section">
          <div className="container">
            <SectionTitle eyebrow={cfg.requestPage.eyebrow} title={cfg.requestPage.title} text={cfg.requestPage.text} />
            <div className="request-layout">
              <div className="card liquid-card glow">
                <div className="card-pad">
                  <div className="eyebrow">{cfg.requestPage.quickTitle}</div>
                  <h3 className="card-title">Wähle deinen bevorzugten Kontaktweg</h3>
                  <p className="body-text">{cfg.requestPage.quickText}</p>

                  <div className="request-selector">
                    <button className={`request-option request-option-primary ${requestMode==="whatsapp" ? "active" : ""}`} onClick={() => setRequestMode("whatsapp")}>
                      <MessageCircle size={18} />
                      <div className="request-option-text">
                        <span>WhatsApp</span>
                        <small>Empfohlen</small>
                      </div>
                    </button>
                    <button className={`request-option ${requestMode==="phone" ? "active" : ""}`} onClick={() => setRequestMode("phone")}>
                      <Phone size={18} />
                      <div className="request-option-text"><span>Anrufen</span></div>
                    </button>
                    <button className={`request-option ${requestMode==="email" ? "active" : ""}`} onClick={() => setRequestMode("email")}>
                      <Mail size={18} />
                      <div className="request-option-text"><span>E-Mail</span></div>
                    </button>
                    <button className={`request-option ${requestMode==="form" ? "active" : ""}`} onClick={() => setRequestMode("form")}>
                      <Calculator size={18} />
                      <div className="request-option-text"><span>Formular</span></div>
                    </button>
                  </div>

                  {requestMode === "whatsapp" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Schnellste Abstimmung direkt per WhatsApp.</p>
                      <Button href={cfg.company.whatsappLink} target="_blank"><MessageCircle size={16} /> WhatsApp schreiben</Button>
                    </div>
                  )}
                  {requestMode === "phone" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Direkter Anruf für schnelle Klärung.</p>
                      <Button href={cfg.company.phoneLink}><Phone size={16} /> Jetzt anrufen</Button>
                    </div>
                  )}
                  {requestMode === "email" && (
                    <div className="request-panel liquid-card subtle">
                      <p className="body-text">Für strukturierte Anfragen per E-Mail.</p>
                      <Button href={`mailto:${cfg.company.email}`}><Mail size={16} /> E-Mail senden</Button>
                    </div>
                  )}

                  <div className="request-steps liquid-card subtle">
                    <div className="eyebrow">{cfg.requestPage.listTitle}</div>
                    <div className="feature-list compact-list">
                      {cfg.requestPage.listItems.map((item) => (
                        <div key={item} className="feature-row">
                          <div className="feature-icon small-icon"><CheckCircle2 size={16} /></div>
                          <div className="feature-text">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`card liquid-card subtle form-card ${requestMode === "form" ? "form-card-show" : "form-card-muted"}`}>
                <div className="card-pad stack">
                  <div className="request-form-head">
                    <div className="eyebrow">Formular</div>
                    <h3 className="card-title">Detaillierte Projektanfrage</h3>
                    <p className="body-text">Für strukturierte Anfragen mit Unterlagen, Fotos oder Grundrissen.</p>
                  </div>
                  <div><label className="field-label">Name</label><input className="input glass-input" placeholder="Name" /></div>
                  <div className="form-grid two">
                    <div><label className="field-label">E-Mail</label><input className="input glass-input" placeholder="E-Mail" /></div>
                    <div><label className="field-label">Telefon</label><input className="input glass-input" placeholder="Telefon" /></div>
                  </div>
                  <div><label className="field-label">PLZ / Ort</label><input className="input glass-input" placeholder="PLZ / Ort" /></div>
                  <div><label className="field-label">Projektart / Thema</label><input className="input glass-input" placeholder="z. B. Sanierung / Altbau, Baubegleitung, Erweiterung" /></div>
                  <div>
                    <label className="field-label">Unterlagen / Grundriss</label>
                    <label className="upload-box glass-input">
                      <Upload size={16} />
                      <span>Datei auswählen</span>
                      <input hidden type="file" accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                  </div>
                  <div><label className="field-label">Beschreibung</label><textarea className="input textarea glass-input" placeholder="Kurze Beschreibung des Projekts" /></div>
                  <div className="soft-box liquid-card subtle">{cfg.requestPage.formNote}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {showSticky && (
        <button className="sticky-contact sticky-contact-wide" onClick={() => openTab("anfrage")}>Anfrage stellen</button>
      )}
    </div>
  );
}
