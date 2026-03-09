export interface SeoNode {
  slug: string;
  title: string;
  lawRef: string;
  cat: "bilkjop" | "flyreiser" | "mc-kjop" | "handverkere";
  desc: string;
  faqs?: { q: string; a: string }[];
}

export const SEO_NODES: SeoNode[] = [
  // BILKJØP (40 noder) — URL: /bilkjop/[slug]
  { slug: "girkasse-havari", title: "Heve bilkjøp pga defekt girkasse", lawRef: "FKL § 32 / KL § 39", cat: "bilkjop", desc: "Girkasse-havari regnes som vesentlig mangel etter forbrukerkjøpsloven dersom feilen forelå ved kjøpet." },
  { slug: "registerreim-brudd", title: "Krav ved registerreim-brudd på bruktbil", lawRef: "FKL § 16", cat: "bilkjop", desc: "Registerreim-brudd innen rimelig tid etter kjøp er et klart tegn på skjult mangel." },
  { slug: "skjult-rust-skade", title: "Heve kjøp pga skjult rust i ramme", lawRef: "KL § 19", cat: "bilkjop", desc: "Skjult rust i bærende konstruksjoner er vesentlig mangel som gir hevingsrett." },
  { slug: "kilometerfusk", title: "Rettigheter ved kilometerfusk på bruktbil", lawRef: "KL § 18", cat: "bilkjop", desc: "Manipulert kilometerstand er svik og gir rett til heving og erstatning." },
  { slug: "elbil-batteri-degradert", title: "Dårlig batterikapasitet (lav SOH) på brukt elbil", lawRef: "FKL § 15", cat: "bilkjop", desc: "Batteriet skal holde annonsert rekkevidde. Vesentlig avvik er reklamasjonsgrunnlag." },
  { slug: "turbo-defekt", title: "Heve bilkjøp etter turbo-havari", lawRef: "KL § 39", cat: "bilkjop", desc: "Turbo-havari kort tid etter kjøp er presumpsjon for mangel ved overlevering." },
  { slug: "toppakning-defekt", title: "Defekt toppakning på bruktbil: Hev kjøpet", lawRef: "KL § 39", cat: "bilkjop", desc: "Defekt toppakning er kostbar og alvorlig mangel med klar hevingsrett." },
  { slug: "clutch-utslitt", title: "Klage på utslitt clutch ved levering", lawRef: "KL § 17", cat: "bilkjop", desc: "Unormalt slitt clutch som ikke ble opplyst om er skjult mangel." },
  { slug: "luftfjaring-defekt", title: "Reklamasjon på defekt luftfjæring", lawRef: "FKL § 16", cat: "bilkjop", desc: "Luftfjæring som svikter kort etter kjøp gir rett til utbedring eller prisavslag." },
  { slug: "oljeforbruk-hoyt", title: "Reklamasjon på unormalt høyt oljeforbruk", lawRef: "FKL § 16", cat: "bilkjop", desc: "Unormalt oljeforbruk tyder på skjult motorskade og er reklamasjonsgrunnlag." },
  { slug: "ac-anlegg-defekt", title: "Defekt AC-anlegg oppdaget etter kjøp", lawRef: "FKL § 16", cat: "bilkjop", desc: "AC som ikke fungerer og ikke ble opplyst om er mangel ved kjøpet." },
  { slug: "elektrisk-feil-bil", title: "Gjentatte elektriske feil på bruktbil", lawRef: "FKL § 16", cat: "bilkjop", desc: "Komplekse elektriske feil som var til stede ved kjøp gir reklamasjonsrett." },
  { slug: "eu-kontroll-mangel", title: "Bilen besto ikke EU-kontroll etter kjøp", lawRef: "KL § 19", cat: "bilkjop", desc: "Feil som avdekkes ved EU-kontroll kort etter kjøp presumeres å ha eksistert ved salg." },
  { slug: "lakkfeil-skjult", title: "Skjult lakkfeil eller skadet lakk etter kjøp", lawRef: "KL § 19", cat: "bilkjop", desc: "Sparkel og lakkreparasjoner som ikke ble opplyst om er skjult mangel." },
  { slug: "4wd-feil", title: "Feil på 4WD/4x4-system oppdaget etter kjøp", lawRef: "FKL § 16", cat: "bilkjop", desc: "4WD-system som ikke fungerer korrekt og ikke ble opplyst om er reklamasjonsgrunnlag." },
  { slug: "automatgir-feil", title: "Feil på automatgirkasse etter kjøp", lawRef: "FKL § 32", cat: "bilkjop", desc: "Feil i automatgirkasse er kostbar mangel som gir rett til utbedring eller heving." },
  { slug: "bremsesystem-feil", title: "Defekt bremsesystem oppdaget etter kjøp", lawRef: "FKL § 16", cat: "bilkjop", desc: "Bremsesvikt er sikkerhetskritisk mangel med sterk hevingsrett." },
  { slug: "motor-oljetrykk", title: "Lavt oljetrykk og motorskade etter kjøp", lawRef: "KL § 39", cat: "bilkjop", desc: "Motorskade kort tid etter kjøp presumeres å stamme fra forhold ved overlevering." },
  { slug: "karosseri-skade-skjult", title: "Skjult karosseri- eller kollisjonsskade", lawRef: "KL § 19", cat: "bilkjop", desc: "Uopplyst kollisjonsskade i karosseri er vesentlig mangel og hevingsgrunnlag." },
  { slug: "hybrid-batteri-feil", title: "Defekt hybridbatteri på brukt hybridbil", lawRef: "FKL § 15", cat: "bilkjop", desc: "Hybridbatteri som ikke holder kapasitet er reklamasjonsgrunnlag mot selger.", faqs: [
    { q: "Hybridbatteriet holder ikke lenger enn halv rekkevidde. Kan jeg reklamere?", a: "Ja, dersom kapasiteten er vesentlig lavere enn det som ble annonsert eller rimelig å forvente for bilens alder og km-stand." },
    { q: "Selger sier batteridegraderings er normal. Hvor mye degradering er akseptabelt?", a: "Det finnes ingen fast norm, men et hybridbatteri under 70% SOH på en relativt ny bil vil normalt regnes som en mangel dersom dette ikke ble opplyst." },
  ]},

  // BILKJØP (20 nye noder med FAQs)
  { slug: "infotainment-skjerm-svart", title: "Feil på infotainment eller skjerm etter bilkjøp", lawRef: "FKL § 16", cat: "bilkjop", desc: "Skjerm som går i svart eller fryser kan regnes som mangel etter forbrukerkjøpsloven dersom feilen forelå ved kjøpet.", faqs: [
    { q: "Gjelder reklamasjonsretten selv om skjermen virket da jeg kjøpte bilen?", a: "Ja. Dersom feilen viser seg innen 6 måneder etter overtakelse, presumeres den å ha eksistert ved kjøpet. Selger må bevise det motsatte." },
    { q: "Kan jeg kreve at selger bytter hele infotainment-enheten?", a: "Du kan kreve utbedring. Selger velger om det gjøres ved reparasjon eller bytte, men utbedringen må skje innen rimelig tid og uten vesentlig ulempe for deg." },
  ]},
  { slug: "partikkelfilter-dpf-feil", title: "Tett partikkelfilter (DPF) på bruktbil", lawRef: "KL § 19", cat: "bilkjop", desc: "Tett DPF kort tid etter kjøp er en klassisk tvist. Selger hevder det er driftsfeil, kjøper mener det var skjult mangel.", faqs: [
    { q: "Hvem har bevisbyrden for om DPF-problemet eksisterte ved kjøpet?", a: "Innen 6 måneder har kjøper en presumpsjon på sin side. Etter 6 måneder må kjøper sannsynliggjøre at feilen forelå ved overtakelse — typisk via verkstedrapport." },
    { q: "Selger hevder tett DPF skyldes min kjørestil. Har han rett?", a: "Mulig, men selger må dokumentere dette. Dersom bilen hadde høy kilometerstand og selger ikke opplyste om DPF-problemer, taler mye for at feilen var skjult ved salg." },
  ]},
  { slug: "adblue-system-feil", title: "Reklamasjon på AdBlue-feil og sensorer", lawRef: "FKL § 16", cat: "bilkjop", desc: "AdBlue-problemer er kostbare. Sviktende system kort tid etter kjøp kan gi krav på utbedring.", faqs: [
    { q: "AdBlue-varsellys kom på to uker etter kjøp. Er dette selgers ansvar?", a: "Dersom feilen skyldes defekte sensorer eller pumpe som var til stede ved kjøpet, ja. Simpelt tomt AdBlue-tank er driftsvedlikehold og kjøpers ansvar." },
    { q: "Kan jeg holde tilbake betaling mens AdBlue-feilen utbedres?", a: "Ja, etter forbrukerkjøpsloven § 28 kan du holde tilbake et beløp tilsvarende utbedringskostnaden frem til selger retter mangelen." },
  ]},
  { slug: "vannlekkasje-kupe", title: "Vannlekkasje inn i kupé eller bagasjerom", lawRef: "KL § 19", cat: "bilkjop", desc: "Fukt og mugglukt pga. utette lister eller drenering kan gi grunnlag for prisavslag eller heving.", faqs: [
    { q: "Bilen lukter mugg og gulvmattene er fuktige. Er dette en mangel?", a: "Ja, dersom lekkasjen skyldes defekte lister, drenering eller sveisefeil som var til stede ved kjøpet. Mugglukt tyder på at problemet har eksistert en stund." },
    { q: "Kan jeg heve kjøpet pga. vannlekkasje?", a: "Det avhenger av omfanget. Er det dokumentert fuktskade i gulv, elektronikk eller karosseri, og utbedring er uforholdsmessig dyr, kan heving være aktuelt." },
  ]},
  { slug: "hjullager-ulyd", title: "Ulyd fra hjullager på nylig kjøpt bil", lawRef: "FKL § 15", cat: "bilkjop", desc: "Hjullager som synger rett etter kjøp tyder på slitasje som burde vært opplyst om.", faqs: [
    { q: "Hjullageret begynte å brumme etter én uke. Kan selger skylde på normal slitasje?", a: "Nei, ikke uten videre. Hjullager som svikter etter én uke er utenfor normal levetid og presumeres å ha vært i dårlig stand ved kjøpet." },
    { q: "Verkstedet sier hjullageret er originalt og gammelt. Hva betyr det for saken min?", a: "Det styrker din posisjon. Dersom lageret er svært slitt og selger ikke opplyste om dette, foreligger brudd på opplysningsplikten etter kjøpsloven § 19." },
  ]},
  { slug: "stotdempere-utslitt", title: "Defekte støtdempere ved levering", lawRef: "KL § 19", cat: "bilkjop", desc: "Bilen hopper eller er ustabil pga. støtdempere som var utslitte ved kjøp.", faqs: [
    { q: "Støtdemperne er utslitte ifølge verkstedet. Kan selger si dette er normal slitasje?", a: "Avhenger av alder og km. Er de unormalt slitte for bilens alder, eller var det åpenbart ved en prøvekjøring, taler det for mangel selger burde opplyst om." },
    { q: "Hva er rimelig krav — utbedring eller prisavslag?", a: "Du velger. Utbedring (nye støtdempere) eller prisavslag tilsvarende utbedringskostnaden. Heving er sjelden aktuelt for støtdempere alene." },
  ]},
  { slug: "feilkode-motorlampe", title: "Motorlampe lyser rett etter bilkjøp", lawRef: "FKL § 16", cat: "bilkjop", desc: "Lysende motorlampe er det klareste tegnet på en mangel. Sjekk dine rettigheter.", faqs: [
    { q: "Motorlampen kom på dagen etter levering. Hva gjør jeg?", a: "Reklamér skriftlig til selger umiddelbart. Beskriv feilen og krev at selger dekker feilsøking og utbedring. Ikke la verksted reparere på din regning uten å ha reklamert." },
    { q: "Selger sier motorlampen kom av at jeg kjørte feil. Kan han ha rett?", a: "Kun dersom han kan dokumentere dette. En feilkode som leses av verksted forteller nøyaktig hva som er feil — la verkstedet dokumentere årsaken skriftlig." },
  ]},
  { slug: "soltak-lekkasje-feil", title: "Feil med soltak eller panoramatak", lawRef: "KL § 19", cat: "bilkjop", desc: "Lekkasje eller mekanisk feil på soltak er dyrt og utgjør ofte en kjøpsrettslig mangel.", faqs: [
    { q: "Soltaket lekker ved regn. Selger sier det er normal slitasje. Stemmer det?", a: "Nei, et soltak som lekker er ikke normal slitasje. Dreneringssystemet i soltak tettes over tid, men selger plikter å opplyse om dette dersom det er kjent." },
    { q: "Panoramataket knirker og glir ikke jevnt. Er det en mangel?", a: "Dersom mekanikken ikke fungerer som den skal og dette ikke ble opplyst, er det en mangel. Krever utbedring hos selger." },
  ]},
  { slug: "sentrallas-nokkelfri-feil", title: "Problemer med sentrallås eller Keyless", lawRef: "FKL § 16", cat: "bilkjop", desc: "Nøkkelen gjenkjennes ikke eller dørene låses ikke — kjøpsrettslig mangel.", faqs: [
    { q: "Keyless-systemet virker av og til. Kan selger si det er batteriet i nøkkelen?", a: "Selger kan foreslå det, men dersom problemet vedvarer etter nytt batteri, er det en feil i bilens system som selger er ansvarlig for." },
    { q: "Sentrallåsen svikter sporadisk. Er det nok til å kreve utbedring?", a: "Ja. Sporadiske feil er vanskeligere å dokumentere, men video-bevis og verkstedrapport er tilstrekkelig grunnlag for reklamasjon." },
  ]},
  { slug: "ryggekamera-sensor-feil", title: "Defekt ryggekamera eller parkeringssensor", lawRef: "KL § 17", cat: "bilkjop", desc: "Hjelpesystemer som ikke virker er mangel dersom de var inkludert i utstyrslisten.", faqs: [
    { q: "Ryggekameraet viser svart bilde. Selger sier det ikke var med i kjøpet. Hva gjør jeg?", a: "Sjekk salgsdokumentene og utstyrslisten. Dersom kameraet er montert i bilen og fremgår av utstyrslisten, er det inkludert i kjøpet." },
    { q: "Parkeringssensorene piper konstant uten grunn. Er dette en mangel?", a: "Ja, defekte sensorer som gir falske signaler er en mangel selger er ansvarlig for dersom feilen forelå ved kjøpet." },
  ]},
  { slug: "varmeseter-defekt", title: "Defekte varmeseter i bruktbil", lawRef: "KL § 17", cat: "bilkjop", desc: "Varmeseter som ikke virker skal normalt opplyses om ved salg.", faqs: [
    { q: "Varmesetene virket da jeg kjøpte bilen, men sluttet etter en uke. Kan jeg reklamere?", a: "Ja, innen 6 måneder presumeres feilen å ha eksistert ved kjøpet. Reklamér skriftlig til selger og krev utbedring." },
    { q: "Er defekte varmeseter alene nok til å heve kjøpet?", a: "Neppe alene. Varmeseter er komfort-utstyr, ikke sikkerhetskritisk. Prisavslag tilsvarende utbedringskostnaden er mer realistisk." },
  ]},
  { slug: "vindusheis-defekt", title: "Vindusheis som ikke fungerer", lawRef: "KL § 17", cat: "bilkjop", desc: "Elektriske vindusheiser som svikter kort tid etter kjøp er typisk reklamasjonssak.", faqs: [
    { q: "Vindusheisen på førersiden virker ikke. Selger sier det er normal slitasje. Har han rett?", a: "Avhenger av bilens alder. For en nyere bil (under 10 år) er sviktende vindusheis utenfor normal slitasje og reklamasjonsgrunnlag." },
    { q: "Kan jeg reparere vindusheisen selv og kreve penger av selger?", a: "Du bør først reklamere og gi selger mulighet til å utbedre. Dersom selger avviser eller ikke svarer innen rimelig tid, kan du reparere for selgers regning." },
  ]},
  { slug: "xenon-led-lys-feil", title: "Feil på Xenon eller LED-hovedlys", lawRef: "FKL § 16", cat: "bilkjop", desc: "Moderne lysmoduler koster titusenvis. Sjekk om selger må dekke bytte.", faqs: [
    { q: "Det ene LED-lyset sluknet etter to uker. Selger sier det er normalt. Stemmer det?", a: "Nei. LED-lys har svært lang levetid. Svikt etter to uker er klar indikasjon på at modulen var defekt ved kjøpet." },
    { q: "Et nytt Xenon-modul koster 25 000 kr. Kan jeg kreve heving pga. dette alene?", a: "Mulig. Dersom utbedringskostnaden utgjør en vesentlig del av kjøpesummen og feilen ikke ble opplyst, kan vesentlighetskravet for heving være oppfylt." },
  ]},
  { slug: "oljelekkasje-motor-gir", title: "Oljelekkasje fra motor eller girkasse", lawRef: "KL § 19", cat: "bilkjop", desc: "Bilen 'markerer revir' rett etter kjøp — ofte en skjult mangel selger svarer for.", faqs: [
    { q: "Bilen lekker olje på parkeringsplassen. Selger sier det er normale drypp. Er det riktig?", a: "Nei. En bil skal ikke lekke olje. Selv mindre lekkasjer er en mangel selger plikter å utbedre." },
    { q: "Kan oljelekkasje gi grunnlag for heving av kjøpet?", a: "Avhenger av årsaken. Lekkasje fra motorblokk eller girkasse-pakninger kan indikere alvorlig slitasje og gi hevingsgrunnlag dersom kostnaden er vesentlig." },
  ]},
  { slug: "airbag-lampe-feil", title: "Airbag-lampe lyser: Sikkerhetsmangel", lawRef: "FKL § 15", cat: "bilkjop", desc: "Feil på sikkerhetssystemer er kritiske mangler som nesten alltid gir rett til utbedring.", faqs: [
    { q: "Airbag-lampen lyser. Er bilen trygg å kjøre?", a: "Ikke nødvendigvis. Airbag-systemet kan være deaktivert. Reklamér umiddelbart og be selger dekke feilsøking — dette er sikkerhetskritisk." },
    { q: "Selger visste ikke om airbag-feilen. Har jeg likevel krav?", a: "Ja. Selger er ansvarlig for skjulte mangler selv uten kunnskap, med mindre bilen ble solgt 'som den er' og mangelen ikke er vesentlig. Airbag-feil er normalt vesentlig." },
  ]},
  { slug: "vibrasjoner-under-kjoring", title: "Uforklarlige vibrasjoner i ratt eller bil", lawRef: "KL § 18", cat: "bilkjop", desc: "Vibrasjoner kan skyldes alt fra dekk til drivverk. Finn ut hvem som har ansvaret.", faqs: [
    { q: "Rattet vibrerer ved 80 km/t. Selger sier det bare er hjulbalansering. Har han rett?", a: "Mulig, men hjulbalansering er vedlikehold selger burde utføre ved salg. Dersom vibrasjoner vedvarer etter balansering, er det en dypere mangel." },
    { q: "Verkstedet sier vibrasjonene skyldes slitte drivaksler. Er det reklamasjonsgrunnlag?", a: "Ja, slitte drivaksler som forårsaker vibrasjoner er en skjult mangel selger er ansvarlig for, særlig innen 6 måneder etter kjøpet." },
  ]},
  { slug: "eksosanlegg-rust-stoy", title: "Defekt eller rustent eksosanlegg", lawRef: "KL § 17", cat: "bilkjop", desc: "Eksosanlegg som faller av eller bråker unormalt rett etter overtakelse.", faqs: [
    { q: "Eksosen begynte å lage støy etter én uke. Er det reklamasjonsgrunnlag?", a: "Ja, dersom støyen skyldes hull eller løse koblinger som var til stede ved kjøpet. Unormal støy etter én uke tyder på eksisterende skade." },
    { q: "Selger sier rust på eksosen er normalt for en gammel bil. Har han rett?", a: "Noe rust er normalt, men gjennomrustet eksos som forårsaker funksjonsfeil er en mangel. Selger plikter å opplyse om dette dersom han kjente til det." },
  ]},
  { slug: "varmeapparat-webasto-feil", title: "Feil på varmeapparat eller Webasto", lawRef: "FKL § 16", cat: "bilkjop", desc: "Dårlig varme eller defekt parkeringsvarmer er en vesentlig mangel i norsk klima.", faqs: [
    { q: "Webasto-anlegget virker ikke. Selger sier det ikke var inkludert i kjøpet. Hva gjør jeg?", a: "Sjekk salgsdokumentene. Dersom Webasto er montert og fremgår av bilens utstyr, er det inkludert og selger er ansvarlig for at det fungerer." },
    { q: "Varmen i bilen er svak selv på maks. Er det en mangel?", a: "Kan være det. Svak varme kan skyldes defekt termostat, slitt kjølevæskepumpe eller tilstoppet varmeapparat — alt er potensielle mangler ved kjøpet." },
  ]},
  { slug: "bruktbil-eu-kontroll-fusk", title: "Bruktbil solgt med fersk men feilaktig EU-kontroll", lawRef: "KL § 18", cat: "bilkjop", desc: "Dersom bilen har alvorlige feil som burde vært oppdaget på kontrollen, har du en sterk sak.", faqs: [
    { q: "Bilen fikk EU-godkjenning for 2 måneder siden men har alvorlige bremseproblemer. Hva gjør jeg?", a: "Reklamér til selger og dokumenter bremsefeilen med verkstedrapport. Dersom feilen åpenbart eksisterte ved EU-kontrollen, kan du også anmelde kontrollstasjonen." },
    { q: "Kan jeg holde selger ansvarlig for at EU-kontrollen ikke avdekket feilene?", a: "Ja. Selger garanterer implisitt at bilen er i den stand EU-kontrollen tilsier. Feil som burde vært oppdaget er selgers ansvar overfor deg som kjøper." },
  ]},

  // FLYREISER (20 noder) — URL: /flyreiser/[slug]
  { slug: "sas-fly-kansellert", title: "SAS fly kansellert: Slik krever du 600 €", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Ved kansellering under 14 dager før avgang har du krav på standardkompensasjon." },
  { slug: "norwegian-forsinkelse", title: "Norwegian forsinkelse over 3 timer — krav på erstatning", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Forsinkelse over 3 timer gir samme kompensasjonsrett som kansellering." },
  { slug: "wideroe-mistet-tilslutning", title: "Widerøe: Mistet tilslutningsfly pga forsinkelse", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Mistet tilslutning som følge av forsinkelse gir full kompensasjonsrett." },
  { slug: "ryanair-overbooking", title: "Nektet ombordstigning Ryanair (overbooking)", lawRef: "EU 261/2004 art. 4", cat: "flyreiser", desc: "Overbooking gir umiddelbar rett til kompensasjon og alternativ transport." },
  { slug: "fly-streik-kompensasjon", title: "Flystreik: Har du krav på erstatning?", lawRef: "EU 261/2004 art. 5", cat: "flyreiser", desc: "Intern streik hos flyselskapet er ikke ekstraordinær omstendighet — du har krav." },
  { slug: "fly-teknisk-feil", title: "Erstatning når flyet kanselleres pga teknisk feil", lawRef: "EU 261/2004 art. 5", cat: "flyreiser", desc: "Teknisk feil er sjelden ekstraordinær omstendighet. Du har normalt krav på kompensasjon." },
  { slug: "klm-forsinkelse", title: "KLM fly forsinket til/fra Norge — dine krav", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "KLM er omfattet av EU 261/2004 på alle flygninger til/fra EU/EØS." },
  { slug: "lufthansa-kansellert", title: "Lufthansa kansellert fly: Slik klager du", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Lufthansa-kansellering gir deg rett til 250–600 € avhengig av reisedistanse." },
  { slug: "fly-mat-hotell-krav", title: "Krav på mat og hotell ved lang forsinkelse", lawRef: "EU 261/2004 art. 9", cat: "flyreiser", desc: "Ved forsinkelse over 2 timer har du rett på forpleining uavhengig av årsak." },
  { slug: "mistet-bagasje-erstatning", title: "Erstatning for mistet bagasje på flyreise", lawRef: "Montreal-konvensjonen art. 17", cat: "flyreiser", desc: "Mistet bagasje gir krav på opptil ca. 1 700 SDR i erstatning." },

  // FLYREISER (10 nye noder med FAQs)
  { slug: "forsinket-crew-mangel", title: "Erstatning ved mangel på crew eller besetning", lawRef: "EU 261/2004 art. 5", cat: "flyreiser", desc: "Sykdom hos personell regnes ikke som ekstraordinær omstendighet. Du har krav på kompensasjon.", faqs: [
    { q: "Flyet ble kansellert fordi crew ikke møtte opp. Er det ekstraordinær omstendighet?", a: "Nei. EU-domstolen har slått fast at interne operative problemer som manglende crew ikke er ekstraordinære omstendigheter. Du har krav på kompensasjon." },
    { q: "Flyselskapet tilbød ny flyvning neste dag. Mister jeg retten til kompensasjon?", a: "Nei, men kompensasjonsbeløpet kan halveres dersom alternativ transport ble tilbudt som ga ankomst innen visse tidsgrenser relativt til original ankomsttid." },
  ]},
  { slug: "finnair-forsinkelse", title: "Erstatning ved forsinkelse med Finnair", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Finnair er EU-basert og fullt ut dekket av forordning 261/2004.", faqs: [
    { q: "Finnair-flyet mitt fra Oslo var 4 timer forsinket. Hva kan jeg kreve?", a: "Du har krav på 250-400€ avhengig av reisedistanse, pluss mat og drikke under ventetiden. Send krav direkte til Finnair customer relations." },
    { q: "Finnair avviste kravet mitt med henvisning til 'ekstraordinære omstendigheter'. Hva gjør jeg?", a: "Be dem dokumentere den spesifikke årsaken. Teknisk feil og de fleste operative problemer er ikke ekstraordinære. Du kan klage til Luftfartstilsynet i Norge." },
  ]},
  { slug: "british-airways-kansellert", title: "British Airways kansellert fly: Dine rettigheter", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "BA er britisk men UK opprettholder EU-forordning 261 post-Brexit for flygninger fra EU/EØS.", faqs: [
    { q: "BA kansellerte flyet mitt fra London til Oslo. Gjelder EU-reglene?", a: "For flygninger fra EU/EØS-land med ethvert flyselskap, ja. Fra UK med BA gjelder UK261 som er identisk med EU261. Du har samme rettigheter." },
    { q: "BA tilbød voucher istedet for kontanterstatning. Kan jeg kreve penger?", a: "Ja. Du har alltid rett til kontanterstatning etter EU 261/2004. Du er ikke pliktet til å akseptere voucher." },
  ]},
  { slug: "air-france-bagasje", title: "Erstatning for mistet bagasje hos Air France", lawRef: "Montreal-konvensjonen art. 17", cat: "flyreiser", desc: "Air France er ansvarlig for mistet eller ødelagt bagasje etter Montrealkonvensjonen.", faqs: [
    { q: "Air France mistet bagasjen min. Hva gjør jeg på flyplassen?", a: "Fyll ut PIR-skjema (Property Irregularity Report) på flyplassen umiddelbart. Uten PIR er det svært vanskelig å kreve erstatning i etterkant." },
    { q: "Bagasjen dukket opp etter 5 dager. Kan jeg kreve erstatning for nødkjøp?", a: "Ja, dokumenterte utgifter til nødvendige klær og toalettartikler i venteperioden kan kreves dekket, normalt opptil 1300 SDR (ca. 17 000 kr)." },
  ]},
  { slug: "flyforsinkelse-it-feil", title: "Kompensasjon ved flyforsinkelse pga. IT-feil", lawRef: "EU 261/2004 art. 5", cat: "flyreiser", desc: "IT-feil hos flyselskapet er ikke ekstraordinær omstendighet — du har krav på kompensasjon.", faqs: [
    { q: "Flyselskapet sier IT-krasj er ekstraordinær omstendighet. Er det riktig?", a: "Nei. EU-domstolen har fastslått at interne IT-systemer er flyselskapets ansvar. Feil i egne systemer gir ikke fritak fra kompensasjonsplikten." },
    { q: "IT-feilen rammet hele flyplassen, ikke bare ett selskap. Endrer det noe?", a: "Muligens. Infrastrukturfeil utenfor selskapets kontroll kan kvalifisere som ekstraordinær omstendighet. Dette vurderes konkret." },
  ]},
  { slug: "easyjet-forsinkelse", title: "EasyJet forsinkelse over 3 timer: Krav på erstatning", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "EasyJet er EU-basert og fullt dekket av forordning 261/2004.", faqs: [
    { q: "EasyJet-flyet var 3,5 timer forsinket. Hva kan jeg kreve?", a: "250-600€ avhengig av reisedistanse, pluss mat og drikke under ventetiden. EasyJet har en online claim-portal — men de avslår ofte, så vær klar til å eskalere." },
    { q: "EasyJet tilbød 10€ matkupong. Er jeg ferdig da?", a: "Nei, det er kun forpleining du har krav på uansett. Kompensasjonen på 250-600€ er separat og kan kreves i tillegg." },
  ]},
  { slug: "turkish-airlines-kansellert", title: "Turkish Airlines kansellert fly via Istanbul", lawRef: "EU 261/2004 art. 7", cat: "flyreiser", desc: "Flygninger fra EU/EØS med Turkish Airlines er dekket av EU 261/2004.", faqs: [
    { q: "Turkish Airlines kansellerte flyet mitt fra Oslo til Istanbul. Gjelder EU-reglene?", a: "Ja, flygninger fra Norge (EØS) med ethvert flyselskap er dekket av EU 261/2004 uavhengig av selskapets nasjonalitet." },
    { q: "Layoveren min i Istanbul ble 18 timer. Har jeg krav på hotell?", a: "Ja, ved forsinkelse over 5 timer på videre reise skal flyselskapet tilby hotell og transport. Dersom de ikke tilbyr, kan du ordne selv og kreve refusjon." },
  ]},
  { slug: "nektet-ombordstigning-lojalitetsprogram", title: "Nektet ombordstigning pga. bonuspoeng-billett", lawRef: "EU 261/2004 art. 4", cat: "flyreiser", desc: "Også bonusbilletter gir full rett til kompensasjon ved nektet ombordstigning.", faqs: [
    { q: "Jeg ble nektet ombordstigning fordi bonusbillettsetet ble 'oppgradert' til en betalende passasjer. Er det lovlig?", a: "Nei. Nektet ombordstigning uansett billetttype gir rett til full kompensasjon etter EU 261/2004 art. 4." },
    { q: "Flyselskapet sier bonusbillett er lavere prioritet. Endrer det mine rettigheter?", a: "Nei. EU 261/2004 skiller ikke mellom billetttyper. Du har rett til kompensasjon og omruting uavhengig av om billett var betalt eller bonushentet." },
  ]},
  { slug: "bagasje-forsinket-feriestart", title: "Forsinket bagasje ved feriestart: Erstatning for nødkjøp", lawRef: "Montreal-konvensjonen art. 19", cat: "flyreiser", desc: "Flyselskapet er ansvarlig for dokumenterte nødkjøp når bagasjen er forsinket.", faqs: [
    { q: "Bagasjen kom tre dager forsinket. Kan jeg kreve alle klær jeg kjøpte?", a: "Du kan kreve rimelige og nødvendige nødkjøp. Luksusvarer dekkes ikke. Ta vare på alle kvitteringer og send krav med PIR-nummer." },
    { q: "Bagasjen kom aldri. Hva er makserstatningen?", a: "Etter Montrealkonvensjonen er grensen ca. 1700 SDR (ca. 22 000 kr). Dokumenter innholdet med bilder og kvitteringer." },
  ]},
  { slug: "innlandsflyging-rettigheter", title: "Rettigheter ved kansellert innenlandsfly i Norge", lawRef: "EU 261/2004 / Luftfartsloven", cat: "flyreiser", desc: "Innenlandsfly i Norge er delvis dekket av EU 261/2004 via EØS-avtalen.", faqs: [
    { q: "Widerøe kansellerte innenlandsflyet mitt. Har jeg krav på EU-kompensasjon?", a: "Ja, EU 261/2004 gjelder for alle flygninger fra norske flyplasser. Kompensasjon er 250€ for distanser under 1500 km." },
    { q: "Ruteflyet er eneste transportmulighet til øya min. Har jeg ekstra rettigheter?", a: "Flyselskapet plikter å tilby alternativ transport eller full refusjon. Dersom alternativ transport ikke finnes, kan du kreve dekning av andre reisekostnader." },
  ]},

  // MC-KJØP (15 noder) — URL: /mc-kjop/[slug]
  { slug: "mc-rammeskade-skjult", title: "Skjult rammeskade på brukt motorsykkel", lawRef: "KL § 19", cat: "mc-kjop", desc: "Uopplyst rammeskade på MC er vesentlig mangel og gir hevingsrett." },
  { slug: "mc-ulovlig-trimmet", title: "Kjøpt ulovlig trimmet MC uten å vite det?", lawRef: "KL § 18", cat: "mc-kjop", desc: "Ulovlig trimming som ikke ble opplyst om er svik og gir hevingsrett." },
  { slug: "mc-motorbank-ulyd", title: "Ulyd og motorbank på MC: Reklamasjon", lawRef: "KL § 39", cat: "mc-kjop", desc: "Motorbank kort tid etter kjøp presumeres å være skjult mangel." },
  { slug: "mc-simmerringer-lekkasje", title: "Lekkasje i dempere (simmerringer) etter MC-kjøp", lawRef: "KL § 17", cat: "mc-kjop", desc: "Lekkende simmerringer som ikke ble opplyst om er reklamasjonsgrunnlag." },
  { slug: "mc-elektrisk-feil", title: "Gjentatte elektriske feil på MC etter kjøp", lawRef: "KL § 39", cat: "mc-kjop", desc: "Elektriske feil som var latente ved kjøp gir rett til reklamasjon." },
  { slug: "mc-abs-feil", title: "Defekt ABS-system på brukt MC", lawRef: "KL § 17", cat: "mc-kjop", desc: "ABS-feil er sikkerhetskritisk og gir sterk reklamasjonsrett." },

  // MC-KJØP (9 nye noder med FAQs)
  { slug: "mc-clutch-sluring", title: "Clutch-sluring på brukt MC: Reklamasjon", lawRef: "KL § 39", cat: "mc-kjop", desc: "Clutch som slipper for tidlig er slitasjerelatert men kan være skjult mangel ved kjøp.", faqs: [
    { q: "Clutchen slurer etter 200 km. Selger sier det er normal slitasje. Har han rett?", a: "Ikke uten videre. Clutch som slurer etter 200 km er unormalt og presumeres å ha vært slitt ved kjøpet, med mindre selger kan dokumentere at den ble skiftet nylig." },
    { q: "Kan jeg kreve ny clutch dekket av selger?", a: "Ja, dersom clutchen var i unormalt dårlig stand ved kjøpet. Krev skriftlig reklamasjon og få verkstedets vurdering på skriftlig." },
  ]},
  { slug: "mc-startproblemer", title: "Startvansker og batteriproblemer på brukt MC", lawRef: "KL § 17", cat: "mc-kjop", desc: "MC som ikke starter pålitelig er en klar mangel dersom problemet forelå ved kjøpet.", faqs: [
    { q: "MC-en starter ikke om morgenen. Selger sier jeg bare må lade batteriet. Holder det?", a: "Et batteri som ikke holder lading er en mangel. Dersom batteriet svikter kort tid etter kjøp, er det selgers ansvar å bytte det." },
    { q: "Startvansker skyldes karburatorfeil ifølge verkstedet. Er det reklamasjonsgrunnlag?", a: "Ja, karburatorfeil som gir startproblemer er en skjult mangel dersom selger ikke opplyste om dette." },
  ]},
  { slug: "mc-kjolersystem-feil", title: "Overoppheting og kjølesystemfeil på MC", lawRef: "KL § 39", cat: "mc-kjop", desc: "MC som overopphetes kan ha alvorlig motorskade — reklamasjon er aktuelt.", faqs: [
    { q: "MC-en koker over etter 20 minutter. Kan jeg heve kjøpet?", a: "Overoppheting er alvorlig og kan indikere defekt termostat, pumpe eller tetting. Dersom feilen ikke lar seg utbedre rimelig, kan heving være aktuelt." },
    { q: "Selger sier jeg bare må sjekke kjølevæsken selv. Er det riktig?", a: "Å sjekke kjølevæskenivå er ditt ansvar, men en defekt kjølepumpe eller termostat er selgers ansvar å utbedre." },
  ]},
  { slug: "mc-bremser-feil", title: "Defekte bremser på brukt MC: Sikkerhetsmangel", lawRef: "KL § 17", cat: "mc-kjop", desc: "Bremsesvikt på MC er sikkerhetskritisk og gir sterk reklamasjonsrett.", faqs: [
    { q: "Bremsene kjennes svampete. Selger sier det er luft i systemet. Er det hans ansvar?", a: "Ja, luft i bremsesystemet er en mangel selger plikter å utbedre eller opplyse om ved salg. Svampete bremser er et sikkerhetsanliggende." },
    { q: "Bremseskivene er under minimum tykkelse. Hvem betaler?", a: "Dersom dette ikke ble opplyst og bilen nylig passerte tilstandskontroll, er det selgers ansvar. Be om dokumentasjon på siste verkstedbesøk." },
  ]},
  { slug: "mc-rammeskjevhet", title: "Skjult rammeskjevhet på brukt MC", lawRef: "KL § 19", cat: "mc-kjop", desc: "Rammeskjevhet som ikke ble opplyst om er vesentlig mangel og hevingsgrunnlag.", faqs: [
    { q: "MC-en trekker til siden. Verkstedet mistenker rammeskjevhet. Hva gjør jeg?", a: "Få skriftlig rapport fra verksted. Rammeskjevhet er vesentlig mangel og gir normalt hevingsrett, da det er kostbart å rette og påvirker sikkerheten." },
    { q: "Selger nekter for å ha visst om rammeskjevheten. Endrer det min rett?", a: "Nei. Selger er ansvarlig for skjulte mangler selv uten kunnskap. Det er tilstrekkelig at mangelen forelå ved kjøpet." },
  ]},
  { slug: "mc-girkasse-feil", title: "Feil på girkasse eller girskift på MC", lawRef: "KL § 39", cat: "mc-kjop", desc: "Girkasse som hopper ut av gir eller ikke kan legges inn er alvorlig mangel.", faqs: [
    { q: "MC-en hopper ut av 3. gir under akselerasjon. Er det en mangel?", a: "Ja, girkasse som ikke holder gir er en klar mangel. Dette kan skyldes slitte girklør eller fjærer som selger burde kjent til." },
    { q: "Kan jeg heve kjøpet pga. girkassefeil?", a: "Avhenger av utbedringskostnaden. Dersom girkasse-reparasjon er vesentlig i forhold til kjøpesummen, kan heving være aktuelt." },
  ]},
  { slug: "mc-forgaffel-lekkasje", title: "Lekkasje fra forgaffel eller bakdempere på MC", lawRef: "KL § 17", cat: "mc-kjop", desc: "Oljelekkasje fra forgaffel er vanlig men skal opplyses om ved salg.", faqs: [
    { q: "Forgaffelen lekker olje. Selger sier alle gamle MC-er gjør det. Stemmer det?", a: "Noe slitasje er normalt, men aktiv lekkasje er en mangel selger plikter å opplyse om. 'Alle gjør det' er ikke et gyldig forsvar." },
    { q: "Simmerringer i forgaffelen er dyre å bytte. Kan jeg kreve dette dekket?", a: "Ja, dersom lekkasjen var til stede ved kjøpet og ikke ble opplyst om. Krev skriftlig reklamasjon og legg ved verkstedkostnadsestimat." },
  ]},
  { slug: "mc-dekk-utslitt", title: "Utslitte dekk ved levering av brukt MC", lawRef: "KL § 17", cat: "mc-kjop", desc: "MC med dekk under minsteprofil ved levering er en mangel selger må svare for.", faqs: [
    { q: "MC-dekkene var under 1mm profil da jeg fikk den. Er det en mangel?", a: "Ja, dekk under lovlig minsteprofil (1mm for MC) er en mangel. Selger pliktet å opplyse om eller utbedre dette før levering." },
    { q: "Selger sier dekk er forbruksmateriell og mitt ansvar. Er det riktig?", a: "Nei, ikke ved levering. Dekk som allerede er under minsteprofil ved overtakelse er en mangel, uavhengig av at de normalt er forbruksmateriell." },
  ]},
  { slug: "mc-originaldeler-bytta", title: "Originaldeler byttet ut uten opplysning ved MC-salg", lawRef: "KL § 18", cat: "mc-kjop", desc: "Bytte til ikke-originale deler uten opplysning kan gi prisavslag eller heving.", faqs: [
    { q: "Verkstedet oppdaget at motoren har ikke-originale deler. Selger opplyste ikke om dette. Hva kan jeg kreve?", a: "Uoriginale deler som påvirker motorens levetid eller ytelse er brudd på opplysningsplikten. Du kan kreve prisavslag eller heving avhengig av omfanget." },
    { q: "Er ettermarkedsdeler alltid en mangel?", a: "Ikke alltid, men dersom de er av dårligere kvalitet enn originalt eller påvirker garantier, og dette ikke ble opplyst, er det en mangel." },
  ]},

  // HÅNDVERKERE (15 noder) — URL: /handverkere/[slug]
  { slug: "bad-lekkasje-oppussing", title: "Vannlekkasje etter renovering av bad", lawRef: "HTL § 5", cat: "handverkere", desc: "Lekkasje etter baderomsrenovering er mangel etter håndverkertjenesteloven." },
  { slug: "forsinket-handverker-dagmulkt", title: "Håndverker er forsinket: Krav på dagmulkt", lawRef: "HTL § 11", cat: "handverkere", desc: "Ved forsinkelse utover avtalt tid kan du kreve dagmulkt uten å bevise tap." },
  { slug: "samsvarserklaring-mangler", title: "Mangler samsvarserklæring på el-arbeid", lawRef: "HTL § 5", cat: "handverkere", desc: "Manglende samsvarserklæring er mangel som gir rett til utbedring uten kostnad." },
  { slug: "tak-utett-lekkasje", title: "Utett tak etter taktekking: Reklamasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Taklekkasje etter nytt tak er klar mangel med lang reklamasjonsfrist." },
  { slug: "prisestimat-overskridet", title: "Håndverker krever mer enn estimat (15 %-regelen)", lawRef: "HTL § 32", cat: "handverkere", desc: "Overskridelse over 15 % av estimat er ulovlig uten forhåndsvarsel." },

  // HÅNDVERKERE (10 nye noder med FAQs)
  { slug: "drenering-svikter", title: "Drenering som svikter etter legging: Reklamasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Sviktende drenering etter ferdigstilt arbeid er mangel etter håndverkertjenesteloven.", faqs: [
    { q: "Kjelleren er fuktig etter ny drenering. Hva gjør jeg?", a: "Reklamér skriftlig til håndverkeren umiddelbart. Dokumenter fuktskadene med bilder. Krev utbedring uten ekstra kostnad — mangelfullt arbeid er håndverkerens ansvar." },
    { q: "Håndverkeren sier fukt skyldes feil jeg har gjort. Hvem har bevisbyrden?", a: "Håndverkeren har bevisbyrden for at feilen skyldes noe utenfor hans kontroll. Uten dokumentasjon er utgangspunktet at arbeidet er mangelfullt." },
  ]},
  { slug: "maling-flasser-av", title: "Maling som flasser av etter kort tid: Reklamasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Maling som flasser av innen kort tid er ikke fagmessig utført og gir reklamasjonsrett.", faqs: [
    { q: "Malingen flasser av etter 6 måneder. Håndverkeren sier det er underlaget som er feil. Hvem har rett?", a: "Håndverkeren plikter å vurdere underlagets egnethet før maling. Dersom han malte på et uegnet underlag uten forbehold, er det hans ansvar." },
    { q: "Kan jeg kreve at alt males om for håndverkerens regning?", a: "Ja, dersom flassing skyldes mangelfullt arbeid. Du kan kreve full utbedring. Dersom håndverkeren nekter, kan du engasjere andre og kreve kostnaden dekket." },
  ]},
  { slug: "varmepumpe-stoy", title: "Varmepumpe som støyer etter installasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Støyende varmepumpe kan skyldes feil montering — reklamasjon er aktuelt.", faqs: [
    { q: "Varmepumpen lager metallisk lyd etter montering. Er det en mangel?", a: "Ja, dersom støyen skyldes feil montering, feiljustert kompressor eller manglende vibrasjonsdempere som installatøren burde lagt inn." },
    { q: "Installatøren sier støyen er normalt for denne modellen. Hva gjør jeg?", a: "Be om dokumentasjon fra produsenten. Dersom produsenten ikke bekrefter at støyen er normal, er installatørens påstand ikke holdbar." },
  ]},
  { slug: "kjokken-montering-skjev", title: "Skjev kjøkkenmontering: Reklamasjon på håndverker", lawRef: "HTL § 5", cat: "handverkere", desc: "Skjevt montert kjøkken er ikke fagmessig utført og gir krav på utbedring.", faqs: [
    { q: "Kjøkkenskap henger ikke rett og dørene slår igjen av seg selv. Er det reklamasjonsgrunnlag?", a: "Ja, fagmessig montering innebærer at skap henger rett og dører fungerer. Skjev montering er mangel håndverkeren må utbedre." },
    { q: "Håndverkeren nekter å komme tilbake. Hva gjør jeg?", a: "Du kan engasjere en annen håndverker, dokumentere feilen og sende regningen til den opprinnelige. Inkluder skriftlig reklamasjon og bevis for mangelen." },
  ]},
  { slug: "parkett-buing-sprekker", title: "Parkett som buer seg eller sprekker etter legging", lawRef: "HTL § 5", cat: "handverkere", desc: "Parkett som ikke ligger flatt er normalt feil legging — håndverkeren er ansvarlig.", faqs: [
    { q: "Parketten buer seg opp etter 3 måneder. Håndverkeren sier det er luftfuktigheten. Har han rett?", a: "Mulig, men håndverkeren plikter å informere om krav til luftfuktighet og underlag. Dersom dette ikke ble gjort, er det hans ansvar." },
    { q: "Sprekker mellom parkettstaver etter vinteren. Er det reklamasjonsgrunnlag?", a: "Naturlig bevegelse i tre er normalt, men store sprekker kan tyde på feil akklimatisering av parketten før legging — håndverkers ansvar." },
  ]},
  { slug: "flislegging-mangelfull", title: "Flis som løsner eller sprekker etter legging", lawRef: "HTL § 5", cat: "handverkere", desc: "Flis som løsner er klassisk reklamasjonssak mot flislegger.", faqs: [
    { q: "Fliser på badet løsner etter 1 år. Er det reklamasjonsgrunnlag?", a: "Ja, flis som løsner etter 1 år er klar indikasjon på feil lim, feil underlag eller feil fuktsperre — alt er håndverkers ansvar." },
    { q: "Håndverkeren sier jeg rengjorde feil og løste limet. Kan han ha rett?", a: "Han må dokumentere dette. Normal rengjøring med vanlige midler skal ikke løse flislim. Påstanden er hans å bevise." },
  ]},
  { slug: "elektriker-feil-installasjon", title: "Feil elektrisk installasjon: Klage på elektriker", lawRef: "HTL § 5", cat: "handverkere", desc: "Feil elektrisk arbeid er både en mangel og en sikkerhetsrisiko.", faqs: [
    { q: "Sikringen løser ut jevnlig etter ny elektrisk installasjon. Er det en mangel?", a: "Ja, en fungerende elektrisk installasjon skal ikke utløse sikringer under normal bruk. Reklamér skriftlig og krev at elektrikeren retter feilen." },
    { q: "Elektrikeren har ikke levert samsvarserklæring. Hva betyr det?", a: "Uten samsvarserklæring er arbeidet ikke godkjent etter norske forskrifter. Elektrikeren plikter å levere denne — mangel på samsvarserklæring er i seg selv en mangel." },
  ]},
  { slug: "murer-arbeid-mangelfull", title: "Mangelfullt murerarbeid: Sprekker og setninger", lawRef: "HTL § 5", cat: "handverkere", desc: "Sprekker i mur kort tid etter arbeid tyder på feil utførelse.", faqs: [
    { q: "Murpussen sprekker opp etter én vinter. Er det reklamasjonsgrunnlag?", a: "Ja, dersom sprekkdannelser skyldes feil pussmetode, feil produktvalg eller påføring under feil temperaturbetingelser — alt er håndverkers ansvar." },
    { q: "Mureren sier sprekkene skyldes naturlig setning i bygget. Kan han ha rett?", a: "Mulig, men han må dokumentere dette. Nye sprekker i nytt murverk presumeres å skylde feil utførelse inntil annet er bevist." },
  ]},
  { slug: "rorlegger-lekkasje", title: "Lekkasje fra rørleggerarbeid: Reklamasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Rørlekkasje etter ferdigstilt arbeid er mangel rørlegger er ansvarlig for.", faqs: [
    { q: "Det lekker fra røret rørleggeren byttet for 2 måneder siden. Hva gjør jeg?", a: "Reklamér umiddelbart og stopp lekkasjen om mulig. Rørlegger plikter å utbedre vederlagsfritt. Dokumenter skader med bilder." },
    { q: "Lekkasjen har gitt vannskader i etasjen under. Kan jeg kreve erstatning for dette?", a: "Ja, dersom lekkasjen skyldes mangelfullt arbeid kan du kreve erstatning for dokumenterte følgeskader, inkludert tørkekostnader og reparasjon." },
  ]},
  { slug: "takstein-feil-montering", title: "Feil monterte takstein: Lekkasje og skader", lawRef: "HTL § 5", cat: "handverkere", desc: "Tak som lekker etter ny taklegging er klar mangel med lang reklamasjonsfrist.", faqs: [
    { q: "Taket lekker etter ny takstein ble lagt. Er det håndverkerens ansvar?", a: "Ja, et nytt tak skal ikke lekke. Lekkasje etter ny legging er klar mangel, uavhengig av vær- og vindforhold innenfor normale norske forhold." },
    { q: "Håndverkeren sier lekkasjen skyldes ekstremt uvær. Hva gjør jeg?", a: "Be om værvarslings-dokumentasjon for perioden. Normalt norsk høstvær er ikke ekstraordinært. Taket skal tåle det." },
  ]},
];

/** Helper: get all nodes for a category */
export function getNodesByCategory(cat: SeoNode["cat"]): SeoNode[] {
  return SEO_NODES.filter((n) => n.cat === cat);
}

/** Helper: get a specific node by cat + slug */
export function getNode(cat: SeoNode["cat"], slug: string): SeoNode | undefined {
  return SEO_NODES.find((n) => n.cat === cat && n.slug === slug);
}

/** Helper: get related nodes (same category, exclude current) */
export function getRelatedNodes(cat: SeoNode["cat"], currentSlug: string, limit = 5): SeoNode[] {
  return SEO_NODES.filter((n) => n.cat === cat && n.slug !== currentSlug).slice(0, limit);
}

/** Category display names and wizard paths */
export const CAT_CONFIG: Record<
  SeoNode["cat"],
  { label: string; wizardPath: string; pillarPath: string; pillarAnchor: string }
> = {
  bilkjop: {
    label: "Bilkjøp",
    wizardPath: "/bilkjop",
    pillarPath: "/bilkjop/heving",
    pillarAnchor: "heve bilkjøpet",
  },
  flyreiser: {
    label: "Flyreiser",
    wizardPath: "/flyreiser",
    pillarPath: "/flyreiser",
    pillarAnchor: "flypassasjerrettigheter",
  },
  "mc-kjop": {
    label: "MC-kjøp",
    wizardPath: "/bilkjop",
    pillarPath: "/mc-kjop/mc-feil",
    pillarAnchor: "feil på MC etter kjøp",
  },
  handverkere: {
    label: "Håndverkere",
    wizardPath: "/handverkere",
    pillarPath: "/handverkere",
    pillarAnchor: "klage på håndverker",
  },
};
