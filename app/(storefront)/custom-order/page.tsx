"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import {
  Sparkles,
  Check,
  Calendar,
  Send,
  Heart,
  Palette,
  ArrowRight,
  ArrowLeft,
  FileText,
  Gift,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const CUSTOM_CATEGORIES = [
  { name: "Crochet Handbag / Tote", icon: "👜", desc: "Shoulder bags, clutches, pearl totes" },
  { name: "Forever Flower Bouquet", icon: "💐", desc: "Tulips, daisies, lavender & roses" },
  { name: "Custom Amigurumi Plushie", icon: "🧸", desc: "Bunnies, bears, cats, nursery friends" },
  { name: "Baby Keepsake / Blanket", icon: "👶", desc: "Booties, bonnets, heirloom throws" },
  { name: "Wedding & Bridal Favors", icon: "💍", desc: "Customized gift sets with ribbon" },
  { name: "Home Living & Coasters", icon: "🏡", desc: "Mug cosies, placemats, table lace" },
];

const YARN_COLORS = [
  { name: "Terracotta Clay", hex: "#C77B58" },
  { name: "Warm Ivory Cream", hex: "#FAF6F0" },
  { name: "Deep Rust", hex: "#B85C38" },
  { name: "Sage Meadow", hex: "#8A9A5B" },
  { name: "Golden Honey", hex: "#D49B4B" },
  { name: "Forest Moss", hex: "#5F6F52" },
  { name: "Dusty Rosewood", hex: "#DEB49F" },
  { name: "Espresso Umber", hex: "#3A2E2A" },
  { name: "Sand Biscuit", hex: "#E5DAC6" },
];

export default function CustomOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(CUSTOM_CATEGORIES[0].name);
  const [selectedColors, setSelectedColors] = useState<string[]>(["#C77B58"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sizePreference, setSizePreference] = useState("");
  const [personalization, setPersonalization] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [budget, setBudget] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  // Customer contact info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);

  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c !== hex));
      }
    } else {
      if (selectedColors.length < 4) {
        setSelectedColors([...selectedColors, hex]);
      } else {
        toast.info("You can pick up to 4 yarn shades for your bespoke palette.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !title || !description) {
      toast.error("Please fill in the required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        category: selectedCategory,
        title,
        description,
        yarnColors: selectedColors,
        sizePreference,
        personalizationText: personalization,
        targetDate,
        budgetEstimated: budget ? parseInt(budget) : undefined,
        referenceImageUrl: referenceUrl,
      };

      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedOrder(data);
        setCurrentStep(4);
        toast.success("Bespoke inquiry received! 🧶", {
          description: "Our artisans will review your dream design and email a quote within 24 hours.",
        });
      }
    } catch {
      toast.error("Failed to submit custom request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] relative">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Atelier Studio Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-clay-100 text-clay-700 text-xs font-bold uppercase tracking-widest border border-clay-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Bespoke Craft Studio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso-800 font-bold">
              Design Your Handcrafted Dream
            </h1>
            <p className="text-xs sm:text-sm text-espresso-600 max-w-xl mx-auto font-sans leading-relaxed">
              Step into our creative workshop. Pick your category, choose your yarn shades from our cotton swatch studio, and tell us how you want your bespoke creation to look.
            </p>
          </div>

          {/* Multi-Step Wizard Header */}
          <div className="p-3 sm:p-4 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-between max-w-2xl mx-auto">
            {[
              { num: 1, shortLabel: "Category", label: "1. Category" },
              { num: 2, shortLabel: "Palette & Style", label: "2. Palette & Style" },
              { num: 3, shortLabel: "Review", label: "3. Contact & Review" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-center sm:text-left transition-all ${
                  currentStep === s.num
                    ? "text-clay-600 font-bold"
                    : currentStep > s.num
                    ? "text-moss-700 font-semibold"
                    : "text-espresso-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-transform ${
                    currentStep === s.num
                      ? "bg-clay-500 text-white shadow-xs scale-105"
                      : currentStep > s.num
                      ? "bg-moss-100 text-moss-800"
                      : "bg-oat-200 text-espresso-600"
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] sm:text-xs font-semibold leading-tight sm:hidden">
                    {s.shortLabel}
                  </span>
                  <span className="hidden sm:inline text-xs font-semibold">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Success Screen */}
          {submittedOrder ? (
            <div className="p-5 sm:p-14 rounded-3xl sm:rounded-5xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float text-center space-y-6 max-w-2xl mx-auto relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-clay-100 text-clay-600 flex items-center justify-center mx-auto shadow-sm">
                <Heart className="w-10 h-10 fill-clay-600 animate-pulse-subtle" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-clay-700 uppercase tracking-widest">
                  Commission Reference: #{submittedOrder.requestNumber}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-800">
                  Your Bespoke Request Is Woven into Our Schedule!
                </h2>
                <p className="text-xs sm:text-sm text-espresso-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{submittedOrder.customerName}</strong>! Our master artisans are reviewing your color palette and specifications. We will send a formal quote and production calendar to <strong>{submittedOrder.customerEmail}</strong> within 24 hours.
                </p>
              </div>

              {/* Order Journey Timeline */}
              <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FAF6F0] border border-[#E5DAC6] space-y-3 text-left">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-espresso-800">
                  Atelier Journey Timeline
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-xl bg-clay-200 text-clay-800 font-bold">1. In Review</div>
                  <div className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] text-espresso-500">2. Quote Sent</div>
                  <div className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] text-espresso-500">3. Hand-hooking</div>
                  <div className="p-2 rounded-xl bg-[#FDFBF7] border border-[#E5DAC6] text-espresso-500">4. Dispatched 🧶</div>
                </div>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => {
                  setSubmittedOrder(null);
                  setCurrentStep(1);
                  setTitle("");
                  setDescription("");
                }}
                className="w-full sm:w-auto btn-thread-wrap px-8 py-3 rounded-full bg-clay-500 text-white text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                Submit Another Bespoke Design
              </button>
            </div>
          ) : (
            /* Studio Form & Live Preview Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-Step Wizard (8 cols) */}
              <div className="lg:col-span-8 p-5 sm:p-10 rounded-3xl sm:rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float space-y-6 sm:space-y-8">
                {/* Step 1: Category Selection */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-espresso-800">
                        Step 1: Choose Your Creation Type
                      </h3>
                      <p className="text-xs text-espresso-500 mt-0.5">
                        Select the type of handmade item you would like us to hook for you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {CUSTOM_CATEGORIES.map((cat) => (
                        <button
                          suppressHydrationWarning
                          type="button"
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`p-4 rounded-3xl text-left border transition-all flex items-start gap-3.5 ${
                            selectedCategory === cat.name
                              ? "bg-clay-50 border-clay-500 text-espresso-800 ring-2 ring-clay-500/20 shadow-xs"
                              : "bg-[#FAF6F0] border-[#E5DAC6] text-espresso-700 hover:bg-[#FDFBF7]"
                          }`}
                        >
                          <span className="text-2xl">{cat.icon}</span>
                          <div>
                            <p className="font-serif font-bold text-sm text-espresso-800">{cat.name}</p>
                            <p className="text-[11px] text-espresso-500 mt-0.5">{cat.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-full sm:w-auto justify-center btn-thread-wrap px-7 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2"
                      >
                        <span>Next: Palette & Style</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Yarn Palette & Style Specifications */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-espresso-800">
                        Step 2: Yarn Palette & Styling
                      </h3>
                      <p className="text-xs text-espresso-500 mt-0.5">
                        Select up to 4 milk-cotton shades and provide your size or monogram requirements.
                      </p>
                    </div>

                    {/* Yarn Swatches */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-espresso-800 block">
                        Select Yarn Shades ({selectedColors.length}/4 chosen):
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                        {YARN_COLORS.map((c) => {
                          const isSelected = selectedColors.includes(c.hex);
                          return (
                            <button
                              suppressHydrationWarning
                              type="button"
                              key={c.name}
                              onClick={() => toggleColor(c.hex)}
                              className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                                isSelected
                                  ? "bg-[#FAF6F0] border-clay-500 ring-2 ring-clay-500/30 shadow-xs"
                                  : "bg-[#FDFBF7] border-oat-300 hover:bg-[#FAF6F0]"
                              }`}
                            >
                              <div
                                className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center shadow-2xs"
                                style={{ backgroundColor: c.hex }}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 text-espresso-900 stroke-[3]" />}
                              </div>
                              <span className="text-[10px] text-espresso-700 text-center font-medium leading-tight">
                                {c.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Creation Title / Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Terracotta Daisy Pearl Tote, Lavender Bunny Blanket..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Design Description & Special Requests <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Describe the shape, strap length, flower types, or special motif you want..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full text-xs p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-espresso-800 block mb-1">
                            Dimensions / Size Preference
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Medium 25x20cm, 30cm strap"
                            value={sizePreference}
                            onChange={(e) => setSizePreference(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-espresso-800 block mb-1">
                            Monogram / Embroidery (Optional)
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="e.g. SK, Aanya"
                            value={personalization}
                            onChange={(e) => setPersonalization(e.target.value.toUpperCase())}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500 uppercase tracking-wider"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Reference Photo Link (Optional Pinterest / Drive URL)
                        </label>
                        <input
                          type="url"
                          placeholder="https://pinterest.com/pin/..."
                          value={referenceUrl}
                          onChange={(e) => setReferenceUrl(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-0 justify-between items-stretch sm:items-center">
                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-full border border-[#E5DAC6] text-espresso-600 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF6F0] flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() => {
                          if (!title.trim() || !description.trim()) {
                            toast.error("Please provide a title and short description.");
                            return;
                          }
                          setCurrentStep(3);
                        }}
                        className="w-full sm:w-auto justify-center btn-thread-wrap px-7 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2"
                      >
                        <span>Next: Contact & Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info & Review */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-espresso-800">
                        Step 3: Your Contact & Timeline
                      </h3>
                      <p className="text-xs text-espresso-500 mt-0.5">
                        Where should we email your personalized quote and production timeline?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Diya Sen"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="diya@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          WhatsApp / Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-espresso-800 block mb-1">
                          Needed By Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={targetDate}
                          onChange={(e) => setTargetDate(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-espresso-800 block mb-1">
                        Estimated Budget Preference (INR)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 2500"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                      />
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-0 justify-between items-stretch sm:items-center">
                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-full border border-[#E5DAC6] text-espresso-600 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF6F0] flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        suppressHydrationWarning
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto justify-center btn-thread-wrap px-8 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-md flex items-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Bespoke Request"}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Live Artisan Docket Preview (4 cols) */}
              <div className="lg:col-span-4 p-5 sm:p-7 rounded-3xl sm:rounded-4xl bg-[#FAF6F0] border border-[#E5DAC6] shadow-studio-float space-y-5 static lg:sticky lg:top-24 pearl-pin">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-clay-600">
                    Live Atelier Docket
                  </span>
                  <h4 className="font-serif text-lg font-bold text-espresso-800">
                    Bespoke Summary
                  </h4>
                </div>

                <div className="space-y-3 text-xs divide-y divide-oat-200">
                  <div className="pt-2 flex justify-between">
                    <span className="text-espresso-500">Creation Type:</span>
                    <span className="font-serif font-bold text-espresso-800 text-right">
                      {selectedCategory}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className="text-espresso-500">Selected Palette:</span>
                    <div className="flex gap-1.5">
                      {selectedColors.map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  {title && (
                    <div className="pt-2 flex justify-between">
                      <span className="text-espresso-500">Title:</span>
                      <span className="font-semibold text-espresso-800 text-right truncate max-w-[150px]">
                        {title}
                      </span>
                    </div>
                  )}

                  {personalization && (
                    <div className="pt-2 flex justify-between">
                      <span className="text-espresso-500">Monogram:</span>
                      <span className="font-bold text-clay-600 uppercase tracking-wider">
                        {personalization}
                      </span>
                    </div>
                  )}

                  {targetDate && (
                    <div className="pt-2 flex justify-between">
                      <span className="text-espresso-500">Target Date:</span>
                      <span className="text-espresso-800 font-medium">{targetDate}</span>
                    </div>
                  )}
                </div>

                {/* Studio Guarantee Tag */}
                <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E5DAC6] space-y-1 text-[11px] text-espresso-600">
                  <div className="flex items-center gap-1.5 font-bold text-clay-700">
                    <Heart className="w-3.5 h-3.5 fill-clay-600" />
                    <span>Slow Craft Guarantee</span>
                  </div>
                  <p className="leading-relaxed">
                    Zero obligation inquiry. We send exact yarn samples, photos, and a custom quote before you commit.
                  </p>
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
