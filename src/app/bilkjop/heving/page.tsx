"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, XOctagon, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function HevingPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">
      {/* Sub-header navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-end">
          <div className="flex items-center gap-8 text-base">
            <button onClick={() => router.push("/bilkjop")} className="text-white font-medium hover:text-slate-300 transition">
              Bilkjøp
            </button>
            <button onClick={() => router.push("/flyreiser")} className="text-slate-400 hover:text-white transition">
              Flyreiser
            </button>
            <button onClick={() => router.push("/bilkjop")} className="text-white hover:text-slate-300 transition">
              Sjekk om du har krav →
            </button>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* H1 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <XOctagon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Heving av bilkjøp – kan jeg levere bilen tilbake?
          </h1>
        </div>

        {/* Intro */}
        <p className="text-lg text-slate-300 mb-10">
          Mange spør: <strong className="text-white">Kan jeg heve bilkjøpet?</strong>
          Heving betyr at kjøpet annulleres – du leverer bilen tilbake og får pengene igjen.
          Dette er mulig ved <em>vesentlig mangel</em>, men terskelen er høy og vurderes konkret
          ut fra feilens alvor, hvem du kjøpte bilen fra, og hva som er forsøkt gjort.
        </p>

        {/* CTA */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Usikker på om du kan heve bilkjøpet?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål om bilkjøpet, så får du en vurdering av om heving kan være aktuelt i din sak.
          </p>
          <button onClick={() => router.push("/bilkjop")} className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition">
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Vesentlig mangel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Kravet om vesentlig mangel
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Det er ikke nok at du har <Link href="/bilkjop/bruktbil-feil" className="underline hover:text-white">kjøpt bil med feil</Link>.
              For å kunne heve må feilen være så alvorlig at kjøpet ikke gir deg det du med rimelighet kunne forvente.
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Feilen har stor betydning for bilens bruk eller verdi</li>
              <li>• Reparasjon er ikke mulig eller vil koste uforholdsmessig mye</li>
              <li>• Selger har fått mulighet til å rette uten å lykkes</li>
              <li>• Du ville ikke kjøpt bilen dersom du kjente til feilen</li>
            </ul>
          </div>
        </section>

        {/* Privat vs forhandler */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Heve bil kjøpt privat eller hos forhandler?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Ved kjøp fra forhandler gjelder forbrukerkjøpsloven, som gir noe sterkere vern.
              Ved privatkjøp gjelder kjøpsloven, men også her kan heving være mulig ved skjulte eller uriktige opplysninger.
            </p>
            <p className="text-slate-300">
              Uansett hvem du kjøpte bilen fra, vurderes heving alltid konkret.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål om heving av bilkjøp
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg heve hvis bilen har vært på verksted flere ganger?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Gjentatte mislykkede reparasjonsforsøk kan styrke et hevingskrav, men det er ikke automatisk nok.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan selger nekte heving?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, ofte kan selger kreve å forsøke retting først – men denne retten er ikke ubegrenset.
              </div>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Vil du vite om heving er realistisk i din sak?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål, så får du en veiledende vurdering av hvilke krav du kan ha.
          </p>
          <button onClick={() => router.push("/bilkjop")} className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition">
            Sjekk saken din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </article>

      <SeoFloatingCTA href="/bilkjop" />
    </main>
  );
}
