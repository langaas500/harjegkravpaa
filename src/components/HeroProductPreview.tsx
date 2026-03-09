"use client";

import { useState, useEffect } from "react";

function TypingDots() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d % 3) + 1), 400);
    return () => clearInterval(t);
  }, []);
  return <span>{".".repeat(dots)}</span>;
}

function Bar({ value, ms = 800 }: { value: number; ms?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 60);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all ease-out"
        style={{ width: `${w}%`, transitionDuration: `${ms}ms` }}
      />
    </div>
  );
}

function SelectCard({ icon, label, sub, selected, delay }: { icon: string; label: string; sub?: string; selected: boolean; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${
        selected
          ? "border-emerald-500/40 bg-emerald-500/[0.08]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <span className={`text-lg ${selected ? "text-emerald-400" : "text-white/50"}`}>
        {icon}
      </span>
      <span className={`text-xs font-semibold ${selected ? "text-emerald-300" : "text-white/70"}`}>
        {label}
      </span>
      {sub && (
        <span className="text-[10px] text-slate-600 text-center leading-tight">
          {sub}
        </span>
      )}
    </div>
  );
}

function IssueChip({ label, selected, delay }: { label: string; selected: boolean; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`rounded-lg border px-2.5 py-2 text-[10px] font-medium transition-all duration-400 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      } ${
        selected
          ? "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-300"
          : "border-white/[0.06] bg-white/[0.02] text-white/50"
      }`}
    >
      {label}
    </div>
  );
}

const PHASES = [
  { key: "vehicle", label: "Kjøretøy", progress: 8 },
  { key: "seller", label: "Selger", progress: 22 },
  { key: "issues", label: "Problem", progress: 40 },
  { key: "analyzing", label: "Analyserer", progress: 75 },
  { key: "result", label: "Resultat", progress: 100 },
];

export default function HeroProductPreview() {
  const [phase, setPhase] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showVerdict, setShowVerdict] = useState(false);
  const [verdictItems, setVerdictItems] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (phase === 0) {
      setSelectedVehicle(false);
      timers.push(setTimeout(() => setSelectedVehicle(true), 1200));
      timers.push(setTimeout(() => setPhase(1), 2400));
    }

    if (phase === 1) {
      setSelectedSeller(false);
      timers.push(setTimeout(() => setSelectedSeller(true), 1000));
      timers.push(setTimeout(() => setPhase(2), 2200));
    }

    if (phase === 2) {
      setSelectedIssues([]);
      timers.push(setTimeout(() => setSelectedIssues(["engine"]), 800));
      timers.push(setTimeout(() => setSelectedIssues(["engine", "rust"]), 1400));
      timers.push(setTimeout(() => setPhase(3), 2600));
    }

    if (phase === 3) {
      timers.push(setTimeout(() => setPhase(4), 2500));
    }

    if (phase === 4) {
      setShowVerdict(false);
      setVerdictItems(0);
      timers.push(setTimeout(() => setShowVerdict(true), 400));
      timers.push(setTimeout(() => setVerdictItems(1), 900));
      timers.push(setTimeout(() => setVerdictItems(2), 1250));
      timers.push(setTimeout(() => setVerdictItems(3), 1600));
      timers.push(
        setTimeout(() => {
          setPhase(0);
          setSelectedVehicle(false);
          setSelectedSeller(false);
          setSelectedIssues([]);
          setShowVerdict(false);
          setVerdictItems(0);
        }, 7000)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const current = PHASES[phase];

  const issues = [
    { id: "engine", label: "Motor / ytelse" },
    { id: "gearbox", label: "Girkasse / clutch" },
    { id: "electric", label: "Elektrisk / batteri" },
    { id: "rust", label: "Rust / karosseri" },
    { id: "brakes", label: "Bremser" },
    { id: "other", label: "Annet" },
  ];

  return (
    <div className="w-85 mx-auto select-none">
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d1411]/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden">
        <Bar value={current.progress} ms={phase === 3 ? 2200 : 800} />

        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
            {current.label}
          </span>
          <span className="text-[10px] text-slate-600">{current.progress}%</span>
        </div>

        <div className="px-4 pb-5 h-80 flex flex-col overflow-hidden">

          {phase === 0 && (
            <>
              <h3 className="text-sm font-bold text-white/90 mb-3">Om kjøretøyet</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <SelectCard icon="🚗" label="Bil" selected={selectedVehicle} delay={300} />
                <SelectCard icon="🏍️" label="Motorsykkel" selected={false} delay={500} />
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Merke", value: "Volkswagen" },
                  { label: "Modell", value: "Golf" },
                  { label: "Kjøpesum", value: "189 000 kr" },
                ].map((field, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 transition-all duration-500"
                    style={{
                      opacity: selectedVehicle ? 1 : 0,
                      transform: selectedVehicle ? "translateY(0)" : "translateY(4px)",
                      transitionDelay: `${i * 150 + 200}ms`,
                    }}
                  >
                    <span className="text-[10px] text-slate-500">{field.label}</span>
                    <span className="text-xs font-medium text-white/70">{field.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-3">
                <div className={`w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-bold text-black transition-all duration-400 ${selectedVehicle ? "opacity-100" : "opacity-30"}`}>
                  Neste →
                </div>
              </div>
            </>
          )}

          {phase === 1 && (
            <>
              <h3 className="text-sm font-bold text-white/90 mb-3">Hvem kjøpte du av?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                <SelectCard icon="👤" label="Privatperson" sub="FINN, Torget, bekjent" selected={selectedSeller} delay={200} />
                <SelectCard icon="🏢" label="Forhandler" sub="Bilforretning" selected={false} delay={400} />
              </div>
              <div className="mt-auto pt-3">
                <div className={`w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-bold text-black transition-all duration-400 ${selectedSeller ? "opacity-100" : "opacity-30"}`}>
                  Neste →
                </div>
              </div>
            </>
          )}

          {phase === 2 && (
            <>
              <h3 className="text-sm font-bold text-white/90 mb-1">Hva er problemet?</h3>
              <p className="text-[10px] text-slate-500 mb-3">Velg alle som gjelder</p>
              <div className="grid grid-cols-2 gap-1.5">
                {issues.map((issue, i) => (
                  <IssueChip
                    key={issue.id}
                    label={issue.label}
                    selected={selectedIssues.includes(issue.id)}
                    delay={200 + i * 120}
                  />
                ))}
              </div>
              <div className="mt-auto pt-3">
                <div className={`w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-bold text-black transition-all duration-400 ${selectedIssues.length > 0 ? "opacity-100" : "opacity-30"}`}>
                  Neste →
                </div>
              </div>
            </>
          )}

          {phase === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="relative h-14 w-14">
                <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 animate-spin" />
                <div className="absolute inset-2.5 rounded-full border border-transparent border-t-emerald-500/50 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60">
                  Analyserer saken din<TypingDots />
                </p>
                <p className="text-[10px] text-slate-600 mt-1">
                  Vurderer mot kjøpsloven §17–19
                </p>
              </div>
            </div>
          )}

          {phase === 4 && (
            <div className={`flex-1 flex flex-col transition-all duration-500 ${showVerdict ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/25">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-400">Sannsynlig krav</p>
                  <p className="text-[10px] text-slate-500">Sterk sak basert på opplysningene</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Du har sannsynligvis krav på heving eller prisavslag. Selger har gitt mangelfulle opplysninger.
              </p>

              <div className="space-y-1.5 mb-4">
                <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">Mulige krav</p>
                {["Heving av kjøpet", "Prisavslag", "Erstatning for utgifter"].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/15 px-3 py-2 transition-all duration-400 ${
                      i < verdictItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-[11px] text-emerald-300/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-1.5">
                <div className="w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-bold text-black">
                  Juridisk rapport + kravbrev — 99 kr
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-[-2px] h-10 w-[75%] bg-emerald-500/[0.05] rounded-full blur-2xl" />
    </div>
  );
}
