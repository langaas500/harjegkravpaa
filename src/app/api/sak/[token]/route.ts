import { NextRequest, NextResponse } from "next/server";
import { getCaseByAccessToken } from "@/lib/supabase";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  if (entry.count > maxRequests) return true;
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60_000);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "For mange forespørsler. Prøv igjen om litt." },
      { status: 429 }
    );
  }

  if (!token || token.length < 32) {
    return NextResponse.json(
      { error: "Ugyldig tilgangslenke" },
      { status: 400 }
    );
  }

  const caseData = await getCaseByAccessToken(token);

  if (!caseData) {
    return NextResponse.json(
      { error: "Saken ble ikke funnet" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: caseData.id,
    case_type: caseData.case_type,
    payload: caseData.payload,
    outcome: caseData.outcome,
    status: caseData.status,
    created_at: caseData.created_at,
  });
}
