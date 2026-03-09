import { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildWebPageSchema, SITE_URL } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "Skjulte feil på bil? Sjekk om du har krav med AI-rapport + kravbrev",
  description:
    "Skjulte feil gir sterke rettigheter. Legg inn saken din og last opp dokumenter — AI lager rapport + kravbrev til selger for 99 kr.",
  alternates: {
    canonical: `${SITE_URL}/bilkjop/skjulte-feil-bil`,
  },
  openGraph: {
    title: "Skjulte feil på bil? Sjekk om du har krav med AI-rapport + kravbrev",
    description:
      "AI lager rapport + kravbrev til selger for 99 kr. Legg inn saken din.",
    url: `${SITE_URL}/bilkjop/skjulte-feil-bil`,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skjulte feil på bil? AI-rapport + kravbrev for 99 kr",
    description:
      "Skjulte feil gir sterke rettigheter. Legg inn saken for 99 kr.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = buildWebPageSchema({
    title: "Kjøpt bil med skjulte feil – hva har du krav på?",
    description:
      "Skjulte feil ved bilkjøp gir sterke rettigheter etter kjøpsloven. Sjekk saken og få kravbrev.",
    url: "/bilkjop/skjulte-feil-bil",
  });

  return (
    <>
      <SeoJsonLd data={schema} />
      {children}
    </>
  );
}
