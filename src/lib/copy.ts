/**
 * Sentralisert tekstfil for all brukerrettet tekst
 *
 * KRITISK: Denne filen skal ALDRI inneholde ord som:
 * - AI, kunstig intelligens, maskinlæring, modell, algoritme, LLM
 * - "generert", "automatisk generert", "systemet", "verktøyet"
 * - referanser til analyse/generering som metode
 *
 * TILLATT: Beskriv resultatet, ikke metoden:
 * - "Basert på opplysningene du har gitt..."
 * - "Vi har vurdert saken..."
 * - "Du får en skriftlig vurdering..."
 */

// =============================================================================
// FORBUDTE ORD - Brukes av copy-gate for validering
// =============================================================================
export const FORBIDDEN_WORDS = [
  'ai',
  'artificial intelligence',
  'kunstig intelligens',
  'maskinlæring',
  'machine learning',
  'modell',
  'algoritme',
  'algorithm',
  'llm',
  'language model',
  'språkmodell',
  'generert',
  'generated',
  'automatisk',
  'automatic',
  'systemet vurderer',
  'verktøyet',
  'the tool',
  'the system',
] as const;

// Ord som er OK i teknisk kontekst men ikke i brukerrettet tekst
export const CONTEXT_SENSITIVE_WORDS = [
  'modell', // OK i "bilmodell", ikke OK i "AI-modell"
] as const;

// =============================================================================
// COPY GATE - Validerer tekst mot forbudte ord
// =============================================================================
export function validateCopy(text: string, context?: string): { valid: boolean; violations: string[] } {
  const violations: string[] = [];
  const lowerText = text.toLowerCase();

  for (const word of FORBIDDEN_WORDS) {
    // Spesialbehandling for "modell" - tillat "bilmodell", "årsmodell" etc.
    if (word === 'modell') {
      // Sjekk om "modell" brukes i AI-kontekst
      if (lowerText.includes('ai-modell') ||
          lowerText.includes('ai modell') ||
          lowerText.includes('språkmodell') ||
          (lowerText.includes('modell') && lowerText.includes('kunstig'))) {
        violations.push(`Forbudt bruk av "modell" i AI-kontekst`);
      }
      continue;
    }

    if (lowerText.includes(word)) {
      violations.push(`Forbudt ord funnet: "${word}"${context ? ` i ${context}` : ''}`);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

// =============================================================================
// WIZARD TEKSTER
// =============================================================================
export const WIZARD_COPY = {
  // Steg-titler
  steps: {
    intro: 'Start din sak',
    vehicle: 'Om kjøretøyet',
    seller: 'Om selger',
    issues: 'Hva er problemet?',
    cost: 'Kostnader',
    timing: 'Tidslinje',
    contact: 'Kontakt med selger',
    description: 'Beskrivelse',
    legal: 'Juridiske detaljer',
    additionalInfo: 'Tilleggsinformasjon',
    result: 'Din vurdering',
  },

  // Knapper
  buttons: {
    next: 'Neste',
    back: 'Tilbake',
    analyze: 'Vurder saken min',
    analyzing: 'Vurderer saken...',
    getReport: 'Få full rapport',
    getClaimLetter: 'Få kravbrev',
    download: 'Last ned',
    copy: 'Kopier',
  },

  // Hjelpetekster
  help: {
    additionalInfo: 'Jo mer relevant informasjon du gir, desto bedre blir vurderingen og dokumentene. Dette gjør saken din sterkere.',
    description: 'Beskriv problemet med egne ord. Vær så konkret som mulig.',
  },

  // Feilmeldinger
  errors: {
    analysisError: 'Kunne ikke fullføre vurderingen. Vennligst prøv igjen.',
    missingData: 'Fant ikke saksdata. Vennligst start på nytt.',
    paymentError: 'Kunne ikke starte betaling. Prøv igjen.',
  },
} as const;

// =============================================================================
// RAPPORT TEKSTER
// =============================================================================
export const REPORT_COPY = {
  title: 'Din vurdering',
  subtitle: 'Basert på opplysningene du har gitt',

  sections: {
    summary: 'Oppsummering',
    keyPoints: 'Viktige punkter',
    legalBasis: 'Juridisk grunnlag',
    nextSteps: 'Anbefalte neste steg',
    proTip: 'Tips',
  },

  disclaimer: 'Vurderingen er veiledende og basert på informasjonen du har oppgitt. For bindende juridisk rådgivning, kontakt en advokat.',

  confidence: {
    high: 'Høy',
    medium: 'Middels',
    low: 'Lav',
  },
} as const;

// =============================================================================
// KRAVBREV TEKSTER
// =============================================================================
export const CLAIM_LETTER_COPY = {
  title: 'Kravbrev',
  subtitle: 'Formelt reklamasjonsbrev til selger',

  intro: 'Du kan sende dette brevet direkte til selger. Brevet er utformet basert på opplysningene i saken din og norsk forbrukerlovgivning.',

  buttons: {
    generate: 'Lag kravbrev',
    generating: 'Utformer kravbrev...',
    copyText: 'Kopier tekst',
    downloadPdf: 'Last ned PDF',
    downloadWord: 'Last ned Word',
    downloadTxt: 'Last ned TXT',
  },

  claimTypes: {
    repair: {
      title: 'Retting',
      description: 'Krev at selger reparerer feilen',
    },
    discount: {
      title: 'Prisavslag',
      description: 'Krev pengene tilbake for verditapet',
    },
    cancel: {
      title: 'Heving',
      description: 'Krev å få hele kjøpet omgjort',
    },
  },
} as const;

// =============================================================================
// PDF TEKSTER
// =============================================================================
export const PDF_COPY = {
  header: {
    title: 'Vurderingsrapport',
    subtitle: 'harjegkravpå.no',
  },

  footer: {
    disclaimer: 'Dette dokumentet er utarbeidet av harjegkravpå.no som et hjelpemiddel for forbrukere i forbindelse med reklamasjon på bruktbilkjøp.',
    legal: 'Vurderingen er veiledende og basert på informasjonen som er oppgitt. For bindende juridisk rådgivning, kontakt en advokat.',
    copyright: '© harjegkravpå.no',
  },

  sections: {
    vehicleInfo: 'Kjøretøyinformasjon',
    issueDescription: 'Problembeskrivelse',
    assessment: 'Vurdering',
    recommendation: 'Anbefaling',
    attachments: 'Vedlegg',
  },
} as const;

// =============================================================================
// GENERELLE TEKSTER
// =============================================================================
export const GENERAL_COPY = {
  loading: 'Laster...',
  error: 'Noe gikk galt',
  tryAgain: 'Prøv igjen',
  cancel: 'Avbryt',
  save: 'Lagre',
  close: 'Lukk',
  yes: 'Ja',
  no: 'Nei',

  // Bekreftelser
  copied: 'Kopiert!',
  saved: 'Lagret!',
  downloaded: 'Lastet ned!',
} as const;

// =============================================================================
// VALIDERING VED IMPORT (Development mode)
// =============================================================================
if (process.env.NODE_ENV === 'development') {
  const allCopy = {
    WIZARD_COPY,
    REPORT_COPY,
    CLAIM_LETTER_COPY,
    PDF_COPY,
    GENERAL_COPY,
  };

  function deepValidate(obj: unknown, path: string = ''): string[] {
    const violations: string[] = [];

    if (typeof obj === 'string') {
      const result = validateCopy(obj, path);
      violations.push(...result.violations);
    } else if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        const newPath = path ? `${path}.${key}` : key;
        violations.push(...deepValidate(value, newPath));
      }
    }

    return violations;
  }

  const violations = deepValidate(allCopy);
  if (violations.length > 0) {
    console.error('❌ COPY GATE FEIL - Forbudte ord funnet i copy.ts:');
    violations.forEach(v => console.error(`  - ${v}`));
    // I development: kast feil for å stoppe bygging
    // throw new Error('Copy gate validation failed');
  }
}
