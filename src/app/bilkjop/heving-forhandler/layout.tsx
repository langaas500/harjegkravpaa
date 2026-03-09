import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heve bilkjøp fra forhandler? Slik går du frem",
  description:
    "Kjøpte bil fra forhandler med feil? Les om rettingsforsøk og vesentlig mangel. Legg inn saken — AI lager rapport + kravbrev til forhandler for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/heving-forhandler`,
  },
  openGraph: {
    title: "Heve bilkjøp fra forhandler? Slik går du frem",
    description:
      "Feil på bil fra forhandler? AI lager rapport + kravbrev for 99 kr.",
    url: `${SITE_URL}/bilkjop/heving-forhandler`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heve bilkjøp fra forhandler? Regler og fremgangsmåte",
    description:
      "Les om forbrukerkjøpsloven og rettingsforsøk. Sjekk saken din for 99 kr.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hvor mange rettingsforsøk har forhandler krav på?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Loven setter ingen eksakt grense, men to forsøk på samme feil er normalt det som aksepteres. Etter det kan du ha rett til å kreve heving eller prisavslag.",
      },
    },
    {
      "@type": "Question",
      name: "Kan forhandler avvise heving og tilby prisavslag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Forhandler kan argumentere for prisavslag fremfor heving, men dersom mangelen er vesentlig og retting ikke har lykkes, har du rett til å velge heving.",
      },
    },
    {
      "@type": "Question",
      name: "Hva om forhandler har gitt garanti?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En garanti kommer i tillegg til dine lovfestede rettigheter. Garantien kan ikke begrense rettighetene du har etter forbrukerkjøpsloven.",
      },
    },
    {
      "@type": "Question",
      name: "Må jeg betale for bruk av bilen hvis kjøpet heves?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selger kan kreve nyttevederlag for den bruken du har hatt av bilen. Beløpet beregnes ut fra faktisk bruk i perioden.",
      },
    },
    {
      "@type": "Question",
      name: "Kan forhandler kreve at jeg bruker deres verksted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Forhandler har rett til å velge hvordan retting gjennomføres, men rettingen må skje innen rimelig tid og uten vesentlig ulempe for deg.",
      },
    },
    {
      "@type": "Question",
      name: "Hva gjør jeg hvis forhandler nekter å svare på reklamasjonen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dokumenter at reklamasjonen er sendt. Manglende svar fritar ikke forhandler for ansvar. Du kan gå videre med kravet ditt.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const webPageSchema = buildWebPageSchema({
    title: "Heve bilkjøp fra forhandler – regler",
    description:
      "Kjøpte du bil fra forhandler med feil? Les om forbrukerkjøpsloven, rettingsforsøk, vesentlig mangel og når du kan kreve heving.",
    url: "/bilkjop/heving-forhandler",
  });

  return (
    <>
      <SeoJsonLd data={webPageSchema} />
      <SeoJsonLd data={faqSchema} />
      {children}
    </>
  );
}
