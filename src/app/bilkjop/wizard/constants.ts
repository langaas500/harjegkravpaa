export const ISSUE_OPTIONS = [
  { id: "engine", label: "Motor / ytelse / oljeforbruk" },
  { id: "gearbox", label: "Girkasse / clutch / drivverk" },
  { id: "electric", label: "Elektrisk / batteri / lading" },
  { id: "rust", label: "Rust / karosseri / lakk" },
  { id: "brakes", label: "Bremser / hjuloppheng" },
  { id: "other", label: "Annet / flere feil" },
];

export const COST_OPTIONS = [
  { id: "unknown", label: "Vet ikke ennå", desc: "Ikke fått pristilbud" },
  { id: "low", label: "Under 10 000 kr", desc: "Mindre reparasjon" },
  { id: "medium", label: "10 000 – 30 000 kr", desc: "Moderat reparasjon" },
  { id: "high", label: "30 000 – 60 000 kr", desc: "Større reparasjon" },
  { id: "extreme", label: "Over 60 000 kr", desc: "Omfattende / totalskade" },
];

export function parsePrice(raw: string): number {
  const s = (raw ?? "").trim();
  if (!s) return 0;

  let t = s.replace(/[^\d.,]/g, "");
  if (!t) return 0;

  const lastDot = t.lastIndexOf(".");
  const lastComma = t.lastIndexOf(",");

  if (lastDot !== -1 && lastComma !== -1) {
    const decimalSep = lastDot > lastComma ? "." : ",";
    const thousandSep = decimalSep === "." ? "," : ".";
    t = t.split(thousandSep).join("");
    if (decimalSep === ",") t = t.replace(",", ".");
  } else {
    const sep = lastDot !== -1 ? "." : lastComma !== -1 ? "," : null;
    if (sep) {
      const parts = t.split(sep);
      const isThousands =
        parts.length > 1 &&
        parts.slice(1).every((p) => p.length === 3) &&
        parts[0].length >= 1;
      if (isThousands) {
        t = parts.join("");
      } else if (sep === ",") {
        t = t.replace(",", ".");
      }
    }
  }

  const n = Number(t);
  return Number.isFinite(n) ? n : 0;
}
