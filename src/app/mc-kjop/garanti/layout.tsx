import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "MC-garanti – hva gjelder egentlig? | Harjegkravpå.no",
  description:
    "Forstå forskjellen mellom garanti og reklamasjon ved MC-kjøp. Lær hva garantien dekker og hva du har krav på.",
  alternates: {
    canonical: "/mc-kjop/garanti",
  },
};

const faqs = [
  {
    question: "Kan jeg reklamere selv om MC-garantien har utløpt?",
    answer:
      "Ja. Reklamasjonsretten gjelder uavhengig av garantien. Du kan ha krav i inntil fem år etter kjøp fra forhandler.",
  },
  {
    question: "Hva hvis selger sier at garantien ikke dekker feilen?",
    answer:
      "Da bør du vurdere om feilen likevel utgjør en mangel etter loven. Garantiavslag er ikke det samme som at du ikke har rettigheter.",
  },
  {
    question: "Må jeg bruke merkeverksted for å beholde garantien?",
    answer:
      "Garantivilkårene kan kreve dette. Men reklamasjonsretten har ingen slike krav.",
  },
  {
    question: "Gjelder garantien hvis jeg har trimmet MC-en?",
    answer:
      "Garantien kan ofte bortfalle ved modifikasjoner. Men reklamasjonsretten gjelder fortsatt for feil som ikke skyldes trimmingen.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const schemas = [
    buildWebPageSchema({
      title: "MC-garanti – hva gjelder egentlig?",
      description:
        "Forstå forskjellen mellom garanti og reklamasjon ved MC-kjøp.",
      url: "/mc-kjop/garanti",
    }),
    buildBreadcrumbSchema([
      { name: "Hjem", url: "/" },
      { name: "MC-kjøp", url: "/mc-kjop" },
      { name: "Garanti", url: "/mc-kjop/garanti" },
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
