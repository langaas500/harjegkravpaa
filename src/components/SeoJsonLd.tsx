// Server Component for injecting JSON-LD structured data
// This component renders an invisible script tag - no UI impact

interface SeoJsonLdProps {
  data: object | object[];
}

export default function SeoJsonLd({ data }: SeoJsonLdProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
