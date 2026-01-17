import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  SITE_URL,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heving av MC-kjøp – når kan du heve? | Harjegkravpå.no",
  description:
    "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving og hvordan du går frem. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/heving`,
  },
};

const faqs = [
  {
    question: "Når kan jeg heve et MC-kjøp?",
    answer:
      "Du kan heve når mangelen er vesentlig og ikke lar seg utbedre på rimelig måte.",
  },
  {
    question: "Hva betyr vesentlig mangel?",
    answer:
      "En mangel som gjør at du ikke får det du betalte for. Alvorlighetsgrad, utbedringskostnader og konsekvenser vurderes.",
  },
  {
    question: "Får jeg alle pengene tilbake ved heving?",
    answer:
      "Ja, men det kan gjøres fradrag for den nytten du har hatt av MC-en.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Heving av MC-kjøp – når kan du heve?",
      description:
        "Når kan du heve et MC-kjøp og få pengene tilbake? Les om vilkårene for heving.",
      url: "/mc-kjop/heving",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "Kjøretøy", url: "/bilkjop" },
      { name: "Heving MC", url: "/mc-kjop/heving" },
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
