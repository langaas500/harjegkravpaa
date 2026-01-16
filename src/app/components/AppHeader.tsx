"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className="h-10 px-4 border-b border-white/5 bg-transparent">
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
            width={56}
            height={56}
            priority
            unoptimized
            className="h-10 w-auto"
          />
          <span className="-ml-5 text-white font-semibold text-base">Harjegkravpå.no</span>
        </button>
      </div>
    </header>
  );
}
