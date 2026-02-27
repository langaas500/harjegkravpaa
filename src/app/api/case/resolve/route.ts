import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  createSession,
  getSessionTokensFromCookie,
  setSessionCookie,
} from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { access_token } = await req.json();
    if (!access_token || typeof access_token !== "string") {
      return NextResponse.json({ error: "Token mangler" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Server config" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: caseData } = await supabase
      .from("cases")
      .select("case_type")
      .eq("access_token", access_token)
      .single();

    if (!caseData) {
      return NextResponse.json(
        { error: "Sak ikke funnet" },
        { status: 404 }
      );
    }

    const sessionToken = await createSession(
      access_token,
      caseData.case_type
    );

    const existing = getSessionTokensFromCookie(req);
    const res = NextResponse.json({
      ok: true,
      case_type: caseData.case_type,
    });
    setSessionCookie(res, sessionToken, existing);

    return res;
  } catch (error) {
    console.error("[case/resolve] Error:", error);
    return NextResponse.json({ error: "Intern feil" }, { status: 500 });
  }
}
