"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bike, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McFeilPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

      {/* Sub-header navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-white font-medium hover:text-slate-300 transition"
            >
              Kjøretøy
            </button>
            <button
              onClick={() => router.push("/flyreiser")}
              className="text-slate-400 hover:text-white transition"
            >
              Flyreiser
            </button>
            <button
              onClick={() => router.push("/bilkjop")}
              className="text-white hover:text-slate-300 transition"
            >
              Sjekk saken din →
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">

        {/* H1 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Bike className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Feil på MC – når har du krav?
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Har du kjøpt en motorsykkel som viser seg å ha feil? Da kan du ha krav mot selger. Men ikke alle feil gir rett til reklamasjon. Her forklarer vi hva som regnes som en mangel i juridisk forstand, og hva du kan forvente av en brukt MC.
        </p>

        {/* Section: Hva er en mangel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva er en mangel på MC?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              I juridisk forstand foreligger det en mangel når motorsykkelen ikke samsvarer med det som ble avtalt, eller når den er i vesentlig dårligere stand enn du hadde grunn til å forvente ut fra kjøpesummen og omstendighetene.
            </p>
            <p className="text-slate-300">
              Både kjøpsloven og forbrukerkjøpsloven bruker begrepet «mangel» som grunnlag for kjøpers rettigheter. En mangel kan være fysisk (teknisk feil), rettslig (heftelser) eller knyttet til opplysninger selger ga eller burde gitt.
            </p>
          </div>
        </section>

        {/* Section: Typiske feil */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Typiske feil på motorsykkel
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Noen feiltyper går igjen i tvister om MC-kjøp:
            </p>

            <div className="space-y-4 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Motor og drivverk</p>
                <p className="text-sm text-slate-400 mt-1">
                  Motorproblemer, girkassesvikt, clutchfeil og kjededrift. Disse feilene er ofte kostbare å utbedre.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Elektriske problemer</p>
                <p className="text-sm text-slate-400 mt-1">
                  Feil i tenning, ladesystem, lys eller instrumentpanel. Kan være vanskelig å feilsøke.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Ramme og chassis</p>
                <p className="text-sm text-slate-400 mt-1">
                  Skjulte kollisjonsskader, rust eller sprekker i rammen. Kan være sikkerhetskritisk.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Tidligere skader</p>
                <p className="text-sm text-slate-400 mt-1">
                  Velting eller kollisjoner som ikke ble opplyst om ved salg.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Forventet tilstand */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva kan du forvente av en brukt MC?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En brukt motorsykkel er ikke en ny MC. Det betyr at du må akseptere en viss grad av slitasje. Forventningene justeres ut fra:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Alder og årsmodell</p>
                <p className="text-sm text-slate-400">
                  En 15 år gammel MC vil naturlig ha mer slitasje enn en 3 år gammel.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Kilometerstand</p>
                <p className="text-sm text-slate-400">
                  Høy kilometerstand betyr mer slitasje på motor, drivverk og slitedeler.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Pris</p>
                <p className="text-sm text-slate-400">
                  Lav pris kan indikere at selger har priset inn risiko for feil.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Opplysninger fra selger</p>
                <p className="text-sm text-slate-400">
                  Hva selger sa om MC-en har betydning for hva du kan forvente.
                </p>
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
                <span className="font-medium">Gjelder samme regler for MC som for bil?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, kjøpsloven og forbrukerkjøpsloven gjelder likt for motorsykler, scootere og biler. De samme prinsippene for mangel, reklamasjon og heving gjelder.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva med scooter og moped?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Samme regler gjelder for scooter og moped. Alle motoriserte kjøretøy reguleres av de samme lovene.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lenge kan jeg reklamere?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ved kjøp fra forhandler er fristen 5 år for feil som forventes å vare. Ved privatkjøp er fristen 2 år. Du må reklamere innen rimelig tid etter at du oppdaget feilen.
              </div>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Lurer du på om du har en sak?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål om ditt MC-kjøp, så får du en vurdering av om du kan ha krav mot selger.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av kjøpsloven og forbrukerkjøpsloven.
        </p>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-4 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© 2025 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>

      <SeoFloatingCTA href="/bilkjop" />
    </main>
  );
}
