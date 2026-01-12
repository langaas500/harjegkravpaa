"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className="h-11 md:h-12 px-4 border-b border-white/5 bg-transparent">
      <div className="mx-auto flex h-full max-w-5xl items-center">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Gå til forsiden"
          className="inline-flex items-center"
        >
          <Image
            src="/logo.png"
            alt="harjegkravpå.no"
            width={64}
            height={64}
            priority
            unoptimized
            className="h-12 md:h-14 w-auto"
          />
          <span className="-ml-6 text-white font-semibold text-lg">Harjegkravpå.no</span>
        </button>
      </div>
    </header>
  );
}
