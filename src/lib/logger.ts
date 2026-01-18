type LogEvent = {
  route: "generate-flight-kravbrev" | "generate-handverk-kravbrev" | "generate-kravbrev";
  category: "fly" | "handverk" | "bilkjop";
  requestId: string;
  status: "ok" | "timeout" | "error" | "bad_request";
  latencyMs: number;
  model?: string;
  tokens?: number;
};

export function logEvent(event: LogEvent): void {
  const safe = {
    ts: new Date().toISOString(),
    route: event.route,
    category: event.category,
    requestId: event.requestId,
    status: event.status,
    latencyMs: event.latencyMs,
    model: event.model,
    tokens: event.tokens,
  };
  console.log(JSON.stringify(safe));
}

export function generateRequestId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
