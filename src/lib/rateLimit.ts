import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup every 10 minutes to prevent memory leak
let lastCleanup = Date.now();
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 600_000) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

function check(key: string, max: number, windowMs: number): boolean {
  cleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export function getIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function masked(ip: string): string {
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.***`;
  return ip.slice(0, 8) + "***";
}

const HOUR = 3_600_000;
const DAY = 86_400_000;

interface RateLimitRule {
  max: number;
  windowMs: number;
  label: string;
}

const ROUTE_RULES: Record<string, RateLimitRule[]> = {
  analyze: [
    { max: 10, windowMs: HOUR, label: "hourly" },
    { max: 50, windowMs: DAY, label: "daily" },
  ],
  upload: [{ max: 20, windowMs: DAY, label: "daily" }],
  contact: [{ max: 3, windowMs: HOUR, label: "hourly" }],
};

export function rateLimit(
  req: NextRequest,
  route: "analyze" | "upload" | "contact"
): NextResponse | null {
  const ip = getIP(req);
  const rules = ROUTE_RULES[route];

  for (const rule of rules) {
    const key = `${route}:${rule.label}:${ip}`;
    if (!check(key, rule.max, rule.windowMs)) {
      console.log(
        `[rate-limit] BLOCKED route=${route} ip=${masked(ip)} rule=${rule.label}`
      );
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  }

  return null;
}
