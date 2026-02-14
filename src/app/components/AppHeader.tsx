"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on homepage (has its own header)
  if (pathname === "/") return null;

  return (
    <header className="px-4 py-3 bg-[#0a0f0d]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-emerald-400/90" />
          <span className="text-sm font-semibold tracking-tight text-white/90">
            Harjegkravpå.no
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <Link
            href="/om-oss"
            className="hover:text-white/90 transition-colors"
          >
            Om oss
          </Link>
          <Link
            href="/kontakt"
            className="hover:text-white/90 transition-colors"
          >
            Kontakt oss
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => router.push("/bilkjop")}
          className="rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-md transition-colors"
        >
          Start vurdering →
        </button>
      </div>
    </header>
  );
}
