"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function FlyKansellertPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="font-bold text-lg text-slate-900"
          >
            harjegkravpå.no
          </button>
          <nav className="flex items-center gap-6 text-sm">
            <button onClick={() => router.push("/bilkjop")} className="text-slate-600 hover:text-slate-900">
              Bilkjøp
            </button>
            <button onClick={() => router.push("/flyreiser")} className="text-slate-900 font-medium border-b-2 border-teal-600 pb-1">
              Flyreiser
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Fly kansellert?
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Du kan ha krav på kompensasjon og refusjon.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-10">
          <p className="text-slate-800">
            Når flyselskapet kansellerer flyet ditt, har du rett til <strong>refusjon eller ombooking</strong>.
            I tillegg kan du ha krav på <strong>opptil 600 euro i kompensasjon</strong>, avhengig av når du fikk beskjed.
          </p>
        </div>

        {/* Når fikk du beskjed */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Når fikk du beskjed om kanselleringen?
          </h2>
          <div className="space-y-4">
            <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold">Under 7 dager før avgang</span>
              </div>
              <p className="text-sm text-slate-700">
                Full kompensasjon (250–600 EUR), med mindre du ble tilbudt alternativ transport
                som ankom nært opprinnelig tid.
              </p>
            </div>
            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-semibold">7–14 dager før avgang</span>
              </div>
              <p className="text-sm text-slate-700">
                Du kan ha krav på kompensasjon, avhengig av alternativ transport som ble tilbudt.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="h-5 w-5 text-slate-400" />
                <span className="font-semibold">Over 14 dager før avgang</span>
              </div>
              <p className="text-sm text-slate-700">
                Normalt ingen kompensasjon, men du har fortsatt rett til refusjon eller ombooking.
              </p>
            </div>
          </div>
        </div>

        {/* Beløp */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Hvor mye kan du få?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">250 EUR</p>
              <p className="text-sm text-slate-600">Under 1500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Stockholm</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">400 EUR</p>
              <p className="text-sm text-slate-600">1500–3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Barcelona</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">600 EUR</p>
              <p className="text-sm text-slate-600">Over 3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Bangkok</p>
            </div>
          </div>
        </div>

        {/* Rettigheter */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Dine rettigheter ved kansellering
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Valg mellom refusjon eller ombooking</span>
                <p className="text-sm text-slate-600">Du velger selv om du vil ha pengene tilbake eller bli booket om til en annen flyvning.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Mat og drikke ved lang ventetid</span>
                <p className="text-sm text-slate-600">Flyselskapet skal dekke rimelige utgifter til mat og drikke mens du venter.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Hotell ved overnatting</span>
                <p className="text-sm text-slate-600">Hvis du må vente til neste dag, skal flyselskapet ordne og betale for hotell.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Avslag grunner */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Flyselskapet kan nekte ved
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Ekstremvær som umuliggjør flyvning</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Flygelederstrike</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Politisk ustabilitet eller terrorfare</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Du har fortsatt krav ved
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Tekniske problemer</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Bemanningsproblemer</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Kommersielle beslutninger</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Ble flyet ditt kansellert?
          </h2>
          <p className="text-slate-600 mb-4">
            Sjekk om du har krav på kompensasjon.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Foreldelse */}
        <div className="mt-10 text-sm text-slate-600">
          <h3 className="font-semibold text-slate-900 mb-2">Viktig om frister</h3>
          <p>
            Du kan kreve kompensasjon for kansellerte flyreiser opptil <strong>3 år tilbake i tid</strong>.
            Ikke vent for lenge med å fremme kravet ditt.
          </p>
        </div>

        {/* Hjemmel */}
        <div className="mt-6 text-sm text-slate-500">
          <p>
            Krav på kompensasjon ved kansellering følger av EU-forordning 261/2004 artikkel 5 og 7,
            som gjelder i hele EU/EØS-området.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 px-4 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>&copy; 2026 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>
    </main>
  );
}
