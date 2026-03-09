import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Mistet eller skadet bagasje? Sjekk kravet ditt – 99 kr",
  description:
    "Mistet, forsinket eller skadet bagasje? Du kan ha krav på opptil 16 000 kr. Legg inn saken — AI lager rapport + kravbrev for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/mistet-bagasje`,
  },
  openGraph: {
    title: "Mistet eller skadet bagasje? Sjekk kravet ditt – 99 kr",
    description:
      "AI lager rapport + kravbrev til flyselskapet for 99 kr.",
    url: `${SITE_URL}/mistet-bagasje`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mistet bagasje? Rapport + kravbrev for 99 kr",
    description:
      "Opptil 16 000 kr i erstatning. Sjekk saken for 99 kr.",
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
