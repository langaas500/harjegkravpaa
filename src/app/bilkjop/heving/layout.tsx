import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Harjegkravpå.no",
    default: "Heving av bilkjøp | Harjegkravpå.no",
  },
  openGraph: {
    siteName: "Harjegkravpå.no",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}