"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Plane } from "lucide-react";

export default function FlyreiserPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <Plane className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Flyreiser</h1>
      </div>

      <p className="text-slate-400 text-lg">Kommer snart</p>
    </main>
  );
}
