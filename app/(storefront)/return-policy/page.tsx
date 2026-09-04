import React from "react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Artisan Guarantee
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold">
              Returns & Exchanges Policy
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 font-sans">
              We stand behind every loop and knot with heartfelt commitment.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6 text-xs sm:text-sm text-cocoa-700 font-sans leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                1. 7-Day Gentle Return Window
              </h3>
              <p>
                If your handcrafted piece arrives damaged or has any manufacturing flaw, please notify us within 7 calendar days of receipt at <strong>hello@loomandlove.com</strong> with clear photos or an unboxing video. We will happily replace it or issue a full refund.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                2. Nature of Handcrafted Goods
              </h3>
              <p>
                Because each item is woven stitch-by-stitch by hand rather than stamped by machine, minor organic variations in tension, yarn gradient, or floral petal placement are natural markers of authenticity rather than defects.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base font-bold text-cocoa-800">
                3. Custom Monogrammed Pieces
              </h3>
              <p>
                Due to their tailored personalization, items made with custom monograms or bespoke color requests cannot be returned unless they arrive damaged during transit.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
