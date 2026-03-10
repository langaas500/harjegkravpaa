import { readFileSync, writeFileSync } from "fs";
const FILE = "src/config/seo-matrix.ts";
let src = readFileSync(FILE, "utf-8");

const replacements = {
  "mc-ulovlig-trimmet": {
    bodyText: "Å kjøpe en motorsykkel som viser seg å være ulovlig trimmet uten at dette ble opplyst om, er et alvorlig kjøpsrettslig problem. Ulovlig trimming kan gjøre MC-en uregistrerbar, uforsikringsbar og ulovlig å kjøre på vei. I Forbrukerklageutvalgets sak 2022-122 ble kjøp av MC hevet nettopp fordi motorsykkelen var ulovlig trimmet uten at kjøper var informert — dette er svik som gir umiddelbar hevingsrett.\n\nEtter kjøpsloven § 18 foreligger mangel dersom selger har gitt uriktige opplysninger eller holdt tilbake informasjon kjøper hadde grunn til å forvente. Ulovlig trimming er informasjon selger plikter å opplyse om. Sak 2022-122 viser at terskelen for heving er lav når MC-en ikke lovlig kan brukes til sitt formål.\n\nFå en verkstedrapport som dokumenterer trimmingen og omfanget. Kontakt Statens vegvesen for å avklare om MC-en kan tilbakeføres til lovlig stand. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "MC-en er trimmet men selger sa den var original. Kan jeg heve kjøpet?", a: "Ja. I sak 2022-122 ble MC-kjøp hevet pga. ulovlig trimming som ikke var opplyst. Ulovlig trimming som gjør MC-en ulovlig å kjøre er vesentlig mangel med hevingsrett." },
      { q: "Kan jeg lovliggjøre MC-en og kreve kostnadene av selger?", a: "Ja, du kan kreve utbedringskostnadene dekket. Men sak 2022-122 viser at heving ofte er enklere — særlig dersom tilbakeføring er kostbar eller umulig." },
      { q: "Trimmet MC uten at det er registrert hos Vegvesenet. Kan jeg bli straffet?", a: "Du kan ikke straffes for noe du ikke visste om. Men når du har fått kunnskap, må du slutte å kjøre den på vei inntil den er lovliggjort. Reklamér innen 2 måneder jf. Rt. 2007 s. 1274." }
    ]
  },
  "mc-motorbank-ulyd": {
    bodyText: "Motorbank eller ulyd fra en MC-motor er et bekymringsfullt tegn som kan indikere alt fra slitte ventiler og kamkjede til alvorlige lagerskader. Motorskader på MC kan koste fra 5 000 kr for enkle justeringer til 30 000+ kr for lagerskifte eller motoroverhaul. I Forbrukerklageutvalgets sak 2022-811 ble defekt girkasse på MC regnet som vesentlig mangel — prinsippet gjelder tilsvarende for alvorlige motorskader som gir banking.\n\nEtter kjøpsloven § 39 presumeres feil som viser seg kort tid etter kjøpet å ha eksistert ved overlevering. En motor som banker etter noen dagers bruk har med all sannsynlighet hatt latente skader ved salget. Selger kan ikke avvise reklamasjonen med henvisning til at MC-motorer alltid lager litt lyd — unormal banking er en klar mangel.\n\nFå en MC-mekaniker til å lytte på motoren og gi en skriftlig vurdering av lydkilden og estimert utbedringskostnad. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen. Ved høye utbedringskostnader relativt til kjøpesummen er heving aktuelt.",
    faqs: [
      { q: "Motoren tikker på kald motor. Er det normalt?", a: "Noe ventiltikking på kald motor kan være normalt for visse MC-typer. Men kraftig banking som ikke forsvinner ved driftstemperatur er en mangel. Sak 2022-811 bekrefter at alvorlige mekaniske feil er vesentlig mangel." },
      { q: "Selger sier motorlyd er 'sjarm' på denne MC-typen. Har han rett?", a: "Noen MC-er har karakteristisk motorlyd, men unormal banking er en mangel etter KL § 39. Sammenlign med tilsvarende MC-er — avvikende lyd gir reklamasjonsrett." },
      { q: "Verkstedet sier motoren trenger full overhaul. Kan jeg heve kjøpet?", a: "Ja. Dersom overhaul-kostnaden er vesentlig i forhold til kjøpesummen, oppfylles vesentlighetskravet for heving etter KL § 39. Sak 2022-811 bekrefter prinsippet for MC." }
    ]
  },
  "mc-simmerringer-lekkasje": {
    bodyText: "Simmerringer i MC-ens forgaffel og dempere sørger for at olje holdes inne i dempersystemet. Lekkende simmerringer fører til dårligere demping, oljeflekkete gaffelrør og potensielt farlige kjøreegenskaper. Utbedring koster typisk 3 000–8 000 kr avhengig av MC-type. Selv om simmerringer er slitedeler, forventes det at de er i akseptabel stand ved levering — synlig lekkasje skal opplyses om.\n\nEtter kjøpsloven § 17 foreligger mangel dersom MC-en ikke har de egenskaper kjøper hadde grunn til å forvente. Lekkende simmerringer er en synlig defekt som selger burde ha oppdaget og opplyst om. I sak 2021-443 ga skjulte fysiske defekter på MC rett til umiddelbar heving — lekkende simmerringer er en tilsvarende skjult mangel dersom de ikke ble opplyst om.\n\nDokumenter lekkasjen med bilder av oljerester på gaffelrør. Få verkstedrapport som bekrefter at lekkasjen var til stede ved kjøpet. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Forgaffelen lekker litt olje. Er det nok til å reklamere?", a: "Ja, enhver lekkasje er en mangel som skal opplyses om. Sak 2021-443 bekrefter at skjulte fysiske defekter gir sterk reklamasjonsrett, selv for slitedeler." },
      { q: "Selger sier simmerringer er slitedeler og mitt ansvar. Stemmer det?", a: "Slitedeler skal være i akseptabel stand ved levering. Lekkende simmerringer som ikke ble opplyst om er selgers ansvar. Rt. 2007 s. 1274 gir 2 måneder reklamasjonsfrist." },
      { q: "Kan lekkende simmerringer være farlig?", a: "Ja, olje på gaffelrør kan sprute på bremseskive eller dekk og redusere bremsekraft og veigrep drastisk. Det er et sikkerhetsanliggende som styrker reklamasjonskravet." }
    ]
  },
  "mc-elektrisk-feil": {
    bodyText: "Elektriske feil på MC kan manifestere seg som startproblemer, lyssvikt, uregelmessig tenning, defekte instrumenter eller sporadisk strømtap. Slike feil er vanskelige å diagnostisere og kan koste 3 000–15 000 kr å utbedre. I Forbrukerklageutvalgets sak 2022-811 ble defekte mekaniske komponenter på MC regnet som vesentlig mangel — prinsippet gjelder tilsvarende for alvorlige elektriske feil.\n\nEtter kjøpsloven § 39 presumeres feil som viser seg kort tid etter kjøpet å ha vært latente ved overlevering. Elektriske feil som viser seg innen de første månedene har med overveiende sannsynlighet eksistert — om enn skjult — ved salget. Sak 2021-443 bekrefter at skjulte defekter på MC gir rett til umiddelbar heving dersom feilen er vesentlig.\n\nFå en MC-elektriker til å feilsøke systematisk og dokumentere funnene skriftlig. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen. Ved sporadiske feil er video-dokumentasjon fra flere anledninger verdifull bevisføring.",
    faqs: [
      { q: "MC-en stopper tilfeldig under kjøring. Er det en mangel?", a: "Ja, sporadisk motorstopp er sikkerhetskritisk og en klar mangel. Sak 2022-811 bekrefter at alvorlige feil på MC er vesentlig mangel. Reklamér umiddelbart." },
      { q: "Lyset flimrer av og på. Er det reklamasjonsgrunnlag?", a: "Ja, ustabilt lys kan skyldes defekt generator eller slitt kabelstamme. Sak 2021-443 viser at skjulte defekter gir rett til umiddelbar heving ved vesentlig mangel." },
      { q: "Elektrisk feil oppstår bare når det regner. Hva gjør jeg?", a: "Fuktrelaterte feil tyder på dårlig tetting eller skadet kablage. Dokumenter sammenhengen med video. Reklamér innen 2 måneder jf. Rt. 2007 s. 1274." }
    ]
  },
  "mc-abs-feil": {
    bodyText: "ABS-systemet (blokkeringsfritt bremsesystem) er sikkerhetsutstyr som hindrer hjulene i å låse seg under hard bremsing. En MC med defekt ABS er farligere å kjøre, spesielt i vått føre og nødsituasjoner. I Forbrukerklageutvalgets sak 2021-443 ble rammeskjevhet på MC ansett som grunnlag for umiddelbar heving — ABS-feil er en tilsvarende alvorlig sikkerhetsmangel som veier tungt i vesentlighetsvurderingen.\n\nEtter kjøpsloven § 17 har MC-en en mangel dersom ABS-systemet ikke fungerer som det skal. ABS er sikkerhetskritisk utstyr som er lovpålagt på nye MC-er fra 2017, og en defekt gir sterk reklamasjonsrett. ABS-reparasjoner kan koste 5 000–20 000 kr avhengig av om det er sensor, pumpe eller styreenhet som er defekt.\n\nDokumenter ABS-feilen med bilder av varsellampe og få verkstedrapport med feilkodeutlesning. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen. Ikke kjør MC-en med defekt ABS — det er farlig og kan svekke forsikringsdekningen.",
    faqs: [
      { q: "ABS-lampen lyser. Er MC-en trygg å kjøre?", a: "Nei, ABS-systemet kan være deaktivert. I sak 2021-443 ga skjulte sikkerhetsdefekter rett til umiddelbar heving. Reklamér umiddelbart og la MC-en stå." },
      { q: "Er defekt ABS nok til å heve kjøpet?", a: "Ja, ABS er sikkerhetskritisk. Sak 2021-443 viser at alvorlige sikkerhetsmangler på MC gir hevingsrett. Kostnaden for ABS-reparasjon (5 000–20 000 kr) styrker kravet." },
      { q: "Selger sier MC-en ikke hadde ABS originalt. Hvordan sjekker jeg?", a: "Sjekk typegodkjenningen eller kontakt importøren med chassisnummer. Dersom ABS fremgår av spesifikasjonene, skal det fungere — jf. KL § 17." }
    ]
  },
  "mc-clutch-sluring": {
    bodyText: "Clutch-sluring på MC betyr at clutchen ikke overfører full motorkraft til bakhjulet — typisk merkbart som at turtallet stiger uten tilsvarende akselerasjon. Clutch er en slitedel, og vurderingen avhenger av MC-ens km-stand og alder: en clutch som slurer på en MC med 5 000 km er klart en mangel, mens sluring på en MC med 50 000 km kan være normal slitasje — med mindre selger opplyste noe annet.\n\nEtter kjøpsloven § 39 presumeres feil som oppstår kort tid etter kjøpet å ha eksistert ved overlevering. I Forbrukerklageutvalgets sak 2022-811 ble defekt girkasse på MC regnet som vesentlig mangel — clutch-sluring som gjør MC-en ubrukelig veier tilsvarende tungt. Clutch-reparasjon koster typisk 4 000–12 000 kr avhengig av MC-type.\n\nDokumenter sluringen med video som viser turtallsavvik ved gass. Få verkstedrapport som vurderer clutch-tilstanden opp mot MC-ens km-stand og forventet levetid. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Clutchen slurer etter 200 km. Selger sier det er normal slitasje. Har han rett?", a: "Nei. Clutch som slurer etter 200 km er unormalt og presumeres å ha vært slitt ved kjøpet jf. KL § 39. Sak 2022-811 bekrefter at mekaniske feil på MC er vesentlig mangel." },
      { q: "Kan jeg kreve ny clutch dekket av selger?", a: "Ja, dersom clutchen var i unormalt dårlig stand for MC-ens km-stand. Rt. 2007 s. 1274 gir 2 måneder reklamasjonsfrist. Krev utbedring med vedlagt verkstedrapport." },
      { q: "MC-en har 40 000 km. Er clutch-sluring da normal slitasje?", a: "Avhenger av MC-typen. Noen clutcher varer 60 000+ km. Selger plikter å opplyse om kjent slitasje. Dersom clutchen var nær slutten av levetiden uten at det ble opplyst, er det mangel." }
    ]
  },
  "mc-startproblemer": {
    bodyText: "En MC som ikke starter pålitelig er ubrukelig og utgjør en mangel. Årsaken kan være alt fra svakt batteri og defekt starter til karburator- eller innsprøytningsproblemer, tenningsfeil eller kompresjonsproblemer. I Forbrukerklageutvalgets sak 2022-811 ble defekte mekaniske komponenter på MC regnet som vesentlig mangel — startproblemer som skyldes underliggende feil faller i samme kategori.\n\nEtter kjøpsloven § 17 har MC-en en mangel dersom den ikke samsvarer med det kjøper hadde grunn til å forvente. En MC skal starte når du trykker på startknappen. Selger kan ikke avvise reklamasjonen med at MC-en er gammel — startproblemer er per definisjon en feil. Sak 2021-443 bekrefter at skjulte defekter på MC gir sterk reklamasjonsrett.\n\nSystematisk feilsøking er nødvendig: sjekk batteri, tenningssystem, kompresjon og drivstoffsystem. Få skriftlig rapport fra MC-verksted og reklamér innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "MC-en starter ikke om morgenen. Selger sier jeg bare må lade batteriet. Holder det?", a: "Et batteri som ikke holder lading er en mangel. Sak 2022-811 bekrefter at defekte komponenter på MC er vesentlig mangel. Krev utbedring for selgers regning." },
      { q: "Startvansker skyldes karburatorfeil ifølge verkstedet. Er det reklamasjonsgrunnlag?", a: "Ja, karburatorfeil som gir startproblemer er en skjult mangel. Sak 2021-443 bekrefter at skjulte defekter på MC gir rett til reklamasjon." },
      { q: "Hvor lang tid har jeg på å reklamere på startproblemer?", a: "Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor rimelig tid. Ved privatkjøp er absolutt frist 2 år. Reklamér skriftlig så snart du oppdager feilen." }
    ]
  },
  "mc-kjolersystem-feil": {
    bodyText: "Overoppheting på MC kan forårsake alvorlig motorskade — deformerte sylindere, sprukket toppakning eller ødelagte ventiler. Motorskade som følge av overoppheting kan koste 10 000–40 000 kr. I Forbrukerklageutvalgets sak 2022-811 ble defekte mekaniske komponenter på MC regnet som vesentlig mangel — kjølesystemfeil som fører til motorskade oppfyller klart vesentlighetskravet.\n\nEtter kjøpsloven § 39 presumeres feil som oppstår kort tid etter kjøpet å ha eksistert ved overlevering. Et kjølesystem som svikter etter noen dager eller uker har med all sannsynlighet hatt latente problemer ved salget — defekt termostat, lekk kjølevæskepumpe, tilstoppet radiator eller sviktende vifte. Selger kan ikke skylde på kjøpers bruk når svikten kommer så raskt.\n\nStopp MC-en umiddelbart dersom temperaturmåleren viser for høyt — videre kjøring kan forverre skaden dramatisk. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid holder. Ved motorskade som følge av overopphetingen kan heving kreves jf. sak 2022-811.",
    faqs: [
      { q: "MC-en koker over etter 20 minutter. Kan jeg heve kjøpet?", a: "Ja, dersom overopphetingen skyldes defekte komponenter. Sak 2022-811 bekrefter at alvorlige mekaniske feil på MC gir hevingsrett. Stopp MC-en og reklamér umiddelbart." },
      { q: "Selger sier jeg bare må sjekke kjølevæsken selv. Er det riktig?", a: "Å sjekke kjølevæskenivå er vedlikehold, men defekt termostat eller pumpe er selgers ansvar. KL § 39 presumerer at feilen forelå ved kjøpet." },
      { q: "Overopphetingen har ødelagt toppakningen. Hvem betaler?", a: "Selger er ansvarlig for følgeskader av mangler som forelå ved kjøpet. Sak 2022-811 bekrefter at alvorlige mekaniske feil er vesentlig mangel med full utbedringsplikt." }
    ]
  },
  "mc-bremser-feil": {
    bodyText: "Bremsesvikt på MC er den mest sikkerhetskritiske mangelen og kan være direkte livsfarlig. Typiske problemer inkluderer svampete bremsefølelse, lekkasje i bremsehydraulikk, slitte bremseklosser under minimum eller defekt ABS-system. I Forbrukerklageutvalgets sak 2021-443 ble det fastslått at alvorlige sikkerhetsmangler på MC gir rett til umiddelbar heving — bremsesvikt er den mest åpenbare sikkerhetsmangelen.\n\nEtter kjøpsloven § 17 er defekte bremser en mangel som gir sterk reklamasjonsrett. Merk: bremseklosser er slitedeler, og vurderingen avhenger av MC-ens km-stand. Klosser med marginal resttykkelse på en MC med lav km-stand er en mangel selger burde opplyst om. Hydraulikklekkasje og defekte skiver er derimot alltid mangel uavhengig av km-stand.\n\nIkke kjør MC-en med defekte bremser. Reklamér umiddelbart skriftlig — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen. Dokumenter symptomene og få verkstedrapport som bekrefter feilens art og estimert utbedringskostnad.",
    faqs: [
      { q: "Bremsene kjennes svampete. Selger sier det er luft i systemet. Er det hans ansvar?", a: "Ja, luft i bremsesystemet er en mangel selger plikter å utbedre. Sak 2021-443 bekrefter at sikkerhetsmangler på MC gir sterk reklamasjonsrett — potensielt heving." },
      { q: "Bremseklossene er nesten utslitte. Er det selgers ansvar?", a: "Avhenger av MC-ens km-stand. Nesten utslitte klosser på en MC med lav km-stand er en mangel selger burde opplyst om. Ved høy km-stand kan det være forventet slitasje." },
      { q: "Kan bremsesvikt gi umiddelbar heving?", a: "Ja. I sak 2021-443 ga alvorlige sikkerhetsdefekter på MC rett til umiddelbar heving. Bremsesvikt er den mest åpenbare sikkerhetsmangelen og oppfyller vesentlighetskravet." }
    ]
  },
  "mc-rammeskjevhet": {
    bodyText: "Rammeskjevhet på MC er en alvorlig mangel som påvirker kjøreegenskaper og sikkerhet fundamentalt. En skjev ramme fører til at MC-en trekker til siden, har ustabilt retningshold og kan gi farlige situasjoner ved høy fart. I Forbrukerklageutvalgets sak 2021-443 ble rammeskjevhet på motorsykkel fastslått som grunnlag for umiddelbar heving — dette er en av de sterkeste prejudikatene for MC-kjøpere.\n\nEtter kjøpsloven § 19 foreligger mangel dersom selger har holdt tilbake opplysninger om kjente skader. Rammeskjevhet skyldes nesten alltid et tidligere velt eller kollisjon som selger ikke opplyste om. Utbedring krever spesialverktøy og er ofte uforholdsmessig dyrt sammenlignet med MC-ens verdi, noe som gjør heving til det naturlige kravet.\n\nFå et MC-verksted med jig (rammemåler) til å dokumentere skjevheten med nøyaktige mål. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen. Sak 2021-443 gir deg et sterkt prejudikat å vise til.",
    faqs: [
      { q: "MC-en trekker til siden. Verkstedet mistenker rammeskjevhet. Hva gjør jeg?", a: "Få skriftlig rapport fra verksted med jig-måling. I sak 2021-443 ga rammeskjevhet rett til umiddelbar heving — dette er et sterkt prejudikat du kan vise til." },
      { q: "Selger nekter for å ha visst om rammeskjevheten. Endrer det min rett?", a: "Nei. Selger er objektivt ansvarlig for skjulte mangler etter KL § 19. Sak 2021-443 ga heving uavhengig av selgers kunnskap." },
      { q: "Kan rammen rettes istedenfor heving?", a: "Rammeretting er mulig men kostbart og ikke alltid trygt. I sak 2021-443 ble heving gitt fordi utbedring var uforholdsmessig. Du kan velge heving over utbedring." }
    ]
  },
  "mc-girkasse-feil": {
    bodyText: "Girkasse som hopper ut av gir eller ikke kan legges inn er en alvorlig mangel som kan være direkte farlig i trafikk. I Forbrukerklageutvalgets sak 2022-811 ble defekt girkasse på MC eksplisitt regnet som vesentlig mangel — dette er et direkte prejudikat for MC-kjøpere med girkasseproblemer.\n\nEtter kjøpsloven § 39 presumeres feil som oppstår kort tid etter kjøpet å ha eksistert ved overlevering. En girkasse som hopper ut av gir etter noen hundre kilometer har med sikkerhet hatt latente slitasjeskader ved salget. Girkassereparasjon på MC krever ofte at motoren deles, noe som gjør det kostbart — typisk 8 000–25 000 kr. Selger kan ikke skylde på kjøpers girskifteteknikk.\n\nDokumenter feilen nøyaktig: hvilke gir er berørt, under hvilke forhold? Få skriftlig rapport fra MC-verksted og reklamér innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen. Sak 2022-811 gir deg et sterkt prejudikat ved krav om heving.",
    faqs: [
      { q: "MC-en hopper ut av 3. gir under akselerasjon. Er det en mangel?", a: "Ja. I sak 2022-811 ble defekt girkasse på MC eksplisitt fastslått som vesentlig mangel. Girkasse som ikke holder gir er en klar defekt selger svarer for." },
      { q: "Kan jeg heve kjøpet pga. girkassefeil?", a: "Ja. Sak 2022-811 bekrefter at defekt girkasse på MC er vesentlig mangel med hevingsrett, særlig når reparasjonskostnaden (8 000–25 000 kr) er høy relativt til kjøpesummen." },
      { q: "Selger sier jeg girskifter feil. Kan han ha rett?", a: "Selger må dokumentere dette. Girkasse som hopper ut av gir er en mekanisk defekt, ikke en brukerfeil. Sak 2022-811 avviste slike ansvarsfraskrivelser. Krev verkstedrapport." }
    ]
  },
  "mc-forgaffel-lekkasje": {
    bodyText: "Oljelekkasje fra forgaffel er et vanlig problem på brukte MC-er, men det er ikke normalt og skal opplyses om ved salg. Lekkende forgaffel gir dårligere demping og kan forårsake olje på bremseskive — et sikkerhetsanliggende. Simmerringskifte i forgaffel koster typisk 3 000–6 000 kr, men dersom gaffelrørene er risset kreves nye rør (5 000–15 000 kr).\n\nEtter kjøpsloven § 17 foreligger mangel dersom MC-en ikke har de egenskaper kjøper hadde grunn til å forvente. Selv om simmerringer er slitedeler, er synlig lekkasje en defekt selger burde oppdaget. I sak 2021-443 ga skjulte fysiske defekter på MC rett til umiddelbar heving — forgaffellekkasje som ikke ble opplyst om er en tilsvarende skjult mangel.\n\nSjekk gaffelrørene for synlige riper og riss — dette er den vanligste årsaken til simmerring-svikt. Dokumenter oljerestene med bilder og få verkstedrapport. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen.",
    faqs: [
      { q: "Forgaffelen lekker olje. Selger sier alle gamle MC-er gjør det. Stemmer det?", a: "Nei. Aktiv lekkasje er en mangel selger plikter å opplyse om. Sak 2021-443 bekrefter at skjulte defekter gir sterk reklamasjonsrett uavhengig av MC-ens alder." },
      { q: "Simmerringer i forgaffelen er dyre å bytte. Kan jeg kreve dette dekket?", a: "Ja, dersom lekkasjen var til stede ved kjøpet. Krev utbedring med vedlagt verkstedkostnadsestimat. Rt. 2007 s. 1274 gir 2 måneder reklamasjonsfrist." },
      { q: "Gaffelrørene er risset. Er det selgers ansvar?", a: "Ja, risset gaffelrør forårsaker simmerring-svikt og er en skjult mangel etter KL § 17. Selger burde oppdaget dette ved en rimelig inspeksjon. Krev utbedring eller prisavslag." }
    ]
  },
  "mc-dekk-utslitt": {
    bodyText: "MC-dekk med profildybde under lovlig minimum (1 mm) ved levering er en sikkerhetskritisk mangel. Utslitte dekk gir drastisk redusert veigrep, spesielt i vått føre, og øker bremselengden vesentlig. Merk at dekk er slitedeler — vurderingen avhenger av hva som var avtalt og MC-ens km-stand: dekk med marginal profil på en MC med lav km-stand er en klar mangel, mens slitte dekk på en MC med høy km-stand kan være forventet slitasje dersom prisen var tilpasset.\n\nEtter kjøpsloven § 17 foreligger mangel dersom MC-en ikke har de egenskaper kjøper hadde grunn til å forvente. Lovlige dekk er en grunnleggende forutsetning. Sjekk også dekkenes alder (DOT-kode) — dekk over 5 år er i praksis utslitte uavhengig av profildybde. I sak 2021-443 ga skjulte sikkerhetsmangler på MC hevingsrett.\n\nMål profildybden og dokumenter med bilder. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 (Støvletthæl-dommen) fastslår at 2 måneder alltid er innenfor fristen. Et sett nye MC-dekk koster typisk 4 000–10 000 kr med montering.",
    faqs: [
      { q: "MC-dekkene var under 1 mm profil da jeg fikk den. Er det en mangel?", a: "Ja, dekk under lovlig minsteprofil er en sikkerhetsmangel. Sak 2021-443 bekrefter at sikkerhetsmangler på MC gir sterk reklamasjonsrett. Selger pliktet å opplyse om dette." },
      { q: "Selger sier dekk er forbruksmateriell og mitt ansvar. Er det riktig?", a: "Nei, ikke ved levering. Dekk som er under minsteprofil ved overtakelse er en mangel uavhengig av at de normalt er forbruksvare. Rt. 2007 s. 1274 gir 2 måneder reklamasjonsfrist." },
      { q: "Dekkene har profil men er 7 år gamle. Er det en mangel?", a: "Ja, MC-dekk over 5 år er i praksis utslitte uavhengig av profil — gummien herder og mister grep. Dersom dette ikke ble opplyst, er det mangel etter KL § 17." }
    ]
  },
  "mc-originaldeler-bytta": {
    bodyText: "Dersom en MC er annonsert som original men viser seg å ha ikke-originale deler — enten mekaniske komponenter eller estetiske deler — er dette brudd på opplysningsplikten. I Forbrukerklageutvalgets sak 2022-122 ble heving gitt pga. ulovlig trimming som ikke var opplyst — prinsippet om at MC-en skal samsvare med det som ble lovet gjelder tilsvarende for originaldeler.\n\nEtter kjøpsloven § 18 foreligger mangel dersom MC-en ikke svarer til opplysningene selger ga. Ikke-originale deler kan påvirke ytelse, holdbarhet, garanti og videresalgsverdi. Sak 2022-811 bekrefter at mekaniske feil og avvik på MC regnes som vesentlig mangel — bytte av vesentlige komponenter uten opplysning faller i samme kategori.\n\nFå et MC-verksted til å identifisere ikke-originale deler med delnumre og sammenligning mot fabrikkspesifikasjoner. Reklamér skriftlig innen rimelig tid — Rt. 2007 s. 1274 fastslår at 2 måneder alltid er innenfor fristen. Prisavslag beregnes ut fra verdiforskjellen mellom original og ikke-original, eller heving dersom avviket er vesentlig.",
    faqs: [
      { q: "Verkstedet oppdaget ikke-originale deler. Selger opplyste ikke. Hva kan jeg kreve?", a: "Prisavslag tilsvarende verditapet, eller heving ved vesentlig avvik. Sak 2022-122 ga heving ved uopplyst trimming — prinsippet gjelder for alle vesentlige avvik fra opplysningene." },
      { q: "Er ettermarkedsdeler alltid en mangel?", a: "Ikke alltid — kvalitetsdeler kan være akseptable dersom opplyst. Men dersom MC-en ble solgt som original og ikke er det, foreligger mangel etter KL § 18 uavhengig av delenes kvalitet." },
      { q: "Selger sa MC-en var original. Eksosen er byttet til ettermarked. Hva gjør jeg?", a: "Uoriginal eksos som ikke ble opplyst er brudd på KL § 18. Sak 2022-122 ga heving for uopplyst trimming. Krev prisavslag tilsvarende verditapet eller heving." }
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
