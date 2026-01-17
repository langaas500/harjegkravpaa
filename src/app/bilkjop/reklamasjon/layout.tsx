import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Reklamasjon på bil – dine rettigheter | Harjegkravpå.no",
  description:
    "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder, og hva du kan kreve.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/reklamasjon`,
  },
  openGraph: {
    title: "Reklamasjon på bil – dine rettigheter | Harjegkravpå.no",
    description:
      "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder, og hva du kan kreve.",
    url: `${SITE_URL}/bilkjop/reklamasjon`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reklamasjon på bil – dine rettigheter | Harjegkravpå.no",
    description:
      "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder, og hva du kan kreve.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Reklamasjon på bil – dine rettigheter",
    description:
      "Lær om reklamasjonsrett ved bilkjøp. Finn ut når du kan reklamere, hvilke frister som gjelder.",
    url: "/bilkjop/reklamasjon",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
