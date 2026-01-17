import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Fly forsinket? Sjekk om du har krav på kompensasjon | Harjegkravpå.no",
  description:
    "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro i kompensasjon. Sjekk dine rettigheter gratis.",
  alternates: {
    canonical: `${SITE_URL}/fly-forsinket`,
  },
};

const faqs = [
  {
    question: "Hvor lenge kan jeg vente med å kreve kompensasjon?",
    answer:
      "Du kan kreve kompensasjon for flyreiser opptil 3 år tilbake i tid.",
  },
  {
    question: "Hva er «ekstraordinære omstendigheter»?",
    answer:
      "Hendelser utenfor flyselskapets kontroll, som ekstremvær, terror eller luftromsstenging. Tekniske feil regnes vanligvis ikke som ekstraordinært.",
  },
  {
    question: "Gjelder reglene for alle flyselskaper?",
    answer:
      "Reglene gjelder for alle flyselskaper som flyr fra EU/EØS, og for EU-baserte selskaper som flyr til EU/EØS.",
  },
  {
    question: "Kan jeg kreve kompensasjon selv om jeg fikk mat/hotell?",
    answer:
      "Ja. Mat, drikke og hotell er forpleining du har krav på uavhengig av kompensasjon. Kompensasjonen kommer i tillegg.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Fly forsinket? Sjekk om du har krav på kompensasjon",
      description:
        "Ble flyet ditt forsinket mer enn 3 timer? Du kan ha krav på opptil 600 euro.",
      url: "/fly-forsinket",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Flyreiser", url: "/flyreiser" },
      { name: "Fly forsinket", url: "/fly-forsinket" },
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
