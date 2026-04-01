export const calculatorAdmin = {
  // =====================================================================================
  // ZENTRALE PFLEGE-DATEI FÜR DEN KOSTENRECHNER
  // =====================================================================================
  // Zweck:
  // Diese Datei ist absichtlich die wichtigste Stelle für spätere Änderungen.
  // Wenn du Preise, Optionen, Materiallinien oder Standardwerte anpassen willst,
  // solltest du zuerst HIER schauen – nicht in der eigentlichen Rechner-Logik.
  //
  // Grundregel:
  // - Texte nur hier ändern
  // - Preise und Faktoren nur hier ändern
  // - Neue Optionen oder Ausstattungsfelder zuerst hier anlegen
  // - Die Rechner-Dateien selbst nur anfassen, wenn sich die FUNKTION ändert
  //
  // Wie der Preis grundsätzlich entsteht:
  // 1. Projektart bestimmt die Basis (z. B. Sanierung oder Neubau)
  // 2. Fläche erzeugt den m²-Anteil
  // 3. Ausstattungsfelder und Zusatzoptionen kommen dazu
  // 4. Objektart kann den Preis leicht anheben oder absenken
  // 5. Materiallinie (z. B. Gira oder Merten) beeinflusst das Materialniveau
  //
  // Wichtiger Praxis-Hinweis:
  // Der Rechner soll keine exakte Angebotssoftware sein.
  // Er soll Privatkunden eine glaubwürdige erste Orientierung geben.
  // Deshalb arbeiten wir bewusst mit einem Preisbereich und NICHT mit Scheingenauigkeit.
  // =====================================================================================

  adminNotes: {
    purpose:
      "Diese Datei ist für die laufende Pflege gedacht. Spätere Preis- oder Textänderungen sollten möglichst nur hier erfolgen.",
    safeToEdit:
      "Texte, Preise, Faktoren, Labels und Standardwerte dürfen geändert werden. Feld-Schlüssel wie 'key' oder 'value' nur ändern, wenn auch die Logik darauf angepasst wird.",
    pricingModel:
      "Gesamtpreis = Grundpreis der Projektart + Flächenpreis + Ausstattungswerte + Zusatzoptionen. Danach wirken Objektfaktor und Materiallinien-Faktor auf den Gesamtwert.",
    importantWarning:
      "Große Preissprünge nicht aus dem Bauch heraus eintragen. Besser an realen Angeboten, Einkaufspreisen oder Erfahrungswerten aus ähnlichen Projekten orientieren.",
  },

  texts: {
    titleEyebrow: "Erste Kosteneinschätzung Elektrik",
    title: "Erste Kosteneinschätzung für Elektroarbeiten",
    intro:
      "Der Rechner dient als erste Orientierung und ersetzt kein verbindliches Angebot.",
    disclaimer:
      "Unverbindliche Ersteinschätzung ohne Vor-Ort-Prüfung.",
    sidebarTitle: "Kurzübersicht",
    resultFactorsTitle: "Preisfaktoren",
    resultFactors: [
      "Projektart und Umfang",
      "Bestand und Zustand",
      "Raumanzahl",
      "Ausstattung",
      "Zusatzoptionen",
      "Materiallinie",
    ],
    requestNote:
      "Nach dem letzten Schritt geht es direkt zur Anfrageseite.",
    optionsTitle: "Zusatzoptionen",
    optionsHint:
      "Wähle nur die Zusatzbereiche, die wirklich relevant sind.",
    roomInfoTitle: "Ausstattung ohne Küche und Bad",
    roomInfoText:
      "Zuerst Raumanzahl, danach die Ausstattung dieser Räume.",
    materialTitle: "Schalterprogramm / Materiallinie",
    materialInfo:
      "Die Auswahl beeinflusst Materialniveau und Preisbereich.",
  },

  // Objektarten beeinflussen den Preis nur leicht.
  // Warum?
  // Weil die eigentliche Hauptkalkulation schon über Projektart, Fläche und Ausstattung läuft.
  // Die Objektart ist eher ein Feinregler für Zugänglichkeit, Komplexität und typische Ausführung.
  //
  // Wann ändern?
  // - Wenn du merkst, dass z. B. Gewerbeobjekte im Schnitt spürbar aufwendiger sind
  // - Wenn Wohnungen oder EFH systematisch zu hoch oder zu niedrig geschätzt werden
  //
  // Nicht zu stark ändern:
  // Hier lieber kleine Faktoren nutzen (z. B. 1.03 bis 1.12) statt extreme Sprünge.
  objectTypes: [
    {
      value: "wohnung",
      label: "Wohnung",
      icon: "home",
      factor: 1,
      note: "Referenzwert. Geeignet als neutrale Basis für typische Privatkunden-Projekte.",
    },
    {
      value: "einfamilienhaus",
      label: "Einfamilienhaus",
      icon: "home",
      factor: 1.05,
      note: "Leichter Aufschlag wegen typischer Mehrwege, Verteilung und etwas größerem Aufwand.",
    },
    {
      value: "mehrfamilienhaus",
      label: "Einheit im Mehrfamilienhaus",
      icon: "building",
      factor: 1.03,
      note: "Oft etwas komplexer als Wohnung, aber nicht automatisch so aufwendig wie ein ganzes Haus.",
    },
    {
      value: "gewerbe",
      label: "Gewerbe",
      icon: "building",
      factor: 1.12,
      note: "Höherer Faktor wegen typischer Sonderanforderungen, Robustheit und größerer Streuung im Aufwand.",
    },
  ],

  // Projektarten sind einer der wichtigsten Preishebel im gesamten Rechner.
  //
  // basePrice = Grundaufwand unabhängig von der Fläche
  // sqmPrice  = typischer Flächenpreis für dieses Projekt
  //
  // Warum braucht es beides?
  // - basePrice deckt Sockelaufwand, Organisation und typische Grundarbeiten ab
  // - sqmPrice skaliert das Projekt mit der Größe des Objekts
  //
  // Wie anpassen?
  // - Wenn ein kompletter Projekttyp generell zu billig oder zu teuer geschätzt wird
  // - Erst kleine Anpassungen testen, nicht direkt mehrere hundert Euro auf einmal ändern
  //
  // directInquiry = true bedeutet:
  // Für diesen Projekttyp wird bewusst KEIN automatischer Preis errechnet,
  // sondern der Nutzer wird direkt in eine konkrete Anfrage geführt.
  projectTypes: [
    {
      value: "neubau_neuinstallation",
      label: "Neubau / Neuinstallation",
      basePrice: 2600,
      sqmPrice: 75,
      note: "Höherer Flächenpreis, weil hier meist die vollständige Neuinstallation mit größerem Umfang gemeint ist.",
    },
    {
      value: "sanierung_altbau",
      label: "Sanierung / Altbau",
      basePrice: 1600,
      sqmPrice: 46,
      note: "Eigene Kalkulation, weil im Bestand oft andere Muster gelten als im reinen Neubau.",
    },
    {
      value: "erweiterung",
      label: "Erweiterung",
      directInquiry: true,
      note: "Keine automatische Schätzung, weil Umfang und Einbindung in den Bestand zu stark schwanken können.",
    },
    {
      value: "zaehlerschrank",
      label: "Zählerschrank erneuern",
      directInquiry: true,
      note: "Direktanfrage statt Automatismus, weil Normen, Bestand und Netzbetreiber-Vorgaben stark variieren können.",
    },
  ],

  // Zusatzoptionen sind pauschale Zusatzblöcke.
  // Diese Werte sollten typische Mehrkosten für den jeweiligen Bereich grob abbilden.
  //
  // Wann ändern?
  // - Wenn du aus Erfahrung merkst, dass ein Bereich regelmäßig zu hoch oder zu niedrig angesetzt ist
  // - Wenn sich Marktpreise, Materialpreise oder dein eigener Leistungsumfang verändern
  //
  // Praxisregel:
  // Lieber wenige, verständliche Optionen mit brauchbarer Pauschale,
  // als zu viele Mini-Optionen, die normale Kunden verwirren.
  extraOptions: [
    { key: "uv", label: "Neue Unterverteilung", price: 1450, note: "Pauschaler Zusatz für Material, Verdrahtung und typischen Mehraufwand." },
    { key: "zaehlerschrank", label: "Zählerschrank erneuern", price: 3200, note: "Nur verwenden, wenn dieser Punkt im Standard-Rechner zusätzlich berücksichtigt werden soll." },
    { key: "lan", label: "LAN / Netzwerk verlegen", price: 820, note: "Grundaufschlag für Netzwerkbereich. Zusätzliche Dosen kommen über das Ausstattungsfeld dazu." },
    { key: "aussenbereich", label: "Außenbereich", price: 990, note: "Zusatz für typische Leitungswege, Schutzanforderungen und Außenpunkte." },
    { key: "kueche", label: "Küche neu installieren", price: 2600, note: "Eigener Block, weil Küchen meist deutlich mehr Stromkreise und Anschlüsse brauchen." },
    { key: "bad", label: "Bad neu installieren", price: 2200, note: "Eigener Block wegen Feuchtraum-Anforderungen und typischer Zusatzpunkte." },
    { key: "fussbodenheizung", label: "Fußbodenheizung", price: 1250, note: "Aktiviert zusätzlich auch die Raumthermostate im Ausstattungsbereich." },
    { key: "waermepumpe", label: "Vorbereitung für Wärmepumpe", price: 920, note: "Pauschale Vorbereitung. Kein vollständiger Ersatz für eine Einzelfallprüfung vor Ort." },
    { key: "wallbox", label: "Vorbereitung für Wallbox", price: 1180, note: "Grundaufschlag für die typische Vorbereitung. Details können projektabhängig stark schwanken." },
  ],

  // Ausstattungsfelder werden pro Stück oder Menge berechnet.
  //
  // unitPrice = Richtwert pro Einheit innerhalb des Rechners.
  // Diese Werte sind keine Einkaufspreise, sondern interne Kalkulationswerte.
  //
  // requiresOption bedeutet:
  // Das Feld wird nur sichtbar und wirksam, wenn die zugehörige Option aktiv ist.
  // Beispiel: Raumthermostate nur, wenn Fußbodenheizung ausgewählt wurde.
  //
  // Wann ändern?
  // - Wenn du aus echten Projekten merkst, dass bestimmte Ausstattungswerte dauerhaft falsch liegen
  // - Wenn du deine interne Kalkulationslogik anpasst
  roomEquipment: [
    { key: "rooms", label: "Raumanzahl ohne Küche und Badezimmer", unitPrice: 220, note: "Kein echter Einzelartikel, sondern ein Strukturwert für typische Grundausstattung je Raum." },
    { key: "steckdosen", label: "Steckdosen", unitPrice: 98, note: "Interner Kalkulationswert pro zusätzlicher Steckdose im Orientierungspreis." },
    { key: "schalter", label: "Lichtschalter", unitPrice: 82, note: "Interner Kalkulationswert pro Lichtschalter." },
    { key: "netzwerkdosen", label: "Netzwerkdosen", unitPrice: 149, requiresOption: "lan", note: "Nur relevant, wenn LAN / Netzwerk verlegen aktiv ist." },
    { key: "lampenauslaesse", label: "Lampenauslässe", unitPrice: 92, note: "Typischer Richtwert pro Lichtauslass." },
    { key: "rollladenschalter", label: "Rollladenschalter", unitPrice: 136, note: "Eigener Wert wegen zusätzlichem Material- und Leitungsaufwand." },
    { key: "raumthermostate", label: "Raumthermostate für Fußbodenheizung", unitPrice: 210, requiresOption: "fussbodenheizung", note: "Nur relevant bei aktivierter Fußbodenheizung." },
  ],

  // Materiallinien / Markenfaktoren
  // -------------------------------------------------------------------------------------
  // Das ist einer der wichtigsten Bereiche für die Pflege.
  //
  // factor erklärt NICHT den kompletten Endpreis einer Marke im echten Leben,
  // sondern den internen Kalkulationsaufschlag im Rechner.
  //
  // Warum ist Gira teurer als Merten?
  // - weil Gira hier als hochwertigere / premiumorientierte Linie eingeordnet wird
  // - weil sichtbare Ausstattung für viele Kunden eine bewusste Qualitäts- und Designentscheidung ist
  // - weil der Rechner dieses höhere Materialniveau kontrolliert abbilden soll
  //
  // Wichtige Geschäftslogik:
  // Die Faktoren sollen nicht willkürlich sein.
  // Ideal ist folgende Denkweise:
  // 1. Hausmarke / Referenzlinie festlegen
  // 2. Typischen Materialkorb vergleichen
  // 3. Aus dem Unterschied einen moderaten Kalkulationsfaktor ableiten
  //
  // Beispiel für so einen Materialkorb:
  // - 20 Steckdosen
  // - 15 Schalter
  // - 4 Taster
  // - 2 Thermostate
  // - Kleinmaterial-Anteil
  //
  // Wenn Gira im Einkauf / Projektbild klar höher liegt als Merten,
  // darf der Faktor höher sein. Aber bitte kontrolliert und nachvollziehbar.
  //
  // Empfehlung:
  // - Hausmarke / Standardlinie = niedrigster sinnvoller Faktor
  // - Mittelklasse = kleiner Aufschlag
  // - Premium = spürbarer, aber nicht übertriebener Aufschlag
  materialLines: [
    {
      value: "gira",
      label: "Gira",
      badge: "Hausmarke",
      accentClass: "accent-gold",
      factor: 1.12,
      note: "Hier als hochwertige Standardlinie hinterlegt. Spürbarer, aber kontrollierter Aufschlag gegenüber günstigeren Linien.",
      changeWhen: "Nur ändern, wenn sich deine strategische Standardmarke oder das Preisniveau im Einkauf deutlich verändert.",
    },
    {
      value: "merten",
      label: "Merten",
      accentClass: "accent-silver",
      factor: 1.08,
      note: "Etwas günstiger bzw. moderater kalkuliert als Gira. Sinnvoll als guter Mittelweg.",
      changeWhen: "Anpassen, wenn Merten in deiner Praxis näher an Gira heranrückt oder deutlicher darunter liegt.",
    },
    {
      value: "schneider",
      label: "Schneider Electric",
      accentClass: "accent-blue",
      factor: 1.1,
      note: "Leicht gehobene Linie im Rechner. Zwischen Mittelklasse und Premium eingeordnet.",
      changeWhen: "Ändern, wenn dein realer Materialkorb andere Unterschiede zeigt.",
    },
    {
      value: "jung",
      label: "JUNG",
      accentClass: "accent-violet",
      factor: 1.13,
      note: "Im Rechner leicht oberhalb von Gira eingeordnet. Eher design- und anspruchsorientiert kalkuliert.",
      changeWhen: "Nur erhöhen, wenn diese Linie in deiner Praxis wirklich klar teurer verkauft wird.",
    },
    {
      value: "buschjaeger",
      label: "Busch-Jaeger",
      accentClass: "accent-green",
      factor: 1.09,
      note: "Moderater Aufschlag oberhalb günstiger Basislinien.",
      changeWhen: "Feinjustieren, wenn echte Angebotsvergleiche eine andere Einordnung zeigen.",
    },
  ],

  // Standardwerte bestimmen, womit der Rechner vorgefüllt startet.
  //
  // Diese Werte beeinflussen NICHT die eigentliche Preislogik,
  // sondern nur den ersten Eindruck und die vorausgefüllte Bedienung.
  //
  // Empfehlung:
  // Werte so wählen, dass ein normaler Privatkunde sofort etwas Brauchbares sieht,
  // ohne von extremen oder leeren Eingaben irritiert zu werden.
  defaults: {
    objectType: "wohnung",
    sqm: "85",
    projectType: "sanierung_altbau",
    rooms: 3,
    steckdosen: 12,
    schalter: 8,
    netzwerkdosen: 2,
    lampenauslaesse: 6,
    rollladenschalter: 0,
    raumthermostate: 0,
    brand: "gira",
    options: {
      uv: false,
      zaehlerschrank: false,
      lan: false,
      aussenbereich: false,
      kueche: false,
      bad: false,
      fussbodenheizung: false,
      waermepumpe: false,
      wallbox: false,
    },
    fileName: "",
    name: "",
    phone: "",
    email: "",
    zip: "",
    message: "",
  },

  // Preislogik-Grundwerte
  // -------------------------------------------------------------------------------------
  // range:
  // Wie breit der angezeigte Preisbereich um den Mittelwert ist.
  // Beispiel 0.14 = ca. +/- 14 %
  //
  // laborShare und materialShare:
  // Diese Werte beeinflussen aktuell vor allem die Darstellung / Aufteilung im Ergebnis.
  // Sie sind keine separate zweite Preisformel, sondern dienen der Einordnung.
  //
  // Wichtige Regel:
  // laborShare + materialShare müssen hier nicht exakt 1.00 ergeben,
  // wenn bewusst noch ein Rest für Sonstiges / Puffer mitgedacht wird.
  // Wenn du aber eine sehr klare Aufteilung willst, kannst du sie näher an 1.00 bringen.
  priceLogic: {
    range: 0.14,
    laborShare: 0.56,
    materialShare: 0.31,
    notes: {
      range: "Steuert die Breite des ausgegebenen Preisrahmens. Höher = vorsichtiger, niedriger = präziser wirkend.",
      laborShare: "Anteil für Arbeitsleistung in der Ergebnisdarstellung.",
      materialShare: "Anteil für Material in der Ergebnisdarstellung.",
    },
  },
};
