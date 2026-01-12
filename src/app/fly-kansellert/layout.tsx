import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly kansellert? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon pluss refusjon. Sjekk dine rettigheter.",
  alternates: {
    canonical: "/fly-kansellert",
  },
};

const faqs = [
  {
    question: "Hvor lenge kan jeg vente med å kreve kompensasjon?",
    answer:
      "Du kan kreve kompensasjon for kansellerte flyreiser opptil 3 år tilbake i tid.",
  },
  {
    question: "Hva hvis jeg ble tilbudt ombooking?",
    answer:
      "Du kan fortsatt ha krav på kompensasjon selv om du ble tilbudt ombooking, avhengig av ankomsttiden.",
  },
  {
    question: "Gjelder reglene for alle flyselskaper?",
    answer:
      "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
  },
  {
    question: "Kan jeg kreve både refusjon og kompensasjon?",
    answer:
      "Ja. Kompensasjon og refusjon er to forskjellige ting. Du kan ha krav på begge deler.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Fly kansellert? Sjekk dine rettigheter",
      description:
        "Ble flyet ditt kansellert? Du kan ha krav på opptil 600 euro i kompensasjon.",
      url: "/fly-kansellert",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Flyreiser", url: "/flyreiser" },
      { name: "Fly kansellert", url: "/fly-kansellert" },
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
