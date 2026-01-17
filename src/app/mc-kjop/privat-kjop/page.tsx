"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bike, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McPrivatKjopPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button
              onClick={() => router.push("/bilkjop?vehicle=motorcycle")}
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
              onClick={() => router.push("/bilkjop?vehicle=motorcycle")}
              className="text-white hover:text-slate-300 transition"
            >
              Sjekk saken din →
            </button>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Bike className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Kjøpt MC privat? Dine rettigheter
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Ved kjøp av MC fra privatperson gjelder andre regler enn ved forhandlerkjøp. Du har fortsatt rettigheter, men vernet er svakere. Her forklarer vi hva som gjelder.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Forskjeller fra forhandlerkjøp
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Reklamasjonsfrist</p>
                <p className="text-sm text-slate-400">
                  2 år ved privatkjøp (mot 5 år fra forhandler).
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Bevisbyrde</p>
                <p className="text-sm text-slate-400">
                  Du må bevise at feilen fantes ved kjøpet. Ingen omvendt bevisbyrde.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">«Som den er»</p>
                <p className="text-sm text-slate-400">
                  Forbeholdet er gyldig ved privatkjøp, men beskytter ikke mot alt.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Lovverk</p>
                <p className="text-sm text-slate-400">
                  Kjøpsloven gjelder, ikke forbrukerkjøpsloven.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Når har du likevel krav?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Selv ved «som den er»-salg har du krav hvis:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Selger har gitt uriktige opplysninger</li>
              <li>• Selger har holdt tilbake viktige opplysninger</li>
              <li>• MC-en er i vesentlig dårligere stand enn forventet</li>
            </ul>
            <p className="text-slate-300">
              Dokumentasjon er viktig. Ta vare på alle meldinger, annonsetekst og kontrakt.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger løy om kilometerstand?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Manipulert kilometerstand er en mangel uansett «som den er»-forbehold. Du kan kreve prisavslag eller heving.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Bør jeg skrive kontrakt?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, alltid. En skriftlig kontrakt dokumenterer hva som ble avtalt og gir bedre beskyttelse ved tvist.
              </div>
            </details>
          </div>
        </section>

        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Vil du sjekke saken din?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål og få en vurdering av dine rettigheter ved privatkjøp.
          </p>
          <button
            onClick={() => router.push("/bilkjop?vehicle=motorcycle")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </article>

      <footer className="border-t border-white/10 py-6 px-4 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© 2025 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>

      <SeoFloatingCTA href="/bilkjop?vehicle=motorcycle" />
    </main>
  );
}
