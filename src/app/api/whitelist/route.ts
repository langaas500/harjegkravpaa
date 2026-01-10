// src/app/api/whitelist/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let email = "";
    let source = "web";

    if (contentType.includes("application/json")) {
      const body = (await req.json()) as { email?: string; source?: string };
      email = String(body.email || "").trim().toLowerCase();
      source = String(body.source || "web");
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      source = String(form.get("source") || "web");
    } else {
      const text = await req.text();
      try {
        const body = JSON.parse(text);
        email = String(body.email || "").trim().toLowerCase();
        source = String(body.source || "web");
      } catch {
        email = "";
      }
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Ugyldig e-post." }, { status: 400 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({
        ok: true,
        stored: false,
        note: "Mottatt (ingen DB koblet til ennå). Sett SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY for lagring.",
      });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/whitelist`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify([{ email, source }]),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, error: "DB-feil", details: errText }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Serverfeil", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
