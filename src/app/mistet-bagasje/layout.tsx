import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Mistet bagasje? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr i erstatning. Sjekk dine rettigheter.",
  alternates: {
    canonical: `${SITE_URL}/mistet-bagasje`,
  },
  openGraph: {
    title: "Mistet bagasje? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr i erstatning. Sjekk dine rettigheter.",
    url: `${SITE_URL}/mistet-bagasje`,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mistet bagasje? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr i erstatning. Sjekk dine rettigheter.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Mistet bagasje? Sjekk dine rettigheter",
    description:
      "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr.",
    url: "/mistet-bagasje",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
