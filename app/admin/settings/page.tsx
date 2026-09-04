"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Store,
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  Bell,
  Truck,
  Gift,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<any>({
    storeName: "Loom & Love",
    tagline: "Handmade softness, woven with heart.",
    contactEmail: "hello@loomandlove.com",
    phone: "+91 98765 43210",
    studioAddress: "Indiranagar, Bengaluru, Karnataka - 560038",
    workingHours: "Mon–Sat, 10am to 6pm IST",
    appointmentNote:
      "Feel our yarn swatches and witness our weavers in action by booking an artisan appointment.",
    announcements: [
      { id: "1", text: "Handmade with love in small batches 🌸", iconName: "Sparkles" },
      { id: "2", text: "Free express shipping on all orders over ₹999 📦", iconName: "Package" },
      { id: "3", text: "Bespoke made-to-order creations tailored for you ✨", iconName: "Flower2" },
      { id: "4", text: "Complimentary luxury gift wrapping & card notes 🎀", iconName: "Gift" },
    ],
    freeShippingThreshold: 999,
    giftPackagingFee: 99,
    instagramUrl: "https://instagram.com",
    whatsappNumber: "+91 98765 43210",
    pinterestUrl: "https://pinterest.com",
    copyrightText: "Loom & Love Atelier. Hand-hooked with love in small batches.",
  });

  const [newAnnouncementText, setNewAnnouncementText] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load store settings.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Studio settings saved successfully! 🌸");
      } else {
        toast.error("Failed to save settings.");
      }
    } catch {
      toast.error("Error connecting to server.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddAnnouncement = () => {
    if (!newAnnouncementText.trim()) return;
    const updated = [
      ...(settings.announcements || []),
      {
        id: "ann-" + Date.now(),
        text: newAnnouncementText.trim(),
        iconName: "Sparkles",
      },
    ];
    setSettings({ ...settings, announcements: updated });
    setNewAnnouncementText("");
    toast.success("Announcement message added!");
  };

  const handleRemoveAnnouncement = (id: string) => {
    const updated = (settings.announcements || []).filter(
      (a: any) => a.id !== id
    );
    setSettings({ ...settings, announcements: updated });
    toast.info("Announcement message removed.");
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-semibold text-cocoa-500">
        Loading Atelier Store Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Configuration & Policies
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Atelier Store Settings
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Manage global store identity, announcements, and logistics rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. General Identity */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2 flex items-center gap-2">
            <Store className="w-4 h-4 text-dustyrose" /> Store Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                value={settings.storeName || ""}
                onChange={(e) =>
                  setSettings({ ...settings, storeName: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) =>
                  setSettings({ ...settings, tagline: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa-700 block mb-1">
              Footer Copyright Text
            </label>
            <input
              type="text"
              value={settings.copyrightText || ""}
              onChange={(e) =>
                setSettings({ ...settings, copyrightText: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
            />
          </div>
        </div>

        {/* 2. Top Announcement Bar Rotating Ticker */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-dustyrose" /> Top Announcement Bar Ticker
          </h3>
          <p className="text-xs text-cocoa-500 font-sans -mt-2">
            These announcements rotate gently in the top terracotta banner across the entire storefront.
          </p>

          <div className="space-y-3">
            {settings.announcements?.map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-cream-50 border border-cream-200"
              >
                <span className="w-6 h-6 rounded-full bg-blush-200 text-dustyrose text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const updated = [...settings.announcements];
                    updated[idx].text = e.target.value;
                    setSettings({ ...settings, announcements: updated });
                  }}
                  className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAnnouncement(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Add Announcement Row */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Type a new announcement message (e.g. Free shipping on all orders over ₹999 📦)..."
                value={newAnnouncementText}
                onChange={(e) => setNewAnnouncementText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAnnouncement();
                  }
                }}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
              <button
                type="button"
                onClick={handleAddAnnouncement}
                className="px-5 py-2.5 rounded-xl bg-clay-500 hover:bg-clay-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Logistics & Fees */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-dustyrose" /> Shipping & Packaging Pricing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    freeShippingThreshold: Number(e.target.value),
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Signature Gift Packaging Fee (₹)
              </label>
              <input
                type="number"
                value={settings.giftPackagingFee || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    giftPackagingFee: Number(e.target.value),
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>
        </div>

        {/* 4. Studio Contact & Appointment Details */}
        <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-5">
          <h3 className="font-serif text-base font-bold text-cocoa-800 border-b border-cream-200 pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-dustyrose" /> Studio Location & Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) =>
                  setSettings({ ...settings, contactEmail: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Studio Phone / WhatsApp Helpline
              </label>
              <input
                type="tel"
                value={settings.phone || ""}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Studio Address
              </label>
              <input
                type="text"
                value={settings.studioAddress || ""}
                onChange={(e) =>
                  setSettings({ ...settings, studioAddress: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={settings.workingHours || ""}
                onChange={(e) =>
                  setSettings({ ...settings, workingHours: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cocoa-700 block mb-1">
              Studio Visits Appointment Notice
            </label>
            <input
              type="text"
              value={settings.appointmentNote || ""}
              onChange={(e) =>
                setSettings({ ...settings, appointmentNote: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
