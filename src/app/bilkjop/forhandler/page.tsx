"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Store, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function ForhandlerPage() {
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
            <Store className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Kjøpt bil av forhandler – hvilke rettigheter har jeg?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Når du kjøper bil av en forhandler, har du sterkere vern enn ved privatkjøp. Men det betyr ikke at alle krav går igjennom. Forbrukerkjøpsloven gir deg rettigheter, men de må vurderes konkret i hver sak.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Usikker på hva du kan kreve?
          </h2>
          <p className="text-slate-400 mb-5">
            Om du har et krav avhenger av feilen, hva som ble avtalt, og hvordan forhandler har håndtert saken. Det krever en konkret vurdering.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Forbrukerkjøpsloven gjelder
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Når du som privatperson kjøper bil av en næringsdrivende, er det forbrukerkjøpsloven som gjelder. Denne loven gir deg et sterkere vern enn kjøpsloven, som gjelder mellom private.
            </p>
            <p className="text-slate-300">
              Forbrukerkjøpsloven kan ikke avtales bort til ugunst for deg. Det betyr at forhandler ikke kan fraskrive seg ansvar gjennom kontraktsvilkår.
            </p>
            <p className="text-slate-300">
              Reklamasjonsfristen er fem år for feil som kan forventes å vare over tid. Du må også reklamere innen rimelig tid etter at du oppdaget feilen.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Forhandler har et utvidet ansvar
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Forhandler er profesjonell part og forventes å ha kunnskap om bilene de selger. Dette påvirker vurderingen av hva som utgjør en mangel.
            </p>
            <p className="text-slate-300">
              Ved forbrukerkjøp gjelder en viktig bevisregel: Hvis en feil viser seg innen seks måneder etter kjøpet, antas det at feilen fantes ved levering. Da er det forhandler som må bevise at den ikke gjorde det.
            </p>
            <p className="text-slate-300">
              Forhandler har også plikt til å gi riktige opplysninger om bilen. Uriktige eller manglende opplysninger kan i seg selv utgjøre en mangel.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Sterkere vern betyr ikke automatisk medhold
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Selv om forbrukerkjøpsloven gir deg bedre vern, er det ikke slik at alle krav fører frem. Det må fortsatt foreligge en mangel, og kravet må være fremsatt i tide.
            </p>
            <p className="text-slate-300">
              Hva du kan forvente av bilen avhenger av flere faktorer: pris, alder, kilometerstand og hva som ble sagt ved kjøpet. En bruktbil vil ha slitasje, og ikke alt er en mangel.
            </p>
            <p className="text-slate-300">
              Forhandler har også rett til å forsøke å rette feilen før du kan kreve andre løsninger. Dette må tas med i vurderingen.
            </p>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvorfor noen får avslag
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Mange opplever at forhandler avviser kravet. Det kan ha flere årsaker, og avslag betyr ikke nødvendigvis at du står uten rettigheter.
            </p>
            <div className="space-y-3 mt-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Feilen er normal slitasje»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Forhandler hevder ofte dette, men vurderingen må ta hensyn til bilens alder, pris og hva som ble opplyst.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Du har reklamert for sent»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Hva som er «rimelig tid» varierer. At forhandler påstår dette, betyr ikke at det stemmer.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">«Vi har tilbudt reparasjon»</p>
                <p className="text-sm text-slate-400 mt-1">
                  Forhandler har rett til å forsøke retting, men denne retten er ikke ubegrenset.
                </p>
              </div>
            </div>
            <p className="text-slate-300 mt-4">
              Et avslag fra forhandler er ikke en endelig avgjørelse. Det er deres syn på saken, ikke en juridisk konklusjon.
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
                <span className="font-medium">Hvor lenge kan jeg reklamere på bil kjøpt av forhandler?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Den absolutte reklamasjonsfristen er fem år for feil som kan forventes å vare over tid. Du må også reklamere innen rimelig tid etter at du oppdaget feilen.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva betyr seks måneders-regelen?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Hvis en feil viser seg innen seks måneder, antas det at feilen fantes ved levering. Da må forhandler bevise at den ikke gjorde det.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan forhandler kreve at jeg bruker deres verksted?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ved reklamasjon har forhandler rett til å velge hvor retting skal skje. Men for vanlig service står du fritt til å velge verksted.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg kreve pengene tilbake hvis forhandler ikke klarer å reparere?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Heving kan være aktuelt hvis retting ikke lykkes eller mangelen er vesentlig. Men terskelen er høy, og det krever en konkret vurdering.
              </div>
            </details>
          </div>
        </section>

        {/* Sone 5: Avslutning */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Rettigheter må alltid vurderes konkret
          </h2>
          <p className="text-slate-400 mb-5">
            Selv om du har sterkere vern ved kjøp fra forhandler, avhenger utfallet av din konkrete situasjon. Svar på noen spørsmål, så får du en vurdering av saken din.
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
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av forbrukerkjøpsloven.
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
