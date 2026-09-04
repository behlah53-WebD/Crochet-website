"use client";

import React, { useRef } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface BestSellersCarouselProps {
  products: Product[];
}

export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Artisan Terracotta Wax Stamp Seal */}
      <div className="absolute -top-12 right-6 sm:right-12 z-20 hidden sm:flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-clay-600 text-[#FAF6F0] shadow-studio-float flex flex-col items-center justify-center p-2 text-center rotate-12 border-2 border-[#FAF6F0] animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 mb-0.5" />
          <span className="font-serif font-bold text-[9px] uppercase tracking-wider leading-tight">
            Loved By
          </span>
          <span className="font-handwriting text-xs text-amber-100">
            Everyone
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-2 mb-6 sm:pr-24">
        <button
          suppressHydrationWarning
          onClick={() => scroll("left")}
          className="p-3 rounded-full bg-[#FDFBF7] border border-[#E5DAC6] hover:border-clay-500 text-espresso-700 hover:text-clay-600 shadow-linen transition-all hover:scale-105"
          aria-label="Previous creations"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          suppressHydrationWarning
          onClick={() => scroll("right")}
          className="p-3 rounded-full bg-[#FDFBF7] border border-[#E5DAC6] hover:border-clay-500 text-espresso-700 hover:text-clay-600 shadow-linen transition-all hover:scale-105"
          aria-label="Next creations"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
