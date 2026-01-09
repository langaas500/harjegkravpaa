"use client";

import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className="px-4 py-3 border-b border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl font-bold text-white">
            harjegkravpå.no
          </span>
        </button>
        <button
          onClick={() => router.push("/bilkjop")}
          className="px-5 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-slate-100 transition-all"
        >
          Start
        </button>
      </div>
    </header>
  );
}