import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// LIVE Price IDs fra Stripe Dashboard
const PRICE_IDS = {
  REPORT: "price_1SqW7hCCpSOV7VNPm41GEzmK",   // 39 NOK
  KRAVBREV: "price_1SqW8vCCpSOV7VNPxmhEQDYQ", // 99 NOK
} as const;

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

    console.log("[create-checkout] Request:", { productType, category, returnPath, tokenPrefix: token?.substring(0, 8) });

    // Valider påkrevde felter
    if (!token || typeof token !== "string") {
      console.error("[create-checkout] Token mangler");
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

    // Velg price basert på productType
    const priceId = productType === "KRAVBREV" ? PRICE_IDS.KRAVBREV : PRICE_IDS.REPORT;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "klarna"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: token,
      metadata: {
        token,
        productType: productType || "REPORT",
        category: category || "",
      },
      success_url: `${siteUrl}${returnPath}?token=${encodeURIComponent(token)}&paid=1`,
      cancel_url: `${siteUrl}${returnPath}?token=${encodeURIComponent(token)}&canceled=1`,
    });

    console.log("[create-checkout] Session created:", { sessionId: session.id, priceId });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[create-checkout] Stripe error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling" },
      { status: 500 }
    );
  }
}
