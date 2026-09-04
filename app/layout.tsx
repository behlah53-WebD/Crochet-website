import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CustomCursor } from "@/components/storefront/CustomCursor";
import { YarnProgressBar } from "@/components/storefront/YarnProgressBar";
import { BackToTopYarn } from "@/components/storefront/BackToTopYarn";
import { MobileBottomNav } from "@/components/storefront/MobileBottomNav";
import { PwaRegister } from "@/components/PwaRegister";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#B85C38",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Loom & Love — Handmade Luxury Crochet Boutique",
  description:
    "Handmade softness, woven with heart. Discover exquisite handmade crochet bags, forever flower bouquets, plushies, and custom bespoke gifts.",
  keywords: [
    "crochet handbag",
    "handmade crochet",
    "crochet flowers India",
    "luxury crochet bags",
    "amigurumi",
    "custom crochet gift",
    "cottagecore fashion",
  ],
  authors: [{ name: "Loom & Love" }],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Loom & Love",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Loom & Love — Handmade Softness, Woven with Heart",
    description: "Artisanal luxury crochet creations, slow-made in small batches.",
    url: "https://loomandlove.com",
    siteName: "Loom & Love",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${playfair.variable} ${dmSans.variable} ${caveat.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col font-sans bg-[#FAF6F0] text-[#3A2E2A] antialiased selection:bg-[#F5ECE6] selection:text-[#B85C38] relative"
      >
        {/* Subtle global paper grain overlay */}
        <div className="paper-grain fixed inset-0 pointer-events-none z-[1] opacity-75" />

        {/* Global Boutique Atmosphere Widgets */}
        <YarnProgressBar />
        <CustomCursor />
        
        <Providers>
          <div className="relative z-[2] flex-1 flex flex-col pb-24 lg:pb-0">
            {children}
          </div>
          <BackToTopYarn />
          <MobileBottomNav />
          <PwaRegister />
        </Providers>
      </body>
    </html>
  );
}
