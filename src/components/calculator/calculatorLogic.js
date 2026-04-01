import { calculatorConfig } from "../../config/calculatorConfig";

function toNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function getProjectDefinition(projectType) {
  return calculatorConfig.projectChoices.find((item) => item.value === projectType);
}

function getBrandDefinition(brand) {
  return calculatorConfig.brandChoices.find((item) => item.value === brand);
}

export function formatEUR(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function isDirectInquiryProject(projectType) {
  return Boolean(getProjectDefinition(projectType)?.directInquiry);
}

export function getWizardLabels(form) {
  return isDirectInquiryProject(form.projectType)
    ? calculatorConfig.directInquiryWizardLabels
    : calculatorConfig.wizardLabels;
}

export function getVisibleComponentFields(form) {
  return calculatorConfig.componentFields.filter((field) => {
    if (!field.requiresOption) return true;
    return Boolean(form.options?.[field.requiresOption]);
  });
}

export function getSelectedOptions(form) {
  return calculatorConfig.options.filter((item) => Boolean(form.options?.[item.key]));
}

export function getSanitizedForm(form) {
  const visibleFieldKeys = new Set(getVisibleComponentFields(form).map((field) => field.key));
  const sanitized = {
    ...form,
    sqm: toNumber(form.sqm),
  };

  calculatorConfig.componentFields.forEach((field) => {
    sanitized[field.key] = visibleFieldKeys.has(field.key) ? toNumber(form[field.key]) : 0;
  });

  return sanitized;
}

export function estimatePrice(data) {
  const form = getSanitizedForm(data);
  const pricing = calculatorConfig.pricing;
  const project = getProjectDefinition(form.projectType);
  const brand = getBrandDefinition(form.brand);

  if (!project || project.directInquiry) {
    return {
      total: 0,
      low: 0,
      high: 0,
      labor: 0,
      material: 0,
      optionTotal: 0,
      componentTotal: 0,
      baseTotal: 0,
      sqmTotal: 0,
    };
  }

  const baseTotal = project.basePrice || 0;
  const sqmTotal = (project.sqmPrice || 0) * form.sqm;

  const componentTotal = getVisibleComponentFields(form).reduce((sum, field) => {
    return sum + toNumber(form[field.key]) * (field.unitPrice || 0);
  }, 0);

  const optionTotal = getSelectedOptions(form).reduce((sum, option) => sum + (option.price || 0), 0);

  const subtotal = baseTotal + sqmTotal + componentTotal + optionTotal;
  const brandFactor = brand?.factor || 1;
  const objectFactor = pricing.objectFactor[form.objectType] || 1;
  const total = subtotal * brandFactor * objectFactor;

  return {
    baseTotal: Math.round(baseTotal),
    sqmTotal: Math.round(sqmTotal),
    componentTotal: Math.round(componentTotal),
    optionTotal: Math.round(optionTotal),
    subtotal: Math.round(subtotal),
    total: Math.round(total),
    low: Math.round(total * (1 - pricing.range)),
    high: Math.round(total * (1 + pricing.range)),
    labor: Math.round(total * pricing.laborShare),
    material: Math.round(total * pricing.materialShare),
    brandFactor,
    objectFactor,
  };
}
