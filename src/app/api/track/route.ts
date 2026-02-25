import { NextRequest, NextResponse } from "next/server";

const VALID_EVENTS = [
  "paywall_open",
  "checkout_start",
  "checkout_success",
  "copy_letter",
  "download_docx",
];

export async function POST(req: NextRequest) {
  try {
    const { event, category, product, ts } = await req.json();

    if (!event || !VALID_EVENTS.includes(event)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    console.log(
      `[track] ${event} | category=${category || "-"} | product=${product || "-"} | ts=${ts || Date.now()}`
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
