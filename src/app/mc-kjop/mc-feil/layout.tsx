import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på MC? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Har du oppdaget feil på motorsykkelen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving.",
  alternates: {
    canonical: "/mc-kjop/mc-feil",
  },
};

const faqs = [
  {
    question: "Hva regnes som en mangel på en MC?",
    answer:
      "En mangel er et avvik fra det som ble avtalt eller det du kunne forvente ut fra MC-ens alder, kilometerstand og pris.",
  },
  {
    question: "Hvor lenge kan jeg reklamere på MC?",
    answer:
      "Ved kjøp fra forhandler er fristen 5 år for feil som forventes å vare. Ved privatkjøp er fristen 2 år.",
  },
  {
    question: "Hva kan jeg kreve hvis MC-en har en mangel?",
    answer:
      "Du kan kreve retting, prisavslag, heving eller erstatning, avhengig av hvor alvorlig mangelen er.",
  },
  {
    question: "Hva betyr «solgt som den er»?",
    answer:
      "Det gir selger et visst vern, men beskytter ikke mot uriktige eller tilbakeholdte opplysninger.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Feil på MC? Sjekk dine rettigheter",
      description:
        "Har du oppdaget feil på motorsykkelen etter kjøpet? Finn ut om du har krav.",
      url: "/mc-kjop/mc-feil",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "MC-kjøp", url: "/mc-kjop" },
      { name: "Feil på MC", url: "/mc-kjop/mc-feil" },
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
