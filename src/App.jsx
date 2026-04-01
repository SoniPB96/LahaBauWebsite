import React, { useState } from 'react';
import { Header, Footer } from './components/ui';
import {
  HeroSection,
  ServicesSection,
  TrustSection,
  BegleitungSection,
  RequestSection,
} from './components/sections';
import './styles.css';

function App() {
  const [activeSection, setActiveSection] = useState('start');

  const scrollToSection = (key) => {
    setActiveSection(key);
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <TrustSection />
        <BegleitungSection scrollToSection={scrollToSection} />
        <RequestSection />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
