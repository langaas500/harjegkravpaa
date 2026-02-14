"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  ShieldCheck,
  Users,
  Zap,
  Scale,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { createCase, updateCase } from "@/lib/supabase";

type SellerType = "PRIVATE" | "DEALER" | null;
type VehicleType = "CAR" | "MOTORCYCLE" | null;
type Step = "INTRO" | "BASICS" | "SELLER" | "ISSUES" | "SEVERITY" | "COST" | "TIMING" | "CONTACT" | "DESCRIPTION" | "PROMISES" | "AS_IS_CLAUSE" | "VISIBLE_DEFECT" | "WORKSHOP_REPORT" | "AD_EVIDENCE" | "ADDITIONAL" | "RESULT";

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

const WIZARD_STEPS: Step[] = ["INTRO", "BASICS", "SELLER", "ISSUES", "SEVERITY", "COST", "TIMING", "CONTACT", "DESCRIPTION", "PROMISES", "AS_IS_CLAUSE", "VISIBLE_DEFECT", "WORKSHOP_REPORT", "AD_EVIDENCE", "ADDITIONAL", "RESULT"];

/* ─── Hero Illustration ─── */
function HeroIllustration() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <div className="relative w-full max-w-[420px] aspect-[4/3] mx-auto">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full transition-opacity duration-[1500ms]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", filter: "blur(40px)", opacity: mounted ? 1 : 0 }}
      />
      <div
        className="absolute top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full transition-opacity duration-[2000ms] delay-300"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)", filter: "blur(30px)", opacity: mounted ? 1 : 0 }}
      />

      <svg viewBox="0 0 420 315" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-[1]">
        <defs>
          <linearGradient id="carGrad" x1="60" y1="160" x2="360" y2="220">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="160" y1="140" x2="280" y2="180">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="300" y1="50" x2="370" y2="140">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="alertGrad" x1="50" y1="60" x2="100" y2="120">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="250" x2="420" y2="250">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="rgba(16,185,129,0.06)" />
            <stop offset="80%" stopColor="rgba(16,185,129,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <line x1="40" y1="248" x2="380" y2="248" stroke="url(#groundGrad)" strokeWidth="1" className="transition-opacity duration-1000 delay-500" style={{ opacity: mounted ? 1 : 0 }} />
        <ellipse cx="210" cy="250" rx="140" ry="8" fill="rgba(16,185,129,0.03)" className="transition-opacity duration-1000 delay-[600ms]" style={{ opacity: mounted ? 1 : 0 }} />

        <g className="transition-all duration-1000 delay-300" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-20px)" }}>
          <path d="M80 215 L95 185 L140 155 L170 145 L260 145 L300 160 L330 185 L345 215 Z" fill="url(#carGrad)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
          <path d="M155 155 L175 125 L270 125 L295 155" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
          <path d="M160 152 L178 128 L230 128 L230 152 Z" fill="url(#glassGrad)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
          <path d="M240 152 L240 128 L268 128 L288 152 Z" fill="url(#glassGrad)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
          <line x1="95" y1="195" x2="330" y2="195" stroke="rgba(16,185,129,0.15)" strokeWidth="0.5" />
          <line x1="230" y1="128" x2="230" y2="152" stroke="rgba(52,211,153,0.15)" strokeWidth="1" />
          <ellipse cx="338" cy="200" rx="8" ry="6" fill="rgba(16,185,129,0.3)" filter="url(#glow)" />
          <ellipse cx="85" cy="200" rx="6" ry="5" fill="rgba(239,68,68,0.3)" filter="url(#glow)" />
        </g>

        <g className="transition-opacity duration-[800ms] delay-[600ms]" style={{ opacity: mounted ? 1 : 0 }}>
          <circle cx="140" cy="240" r="22" fill="#0a0f0d" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
          <circle cx="140" cy="240" r="14" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
          <circle cx="140" cy="240" r="4" fill="rgba(16,185,129,0.3)" />
          <circle cx="290" cy="240" r="22" fill="#0a0f0d" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" />
          <circle cx="290" cy="240" r="14" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
          <circle cx="290" cy="240" r="4" fill="rgba(16,185,129,0.3)" />
        </g>

        <g className="transition-all duration-[800ms] delay-[800ms]" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)" }}>
          <circle cx="340" cy="85" r="32" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
          <path d="M340 60 L340 60 C340 60 358 64 358 64 L358 82 C358 95 340 105 340 105 C340 105 322 95 322 82 L322 64 Z" fill="url(#shieldGrad)" fillOpacity="0.15" stroke="url(#shieldGrad)" strokeWidth="1.5" />
          <polyline points="332,82 337,87 348,76" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
        </g>

        <g className="transition-all duration-[800ms] delay-1000" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)" }}>
          <circle cx="80" cy="85" r="28" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.15)" strokeWidth="1" />
          <path d="M80 68 L93 92 L67 92 Z" fill="none" stroke="url(#alertGrad)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="80" y1="76" x2="80" y2="84" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="80" cy="88" r="1" fill="#f59e0b" />
        </g>

        <g className="transition-opacity duration-[1500ms] delay-[1200ms]" style={{ opacity: mounted ? 0.6 : 0 }}>
          <line x1="120" y1="120" x2="120" y2="260" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="210" y1="110" x2="210" y2="260" stroke="rgba(16,185,129,0.06)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="300" y1="120" x2="300" y2="260" stroke="rgba(16,185,129,0.08)" strokeWidth="0.5" strokeDasharray="4 6" />
        </g>

        <g className="transition-opacity duration-1000 delay-[1400ms]" style={{ opacity: mounted ? 1 : 0 }}>
          <circle cx="220" cy="170" r="3" fill="#10b981" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <line x1="223" y1="170" x2="260" y2="155" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
          <circle cx="140" cy="210" r="2.5" fill="#f59e0b" filter="url(#glow)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="100" cy="190" r="2.5" fill="#ef4444" filter="url(#glow)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" begin="1s" />
          </circle>
        </g>

        <g className="transition-all duration-[800ms] delay-[1600ms]" style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(8px)" }}>
          <rect x="255" y="50" width="48" height="22" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
          <text x="279" y="64" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="600" fontFamily="system-ui">47k kr</text>
        </g>

        <g className="transition-opacity duration-1000 delay-[1800ms]" style={{ opacity: mounted ? 1 : 0 }}>
          <text x="55" y="145" fill="rgba(16,185,129,0.12)" fontSize="36" fontWeight="700" fontFamily="Georgia, serif">§</text>
        </g>
      </svg>
    </div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { setTimeout(() => setStarted(true), 800); }, []);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target]);
  return <>{value.toLocaleString("no-NO")}{suffix}</>;
}

/* ─── Intro Splash (auto-advance) ─── */
function IntroSplash({ onSkip, caseCount }: { onSkip: () => void; caseCount: number }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const DURATION = 5000;

  const phases = [
    { text: "Forbereder vurdering", icon: Scale },
    { text: "Laster juridisk grunnlag", icon: ShieldCheck },
    { text: "Klargjør skjema", icon: FileText },
    { text: "Starter wizard", icon: Sparkles },
  ];

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      setPhase(Math.min(Math.floor(elapsed / (DURATION / phases.length)), phases.length - 1));

      if (elapsed >= DURATION) {
        onSkip();
        return;
      }
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onSkip]);

  const CurrentIcon = phases[phase].icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 0; } 100% { transform: scale(0.9); opacity: 0; } }
        @keyframes fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Illustration */}
      <div className="w-full max-w-[320px] mb-10 animate-[float_6s_ease-in-out_infinite]">
        <HeroIllustration />
      </div>

      {/* Phase text */}
      <div className="text-center mb-8" key={phase} style={{ animation: "fade-up 0.4s ease-out" }}>
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-[pulse-ring_2s_ease-out_infinite]" />
            <div className="relative p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CurrentIcon className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <span className="text-lg font-semibold text-white">{phases[phase].text}</span>
        </div>
        <p className="text-sm text-slate-500">Bilkjøp – juridisk vurdering</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mb-6">
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-none"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(16,185,129,0.4)" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[11px] text-slate-600">{Math.round(progress)}%</span>
          <span className="text-[11px] text-slate-600">{Math.max(0, Math.ceil((DURATION - (progress / 100) * DURATION) / 1000))}s</span>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="group flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition"
      >
        Hopp over
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Trust badges */}
      <div className="flex items-center gap-5 mt-10 text-[11px] text-slate-600">
        <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-emerald-500/40" />2 min</span>
        <span className="flex items-center gap-1.5"><Users className="h-3 w-3 text-emerald-500/40" />{caseCount > 0 ? `${caseCount}+ saker` : "Gratis vurdering"}</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-emerald-500/40" />Gratis</span>
      </div>
    </div>
  );
}

function BilkjopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("INTRO");
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    const vehicleParam = searchParams.get("vehicle");
    if (vehicleParam === "motorcycle") setVehicleType("MOTORCYCLE");
    else if (vehicleParam === "car") setVehicleType("CAR");
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { if (d.count > 0) setCaseCount(d.count); })
      .catch(() => {});
  }, []);

  const [sellerType, setSellerType] = useState<SellerType>(null);
  const [vehicle, setVehicle] = useState<VehicleInfo>({ make: "", model: "", year: "", km: "", price: "", regNum: "", purchaseDate: "" });
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
  const [sellerPromises, setSellerPromises] = useState("");
  const [hadAsIsClause, setHadAsIsClause] = useState<boolean | null>(null);
  const [visibleDefect, setVisibleDefect] = useState<boolean | null>(null);
  const [hasWorkshopReport, setHasWorkshopReport] = useState<boolean | null>(null);
  const [workshopReportText, setWorkshopReportText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);
  const [finnUrl, setFinnUrl] = useState("");
  const [adEvidenceFiles, setAdEvidenceFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);
  const [adClaims, setAdClaims] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseAccessToken, setCaseAccessToken] = useState<string | null>(null);

  const toggleIssue = (id: string) => {
    setIssues((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const vehicleText = (carText: string, mcText: string) => vehicleType === "MOTORCYCLE" ? mcText : carText;

  const canProceedBasics = vehicle.make && vehicle.model && vehicle.price && vehicle.purchaseDate;
  const canProceedIssues = issues.length > 0;
  const canProceedSeverity = safetyCritical !== null && notDriveable !== null;
  const canProceedCost = costBracket !== null;
  const canProceedTiming = complainedQuickly !== null && defectSoonAfter !== null;
  const canProceedContact = contactedSeller !== null;

  const currentStepIndex = WIZARD_STEPS.indexOf(step);
  const totalSteps = WIZARD_STEPS.length - 1;
  const progressPct = step === "INTRO" ? 0 : step === "RESULT" ? 100 : Math.round((currentStepIndex / totalSteps) * 100);

  const handleIntroComplete = React.useCallback(() => {
    setVehicleType((prev) => prev || "CAR");
    setStep("BASICS");
  }, []);

  const analyzeCase = async () => {
    setIsAnalyzing(true);
    try {
      const issueLabels = issues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id);
      const costLabel = COST_OPTIONS.find((o) => o.id === costBracket)?.label || costBracket;

      const payload = {
        vehicleType, sellerType, vehicle, buyerName, sellerName,
        issues: issueLabels, safetyCritical, notDriveable, costBracket: costLabel,
        complainedQuickly, defectSoonAfter, contactedSeller,
        sellerResponse: contactedSeller ? sellerResponse : null,
        userDescription, additionalInfo, sellerPromises, hadAsIsClause, visibleDefect,
        hasWorkshopReport, workshopReportText: hasWorkshopReport ? workshopReportText : null,
        uploadedFiles, finnUrl: finnUrl || null, adEvidenceFiles, adClaims: adClaims || null,
      };

      const supabaseCase = await createCase("BIL", payload);
      if (supabaseCase) {
        setCaseId(supabaseCase.id);
        setCaseAccessToken(supabaseCase.access_token);
      }

      const response = await fetch("/api/analyze-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API failed");
      const result = await response.json();
      setOutcome(result.outcome);

      if (supabaseCase) {
        await updateCase(supabaseCase.id, { outcome: result.outcome, status: "completed" });
      }
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
        legalRefs: [{
          heading: sellerType === "DEALER" ? "Forbrukerkjøpsloven" : "Kjøpsloven",
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
      });
      setStep("RESULT");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goToReport = () => {
    const data = {
      vehicleType, sellerType, vehicle, buyerName, sellerName,
      issues: issues.map((id) => ISSUE_OPTIONS.find((o) => o.id === id)?.label || id),
      safetyCritical, notDriveable,
      costBracket: COST_OPTIONS.find((o) => o.id === costBracket)?.label || costBracket,
      complainedQuickly, defectSoonAfter, contactedSeller,
      sellerResponse: contactedSeller ? sellerResponse : null,
      userDescription, additionalInfo, sellerPromises, hadAsIsClause, visibleDefect,
      hasWorkshopReport, workshopReportText: hasWorkshopReport ? workshopReportText : null,
      uploadedFiles, finnUrl: finnUrl || null, adEvidenceFiles, adClaims: adClaims || null,
      outcome, caseId, access_token: caseAccessToken || crypto.randomUUID(),
    };
    localStorage.setItem("bilkjop-data", JSON.stringify(data));
    router.push("/bilkjop/rapport");
  };

  const isWizardStep = step !== "INTRO" && step !== "RESULT";

  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 70%)" }} />
      </div>

      {/* Progress bar */}
      {isWizardStep && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/[0.04]">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out" style={{ width: `${progressPct}%`, boxShadow: "0 0 12px rgba(16,185,129,0.3)" }} />
        </div>
      )}

      <div className="relative z-10">
        {/* ═══════════ INTRO (auto-advance splash) ═══════════ */}
        {step === "INTRO" && (
          <IntroSplash onSkip={handleIntroComplete} caseCount={caseCount} />
        )}

        {/* ═══════════ WIZARD STEPS ═══════════ */}
        {isWizardStep && (
          <div className="mx-auto w-full max-w-2xl px-4 py-12 pt-14">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[11px] text-slate-500 font-semibold tracking-[0.1em] uppercase">
                {step === "BASICS" && "Kjøretøy"}
                {step === "SELLER" && "Selger"}
                {step === "ISSUES" && "Problem"}
                {step === "SEVERITY" && "Alvorlighet"}
                {step === "COST" && "Kostnad"}
                {step === "TIMING" && "Tidslinje"}
                {step === "CONTACT" && "Kontakt"}
                {step === "DESCRIPTION" && "Beskrivelse"}
                {step === "PROMISES" && "Løfter"}
                {step === "AS_IS_CLAUSE" && "Forbehold"}
                {step === "VISIBLE_DEFECT" && "Synlighet"}
                {step === "WORKSHOP_REPORT" && "Dokumentasjon"}
                {step === "AD_EVIDENCE" && "Annonse"}
                {step === "ADDITIONAL" && "Tillegg"}
              </span>
              <span className="text-[11px] text-slate-700">{progressPct}%</span>
            </div>

            {step === "BASICS" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Om kjøretøyet</h2>
                <div className="flex gap-2">
                  <button onClick={() => setVehicleType("CAR")} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${vehicleType === "CAR" ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <Car className="h-4 w-4" />Bil
                  </button>
                  <button onClick={() => setVehicleType("MOTORCYCLE")} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${vehicleType === "MOTORCYCLE" ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-400" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    🏍️ MC
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Ditt navn (valgfritt)</label>
                    <input type="text" placeholder="Ola Nordmann" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Selger (valgfritt)</label>
                    <input type="text" placeholder="Firma AS / Navn" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([["Merke *", "make"], ["Modell *", "model"], ["Reg.nr", "regNum"], ["Årsmodell", "year"], ["Kilometerstand", "km"], ["Kjøpesum (kr) *", "price"]] as const).map(([placeholder, key]) => (
                    <input key={key} type="text" placeholder={placeholder} value={vehicle[key]} onChange={(e) => setVehicle({ ...vehicle, [key]: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  ))}
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Kjøpsdato *</label>
                  <input type="date" value={vehicle.purchaseDate} onChange={(e) => setVehicle({ ...vehicle, purchaseDate: e.target.value })} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                </div>
                <p className="text-xs text-slate-600">* Obligatoriske felter</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("INTRO")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("SELLER")} disabled={!canProceedBasics} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "SELLER" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Hvem kjøpte du av?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {([["PRIVATE", User, "Privatperson", "FINN, Torget, bekjent"], ["DEALER", Building2, "Forhandler", "Bilforretning, merkeforhandler"]] as const).map(([type, Icon, label, desc]) => (
                    <button key={type} onClick={() => setSellerType(type)} className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${sellerType === type ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                      <Icon className={`h-8 w-8 ${sellerType === type ? "text-emerald-400" : ""}`} />
                      <span className="font-semibold">{label}</span>
                      <span className="text-xs text-slate-500">{desc}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("BASICS")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("ISSUES")} disabled={!sellerType} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "ISSUES" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Hva er problemet?</h2>
                <p className="text-sm text-slate-400">Velg alle som gjelder</p>
                <div className="grid grid-cols-2 gap-3">
                  {ISSUE_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => toggleIssue(opt.id)} className={`rounded-xl border p-4 text-left text-sm transition ${issues.includes(opt.id) ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>{opt.label}</button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("SELLER")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("SEVERITY")} disabled={!canProceedIssues} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                      <button onClick={() => setSafetyCritical(true)} className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${safetyCritical === true ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}><AlertTriangle className="h-4 w-4" />Ja</button>
                      <button onClick={() => setSafetyCritical(false)} className={`flex-1 rounded-xl border p-4 flex items-center justify-center gap-2 transition ${safetyCritical === false ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}><CheckCircle2 className="h-4 w-4" />Nei</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 mb-3">Er bilen kjørbar?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setNotDriveable(false)} className={`flex-1 rounded-xl border p-4 transition ${notDriveable === false ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, kjørbar</button>
                      <button onClick={() => setNotDriveable(true)} className={`flex-1 rounded-xl border p-4 transition ${notDriveable === true ? "border-red-500/40 bg-red-500/10 text-red-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, står</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("ISSUES")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("COST")} disabled={!canProceedSeverity} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "COST" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Estimert reparasjonskostnad</h2>
                <div className="space-y-2">
                  {COST_OPTIONS.map((opt) => (
                    <button key={opt.id} onClick={() => setCostBracket(opt.id)} className={`w-full rounded-xl border p-4 text-left transition ${costBracket === opt.id ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>
                      <p className="font-medium">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("SEVERITY")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("TIMING")} disabled={!canProceedCost} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                      <button onClick={() => setComplainedQuickly(true)} className={`flex-1 rounded-xl border p-4 transition ${complainedQuickly === true ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, med en gang</button>
                      <button onClick={() => setComplainedQuickly(false)} className={`flex-1 rounded-xl border p-4 transition ${complainedQuickly === false ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, ventet litt</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 mb-3">Oppstod feilen kort tid etter kjøpet?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDefectSoonAfter(true)} className={`flex-1 rounded-xl border p-4 transition ${defectSoonAfter === true ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja, ganske raskt</button>
                      <button onClick={() => setDefectSoonAfter(false)} className={`flex-1 rounded-xl border p-4 transition ${defectSoonAfter === false ? "border-amber-500/40 bg-amber-500/10 text-amber-400" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, en stund etter</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("COST")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("CONTACT")} disabled={!canProceedTiming} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "CONTACT" && (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold">Kontakt med selger</h2>
                <div>
                  <p className="text-sm text-slate-300 mb-3">Har du kontaktet selger om problemet?</p>
                  <div className="flex gap-3">
                    <button onClick={() => setContactedSeller(true)} className={`flex-1 rounded-xl border p-4 transition ${contactedSeller === true ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Ja</button>
                    <button onClick={() => setContactedSeller(false)} className={`flex-1 rounded-xl border p-4 transition ${contactedSeller === false ? "border-emerald-500/40 bg-emerald-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"}`}>Nei, ikke ennå</button>
                  </div>
                </div>
                {contactedSeller === true && (
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Hva svarte selger? (valgfritt)</label>
                    <textarea value={sellerResponse} onChange={(e) => setSellerResponse(e.target.value)} placeholder="F.eks: Selger nekter ansvar, sier det er slitasje..." maxLength={500} rows={3} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                    <p className="text-xs text-slate-600 mt-1">{sellerResponse.length} / 500 tegn</p>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("TIMING")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("DESCRIPTION")} disabled={!canProceedContact} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "DESCRIPTION" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold">Beskriv situasjonen</h2>
                </div>
                <p className="text-sm text-slate-400">Gi oss mer detaljer så blir analysen bedre. <span className="text-slate-600">(Valgfritt)</span></p>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                  <p className="font-medium text-slate-400 mb-1">Tips – inkluder gjerne:</p>
                  <ul className="space-y-0.5">
                    <li>• Symptomer og når de oppstod</li>
                    <li>• Hva selger sa/lovte ved kjøp</li>
                    <li>• Verkstedfunn eller feilkoder</li>
                  </ul>
                </div>
                <textarea value={userDescription} onChange={(e) => setUserDescription(e.target.value)} placeholder="Beskriv hva som har skjedd..." maxLength={1000} rows={5} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                <p className="text-xs text-slate-600">{userDescription.length} / 1000 tegn</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("CONTACT")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("PROMISES")} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "PROMISES" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                  <h2 className="text-2xl font-bold">Selgers løfter</h2>
                </div>
                <p className="text-sm text-slate-400">Lovte selger noe spesifikt om {vehicleText("bilens", "motorsykkelens")} tilstand?</p>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
                  <p className="font-semibold text-amber-400 mb-2">Hvorfor er dette viktig?</p>
                  <p className="text-slate-400">Hvis selger sa at {vehicleText("bilen", "motorsykkelen")} var feilfri, nylig service, eller garanterte noe som viste seg å være feil, styrker dette kravet ditt kraftig.</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                  <p className="font-medium text-slate-400 mb-2">Eksempler på relevante løfter:</p>
                  <ul className="space-y-1">
                    <li>• &ldquo;{vehicleText("Bilen", "Motorsykkelen")} er nylig EU-godkjent uten anmerkninger&rdquo;</li>
                    <li>• &ldquo;Motor og girkasse er i topp stand&rdquo;</li>
                    <li>• &ldquo;Ingen rust eller skjulte feil&rdquo;</li>
                    <li>• &ldquo;Nettopp gjort service for 15 000 kr&rdquo;</li>
                  </ul>
                </div>
                <textarea value={sellerPromises} onChange={(e) => setSellerPromises(e.target.value)} placeholder={`Beskriv hva selger sa eller lovte om ${vehicleText("bilen", "motorsykkelen")}... (Valgfritt, men viktig hvis det gjelder deg)`} maxLength={1000} rows={4} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                <p className="text-xs text-slate-600">{sellerPromises.length} / 1000 tegn</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("DESCRIPTION")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("AS_IS_CLAUSE")} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
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
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm">
                  <p className="font-semibold text-red-400 mb-2">Viktig juridisk poeng:</p>
                  <p className="text-slate-400 mb-2">Fra 01.01.2024 er &ldquo;som den er&rdquo;-klausuler <strong className="text-white">ugyldige</strong> ved kjøp fra <strong className="text-white">forhandler</strong>.</p>
                  <p className="text-slate-400">Ved privatkjøp før 2024 kan slike klausuler ha betydning, men beskytter ikke mot skjulte feil.</p>
                </div>
                <div className="space-y-3">
                  <button onClick={() => setHadAsIsClause(false)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${hadAsIsClause === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, ingen slik klausul</p>
                    <p className="text-xs text-slate-500 mt-1">Normalt salg uten spesielle forbehold</p>
                  </button>
                  <button onClick={() => setHadAsIsClause(true)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${hadAsIsClause === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, {vehicleText("bilen", "motorsykkelen")} ble solgt &ldquo;som den er&rdquo;</p>
                    <p className="text-xs text-slate-500 mt-1">Det stod i annonse/kontrakt at {vehicleText("bilen", "motorsykkelen")} selges uten garanti</p>
                  </button>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("PROMISES")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("VISIBLE_DEFECT")} disabled={hadAsIsClause === null} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                  <button onClick={() => setVisibleDefect(false)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${visibleDefect === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, feilen var skjult</p>
                    <p className="text-xs text-slate-500 mt-1">Jeg oppdaget problemet først etter kjøpet</p>
                  </button>
                  <button onClick={() => setVisibleDefect(true)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${visibleDefect === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, feilen kunne sees ved kjøpet</p>
                    <p className="text-xs text-slate-500 mt-1">Problemet var synlig, men jeg trodde det var mindre alvorlig</p>
                  </button>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("AS_IS_CLAUSE")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("WORKSHOP_REPORT")} disabled={visibleDefect === null} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                  <button onClick={() => setHasWorkshopReport(true)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${hasWorkshopReport === true ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Ja, jeg har verkstedsrapport</p>
                    <p className="text-xs text-slate-500 mt-1">{vehicleText("Bilen", "Motorsykkelen")} er undersøkt og jeg har dokumentasjon</p>
                  </button>
                  <button onClick={() => setHasWorkshopReport(false)} className={`w-full rounded-xl border px-5 py-4 text-left transition ${hasWorkshopReport === false ? "border-emerald-500/40 bg-emerald-500/[0.06] text-white" : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20"}`}>
                    <p className="font-semibold">Nei, ikke undersøkt ennå</p>
                    <p className="text-xs text-slate-500 mt-1">Jeg har ikke tatt {vehicleText("bilen", "motorsykkelen")} til verksted</p>
                  </button>
                </div>
                {hasWorkshopReport === true && (
                  <>
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                      <p className="font-medium text-slate-400 mb-2">Lim inn eller oppsummer rapporten:</p>
                      <ul className="space-y-1">
                        <li>• Hva verkstedet fant (feilkoder, diagnosefunn)</li>
                        <li>• Prisestimat på reparasjon</li>
                        <li>• Verkstedets vurdering av feilen</li>
                      </ul>
                    </div>
                    <textarea value={workshopReportText} onChange={(e) => setWorkshopReportText(e.target.value)} placeholder="Lim inn eller oppsummer verkstedsrapporten her..." maxLength={2000} rows={6} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition font-mono text-sm" />
                    <p className="text-xs text-slate-600">{workshopReportText.length} / 2000 tegn</p>
                  </>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("VISIBLE_DEFECT")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("AD_EVIDENCE")} disabled={hasWorkshopReport === null} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-30">Neste<ArrowRight className="h-5 w-5" /></button>
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
                  <input type="url" value={finnUrl} onChange={(e) => setFinnUrl(e.target.value)} placeholder="https://finn.no/..." className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  <p className="text-xs text-slate-600 mt-1">Lenken brukes kun som referanse i dokumentene.</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Last opp skjermbilde eller PDF av annonsen</label>
                  <FileUpload category="bilkjop-annonse" maxFiles={5} files={adEvidenceFiles} onFilesChange={setAdEvidenceFiles} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Hva ble lovet i annonsen som ikke stemmer? (valgfritt)</label>
                  <textarea value={adClaims} onChange={(e) => setAdClaims(e.target.value)} placeholder="For eksempel: 'I annonsen stod det at bilen var EU-godkjent uten anmerkninger...'" maxLength={600} rows={4} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition" />
                  <p className="text-xs text-slate-600 mt-1">{adClaims.length} / 600 tegn</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("WORKSHOP_REPORT")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={() => setStep("ADDITIONAL")} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition">Neste<ArrowRight className="h-5 w-5" /></button>
                </div>
              </section>
            )}

            {step === "ADDITIONAL" && (
              <section className="space-y-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-white" />
                  <h2 className="text-2xl font-bold">Tilleggsinformasjon</h2>
                </div>
                <p className="text-sm text-slate-400">Her kan du dele mer informasjon som styrker saken. <span className="text-slate-600">(Valgfritt, men anbefalt)</span></p>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm">
                  <p className="font-semibold text-emerald-400 mb-2">Hvorfor er dette viktig?</p>
                  <p className="text-slate-400">Jo mer kontekst du gir, desto bedre blir vurderingen og dokumentene.</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-slate-500">
                  <p className="font-medium text-slate-400 mb-2">Forslag til hva du kan inkludere:</p>
                  <ul className="space-y-1">
                    <li>• Detaljert historikk om når og hvordan problemet oppstod</li>
                    <li>• Feilkoder og diagnoseinformasjon</li>
                    <li>• Tidligere kommunikasjon med selger</li>
                    <li>• Annen relevant dokumentasjon</li>
                  </ul>
                </div>
                <textarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder="Skriv så mye du ønsker her..." maxLength={5000} rows={10} className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition font-mono text-sm" />
                <p className="text-xs text-slate-600">{additionalInfo.length} / 5000 tegn</p>
                <div>
                  <p className="text-sm text-slate-300 mb-3">Last opp dokumentasjon (valgfritt)</p>
                  <FileUpload category="bilkjop" maxFiles={10} files={uploadedFiles} onFilesChange={setUploadedFiles} />
                  <p className="text-xs text-slate-600 mt-2">Verkstedsrapporter, bilder av feil, kjøpekontrakt, eller annen dokumentasjon</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep("AD_EVIDENCE")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                  <button onClick={analyzeCase} disabled={isAnalyzing} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition disabled:opacity-60">
                    {isAnalyzing ? (<><Loader2 className="h-5 w-5 animate-spin" />Analyserer saken din...</>) : (<><Sparkles className="h-5 w-5" />Vurder saken min</>)}
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ═══════════ RESULT ═══════════ */}
        {step === "RESULT" && outcome && (
          <div className="mx-auto w-full max-w-2xl px-4 py-12">
            <section className="space-y-5">
              <div className={`rounded-2xl p-6 ${outcome.level === "GREEN" ? "bg-emerald-500/10 border border-emerald-500/20" : outcome.level === "YELLOW" ? "bg-amber-500/10 border border-amber-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
                <div className="flex items-center gap-2 mb-3">
                  {outcome.level === "GREEN" ? <CheckCircle2 className="h-6 w-6 text-emerald-400" /> : outcome.level === "YELLOW" ? <Clock className="h-6 w-6 text-amber-400" /> : <AlertTriangle className="h-6 w-6 text-red-400" />}
                  <span className={`text-sm font-bold uppercase tracking-wide ${outcome.level === "GREEN" ? "text-emerald-400" : outcome.level === "YELLOW" ? "text-amber-400" : "text-red-400"}`}>
                    {outcome.level === "GREEN" ? "Sannsynlig krav" : outcome.level === "YELLOW" ? "Usikkert" : "Lite sannsynlig"}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">{outcome.title}</h2>
                <p className="text-slate-300">{outcome.summary}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">Nøkkelpunkter</p>
                <ul className="text-slate-300 space-y-1.5">
                  {outcome.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500/50 mt-0.5 shrink-0" />{point}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep("ADDITIONAL")} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 py-3 text-slate-400 hover:bg-white/[0.03] transition"><ArrowLeft className="h-4 w-4" />Tilbake</button>
                <button onClick={goToReport} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black py-3 font-bold hover:bg-emerald-400 transition"><FileText className="h-5 w-5" />Se full rapport<ArrowRight className="h-5 w-5" /></button>
              </div>
              <p className="text-xs text-slate-600 text-center">Veiledende vurdering, ikke juridisk rådgivning</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default function BilkjopPage() {
  return (
    <Suspense fallback={<div className="bg-[#0a0f0d] min-h-screen" />}>
      <BilkjopPageContent />
    </Suspense>
  );
}