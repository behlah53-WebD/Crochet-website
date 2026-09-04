// Ensure NEXTAUTH_URL and related authentication environment variables
// are always valid, non-empty URLs even during static export, SSG, or
// deployment environments where NEXTAUTH_URL might be set to an empty string.

if (typeof process !== "undefined" && process.env) {
  const getFallbackUrl = () => {
    const raw =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const clean = raw.trim();
    if (!clean) return "http://localhost:3000";
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
