import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/handverkere";

export const metadata: Metadata = {
  title: "Håndverkerklage? Sjekk dine rettigheter | Harjegkravpå.no",
  description:
    "Misfornøyd med håndverkerarbeid? Sjekk om du kan kreve prisavslag, retting eller heving etter håndverkertjenesteloven.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Håndverkerklage? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Misfornøyd med håndverkerarbeid? Sjekk om du kan kreve prisavslag, retting eller heving etter håndverkertjenesteloven.",
    url: CANONICAL_URL,
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Håndverkerklage? Sjekk dine rettigheter | Harjegkravpå.no",
    description:
      "Misfornøyd med håndverkerarbeid? Sjekk om du kan kreve prisavslag, retting eller heving etter håndverkertjenesteloven.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HandverkereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
