import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/flyreiser";

export const metadata: Metadata = {
  title: "Forsinket eller kansellert fly? Sjekk hva du har krav på – 99 kr",
  description:
    "Legg inn flyreisen din og last opp dokumentasjon. AI vurderer saken mot EU-reglene og lager rapport + kravbrev til flyselskapet. 99 kr – klar på minutter.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Forsinket eller kansellert fly? Sjekk hva du har krav på – 99 kr",
    description:
      "Legg inn flyreisen din og last opp dokumentasjon. AI vurderer saken og lager rapport + kravbrev. 99 kr.",
    url: CANONICAL_URL,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyproblemer? AI lager rapport + kravbrev for 99 kr",
    description:
      "Legg inn flyreisen din, få AI-vurdering og ferdig kravbrev til flyselskapet. 99 kr.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FlyreiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
