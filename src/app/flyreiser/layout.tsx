import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/flyreiser";

export const metadata: Metadata = {
  title: "Flyproblemer? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Forsinket, kansellert fly eller mistet bagasje? Sjekk om du har krav på kompensasjon etter EU-reglene. Gratis vurdering.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Flyproblemer? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Forsinket, kansellert fly eller mistet bagasje? Sjekk om du har krav på kompensasjon etter EU-reglene. Gratis vurdering.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyproblemer? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Forsinket, kansellert fly eller mistet bagasje? Sjekk om du har krav på kompensasjon etter EU-reglene. Gratis vurdering.",
  },
  robots: {
    index: false,
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
