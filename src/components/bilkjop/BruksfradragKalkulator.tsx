"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function parseNorwegianNumber(raw: string): number {
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(/\s/g, "");
  const normalized = cleaned
    .replace(/(\.|,)(?=\d{3}(\D|$))/g, "")
    .replace(/,.*$/, "")
    .replace(/\..*$/, "");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function formatNOK(n: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function BruksfradragKalkulator() {
  const [kjoepesum, setKjoepesum] = useState("");
  const [km, setKm] = useState("");
  const [sats, setSats] = useState("1.50");

  const kjoepesumNum = parseNorwegianNumber(kjoepesum);
  const kmNum = parseNorwegianNumber(km);
  const satsNum = parseFloat(sats) || 1.5;

  const nyttevederlag = Math.round(kmNum * satsNum);
  const tilbake = Math.max(0, kjoepesumNum - nyttevederlag);
  const harData = kjoepesumNum > 0 && kmNum > 0;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-6">
      <div>
        <p className="text-slate-300 mb-6">
          Ved heving kan selger kreve nyttevederlag for kilometerne du har kjørt
          bilen. Kalkulatoren gir et estimat – det faktiske beløpet avgjøres
          konkret i hvert enkelt tilfelle.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bruksfradrag-kjoepesum" className="block text-sm text-slate-400 mb-1.5">
              Kjøpesum (kr)
            </label>
            <input
              id="bruksfradrag-kjoepesum"
              type="text"
              inputMode="numeric"
              placeholder="f.eks. 250 000"
              value={kjoepesum}
              onChange={(e) => setKjoepesum(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
            />
          </div>
          <div>
            <label htmlFor="bruksfradrag-km" className="block text-sm text-slate-400 mb-1.5">
              Kjørte km etter kjøp
            </label>
            <input
              id="bruksfradrag-km"
              type="text"
              inputMode="numeric"
              placeholder="f.eks. 8 000"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
            />
          </div>
          <div>
            <label htmlFor="bruksfradrag-sats" className="block text-sm text-slate-400 mb-1.5">
              Sats per km (kr)
            </label>
            <select
              id="bruksfradrag-sats"
              value={sats}
              onChange={(e) => setSats(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0f1628] px-4 py-3 text-white focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
            >
              <option value="1.00">1,00 kr – eldre/rimelig bil</option>
              <option value="1.50">1,50 kr – vanlig bruktbil</option>
              <option value="2.50">2,50 kr – nyere/dyrere bil</option>
              <option value="3.50">3,50 kr – ny/høyverdi bil</option>
            </select>
          </div>
        </div>
      </div>

      {harData && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Kjøpesum</span>
            <span className="text-white font-medium">
              {formatNOK(kjoepesumNum)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">
              Estimert nyttevederlag ({kmNum.toLocaleString("nb-NO")} km ×{" "}
              {sats.replace(".", ",")} kr)
            </span>
            <span className="text-red-400 font-medium">
              − {formatNOK(nyttevederlag)}
            </span>
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between items-center">
            <span className="text-white font-semibold">
              Estimert tilbakebetaling
            </span>
            <span className="text-emerald-400 font-bold text-xl">
              {formatNOK(tilbake)}
            </span>
          </div>
          <p className="text-xs text-slate-500 pt-1">
            Estimat basert på {sats.replace(".", ",")} kr/km. Det faktiske
            nyttevederlag fastsettes skjønnsmessig og kan avvike.
          </p>
        </div>
      )}

      {!harData && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center text-slate-500 text-sm">
          Fyll inn kjøpesum og kjørte kilometer for å se estimat
        </div>
      )}

      <div className="pt-2 border-t border-white/[0.06]">
        <p className="text-sm text-slate-400 mb-3">
          Vil du vite om du faktisk har grunnlag for å heve?
        </p>
        <Link
          href="/bilkjop"
          className="inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition"
        >
          Sjekk om du kan heve bilkjøpet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
