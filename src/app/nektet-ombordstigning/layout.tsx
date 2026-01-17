import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Nektet ombordstigning? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro i kompensasjon.",
  alternates: {
    canonical: `${SITE_URL}/nektet-ombordstigning`,
  },
};

const faqs = [
  {
    question: "Hvor lenge kan jeg vente med å kreve kompensasjon?",
    answer:
      "Du kan kreve kompensasjon for nektet ombordstigning opptil 3 år tilbake i tid.",
  },
  {
    question: "Hva hvis jeg ga fra meg plassen frivillig?",
    answer:
      "Hvis du frivillig ga fra deg plassen, gjelder ikke de faste kompensasjonssatsene.",
  },
  {
    question: "Gjelder reglene for alle flyselskaper?",
    answer:
      "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
  },
  {
    question: "Kan flyselskapet nekte å betale?",
    answer:
      "Ved overbooking har du krav på kompensasjon. Hvis de nekter, kan du ta saken videre til Transportklagenemnda.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Nektet ombordstigning? Sjekk dine rettigheter",
      description:
        "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro.",
      url: "/nektet-ombordstigning",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Flyreiser", url: "/flyreiser" },
      { name: "Nektet ombordstigning", url: "/nektet-ombordstigning" },
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
