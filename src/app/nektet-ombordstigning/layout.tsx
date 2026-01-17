import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Nektet ombordstigning? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro i kompensasjon.",
  alternates: {
    canonical: `${SITE_URL}/nektet-ombordstigning`,
  },
  openGraph: {
    title: "Nektet ombordstigning? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro i kompensasjon.",
    url: `${SITE_URL}/nektet-ombordstigning`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nektet ombordstigning? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro i kompensasjon.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Nektet ombordstigning? Sjekk dine rettigheter",
    description:
      "Ble du nektet ombordstigning på grunn av overbooking? Du kan ha krav på opptil 600 euro.",
    url: "/nektet-ombordstigning",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
