"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  ArrowRight,
  ArrowLeft,
  User,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  Loader2,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";

type SellerType = "PRIVATE" | "DEALER" | null;
type VehicleType = "CAR" | "MOTORCYCLE" | null;
type Step = "INTRO" | "BASICS" | "SELLER" | "ISSUES" | "SEVERITY" | "COST" | "TIMING" | "CONTACT" | "DESCRIPTION" | "PROMISES" | "AS_IS_CLAUSE" | "VISIBLE_DEFECT" | "WORKSHOP_REPORT" | "ADDITIONAL" | "RESULT";

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  km: string;
  price: string;
  regNum: string;
  purchaseDate: string;
}

interface OutcomeType {
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

const ISSUE_OPTIONS = [
  { id: "engine", label: "Motor / ytelse / oljeforbruk" },
  { id: "gearbox", label: "Girkasse / clutch / drivverk" },
  { id: "electric", label: "Elektrisk / batteri / lading" },
  { id: "rust", label: "Rust / karosseri / lakk" },
  { id: "brakes", label: "Bremser / hjuloppheng" },
  { id: "other", label: "Annet / flere feil" },
];

const COST_OPTIONS = [
  { id: "unknown", label: "Vet ikke ennå", desc: "Ikke fått pristilbud" },
  { id: "low", label: "Under 10 000 kr", desc: "Mindre reparasjon" },
  { id: "medium", label: "10 000 – 30 000 kr", desc: "Moderat reparasjon" },
  { id: "high", label: "30 000 – 60 000 kr", desc: "Større reparasjon" },
  { id: "extreme", label: "Over 60 000 kr", desc: "Omfattende / totalskade" },
];

export default function BilkjopPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("INTRO");
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);
  const [sellerType, setSellerType] = useState<SellerType>(null);
  const [vehicle, setVehicle] = useState<VehicleInfo>({
    make: "",
    model: "",
    year: "",
    km: "",
    price: "",
    regNum: "",
    purchaseDate: "",
  });
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [issues, setIssues] = useState<string[]>([]);
  const [safetyCritical, setSafetyCritical] = useState<boolean | null>(null);
  const [notDriveable, setNotDriveable] = useState<boolean | null>(null);
  const [costBracket, setCostBracket] = useState<string | null>(null);
  const [complainedQuickly, setComplainedQuickly] = useState<boolean | null>(null);
  const [defectSoonAfter, setDefectSoonAfter] = useState<boolean | null>(null);
  const [contactedSeller, setContactedSeller] = useState<boolean | null>(null);
  const [sellerResponse, setSellerResponse] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Nye kritiske spørsmål
  const [sellerPromises, setSellerPromises] = useState("");
  const [hadAsIsClause, setHadAsIsClause] = useState<boolean | null>(null);
  const [visibleDefect, setVisibleDefect] = useState<boolean | null>(null);
  const [hasWorkshopReport, setHasWorkshopReport] = useState<boolean | null>(null);
  const [workshopReportText, setWorkshopReportText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);

  const toggleIssue = (id: string) => {
    setIssues((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Helper function for vehicle-specific text
  const vehicleText = (carText: string, mcText: string) => {
    return vehicleType === "MOTORCYCLE" ? mcText : carText;
  };

  const canProceedBasics =
    vehicle.make && vehicle.model && vehicle.price && vehicle.purchaseDate;

  const canProceedIssues = issues.length > 0;
  const canProceedSeverity = safetyCritical !== null && notDriveable !== null;
  const canProceedCost = costBracket !== null;
  const canProceedTiming = complainedQuickly !== null && defectSoonAfter !== null;
  const canProceedContact = contactedSeller !== null;

  const analyzeCase = async () => {
    setIsAnalyzing(true);
    try {
      const issueLabels = issues.map(
        (id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id
      );
      const costLabel = COST_OPTIONS.find((o) => o.id === costBracket)?.label || costBracket;

      const context = {
        vehicleType,
        sellerType,
        vehicle,
        buyerName,
        sellerName,
        issues: issueLabels,
        safetyCritical,
        notDriveable,
        costBracket: costLabel,
        complainedQuickly,
        defectSoonAfter,
        contactedSeller,
        sellerResponse: contactedSeller ? sellerResponse : null,
        userDescription,
        additionalInfo,
        sellerPromises,
        hadAsIsClause,
        visibleDefect,
        hasWorkshopReport,
        workshopReportText: hasWorkshopReport ? workshopReportText : null,
      };

      const response = await fetch("/api/analyze-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();
      setOutcome(result.outcome);
      setStep("RESULT");
    } catch (error) {
      console.error("Case analysis failed:", error);
      setOutcome({
        level: "YELLOW",
        title: "Vurdering fullført",
        summary: "Basert på informasjonen du har oppgitt, ser det ut til at du kan ha en sak. Vi anbefaler å dokumentere alt og vurdere å kontakte selger skriftlig.",
        confidence: "Middels",
        keyPoints: [
          "Dokumenter alle feil grundig med bilder og video",
          "Ta vare på all kommunikasjon med selger",
          "Sjekk reklamasjonsfristen for ditt kjøp",
        ],
        legalRefs: [
          {
            heading: sellerType === "DEALER" ? "Forbrukerkjøpsloven" : "Kjøpsloven",
            refs: [
              "§ 17: Mangel foreligger når varen ikke samsvarer med avtalen",
              "§ 27: Kjøper kan kreve retting, omlevering, prisavslag eller heving",
            ],
          },
        ],
        nextSteps: [
          "Få skriftlig verkstedrapport på feilene",
          "Send skriftlig reklamasjon til selger",
          "Kontakt Forbrukerrådet ved behov",
        ],
        proTip: "Jo raskere du reklamerer, jo sterkere står saken din.",
        disclaimer: "Dette er veiledning, ikke juridisk rådgivning.",
      });
      setStep("RESULT");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goToReport = () => {
    const data = {
      vehicleType,
      sellerType,
      vehicle,
      buyerName,
      sellerName,
      issues: issues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id),
      safetyCritical,
      notDriveable,
      costBracket: COST_OPTIONS.find((o) => o.id === costBracket)?.label || costBracket,
      complainedQuickly,
      defectSoonAfter,
      contactedSeller,
      sellerResponse: contactedSeller ? sellerResponse : null,
      userDescription,
      additionalInfo,
      sellerPromises,
      hadAsIsClause,
      visibleDefect,
      hasWorkshopReport,
      workshopReportText: hasWorkshopReport ? workshopReportText : null,
      uploadedFiles,
      outcome,
    };
    localStorage.setItem("bilkjop-data", JSON.stringify(data));
    router.push("/bilkjop/rapport");
  };

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10">
        
        {step === "INTRO" && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Kjøp av bil eller motorsykkel</h1>
            </div>

            <p className="text-lg text-slate-400">
              Har du kjøpt en defekt bil eller motorsykkel? Svar på noen spørsmål, så vurderer vi om du sannsynligvis har en sak.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-400">Hva gjelder saken?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setVehicleType("CAR");
                    setStep("BASICS");
                  }}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                    vehicleType === "CAR"
                      ? "border-white bg-white/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">Bil</p>
                      <p className="text-xs text-slate-500 mt-0.5">Personbil, varebil, SUV</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setVehicleType("MOTORCYCLE");
                    setStep("BASICS");
                  }}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                    vehicleType === "MOTORCYCLE"
                      ? "border-white bg-white/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">Motorsykkel</p>
                      <p className="text-xs text-slate-500 mt-0.5">MC, scooter, moped</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-500 space-y-1">
              <p>• Tar ca. 2 minutter</p>
              <p>• Gratis vurdering</p>
              <p>• Valgfri PDF-rapport (39 kr)</p>
            </div>

            <p className="text-xs text-slate-600 text-center">
              Veiledende vurdering, ikke juridisk rådgivning
            </p>
          </section>
        )}

        {step === "BASICS" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Om kjøretøyet</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Ditt navn (valgfritt)</label>
                <input
                  type="text"
                  placeholder="Ola Nordmann"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Selger (valgfritt)</label>
                <input
                  type="text"
                  placeholder="Firma AS / Navn"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Merke *"
                value={vehicle.make}
                onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Modell *"
                value={vehicle.model}
                onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Reg.nr"
                value={vehicle.regNum}
                onChange={(e) => setVehicle({ ...vehicle, regNum: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Årsmodell"
                value={vehicle.year}
                onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Kilometerstand"
                value={vehicle.km}
                onChange={(e) => setVehicle({ ...vehicle, km: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Kjøpesum (kr) *"
                value={vehicle.price}
                onChange={(e) => setVehicle({ ...vehicle, price: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1">Kjøpsdato *</label>
              <input
                type="date"
                value={vehicle.purchaseDate}
                onChange={(e) => setVehicle({ ...vehicle, purchaseDate: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
              />
            </div>

            <p className="text-xs text-slate-600">* Obligatoriske felter</p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("INTRO")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("SELLER")}
                disabled={!canProceedBasics}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40 disabled:hover:bg-teal-500"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "SELLER" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Hvem kjøpte du av?</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSellerType("PRIVATE")}
                className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${
                  sellerType === "PRIVATE"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <User className="h-8 w-8" />
                <span className="font-semibold">Privatperson</span>
                <span className="text-xs text-slate-400">FINN, Torget, bekjent</span>
              </button>
              <button
                onClick={() => setSellerType("DEALER")}
                className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${
                  sellerType === "DEALER"
                    ? "border-white bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <Building2 className="h-8 w-8" />
                <span className="font-semibold">Forhandler</span>
                <span className="text-xs text-slate-400">Bilforretning, merkeforhandler</span>
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("BASICS")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("ISSUES")}
                disabled={!sellerType}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "ISSUES" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Hva er problemet?</h2>
            <p className="text-sm text-slate-500">Velg alle som gjelder</p>
            <div className="grid grid-cols-2 gap-3">
              {ISSUE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleIssue(opt.id)}
                  className={`rounded-xl border p-4 text-left text-sm transition ${
                    issues.includes(opt.id)
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("SELLER")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("SEVERITY")}
                disabled={!canProceedIssues}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "SEVERITY" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Alvorlighetsgrad</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-3">Er feilen sikkerhetskritisk?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSafetyCritical(true)}
                    className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${
                      safetyCritical === true ? "border-red-500 bg-red-500/10 text-red-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Ja
                  </button>
                  <button
                    onClick={() => setSafetyCritical(false)}
                    className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${
                      safetyCritical === false ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Nei
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300 mb-3">Er bilen kjørbar?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNotDriveable(false)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      notDriveable === false ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja, kjørbar
                  </button>
                  <button
                    onClick={() => setNotDriveable(true)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      notDriveable === true ? "border-red-500 bg-red-500/10 text-red-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei, står
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("ISSUES")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("COST")}
                disabled={!canProceedSeverity}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "COST" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Estimert reparasjonskostnad</h2>
            <div className="space-y-2">
              {COST_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCostBracket(opt.id)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    costBracket === opt.id
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("SEVERITY")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("TIMING")}
                disabled={!canProceedCost}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "TIMING" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Timing</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-3">Reklamerte du raskt etter du oppdaget feilen?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setComplainedQuickly(true)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      complainedQuickly === true ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja, med en gang
                  </button>
                  <button
                    onClick={() => setComplainedQuickly(false)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      complainedQuickly === false ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei, ventet litt
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300 mb-3">Oppstod feilen kort tid etter kjøpet?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDefectSoonAfter(true)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      defectSoonAfter === true ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja, ganske raskt
                  </button>
                  <button
                    onClick={() => setDefectSoonAfter(false)}
                    className={`flex-1 rounded-xl border p-4 transition ${
                      defectSoonAfter === false ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei, en stund etter
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("COST")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("CONTACT")}
                disabled={!canProceedTiming}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "CONTACT" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Kontakt med selger</h2>
            <div>
              <p className="text-sm text-slate-300 mb-3">Har du kontaktet selger om problemet?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setContactedSeller(true)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    contactedSeller === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Ja
                </button>
                <button
                  onClick={() => setContactedSeller(false)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    contactedSeller === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Nei, ikke ennå
                </button>
              </div>
            </div>
            {contactedSeller === true && (
              <div>
                <label className="block text-sm text-slate-500 mb-2">
                  Hva svarte selger? (valgfritt)
                </label>
                <textarea
                  value={sellerResponse}
                  onChange={(e) => setSellerResponse(e.target.value)}
                  placeholder="F.eks: Selger nekter ansvar, sier det er slitasje..."
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                />
                <p className="text-xs text-slate-600 mt-1">{sellerResponse.length} / 500 tegn</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setStep("TIMING")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("DESCRIPTION")}
                disabled={!canProceedContact}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "DESCRIPTION" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Beskriv situasjonen</h2>
            </div>
            <p className="text-sm text-slate-400">
              Gi oss mer detaljer så blir analysen bedre. <span className="text-slate-600">(Valgfritt)</span>
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-1">Tips – inkluder gjerne:</p>
              <ul className="space-y-0.5">
                <li>• Symptomer og når de oppstod</li>
                <li>• Hva selger sa/lovte ved kjøp</li>
                <li>• Verkstedfunn eller feilkoder</li>
              </ul>
            </div>
            <textarea
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="Beskriv hva som har skjedd..."
              maxLength={1000}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-slate-600">{userDescription.length} / 1000 tegn</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("CONTACT")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("PROMISES")}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "PROMISES" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
              <h2 className="text-2xl font-bold">Selgers løfter</h2>
            </div>
            <p className="text-sm text-slate-400">
              Lovte selger noe spesifikt om {vehicleText("bilens", "motorsykkelens")} tilstand? Dette kan styrke saken din vesentlig.
            </p>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
              <p className="font-semibold text-amber-400 mb-2">Hvorfor er dette viktig?</p>
              <p className="text-slate-300">
                Hvis selger sa at {vehicleText("bilen", "motorsykkelen")} var feilfri, nylig service, eller garanterte noe som viste seg å være feil, styrker dette kravet ditt kraftig.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-2">Eksempler på relevante løfter:</p>
              <ul className="space-y-1">
                <li>• &ldquo;{vehicleText("Bilen", "Motorsykkelen")} er nylig EU-godkjent uten anmerkninger&rdquo;</li>
                <li>• &ldquo;Motor og girkasse er i topp stand&rdquo;</li>
                <li>• &ldquo;Ingen rust eller skjulte feil&rdquo;</li>
                <li>• &ldquo;Nettopp gjort service for 15 000 kr&rdquo;</li>
              </ul>
            </div>

            <textarea
              value={sellerPromises}
              onChange={(e) => setSellerPromises(e.target.value)}
              placeholder={`Beskriv hva selger sa eller lovte om ${vehicleText("bilen", "motorsykkelen")}... (Valgfritt, men viktig hvis det gjelder deg)`}
              maxLength={1000}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-slate-600">{sellerPromises.length} / 1000 tegn</p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("DESCRIPTION")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("AS_IS_CLAUSE")}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "AS_IS_CLAUSE" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold">&ldquo;Som den er&rdquo;-klausul</h2>
            </div>
            <p className="text-sm text-slate-400">
              Stod det &ldquo;selges som den er&rdquo; i annonsen eller kjøpekontrakten?
            </p>

            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm">
              <p className="font-semibold text-red-400 mb-2">Viktig juridisk poeng:</p>
              <p className="text-slate-300 mb-2">
                Fra 01.01.2024 er &ldquo;som den er&rdquo;-klausuler <strong>ugyldige</strong> ved kjøp fra <strong>forhandler</strong>.
              </p>
              <p className="text-slate-300">
                Ved privatkjøp før 2024 kan slike klausuler ha betydning, men beskytter ikke mot skjulte feil.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setHadAsIsClause(false)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  hadAsIsClause === false
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Nei, ingen slik klausul</p>
                <p className="text-xs text-slate-500 mt-1">
                  Normalt salg uten spesielle forbehold
                </p>
              </button>
              <button
                onClick={() => setHadAsIsClause(true)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  hadAsIsClause === true
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Ja, {vehicleText("bilen", "motorsykkelen")} ble solgt &ldquo;som den er&rdquo;</p>
                <p className="text-xs text-slate-500 mt-1">
                  Det stod i annonse/kontrakt at {vehicleText("bilen", "motorsykkelen")} selges uten garanti
                </p>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("PROMISES")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("VISIBLE_DEFECT")}
                disabled={hadAsIsClause === null}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "VISIBLE_DEFECT" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Synlig ved kjøpet?</h2>
            </div>
            <p className="text-sm text-slate-400">
              Var feilen synlig da du kjøpte {vehicleText("bilen", "motorsykkelen")}, eller oppdaget du den først senere?
            </p>

            <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 text-sm">
              <p className="font-semibold text-orange-400 mb-2">Åpenbarhetsregelen:</p>
              <p className="text-slate-300">
                Feil som var tydelig synlige ved kjøpet (åpenbare), og som du burde oppdaget ved vanlig undersøkelse, gir normalt ikke reklamasjonsrett. Skjulte feil derimot gir rett til reklamasjon.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setVisibleDefect(false)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  visibleDefect === false
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Nei, feilen var skjult</p>
                <p className="text-xs text-slate-500 mt-1">
                  Jeg oppdaget problemet først etter kjøpet
                </p>
              </button>
              <button
                onClick={() => setVisibleDefect(true)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  visibleDefect === true
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Ja, feilen kunne sees ved kjøpet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Problemet var synlig, men jeg trodde det var mindre alvorlig
                </p>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("AS_IS_CLAUSE")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("WORKSHOP_REPORT")}
                disabled={visibleDefect === null}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "WORKSHOP_REPORT" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Verkstedsrapport</h2>
            </div>
            <p className="text-sm text-slate-400">
              Har du fått {vehicleText("bilen", "motorsykkelen")} undersøkt av et verksted?
            </p>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 text-sm">
              <p className="font-semibold text-blue-400 mb-2">Hvorfor er dette viktig?</p>
              <p className="text-slate-300">
                En rapport fra et autorisert verksted gir dokumentasjon på feilen og kostnadene. Dette styrker saken din betydelig.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setHasWorkshopReport(true)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  hasWorkshopReport === true
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Ja, jeg har verkstedsrapport</p>
                <p className="text-xs text-slate-500 mt-1">
                  {vehicleText("Bilen", "Motorsykkelen")} er undersøkt og jeg har dokumentasjon
                </p>
              </button>
              <button
                onClick={() => setHasWorkshopReport(false)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                  hasWorkshopReport === false
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30"
                }`}
              >
                <p className="font-semibold">Nei, ikke undersøkt ennå</p>
                <p className="text-xs text-slate-500 mt-1">
                  Jeg har ikke tatt {vehicleText("bilen", "motorsykkelen")} til verksted
                </p>
              </button>
            </div>

            {hasWorkshopReport === true && (
              <>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
                  <p className="font-medium text-slate-400 mb-2">Lim inn eller oppsummer rapporten:</p>
                  <ul className="space-y-1">
                    <li>• Hva verkstedet fant (feilkoder, diagnosefunn)</li>
                    <li>• Prisestimat på reparasjon</li>
                    <li>• Verkstedets vurdering av feilen</li>
                  </ul>
                </div>

                <textarea
                  value={workshopReportText}
                  onChange={(e) => setWorkshopReportText(e.target.value)}
                  placeholder="Lim inn eller oppsummer verkstedsrapporten her..."
                  maxLength={2000}
                  rows={6}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none font-mono text-sm"
                />
                <p className="text-xs text-slate-600">{workshopReportText.length} / 2000 tegn</p>
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("VISIBLE_DEFECT")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("ADDITIONAL")}
                disabled={hasWorkshopReport === null}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "ADDITIONAL" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Tilleggsinformasjon</h2>
            </div>
            <p className="text-sm text-slate-400">
              Her kan du dele mer detaljert informasjon som styrker saken din. <span className="text-slate-600">(Valgfritt, men anbefalt)</span>
            </p>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
              <p className="font-semibold text-emerald-400 mb-2">Hvorfor er dette viktig?</p>
              <p className="text-slate-300">
                Jo mer kontekst du gir, desto bedre blir vurderingen og dokumentene (rapport og kravbrev). Dette gjør saken din sterkere.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-2">Forslag til hva du kan inkludere:</p>
              <ul className="space-y-1">
                <li>• Detaljert historikk om når og hvordan problemet oppstod</li>
                <li>• Verkstedsrapport (lim inn tekst eller oppsummer funn)</li>
                <li>• Feilkoder og diagnoseinformasjon</li>
                <li>• Hva som ble sagt/lovet av selger ved kjøpet</li>
                <li>• Tidligere kommunikasjon med selger (e-poster, meldinger)</li>
                <li>• Annen relevant dokumentasjon eller observasjoner</li>
              </ul>
            </div>

            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Skriv så mye du ønsker her. Jo mer detaljer, desto bedre vurdering og dokumenter får du..."
              maxLength={5000}
              rows={10}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none font-mono text-sm"
            />
            <p className="text-xs text-slate-600">{additionalInfo.length} / 5000 tegn</p>

            <div>
              <p className="text-sm text-slate-300 mb-3">Last opp dokumentasjon (valgfritt)</p>
              <FileUpload
                category="bilkjop"
                maxFiles={10}
                files={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
              <p className="text-xs text-slate-600 mt-2">
                Verkstedsrapporter, bilder av feil, kjøpekontrakt, annonse, eller annen dokumentasjon
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("DESCRIPTION")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={analyzeCase}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-bold hover:bg-teal-400 transition disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sjekker hva du kan ha krav på...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Vurder saken min
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {step === "RESULT" && outcome && (
          <section className="space-y-5">
            <div
              className={`rounded-2xl p-5 ${
                outcome.level === "GREEN"
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : outcome.level === "YELLOW"
                  ? "bg-amber-500/10 border border-amber-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {outcome.level === "GREEN" ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                ) : outcome.level === "YELLOW" ? (
                  <Clock className="h-6 w-6 text-amber-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                )}
                <span
                  className={`text-sm font-bold uppercase tracking-wide ${
                    outcome.level === "GREEN"
                      ? "text-emerald-400"
                      : outcome.level === "YELLOW"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {outcome.level === "GREEN"
                    ? "Sannsynlig krav"
                    : outcome.level === "YELLOW"
                    ? "Usikkert"
                    : "Lite sannsynlig"}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{outcome.title}</h2>
              <p className="text-slate-300">{outcome.summary}</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Nøkkelpunkter</p>
              <ul className="text-slate-300 space-y-1">
                {outcome.keyPoints.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setStep("ADDITIONAL")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={goToReport}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-bold hover:bg-teal-400 transition"
              >
                <FileText className="h-5 w-5" />
                Se full rapport
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 text-center">
              Veiledende vurdering, ikke juridisk rådgivning
            </p>
          </section>
        )}
      </div>
    </main>
  );
}