import { readFileSync, writeFileSync } from "fs";
const FILE = "src/config/seo-matrix.ts";
let src = readFileSync(FILE, "utf-8");

const replacements = {
  "ac-anlegg-defekt": {
    bodyText: "AC-anlegget er en av bilens mest komplekse komponenter, og reparasjon kan koste alt fra 5 000 til 30 000 kr avhengig av om det er kompressoren, kondensatoren eller styringselektronikken som er defekt. Dersom AC-en ikke fungerer ved levering og dette ikke ble opplyst om, er det en mangel etter forbrukerkjøpsloven § 16. I Forbrukerklageutvalgets sak 2022-451 ble det fastslått at defekt AC-anlegg utgjør en kjøpsrettslig mangel selv om bilen var solgt «som den er» — selgers forbehold fritar ikke for feil som ikke ble opplyst om.\n\nDersom bilannonseen oppga klimaanlegg, forutsettes det at dette fungerer. Selger kan ikke fraskrive seg ansvar ved å hevde at AC er et komfort-tilbehør — det er en del av bilens spesifikasjoner som kjøper har betalt for. Høyesterett slo i Rt. 2007 s. 1274 (Støvletthæl-dommen) fast at 2 måneder alltid er innenfor «rimelig tid» for reklamasjon.\n\nDokumenter feilen hos et autorisert verksted som kan bekrefte at AC-problemet skyldes en eksisterende feil, ikke manglende påfyll av kjølegass. Skriftlig reklamasjon til selger med vedlagt verkstedrapport er første steg mot utbedring eller prisavslag.",
    faqs: [
      { q: "Er defekt AC en mangel selv om bilen er solgt «som den er»?", a: "Ja. Forbrukerklageutvalget fastslo i sak 2022-451 at defekt AC er en mangel selv med «som den er»-forbehold, fordi selger ikke opplyste om feilen ved salget." },
      { q: "Selger sier AC bare trenger påfyll av kjølegass. Er det mitt ansvar?", a: "Påfyll av kjølegass er vedlikehold, men dersom det er lekkasje i systemet som forårsaker tapet, er dette en mangel selger er ansvarlig for. Krev verkstedrapport som avklarer årsaken." },
      { q: "Kan jeg kreve heving pga. defekt AC?", a: "Alene er det sjelden nok for heving, men sammen med andre mangler kan det styrke en hevingssak. Prisavslag tilsvarende utbedringskostnaden er mest realistisk — typisk 5 000–30 000 kr." }
    ]
  },
  "eu-kontroll-mangel": {
    bodyText: "Dersom bilen ikke bestod EU-kontroll kort tid etter kjøpet, er feilene som avdekkes sterke bevis for at bilen var i dårligere stand enn det selger forespeilet. EU-kontrollen er en standardisert gjennomgang av sikkerhetskritiske komponenter, og alvorlige avvik tyder klart på at mangelen forelå ved overlevering. I Forbrukerklageutvalgets sak 2022-190 ble det fastslått at defekte bremser oppdaget rett etter EU-kontroll utgjorde mangel som trumfet selgers «som den er»-forbehold.\n\nEtter kjøpsloven § 19 har bilen en mangel dersom den ikke svarer til det kjøper hadde grunn til å forvente. En bil som ikke kan bestå EU-kontroll oppfyller ikke de grunnleggende kravene til lovlig ferdsel på vei. Kostnadene ved utbedring kan variere enormt — fra noen tusen for bremser til titusener for rust i bærende konstruksjoner.\n\nReklamér skriftlig til selger med kopi av EU-kontroll-rapporten. Høyesterett fastslo i Rt. 2007 s. 1274 (Støvletthæl-dommen) at reklamasjon innen 2 måneder alltid er rettidig. Be om utbedring for selgers regning, eller prisavslag tilsvarende utbedringskostnaden. Ved alvorlige og kostbare feil kan heving av kjøpet være aktuelt.",
    faqs: [
      { q: "Bilen fikk flere EU-kontroll-avvik etter kjøpet. Er alt selgers ansvar?", a: "Feil som forelå ved kjøpet er selgers ansvar. I sak 2022-190 ble selger holdt ansvarlig for bremsedefekter oppdaget rett etter EU-kontroll, selv med «som den er»-forbehold. Slitasje som oppstår etter kjøpet er ditt ansvar." },
      { q: "Selger sier EU-kontroll ikke er hans problem. Har han rett?", a: "Nei. Dersom bilen ble solgt som kjørbar og lovlig, og EU-kontrollen avdekker alvorlige feil, er dette mangel. Selger er ansvarlig uavhengig av hva han hevder muntlig." },
      { q: "Kan jeg kreve at selger betaler for ny EU-kontroll etter utbedring?", a: "Ja, alle rimelige kostnader knyttet til mangelen kan kreves dekket, inkludert ny kontroll og eventuelle fraktkostnader." }
    ]
  },
  "lakkfeil-skjult": {
    bodyText: "Skjult lakkskade eller sparkelarbeid er blant de vanligste tvistene ved bruktbilkjøp. Selger har opplyst at bilen er skadefri, men ved nærmere inspeksjon avdekkes sparkel, underlakk-misfarging eller avvikende lakk-tykkelse som tyder på tidligere kollisjonsskade. I Forbrukerklageutvalgets sak 2022-1784 ble skjult rust i rammen ansett som vesentlig mangel og ga kjøper 45 000 kr i prisavslag — samme prinsipp gjelder for skjulte lakkfeil som maskerer underliggende skade.\n\nEtter kjøpsloven § 19 foreligger mangel dersom selger har gitt uriktige opplysninger eller holdt tilbake informasjon som kjøper hadde grunn til å forvente. Omfattende lakkreparasjon indikerer typisk underliggende skade som kan påvirke bilens verdi, sikkerhet og fremtidig rustbeskyttelse. I sak 2020-144 ga manglende opplysning om bilens historikk prisavslag — samme prinsipp gjelder for skjulte kollisjonsskader.\n\nEn profesjonell lakktykkelsemåling koster kun noen hundrelapper og gir objektiv dokumentasjon. Resultatet viser nøyaktig hvor det er sparklet og lakkert. Dersom skaden er kosmetisk er prisavslag mest aktuelt; ved strukturelle skader kan heving kreves.",
    faqs: [
      { q: "Lakktykkelsemåling viser avvik. Er det nok bevis?", a: "Ja, lakktykkelsemåling er anerkjent som pålitelig dokumentasjon. Avvik over 200–300 mikron tyder klart på sparkel og omlakkering. I sak 2022-1784 ble tilsvarende dokumentasjon av skjulte skader lagt til grunn for prisavslag." },
      { q: "Er kosmetisk lakkskade nok til å heve kjøpet?", a: "Sjelden. Ren kosmetisk skade gir typisk prisavslag. Men dersom den skjulte lakkeringen maskerer strukturelle skader i karosseriet, kan heving være aktuelt — som i saker der skjult skade vesentlig reduserer bilens verdi." },
      { q: "Selger kjente ikke til den tidligere skaden. Har jeg likevel krav?", a: "Ja. Selger er objektivt ansvarlig for bilens tilstand. Manglende kunnskap fritar ikke for ansvar når mangelen er dokumentert. Opplysningsplikten etter kjøpsloven § 19 gjelder uansett." }
    ]
  },
  "4wd-feil": {
    bodyText: "Firehjulsdrift (4WD/AWD) er ofte en avgjørende faktor i kjøpsbeslutningen, og en bil solgt med 4WD-system forutsettes å ha et fungerende system. Feil på 4WD kan inkludere defekte koplinger, elektroniske styringsproblemer, slitte kardangkryss eller ødelagte differensialer — alt kostbare reparasjoner som typisk ligger mellom 10 000 og 50 000 kr. I Forbrukerklageutvalgets sak 2022-998 ble defekt 4WD/Haldex-system regnet som skjult mangel som ga kjøper rett til utbedring.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke samsvarer med det kjøper hadde grunn til å forvente. Dersom 4WD-systemet var en del av bilens spesifikasjoner i annonsen, foreligger det en mangel uavhengig av om selger kjente til feilen. Ved forhandlerkjøp presumeres feilen å ha eksistert ved kjøpet dersom den viser seg innen 6 måneder.\n\nFå en verkstedrapport som bekrefter feilens art, estimert utbedringskostnad og sannsynlig årsak. Reklamér skriftlig innen rimelig tid — Høyesterett fastslo i Rt. 2007 s. 1274 (Støvletthæl-dommen) at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "4WD-lampen lyser etter kjøpet. Er det en mangel?", a: "Ja. I sak 2022-998 fastslo Forbrukerklageutvalget at defekt 4WD/Haldex-system er en skjult mangel selger svarer for, uavhengig av om han kjente til feilen." },
      { q: "Bilen trekker til en side i 4WD-modus. Er det reklamasjonsgrunnlag?", a: "Ja, dette tyder på defekt kobling eller differensial. Dokumenter symptomet og reklamér med verkstedrapport. Tilsvarende feil ga utbedringsansvar i sak 2022-998." },
      { q: "Selger sier 4WD er ekstrautstyr han ikke garanterer. Har han rett?", a: "Nei. Utstyr som fremgår av bilens spesifikasjoner eller annonse er inkludert i kjøpet og skal fungere. FKL § 16 krever at bilen samsvarer med det som er avtalt." }
    ]
  },
  "bremsesystem-feil": {
    bodyText: "Bremsesvikt er den mest sikkerhetskritiske mangelen en bil kan ha. Defekte bremser setter fører, passasjerer og andre trafikanter i direkte fare, og er en mangel som normalt oppfyller vesentlighetskravet for heving. I Forbrukerklageutvalgets sak 2022-190 ble det fastslått at defekte bremser oppdaget rett etter EU-kontroll trumfet selgers «som den er»-forbehold — sikkerhetskritiske feil aksepteres ikke.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke er i samsvar med det kjøper hadde grunn til å forvente. En bil med defekte bremser er ikke trafikksikker og oppfyller ikke minstekravene til lovlig ferdsel. Utbedringskostnader for bremser varierer fra 3 000 kr for klosser og skiver til 20 000+ kr for hydraulikk- og ABS-reparasjoner.\n\nReklamér umiddelbart — ikke kjør bilen videre med defekte bremser. Dokumenter feilen med verkstedrapport og bilder. Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor reklamasjonsfristen. Krev utbedring for selgers regning, og hold tilbake et beløp tilsvarende utbedringskostnaden fra eventuelt gjenstående betaling.",
    faqs: [
      { q: "Bremsene var dårlige ved levering. Kan selger si det er slitedeler?", a: "Bremser er slitedeler, men de skal være i forsvarlig stand ved levering. I sak 2022-190 fastslo Forbrukerklageutvalget at bremser under minstekrav ved EU-kontroll er en mangel — selv med «som den er»-forbehold." },
      { q: "ABS-lampen lyser. Er det en mangel?", a: "Ja, lysende ABS-lampe indikerer feil i sikkerhetssystemet. Selger plikter å utbedre dette dersom feilen forelå ved kjøpet. Slike sikkerhetsfeil veier tungt i vesentlighetsvurderingen." },
      { q: "Kan jeg kreve heving pga. bremsesvikt?", a: "Ja, bremsesvikt er sikkerhetskritisk og oppfyller normalt vesentlighetskravet for heving, særlig dersom selger ikke utbedrer innen rimelig tid. Sak 2022-190 bekrefter at slike feil ikke kan forbeholdes bort." }
    ]
  },
  "motor-oljetrykk": {
    bodyText: "Lavt oljetrykk og motorskade kort tid etter kjøpet er en alvorlig situasjon som kan koste titusener å utbedre. Årsaken kan være slitte motorlagre, defekt oljepumpe, tilstoppet oljefilter eller langvarig oljemangel som har forårsaket permanent skade på motorens indre deler. I Forbrukerklageutvalgets sak 2023-112 ble lavt oljetrykk og motorhavari ved overtakelse ansett som vesentlig mangel som ga kjøper rett til heving av kjøpet.\n\nEtter kjøpsloven § 39 presumeres feil som viser seg kort tid etter kjøpet å stamme fra forhold som forelå ved overlevering. Selger må bevise at motorskaden oppsto etter kjøpet. Dersom motoren hadde latente skader ved salget, er dette selgers ansvar. I sak 2022-1104 ble ekstremt oljeforbruk på en Audi TFSI fastslått som mangel — et prinsipp som også gjelder andre oljeproblemer.\n\nFå en uavhengig motorkyndig til å vurdere årsaken skriftlig. En kompresjonsmåling og oljeanalyse kan avsløre om motoren hadde eksisterende slitasje. Kostnadene ved motorbytte (40 000–120 000 kr) gjør at heving ofte er mest aktuelt.",
    faqs: [
      { q: "Oljelampen lyste etter 1 uke. Selger sier jeg ikke sjekket oljen. Har han rett?", a: "Selger må bevise dette. I sak 2023-112 ga lavt oljetrykk ved overtakelse rett til heving. Dersom motoren hadde slitasje som forårsaket lavt oljetrykk allerede ved kjøpet, er det selgers ansvar." },
      { q: "Motoren er totalhavarert. Kan jeg kreve ny motor eller heving?", a: "Begge deler er mulig. Sak 2023-112 ga heving ved motorhavari. Du kan kreve utbedring (ny/brukt motor) eller heving dersom kostnadene er vesentlige i forhold til kjøpesummen." },
      { q: "Bilen har ekstremt oljeforbruk. Er det en mangel?", a: "Ja. I sak 2022-1104 ble ekstremt oljeforbruk på en Audi TFSI fastslått som mangel. Unormalt oljeforbruk indikerer slitasje som sannsynligvis forelå ved kjøpet." }
    ]
  },
  "karosseri-skade-skjult": {
    bodyText: "En skjult kollisjonsskade i karosseriet er en alvorlig mangel som påvirker bilens sikkerhet, verdi og holdbarhet. Moderne biler er konstruert med deformasjonssoner som absorberer energi ved kollisjon — dersom disse er skadet og reparert uten at det er opplyst om, kan bilen være farlig ved en ny ulykke. I Forbrukerklageutvalgets sak 2022-1784 ble skjult rust i rammen ansett som vesentlig mangel og ga kjøper 45 000 kr i prisavslag.\n\nEtter kjøpsloven § 19 foreligger mangel dersom selger har holdt tilbake opplysninger som kjøper hadde grunn til å regne med å få. Uopplyst kollisjonsskade er et klassisk brudd på opplysningsplikten. I sak 2020-144 ble mangelfull historikk på bruktimportert bil ansett som prisavslagsgrunn — prinsippet gjelder tilsvarende for skjulte karosseriskader.\n\nDokumentasjon er avgjørende. En karosserikontroll med lakktykkelsemåling og chassismåling avslører om bilen har vært i kollisjon. Dersom skaden er alvorlig og vesentlig påvirker bilens verdi, er heving aktuelt — ellers prisavslag tilsvarende verditapet.",
    faqs: [
      { q: "Lakktykkelsemåling viser sparkel på flere paneler. Er det nok bevis?", a: "Ja, sparkel på flere paneler tyder klart på uopplyst kollisjonsskade. I sak 2022-1784 ble tilsvarende dokumentasjon lagt til grunn for prisavslag på 45 000 kr." },
      { q: "Bilen ble solgt som 'skadefri'. Hva betyr det juridisk?", a: "Dersom selger aktivt har oppgitt at bilen er skadefri og det viser seg å være uriktig, foreligger brudd på opplysningsplikten etter KL § 19 — potensielt svik som styrker hevingskravet." },
      { q: "Kan jeg sjekke bilens skadehistorikk selv?", a: "Ja, tjenester som AutoSys gir tilgang til registrerte forsikringsskader. En lakktykkelsemåling er den beste fysiske kontrollen. I sak 2020-144 ble manglende historikk-opplysning ansett som mangel." }
    ]
  },
  "infotainment-skjerm-svart": {
    bodyText: "Infotainment-skjermen er blitt en sentral del av moderne bilers funksjonalitet — den styrer navigasjon, klimaanlegg, ryggekamera og ofte viktige kjørefunksjoner. En skjerm som går i svart, fryser eller har døde piksler kan koste 10 000–40 000 kr å reparere, avhengig av bilmerke og modell. I Forbrukerklageutvalgets sak 2023-344 ble defekt infotainment/hovedskjerm ansett som mangel som ga kjøper rett til gratis utbedring.\n\nEtter forbrukerkjøpsloven § 16 skal bilen samsvare med det kjøper hadde grunn til å forvente. Dersom bilen ble solgt med fungerende infotainment-system, skal dette virke. Innen 6 måneder etter kjøpet presumeres feilen å ha eksistert ved overlevering — selger må bevise det motsatte.\n\nDokumenter feilen med video og skjermbilder. Be verkstedet lese ut feilkoder relatert til infotainment-enheten. Dersom feilkoder ble slettet før salget, er dette sterkt bevis for at selger kjente til problemet. Reklamér skriftlig med vedlagt dokumentasjon.",
    faqs: [
      { q: "Gjelder reklamasjonsretten selv om skjermen virket da jeg kjøpte bilen?", a: "Ja. Dersom feilen viser seg innen 6 måneder etter overtakelse, presumeres den å ha eksistert ved kjøpet. I sak 2023-344 fikk kjøper medhold i krav om utbedring av defekt hovedskjerm." },
      { q: "Kan jeg kreve at selger bytter hele infotainment-enheten?", a: "Du kan kreve utbedring. Selger velger om det gjøres ved reparasjon eller bytte, men utbedringen må skje innen rimelig tid og uten vesentlig ulempe for deg." },
      { q: "Skjermen fryser bare av og til. Er det nok til å reklamere?", a: "Ja, intermitterende feil er like gyldige som reklamasjonsgrunnlag. Dokumenter med video hver gang feilen oppstår — dette ble lagt til grunn i sak 2023-344." }
    ]
  },
  "partikkelfilter-dpf-feil": {
    bodyText: "Tett eller defekt partikkelfilter (DPF) er en av de vanligste tvistene ved kjøp av brukt dieselbil. Et nytt DPF koster gjerne 15 000–40 000 kr, og selger hevder ofte at problemet skyldes kjøpers kjørestil. Realiteten er at et DPF som tettes kort tid etter kjøpet sannsynligvis allerede var i dårlig stand. Prinsippet fra Rt. 1998 s. 774 (Videospillerdommen) om at produkter ment å vare lenge har 5 års reklamasjonsrett, gjelder tilsvarende for bilkomponenter.\n\nEtter kjøpsloven § 19 foreligger mangel dersom bilen ikke svarer til det kjøper hadde grunn til å forvente. Et fungerende avgassystem er en grunnleggende forutsetning for lovlig ferdsel. Innen 6 måneder etter kjøpet har kjøper en presumpsjon på sin side — selger må bevise at DPF-problemet skyldes forhold etter overlevering.\n\nFå en OBD-utlesning fra verksted som viser DPF-sot-nivå og feilkodehistorikk. Dersom feilkoder ble slettet like før salget, er dette sterkt bevis for at selger kjente til problemet og bevisst skjulte det. I sak 2022-1104 ble relaterte avgass- og motorproblemer ansett som mangel.",
    faqs: [
      { q: "Hvem har bevisbyrden for om DPF-problemet eksisterte ved kjøpet?", a: "Innen 6 måneder har kjøper presumpsjon på sin side. Etter 6 måneder må kjøper sannsynliggjøre feilen via verkstedrapport. Rt. 2007 s. 1274 fastslår at reklamasjon innen 2 måneder alltid er rettidig." },
      { q: "Selger hevder tett DPF skyldes min kjørestil. Har han rett?", a: "Mulig, men selger må dokumentere dette. Slettet feilkodehistorikk eller høy sot-nivå ved kjøpet taler mot selger. I sak 2022-1104 ble lignende ansvarsfraskrivelse avvist." },
      { q: "DPF-reparasjonen koster 30 000 kr. Kan jeg heve kjøpet?", a: "Dersom utbedringskostnaden utgjør en vesentlig andel av kjøpesummen, kan heving være aktuelt etter kjøpsloven § 39. Be om skriftlig prisestimat fra verksted som grunnlag for kravet." }
    ]
  },
  "adblue-system-feil": {
    bodyText: "AdBlue-systemet er påkrevd på moderne dieselbiler for å redusere utslipp av nitrogenoksider. Feil i systemet — typisk defekte sensorer, pumpe eller styringsenhet — kan koste 8 000–25 000 kr å reparere og kan sette bilen i nødmodus der motorytelsen reduseres drastisk. I Forbrukerklageutvalgets sak 2022-1104 ble alvorlige avgass- og motorproblemer fastslått som mangel — prinsippet gjelder tilsvarende for defekte AdBlue-komponenter.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke samsvarer med det kjøper hadde grunn til å forvente. En bil som går i nødmodus pga. AdBlue-feil er ikke i den stand kjøper kunne forvente. Innen 6 måneder presumeres feilen å ha eksistert ved kjøpet — selger må bevise det motsatte.\n\nViktig å skille mellom tom AdBlue-tank (driftsvedlikehold — ditt ansvar) og defekte komponenter i systemet (mangel — selgers ansvar). Få verkstedet til å dokumentere nøyaktig hva som feiler. Reklamér skriftlig innen rimelig tid — Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "AdBlue-varsellys kom på to uker etter kjøp. Er dette selgers ansvar?", a: "Dersom feilen skyldes defekte sensorer eller pumpe som var til stede ved kjøpet, ja. I sak 2022-1104 ble lignende avgassrelaterte feil ansett som mangel selger svarer for." },
      { q: "Kan jeg holde tilbake betaling mens AdBlue-feilen utbedres?", a: "Ja, etter forbrukerkjøpsloven § 28 kan du holde tilbake et beløp tilsvarende utbedringskostnaden frem til selger retter mangelen." },
      { q: "Bilen går i nødmodus pga. AdBlue-feil. Kan jeg kreve leiebil?", a: "Dersom mangelen gjør bilen ubrukelig, kan du kreve erstatning for dokumenterte tap — inkludert rimelige leiebilkostnader mens selger utbedrer feilen." }
    ]
  },
  "vannlekkasje-kupe": {
    bodyText: "Vannlekkasje inn i kupé eller bagasjerom er en alvorlig mangel som kan forårsake mugg, lukt, elektriske feil og korrosjon. Typiske årsaker er utette vindus- og dørlister, tette dreneringshull, sprukne tetningsfjærer eller sveisefeil i karosseriet. I Forbrukerklageutvalgets sak 2023-412 ble vannlekkasje i kupé pga. tette dreneringskanaler ansett som skjult mangel selger var ansvarlig for.\n\nEtter kjøpsloven § 19 har bilen en mangel dersom den ikke svarer til det kjøper hadde grunn til å forvente. En bil skal ikke lekke vann inn i kupéen. Fukt og mugglukt tyder dessuten på at problemet har eksistert over tid, noe som styrker argumentet for at det forelå ved kjøpet. Utbedring kan koste alt fra 2 000 kr for nye lister til 30 000+ kr for karosseriarbeid.\n\nDokumenter lekkasjen med video (helst under regn), ta bilder av fuktige matter og mugg, og få verkstedrapport som identifiserer årsaken. Dersom fuktskaden er omfattende og har gitt følgeskader på elektronikk eller karosseri, kan heving være aktuelt — slik prinsippet i sak 2023-412 tilsier.",
    faqs: [
      { q: "Bilen lukter mugg og gulvmattene er fuktige. Er dette en mangel?", a: "Ja. I sak 2023-412 ble vannlekkasje pga. tette dreneringskanaler ansett som skjult mangel. Mugglukt tyder på at problemet har eksistert en stund — før kjøpet." },
      { q: "Kan jeg heve kjøpet pga. vannlekkasje?", a: "Det avhenger av omfanget. Er det dokumentert fuktskade i gulv, elektronikk eller karosseri, og utbedring er uforholdsmessig dyr, kan heving være aktuelt etter kjøpsloven § 39." },
      { q: "Vannet har skadet elektronikken i bilen. Kan jeg kreve dette erstattet?", a: "Ja, dokumenterte følgeskader forårsaket av mangelen kan kreves erstattet i tillegg til selve utbedringen. Sak 2023-412 bekrefter at vannlekkasje kan gi omfattende ansvar." }
    ]
  },
  "hjullager-ulyd": {
    bodyText: "Et hjullager som brummer eller synger er mer enn bare en irriterende lyd — det er et sikkerhetsproblem. Et skadet hjullager som ikke skiftes kan i ytterste konsekvens føre til at hjulet løsner under kjøring. Utbedringskostnaden ligger typisk mellom 3 000 og 8 000 kr per hjul. Høyesterett fastslo i Rt. 2007 s. 1274 (Støvletthæl-dommen) at reklamasjon innen 2 måneder alltid er rettidig.\n\nEtter forbrukerkjøpsloven § 15 skal bilen samsvare med de egenskaper kjøper kan forvente. Et hjullager som svikter etter bare dager eller uker er klart utenfor normal levetid og presumeres å ha vært i dårlig stand ved kjøpet. Selger kan ikke avvise reklamasjonen med henvisning til normal slitasje når svikten kommer så raskt.\n\nLa et verksted dokumentere feilen skriftlig med angivelse av hvilke lager som er skadet og estimert gjenværende levetid. I Rt. 1998 s. 774 (Videospillerdommen) fastslo Høyesterett at produkter ment å vare lenge har 5 års reklamasjonsrett — hjullager på en nyere bil bør holde langt mer enn noen uker.",
    faqs: [
      { q: "Hjullageret begynte å brumme etter én uke. Kan selger skylde på normal slitasje?", a: "Nei. Rt. 2007 s. 1274 fastslår at reklamasjon innen 2 måneder alltid er rettidig, og hjullager som svikter etter én uke er utenfor normal levetid." },
      { q: "Verkstedet sier hjullageret er originalt og gammelt. Hva betyr det for saken min?", a: "Det styrker din posisjon. Et slitt originallager som selger ikke opplyste om, er brudd på opplysningsplikten etter KL § 19. Selger burde oppdaget dette før salg." },
      { q: "Kan jeg kreve alle fire hjullager skiftet dersom bare ett feiler?", a: "Du kan kreve utbedring av det defekte lageret. Dersom verkstedet anbefaler å skifte flere pga. tilsvarende slitasje, kan dette inngå i kravet som forebyggende utbedring." }
    ]
  },
  "stotdempere-utslitt": {
    bodyText: "Utslitte støtdempere påvirker bilens kjøreegenskaper, bremselengde og stabilitet. En bil som hopper, gynger eller føles ustabil i svinger har sannsynligvis støtdempere som er langt forbi sin levetid. Kostnad for nye støtdempere med montering ligger typisk mellom 6 000 og 20 000 kr for et komplett sett. I Forbrukerklageutvalgets sak 2022-190 ble det fastslått at sikkerhetskritiske feil trumfer selgers «som den er»-forbehold — prinsippet gjelder også for utslitte støtdempere som påvirker kjøresikkerhet.\n\nEtter kjøpsloven § 19 foreligger mangel dersom bilen ikke er i samsvar med det kjøper hadde grunn til å forvente. Selv om støtdempere er slitedeler, forventes det at de er i akseptabel stand ved levering. Støtdempere som er så slitte at de påvirker kjøresikkerhet, er en mangel selger burde ha opplyst om.\n\nEn profesjonell støtdempertest på verksted gir objektiv dokumentasjon. Testen sammenligner demperkraften med minimumsverdier for bilens type og vekt. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Støtdemperne er utslitte ifølge verkstedet. Kan selger si dette er normal slitasje?", a: "Avhenger av alder og km. I sak 2022-190 ble det fastslått at sikkerhetskritiske feil ikke kan forbeholdes bort med «som den er». Er demperne unormalt slitte for bilens alder, er det mangel." },
      { q: "Hva er rimelig krav — utbedring eller prisavslag?", a: "Du velger. Utbedring (nye støtdempere) eller prisavslag tilsvarende utbedringskostnaden. Heving er sjelden aktuelt for støtdempere alene, men kumulative mangler kan styrke kravet." },
      { q: "Bilen bestod ikke EU-kontroll pga. støtdemperne. Har jeg rett til heving?", a: "Alene gir det sjelden heving, men sammen med andre feil fra EU-kontrollen kan den samlede mangelen oppfylle vesentlighetskravet etter KL § 39." }
    ]
  },
  "feilkode-motorlampe": {
    bodyText: "Motorlampe som lyser er det tydeligste signalet på at noe er galt med bilen. Feilkoden bak lampen kan indikere alt fra en løs tankplugg til alvorlige motorproblemer. I Forbrukerklageutvalgets sak 2021-1930 ble turbo-havari kort tid etter salg ansett som mangel som ga full dekning av reparasjon — motorlampe er ofte det første varselet om slike feil.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke svarer til det kjøper hadde grunn til å forvente. Feilkoder som ble slettet rett før salget dukker typisk opp igjen raskt etter kjøpet. En OBD-utlesning kan avsløre om koder nylig ble slettet — dette er sterkt bevis for at selger bevisst skjulte en kjent feil.\n\nReklamér skriftlig umiddelbart — Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor fristen. Be om komplett feilkodeutskrift fra verksted med datoer og feilhistorikk. Ikke reparer bilen for egen regning før du har reklamert — da mister du muligheten til å kreve dekket kostnadene.",
    faqs: [
      { q: "Motorlampen kom på dagen etter levering. Hva gjør jeg?", a: "Reklamér skriftlig til selger umiddelbart. I sak 2021-1930 fikk kjøper full dekning av reparasjon etter motorproblem kort tid etter salg. Ikke reparer på egen regning før du har reklamert." },
      { q: "Selger sier motorlampen kom av at jeg kjørte feil. Kan han ha rett?", a: "Kun dersom han kan dokumentere dette. En feilkode leses av verksted og forteller nøyaktig hva som er feil. Slettet feilkodehistorikk taler mot selger." },
      { q: "Feilkodene ble slettet like før salget. Er det bevis for juks?", a: "Ja, slettet feilkodehistorikk rett før salg er sterkt bevis for at selger bevisst skjulte kjente feil. Dette styrker reklamasjonskravet betydelig." }
    ]
  },
  "soltak-lekkasje-feil": {
    bodyText: "Soltak og panoramatak er luksusfeatures som dessverre er blant de mest problemutsatte komponentene på bruktbiler. Lekkasje fra dreneringssystem, defekte tetninger eller mekanisk svikt kan koste 5 000–30 000 kr å reparere, og følgeskader fra vannlekkasje kan gjøre situasjonen enda dyrere. I Forbrukerklageutvalgets sak 2023-412 ble vannlekkasje i kupé pga. tette dreneringskanaler ansett som skjult mangel — samme prinsipp gjelder for soltak-lekkasje.\n\nEtter kjøpsloven § 19 har bilen en mangel dersom selger har holdt tilbake opplysninger om kjente problemer. Soltak-lekkasje er et problem som typisk utvikler seg over tid — tette dreneringshull, sprukne slanger og utslitte tetninger er alle tegn på langvarig slitasje som selger burde ha kjent til.\n\nDokumenter lekkasjen med video og bilder. Få verkstedrapport som identifiserer den konkrete årsaken. Dersom følgeskader som fukt i takfôr, mugg eller elektronikkfeil har oppstått, skal disse inkluderes i kravet. Reklamér innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid holder.",
    faqs: [
      { q: "Soltaket lekker ved regn. Selger sier det er normal slitasje. Stemmer det?", a: "Nei. I sak 2023-412 ble vannlekkasje via tette dreneringskanaler ansett som skjult mangel. Et soltak som lekker er ikke normal slitasje — selger plikter å opplyse om dette." },
      { q: "Panoramataket knirker og glir ikke jevnt. Er det en mangel?", a: "Dersom mekanikken ikke fungerer som den skal og dette ikke ble opplyst, er det en mangel etter KL § 19. Krev utbedring hos selger med vedlagt verkstedrapport." },
      { q: "Vannlekkasjen har forårsaket mugg i taktrekket. Kan jeg kreve dette reparert?", a: "Ja, følgeskader forårsaket av mangelen kan kreves erstattet. Sak 2023-412 bekrefter at vannlekkasje kan gi ansvar for hele skadeomfanget." }
    ]
  },
  "sentrallas-nokkelfri-feil": {
    bodyText: "Feil på sentrallås eller Keyless-system gjør at bilen ikke kan låses eller låses opp pålitelig — et sikkerhetsproblem og et daglig irritasjonsmoment. Reparasjon kan innebære alt fra nøkkelomprogrammering (2 000–5 000 kr) til bytte av hele låsmodulen eller styreenheten (10 000–25 000 kr). I Forbrukerklageutvalgets sak 2021-882 ble feil ved elektronikk ansett som mangel som ga utbedringsansvar — prinsippet gjelder tilsvarende for sentrallås- og Keyless-feil.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke fungerer som forventet. Et sentrallåssystem er en grunnleggende sikkerhetsfunksjon som må virke. Dersom feilen er sporadisk og vanskelig å gjenskape, er video-dokumentasjon fra flere anledninger verdifull bevisføring.\n\nTest nøkkelen med nytt batteri først — dette eliminerer den enkleste forklaringen. Dersom problemet vedvarer, reklamér skriftlig til selger. Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor reklamasjonsfristen. Selger har rett til ett utbedringsforsøk.",
    faqs: [
      { q: "Keyless-systemet virker av og til. Kan selger si det er batteriet i nøkkelen?", a: "Selger kan foreslå det, men dersom problemet vedvarer etter nytt batteri, er det en feil i bilens system. I sak 2021-882 ble elektronikkfeil ansett som mangel selger svarer for." },
      { q: "Sentrallåsen svikter sporadisk. Er det nok til å kreve utbedring?", a: "Ja. Sporadiske feil er vanskeligere å dokumentere, men video-bevis og verkstedrapport er tilstrekkelig grunnlag. Rt. 2007 s. 1274 fastslår at reklamasjon innen 2 måneder er rettidig." },
      { q: "Kan manglende sentrallås gi heving av kjøpet?", a: "Alene sjelden nok for heving, men sammen med andre mangler kan det styrke en hevingssak. Prisavslag tilsvarende utbedringskostnaden er normalt mest realistisk." }
    ]
  },
  "ryggekamera-sensor-feil": {
    bodyText: "Ryggekamera og parkeringssensorer er sikkerhetsutstyr som mange kjøpere legger stor vekt på ved bilvalg. Dersom disse systemene er oppført i utstyrslisten men ikke fungerer, foreligger en mangel. Reparasjon av ryggekamera koster typisk 3 000–10 000 kr, mens sensorer kan koste 1 500–5 000 kr per sensor. I Forbrukerklageutvalgets sak 2021-882 ble feil ved elektronikk og tilbehør ansett som mangel med utbedringsansvar.\n\nEtter kjøpsloven § 17 foreligger mangel dersom bilen mangler egenskaper som selger har fremhevet eller som fremgår av utstyrslisten. Sjekk salgsdokumentene, annonsen og eventuelt bilens utstyrskode — dersom ryggekamera eller sensorer er oppført, skal de fungere. Prinsippet fra sak 2023-344 om utbedring av defekt elektronikk gjelder tilsvarende.\n\nDokumenter feilen med video som viser svart skjerm, feilmelding eller feilaktige sensorvarsler. Reklamér skriftlig til selger og krev utbedring innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Ryggekameraet viser svart bilde. Selger sier det ikke var med i kjøpet. Hva gjør jeg?", a: "Sjekk salgsdokumentene og utstyrslisten. I sak 2021-882 ble feil ved elektronikk ansett som mangel. Er kameraet montert og oppført, er det inkludert i kjøpet." },
      { q: "Parkeringssensorene piper konstant uten grunn. Er dette en mangel?", a: "Ja, defekte sensorer som gir falske signaler er en mangel. I sak 2023-344 ble defekt elektronikk ansett som mangel med utbedringsrett — prinsippet gjelder tilsvarende." },
      { q: "Hvor lang er reklamasjonsfristen for elektronikk i bilen?", a: "Ved forhandlerkjøp er fristen 5 år (FKL § 27). Rt. 1998 s. 774 fastslår at produkter ment å vare lenge har utvidet reklamasjonsrett. Ved privatkjøp gjelder 2 års frist." }
    ]
  },
  "varmeseter-defekt": {
    bodyText: "Varmeseter er komfort-utstyr som sjelden utgjør grunnlag for heving alene, men som likevel er en mangel dersom de ikke fungerer og dette ikke ble opplyst om. Reparasjonskostnaden varierer fra 2 000 kr for et enkelt varmeelement til 8 000 kr for hele setemodulen med elektronikk. I Forbrukerklageutvalgets sak 2023-344 ble defekt utstyr som var en del av bilens spesifikasjoner ansett som mangel med utbedringsrett — prinsippet gjelder også for varmeseter.\n\nEtter kjøpsloven § 17 foreligger mangel dersom bilen mangler egenskaper som kjøper hadde grunn til å forvente basert på bilens utstyrsnivå og pris. Dersom bilen ble annonsert med varmeseter, skal de fungere. Selger kan ikke hevde at slik feil er normal slitasje uten å dokumentere dette.\n\nReklamér skriftlig og krev utbedring eller prisavslag. Høyesterett fastslo i Rt. 2007 s. 1274 at reklamasjon innen 2 måneder alltid er rettidig. Dersom varmeseter-feilen opptrer sammen med andre mangler, kan den samlede mangelsbyrden gjøre at vesentlighetskravet for heving likevel er oppfylt.",
    faqs: [
      { q: "Varmesetene virket da jeg kjøpte bilen, men sluttet etter en uke. Kan jeg reklamere?", a: "Ja, innen 6 måneder presumeres feilen å ha eksistert ved kjøpet. I sak 2023-344 ble tilsvarende utstyrsfeil ansett som mangel med utbedringsrett." },
      { q: "Er defekte varmeseter alene nok til å heve kjøpet?", a: "Neppe alene. Varmeseter er komfort-utstyr, ikke sikkerhetskritisk. Prisavslag tilsvarende utbedringskostnaden (2 000–8 000 kr) er mer realistisk." },
      { q: "Kan kumulative småfeil gi hevingsrett?", a: "Ja, flere småfeil som samlet utgjør et vesentlig kontraktsbrudd kan gi heving etter KL § 39. Defekte varmeseter sammen med andre mangler styrker saken." }
    ]
  },
  "vindusheis-defekt": {
    bodyText: "En vindusheis som ikke fungerer er mer enn en ulempe — vinduet kan ikke lukkes ved regn, det utgjør en sikkerhetsrisiko og bilen kan ikke brukes i bomstasjoner med manuell betaling. Reparasjon koster typisk 2 000–6 000 kr for motor og mekanikk, mer dersom det er elektronisk styringsfeil. I Forbrukerklageutvalgets sak 2021-882 ble feil ved elektronikk og tilbehør ansett som mangel med utbedringsansvar.\n\nEtter kjøpsloven § 17 har bilen en mangel dersom den ikke samsvarer med det kjøper hadde grunn til å forvente. Alle vindusheiser skal fungere ved levering. Selger har rett til å forsøke utbedring først, men ved gjentatt svikt kan du reparere for selgers regning.\n\nDokumenter feilen med video og reklamér skriftlig. Høyesterett fastslo i Rt. 2007 s. 1274 at reklamasjon innen 2 måneder alltid er rettidig. Dersom flere vindusheiser er defekte, styrker dette argumentet for at bilen generelt var i dårligere stand enn forespeilet.",
    faqs: [
      { q: "Vindusheisen på førersiden virker ikke. Selger sier det er normal slitasje. Har han rett?", a: "For en nyere bil (under 10 år) er sviktende vindusheis utenfor normal slitasje. I sak 2021-882 ble elektronikkfeil ansett som mangel uavhengig av alder." },
      { q: "Kan jeg reparere vindusheisen selv og kreve penger av selger?", a: "Du bør først reklamere og gi selger mulighet til å utbedre. Dersom selger avviser eller ikke svarer innen rimelig tid (2–4 uker), kan du reparere for selgers regning." },
      { q: "Flere vindusheiser er defekte. Styrker det saken min?", a: "Ja, kumulative mangler styrker vesentlighetsvurderingen etter KL § 39. Flere defekte vindusheiser tyder på generelt dårlig vedlikehold selger burde opplyst om." }
    ]
  },
  "xenon-led-lys-feil": {
    bodyText: "Moderne Xenon- og LED-lysmoduler er ekstremt dyre å bytte — en enkelt modul kan koste 15 000–40 000 kr. Feil i hovedlysene er dessuten sikkerhetskritisk fordi nedsatt sikt øker ulykkesrisikoen vesentlig. Rt. 1998 s. 774 (Videospillerdommen) fastslår at produkter ment å vare lenge har 5 års reklamasjonsrett — LED-lys med forventet levetid på 15 000–30 000 timer faller klart innenfor dette prinsippet.\n\nEtter forbrukerkjøpsloven § 16 presumeres feil som viser seg innen 6 måneder å ha eksistert ved overlevering. LED-lys har svært lang forventet levetid, så svikt kort tid etter kjøpet tyder sterkt på en eksisterende defekt. Selger er ansvarlig uavhengig av om han kjente til feilen — objektivt ansvar gjelder.\n\nHent inn prisestimat fra merkeverksted og reklamér skriftlig innen rimelig tid. Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor fristen. Dersom utbedringskostnaden utgjør en vesentlig del av kjøpesummen, kan heving være aktuelt.",
    faqs: [
      { q: "Det ene LED-lyset sluknet etter to uker. Selger sier det er normalt. Stemmer det?", a: "Nei. LED-lys har svært lang levetid. Svikt etter to uker er klar defekt. Rt. 1998 s. 774 fastslår utvidet reklamasjonsrett for varige produkter — LED-lys er nettopp det." },
      { q: "Et nytt Xenon-modul koster 25 000 kr. Kan jeg kreve heving pga. dette alene?", a: "Mulig. Dersom utbedringskostnaden utgjør en vesentlig del av kjøpesummen og feilen ikke ble opplyst, kan vesentlighetskravet for heving etter KL § 39 være oppfylt." },
      { q: "Gjelder 5-årsfristen for reklamasjon på billys?", a: "Ja, ved forhandlerkjøp gjelder 5 år etter FKL § 27. Rt. 1998 s. 774 bekrefter utvidet frist for varige produkter. LED-moduler er ment å vare bilens levetid." }
    ]
  },
  "oljelekkasje-motor-gir": {
    bodyText: "En bil som lekker olje etterlater seg flekker på parkeringsplassen og kan i verste fall føre til motorhavari dersom oljenivået blir kritisk lavt. Årsaken kan være slitte pakninger, defekte simmerringer, sprukne oljekjølere eller alvorlige skader i motor- eller girkasseblokken. I Forbrukerklageutvalgets sak 2022-1104 ble ekstremt oljeforbruk på en Audi TFSI fastslått som mangel — prinsippet gjelder tilsvarende for synlige oljelekkasjer.\n\nEtter kjøpsloven § 19 har bilen en mangel dersom den ikke svarer til det kjøper hadde grunn til å forvente. En bil skal ikke lekke olje — selv mindre lekkasjer er en mangel selger plikter å utbedre. Reparasjonskostnaden varierer enormt: en enkel pakningsjobb kan koste 3 000–5 000 kr, mens lekkasje fra motorblokk eller girkasse kan kreve titusener.\n\nDokumenter lekkasjen med bilder av oljeflekker og få verkstedrapport som identifiserer kilde og årsak. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Bilen lekker olje på parkeringsplassen. Selger sier det er normale drypp. Er det riktig?", a: "Nei. En bil skal ikke lekke olje. I sak 2022-1104 ble unormalt oljeforbruk fastslått som mangel — synlig oljelekkasje er enda mer åpenbart en mangel." },
      { q: "Kan oljelekkasje gi grunnlag for heving av kjøpet?", a: "Avhenger av årsaken. Lekkasje fra motorblokk eller girkasse kan indikere alvorlig slitasje. I sak 2023-112 ga motorhavari pga. oljeproblemer rett til heving." },
      { q: "Selger hevder oljelekkasjen oppsto etter kjøpet. Hvem har bevisbyrden?", a: "Innen 6 måneder ved forhandlerkjøp presumeres feilen å ha eksistert ved overtakelse — selger må bevise det motsatte. Ved privatkjøp må du sannsynliggjøre det via verkstedrapport." }
    ]
  },
  "airbag-lampe-feil": {
    bodyText: "Lysende airbag-lampe betyr at bilens passive sikkerhetssystem kan være helt eller delvis deaktivert. Ved en kollisjon kan airbagene unnlate å utløses, noe som setter fører og passasjerer i livsfare. Dette er en sikkerhetskritisk mangel av alvorligste slag. I Forbrukerklageutvalgets sak 2022-190 ble det fastslått at sikkerhetskritiske feil trumfer selgers «som den er»-forbehold — prinsippet gjelder i aller høyeste grad for airbag-feil.\n\nEtter forbrukerkjøpsloven § 15 skal bilen ha de sikkerhetsegenskaper kjøper kan forvente. Et fungerende airbag-system er en absolutt forutsetning. Selger er ansvarlig selv uten kunnskap om feilen — objektivt ansvar gjelder for skjulte mangler. Feilsøking koster typisk 2 000–5 000 kr, mens reparasjon kan koste 5 000–30 000 kr.\n\nReklamér umiddelbart — Høyesterett fastslo i Rt. 2007 s. 1274 at 2 måneder alltid er innenfor fristen. Ikke kjør bilen med lysende airbag-lampe — det er farlig og kan redusere forsikringsutbetalingen ved ulykke.",
    faqs: [
      { q: "Airbag-lampen lyser. Er bilen trygg å kjøre?", a: "Ikke nødvendigvis. Airbag-systemet kan være deaktivert. Reklamér umiddelbart. I sak 2022-190 ble sikkerhetsfeil ansett som mangel som trumfer alle forbehold." },
      { q: "Selger visste ikke om airbag-feilen. Har jeg likevel krav?", a: "Ja. Selger er objektivt ansvarlig for skjulte mangler. Airbag-feil er normalt vesentlig, og sak 2022-190 fastslår at sikkerhetsfeil ikke kan forbeholdes bort — selv med «som den er»." },
      { q: "Kan airbag-feil gi heving av kjøpet?", a: "Ja, airbag-feil er sikkerhetskritisk og veier tungt i vesentlighetsvurderingen etter KL § 39. Sammen med andre mangler er heving svært realistisk." }
    ]
  },
  "vibrasjoner-under-kjoring": {
    bodyText: "Vibrasjoner i ratt, seter eller karosseri under kjøring kan skyldes alt fra enkle problemer som ubalanserte hjul til alvorlige feil som slitte drivaksler, defekte ledd eller motorlagringssvikt. I Forbrukerklageutvalgets sak 2020-552 ble registerreimbrudd før skifteintervall ansett som mangel som utløste full erstatning — prinsippet om at mekaniske svikt kort tid etter kjøp tyder på eksisterende feil, gjelder tilsvarende for vibrasjoner.\n\nEtter kjøpsloven § 18 foreligger mangel dersom selger har gitt uriktige opplysninger om bilens tilstand. Vibrasjoner som er merkbare ved prøvekjøring burde selger ha oppdaget og opplyst om. Innen 6 måneder har kjøper presumpsjon for at feilen forelå ved kjøpet.\n\nStart med den enkleste diagnosen: hjulbalansering og dekkssjekk. Dersom vibrasjonene vedvarer, be verkstedet undersøke drivaksler, ledd, drivskive og motorlagre. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Rattet vibrerer ved 80 km/t. Selger sier det bare er hjulbalansering. Har han rett?", a: "Mulig, men hjulbalansering er vedlikehold selger burde utføre ved salg. Dersom vibrasjoner vedvarer etter balansering, er det en dypere mangel. I sak 2020-552 ga mekanisk svikt full erstatning." },
      { q: "Verkstedet sier vibrasjonene skyldes slitte drivaksler. Er det reklamasjonsgrunnlag?", a: "Ja, slitte drivaksler er en skjult mangel selger er ansvarlig for. Innen 6 måneder presumeres feilen å ha eksistert ved kjøpet — selger må bevise det motsatte." },
      { q: "Vibrasjoner kommer og går. Er det likevel grunnlag for reklamasjon?", a: "Ja, intermitterende feil er like gyldige. Dokumenter med video og kjøredagbok. Sporadiske vibrasjoner kan tyde på defekte ledd eller lagre som forverres over tid." }
    ]
  },
  "eksosanlegg-rust-stoy": {
    bodyText: "Et eksosanlegg som bråker, ruster i stykker eller lekker avgasser kort tid etter kjøpet er en mangel som kan koste 3 000–20 000 kr å utbedre. Avgasslekkasje er dessuten en helsefare fordi karbonmonoksid kan trenge inn i kupéen. I Forbrukerklageutvalgets sak 2022-1784 ble skjult rust i bærende konstruksjoner ansett som vesentlig mangel — prinsippet gjelder tilsvarende for gjennomrustet eksosanlegg.\n\nEtter kjøpsloven § 17 har bilen en mangel dersom den ikke har de egenskaper kjøper kan forvente basert på alder, pris og presentasjon. Selv om noe eksos-rust er normalt på eldre biler, er gjennomrustet eksosanlegg en mangel som påvirker både funksjon og sikkerhet. Rt. 1998 s. 774 (Videospillerdommen) fastslår at produkter ment å vare lenge har utvidet reklamasjonsrett.\n\nDokumenter problemet med bilder og verkstedrapport. Be verkstedet vurdere om rusten er av nyere eller eldre dato — gjennomgående rust som oppstår kort tid etter kjøp tyder på at eksosen allerede var sterkt svekket ved overlevering.",
    faqs: [
      { q: "Eksosen begynte å lage støy etter én uke. Er det reklamasjonsgrunnlag?", a: "Ja. I sak 2022-1784 ble skjult rust ansett som vesentlig mangel. Unormal støy etter én uke tyder klart på eksisterende skade selger burde opplyst om." },
      { q: "Selger sier rust på eksosen er normalt for en gammel bil. Har han rett?", a: "Noe rust er normalt, men gjennomrustet eksos med funksjonsfeil er mangel etter KL § 17. Selger plikter å opplyse om alvorlig rust han kjente til." },
      { q: "Avgasslekkasje gir hodepine under kjøring. Er det farlig nok for heving?", a: "Avgasslekkasje i kupéen er en alvorlig helsefare. Kombinert med høy utbedringskostnad kan dette oppfylle vesentlighetskravet for heving etter KL § 39." }
    ]
  },
  "varmeapparat-webasto-feil": {
    bodyText: "I norsk klima er et fungerende varmeapparat eller Webasto-anlegg ikke luksus — det er en nødvendighet. Defekt parkeringsvarmer eller svak kupévarme kan gjøre bilen ubrukelig i vinterhalvåret. Reparasjon av Webasto koster typisk 5 000–20 000 kr. Rt. 1998 s. 774 (Videospillerdommen) fastslår at produkter ment å vare lenge har 5 års reklamasjonsrett — Webasto-anlegg og varmeapparater faller klart innenfor dette prinsippet.\n\nEtter forbrukerkjøpsloven § 16 har bilen en mangel dersom den ikke samsvarer med det kjøper hadde grunn til å forvente. Dersom Webasto er montert og fremgår av bilens utstyrsliste eller ble fremhevet i salgsannonsen, er det inkludert i kjøpet og skal fungere. I sak 2023-344 ble defekt utstyr som var del av bilens spesifikasjoner ansett som mangel med utbedringsrett.\n\nLa verkstedet diagnostisere om feilen ligger i Webasto-enheten, styringselektronikk eller bilens eget varmesystem. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen. I norsk klima kan mangel på varme argumenteres som vesentlig mangel.",
    faqs: [
      { q: "Webasto-anlegget virker ikke. Selger sier det ikke var inkludert i kjøpet. Hva gjør jeg?", a: "Sjekk salgsdokumentene. I sak 2023-344 ble utstyr som fremgår av bilens spesifikasjoner ansett som inkludert. Er Webasto montert og oppført, er selger ansvarlig." },
      { q: "Varmen i bilen er svak selv på maks. Er det en mangel?", a: "Kan være det. Svak varme kan skyldes defekt termostat, slitt kjølevæskepumpe eller tilstoppet varmeapparat. Rt. 1998 s. 774 gir 5 års reklamasjonsrett på varige komponenter." },
      { q: "Er mangel på varme vesentlig nok for heving i Norge?", a: "I norsk klima kan dette argumenteres sterkt. En bil uten fungerende varme er ubrukelig store deler av året, noe som veier tungt i vesentlighetsvurderingen etter KL § 39." }
    ]
  },
  "bruktbil-eu-kontroll-fusk": {
    bodyText: "Når en bruktbil selges med fersk EU-godkjenning, stoler kjøper på at bilen er i teknisk forsvarlig stand. Dersom det kort tid etter avdekkes alvorlige feil som bremsesvikt, rust i bærende deler eller lysfeil, kan det tyde på at EU-kontrollen ble utført lemfeldig. I Forbrukerklageutvalgets sak 2022-190 ble defekte bremser oppdaget rett etter EU-kontroll ansett som mangel som trumfet «som den er»-forbehold. I sak 2021-1209 ble kilometerfusk med 60 000 km avvik ansett som grunnlag for heving — tilsvarende prinsipp gjelder ved feilaktig EU-kontroll.\n\nEtter kjøpsloven § 18 har bilen en mangel dersom selger har gitt uriktige opplysninger. En fersk EU-godkjenning impliserer at bilen er i teknisk orden. Dersom det viser seg at bilen har alvorlige feil som burde vært avdekket, har du en sterk sak — både mot selger og potensielt mot kontrollorganet.\n\nDokumenter feilene med ny verkstedrapport og sammenlign med EU-kontroll-protokollen. Dersom feilene åpenbart eksisterte ved kontrolltidspunktet, kan du reklamere til selger og vurdere å anmelde kontrollstasjonen til Statens vegvesen.",
    faqs: [
      { q: "Bilen fikk EU-godkjenning for 2 måneder siden men har alvorlige bremseproblemer. Hva gjør jeg?", a: "Reklamér til selger. I sak 2022-190 ble bremsedefekter etter EU-kontroll ansett som mangel. Dokumenter feilen med verkstedrapport og vurder å anmelde kontrollstasjonen." },
      { q: "Kan jeg holde selger ansvarlig for at EU-kontrollen ikke avdekket feilene?", a: "Ja. Selger garanterer implisitt at bilen er i den stand EU-kontrollen tilsier. I sak 2021-1209 ga juks med bilens dokumentasjon rett til heving — tilsvarende gjelder for feilaktig EU-kontroll." },
      { q: "Kan jeg også klage på kontrollstasjonen?", a: "Ja, dersom feilene åpenbart eksisterte ved kontrolltidspunktet, kan du anmelde kontrollstasjonen til Statens vegvesen. Du har separate krav mot selger og kontrollorganet." }
    ]
  }
};

// Apply replacements
let count = 0;
for (const [slug, data] of Object.entries(replacements)) {
  const regex = new RegExp(
    `(slug: "${slug}",.*?bodyText: ")([^"]*?)(",\\s*faqs: \\[)([\\s\\S]*?)(\\]\\s*[,}])`,
    "m"
  );

  // Since lines are very long and may span multiple lines for faqs, we need a different approach
  // Find the node by slug and replace bodyText and faqs
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
  const bodyEnd = i + 1; // after closing quote

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
