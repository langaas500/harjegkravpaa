"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SeoFloatingCTAProps {
  href: string;
  label?: string;
  finalCtaSelector?: string;
}

export default function SeoFloatingCTA({
  href,
  label = "Sjekk saken din",
  finalCtaSelector = '[data-final-cta="true"]'
}: SeoFloatingCTAProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isFinalCtaVisible, setIsFinalCtaVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceToBottom = documentHeight - (scrollY + innerHeight);

      setHasScrolledEnough(scrollY >= 200);
      setIsNearBottom(distanceToBottom < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const finalCtaElement = document.querySelector(finalCtaSelector);
    if (!finalCtaElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFinalCtaVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20% 0px"
      }
    );

    observer.observe(finalCtaElement);

    return () => observer.disconnect();
  }, [isMounted, finalCtaSelector]);

  if (!isMounted) return null;

  const shouldShow = hasScrolledEnough && !isNearBottom && !isFinalCtaVisible;

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 50,
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? 'auto' : 'none',
        transition: 'opacity 200ms ease-in-out'
      }}
    >
      <Link
        href={href}
        className="inline-block rounded-xl bg-[#1F4F45] hover:bg-[#246457] text-[#ECFDF5] font-semibold shadow-xl px-5 py-3 transition"
      >
        {label}
      </Link>
    </div>
  );
}
