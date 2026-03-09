import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PostHog } from "posthog-node";
import { getCaseByAccessTokenAdmin, updateCaseAdmin } from "@/lib/supabase";

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

    const sessionId = session.id;

    // Check idempotency
    const existing = await getCaseByAccessTokenAdmin(token);
    if (!existing) {
      console.error("[stripe-webhook] Case not found for token:", token.substring(0, 8));
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }
    if (existing.stripe_session_id === sessionId) {
      // Already processed — return 200 to stop Stripe retries
      return NextResponse.json({ received: true, status: "already_processed" });
    }

    // Bestem ny status basert på productType
    const newStatus = productType === "KRAVBREV" ? "paid_kravbrev" : "paid";

    // Update with stripe_session_id for future dedup
    const updated = await updateCaseAdmin(existing.id, {
      status: newStatus,
      stripe_session_id: sessionId,
    });

    if (!updated) {
      console.error("[stripe-webhook] Supabase update error for token:", token.substring(0, 8));
    } else {
      console.log(`[stripe-webhook] Payment verified: token=${token.substring(0, 8)}..., status=${newStatus}, sessionId=${sessionId}`);
    }

    // PostHog server-side tracking
    try {
      const phClient = new PostHog('phc_nd3hkeygkxbcwMXgTKCLWCRlVXqYzOt7dbT2KsIhbM9', { host: 'https://eu.i.posthog.com' });
      await phClient.capture({ distinctId: sessionId, event: 'purchase_confirmed', properties: { value: 99, currency: 'NOK', product_type: productType } });
      await phClient.shutdown();
    } catch (phErr) {
      console.error("[stripe-webhook] PostHog tracking error:", phErr);
    }
  }

  return NextResponse.json({ received: true });
}
