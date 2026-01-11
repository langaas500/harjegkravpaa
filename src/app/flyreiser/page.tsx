"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plane,
  ArrowRight,
  ArrowLeft,
  Clock,
  XCircle,
  UserX,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  FileText,
  Sparkles,
  Briefcase,
} from "lucide-react";
import FileUpload from "@/components/FileUpload";

type ProblemType = "DELAY" | "CANCELLED" | "DENIED_BOARDING" | "BAGGAGE" | null;
type BaggageType = "delayed" | "lost" | "damaged" | null;
type Step =
  | "INTRO"
  | "FLIGHT_DETAILS"
  | "PROBLEM_DETAILS"
  | "EXTRAORDINARY"
  | "AIRLINE_CONTACT"
  | "DESCRIPTION"
  | "RESULT";

interface FlightInfo {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDate: string;
  bookedPrice: string;
}

interface OutcomeType {
  level: "GREEN" | "YELLOW" | "RED";
  title: string;
  summary: string;
  confidence: string;
  compensationAmount: string | null;
  keyPoints: string[];
  legalRefs: { heading: string; refs: string[] }[];
  nextSteps: string[];
  proTip: string;
  disclaimer: string;
}

const DELAY_OPTIONS = [
  { id: "under2", label: "Under 2 timer", compensation: false },
  { id: "2to3", label: "2-3 timer", compensation: false },
  { id: "3to4", label: "3-4 timer", compensation: true },
  { id: "over4", label: "Over 4 timer", compensation: true },
  { id: "never", label: "Flyet kom aldri", compensation: true },
];

const CANCELLATION_NOTICE = [
  { id: "under7", label: "Under 7 dager", desc: "Kort varsel - styrker saken", compensation: true },
  { id: "7to14", label: "7-14 dager", desc: "Mellomvarsel", compensation: "partial" },
  { id: "over14", label: "Over 14 dager", desc: "Tidlig varsel", compensation: false },
];

const BAGGAGE_DELAY_OPTIONS = [
  { id: "under24h", label: "Under 24 timer" },
  { id: "1to2days", label: "1-2 døgn" },
  { id: "2to4days", label: "2-4 døgn" },
  { id: "over4days", label: "Over 4 døgn" },
];

const EXPENSE_TYPE_OPTIONS = [
  { id: "clothes", label: "Klær" },
  { id: "toiletries", label: "Toalettsaker" },
  { id: "work_equipment", label: "Arbeidsutstyr" },
  { id: "transport", label: "Transport" },
  { id: "medicine", label: "Medisiner" },
  { id: "other", label: "Annet" },
];

export default function FlyreiserPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("INTRO");
  const [problemType, setProblemType] = useState<ProblemType>(null);
  const [flight, setFlight] = useState<FlightInfo>({
    airline: "",
    flightNumber: "",
    departureAirport: "",
    arrivalAirport: "",
    flightDate: "",
    bookedPrice: "",
  });
  const [passengerName, setPassengerName] = useState("");

  // Problem-specific details
  const [delayDuration, setDelayDuration] = useState<string | null>(null);
  const [cancellationNotice, setCancellationNotice] = useState<string | null>(null);
  const [offeredAlternative, setOfferedAlternative] = useState<boolean | null>(null);
  const [alternativeDetails, setAlternativeDetails] = useState("");

  // Baggage-specific details
  const [baggageType, setBaggageType] = useState<BaggageType>(null);
  const [hasPIR, setHasPIR] = useState<boolean | null>(null);

  // Enhanced baggage fields
  const [baggageDelayDuration, setBaggageDelayDuration] = useState<string | null>(null);
  const [hadWorkMeetings, setHadWorkMeetings] = useState<boolean | null>(null);
  const [workMeetingsDetails, setWorkMeetingsDetails] = useState("");
  const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
  const [medicineWasNecessary, setMedicineWasNecessary] = useState<boolean | null>(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState("");
  const [hasReceipts, setHasReceipts] = useState<string | null>(null);
  const [wantsClaimText, setWantsClaimText] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ key: string; name: string; type: string; publicUrl: string }[]>([]);

  // Extraordinary circumstances
  const [wasExtraordinary, setWasExtraordinary] = useState<boolean | null>(null);
  const [extraordinaryReason, setExtraordinaryReason] = useState("");

  // Airline contact
  const [contactedAirline, setContactedAirline] = useState<boolean | null>(null);
  const [airlineResponse, setAirlineResponse] = useState("");

  // Description
  const [userDescription, setUserDescription] = useState("");

  // Results
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<OutcomeType | null>(null);

  const canProceedFlightDetails =
    flight.airline &&
    flight.flightNumber &&
    flight.departureAirport &&
    flight.arrivalAirport &&
    flight.flightDate;

  const canProceedProblemDetails =
    (problemType === "DELAY" && delayDuration !== null) ||
    (problemType === "CANCELLED" && cancellationNotice !== null) ||
    (problemType === "DENIED_BOARDING") ||
    (problemType === "BAGGAGE" &&
      baggageType !== null &&
      (baggageType !== "delayed" || baggageDelayDuration !== null) &&
      expenseTypes.length > 0 &&
      totalExpenseAmount !== "" &&
      hasReceipts !== null);

  const canProceedExtraordinary = wasExtraordinary !== null;
  const canProceedAirlineContact = contactedAirline !== null;

  const analyzeCase = async () => {
    setIsAnalyzing(true);
    try {
      const context = {
        problemType,
        flight,
        passengerName,
        delayDuration: problemType === "DELAY" ? delayDuration : null,
        cancellationNotice: problemType === "CANCELLED" ? cancellationNotice : null,
        offeredAlternative,
        alternativeDetails: offeredAlternative ? alternativeDetails : null,
        wasExtraordinary: problemType !== "BAGGAGE" ? wasExtraordinary : null,
        extraordinaryReason: wasExtraordinary ? extraordinaryReason : null,
        // Baggage-specific data
        baggageType: problemType === "BAGGAGE" ? baggageType : null,
        baggageDelayDuration: problemType === "BAGGAGE" && baggageType === "delayed" ? baggageDelayDuration : null,
        hasPIR: problemType === "BAGGAGE" ? hasPIR : null,
        hadWorkMeetings: problemType === "BAGGAGE" ? hadWorkMeetings : null,
        workMeetingsDetails: problemType === "BAGGAGE" && hadWorkMeetings ? workMeetingsDetails : null,
        expenseTypes: problemType === "BAGGAGE" ? expenseTypes : null,
        medicineWasNecessary: problemType === "BAGGAGE" && expenseTypes.includes("medicine") ? medicineWasNecessary : null,
        totalExpenseAmount: problemType === "BAGGAGE" ? totalExpenseAmount : null,
        hasReceipts: problemType === "BAGGAGE" ? hasReceipts : null,
        wantsClaimText: problemType === "BAGGAGE" ? wantsClaimText : null,
        contactedAirline,
        airlineResponse: contactedAirline ? airlineResponse : null,
        userDescription,
      };

      const response = await fetch("/api/analyze-flight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(context),
      });

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();
      setOutcome(result.outcome);
      setStep("RESULT");
    } catch (error) {
      console.error("Flight analysis failed:", error);
      // Fallback outcome - different for baggage vs flight issues
      if (problemType === "BAGGAGE") {
        setOutcome({
          level: "YELLOW",
          title: "Vurdering fullført",
          summary: "Basert på informasjonen du har oppgitt, kan du ha krav på erstatning for bagasjeproblemet. Vi anbefaler å kontakte flyselskapet skriftlig.",
          confidence: "Middels",
          compensationAmount: "Opptil ca. 16 000 kr",
          keyPoints: [
            "Montrealkonvensjonen gir rett til erstatning ved bagasjeproblemer",
            "Maksimal erstatning er ca. 16 000 kr (1 288 SDR)",
            "Du må dokumentere verdier og utgifter",
            hasPIR ? "Du har PIR-skjema, som styrker saken" : "Uten PIR-skjema kan det være vanskeligere å bevise problemet",
          ],
          legalRefs: [
            {
              heading: "Montrealkonvensjonen",
              refs: [
                "Art. 17: Flyselskapet er ansvarlig for skadet/tapt bagasje",
                "Art. 19: Flyselskapet er ansvarlig for forsinket bagasje",
                "Art. 22: Maksimumsbeløp for erstatning (1 288 SDR)",
              ],
            },
          ],
          nextSteps: [
            "Send skriftlig krav til flyselskapet innen 21 dager (forsinket) eller 7 dager (skadet)",
            "Legg ved dokumentasjon på verdier (kvitteringer, bilder)",
            "Ta vare på PIR-skjema og alle kvitteringer",
            "Kontakt Transportklagenemnda ved avslag",
          ],
          proTip: "Ved forsinket bagasje kan du kreve erstatning for nødvendige innkjøp (klær, toalettsaker) mens du ventet.",
          disclaimer: "Dette er veiledning, ikke juridisk rådgivning.",
        });
      } else {
        setOutcome({
          level: "YELLOW",
          title: "Vurdering fullført",
          summary: "Basert på informasjonen du har oppgitt, kan du ha krav på kompensasjon. Vi anbefaler å kontakte flyselskapet skriftlig.",
          confidence: "Middels",
          compensationAmount: null,
          keyPoints: [
            "EU-forordning 261/2004 gir rett til kompensasjon ved forsinkelser over 3 timer",
            "Kompensasjon kan være 250-600 EUR avhengig av distanse",
            "Flyselskapet må bevise ekstraordinære omstendigheter",
          ],
          legalRefs: [
            {
              heading: "EU-forordning 261/2004",
              refs: [
                "Art. 5: Rett til kompensasjon ved kansellering",
                "Art. 7: Kompensasjonsbeløp basert på distanse",
              ],
            },
          ],
          nextSteps: [
            "Send skriftlig krav til flyselskapet",
            "Behold all dokumentasjon (boardingkort, kvitteringer)",
            "Kontakt Transportklagenemnda ved avslag",
          ],
          proTip: "Flyselskapet har 6 ukers svarfrist. Får du avslag, klag til Transportklagenemnda.",
          disclaimer: "Dette er veiledning, ikke juridisk rådgivning.",
        });
      }
      setStep("RESULT");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goToReport = () => {
    const data = {
      problemType,
      flight,
      passengerName,
      delayDuration: problemType === "DELAY" ? delayDuration : null,
      cancellationNotice: problemType === "CANCELLED" ? cancellationNotice : null,
      offeredAlternative,
      alternativeDetails: offeredAlternative ? alternativeDetails : null,
      wasExtraordinary: problemType !== "BAGGAGE" ? wasExtraordinary : null,
      extraordinaryReason: wasExtraordinary ? extraordinaryReason : null,
      // Baggage-specific data
      baggageType: problemType === "BAGGAGE" ? baggageType : null,
      baggageDelayDuration: problemType === "BAGGAGE" && baggageType === "delayed" ? baggageDelayDuration : null,
      hasPIR: problemType === "BAGGAGE" ? hasPIR : null,
      hadWorkMeetings: problemType === "BAGGAGE" ? hadWorkMeetings : null,
      workMeetingsDetails: problemType === "BAGGAGE" && hadWorkMeetings ? workMeetingsDetails : null,
      expenseTypes: problemType === "BAGGAGE" ? expenseTypes : null,
      medicineWasNecessary: problemType === "BAGGAGE" && expenseTypes.includes("medicine") ? medicineWasNecessary : null,
      totalExpenseAmount: problemType === "BAGGAGE" ? totalExpenseAmount : null,
      hasReceipts: problemType === "BAGGAGE" ? hasReceipts : null,
      wantsClaimText: problemType === "BAGGAGE" ? wantsClaimText : null,
      uploadedFiles: problemType === "BAGGAGE" ? uploadedFiles : null,
      contactedAirline,
      airlineResponse: contactedAirline ? airlineResponse : null,
      userDescription,
      outcome,
    };
    localStorage.setItem("flyreiser-data", JSON.stringify(data));
    router.push("/flyreiser/rapport");
  };

  return (
    <main className="bg-nordic text-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10">

        {step === "INTRO" && (
          <section className="space-y-6">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Tilbake til forsiden
            </button>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Flyreiser</h1>
            </div>

            <p className="text-lg text-slate-400">
              Har flyet ditt blitt forsinket, kansellert, ble du nektet ombordstigning, eller har du problemer med bagasjen?
              Sjekk om du har krav på kompensasjon.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-400">Hva skjedde?</p>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => {
                    setProblemType("DELAY");
                    setStep("FLIGHT_DETAILS");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:border-white/30"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="font-semibold">Forsinkelse</p>
                      <p className="text-xs text-slate-500 mt-0.5">Flyet kom frem, men forsinket</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setProblemType("CANCELLED");
                    setStep("FLIGHT_DETAILS");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:border-white/30"
                >
                  <div className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="font-semibold">Kansellering</p>
                      <p className="text-xs text-slate-500 mt-0.5">Flyet ble kansellert</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setProblemType("DENIED_BOARDING");
                    setStep("FLIGHT_DETAILS");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:border-white/30"
                >
                  <div className="flex items-center gap-3">
                    <UserX className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="font-semibold">Nektet ombordstigning</p>
                      <p className="text-xs text-slate-500 mt-0.5">Overbooking eller annen grunn</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setProblemType("BAGGAGE");
                    setStep("FLIGHT_DETAILS");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:border-white/30"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-semibold">Bagasjeproblemer</p>
                      <p className="text-xs text-slate-500 mt-0.5">Forsinket, tapt eller skadet bagasje</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-500 space-y-1">
              <p>• Tar ca. 2 minutter</p>
              <p>• Gratis vurdering</p>
              <p>• Kompensasjon opptil 600 EUR</p>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
              <p className="font-semibold text-emerald-400 mb-2">EU-forordning 261/2004</p>
              <p className="text-slate-300">
                Gjelder alle fly som går fra EU/EØS, eller fly til EU/EØS med EU-basert flyselskap.
              </p>
            </div>

            <p className="text-xs text-slate-600 text-center">
              Veiledende vurdering, ikke juridisk rådgivning
            </p>
          </section>
        )}

        {step === "FLIGHT_DETAILS" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Om flyvningen</h2>

            <div>
              <label className="block text-sm text-slate-500 mb-1">Ditt navn (valgfritt)</label>
              <input
                type="text"
                placeholder="Ola Nordmann"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Flyselskap *</label>
                <input
                  type="text"
                  placeholder="Norwegian, SAS, Widerøe..."
                  value={flight.airline}
                  onChange={(e) => setFlight({ ...flight, airline: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Flynummer *</label>
                <input
                  type="text"
                  placeholder="DY1234, SK456..."
                  value={flight.flightNumber}
                  onChange={(e) => setFlight({ ...flight, flightNumber: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Fra flyplass *</label>
                <input
                  type="text"
                  placeholder="Oslo (OSL), Bergen (BGO)..."
                  value={flight.departureAirport}
                  onChange={(e) => setFlight({ ...flight, departureAirport: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Til flyplass *</label>
                <input
                  type="text"
                  placeholder="London (LHR), Paris (CDG)..."
                  value={flight.arrivalAirport}
                  onChange={(e) => setFlight({ ...flight, arrivalAirport: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Flydato *</label>
                <input
                  type="date"
                  value={flight.flightDate}
                  onChange={(e) => setFlight({ ...flight, flightDate: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Billettpris (valgfritt)</label>
                <input
                  type="text"
                  placeholder="Kr"
                  value={flight.bookedPrice}
                  onChange={(e) => setFlight({ ...flight, bookedPrice: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>
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
                onClick={() => setStep("PROBLEM_DETAILS")}
                disabled={!canProceedFlightDetails}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40 disabled:hover:bg-teal-500"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "PROBLEM_DETAILS" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">
              {problemType === "DELAY" && "Om forsinkelsen"}
              {problemType === "CANCELLED" && "Om kanselleringen"}
              {problemType === "DENIED_BOARDING" && "Om nektet ombordstigning"}
              {problemType === "BAGGAGE" && "Om bagasjeproblemene"}
            </h2>

            {problemType === "DELAY" && (
              <>
                <p className="text-sm text-slate-400">Hvor forsinket var flyet ved ankomst?</p>
                <div className="space-y-2">
                  {DELAY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDelayDuration(opt.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        delayDuration === opt.id
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{opt.label}</span>
                        {opt.compensation && (
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            Mulig kompensasjon
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 text-sm">
                  <p className="font-semibold text-blue-400 mb-2">Viktig om forsinkelse</p>
                  <p className="text-slate-300">
                    Ved forsinkelser på 3 timer eller mer ved ankomst, har du normalt krav på kompensasjon
                    etter EU-forordning 261/2004, med mindre flyselskapet kan bevise ekstraordinære omstendigheter.
                  </p>
                </div>
              </>
            )}

            {problemType === "CANCELLED" && (
              <>
                <p className="text-sm text-slate-400">Hvor lenge før avgang fikk du beskjed om kanselleringen?</p>
                <div className="space-y-2">
                  {CANCELLATION_NOTICE.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCancellationNotice(opt.id)}
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        cancellationNotice === opt.id
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{opt.label}</p>
                          <p className="text-xs text-slate-500">{opt.desc}</p>
                        </div>
                        {opt.compensation === true && (
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            Mulig kompensasjon
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-sm text-slate-300 mb-3">Ble du tilbudt alternativ transport?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOfferedAlternative(true)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        offeredAlternative === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setOfferedAlternative(false)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        offeredAlternative === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                </div>

                {offeredAlternative === true && (
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">
                      Beskriv alternativet (valgfritt)
                    </label>
                    <textarea
                      value={alternativeDetails}
                      onChange={(e) => setAlternativeDetails(e.target.value)}
                      placeholder="F.eks: Fikk ombooking til neste dag kl 14:00..."
                      maxLength={500}
                      rows={3}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                    />
                  </div>
                )}
              </>
            )}

            {problemType === "DENIED_BOARDING" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm">
                  <p className="font-semibold text-red-400 mb-2">Nektet ombordstigning</p>
                  <p className="text-slate-300">
                    Hvis du ble nektet ombordstigning mot din vilje (f.eks. overbooking), har du vanligvis krav på
                    kompensasjon OG refusjon eller ombooking. Dette gjelder ikke hvis du selv var årsaken (for sent, manglende dokumenter).
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-300 mb-3">Ble du tilbudt alternativ transport?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setOfferedAlternative(true)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        offeredAlternative === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setOfferedAlternative(false)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        offeredAlternative === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                </div>

                {offeredAlternative === true && (
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">
                      Beskriv alternativet (valgfritt)
                    </label>
                    <textarea
                      value={alternativeDetails}
                      onChange={(e) => setAlternativeDetails(e.target.value)}
                      placeholder="F.eks: Fikk fly neste morgen + hotell..."
                      maxLength={500}
                      rows={3}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {problemType === "BAGGAGE" && (
              <div className="space-y-5">
                <p className="text-sm text-slate-400">Hva skjedde med bagasjen din?</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setBaggageType("delayed")}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      baggageType === "delayed"
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Forsinket bagasje</p>
                        <p className="text-xs text-slate-500">Bagasjen kom senere enn deg</p>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Mulig erstatning
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setBaggageType("lost")}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      baggageType === "lost"
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tapt bagasje</p>
                        <p className="text-xs text-slate-500">Bagasjen er borte (over 21 dager)</p>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Mulig erstatning
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setBaggageType("damaged")}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      baggageType === "damaged"
                        ? "border-white bg-white/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Skadet bagasje</p>
                        <p className="text-xs text-slate-500">Bagasjen kom frem med skader</p>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Mulig erstatning
                      </span>
                    </div>
                  </button>
                </div>

                {/* Baggage delay duration - only for delayed baggage */}
                {baggageType === "delayed" && (
                  <div>
                    <p className="text-sm text-slate-300 mb-3">Hvor lenge var bagasjen forsinket? *</p>
                    <div className="grid grid-cols-2 gap-2">
                      {BAGGAGE_DELAY_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setBaggageDelayDuration(opt.id)}
                          className={`rounded-xl border p-3 text-sm transition ${
                            baggageDelayDuration === opt.id
                              ? "border-white bg-white/10"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PIR question */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Fylte du ut PIR-skjema på flyplassen?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHasPIR(true)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        hasPIR === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setHasPIR(false)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        hasPIR === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    PIR (Property Irregularity Report) er et skjema du fyller ut på flyplassen når bagasjen mangler eller er skadet.
                  </p>
                </div>

                {/* Work/meetings question */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Hadde du jobbrelaterte oppgaver eller møter under reisen?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setHadWorkMeetings(true)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        hadWorkMeetings === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setHadWorkMeetings(false)}
                      className={`flex-1 rounded-xl border p-4 transition ${
                        hadWorkMeetings === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                </div>

                {hadWorkMeetings === true && (
                  <div>
                    <label className="block text-sm text-slate-500 mb-2">
                      Beskriv kort hva som ble påvirket (valgfritt)
                    </label>
                    <textarea
                      value={workMeetingsDetails}
                      onChange={(e) => setWorkMeetingsDetails(e.target.value)}
                      placeholder="F.eks: Måtte kjøpe dressbukse til kundemøte, presentasjonsutstyr lå i kofferten..."
                      maxLength={500}
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                    />
                  </div>
                )}

                {/* Expense types - multi-select */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Hvilke typer utgifter hadde du? *</p>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPENSE_TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setExpenseTypes((prev) =>
                            prev.includes(opt.id)
                              ? prev.filter((t) => t !== opt.id)
                              : [...prev, opt.id]
                          );
                          // Reset medicine follow-up if medicine is deselected
                          if (opt.id === "medicine" && expenseTypes.includes("medicine")) {
                            setMedicineWasNecessary(null);
                          }
                        }}
                        className={`rounded-xl border p-3 text-sm transition ${
                          expenseTypes.includes(opt.id)
                            ? "border-teal-500 bg-teal-500/10 text-teal-400"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              expenseTypes.includes(opt.id)
                                ? "border-teal-500 bg-teal-500"
                                : "border-white/30"
                            }`}
                          >
                            {expenseTypes.includes(opt.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Medicine follow-up question */}
                {expenseTypes.includes("medicine") && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-slate-300 mb-3">
                      Var dette medisiner du normalt har med på reise?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setMedicineWasNecessary(true)}
                        className={`flex-1 rounded-xl border p-3 text-sm transition ${
                          medicineWasNecessary === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        Ja
                      </button>
                      <button
                        onClick={() => setMedicineWasNecessary(false)}
                        className={`flex-1 rounded-xl border p-3 text-sm transition ${
                          medicineWasNecessary === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        Nei
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Nødvendige medisiner kan typisk dekkes som rimelige erstatningskjøp.
                    </p>
                  </div>
                )}

                {/* Total expense amount */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Totalt beløp for utgifter (NOK) *
                  </label>
                  <input
                    type="number"
                    value={totalExpenseAmount}
                    onChange={(e) => setTotalExpenseAmount(e.target.value)}
                    placeholder="F.eks: 2500"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                  />
                  <p className="text-xs text-slate-600 mt-1">
                    Summen av alle utgifter du hadde på grunn av bagasjeproblemene
                  </p>
                </div>

                {/* Receipts question */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Har du kvitteringer for utgiftene? *</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setHasReceipts("yes")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        hasReceipts === "yes"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setHasReceipts("partial")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        hasReceipts === "partial"
                          ? "border-amber-500 bg-amber-500/10 text-amber-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Delvis
                    </button>
                    <button
                      onClick={() => setHasReceipts("no")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        hasReceipts === "no"
                          ? "border-red-500 bg-red-500/10 text-red-400"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                  {hasReceipts === "partial" && (
                    <p className="text-xs text-amber-400/80 mt-2">
                      Det kan være mulig å kreve erstatning for utgifter der du har dokumentasjon.
                    </p>
                  )}
                  {hasReceipts === "no" && (
                    <p className="text-xs text-red-400/80 mt-2">
                      Uten kvitteringer kan det være vanskeligere å få erstatning, men du kan likevel prøve.
                    </p>
                  )}
                </div>

                {/* Claim text preference */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Ønsker du hjelp til å skrive kravtekst?</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setWantsClaimText("yes")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        wantsClaimText === "yes"
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setWantsClaimText("maybe")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        wantsClaimText === "maybe"
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Kanskje senere
                    </button>
                    <button
                      onClick={() => setWantsClaimText("no")}
                      className={`rounded-xl border p-3 text-sm transition ${
                        wantsClaimText === "no"
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      Nei
                    </button>
                  </div>
                </div>

                {/* File upload */}
                <div>
                  <p className="text-sm text-slate-300 mb-3">Last opp dokumentasjon (valgfritt)</p>
                  <FileUpload
                    category="flyreiser"
                    maxFiles={5}
                    files={uploadedFiles}
                    onFilesChange={setUploadedFiles}
                  />
                  <p className="text-xs text-slate-600 mt-2">
                    Kvitteringer, PIR-skjema, boardingkort eller annen relevant dokumentasjon
                  </p>
                </div>

                <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 text-sm">
                  <p className="font-semibold text-purple-400 mb-2">Montrealkonvensjonen</p>
                  <p className="text-slate-300">
                    Ved bagasjeproblemer kan du ha krav på erstatning opptil ca. 16 000 kr (1 288 SDR)
                    etter Montrealkonvensjonen. Du må kunne dokumentere utgifter og verdier.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("FLIGHT_DETAILS")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep(problemType === "BAGGAGE" ? "AIRLINE_CONTACT" : "EXTRAORDINARY")}
                disabled={!canProceedProblemDetails}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "EXTRAORDINARY" && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
              <h2 className="text-2xl font-bold">Ekstraordinære omstendigheter</h2>
            </div>

            <p className="text-sm text-slate-400">
              Oppga flyselskapet en grunn for problemet?
            </p>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
              <p className="font-semibold text-amber-400 mb-2">Viktig juridisk poeng</p>
              <p className="text-slate-300 mb-2">
                Flyselskapet kan nekte kompensasjon ved &ldquo;ekstraordinære omstendigheter&rdquo; som:
              </p>
              <ul className="text-slate-300 space-y-1 text-xs">
                <li>• Ekstremvær som gjør det umulig å fly</li>
                <li>• Politisk ustabilitet / terrorfare</li>
                <li>• Flygelederstrike (ikke ansatte i flyselskapet)</li>
                <li>• Uforutsette sikkerhetsfeil oppdaget samme dag</li>
              </ul>
              <p className="text-slate-400 mt-2 text-xs">
                Tekniske feil, bemanningsproblemer og overbooking er IKKE ekstraordinære omstendigheter.
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-300 mb-3">Oppga flyselskapet ekstraordinære omstendigheter?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setWasExtraordinary(true)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    wasExtraordinary === true ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Ja, de sa det
                </button>
                <button
                  onClick={() => setWasExtraordinary(false)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    wasExtraordinary === false ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Nei / Vet ikke
                </button>
              </div>
            </div>

            {wasExtraordinary === true && (
              <div>
                <label className="block text-sm text-slate-500 mb-2">
                  Hva sa de? (valgfritt)
                </label>
                <textarea
                  value={extraordinaryReason}
                  onChange={(e) => setExtraordinaryReason(e.target.value)}
                  placeholder="F.eks: De sa det var tekniske problemer / dårlig vær..."
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("PROBLEM_DETAILS")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("AIRLINE_CONTACT")}
                disabled={!canProceedExtraordinary}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-3 font-semibold hover:bg-teal-400 transition disabled:opacity-40"
              >
                Neste
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        )}

        {step === "AIRLINE_CONTACT" && (
          <section className="space-y-5">
            <h2 className="text-2xl font-bold">Kontakt med flyselskapet</h2>
            <div>
              <p className="text-sm text-slate-300 mb-3">Har du kontaktet flyselskapet om kompensasjon?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setContactedAirline(true)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    contactedAirline === true ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Ja
                </button>
                <button
                  onClick={() => setContactedAirline(false)}
                  className={`flex-1 rounded-xl border p-4 transition ${
                    contactedAirline === false ? "border-white bg-white/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  Nei, ikke ennå
                </button>
              </div>
            </div>

            {contactedAirline === true && (
              <div>
                <label className="block text-sm text-slate-500 mb-2">
                  Hva svarte de? (valgfritt)
                </label>
                <textarea
                  value={airlineResponse}
                  onChange={(e) => setAirlineResponse(e.target.value)}
                  placeholder="F.eks: De nektet ansvar, sa det var ekstraordinære omstendigheter..."
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                />
                <p className="text-xs text-slate-600 mt-1">{airlineResponse.length} / 500 tegn</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("EXTRAORDINARY")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-slate-400 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Tilbake
              </button>
              <button
                onClick={() => setStep("DESCRIPTION")}
                disabled={!canProceedAirlineContact}
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
              <p className="font-medium text-slate-400 mb-1">Tips - inkluder gjerne:</p>
              <ul className="space-y-0.5">
                <li>• Hva skjedde og når du fikk vite om det</li>
                <li>• Konsekvenser (tapte tilkoblinger, hotell, møter)</li>
                <li>• Kommunikasjon med flyselskapet</li>
                <li>• Ekstrautgifter du har hatt</li>
              </ul>
            </div>

            <textarea
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
              placeholder="Beskriv hva som skjedde..."
              maxLength={2000}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-slate-600">{userDescription.length} / 2000 tegn</p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("AIRLINE_CONTACT")}
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

              {outcome.compensationAmount && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-slate-400">Mulig kompensasjon</p>
                  <p className="text-2xl font-bold text-emerald-400">{outcome.compensationAmount}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Nøkkelpunkter</p>
              <ul className="text-slate-300 space-y-1">
                {outcome.keyPoints.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-500 uppercase tracking-wide">Neste steg</p>
              <ul className="text-slate-300 space-y-1">
                {outcome.nextSteps.map((step, i) => (
                  <li key={i}>{i + 1}. {step}</li>
                ))}
              </ul>
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
