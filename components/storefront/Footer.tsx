"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Sparkles,
  Lock,
  Truck,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { StitchDivider } from "./StitchDivider";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<any>({
    storeName: "Loom & Love",
    copyrightText: "Loom & Love Atelier. Hand-hooked with love in small batches.",
    trustPillars: [
      {
        title: "Free Insured Delivery",
        description: "Complimentary courier on orders over ₹999",
        iconName: "Truck",
      },
      {
        title: "100% Artisan Made",
        description: "Hand-crocheted slowly in small batches",
        iconName: "ShieldCheck",
      },
      {
        title: "Loved or Exchanged",
        description: "Gentle 7-day handcrafted quality guarantee",
        iconName: "RotateCcw",
      },
    ],
  });

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings((prev: any) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        toast.success("Welcome to our little yarn circle! 🧶", {
          description: "A little handmade warmth will arrive in your inbox soon.",
        });
        setNewsletterEmail("");
      }
    } catch {
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#2B2320] text-[#FAF6F0] font-sans relative overflow-hidden">
      {/* Hand-stitched running thread accent border */}
      <div className="w-full h-2.5 bg-gradient-to-r from-[#B85C38] via-[#C77B58] to-[#8A9A5B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#2B2320_0,#2B2320_5px,transparent_5px,transparent_14px)] opacity-65" />
      </div>

      {/* Warm ambient studio glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-clay-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* Top Trust Pillars Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-[#FAF6F0]/10">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-clay-500/20 text-clay-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Free Insured Delivery</h5>
              <p className="text-[11px] text-[#FAF6F0]/70">Complimentary courier on orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">100% Artisan Made</h5>
              <p className="text-[11px] text-[#FAF6F0]/70">Hand-crocheted slowly in small batches</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-moss-500/20 text-moss-300 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-white">Loved or Exchanged</h5>
              <p className="text-[11px] text-[#FAF6F0]/70">Gentle 7-day handcrafted quality guarantee</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-[#FAF6F0]/10">
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Loom <span className="text-clay-400 font-light italic">&</span> Love
              </span>
            </Link>
            <p className="text-xs text-[#FAF6F0]/80 leading-relaxed max-w-sm">
              Artisan luxury crochet accessories, tactile cotton totes, and forever botanical keepsakes designed to bring warmth, gentleness, and mindful slow-living into your daily life.
            </p>

            {/* Newsletter mini-form */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
                Join our little yarn circle
              </p>
              <form suppressHydrationWarning onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  suppressHydrationWarning
                  type="email"
                  required
                  placeholder="Your warm email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder:text-[#FAF6F0]/50 focus:outline-none focus:border-clay-400 backdrop-blur-sm"
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-thread-wrap px-5 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Atelier Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links Column */}
            <div className="space-y-3">
              <h6 className="font-serif text-sm font-semibold text-white tracking-wide">
                Atelier Collections
              </h6>
              <ul className="space-y-2 text-xs text-[#FAF6F0]/75">
                <li>
                  <Link href="/category/crochet-bags" className="hover:text-clay-400 transition-colors">
                    Crochet Bags
                  </Link>
                </li>
                <li>
                  <Link href="/category/flower-bouquets" className="hover:text-clay-400 transition-colors">
                    Forever Flowers
                  </Link>
                </li>
                <li>
                  <Link href="/category/amigurumi-plushies" className="hover:text-clay-400 transition-colors">
                    Amigurumi Companions
                  </Link>
                </li>
                <li>
                  <Link href="/category/keychains-charms" className="hover:text-clay-400 transition-colors">
                    Charms & Pendants
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-clay-400 transition-colors">
                    All Creations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Boutique Studio Column */}
            <div className="space-y-3">
              <h6 className="font-serif text-sm font-semibold text-white tracking-wide">
                The Studio
              </h6>
              <ul className="space-y-2 text-xs text-[#FAF6F0]/75">
                <li>
                  <Link href="/about" className="hover:text-clay-400 transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/custom-order" className="hover:text-clay-400 transition-colors">
                    Custom Orders
                  </Link>
                </li>
                <li>
                  <Link href="/journal" className="hover:text-clay-400 transition-colors">
                    Studio Journal
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-clay-400 transition-colors">
                    Contact the Maker
                  </Link>
                </li>
              </ul>
            </div>

            {/* Care & Help Column */}
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h6 className="font-serif text-sm font-semibold text-white tracking-wide">
                Care & Assurance
              </h6>
              <ul className="space-y-2 text-xs text-[#FAF6F0]/75">
                <li>
                  <Link href="/track-order" className="hover:text-clay-400 transition-colors">
                    Track Your Package
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-clay-400 transition-colors">
                    Crochet Yarn Care Guide
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-clay-400 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-clay-400 transition-colors">
                    Exchanges & Quality Promise
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Handmade Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6F0]/60">
          <p className="flex items-center gap-1.5">
            <span suppressHydrationWarning>© {new Date().getFullYear()} {settings.storeName || "Loom & Love"} Atelier. Hand-hooked with</span>
            <Heart className="w-3.5 h-3.5 text-clay-400 fill-clay-400 inline" />
            <span>in small batches.</span>
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Milk Cotton</span>
            <span>•</span>
            <span>Plastic-Free Wrap</span>
            <span>•</span>
            <span className="text-amber-300">Preserving Folk Crafts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
