import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på MC – dine rettigheter | Harjegkravpå.no",
  description:
    "Vil du reklamere på motorsykkel? Les om reklamasjonsfrister, hva du kan kreve og hvordan du går frem. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/reklamasjon`,
  },
};

const faqs = [
  {
    question: "Hvor lenge kan jeg reklamere på MC?",
    answer:
      "Ved kjøp fra forhandler er fristen 5 år. Ved privatkjøp er fristen 2 år.",
  },
  {
    question: "Hva kan jeg kreve ved reklamasjon?",
    answer:
      "Du kan kreve retting, prisavslag, heving eller erstatning avhengig av mangelens art og omfang.",
  },
  {
    question: "Må jeg reklamere skriftlig?",
    answer:
      "Det er ikke et krav, men skriftlig reklamasjon gir deg dokumentasjon på at du har reklamert i tide.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Reklamasjon på MC – dine rettigheter",
      description:
        "Vil du reklamere på motorsykkel? Les om reklamasjonsfrister, hva du kan kreve og hvordan du går frem.",
      url: "/mc-kjop/reklamasjon",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
      { name: "Reklamasjon MC", url: "/mc-kjop/reklamasjon" },
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
