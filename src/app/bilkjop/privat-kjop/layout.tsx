import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Privat bilkjøp – dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har ved privatkjøp og hva du kan kreve.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/privat-kjop`,
  },
  openGraph: {
    title: "Privat bilkjøp – dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har ved privatkjøp og hva du kan kreve.",
    url: `${SITE_URL}/bilkjop/privat-kjop`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privat bilkjøp – dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har ved privatkjøp og hva du kan kreve.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Privat bilkjøp – dine rettigheter",
    description:
      "Kjøpte du bil privat og oppdaget feil? Finn ut hvilke rettigheter du har.",
    url: "/bilkjop/privat-kjop",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
