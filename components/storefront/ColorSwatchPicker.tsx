"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const YARN_PALETTES = [
  {
    id: "terracotta",
    name: "Terracotta Clay",
    hex: "#C77B58",
    textColor: "#FAF6F0",
    tag: "Artisan & Earthy",
    description: "Our signature sun-baked clay shade, spun from triple-ply combed cotton that feels grounding and deeply tactile.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    recommendedItem: "Terracotta Artisan Shoulder Bag",
    slug: "blush-bloom-pearl-handbag",
  },
  {
    id: "oat",
    name: "Warm Ivory Cream",
    hex: "#FAF6F0",
    textColor: "#3A2E2A",
    tag: "Timeless & Serene",
    description: "Unbleached natural cotton fiber with subtle warm oat undertones. Versatile, grounding, and vintage-inspired.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    recommendedItem: "Daisy Daydream Shoulder Tote",
    slug: "daisy-daydream-shoulder-tote",
  },
  {
    id: "sage",
    name: "Sage Meadow",
    hex: "#8A9A5B",
    textColor: "#FAF6F0",
    tag: "Earthy & Botanical",
    description: "A soft botanical green that evokes calm forest paths, eucalyptus leaves, and fresh cottage gardens.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop",
    recommendedItem: "Cloud Bunny Amigurumi Plushie",
    slug: "cloud-bunny-amigurumi-plushie",
  },
  {
    id: "honey",
    name: "Golden Honey",
    hex: "#D49B4B",
    textColor: "#FAF6F0",
    tag: "Warm & Nostalgic",
    description: "A sun-drenched amber tone reminiscent of wildflower honey and late afternoon golden hour in the studio.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
    recommendedItem: "Forever Tulip Love Bouquet",
    slug: "forever-lavender-love-bouquet",
  },
  {
    id: "rosewood",
    name: "Dusty Rosewood",
    hex: "#DEB49F",
    textColor: "#3A2E2A",
    tag: "Gentle & Romantic",
    description: "A soft, muted blush-clay tone that brings quiet warmth to everyday totes and plush companions.",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=800&auto=format&fit=crop",
    recommendedItem: "Strawberry Charm Pendant",
    slug: "strawberry-puff-bag-charm",
  },
];

export function ColorSwatchPicker() {
  const [selectedYarn, setSelectedYarn] = useState(YARN_PALETTES[0]);

  return (
    <section className="py-20 sm:py-24 bg-[#F5ECE1] relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-clay-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDFBF7] text-clay-700 text-xs font-bold uppercase tracking-widest border border-[#E5DAC6]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> The Atelier Palette
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold">
            Interactive Yarn Swatch Studio
          </h2>
          <p className="text-xs sm:text-sm text-espresso-600 font-sans">
            Explore our ethically sourced milk-cotton yarn shades. Tap any swatch to preview its tactile texture, mood, and recommended creation.
          </p>
        </div>

        {/* Studio Workspace Card */}
        <div className="rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] p-6 sm:p-10 shadow-studio-float">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Swatch Selector Buttons */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-espresso-400 mb-3">
                  Select a Yarn Shade
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {YARN_PALETTES.map((palette) => {
                    const isSelected = selectedYarn.id === palette.id;
                    return (
                      <button
                        suppressHydrationWarning
                        key={palette.id}
                        onClick={() => setSelectedYarn(palette)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                          isSelected
                            ? "border-clay-500 bg-clay-50/70 shadow-linen ring-1 ring-clay-500"
                            : "border-oat-300 bg-[#FAF6F0] hover:border-clay-300"
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full shrink-0 border border-black/10 flex items-center justify-center shadow-xs"
                          style={{ backgroundColor: palette.hex }}
                        >
                          {isSelected && (
                            <Check
                              className="w-3.5 h-3.5"
                              style={{ color: palette.textColor }}
                            />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-serif font-bold text-espresso-800 truncate">
                            {palette.name}
                          </p>
                          <span className="text-[10px] text-espresso-500">
                            {palette.tag.split("&")[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Shade Editorial Description */}
              <motion.div
                key={selectedYarn.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E5DAC6] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-espresso-800">
                    {selectedYarn.name}
                  </h4>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-clay-700 bg-clay-100 px-2.5 py-0.5 rounded-full border border-clay-200">
                    {selectedYarn.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-espresso-600 leading-relaxed font-sans">
                  {selectedYarn.description}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-oat-300 text-xs">
                  <span className="text-espresso-500">Suggested Piece:</span>
                  <span className="font-serif font-bold text-espresso-800">
                    {selectedYarn.recommendedItem}
                  </span>
                </div>
              </motion.div>

              <div>
                <Link
                  href={`/custom-order?shade=${selectedYarn.id}`}
                  className="btn-thread-wrap inline-flex items-center gap-2 px-6 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Order in this Shade</span>
                </Link>
              </div>
            </div>

            {/* Right: Big Mood Photography for Selected Swatch */}
            <div className="lg:col-span-6 relative">
              <motion.div
                key={selectedYarn.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-studio-float border-4 border-[#FAF6F0] bg-oat-100 group"
              >
                <Image
                  src={selectedYarn.image}
                  alt={selectedYarn.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/70 via-espresso-900/10 to-transparent" />

                {/* Overlay details */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]/80">
                    Hand-hooked with {selectedYarn.name}
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-bold">
                    {selectedYarn.recommendedItem}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
