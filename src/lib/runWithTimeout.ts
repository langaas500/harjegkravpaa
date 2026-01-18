export async function runWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 60000
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), timeoutMs)
    ),
  ]);
}
