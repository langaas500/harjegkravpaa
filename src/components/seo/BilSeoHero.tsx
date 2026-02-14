import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Scale, ShieldCheck } from "lucide-react";
import SeoFloatingCTA from "@/components/SeoFloatingCTA";

interface BilSeoHeroProps {
  eyebrow: string;
  h1Top: string;
  h1Accent: string;
  intro: React.ReactNode;
  heroImageUrl?: string;
  heroImageAlt?: string;
  primaryCtaTitle: string;
  primaryCtaText: string;
  primaryCtaButton: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  ctaHref?: string;
  children: React.ReactNode;
}

export default function BilSeoHero({
  eyebrow,
  h1Top,
  h1Accent,
  intro,
  heroImageUrl = "/seo-hero1.jpg",
  heroImageAlt,
  primaryCtaTitle,
  primaryCtaText,
  primaryCtaButton,
  secondaryCtaText,
  secondaryCtaLink,
  ctaHref = "/bilkjop",
  children,
}: BilSeoHeroProps) {
  return (
    <main
      className="bg-[#0a0f0d] text-white min-h-screen overflow-hidden"
      style={{ zoom: 0.88 }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Hero section with full-width image */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src={heroImageUrl}
            alt={heroImageAlt || h1Top}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d] via-[#0a0f0d]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/20 via-transparent to-[#0a0f0d]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-16 pb-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-emerald-400/80 text-sm font-medium tracking-wide uppercase mb-4">
              <Scale className="h-4 w-4" />
              {eyebrow}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {h1Top}
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                {h1Accent}
              </span>
            </h1>
          </div>

          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 mb-6">
            {typeof intro === "string" ? (
              <p className="text-lg text-slate-300 leading-relaxed">{intro}</p>
            ) : (
              intro
            )}
          </div>

          {secondaryCtaText && (
            <>
              <p className="text-sm text-slate-400 mb-2">
                Det tar 2 minutter å sjekke saken din.
              </p>
              <Link
                href={secondaryCtaLink || ctaHref}
                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/30 transition text-sm font-medium mb-12 inline-block"
              >
                {secondaryCtaText}
              </Link>
            </>
          )}
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 pb-16 relative z-10">
        {/* Primary CTA */}
        <section className="relative rounded-3xl overflow-hidden mb-16">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent p-[1px]">
            <div className="h-full w-full rounded-3xl bg-[#0a0f0d]" />
          </div>

          <div className="relative p-8 md:p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm font-medium mb-5">
              <Clock className="h-3.5 w-3.5" />
              Tar ca. 2 minutter
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {primaryCtaTitle}
            </h2>

            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              {primaryCtaText}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500/60" />
                Basert på norsk lov
              </span>
              <span className="text-slate-600">Ingen registrering</span>
            </div>

            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryCtaButton}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <p className="text-xs text-slate-600 mt-4">
              Veiledende vurdering · Tar ca. 2 minutter
            </p>
          </div>
        </section>

        {children}

        <p className="text-xs text-slate-600 text-center mt-10">
          Innholdet er generell informasjon og ikke juridisk rådgivning.
        </p>
      </article>

      <SeoFloatingCTA href={ctaHref} />
    </main>
  );
}
