"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bike, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McHevingPage() {
  const router = useRouter();

  return (
    <main className="bg-nordic text-white min-h-screen">

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

      <article className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Bike className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Heving av MC-kjøp – når kan du heve?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Heving betyr at kjøpet oppheves og du får pengene tilbake. Men heving krever en vesentlig mangel. Her forklarer vi når du kan kreve heving av et MC-kjøp.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Vilkår for heving
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              For å heve et kjøp må det foreligge en <strong className="text-white">vesentlig mangel</strong>. Dette vurderes ut fra:
            </p>
            <ul className="text-slate-300 space-y-2 ml-4">
              <li>• Mangelens betydning for deg som kjøper</li>
              <li>• Om mangelen kan utbedres</li>
              <li>• Kostnadene ved utbedring sammenlignet med kjøpesummen</li>
              <li>• Om selger har fått mulighet til å rette</li>
              <li>• Hvor lang tid det har gått siden kjøpet</li>
            </ul>
            <p className="text-slate-300">
              Heving er den mest inngripende sanksjonen og krever at de andre alternativene (retting, prisavslag) ikke er tilstrekkelige.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Eksempler på hevingsgrunnlag
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500/50 pl-4">
                <p className="font-medium text-white">Kan gi heving</p>
                <ul className="text-sm text-slate-400 mt-1 space-y-1">
                  <li>• Alvorlig motorhavari kort tid etter kjøp</li>
                  <li>• Skjult kollisjonsskade som påvirker sikkerheten</li>
                  <li>• Manipulert kilometerstand</li>
                  <li>• Gjentatte feil som ikke lar seg rette</li>
                </ul>
              </div>
              <div className="border-l-2 border-slate-500/50 pl-4">
                <p className="font-medium text-white">Gir normalt ikke heving</p>
                <ul className="text-sm text-slate-400 mt-1 space-y-1">
                  <li>• Mindre feil som enkelt kan rettes</li>
                  <li>• Normal slitasje</li>
                  <li>• Kosmetiske mangler</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Ofte stilte spørsmål
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Får jeg alle pengene tilbake?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                I utgangspunktet ja. Men selger kan kreve fradrag for den nytten du har hatt av MC-en, typisk basert på kjørte kilometer.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis selger nekter å ta MC-en tilbake?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Du kan ta saken til Forbrukertilsynet, Forbrukerrådet eller domstolen. Dokumenter alt skriftlig.
              </div>
            </details>
          </div>
        </section>

        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Vil du vite om du kan heve?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål og få en vurdering av om du har grunnlag for heving.
          </p>
          <button
            onClick={() => router.push("/bilkjop")}
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

      <SeoFloatingCTA href="/bilkjop" />
    </main>
  );
}
