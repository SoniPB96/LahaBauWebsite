import React, { useState } from 'react';

function EstimatorCard({ onOpenCalculator }) {
  const [mode, setMode] = useState('multi');

  return (
    <div className="estimator-card">
      <div className="estimator-header">
        <span className="estimator-label">DIGITALE ERSTEINSCHÄTZUNG</span>
        <h3>Erste Kosteneinschätzung Elektrik</h3>
      </div>

      <div className="estimator-example">
        <div className="example-params">
          <span>BEISPIEL: WOHNUNG, 85 M²</span>
          <span>SANIERUNG / ALTBAU</span>
        </div>
        <div className="example-price">8.239 € – 10.922 €</div>
        <p className="example-note">Realistische Preisspanne als erste Orientierung.</p>
      </div>

      <div className="estimator-modes">
        <button 
          className={mode === 'multi' ? 'active' : ''}
          onClick={() => setMode('multi')}
        >
          Mehrstufige Eingabe
        </button>
        <button 
          className={mode === 'fixed' ? 'active' : ''}
          onClick={() => setMode('fixed')}
        >
          Richtpreis statt Festpreis
        </button>
      </div>

      <button 
        className="estimator-open"
        onClick={onOpenCalculator}
      >
        Rechner öffnen
      </button>
    </div>
  );
}

export default EstimatorCard;
