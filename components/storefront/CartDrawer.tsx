"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    giftWrapFee,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    shippingFee,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#2B2320]/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FAF6F0] shadow-studio-float flex flex-col border-l border-[#E5DAC6]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#E5DAC6] flex items-center justify-between bg-[#FDFBF7]/90 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-clay-100 flex items-center justify-center text-clay-700">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg text-espresso-800 font-semibold tracking-wide">
                      Your Shopping Bag
                    </h2>
                    <p className="text-xs text-espresso-500 font-sans">
                      {cart.length} {cart.length === 1 ? "handmade item" : "handmade items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-clay-100 text-espresso-500 hover:text-espresso-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-[#F5ECE1] px-5 py-3 border-b border-[#E5DAC6]">
                <div className="flex items-center justify-between text-xs text-espresso-700 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {amountNeeded === 0 ? (
                      <span className="text-moss-800 font-semibold">
                        You unlocked FREE shipping across India! 🧶
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-clay-600 font-bold">{formatPrice(amountNeeded)}</strong> more for free shipping
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-espresso-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#FDFBF7] rounded-full h-2 overflow-hidden border border-[#E5DAC6]">
                  <div
                    className="bg-gradient-to-r from-clay-400 via-clay-500 to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-clay-100/70 border border-clay-200 flex items-center justify-center text-clay-600 animate-pulse-subtle">
                      <ShoppingBag className="w-9 h-9 stroke-1" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-espresso-800 font-medium">Your bag is empty</h3>
                      <p className="text-xs text-espresso-500 mt-1 max-w-xs font-sans">
                        Our artisans are waiting to craft something lovely just for you. Explore our collection!
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="btn-thread-wrap inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] font-medium text-xs tracking-wider uppercase transition-all shadow-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-3.5 p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen hover:border-clay-300 transition-all"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-oat-100 flex-shrink-0 border border-oat-300">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-serif font-semibold text-espresso-800 line-clamp-1">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)}
                              className="text-espresso-400 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 text-[11px] text-espresso-500 mt-0.5">
                            {item.selectedColor && (
                              <span className="inline-flex items-center gap-1 bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-oat-300">
                                {item.selectedColorHex && (
                                  <span
                                    className="w-2 h-2 rounded-full inline-block border border-black/10"
                                    style={{ backgroundColor: item.selectedColorHex }}
                                  />
                                )}
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-oat-300">
                                {item.selectedSize}
                              </span>
                            )}
                            {item.personalizationText && (
                              <span className="bg-clay-100 text-clay-700 px-2 py-0.5 rounded-md border border-clay-200">
                                Initials: {item.personalizationText}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-oat-200">
                          {/* Quantity control */}
                          <div className="flex items-center border border-oat-300 rounded-full bg-[#FAF6F0] overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="px-2 py-0.5 text-espresso-600 hover:bg-clay-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-espresso-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="px-2 py-0.5 text-espresso-600 hover:bg-clay-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-serif font-bold text-espresso-800">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Gift Wrap Add-on */}
                {cart.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#F5ECE1] border border-dashed border-clay-400/60 space-y-2">
                    <label className="flex items-center justify-between cursor-pointer select-none">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                          <Gift className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-espresso-800">
                            Signature Gift Packaging (+₹99)
                          </p>
                          <p className="text-[11px] text-espresso-500">
                            Satin ribbon, botanical sprig & handwritten note card
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="w-4 h-4 text-clay-600 rounded border-oat-300 focus:ring-clay-300 accent-clay-600"
                      />
                    </label>

                    {giftWrap && (
                      <div className="pt-2">
                        <textarea
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          placeholder="Enter your heartfelt message for the card..."
                          maxLength={200}
                          rows={2}
                          className="w-full text-xs p-2.5 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] focus:outline-none focus:border-clay-500 font-sans text-espresso-800 placeholder:text-espresso-400"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#E5DAC6] bg-[#FDFBF7]/95 backdrop-blur-md space-y-3">
                  {/* Coupon section */}
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    {couponCode ? (
                      <div className="flex items-center justify-between bg-moss-50 border border-moss-200 px-3 py-1.5 rounded-xl text-xs text-moss-800">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-moss-700" />
                          <span>Coupon <strong>{couponCode}</strong> applied</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs text-red-600 hover:underline font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-espresso-400" />
                          <input
                            type="text"
                            placeholder="Promo code (e.g. LOOM10)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] focus:outline-none focus:border-clay-500 uppercase tracking-wider text-espresso-800 placeholder:normal-case"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-oat-200 hover:bg-oat-300 text-espresso-800 text-xs font-medium rounded-xl transition-colors border border-[#E5DAC6]"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-[11px] text-red-500 pl-1">{couponError}</p>
                    )}
                  </form>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-espresso-600 pt-1 border-t border-oat-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-espresso-800">{formatPrice(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-moss-700">
                        <span>Discount ({couponCode})</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    {giftWrapFee > 0 && (
                      <div className="flex justify-between">
                        <span>Gift Packaging</span>
                        <span>{formatPrice(giftWrapFee)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span>
                        {shippingFee === 0 ? (
                          <strong className="text-moss-700">FREE</strong>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-serif font-bold text-espresso-800 pt-2 border-t border-oat-200">
                      <span>Estimated Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-2.5 rounded-full border border-[#E5DAC6] text-espresso-700 text-center font-medium text-xs hover:bg-[#FAF6F0] transition-colors flex items-center justify-center"
                    >
                      View Full Bag
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="btn-thread-wrap w-full py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-center font-medium text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                    >
                      Checkout <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
