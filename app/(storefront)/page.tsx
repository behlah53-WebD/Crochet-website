import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Hero } from "@/components/storefront/Hero";
import { ProductCard } from "@/components/storefront/ProductCard";
import { ColorSwatchPicker } from "@/components/storefront/ColorSwatchPicker";
import { BestSellersCarousel } from "@/components/storefront/BestSellersCarousel";
import { StitchDivider } from "@/components/storefront/StitchDivider";
import { getProducts, getCategories } from "@/lib/products";
import { getHomePageContent, getTestimonials } from "@/lib/content";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Star,
  Quote,
  Instagram,
  ShoppingBag,
  Flower2,
  Smile,
  KeyRound,
  Home,
  Gift,
  Palette,
  Feather,
  CheckCircle2,
  Package,
} from "lucide-react";

export default async function HomePage() {
  const [categories, featuredProducts, bestSellers, homeContent, customerNotes] =
    await Promise.all([
      getCategories(),
      getProducts({ isFeatured: true, limit: 4 }),
      getProducts({ isBestSeller: true, limit: 6 }),
      getHomePageContent(),
      getTestimonials(true),
    ]);

  const categoryIcons: Record<string, any> = {
    "crochet-bags": ShoppingBag,
    "flower-bouquets": Flower2,
    "amigurumi-plushies": Smile,
    "keychains-charms": KeyRound,
    "home-living": Home,
    "gifts-under-999": Gift,
    "custom-creations": Sparkles,
  };

  const trustStripIcons: Record<string, any> = {
    Heart,
    Feather,
    Gift,
    Palette,
    Sparkles,
    CheckCircle2,
    Package,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />

      <main className="flex-1">
        {/* =====================================================================
            1. HERO SECTION (Warm oat canvas, Fraunces headline, framed polaroid)
        ====================================================================== */}
        <Hero content={homeContent} />

        {/* =====================================================================
            2. TRUST / CRAFTSMANSHIP STRIP (Tactile cards, sand borders, warm lift)
        ====================================================================== */}
        <section className="bg-[#F5ECE1] py-10 border-b border-[#E5DAC6]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {homeContent.trustStripItems.map((item: any, idx: number) => {
                const IconComponent = trustStripIcons[item.iconName] || Heart;
                const themeClasses =
                  item.theme === "moss"
                    ? "bg-moss-100 text-moss-700"
                    : item.theme === "amber"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-clay-100 text-clay-600";

                return (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-3.5 p-4 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen hover:shadow-clay-bloom hover:-translate-y-1 transition-all"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${themeClasses} flex items-center justify-center shrink-0`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-espresso-800">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-espresso-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. CATEGORIES SECTION (Warm oat parchment, asymmetrical polaroid tiles)
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#FAF6F0] relative overflow-hidden">
          {/* Subtle background ambient light */}
          <div className="absolute top-10 right-5 w-72 h-72 rounded-full bg-clay-200/15 blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 left-5 w-80 h-80 rounded-full bg-moss-200/15 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
                  {homeContent.categoryBadge || "Taxonomy of Softness"}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold mt-1">
                  {homeContent.categoryTitle || "Shop by Handcrafted Category"}
                </h2>
                <p className="text-xs sm:text-sm text-espresso-500 font-sans mt-1">
                  {homeContent.categorySubtitle ||
                    "Explore curated collections, from everyday structured totes to nursery amigurumi treasures."}
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-clay-600 hover:text-clay-700 hover:underline"
              >
                <span>{homeContent.categoryLinkText || "View Full Catalog"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Asymmetrical Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((cat, idx) => {
                const IconComponent = categoryIcons[cat.slug] || Sparkles;
                const isTall = idx === 0 || idx === 3;
                return (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    className={`group relative rounded-4xl overflow-hidden shadow-studio-float border border-[#E5DAC6] bg-[#F5ECE1] flex flex-col justify-end p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-clay-bloom ${
                      isTall ? "h-80 sm:h-96" : "h-72 sm:h-80"
                    }`}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/85 via-espresso-900/30 to-transparent z-10" />

                    {/* Content inside card */}
                    <div className="relative z-20 space-y-1 text-white">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#FAF6F0] mb-2 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#FAF6F0]/90 line-clamp-1">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-amber-200 font-semibold tracking-wider uppercase">
                          {cat.itemCount || 3}+ creations
                        </span>
                        <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. FEATURED PRODUCTS (Woven texture canvas, running stitch dividers)
        ====================================================================== */}
        <section className="py-20 sm:py-24 crochet-woven-pattern border-y border-[#E5DAC6] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
                  {homeContent.featuredBadge || "The Atelier Edit"}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold mt-1">
                  {homeContent.featuredTitle || "Featured Creations"}
                </h2>
                <p className="font-handwriting text-2xl text-espresso-600 mt-1">
                  {homeContent.featuredCursiveQuote ||
                    "“Pieces that bring quiet romance to ordinary days.”"}
                </p>
              </div>

              {/* Stitched Fabric Label CTA */}
              <Link
                href="/shop"
                className="stitch-border-pill px-6 py-2.5 rounded-full bg-[#FDFBF7] hover:bg-clay-50 text-espresso-800 hover:text-clay-600 text-xs font-semibold uppercase tracking-wider transition-all shadow-linen flex items-center gap-2"
              >
                <span>{homeContent.featuredButtonText || "Browse All Creations"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-clay-600" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. BRAND STORY / MAKER ATELIER (Split layout, tilted polaroids, quote)
        ====================================================================== */}
        <section className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Overlapping Polaroid Photos */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                {/* Polaroid 1 (Tilted Left with pearl pin) */}
                <div className="relative w-64 sm:w-72 aspect-[3/4] p-3 pb-8 bg-[#FDFBF7] rounded-2xl shadow-studio-float border border-[#E5DAC6] -rotate-6 transform hover:rotate-0 transition-transform duration-500 z-10 pearl-pin">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-oat-100">
                    <Image
                      src={
                        homeContent.storyPolaroids?.[0]?.image ||
                        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
                      }
                      alt="Artisan hands crocheting milk cotton bag"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-handwriting text-center text-sm text-espresso-700 mt-2">
                    {homeContent.storyPolaroids?.[0]?.caption ||
                      "Mindful stitches in studio No. 04"}
                  </p>
                </div>

                {/* Polaroid 2 (Tilted Right behind) */}
                <div className="absolute right-4 sm:right-12 -bottom-4 w-56 sm:w-64 aspect-[3/4] p-3 pb-8 bg-[#FDFBF7] rounded-2xl shadow-studio-float border border-[#E5DAC6] rotate-8 transform hover:rotate-3 transition-transform duration-500 z-20 pearl-pin">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-oat-100">
                    <Image
                      src={
                        homeContent.storyPolaroids?.[1]?.image ||
                        "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop"
                      }
                      alt="Forever tulip flower bouquet handmade"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-handwriting text-center text-sm text-espresso-700 mt-2">
                    {homeContent.storyPolaroids?.[1]?.caption ||
                      "Tulip blossoms that never wilt"}
                  </p>
                </div>
              </div>

              {/* Right Column: Story Text */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-clay-100 text-clay-700 text-xs font-semibold uppercase tracking-widest border border-clay-200">
                  <Heart className="w-3.5 h-3.5 fill-clay-600 text-clay-600" />
                  <span>{homeContent.storyBadge || "The Maker's Heart"}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso-800 font-bold leading-tight">
                  {homeContent.storyHeading || "Woven slowly, with mindful gentleness."}
                </h2>

                <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen space-y-3">
                  <Quote className="w-8 h-8 text-clay-400" />
                  <p className="font-serif italic text-base sm:text-lg text-espresso-800 leading-relaxed">
                    {homeContent.storyQuote ||
                      "“Crochet is my meditation. Every loop is an act of presence, turning a single strand of soft cotton yarn into an heirloom that holds your everyday belongings and heartfelt memories.”"}
                  </p>
                  <p className="text-xs text-espresso-500 font-sans font-semibold">
                    {homeContent.storyQuoteAuthor ||
                      "— Aanya Verma, Founder & Master Hook Artisan"}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-espresso-600 font-sans leading-relaxed">
                  {homeContent.storyParagraph ||
                    "Founded with a vision to preserve traditional yarn crafts and provide dignified work for women artisans across India, Loom & Love rejects mass machine manufacturing. Each piece is hooked entirely by hand using certified milk-cotton yarns."}
                </p>

                <div className="pt-2">
                  <Link
                    href={homeContent.storyBtnLink || "/about"}
                    className="btn-thread-wrap inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
                  >
                    <span>{homeContent.storyBtnText || "Read Our Full Story"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. PROCESS / BEHIND-THE-SCENES STRIP (4-step visual journey)
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#F5ECE1] border-y border-[#E5DAC6] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDFBF7] text-moss-700 text-xs font-bold uppercase tracking-widest border border-moss-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />{" "}
                {homeContent.processBadge || "Handcrafted Journey"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso-800 font-bold">
                {homeContent.processTitle || "From Yarn Spool to Heirloom"}
              </h2>
              <p className="text-xs sm:text-sm text-espresso-600 font-sans">
                {homeContent.processSubtitle ||
                  "Every piece passes through attentive hands, patient hours, and rigorous artisan care."}
              </p>
            </div>

            {/* 4 Steps Journey Board */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {homeContent.processSteps?.map((step: any, idx: number) => (
                <div
                  key={step.id || idx}
                  className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen space-y-3 relative hover:-translate-y-1 transition-transform"
                >
                  <span className="font-serif text-3xl font-bold text-clay-400">
                    {step.stepNumber || `0${idx + 1}`}
                  </span>
                  <h4 className="font-serif text-base font-bold text-espresso-800">
                    {step.title}
                  </h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Launch Custom Order Card CTA */}
            <div className="p-8 sm:p-12 rounded-4xl bg-gradient-to-r from-clay-500 to-clay-600 text-white shadow-studio-float flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {homeContent.processCtaTitle ||
                    "Ready to weave your one-of-a-kind piece?"}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/90 max-w-lg">
                  {homeContent.processCtaDescription ||
                    "Submit your custom crochet request in less than 2 minutes and receive a personalized price quote from our head artisan."}
                </p>
              </div>

              <Link
                href={homeContent.processCtaBtnLink || "/custom-order"}
                className="btn-thread-wrap px-8 py-4 rounded-full bg-[#FDFBF7] text-espresso-800 hover:bg-[#FAF6F0] text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{homeContent.processCtaBtnText || "Start Custom Request"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. BEST SELLERS / PRODUCT CAROUSEL (Warm sand background)
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#FAF6F0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10">
              <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
                {homeContent.bestSellersBadge || "Community Favorites"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold mt-1">
                {homeContent.bestSellersTitle || "Most Cherished Pieces"}
              </h2>
              <p className="text-xs sm:text-sm text-espresso-500 font-sans mt-1">
                {homeContent.bestSellersSubtitle ||
                  "Handcrafted best-sellers that have brought warmth to homes across the country."}
              </p>
            </div>

            {/* Interactive Carousel */}
            <BestSellersCarousel products={bestSellers} />
          </div>
        </section>

        {/* =====================================================================
            8. INTERACTIVE YARN SWATCH STUDIO (Real-time color switcher)
        ====================================================================== */}
        <ColorSwatchPicker />

        {/* =====================================================================
            9. TESTIMONIALS (Pinned gift-note cards, handwritten quotes)
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#FAF6F0] border-y border-[#E5DAC6] relative overflow-hidden">
          {/* Subtle Background Marquee */}
          <div className="absolute top-4 left-0 right-0 overflow-hidden whitespace-nowrap opacity-10 pointer-events-none select-none">
            <div className="inline-block animate-marquee text-4xl font-serif text-clay-600">
              {homeContent.testimonialsMarquee ||
                "“So soft and beautifully made” • “The pearls are exquisite” • “Packaged with so much love” • “My daughter sleeps with the bunny every night” • “Best gift ever” • "}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDFBF7] text-clay-700 text-xs font-bold uppercase tracking-widest border border-[#E5DAC6]">
                <Heart className="w-3.5 h-3.5 fill-clay-600 text-clay-600" />{" "}
                {homeContent.testimonialsBadge || "Words from the Heart"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold">
                {homeContent.testimonialsTitle || "Loved by Crochet Enthusiasts"}
              </h2>
              <p className="text-xs sm:text-sm text-espresso-500">
                {homeContent.testimonialsSubtitle ||
                  "Over 850+ five-star reviews from customers who value slow, artisanal luxury."}
              </p>
            </div>

            {/* 3 Gift Note Styled Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerNotes.map((note: any, idx: number) => (
                <div
                  key={note._id || idx}
                  className="p-8 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float relative flex flex-col justify-between space-y-6 pearl-pin"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(note.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="font-serif italic text-sm text-espresso-800 leading-relaxed">
                      {note.comment}
                    </p>
                  </div>

                  {/* Customer Footer */}
                  <div className="pt-4 border-t border-oat-300 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-clay-200">
                      <Image
                        src={note.avatar}
                        alt={note.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm text-espresso-800">
                        {note.name}
                      </p>
                      <p className="text-[11px] text-espresso-400">
                        {note.city} •{" "}
                        <span className="text-clay-600 font-medium">
                          {note.item}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            10. INSTAGRAM & GALLERY (Studio snapshot grid with warm zoom)
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#FAF6F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-clay-600">
                {homeContent.galleryBadge || "#LoomAndLoveInTheWild"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso-800 font-bold">
                {homeContent.galleryTitle || "Follow the Atelier Journey"}
              </h2>
              <p className="text-xs text-espresso-500">
                {homeContent.gallerySubtitle ||
                  "Behind-the-scenes stitch tutorials, new shade reveals, and real-life styling."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {homeContent.galleryImages?.map((img: string, i: number) => (
                <div
                  key={i}
                  className="group relative aspect-square rounded-3xl overflow-hidden shadow-linen border border-[#E5DAC6] bg-oat-100"
                >
                  <Image
                    src={img}
                    alt={`Atelier creation ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-espresso-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-1">
                      <Instagram className="w-6 h-6 text-clay-200" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">
                        Made with love
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            11. NEWSLETTER INVITATION ("Join our little yarn circle")
        ====================================================================== */}
        <section className="py-20 sm:py-24 bg-[#2B2320] text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 text-amber-300 flex items-center justify-center mx-auto border border-white/20">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                {homeContent.newsletterBadge || "The Cozy Club"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
                {homeContent.newsletterTitle || "Join our little yarn circle."}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/85 max-w-md mx-auto leading-relaxed">
                {homeContent.newsletterSubtitle ||
                  "Receive gentle seasonal drops, custom order openings, and gifting inspiration from our atelier."}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder:text-[#FAF6F0]/60 focus:outline-none focus:border-clay-400 backdrop-blur-md"
              />
              <button
                suppressHydrationWarning
                type="button"
                className="btn-thread-wrap w-full sm:w-auto px-8 py-3.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-lg"
              >
                {homeContent.newsletterBtnText || "Join Circle"}
              </button>
            </div>

            <p className="text-[10px] text-[#FAF6F0]/60">
              {homeContent.newsletterDisclaimer ||
                "Zero spam. Only gentle stitches & warm announcements. Unsubscribe anytime."}
            </p>
          </div>
        </section>
      </main>

      {/* 12. FOOTER */}
      <Footer />
    </div>
  );
}
