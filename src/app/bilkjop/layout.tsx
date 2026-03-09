import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/bilkjop";

export const metadata: Metadata = {
  title: "Kjøpt bil med feil? Få juridisk rapport + kravbrev til selger – 99 kr",
  description:
    "Beskriv bilfeilen og få AI-vurdering basert på norsk forbrukerkjøpslov. Du får juridisk rapport og ferdig kravbrev i én pakke for 99 kr. Svar på minutter.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Kjøpt bil med feil? Få juridisk rapport + kravbrev til selger – 99 kr",
    description:
      "Beskriv bilfeilen og få AI-vurdering basert på norsk forbrukerkjøpslov. Du får juridisk rapport og ferdig kravbrev i én pakke for 99 kr.",
    url: CANONICAL_URL,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kjøpt bil med feil? Få juridisk rapport + kravbrev – 99 kr",
    description:
      "Beskriv bilfeilen og få AI-vurdering basert på norsk forbrukerkjøpslov. Rapport + kravbrev for 99 kr.",
  },
};

export default function BilkjopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
