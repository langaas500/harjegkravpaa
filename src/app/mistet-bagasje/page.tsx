"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, XCircle, Briefcase, ChevronDown } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

export default function MistetBagasjePage() {
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
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Mistet eller forsinket bagasje?
          </h1>
        </div>

        <p className="text-lg text-slate-300 mb-10">
          Ved mistet, forsinket eller skadet bagasje kan du ha krav på erstatning på opptil ca. 16 000 kr (1 288 SDR) per passasjer. Flyselskapet skal dekke dokumenterte utgifter og tap.
        </p>

        {/* Sone 2: Tidlig beslutningsanker */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center mb-10">
          <h2 className="text-xl font-bold mb-2">
            Problemer med bagasjen?
          </h2>
          <p className="text-slate-400 mb-5">
            Start med å sjekke flyreisen din for å se hva du kan kreve.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Sone 3: Forklaring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva skjedde med bagasjen?
          </h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <span className="font-semibold">Forsinket bagasje</span>
              </div>
              <p className="text-sm text-slate-400">
                Bagasjen kommer etter deg. Du kan få dekket nødvendige innkjøp (klær, toalettsaker) mens du venter.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="font-semibold">Tapt bagasje</span>
              </div>
              <p className="text-sm text-slate-400">
                Bagasje som ikke finnes igjen innen 21 dager regnes som tapt. Du kan kreve erstatning for innholdet.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">Skadet bagasje</span>
              </div>
              <p className="text-sm text-slate-400">
                Hvis bagasjen er ødelagt eller skadet, kan du kreve reparasjon eller erstatning.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hvor mye kan du få?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-3xl font-bold text-white mb-2">Opptil ca. 16 000 kr</p>
            <p className="text-sm text-slate-400 mb-4">
              (1 288 SDR - Special Drawing Rights)
            </p>
            <p className="text-slate-300">
              Dette er maksbeløpet per passasjer. Du får dekket dokumenterte tap, ikke et fast beløp. Ta vare på kvitteringer.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva må du gjøre?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-white text-[#0c1220] rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <span className="font-medium text-white">Meld fra umiddelbart</span>
                <p className="text-sm text-slate-400">
                  Gå til bagasjeservice på flyplassen og fyll ut PIR-skjema (Property Irregularity Report). Dette er viktig dokumentasjon.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-white text-[#0c1220] rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <span className="font-medium text-white">Dokumenter alt</span>
                <p className="text-sm text-slate-400">
                  Ta vare på boardingkort, bagasjekvittering og alle kvitteringer for nødkjøp.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-white text-[#0c1220] rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <span className="font-medium text-white">Send skriftlig krav</span>
                <p className="text-sm text-slate-400">
                  Kontakt flyselskapet skriftlig innen fristene.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Viktige frister
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Skadet bagasje</p>
              <p className="text-2xl font-bold text-amber-400 my-2">7 dager</p>
              <p className="text-sm text-slate-400">Fra du mottar bagasjen</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">Forsinket bagasje</p>
              <p className="text-2xl font-bold text-red-400 my-2">21 dager</p>
              <p className="text-sm text-slate-400">Fra bagasjen skulle vært levert</p>
            </div>
          </div>
        </section>

        {/* Sone 4: Vanlige feil / avslag / misforståelser */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-white/10">
            Hva dekkes og hva dekkes ikke?
          </h2>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-medium text-white mb-3">Hva dekkes:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Nødvendige klær og toalettsaker</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Verdi av tapt innhold (dokumentert)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">Reparasjon eller erstatning av koffert</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-3">Hva dekkes ikke:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Verdisaker i innsjekket bagasje</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Skjøre gjenstander uten spesialemballasje</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400">Luksuskjøp utover nødvendig</span>
                  </li>
                </ul>
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
                <span className="font-medium">Hva er et PIR-skjema?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                PIR (Property Irregularity Report) er et standardskjema du fyller ut på flyplassen når bagasjen er forsinket, tapt eller skadet. Dette er viktig dokumentasjon for senere krav.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Når regnes bagasjen som tapt?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Bagasje som ikke er funnet innen 21 dager etter at den skulle vært levert, regnes som tapt. Da kan du kreve full erstatning.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Hva er SDR?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                SDR (Special Drawing Rights) er en internasjonal regneenhet brukt av IMF. 1 288 SDR tilsvarer ca. 16 000 kr, men kursen varierer.
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/[0.03]">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <span className="font-medium">Kan jeg kjøpe hva som helst mens jeg venter?</span>
                <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-slate-300 text-sm">
                Nei. Du får dekket nødvendige utgifter – klær og toalettsaker som er rimelige. Luksuskjøp eller unødvendige ting dekkes ikke.
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
            Svar på noen enkle spørsmål om flyreisen din, så finner vi ut hva du kan kreve erstatning for.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-[#1F4F45] text-[#ECFDF5] px-6 py-3 rounded-xl font-semibold hover:bg-[#246457] transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </section>

        {/* Legal disclaimer */}
        <p className="text-xs text-slate-600 text-center mt-8">
          Innholdet er generell informasjon og ikke juridisk rådgivning. Reglene følger av Montrealkonvensjonen (1999).
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
