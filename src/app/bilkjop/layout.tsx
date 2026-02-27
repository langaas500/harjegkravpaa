import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/bilkjop";

export const metadata: Metadata = {
  title: "Bilkjøp – sjekk om du har krav | Harjegkravpå.no",
  description:
    "Har du oppdaget feil etter bilkjøp? Sjekk om du kan kreve heving, prisavslag eller erstatning. Gratis veiledende vurdering basert på norsk forbrukerlov.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Bilkjøp – sjekk om du har krav | Harjegkravpå.no",
    description:
      "Har du oppdaget feil etter bilkjøp? Sjekk om du kan kreve heving, prisavslag eller erstatning. Gratis veiledende vurdering basert på norsk forbrukerlov.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilkjøp – sjekk om du har krav | Harjegkravpå.no",
    description:
      "Har du oppdaget feil etter bilkjøp? Sjekk om du kan kreve heving, prisavslag eller erstatning. Gratis vurdering basert på norsk lov.",
  },
};

export default function BilkjopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
