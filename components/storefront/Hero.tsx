"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  content?: {
    heroBadge?: string;
    heroHeadingMain?: string;
    heroHeadingHighlight?: string;
    heroCursiveQuote?: string;
    heroDescription?: string;
    heroPrimaryBtnText?: string;
    heroPrimaryBtnLink?: string;
    heroSecondaryBtnText?: string;
    heroSecondaryBtnLink?: string;
    heroTrustBadges?: string[];
    heroSpotlightImage?: string;
    heroSpotlightBadge?: string;
    heroSpotlightTitle?: string;
    heroSpotlightDesc?: string;
    heroFloatingBadge1Image?: string;
    heroFloatingBadge1Title?: string;
    heroFloatingBadge1Subtitle?: string;
    heroFloatingBadge2Rating?: string;
    heroFloatingBadge2Text?: string;
  };
}

export function Hero({ content }: HeroProps) {
  const badgeText = content?.heroBadge || "Small-Batch Artisan Studio • Handcrafted in India";
  const headingMain = content?.heroHeadingMain || "Handmade with";
  const headingHighlight = content?.heroHeadingHighlight || "every stitch.";
  const cursiveQuote = content?.heroCursiveQuote || "“Little stitches, big happiness — made slowly, loved forever.”";
  const description =
    content?.heroDescription ||
    "Welcome to our boutique crochet atelier. Explore luxury handbags, forever flower bouquets that never wilt, cuddly amigurumi companions, and bespoke made-to-order keepsakes, all meticulously hand-hooked with silky milk cotton yarn.";
  const primaryBtnText = content?.heroPrimaryBtnText || "Shop the Collection";
  const primaryBtnLink = content?.heroPrimaryBtnLink || "/shop";
  const secondaryBtnText = content?.heroSecondaryBtnText || "Custom Order Studio";
  const secondaryBtnLink = content?.heroSecondaryBtnLink || "/custom-order";
  const trustBadges = content?.heroTrustBadges?.length
    ? content.heroTrustBadges
    : ["100% Cotton & Milk Yarn", "Gift-Ready Ribbon Box", "10,000+ Happy Stitches"];

  const spotlightImage =
    content?.heroSpotlightImage ||
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop";
  const spotlightBadge = content?.heroSpotlightBadge || "Artisan Spotlight No. 01";
  const spotlightTitle = content?.heroSpotlightTitle || "The Blush Bloom Pearl Bag";
  const spotlightDesc =
    content?.heroSpotlightDesc ||
    "18 hours of mindful hand-crocheting in milk-cotton with genuine freshwater pearl accents.";

  const badge1Image =
    content?.heroFloatingBadge1Image ||
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400&auto=format&fit=crop";
  const badge1Title = content?.heroFloatingBadge1Title || "Forever Blooms";
  const badge1Subtitle = content?.heroFloatingBadge1Subtitle || "Never wilts • Always lovely";

  const badge2Rating = content?.heroFloatingBadge2Rating || "4.9 / 5.0";
  const badge2Text = content?.heroFloatingBadge2Text || "From 850+ Verified Shoppers";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F5ECE1] to-[#FAF6F0] pt-8 pb-16 lg:pt-14 lg:pb-24 crochet-mesh-pattern">
      {/* Warm ambient studio light blooms */}
      <div className="absolute top-8 left-1/4 w-96 h-96 bg-clay-200/25 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-36 right-8 w-96 h-96 bg-moss-200/25 rounded-full blur-3xl pointer-events-none animate-float-gentle" />
      <div className="absolute -bottom-12 left-12 w-80 h-80 bg-amber-100/30 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative dashed thread SVG running gently across */}
      <svg
        className="absolute top-1/2 left-0 right-0 w-full h-32 pointer-events-none opacity-25 -translate-y-1/2"
        viewBox="0 0 1200 120"
        fill="none"
      >
        <path
          d="M0,60 C300,120 600,0 900,80 C1050,120 1150,30 1200,60"
          stroke="#C77B58"
          strokeWidth="2"
          strokeDasharray="8 8"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Artisan Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDFBF7]/95 backdrop-blur-md border border-[#E5DAC6] text-clay-700 text-xs font-semibold uppercase tracking-widest shadow-xs"
            >
              <Heart className="w-3.5 h-3.5 fill-clay-600 text-clay-600 animate-pulse-subtle" />
              <span>{badgeText}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-espresso-800 font-bold tracking-tight leading-[1.12]">
                {headingMain} <br />
                <span className="italic font-normal text-clay-600 relative inline-block">
                  {headingHighlight}
                  {/* Under-thread curl */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-clay-300"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2,8 C50,2 150,14 198,4"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="font-handwriting text-2xl sm:text-3xl text-espresso-600 pt-1">
                {cursiveQuote}
              </p>
            </motion.div>

            {/* Story Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-espresso-600 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href={primaryBtnLink}
                className="btn-thread-wrap w-full sm:w-auto px-8 py-4 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-studio-float flex items-center justify-center gap-2 group"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={secondaryBtnLink}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FDFBF7] hover:bg-[#F5ECE1] text-espresso-800 border border-[#E5DAC6] hover:border-clay-400 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-linen flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                <span>{secondaryBtnText}</span>
              </Link>
            </motion.div>

            {/* Floating Detail Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 text-xs text-espresso-600 font-medium"
            >
              {trustBadges[0] && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDFBF7]/90 border border-[#E5DAC6] shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-moss-700" /> {trustBadges[0]}
                </span>
              )}
              {trustBadges[1] && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDFBF7]/90 border border-[#E5DAC6] shadow-2xs">
                  <Gift className="w-3.5 h-3.5 text-clay-600" /> {trustBadges[1]}
                </span>
              )}
              {trustBadges[2] && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDFBF7]/90 border border-[#E5DAC6] shadow-2xs">
                  <Heart className="w-3.5 h-3.5 text-clay-600 fill-clay-600" /> {trustBadges[2]}
                </span>
              )}
            </motion.div>
          </div>

          {/* Right Product Composition with Framed Polaroid Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Decorative Warm Ambient Glow Behind */}
              <div className="absolute -inset-3 rounded-5xl bg-gradient-to-tr from-clay-200/50 via-amber-100/40 to-moss-200/50 -rotate-2 transform blur-xs pointer-events-none" />

              {/* Main Focal Polaroid Card */}
              <div className="relative aspect-[4/5] rounded-4xl overflow-hidden shadow-studio-float border-4 border-[#FDFBF7] bg-[#F5ECE1] z-10 group">
                <Image
                  src={spotlightImage}
                  alt={spotlightTitle}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/80 via-espresso-900/15 to-transparent" />

                {/* Editorial Caption on Image */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-20">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-[#FAF6F0] border border-white/30">
                    {spotlightBadge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {spotlightTitle}
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/90 font-sans leading-relaxed">
                    {spotlightDesc}
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Forever Blooms pill */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="absolute -top-4 sm:-top-6 left-0 sm:-left-6 z-20 bg-[#FDFBF7]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-studio-float border border-[#E5DAC6] flex items-center gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-none"
              >
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-clay-100 shrink-0 border border-clay-200">
                  <Image
                    src={badge1Image}
                    alt={badge1Title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-serif font-bold text-espresso-800">
                    {badge1Title}
                  </p>
                  <p className="text-[11px] text-espresso-500 font-sans">
                    {badge1Subtitle}
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Reviews Card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 sm:-bottom-6 right-0 sm:-right-6 z-20 bg-[#FDFBF7]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-studio-float border border-[#E5DAC6] flex items-center gap-2.5 sm:gap-3 max-w-[90%] sm:max-w-none"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-espresso-800 flex items-center gap-1">
                    <span>{badge2Rating}</span>
                    <span className="text-[10px] text-espresso-400 font-normal">Rating</span>
                  </p>
                  <p className="text-[10px] text-espresso-500">{badge2Text}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
