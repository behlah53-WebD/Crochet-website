"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  Sparkles,
  Lock,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discountAmount,
    couponCode,
    giftWrap,
    giftWrapFee,
    giftMessage,
    shippingFee,
    total,
    clearCart,
  } = useCart();

  // Address inputs
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Karnataka");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !email || !street || !city || !pincode) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your shopping bag is empty.");
      router.push("/shop");
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        userName: fullName,
        userEmail: email.toLowerCase().trim(),
        shippingAddress: {
          fullName,
          phone,
          street,
          apartment,
          city,
          state,
          pincode,
        },
        items: cart.map((i) => ({
          productId: i.productId,
          title: i.title,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize,
          personalizationText: i.personalizationText,
        })),
        subtotal,
        discountAmount,
        couponCode: couponCode || undefined,
        giftWrapFee,
        giftMessage: giftWrap ? giftMessage : undefined,
        shippingFee,
        total,
        paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const order = await res.json();

      if (res.ok && order._id) {
        // Clear shopping cart
        clearCart();
        toast.success("Order placed successfully! 🌸");
        router.push(`/order-success/${order._id}`);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch {
      toast.error("Something went wrong with order processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="font-serif text-2xl font-bold text-cocoa-800">Your bag is empty</h2>
            <p className="text-xs text-cocoa-500">Please add items to your cart before proceeding to checkout.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 rounded-full bg-dustyrose text-white text-xs font-semibold uppercase tracking-wider"
            >
              Browse Handcrafted Pieces
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Secure Order Confirmation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold mt-1">
              Checkout & Delivery
            </h1>
          </div>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Delivery details & payment selection */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping Address Section */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card space-y-5">
                <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-2 border-b border-cream-200">
                  1. Shipping & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                      Full Recipient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Email Address (for order tracking & invoice) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Street Address & House / Flat No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 302, Rosewood Villa, 4th Cross"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="e.g. 560038"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card space-y-4">
                <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-2 border-b border-cream-200">
                  2. Select Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Razorpay Online */}
                  <label
                    className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === "RAZORPAY"
                        ? "bg-blush-50 border-dustyrose ring-1 ring-dustyrose shadow-sm"
                        : "bg-cream-50 border-cream-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-5 h-5 text-dustyrose" />
                        <span className="font-serif text-sm font-bold text-cocoa-800">
                          Razorpay Secure
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "RAZORPAY"}
                        onChange={() => setPaymentMethod("RAZORPAY")}
                        className="w-4 h-4 text-dustyrose accent-dustyrose"
                      />
                    </div>
                    <p className="text-[11px] text-cocoa-500 mt-2 font-sans">
                      Instant checkout via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, or Net Banking.
                    </p>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "bg-blush-50 border-dustyrose ring-1 ring-dustyrose shadow-sm"
                        : "bg-cream-50 border-cream-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <Banknote className="w-5 h-5 text-dustyrose" />
                        <span className="font-serif text-sm font-bold text-cocoa-800">
                          Cash on Delivery
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                        className="w-4 h-4 text-dustyrose accent-dustyrose"
                      />
                    </div>
                    <p className="text-[11px] text-cocoa-500 mt-2 font-sans">
                      Pay cash upon courier delivery. Handcrafted order confirmed instantly.
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Confirm */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
                <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-2 border-b border-cream-200">
                  Review Your Order ({cart.length})
                </h3>

                {/* Items */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-cream-100">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-3 pt-3 first:pt-0"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 border border-cream-200 flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-cocoa-800 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-cocoa-500 mt-0.5">
                          Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                        </p>
                        {item.personalizationText && (
                          <p className="text-[10px] text-dustyrose font-mono">
                            Initials: {item.personalizationText}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-serif font-bold text-cocoa-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gift packaging badge if enabled */}
                {giftWrap && (
                  <div className="p-3 rounded-xl bg-blush-50 border border-blush-200 text-xs text-cocoa-700 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-dustyrose flex-shrink-0" />
                    <span>Signature Gift Packaging included (+₹99)</span>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs text-cocoa-600 pt-3 border-t border-cream-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-cocoa-800">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({couponCode})</span>
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
                    <span>Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700">FREE</strong>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-serif font-bold text-cocoa-800 pt-3 border-t border-cream-200">
                    <span>Total Amount</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-float flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "Securing Order..."
                      : `Confirm & Place Order (${formatPrice(total)})`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-cocoa-500">
                  <ShieldCheck className="w-4 h-4 text-dustyrose" />
                  <span>Your order is covered by Loom & Love Artisan Guarantee</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
