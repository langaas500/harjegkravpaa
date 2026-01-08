import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from "@/app/components/AppHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Har jeg krav på?",
  description:
    "Enkle sjekker basert på norsk regelverk. Gratis vurdering, betal kun for PDF-rapport.",
  keywords: ["bilkjøp", "reklamasjon", "forbrukerkjøpsloven", "kjøpsloven", "Norge"],
  authors: [{ name: "Har jeg krav på" }],
  openGraph: {
    title: "Har jeg krav på?",
    description: "Enkle sjekker basert på norsk regelverk.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}