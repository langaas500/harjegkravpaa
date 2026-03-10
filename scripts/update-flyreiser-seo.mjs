import { readFileSync, writeFileSync } from "fs";
const FILE = "src/config/seo-matrix.ts";
let src = readFileSync(FILE, "utf-8");

const replacements = {
  "norwegian-forsinkelse": {
    bodyText: "Norwegian er Norges nest største flyselskap og er fullt ut underlagt EU-forordning 261/2004 via EØS-avtalen. Ved forsinkelser over 3 timer ved ankomst har du krav på standardkompensasjon på 250–600 € avhengig av reisedistansen. I Sturgeon-dommen (C-402/07) fastslo EU-domstolen at passasjerer ved forsinkelse over 3 timer har samme rett til kompensasjon som ved kansellering — et prinsipp Norwegian er bundet av.\n\nKompensasjonssatsene er: 250 € for flygninger under 1 500 km, 400 € for flygninger mellom 1 500 og 3 500 km, og 600 € for flygninger over 3 500 km. Merk at dette er standardkompensasjon som kommer i tillegg til forpleining (mat, drikke, hotell). Norwegian avviser ofte krav med henvisning til teknisk feil, men EU-domstolen fastslo i Wallentin-Hermann (C-549/07) at teknisk feil normalt ikke er ekstraordinær omstendighet.\n\nSend kravet til Norwegian customer relations med flightnummer, dato, bookingkode og bevis for forsinkelsen. Dersom Norwegian avslår, kan du klage til Transportklagenemnda (flyklagenemnda.no) kostnadsfritt. Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap som gir rett til erstatning.",
    faqs: [
      { q: "Norwegian tilbød matkupong. Mister jeg retten til kompensasjon?", a: "Nei. Matkupong er forpleining du har krav på uansett etter art. 9. Standardkompensasjon på 250–600 € er et separat krav etter art. 7 — bekreftet i Sturgeon-dommen (C-402/07)." },
      { q: "Norwegian sier teknisk feil er ekstraordinært. Stemmer det?", a: "Nei. EU-domstolen fastslo i Wallentin-Hermann (C-549/07) at teknisk feil normalt er flyselskapets operative ansvar og ikke kvalifiserer som ekstraordinær omstendighet." },
      { q: "Forsinkelsen var 2 timer og 50 minutter. Har jeg krav?", a: "Ikke på standardkompensasjon — grensen er 3 timer ved ankomst jf. Sturgeon-dommen. Men du har krav på mat og drikke ved forsinkelse over 2 timer etter art. 9." }
    ]
  },
  "wideroe-mistet-tilslutning": {
    bodyText: "Widerøe opererer et omfattende rutenett i Nord-Norge og distrikts-Norge, ofte med korte tilslutningsvinduer mellom flygninger. Dersom du mister et tilslutningsfly fordi det første flyet var forsinket, og begge flygningene var booket på samme billett, er Widerøe ansvarlig for hele reisen. I Flyklagenemndas sak 2022-118 ble det fastslått at mistet tilknytningsfly i utlandet gir krav på hotell og forpleining — prinsippet gjelder tilsvarende for innenlands tilslutning.\n\nEtter EU-forordning 261/2004 artikkel 7, bekreftet i Sturgeon-dommen (C-402/07), har du krav på kompensasjon dersom du ankommer endelig destinasjon mer enn 3 timer forsinket. Kompensasjonen beregnes basert på distansen til endelig destinasjon, ikke enkeltstrekningene. For innenlandsflygninger i Norge er satsen normalt 250 € (under 1 500 km).\n\nViktig: Dersom flygningene var booket separat (to uavhengige billetter), er Widerøe kun ansvarlig for forsinkelsen på den første flygningen. Men dersom du booket via Widerøes system og fikk én bookingkode, anses hele reisen som én sammenhengende reise med full beskyttelse.",
    faqs: [
      { q: "Jeg hadde bare 30 minutter mellom flyene og rakk ikke. Er det Widerøes ansvar?", a: "Dersom du booket hele reisen i ett, ja. Widerøe satte tilslutningsvinduet og er ansvarlig. Sak 2022-118 bekrefter at mistet tilslutning gir krav på forpleining og hotell." },
      { q: "Mistet tilslutning og måtte overnatte. Hvem betaler hotell?", a: "Widerøe plikter å tilby hotell og transport etter art. 9. I sak 2022-118 fikk passasjeren medhold i krav om hotell og forpleining etter mistet tilknytningsfly." },
      { q: "Widerøe tilbød ny flyvning neste morgen. Har jeg likevel krav på kompensasjon?", a: "Ja, dersom du ankom endelig destinasjon mer enn 3 timer forsinket. Sturgeon-dommen (C-402/07) fastslår at forsinkelse over 3 timer gir kompensasjonsrett uansett omruting." }
    ]
  },
  "ryanair-overbooking": {
    bodyText: "Ryanair er kjent for aggressiv overbooking — de selger flere billetter enn det er seter på flyet. Dersom du nektes ombordstigning fordi flyet er fullt, har du umiddelbar rett til kompensasjon etter EU 261/2004 artikkel 4. Overbooking gir den sterkeste rettigheten i forordningen — ingen unntaksregler gjelder. I Finnair-dommen (C-22/11) fastslo EU-domstolen at rett til erstatning gjelder selv når boarding nektes pga. omstendigheter selskapet ikke kontrollerer.\n\nKompensasjonen er 250 € for flygninger under 1 500 km, 400 € for flygninger mellom 1 500 og 3 500 km, og 600 € for flygninger over 3 500 km. I tillegg har du krav på omruting til endelig destinasjon med første tilgjengelige fly, eller full refusjon av billetten. Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap som skal kompenseres.\n\nDersom Ryanair ber frivillige om å gi opp setet sitt mot kompensasjon (typisk voucher), er dette forhandling — du er ikke pliktig til å akseptere. Velger du å beholde setet ditt og likevel nektes ombordstigning, har du rett til kontantkompensasjon pluss omruting og forpleining.",
    faqs: [
      { q: "Ryanair tilbød voucher istedenfor kontantkompensasjon. Kan jeg kreve penger?", a: "Ja. Du har alltid rett til kontantkompensasjon etter art. 7. Finnair-dommen (C-22/11) bekrefter at nektet ombordstigning gir ubetinget rett til erstatning." },
      { q: "Jeg ble nektet ombordstigning men fikk plass på fly 2 timer senere. Har jeg krav?", a: "Ja, du har krav på full kompensasjon. Beløpet kan halveres dersom forsinkelsen ved ankomst er under visse tidsgrenser, jf. art. 7 nr. 2." },
      { q: "Ryanair sier det ikke var overbooking men 'operasjonelle årsaker'. Endrer det noe?", a: "Nei. Nektet ombordstigning uansett årsak (unntatt sikkerhet, helse, manglende dokumenter) gir rett til kompensasjon etter art. 4. Finnair (C-22/11) bekrefter dette." }
    ]
  },
  "fly-streik-kompensasjon": {
    bodyText: "Flystreik er et komplekst juridisk område der utfallet avhenger av hvem som streiker. EU-domstolen fastslo i Krüsemann-dommen (C-195/17) at intern streik hos flyselskapets egne ansatte — piloter, kabinpersonale — ikke er ekstraordinær omstendighet. Flyselskapet er ansvarlig og du har krav på standardkompensasjon på 250–600 €.\n\nDerimot kan ekstern streik — for eksempel streik hos flygeledere, bakkemannskap ansatt hos tredjeparter, eller generell transportstreik — kvalifisere som ekstraordinær omstendighet som fritar fra kompensasjonsplikten. Men selv ved ekstern streik har du krav på forpleining (mat, drikke, hotell) og omruting etter art. 9. Finnair-dommen (C-22/11) bekrefter at rett til erstatning gjelder selv om boarding nektes som følge av streik.\n\nSend kravet med henvisning til Krüsemann (C-195/17) dersom det gjelder intern streik. Flyselskapet må bevise at streiken var utenfor deres kontroll og at de tok alle rimelige tiltak for å unngå den. Nelson-saken (C-581/10) fastslår at tidsbruk er et tap som skal erstattes.",
    faqs: [
      { q: "Pilotstreik kansellerte flyet mitt. Har jeg krav på kompensasjon?", a: "Ja. EU-domstolen fastslo i Krüsemann (C-195/17) at intern streik hos egne ansatte ikke er ekstraordinær omstendighet. Du har krav på 250–600 € i standardkompensasjon." },
      { q: "Flyselskapet sier streiken var 'ulovlig'. Endrer det mine rettigheter?", a: "Nei. Krüsemann-dommen (C-195/17) skiller ikke mellom lovlig og ulovlig intern streik. Flyselskapet er uansett ansvarlig for egne ansattes arbeidsforhold." },
      { q: "Flygelederstreik kansellerte flyet. Har jeg krav?", a: "Flygelederstreik regnes typisk som ekstraordinær omstendighet og fritar fra kompensasjon. Men du har likevel krav på forpleining og omruting etter art. 9." }
    ]
  },
  "fly-teknisk-feil": {
    bodyText: "Teknisk feil på flyet er den vanligste årsaken til kanselleringer og forsinkelser, og flyselskaper forsøker systematisk å avvise krav med henvisning til ekstraordinære omstendigheter. EU-domstolen har imidlertid gjentatte ganger fastslått at teknisk feil er flyselskapets ansvar. I Wallentin-Hermann-dommen (C-549/07) fastslo domstolen at tekniske feil som oppdages under vedlikehold eller som skyldes manglende vedlikehold ikke er ekstraordinære omstendigheter.\n\nVan der Lans-dommen (C-257/14) gikk enda lenger: selv uforutsette tekniske svikt som oppstår plutselig er flyselskapets operative risiko. Kun svært sjeldne hendelser som skjulte produksjonsfeil som rammer hele flytypen kan kvalifisere som ekstraordinære. Sturgeon-dommen (C-402/07) bekrefter at forsinkelse over 3 timer gir samme kompensasjonsrett som kansellering.\n\nDersom flyselskapet avviser kravet ditt med teknisk feil som begrunnelse, henvis til Wallentin-Hermann (C-549/07) og Van der Lans (C-257/14). Be om spesifikk dokumentasjon av feilen — generelle påstander er ikke tilstrekkelig. Du har krav på 250–600 € avhengig av reisedistanse.",
    faqs: [
      { q: "Flyselskapet sier teknisk feil er ekstraordinært. Stemmer det?", a: "Nei. Wallentin-Hermann (C-549/07) fastslår at teknisk feil normalt er flyselskapets ansvar. Van der Lans (C-257/14) bekrefter at selv uforutsette svikt er operativ risiko." },
      { q: "Kan jeg kreve kompensasjon for teknisk feil oppdaget rett før avgang?", a: "Ja. Van der Lans-dommen (C-257/14) fastslår at tidspunktet for oppdagelse ikke endrer ansvarsspørsmålet — teknisk vedlikehold er flyselskapets risiko." },
      { q: "Teknisk feil førte til 5 timers forsinkelse. Hva kan jeg kreve?", a: "Standardkompensasjon 250–600 € jf. Sturgeon (C-402/07), pluss forpleining (mat, drikke) under ventetiden etter art. 9, og hotell dersom du måtte overnatte." }
    ]
  },
  "klm-forsinkelse": {
    bodyText: "KLM (Royal Dutch Airlines) er et EU-basert flyselskap med base i Nederland, og er fullt underlagt EU-forordning 261/2004 på alle flygninger til og fra EU/EØS-området. Sturgeon-dommen (C-402/07) fastslår at forsinkelse over 3 timer ved ankomst gir samme kompensasjonsrett som kansellering — 250–600 € avhengig av reisedistanse.\n\nKLM opererer mange flygninger via Amsterdam Schiphol som knutepunkt. Dersom du har en gjennomgående billett og mister tilslutningsflyet i Amsterdam pga. forsinkelse, beregnes kompensasjonen ut fra total forsinkelse ved endelig destinasjon. Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap. I sak 2022-118 fra Flyklagenemnda fikk en passasjer medhold i krav om hotell og forpleining etter mistet tilknytningsfly — prinsippet gjelder tilsvarende for KLM-tilslutninger.\n\nKLM har et online klagesystem, men avviser ofte krav i første omgang. Send skriftlig reklamasjon med flightnummer, dato, bookingkode og bevis for forsinkelsen. Dersom KLM avslår, kan du klage til det nederlandske tilsynet (ILT) eller Transportklagenemnda i Norge.",
    faqs: [
      { q: "KLM-flyet fra Amsterdam var forsinket. Gjelder norsk klagenemnd?", a: "Ja, du kan klage til Transportklagenemnda i Norge dersom flygningen hadde avgang fra eller ankomst til norsk flyplass. Sturgeon (C-402/07) gir rett til kompensasjon ved forsinkelse over 3 timer." },
      { q: "Mistet tilslutning i Amsterdam pga. KLM-forsinkelse. Hva kan jeg kreve?", a: "Kompensasjon basert på total forsinkelse ved endelig destinasjon, pluss mat, drikke og hotell. Sak 2022-118 bekrefter krav på forpleining ved mistet tilknytning." },
      { q: "KLM sier forsinkelsen skyldtes teknisk feil. Fritar det dem?", a: "Nei. Wallentin-Hermann (C-549/07) fastslår at teknisk feil normalt er operativ risiko. Van der Lans (C-257/14) bekrefter dette — selv uforutsette tekniske svikt fritar ikke." }
    ]
  },
  "lufthansa-kansellert": {
    bodyText: "Lufthansa er et tysk EU-basert flyselskap som er fullt underlagt EU-forordning 261/2004. Ved kansellering har du krav på kompensasjon dersom du ble varslet mindre enn 14 dager før avgang. Satsen er 250–600 € avhengig av reisedistansen. Sturgeon-dommen (C-402/07) og Nelson-saken (C-581/10) bekrefter at dette er standardiserte beløp som kompenserer for tidsbruk — et selvstendig tap.\n\nLufthansa opererer et omfattende nettverk via Frankfurt og München. Dersom hele reisen er på én billett og tilslutningsflyet kanselleres, gjelder kompensasjonsretten for hele reisen. Lufthansa er også forpliktet til å tilby alternativ transport med første tilgjengelige fly — også med andre flyselskap. Avviser Lufthansa med henvisning til teknisk feil, er dette normalt ikke ekstraordinært jf. Wallentin-Hermann (C-549/07).\n\nLufthansa svarer ofte med standardavslag. Vær spesifikk i kravet: oppgi flightnummer, dato, bookingkode, kanselleringstidspunkt og krev eksakt beløp. Dersom Lufthansa avslår uten god begrunnelse, kan du eskalere til SÖP (tysk klageorgan) eller Transportklagenemnda i Norge.",
    faqs: [
      { q: "Lufthansa kansellerte 10 dager før avgang. Har jeg krav?", a: "Ja, varsel under 14 dager gir kompensasjonsrett etter art. 5. Sturgeon (C-402/07) og Nelson (C-581/10) bekrefter at kompensasjon gis for tapt tid." },
      { q: "Lufthansa sier kanselleringen skyldes teknisk feil. Fritar det dem?", a: "Nei. Wallentin-Hermann (C-549/07) fastslår at teknisk feil normalt er operativ risiko. Be Lufthansa dokumentere at feilen var ekstraordinær — generelle påstander holder ikke." },
      { q: "Kan jeg klage til tysk klagenemnd fra Norge?", a: "Ja, SÖP tar imot klager fra alle EU/EØS-borgere. Du kan også bruke norsk Transportklagenemnd — begge er gratis." }
    ]
  },
  "fly-mat-hotell-krav": {
    bodyText: "Ved forsinkelse over 2 timer har du rett på mat og drikke uavhengig av forsinkelsens årsak — selv ved ekstraordinære omstendigheter som fritar flyselskapet fra standardkompensasjon. Denne retten følger av EU-forordning 261/2004 artikkel 9 og gjelder absolutt. EU-domstolen bekreftet i EU-sak C-315/15 at selv fuglekollisjon (som er ekstraordinært) ikke fritar fra plikten til forpleining.\n\nViktig å skille mellom standardkompensasjon og dekning av faktiske utlegg: Kompensasjon (250–600 €) er et fast beløp for tapt tid jf. Sturgeon (C-402/07). Forpleining (mat, drikke, hotell) dekker dine faktiske utgifter og gjelder alltid — uansett årsak til forsinkelsen. Hotell og transport skal tilbys ved overnatting.\n\nTidsfristene for forpleining er: 2 timer for flygninger under 1 500 km, 3 timer for flygninger mellom 1 500 og 3 500 km, og 4 timer for flygninger over 3 500 km. Dersom flyselskapet ikke tilbyr forpleining, kan du ordne det selv og kreve refusjon. Ta vare på alle kvitteringer.",
    faqs: [
      { q: "Flyselskapet ga ingen mat eller drikke under 6 timers forsinkelse. Hva gjør jeg?", a: "Kjøp mat og drikke selv og ta vare på kvitteringer. Flyselskapet plikter å refundere etter art. 9. EU-sak C-315/15 bekrefter at forpleining gjelder uansett årsak." },
      { q: "Har jeg krav på hotell ved forsinkelse til neste dag?", a: "Ja, flyselskapet plikter å tilby hotell og transport etter art. 9. Sak 2022-118 fra Flyklagenemnda bekrefter at mistet tilslutning gir krav på overnatting." },
      { q: "Hva er forskjellen på kompensasjon og forpleining?", a: "Kompensasjon (250–600 €) er standardbeløp for tapt tid jf. Sturgeon (C-402/07) — gjelder kun ved ikke-ekstraordinære årsaker. Forpleining (mat, hotell) dekker faktiske utlegg og gjelder alltid, uansett årsak." }
    ]
  },
  "mistet-bagasje-erstatning": {
    bodyText: "Mistet bagasje på flyreise er regulert av Montrealkonvensjonen, som gir deg rett til erstatning opptil ca. 1 700 SDR (ca. 22 000 kr). Flyselskapet er objektivt ansvarlig for innsjekket bagasje fra det tidspunktet den leveres til flyselskapet til du mottar den ved ankomst. Montrealkonvensjonen setter en absolutt frist på 21 dager for å melde forsinket bagasje — etter dette mister du kravgrunnlaget.\n\nDet første du må gjøre er å fylle ut PIR-skjema (Property Irregularity Report) på flyplassen umiddelbart. Uten PIR er det svært vanskelig å fremme erstatningskrav i etterkant. Bagasje regnes som tapt dersom den ikke leveres innen 21 dager etter PIR-registreringen. For ødelagt bagasje er reklamasjonsfristen kun 7 dager etter mottak.\n\nFor erstatningskravet trenger du dokumentasjon på innholdet og verdien. Bilder av innholdet, kjøpskvitteringer og kontoutskrifter er nyttig. Flyselskapet vil normalt gjøre fradrag for alder og slitasje (avskrivning). Merk: Montrealkonvensjonen dekker faktisk tap — dette er separat fra standardkompensasjon etter EU 261/2004.",
    faqs: [
      { q: "Hva er det første jeg må gjøre når bagasjen er borte?", a: "Fyll ut PIR-skjema på flyplassen umiddelbart. Montrealkonvensjonen krever melding innen 21 dager for forsinket bagasje og 7 dager for skadet bagasje — uten PIR mister du kravgrunnlaget." },
      { q: "Hva er makserstatningen for mistet bagasje?", a: "Ca. 1 700 SDR (ca. 22 000 kr) etter Montrealkonvensjonen. Dette dekker faktisk tap — dokumenter innholdet med bilder og kvitteringer for å maksimere kravet." },
      { q: "Kan jeg kreve både bagasjeerstatning og flykompensasjon?", a: "Ja. Bagasjeerstatning etter Montrealkonvensjonen (faktiske tap) og standardkompensasjon etter EU 261/2004 (tapt tid) er to separate krav som kan fremmes parallelt." }
    ]
  },
  "forsinket-crew-mangel": {
    bodyText: "Mangel på crew eller besetning er et internt operasjonelt problem som flyselskapet er ansvarlig for. I Flyklagenemndas sak 2023-012 ble det fastslått at crew-mangel gir full kompensasjon — passasjeren fikk 600 EUR fordi flyselskapet ikke kunne dokumentere at mangelen var ekstraordinær. Bemanningsplanlegging er en del av normal drift, og sykdom blant personell er en forventet del av driften.\n\nEU-domstolen har i flere avgjørelser presisert at kun omstendigheter helt utenfor flyselskapets kontroll er ekstraordinære. Van der Lans (C-257/14) fastslår at operative utfordringer — inkludert uforutsette hendelser — er flyselskapets risiko dersom de er knyttet til normal drift. Bemanningsproblemer faller klart i denne kategorien. Kompensasjonssatsene er 250 €, 400 € eller 600 € avhengig av reisedistanse.\n\nI tillegg til standardkompensasjon har du krav på forpleining (mat, drikke) under ventetiden og hotell dersom du må overnatte. Disse faktiske utleggene dekkes uansett årsak — også dersom flyselskapet mot formodning skulle få medhold i at crew-mangelen var ekstraordinær.",
    faqs: [
      { q: "Flyet ble kansellert fordi crew ikke møtte opp. Er det ekstraordinær omstendighet?", a: "Nei. I Flyklagenemndas sak 2023-012 ble crew-mangel ansett som internt operasjonelt problem som ga full kompensasjon på 600 EUR." },
      { q: "Flyselskapet sier piloten ble akutt syk. Fritar det dem?", a: "Normalt nei. Van der Lans (C-257/14) fastslår at operative utfordringer er flyselskapets risiko. Selskapet skal ha beredskapsplaner for sykdom hos personell." },
      { q: "Jeg fikk ny flyvning neste dag. Hva kan jeg kreve totalt?", a: "Standardkompensasjon 250–600 € jf. sak 2023-012, pluss dekning av faktiske utlegg til mat, drikke og hotell etter art. 9. Dette er to separate krav." }
    ]
  },
  "finnair-forsinkelse": {
    bodyText: "Finnair er et finsk EU-basert flyselskap som er fullt underlagt EU-forordning 261/2004. Sturgeon-dommen (C-402/07) fastslår at forsinkelse over 3 timer ved ankomst gir rett til standardkompensasjon — 250–600 € avhengig av reisedistanse. I Finnair-dommen (C-22/11) fastslo EU-domstolen dessuten at rett til erstatning gjelder selv om boarding nektes pga. omstendigheter selskapet ikke kontrollerer.\n\nFinnair opererer mange ruter via Helsinki som knutepunkt. Dersom du har gjennomgående billett og mister tilslutning i Helsinki, beregnes kompensasjonen ut fra total forsinkelse til endelig destinasjon. For ruter Oslo–Helsinki er satsen normalt 250 € (under 1 500 km), mens for lengre ruter via Helsinki kan den være 400 € eller 600 €. Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap.\n\nFinnair avviser mange krav med standardformuleringer. Dersom de påberoper teknisk feil, henvis til Wallentin-Hermann (C-549/07) som fastslår at dette normalt er operativ risiko. Klag til Transportklagenemnda i Norge (gratis) eller det finske tilsynsorganet Traficom.",
    faqs: [
      { q: "Finnair-flyet mitt fra Oslo var 4 timer forsinket. Hva kan jeg kreve?", a: "250–400 € avhengig av reisedistanse jf. Sturgeon (C-402/07), pluss mat og drikke under ventetiden etter art. 9. Finnair-dommen (C-22/11) bekrefter sterk passasjerbeskyttelse." },
      { q: "Finnair avviste kravet mitt med 'ekstraordinære omstendigheter'. Hva gjør jeg?", a: "Be dem dokumentere den spesifikke årsaken. Wallentin-Hermann (C-549/07) fastslår at teknisk feil ikke er ekstraordinært. Klag til Transportklagenemnda gratis." },
      { q: "Mistet tilslutning i Helsinki pga. Finnair-forsinkelse. Hva dekkes?", a: "Standardkompensasjon basert på total forsinkelse ved endelig destinasjon, pluss faktiske utlegg til mat og hotell. Sak 2022-118 bekrefter krav ved mistet tilknytning." }
    ]
  },
  "british-airways-kansellert": {
    bodyText: "British Airways (BA) er et britisk flyselskap som etter Brexit opererer under UK261 — den britiske versjonen av EU 261/2004 som er tilnærmet identisk. For flygninger fra EU/EØS med BA gjelder EU-forordningen direkte; for flygninger fra UK gjelder UK261 med samme satser og rettigheter. Sturgeon-dommen (C-402/07) og Nelson-saken (C-581/10) gjelder fullt ut for EU/EØS-avganger.\n\nVed kansellering har du krav på standardkompensasjon (250–600 €) dersom du ble varslet mindre enn 14 dager før avgang. Merk skillet mellom kompensasjon og refusjon: kompensasjon er fast beløp for tapt tid, mens refusjon er tilbakebetaling av billetten. Du har alltid rett til å kreve kontantrefusjon — du er ikke pliktig til å akseptere voucher. Wallentin-Hermann (C-549/07) fastslår at teknisk feil ikke fritar fra kompensasjonsplikten.\n\nBA har et online claim-system, men behandlingstiden kan være lang. Dersom BA avslår, kan du bruke CAA (UK Civil Aviation Authority) for flygninger fra UK, eller Transportklagenemnda for flygninger fra Norge.",
    faqs: [
      { q: "BA kansellerte flyet mitt fra London til Oslo. Gjelder EU-reglene?", a: "Fra UK med BA gjelder UK261 som er identisk med EU 261/2004. Du har krav på 250–600 € standardkompensasjon jf. Sturgeon (C-402/07)." },
      { q: "BA tilbød voucher istedet for kontanterstatning. Kan jeg kreve penger?", a: "Ja. Du har alltid rett til kontanterstatning etter art. 7. Voucher kan tilbys men du er aldri pliktig til å akseptere det." },
      { q: "BA sier kanselleringen skyldes teknisk feil. Er jeg sjanseløs?", a: "Nei. Wallentin-Hermann (C-549/07) fastslår at teknisk feil normalt er operativ risiko. Van der Lans (C-257/14) bekrefter at selv uforutsette tekniske svikt ikke fritar." }
    ]
  },
  "air-france-bagasje": {
    bodyText: "Air France er ansvarlig for mistet, forsinket eller ødelagt bagasje etter Montrealkonvensjonen. Makserstatningen er ca. 1 700 SDR (ca. 22 000 kr), og Air France er objektivt ansvarlig — du trenger ikke bevise uaktsomhet, bare at bagasjen gikk tapt eller ble skadet under flyreisen. Montrealkonvensjonen setter strenge frister: 7 dager for skadet bagasje, 21 dager for forsinket bagasje.\n\nViktig å skille mellom to separate kravgrunnlag: Montrealkonvensjonen dekker dine faktiske tap (verdi av mistet innhold, nødkjøp ved forsinkelse). EU 261/2004 gir standardkompensasjon for tapt tid ved forsinkelse/kansellering. Du kan kreve begge dersom flyet også var forsinket. Sturgeon-dommen (C-402/07) bekrefter kompensasjon ved forsinkelse over 3 timer.\n\nFørste skritt er å fylle ut PIR-skjema (Property Irregularity Report) på flyplassen umiddelbart. Uten PIR er det svært vanskelig å fremme krav. For forsinket bagasje har du krav på dekning av nødvendige kjøp (klær, toalettartikler) for rimelige beløp — dokumenter alt med kvitteringer.",
    faqs: [
      { q: "Air France mistet bagasjen min. Hva gjør jeg på flyplassen?", a: "Fyll ut PIR-skjema umiddelbart. Montrealkonvensjonen krever melding innen 21 dager for forsinket bagasje og 7 dager for skadet bagasje — uten PIR taper du kravgrunnlaget." },
      { q: "Bagasjen dukket opp etter 5 dager. Kan jeg kreve erstatning for nødkjøp?", a: "Ja, dokumenterte utgifter til nødvendige klær og toalettartikler dekkes etter Montrealkonvensjonen art. 19. Hold utgiftene rimelige og ta vare på alle kvitteringer." },
      { q: "Kan jeg kreve både bagasjeerstatning og flykompensasjon?", a: "Ja. Bagasjeerstatning (Montrealkonvensjonen) dekker faktisk tap. Standardkompensasjon (EU 261/2004 jf. Sturgeon C-402/07) dekker tapt tid. To separate kravgrunnlag." }
    ]
  },
  "flyforsinkelse-it-feil": {
    bodyText: "IT-feil hos flyselskapet — som nedetid i bookingsystemer, innsjekkingssystemer eller flyoperasjonssystemer — er et internt operasjonelt problem som flyselskapet er ansvarlig for. Prinsippet fra Wallentin-Hermann (C-549/07) om at interne driftsproblemer ikke er ekstraordinære omstendigheter gjelder tilsvarende for IT-svikt. Van der Lans (C-257/14) bekrefter at uforutsette operative hendelser er flyselskapets risiko.\n\nFlyselskapet kan ikke fraskrive seg ansvar for egne datasystemer. Vedlikehold og robusthet i IT-infrastrukturen er en del av normal drift. Kun IT-feil forårsaket av eksterne aktører — som cyberangrep fra tredjeparter eller infrastrukturfeil hos flyplassoperatør — kan potensielt kvalifisere som ekstraordinært. Sturgeon-dommen (C-402/07) gir rett til 250–600 € ved forsinkelse over 3 timer.\n\nDersom flyselskapet avviser kravet med IT-feil som begrunnelse, henvis til Wallentin-Hermann og Van der Lans. Be om spesifikk dokumentasjon — generelle påstander holder ikke. Du har i tillegg alltid krav på forpleining (mat, drikke, hotell) etter art. 9, uansett årsak.",
    faqs: [
      { q: "Flyselskapet sier IT-krasj er ekstraordinær omstendighet. Er det riktig?", a: "Nei. Wallentin-Hermann (C-549/07) fastslår at interne driftsproblemer ikke er ekstraordinære. Van der Lans (C-257/14) bekrefter at operative utfordringer er selskapets risiko." },
      { q: "IT-feilen rammet hele flyplassen, ikke bare ett selskap. Endrer det noe?", a: "Muligens. Infrastrukturfeil utenfor selskapets kontroll kan kvalifisere som ekstraordinært. Men flyselskapet må dokumentere dette konkret — generelle påstander holder ikke." },
      { q: "Hva kan jeg kreve ved IT-forsinkelse over 3 timer?", a: "Standardkompensasjon 250–600 € jf. Sturgeon (C-402/07), pluss faktiske utlegg til mat og drikke etter art. 9. Dette er to separate krav med ulike kravgrunnlag." }
    ]
  },
  "easyjet-forsinkelse": {
    bodyText: "EasyJet er et britisk lavprisselskap som er underlagt EU-forordning 261/2004 på alle flygninger fra EU/EØS-flyplasser. Sturgeon-dommen (C-402/07) fastslår at forsinkelse over 3 timer ved ankomst gir rett til standardkompensasjon på 250–600 € avhengig av reisedistansen — uavhengig av billettpris.\n\nEasyJet er kjent for å avvise mange krav med standardformuleringer om ekstraordinære omstendigheter. Ikke gi deg — de fleste avslag er ugrunnet. Wallentin-Hermann (C-549/07) fastslår at teknisk feil ikke er ekstraordinært, og Van der Lans (C-257/14) bekrefter at selv uforutsette tekniske svikt er operativ risiko. Nelson-saken (C-581/10) fastslår at tidsbruk er et selvstendig tap som gir rett til erstatning.\n\nDersom EasyJet avslår kravet, kan du klage til Transportklagenemnda i Norge (gratis) for flygninger fra norske flyplasser, eller CAA (UK Civil Aviation Authority) for flygninger fra UK. I tillegg til standardkompensasjon har du alltid krav på forpleining (mat, drikke, hotell) etter art. 9 — uavhengig av forsinkelsens årsak.",
    faqs: [
      { q: "EasyJet-flyet var 3,5 timer forsinket. Hva kan jeg kreve?", a: "Standardkompensasjon 250–600 € jf. Sturgeon (C-402/07), pluss faktiske utlegg til mat og drikke etter art. 9. Dette er to separate krav — ikke la EasyJet blande dem." },
      { q: "EasyJet tilbød 10€ matkupong. Er jeg ferdig da?", a: "Nei. Matkupong er forpleining etter art. 9 som du har krav på uansett. Standardkompensasjonen på 250–600 € er et separat krav som kommer i tillegg." },
      { q: "EasyJet sier forsinkelsen skyldes teknisk feil. Mister jeg kravet?", a: "Nei. Wallentin-Hermann (C-549/07) og Van der Lans (C-257/14) fastslår at teknisk feil er flyselskapets operative risiko — ikke ekstraordinær omstendighet." }
    ]
  },
  "turkish-airlines-kansellert": {
    bodyText: "Turkish Airlines er et tyrkisk flyselskap som er underlagt EU-forordning 261/2004 på alle flygninger fra EU/EØS-flyplasser — uavhengig av at Tyrkia ikke er med i EU. Sturgeon-dommen (C-402/07) gir rett til standardkompensasjon (250–600 €) ved forsinkelse over 3 timer, og Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap som skal erstattes.\n\nVed kansellering eller forsinkelse fra norsk eller annen EU/EØS-flyplass har du krav på standardkompensasjon dersom du ble varslet mindre enn 14 dager før avgang. Merk skillet mellom standardkompensasjon og faktiske utlegg: kompensasjonen er et fast beløp for tapt tid, mens forpleining (mat, drikke, hotell) dekker dine faktiske kostnader og gjelder alltid — bekreftet i EU-sak C-315/15.\n\nTurkish Airlines behandler krav via e-post eller online-skjema. Behandlingstiden kan være lang. Dersom de avslår, kan du klage til Transportklagenemnda i Norge. For flygninger fra Istanbul til EU/EØS er du kun dekket dersom du har gjennomgående billett fra en EU/EØS-flyplass.",
    faqs: [
      { q: "Turkish Airlines kansellerte flyet mitt fra Oslo til Istanbul. Gjelder EU-reglene?", a: "Ja. Flygninger fra Norge (EØS) med ethvert flyselskap er dekket av EU 261/2004. Sturgeon (C-402/07) gir rett til 250–600 € ved forsinkelse over 3 timer." },
      { q: "Layoveren min i Istanbul ble 18 timer. Har jeg krav på hotell?", a: "Ja, ved forsinkelse som medfører overnatting plikter flyselskapet å tilby hotell etter art. 9. EU-sak C-315/15 bekrefter at forpleining gjelder uansett årsak til forsinkelsen." },
      { q: "Turkish sier kanselleringen skyldes politisk uro. Er det ekstraordinært?", a: "Politisk uro kan kvalifisere som ekstraordinær omstendighet som fritar fra standardkompensasjon. Men du har likevel krav på forpleining og omruting etter art. 8 og 9." }
    ]
  },
  "nektet-ombordstigning-lojalitetsprogram": {
    bodyText: "Å bli nektet ombordstigning fordi du reiser på en bonusbillett er ikke lovlig grunnlag for å frata deg rettigheter. EU-forordning 261/2004 artikkel 4 skiller ikke mellom billetttyper. I Finnair-dommen (C-22/11) fastslo EU-domstolen at rett til erstatning gjelder selv om boarding nektes pga. omstendigheter selskapet ikke kontrollerer — det gjelder i aller høyeste grad ved ren overbooking av bonusseter.\n\nFlyselskaper praktiserer tidvis lavere prioritet for bonusbilletter ved overbooking, men dette er i strid med forordningen. Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap som gir rett til standardkompensasjon: 250 € for flygninger under 1 500 km, 400 € mellom 1 500–3 500 km, og 600 € over 3 500 km. I tillegg har du krav på omruting og forpleining.\n\nDokumenter hendelsen: ta bilder av gate-skjermen, noter tidspunkt og eventuell muntlig begrunnelse fra personalet. Referer til Finnair-dommen (C-22/11) og art. 4 som ikke gjør unntak for bonusbilletter. Send skriftlig krav med boardingkort og bookingbekreftelse.",
    faqs: [
      { q: "Bonusbillettsetet mitt ble gitt til en betalende passasjer. Er det lovlig?", a: "Nei. Finnair-dommen (C-22/11) fastslår at rett til erstatning gjelder uavhengig av billetttype. Nektet ombordstigning gir ubetinget krav på 250–600 €." },
      { q: "Flyselskapet sier bonusbillett er lavere prioritet. Endrer det mine rettigheter?", a: "Nei. EU 261/2004 art. 4 skiller ikke mellom billetttyper. Nelson (C-581/10) bekrefter at kompensasjon gis for tidsbruk, ikke billettverdi." },
      { q: "Kan jeg kreve både kompensasjon og omruting med bonusbillett?", a: "Ja. Du har rett til standardkompensasjon (250–600 €) pluss omruting med første tilgjengelige fly og forpleining under ventetiden — nøyaktig som med ordinær billett." }
    ]
  },
  "bagasje-forsinket-feriestart": {
    bodyText: "Å stå uten bagasje ved starten av en ferie er frustrerende, men flyselskapet er økonomisk ansvarlig for konsekvensene. Etter Montrealkonvensjonen artikkel 19 har du krav på dekning av rimelige og nødvendige nødkjøp — klær, toalettartikler og andre daglige nødvendigheter — inntil bagasjen leveres. Montrealkonvensjonen setter en absolutt frist: reklamasjon innen 21 dager etter at du mottok bagasjen.\n\nViktig å skille mellom nødvendige og unødvendige kjøp — og mellom faktiske utlegg og standardkompensasjon. Nødkjøp (klær, undertøy, toalettartikler, solkrem) dekkes etter Montrealkonvensjonen som faktisk tap. Dersom også selve flyet var forsinket over 3 timer, har du i tillegg krav på standardkompensasjon (250–600 €) etter Sturgeon (C-402/07). Dette er to separate krav.\n\nFyll ut PIR-skjema på flyplassen umiddelbart. Dersom bagasjen ikke er levert innen 21 dager, anses den som tapt og du kan kreve full erstatning opptil ca. 1 700 SDR (ca. 22 000 kr). Send krav til flyselskapet med PIR-nummer og alle kvitteringer for nødkjøp.",
    faqs: [
      { q: "Bagasjen kom tre dager forsinket. Kan jeg kreve alle klær jeg kjøpte?", a: "Du kan kreve rimelige og nødvendige nødkjøp etter Montrealkonvensjonen art. 19. Designerklær dekkes ikke — hold utgiftene på et rimelig nivå og behold alle kvitteringer." },
      { q: "Bagasjen kom aldri. Hva er makserstatningen?", a: "Ca. 1 700 SDR (ca. 22 000 kr) etter Montrealkonvensjonen. Reklamasjonsfrist er 21 dager. Dokumenter innholdet med bilder og kvitteringer for å maksimere kravet." },
      { q: "Kan jeg kreve erstatning for ødelagt ferie i tillegg?", a: "Montrealkonvensjonen dekker faktisk økonomisk tap. Standardkompensasjon etter EU 261/2004 (Sturgeon C-402/07) gis ved flyforsinkelse over 3 timer — men ikke for ferieulemper utover dette." }
    ]
  },
  "innlandsflyging-rettigheter": {
    bodyText: "Innenlandsflygninger i Norge er dekket av EU-forordning 261/2004 via EØS-avtalen. Sturgeon-dommen (C-402/07) gir rett til standardkompensasjon ved forsinkelse over 3 timer — for innenlandsflygninger er satsen normalt 250 € (flygninger under 1 500 km). Nelson-saken (C-581/10) bekrefter at tidsbruk er et selvstendig tap som gir rett til erstatning.\n\nWiderøe og SAS er de største operatørene på innenlandsruter, og begge er underlagt forordningen. Ved kansellering har du rett til omruting med første tilgjengelige transport — inkludert buss, tog eller taxi dersom det er raskere enn neste fly. I Flyklagenemndas sak 2023-012 ble crew-mangel ansett som grunnlag for full kompensasjon — et prinsipp som gjelder uavhengig av rutetype.\n\nI distrikts-Norge der flyruteflyet kan være eneste praktiske reisemulighet, er omrutingsplikten særlig viktig. Flyselskapet kan ikke bare kansellere uten å tilby alternativ transport. I tillegg til standardkompensasjon har du alltid krav på forpleining (mat, drikke, hotell) etter art. 9 — uansett årsak til forsinkelsen, bekreftet i EU-sak C-315/15.",
    faqs: [
      { q: "Widerøe kansellerte innenlandsflyet mitt. Har jeg krav på EU-kompensasjon?", a: "Ja. Sturgeon (C-402/07) gir rett til 250 € for flygninger under 1 500 km. Sak 2023-012 bekrefter full kompensasjon selv ved operative problemer som crew-mangel." },
      { q: "Ruteflyet er eneste transportmulighet til øya min. Har jeg ekstra rettigheter?", a: "Flyselskapet plikter å tilby alternativ transport eller full refusjon etter art. 8. Kan du dokumentere ekstra kostnader (f.eks. leiebil), kan disse kreves dekket." },
      { q: "Hva er forskjellen på kompensasjon og forpleining for innenlandsfly?", a: "Kompensasjon (250 €) er standardbeløp for tapt tid jf. Sturgeon (C-402/07). Forpleining (mat, hotell) dekker faktiske utlegg og gjelder alltid — bekreftet i EU-sak C-315/15." }
    ]
  }
};

// Apply replacements — same logic as bilkjop script
let count = 0;
for (const [slug, data] of Object.entries(replacements)) {
  const slugPattern = `slug: "${slug}"`;
  const idx = src.indexOf(slugPattern);
  if (idx === -1) {
    console.error(`Slug not found: ${slug}`);
    continue;
  }

  // Find bodyText start
  const bodyStart = src.indexOf('bodyText: "', idx);
  if (bodyStart === -1 || bodyStart - idx > 500) {
    console.error(`bodyText not found for: ${slug}`);
    continue;
  }

  // Find end of bodyText string (handle escaped quotes)
  let i = bodyStart + 'bodyText: "'.length;
  while (i < src.length) {
    if (src[i] === '\\') { i += 2; continue; }
    if (src[i] === '"') break;
    i++;
  }
  const bodyEnd = i + 1;

  // Find faqs start
  const faqsStart = src.indexOf('faqs: [', bodyEnd);
  if (faqsStart === -1 || faqsStart - bodyEnd > 50) {
    console.error(`faqs not found for: ${slug}`);
    continue;
  }

  // Find matching closing bracket
  let bracketDepth = 0;
  let j = faqsStart + 'faqs: '.length;
  for (; j < src.length; j++) {
    if (src[j] === '[') bracketDepth++;
    if (src[j] === ']') { bracketDepth--; if (bracketDepth === 0) { j++; break; } }
  }
  const faqsEnd = j;

  // Build replacement — escape real newlines as literal \n for the TS source
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const newBodyText = `bodyText: "${esc(data.bodyText)}"`;
  const newFaqs = `faqs: [${data.faqs.map(f =>
    `{ q: "${esc(f.q)}", a: "${esc(f.a)}" }`
  ).join(', ')}]`;

  const before = src.slice(0, bodyStart);
  const after = src.slice(faqsEnd);
  src = before + newBodyText + ', ' + newFaqs + after;
  count++;
  console.log(`✓ Updated: ${slug}`);
}

writeFileSync(FILE, src, "utf-8");
console.log(`\nDone! Updated ${count} nodes.`);
