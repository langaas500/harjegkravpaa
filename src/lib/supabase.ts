import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase not configured");
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

function generateAccessToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export interface CaseRecord {
  id: string;
  case_type: string;
  payload: Record<string, unknown>;
  outcome?: Record<string, unknown>;
  status: string;
  access_token: string;
  created_at: string;
  updated_at: string;
}

export async function createCase(
  caseType: "BIL" | "HANDVERK" | "FLYREISER",
  payload: Record<string, unknown>
): Promise<CaseRecord | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const accessToken = generateAccessToken();

  const { data, error } = await supabase
    .from("cases")
    .insert({
      case_type: caseType,
      payload,
      status: "draft",
      access_token: accessToken,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase createCase error:", error);
    return null;
  }

  return data as CaseRecord;
}

export async function updateCase(
  id: string,
  updates: {
    payload?: Record<string, unknown>;
    outcome?: Record<string, unknown>;
    status?: string;
  }
): Promise<CaseRecord | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cases")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateCase error:", error);
    return null;
  }

  return data as CaseRecord;
}

export async function getCaseByAccessToken(
  accessToken: string
): Promise<CaseRecord | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cases")
    .select()
    .eq("access_token", accessToken)
    .single();

  if (error) {
    console.error("Supabase getCaseByAccessToken error:", error);
    return null;
  }

  return data as CaseRecord;
}

export async function getCaseById(id: string): Promise<CaseRecord | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cases")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getCaseById error:", error);
    return null;
  }

  return data as CaseRecord;
}
