"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Save,
  Sparkles,
  Heart,
  Layout,
  Layers,
  Feather,
  Gift,
  Palette,
  Image as ImageIcon,
  Mail,
  Check,
  Plus,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminHomepageCMSPage() {
  const [activeTab, setActiveTab] = useState<
    "hero" | "trust" | "story" | "process" | "gallery" | "newsletter"
  >("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [content, setContent] = useState<any>({
    // Hero
    heroBadge: "",
    heroHeadingMain: "",
    heroHeadingHighlight: "",
    heroCursiveQuote: "",
    heroDescription: "",
    heroPrimaryBtnText: "",
    heroPrimaryBtnLink: "",
    heroSecondaryBtnText: "",
    heroSecondaryBtnLink: "",
    heroTrustBadges: ["", "", ""],
    heroSpotlightImage: "",
    heroSpotlightBadge: "",
    heroSpotlightTitle: "",
    heroSpotlightDesc: "",
    heroFloatingBadge1Image: "",
    heroFloatingBadge1Title: "",
    heroFloatingBadge1Subtitle: "",
    heroFloatingBadge2Rating: "",
    heroFloatingBadge2Text: "",

    // Trust strip
    trustStripItems: [],

    // Categories section
    categoryBadge: "",
    categoryTitle: "",
    categorySubtitle: "",
    categoryLinkText: "",

    // Featured section
    featuredBadge: "",
    featuredTitle: "",
    featuredCursiveQuote: "",
    featuredButtonText: "",

    // Story
    storyBadge: "",
    storyHeading: "",
    storyQuote: "",
    storyQuoteAuthor: "",
    storyParagraph: "",
    storyBtnText: "",
    storyBtnLink: "",
    storyPolaroids: [
      { image: "", caption: "" },
      { image: "", caption: "" },
    ],

    // Process
    processBadge: "",
    processTitle: "",
    processSubtitle: "",
    processSteps: [],
    processCtaTitle: "",
    processCtaDescription: "",
    processCtaBtnText: "",
    processCtaBtnLink: "",

    // Best sellers
    bestSellersBadge: "",
    bestSellersTitle: "",
    bestSellersSubtitle: "",

    // Testimonials section
    testimonialsBadge: "",
    testimonialsTitle: "",
    testimonialsSubtitle: "",
    testimonialsMarquee: "",

    // Gallery
    galleryBadge: "",
    galleryTitle: "",
    gallerySubtitle: "",
    galleryImages: ["", "", "", ""],

    // Newsletter
    newsletterBadge: "",
    newsletterTitle: "",
    newsletterSubtitle: "",
    newsletterBtnText: "",
    newsletterDisclaimer: "",
  });

  useEffect(() => {
    fetch("/api/content/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load homepage content.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        toast.success("Homepage content saved and live! 🌸");
      } else {
        toast.error("Failed to save changes.");
      }
    } catch {
      toast.error("Error connecting to server.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-semibold text-cocoa-500">
        Loading Atelier Homepage Content...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Dynamic Storefront CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Homepage Content Editor
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Customize all headlines, polaroids, storytelling, journey steps, and banners.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Publishing..." : "Publish to Storefront"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-cream-300 shadow-2xs">
        {[
          { id: "hero", label: "Hero & Spotlight", icon: Sparkles },
          { id: "trust", label: "Craftsmanship Strip", icon: Heart },
          { id: "story", label: "Maker Story & Polaroids", icon: Layout },
          { id: "process", label: "4-Step Journey & CTA", icon: Layers },
          { id: "gallery", label: "Instagram & Wild", icon: ImageIcon },
          { id: "newsletter", label: "Newsletter Circle", icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-dustyrose text-white shadow-xs"
                  : "text-cocoa-600 hover:bg-cream-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* =========================================================================
            TAB 1: HERO SECTION
        ========================================================================== */}
        {activeTab === "hero" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              Hero Section & Top Spotlight
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Artisan Studio Pill Badge
                </label>
                <input
                  type="text"
                  value={content.heroBadge || ""}
                  onChange={(e) =>
                    setContent({ ...content, heroBadge: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Cursive Handwriting Quote
                </label>
                <input
                  type="text"
                  value={content.heroCursiveQuote || ""}
                  onChange={(e) =>
                    setContent({ ...content, heroCursiveQuote: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Main Headline (Line 1)
                </label>
                <input
                  type="text"
                  value={content.heroHeadingMain || ""}
                  onChange={(e) =>
                    setContent({ ...content, heroHeadingMain: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Highlighted Italic Text (Line 2)
                </label>
                <input
                  type="text"
                  value={content.heroHeadingHighlight || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      heroHeadingHighlight: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Atelier Story Paragraph
              </label>
              <textarea
                rows={3}
                value={content.heroDescription || ""}
                onChange={(e) =>
                  setContent({ ...content, heroDescription: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                <span className="text-[11px] uppercase font-bold text-dustyrose block">
                  Primary Button
                </span>
                <input
                  type="text"
                  placeholder="Button label"
                  value={content.heroPrimaryBtnText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      heroPrimaryBtnText: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
                <input
                  type="text"
                  placeholder="Destination URL (e.g. /shop)"
                  value={content.heroPrimaryBtnLink || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      heroPrimaryBtnLink: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                <span className="text-[11px] uppercase font-bold text-dustyrose block">
                  Secondary Button
                </span>
                <input
                  type="text"
                  placeholder="Button label"
                  value={content.heroSecondaryBtnText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      heroSecondaryBtnText: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
                <input
                  type="text"
                  placeholder="Destination URL (e.g. /custom-order)"
                  value={content.heroSecondaryBtnLink || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      heroSecondaryBtnLink: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            {/* Floating Trust Badges */}
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                3 Floating Trust Badges (Under Buttons)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[0, 1, 2].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Badge ${idx + 1}`}
                    value={content.heroTrustBadges?.[idx] || ""}
                    onChange={(e) => {
                      const updated = [...(content.heroTrustBadges || [])];
                      updated[idx] = e.target.value;
                      setContent({ ...content, heroTrustBadges: updated });
                    }}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                ))}
              </div>
            </div>

            {/* Right Polaroid Spotlight */}
            <div className="pt-4 border-t border-cream-200 space-y-4">
              <h4 className="font-serif text-sm font-bold text-cocoa-800">
                Focal Polaroid Spotlight Card (Right Side)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Spotlight Image URL
                  </label>
                  <input
                    type="text"
                    value={content.heroSpotlightImage || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroSpotlightImage: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Spotlight Small Pill Badge
                  </label>
                  <input
                    type="text"
                    value={content.heroSpotlightBadge || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroSpotlightBadge: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Spotlight Title
                  </label>
                  <input
                    type="text"
                    value={content.heroSpotlightTitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroSpotlightTitle: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Spotlight Description
                  </label>
                  <input
                    type="text"
                    value={content.heroSpotlightDesc || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroSpotlightDesc: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>

              {/* Floating Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
                  <span className="text-[11px] font-bold text-dustyrose block">
                    Floating Badge Top Left (Flowers)
                  </span>
                  <input
                    type="text"
                    placeholder="Title"
                    value={content.heroFloatingBadge1Title || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroFloatingBadge1Title: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle"
                    value={content.heroFloatingBadge1Subtitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroFloatingBadge1Subtitle: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={content.heroFloatingBadge1Image || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroFloatingBadge1Image: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
                  <span className="text-[11px] font-bold text-dustyrose block">
                    Floating Badge Bottom Right (Rating)
                  </span>
                  <input
                    type="text"
                    placeholder="Rating (e.g. 4.9 / 5.0)"
                    value={content.heroFloatingBadge2Rating || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroFloatingBadge2Rating: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <input
                    type="text"
                    placeholder="Review counter (e.g. From 850+ Verified Shoppers)"
                    value={content.heroFloatingBadge2Text || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        heroFloatingBadge2Text: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: TRUST & CRAFTSMANSHIP STRIP
        ========================================================================== */}
        {activeTab === "trust" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              Craftsmanship Strip (4 Tactile Value Props)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.trustStripItems?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-3"
                >
                  <span className="text-xs font-bold text-dustyrose block">
                    Card #{idx + 1}
                  </span>
                  <div>
                    <label className="text-[11px] font-semibold text-cocoa-600 block mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => {
                        const updated = [...content.trustStripItems];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, trustStripItems: updated });
                      }}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-cocoa-600 block mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => {
                        const updated = [...content.trustStripItems];
                        updated[idx].description = e.target.value;
                        setContent({ ...content, trustStripItems: updated });
                      }}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: STORY & MAKER ATELIER
        ========================================================================== */}
        {activeTab === "story" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              Brand Story / Maker Atelier Section
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Section Pill Badge
                </label>
                <input
                  type="text"
                  value={content.storyBadge || ""}
                  onChange={(e) =>
                    setContent({ ...content, storyBadge: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Section Main Headline
                </label>
                <input
                  type="text"
                  value={content.storyHeading || ""}
                  onChange={(e) =>
                    setContent({ ...content, storyHeading: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Founder / Maker Quote
              </label>
              <textarea
                rows={2}
                value={content.storyQuote || ""}
                onChange={(e) =>
                  setContent({ ...content, storyQuote: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Quote Attribution Name & Title
                </label>
                <input
                  type="text"
                  value={content.storyQuoteAuthor || ""}
                  onChange={(e) =>
                    setContent({ ...content, storyQuoteAuthor: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Story Button Label
                </label>
                <input
                  type="text"
                  value={content.storyBtnText || ""}
                  onChange={(e) =>
                    setContent({ ...content, storyBtnText: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Atelier Philosophy Paragraph
              </label>
              <textarea
                rows={3}
                value={content.storyParagraph || ""}
                onChange={(e) =>
                  setContent({ ...content, storyParagraph: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            {/* 2 Overlapping Polaroids */}
            <div className="pt-4 border-t border-cream-200 space-y-4">
              <h4 className="font-serif text-sm font-bold text-cocoa-800">
                2 Tilted Maker Polaroids
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
                  <span className="text-[11px] font-bold text-dustyrose block">
                    Polaroid 1 (Front Left)
                  </span>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={content.storyPolaroids?.[0]?.image || ""}
                    onChange={(e) => {
                      const updated = [...(content.storyPolaroids || [])];
                      if (!updated[0]) updated[0] = { image: "", caption: "" };
                      updated[0].image = e.target.value;
                      setContent({ ...content, storyPolaroids: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <input
                    type="text"
                    placeholder="Handwritten Caption"
                    value={content.storyPolaroids?.[0]?.caption || ""}
                    onChange={(e) => {
                      const updated = [...(content.storyPolaroids || [])];
                      if (!updated[0]) updated[0] = { image: "", caption: "" };
                      updated[0].caption = e.target.value;
                      setContent({ ...content, storyPolaroids: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2">
                  <span className="text-[11px] font-bold text-dustyrose block">
                    Polaroid 2 (Back Right)
                  </span>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={content.storyPolaroids?.[1]?.image || ""}
                    onChange={(e) => {
                      const updated = [...(content.storyPolaroids || [])];
                      if (!updated[1]) updated[1] = { image: "", caption: "" };
                      updated[1].image = e.target.value;
                      setContent({ ...content, storyPolaroids: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <input
                    type="text"
                    placeholder="Handwritten Caption"
                    value={content.storyPolaroids?.[1]?.caption || ""}
                    onChange={(e) => {
                      const updated = [...(content.storyPolaroids || [])];
                      if (!updated[1]) updated[1] = { image: "", caption: "" };
                      updated[1].caption = e.target.value;
                      setContent({ ...content, storyPolaroids: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: 4-STEP JOURNEY & CUSTOM CTA
        ========================================================================== */}
        {activeTab === "process" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              4-Step Handcrafted Journey & Custom Order Card
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Section Pill Badge
                </label>
                <input
                  type="text"
                  value={content.processBadge || ""}
                  onChange={(e) =>
                    setContent({ ...content, processBadge: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={content.processTitle || ""}
                  onChange={(e) =>
                    setContent({ ...content, processTitle: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                value={content.processSubtitle || ""}
                onChange={(e) =>
                  setContent({ ...content, processSubtitle: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.processSteps?.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2"
                >
                  <span className="font-serif text-lg font-bold text-dustyrose block">
                    Step {step.stepNumber || `0${idx + 1}`}
                  </span>
                  <input
                    type="text"
                    placeholder="Step Title"
                    value={step.title || ""}
                    onChange={(e) => {
                      const updated = [...content.processSteps];
                      updated[idx].title = e.target.value;
                      setContent({ ...content, processSteps: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <textarea
                    rows={2}
                    placeholder="Step Description"
                    value={step.description || ""}
                    onChange={(e) => {
                      const updated = [...content.processSteps];
                      updated[idx].description = e.target.value;
                      setContent({ ...content, processSteps: updated });
                    }}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                </div>
              ))}
            </div>

            {/* Custom CTA Card */}
            <div className="pt-4 border-t border-cream-200 space-y-4">
              <h4 className="font-serif text-sm font-bold text-cocoa-800">
                Custom Order Studio Banner Card
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={content.processCtaTitle || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        processCtaTitle: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Banner Button Text
                  </label>
                  <input
                    type="text"
                    value={content.processCtaBtnText || ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        processCtaBtnText: e.target.value,
                      })
                    }
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Banner Description
                </label>
                <input
                  type="text"
                  value={content.processCtaDescription || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      processCtaDescription: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: INSTAGRAM & WILD GALLERY
        ========================================================================== */}
        {activeTab === "gallery" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              Instagram Wild Gallery & Snapshot Grid
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Gallery Pill Badge
                </label>
                <input
                  type="text"
                  value={content.galleryBadge || ""}
                  onChange={(e) =>
                    setContent({ ...content, galleryBadge: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Gallery Section Title
                </label>
                <input
                  type="text"
                  value={content.galleryTitle || ""}
                  onChange={(e) =>
                    setContent({ ...content, galleryTitle: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Gallery Subtitle
              </label>
              <input
                type="text"
                value={content.gallerySubtitle || ""}
                onChange={(e) =>
                  setContent({ ...content, gallerySubtitle: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            {/* 4 Photo URLs */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-cocoa-700 block">
                4 Atelier Photo URLs
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Photo ${idx + 1} Image URL`}
                    value={content.galleryImages?.[idx] || ""}
                    onChange={(e) => {
                      const updated = [...(content.galleryImages || [])];
                      updated[idx] = e.target.value;
                      setContent({ ...content, galleryImages: updated });
                    }}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: NEWSLETTER SECTION
        ========================================================================== */}
        {activeTab === "newsletter" && (
          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa-800 border-b border-cream-200 pb-3">
              Newsletter Circle Invitation Strip
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Pill Badge
                </label>
                <input
                  type="text"
                  value={content.newsletterBadge || ""}
                  onChange={(e) =>
                    setContent({ ...content, newsletterBadge: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={content.newsletterTitle || ""}
                  onChange={(e) =>
                    setContent({ ...content, newsletterTitle: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={content.newsletterSubtitle || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletterSubtitle: e.target.value,
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={content.newsletterBtnText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      newsletterBtnText: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Spam Disclaimer Note
                </label>
                <input
                  type="text"
                  value={content.newsletterDisclaimer || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      newsletterDisclaimer: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Bottom Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Changes..." : "Save All Homepage Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
