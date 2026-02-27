import type { Step, WizardState } from "./types";
import { ISSUE_OPTIONS, COST_OPTIONS, parsePrice } from "./constants";

export const WIZARD_STEPS: Step[] = [
  "BASICS",
  "SELLER",
  "ISSUES",
  "SEVERITY",
  "COST",
  "TIMING",
  "CONTACT",
  "DESCRIPTION",
  "PROMISES",
  "AS_IS_CLAUSE",
  "VISIBLE_DEFECT",
  "WORKSHOP_REPORT",
  "AD_EVIDENCE",
  "ADDITIONAL",
  "RESULT",
];

export function stepTitle(step: Step): string {
  switch (step) {
    case "BASICS": return "Kjøretøy";
    case "SELLER": return "Selger";
    case "ISSUES": return "Problem";
    case "SEVERITY": return "Alvorlighet";
    case "COST": return "Kostnad";
    case "TIMING": return "Tidslinje";
    case "CONTACT": return "Kontakt";
    case "DESCRIPTION": return "Beskrivelse";
    case "PROMISES": return "Løfter";
    case "AS_IS_CLAUSE": return "Forbehold";
    case "VISIBLE_DEFECT": return "Synlighet";
    case "WORKSHOP_REPORT": return "Dokumentasjon";
    case "AD_EVIDENCE": return "Annonse";
    case "ADDITIONAL": return "Tillegg";
    case "RESULT": return "Resultat";
  }
}

export function canProceed(step: Step, state: WizardState): boolean {
  switch (step) {
    case "BASICS":
      return Math.floor(parsePrice(state.vehicle.price)) > 0 && !!state.vehicle.purchaseDate;
    case "SELLER":
      return state.sellerType !== null;
    case "ISSUES":
      return state.issues.length > 0;
    case "SEVERITY":
      return state.safetyCritical !== null && state.notDriveable !== null;
    case "COST":
      return state.costBracket !== null;
    case "TIMING":
      return state.complainedQuickly !== null && state.defectSoonAfter !== null;
    case "CONTACT":
      return state.contactedSeller !== null;
    case "AS_IS_CLAUSE":
      return state.hadAsIsClause !== null;
    case "VISIBLE_DEFECT":
      return state.visibleDefect !== null;
    case "WORKSHOP_REPORT":
      return state.hasWorkshopReport !== null;
    default:
      return true;
  }
}

export function nextStep(step: Step): Step {
  const idx = WIZARD_STEPS.indexOf(step);
  return WIZARD_STEPS[Math.min(idx + 1, WIZARD_STEPS.length - 1)];
}

export function prevStep(step: Step): Step {
  const idx = WIZARD_STEPS.indexOf(step);
  return WIZARD_STEPS[Math.max(idx - 1, 0)];
}

export function progressPct(step: Step): number {
  if (step === "RESULT") return 100;
  const idx = WIZARD_STEPS.indexOf(step);
  const total = WIZARD_STEPS.length - 1;
  return Math.round((idx / total) * 100);
}

export function mapPayload(state: WizardState) {
  const issueLabels = state.issues.map(
    (id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id
  );
  const costLabel =
    COST_OPTIONS.find((o) => o.id === state.costBracket)?.label ||
    state.costBracket;

  return {
    vehicleType: state.vehicleType,
    sellerType: state.sellerType,
    vehicle: state.vehicle,
    buyerName: state.buyerName,
    sellerName: state.sellerName,
    issues: issueLabels,
    safetyCritical: state.safetyCritical,
    notDriveable: state.notDriveable,
    costBracket: costLabel,
    complainedQuickly: state.complainedQuickly,
    defectSoonAfter: state.defectSoonAfter,
    contactedSeller: state.contactedSeller,
    sellerResponse: state.contactedSeller ? state.sellerResponse : null,
    userDescription: state.userDescription,
    additionalInfo: state.additionalInfo,
    sellerPromises: state.sellerPromises,
    hadAsIsClause: state.hadAsIsClause,
    visibleDefect: state.visibleDefect,
    hasWorkshopReport: state.hasWorkshopReport,
    workshopReportText: state.hasWorkshopReport
      ? state.workshopReportText
      : null,
    uploadedFiles: state.uploadedFiles,
    finnUrl: state.finnUrl || null,
    adEvidenceFiles: state.adEvidenceFiles,
    adClaims: state.adClaims || null,
  };
}
