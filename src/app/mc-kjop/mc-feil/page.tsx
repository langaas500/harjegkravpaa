"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, AlertTriangle, ChevronDown } from "lucide-react";
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
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Feil på motorsykkel – har jeg krav?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Ikke alle feil på en MC gir deg rett til å kreve noe av selger. Det avgjørende er om feilen utgjør en mangel i juridisk forstand. Her forklarer vi forskjellen mellom tekniske feil og mangler, og hva som skal til for at du kan ha et krav.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Lurer du på om feilen gir deg rettigheter?
          </h2>
          <p className="text-slate-400 mb-5">
            Om du har et krav avhenger av flere faktorer: hva slags feil det er, når den oppstod, og hva som ble avtalt ved kjøpet. Det krever en konkret vurdering.
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
            Ikke alle feil er mangler
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En teknisk feil og en juridisk mangel er ikke det samme. At noe går i stykker eller ikke fungerer, betyr ikke automatisk at selger er ansvarlig.
            </p>
            <p className="text-slate-300">
              En mangel foreligger når motorsykkelen avviker fra det du med rimelighet kunne forvente ut fra avtalen, prisen, alderen og omstendighetene for øvrig.
            </p>
            <p className="text-slate-300">
              Dette betyr at en eldre MC med høy kilometerstand kan ha feil uten at det er en mangel – fordi slike feil må påregnes.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Teknisk feil vs. normal slitasje
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              En viktig grense går mellom feil som skyldes slitasje og feil som ikke burde oppstått. Denne grensen er ikke alltid klar.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Kan være mangel</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Motorhavari kort tid etter kjøp</li>
                  <li>• Elektriske feil som ikke ble opplyst</li>
                  <li>• Skjulte skader fra tidligere uhell</li>
                  <li>• Feil kilometerstand</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Sjelden mangel</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Slitte bremseklosser</li>
                  <li>• Kjede som må byttes</li>
                  <li>• Dekk med lite mønster</li>
                  <li>• Naturlig slitasje etter bruk</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Grensen er ikke absolutt. En slitedel som ryker uvendig tidlig, kan likevel være en mangel.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Skjulte feil kan være avgjørende
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Feil som ikke var synlige ved kjøpet, men som viser seg etterpå, kan være særlig relevante. Spørsmålet er ofte om feilen fantes allerede ved overleveringen.
            </p>
            <p className="text-slate-300">
              Ved kjøp fra forhandler gjelder en bevisregel: Hvis feilen viser seg innen seks måneder, antas det at den fantes ved leveringen. Da må selger bevise at den ikke gjorde det.
            </p>
            <p className="text-slate-300">
              Ved privatkjøp er bevisbyrden annerledes. Der må du som kjøper oftere dokumentere at feilen var skjult og at den forelå allerede ved kjøpet.
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
              MC-saker kan være teknisk kompliserte. Mange opplever at selger avviser kravet med begrunnelser som høres rimelige ut, men som ikke alltid er juridisk holdbare.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Det er normal slitasje»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Selger hevder ofte dette, men vurderingen må ta hensyn til MC-ens alder, pris og hva som ble opplyst ved kjøpet.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Du har kjørt for hardt»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Dette må selger kunne dokumentere. En påstand er ikke nok til å avvise et krav.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Feilen oppstod etter kjøpet»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Ved kjøp fra forhandler er det selger som må bevise dette innen seks måneder. Bevisbyrden kan være annerledes ved privatkjøp.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              At selger avviser kravet, betyr ikke at du ikke har rett. Det betyr bare at saken må vurderes nærmere.
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
                <span className="font-medium">Har jeg krav hvis motoren ryker kort tid etter kjøp?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Det kan du ha, men det avhenger av MC-ens alder, pris, kilometerstand og hva som ble opplyst. Motorhavari kort tid etter kjøp kan tyde på en skjult feil som forelå ved leveringen.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger sa at MC-en var «feilfri»?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Opplysninger som ble gitt ved kjøpet er relevante. Hvis selger beskrev MC-en som feilfri og den viser seg å ha feil, kan dette styrke et krav om mangel.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg kreve noe hvis MC-en har vært i en ulykke?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Hvis selger ikke opplyste om tidligere skader eller ulykker, kan dette utgjøre en mangel. Manglende opplysninger om vesentlige forhold kan gi grunnlag for krav.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Er det lettere å få medhold ved kjøp fra forhandler?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Forbrukerkjøpsloven gir deg sterkere vern ved kjøp fra forhandler, blant annet gjennom seks måneders-regelen. Men det må fortsatt foreligge en mangel.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            MC-saker er ofte konkrete og tekniske
          </h2>
          <p className="text-slate-400 mb-5">
            Om du har et krav avhenger av de faktiske omstendighetene i din sak. Svar på noen spørsmål om ditt MC-kjøp, så får du en vurdering av om du kan ha rettigheter.
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
