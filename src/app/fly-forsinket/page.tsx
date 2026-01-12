"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Clock, CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function FlyForsinketPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

      {/* Sub-header navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-slate-400 hover:text-white transition"
            >
              Bilkjøp
            </button>
            <button
              onClick={() => router.push("/flyreiser")}
              className="text-slate-400 hover:text-white transition"
            >
              Flyreiser
            </button>
            <button
              onClick={() => router.push("/flyreiser")}
              className="text-white hover:text-slate-300 transition"
            >
              Sjekk saken din →
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">

        {/* Sone 1: Rask avklaring */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Fly forsinket mer enn 3 timer?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Hvis flyet ditt er forsinket mer enn 3 timer ved ankomst, kan du ha krav på kompensasjon på opptil 600 euro. Men det avhenger av flere faktorer – blant annet årsaken til forsinkelsen og hvor du fløy fra.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Var flyet ditt forsinket?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen enkle spørsmål om flyreisen din, så finner vi ut om du har krav på kompensasjon.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når har du krav på kompensasjon?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              EU-forordning 261/2004 gir deg rett til kompensasjon ved forsinkelse, men ikke i alle tilfeller. Flere vilkår må være oppfylt.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Forsinkelsen er over 3 timer ved ankomst</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Flyvningen går fra EU/EØS, eller til EU/EØS med et EU-basert flyselskap</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">Forsinkelsen skyldes ikke ekstraordinære omstendigheter</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvor mye kan du få?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">250 EUR</p>
              <p className="text-sm text-slate-400">Under 1500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–London</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">400 EUR</p>
              <p className="text-sm text-slate-400">1500–3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–Roma</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">600 EUR</p>
              <p className="text-sm text-slate-400">Over 3500 km</p>
              <p className="text-xs text-slate-500 mt-1">F.eks. Oslo–New York</p>
            </div>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når får du ikke kompensasjon?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Flyselskapet er ikke ansvarlig for «ekstraordinære omstendigheter» – hendelser utenfor deres kontroll.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="font-medium text-white mb-3">Gir vanligvis ikke krav:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Dårlig vær (storm, snø, tåke)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Streik utenfor flyselskapets kontroll</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Sikkerhetstrussel eller politisk ustabilitet</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-3">Du har fortsatt krav ved:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Tekniske problemer med flyet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Bemanningsproblemer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Forsinkelse fra forrige flyvning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lenge kan jeg vente med å kreve kompensasjon?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du kan kreve kompensasjon for flyreiser opptil 3 år tilbake i tid. Det betyr at selv om forsinkelsen skjedde for en stund siden, kan du fortsatt ha krav.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva er «ekstraordinære omstendigheter»?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Hendelser utenfor flyselskapets kontroll, som ekstremvær, terror eller luftromsstenging. Tekniske feil regnes vanligvis ikke som ekstraordinært.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Gjelder reglene for alle flyselskaper?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg kreve kompensasjon selv om jeg fikk mat/hotell?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja. Mat, drikke og hotell er forpleining du har krav på uavhengig av kompensasjon. Kompensasjonen kommer i tillegg.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Sjekk om du har krav
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen enkle spørsmål, så finner vi ut om du har rett til kompensasjon for din forsinkede flyreise.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av EU-forordning 261/2004.
        </p>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© 2025 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>

      <SeoFloatingCTA href="/flyreiser" />
    </main>
  );
}
