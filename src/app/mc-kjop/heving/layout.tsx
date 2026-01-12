import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Heving av MC-kjøp – når kan du heve? | Harjegkravpå.no",
  description:
    "Finn ut når du kan heve et MC-kjøp og få pengene tilbake. Lær om vilkårene for heving av motorsykkelkjøp.",
  alternates: {
    canonical: "/mc-kjop/heving",
  },
};

const faqs = [
  {
    question: "Når kan jeg heve et MC-kjøp?",
    answer:
      "Du kan heve kjøpet når mangelen er vesentlig og ikke kan rettes eller kompenseres med prisavslag.",
  },
  {
    question: "Hva betyr vesentlig mangel?",
    answer:
      "En vesentlig mangel er en feil som er så alvorlig at du ikke ville kjøpt MC-en hvis du hadde visst om den.",
  },
  {
    question: "Får jeg alle pengene tilbake ved heving?",
    answer:
      "Ja, men det kan gjøres fradrag for den nytten du har hatt av MC-en.",
  },
  {
    question: "Hva hvis selger nekter heving?",
    answer:
      "Du kan ta saken videre til Forbrukerklageutvalget ved forhandlerkjøp, eller forliksrådet ved privatkjøp.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "Heving av MC-kjøp – når kan du heve?",
      description:
        "Finn ut når du kan heve et MC-kjøp og få pengene tilbake.",
      url: "/mc-kjop/heving",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "MC-kjøp", url: "/mc-kjop" },
      { name: "Heving", url: "/mc-kjop/heving" },
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
