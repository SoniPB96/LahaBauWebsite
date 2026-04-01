# LAHA Baudienstleistungen - Optimierte Struktur

## Projektstruktur

```
optimized-structure/
├── public/
├── src/
│   ├── components/
│   │   ├── sections/               # Website-Sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── TrustSection.jsx
│   │   │   ├── BegleitungSection.jsx
│   │   │   ├── RequestSection.jsx
│   │   │   └── index.js
│   │   ├── ui/                     # UI-Komponenten
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── index.js
│   │   └── calculator/             # RECHNER (komplett)
│   │       ├── CalculatorPanel.jsx    # Vollständiger 7-Step Wizard
│   │       ├── EstimatorCard.jsx      # Preview im Hero
│   │       ├── calculatorLogic.js     # Preis-Berechnung
│   │       └── index.js
│   ├── calculator/                 # Rechner Logic
│   │   ├── flow.js                # Step-Navigation
│   │   └── validation.js          # Validierung
│   ├── config/
│   │   ├── siteConfig.js          # Website Content
│   │   ├── calculatorConfig.js    # Rechner Config
│   │   └── calculatorAdmin.js
│   ├── App.jsx                     # Main App (36 Zeilen)
│   ├── main.jsx
│   └── styles.css                  # Inkl. Calculator Styles
├── index.html
├── package.json
└── vite.config.js
```

## Was wurde optimiert?

✅ **Struktur:** 410 Zeilen → 15+ kleine Komponenten
✅ **Content:** Texte ~40% gekürzt, klarer
✅ **UX:** CTA-Hierarchie, Scroll-Indicator
✅ **Rechner:** Vollständig erhalten und integriert

## Rechner Features

**7-Schritt Wizard:**
1. Objektart & Fläche
2. Projekttyp
3. Material-Marke
4. Komponenten (Steckdosen, Schalter, etc.)
5. Optionen (Smart Home, etc.)
6. Zusammenfassung
7. Kontaktdaten

**Berechnung:**
- Basis-Preis + m²-Faktor + Komponenten
- Marken-Faktoren (Standard/Gehoben/Premium)
- Objekt-Faktoren (Altbau vs. Neubau)
- Preisspanne ±10%

## Installation

```bash
npm install
npm run dev
```

## Nächste Schritte

1. Positionierung schärfen (Elektriker vs. Bauleiter?)
2. Kontaktformular funktional machen
3. SEO optimieren
4. Portfolio/Referenzen hinzufügen
