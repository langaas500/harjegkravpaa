import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Bil fra forhandler – dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter etter forbrukerkjøpsloven.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/forhandler`,
  },
};

const faqs = [
  {
    question: "Hva er forskjellen på forhandlerkjøp og privatkjøp?",
    answer:
      "Ved forhandlerkjøp gjelder forbrukerkjøpsloven med sterkere vern: bevisregel innen seks måneder, lengre reklamasjonsfrist.",
  },
  {
    question: "Hvor lenge kan jeg reklamere?",
    answer:
      "Den absolutte fristen er fem år for feil som forventes å vare over tid.",
  },
  {
    question: "Hva betyr seks måneders-regelen?",
    answer:
      "Hvis en feil viser seg innen seks måneder, antas det at feilen forelå ved leveringen. Da må forhandler bevise at den ikke gjorde det.",
  },
  {
    question: "Kan forhandler nekte å ta imot reklamasjon?",
    answer:
      "Forhandler kan avvise kravet, men det betyr ikke at avvisningen er riktig. Du kan ta saken videre til Forbrukerklageutvalget.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Bil fra forhandler – dine rettigheter",
      description:
        "Kjøpte du bil fra forhandler og oppdaget feil? Finn ut om dine rettigheter.",
      url: "/bilkjop/forhandler",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Bilkjøp", url: "/bilkjop" },
      { name: "Forhandlerkjøp", url: "/bilkjop/forhandler" },
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
