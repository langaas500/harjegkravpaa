import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Personvern | harjegkravpå.no",
  description: "Personvernerklæring for harjegkravpå.no – les om hvordan vi behandler dine opplysninger.",
};

export default function PersonvernPage() {
  return (
    <main className="bg-nordic text-white px-4 min-h-screen">
      <div className="mx-auto max-w-xl py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h1 className="text-3xl font-bold">Personvernerklæring</h1>

          <p className="mt-4 text-sm text-slate-400">Sist oppdatert: 16. januar 2026</p>

          <div className="mt-6 space-y-6 text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-2">1. Hvilke opplysninger vi behandler</h2>
              <p>Vi kan behandle følgende opplysninger:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Opplysninger du selv oppgir i wizard (sakens detaljer, kontaktinfo)</li>
                <li>E-postadresse dersom du melder deg på venteliste</li>
                <li>Tekniske opplysninger som kan oppstå ved bruk av nettsiden (f.eks. IP-adresse og nettleserinformasjon) for drift og sikkerhet</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">2. Hva opplysningene brukes til</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Generere rapport og/eller kravbrev basert på opplysningene du oppgir</li>
                <li>Levere tilgang til dokumentene du bestiller</li>
                <li>Varsle deg når nye funksjoner lanseres (hvis du har meldt deg på)</li>
                <li>Drift, feilsøking og sikkerhet</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">3. Betaling</h2>
              <p>
                Betaling håndteres av Stripe, en ekstern betalingsleverandør. Kortinformasjon behandles direkte av Stripe og lagres ikke hos oss. Du kan også betale med Klarna.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">4. Lagring og deling</h2>
              <p>
                Saksinformasjon du oppgir kan lagres midlertidig i nettleseren din (localStorage) slik at du kan fortsette der du slapp. Dersom du fullfører en sak, kan opplysningene lagres på en sikker server (Supabase) for å gi deg tilgang til dokumentene.
              </p>
              <p className="mt-2">
                Vi deler ikke opplysninger med tredjeparter utover det som er nødvendig for å levere tjenesten (betalingsleverandør, hosting). Vi selger aldri opplysninger.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">5. Hvor lenge vi lagrer opplysninger</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Data i nettleseren (localStorage) blir liggende til du selv sletter det</li>
                <li>Serverlagrede opplysninger lagres så lenge det er nødvendig for å gi deg tilgang til dokumentene, og slettes deretter</li>
                <li>E-post på venteliste lagres til du ber om sletting eller tjenesten lanseres</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">6. Dine rettigheter</h2>
              <p>Du har rett til:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Innsyn i hvilke opplysninger vi har om deg</li>
                <li>Retting av feilaktige opplysninger</li>
                <li>Sletting av opplysninger</li>
                <li>Begrensning av behandling</li>
              </ul>
              <p className="mt-2">
                Du kan også klage til Datatilsynet dersom du mener vi behandler opplysninger i strid med regelverket.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">7. Kontakt</h2>
              <p>
                Spørsmål om personvern kan rettes til <a href="mailto:kontakt@harjegkravpå.no" className="text-white hover:underline">kontakt@harjegkravpå.no</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
