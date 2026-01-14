import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AppHeader from "./components/AppHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Har jeg krav på?",
  description: "Enkle svar på hva du har krav på – basert på norsk regelverk.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        {/* Header-lag: isolert, ingen blur, alltid skarp */}
        <div className="sticky top-0 z-50">
          <div className="bg-slate-950/10 supports-[backdrop-filter]:bg-slate-950/10">
            <AppHeader />
          </div>
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
