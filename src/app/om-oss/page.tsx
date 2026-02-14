import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OmOssPage() {
  return (
    <main className="bg-[#0a0f0d] text-white min-h-screen overflow-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>

      <article className="relative z-10 max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Tilbake
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold">
            Om Harjegkravpå.no
          </h1>

          <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-2xl">
            Harjegkravpå.no er en norsk selvbetjeningsplattform som hjelper
            forbrukere å forstå hvilke rettigheter de kan ha etter norsk
            forbrukerlovgivning.
          </p>
        </div>

        {/* Hva tjenesten er */}
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold">
            Hva tjenesten er – og ikke er
          </h2>

          <p className="text-slate-300">
            Tjenesten gir veiledende vurderinger basert på opplysningene
            brukeren selv legger inn, og viser hvilke krav som kan være aktuelle
            – som prisavslag, heving eller erstatning.
          </p>

          <p className="text-slate-300">
            Harjegkravpå.no gir veiledende informasjon, ikke juridisk
            rådgivning. Dette betyr blant annet at:
          </p>

          <ul className="text-slate-400 space-y-2 ml-4">
            <li>
              • Vi erstatter ikke advokat eller juridisk bistand i komplekse
              saker
            </li>
            <li>
              • Vi tar ikke kontakt med selger, forhandler eller tredjepart på
              dine vegne
            </li>
            <li>
              • Vurderingene er basert på informasjonen du selv oppgir
            </li>
          </ul>

          <p className="text-slate-300">
            Formålet er å gi deg bedre oversikt før du eventuelt går videre i
            prosessen.
          </p>
        </section>

        {/* Hvem står bak */}
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold">Hvem står bak</h2>

          <p className="text-slate-300">
            Harjegkravpå.no drives av SOLUTIONS BY LANGAAS (org.nr 936 977
            774), registrert i Norge.
          </p>

          <p className="text-slate-300">
            Tjenesten er utviklet for å gjøre forbrukerrettigheter mer
            tilgjengelige, forståelige og praktiske – uten unødvendig
            kompleksitet.
          </p>
        </section>

        {/* Formål */}
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold">Formål</h2>

          <p className="text-slate-300">
            Målet er å senke terskelen for å forstå egne rettigheter, slik at
            du kan ta riktigere valg basert på kunnskap, ikke usikkerhet.
          </p>
        </section>

        {/* CTA */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
          <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
          <div className="relative p-8 md:p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Sjekk om du kan ha et krav
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Gratis, veiledende vurdering på ca. 2 minutter. Ingen konto.
              Ingen binding.
            </p>
            <Link
              href="/bilkjop"
              className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start gratis vurdering
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-6 px-4">
        <div className="max-w-3xl mx-auto text-center text-xs text-slate-600">
          <Link
            href="/bruksvilkar"
            className="hover:text-slate-400 transition-colors"
          >
            Bruksvilkår
          </Link>{" "}
          ·{" "}
          <Link
            href="/personvern"
            className="hover:text-slate-400 transition-colors"
          >
            Personvern
          </Link>{" "}
          ·{" "}
          <Link
            href="/kontakt"
            className="hover:text-slate-400 transition-colors"
          >
            Kontakt oss
          </Link>{" "}
          ·{" "}
          <a
            href="mailto:kontakt@harjegkravpaa.no"
            className="hover:text-slate-400 transition-colors"
          >
            kontakt@harjegkravpaa.no
          </a>
        </div>
      </footer>
    </main>
  );
}
