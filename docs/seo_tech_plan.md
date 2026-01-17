# SEO Technical Plan (Invisible)

## SEO Routes to Process

### Bilkjop SEO Pages (DO NOT TOUCH WIZARD)

- /bilkjop/bruktbil-feil
- /bilkjop/reklamasjon
- /bilkjop/garanti
- /bilkjop/heving
- /bilkjop/privat-kjop
- /bilkjop/forhandler

### MC-kjop SEO Pages

- /mc-kjop/heving
- /mc-kjop/garanti
- /mc-kjop/mc-feil
- /mc-kjop/reklamasjon
- /mc-kjop/privat-kjop
- /mc-kjop/forhandler

### Fly SEO Pages

- /fly-forsinket
- /fly-kansellert
- /mistet-bagasje
- /nektet-ombordstigning

## FORBIDDEN - DO NOT TOUCH

- /bilkjop/page.tsx (wizard)
- /bilkjop/rapport/\* (PDF)
- /bilkjop/betalt/\*
- /bilkjop/kravbrev/\* (PDF)
- /bilkjop/dokumenter/\* (PDF)
- /flyreiser/page.tsx (wizard)
- /flyreiser/rapport/\* (PDF)
- /flyreiser/betalt/\*
- All API routes
- src/lib/documentStorage.ts
- Any file containing jspdf/pdf generation

## Implementation Plan

1. Create src/lib/seo/jsonld.ts - JSON-LD schema builders
2. Create src/components/SeoJsonLd.tsx - Script tag renderer
3. Add generateMetadata() to each SEO page (metadata only, no JSX changes)
4. Add JSON-LD injection to each SEO page
5. Create app/sitemap.ts
6. Create app/robots.ts

## Verification

- npm run build must pass
- git diff must show only metadata/schema additions
- No changes to wizard logic
- No changes to PDF code
