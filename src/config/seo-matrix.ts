export interface SeoNode {
  slug: string;
  title: string;
  lawRef: string;
  cat: "bilkjop" | "flyreiser" | "mc-kjop" | "handverkere";
  desc: string;
}

export const SEO_NODES: SeoNode[] = [
  // BILKJØP (20 noder) — URL: /bilkjop/[slug]
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
  { slug: "hybrid-batteri-feil", title: "Defekt hybridbatteri på brukt hybridbil", lawRef: "FKL § 15", cat: "bilkjop", desc: "Hybridbatteri som ikke holder kapasitet er reklamasjonsgrunnlag mot selger." },

  // FLYREISER (10 noder) — URL: /flyreiser/[slug]
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

  // MC-KJØP (6 noder) — URL: /mc-kjop/[slug]
  { slug: "mc-rammeskade-skjult", title: "Skjult rammeskade på brukt motorsykkel", lawRef: "KL § 19", cat: "mc-kjop", desc: "Uopplyst rammeskade på MC er vesentlig mangel og gir hevingsrett." },
  { slug: "mc-ulovlig-trimmet", title: "Kjøpt ulovlig trimmet MC uten å vite det?", lawRef: "KL § 18", cat: "mc-kjop", desc: "Ulovlig trimming som ikke ble opplyst om er svik og gir hevingsrett." },
  { slug: "mc-motorbank-ulyd", title: "Ulyd og motorbank på MC: Reklamasjon", lawRef: "KL § 39", cat: "mc-kjop", desc: "Motorbank kort tid etter kjøp presumeres å være skjult mangel." },
  { slug: "mc-simmerringer-lekkasje", title: "Lekkasje i dempere (simmerringer) etter MC-kjøp", lawRef: "KL § 17", cat: "mc-kjop", desc: "Lekkende simmerringer som ikke ble opplyst om er reklamasjonsgrunnlag." },
  { slug: "mc-elektrisk-feil", title: "Gjentatte elektriske feil på MC etter kjøp", lawRef: "KL § 39", cat: "mc-kjop", desc: "Elektriske feil som var latente ved kjøp gir rett til reklamasjon." },
  { slug: "mc-abs-feil", title: "Defekt ABS-system på brukt MC", lawRef: "KL § 17", cat: "mc-kjop", desc: "ABS-feil er sikkerhetskritisk og gir sterk reklamasjonsrett." },

  // HÅNDVERKERE (5 noder) — URL: /handverkere/[slug]
  { slug: "bad-lekkasje-oppussing", title: "Vannlekkasje etter renovering av bad", lawRef: "HTL § 5", cat: "handverkere", desc: "Lekkasje etter baderomsrenovering er mangel etter håndverkertjenesteloven." },
  { slug: "forsinket-handverker-dagmulkt", title: "Håndverker er forsinket: Krav på dagmulkt", lawRef: "HTL § 11", cat: "handverkere", desc: "Ved forsinkelse utover avtalt tid kan du kreve dagmulkt uten å bevise tap." },
  { slug: "samsvarserklaring-mangler", title: "Mangler samsvarserklæring på el-arbeid", lawRef: "HTL § 5", cat: "handverkere", desc: "Manglende samsvarserklæring er mangel som gir rett til utbedring uten kostnad." },
  { slug: "tak-utett-lekkasje", title: "Utett tak etter taktekking: Reklamasjon", lawRef: "HTL § 5", cat: "handverkere", desc: "Taklekkasje etter nytt tak er klar mangel med lang reklamasjonsfrist." },
  { slug: "prisestimat-overskridet", title: "Håndverker krever mer enn estimat (15 %-regelen)", lawRef: "HTL § 32", cat: "handverkere", desc: "Overskridelse over 15 % av estimat er ulovlig uten forhåndsvarsel." },
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
