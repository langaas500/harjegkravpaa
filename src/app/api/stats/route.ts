import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json({ count: 0 });
    }

    const supabase = createClient(url, key);

    const { count, error } = await supabase
      .from("cases")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    if (error) {
      console.error("Stats query error:", error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json(
      { count: count ?? 0 },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ count: 0 });
  }
}
