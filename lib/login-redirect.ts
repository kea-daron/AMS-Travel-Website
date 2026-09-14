/**
 * Where to send someone after they log in. Only same-site paths are allowed —
 * `//evil.com` and `/\evil.com` would otherwise leave the site.
 */
export function safeNext(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return undefined;
  }
  return value;
}

/** The login page, set to return to `next` afterwards. */
export function loginHref(next?: string) {
  const target = safeNext(next);
  return target ? `/login?next=${encodeURIComponent(target)}` : "/login";
}

/** The register page, carrying the same return path. */
export function registerHref(next?: string) {
  const target = safeNext(next);
  return target ? `/register?next=${encodeURIComponent(target)}` : "/register";
}
