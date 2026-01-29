import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import AppHeader from "./components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Har jeg krav på?",
  description:
    "Finn ut om du har krav etter norsk forbrukerlov. Svar på noen korte spørsmål og se om du har krav – og hva du bør gjøre videre. Gratis og uforpliktende.",
  alternates: {
    canonical: "https://harjegkravpå.no",
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
          gtag('config', 'AW-17884170370');
        `}
      </Script>

      <body className={inter.className}>
        {/* Header-lag: isolert, ingen blur, alltid skarp */}
        <div className="sticky top-0 z-50">
          <div className="bg-slate-950/10 supports-[backdrop-filter]:bg-slate-950/10">
            <AppHeader />
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
