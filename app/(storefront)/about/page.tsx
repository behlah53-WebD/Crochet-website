import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Sparkles, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { getPageContent, DEFAULT_ABOUT_PAGE } from "@/lib/content";

export default async function AboutPage() {
  const content = (await getPageContent("about")) || DEFAULT_ABOUT_PAGE;

  const valueIcons: Record<string, any> = {
    Sparkles,
    Heart,
    CheckCircle2,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-clay-100 text-clay-700 text-xs font-semibold uppercase tracking-widest border border-clay-200">
              <Heart className="w-3.5 h-3.5 fill-clay-600 text-clay-600" />{" "}
              {content.badge || "Our Artisan Story"}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-espresso-800 font-bold leading-tight">
              {content.heroTitle || "Woven with Heart,"} <br />
              <span className="italic font-normal text-clay-600">
                {content.heroHighlight || "One Loop at a Time."}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
              {content.heroSubtitle ||
                "Loom & Love began as a quiet counter-movement to disposable fast fashion—an intimate studio where time slows down and every stitch tells a story of care."}
            </p>
          </div>

          {/* Large Hero Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-studio-float border-4 border-[#FDFBF7] bg-oat-100">
              <Image
                src={
                  content.founderImage ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                }
                alt="Aanya Verma, founder of Loom & Love"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-clay-600">
                {content.founderSubtitle || "Meet the Maker"}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-espresso-800 font-bold">
                {content.founderQuote || "“There is healing in the steady, gentle rhythm of yarn.”"}
              </h2>
              <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
                {content.storyParagraph1 ||
                  "Founded by textile designer Aanya Verma in 2022, Loom & Love was born from a crochet hook inherited from her grandmother. What started on a balcony in Bengaluru has blossomed into a collaborative atelier supporting over twenty talented women artisans across Karnataka and Rajasthan."}
              </p>
              <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
                {content.storyParagraph2 ||
                  "Unlike mass factories that stamp out identical clones, every single bag, flower stem, and plush companion that leaves our studio bears slight, exquisite nuances of the human hands that created it."}
              </p>
            </div>
          </div>

          {/* 3 Core Values */}
          <div className="p-8 sm:p-12 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs uppercase font-semibold tracking-widest text-clay-600">
                {content.philosophyBadge || "Our Guiding Philosophy"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-800 mt-1">
                {content.philosophyTitle || "The Slow Craft Promise"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.values?.map((val: any, idx: number) => {
                const Icon = valueIcons[val.icon] || Sparkles;
                const iconColor =
                  idx === 1
                    ? "bg-clay-100 text-clay-600"
                    : idx === 2
                    ? "bg-moss-100 text-moss-700"
                    : "bg-amber-100 text-amber-700";

                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E5DAC6] space-y-2.5"
                  >
                    <div className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-base font-semibold text-espresso-800">
                      {val.title}
                    </h4>
                    <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Studio CTA Box */}
          <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-r from-clay-500 to-clay-600 text-white shadow-studio-float flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-200">
                Made for You
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Have a dream design in mind?
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/90 max-w-md">
                Bring your custom color palette, initials, or dimensions to our studio artisans.
              </p>
            </div>
            <Link
              href="/custom-order"
              className="px-8 py-4 rounded-full bg-[#FDFBF7] hover:bg-white text-espresso-800 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <span>Explore Custom Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
