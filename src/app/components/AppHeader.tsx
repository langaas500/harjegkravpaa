"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu && !menu.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Hide on homepage (has its own header)
  if (pathname === "/") return null;

  return (
    <div id="mobile-menu">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/bilkjop")}
              className="hidden md:block rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-3 text-sm font-semibold text-emerald-300 transition-colors"
            >
              Start vurdering →
            </button>

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={menuOpen}
              className="flex md:hidden items-center justify-center w-11 h-11 rounded-xl text-white/80 hover:bg-white/[0.06] transition-colors"
            >
              <span className={`text-xl leading-none transition-transform duration-200 ${menuOpen ? "rotate-90" : ""}`}>
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      <nav
        className={`md:hidden bg-[#0a0f0d] border-b border-white/[0.08] transition-all duration-200 ${menuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <Link
            href="/om-oss"
            onClick={() => setMenuOpen(false)}
            className="block py-4 px-2 text-sm text-white/70 hover:text-white/90 border-b border-white/[0.06] transition-colors"
          >
            Om oss
          </Link>
          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
            className="block py-4 px-2 text-sm text-white/70 hover:text-white/90 border-b border-white/[0.06] transition-colors"
          >
            Kontakt oss
          </Link>
          <div className="py-4 px-2">
            <Link
              href="/bilkjop"
              onClick={() => setMenuOpen(false)}
              className="block w-full rounded-xl bg-emerald-500 text-center py-3 text-sm font-bold text-black hover:bg-emerald-400 transition-colors"
            >
              Start vurdering →
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
