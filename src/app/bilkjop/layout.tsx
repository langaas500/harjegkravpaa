import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reklamasjon på bruktbil: Sjekk om du har krav (heving/prisavslag)",
  description:
    "Sjekk om du kan kreve heving, prisavslag eller erstatning ved feil på bruktbil. Gratis veiledende vurdering basert på norsk forbrukerlov. Tar 5–10 min. Ingen konto.",
  alternates: {
    canonical: "https://harjegkravpå.no/bilkjop",
  },
};

export default function BilkjopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
