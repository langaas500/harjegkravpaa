"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, XCircle, Briefcase } from "lucide-react";

export default function MistetBagasjePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="font-bold text-lg text-slate-900"
          >
            harjegkravpå.no
          </button>
          <nav className="flex items-center gap-6 text-sm">
            <button onClick={() => router.push("/bilkjop")} className="text-slate-600 hover:text-slate-900">
              Bilkjøp
            </button>
            <button onClick={() => router.push("/flyreiser")} className="text-slate-900 font-medium border-b-2 border-teal-600 pb-1">
              Flyreiser
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Mistet eller forsinket bagasje?
        </h1>
        <p className="text-xl text-slate-600 mb-6">
          Flyselskapet skal dekke utgiftene dine.
        </p>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-10">
          <p className="text-slate-800">
            Ved mistet, forsinket eller skadet bagasje kan du ha krav på erstatning
            på <strong>opptil ca. 16 000 kr</strong> (1 288 SDR) per passasjer.
          </p>
        </div>

        {/* Tre typer */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Hva skjedde med bagasjen?
          </h2>
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="font-semibold">Forsinket bagasje</span>
              </div>
              <p className="text-sm text-slate-700">
                Bagasjen kommer etter deg. Du kan få dekket nødvendige innkjøp (klær, toalettsaker)
                mens du venter.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="font-semibold">Tapt bagasje</span>
              </div>
              <p className="text-sm text-slate-700">
                Bagasje som ikke finnes igjen innen 21 dager regnes som tapt.
                Du kan kreve erstatning for innholdet.
              </p>
            </div>
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-orange-600" />
                <span className="font-semibold">Skadet bagasje</span>
              </div>
              <p className="text-sm text-slate-700">
                Hvis bagasjen er ødelagt eller skadet, kan du kreve reparasjon eller erstatning.
              </p>
            </div>
          </div>
        </div>

        {/* Erstatning */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Hvor mye kan du få?
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-3xl font-bold text-slate-900 mb-2">Opptil ca. 16 000 kr</p>
            <p className="text-sm text-slate-600 mb-4">
              (1 288 SDR - Special Drawing Rights)
            </p>
            <p className="text-sm text-slate-700">
              Dette er maksbeløpet per passasjer. Du får dekket dokumenterte tap,
              ikke et fast beløp. Ta vare på kvitteringer.
            </p>
          </div>
        </div>

        {/* Hva gjør du */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Hva må du gjøre?
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <span className="font-medium">Meld fra umiddelbart</span>
                <p className="text-sm text-slate-600">
                  Gå til bagasjeservice på flyplassen og fyll ut PIR-skjema (Property Irregularity Report).
                  Dette er viktig dokumentasjon.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <span className="font-medium">Dokumenter alt</span>
                <p className="text-sm text-slate-600">
                  Ta vare på boardingkort, bagasjekvittering og alle kvitteringer for nødkjøp.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <span className="font-medium">Send skriftlig krav</span>
                <p className="text-sm text-slate-600">
                  Kontakt flyselskapet skriftlig innen fristene (se under).
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Frister */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
            Viktige frister
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
              <p className="font-semibold text-slate-900">Skadet bagasje</p>
              <p className="text-2xl font-bold text-amber-700 my-2">7 dager</p>
              <p className="text-sm text-slate-600">Fra du mottar bagasjen</p>
            </div>
            <div className="border border-red-200 bg-red-50 rounded-xl p-4">
              <p className="font-semibold text-slate-900">Forsinket bagasje</p>
              <p className="text-2xl font-bold text-red-700 my-2">21 dager</p>
              <p className="text-sm text-slate-600">Fra bagasjen skulle vært levert</p>
            </div>
          </div>
        </div>

        {/* Hva dekkes */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Hva dekkes
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Nødvendige klær og toalettsaker</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Verdi av tapt innhold (dokumentert)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Reparasjon eller erstatning av koffert</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b border-slate-200 pb-2">
              Hva dekkes ikke
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Verdisaker (smykker, elektronikk i innsjekket bagasje)</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Skjøre gjenstander uten spesialemballasje</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>Luksuskjøp utover nødvendig</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Problemer med bagasjen?
          </h2>
          <p className="text-slate-600 mb-4">
            Start med å sjekke flyreisen din for å se hva du kan kreve.
          </p>
          <button
            onClick={() => router.push("/flyreiser")}
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            Sjekk flyreisen din
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Hjemmel */}
        <div className="mt-10 text-sm text-slate-500">
          <p>
            Krav ved bagasjeproblemer følger av Montrealkonvensjonen (1999),
            som gjelder internasjonale flyreiser. Erstatningsgrensen justeres regelmessig av ICAO.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 px-4 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>&copy; 2026 harjegkravpå.no</span>
          <span>Veiledende informasjon, ikke juridisk rådgivning</span>
        </div>
      </footer>
    </main>
  );
}
