export function safeNextPath(value: string | null, fallback = "/saved") {
  if (!value) return fallback;
  try {
    const url = new URL(value, "http://localhost:3000");
    if (url.origin !== "http://localhost:3000") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
