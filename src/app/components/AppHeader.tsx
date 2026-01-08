"use client";

import { useRouter } from "next/navigation";
import { Construction } from "lucide-react";

export default function AppHeader() {
  const router = useRouter();

  return (
    <>
      {/* Under konstruksjon banner */}
      <div className="bg-yellow-500/20 border-b border-yellow-500/30 px-4 py-2">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-yellow-300 text-xs sm:text-sm">
          <Construction className="h-4 w-4 flex-shrink-0" />
          <span><strong>Under utvikling</strong> – Bruk kun testdata. Betaling: 4242 4242 4242 4242</span>
        </div>
      </div>

      <header className="px-4 py-3 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              H
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              HARJEGKRAVPÅ
            </span>
          </button>
          <button
            onClick={() => router.push("/bilkjop")}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-semibold hover:from-pink-500 hover:to-purple-500 transition-all"
          >
            Start
          </button>
        </div>
      </header>
    </>
  );
}