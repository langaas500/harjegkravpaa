import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  // Sjekk env vars
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY ikke konfigurert");
    return NextResponse.json({ error: "Stripe ikke konfigurert" }, { status: 500 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET ikke konfigurert");
    return NextResponse.json({ error: "Webhook secret ikke konfigurert" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Les raw body for signaturverifisering
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Mangler stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("[stripe-webhook] Event received:", event.type);
  } catch (err) {
    console.error("[stripe-webhook] Signaturverifisering feilet:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  // Håndter checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Hent token fra client_reference_id eller metadata
    const token = session.client_reference_id || session.metadata?.token;
    const productType = session.metadata?.productType || "REPORT";

    if (!token) {
      console.error("Webhook: Ingen token funnet i session");
      return NextResponse.json({ received: true });
    }

    // Marker som betalt i Supabase (idempotent)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Bestem ny status basert på productType
      const newStatus = productType === "KRAVBREV" ? "paid_kravbrev" : "paid";

      const { error } = await supabase
        .from("cases")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("access_token", token);

      if (error) {
        console.error("[stripe-webhook] Supabase update error:", error.message);
      } else {
        console.log(`[stripe-webhook] Payment verified: token=${token.substring(0, 8)}..., status=${newStatus}, sessionId=${session.id}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
