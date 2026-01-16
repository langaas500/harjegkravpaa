"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Wrench,
  ArrowRight,
  ArrowLeft,
  Zap,
  Droplets,
  Hammer,
  Grid3X3,
  Wind,
  HelpCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  User,
  Upload,
  Sparkles,
  Loader2,
  CheckCircle2,
  ShieldAlert,
  Calculator,
  Target,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { createCase, updateCase } from "@/lib/supabase";

type Step =
  | "INTRO"
  | "FAG"
  | "PROBLEM"
  | "ALVORLIGHET"
  | "AVTALE"
  | "TIDSLINJE"
  | "OMFANG_KOST"
  | "KRAVMAL"
  | "DOKUMENTASJON"
  | "HISTORIE"
  | "SVAR"
  | "PERSONALIA"
  | "UPLOAD"
  | "RESULT";

interface OutcomeType {
  level: "GREEN" | "YELLOW" | "RED";
  headline: string;
  title: string;
  summary: string;
  confidence: string;
  keyPoints: string[];
  legalRefs: { heading: string; refs: string[] }[];
  nextSteps: string[];
  proTip: string;
  disclaimer: string;
  recommendedClaim?: "retting" | "prisavslag" | "heving" | "erstatning";
  severity?: "lav" | "middels" | "høy";
  strengthFactors?: string[];
  riskFactors?: string[];
  evidenceChecklist?: string[];
  whatToWriteNow?: string;
  deadlineSuggestion?: string;
}

const FAG_OPTIONS = [
  { id: "elektriker", label: "Elektriker", icon: Zap },
  { id: "rorlegger", label: "Rørlegger", icon: Droplets },
  { id: "snekker", label: "Snekker", icon: Hammer },
  { id: "flislegger", label: "Flislegger", icon: Grid3X3 },
  { id: "ventilasjon", label: "Ventilasjon", icon: Wind },
  { id: "annet", label: "Annet", icon: HelpCircle },
];

const PROBLEM_OPTIONS = [
  { id: "darlig_arbeid", label: "Dårlig utført arbeid / ser stygt ut" },
  { id: "forsinkelse", label: "Forsinkelse" },
  { id: "pris_hoyere", label: "Pris høyere enn avtalt / ekstraregning" },
  { id: "ikke_ferdig", label: "Arbeid avbrutt / ikke ferdigstilt" },
  { id: "annet", label: "Annet" },
];

const DOK_OPTIONS = [
  { id: "kontrakt", label: "Kontrakt / tilbud" },
  { id: "epost_sms", label: "E-post / SMS" },
  { id: "faktura", label: "Faktura" },
  { id: "bilder", label: "Bilder / video" },
  { id: "annet", label: "Annet" },
  { id: "ingen", label: "Ingen dokumentasjon" },
];

const TYPE_FEIL_OPTIONS = [
  { id: "estetisk", label: "Estetisk (ser stygt ut)" },
  { id: "funksjonell", label: "Funksjonell (fungerer dårlig)" },
  { id: "strukturell", label: "Strukturell (konstruksjon/holdbarhet)" },
  { id: "forskrift", label: "Brudd på forskrift/standard" },
];

const ONSKER_OPTIONS = [
  { id: "retting", label: "At håndverkeren retter arbeidet" },
  { id: "prisavslag", label: "Prisavslag / tilbakebetaling" },
  { id: "heving", label: "Heve avtalen helt" },
  { id: "erstatning", label: "Erstatning for følgeskader" },
  { id: "vet_ikke", label: "Usikker – trenger veiledning" },
];

export default function HandverkerePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("INTRO");

  // State for alle steg
  const [fagValg, setFagValg] = useState<string[]>([]);
  const [fagAnnetTekst, setFagAnnetTekst] = useState("");
  const [problemValg, setProblemValg] = useState<string[]>([]);
  const [problemAnnetTekst, setProblemAnnetTekst] = useState("");

  // ALVORLIGHET (nytt)
  const [funkerIkke, setFunkerIkke] = useState<boolean | null>(null);
  const [sikkerhetsrisiko, setSikkerhetsrisiko] = useState<boolean | null>(null);
  const [typeFeil, setTypeFeil] = useState<string[]>([]);
  const [maltDokAvvik, setMaltDokAvvik] = useState<boolean | null>(null);
  const [beskrivelsetilleggKort, setBeskrivelsetilleggKort] = useState("");

  // Avtale & pris
  const [prisAvtalt, setPrisAvtalt] = useState<"ja" | "nei" | "usikker" | null>(null);
  const [prisSkriftlig, setPrisSkriftlig] = useState<boolean | null>(null);
  const [prisform, setPrisform] = useState<"fastpris" | "overslag" | "timepris" | "vet_ikke" | null>(null);

  // Tidslinje
  const [jobbStartDato, setJobbStartDato] = useState("");
  const [hadFerdigDato, setHadFerdigDato] = useState<boolean | null>(null);
  const [ferdigDato, setFerdigDato] = useState("");
  const [oppdagetDato, setOppdagetDato] = useState("");
  const [harReklamert, setHarReklamert] = useState<boolean | null>(null);
  const [reklamertDato, setReklamertDato] = useState("");

  // OMFANG_KOST (nytt)
  const [kontraktssum, setKontraktssum] = useState("");
  const [fakturaSum, setFakturaSum] = useState("");
  const [utbedringEstimert, setUtbedringEstimert] = useState("");
  const [innhentetTilbud, setInnhentetTilbud] = useState<boolean | null>(null);
  const [tilbudSum, setTilbudSum] = useState("");
  const [holdtTilbakeBetaling, setHoldtTilbakeBetaling] = useState<boolean | null>(null);
  const [gjenstarArbeid, setGjenstarArbeid] = useState<boolean | null>(null);
  const [harTredjepartDokumentasjon, setHarTredjepartDokumentasjon] = useState<boolean | null>(null);

  // KRAVMAL (nytt)
  const [onsker, setOnsker] = useState<string[]>([]);
  const [frist, setFrist] = useState("");
  const [vilHaSkriftlig, setVilHaSkriftlig] = useState<boolean | null>(null);
  const [harBedtOmRett, setHarBedtOmRett] = useState<boolean | null>(null);
  const [onskerBefaring, setOnskerBefaring] = useState<boolean | null>(null);

  // Dokumentasjon
  const [dokumentasjon, setDokumentasjon] = useState<string[]>([]);

  // Historier
  const [dinHistorie, setDinHistorie] = useState("");
  const [handverkerSvar, setHandverkerSvar] = useState("");

  // Personalia
  const [navn, setNavn] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [gateadresse, setGateadresse] = useState("");
  const [postnummer, setPostnummer] = useState("");
  const [poststed, setPoststed] = useState("");
  const [handverkerNavn, setHandverkerNavn] = useState("");
  const [handverkerGateadresse, setHandverkerGateadresse] = useState("");
  const [handverkerPostnummer, setHandverkerPostnummer] = useState("");
  const [handverkerPoststed, setHandverkerPoststed] = useState("");

  // Upload
  const [uploadedFiles, setUploadedFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);

  // Analyse
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);

  // Supabase case ID og access token
  const [caseId, setCaseId] = useState<string | null>(null);
  const [caseAccessToken, setCaseAccessToken] = useState<string | null>(null);

  const toggleFag = (id: string) => {
    setFagValg((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleProblem = (id: string) => {
    setProblemValg((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleTypeFeil = (id: string) => {
    setTypeFeil((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleOnsker = (id: string) => {
    setOnsker((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleDok = (id: string) => {
    if (id === "ingen") {
      setDokumentasjon(["ingen"]);
    } else {
      setDokumentasjon((prev) => {
        const filtered = prev.filter((i) => i !== "ingen");
        return filtered.includes(id) ? filtered.filter((i) => i !== id) : [...filtered, id];
      });
    }
  };

  const canProceedFag = fagValg.length > 0 && (fagValg.includes("annet") ? fagAnnetTekst.trim() : true);
  const canProceedProblem = problemValg.length > 0 && (problemValg.includes("annet") ? problemAnnetTekst.trim() : true);
  const canProceedAlvorlighet = funkerIkke !== null || sikkerhetsrisiko !== null || typeFeil.length > 0;
  const canProceedAvtale = prisAvtalt !== null && prisform !== null;
  const canProceedTidslinje = harReklamert !== null;
  const canProceedOmfangKost = true; // Alt er valgfritt
  const canProceedKravmal = onsker.length > 0;
  const canProceedDok = dokumentasjon.length > 0;
  const canProceedHistorie = dinHistorie.trim().length >= 50;

  const analyzeCase = async () => {
    setIsAnalyzing(true);
    try {
      const fagLabels = fagValg.map((id) => {
        if (id === "annet") return `Annet: ${fagAnnetTekst}`;
        return FAG_OPTIONS.find((o) => o.id === id)?.label || id;
      });

      const problemLabels = problemValg.map((id) => {
        if (id === "annet") return `Annet: ${problemAnnetTekst}`;
        return PROBLEM_OPTIONS.find((o) => o.id === id)?.label || id;
      });

      const dokLabels = dokumentasjon.map((id) =>
        DOK_OPTIONS.find((o) => o.id === id)?.label || id
      );

      const typeFeilLabels = typeFeil.map((id) =>
        TYPE_FEIL_OPTIONS.find((o) => o.id === id)?.label || id
      );

      const onskerLabels = onsker.map((id) =>
        ONSKER_OPTIONS.find((o) => o.id === id)?.label || id
      );

      const payload = {
        fag: fagLabels,
        problemer: problemLabels,
        // Alvorlighet
        funkerIkke,
        sikkerhetsrisiko,
        typeFeil: typeFeilLabels,
        maltDokAvvik,
        beskrivelsetilleggKort: beskrivelsetilleggKort || null,
        // Avtale
        prisAvtalt,
        prisSkriftlig: prisAvtalt === "ja" ? prisSkriftlig : null,
        prisform,
        // Tidslinje
        jobbStartDato: jobbStartDato || null,
        hadFerdigDato,
        ferdigDato: hadFerdigDato ? ferdigDato : null,
        oppdagetDato: oppdagetDato || null,
        harReklamert,
        reklamertDato: harReklamert ? reklamertDato : null,
        // Omfang & kostnad
        kontraktssum: kontraktssum || null,
        fakturaSum: fakturaSum || null,
        utbedringEstimert: utbedringEstimert || null,
        innhentetTilbud,
        tilbudSum: innhentetTilbud ? tilbudSum : null,
        holdtTilbakeBetaling,
        gjenstarArbeid,
        harTredjepartDokumentasjon,
        // Kravmål
        onsker: onskerLabels,
        frist: frist || null,
        vilHaSkriftlig,
        harBedtOmRett,
        onskerBefaring,
        // Dokumentasjon
        dokumentasjon: dokLabels,
        dinHistorie,
        handverkerSvar: handverkerSvar || null,
        // Personalia
        navn: navn || null,
        epost: epost || null,
        telefon: telefon || null,
        kundeAdresse: gateadresse || null,
        kundePostnummer: postnummer || null,
        kundePoststed: poststed || null,
        handverkerNavn: handverkerNavn || null,
        handverkerAdresse: handverkerGateadresse || null,
        handverkerPostnummer: handverkerPostnummer || null,
        handverkerPoststed: handverkerPoststed || null,
        uploadedFiles,
      };

      // Opprett case i Supabase
      const supabaseCase = await createCase("HANDVERK", payload);
      if (supabaseCase) {
        setCaseId(supabaseCase.id);
        setCaseAccessToken(supabaseCase.access_token);
        console.log("Case opprettet i Supabase:", supabaseCase.id);
      }

      const response = await fetch("/api/analyze-handverk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseType: "HANDVERK", ...payload }),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();
      setOutcome(result.outcome);

      // Oppdater case med outcome
      if (supabaseCase) {
        await updateCase(supabaseCase.id, {
          outcome: result.outcome,
          status: "completed",
        });
      }

      setStep("RESULT");
    } catch (error) {
      console.error("Handverk analysis failed:", error);
      const fallbackOutcome = {
        level: "YELLOW" as const,
        headline: "USIKKERT",
        title: "Vurdering fullført",
        summary: "Basert på informasjonen du har oppgitt, kan det se ut til at du har grunnlag for en reklamasjon. Vi anbefaler å dokumentere alt og kontakte håndverkeren skriftlig.",
        confidence: "Middels",
        keyPoints: [
          "Dokumenter problemet grundig med bilder og beskrivelser",
          "Ta vare på all kommunikasjon med håndverkeren",
          "Sjekk kontrakten for reklamasjonsvilkår",
        ],
        legalRefs: [
          {
            heading: "Håndverkertjenesteloven",
            refs: [
              "§ 17: Tjenesten har mangel hvis resultatet ikke svarer til det forbrukeren har grunn til å forvente",
              "§ 21: Forbrukeren kan kreve at mangelen rettes uten kostnad",
            ],
          },
        ],
        nextSteps: [
          "Send skriftlig reklamasjon til håndverkeren",
          "Gi håndverkeren mulighet til å rette feilen",
          "Kontakt Forbrukerrådet ved behov",
        ],
        proTip: "Jo raskere du reklamerer, desto sterkere står saken din.",
        disclaimer: "Dette er veiledning, ikke juridisk rådgivning.",
        recommendedClaim: (onsker.includes("retting") ? "retting" : onsker.includes("prisavslag") ? "prisavslag" : "retting") as "retting" | "prisavslag" | "heving" | "erstatning",
        severity: (sikkerhetsrisiko ? "høy" : funkerIkke ? "middels" : "lav") as "lav" | "middels" | "høy",
      };
      setOutcome(fallbackOutcome);
      setStep("RESULT");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goToReport = () => {
    const fagLabels = fagValg.map((id) => {
      if (id === "annet") return `Annet: ${fagAnnetTekst}`;
      return FAG_OPTIONS.find((o) => o.id === id)?.label || id;
    });

    const problemLabels = problemValg.map((id) => {
      if (id === "annet") return `Annet: ${problemAnnetTekst}`;
      return PROBLEM_OPTIONS.find((o) => o.id === id)?.label || id;
    });

    const dokLabels = dokumentasjon.map((id) =>
      DOK_OPTIONS.find((o) => o.id === id)?.label || id
    );

    const typeFeilLabels = typeFeil.map((id) =>
      TYPE_FEIL_OPTIONS.find((o) => o.id === id)?.label || id
    );

    const onskerLabels = onsker.map((id) =>
      ONSKER_OPTIONS.find((o) => o.id === id)?.label || id
    );

    const data = {
      caseType: "HANDVERK",
      fag: fagLabels,
      problemer: problemLabels,
      // Alvorlighet
      funkerIkke,
      sikkerhetsrisiko,
      typeFeil: typeFeilLabels,
      maltDokAvvik,
      beskrivelsetilleggKort,
      // Avtale
      prisAvtalt,
      prisSkriftlig: prisAvtalt === "ja" ? prisSkriftlig : null,
      prisform,
      // Tidslinje
      jobbStartDato: jobbStartDato || null,
      hadFerdigDato,
      ferdigDato: hadFerdigDato ? ferdigDato : null,
      oppdagetDato: oppdagetDato || null,
      harReklamert,
      reklamertDato: harReklamert ? reklamertDato : null,
      // Omfang & kostnad
      kontraktssum,
      fakturaSum,
      utbedringEstimert,
      innhentetTilbud,
      tilbudSum,
      holdtTilbakeBetaling,
      gjenstarArbeid,
      harTredjepartDokumentasjon,
      // Kravmål
      onsker: onskerLabels,
      frist,
      vilHaSkriftlig,
      harBedtOmRett,
      onskerBefaring,
      // Dokumentasjon
      dokumentasjon: dokLabels,
      dinHistorie,
      handverkerSvar: handverkerSvar || null,
      // Personalia
      navn,
      epost,
      telefon,
      kundeAdresse: gateadresse,
      kundePostnummer: postnummer,
      kundePoststed: poststed,
      handverkerNavn,
      handverkerAdresse: handverkerGateadresse,
      handverkerPostnummer,
      handverkerPoststed,
      uploadedFiles,
      outcome,
      caseId,
      access_token: caseAccessToken,
    };
    localStorage.setItem("handverk-data", JSON.stringify(data));
    router.push("/handverkere/rapport");
  };

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10">

        {step === "INTRO" && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Håndverkertjenester</h1>
            </div>

            <p className="text-lg text-slate-400">
              Problemer med en håndverker? Svar på noen spørsmål, så vurderer vi om du kan ha grunnlag for å reklamere.
            </p>

            <div className="text-sm text-slate-500 space-y-1">
              <p>• Tar ca. 3–4 minutter</p>
              <p>• Gratis vurdering</p>
              <p>• Valgfri PDF-rapport (39 kr)</p>
            </div>

            <button
              onClick={() => setStep("FAG")}
              className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition"
            >
              Start vurdering
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-600 text-center">
              Veiledende vurdering, ikke juridisk rådgivning
            </p>
          </section>
        )}

        {step === "FAG" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Hva slags håndverker gjelder det?</h2>
            <p className="text-sm text-slate-500">Velg alle som gjelder</p>

            <div className="grid grid-cols-2 gap-3">
              {FAG_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleFag(opt.id)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    fagValg.includes(opt.id)
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <opt.icon className={`h-5 w-5 ${fagValg.includes(opt.id) ? "text-white" : "text-slate-500"}`} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>

            {fagValg.includes("annet") && (
              <div>
                <label className="block text-sm text-slate-500 mb-2">Hvilket fag gjelder det?</label>
                <input
                  type="text"
                  value={fagAnnetTekst}
                  onChange={(e) => setFagAnnetTekst(e.target.value)}
                  placeholder="F.eks. maler, taklegger..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("INTRO")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("PROBLEM")}
                disabled={!canProceedFag}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "PROBLEM" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Hva er problemet?</h2>
            <p className="text-sm text-slate-500">Velg alle som gjelder</p>

            <div className="space-y-2">
              {PROBLEM_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleProblem(opt.id)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                    problemValg.includes(opt.id)
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {problemValg.includes("annet") && (
              <div>
                <label className="block text-sm text-slate-500 mb-2">Hva gjelder det?</label>
                <input
                  type="text"
                  value={problemAnnetTekst}
                  onChange={(e) => setProblemAnnetTekst(e.target.value)}
                  placeholder="Beskriv problemet kort..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("FAG")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("ALVORLIGHET")}
                disabled={!canProceedProblem}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "ALVORLIGHET" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Alvorlighetsgrad</h2>
            </div>
            <p className="text-sm text-slate-400">
              Hjelper oss å forstå hvor alvorlig problemet er
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-3">Fungerer tingen/installasjonen som den skal?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFunkerIkke(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      funkerIkke === true
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei, fungerer ikke
                  </button>
                  <button
                    onClick={() => setFunkerIkke(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      funkerIkke === false
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja, fungerer
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Er det en sikkerhetsrisiko?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSikkerhetsrisiko(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      sikkerhetsrisiko === true
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja, mulig risiko
                  </button>
                  <button
                    onClick={() => setSikkerhetsrisiko(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      sikkerhetsrisiko === false
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Hva slags type feil er det? (velg alle som passer)</p>
                <div className="space-y-2">
                  {TYPE_FEIL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => toggleTypeFeil(opt.id)}
                      className={`w-full rounded-xl border p-3 text-left text-sm transition ${
                        typeFeil.includes(opt.id)
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Avviker arbeidet fra avtale/tegninger/beskrivelse?</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMaltDokAvvik(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      maltDokAvvik === true
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setMaltDokAvvik(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      maltDokAvvik === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                  <button
                    onClick={() => setMaltDokAvvik(null)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      maltDokAvvik === null
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Usikker
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-2">Kort tilleggsbeskrivelse (valgfritt)</label>
                <input
                  type="text"
                  value={beskrivelsetilleggKort}
                  onChange={(e) => setBeskrivelsetilleggKort(e.target.value)}
                  placeholder="F.eks. vannlekkasje, kortslutning..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("PROBLEM")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("AVTALE")}
                disabled={!canProceedAlvorlighet}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "AVTALE" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Avtale og pris</h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-3">Var pris avtalt på forhånd?</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["ja", "nei", "usikker"] as const).map((val) => (
                    <button
                      key={val}
                      onClick={() => setPrisAvtalt(val)}
                      className={`rounded-xl border p-3 text-sm transition ${
                        prisAvtalt === val
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {val === "ja" ? "Ja" : val === "nei" ? "Nei" : "Usikker"}
                    </button>
                  ))}
                </div>
              </div>

              {prisAvtalt === "ja" && (
                <div>
                  <p className="text-sm text-slate-300 mb-3">Var det skriftlig?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPrisSkriftlig(true)}
                      className={`rounded-xl border p-3 text-sm transition ${
                        prisSkriftlig === true
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja, skriftlig
                    </button>
                    <button
                      onClick={() => setPrisSkriftlig(false)}
                      className={`rounded-xl border p-3 text-sm transition ${
                        prisSkriftlig === false
                          ? "border-amber-500 bg-amber-500/10 text-amber-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei, muntlig
                    </button>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-300 mb-3">Hva slags prisform var avtalt?</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: "fastpris", label: "Fastpris" },
                    { id: "overslag", label: "Prisoverslag" },
                    { id: "timepris", label: "Timepris" },
                    { id: "vet_ikke", label: "Vet ikke" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPrisform(opt.id)}
                      className={`rounded-xl border p-3 text-sm transition ${
                        prisform === opt.id
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("ALVORLIGHET")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("TIDSLINJE")}
                disabled={!canProceedAvtale}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "TIDSLINJE" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Tidslinje</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-2">Når startet jobben? (valgfritt)</label>
                <input
                  type="date"
                  value={jobbStartDato}
                  onChange={(e) => setJobbStartDato(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Var det avtalt en ferdigdato?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHadFerdigDato(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      hadFerdigDato === true
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setHadFerdigDato(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      hadFerdigDato === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>

              {hadFerdigDato && (
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Hvilken dato?</label>
                  <input
                    type="date"
                    value={ferdigDato}
                    onChange={(e) => setFerdigDato(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-500 mb-2">Når oppdaget du problemet? (valgfritt)</label>
                <input
                  type="date"
                  value={oppdagetDato}
                  onChange={(e) => setOppdagetDato(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Har du gitt beskjed/reklamert til håndverkeren?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHarReklamert(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harReklamert === true
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setHarReklamert(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harReklamert === false
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei, ikke ennå
                  </button>
                </div>
              </div>

              {harReklamert && (
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Når reklamerte du? (valgfritt)</label>
                  <input
                    type="date"
                    value={reklamertDato}
                    onChange={(e) => setReklamertDato(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("AVTALE")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("OMFANG_KOST")}
                disabled={!canProceedTidslinje}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "OMFANG_KOST" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Omfang og kostnader</h2>
            </div>
            <p className="text-sm text-slate-400">
              Hjelper oss å vurdere sakens økonomiske omfang (alt er valgfritt)
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Avtalt kontraktssum (kr)</label>
                  <input
                    type="number"
                    value={kontraktssum}
                    onChange={(e) => setKontraktssum(e.target.value)}
                    placeholder="F.eks. 150000"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Fakturert beløp (kr)</label>
                  <input
                    type="number"
                    value={fakturaSum}
                    onChange={(e) => setFakturaSum(e.target.value)}
                    placeholder="F.eks. 180000"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-2">Estimert utbedringskostnad (kr)</label>
                <input
                  type="number"
                  value={utbedringEstimert}
                  onChange={(e) => setUtbedringEstimert(e.target.value)}
                  placeholder="F.eks. 25000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Har du innhentet tilbud fra annen håndverker?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInnhentetTilbud(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      innhentetTilbud === true
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setInnhentetTilbud(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      innhentetTilbud === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>

              {innhentetTilbud && (
                <div>
                  <label className="block text-sm text-slate-500 mb-2">Tilbudssum fra annen håndverker (kr)</label>
                  <input
                    type="number"
                    value={tilbudSum}
                    onChange={(e) => setTilbudSum(e.target.value)}
                    placeholder="F.eks. 30000"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <p className="text-sm text-slate-300 mb-3">Ønsker du å holde tilbake betaling inntil manglene er rettet?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHoldtTilbakeBetaling(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      holdtTilbakeBetaling === true
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setHoldtTilbakeBetaling(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      holdtTilbakeBetaling === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei / allerede betalt / ikke aktuelt
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Har du dokumentasjon eller vurdering fra annen fagperson?</p>
                <p className="text-xs text-slate-500 mb-3">Dette kan være en kort vurdering fra rørlegger, elektriker, takstmann eller annen fagperson. Det trenger ikke være en full rapport.</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHarTredjepartDokumentasjon(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harTredjepartDokumentasjon === true
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setHarTredjepartDokumentasjon(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harTredjepartDokumentasjon === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Gjenstår det arbeid som ikke er utført?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGjenstarArbeid(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      gjenstarArbeid === true
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setGjenstarArbeid(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      gjenstarArbeid === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("TIDSLINJE")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("KRAVMAL")}
                disabled={!canProceedOmfangKost}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "KRAVMAL" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Hva ønsker du?</h2>
            </div>
            <p className="text-sm text-slate-400">
              Velg hva du primært ønsker å oppnå (kan velge flere)
            </p>

            <div className="space-y-2">
              {ONSKER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOnsker(opt.id)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                    onsker.includes(opt.id)
                      ? "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm text-slate-500 mb-2">Ønsket frist for løsning (valgfritt)</label>
                <input
                  type="date"
                  value={frist}
                  onChange={(e) => setFrist(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Vil du ha skriftlig svar fra håndverkeren?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setVilHaSkriftlig(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      vilHaSkriftlig === true
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setVilHaSkriftlig(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      vilHaSkriftlig === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ikke nødvendig
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Har du bedt håndverkeren rette feilen?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHarBedtOmRett(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harBedtOmRett === true
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setHarBedtOmRett(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      harBedtOmRett === false
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-300 mb-3">Ønsker du befaring/inspeksjon?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOnskerBefaring(true)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      onskerBefaring === true
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    onClick={() => setOnskerBefaring(false)}
                    className={`rounded-xl border p-3 text-sm transition ${
                      onskerBefaring === false
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    Nei
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("OMFANG_KOST")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("DOKUMENTASJON")}
                disabled={!canProceedKravmal}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "DOKUMENTASJON" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Dokumentasjon</h2>
            </div>
            <p className="text-sm text-slate-400">Hva slags dokumentasjon har du? (Velg alle som gjelder)</p>

            <div className="space-y-2">
              {DOK_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleDok(opt.id)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition ${
                    dokumentasjon.includes(opt.id)
                      ? opt.id === "ingen"
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-white bg-white/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("KRAVMAL")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("HISTORIE")}
                disabled={!canProceedDok}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "HISTORIE" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Din historie</h2>
            </div>
            <p className="text-sm text-slate-400">
              Fortell oss hva som har skjedd. Jo mer detaljer, desto bedre vurdering får du.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-1">Tips – inkluder gjerne:</p>
              <ul className="space-y-0.5">
                <li>• Hva avtalen gikk ut på</li>
                <li>• Hva du forventet som resultat</li>
                <li>• Hva som faktisk skjedde / hva som er galt</li>
                <li>• Eventuelle løfter fra håndverkeren</li>
              </ul>
            </div>

            <textarea
              value={dinHistorie}
              onChange={(e) => setDinHistorie(e.target.value)}
              placeholder="Beskriv hele situasjonen..."
              maxLength={5000}
              rows={8}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-slate-600">{dinHistorie.length} / 5000 tegn (minimum 50)</p>

            <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4">
              <p className="text-sm text-teal-400">
                <Upload className="inline h-4 w-4 mr-2" />
                Har du bilder eller kontrakt?
                <Link
                  href="#"
                  onClick={(e) => { e.preventDefault(); setStep("UPLOAD"); }}
                  className="underline ml-1 hover:text-teal-300"
                >
                  Hopp til opplasting
                </Link>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("DOKUMENTASJON")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("SVAR")}
                disabled={!canProceedHistorie}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "SVAR" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Håndverkerens svar</h2>
            </div>
            <p className="text-sm text-slate-400">
              Hva har håndverkeren sagt? (valgfritt, men nyttig for vurderingen)
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-1">Eksempler:</p>
              <ul className="space-y-0.5">
                <li>• Avviser ansvar</li>
                <li>• Lover å fikse det</li>
                <li>• Skylder på andre forhold</li>
                <li>• Ikke svart</li>
              </ul>
            </div>

            <textarea
              value={handverkerSvar}
              onChange={(e) => setHandverkerSvar(e.target.value)}
              placeholder="Beskriv hva håndverkeren har sagt eller gjort..."
              maxLength={2000}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-slate-600">{handverkerSvar.length} / 2000 tegn</p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("HISTORIE")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("PERSONALIA")}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "PERSONALIA" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Dine opplysninger</h2>
            </div>
            <p className="text-sm text-slate-400">
              Brukes i rapporten og eventuelt kravbrev. Anbefales, men valgfritt.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Ditt navn (anbefalt)</label>
                <input
                  type="text"
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  placeholder="Ola Nordmann"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">E-post</label>
                <input
                  type="email"
                  value={epost}
                  onChange={(e) => setEpost(e.target.value)}
                  placeholder="ola@eksempel.no"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Telefon (valgfritt)</label>
                <input
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="123 45 678"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Din gateadresse <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={gateadresse}
                  onChange={(e) => setGateadresse(e.target.value)}
                  placeholder="Gateveien 123"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Postnummer <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={postnummer}
                    onChange={(e) => setPostnummer(e.target.value)}
                    placeholder="0123"
                    required
                    maxLength={4}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Poststed <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={poststed}
                    onChange={(e) => setPoststed(e.target.value)}
                    placeholder="Oslo"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <label className="block text-sm text-slate-500 mb-1">Håndverkerens navn/firma <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={handverkerNavn}
                  onChange={(e) => setHandverkerNavn(e.target.value)}
                  placeholder="Elektriker AS / Ola Rørlegger"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Håndverkerens gateadresse <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={handverkerGateadresse}
                  onChange={(e) => setHandverkerGateadresse(e.target.value)}
                  placeholder="Håndverkerveien 1"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Postnummer <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={handverkerPostnummer}
                    onChange={(e) => setHandverkerPostnummer(e.target.value)}
                    placeholder="0456"
                    required
                    maxLength={4}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Poststed <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={handverkerPoststed}
                    onChange={(e) => setHandverkerPoststed(e.target.value)}
                    placeholder="Oslo"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("SVAR")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("UPLOAD")}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "UPLOAD" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Upload className="h-6 w-6 text-white" />
              <h2 className="text-2xl font-bold">Last opp dokumentasjon</h2>
            </div>
            <p className="text-sm text-slate-400">
              Valgfritt, men styrker saken din. Bilder av problemet, kontrakt, fakturaer, eller kommunikasjon.
            </p>

            <FileUpload
              category="handverkere"
              maxFiles={10}
              files={uploadedFiles}
              onFilesChange={setUploadedFiles}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep("PERSONALIA")}
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
                    Vurderer saken din...
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
                  {outcome.headline || (outcome.level === "GREEN"
                    ? "Sannsynlig krav"
                    : outcome.level === "YELLOW"
                    ? "Usikkert"
                    : "Lite sannsynlig")}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2">{outcome.title}</h2>
              <p className="text-slate-300">{outcome.summary}</p>
            </div>

            {outcome.recommendedClaim && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500 uppercase tracking-wide mb-1">Anbefalt kravtype</p>
                <p className="text-white font-medium">
                  {outcome.recommendedClaim === "retting" && "Retting av arbeidet"}
                  {outcome.recommendedClaim === "prisavslag" && "Prisavslag"}
                  {outcome.recommendedClaim === "heving" && "Heving av avtalen"}
                  {outcome.recommendedClaim === "erstatning" && "Erstatning"}
                </p>
              </div>
            )}

            {outcome.strengthFactors && outcome.strengthFactors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-emerald-400 uppercase tracking-wide">Det som styrker saken</p>
                <ul className="text-slate-300 space-y-1">
                  {outcome.strengthFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {outcome.riskFactors && outcome.riskFactors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-amber-400 uppercase tracking-wide">Mulige risikofaktorer</p>
                <ul className="text-slate-300 space-y-1">
                  {outcome.riskFactors.map((factor, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Nøkkelpunkter</p>
              <ul className="text-slate-300 space-y-1">
                {outcome.keyPoints.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>

            {outcome.whatToWriteNow && (
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4">
                <p className="text-sm text-teal-400 font-medium mb-1">Hva du bør skrive nå</p>
                <p className="text-slate-300 text-sm">{outcome.whatToWriteNow}</p>
              </div>
            )}

            {outcome.deadlineSuggestion && (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-slate-500 mb-1">Anbefalt frist</p>
                <p className="text-white">{outcome.deadlineSuggestion}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("UPLOAD")}
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
