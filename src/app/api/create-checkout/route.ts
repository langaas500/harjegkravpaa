import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { productType } = await req.json();

    const prices: Record<string, { amount: number; name: string; desc: string }> = {
      rapport: { 
        amount: 4900, 
        name: "Bilkjøp-rapport PDF", 
        desc: "Juridisk vurdering av din bilkjøp-sak"
      },
      kravbrev: { 
        amount: 14900, 
        name: "Juridisk kravbrev", 
        desc: "Ferdig formulert kravbrev til selger"
      },
    };

    const product = prices[productType] || prices.rapport;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna", "link"],
      line_items: [
        {
          price_data: {
            currency: "nok",
            product_data: {
              name: product.name,
              description: product.desc,
            },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bilkjop/betalt?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bilkjop/rapport?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette betaling" }, 
      { status: 500 }
    );
  }
}