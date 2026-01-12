"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Users, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McPrivatKjopPage() {
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

        {/* Sone 1: Rask avklaring */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Privat MC-kjøp – har du rettigheter?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Mange tror at kjøp fra privatperson betyr null rettigheter. Det stemmer ikke. Kjøpsloven gjelder også ved private kjøp, og den gir deg vern mot mangler. Men reglene er annerledes enn ved kjøp fra forhandler, og veien til medhold kan være mer krevende.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Kjøpte du MC privat og oppdaget feil?
          </h2>
          <p className="text-slate-400 mb-5">
            At du kjøpte privat betyr ikke at du er uten muligheter. Men vurderingen avhenger av hva som ble sagt, hva som ble skjult, og hvordan kjøpet foregikk.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Kjøpsloven gjelder
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Ved kjøp mellom privatpersoner er det kjøpsloven som regulerer forholdet. Loven gir deg rett til å gjøre krav gjeldende hvis motorsykkelen har en mangel.
            </p>
            <p className="text-slate-300">
              En mangel foreligger når MC-en avviker fra det som ble avtalt, eller fra det du med rimelighet kunne forvente ut fra pris, alder og andre omstendigheter.
            </p>
            <p className="text-slate-300">
              Men bevisbyrden er annerledes enn ved forhandlerkjøp. Du må som hovedregel selv sannsynliggjøre at mangelen forelå ved kjøpstidspunktet.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            «Solgt som den er» stopper ikke alt
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Mange private selgere skriver «solgt som den er» i annonsen eller kontrakten. Det gir selger et visst vern, men det fjerner ikke alle dine rettigheter.
            </p>
            <p className="text-slate-300">
              Selv med et slikt forbehold kan det foreligge en mangel hvis:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Selger har gitt uriktige opplysninger om MC-en</li>
              <li>• Selger har holdt tilbake vesentlige opplysninger</li>
              <li>• MC-en er i vesentlig dårligere stand enn du kunne forvente</li>
            </ul>
            <p className="text-slate-300 mt-4">
              «Solgt som den er» beskytter ikke selger mot egen uredelighet eller tilbakeholdte opplysninger.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Opplysningssvikt er ofte sentralt
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              I mange private MC-saker handler tvisten om hva selger visste og burde ha opplyst om. Opplysningssvikt kan gi grunnlag for krav selv om MC-en ble solgt «som den er».
            </p>
            <p className="text-slate-300">
              Selger plikter å opplyse om forhold som kan ha betydning for kjøpet – særlig feil, skader eller historikk som ikke er synlig ved vanlig undersøkelse.
            </p>
            <p className="text-slate-300">
              Hva som ble sagt i annonsen, i meldinger og ved visning kan bli avgjørende. Dokumentasjon er viktig.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvorfor mange ikke når frem
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Private MC-kjøp kan være vanskeligere å vinne frem med enn forhandlerkjøp. Det skyldes ikke at du mangler rettigheter, men at bevissituasjonen ofte er svakere.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Ord mot ord</p>
                <p className="text-sm text-slate-400 mt-1">
                  Uten skriftlig dokumentasjon blir det ofte ord mot ord om hva som ble sagt ved kjøpet.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Ingen bevisregel</p>
                <p className="text-sm text-slate-400 mt-1">
                  Ved privatkjøp gjelder ikke regelen om at feil som viser seg innen seks måneder antas å ha vært der ved leveringen.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Kortere reklamasjonsfrist</p>
                <p className="text-sm text-slate-400 mt-1">
                  Reklamasjonsfristen er to år ved privatkjøp, mot fem år ved kjøp fra forhandler for feil som forventes å vare.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              At det er vanskeligere betyr ikke at det er umulig. Det betyr at forberedelse og dokumentasjon er viktigere.
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
                <span className="font-medium">Har jeg noen rettigheter ved privatkjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja. Kjøpsloven gjelder ved private kjøp og gir deg rett til å reklamere på mangler. Men reglene er annerledes enn ved forhandlerkjøp.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva betyr «solgt som den er»?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det gir selger et visst vern mot reklamasjoner, men det beskytter ikke mot uriktige eller tilbakeholdte opplysninger. Du kan fortsatt ha et krav.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hvor lang tid har jeg på å reklamere?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ved privatkjøp er den absolutte reklamasjonsfristen to år. I tillegg må du reklamere innen rimelig tid etter at du oppdaget feilen.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger nekter å ta ansvar?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du kan ta saken videre til forliksrådet. Det er ofte nødvendig ved private tvister der partene ikke blir enige.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Private MC-kjøp krever mer av deg
          </h2>
          <p className="text-slate-400 mb-5">
            Rettighetene finnes, men veien til medhold kan være mer krevende. Svar på noen spørsmål om ditt kjøp, så får du en vurdering av hva du kan gjøre videre.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-white text-[#0c1220] px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av kjøpsloven.
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
