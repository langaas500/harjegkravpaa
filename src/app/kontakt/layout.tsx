import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt oss | harjegkravpå.no",
  description: "Kontakt harjegkravpå.no – se hva du får og send oss en melding.",
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
