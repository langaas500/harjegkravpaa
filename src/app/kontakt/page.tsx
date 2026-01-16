"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Hvordan fungerer rapporten?",
    answer: "Du svarer på noen spørsmål om saken din. Deretter lager vi en veiledende vurdering basert på det du har oppgitt, med anbefalt neste steg.",
  },
  {
    question: "Hva får jeg for 39 kr?",
    answer: "Du får en full rapport som oppsummerer saken din, med vurdering, relevante lover og konkrete anbefalinger for hva du bør gjøre videre.",
  },
  {
    question: "Hva får jeg for 99 kr?",
    answer: "Du får et ferdig kravbrev tilpasset saken din, klart til å sendes til selger, håndverker eller flyselskap, med korrekt og tydelig formulering.",
  },
  {
    question: "Hvordan sender jeg kravbrevet?",
    answer: "Send det på e-post eller brev slik at du har dokumentasjon. Be om skriftlig svar innen en rimelig frist (vanligvis 14 dager), og ta vare på all videre kommunikasjon.",
  },
  {
    question: "Kan jeg bruke dette uten kvittering?",
    answer: "Ja. Kvittering er nyttig dokumentasjon, men du kan ofte bruke annen dokumentasjon som kontoutskrift, ordrebekreftelse eller kjøpshistorikk hvis du har brukt telefonnummer eller e-post i butikk.",
  },
];

export default function KontaktPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !message.trim()) {
      setError("E-post og melding er påkrevd.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (!res.ok || data.ok === false) {
        setError(data.error || "Kunne ikke sende melding. Prøv igjen.");
        return;
      }

      setSent(true);
    } catch {
      setError("Kunne ikke kontakte server. Prøv igjen.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="bg-nordic text-white px-4 min-h-screen">
      <div className="mx-auto max-w-xl py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </Link>

        {/* FAQ Section */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h1 className="text-2xl font-bold">Se hva du får</h1>

          <div className="mt-4 space-y-2">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition"
                >
                  <span className="font-medium text-white">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold">Kontakt oss</h2>

          {!sent ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Navn <span className="text-slate-600">(valgfritt)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ditt navn"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">E-post *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@epost.no"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Melding *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Skriv din melding her..."
                  required
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-600 resize-none focus:border-white/30 focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1F4F45] px-6 py-3 font-semibold text-[#ECFDF5] hover:bg-[#246457] transition disabled:opacity-50"
              >
                {sending ? "Sender..." : "Send melding"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-white font-medium">Takk!</p>
              <p className="text-sm text-slate-300 mt-1">
                Vi har mottatt meldingen og svarer så snart vi kan.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
