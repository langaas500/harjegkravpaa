"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bike, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McGarantiPage() {
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
            Garanti på MC – hva dekkes?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Mange MC-er selges med garanti. Men hva betyr egentlig garantien, og hva er forskjellen på garanti og reklamasjonsrett? Her forklarer vi det du trenger å vite.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Garanti vs. reklamasjon
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Reklamasjonsrett</p>
                <p className="text-sm text-slate-300">
                  Lovbestemt rett som gjelder uansett. 5 år fra forhandler, 2 år fra privat.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="font-medium text-white mb-2">Garanti</p>
                <p className="text-sm text-slate-400">
                  Frivillig ordning fra selger. Kan gi bedre dekning, men erstatter ikke reklamasjonsretten.
                </p>
              </div>
            </div>
            <p className="text-slate-300">
              En garanti kan aldri begrense reklamasjonsretten din. Hvis garantien gir deg dårligere vilkår enn loven, er det loven som gjelder.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva dekkes typisk av garanti?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500/50 pl-4">
                <p className="font-medium text-white">Dekkes ofte</p>
                <p className="text-sm text-slate-400 mt-1">
                  Motor, girkasse, ramme, elektriske komponenter, og andre vesentlige deler.
                </p>
              </div>
              <div className="border-l-2 border-rose-500/50 pl-4">
                <p className="font-medium text-white">Dekkes sjelden</p>
                <p className="text-sm text-slate-400 mt-1">
                  Slitedeler (bremser, clutch, kjede), skader fra feil bruk, kosmetiske skader.
                </p>
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
                <span className="font-medium">Kan garantien falle bort?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, typisk hvis du ikke følger serviceintervaller, bruker uautoriserte verksteder, eller har modifisert MC-en.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva hvis garantien er utgått?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Da kan du fortsatt ha reklamasjonsrett etter loven. Reklamasjonsfristen er ofte lenger enn garantitiden.
              </div>
            </details>
          </div>
        </section>

        <section data-final-cta="true" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Vil du sjekke saken din?
          </h2>
          <p className="text-slate-400 mb-5">
            Svar på noen spørsmål og få en vurdering av dine rettigheter.
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
