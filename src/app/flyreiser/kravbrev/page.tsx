"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, Loader2, Plane, Clock, XCircle, UserX, Briefcase } from "lucide-react";

interface FlightData {
  problemType: "DELAY" | "CANCELLED" | "DENIED_BOARDING" | "BAGGAGE";
  flight: {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    flightDate: string;
    bookedPrice?: string;
  };
  passengerName: string;
  delayDuration?: string | null;
  cancellationNotice?: string | null;
  baggageType?: "delayed" | "lost" | "damaged" | null;
  outcome?: {
    level: "GREEN" | "YELLOW" | "RED";
    title: string;
    summary: string;
    compensationAmount: string | null;
  } | null;
}

interface ContactInfo {
  passengerName: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
}

export default function FlyreiserKravbrevPage() {
  const router = useRouter();
  const [data, setData] = useState<FlightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    passengerName: "",
    address: "",
    postcode: "",
    city: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("flyreiser-data");
    if (stored) {
      const parsed = JSON.parse(stored) as FlightData;
      setData(parsed);

      // Pre-fill passenger name from wizard
      if (parsed.passengerName) {
        setContactInfo((prev) => ({
          ...prev,
          passengerName: parsed.passengerName,
        }));
      }

      // Check if contact info already exists
      const storedContact = localStorage.getItem("flyreiser-kravbrev-contact");
      if (storedContact) {
        setContactInfo(JSON.parse(storedContact));
      }
    }
  }, []);

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Ikke oppgitt";
    return new Date(dateString).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getProblemTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      DELAY: "Forsinkelse",
      CANCELLED: "Kansellering",
      DENIED_BOARDING: "Nektet ombordstigning",
      BAGGAGE: "Bagasjeproblem",
    };
    return labels[type] || type;
  };

  const getProblemIcon = (type: string) => {
    switch (type) {
      case "DELAY":
        return <Clock className="h-5 w-5 text-amber-400" />;
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-400" />;
      case "DENIED_BOARDING":
        return <UserX className="h-5 w-5 text-orange-400" />;
      case "BAGGAGE":
        return <Briefcase className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };

  const canProceed =
    contactInfo.passengerName &&
    contactInfo.address &&
    contactInfo.postcode &&
    contactInfo.city;

  const handlePayment = async () => {
    if (!canProceed) return;
    setIsLoading(true);

    // Save contact info to localStorage
    localStorage.setItem("flyreiser-kravbrev-contact", JSON.stringify(contactInfo));

    // Also update flyreiser-data with contact info
    if (data) {
      const updatedData = {
        ...data,
        contactInfo: {
          address: contactInfo.address,
          postcode: contactInfo.postcode,
          city: contactInfo.city,
          phone: contactInfo.phone,
          email: contactInfo.email,
        },
        passengerName: contactInfo.passengerName,
      };
      localStorage.setItem("flyreiser-data", JSON.stringify(updatedData));
    }

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: "flyreiser-kravbrev" }),
      });

      const { url, error } = await response.json();

      if (error) {
        alert("Feil: " + error);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Kunne ikke starte betaling. Prøv igjen.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return (
      <main className="bg-nordic text-white flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </main>
    );
  }

  return (
    <main className="bg-nordic text-white min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10 space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl border border-white/10 bg-white/[0.03]">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kravbrev</h1>
              <p className="text-slate-500 text-sm">
                Ferdig formulert brev du kan sende til flyselskapet
              </p>
            </div>
          </div>

          {/* Sammendrag fra wizard */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Plane className="h-4 w-4 text-slate-400" />
              <span className="text-slate-400">Flyinformasjon</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Problemtype</span>
              <span className="flex items-center gap-2">
                {getProblemIcon(data.problemType)}
                {getProblemTypeLabel(data.problemType)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Flyselskap</span>
              <span>{data.flight?.airline || "Ikke oppgitt"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Flynummer</span>
              <span className="font-mono">{data.flight?.flightNumber || "Ikke oppgitt"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Rute</span>
              <span>
                {data.flight?.departureAirport} → {data.flight?.arrivalAirport}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Flydato</span>
              <span>{formatDate(data.flight?.flightDate)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Regelverk</span>
              <span>
                {data.problemType === "BAGGAGE"
                  ? "Montrealkonvensjonen"
                  : "EU-forordning 261/2004"}
              </span>
            </div>

            {data.outcome?.compensationAmount && (
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-slate-500">Mulig kompensasjon</span>
                <span className="text-emerald-400 font-semibold">
                  {data.outcome.compensationAmount}
                </span>
              </div>
            )}
          </div>

          {/* Kontaktskjema */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
            <h2 className="font-semibold text-lg">Din kontaktinformasjon</h2>
            <p className="text-sm text-slate-400">
              Fyll ut for å lage et send-klart kravbrev
            </p>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">
                  Fullt navn (passasjer) *
                </label>
                <input
                  type="text"
                  value={contactInfo.passengerName}
                  onChange={(e) => handleContactChange("passengerName", e.target.value)}
                  placeholder="Ola Nordmann"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Adresse *</label>
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => handleContactChange("address", e.target.value)}
                  placeholder="Gateveien 123"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Postnummer *</label>
                  <input
                    type="text"
                    value={contactInfo.postcode}
                    onChange={(e) => handleContactChange("postcode", e.target.value)}
                    placeholder="0123"
                    maxLength={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Poststed *</label>
                  <input
                    type="text"
                    value={contactInfo.city}
                    onChange={(e) => handleContactChange("city", e.target.value)}
                    placeholder="Oslo"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Telefon</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                    placeholder="912 34 567"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">E-post</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    placeholder="ola@example.no"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-teal-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pris og betaling */}
          <div className="border-t border-white/10 pt-6">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Juridisk kravbrev</p>
                  <p className="text-xs text-slate-500">
                    Basert på {data.problemType === "BAGGAGE" ? "Montreal" : "EU261"}, klart til å
                    sende
                  </p>
                </div>
                <p className="text-2xl font-bold">99 kr</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!canProceed || isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-full bg-teal-500 text-[#0c1220] py-4 font-bold text-lg hover:bg-teal-400 transition disabled:opacity-40 disabled:hover:bg-teal-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Starter betaling...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Betal og få kravbrev
                </>
              )}
            </button>

            <p className="text-xs text-slate-600 text-center mt-3">
              Brevet utformes basert på saken din og{" "}
              {data.problemType === "BAGGAGE"
                ? "Montrealkonvensjonen"
                : "EU-forordning 261/2004"}
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
