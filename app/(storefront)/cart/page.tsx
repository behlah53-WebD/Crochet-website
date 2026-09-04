"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Gift,
  Tag,
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
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

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold mt-1">
              Shopping Bag ({cart.length})
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EFC8D1]/40 p-8 space-y-4 max-w-lg mx-auto shadow-card">
              <div className="w-20 h-20 rounded-full bg-blush-100 text-dustyrose flex items-center justify-center mx-auto">
                <ShoppingBag className="w-9 h-9 stroke-1" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-cocoa-800">
                Your bag is empty
              </h2>
              <p className="text-xs text-cocoa-500 font-sans">
                Explore our slow-crafted crochet bags, bouquets, and bespoke keepsakes.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-dustyrose text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#A3707F] transition-all"
              >
                <span>Browse Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Items */}
              <div className="lg:col-span-8 space-y-6">
                {/* Free Shipping Meter */}
                <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200">
                  <div className="flex justify-between text-xs text-cocoa-700 font-medium mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                      {amountNeeded === 0 ? (
                        <strong className="text-emerald-700">
                          You unlocked FREE shipping across India! 🌸
                        </strong>
                      ) : (
                        <span>
                          Add <strong className="text-dustyrose">{formatPrice(amountNeeded)}</strong> more to get Free Shipping
                        </span>
                      )}
                    </span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-[#EFC8D1]/40">
                    <div
                      className="bg-gradient-to-r from-[#EFC8D1] via-[#B98291] to-[#C7A76B] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="bg-white rounded-3xl border border-[#EFC8D1]/40 shadow-card divide-y divide-cream-200">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="font-serif text-sm sm:text-base font-semibold text-cocoa-800 hover:text-dustyrose transition-colors">
                              {item.title}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap gap-2 text-xs text-cocoa-500 mt-1">
                            {item.selectedColor && (
                              <span className="inline-flex items-center gap-1 bg-cream-100 px-2.5 py-0.5 rounded-md border border-cream-200">
                                {item.selectedColorHex && (
                                  <span
                                    className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                                    style={{ backgroundColor: item.selectedColorHex }}
                                  />
                                )}
                                {item.selectedColor}
                              </span>
                            )}
                            {item.personalizationText && (
                              <span className="bg-blush-50 text-dustyrose px-2.5 py-0.5 rounded-md border border-blush-200 font-mono">
                                Monogram: {item.personalizationText}
                              </span>
                            )}
                          </div>
                          <p className="font-serif text-sm font-bold text-cocoa-800 mt-2 sm:hidden">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                        {/* Quantity */}
                        <div className="flex items-center border border-cream-300 rounded-full bg-cream-50 overflow-hidden">
                          <button
                            suppressHydrationWarning
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="px-3 py-1.5 text-cocoa-700 hover:bg-blush-100 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-cocoa-800">{item.quantity}</span>
                          <button
                            suppressHydrationWarning
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="px-3 py-1.5 text-cocoa-700 hover:bg-blush-100 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-base font-bold text-cocoa-800 hidden sm:inline">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        {/* Remove */}
                        <button
                          suppressHydrationWarning
                          onClick={() => removeFromCart(item.productId, item.selectedColor, item.selectedSize)}
                          className="p-2 text-cocoa-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Wrap option */}
                <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/40 shadow-card space-y-3">
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blush-100 flex items-center justify-center text-dustyrose">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-cocoa-800">
                          Add Signature Gift Packaging (+₹99)
                        </h4>
                        <p className="text-xs text-cocoa-500 font-sans">
                          Arrives tied with blush satin ribbon, dried lavender sprig & handwritten note card
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-5 h-5 rounded border-cream-400 text-dustyrose accent-dustyrose focus:ring-blush-300"
                    />
                  </label>

                  {giftWrap && (
                    <div className="pt-2">
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Write your special message for the recipient..."
                        rows={2}
                        className="w-full text-xs p-3 rounded-xl bg-cream-50 border border-blush-200 focus:outline-none focus:border-dustyrose text-cocoa-800 font-sans"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Summary */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
                  <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-3 border-b border-cream-200">
                    Order Summary
                  </h3>

                  {/* Coupon Code */}
                  <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                    {couponCode ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-800">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Check className="w-4 h-4 text-emerald-600" />
                          Code <strong>{couponCode}</strong> applied
                        </span>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          className="text-xs text-red-600 hover:underline font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cocoa-400" />
                          <input
                            suppressHydrationWarning
                            type="text"
                            placeholder="Discount code (e.g. LOOM10)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl bg-cream-50 border border-cream-300 uppercase tracking-wider text-cocoa-800 focus:outline-none focus:border-dustyrose"
                          />
                        </div>
                        <button
                          suppressHydrationWarning
                          type="submit"
                          className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-cocoa-800 text-xs font-semibold rounded-xl transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {couponError && <p className="text-[11px] text-red-500 pl-1">{couponError}</p>}
                  </form>

                  {/* Cost breakdown */}
                  <div className="space-y-2.5 text-xs text-cocoa-600 pt-2 border-t border-cream-200">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-cocoa-800">{formatPrice(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Discount</span>
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
                          <strong className="text-emerald-700 font-semibold">FREE</strong>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-serif font-bold text-cocoa-800 pt-3 border-t border-cream-200">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-cocoa-500">
                    <ShieldCheck className="w-4 h-4 text-dustyrose" />
                    <span>Razorpay Secure 256-bit Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
