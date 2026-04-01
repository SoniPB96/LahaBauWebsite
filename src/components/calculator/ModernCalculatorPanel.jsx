import React, { useState, useMemo } from "react";
import { 
  Home, Building2, ArrowRight, ArrowLeft, Check, 
  Zap, Sparkles, TrendingUp, Info
} from "lucide-react";
import { calculatorConfig } from "../../config/calculatorConfig";
import { 
  estimatePrice, formatEUR, getVisibleComponentFields, 
  isDirectInquiryProject 
} from "./calculatorLogic";
import { 
  getNextStep, getPreviousStep, getStepPosition, 
  getWizardLabelsForFlow 
} from "../../calculator/flow";
import { validateStep } from "../../calculator/validation";

const iconMap = { home: Home, building: Building2 };

function ModernCalculatorPanel({ onOpenRequestPage, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(calculatorConfig.defaults);
  const [stepError, setStepError] = useState("");

  const result = useMemo(() => estimatePrice(form), [form]);
  const skipsCalculator = isDirectInquiryProject(form.projectType);
  const wizardLabels = useMemo(() => getWizardLabelsForFlow(form), [form]);
  const visibleComponentFields = useMemo(() => getVisibleComponentFields(form), [form]);
  const { index: stepIndex, total: totalSteps, sequence } = useMemo(
    () => getStepPosition(step, form), 
    [step, form]
  );
  const progress = Math.round((((stepIndex >= 0 ? stepIndex : 0) + 1) / totalSteps) * 100);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  };

  const updateOption = (key, value) => {
    setForm((prev) => ({ 
      ...prev, 
      options: { ...prev.options, [key]: value } 
    }));
    setStepError("");
  };

  const nextStep = () => {
    const error = validateStep(step, form, { skipsCalculator });
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    const next = getNextStep(step, form);
    if (next !== step) setStep(next);
  };

  const prevStep = () => {
    setStepError("");
    const previous = getPreviousStep(step, form);
    if (previous !== step) setStep(previous);
  };

  return (
    <div className="modern-calculator">
      {/* Header mit Progress */}
      <div className="calc-header">
        <div className="calc-header-top">
          {onClose && step === 1 && (
            <button onClick={onClose} className="calc-close-btn">
              <ArrowLeft size={16} />
              <span>Zurück</span>
            </button>
          )}
          <div className="calc-title">
            <Sparkles size={20} />
            <span>Kosteneinschätzung</span>
          </div>
        </div>

        {/* Progress Bar - Modern */}
        <div className="calc-progress-wrapper">
          <div className="calc-progress-info">
            <span className="calc-progress-text">
              Schritt {stepIndex + 1} von {totalSteps}
            </span>
            <span className="calc-progress-percent">{progress}%</span>
          </div>
          <div className="calc-progress-track">
            <div 
              className="calc-progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators - Minimalistisch */}
        <div className="calc-steps-indicator">
          {wizardLabels.map((label, index) => (
            <div 
              key={label} 
              className={`calc-step-dot ${index === stepIndex ? "active" : ""} ${index < stepIndex ? "done" : ""}`}
            >
              {index < stepIndex && <Check size={12} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="calc-content">
        {/* Step 1: Objektart & Fläche */}
        {step === 1 && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Für welches Objekt planst du die Elektroarbeiten?
            </h2>
            
            <div className="calc-object-grid">
              {calculatorConfig.objectChoices.map((item) => {
                const Icon = iconMap[item.icon] || Home;
                return (
                  <button
                    key={item.value}
                    onClick={() => updateField("objectType", item.value)}
                    className={`calc-object-card ${form.objectType === item.value ? "selected" : ""}`}
                  >
                    <div className="calc-object-icon">
                      <Icon size={28} />
                    </div>
                    <span className="calc-object-label">{item.label}</span>
                    <div className="calc-object-check">
                      <Check size={16} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="calc-input-group">
              <label className="calc-label">
                <span>Wohnfläche / Nutzfläche</span>
                <span className="calc-label-hint">in m²</span>
              </label>
              <div className="calc-input-wrapper">
                <input
                  type="number"
                  className="calc-input"
                  value={form.sqm}
                  onChange={(e) => updateField("sqm", e.target.value)}
                  placeholder="z. B. 85"
                />
                <span className="calc-input-unit">m²</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Projektart */}
        {step === 2 && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Welche Art von Projekt ist geplant?
            </h2>
            
            <div className="calc-project-grid">
              {calculatorConfig.projectChoices.map((item) => (
                <button
                  key={item.value}
                  onClick={() => updateField("projectType", item.value)}
                  className={`calc-project-card ${form.projectType === item.value ? "selected" : ""}`}
                >
                  <div className="calc-project-content">
                    <span className="calc-project-label">{item.label}</span>
                    {item.hint && (
                      <span className="calc-project-hint">{item.hint}</span>
                    )}
                  </div>
                  <div className="calc-project-check">
                    <Check size={18} />
                  </div>
                </button>
              ))}
            </div>

            {skipsCalculator && (
              <div className="calc-info-box">
                <Info size={18} />
                <p>
                  Für dieses Projekt erstellen wir dir gerne ein individuelles Angebot. 
                  Direkt zur Anfrage im nächsten Schritt.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Material-Marke */}
        {step === 3 && !skipsCalculator && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Welche Material-Qualität bevorzugst du?
            </h2>
            
            <div className="calc-brand-grid">
              {calculatorConfig.brandChoices.map((item) => (
                <button
                  key={item.value}
                  onClick={() => updateField("brand", item.value)}
                  className={`calc-brand-card ${form.brand === item.value ? "selected" : ""}`}
                >
                  <div className="calc-brand-header">
                    <span className="calc-brand-label">{item.label}</span>
                    {item.popular && (
                      <span className="calc-brand-badge">
                        <TrendingUp size={12} />
                        Beliebt
                      </span>
                    )}
                  </div>
                  <p className="calc-brand-desc">{item.description}</p>
                  <div className="calc-brand-examples">
                    {item.examples?.map((ex, i) => (
                      <span key={i} className="calc-brand-example">{ex}</span>
                    ))}
                  </div>
                  <div className="calc-brand-check">
                    <Check size={18} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Komponenten */}
        {step === 4 && !skipsCalculator && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Wie viele Komponenten werden benötigt?
            </h2>
            
            <div className="calc-components-list">
              {visibleComponentFields.map((field) => (
                <div key={field.key} className="calc-component-item">
                  <div className="calc-component-info">
                    <span className="calc-component-label">{field.label}</span>
                    {field.hint && (
                      <span className="calc-component-hint">{field.hint}</span>
                    )}
                  </div>
                  <div className="calc-stepper">
                    <button
                      onClick={() => updateField(field.key, Math.max(0, (form[field.key] || 0) - 1))}
                      className="calc-stepper-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="calc-stepper-input"
                      value={form[field.key] || 0}
                      onChange={(e) => updateField(field.key, e.target.value)}
                    />
                    <button
                      onClick={() => updateField(field.key, (form[field.key] || 0) + 1)}
                      className="calc-stepper-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Optionen */}
        {step === 5 && !skipsCalculator && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Zusätzliche Optionen gewünscht?
            </h2>
            
            <div className="calc-options-list">
              {calculatorConfig.options.map((option) => (
                <button
                  key={option.key}
                  onClick={() => updateOption(option.key, !form.options?.[option.key])}
                  className={`calc-option-card ${form.options?.[option.key] ? "selected" : ""}`}
                >
                  <div className="calc-option-content">
                    <div className="calc-option-main">
                      <span className="calc-option-label">{option.label}</span>
                      {option.price && (
                        <span className="calc-option-price">
                          +{formatEUR(option.price)}
                        </span>
                      )}
                    </div>
                    {option.hint && (
                      <span className="calc-option-hint">{option.hint}</span>
                    )}
                  </div>
                  <div className="calc-option-checkbox">
                    {form.options?.[option.key] && <Check size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Zusammenfassung */}
        {step === 6 && (
          <div className="calc-step">
            <h2 className="calc-step-title">Deine Kostenschätzung</h2>
            
            <div className="calc-result-card">
              <div className="calc-result-header">
                <Zap size={24} className="calc-result-icon" />
                <div className="calc-result-main">
                  <span className="calc-result-label">Geschätzte Kosten</span>
                  <div className="calc-result-price">
                    {formatEUR(result.low)} – {formatEUR(result.high)}
                  </div>
                </div>
              </div>

              <div className="calc-result-breakdown">
                <div className="calc-breakdown-item">
                  <span>Material</span>
                  <span>{formatEUR(result.material)}</span>
                </div>
                <div className="calc-breakdown-item">
                  <span>Arbeitszeit</span>
                  <span>{formatEUR(result.labor)}</span>
                </div>
              </div>

              <div className="calc-result-note">
                <Info size={16} />
                <p>Dies ist eine erste Orientierung. Ein genaues Angebot erstellen wir nach Besichtigung.</p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="calc-summary-sections">
              <div className="calc-summary-section">
                <h3>Deine Angaben</h3>
                <div className="calc-summary-grid">
                  <div className="calc-summary-item">
                    <span>Objektart</span>
                    <strong>
                      {calculatorConfig.objectChoices.find(c => c.value === form.objectType)?.label}
                    </strong>
                  </div>
                  <div className="calc-summary-item">
                    <span>Fläche</span>
                    <strong>{form.sqm} m²</strong>
                  </div>
                  <div className="calc-summary-item">
                    <span>Projekt</span>
                    <strong>
                      {calculatorConfig.projectChoices.find(c => c.value === form.projectType)?.label}
                    </strong>
                  </div>
                  <div className="calc-summary-item">
                    <span>Material</span>
                    <strong>
                      {calculatorConfig.brandChoices.find(c => c.value === form.brand)?.label}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Kontaktdaten */}
        {step === 7 && (
          <div className="calc-step">
            <h2 className="calc-step-title">
              Fast geschafft! Wie können wir dich erreichen?
            </h2>
            
            <div className="calc-contact-form">
              <div className="calc-input-group">
                <label className="calc-label">Name *</label>
                <input
                  type="text"
                  className="calc-input"
                  value={form.name || ""}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Dein Name"
                />
              </div>

              <div className="calc-input-row">
                <div className="calc-input-group">
                  <label className="calc-label">Telefon</label>
                  <input
                    type="tel"
                    className="calc-input"
                    value={form.phone || ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="0176 123 456"
                  />
                </div>
                <div className="calc-input-group">
                  <label className="calc-label">E-Mail</label>
                  <input
                    type="email"
                    className="calc-input"
                    value={form.email || ""}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="deine@email.de"
                  />
                </div>
              </div>

              <div className="calc-input-group">
                <label className="calc-label">PLZ / Ort *</label>
                <input
                  type="text"
                  className="calc-input"
                  value={form.zip || ""}
                  onChange={(e) => updateField("zip", e.target.value)}
                  placeholder="z. B. 33098 Paderborn"
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-label">Nachricht (optional)</label>
                <textarea
                  className="calc-textarea"
                  value={form.message || ""}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Gibt es noch etwas, das wir wissen sollten?"
                  rows="4"
                />
              </div>

              <div className="calc-info-box">
                <Info size={16} />
                <p>
                  Wir melden uns innerhalb von 24 Stunden bei dir zurück.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {stepError && (
          <div className="calc-error">
            {stepError}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="calc-footer">
        <button
          onClick={prevStep}
          disabled={stepIndex === 0}
          className="calc-btn calc-btn-secondary"
        >
          <ArrowLeft size={18} />
          Zurück
        </button>

        {step === totalSteps ? (
          <button
            onClick={() => {
              const error = validateStep(step, form, { skipsCalculator });
              if (error) {
                setStepError(error);
                return;
              }
              onOpenRequestPage();
            }}
            className="calc-btn calc-btn-primary"
          >
            Anfrage absenden
            <Check size={18} />
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="calc-btn calc-btn-primary"
          >
            Weiter
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ModernCalculatorPanel;
