"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Minus,
  MessageSquareHeart,
  ChevronDown,
  ChevronUp,
  Gift,
  Feather,
  Maximize2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const images = product?.images && product.images.length > 0
    ? product.images
    : ["https://placehold.co/600x600?text=Loom+%26+Love"];
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Accordions open state
  const [openAccordion, setOpenAccordion] = useState<string | null>("craft");

  // Reviews state
  const [reviews, setReviews] = useState<any[]>([
    {
      _id: "r1",
      userName: "Tara Kulkarni",
      rating: 5,
      title: "Pure handcrafted poetry!",
      comment: "The tactile feel of this yarn is so soft yet resilient. Arrived in the most gorgeous warm gift box with a real handwritten note.",
      date: "2 days ago",
      verified: true,
    },
    {
      _id: "r2",
      userName: "Isha Kapoor",
      rating: 5,
      title: "Exceeded all my expectations",
      comment: "I carried this to my best friend's bridal shower. Everyone asked me where it was from! The stitches are incredibly dense and neat.",
      date: "1 week ago",
      verified: true,
    },
  ]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const currentVariant = product.variants?.[selectedVariantIndex];
  const isFavorited = isInWishlist(product._id);
  const currentPrice = product.price + (currentVariant?.priceModifier || 0);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      image: images[activeImageIndex] || images[0],
      price: currentPrice,
      quantity,
      selectedColor: currentVariant?.name,
      selectedColorHex: currentVariant?.colorHex,
      selectedSize: currentVariant?.size,
      personalizationText: personalization ? personalization.trim().toUpperCase() : undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setPincodeStatus("Delivery confirmed! Estimated arrival in 3–5 business days via Blue Dart Express 🧶");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = {
      _id: "r-" + Date.now(),
      userName: reviewName,
      rating: reviewRating,
      title: "Loved this creation!",
      comment: reviewComment,
      date: "Just now",
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setReviewName("");
    setReviewComment("");
    setReviewModalOpen(false);
    toast.success("Thank you! Your lovely review has been shared 🧶");
  };

  const toggleAcc = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="space-y-16 pb-24 lg:pb-8">
      {/* Top Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-4xl overflow-hidden bg-gradient-to-b from-[#FAF6F0] to-[#F5ECE1] shadow-studio-float border-4 border-[#FDFBF7] group">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#FAF2E2]/95 text-amber-900 border border-amber-300/80 backdrop-blur-md shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Best Seller
                </span>
              )}
              {product.isMadeToOrder && (
                <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-clay-100/95 text-clay-700 border border-clay-300/80 backdrop-blur-md shadow-xs">
                  Made to Order (~{product.productionDays || 3}d)
                </span>
              )}
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {/* Wishlist Button */}
              <button
                suppressHydrationWarning
                onClick={() => toggleWishlist(product._id)}
                className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isFavorited
                    ? "bg-clay-100 text-clay-600 scale-105"
                    : "bg-[#FAF6F0]/90 text-espresso-600 hover:text-clay-600 hover:bg-[#FAF6F0]"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-clay-600 text-clay-600" : ""}`} />
              </button>

              {/* Lightbox Fullscreen Button */}
              <button
                suppressHydrationWarning
                onClick={() => setLightboxOpen(true)}
                className="p-3 rounded-full bg-[#FAF6F0]/90 text-espresso-600 hover:text-clay-600 hover:bg-[#FAF6F0] backdrop-blur-md shadow-md transition-all"
                aria-label="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  suppressHydrationWarning
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-clay-500 scale-105 shadow-md ring-2 ring-clay-500/20"
                      : "border-oat-300 opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing, Options & Accordions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-espresso-500 uppercase tracking-widest font-semibold mb-2">
              <span className="text-clay-600 font-bold">{product.categoryName || product.category.replace("-", " ")}</span>
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-espresso-800">{product.rating}</span>
                <span className="text-espresso-400">({reviews.length} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold leading-tight">
              {product.title}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif text-3xl font-bold text-espresso-800">
                {formatPrice(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base line-through text-espresso-400 font-sans">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-moss-100 text-moss-800 border border-moss-200">
                  Save {Math.round(((product.compareAtPrice - currentPrice) / product.compareAtPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-xs text-espresso-400 mt-1 font-sans">
              Inclusive of all taxes. Free express shipping on orders above ₹999.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="pt-4 border-t border-oat-300 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-espresso-800 block">
                  Yarn Shade:{" "}
                  <span className="font-normal text-clay-600 font-serif">
                    {currentVariant?.name}
                  </span>
                </label>
                <span className="text-[11px] text-moss-700 font-medium">100% Milk Cotton</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    suppressHydrationWarning
                    key={v.name}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                      selectedVariantIndex === idx
                        ? "bg-[#FAF6F0] border-clay-500 ring-2 ring-clay-500/20 text-espresso-900 shadow-sm"
                        : "bg-[#FDFBF7] border-[#E5DAC6] text-espresso-600 hover:bg-[#FAF6F0]"
                    }`}
                  >
                    {/* Yarn ball swatch icon */}
                    <div
                      className="w-4 h-4 rounded-full border border-black/10 shadow-2xs relative flex items-center justify-center"
                      style={{ backgroundColor: v.colorHex }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                    <span>{v.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Complimentary Monogram Personalization Box */}
          <div className="p-4 rounded-3xl bg-[#FAF6F0] border border-dashed border-clay-400/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-espresso-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Hand-Embroidered Initial / Name</span>
              </label>
              <span className="text-[10px] uppercase tracking-wider font-bold text-clay-600">
                Complimentary
              </span>
            </div>
            <input
              suppressHydrationWarning
              type="text"
              maxLength={6}
              placeholder="e.g. AA (Max 6 letters)"
              value={personalization}
              onChange={(e) => setPersonalization(e.target.value.toUpperCase())}
              className="w-full text-xs px-4 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] focus:outline-none focus:border-clay-500 uppercase tracking-widest text-espresso-800"
            />
          </div>

          {/* Production lead time badge */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#F5ECE1] border border-[#E5DAC6] text-xs text-espresso-700">
            <Clock className="w-4 h-4 text-clay-600 shrink-0" />
            <span>
              {product.isMadeToOrder
                ? `Handcrafted to order by our studio artisans in ~${product.productionDays || 3} business days.`
                : "Ready to ship within 24–48 hours."}
            </span>
          </div>

          {/* Quantity & CTA Buttons (Desktop) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#E5DAC6] rounded-full bg-[#FDFBF7] overflow-hidden shadow-2xs">
                <button
                  suppressHydrationWarning
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-xs text-espresso-700 hover:bg-clay-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-espresso-800">{quantity}</span>
                <button
                  suppressHydrationWarning
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-xs text-espresso-700 hover:bg-clay-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                suppressHydrationWarning
                onClick={handleAddToCart}
                className="btn-thread-wrap flex-1 py-4 px-6 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            {/* Buy Now */}
            <button
              suppressHydrationWarning
              onClick={handleBuyNow}
              className="btn-thread-wrap w-full py-4 px-6 rounded-full bg-espresso-800 hover:bg-espresso-900 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider transition-all shadow-studio-float flex items-center justify-center gap-2"
            >
              <span>Instant Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Availability Checker */}
          <div className="pt-4 border-t border-oat-300">
            <label className="text-xs font-semibold text-espresso-800 block mb-2">
              Check Pincode Delivery Guarantee
            </label>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <div className="relative flex-1">
                <Truck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-400" />
                <input
                  suppressHydrationWarning
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 560038)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] text-xs text-espresso-800 focus:outline-none focus:border-clay-500"
                />
              </div>
              <button
                suppressHydrationWarning
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-oat-200 hover:bg-oat-300 text-espresso-800 text-xs font-semibold transition-colors border border-[#E5DAC6]"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-moss-800 mt-2 font-medium bg-moss-50 p-2.5 rounded-xl border border-moss-200">
                {pincodeStatus}
              </p>
            )}
          </div>

          {/* Luxury Accordions */}
          <div className="pt-4 border-t border-oat-300 space-y-2 text-xs">
            {/* 1. Craftsmanship Story */}
            <div className="border border-[#E5DAC6] rounded-2xl overflow-hidden bg-[#FDFBF7]">
              <button
                suppressHydrationWarning
                onClick={() => toggleAcc("craft")}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left font-semibold text-espresso-800"
              >
                <span className="flex items-center gap-2 font-serif text-sm">
                  <Feather className="w-4 h-4 text-clay-600" /> The Craftsmanship Story
                </span>
                {openAccordion === "craft" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === "craft" && (
                <div className="px-4 pb-4 text-espresso-600 space-y-2 leading-relaxed border-t border-oat-200 pt-3">
                  <p>
                    Every single row is crocheted with mindful tension using combed 5-ply milk-cotton yarn. Unlike machine knits, this stitch structure creates a sturdy, tactile silhouette that holds its shape gracefully over years of wear.
                  </p>
                  <p className="text-[11px] text-clay-700 font-medium">
                    Materials: {product.materials || "100% Premium Combed Cotton & Milk Yarn"}
                  </p>
                </div>
              )}
            </div>

            {/* 2. Dimensions & Care */}
            <div className="border border-[#E5DAC6] rounded-2xl overflow-hidden bg-[#FDFBF7]">
              <button
                suppressHydrationWarning
                onClick={() => toggleAcc("care")}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left font-semibold text-espresso-800"
              >
                <span className="flex items-center gap-2 font-serif text-sm">
                  <ShieldCheck className="w-4 h-4 text-moss-700" /> Dimensions & Washing Care
                </span>
                {openAccordion === "care" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === "care" && (
                <div className="px-4 pb-4 text-espresso-600 space-y-2 leading-relaxed border-t border-oat-200 pt-3">
                  {product.dimensions && (
                    <p><strong>Dimensions:</strong> {product.dimensions}</p>
                  )}
                  <p><strong>Care:</strong> {product.careInstructions || "Gently hand-wash in cold water with mild liquid detergent. Press excess water in a clean towel, reshape, and dry flat in shade."}</p>
                </div>
              )}
            </div>

            {/* 3. Luxury Gifting */}
            <div className="border border-[#E5DAC6] rounded-2xl overflow-hidden bg-[#FDFBF7]">
              <button
                suppressHydrationWarning
                onClick={() => toggleAcc("gifting")}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left font-semibold text-espresso-800"
              >
                <span className="flex items-center gap-2 font-serif text-sm">
                  <Gift className="w-4 h-4 text-amber-600" /> Gift-Ready Packaging
                </span>
                {openAccordion === "gifting" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordion === "gifting" && (
                <div className="px-4 pb-4 text-espresso-600 space-y-2 leading-relaxed border-t border-oat-200 pt-3">
                  <p>
                    Every order arrives wrapped in crisp tissue paper, sealed with an atelier wax emblem, and accompanied by a handwritten note card.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-[#E5DAC6]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso-800 font-bold">
              Artisan Adoration & Reviews
            </h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-espresso-600">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-espresso-800">{product.rating} out of 5</span>
              <span>• Based on {reviews.length} handcrafted orders</span>
            </div>
          </div>

          <button
            suppressHydrationWarning
            onClick={() => setReviewModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#FDFBF7] text-espresso-800 border border-[#E5DAC6] hover:border-clay-400 text-xs font-semibold tracking-wider uppercase transition-all shadow-linen flex items-center gap-2"
          >
            <MessageSquareHeart className="w-4 h-4 text-clay-600" />
            <span>Write a Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-6 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float space-y-3 pearl-pin"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-espresso-400">{rev.date}</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-espresso-800">
                {rev.title}
              </h4>
              <p className="text-xs text-espresso-600 leading-relaxed font-sans">
                {rev.comment}
              </p>
              <div className="pt-2 border-t border-oat-300 flex items-center justify-between text-[11px]">
                <span className="font-bold text-espresso-800">{rev.userName}</span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-moss-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Customer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related "You May Also Love" Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#E5DAC6]">
          <div className="mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
              Handmade Pairings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-espresso-800 font-bold mt-1">
              Pairs Beautifully With
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Purchase Bar */}
      <div className="lg:hidden fixed bottom-[4.75rem] sm:bottom-[5rem] left-0 right-0 z-30 p-2.5 sm:p-3 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E5DAC6] shadow-studio-float flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] text-espresso-400 truncate max-w-[120px]">{product.title}</p>
          <p className="font-serif font-bold text-sm text-espresso-800">{formatPrice(currentPrice)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            suppressHydrationWarning
            onClick={handleAddToCart}
            className="px-4 py-2.5 rounded-full bg-clay-100 hover:bg-clay-200 text-clay-800 text-xs font-semibold uppercase tracking-wider"
          >
            Add to Bag
          </button>
          <button
            suppressHydrationWarning
            onClick={handleBuyNow}
            className="px-5 py-2.5 rounded-full bg-clay-500 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-[#2B2320]/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full aspect-square rounded-3xl overflow-hidden"
            >
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                fill
                className="object-contain"
              />
              <button
                suppressHydrationWarning
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#FAF6F0]/90 hover:bg-[#FAF6F0] text-espresso-800 shadow-md transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div
            onClick={() => setReviewModalOpen(false)}
            className="fixed inset-0 bg-[#2B2320]/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-4xl p-6 sm:p-8 shadow-studio-float border border-[#E5DAC6] space-y-4 z-10">
            <h3 className="font-serif text-xl font-bold text-espresso-800">
              Share Your Artisan Experience
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-espresso-700 block mb-1">
                  Your Name
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-espresso-700 block mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      suppressHydrationWarning
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? "fill-amber-500 text-amber-500"
                            : "text-oat-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-espresso-700 block mb-1">
                  Your Review
                </label>
                <textarea
                  suppressHydrationWarning
                  required
                  rows={4}
                  placeholder="What did you love most about the stitches, color, or packaging?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  suppressHydrationWarning
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#E5DAC6] text-xs font-semibold text-espresso-600 hover:bg-[#FAF6F0]"
                >
                  Cancel
                </button>
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
