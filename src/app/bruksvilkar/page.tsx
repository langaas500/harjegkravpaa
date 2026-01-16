import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Bruksvilkår | harjegkravpå.no",
  description: "Bruksvilkår for harjegkravpå.no – les om tjenestens vilkår, ansvar og rettigheter.",
};

export default function BruksvilkarPage() {
  return (
    <main className="bg-nordic text-white px-4 min-h-screen">
      <div className="mx-auto max-w-xl py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Tilbake
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h1 className="text-3xl font-bold">Bruksvilkår for harjegkravpå.no</h1>

          <p className="mt-4 text-sm text-slate-400">Sist oppdatert: 16. januar 2026</p>

          <div className="mt-6 space-y-6 text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-2">1. Om tjenesten</h2>
              <p>
                harjegkravpå.no er en digital veiledningstjeneste som hjelper brukere med å vurdere om de kan ha krav, og hva som kan være riktig neste steg i saken. Tjenesten gir veiledende vurderinger basert på opplysningene brukeren selv oppgir.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">2. Ikke juridisk rådgivning</h2>
              <p>
                harjegkravpå.no er ikke et advokatfirma.<br />
                Vurderinger, rapporter og kravbrev som genereres er <strong>veiledende</strong> og kan ikke erstatte individuell juridisk rådgivning fra advokat eller annen kvalifisert rådgiver.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">3. Bruk av rapporter og kravbrev</h2>
              <p>
                Rapporter og kravbrev er ment som hjelp til å strukturere saken og kommunikasjonen med motpart.<br />
                Brukeren er selv ansvarlig for hvordan dokumentene brukes og eventuelle konsekvenser av dette.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">4. Brukerens ansvar</h2>
              <p>
                Brukeren er ansvarlig for at opplysningene som legges inn er korrekte og fullstendige.<br />
                harjegkravpå.no tar ikke ansvar for vurderinger basert på feil, mangelfulle eller misvisende opplysninger.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">5. Betaling og levering</h2>
              <p>
                Betaling gjelder for tilgang til digitale dokumenter (rapport og/eller kravbrev).<br />
                Levering skjer umiddelbart etter betaling i form av digital tilgang og nedlasting.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">6. Angrerett</h2>
              <p>
                I henhold til angrerettloven gjelder normalt ikke angrerett for digitale tjenester som leveres umiddelbart, når leveransen har startet med brukerens samtykke.<br />
                Ved betaling bekrefter brukeren at leveransen starter umiddelbart.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">7. Ansvarsbegrensning</h2>
              <p>
                harjegkravpå.no er ikke ansvarlig for direkte eller indirekte tap som følge av bruk av tjenesten, herunder økonomisk tap, tapt fortjeneste eller andre konsekvenser av vurderinger eller dokumenter som genereres.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">8. Endringer i tjenesten</h2>
              <p>
                harjegkravpå.no kan endre innhold, funksjonalitet og vilkår for tjenesten ved behov. Oppdaterte vilkår publiseres på nettsiden.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">9. Kontakt</h2>
              <p>
                Spørsmål om tjenesten kan rettes via kontaktinformasjonen som er oppgitt på nettsiden.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
