import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Privat bilkjøp – dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har ved privatkjøp og hva du kan kreve.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/privat-kjop`,
  },
};

const faqs = [
  {
    question: "Har jeg noen rettigheter ved privatkjøp?",
    answer:
      "Ja. Kjøpsloven gjelder ved private kjøp og gir deg rett til å reklamere på mangler.",
  },
  {
    question: "Hva betyr «solgt som den er»?",
    answer:
      "Det gir selger et visst vern, men beskytter ikke mot uriktige eller tilbakeholdte opplysninger.",
  },
  {
    question: "Hvor lang tid har jeg på å reklamere?",
    answer:
      "Ved privatkjøp er den absolutte reklamasjonsfristen to år.",
  },
  {
    question: "Hva hvis selger nekter å ta ansvar?",
    answer:
      "Du kan ta saken videre til forliksrådet. Det er ofte nødvendig ved private tvister.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Privat bilkjøp – dine rettigheter",
      description:
        "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har.",
      url: "/bilkjop/privat-kjop",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Bilkjøp", url: "/bilkjop" },
      { name: "Privatkjøp", url: "/bilkjop/privat-kjop" },
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
