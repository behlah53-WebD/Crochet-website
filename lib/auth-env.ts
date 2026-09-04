// Ensure NEXTAUTH_URL and related authentication environment variables
// dynamically resolve to the actual current origin and are never empty during
// build, SSR, or client execution.

if (typeof window !== "undefined") {
  // In the browser, dynamically resolve to the live website URL
  if (
    !process.env.NEXTAUTH_URL ||
    !process.env.NEXTAUTH_URL.trim() ||
    (process.env.NEXTAUTH_URL.includes("localhost") && !window.location.hostname.includes("localhost"))
  ) {
    process.env.NEXTAUTH_URL = window.location.origin;
  }
} else if (typeof process !== "undefined" && process.env) {
  const getFallbackUrl = () => {
    const raw =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL;

    if (!raw || !raw.trim()) {
      // Local development fallback
      return "http://localhost:3000";
    }

    const clean = raw.trim();
    return clean.startsWith("http://") || clean.startsWith("https://")
      ? clean
      : `https://${clean}`;
  };

  const validUrl = getFallbackUrl();

  if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_URL.trim()) {
    process.env.NEXTAUTH_URL = validUrl;
  }

  if (!process.env.NEXTAUTH_URL_INTERNAL || !process.env.NEXTAUTH_URL_INTERNAL.trim()) {
    process.env.NEXTAUTH_URL_INTERNAL = validUrl;
  }
}

export {};
