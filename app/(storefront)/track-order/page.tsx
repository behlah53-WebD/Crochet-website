"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { formatPrice } from "@/lib/utils";
import {
  Truck,
  Search,
  Package,
} from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/orders");
      const orders = await res.json();
      const q = orderQuery.trim().toLowerCase();
      const found = orders.find(
        (o: any) =>
          o.orderNumber?.toLowerCase() === q ||
          o._id?.toLowerCase() === q ||
          o.userEmail?.toLowerCase() === q
      );
      setTrackedOrder(found || null);
    } catch {
      setTrackedOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      handleSearch();
    }
  }, [initialOrderId]);

  const steps = [
    { label: "Order Placed", desc: "Received & verified" },
    { label: "Studio Hooking", desc: "Hand-crafted by artisans" },
    { label: "Quality Inspection", desc: "Tension & stitch check" },
    { label: "Gift Wrapped", desc: "Ribbon & handwritten note" },
    { label: "Dispatched", desc: "On its way to you" },
    { label: "Delivered", desc: "Enjoy your softness" },
  ];

  return (
    <main className="flex-1 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-dustyrose text-xs font-semibold uppercase tracking-widest border border-blush-200">
            <Truck className="w-3.5 h-3.5" /> Live Parcel Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold">
            Track Your Handcrafted Package
          </h1>
          <p className="text-xs sm:text-sm text-cocoa-600 max-w-md mx-auto font-sans leading-relaxed">
            Enter your Order Number (e.g. LL-2402-1082) or checkout email address to see where your piece is in our creation cycle.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="max-w-xl mx-auto p-2 bg-white rounded-2xl shadow-card border border-[#EFC8D1] flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
            <input
              type="text"
              required
              placeholder="Enter Order Number or Email..."
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl text-xs text-cocoa-800 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {/* Order Details Result */}
        {searched && (
          <div>
            {trackedOrder ? (
              <div className="p-8 sm:p-10 rounded-4xl bg-white border border-[#EFC8D1] shadow-float space-y-8">
                {/* Status header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
                  <div>
                    <span className="text-[10px] text-dustyrose uppercase font-bold tracking-widest">
                      Order #{trackedOrder.orderNumber}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-cocoa-800 mt-0.5">
                      Status:{" "}
                      <span className="text-emerald-700 capitalize">
                        {trackedOrder.orderStatus?.toLowerCase().replace("_", " ") || "In Studio"}
                      </span>
                    </h3>
                    {trackedOrder.trackingNumber && (
                      <p className="text-xs text-cocoa-500 mt-1">
                        Carrier: <strong>{trackedOrder.courierName || "Blue Dart Express"}</strong> • AWB:{" "}
                        <span className="font-mono text-dustyrose font-bold">
                          {trackedOrder.trackingNumber}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-cocoa-400 block">Total Value</span>
                    <span className="font-serif text-lg font-bold text-cocoa-800">
                      {formatPrice(trackedOrder.total)}
                    </span>
                  </div>
                </div>

                {/* Visual Step Progress */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-700">
                    Craft & Dispatch Journey
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {steps.map((step, idx) => (
                      <div
                        key={step.label}
                        className={`p-3 rounded-2xl border text-center space-y-1 ${
                          idx <= 4
                            ? "bg-blush-50 border-dustyrose text-cocoa-800"
                            : "bg-cream-50 border-cream-200 text-cocoa-400"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-blush-200 text-dustyrose text-[11px] font-bold flex items-center justify-center mx-auto">
                          {idx + 1}
                        </div>
                        <p className="text-xs font-semibold line-clamp-1">{step.label}</p>
                        <p className="text-[10px] text-cocoa-500 line-clamp-1">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 pt-4 border-t border-cream-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cocoa-700">
                    Items in this Package
                  </h4>
                  <div className="divide-y divide-cream-100">
                    {trackedOrder.items?.map((item: any, i: number) => (
                      <div key={i} className="py-2.5 flex justify-between items-center text-xs">
                        <span className="font-medium text-cocoa-800">
                          {item.quantity}x {item.title}
                        </span>
                        <span className="font-serif font-bold text-cocoa-800">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-cream-200 text-center max-w-md mx-auto space-y-3">
                <Package className="w-10 h-10 text-cocoa-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-cocoa-800">
                  No order found
                </h3>
                <p className="text-xs text-cocoa-500">
                  We couldn't locate an order matching "{orderQuery}". Please check your order confirmation email or contact our support team.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center p-20 text-xs text-cocoa-500">Loading tracking portal...</div>}>
        <TrackOrderContent />
      </Suspense>
      <Footer />
    </div>
  );
}
