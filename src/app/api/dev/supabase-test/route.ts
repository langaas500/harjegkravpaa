import { NextResponse } from "next/server";
import { createCase } from "@/lib/supabase";

export async function GET() {
  // Sjekk env
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("[supabase-test] ENV check:", {
    url: url ? "✓ found" : "✗ missing",
    key: key ? "✓ found (length: " + key.length + ")" : "✗ missing",
  });

  if (!url || !key) {
    return NextResponse.json({
      ok: false,
      error: "Missing env vars",
      envCheck: {
        NEXT_PUBLIC_SUPABASE_URL: !!url,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!key,
      },
    });
  }

  try {
    const testPayload = {
      test: true,
      timestamp: new Date().toISOString(),
      source: "api-supabase-test",
    };

    console.log("[supabase-test] Calling createCase with:", testPayload);

    const result = await createCase("HANDVERK", testPayload);

    console.log("[supabase-test] createCase result:", result);

    if (result && result.id) {
      return NextResponse.json({
        ok: true,
        id: result.id,
        message: "Case created successfully",
      });
    } else {
      return NextResponse.json({
        ok: false,
        error: "createCase returned null or no id",
      });
    }
  } catch (error) {
    console.error("[supabase-test] Error:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
