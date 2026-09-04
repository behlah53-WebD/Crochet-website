"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Heart, ShoppingBag, Eye, Star, Sparkles, Clock } from "lucide-react";
import { QuickViewModal } from "./QuickViewModal";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [heartPopped, setHeartPopped] = useState(false);

  const isFavorited = isInWishlist(product._id);
  const currentVariant = product.variants?.[selectedVariantIndex];
  const displayImage = currentVariant?.image || product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      image: displayImage,
      price: product.price + (currentVariant?.priceModifier || 0),
      quantity: 1,
      selectedColor: currentVariant?.name,
      selectedColorHex: currentVariant?.colorHex,
      selectedSize: currentVariant?.size,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartPopped(true);
    setTimeout(() => setHeartPopped(false), 500);
    toggleWishlist(product._id);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <>
      <div
        className="group relative flex flex-col bg-[#FDFBF7] rounded-3xl border border-[#E5DAC6]/80 shadow-polaroid hover:shadow-clay-bloom hover:border-clay-300 transition-all duration-500 overflow-hidden transform-gpu hover:-translate-y-1.5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Polaroid / Swatch Frame Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#F5ECE1] p-2 sm:p-2.5">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Link href={`/products/${product.slug || product._id}`} className="block w-full h-full relative">
              <Image
                src={isHovered && secondaryImage ? secondaryImage : displayImage}
                alt={product.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          </div>

          {/* Artisan Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
            {product.isBestSeller && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF2E2]/95 text-amber-900 border border-amber-300/80 backdrop-blur-md shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-600" /> Best Seller
              </span>
            )}
            {product.isMadeToOrder && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-clay-100/95 text-clay-700 border border-clay-300/80 backdrop-blur-md shadow-xs">
                Made to Order
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-espresso-800 text-[#FAF6F0] shadow-xs">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {/* Wishlist Button */}
            <motion.button
              suppressHydrationWarning
              animate={heartPopped ? { scale: [1, 1.35, 0.9, 1] } : {}}
              transition={{ duration: 0.35 }}
              onClick={handleWishlistClick}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
                isFavorited
                  ? "bg-clay-100 text-clay-600 scale-105"
                  : "bg-[#FAF6F0]/90 text-espresso-600 hover:text-clay-600 hover:bg-[#FAF6F0]"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorited ? "fill-clay-600 text-clay-600" : ""
                }`}
              />
            </motion.button>

            {/* Quick View Button */}
            <button
              suppressHydrationWarning
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="p-2 rounded-full bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-espresso-600 hover:text-clay-600 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-4 inset-x-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              suppressHydrationWarning
              onClick={handleQuickAdd}
              className="btn-thread-wrap w-full py-2.5 px-4 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] shadow-md font-sans text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category and Rating */}
            <div className="flex items-center justify-between text-xs text-espresso-400 mb-1.5">
              <span className="uppercase tracking-widest text-[10px] font-semibold text-clay-600">
                {product.categoryName || product.category.replace("-", " ")}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-bold text-espresso-700">{product.rating}</span>
                <span className="text-[10px] text-espresso-400">({product.reviewCount})</span>
              </div>
            </div>

            {/* Title */}
            <Link href={`/products/${product.slug || product._id}`}>
              <h3 className="font-serif text-sm sm:text-base font-semibold text-espresso-700 group-hover:text-clay-600 transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-espresso-500 line-clamp-1 mt-1 font-sans">
              {product.shortDescription}
            </p>

            {/* Subtle artisan craft note */}
            <div className="flex items-center gap-1.5 text-[10px] text-espresso-400 mt-2 font-medium">
              <Clock className="w-3 h-3 text-clay-500/80" />
              <span>Slow-crafted with milk-cotton yarn</span>
            </div>
          </div>

          {/* Bottom Row: Swatches & Pricing */}
          <div className="pt-3 border-t border-oat-300/80 flex items-center justify-between">
            {/* Color Swatches */}
            {product.variants && product.variants.length > 0 ? (
              <div className="flex items-center gap-1.5">
                {product.variants.slice(0, 4).map((variant, idx) => (
                  <button
                    suppressHydrationWarning
                    key={variant.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedVariantIndex(idx);
                    }}
                    title={variant.name}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedVariantIndex === idx
                        ? "ring-2 ring-clay-500 ring-offset-1 scale-110"
                        : "border-black/15 hover:scale-110"
                    }`}
                    style={{ backgroundColor: variant.colorHex }}
                  />
                ))}
                {product.variants.length > 4 && (
                  <span className="text-[10px] text-espresso-400 font-medium">
                    +{product.variants.length - 4}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-[10px] text-moss-700 font-medium">100% Cotton</span>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs line-through text-espresso-400 font-sans">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="font-serif text-sm sm:text-base font-bold text-espresso-800">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
