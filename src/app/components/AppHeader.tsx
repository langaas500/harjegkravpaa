import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Har jeg krav på"
            width={200}
            height={200}
            priority
            className="h-40 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-xl text-slate-300">
          <Link href="/bilkjop" className="hover:text-white transition">
            Bilkjøp
          </Link>
          <span className="opacity-40 cursor-not-allowed">Fly</span>
          <span className="opacity-40 cursor-not-allowed">Reklamasjon</span>
        </nav>

        <Link
          href="/bilkjop"
          className="inline-flex items-center gap-5 rounded-3xl bg-slate-100 px-10 py-6 text-xl font-bold text-black hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
        >
          Start
          <ArrowRight className="h-7 w-7" />
        </Link>
      </div>
    </header>
  );
}