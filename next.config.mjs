const getAuthUrl = () => {
  const url =
    process.env.NEXTAUTH_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!url || !url.trim()) {
    return "http://localhost:3000";
  }
  const cleanUrl = url.trim();
  return cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;
};

const resolvedAuthUrl = getAuthUrl();

if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_URL.trim()) {
  process.env.NEXTAUTH_URL = resolvedAuthUrl;
}
if (!process.env.NEXTAUTH_URL_INTERNAL || !process.env.NEXTAUTH_URL_INTERNAL.trim()) {
  process.env.NEXTAUTH_URL_INTERNAL = resolvedAuthUrl;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: resolvedAuthUrl,
    NEXTAUTH_URL_INTERNAL: resolvedAuthUrl,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '*.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
