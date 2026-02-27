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

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");
  }
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export { getSupabaseAdmin };

function generateAccessToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto === "undefined" || !crypto.getRandomValues) {
    throw new Error("crypto.getRandomValues is not available");
  }
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export interface CaseRecord {
  id: string;
  case_type: string;
  payload: Record<string, unknown>;
  outcome?: Record<string, unknown>;
  status: string;
  access_token: string;
  stripe_session_id?: string;
  email_sent_at?: string;
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

export async function updateCaseAdmin(
  id: string,
  updates: {
    payload?: Record<string, unknown>;
    outcome?: Record<string, unknown>;
    status?: string;
    stripe_session_id?: string;
    email_sent_at?: string;
  }
): Promise<CaseRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cases")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Supabase updateCaseAdmin error:", error);
    return null;
  }
  return data as CaseRecord;
}

export async function getCaseByAccessTokenAdmin(
  accessToken: string
): Promise<CaseRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cases")
    .select()
    .eq("access_token", accessToken)
    .single();
  if (error) {
    console.error("Supabase getCaseByAccessTokenAdmin error:", error);
    return null;
  }
  return data as CaseRecord;
}

export async function getCaseByIdAdmin(
  id: string
): Promise<CaseRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cases")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    console.error("Supabase getCaseByIdAdmin error:", error);
    return null;
  }
  return data as CaseRecord;
}
