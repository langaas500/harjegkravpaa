import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Garanti på MC – hva dekkes? | Harjegkravpå.no",
  description:
    "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon, og hva du kan kreve. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/garanti`,
  },
};

const faqs = [
  {
    question: "Hva er forskjellen på garanti og reklamasjon?",
    answer:
      "Garanti er en frivillig ordning fra selger. Reklamasjonsrett har du uansett etter loven.",
  },
  {
    question: "Hvor lenge varer garantien?",
    answer:
      "Det varierer. Nye MC-er har ofte 2–3 års garanti. Brukte kan ha restgaranti eller utvidet garanti.",
  },
  {
    question: "Hva dekkes ikke av garantien?",
    answer:
      "Typisk dekkes ikke slitedeler, feil som skyldes feil bruk, eller skader etter uhell.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Garanti på MC – hva dekkes?",
      description:
        "Hva dekker garantien på motorsykkel? Les om forskjellen på garanti og reklamasjon.",
      url: "/mc-kjop/garanti",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
      { name: "Garanti MC", url: "/mc-kjop/garanti" },
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
