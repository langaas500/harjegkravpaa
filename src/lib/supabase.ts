import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CaseType = "BIL" | "HANDVERK" | "FLYREISER";
export type CaseStatus = "draft" | "completed" | "paid";

export interface CaseRecord {
  id: string;
  case_type: CaseType;
  payload: Record<string, unknown>;
  outcome: Record<string, unknown> | null;
  status: CaseStatus;
  created_at: string;
  updated_at: string;
}

export async function createCase(
  caseType: CaseType,
  payload: Record<string, unknown>
): Promise<{ id: string } | null> {
  const { data, error } = await supabase
    .from("cases")
    .insert({
      case_type: caseType,
      payload,
      status: "draft",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating case:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      full: error
    });
    return null;
  }

  return data;
}

export async function updateCase(
  id: string,
  updates: {
    payload?: Record<string, unknown>;
    outcome?: Record<string, unknown>;
    status?: CaseStatus;
  }
): Promise<boolean> {
  const { error } = await supabase
    .from("cases")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating case:", error);
    return false;
  }

  return true;
}

export async function getCase(id: string): Promise<CaseRecord | null> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error getting case:", error);
    return null;
  }

  return data;
}
