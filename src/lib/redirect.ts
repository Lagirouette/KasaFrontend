export function safeRedirect(target: unknown, fallback = "/") {
  if (typeof target !== "string") return fallback;
  if (!target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) return fallback;
  return target;
}
