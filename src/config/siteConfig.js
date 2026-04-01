export const siteConfig = {
  company: {
    name: "LAHA",
    subtitle: "BAUDIENSTLEISTUNGEN",
    email: "kontakt@laha-bau.de",
    phoneDisplay: "0176 / 820 67 106",
    phoneLink: "tel:+4917682067106",
    whatsappLink: "https://wa.me/4917682067106",
    region: "Paderborn und Umland",
  },

  navigation: {
    items: [
      { key: "start", label: "Start" },
      { key: "rechner", label: "Kostenrechner" },
      { key: "begleitung", label: "Baubegleitung" },
    ],
    ctaLabel: "Anfrage stellen",
  },

  hero: {
    badge: "Elektroarbeiten in Paderborn und Umgebung",
    headline: "Saubere Elektroarbeiten ohne Chaos auf der Baustelle.",
    subheadline: "Ein Ansprechpartner. Klare Planung. Saubere Umsetzung.",
    trustLine: "Planung und Ausführung in Zusammenarbeit mit Meisterbetrieb.",
  },

  services: {
    eyebrow: "Leistungen",
    title: "Leistungen für Privatkunden",
    items: [
      { 
        key: "installation", 
        icon: "zap", 
        title: "Elektroinstallation", 
        text: "Neuinstallation und Modernisierung für Wohnung und Haus." 
      },
      { 
        key: "distribution", 
        icon: "wrench", 
        title: "Unterverteilungen", 
        text: "Erweiterung und Erneuerung bestehender Sicherungstechnik." 
      },
      { 
        key: "lighting", 
        icon: "sun", 
        title: "Beleuchtung", 
        text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung." 
      },
      { 
        key: "network", 
        icon: "network", 
        title: "Netzwerk & Datenleitungen", 
        text: "Strukturierte Verkabelung für Homeoffice und Haustechnik." 
      },
      { 
        key: "estimator", 
        icon: "calculator", 
        title: "Digitale Ersteinschätzung", 
        text: "Realistische Preisspanne statt ungenauem Festpreis." 
      },
      { 
        key: "quality", 
        icon: "check", 
        title: "Saubere Ausführung", 
        text: "Klare Abstimmung und nachvollziehbare Umsetzung." 
      },
    ],
  },

  begleitung: {
    eyebrow: "Baubegleitung",
    title: "Baubegleitung mit lokalen Partnern",
    text: "Für umfangreichere Sanierungen: technische Begleitung und Koordination mit lokalen Partnerbetrieben.",
    points: [
      "Koordination mit lokalen Sanierungspartnern",
      "Ein fester Ansprechpartner als Bauleiter",
      "Für einfache bis hochwertige Sanierungsstandards",
      "Abgestimmte Umsetzung aller Gewerke",
    ],
    cards: [
      {
        title: "Zweckmäßige Sanierung",
        text: "Kostenfokus mit sauberer, funktionaler Umsetzung.",
      },
      {
        title: "Gehobene Modernisierung",
        text: "Bessere Materialien und koordinierte Umsetzung.",
      },
      {
        title: "Hochwertige Sanierung",
        text: "Hoher Qualitätsanspruch mit feiner Materialauswahl.",
      },
    ],
  },

  requestPage: {
    eyebrow: "Anfrage",
    title: "Projekt anfragen",
    text: "Wähle den passenden Kontaktweg: schnell per WhatsApp oder strukturiert per Formular.",
    quickTitle: "Direkte Kontaktwege",
    quickText: "Für schnelle Abstimmung eignet sich WhatsApp am besten.",
    listTitle: "So läuft die Anfrage ab",
    listItems: [
      "Kurze Beschreibung des Projekts",
      "Optional Grundriss oder Fotos mitsenden",
      "Erste Rückmeldung zur Einordnung",
      "Termin oder Besichtigung falls sinnvoll",
    ],
  },
};

export default siteConfig;
