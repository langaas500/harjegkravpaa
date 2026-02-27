import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import BilSeoHero from "@/components/seo/BilSeoHero";

const faqs = [
  {
    q: "Kan jeg reklamere selv om garantien har utløpt?",
    a: "Ja. Reklamasjonsretten gjelder uavhengig av garantien. Ved forhandlerkjøp har du opptil 5 års reklamasjonsfrist etter forbrukerkjøpsloven — uansett om garantien var på 1 eller 3 år.",
  },
  {
    q: "Hva er forskjellen på garanti og reklamasjon?",
    a: "Garantien er en frivillig ordning fra selger med egne vilkår og begrensninger. Reklamasjonsretten er lovfestet og kan ikke avtales bort. Garantien kan gi deg noe ekstra, men reklamasjonsretten er alltid minimumsrettighetene dine.",
  },
  {
    q: "Må jeg bruke merkeverksted for å beholde rettighetene mine?",
    a: "Garantien kan kreve det, men reklamasjonsretten har ingen slike krav. Du kan fritt velge verksted uten å miste retten til å reklamere etter loven.",
  },
  {
    q: "Kan selger nekte garanti fordi jeg ikke har fulgt serviceprogrammet?",
    a: "Selger kan avslå en garantisak på dette grunnlaget, men det påvirker ikke reklamasjonsretten. Unntak: dersom manglende service har forårsaket feilen, kan det svekke reklamasjonen.",
  },
  {
    q: "Hva dekker typisk en bruktbilgaranti?",
    a: "Bruktbilgarantier varierer sterkt. Noen dekker motor og drivverk, andre kun spesifikke komponenter. Les vilkårene nøye — mange bruktbilgarantier har omfattende unntak og egenandeler.",
  },
  {
    q: "Kan garantiavslag likevel gi grunnlag for heving?",
    a: "Ja. Garanti og reklamasjon er to uavhengige spor. Selv om garantien ikke dekker feilen, kan mangelen være vesentlig nok til å gi rett til heving etter loven.",
  },
];

export const metadata: Metadata = {
  description:
    "Hva dekker egentlig bilgarantien? Lær forskjellen på garanti og reklamasjonsrett, og hva du kan kreve dersom garantien ikke overholdes.",
};

export default function GarantiPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: "https://harjegkravpå.no",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bilkjøp",
        item: "https://harjegkravpå.no/bilkjop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Garanti på bil",
        item: "https://harjegkravpå.no/bilkjop/garanti",
      },
    ],
  };

  return (
    <BilSeoHero
      eyebrow="Forbrukerrettigheter"
      h1Top="Garanti på bil"
      h1Accent="Hva gjelder egentlig?"
      intro={
        <p className="text-lg text-slate-300 leading-relaxed">
          Garanti og reklamasjon er ikke det samme. Garantien er frivillig fra
          selger — reklamasjonsretten følger av loven. Mange gir opp når
          garantien ikke dekker, uten å vite at de fortsatt kan ha krav.
          Her forklarer vi forskjellen, hva garantien faktisk dekker, og hva
          du kan gjøre når garantien svikter.
        </p>
      }
      heroImageAlt="Garanti på bil – forskjellen mellom garanti og reklamasjon"
      primaryCtaTitle="Gjelder garantien din situasjon?"
      primaryCtaText="Mange får avslag fordi garantien har begrensninger, selv om de fortsatt kan ha rettigheter etter loven. Sjekk saken din."
      primaryCtaButton="Sjekk saken din"
      secondaryCtaText="Sjekk saken din nå →"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <p className="text-sm text-slate-500 mb-10">
        Sist oppdatert: Februar 2026 · Innholdet er utarbeidet med grunnlag i
        forbrukerkjøpsloven, kjøpsloven og relevant nemndpraksis
      </p>

      {/* Garanti vs reklamasjon */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Garanti vs reklamasjon — den viktigste forskjellen
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Mange blander garanti og reklamasjon, men det er to helt
            forskjellige ting. Forstår du forskjellen, kan du unngå å tape
            rettigheter du faktisk har:
          </p>

          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    &nbsp;
                  </th>
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    Garanti
                  </th>
                  <th className="text-left py-3 px-2 text-slate-400 font-medium">
                    Reklamasjon
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Grunnlag
                  </td>
                  <td className="py-3 px-2">Frivillig fra selger</td>
                  <td className="py-3 px-2">Lovfestet rett</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Varighet
                  </td>
                  <td className="py-3 px-2">Varierer (1–5 år typisk)</td>
                  <td className="py-3 px-2">2 år (privat) / 5 år (forhandler)</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Vilkår
                  </td>
                  <td className="py-3 px-2">Selgers egne vilkår og unntak</td>
                  <td className="py-3 px-2">Lovens mangelsbegrep</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Verkstedkrav
                  </td>
                  <td className="py-3 px-2">Ofte krav om merkeverksted</td>
                  <td className="py-3 px-2">Fritt verkstedvalg</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Kan avtales bort?
                  </td>
                  <td className="py-3 px-2">Ja (selgers vilkår bestemmer)</td>
                  <td className="py-3 px-2">Nei (ved forhandlerkjøp)</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 px-2 font-medium text-white">
                    Hva dekkes?
                  </td>
                  <td className="py-3 px-2">Spesifikke feil/komponenter</td>
                  <td className="py-3 px-2">Alle mangler ved kjøpet</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-300">
            Hovedregelen er: garantien kan gi deg noe ekstra, men
            reklamasjonsretten er alltid minimumsrettighetene dine. Et avslag
            på garanti betyr ikke at du mangler rettigheter.
          </p>
        </div>
      </section>

      {/* Hva dekker en garanti */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva dekker en bilgaranti?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Garantiens innhold varierer fra selger til selger. Det finnes ingen
            lovkrav til hva en garanti skal dekke — det er selgers vilkår som
            bestemmer. Typiske varianter:
          </p>
          <div className="space-y-5">
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Nybilgaranti</p>
              <p className="text-sm text-slate-400 mt-1">
                De fleste bilprodusenter tilbyr 3–7 års nybilgaranti.
                Dekker vanligvis fabrikasjonsfeil og materialfeil, men ikke
                slitedeler. Krever ofte at service utføres hos autorisert
                verksted.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">Bruktbilgaranti</p>
              <p className="text-sm text-slate-400 mt-1">
                Forhandlere tilbyr ofte 6–24 måneders bruktbilgaranti.
                Dekningsomfanget varierer sterkt — noen dekker bare motor og
                girkasse, andre er mer omfattende. Les vilkårene nøye, da
                egenandeler og unntak er vanlige.
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/30 pl-4">
              <p className="font-medium text-white">
                Utvidet garanti / servicekontrakt
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Kan kjøpes separat og dekker typisk mekaniske feil utover
                standardgarantien. Dette er i praksis en forsikring med egne
                vilkår og begrensninger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vanlige grunner til garantiavslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Vanlige grunner til at garantikrav avvises
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Garantiavslag er vanlige, og mange gir opp for tidlig. Her er de
            vanligste grunnene selger bruker — og hva du bør vite:
          </p>
          <div className="space-y-3">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Garantien dekker ikke denne feilen»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Garantien har ofte unntak for spesifikke komponenter. Men
                feilen kan likevel utgjøre en mangel etter loven — uavhengig
                av hva garantivilkårene sier.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Service er ikke utført hos godkjent verksted»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Garantien kan kreve dette, men reklamasjonsretten gjør det
                ikke. Du kan fritt velge verksted uten å miste retten til å
                reklamere etter loven.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Feilen skyldes slitasje»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Slitasje er sjelden garantidekning, men om slitasjen er
                unormal i forhold til bilens alder og kilometerstand kan det
                likevel være en mangel etter loven.
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="font-medium text-white">
                «Garantitiden har utløpt»
              </p>
              <p className="text-sm text-slate-400 mt-1">
                At garantien er utløpt betyr ikke at rettighetene er borte.
                Reklamasjonsfristen er opptil 5 år ved forhandlerkjøp — ofte
                lengre enn garantien.
              </p>
            </div>
          </div>
          <p className="text-slate-300 mt-4">
            Har du fått garantiavslag?{" "}
            <Link
              href="/bilkjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              Sjekk om du fortsatt har rettigheter etter loven
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Typiske misforståelser */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Typiske misforståelser om garanti på bil
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Det finnes mange misforståelser om hva garantien gir deg rett til.
            Her rydder vi opp i de vanligste:
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                «Garantien er det eneste jeg har»
              </p>
              <p className="text-sm text-slate-400">
                Feil. Reklamasjonsretten gjelder i tillegg til garantien og
                kan gi deg rettigheter langt utover det garantien dekker.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                «Garantien kan ikke begrenses»
              </p>
              <p className="text-sm text-slate-400">
                Feil. Garantien er selgers egen ordning med egne vilkår. Det
                er reklamasjonsretten som ikke kan avtales bort (ved
                forhandlerkjøp).
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                «Garantien erstatter reklamasjonsretten»
              </p>
              <p className="text-sm text-slate-400">
                Feil. Garantien og reklamasjonsretten løper parallelt. Selv om
                garantien gir deg noe, kan du alltid falle tilbake på
                reklamasjonsretten.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="font-medium text-white mb-1">
                «Garanti gjelder ikke ved privatkjøp»
              </p>
              <p className="text-sm text-slate-400">
                En privatperson kan også gi garanti, men det er uvanlig. Ved
                privatkjøp er det kjøpsloven som gir deg rettigheter —
                uavhengig av garanti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hva kan du gjøre ved garantiavslag */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Hva kan du gjøre ved garantiavslag?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Får du avslag på et garantikrav, er det viktig å ikke gi opp.
            Garantien og lovens reklamasjonsrett er to uavhengige spor:
          </p>
          <ol className="text-slate-300 space-y-3 ml-4">
            <li>
              <strong className="text-white">
                1. Vurder om feilen er en mangel etter loven
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Selv om garantien ikke dekker feilen, kan den likevel utgjøre en
                mangel etter kjøpsloven eller forbrukerkjøpsloven. Les om hva
                som utgjør en mangel i vår guide om{" "}
                <Link
                  href="/bilkjop/bruktbil-feil"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  feil på bruktbil
                </Link>
                .
              </p>
            </li>
            <li>
              <strong className="text-white">
                2. Send en formell reklamasjon
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Send en skriftlig{" "}
                <Link
                  href="/bilkjop/reklamasjon"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  reklamasjon
                </Link>{" "}
                der du påberoper deg lovens regler, ikke garantien. Beskriv
                feilen og hold selger ansvarlig etter
                forbrukerkjøpsloven/kjøpsloven.
              </p>
            </li>
            <li>
              <strong className="text-white">
                3. Innhent verkstedrapport
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                En uavhengig verkstedvurdering dokumenterer feilens art og
                omfang, og styrker saken din vesentlig.
              </p>
            </li>
            <li>
              <strong className="text-white">
                4. Vurder kravene dine
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Avhengig av mangelens alvor kan du kreve retting, prisavslag
                eller{" "}
                <Link
                  href="/bilkjop/heving"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
                >
                  heving av bilkjøpet
                </Link>
                .
              </p>
            </li>
            <li>
              <strong className="text-white">
                5. Eskaleringsveien
              </strong>
              <p className="text-sm text-slate-400 mt-1">
                Ved forhandlerkjøp kan du ta saken til Forbrukerklageutvalget.
                Ved privatkjøp er forliksrådet rette instans.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Forhandlergaranti vs lovfestet rett */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Forhandlergaranti og lovfestede rettigheter
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ved{" "}
            <Link
              href="/bilkjop/forhandler"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              kjøp fra forhandler
            </Link>{" "}
            har du et ekstra sterkt vern gjennom forbrukerkjøpsloven. Denne
            loven kan ikke avtales bort — heller ikke gjennom garantivilkår.
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • <strong className="text-white">5 års reklamasjonsfrist</strong>{" "}
              — Lenger enn de fleste garantier
            </li>
            <li>
              • <strong className="text-white">Bevispresumpsjon</strong> — Feil
              innen 6 måneder antas å ha eksistert ved levering
            </li>
            <li>
              • <strong className="text-white">Kan ikke avtales bort</strong> —
              Garantivilkår som begrenser lovens rettigheter er ugyldige
            </li>
            <li>
              • <strong className="text-white">Rettingsforsøk</strong> —
              Forhandler har rett til inntil to rettingsforsøk, men deretter
              kan du kreve prisavslag eller heving
            </li>
          </ul>
          <p className="text-slate-300">
            Ved{" "}
            <Link
              href="/bilkjop/privat-kjop"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              privatkjøp
            </Link>{" "}
            gjelder kjøpsloven. Her er fristen 2 år og det er ingen
            bevispresumpsjon, men du har fortsatt rettigheter ved mangler —
            uavhengig av garanti.
          </p>
        </div>
      </section>

      {/* Når kan garantiavslag gi grunnlag for heving */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          Kan garantiavslag gi grunnlag for heving?
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 space-y-4">
          <p className="text-slate-300">
            Ja. Garantien og hevingsretten er to uavhengige spor. Selv om
            garantien ikke dekker feilen, kan mangelen være vesentlig nok til å
            gi grunnlag for heving etter loven.
          </p>
          <p className="text-slate-300">
            Eksempler på situasjoner der garantiavslag likevel kan gi heving:
          </p>
          <ul className="text-slate-300 space-y-2 ml-4">
            <li>
              • Motorhavari der garantien unntok slitedeler, men feilen skyldes
              en fabrikasjonsfeil som forelå ved levering
            </li>
            <li>
              • Girkassefeil der garantien var utløpt, men feilen oppstod innen
              den lovfestede reklamasjonsfristen
            </li>
            <li>
              • Selger tilbakeholdt opplysninger om tidligere skader — dette
              dekkes ikke av garanti, men er en klar mangel etter loven
            </li>
            <li>
              • Bilen er i vesentlig dårligere stand enn forventet ut fra pris,
              alder og opplysninger
            </li>
          </ul>
          <p className="text-slate-300">
            Oversikt over vilkårene for heving finner du i vår guide om{" "}
            <Link
              href="/bilkjop/heving"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition"
            >
              heving av bilkjøp
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Ofte stilte spørsmål</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer">
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown className="h-5 w-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        data-final-cta="true"
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-500/5" />
        <div className="absolute inset-0 rounded-3xl border border-emerald-500/15" />
        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Usikker på hva som gjelder i din situasjon?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Svar på noen spørsmål om bilkjøpet ditt – få en vurdering på 2
            minutter.
          </p>
          <Link
            href="/bilkjop"
            className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Sjekk saken din
            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            Tar ca. 2 minutter · Ingen registrering
          </p>
        </div>
      </section>
    </BilSeoHero>
  );
}
