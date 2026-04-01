# Struktur-Guide: Warum diese Organisation?

## Probleme der alten Struktur

1. **Alles in einer Datei**: 410 Zeilen Code in App.jsx
2. **Duplizierter Code**: Logo-Komponente mehrfach definiert
3. **Schwer wartbar**: Änderungen an einer Section erfordern Scrollen durch große Datei
4. **Keine Wiederverwendbarkeit**: Komponenten nicht isoliert nutzbar
5. **Unübersichtlich**: Sections, UI, und Business-Logic vermischt

## Neue Struktur: Vorteile

### 1. Sections (components/sections/)
**Zweck**: Eigenständige Bereiche der Website

```
HeroSection.jsx       → Hero mit CTA und Rechner-Vorschau
ServicesSection.jsx   → Leistungsübersicht mit Icons
TrustSection.jsx      → Testimonials und Social Proof
BegleitungSection.jsx → Baubegleitung-Angebot
RequestSection.jsx    → Kontaktmöglichkeiten
```

**Warum getrennt?**
- Jede Section kann unabhängig entwickelt werden
- Einfaches Testen einzelner Bereiche
- Reihenfolge in App.jsx änderbar
- Wiederverwendbar in anderen Projekten

### 2. UI (components/ui/)
**Zweck**: Wiederverwendbare Interface-Elemente

```
Header.jsx → Navigation, wird auf jeder Seite gebraucht
Footer.jsx → Footer mit Links, wird auf jeder Seite gebraucht
Logo.jsx   → Logo-Komponente (Header + Footer nutzen es)
```

**Warum getrennt?**
- Logo wird in Header UND Footer genutzt → DRY Prinzip
- Header/Footer könnten Layout-Komponenten werden
- Einfach um weitere UI-Elemente erweiterbar (Button, Card, etc.)

### 3. Calculator (components/calculator/)
**Zweck**: Rechner-spezifische Komponenten

```
EstimatorCard.jsx → Rechner-Vorschau im Hero
```

**Erweiterbar mit:**
- CalculatorModal.jsx → Vollständiger Rechner
- CalculatorSteps.jsx → Mehrstufige Eingabe
- PriceEstimate.jsx → Ergebnis-Anzeige

**Warum getrennt?**
- Calculator ist eigenes Feature-Modul
- Kann später in separates Package ausgelagert werden
- Klare Trennung: UI vs. Business Logic vs. Calculator

### 4. Config (config/)
**Zweck**: Content und Konfiguration zentral verwalten

```
siteConfig.js → Alle Texte, Links, Navigation
```

**Erweiterbar mit:**
- calculatorConfig.js → Rechner-Einstellungen
- pricing.js → Preislisten und Faktoren
- routes.js → Routing-Konfiguration

**Warum getrennt?**
- Content-Änderungen ohne Code-Änderungen
- Könnte später aus CMS kommen
- Übersetzungen einfach möglich
- Mehrere Konfigurationen (dev/prod) möglich

## Import-Struktur

### Vorher (schlecht):
```jsx
import Header from './components/ui/Header';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import TrustSection from './components/sections/TrustSection';
import BegleitungSection from './components/sections/BegleitungSection';
import RequestSection from './components/sections/RequestSection';
import Footer from './components/ui/Footer';
```

### Nachher (gut):
```jsx
import { Header, Footer } from './components/ui';
import {
  HeroSection,
  ServicesSection,
  TrustSection,
  BegleitungSection,
  RequestSection,
} from './components/sections';
```

**Warum besser?**
- Weniger Import-Zeilen
- Gruppiert nach Typ
- Übersichtlicher
- Leichter zu refactoren

## Skalierbarkeit

### Neue Section hinzufügen:
1. Datei erstellen: `src/components/sections/ContactSection.jsx`
2. Export in `src/components/sections/index.js` hinzufügen
3. Import in `App.jsx` erweitern
4. In `<main>` einfügen
5. In `siteConfig.js` Content definieren

**Nur 5 Schritte statt Code in große Datei quetschen**

### Neue UI-Komponente:
1. `src/components/ui/Button.jsx` erstellen
2. Export in `src/components/ui/index.js`
3. Überall importierbar mit `import { Button } from './components/ui'`

### Calculator erweitern:
1. Neue Files in `src/components/calculator/`
2. Eigene Logik in `calculator/`-Ordner
3. Nicht vermischt mit anderen Komponenten

## Best Practices

### DO ✅
- Kleine, fokussierte Komponenten (< 150 Zeilen)
- Ein Export pro Datei
- Klare Benennung (Section/Component/Feature)
- Config für Content, nicht hardcoded
- Index-Files für saubere Imports

### DON'T ❌
- Alles in eine große Datei
- Duplizierter Code (Logo-Beispiel)
- Business Logic in UI-Komponenten
- Hardcoded Texte in JSX
- Tief verschachtelte Ordner (max. 3 Ebenen)

## Performance

### Code-Splitting (später):
```jsx
const HeroSection = lazy(() => import('./components/sections/HeroSection'));
```

Möglich, weil Sections eigenständige Module sind.

### Tree-Shaking:
Ungenutzter Code wird automatisch entfernt, weil Imports explizit sind.

## Fazit

**Alte Struktur**: Monolith → schwer wartbar, nicht skalierbar
**Neue Struktur**: Modular → wartbar, testbar, skalierbar

Die Struktur folgt dem **Single Responsibility Principle**:
- Jede Datei hat einen klaren Zweck
- Jede Komponente macht eine Sache gut
- Jeder Ordner gruppiert verwandte Funktionalität
