import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Privat MC-kjøp – dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpte du MC privat og oppdaget feil? Finn ut hvilke rettigheter du har ved privatkjøp av motorsykkel.",
  alternates: {
    canonical: "/mc-kjop/privat-kjop",
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
      "Du kan ta saken videre til forliksrådet.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Privat MC-kjøp – dine rettigheter",
      description:
        "Kjøpte du MC privat og oppdaget feil? Finn ut hvilke rettigheter du har.",
      url: "/mc-kjop/privat-kjop",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "MC-kjøp", url: "/mc-kjop" },
      { name: "Privatkjøp", url: "/mc-kjop/privat-kjop" },
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
