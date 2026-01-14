"use client";

import { useState } from "react";
import { createCase } from "@/lib/supabase";

export default function SupabaseTestPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testCreateCaseClient = async () => {
    setIsLoading(true);
    setResult("Testing createCase (client)...");

    try {
      // Sjekk env
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log("ENV check:", {
        url: url ? "✓ found" : "✗ missing",
        key: key ? "✓ found" : "✗ missing",
      });

      if (!url || !key) {
        setResult("ERROR: Missing env vars NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
        return;
      }

      const testPayload = {
        test: true,
        timestamp: new Date().toISOString(),
        source: "supabase-test-page",
      };

      console.log("Calling createCase with payload:", testPayload);

      const response = await createCase("HANDVERK", testPayload);

      console.log("createCase response:", response);

      if (response && response.id) {
        setResult(`SUCCESS! Created case with id: ${response.id}`);
      } else {
        setResult("FAILED: createCase returned null or no id");
      }
    } catch (error) {
      console.error("createCase error:", error);
      setResult(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testCreateCaseAPI = async () => {
    setIsLoading(true);
    setResult("Testing createCase (API)...");

    try {
      const response = await fetch("/api/dev/supabase-test");
      const data = await response.json();

      console.log("API response:", data);

      if (data.ok) {
        setResult(`SUCCESS via API! Created case with id: ${data.id}`);
      } else {
        setResult(`FAILED via API: ${data.error}`);
      }
    } catch (error) {
      console.error("API test error:", error);
      setResult(`API ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>Supabase Test Page</h1>
      <p style={{ color: "#888", marginBottom: "30px" }}>
        This page tests createCase() function against Supabase.
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button
          onClick={testCreateCaseClient}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            background: "#14b8a6",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Testing..." : "Create test case (Client)"}
        </button>

        <button
          onClick={testCreateCaseAPI}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {isLoading ? "Testing..." : "Create via API"}
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          background: "#222",
          borderRadius: "8px",
          whiteSpace: "pre-wrap",
          minHeight: "100px",
        }}
      >
        <strong>Result:</strong>
        <br />
        {result || "Click a button to test..."}
      </div>

      <div style={{ marginTop: "30px", color: "#666", fontSize: "12px" }}>
        <p>Check browser console for detailed logs.</p>
        <p>After success, verify in Supabase Table Editor: public.cases should have a new row.</p>
      </div>
    </div>
  );
}
