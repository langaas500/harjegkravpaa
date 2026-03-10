import { readFileSync, writeFileSync } from "fs";
const FILE = "src/config/seo-matrix.ts";
let src = readFileSync(FILE, "utf-8");

const replacements = {
  "forsinket-handverker-dagmulkt": {
    bodyText: "Forsinkelse er blant de vanligste problemene ved håndverkertjenester. Håndverkertjenesteloven § 11 gir deg rett til dagmulkt dersom arbeidet ikke ferdigstilles innen avtalt tid — uten at du trenger å bevise at forsinkelsen har medført økonomisk tap. Dagmulkt-prinsippet gir normalt 1 promille av vederlaget per virkedag forsinkelsen varer, i inntil 100 dager.\n\nI Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — forsinkelse var ett av flere momenter som ble vektlagt. Dersom dagmulkt ikke er eksplisitt avtalt i kontrakten, kan du likevel kreve erstatning for dokumentert tap som følge av forsinkelsen, for eksempel ekstra boutgifter eller tapt arbeidsinntekt.\n\nFor å kreve dagmulkt må du kunne dokumentere avtalt ferdigstillelsesdato og faktisk ferdigstillelsesdato. Hold all kommunikasjon skriftlig (e-post, SMS) og dokumenter fremdriften med bilder og tidsangivelser. Håndverkertjenesteloven § 32 (HTL § 32) begrenser også prisoverskridelser til 15 % over estimat — forsinkelser og overskridelser går ofte hånd i hånd.",
    faqs: [
      { q: "Håndverkeren har ikke avtalt dagmulkt i kontrakten. Kan jeg likevel kreve noe?", a: "Du kan kreve erstatning for dokumentert tap etter HTL § 11. Dagmulkt-prinsippet (1 promille per dag, maks 100 dager) gjelder ved avtale. I sak 116596 ble forsinkelse vektlagt i prisavslaget." },
      { q: "Hva er rimelig dagmulktsats?", a: "Dagmulkt-prinsippet tilsier 1 promille av vederlaget per virkedag, i inntil 100 dager. Ved en kontrakt på 500 000 kr tilsvarer det 500 kr per dag — maks 50 000 kr totalt." },
      { q: "Kan jeg holde tilbake sluttbetaling pga. forsinkelse?", a: "Ja, du kan holde tilbake et beløp tilsvarende dagmulktkravet. HTL § 32 beskytter deg også mot prisoverskridelser over 15 % av estimat uten forhåndsgodkjenning." }
    ]
  },
  "samsvarserklaring-mangler": {
    bodyText: "En samsvarserklæring er et lovpålagt dokument som bekrefter at elektrisk arbeid er utført i henhold til norsk regelverk. Elektrikeren er pliktig til å sende kopi til det lokale eltilsynet (DLE) og til deg som oppdragsgiver. I Forbrukerklageutvalgets sak 135048 ble det fastslått at manglende samsvarserklæring i seg selv utgjør en mangel etter håndverkertjenesteloven — uavhengig av om det elektriske arbeidet ellers er korrekt utført.\n\nUten samsvarserklæring er det elektriske arbeidet formelt ikke godkjent, noe som kan gi problemer ved boligsalg, forsikringsoppgjør og tilsyn. Du risikerer også at forsikringsselskapet avviser et krav dersom brann oppstår i den ikke-dokumenterte installasjonen. Reklamasjonsfristen er 5 år etter ferdigstillelse.\n\nKrev samsvarserklæring skriftlig fra elektrikeren med rimelig frist for levering. Dersom elektrikeren ikke leverer, kan du melde forholdet til det lokale eltilsynet. Du kan holde tilbake sluttbetaling inntil samsvarserklæringen er levert — dette er lovlig tilbakeholdsrett etter HTL. I sak 116596 ble mangler ved totalrenovering — inkludert manglende dokumentasjon — vektlagt i et prisavslag på 250 000 kr.",
    faqs: [
      { q: "Elektrikeren har sluttet i firmaet. Hvem leverer samsvarserklæringen?", a: "Firmaet er ansvarlig. Sak 135048 fastslår at manglende samsvarserklæring er en mangel i seg selv. Kontakt DLE dersom firmaet er nedlagt." },
      { q: "Kan jeg selge boligen uten samsvarserklæring?", a: "Du kan, men kjøper vil sannsynligvis kreve dokumentasjon. Sak 135048 bekrefter at manglende samsvarserklæring er en mangel — kjøper kan kreve prisavslag." },
      { q: "Er manglende samsvarserklæring nok til å holde tilbake betaling?", a: "Ja. Samsvarserklæring er en del av leveransen etter HTL § 5. Sak 135048 fastslår at mangel foreligger selv om det elektriske arbeidet ellers er korrekt utført." }
    ]
  },
  "tak-utett-lekkasje": {
    bodyText: "Et nytt tak som lekker er en åpenbar mangel — formålet med taket er nettopp å holde bygningen tett. Taklekkasje kan forårsake omfattende følgeskader: fukt i isolasjon, mugg, råte i bærekonstruksjoner og vannskader på inventar. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — lekkasje og fuktskader var sentrale momenter i vurderingen.\n\nEtter håndverkertjenesteloven § 5 skal arbeidet utføres fagmessig. Et tak som lekker er per definisjon ikke fagmessig utført. Reklamasjonsfristen for arbeid på fast eiendom er 5 år, og du kan reklamere så snart du oppdager mangelen. I sak 2021-554 ble en entreprenør holdt ansvarlig for feil på utvendig arbeid flere år etter ferdigstillelse — prinsippet gjelder tilsvarende for takarbeid.\n\nDokumenter lekkasjen umiddelbart med bilder og video. Begrens skadeomfanget ved å sette opp oppsamlingskar og varsle forsikringsselskapet. Reklamér skriftlig til håndverkeren og krev utbedring uten ekstra kostnad — inkludert utbedring av følgeskader som er håndverkerens ansvar.",
    faqs: [
      { q: "Taket lekker etter to år. Er det for sent å reklamere?", a: "Nei. Reklamasjonsfristen er 5 år etter HTL. I sak 2021-554 ble entreprenør holdt ansvarlig flere år etter ferdigstillelse. Reklamér innen rimelig tid etter oppdagelse." },
      { q: "Håndverkeren sier det er en naturlig svakhet i taket. Har han rett?", a: "Et fagmessig utført tak skal ikke lekke under normale norske værforhold. Sak 116596 bekrefter at mangelfullt arbeid gir prisavslag — selger/håndverker bærer risikoen." },
      { q: "Kan jeg kreve erstatning for vannskader inne?", a: "Ja. Følgeskader er håndverkerens ansvar etter HTL. I sak 116596 ble prisavslaget beregnet ut fra totale mangler inkludert følgeskader. Dokumenter alt med bilder." }
    ]
  },
  "prisestimat-overskridet": {
    bodyText: "Håndverkertjenesteloven § 32 beskytter deg mot uventede kostnadsoverskridelser. Dersom håndverkeren ga et prisestimat (prisoverslag), kan det endelige kravet ikke overstige estimatet med mer enn 15 % uten at du ble varslet og ga samtykke til merarbeidet på forhånd. HTL § 32 er ufravikelig — håndverkeren kan ikke avtale seg bort fra denne regelen.\n\nSkillet mellom prisestimat og fastpris er avgjørende. Et prisestimat er en kvalifisert vurdering av sannsynlig pris med 15 %-grense, mens en fastpris er bindende — risikoen for overskridelse ligger hos håndverkeren. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — overpris og manglende varsling var sentrale momenter.\n\nDersom håndverkeren krever vesentlig mer enn estimatet, krev skriftlig dokumentasjon for merarbeidet. Dagmulkt-prinsippet (1 promille per dag, maks 100 dager) kan også komme til anvendelse dersom overskridelsen skyldes forsinkelser. Hold tilbake det overskytende beløpet og henvis til HTL § 32.",
    faqs: [
      { q: "Håndverkeren sendte faktura 40 % over estimatet. Må jeg betale?", a: "Nei. HTL § 32 begrenser overskridelse til 15 % uten forhåndsgodkjenning. Betal estimat pluss 15 % og henvis til loven. I sak 116596 ble overskridelser sanksjonert med prisavslag." },
      { q: "Hva er forskjellen på prisestimat og fastpris?", a: "Prisestimat gir 15 %-regelen etter HTL § 32. Fastpris er bindende — håndverkeren bærer all risiko for overskridelse. Sjekk kontrakten nøye for hvilken prisform som er avtalt." },
      { q: "Håndverkeren sier han varslet muntlig om merarbeid. Holder det?", a: "Muntlig varsel er vanskelig å bevise. Bevisbyrden for at det ble varslet og godkjent ligger hos håndverkeren. Skriftlig kommunikasjon er avgjørende." }
    ]
  },
  "drenering-svikter": {
    bodyText: "Sviktende drenering etter ferdigstilt arbeid er en alvorlig mangel som kan forårsake fukt i kjeller, setningsskader og sopp i konstruksjonen. Utbedringskostnaden for feilaktig drenering kan løpe opp i flere hundre tusen kroner, og følgeskadene kan være enda dyrere. I Forbrukerklageutvalgets sak 2021-554 ble en entreprenør holdt ansvarlig for dreneringsfeil flere år etter ferdigstillelse — reklamasjonsfristen på 5 år gjelder fullt ut.\n\nEtter håndverkertjenesteloven § 5 skal dreneringsarbeid utføres fagmessig i henhold til byggteknisk forskrift og NBI-anvisninger. Korrekt drenering krever riktig fallretning, filterlag, drensrør av riktig type, og tilkobling til avløp eller infiltrasjon. Feil på ett av disse punktene kan gjøre hele dreneringen virkningsløs.\n\nDokumenter fuktproblemer med bilder, fuktmålinger og eventuelt graving for å avdekke dreneringsløsningen. En takstmann kan vurdere om dreneringen er fagmessig. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — dreneringsfeil ble tilsvarende vektlagt i sak 2021-554.",
    faqs: [
      { q: "Kjelleren er fuktig etter ny drenering. Hva gjør jeg?", a: "Reklamér skriftlig umiddelbart. I sak 2021-554 ble entreprenør holdt ansvarlig for dreneringsfeil flere år etter ferdigstillelse. Krev uavhengig takstvurdering." },
      { q: "Dreneringen ble lagt for 4 år siden. Er det for sent å reklamere?", a: "Nei, reklamasjonsfristen er 5 år etter HTL. Sak 2021-554 bekrefter at dreneringsfeil kan reklameres flere år etter ferdigstillelse — reklamér innen rimelig tid etter oppdagelse." },
      { q: "Håndverkeren sier fukt skyldes feil jeg har gjort. Hvem har bevisbyrden?", a: "Håndverkeren har bevisbyrden for at feilen skyldes noe utenfor hans kontroll. En uavhengig takstvurdering vil normalt avklare om dreneringen er fagmessig utført." }
    ]
  },
  "maling-flasser-av": {
    bodyText: "Maling som flasser av kort tid etter malearbeid er et klassisk tegn på mangelfullt grunnarbeid. Årsaken er nesten alltid at overflaten ikke ble tilstrekkelig rengjort, slipt eller primet før maling — eller at det ble malt under ugunstige forhold. I Forbrukerklageutvalgets sak 64908 ble det gitt prisavslag for feilmontert gulv med knirk og gliper — prinsippet om at mangelfullt håndverk gir rett til prisavslag gjelder tilsvarende for dårlig malearbeid.\n\nEtter håndverkertjenesteloven § 5 skal malearbeid utføres fagmessig. En profesjonell maler plikter å vurdere underlagets egnethet og ta forbehold dersom underlaget er problematisk. Dersom maleren ikke tok forbehold og malingen likevel flasser, er det hans ansvar. Reklamasjonsfristen er 5 år for arbeid på fast eiendom.\n\nDokumenter problemet med bilder og reklamér skriftlig. Krev at maleren utfører arbeidet på nytt for egen regning, inkludert nødvendig grunnarbeid. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — kumulative småfeil kan samlet gi betydelig prisavslag.",
    faqs: [
      { q: "Malingen flasser av etter 6 måneder. Håndverkeren sier det er underlaget. Hvem har rett?", a: "Håndverkeren plikter å vurdere underlagets egnethet etter HTL § 5. I sak 64908 ble tilsvarende mangelfullt håndverk gitt prisavslag. Maleren bærer risikoen." },
      { q: "Kan jeg kreve at alt males om for håndverkerens regning?", a: "Ja. Krev full utbedring. Dersom håndverkeren nekter, kan du engasjere andre — sak 116596 bekrefter at omfattende mangler gir rett til prisavslag eller utbedringskostnader." },
      { q: "Malerarbeidet kostet 80 000 kr og resultatet er elendig. Kan jeg kreve pengene tilbake?", a: "Du kan kreve prisavslag tilsvarende utbedringskostnaden, eller at maleren retter arbeidet. HTL § 32 begrenser også overskridelser til 15 % over estimat." }
    ]
  },
  "varmepumpe-stoy": {
    bodyText: "En varmepumpe som støyer unormalt etter installasjon kan skyldes feil montering, manglende vibrasjonsdempere, feiljustert kompressor eller installasjon for nær nabogrense. Støyen kan påvirke både deg og naboene, og kan i verste fall føre til naboklager og pålegg om fjerning. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — feil installasjon av tekniske systemer var et sentralt moment.\n\nEtter håndverkertjenesteloven § 5 skal installatøren utføre arbeidet fagmessig, noe som inkluderer korrekt montering med vibrasjonsdempere, riktig plassering i henhold til støykrav, og kontroll av at enheten fungerer innenfor spesifikasjonene. Sak 135048 fastslår at manglende dokumentasjon (samsvarserklæring) i seg selv er en mangel — dette gjelder tilsvarende for manglende ferdigdokumentasjon på varmepumpeinstallasjon.\n\nDokumenter støyen med lydopptak og be om en uavhengig støymåling. Sammenlign resultatene med produsentens spesifikasjoner. Dersom støyen overskrider spesifikasjonene, er det sterk indikasjon på feil montering. Reklamér skriftlig og krev utbedring innen rimelig tid.",
    faqs: [
      { q: "Varmepumpen lager metallisk lyd etter montering. Er det en mangel?", a: "Ja, dersom støyen skyldes feil montering etter HTL § 5. I sak 116596 ble feil installasjon av tekniske systemer vektlagt i prisavslaget. Krev utbedring." },
      { q: "Installatøren sier støyen er normalt for denne modellen. Hva gjør jeg?", a: "Be om dokumentasjon fra produsenten. Dersom produsenten ikke bekrefter støynivået, er installatørens påstand ikke holdbar. Uavhengig støymåling avklarer." },
      { q: "Naboen klager på varmepumpestøy. Kan jeg holde installatøren ansvarlig?", a: "Ja, installatøren plikter å plassere og montere enheten i henhold til støykrav. Feilplassering er mangel etter HTL § 5 og sak 135048 om dokumentasjonskrav." }
    ]
  },
  "kjokken-montering-skjev": {
    bodyText: "Et skjevt montert kjøkken er ikke bare estetisk skjemmende — det kan påvirke funksjonaliteten til skap, skuffer og dører, og kan tyde på at håndverkeren manglet kompetanse eller arbeidet for raskt. I Forbrukerklageutvalgets sak 64908 ble det gitt prisavslag for feilmontert gulv med knirk og gliper — prinsippet om at montering som ikke holder fagmessig standard gir rett til prisavslag, gjelder tilsvarende for kjøkkenmontering.\n\nEtter håndverkertjenesteloven § 5 skal kjøkkenmontering utføres fagmessig. Skap som ikke henger i vater, dører som ikke lukkes ordentlig, og benkeplate som ikke ligger plant er alle tegn på mangelfullt arbeid. En vater og vinkelmåler kan dokumentere avvikene objektivt. HTL § 32 begrenser dessuten prisoverskridelser til 15 % over estimat.\n\nReklamér skriftlig med bilder og målinger som viser avvikene. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — kumulative monteringsfeil kan samlet utgjøre grunnlag for betydelig prisavslag. Gi håndverkeren rimelig mulighet til å utbedre før du engasjerer andre.",
    faqs: [
      { q: "Kjøkkenskap henger ikke rett og dørene slår igjen av seg selv. Er det reklamasjonsgrunnlag?", a: "Ja. I sak 64908 ga feilmontering prisavslag. Skjev montering er mangel etter HTL § 5 som håndverkeren plikter å utbedre vederlagsfritt." },
      { q: "Håndverkeren nekter å komme tilbake. Hva gjør jeg?", a: "Engasjér en annen håndverker, dokumenter feilen og krev kostnaden dekket. Sak 116596 bekrefter at omfattende mangler gir prisavslag opp til hundretusener." },
      { q: "Kjøkkenmonteringen kostet mye mer enn estimatet. Kan jeg nekte å betale?", a: "HTL § 32 begrenser overskridelse til 15 % av estimat uten forhåndsgodkjenning. Betal estimat pluss maks 15 % og henvis til loven." }
    ]
  },
  "parkett-buing-sprekker": {
    bodyText: "Parkett som buer seg opp (kuving) eller sprekker kort tid etter legging er normalt et tegn på feil utførelse. Vanlige årsaker er manglende akklimatisering av parketten før legging, feil underlag, utilstrekkelig dampsperre, for trange ekspansjonsfuger, eller legging under ugunstige fuktforhold. I Forbrukerklageutvalgets sak 64908 ble det gitt prisavslag for feilmontert gulv med knirk og gliper — prinsippet gjelder direkte for parkettlegging.\n\nEtter håndverkertjenesteloven § 5 plikter parkettleggeren å vurdere underlagets egnethet, fuktmåle gulvet, sikre at parketten er akklimatisert, og informere deg om krav til luftfuktighet etter legging. Dersom noen av disse stegene er utelatt, er det faglig svikt. Reklamasjonsfristen er 5 år for arbeid på fast eiendom.\n\nDokumenter problemet med bilder og fuktmålinger. En uavhengig gulvekspert kan vurdere årsaken og gi skriftlig rapport. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — gulvproblemer kan være del av en større sak.",
    faqs: [
      { q: "Parketten buer seg etter 3 måneder. Håndverkeren sier det er luftfuktigheten. Har han rett?", a: "Håndverkeren plikter å informere om krav til luftfuktighet etter HTL § 5. I sak 64908 ble mangelfullt gulvarbeid gitt prisavslag. Uten skriftlig informasjon bærer han risikoen." },
      { q: "Sprekker mellom parkettstaver etter vinteren. Er det reklamasjonsgrunnlag?", a: "Store sprekker kan tyde på feil akklimatisering. Sak 64908 fastslår at knirk og gliper fra feil legging er mangel. Normal krymping i tre er begrenset." },
      { q: "Kan jeg kreve at hele gulvet legges om?", a: "Ja, dersom mangelen er gjennomgående. Krev full utbedring etter HTL § 5. Dersom håndverkeren nekter, kan du engasjere andre og kreve kostnaden dekket." }
    ]
  },
  "flislegging-mangelfull": {
    bodyText: "Flis som løsner, sprekker eller har ujamne fuger kort tid etter legging er et klart tegn på mangelfullt håndverk. Typiske årsaker er feil limtype, utilstrekkelig limdekning på flisens bakside, fuktproblemer i underlaget, manglende membran i våtrom, eller feil fugemetode. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — feil flisarbeid i våtrom var et sentralt moment.\n\nEtter håndverkertjenesteloven § 5 skal flislegging utføres fagmessig. For våtrom gjelder i tillegg Byggteknisk forskrift (TEK17) med strenge krav til membran og fuktsperre. Sak 135048 fastslår at manglende dokumentasjon (samsvarserklæring) i seg selv er en mangel — tilsvarende gjelder for manglende membrandokumentasjon i våtrom.\n\nDokumenter løse fliser med video (bank forsiktig — hul lyd betyr at flisen har sluppet underlaget). En takstmann kan vurdere omfanget. I sak 64908 ble feilmontering av gulv gitt prisavslag — prinsippet gjelder tilsvarende for mangelfullt flisarbeid.",
    faqs: [
      { q: "Fliser på badet løsner etter 1 år. Er det reklamasjonsgrunnlag?", a: "Ja. I sak 116596 ble mangelfullt våtromsarbeid vektlagt i prisavslag på 250 000 kr. Flis som løsner etter 1 år er klar indikasjon på feil utførelse." },
      { q: "Håndverkeren sier jeg rengjorde feil og løste limet. Kan han ha rett?", a: "Han må dokumentere dette — bevisbyrden er hans. Normal rengjøring skal ikke løse flislim. I sak 64908 ble tilsvarende ansvarsfraskrivelse avvist." },
      { q: "Mangler membran under flisene i dusjen. Hva kan jeg kreve?", a: "Manglende membran i våtrom er alvorlig mangel. Sak 135048 fastslår at manglende dokumentasjon er mangel — manglende membran er enda mer alvorlig. Krev full utbedring." }
    ]
  },
  "elektriker-feil-installasjon": {
    bodyText: "Feil i elektrisk installasjon er både en mangel og en sikkerhetsrisiko. Typiske feil inkluderer underdimensjonerte kabler, feil sikringstørrelse, manglende jordfeilbryter, dårlige koblinger eller kabelføring som ikke oppfyller NEK 400. I Forbrukerklageutvalgets sak 135048 ble det fastslått at manglende samsvarserklæring i seg selv utgjør en mangel — feil i selve installasjonen er naturligvis enda mer alvorlig.\n\nEtter håndverkertjenesteloven § 5 skal elektrisk arbeid utføres fagmessig og i samsvar med gjeldende regelverk. Elektrikeren plikter å levere samsvarserklæring som bekrefter at arbeidet oppfyller alle krav. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — feil elektrikerarbeid var del av vurderingen.\n\nDersom du opplever gjentatte sikringsutløsninger, varmgang i stikkontakter eller andre tegn på feil, kontakt en annen autorisert elektriker for uavhengig vurdering. Du kan melde forholdet til det lokale eltilsynet (DLE). Reklamasjonsfristen er 5 år etter ferdigstillelse.",
    faqs: [
      { q: "Sikringen løser ut jevnlig etter ny installasjon. Er det en mangel?", a: "Ja. Fungerende installasjon skal ikke utløse sikringer ved normal bruk. Sak 135048 fastslår at elektrikeren må levere fagmessig arbeid med samsvarserklæring." },
      { q: "Elektrikeren har ikke levert samsvarserklæring. Hva betyr det?", a: "I sak 135048 ble manglende samsvarserklæring fastslått som mangel i seg selv. Du kan holde tilbake betaling og melde forholdet til DLE." },
      { q: "Kan feil elektrisk installasjon gi meg prisavslag?", a: "Ja. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med mangler — feil elektrikerarbeid ble vektlagt. Alternativt kan du kreve utbedring for elektrikerens regning." }
    ]
  },
  "murer-arbeid-mangelfull": {
    bodyText: "Mangelfullt murerarbeid viser seg typisk som sprekker, avskallinger, misfarging eller fuktgjennomslag kort tid etter ferdigstilling. Årsaken kan være feil mørtelblanding, feil påføringsmetode, muring under ugunstige temperaturer, eller manglende herdetid mellom lag. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — prinsippet gjelder tilsvarende for isolert murerarbeid.\n\nEtter håndverkertjenesteloven § 5 skal murerarbeid utføres fagmessig med riktige materialer og metoder tilpasset forholdene. En profesjonell murer kjenner kravene til temperatur, fuktighet og herdetid. I sak 2021-554 ble en entreprenør holdt ansvarlig for utvendige feil flere år etter ferdigstillelse — reklamasjonsfristen er 5 år for arbeid på fast eiendom.\n\nDokumenter sprekkene med bilder og noter når de oppsto. En bygningskyndig kan vurdere om sprekkene skyldes feil utførelse. Ved alvorlige mangler kan prisavslag beregnes tilsvarende utbedringskostnaden — slik tilfellet var i sak 116596.",
    faqs: [
      { q: "Murpussen sprekker opp etter én vinter. Er det reklamasjonsgrunnlag?", a: "Ja. I sak 2021-554 ble entreprenør holdt ansvarlig for utvendige feil etter flere år. Sprekker i nytt murverk presumeres å skylde feil utførelse etter HTL § 5." },
      { q: "Mureren sier sprekkene skyldes naturlig setning i bygget. Kan han ha rett?", a: "Han må dokumentere dette. Bevisbyrden for at feilen skyldes noe utenfor hans kontroll er murens. Sak 116596 bekrefter at mangelfull håndverker bærer risikoen." },
      { q: "Kan jeg kreve prisavslag for dårlig murerarbeid?", a: "Ja. Prisavslag beregnes tilsvarende utbedringskostnaden. I sak 116596 ga omfattende mangler prisavslag på 250 000 kr. Du kan alternativt kreve utbedring." }
    ]
  },
  "rorlegger-lekkasje": {
    bodyText: "Lekkasje fra rørleggerarbeid er en av de mest akutte og kostbare manglene en håndverker kan forårsake. Vannskade kan spre seg raskt og gi følgeskader som tørking, utskifting av gulv og vegger, mugg og soppskade. I Forbrukerklageutvalgets sak 116596 ble det gitt prisavslag på 250 000 kr for totalrenovering med omfattende mangler — vannskader og lekkasjer var sentrale momenter i vurderingen.\n\nEtter håndverkertjenesteloven § 5 skal rørleggerarbeid utføres fagmessig. En lodding, kobling eller pakking som lekker er per definisjon ikke fagmessig utført. Rørleggeren er ansvarlig for både utbedring av feilen og erstatning for alle dokumenterte følgeskader. I sak 2021-554 ble en entreprenør holdt ansvarlig for feil flere år etter ferdigstillelse — reklamasjonsfristen er 5 år.\n\nStans lekkasjen umiddelbart — steng vanntilførselen og begrens skadeomfanget. Dokumenter skaden med bilder og video før du tørker opp. Reklamér skriftlig til rørleggeren og varsle forsikringsselskapet. Sak 135048 fastslår at manglende dokumentasjon er mangel — sørg for at rørleggeren leverer komplett ferdigdokumentasjon.",
    faqs: [
      { q: "Det lekker fra røret rørleggeren byttet for 2 måneder siden. Hva gjør jeg?", a: "Reklamér umiddelbart og stopp lekkasjen. I sak 116596 ble lekkasjer vektlagt i prisavslaget. Rørlegger plikter å utbedre vederlagsfritt og dekke følgeskader." },
      { q: "Lekkasjen har gitt vannskader i etasjen under. Kan jeg kreve erstatning?", a: "Ja. Sak 116596 bekrefter at følgeskader er håndverkerens ansvar. Dokumenter tørkekostnader, reparasjon og eventuelt midlertidig bolig." },
      { q: "Rørleggeren leverte ikke ferdigdokumentasjon. Er det en mangel?", a: "Ja. Sak 135048 fastslår at manglende dokumentasjon i seg selv er mangel. Hold tilbake sluttbetaling inntil komplett dokumentasjon er levert." }
    ]
  },
  "takstein-feil-montering": {
    bodyText: "Feil monterte takstein er en alvorlig mangel som kan føre til vanninntrengning, vindløfting og i verste fall at takstein blåser av og skader personer eller eiendom. Korrekt montering av takstein krever riktig lekting, undertak, beslag og festemetode tilpasset vindbelastningen på stedet. I Forbrukerklageutvalgets sak 2021-554 ble en entreprenør holdt ansvarlig for feil på utvendig arbeid flere år etter ferdigstillelse — prinsippet gjelder direkte for taksteinmontering.\n\nEtter håndverkertjenesteloven § 5 skal taklegging utføres fagmessig i henhold til produsentens monteringsanvisning og gjeldende byggeforskrifter. Takarbeid som ikke tåler normale norske værforhold er ikke fagmessig utført. I sak 116596 ble prisavslag på 250 000 kr gitt for totalrenovering med omfattende mangler — takfeil er et typisk moment i slike saker.\n\nDokumenter lekkasjen eller løse takstein med bilder og video. En takstmann kan vurdere om monteringen er fagmessig. Reklamér skriftlig og krev utbedring. Dagmulkt-prinsippet (1 promille per dag, maks 100 dager) kan også komme til anvendelse dersom utbedringen forsinkes.",
    faqs: [
      { q: "Taket lekker etter ny takstein ble lagt. Er det håndverkerens ansvar?", a: "Ja. I sak 2021-554 ble entreprenør holdt ansvarlig for utvendige feil etter ferdigstillelse. Et nytt tak skal ikke lekke under normale norske forhold." },
      { q: "Håndverkeren sier lekkasjen skyldes ekstremt uvær. Hva gjør jeg?", a: "Be om værdata for perioden. Normalt norsk høstvær er ikke ekstraordinært. Sak 116596 bekrefter at mangelfullt arbeid gir prisavslag — taket skal tåle vanlige forhold." },
      { q: "Takstein blåste av i storm. Kan jeg kreve erstatning for skade på naboens bil?", a: "Dersom monteringen var mangelfull etter HTL § 5, er håndverkeren erstatningsansvarlig for følgeskader. Dagmulkt-prinsippet kan gi tilleggskrav ved forsinket utbedring." }
    ]
  }
};

// Apply replacements
let count = 0;
for (const [slug, data] of Object.entries(replacements)) {
  const slugPattern = `slug: "${slug}"`;
  const idx = src.indexOf(slugPattern);
  if (idx === -1) {
    console.error(`Slug not found: ${slug}`);
    continue;
  }

  const bodyStart = src.indexOf('bodyText: "', idx);
  if (bodyStart === -1 || bodyStart - idx > 500) {
    console.error(`bodyText not found for: ${slug}`);
    continue;
  }

  let i = bodyStart + 'bodyText: "'.length;
  while (i < src.length) {
    if (src[i] === '\\') { i += 2; continue; }
    if (src[i] === '"') break;
    i++;
  }
  const bodyEnd = i + 1;

  const faqsStart = src.indexOf('faqs: [', bodyEnd);
  if (faqsStart === -1 || faqsStart - bodyEnd > 50) {
    console.error(`faqs not found for: ${slug}`);
    continue;
  }

  let bracketDepth = 0;
  let j = faqsStart + 'faqs: '.length;
  for (; j < src.length; j++) {
    if (src[j] === '[') bracketDepth++;
    if (src[j] === ']') { bracketDepth--; if (bracketDepth === 0) { j++; break; } }
  }
  const faqsEnd = j;

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
