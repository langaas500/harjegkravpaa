import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const token = body?.access_token;

  if (!token || typeof token !== "string" || !/^[0-9a-f]{64}$/.test(token)) {
    return NextResponse.json({ error: "Ugyldig token" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("cases")
    .select("id")
    .eq("access_token", token)
    .single();

  if (!existing) {
    return NextResponse.json({ error: "Sak ikke funnet" }, { status: 404 });
  }

  await supabase.from("cases").delete().eq("id", existing.id);
  console.log("GDPR delete: case", existing.id);

  return NextResponse.json({ ok: true });
}
