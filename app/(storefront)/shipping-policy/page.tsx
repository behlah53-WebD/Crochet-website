import React from "react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Truck, ShieldCheck, Clock, Heart } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Delivery Information
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold">
              Shipping & Dispatch Policy
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 font-sans">
              Handmade softness packaged with love, dispatched safely across India.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6 text-xs sm:text-sm text-cocoa-700 font-sans leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                1. Free Shipping Threshold
              </h3>
              <p>
                We provide complimentary <strong>FREE tracked shipping</strong> on all orders of ₹999 and above across all pin codes in India. For orders below ₹999, a flat standard courier fee of ₹99 applies.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                2. Creation and Dispatch Timelines
              </h3>
              <p>
                - <strong>Ready-to-Ship Items:</strong> Dispatched from our Bengaluru studio within 24–48 hours of order confirmation.<br />
                - <strong>Made-to-Order Pieces:</strong> Require approximately 3 to 5 business days for our master artisans to hook, block, and line by hand.<br />
                - <strong>Custom Bespoke Orders:</strong> Timeline provided with your quote (typically 5–7 days).
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                3. Courier Partners & Tracking
              </h3>
              <p>
                We partner with premier express logistics carriers including Blue Dart, Delhivery, and DTDC. As soon as your order is dispatched, you will receive an SMS and email notification with your live tracking number (AWB).
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                4. Packaging with Care
              </h3>
              <p>
                Every Loom & Love creation is carefully nestled inside protective dust bags, wrapped in blush tissue paper, tied with satin ribbon, and enclosed with dried botanical blooms to ensure it arrives in pristine, gift-ready perfection.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
