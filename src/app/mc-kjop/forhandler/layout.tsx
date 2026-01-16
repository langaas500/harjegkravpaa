import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt MC fra forhandler? Sterkt forbrukervern | Harjegkravpå.no",
  description:
    "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern. Les om dine rettigheter. Gratis vurdering.",
  alternates: {
    canonical: "/mc-kjop/forhandler",
  },
};

const faqs = [
  {
    question: "Hvor lenge kan jeg reklamere på MC kjøpt fra forhandler?",
    answer:
      "5 år for feil som forventes å vare. De første 12 månedene har du også omvendt bevisbyrde.",
  },
  {
    question: "Hva betyr omvendt bevisbyrde?",
    answer:
      "Det første året etter kjøpet antas feil å ha vært der fra starten. Forhandler må bevise det motsatte.",
  },
  {
    question: "Kan forhandler fraskrive seg ansvar?",
    answer:
      "Nei, «som den er»-klausuler er ugyldige ved forbrukerkjøp fra forhandler.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Kjøpt MC fra forhandler? Sterkt forbrukervern",
      description:
        "Kjøpt MC fra forhandler og oppdaget feil? Du har sterkt forbrukervern.",
      url: "/mc-kjop/forhandler",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
      { name: "Forhandlerkjøp MC", url: "/mc-kjop/forhandler" },
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
