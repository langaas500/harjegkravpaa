"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import FileUpload from "@/components/FileUpload";

type Step =
  | "INTRO"
  | "FAG"
  | "PROBLEM"
  | "AVTALE"
  | "TIDSLINJE"
  | "DOKUMENTASJON"
  | "HISTORIE"
  | "SVAR"
  | "PERSONALIA"
  | "UPLOAD"
  | "RESULT";

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

export default function HandverkerePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("INTRO");

  // State for alle steg
  const [fagValg, setFagValg] = useState<string[]>([]);
  const [fagAnnetTekst, setFagAnnetTekst] = useState("");
  const [problemValg, setProblemValg] = useState<string[]>([]);
  const [problemAnnetTekst, setProblemAnnetTekst] = useState("");

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

  // Dokumentasjon
  const [dokumentasjon, setDokumentasjon] = useState<string[]>([]);

  // Historier
  const [dinHistorie, setDinHistorie] = useState("");
  const [handverkerSvar, setHandverkerSvar] = useState("");

  // Personalia
  const [navn, setNavn] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [adresse, setAdresse] = useState("");
  const [handverkerNavn, setHandverkerNavn] = useState("");

  // Upload
  const [uploadedFiles, setUploadedFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);

  // Analyse
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);

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
  const canProceedAvtale = prisAvtalt !== null && prisform !== null;
  const canProceedTidslinje = harReklamert !== null;
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

      const context = {
        caseType: "HANDVERK",
        fag: fagLabels,
        problemer: problemLabels,
        prisAvtalt,
        prisSkriftlig: prisAvtalt === "ja" ? prisSkriftlig : null,
        prisform,
        jobbStartDato: jobbStartDato || null,
        hadFerdigDato,
        ferdigDato: hadFerdigDato ? ferdigDato : null,
        oppdagetDato: oppdagetDato || null,
        harReklamert,
        reklamertDato: harReklamert ? reklamertDato : null,
        dokumentasjon: dokLabels,
        dinHistorie,
        handverkerSvar: handverkerSvar || null,
        navn: navn || null,
        epost: epost || null,
        telefon: telefon || null,
        adresse: adresse || null,
        handverkerNavn: handverkerNavn || null,
        uploadedFiles,
      };

      const response = await fetch("/api/analyze-handverk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();
      setOutcome(result.outcome);
      setStep("RESULT");
    } catch (error) {
      console.error("Handverk analysis failed:", error);
      setOutcome({
        level: "YELLOW",
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
      });
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

    const data = {
      caseType: "HANDVERK",
      fag: fagLabels,
      problemer: problemLabels,
      prisAvtalt,
      prisSkriftlig: prisAvtalt === "ja" ? prisSkriftlig : null,
      prisform,
      jobbStartDato: jobbStartDato || null,
      hadFerdigDato,
      ferdigDato: hadFerdigDato ? ferdigDato : null,
      oppdagetDato: oppdagetDato || null,
      harReklamert,
      reklamertDato: harReklamert ? reklamertDato : null,
      dokumentasjon: dokLabels,
      dinHistorie,
      handverkerSvar: handverkerSvar || null,
      navn,
      epost,
      telefon,
      adresse,
      handverkerNavn,
      uploadedFiles,
      outcome,
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
              <p>• Tar ca. 2–3 minutter</p>
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
                onClick={() => setStep("AVTALE")}
                disabled={!canProceedProblem}
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
                onClick={() => setStep("PROBLEM")}
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
                onClick={() => setStep("DOKUMENTASJON")}
                disabled={!canProceedTidslinje}
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
                onClick={() => setStep("TIDSLINJE")}
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
                <label className="block text-sm text-slate-500 mb-1">Adresse (valgfritt)</label>
                <textarea
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Gateveien 123&#10;0123 Oslo"
                  rows={2}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none resize-none"
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <label className="block text-sm text-slate-500 mb-1">Håndverkerens navn/firma</label>
                <input
                  type="text"
                  value={handverkerNavn}
                  onChange={(e) => setHandverkerNavn(e.target.value)}
                  placeholder="Elektriker AS / Ola Rørlegger"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
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
