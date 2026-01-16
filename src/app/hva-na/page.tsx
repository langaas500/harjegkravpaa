"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  ArrowLeft,
  Send,
  Clock,
  FileText,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";

export default function HvaNaPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [caseType, setCaseType] = useState<string | null>(null);

  useEffect(() => {
    // Prøv å hente access_token fra ulike localStorage-nøkler
    const handverkData = localStorage.getItem("handverk-data");
    const bilkjopData = localStorage.getItem("bilkjop-data");
    const flyreiserData = localStorage.getItem("flyreiser-data");

    if (handverkData) {
      const parsed = JSON.parse(handverkData);
      if (parsed.access_token) {
        setAccessToken(parsed.access_token);
        setCaseType("handverk");
      }
    } else if (bilkjopData) {
      const parsed = JSON.parse(bilkjopData);
      if (parsed.access_token) {
        setAccessToken(parsed.access_token);
        setCaseType("bilkjop");
      }
    } else if (flyreiserData) {
      const parsed = JSON.parse(flyreiserData);
      if (parsed.access_token) {
        setAccessToken(parsed.access_token);
        setCaseType("flyreiser");
      }
    }
  }, []);

  const steps = [
    {
      icon: Send,
      title: "Send kravbrevet til motparten på e-post eller brev",
      description: "Bruk e-post med lesebekreftelse eller send rekommandert.",
    },
    {
      icon: CheckCircle,
      title: "Be om skriftlig bekreftelse på at kravet er mottatt",
      description: "Dette sikrer at du har dokumentasjon på at brevet er levert.",
    },
    {
      icon: Clock,
      title: "Sett en rimelig svarfrist (vanligvis 14 dager)",
      description: "Gi motparten tid til å vurdere kravet og svare.",
    },
    {
      icon: MessageSquare,
      title: "Ta vare på all videre kommunikasjon",
      description: "Lagre e-poster, meldinger og annen korrespondanse.",
    },
    {
      icon: AlertTriangle,
      title: "Ikke gjør egne utbedringer før saken er avklart",
      description: "Vent med å fikse problemet selv til dere er enige om løsning.",
    },
  ];

  return (
    <main className="bg-nordic text-white min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        {/* Seksjon 1 - Bekreftelse */}
        <section className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/20 p-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Du har gjort det riktige nå</h1>
              <p className="text-slate-400">
                Kravbrevet du har lastet ned er juridisk korrekt og klart til bruk.
              </p>
            </div>
          </div>
        </section>

        {/* Seksjon 2 - Konkret oppskrift */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Slik bruker du kravbrevet</h2>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 font-bold">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seksjon 3 - Hvis det ikke løser seg */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Hvis du ikke får svar eller kravet avvises</h2>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <p className="text-slate-300">
              Dersom motparten ikke svarer innen fristen eller avviser kravet ditt,
              kan du ta saken videre til mekling eller klagenemnd. Dette er gratis
              og uforpliktende.
            </p>

            <div className="space-y-3">
              <a
                href="https://www.forbrukerradet.no/klage/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:border-white/20 transition"
              >
                <div>
                  <p className="font-medium">Forbrukerrådet</p>
                  <p className="text-sm text-slate-400">Gratis mekling mellom forbruker og næringsdrivende</p>
                </div>
                <ExternalLink className="h-5 w-5 text-slate-500" />
              </a>

              <a
                href="https://www.forbrukerklageutvalget.no/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:border-white/20 transition"
              >
                <div>
                  <p className="font-medium">Forbrukerklageutvalget</p>
                  <p className="text-sm text-slate-400">Behandler tvister hvis mekling ikke fører frem</p>
                </div>
                <ExternalLink className="h-5 w-5 text-slate-500" />
              </a>
            </div>
          </div>
        </section>

        {/* Seksjon 4 - Tilgang senere */}
        {accessToken && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Trenger du dette senere?</h2>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <p className="text-slate-300">
                Du kan komme tilbake til denne saken senere via lenken under.
                Lagre den hvis du vil ha tilgang til rapporten og kravbrevet igjen.
              </p>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                <LinkIcon className="h-4 w-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/sak/${accessToken}`}
                  className="flex-1 bg-transparent text-sm text-slate-400 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/sak/${accessToken}`);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs border border-white/10 hover:border-white/30 transition"
                >
                  Kopier
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (caseType === "handverk") {
                      router.push("/handverkere/betalt");
                    } else if (caseType === "bilkjop") {
                      router.push("/bilkjop/betalt");
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Se rapport
                </button>

                <button
                  onClick={() => {
                    if (caseType === "handverk") {
                      router.push("/handverkere/kravbrev/betalt");
                    } else if (caseType === "bilkjop") {
                      router.push("/bilkjop/kravbrev/betalt");
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Se kravbrev
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="text-center text-xs text-slate-600 pt-6">
          <p>
            harjegkravpå.no – Veiledning, ikke juridisk rådgivning.
          </p>
        </div>
      </div>
    </main>
  );
}
