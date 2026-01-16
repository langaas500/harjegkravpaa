import { NextRequest, NextResponse } from "next/server";
import { getCaseByAccessToken } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

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
