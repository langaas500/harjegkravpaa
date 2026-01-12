"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, UserX, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function NektetOmbordstigningPage() {
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
            <UserX className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Nektet ombordstigning?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Hvis flyselskapet nekter deg ombordstigning mot din vilje på grunn av overbooking, har du krav på kompensasjon på opptil 600 euro. I tillegg kan du velge mellom refusjon eller ombooking.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Ble du nektet ombordstigning?
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
            Hva er overbooking?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Flyselskaper selger ofte flere billetter enn det er seter på flyet. De regner med at noen ikke møter opp. Når alle møter opp, må noen nektes ombordstigning.
            </p>
            <p className="text-slate-300">
              Dette er <strong className="text-white">flyselskapets risiko</strong>, og du skal ikke tape på det. Derfor har du krav på kompensasjon når dette skjer.
            </p>
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
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">400 EUR</p>
              <p className="text-sm text-slate-400">1500–3500 km</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <p className="text-3xl font-bold text-white mb-1">600 EUR</p>
              <p className="text-sm text-slate-400">Over 3500 km</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            I tillegg til kompensasjonen har du rett til refusjon av billetten eller ombooking til neste ledige fly.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Dine rettigheter ved nektet ombordstigning
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Kompensasjon umiddelbart</span>
                  <p className="text-sm text-slate-400">Flyselskapet skal tilby kompensasjon på stedet, ikke bare ved klage senere.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Valg mellom refusjon eller ombooking</span>
                  <p className="text-sm text-slate-400">Du velger selv om du vil ha pengene tilbake eller bli booket om.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white">Mat, drikke og hotell</span>
                  <p className="text-sm text-slate-400">Flyselskapet skal dekke nødvendige utgifter mens du venter.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når har du krav – og når har du ikke?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-white mb-3">Du har krav ved:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Overbooking (for mange billetter solgt)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Operasjonelle grunner (flybytte, besetning)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Nektet uten god grunn</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-3">Ikke krav dersom:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Du kom for sent til gate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Manglende reisedokumenter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Sikkerhets- eller helseårsaker</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Frivillig vs. ufrivillig
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Flyselskapet skal først spørre om noen vil gi fra seg plassen frivillig mot kompensasjon. Hvis du takker ja frivillig, forhandler du selv om hva du får.
            </p>
            <p className="text-slate-300">
              Hvis du nektes ombordstigning <strong className="text-white">mot din vilje</strong>, har du krav på full kompensasjon etter EU-forordningen.
            </p>
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
                Du kan kreve kompensasjon for nektet ombordstigning opptil 3 år tilbake i tid.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis jeg ga fra meg plassen frivillig?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Hvis du frivillig ga fra deg plassen, gjelder ikke de faste kompensasjonssatsene. Da har du kun krav på det flyselskapet tilbød deg.
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
                <span className="font-medium">Kan flyselskapet nekte å betale?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ved overbooking har du krav på kompensasjon, og flyselskapet kan ikke nekte dette. Hvis de likevel gjør det, kan du ta saken videre til Transportklagenemnda.
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
            Svar på noen enkle spørsmål, så finner vi ut om du har rett til kompensasjon for nektet ombordstigning.
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
