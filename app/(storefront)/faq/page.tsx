import React from "react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { HelpCircle } from "lucide-react";
import { getFAQs } from "@/lib/content";

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Help Center
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-cocoa-800 font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 font-sans">
              Everything you need to know about our slow-crafted crochet collections.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => (
              <div
                key={faq._id || i}
                className="p-6 rounded-3xl bg-white border border-[#EFC8D1] shadow-card space-y-2"
              >
                <h3 className="font-serif text-base font-semibold text-cocoa-800 flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-dustyrose flex-shrink-0" />
                  {faq.question || faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-600 pl-7 leading-relaxed font-sans">
                  {faq.answer || faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
