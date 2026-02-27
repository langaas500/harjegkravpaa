import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { resolveAccessToken } from "@/lib/session";
import { getCaseByAccessTokenAdmin } from "@/lib/supabase";

const CATEGORY_TO_CASE_TYPE: Record<string, string> = {
  bilkjop: "BIL",
  handverkere: "HANDVERK",
  flyreiser: "FLYREISER",
};

// LIVE Price IDs fra Stripe Dashboard
const PRICE_IDS: Record<string, string> = {
  REPORT: "price_1SqW7hCCpSOV7VNPm41GEzmK",   // 39 NOK
  KRAVBREV: "price_1SqW8vCCpSOV7VNPxmhEQDYQ", // 99 NOK
};

const VALID_PRODUCT_TYPES = Object.keys(PRICE_IDS);

export async function POST(req: NextRequest) {
  // Sjekk env vars
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe er ikke konfigurert" },
      { status: 500 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (!siteUrl) {
    return NextResponse.json(
      { error: "Site URL er ikke konfigurert" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const body = await req.json();
    const { token, productType, category, returnPath } = body;

    // Resolve token: body first, then cookie fallback
    let resolvedToken = typeof token === "string" && token ? token : null;
    if (!resolvedToken && category) {
      const caseType = CATEGORY_TO_CASE_TYPE[category];
      if (caseType) {
        resolvedToken = await resolveAccessToken(req, caseType);
      }
    }

    console.log("[create-checkout] Request:", { productType, category, returnPath, hasToken: !!resolvedToken });

    if (!resolvedToken) {
      console.error("[create-checkout] Token mangler (body + cookie)");
      return NextResponse.json(
        { error: "Token mangler" },
        { status: 400 }
      );
    }

    if (!returnPath || typeof returnPath !== "string") {
      return NextResponse.json(
        { error: "returnPath mangler" },
        { status: 400 }
      );
    }

    // Strict productType validation – reject unknown types
    if (!productType || !VALID_PRODUCT_TYPES.includes(productType)) {
      console.error("[create-checkout] Ugyldig productType:", productType);
      return NextResponse.json(
        { error: "Ugyldig produkttype" },
        { status: 400 }
      );
    }

    // Check if already paid
    const caseRecord = await getCaseByAccessTokenAdmin(resolvedToken);
    if (
      caseRecord?.stripe_session_id &&
      (caseRecord.status === "paid" || caseRecord.status === "paid_kravbrev")
    ) {
      return NextResponse.json(
        { error: "Already paid" },
        { status: 400 }
      );
    }

    // Strict mapping – no fallback
    const priceId = PRICE_IDS[productType];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "nb",
      payment_method_types: ["card", "klarna"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: resolvedToken,
      metadata: {
        token: resolvedToken,
        productType,
        category: category || "",
      },
      success_url: `${siteUrl}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${returnPath}`,
    });

    console.log("[create-checkout] Session created:", { sessionId: session.id, productType, priceId });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[create-checkout] Stripe error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling" },
      { status: 500 }
    );
  }
}
