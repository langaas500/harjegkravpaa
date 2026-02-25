import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { ok: false, reason: "config" },
      { status: 500 }
    );
  }

  try {
    const { token, productType } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ ok: false, reason: "missing_token" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("cases")
      .select("status")
      .eq("access_token", token)
      .single();

    if (error || !data) {
      return NextResponse.json({ ok: false, reason: "not_found" });
    }

    const validStatuses: Record<string, string[]> = {
      KRAVBREV: ["paid_kravbrev"],
      REPORT: ["paid", "paid_kravbrev"],
    };

    const allowed = validStatuses[productType] || [];
    const ok = allowed.includes(data.status);

    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "error" },
      { status: 500 }
    );
  }
}
