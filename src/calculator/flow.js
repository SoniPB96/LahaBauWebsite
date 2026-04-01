import { calculatorConfig } from "../config/calculatorConfig";
import { isDirectInquiryProject } from "../components/calculator/calculatorLogic";

export function getStepSequence(form) {
  return isDirectInquiryProject(form.projectType) ? [1, 2, 7] : [1, 2, 3, 4, 5, 6, 7];
}

export function getWizardLabelsForFlow(form) {
  const sequence = getStepSequence(form);
  return sequence.map((step) => calculatorConfig.stepDefinitions[step]?.label || `Schritt ${step}`);
}

export function getStepPosition(step, form) {
  const sequence = getStepSequence(form);
  const index = sequence.indexOf(step);
  return {
    sequence,
    index,
    total: sequence.length,
  };
}

export function getNextStep(step, form) {
  const { sequence, index } = getStepPosition(step, form);
  return index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : step;
}

export function getPreviousStep(step, form) {
  const { sequence, index } = getStepPosition(step, form);
  return index > 0 ? sequence[index - 1] : step;
}
