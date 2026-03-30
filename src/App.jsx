import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Home,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Upload,
  UserCheck,
  Wrench,
  Zap,
} from "lucide-react";
import "./styles.css";

const STORAGE_KEY = "laha-kalkulator-session";

const priceConfig = {
  disclaimer:
    "Die Berechnung dient ausschließlich als unverbindliche Kostenschätzung. Ein verbindliches Angebot ist erst nach Sichtung der Unterlagen und Prüfung vor Ort möglich.",
  projectBase: {
    neuinstallation: 2400,
    sanierung: 1600,
    erweiterung: 750,
    unterverteilung: 1350,
    zaehlerschrank: 2800,
  },
  sqm: {
    neuinstallation: 72,
    sanierung: 46,
    erweiterung: 20,
    unterverteilung: 0,
    zaehlerschrank: 0,
  },
  components: {
    steckdosen: 98,
    schalter: 82,
    netzwerkdosen: 149,
    lampenauslaesse: 92,
    rollladenschalter: 136,
    taster: 86,
  },
  options: {
    fi: 450,
    uv: 1450,
    sicherungskasten: 2550,
    lan: 820,
    aussenbereich: 990,
    kueche: 1350,
    bad: 1050,
    waermepumpe: 920,
    wallbox: 1180,
  },
  brandFactor: {
    standard: 1,
    gira: 1.12,
    merten: 1.08,
    schneider: 1.1,
    jung: 1.13,
  },
  qualityFactor: {
    einfach: 0.93,
    standard: 1,
    hochwertig: 1.18,
  },
  objectFactor: {
    wohnung: 1,
    einfamilienhaus: 1.05,
    mehrfamilienhaus: 1.03,
    gewerbe: 1.12,
  },
  laborShare: 0.56,
  materialShare: 0.31,
  extraShare: 0.13,
  range: 0.14,
};

const defaultForm = {
  objectType: "wohnung",
  sqm: "",
  projectType: "sanierung",
  steckdosen: 12,
  schalter: 8,
  netzwerkdosen: 2,
  lampenauslaesse: 6,
  rollladenschalter: 0,
  taster: 0,
  brand: "standard",
  quality: "standard",
  options: {
    fi: false,
    uv: false,
    sicherungskasten: false,
    lan: false,
    aussenbereich: false,
    kueche: false,
    bad: false,
    waermepumpe: false,
    wallbox: false,
  },
  name: "",
  phone: "",
  email: "",
  zip: "",
  message: "",
  fileName: "",
};

const wizardSteps = [
  { id: 1, title: "Objekt", short: "Objekt" },
  { id: 2, title: "Projektart", short: "Projekt" },
  { id: 3, title: "Ausstattung", short: "Ausstattung" },
  { id: 4, title: "Zusatzoptionen", short: "Optionen" },
  { id: 5, title: "Programm", short: "Material" },
  { id: 6, title: "Ergebnis", short: "Ergebnis" },
  { id: 7, title: "Anfrage", short: "Anfrage" },
];

const services = [
  {
    icon: <Zap size={22} />,
    title: "Elektroinstallation",
    text: "Neuinstallation, Modernisierung und strukturierte Elektroarbeiten für Wohnung, Haus und kleine Gewerbeeinheiten.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Unterverteilungen & Sicherungstechnik",
    text: "Erweiterung, Erneuerung und sinnvolle Anpassung von Unterverteilungen und Schutztechnik.",
  },
  {
    icon: <Sun size={22} />,
    title: "Beleuchtung",
    text: "Innen- und Außenbeleuchtung mit sauberer Leitungsführung und passender Schaltlogik.",
  },
  {
    icon: <Network size={22} />,
    title: "Netzwerk & Datenleitungen",
    text: "Strukturierte Verkabelung für Homeoffice, Medienpunkte und moderne Haustechnik.",
  },
  {
    icon: <Wrench size={22} />,
    title: "Fehlersuche & Reparaturen",
    text: "Systematische Fehlersuche und nachvollziehbare Reparaturlösungen ohne unnötige Zusatzarbeiten.",
  },
  {
    icon: <Calculator size={22} />,
    title: "Digitale Kostenschätzung",
    text: "Mehrstufige Ersteinschätzung mit Preisspanne, Upload-Möglichkeit und direkter Anfrageoption.",
  },
];

const faqs = [
  {
    q: "Ist die Kostenschätzung verbindlich?",
    a: "Nein. Die Ausgabe ist ausschließlich eine unverbindliche Orientierung. Ein verbindliches Angebot wird erst nach Prüfung der tatsächlichen Gegebenheiten erstellt.",
  },
  {
    q: "Kann ich einen Grundriss hochladen?",
    a: "Ja. PDF, JPG und PNG können mitgesendet werden. Die Datei dient der späteren Sichtung und nicht einer automatischen Planprüfung.",
  },
  {
    q: "Warum wird eine Preisspanne und kein Festpreis angezeigt?",
    a: "Weil Leitungswege, Wandaufbau, Zustand der bestehenden Anlage, Verteilertechnik und Materialwünsche den tatsächlichen Aufwand verändern können.",
  },
  {
    q: "Für welche Projekte ist der Rechner geeignet?",
    a: "Vor allem für Privatkunden, Wohnungssanierungen, Hausmodernisierungen, Erweiterungen, Unterverteilungen und vorbereitende Kalkulationen.",
  },
  {
    q: "Was passiert nach meiner Anfrage?",
    a: "Die Angaben werden gesichtet. Danach kann auf Basis des Plans und der Eckdaten eine genauere Einschätzung oder ein Termin zur Prüfung vor Ort erfolgen.",
  },
  {
    q: "Kann ich auch ohne Rechner direkt anfragen?",
    a: "Ja. Über das Kontaktformular kann jederzeit eine unverbindliche Anfrage gestellt werden.",
  },
];

const references = [
  {
    title: "Wohnungssanierung",
    text: "Platzhalter für Referenzbild und Kurzbeschreibung einer modernisierten Wohneinheit mit neuen Stromkreisen, Steckdosen und Schalterprogramm.",
  },
  {
    title: "Einfamilienhaus",
    text: "Platzhalter für Referenzbild und Beschreibung einer Installation mit Unterverteilung, Netzwerkpunkten und Beleuchtung.",
  },
  {
    title: "Küche & Bad",
    text: "Platzhalter für Referenzbild und Beschreibung einer gezielten Modernisierung im sensiblen Innenausbau.",
  },
];

function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function estimatePrice(data) {
  const base = priceConfig.projectBase[data.projectType] || 0;
  const sqmPart = (priceConfig.sqm[data.projectType] || 0) * (Number(data.sqm) || 0);

  const componentSum =
    (Number(data.steckdosen) || 0) * priceConfig.components.steckdosen +
    (Number(data.schalter) || 0) * priceConfig.components.schalter +
    (Number(data.netzwerkdosen) || 0) * priceConfig.components.netzwerkdosen +
    (Number(data.lampenauslaesse) || 0) * priceConfig.components.lampenauslaesse +
    (Number(data.rollladenschalter) || 0) * priceConfig.components.rollladenschalter +
    (Number(data.taster) || 0) * priceConfig.components.taster;

  const optionSum = Object.entries(data.options || {}).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (priceConfig.options[key] || 0);
  }, 0);

  const subtotal = base + sqmPart + componentSum + optionSum;
  const brandFactor = priceConfig.brandFactor[data.brand] || 1;
  const qualityFactor = priceConfig.qualityFactor[data.quality] || 1;
  const objectFactor = priceConfig.objectFactor[data.objectType] || 1;

  const total = subtotal * brandFactor * qualityFactor * objectFactor;
  const low = Math.round(total * (1 - priceConfig.range));
  const high = Math.round(total * (1 + priceConfig.range));

  return {
    total,
    low,
    high,
    labor: Math.round(total * priceConfig.laborShare),
    material: Math.round(total * priceConfig.materialShare),
    extras: Math.round(total * priceConfig.extraShare),
  };
}

function SectionTitle({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`section-title ${align === "center" ? "centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function TooltipLabel({ label, tip }) {
  return (
    <div className="label-row">
      <span>{label}</span>
      <span className="hint">
        <CircleHelp size={12} /> {tip}
      </span>
    </div>
  );
}

function StepChip({ item, current }) {
  const active = item.id === current;
  const done = item.id < current;
  return (
    <div className={`step-chip ${active ? "active" : ""} ${done ? "done" : ""}`}>
      {item.short}
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Button({ children, onClick, secondary = false, outline = false, className = "", type = "button", disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${secondary ? "btn-secondary" : ""} ${outline ? "btn-outline" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm({
          ...defaultForm,
          ...parsed,
          options: { ...defaultForm.options, ...(parsed.options || {}) },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      // ignore
    }
  }, [form]);

  const result = useMemo(() => estimatePrice(form), [form]);
  const progress = (step / wizardSteps.length) * 100;

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateOption = (key, value) =>
    setForm((prev) => ({ ...prev, options: { ...prev.options, [key]: value } }));

  const selectedOptions = Object.entries(form.options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key);

  const submitEstimator = () => {
    setSubmitted(true);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <button className="brand" onClick={() => setActiveTab("home")}>
            <div className="brand-name">Laha</div>
            <div className="brand-sub">Baudienstleistungen</div>
          </button>

          <nav className="nav desktop-only">
            <button onClick={() => setActiveTab("home")}>Start</button>
            <button onClick={() => setActiveTab("rechner")}>Kostenschätzer</button>
            <button onClick={() => setActiveTab("kontakt")}>Kontakt</button>
          </nav>

          <Button onClick={() => setActiveTab("kontakt")}>Anfrage stellen</Button>
        </div>
      </header>

      {activeTab === "home" && (
        <main>
          <section className="hero">
            <div className="hero-glow" />
            <div className="container hero-grid">
              <div className="hero-copy">
                <div className="badge-row">
                  <span className="badge">Elektrounternehmen in Deutschland</span>
                  <span className="badge muted">Ort / Region als Platzhalter</span>
                </div>

                <h1>
                  Elektroarbeiten mit klarer Kommunikation, sauberer Ausführung und realistischer
                  Ersteinschätzung.
                </h1>
                <p>
                  Laha Baudienstleistungen unterstützt Privatkunden bei Sanierung, Modernisierung
                  und Erweiterung elektrischer Anlagen. Der Schwerpunkt liegt auf nachvollziehbaren
                  Lösungen, sauberer Umsetzung und einer seriösen, unverbindlichen Kostenschätzung.
                </p>

                <div className="button-row">
                  <Button onClick={() => setActiveTab("rechner")}>Kostenschätzung starten</Button>
                  <Button outline onClick={() => setActiveTab("kontakt")}>
                    Unverbindlich anfragen
                  </Button>
                </div>

                <div className="mini-grid">
                  {[
                    { icon: <UserCheck size={16} />, text: "Zuverlässige Abstimmung" },
                    { icon: <CheckCircle2 size={16} />, text: "Saubere Ausführung" },
                    { icon: <ShieldCheck size={16} />, text: "Transparente Einschätzung" },
                    { icon: <Clock3 size={16} />, text: "Schnelle Erstaufnahme" },
                  ].map((item) => (
                    <div key={item.text} className="mini-card">
                      <div className="mini-icon">{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <Card>
                  <div className="card-pad">
                    <p className="eyebrow">Digitale Ersteinschätzung</p>
                    <h3 className="card-title">Elektro-Kostenschätzer</h3>

                    <div className="result-box">
                      <div className="result-top">
                        <span>Beispiel: Wohnung, 85 m²</span>
                        <span>Sanierung</span>
                      </div>
                      <div className="hero-price">{formatEUR(6900)} – {formatEUR(9800)}</div>
                      <p>
                        Preisspanne auf Basis von Fläche, Ausstattung, Zusatzoptionen und
                        Materiallinie. Kein verbindliches Angebot.
                      </p>
                    </div>

                    <div className="split-grid">
                      <div className="soft-box">Mehrstufige Eingabe</div>
                      <div className="soft-box">Upload von Grundriss möglich</div>
                    </div>

                    <Button className="full" onClick={() => setActiveTab("rechner")}>
                      Rechner öffnen <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          <section className="contact-strip">
            <div className="container contact-strip-grid">
              {[
                "Telefon: Platzhalter eintragen",
                "E-Mail: Platzhalter eintragen",
                "Einsatzgebiet: Ort / Region eintragen",
              ].map((item) => (
                <div key={item} className="soft-box">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="container">
              <SectionTitle
                eyebrow="Leistungen"
                title="Leistungsbereiche mit klarem Fokus auf Privatkunden"
                text="Von der einzelnen Erweiterung bis zur strukturierten Sanierung ganzer Wohneinheiten: Die Leistungen sind so formuliert, wie sie auf einer seriösen Firmenwebsite eines Elektrounternehmens in Deutschland erwartet werden."
              />
              <div className="services-grid">
                {services.map((service) => (
                  <Card key={service.title}>
                    <div className="card-pad">
                      <div className="service-icon">{service.icon}</div>
                      <h3 className="card-title">{service.title}</h3>
                      <p className="body-text">{service.text}</p>
                      <button className="text-link" onClick={() => setActiveTab("kontakt")}>
                        Jetzt anfragen <ChevronRight size={16} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="section alt">
            <div className="container about-grid">
              <SectionTitle
                eyebrow="Über uns"
                title="Seriös, pragmatisch und auf saubere Ausführung ausgerichtet"
                text="Laha Baudienstleistungen steht für nachvollziehbare Elektroarbeiten, klare Kommunikation und eine strukturierte Herangehensweise. Die Inhalte sind so aufgebaut, dass Firmenbeschreibung, Ort, Kontaktdaten, Qualifikationen und Partnerhinweise später gezielt ergänzt werden können."
              />
              <div className="value-grid">
                {[
                  "Saubere Projektabstimmung",
                  "Transparente Kommunikation",
                  "Realistische Ersteinschätzung",
                  "Geeignet für lokale Vertrauensbildung",
                ].map((item) => (
                  <div key={item} className="soft-box strong">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <SectionTitle
                eyebrow="Referenzen"
                title="Projektbeispiele und Platzhalter für Referenzbilder"
                text="Dieser Bereich ist auf Vertrauen ausgelegt. Referenzbilder, Ortsangaben und kurze Projektbeschreibungen können später direkt ersetzt werden."
              />
              <div className="services-grid">
                {references.map((ref) => (
                  <Card key={ref.title}>
                    <div className="image-placeholder">Platzhalter für Referenzbild</div>
                    <div className="card-pad">
                      <div className="pill">
                        <Star size={12} /> Projektbeispiel
                      </div>
                      <h3 className="card-title">{ref.title}</h3>
                      <p className="body-text">{ref.text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="section alt">
            <div className="container">
              <SectionTitle
                eyebrow="FAQ"
                title="Typische Fragen von Privatkunden"
                text="Gerade beim Online-Rechner ist es wichtig, den Unterschied zwischen einer digitalen Orientierung und einem verbindlichen Angebot klar zu benennen."
              />
              <div className="faq-grid">
                {faqs.map((item) => (
                  <Card key={item.q}>
                    <div className="card-pad">
                      <h3 className="faq-question">{item.q}</h3>
                      <p className="body-text">{item.a}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "rechner" && (
        <main className="section">
          <div className="container calculator-page">
            <div className="calculator-head">
              <div>
                <p className="eyebrow">Kostenschätzer</p>
                <h1 className="page-title">Unverbindliche Kostenschätzung für Elektroarbeiten</h1>
                <p className="page-text">
                  Der Rechner dient ausschließlich als erste Orientierung. Er ersetzt kein Aufmaß,
                  keine technische Prüfung und kein verbindliches Angebot.
                </p>
              </div>
              <span className="badge">Unverbindliche Preisspanne</span>
            </div>

            {!submitted ? (
              <Card className="large-card">
                <div className="card-pad">
                  <div className="wizard-top">
                    <div className="wizard-meta">
                      <span>Schritt {step} von {wizardSteps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="chip-row">
                      {wizardSteps.map((item) => (
                        <StepChip key={item.id} item={item} current={step} />
                      ))}
                    </div>
                  </div>

                  <div className="wizard-layout">
                    <div>
                      {step === 1 && (
                        <div className="form-grid two">
                          <div className="stack">
                            <h2 className="sub-title">Objekt und Fläche</h2>
                            <div>
                              <TooltipLabel label="Objektart" tip="Beeinflusst den Kalkulationsfaktor" />
                              <div className="choice-grid">
                                {[
                                  ["wohnung", "Wohnung", <Home size={16} />],
                                  ["einfamilienhaus", "Einfamilienhaus", <Home size={16} />],
                                  ["mehrfamilienhaus", "Einheit im Mehrfamilienhaus", <Building2 size={16} />],
                                  ["gewerbe", "Kleingewerbe", <Building2 size={16} />],
                                ].map(([value, label, icon]) => (
                                  <button
                                    key={value}
                                    className={`choice ${form.objectType === value ? "active" : ""}`}
                                    onClick={() => updateField("objectType", value)}
                                  >
                                    <div>{icon}</div>
                                    <div>{label}</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <TooltipLabel label="Wohnfläche / Nutzfläche in m²" tip="Dient als grober Orientierungswert" />
                              <input
                                type="number"
                                className="input"
                                placeholder="z. B. 85"
                                value={form.sqm}
                                onChange={(e) => updateField("sqm", e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="soft-box strong column">
                            <h3 className="faq-question">Wichtig zu wissen</h3>
                            <p className="body-text">
                              Die Fläche ist nur ein Richtwert. Zustand der Bestandsanlage,
                              Wandaufbau, Leitungswege und Sonderwünsche können die spätere
                              Kalkulation deutlich verändern.
                            </p>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="stack">
                          <h2 className="sub-title">Projektart auswählen</h2>
                          <div className="choice-grid choice-grid-wide">
                            {[
                              ["neuinstallation", "Komplette Neuinstallation"],
                              ["sanierung", "Sanierung / Teilerneuerung"],
                              ["erweiterung", "Erweiterung / einzelne Räume"],
                              ["unterverteilung", "Neue Unterverteilung"],
                              ["zaehlerschrank", "Zählerschrank / Verteilerarbeiten"],
                            ].map(([value, label]) => (
                              <button
                                key={value}
                                className={`choice ${form.projectType === value ? "active" : ""}`}
                                onClick={() => updateField("projectType", value)}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="stack">
                          <h2 className="sub-title">Ausstattung eingeben</h2>
                          <div className="form-grid three">
                            {[
                              ["steckdosen", "Steckdosen", "Einzel- und Mehrfachkombinationen grob zusammengefasst"],
                              ["schalter", "Lichtschalter", "Einfacher Richtwert für übliche Schaltstellen"],
                              ["netzwerkdosen", "Netzwerkdosen", "Für Daten- und Medienpunkte"],
                              ["lampenauslaesse", "Lampenauslässe", "Decken- oder Wandauslass"],
                              ["rollladenschalter", "Rollladenschalter", "Motorisierte Beschattung grob angeben"],
                              ["taster", "Taster / Wechsel / Kreuz", "Erweiterte Schaltstellen vereinfacht zusammengefasst"],
                            ].map(([key, label, tip]) => (
                              <div key={key}>
                                <TooltipLabel label={label} tip={tip} />
                                <input
                                  type="number"
                                  className="input"
                                  value={form[key]}
                                  onChange={(e) => updateField(key, e.target.value)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className="stack">
                          <h2 className="sub-title">Zusatzoptionen</h2>
                          <p className="body-text">
                            Diese Auswahl ergänzt die Kalkulation um typische Zusatzleistungen.
                            Auch hier handelt es sich nur um Richtwerte.
                          </p>
                          <div className="choice-grid choice-grid-wide">
                            {[
                              ["fi", "FI / RCD-Erweiterung"],
                              ["uv", "Neue Unterverteilung"],
                              ["sicherungskasten", "Sicherungskasten ersetzen"],
                              ["lan", "LAN / Netzwerk mit verlegen"],
                              ["aussenbereich", "Außenbereich"],
                              ["kueche", "Küche aufwerten"],
                              ["bad", "Bad modernisieren"],
                              ["waermepumpe", "Vorbereitung Wärmepumpe"],
                              ["wallbox", "Vorbereitung Wallbox"],
                            ].map(([key, label]) => (
                              <button
                                key={key}
                                className={`choice ${form.options[key] ? "active" : ""}`}
                                onClick={() => updateOption(key, !form.options[key])}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="form-grid two">
                          <div className="stack">
                            <h2 className="sub-title">Programm und Qualitätsniveau</h2>
                            <div>
                              <TooltipLabel label="Schalterprogramm / Materiallinie" tip="Beeinflusst den Materialfaktor" />
                              <div className="choice-grid">
                                {["standard", "gira", "merten", "schneider", "jung"].map((brand) => (
                                  <button
                                    key={brand}
                                    className={`choice ${form.brand === brand ? "active" : ""}`}
                                    onClick={() => updateField("brand", brand)}
                                  >
                                    {brand === "schneider" ? "Schneider Electric" : brand}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <TooltipLabel label="Qualitätsstufe" tip="Beeinflusst die Gesamtspanne" />
                              <div className="choice-grid three-col">
                                {[
                                  ["einfach", "Einfach"],
                                  ["standard", "Standard"],
                                  ["hochwertig", "Hochwertig"],
                                ].map(([value, label]) => (
                                  <button
                                    key={value}
                                    className={`choice ${form.quality === value ? "active" : ""}`}
                                    onClick={() => updateField("quality", value)}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="soft-box strong column">
                            <h3 className="faq-question">Bearbeitbare Preislogik</h3>
                            <p className="body-text">
                              Die gesamte Kalkulation ist oben im Code in einer sauberen
                              Konfiguration hinterlegt. Grundpreise, Quadratmeterwerte,
                              Komponenten, Optionen und Faktoren lassen sich später zentral
                              anpassen.
                            </p>
                          </div>
                        </div>
                      )}

                      {step === 6 && (
                        <div className="form-grid two result-layout">
                          <div className="result-box big">
                            <p className="eyebrow">Ergebnis</p>
                            <div className="hero-price">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                            <p className="body-text">{priceConfig.disclaimer}</p>
                            <div className="split-grid">
                              <div className="soft-box">
                                <div className="meta-label">Material</div>
                                <div className="meta-value">{formatEUR(result.material)}</div>
                              </div>
                              <div className="soft-box">
                                <div className="meta-label">Arbeitszeit</div>
                                <div className="meta-value">{formatEUR(result.labor)}</div>
                              </div>
                              <div className="soft-box">
                                <div className="meta-label">Zusatzoptionen</div>
                                <div className="meta-value">{formatEUR(result.extras)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="soft-box strong column">
                            <h3 className="faq-question">Warum nur eine Spanne?</h3>
                            <ul className="bullet-list">
                              <li>tatsächlicher Zustand der Bestandsanlage</li>
                              <li>Leitungswege und bauliche Gegebenheiten</li>
                              <li>Verteilertechnik und Schutzmaßnahmen</li>
                              <li>gewünschte Materiallinie und Ausstattungsniveau</li>
                              <li>zusätzliche Arbeiten vor Ort</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {step === 7 && (
                        <div className="form-grid two">
                          <div className="stack">
                            <h2 className="sub-title">Anfrage zur Kostenschätzung senden</h2>
                            <p className="body-text">
                              Alle Angaben dienen ausschließlich der ersten Einordnung. Der
                              hochgeladene Plan wird nur zur Sichtung mitgesendet.
                            </p>

                            <div className="form-grid two">
                              <input className="input" placeholder="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
                              <input className="input" placeholder="Telefon" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                              <input className="input" placeholder="E-Mail" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                              <input className="input" placeholder="PLZ / Ort" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
                              <div className="full-span">
                                <TooltipLabel label="Grundriss / Umrissplan" tip="PDF, JPG oder PNG" />
                                <label className="upload-box">
                                  <Upload size={16} />
                                  <span>{form.fileName || "Datei auswählen"}</span>
                                  <input
                                    hidden
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => updateField("fileName", e.target.files?.[0]?.name || "")}
                                  />
                                </label>
                              </div>
                              <div className="full-span">
                                <textarea
                                  className="input textarea"
                                  placeholder="Zusätzliche Angaben zum Projekt"
                                  value={form.message}
                                  onChange={(e) => updateField("message", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="soft-box">
                              Mit dem Absenden wird ausschließlich eine unverbindliche Anfrage
                              gestellt. Es entsteht kein verbindliches Angebot und keine
                              automatische Auftragsannahme.
                            </div>

                            <Button onClick={submitEstimator}>Kostenschätzung anfragen</Button>
                          </div>

                          <div className="soft-box strong column">
                            <h3 className="faq-question">Zusammenfassung</h3>
                            <div className="summary-list">
                              <div>Objekt: <span>{form.objectType}</span></div>
                              <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                              <div>Projektart: <span>{form.projectType}</span></div>
                              <div>Programm: <span>{form.brand}</span></div>
                              <div>Qualität: <span>{form.quality}</span></div>
                              <div>Optionen: <span>{selectedOptions.length ? selectedOptions.join(", ") : "keine"}</span></div>
                              <div>Richtpreis: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <aside className="sidebar-card">
                      <div className="eyebrow">Kurzübersicht</div>
                      <div className="summary-list compact">
                        <div>Objekt: <span>{form.objectType}</span></div>
                        <div>Fläche: <span>{form.sqm || "—"} m²</span></div>
                        <div>Projekt: <span>{form.projectType}</span></div>
                        <div>Programm: <span>{form.brand}</span></div>
                        <div>Spanne: <span>{formatEUR(result.low)} – {formatEUR(result.high)}</span></div>
                      </div>
                      <div className="soft-box small">
                        Eingaben werden innerhalb der Sitzung zwischengespeichert.
                      </div>
                    </aside>
                  </div>

                  <div className="wizard-actions">
                    <Button outline disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
                      Zurück
                    </Button>
                    {step < wizardSteps.length && (
                      <Button onClick={() => setStep((s) => Math.min(wizardSteps.length, s + 1))}>
                        Weiter
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="large-card">
                <div className="card-pad center-content">
                  <div className="success-icon"><CheckCircle2 size={34} /></div>
                  <h2 className="page-title">Anfrage erfolgreich vorgemerkt</h2>
                  <p className="page-text max">
                    Die Eingaben wurden als unverbindliche Kostenschätzungs-Anfrage erfasst. In
                    einer echten Integration würde hier die Übermittlung an Formular, E-Mail oder
                    CRM erfolgen.
                  </p>
                  <div className="split-grid">
                    <div className="soft-box strong column">
                      <div className="meta-label">Ermittelte Spanne</div>
                      <div className="meta-value">{formatEUR(result.low)} – {formatEUR(result.high)}</div>
                    </div>
                    <div className="soft-box strong column">
                      <div className="meta-label">Nächster Schritt</div>
                      <div className="body-text">Sichtung der Unterlagen und Rückmeldung zur genaueren Einordnung oder Terminabstimmung.</div>
                    </div>
                  </div>
                  <div className="button-row center">
                    <Button onClick={() => setActiveTab("home")}>Zur Startseite</Button>
                    <Button outline onClick={() => setActiveTab("kontakt")}>Kontakt öffnen</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      )}

      {activeTab === "kontakt" && (
        <main className="section">
          <div className="container contact-page">
            <SectionTitle
              eyebrow="Kontakt"
              title="Unverbindlich anfragen"
              text="Die Formularstruktur ist bewusst klar gehalten und auf Anfragen aus dem Privatkundenbereich ausgerichtet. Telefonnummer, E-Mail, Ort und Pflichttexte können später direkt ersetzt oder ergänzt werden."
            />

            <div className="form-grid two">
              <Card>
                <div className="card-pad stack">
                  <div className="contact-item"><Phone size={16} /> Telefonnummer eintragen</div>
                  <div className="contact-item"><Mail size={16} /> E-Mail eintragen</div>
                  <div className="contact-item"><MapPin size={16} /> Ort / Einzugsgebiet eintragen</div>
                  <div className="soft-box">
                    Platzhalter für Öffnungszeiten, Rückrufzeiten oder regionale Einsatzbereiche.
                  </div>
                </div>
              </Card>

              <Card>
                <div className="card-pad stack">
                  <input className="input" placeholder="Name" />
                  <div className="form-grid two">
                    <input className="input" placeholder="E-Mail" />
                    <input className="input" placeholder="Telefon" />
                  </div>
                  <input className="input" placeholder="PLZ / Ort" />
                  <textarea className="input textarea" placeholder="Kurze Beschreibung Ihres Projekts" />
                  <div className="soft-box">
                    Mit dem Absenden wird eine unverbindliche Anfrage gestellt. DSGVO-Hinweis,
                    Impressum und Pflichttexte können im finalen Ausbau ergänzt werden.
                  </div>
                  <Button>Nachricht senden</Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      )}

      <button className="sticky-contact" onClick={() => setActiveTab("kontakt")}>
        Kontakt
      </button>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title">Laha Baudienstleistungen</div>
            <div>Website-Entwurf mit integriertem Kostenschätzer und klarer Nutzerführung.</div>
          </div>
          <div className="footer-links">
            <button onClick={() => setActiveTab("home")}>Start</button>
            <button onClick={() => setActiveTab("rechner")}>Kostenschätzer</button>
            <button onClick={() => setActiveTab("kontakt")}>Kontakt</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
