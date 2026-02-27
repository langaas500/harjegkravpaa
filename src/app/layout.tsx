import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "./components/AppHeader";
import { CookieBanner } from "@/app/_components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Har jeg krav på?",
  description:
    "Finn ut om du har krav etter norsk forbrukerlov. Svar på noen korte spørsmål og se om du har krav – og hva du bør gjøre videre. Gratis og uforpliktende.",
  alternates: {
    canonical: "https://harjegkravpå.no",
  },
  openGraph: {
    images: [
      {
        url: "https://harjegkravpaa.no/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harjegkravpå.no – Sjekk om du har krav",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      {/* Google tag (gtag.js) for Google Ads */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17884170370"
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied'
          });
          gtag('config', 'AW-17884170370');
        `}
      </Script>

      <body className={inter.className}>
        <div className="sticky top-0 z-50">
          <AppHeader />
        </div>

        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
