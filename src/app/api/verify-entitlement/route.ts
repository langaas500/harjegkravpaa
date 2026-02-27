import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resolveAccessToken } from "@/lib/session";

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { ok: false, reason: "config" },
      { status: 500 }
    );
  }

  try {
    const { productType, case_type } = await req.json();

    if (!case_type || typeof case_type !== "string") {
      return NextResponse.json({ ok: false, reason: "missing_case_type" });
    }

    const accessToken = await resolveAccessToken(req, case_type);
    if (!accessToken) {
      return NextResponse.json({ ok: false, reason: "no_session" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("cases")
      .select("status")
      .eq("access_token", accessToken)
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
