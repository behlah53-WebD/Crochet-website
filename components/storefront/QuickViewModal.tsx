"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");

  const currentVariant = product.variants?.[selectedVariant];
  const isFavorited = isInWishlist(product._id);
  const images = product?.images && product.images.length > 0
    ? product.images
    : ["https://placehold.co/600x600?text=Loom+%26+Love"];

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      image: images[selectedImage] || images[0],
      price: product.price + (currentVariant?.priceModifier || 0),
      quantity,
      selectedColor: currentVariant?.name,
      selectedColorHex: currentVariant?.colorHex,
      selectedSize: currentVariant?.size,
      personalizationText: personalization ? personalization.trim().toUpperCase() : undefined,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2B2320]/60 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl sm:rounded-4xl shadow-studio-float border border-[#E5DAC6] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-espresso-500 hover:text-espresso-800 transition-colors shadow-sm border border-[#E5DAC6]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image Gallery */}
            <div className="p-6 bg-[#FAF6F0] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5DAC6]">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FDFBF7] shadow-sm border border-[#E5DAC6]">
                <Image
                  src={images[selectedImage] || images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === idx
                          ? "border-clay-500 scale-105 shadow-sm"
                          : "border-oat-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Customization */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-clay-600 font-semibold tracking-wider uppercase mb-1">
                  <span>{product.categoryName || product.category}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-espresso-700">{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso-800">
                  {product.title}
                </h3>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-serif text-2xl font-bold text-espresso-800">
                    {formatPrice(product.price + (currentVariant?.priceModifier || 0))}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm line-through text-espresso-400">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {product.isMadeToOrder && (
                    <span className="text-[11px] text-clay-700 bg-clay-100 px-2 py-0.5 rounded-full font-medium border border-clay-200">
                      Takes ~{product.productionDays || 3} days to craft
                    </span>
                  )}
                </div>

                <p className="text-xs text-espresso-600 mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Variant Swatches */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-oat-300">
                    <label className="text-xs font-semibold text-espresso-700 block mb-2">
                      Color Shade:{" "}
                      <span className="font-normal text-clay-600 font-serif">
                        {currentVariant?.name}
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.name}
                          onClick={() => setSelectedVariant(idx)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                            selectedVariant === idx
                              ? "bg-[#FAF6F0] border-clay-500 shadow-sm text-espresso-800 ring-2 ring-clay-500/20"
                              : "bg-[#FDFBF7] border-oat-300 text-espresso-600 hover:bg-[#FAF6F0]"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span>{variant.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Monogram */}
                <div className="mt-3">
                  <label className="text-xs font-semibold text-espresso-700 block mb-1">
                    Custom Initials (Optional embroidery):
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="e.g. LV, 2 letters"
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value.toUpperCase())}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] focus:outline-none focus:border-clay-500 text-espresso-800 uppercase tracking-widest"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-oat-300 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E5DAC6] rounded-full bg-[#FAF6F0] overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-xs text-espresso-700 hover:bg-clay-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold text-espresso-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-xs text-espresso-700 hover:bg-clay-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="btn-thread-wrap flex-1 py-3 px-4 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className={`p-3 rounded-full border transition-all ${
                      isFavorited
                        ? "bg-clay-100 border-clay-300 text-clay-600"
                        : "bg-[#FAF6F0] border-[#E5DAC6] text-espresso-600 hover:text-clay-600"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-clay-600" : ""}`} />
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/products/${product.slug || product._id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs text-clay-600 hover:underline font-medium"
                  >
                    <span>View full product storytelling & reviews</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
