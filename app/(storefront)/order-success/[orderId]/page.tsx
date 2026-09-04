"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { formatPrice } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Printer,
  Package,
  ArrowRight,
  Sparkles,
  Truck,
  Heart,
} from "lucide-react";

export default function OrderSuccessPage(props: any) {
  const routeParams = useParams();
  const orderId = (routeParams?.orderId as string) || (typeof props?.params?.orderId === "string" ? props.params.orderId : "");
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fire festive celebratory pastel confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#EFC8D1", "#F8E9EC", "#D9C9DD", "#C7A76B"],
      });
    } catch (e) {
      console.warn(e);
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders`);
        const data = await res.json();
        const found = data.find((o: any) => o._id === orderId || o.orderNumber === orderId);
        if (found) {
          setOrder(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 print:p-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-4xl bg-white border border-[#EFC8D1] shadow-float space-y-8 print:shadow-none print:border-none">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-blush-100 text-dustyrose flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-dustyrose">
                Order Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold">
                Thank You For Your Love!
              </h1>
              <p className="text-xs sm:text-sm text-cocoa-600 font-sans max-w-md mx-auto leading-relaxed">
                Your handcrafted order has been scheduled in our artisan studio. We will weave every stitch with utmost devotion.
              </p>
            </div>

            {/* Order Meta Pill */}
            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-200 flex flex-wrap items-center justify-between gap-4 text-xs text-cocoa-700">
              <div>
                <span className="text-cocoa-400 block text-[10px] uppercase">Order Number</span>
                <span className="font-mono font-bold text-sm text-cocoa-800">
                  {order?.orderNumber || "LL-" + (orderId ? orderId.slice(-6).toUpperCase() : "CONFIRMED")}
                </span>
              </div>
              <div>
                <span className="text-cocoa-400 block text-[10px] uppercase">Payment</span>
                <span className="font-semibold text-emerald-700">
                  {order?.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay Verified"}
                </span>
              </div>
              <div>
                <span className="text-cocoa-400 block text-[10px] uppercase">Est. Dispatch</span>
                <span className="font-semibold">Within 2–4 business days</span>
              </div>
            </div>

            {/* Items Breakdown */}
            {order?.items && (
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-sm font-bold text-cocoa-800">
                  Handcrafted Items
                </h3>
                <div className="divide-y divide-cream-100 border-t border-b border-cream-200">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-cocoa-800">{item.title}</p>
                          <p className="text-[11px] text-cocoa-500">
                            Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-serif font-bold text-cocoa-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            {order && (
              <div className="flex justify-between items-center text-sm font-serif font-bold text-cocoa-800 pt-2">
                <span>Total Amount Paid</span>
                <span className="text-xl text-dustyrose">{formatPrice(order.total)}</span>
              </div>
            )}

            {/* Shipping Address */}
            {order?.shippingAddress && (
              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs space-y-1">
                <h4 className="font-semibold text-cocoa-800">Delivery Address:</h4>
                <p className="text-cocoa-700">{order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
                <p className="text-cocoa-600">
                  {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-cream-300 text-cocoa-700 hover:bg-cream-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <Link
                href={`/track-order?orderId=${order?.orderNumber || orderId}`}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Truck className="w-4 h-4" />
                <span>Track Package Status</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
