import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Mistet bagasje? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr i erstatning. Sjekk dine rettigheter.",
  alternates: {
    canonical: `${SITE_URL}/mistet-bagasje`,
  },
};

const faqs = [
  {
    question: "Hva er et PIR-skjema?",
    answer:
      "PIR (Property Irregularity Report) er et standardskjema du fyller ut på flyplassen når bagasjen er forsinket, tapt eller skadet.",
  },
  {
    question: "Når regnes bagasjen som tapt?",
    answer:
      "Bagasje som ikke er funnet innen 21 dager etter at den skulle vært levert, regnes som tapt.",
  },
  {
    question: "Hva er SDR?",
    answer:
      "SDR (Special Drawing Rights) er en internasjonal regneenhet. 1 288 SDR tilsvarer ca. 16 000 kr.",
  },
  {
    question: "Kan jeg kjøpe hva som helst mens jeg venter?",
    answer:
      "Nei. Du får dekket nødvendige utgifter – klær og toalettsaker som er rimelige.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Mistet bagasje? Sjekk dine rettigheter",
      description:
        "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr.",
      url: "/mistet-bagasje",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Flyreiser", url: "/flyreiser" },
      { name: "Mistet bagasje", url: "/mistet-bagasje" },
    ]),
    buildFAQSchema(faqs),
  ];

  return (
    <>
      <SeoJsonLd data={schemas} />
      {children}
    </>
  );
}
