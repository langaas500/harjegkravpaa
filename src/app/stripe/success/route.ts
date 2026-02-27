import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createSession,
  getSessionTokensFromCookie,
  setSessionCookie,
} from "@/lib/session";
import { getCaseByAccessTokenAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const RETURN_PATHS: Record<string, Record<string, string>> = {
  bilkjop: {
    REPORT: "/bilkjop/betalt",
    KRAVBREV: "/bilkjop/kravbrev/betalt",
  },
  handverkere: {
    REPORT: "/handverkere/betalt",
    KRAVBREV: "/handverkere/kravbrev/betalt",
  },
  flyreiser: {
    REPORT: "/flyreiser/betalt",
    KRAVBREV: "/flyreiser/kravbrev/betalt",
  },
};

const CATEGORY_TO_CASE_TYPE: Record<string, string> = {
  bilkjop: "BIL",
  handverkere: "HANDVERK",
  flyreiser: "FLYREISER",
};

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) return NextResponse.redirect(new URL("/", req.url));

  let session: Stripe.Checkout.Session;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = session.client_reference_id;
  if (!token) return NextResponse.redirect(new URL("/", req.url));

  // Poll for webhook to update status (max 5 attempts × 1 second)
  for (let attempt = 0; attempt < 5; attempt++) {
    const caseRecord = await getCaseByAccessTokenAdmin(token);
    if (
      caseRecord?.status === "paid" ||
      caseRecord?.status === "paid_kravbrev"
    ) {
      break;
    }
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  const category = session.metadata?.category || "";
  const productType = session.metadata?.productType || "";
  const caseType = CATEGORY_TO_CASE_TYPE[category] || "";

  // Determine redirect path
  const path = RETURN_PATHS[category]?.[productType];
  const redirectUrl = path || `/sak/${token}`;

  const res = NextResponse.redirect(new URL(redirectUrl, req.url));

  // Create session and set cookie
  try {
    if (caseType) {
      const sessionToken = await createSession(token, caseType);
      const existing = getSessionTokensFromCookie(req);
      setSessionCookie(res, sessionToken, existing);
    }
  } catch (err) {
    console.error("[stripe-success] Session creation failed:", err);
  }

  return res;
}
