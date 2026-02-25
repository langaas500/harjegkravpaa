import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/bilkjop";

export const metadata: Metadata = {
  title: "Reklamasjon på bruktbil: Sjekk om du har krav (heving/prisavslag)",
  description:
    "Sjekk om du kan kreve heving, prisavslag eller erstatning ved feil på bruktbil. Gratis veiledende vurdering basert på norsk forbrukerlov. Tar 5–10 min. Ingen konto.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Feil på bruktbil? Sjekk om du har krav | Harjegkravpå.no",
    description:
      "Sjekk om du kan kreve heving, prisavslag eller erstatning ved feil på bruktbil. Gratis vurdering basert på norsk lov.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feil på bruktbil? Sjekk om du har krav | Harjegkravpå.no",
    description:
      "Sjekk om du kan kreve heving, prisavslag eller erstatning ved feil på bruktbil. Gratis vurdering basert på norsk lov.",
  },
};

export default function BilkjopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
