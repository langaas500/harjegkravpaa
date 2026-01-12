import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på bil – dine rettigheter | Harjegkravpå.no",
  description:
    "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder, og hva du kan kreve.",
  alternates: {
    canonical: "/bilkjop/reklamasjon",
  },
};

const faqs = [
  {
    question: "Hvor lang tid har jeg på å reklamere?",
    answer:
      "Ved kjøp fra forhandler er fristen 5 år for feil som forventes å vare. Ved privatkjøp er fristen 2 år.",
  },
  {
    question: "Hva er forskjellen på reklamasjon og garanti?",
    answer:
      "Reklamasjon er en lovfestet rett, mens garanti er en frivillig forpliktelse fra selger. Reklamasjonsretten gjelder uavhengig av garantien.",
  },
  {
    question: "Må jeg reklamere skriftlig?",
    answer:
      "Det er ikke et krav, men skriftlig reklamasjon gir deg dokumentasjon på at du har reklamert innen fristen.",
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
      title: "Reklamasjon på bil – dine rettigheter",
      description:
        "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder.",
      url: "/bilkjop/reklamasjon",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Bilkjøp", url: "/bilkjop" },
      { name: "Reklamasjon", url: "/bilkjop/reklamasjon" },
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
