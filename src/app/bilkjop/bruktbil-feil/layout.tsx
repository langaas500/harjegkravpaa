import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på bruktbil? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/bruktbil-feil`,
  },
};

const faqs = [
  {
    question: "Hva regnes som en mangel på en bruktbil?",
    answer:
      "En mangel er et avvik fra det som ble avtalt eller det du kunne forvente ut fra bilens alder, kilometerstand og pris.",
  },
  {
    question: "Hvor lenge kan jeg reklamere på bruktbil?",
    answer:
      "Ved kjøp fra forhandler er fristen 5 år for feil som forventes å vare. Ved privatkjøp er fristen 2 år.",
  },
  {
    question: "Hva kan jeg kreve hvis bilen har en mangel?",
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
      title: "Feil på bruktbil? Sjekk dine rettigheter",
      description:
        "Har du oppdaget feil på bruktbilen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving.",
      url: "/bilkjop/bruktbil-feil",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Bilkjøp", url: "/bilkjop" },
      { name: "Feil på bruktbil", url: "/bilkjop/bruktbil-feil" },
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
