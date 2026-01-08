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

type SellerType = "PRIVATE" | "DEALER" | null;
type Step = "INTRO" | "BASICS" | "SELLER" | "ISSUES" | "SEVERITY" | "COST" | "TIMING" | "CONTACT" | "DESCRIPTION" | "RESULT";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);

  const toggleIssue = (id: string) => {
    setIssues((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const canProceedBasics =
    vehicle.make && vehicle.model && vehicle.price && vehicle.purchaseDate;

  const canProceedIssues = issues.length > 0;
  const canProceedSeverity = safetyCritical !== null && notDriveable !== null;
  const canProceedCost = costBracket !== null;
  const canProceedTiming = complainedQuickly !== null && defectSoonAfter !== null;
  const canProceedContact = contactedSeller !== null;

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const issueLabels = issues.map(
        (id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id
      );
      const costLabel = COST_OPTIONS.find((o) => o.id === costBracket)?.label || costBracket;

      const context = {
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
      console.error("AI analysis failed:", error);
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
      outcome,
    };
    sessionStorage.setItem("bilkjop-data", JSON.stringify(data));
    router.push("/bilkjop/rapport");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 overflow-hidden">
      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
          {step === "INTRO" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-pink-500/20 p-3">
                  <Car className="h-6 w-6 text-pink-400" />
                </div>
                <h1 className="text-2xl font-bold">Bilkjøp-sjekk</h1>
              </div>
              <p className="text-slate-300">
                Svar på noen spørsmål om kjøpet ditt, så vurderer vi om du sannsynligvis har en sak.
              </p>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Tar ca. 2 minutter</li>
                <li>• Gratis vurdering</li>
                <li>• Valgfri PDF-rapport (49 kr)</li>
              </ul>
              <button
                onClick={() => setStep("BASICS")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition"
              >
                Start sjekk
                <ArrowRight className="h-5 w-5" />
              </button>
            </section>
          )}

          {step === "BASICS" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Om kjøretøy</h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Ditt navn (valgfritt)</label>
                  <input
                    type="text"
                    placeholder="Ola Nordmann"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Selger (valgfritt)</label>
                  <input
                    type="text"
                    placeholder="Firma AS / Navn"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Merke *"
                  value={vehicle.make}
                  onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Modell *"
                  value={vehicle.model}
                  onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Reg.nr"
                  value={vehicle.regNum}
                  onChange={(e) => setVehicle({ ...vehicle, regNum: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Årsmodell"
                  value={vehicle.year}
                  onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Kilometerstand"
                  value={vehicle.km}
                  onChange={(e) => setVehicle({ ...vehicle, km: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Kjøpesum (kr) *"
                  value={vehicle.price}
                  onChange={(e) => setVehicle({ ...vehicle, price: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Kjøpsdato *</label>
                <input
                  type="date"
                  value={vehicle.purchaseDate}
                  onChange={(e) => setVehicle({ ...vehicle, purchaseDate: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <p className="text-xs text-slate-500">* Obligatoriske felter</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("INTRO")}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("SELLER")}
                  disabled={!canProceedBasics}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "SELLER" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Hvem kjøpte du av?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSellerType("PRIVATE")}
                  className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition ${
                    sellerType === "PRIVATE"
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <User className="h-8 w-8" />
                  <span className="font-semibold">Privatperson</span>
                  <span className="text-xs text-slate-400">FINN, Torget, bekjent</span>
                </button>
                <button
                  onClick={() => setSellerType("DEALER")}
                  className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition ${
                    sellerType === "DEALER"
                      ? "border-pink-500 bg-pink-500/10"
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
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("ISSUES")}
                  disabled={!sellerType}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "ISSUES" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Hva er problemet?</h2>
              <p className="text-sm text-slate-400">Velg alle som gjelder</p>
              <div className="grid grid-cols-2 gap-3">
                {ISSUE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleIssue(opt.id)}
                    className={`rounded-xl border p-3 text-left text-sm transition ${
                      issues.includes(opt.id)
                        ? "border-pink-500 bg-pink-500/10"
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
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("SEVERITY")}
                  disabled={!canProceedIssues}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "SEVERITY" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Alvorlighetsgrad</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-300 mb-2">Er feilen sikkerhetskritisk?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSafetyCritical(true)}
                      className={`flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 ${
                        safetyCritical === true ? "border-red-500 bg-red-500/10" : "border-white/10"
                      }`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Ja
                    </button>
                    <button
                      onClick={() => setSafetyCritical(false)}
                      className={`flex-1 rounded-xl border p-3 flex items-center justify-center gap-2 ${
                        safetyCritical === false ? "border-green-500 bg-green-500/10" : "border-white/10"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Nei
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-2">Er bilen kjørbar?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setNotDriveable(false)}
                      className={`flex-1 rounded-xl border p-3 ${
                        notDriveable === false ? "border-green-500 bg-green-500/10" : "border-white/10"
                      }`}
                    >
                      Ja, kjørbar
                    </button>
                    <button
                      onClick={() => setNotDriveable(true)}
                      className={`flex-1 rounded-xl border p-3 ${
                        notDriveable === true ? "border-red-500 bg-red-500/10" : "border-white/10"
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
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("COST")}
                  disabled={!canProceedSeverity}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "COST" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Estimert reparasjonskostnad</h2>
              <div className="space-y-2">
                {COST_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCostBracket(opt.id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      costBracket === opt.id
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className="font-medium">{opt.label}</p>
                    <p className="text-xs text-slate-400">{opt.desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("SEVERITY")}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("TIMING")}
                  disabled={!canProceedCost}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "TIMING" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Timing</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-300 mb-2">Reklamerte du raskt etter du oppdaget feilen?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setComplainedQuickly(true)}
                      className={`flex-1 rounded-xl border p-3 ${
                        complainedQuickly === true ? "border-green-500 bg-green-500/10" : "border-white/10"
                      }`}
                    >
                      Ja, med en gang
                    </button>
                    <button
                      onClick={() => setComplainedQuickly(false)}
                      className={`flex-1 rounded-xl border p-3 ${
                        complainedQuickly === false ? "border-yellow-500 bg-yellow-500/10" : "border-white/10"
                      }`}
                    >
                      Nei, ventet litt
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-2">Oppstod feilen kort tid etter kjøpet?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDefectSoonAfter(true)}
                      className={`flex-1 rounded-xl border p-3 ${
                        defectSoonAfter === true ? "border-green-500 bg-green-500/10" : "border-white/10"
                      }`}
                    >
                      Ja, ganske raskt
                    </button>
                    <button
                      onClick={() => setDefectSoonAfter(false)}
                      className={`flex-1 rounded-xl border p-3 ${
                        defectSoonAfter === false ? "border-yellow-500 bg-yellow-500/10" : "border-white/10"
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
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("CONTACT")}
                  disabled={!canProceedTiming}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "CONTACT" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <h2 className="text-xl font-bold">Kontakt med selger</h2>
              <div>
                <p className="text-sm text-slate-300 mb-3">Har du kontaktet selger om problemet?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setContactedSeller(true)}
                    className={`flex-1 rounded-xl border p-3 ${
                      contactedSeller === true ? "border-pink-500 bg-pink-500/10" : "border-white/10"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setContactedSeller(false)}
                    className={`flex-1 rounded-xl border p-3 ${
                      contactedSeller === false ? "border-pink-500 bg-pink-500/10" : "border-white/10"
                    }`}
                  >
                    Nei, ikke ennå
                  </button>
                </div>
              </div>
              {contactedSeller === true && (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Hva svarte selger? (valgfritt)
                  </label>
                  <textarea
                    value={sellerResponse}
                    onChange={(e) => setSellerResponse(e.target.value)}
                    placeholder="F.eks: Selger nekter ansvar, sier det er slitasje..."
                    maxLength={500}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 resize-none focus:border-pink-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">{sellerResponse.length} / 500 tegn</p>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("TIMING")}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={() => setStep("DESCRIPTION")}
                  disabled={!canProceedContact}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-2 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-40"
                >
                  Neste
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}

          {step === "DESCRIPTION" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-pink-400" />
                <h2 className="text-xl font-bold">Beskriv situasjonen</h2>
              </div>
              <p className="text-sm text-slate-300">
                Gi oss mer detaljer så blir analysen bedre. <span className="text-slate-500">(Valgfritt)</span>
              </p>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
                <p className="font-medium text-slate-300 mb-1">Tips - inkluder gjerne:</p>
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 resize-none focus:border-pink-500 focus:outline-none"
              />
              <p className="text-xs text-slate-500">{userDescription.length} / 1000 tegn</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("CONTACT")}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={analyzeWithAI}
                  disabled={isAnalyzing}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyserer...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Analyser saken min
                    </>
                  )}
                </button>
              </div>
            </section>
          )}

          {step === "RESULT" && outcome && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 space-y-5">
              <div
                className={`rounded-2xl p-4 ${
                  outcome.level === "GREEN"
                    ? "bg-green-500/10 border border-green-500/30"
                    : outcome.level === "YELLOW"
                    ? "bg-yellow-500/10 border border-yellow-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {outcome.level === "GREEN" ? (
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  ) : outcome.level === "YELLOW" ? (
                    <Clock className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      outcome.level === "GREEN"
                        ? "text-green-400"
                        : outcome.level === "YELLOW"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {outcome.level === "GREEN"
                      ? "SANNSYNLIG JA"
                      : outcome.level === "YELLOW"
                      ? "USIKKERT"
                      : "SANNSYNLIG NEI"}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{outcome.title}</h2>
                <p className="text-slate-300">{outcome.summary}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Nøkkelpunkter:</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  {outcome.keyPoints.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("DESCRIPTION")}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2 text-slate-300 hover:bg-white/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Tilbake
                </button>
                <button
                  onClick={goToReport}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-3 text-white font-semibold hover:from-pink-500 hover:to-purple-500 transition"
                >
                  <FileText className="h-5 w-5" />
                  Se full rapport
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}