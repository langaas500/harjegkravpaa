"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, UserX } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function NektetOmbordstigningPage() {
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
          Nektet ombordstigning?
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Overbooking gir deg rett til kompensasjon.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-10">
          <p className="text-slate-800">
            Hvis flyselskapet nekter deg ombordstigning mot din vilje, har du krav på
            <strong> kompensasjon på opptil 600 euro</strong> pluss valget mellom refusjon eller ombooking.
          </p>
        </div>

        {/* Hva er overbooking */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Hva er overbooking?
          </h2>
          <p className="text-slate-700 mb-4">
            Flyselskaper selger ofte flere billetter enn det er seter på flyet.
            De regner med at noen ikke møter opp. Når alle møter opp, må noen nektes ombordstigning.
          </p>
          <p className="text-slate-700">
            Dette er <strong>flyselskapets risiko</strong>, og du skal ikke tape på det.
          </p>
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
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">400 EUR</p>
              <p className="text-sm text-slate-600">1500–3500 km</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">600 EUR</p>
              <p className="text-sm text-slate-600">Over 3500 km</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4">
            I tillegg til kompensasjonen har du rett til refusjon av billetten eller ombooking til neste ledige fly.
          </p>
        </div>

        {/* Dine rettigheter */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Dine rettigheter ved nektet ombordstigning
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Kompensasjon umiddelbart</span>
                <p className="text-sm text-slate-600">Flyselskapet skal tilby kompensasjon på stedet, ikke bare ved klage senere.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Valg mellom refusjon eller ombooking</span>
                <p className="text-sm text-slate-600">Du velger selv om du vil ha pengene tilbake eller bli booket om.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">Mat, drikke og hotell</span>
                <p className="text-sm text-slate-600">Flyselskapet skal dekke nødvendige utgifter mens du venter.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Når gjelder det IKKE */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Du har krav ved
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Overbooking (for mange billetter solgt)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Operasjonelle grunner (flybytte, besetning)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Nektet uten god grunn</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Ikke krav dersom
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Du kom for sent til gate</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Manglende reisedokumenter</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Sikkerhets- eller helseårsaker</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Frivillig */}
        <div className="mb-10 bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-900 mb-2">
            Frivillig vs. ufrivillig
          </h3>
          <p className="text-slate-700 mb-3">
            Flyselskapet skal først spørre om noen vil gi fra seg plassen frivillig mot kompensasjon.
            Hvis du takker ja frivillig, forhandler du selv om hva du får.
          </p>
          <p className="text-slate-700">
            Hvis du nektes ombordstigning <strong>mot din vilje</strong>, har du krav på full kompensasjon etter EU-forordningen.
          </p>
        </div>

        {/* CTA */}
        <div data-final-cta="true" className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Ble du nektet ombordstigning?
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
            Du kan kreve kompensasjon for nektet ombordstigning opptil <strong>3 år tilbake i tid</strong>.
          </p>
        </div>

        {/* Hjemmel */}
        <div className="mt-6 text-sm text-slate-500">
          <p>
            Krav på kompensasjon ved nektet ombordstigning følger av EU-forordning 261/2004 artikkel 4,
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

      <SeoFloatingCTA href="/flyreiser" />
    </main>
  );
}
