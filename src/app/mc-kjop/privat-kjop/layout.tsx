import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Kjøpt MC privat? Dine rettigheter | Harjegkravpå.no",
  description:
    "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp. Gratis vurdering.",
  alternates: {
    canonical: `${SITE_URL}/mc-kjop/privat-kjop`,
  },
  openGraph: {
    title: "Kjøpt MC privat? Dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp. Gratis vurdering.",
    url: `${SITE_URL}/mc-kjop/privat-kjop`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kjøpt MC privat? Dine rettigheter | Harjegkravpå.no",
    description:
      "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp. Gratis vurdering.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Kjøpt MC privat? Dine rettigheter",
    description:
      "Kjøpt motorsykkel fra privatperson og oppdaget feil? Les om dine rettigheter ved privatkjøp.",
    url: "/mc-kjop/privat-kjop",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
