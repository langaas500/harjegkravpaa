import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Feil på MC? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Har du oppdaget feil på motorsykkelen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/mc-feil`,
  },
};

const faqs = [
  {
    question: "Hva regnes som en mangel på en brukt MC?",
    answer:
      "En mangel er et avvik fra det som ble avtalt eller det du kunne forvente ut fra motorsykkelens alder, kilometerstand og pris.",
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
    question: "Gjelder samme regler for MC som for bil?",
    answer:
      "Ja, kjøpsloven og forbrukerkjøpsloven gjelder likt for motorsykler og biler.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Feil på MC? Sjekk dine rettigheter",
      description:
        "Har du oppdaget feil på motorsykkelen etter kjøpet? Finn ut om du har krav på reklamasjon, prisavslag eller heving.",
      url: "/mc-kjop/mc-feil",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
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
