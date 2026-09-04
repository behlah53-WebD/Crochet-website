"use client";

import React, { useEffect, useState } from "react";
import { Save, BookOpen, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_ABOUT_PAGE } from "@/lib/content";

export default function AdminPagesCMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutData, setAboutData] = useState<any>(DEFAULT_ABOUT_PAGE);

  useEffect(() => {
    fetch("/api/content/pages?slug=about")
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setAboutData({ ...DEFAULT_ABOUT_PAGE, ...data });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load about page content.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/content/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "about",
          title: "About Our Artisan Atelier",
          data: aboutData,
        }),
      });
      if (res.ok) {
        toast.success("About Us page content saved and live! 🌸");
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
        Loading Pages Content...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Informational Pages CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            About Us & Studio Story Editor
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Manage the artisan narrative, founder statement, and three slow-craft promise values.
          </p>
        </div>

        <button
          onClick={handleSaveAbout}
          disabled={saving}
          className="px-6 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Publishing..." : "Publish to Storefront"}</span>
        </button>
      </div>

      <form onSubmit={handleSaveAbout} className="space-y-6">
        {/* Hero Banner */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2">
            Top Header & Story Intro
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Pill Badge
              </label>
              <input
                type="text"
                value={aboutData.badge || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, badge: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Heading Main
              </label>
              <input
                type="text"
                value={aboutData.heroTitle || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, heroTitle: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Heading Highlight
              </label>
              <input
                type="text"
                value={aboutData.heroHighlight || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, heroHighlight: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa-700 block mb-1">
              Introductory Subtitle
            </label>
            <textarea
              rows={2}
              value={aboutData.heroSubtitle || ""}
              onChange={(e) =>
                setAboutData({ ...aboutData, heroSubtitle: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
            />
          </div>
        </div>

        {/* Meet the Maker */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2">
            Meet the Maker Column
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Founder Portrait Photo URL
              </label>
              <input
                type="text"
                value={aboutData.founderImage || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, founderImage: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Founder Quote
              </label>
              <input
                type="text"
                value={aboutData.founderQuote || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, founderQuote: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa-700 block mb-1">
              Story Paragraph 1 (Balcony origin)
            </label>
            <textarea
              rows={3}
              value={aboutData.storyParagraph1 || ""}
              onChange={(e) =>
                setAboutData({ ...aboutData, storyParagraph1: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa-700 block mb-1">
              Story Paragraph 2 (Artisan craft vs machine)
            </label>
            <textarea
              rows={3}
              value={aboutData.storyParagraph2 || ""}
              onChange={(e) =>
                setAboutData({ ...aboutData, storyParagraph2: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
            />
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2">
            The 3 Slow Craft Promise Values
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aboutData.values?.map((val: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-2"
              >
                <span className="text-[11px] font-bold text-dustyrose block">
                  Value #{idx + 1}
                </span>
                <input
                  type="text"
                  placeholder="Title"
                  value={val.title || ""}
                  onChange={(e) => {
                    const updated = [...aboutData.values];
                    updated[idx].title = e.target.value;
                    setAboutData({ ...aboutData, values: updated });
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
                <textarea
                  rows={3}
                  placeholder="Description"
                  value={val.description || ""}
                  onChange={(e) => {
                    const updated = [...aboutData.values];
                    updated[idx].description = e.target.value;
                    setAboutData({ ...aboutData, values: updated });
                  }}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Changes..." : "Save About Page"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
