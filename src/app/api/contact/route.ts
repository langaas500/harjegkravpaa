import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "E-post og melding er påkrevd." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Ugyldig e-postadresse." },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (no email configured):", { name, email, message });
      return NextResponse.json({ ok: true, note: "Mottatt (e-post ikke konfigurert ennå)" });
    }

    await resend.emails.send({
      from: "harjegkravpå.no <onboarding@resend.dev>",
      to: "kontakt@harjegkravpå.no",
      replyTo: email,
      subject: `Kontaktskjema: ${name || "Ukjent avsender"}`,
      text: `Navn: ${name || "Ikke oppgitt"}\nE-post: ${email}\n\nMelding:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Kunne ikke sende melding. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
