export function sanitizeUserInput(input: string, maxLength = 2000): string {
  if (!input || typeof input !== "string") return "";
  return input
    .slice(0, maxLength)
    .replace(/<user_input>/gi, "")
    .replace(/<\/user_input>/gi, "")
    .replace(/ignore (all )?instructions/gi, "")
    .replace(/system prompt/gi, "")
    .trim();
}

export function wrapUserInput(input: string): string {
  return `<user_input>${sanitizeUserInput(input)}</user_input>`;
}
