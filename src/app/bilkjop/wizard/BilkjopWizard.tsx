"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import ReportPaywall from "@/components/bilkjop/ReportPaywall";
import { createCase, updateCase } from "@/lib/supabase";

import type { Step, WizardState } from "./types";
import { ISSUE_OPTIONS, COST_OPTIONS } from "./constants";
import {
  WIZARD_STEPS,
  stepTitle,
  canProceed,
  nextStep,
  prevStep,
  progressPct,
  mapPayload,
} from "./machine";

const INITIAL_STATE: WizardState = {
  vehicleType: "CAR",
  sellerType: null,
  vehicle: { make: "", model: "", year: "", km: "", price: "", regNum: "", purchaseDate: "" },
  buyerName: "",
  sellerName: "",
  issues: [],
  safetyCritical: null,
  notDriveable: null,
  costBracket: null,
  complainedQuickly: null,
  defectSoonAfter: null,
  contactedSeller: null,
  sellerResponse: "",
  userDescription: "",
  additionalInfo: "",
  sellerPromises: "",
  hadAsIsClause: null,
  visibleDefect: null,
  hasWorkshopReport: null,
  workshopReportText: "",
  uploadedFiles: [],
  finnUrl: "",
  adEvidenceFiles: [],
  adClaims: "",
  outcome: null,
  caseId: null,
  caseAccessToken: null,
};

export default function BilkjopWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>("BASICS");
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  // UI-only state
  const [showDescription, setShowDescription] = useState(false);
  const [showPromises, setShowPromises] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const caseAccessTokenRef = React.useRef<string | null>(null);

  useEffect(() => {
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam === "motorcycle") setState((s) => ({ ...s, vehicleType: "MOTORCYCLE" }));
    else if (vehicleParam === "car") setState((s) => ({ ...s, vehicleType: "CAR" }));
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  const update = (partial: Partial<WizardState>) => setState((s) => ({ ...s, ...partial }));

  const toggleIssue = (id: string) => {
    setState((s) => ({
      ...s,
      issues: s.issues.includes(id) ? s.issues.filter((i) => i !== id) : [...s.issues, id],
    }));
  };

  const vehicleText = (carText: string, mcText: string) =>
    state.vehicleType === "MOTORCYCLE" ? mcText : carText;

  const progress = progressPct(step);
  const isWizardStep = step !== "RESULT";

  const analyzeCase = async () => {
    setIsAnalyzing(true);
    try {
      const payload = mapPayload(state);

      const supabaseCase = await createCase("BIL", payload);
      if (supabaseCase) {
        setState((s) => ({
          ...s,
          caseId: supabaseCase.id,
          caseAccessToken: supabaseCase.access_token,
        }));
        caseAccessTokenRef.current = supabaseCase.access_token;
      }

      const response = await fetch("/api/analyze-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API failed");
      const result = await response.json();
      setState((s) => ({ ...s, outcome: result.outcome }));

      if (supabaseCase) {
        await updateCase(supabaseCase.id, { outcome: result.outcome, status: "completed" });
      }
      setStep("RESULT");
    } catch (error) {
      console.error("Case analysis failed:", error);
      setState((s) => ({
        ...s,
        outcome: {
          level: "YELLOW",
          title: "Vurdering fullført",
          summary: "Basert på informasjonen du har oppgitt, ser det ut til at du kan ha en sak. Vi anbefaler å dokumentere alt og vurdere å kontakte selger skriftlig.",
          confidence: "Middels",
          keyPoints: [
            "Dokumenter alle feil grundig med bilder og video",
            "Ta vare på all kommunikasjon med selger",
            "Sjekk reklamasjonsfristen for ditt kjøp",
          ],
          legalRefs: [{
            heading: s.sellerType === "DEALER" ? "Forbrukerkjøpsloven" : "Kjøpsloven",
            refs: [
              "§ 17: Mangel foreligger når varen ikke samsvarer med avtalen",
              "§ 27: Kjøper kan kreve retting, omlevering, prisavslag eller heving",
            ],
          }],
          nextSteps: [
            "Få skriftlig verkstedrapport på feilene",
            "Send skriftlig reklamasjon til selger",
            "Kontakt Forbrukerrådet ved behov",
          ],
          proTip: "Jo raskere du reklamerer, jo sterkere står saken din.",
          disclaimer: "Dette er veiledning, ikke juridisk rådgivning.",
        },
      }));
      setStep("RESULT");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveToLocalStorage = async () => {
    let token = caseAccessTokenRef.current || state.caseAccessToken;

    if (!token) {
      const payload = mapPayload(state);
      const retryCase = await createCase("BIL", payload);
      if (retryCase) {
        setState((s) => ({
          ...s,
          caseId: retryCase.id,
          caseAccessToken: retryCase.access_token,
        }));
        caseAccessTokenRef.current = retryCase.access_token;
        token = retryCase.access_token;
      }
    }

    if (!token) {
      alert("Feil: Kunne ikke opprette sak. Sjekk internettforbindelsen og prøv igjen.");
      return false;
    }

    // Set session cookie via resolve
    fetch("/api/case/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    }).catch(() => {});

    const data = {
      ...mapPayload(state),
      outcome: state.outcome,
      caseId: state.caseId,
    };
    localStorage.setItem("bilkjop-data", JSON.stringify(data));
    return true;
  };

  const goToReport = async () => {
    const saved = await saveToLocalStorage();
    if (saved) setShowPaywall(true);
  };

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/wizard-bg.jpg')" }} />

      {/* Progress bar */}
      {isWizardStep && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/[0.04]">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out" style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(16,185,129,0.3)" }} />
        </div>
      )}

      <div className="relative z-10">
        {/* ═══════════ WIZARD STEPS ═══════════ */}
        {isWizardStep && (
          <div className="mx-auto w-full max-w-2xl px-4 py-12 pt-14 border border-white/[0.12] bg-[#0a0f0d]/90 backdrop-blur-sm rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.6)] my-4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[11px] text-slate-500 font-semibold tracking-[0.1em] uppercase">
                {stepTitle(step)}
              </span>
              <span className="text-[11px] text-slate-700">
{progress}%
              </span>
            </div>

            {step === "BASICS" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Om kjøretøyet</h2>
                <div className="flex gap-2">
                  <button onClick={() => update({ vehicleType: "CAR" })} className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${state.vehicleType === "CAR" ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <Car className="h-4 w-4" />Bil
                  </button>
                  <button onClick={() => update({ vehicleType: "MOTORCYCLE" })} className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${state.vehicleType === "MOTORCYCLE" ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    🏍️ MC
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Ditt navn (valgfritt)</label>
                    <input type="text" autoComplete="name" placeholder="Ola Nordmann" value={state.buyerName} onChange={(e) => update({ buyerName: e.target.value })} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Selger (valgfritt)</label>
                    <input type="text" placeholder="Firma AS / Navn" value={state.sellerName} onChange={(e) => update({ sellerName: e.target.value })} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([["Merke", "make"], ["Modell", "model"], ["Reg.nr", "regNum"], ["Årsmodell", "year"], ["Kilometerstand", "km"], ["Kjøpesum (kr) *", "price"]] as const).map(([placeholder, key]) => (
                    <div key={key}>
                      <input type="text" inputMode={key === "year" || key === "km" ? "numeric" : key === "price" ? "decimal" : undefined} placeholder={placeholder} value={state.vehicle[key]} onChange={(e) => update({ vehicle: { ...state.vehicle, [key]: e.target.value } })} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                      {key === "regNum" && <p className="mt-1 text-xs text-slate-500">Finner du på vognkortet</p>}
                      {key === "km" && <p className="mt-1 text-xs text-slate-500">Ved kjøpstidspunktet</p>}
                      {key === "price" && <p className="mt-1 text-xs text-slate-500">Beløpet du faktisk betalte</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Kjøpsdato *</label>
                  <input type="date" value={state.vehicle.purchaseDate} onChange={(e) => update({ vehicle: { ...state.vehicle, purchaseDate: e.target.value } })} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  <p className="mt-1 text-xs text-slate-500">Datoen på kjøpskontrakten</p>
                </div>
                <p className="text-xs text-slate-600">* Obligatoriske felter</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => router.push("/kategorier")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("BASICS"))} disabled={!canProceed("BASICS", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "SELLER" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Hvem kjøpte du av?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {([["PRIVATE", User, "Privatperson", "FINN, Torget, bekjent"], ["DEALER", Building2, "Forhandler", "Bilforretning, merkeforhandler"]] as const).map(([type, Icon, label, desc]) => (
                    <button key={type} onClick={() => update({ sellerType: type })} className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${state.sellerType === type ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                      <Icon className={`h-8 w-8 ${state.sellerType === type ? "text-emerald-400" : ""}`} />
                      <span className="font-semibold">{label}</span>
                      <span className="text-xs text-slate-500">{desc}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("SELLER"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("SELLER"))} disabled={!canProceed("SELLER", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "ISSUES" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Hva er problemet?</h2>
                <p className="text-sm text-slate-400">Velg alle som gjelder</p>
                <div className="grid grid-cols-2 gap-3">
                  {ISSUE_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => toggleIssue(opt.id)} className={`rounded-xl border p-4 text-left text-sm transition ${state.issues.includes(opt.id) ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>{opt.label}</button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("ISSUES"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("ISSUES"))} disabled={!canProceed("ISSUES", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                      <button onClick={() => update({ safetyCritical: true })} className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${state.safetyCritical === true ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}><AlertTriangle className="h-4 w-4" />Ja</button>
                      <button onClick={() => update({ safetyCritical: false })} className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${state.safetyCritical === false ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}><CheckCircle2 className="h-4 w-4" />Nei</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 mb-3">Er bilen kjørbar?</p>
                    <div className="flex gap-3">
                      <button onClick={() => update({ notDriveable: false })} className={`flex-1 rounded-xl border p-4 transition ${state.notDriveable === false ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, kjørbar</button>
                      <button onClick={() => update({ notDriveable: true })} className={`flex-1 rounded-xl border p-4 transition ${state.notDriveable === true ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, står</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("SEVERITY"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("SEVERITY"))} disabled={!canProceed("SEVERITY", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "COST" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Estimert reparasjonskostnad</h2>
                <div className="space-y-2">
                  {COST_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => update({ costBracket: opt.id })} className={`w-full rounded-xl border p-4 text-left transition ${state.costBracket === opt.id ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                      <p className="font-medium">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("COST"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("COST"))} disabled={!canProceed("COST", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                      <button onClick={() => update({ complainedQuickly: true })} className={`flex-1 rounded-xl border p-4 transition ${state.complainedQuickly === true ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, med en gang</button>
                      <button onClick={() => update({ complainedQuickly: false })} className={`flex-1 rounded-xl border p-4 transition ${state.complainedQuickly === false ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, ventet litt</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 mb-3">Oppstod feilen kort tid etter kjøpet?</p>
                    <div className="flex gap-3">
                      <button onClick={() => update({ defectSoonAfter: true })} className={`flex-1 rounded-xl border p-4 transition ${state.defectSoonAfter === true ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, ganske raskt</button>
                      <button onClick={() => update({ defectSoonAfter: false })} className={`flex-1 rounded-xl border p-4 transition ${state.defectSoonAfter === false ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, en stund etter</button>
                    </div>
                  </div>
                </div>
                {canProceed("TIMING", state) && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Foreløpig indikasjon</p>
                    <p className="text-sm text-slate-300">
                      {state.sellerType === "DEALER"
                        ? "Svarene dine tyder på at du kan ha et krav som forbrukerkjøper."
                        : "Svarene dine tyder på at du kan ha krav, men terskelen ved privatkjøp er noe høyere."}
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• {state.defectSoonAfter ? "Feil kort etter kjøp tyder på at problemet forelå ved levering" : "Feil som oppstår senere kan fortsatt være en mangel"}</li>
                      <li>• {state.complainedQuickly ? "Rask reklamasjon styrker posisjonen din" : "Sen reklamasjon kan påvirke saken, men utelukker ikke krav"}</li>
                    </ul>
                    <p className="text-[10px] text-slate-600 italic">Foreløpig – endelig vurdering kommer etter full sjekk</p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("TIMING"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("TIMING"))} disabled={!canProceed("TIMING", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "CONTACT" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Kontakt med selger</h2>
                <div>
                  <p className="text-sm text-slate-300 mb-3">Har du kontaktet selger om problemet?</p>
                  <div className="flex gap-3">
                    <button onClick={() => update({ contactedSeller: true })} className={`flex-1 rounded-xl border p-4 transition ${state.contactedSeller === true ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja</button>
                    <button onClick={() => update({ contactedSeller: false })} className={`flex-1 rounded-xl border p-4 transition ${state.contactedSeller === false ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, ikke ennå</button>
                  </div>
                </div>
                {state.contactedSeller === true && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Hva svarte selger? (valgfritt)</label>
                    <textarea value={state.sellerResponse} onChange={(e) => update({ sellerResponse: e.target.value })} placeholder="F.eks: Selger nekter ansvar, sier det er slitasje..." maxLength={500} rows={3} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                    <p className="text-xs text-slate-600 mt-1">{state.sellerResponse.length} / 500 tegn</p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("CONTACT"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("CONTACT"))} disabled={!canProceed("CONTACT", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "DESCRIPTION" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold">Beskriv situasjonen</h2>
                </div>
                {!showDescription && !state.userDescription ? (
                  <button onClick={() => setShowDescription(true)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-left text-sm text-slate-400 hover:border-white/20 transition">
                    Legg til detaljer (valgfritt)
                  </button>
                ) : (
                  <>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                      <p className="font-medium text-slate-400 mb-1">Tips:</p>
                      <ul className="space-y-0.5">
                        <li>• Symptomer og når de oppstod</li>
                        <li>• Hva selger sa/lovte ved kjøp</li>
                        <li>• Verkstedfunn eller feilkoder</li>
                      </ul>
                    </div>
                    <textarea value={state.userDescription} onChange={(e) => update({ userDescription: e.target.value })} placeholder="Beskriv hva som har skjedd..." maxLength={1000} rows={5} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                    <p className="text-xs text-slate-600">{state.userDescription.length} / 1000 tegn</p>
                  </>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("DESCRIPTION"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("DESCRIPTION"))} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "PROMISES" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                  <h2 className="text-2xl font-bold">Selgers løfter</h2>
                </div>
                {!showPromises && !state.sellerPromises ? (
                  <button onClick={() => setShowPromises(true)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-left text-sm text-slate-400 hover:border-white/20 transition">
                    Legg til selgers løfter (valgfritt)
                  </button>
                ) : (
                  <>
                    <p className="text-sm text-slate-400">Lovte selger noe spesifikt om {vehicleText("bilens", "motorsykkelens")} tilstand?</p>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                      <p className="font-medium text-slate-400 mb-1">Eksempler:</p>
                      <ul className="space-y-0.5">
                        <li>• &ldquo;{vehicleText("Bilen", "Motorsykkelen")} er nylig EU-godkjent&rdquo;</li>
                        <li>• &ldquo;Motor og girkasse er i topp stand&rdquo;</li>
                        <li>• &ldquo;Ingen rust eller skjulte feil&rdquo;</li>
                      </ul>
                    </div>
                    <textarea value={state.sellerPromises} onChange={(e) => update({ sellerPromises: e.target.value })} placeholder={`Beskriv hva selger sa eller lovte om ${vehicleText("bilen", "motorsykkelen")}...`} maxLength={1000} rows={4} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                    <p className="text-xs text-slate-600">{state.sellerPromises.length} / 1000 tegn</p>
                  </>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("PROMISES"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("PROMISES"))} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "AS_IS_CLAUSE" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-red-400" />
                  <h2 className="text-2xl font-bold">&ldquo;Som den er&rdquo;-klausul</h2>
                </div>
                <p className="text-sm text-slate-400">Stod det &ldquo;selges som den er&rdquo; i annonsen eller kjøpekontrakten?</p>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                  <p className="font-semibold text-slate-300 mb-2">Hva betyr dette?</p>
                  <p className="text-slate-400 mb-2">Ved kjøp fra forhandler gjelder egne regler og forbehold har ofte mindre betydning.</p>
                  <p className="text-slate-400">Ved privatkjøp kan &ldquo;som den er&rdquo; få betydning, men beskytter ikke mot skjulte feil.</p>
                </div>
                <div className="space-y-3">
                  <button onClick={() => update({ hadAsIsClause: false })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.hadAsIsClause === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, ingen slik klausul</p>
                    <p className="text-xs text-slate-500 mt-1">Normalt salg uten spesielle forbehold</p>
                  </button>
                  <button onClick={() => update({ hadAsIsClause: true })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.hadAsIsClause === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, {vehicleText("bilen", "motorsykkelen")} ble solgt &ldquo;som den er&rdquo;</p>
                    <p className="text-xs text-slate-500 mt-1">Det stod i annonse/kontrakt at {vehicleText("bilen", "motorsykkelen")} selges uten garanti</p>
                  </button>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("AS_IS_CLAUSE"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("AS_IS_CLAUSE"))} disabled={!canProceed("AS_IS_CLAUSE", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "VISIBLE_DEFECT" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                  <h2 className="text-2xl font-bold">Synlig ved kjøpet?</h2>
                </div>
                <p className="text-sm text-slate-400">Var feilen synlig da du kjøpte {vehicleText("bilen", "motorsykkelen")}?</p>
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 text-sm">
                  <p className="font-semibold text-orange-400 mb-2">Åpenbarhetsregelen:</p>
                  <p className="text-slate-400">Feil som var tydelig synlige ved kjøpet gir normalt ikke reklamasjonsrett. Skjulte feil derimot gir rett til reklamasjon.</p>
                </div>
                <div className="space-y-3">
                  <button onClick={() => update({ visibleDefect: false })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.visibleDefect === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, feilen var skjult</p>
                    <p className="text-xs text-slate-500 mt-1">Jeg oppdaget problemet først etter kjøpet</p>
                  </button>
                  <button onClick={() => update({ visibleDefect: true })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.visibleDefect === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, feilen kunne sees ved kjøpet</p>
                    <p className="text-xs text-slate-500 mt-1">Problemet var synlig, men jeg trodde det var mindre alvorlig</p>
                  </button>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("VISIBLE_DEFECT"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("VISIBLE_DEFECT"))} disabled={!canProceed("VISIBLE_DEFECT", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "WORKSHOP_REPORT" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold">Verkstedsrapport</h2>
                </div>
                <p className="text-sm text-slate-400">Har du fått {vehicleText("bilen", "motorsykkelen")} undersøkt av et verksted?</p>
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm">
                  <p className="font-semibold text-blue-400 mb-2">Hvorfor er dette viktig?</p>
                  <p className="text-slate-400">En rapport fra et autorisert verksted gir dokumentasjon på feilen og kostnadene. Dette styrker saken din betydelig.</p>
                </div>
                <div className="space-y-3">
                  <button onClick={() => update({ hasWorkshopReport: true })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.hasWorkshopReport === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, jeg har verkstedsrapport</p>
                    <p className="text-xs text-slate-500 mt-1">{vehicleText("Bilen", "Motorsykkelen")} er undersøkt og jeg har dokumentasjon</p>
                  </button>
                  <button onClick={() => update({ hasWorkshopReport: false })} className={`w-full rounded-xl border px-5 py-4 text-left transition ${state.hasWorkshopReport === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, ikke undersøkt ennå</p>
                    <p className="text-xs text-slate-500 mt-1">Jeg har ikke tatt {vehicleText("bilen", "motorsykkelen")} til verksted</p>
                  </button>
                </div>
                {state.hasWorkshopReport === true && (
                  <>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                      <p className="font-medium text-slate-400 mb-2">Lim inn eller oppsummer rapporten:</p>
                      <ul className="space-y-1">
                        <li>• Hva verkstedet fant (feilkoder, diagnosefunn)</li>
                        <li>• Prisestimat på reparasjon</li>
                        <li>• Verkstedets vurdering av feilen</li>
                      </ul>
                    </div>
                    <textarea value={state.workshopReportText} onChange={(e) => update({ workshopReportText: e.target.value })} placeholder="Lim inn eller oppsummer verkstedsrapporten her..." maxLength={2000} rows={6} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition font-mono text-base" />
                    <p className="text-xs text-slate-600">{state.workshopReportText.length} / 2000 tegn</p>
                  </>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("WORKSHOP_REPORT"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("WORKSHOP_REPORT"))} disabled={!canProceed("WORKSHOP_REPORT", state)} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "AD_EVIDENCE" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-bold">Annonse og bevis</h2>
                </div>
                <p className="text-sm text-slate-400">Hadde annonsen løfter som viste seg å være feil? <span className="text-slate-600">(Valgfritt)</span></p>
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-sm">
                  <p className="font-semibold text-purple-400 mb-2">Hvorfor er dette nyttig?</p>
                  <p className="text-slate-400">Hvis annonsen lovte noe som viste seg å være feil, kan dette styrke saken din betydelig.</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Lenke til annonsen (valgfritt)</label>
                  <input type="url" value={state.finnUrl} onChange={(e) => update({ finnUrl: e.target.value })} placeholder="https://finn.no/..." className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  <p className="text-xs text-slate-600 mt-1">Lenken brukes kun som referanse i dokumentene.</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Last opp skjermbilde eller PDF av annonsen</label>
                  <FileUpload category="bilkjop-annonse" maxFiles={5} files={state.adEvidenceFiles} onFilesChange={(files) => update({ adEvidenceFiles: files })} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Hva ble lovet i annonsen som ikke stemmer? (valgfritt)</label>
                  <textarea value={state.adClaims} onChange={(e) => update({ adClaims: e.target.value })} placeholder="For eksempel: 'I annonsen stod det at bilen var EU-godkjent uten anmerkninger...'" maxLength={600} rows={4} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  <p className="text-xs text-slate-600 mt-1">{state.adClaims.length} / 600 tegn</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("AD_EVIDENCE"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep(nextStep("AD_EVIDENCE"))} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "ADDITIONAL" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-white" />
                  <h2 className="text-2xl font-bold">Tilleggsinformasjon</h2>
                </div>
                {!showAdditional && !state.additionalInfo ? (
                  <button onClick={() => setShowAdditional(true)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-left text-sm text-slate-400 hover:border-white/20 transition">
                    Legg til detaljer (valgfritt)
                  </button>
                ) : (
                  <>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                      <p className="font-medium text-slate-400 mb-1">Tips:</p>
                      <ul className="space-y-0.5">
                        <li>• Detaljert historikk om problemet</li>
                        <li>• Feilkoder og diagnoseinformasjon</li>
                        <li>• Tidligere kommunikasjon med selger</li>
                      </ul>
                    </div>
                    <textarea value={state.additionalInfo} onChange={(e) => update({ additionalInfo: e.target.value })} placeholder="Skriv så mye du ønsker her..." maxLength={5000} rows={6} className="w-full rounded-xl border border-white/[0.20] bg-white/[0.07] px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition font-mono text-base" />
                    <p className="text-xs text-slate-600">{state.additionalInfo.length} / 5000 tegn</p>
                  </>
                )}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Last opp dokumentasjon (valgfritt)</p>
                  <FileUpload category="bilkjop" maxFiles={10} files={state.uploadedFiles} onFilesChange={(files) => update({ uploadedFiles: files })} />
                  <p className="text-xs text-slate-600 mt-2">Verkstedsrapporter, bilder av feil, kjøpekontrakt, eller annen dokumentasjon</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 space-y-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Oppsummering</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>Kjøpsdato: {state.vehicle.purchaseDate || "–"}</li>
                    <li>Pris: {state.vehicle.price || "–"}</li>
                    <li>Kjøpt av: {state.sellerType === "DEALER" ? "Forhandler" : state.sellerType === "PRIVATE" ? "Privatperson" : "–"}</li>
                    <li>Feil: {state.issues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label).filter(Boolean).join(", ") || "–"}</li>
                    {state.costBracket && <li>Estimert kostnad: {COST_OPTIONS.find((o) => o.id === state.costBracket)?.label}</li>}
                  </ul>
                  <p className="text-[10px] text-slate-600">Dette brukes til å vurdere saken og lage kravbrev.</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(prevStep("ADDITIONAL"))} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  {isAnalyzing ? (
                    <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-emerald-400"><Loader2 className="h-4 w-4 animate-spin" />Sjekker regelverk</div>
                      <div className="flex items-center gap-2 text-sm text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />Vurderer tidslinje og reklamasjon</div>
                      <div className="flex items-center gap-2 text-sm text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />Formulerer anbefalt neste steg</div>
                    </div>
                  ) : (
                    <button onClick={analyzeCase} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition"><Sparkles className="h-5 w-5" />Vurder saken min</button>
                  )}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ═══════════ RESULT ═══════════ */}
        {step === "RESULT" && state.outcome && (
          <div className="mx-auto w-full max-w-2xl px-4 py-12">
            <section className="space-y-5">
              <div className={`rounded-2xl p-6 ${state.outcome.level === "GREEN" ? "bg-emerald-500/10 border border-emerald-500/20" : state.outcome.level === "YELLOW" ? "bg-amber-500/10 border border-amber-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <div className="flex items-center gap-2 mb-3">
                  {state.outcome.level === "GREEN" ? <CheckCircle2 className="h-6 w-6 text-emerald-400" /> : state.outcome.level === "YELLOW" ? <Clock className="h-6 w-6 text-amber-400" /> : <AlertTriangle className="h-6 w-6 text-red-400" />}
                  <span className={`text-sm font-bold uppercase tracking-wide ${state.outcome.level === "GREEN" ? "text-emerald-400" : state.outcome.level === "YELLOW" ? "text-amber-400" : "text-red-400"}`}>
                    {state.outcome.level === "GREEN" ? "Sannsynlig krav" : state.outcome.level === "YELLOW" ? "Usikkert" : "Lite sannsynlig"}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{state.outcome.title}</h2>
                <p className="text-slate-400 text-sm">
                  {state.outcome.level === "RED"
                    ? "Basert på svarene dine er det usikkert om vilkårene er oppfylt."
                    : "Basert på svarene dine kan det foreligge en mangel."}
                </p>
              </div>

              {!showPaywall && state.outcome.keyPoints && state.outcome.keyPoints.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-300">Dette betyr ofte:</p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    {state.outcome.keyPoints.slice(0, 3).map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!showPaywall && (
                <>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep("ADDITIONAL")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                    <button onClick={goToReport} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition"><FileText className="h-5 w-5" />Få kravbrev og full vurdering (99 kr)<ArrowRight className="h-5 w-5" /></button>
                  </div>
                  <ul className="text-xs text-slate-500 space-y-1 px-1">
                    <li>• Ferdig kravbrev klart til å sende</li>
                    <li>• Tilpasset lovhenvisning</li>
                    <li>• Konkrete neste steg</li>
                  </ul>
                </>
              )}

              {showPaywall && (
                <div className="border-t border-white/10 pt-6">
                  <ReportPaywall
                    accessToken={state.caseAccessToken}
                    outcome={state.outcome}
                    summaryRows={[
                      { label: "Kjøper", value: state.buyerName || "–" },
                      { label: "Selger", value: state.sellerName || "–" },
                      { label: "Type", value: state.sellerType === "DEALER" ? "Forhandler" : state.sellerType === "PRIVATE" ? "Privatperson" : "–" },
                      { label: "Kjøretøy", value: [state.vehicle.make, state.vehicle.model, state.vehicle.year].filter(Boolean).join(" ") || "–" },
                      { label: "Pris", value: state.vehicle.price || "–" },
                    ]}
                  />
                  <button onClick={() => setShowPaywall(false)} className="mt-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition"><ArrowLeft className="h-4 w-4" />Tilbake til resultat</button>
                </div>
              )}

              <p className="text-xs text-slate-600 text-center">Veiledende vurdering, ikke juridisk rådgivning</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
