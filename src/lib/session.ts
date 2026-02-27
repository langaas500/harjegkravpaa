import { createHash, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "case_sessions";
const MAX_SESSIONS = 5;
const SESSION_EXPIRY_DAYS = 7;

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY er ikke konfigurert");
  }
  return createClient(url, key);
}

function hashSessionToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

function generateSessionToken(): string {
  return `st_${randomUUID().replace(/-/g, "")}${randomUUID().replace(/-/g, "")}`;
}

export function getSessionTokensFromCookie(req: NextRequest): string[] {
  const value = req.cookies.get(COOKIE_NAME)?.value;
  if (!value) return [];
  return value.split("|").filter((t) => t.startsWith("st_"));
}

export function setSessionCookie(
  res: NextResponse,
  newToken: string,
  existingTokens: string[]
): void {
  const tokens = [newToken, ...existingTokens].slice(0, MAX_SESSIONS);
  res.cookies.set(COOKIE_NAME, tokens.join("|"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_EXPIRY_DAYS * 24 * 60 * 60,
  });
}

export async function createSession(
  accessToken: string,
  caseType: string
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const sessionToken = generateSessionToken();
  const sessionHash = hashSessionToken(sessionToken);
  const expiresAt = new Date(
    Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const { error } = await supabase.from("case_sessions").insert({
    session_hash: sessionHash,
    access_token: accessToken,
    case_type: caseType,
    expires_at: expiresAt,
  });

  if (error) {
    console.error("[session] Insert error:", error.message);
    throw new Error("Kunne ikke opprette sesjon");
  }

  return sessionToken;
}

export async function resolveAccessToken(
  req: NextRequest,
  caseType: string
): Promise<string | null> {
  const tokens = getSessionTokensFromCookie(req);
  if (tokens.length === 0) return null;

  const supabase = getSupabaseAdmin();
  const hashes = tokens.map((t) => hashSessionToken(t));

  const { data } = await supabase
    .from("case_sessions")
    .select("access_token")
    .in("session_hash", hashes)
    .eq("case_type", caseType)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data?.access_token ?? null;
}
