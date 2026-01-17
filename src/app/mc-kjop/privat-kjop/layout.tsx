import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt MC privat? Dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/privat-kjop`,
  },
};

const faqs = [
  {
    question: "Har jeg reklamasjonsrett ved privatkjøp?",
    answer:
      "Ja, men fristen er kortere (2 år) og du har ikke samme beskyttelse som ved kjøp fra forhandler.",
  },
  {
    question: "Hva betyr «solgt som den er» ved privatkjøp?",
    answer:
      "Det overfører risiko til kjøper, men beskytter ikke selger mot skjulte feil eller opplysningssvikt.",
  },
  {
    question: "Hvem har bevisbyrden ved privatkjøp?",
    answer:
      "Du som kjøper må bevise at feilen fantes på kjøpstidspunktet. Ved forhandlerkjøp er det motsatt det første året.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Kjøpt MC privat? Dine rettigheter",
      description:
        "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp.",
      url: "/mc-kjop/privat-kjop",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
      { name: "Privatkjøp MC", url: "/mc-kjop/privat-kjop" },
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
