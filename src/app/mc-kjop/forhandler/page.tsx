"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bike, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function McForhandlerPage() {
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
            Kjøpt MC fra forhandler? Sterkt forbrukervern
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Ved kjøp av MC fra forhandler har du sterkt forbrukervern. Forbrukerkjøpsloven gir deg rettigheter som forhandler ikke kan avtale seg bort fra.
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Dine rettigheter
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">5 års reklamasjonsfrist</p>
                <p className="text-sm text-slate-300">
                  For feil som forventes å vare, som motor, girkasse og ramme.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Omvendt bevisbyrde</p>
                <p className="text-sm text-slate-300">
                  De første 12 månedene antas feil å ha vært der fra starten.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Ingen «som den er»</p>
                <p className="text-sm text-slate-300">
                  Slike forbehold er ugyldige ved forbrukerkjøp.
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="font-medium text-emerald-400 mb-2">Valg av sanksjon</p>
                <p className="text-sm text-slate-300">
                  Du kan kreve retting, prisavslag, heving eller erstatning.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva kan du kreve?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Retting</p>
                <p className="text-sm text-slate-400 mt-1">
                  Forhandler reparerer uten kostnad. Du kan velge dette fremfor prisavslag.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Prisavslag</p>
                <p className="text-sm text-slate-400 mt-1">
                  Kompensasjon for verdireduksjon. Aktuelt når retting ikke er ønskelig.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Heving</p>
                <p className="text-sm text-slate-400 mt-1">
                  Få pengene tilbake ved vesentlig mangel. MC-en leveres tilbake.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="font-medium text-white">Erstatning</p>
                <p className="text-sm text-slate-400 mt-1">
                  Dekning av økonomisk tap, for eksempel leiebil eller tapt arbeidsinntekt.
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
                <span className="font-medium">Hva hvis forhandler nekter å hjelpe?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Send skriftlig reklamasjon. Deretter kan du kontakte Forbrukerrådet eller ta saken til Forbrukerklageutvalget.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Gjelder garantien i tillegg til reklamasjonsretten?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Ja, garanti kommer i tillegg. Men reklamasjonsretten gjelder uansett og kan ikke begrenses av garantivilkår.
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
