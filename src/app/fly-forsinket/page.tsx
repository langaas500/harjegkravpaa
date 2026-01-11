"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Clock, CheckCircle2, XCircle, Plane } from "lucide-react";

export default function FlyForsinketPage() {
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
          Fly forsinket mer enn 3 timer?
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Sjekk om du har krav på kompensasjon.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
          <p className="text-slate-800">
            Hvis flyet ditt er forsinket mer enn 3 timer ved ankomst, kan du ha krav på
            kompensasjon på <strong>opptil 600 euro</strong>, avhengig av flyvningens lengde.
          </p>
        </div>

        {/* Vilkår */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Når har du krav på kompensasjon?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Forsinkelsen er over 3 timer ved ankomst</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Flyvningen går fra EU/EØS, eller til EU/EØS med et EU-basert flyselskap</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>Forsinkelsen skyldes ikke ekstraordinære omstendigheter</span>
            </li>
          </ul>
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
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–London</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">400 EUR</p>
              <p className="text-sm text-slate-600">1500–3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Roma</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">600 EUR</p>
              <p className="text-sm text-slate-600">Over 3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–New York</p>
            </div>
          </div>
        </div>

        {/* Avslag grunner */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Vanlige grunner til avslag
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Dårlig vær (storm, snø, tåke)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Streik utenfor flyselskapets kontroll</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Sikkerhetstrussel eller politisk ustabilitet</span>
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
                <span>Tekniske problemer med flyet</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Bemanningsproblemer</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Forsinkelse fra forrige flyvning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Er flyet ditt forsinket?
          </h2>
          <p className="text-slate-600 mb-4">
            Finn ut om du har krav på kompensasjon.
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
            Du kan kreve kompensasjon for flyreiser opptil <strong>3 år tilbake i tid</strong>.
            Det betyr at selv om forsinkelsen skjedde for en stund siden, kan du fortsatt ha krav.
          </p>
        </div>

        {/* Hjemmel */}
        <div className="mt-6 text-sm text-slate-500">
          <p>
            Krav på kompensasjon ved forsinkelse følger av EU-forordning 261/2004,
            som gjelder i hele EU/EØS-området. Retten til kompensasjon ved forsinkelse
            ble etablert av EU-domstolen i Sturgeon-dommen (2009).
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
