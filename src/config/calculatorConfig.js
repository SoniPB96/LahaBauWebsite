import { calculatorAdmin } from "./calculatorAdmin";

const objectFactor = Object.fromEntries(
  calculatorAdmin.objectTypes.map((item) => [item.value, item.factor || 1])
);

export const calculatorConfig = {
  titleEyebrow: calculatorAdmin.texts.titleEyebrow,
  title: calculatorAdmin.texts.title,
  text: calculatorAdmin.texts.intro,
  disclaimer: calculatorAdmin.texts.disclaimer,
  sidebarTitle: calculatorAdmin.texts.sidebarTitle,
  resultFactorsTitle: calculatorAdmin.texts.resultFactorsTitle,
  resultFactors: calculatorAdmin.texts.resultFactors,
  requestNote: calculatorAdmin.texts.requestNote,

  stepDefinitions: {
    1: { label: "Objekt" },
    2: { label: "Projekt" },
    3: { label: "Optionen" },
    4: { label: "Ausstattung" },
    5: { label: "Material" },
    6: { label: "Ergebnis" },
    7: { label: "Anfrage" },
  },

  wizardLabels: ["Objekt", "Projekt", "Optionen", "Ausstattung", "Material", "Ergebnis", "Anfrage"],
  directInquiryWizardLabels: ["Objekt", "Projekt", "Anfrage"],

  objectChoices: calculatorAdmin.objectTypes.map(({ factor, ...item }) => item),
  projectChoices: calculatorAdmin.projectTypes,

  optionsTitle: calculatorAdmin.texts.optionsTitle,
  optionsHint: calculatorAdmin.texts.optionsHint,
  options: calculatorAdmin.extraOptions,

  roomInfoTitle: calculatorAdmin.texts.roomInfoTitle,
  roomInfoText: calculatorAdmin.texts.roomInfoText,
  componentFields: calculatorAdmin.roomEquipment,

  materialTitle: calculatorAdmin.texts.materialTitle,
  materialInfo: calculatorAdmin.texts.materialInfo,
  brandChoices: calculatorAdmin.materialLines,

  defaults: calculatorAdmin.defaults,

  pricing: {
    objectFactor,
    range: calculatorAdmin.priceLogic.range,
    laborShare: calculatorAdmin.priceLogic.laborShare,
    materialShare: calculatorAdmin.priceLogic.materialShare,
  },
};

calculatorConfig.optionChoices = calculatorConfig.options;
