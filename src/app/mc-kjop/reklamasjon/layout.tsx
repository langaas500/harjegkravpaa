import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på MC – dine rettigheter | Harjegkravpå.no",
  description:
    "Lær om reklamasjonsrett ved MC-kjøp. Finn ut når du kan reklamere, hvilke frister som gjelder, og hva du kan kreve.",
  alternates: {
    canonical: "/mc-kjop/reklamasjon",
  },
};

const faqs = [
  {
    question: "Hvor lang tid har jeg på å reklamere på MC?",
    answer:
      "Ved kjøp fra forhandler er fristen 5 år for feil som forventes å vare. Ved privatkjøp er fristen 2 år.",
  },
  {
    question: "Hva er forskjellen på reklamasjon og garanti?",
    answer:
      "Reklamasjon er en lovfestet rett, mens garanti er en frivillig forpliktelse fra selger.",
  },
  {
    question: "Må jeg reklamere skriftlig?",
    answer:
      "Det er ikke et krav, men skriftlig reklamasjon gir deg dokumentasjon.",
  },
  {
    question: "Hva skjer hvis selger avviser reklamasjonen?",
    answer:
      "Du kan ta saken videre til Forbrukerklageutvalget ved forhandlerkjøp, eller forliksrådet ved privatkjøp.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Reklamasjon på MC – dine rettigheter",
      description:
        "Lær om reklamasjonsrett ved MC-kjøp. Finn ut når du kan reklamere.",
      url: "/mc-kjop/reklamasjon",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "MC-kjøp", url: "/mc-kjop" },
      { name: "Reklamasjon", url: "/mc-kjop/reklamasjon" },
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
