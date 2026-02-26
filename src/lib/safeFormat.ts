/** Format a numeric value as "kr X,-" or return fallback if invalid/NaN */
export function safeMoney(
  val: unknown,
  fallback = "[beløp ukjent]"
): string {
  if (val === null || val === undefined || val === "") return fallback;
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return `kr ${n.toLocaleString("nb-NO")},-`;
}

/** Format a numeric value with unit or return fallback if invalid/NaN */
export function safeNumber(
  val: unknown,
  unit: string,
  fallback = "[ukjent]"
): string {
  if (val === null || val === undefined || val === "") return fallback;
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return `${n.toLocaleString("nb-NO")} ${unit}`;
}

/** Safe days-since calculation. Returns null if date is invalid/missing. */
export function daysSince(dateStr: unknown): number | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
}

/** Check if value is a non-empty string */
export function isNonEmpty(val: unknown): val is string {
  return typeof val === "string" && val.trim().length > 0;
}

/** Check if value is a finite positive number */
export function isFinitePositive(val: unknown): boolean {
  const n = Number(val);
  return Number.isFinite(n) && n > 0;
}
