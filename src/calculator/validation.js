import { getVisibleComponentFields } from "../components/calculator/calculatorLogic";

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : NaN;
}

function isBlank(value) {
  return String(value ?? "").trim() === "";
}

function validateSqm(form) {
  const sqm = toNumber(form.sqm);
  if (!Number.isFinite(sqm) || sqm <= 0) return "Bitte gib eine sinnvolle Fläche in m² ein.";
  if (sqm < 15) return "Bitte prüfe die Fläche. Für die erste Einschätzung sollte sie mindestens 15 m² betragen.";
  if (sqm > 5000) return "Bitte gib eine realistische Fläche ein oder nutze direkt die Anfrage.";
  return "";
}

function validateEmail(email) {
  if (isBlank(email)) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim()) ? "" : "Bitte gib eine gültige E-Mail-Adresse ein.";
}

function validatePhone(phone) {
  if (isBlank(phone)) return "";
  const digits = String(phone).replace(/[^\d+]/g, "");
  return digits.length >= 6 ? "" : "Bitte gib eine erreichbare Telefonnummer ein.";
}

export function validateStep(step, form, { skipsCalculator } = {}) {
  if (step === 1) {
    if (!form.objectType) return "Bitte wähle zuerst die Objektart.";
    return validateSqm(form);
  }

  if (step === 2) {
    if (!form.projectType) return "Bitte wähle die Projektart aus.";
    return "";
  }

  if (step === 4 && !skipsCalculator) {
    const visibleFields = getVisibleComponentFields(form);
    const rooms = toNumber(form.rooms);
    if (!Number.isFinite(rooms) || rooms < 1) return "Bitte gib mindestens einen Raum an.";
    if (rooms > 100) return "Bitte prüfe die Raumanzahl. Für sehr große Projekte ist eine direkte Anfrage sinnvoller.";

    for (const field of visibleFields.slice(1)) {
      const value = toNumber(form[field.key]);
      if (!Number.isFinite(value) || value < 0) return `Bitte prüfe das Feld „${field.label}“.`;
      if (value > 500) return `Die Angabe bei „${field.label}“ wirkt zu hoch. Bitte prüfe den Wert.`;
    }
  }

  if (step === 7) {
    if (isBlank(form.name)) return "Bitte gib deinen Namen an.";
    if (isBlank(form.phone) && isBlank(form.email)) {
      return "Bitte hinterlege mindestens eine Telefonnummer oder E-Mail-Adresse.";
    }
    const emailError = validateEmail(form.email);
    if (emailError) return emailError;
    const phoneError = validatePhone(form.phone);
    if (phoneError) return phoneError;
    if (isBlank(form.zip)) return "Bitte gib PLZ oder Ort an, damit die Anfrage zugeordnet werden kann.";
  }

  return "";
}
