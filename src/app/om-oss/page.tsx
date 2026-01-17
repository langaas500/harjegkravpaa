import Link from "next/link";

export default function OmOssPage() {
  return (
    <main className="bg-nordic text-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Om Harjegkravpå.no
        </h1>

        <p className="text-slate-300">
          Harjegkravpå.no er en norsk selvbetjeningsplattform som hjelper forbrukere å forstå hvilke rettigheter de kan ha etter norsk forbrukerlovgivning.
        </p>

        <p className="text-slate-300">
          Tjenesten gir veiledende vurderinger basert på opplysningene brukeren selv legger inn, og viser hvilke krav som kan være aktuelle – som prisavslag, heving eller erstatning.
        </p>

        <h2 className="text-xl font-semibold">
          Hva tjenesten er – og ikke er
        </h2>

        <p className="text-slate-300">
          Harjegkravpå.no gir veiledende informasjon, ikke juridisk rådgivning.
        </p>

        <p className="text-slate-300">
          Dette betyr blant annet at:
        </p>

        <ul className="text-slate-300 list-disc pl-5 space-y-1">
          <li>vi erstatter ikke advokat eller juridisk bistand i komplekse saker</li>
          <li>vi tar ikke kontakt med selger, forhandler eller tredjepart på dine vegne</li>
          <li>vurderingene er basert på informasjonen du selv oppgir</li>
        </ul>

        <p className="text-slate-300">
          Formålet er å gi deg bedre oversikt før du eventuelt går videre i prosessen.
        </p>

        <h2 className="text-xl font-semibold">
          Hvem står bak
        </h2>

        <p className="text-slate-300">
          Harjegkravpå.no drives av Langaas Solutions (org.nr 936 977 774), registrert i Norge.
        </p>

        <p className="text-slate-300">
          Tjenesten er utviklet for å gjøre forbrukerrettigheter mer tilgjengelige, forståelige og praktiske – uten unødvendig kompleksitet.
        </p>

        <h2 className="text-xl font-semibold">
          Formål
        </h2>

        <p className="text-slate-300">
          Målet er å senke terskelen for å forstå egne rettigheter, slik at du kan ta riktigere valg basert på kunnskap, ikke usikkerhet.
        </p>

        <p className="text-slate-300">
          <Link href="/bilkjop" className="underline hover:text-white">
            Sjekk om du kan ha et krav →
          </Link>
        </p>
      </article>
    </main>
  );
}
