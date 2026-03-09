import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import AppHeader from "./components/AppHeader";
import { CookieBanner } from "@/app/_components/CookieBanner";
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "HarJegKravPå.no – AI-verktøy som lager rapport og kravbrev for din sak",
    template: "%s | HarJegKravPå.no",
  },
  description:
    "Legg inn din sak, last opp dokumenter og bilder – AI analyserer mot norsk lov og lager juridisk rapport + ferdig kravbrev til selger. Alt for 99 kr. En advokat koster typisk 2 500 kr/t.",
  keywords: [
    "kravbrev",
    "reklamasjon bil",
    "heve bilkjøp",
    "forbrukerrettigheter",
    "juridisk vurdering",
    "kjøpsloven",
    "forbrukerkjøpsloven",
    "AI juridisk verktøy",
  ],
  alternates: {
    canonical: "https://harjegkravpå.no",
  },
  openGraph: {
    title: "HarJegKravPå.no – AI-verktøy: rapport + kravbrev for din sak",
    description:
      "Legg inn saken din og last opp dokumenter. AI analyserer mot norsk lov og lager personlig rapport + kravbrev til selger. 99 kr – klar på minutter.",
    url: "https://harjegkravpå.no",
    siteName: "HarJegKravPå.no",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "https://harjegkravpaa.no/og-image.png",
        width: 1200,
        height: 630,
        alt: "HarJegKravPå.no – AI-verktøy som lager rapport og kravbrev for din sak",
      },
    ],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HarJegKravPå.no",
  applicationCategory: "LegalService",
  operatingSystem: "Web",
  description:
    "AI-verktøy der du legger inn din sak, laster opp dokumenter og bilder, og får personlig juridisk rapport og ferdig kravbrev til selger – basert på norsk kjøpslov og forbrukerkjøpsloven. Klar på minutter, ikke dager.",
  offers: {
    "@type": "Offer",
    name: "Juridisk rapport + kravbrev",
    price: "99",
    priceCurrency: "NOK",
    description:
      "Du får to PDF-er: en juridisk rapport som vurderer akkurat din sak, og et ferdig kravbrev du sender til selger. Alternativet er ofte advokat til 2 500 kr/t.",
  },
  url: "https://harjegkravpå.no",
  inLanguage: "nb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
        <Suspense fallback={null}>
          <PostHogProvider>
            <div className="sticky top-0 z-50">
              <AppHeader />
            </div>

            {children}
            <CookieBanner />
          </PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
