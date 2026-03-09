import type { Metadata } from "next";

const CANONICAL_URL = "https://harjegkravpå.no/handverkere";

export const metadata: Metadata = {
  title: "Misfornøyd med håndverker? Få vurdering og kravbrev – 99 kr",
  description:
    "Beskriv håndverkerjobben og last opp bilder. AI vurderer saken etter håndverkertjenesteloven og lager rapport + kravbrev. 99 kr – en advokat koster typisk 2 500 kr/t.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: "Misfornøyd med håndverker? Få vurdering og kravbrev – 99 kr",
    description:
      "Beskriv jobben, last opp bilder — AI vurderer saken og lager rapport + kravbrev. 99 kr.",
    url: CANONICAL_URL,
    siteName: "HarJegKravPå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Håndverkerklage? AI lager rapport + kravbrev for 99 kr",
    description:
      "Beskriv jobben, last opp bilder — AI vurderer saken og lager rapport + kravbrev. 99 kr.",
  },
  robots: {
    index: true,
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
