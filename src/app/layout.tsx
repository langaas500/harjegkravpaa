import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
