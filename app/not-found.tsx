import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md mx-auto space-y-6">
          <div className="relative w-24 h-24 rounded-full bg-blush-100 text-dustyrose flex items-center justify-center mx-auto shadow-card border border-blush-200">
            <span className="font-serif text-4xl font-bold">404</span>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-dustyrose text-white flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-cocoa-800">
              A Dropped Stitch!
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 font-sans leading-relaxed">
              We couldn’t find the page you were looking for. It seems like a loose thread unraveled along the way.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full border border-cream-300 text-cocoa-700 hover:bg-cream-100 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
