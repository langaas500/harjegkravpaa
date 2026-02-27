export type Step =
  | "BASICS"
  | "SELLER"
  | "ISSUES"
  | "SEVERITY"
  | "COST"
  | "TIMING"
  | "CONTACT"
  | "DESCRIPTION"
  | "PROMISES"
  | "AS_IS_CLAUSE"
  | "VISIBLE_DEFECT"
  | "WORKSHOP_REPORT"
  | "AD_EVIDENCE"
  | "ADDITIONAL"
  | "RESULT";

export type SellerType = "PRIVATE" | "DEALER" | null;
export type VehicleType = "CAR" | "MOTORCYCLE" | null;

export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  km: string;
  price: string;
  regNum: string;
  purchaseDate: string;
}

export interface OutcomeType {
  level: "GREEN" | "YELLOW" | "RED";
  title: string;
  summary: string;
  confidence: string;
  keyPoints: string[];
  legalRefs: { heading: string; refs: string[] }[];
  nextSteps: string[];
  proTip: string;
  disclaimer: string;
}

export interface UploadedFile {
  key: string;
  name: string;
  type: string;
  publicUrl: string;
}

export interface WizardState {
  vehicleType: VehicleType;
  sellerType: SellerType;
  vehicle: VehicleInfo;
  buyerName: string;
  sellerName: string;
  issues: string[];
  safetyCritical: boolean | null;
  notDriveable: boolean | null;
  costBracket: string | null;
  complainedQuickly: boolean | null;
  defectSoonAfter: boolean | null;
  contactedSeller: boolean | null;
  sellerResponse: string;
  userDescription: string;
  additionalInfo: string;
  sellerPromises: string;
  hadAsIsClause: boolean | null;
  visibleDefect: boolean | null;
  hasWorkshopReport: boolean | null;
  workshopReportText: string;
  uploadedFiles: UploadedFile[];
  finnUrl: string;
  adEvidenceFiles: UploadedFile[];
  adClaims: string;
  outcome: OutcomeType | null;
  caseId: string | null;
  caseAccessToken: string | null;
}
