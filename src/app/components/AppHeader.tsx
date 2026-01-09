"use client";

import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className="px-4 py-3 border-b border-white/5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            H
          </div>
          <span className="text-lg font-bold text-white">
            harjegkravpå.no
          </span>
        </button>
      </div>
    </header>
  );
}