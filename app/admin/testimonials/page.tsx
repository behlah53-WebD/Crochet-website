"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  MessageSquareHeart,
  Save,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface TestimonialItem {
  _id?: string;
  name: string;
  city: string;
  avatar: string;
  item: string;
  rating: number;
  date: string;
  comment: string;
  isFeatured: boolean;
  displayOrder: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [item, setItem] = useState("");
  const [rating, setRating] = useState("5");
  const [date, setDate] = useState("Verified Buyer");
  const [comment, setComment] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);
  const [displayOrder, setDisplayOrder] = useState("1");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setName("");
    setCity("Mumbai");
    setAvatar(
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
    );
    setItem("Blush Bloom Pearl Handbag");
    setRating("5");
    setDate("Verified Buyer");
    setComment("");
    setIsFeatured(true);
    setDisplayOrder(String(testimonials.length + 1));
    setModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingItem(t);
    setName(t.name);
    setCity(t.city);
    setAvatar(t.avatar);
    setItem(t.item);
    setRating(String(t.rating || 5));
    setDate(t.date || "Verified Buyer");
    setComment(t.comment);
    setIsFeatured(t.isFeatured !== false);
    setDisplayOrder(String(t.displayOrder || 1));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please fill in customer name and comment.");
      return;
    }

    setSaving(true);
    try {
      if (editingItem && editingItem._id) {
        const res = await fetch("/api/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: editingItem._id,
            name,
            city,
            avatar,
            item,
            rating: Number(rating),
            date,
            comment,
            isFeatured,
            displayOrder: Number(displayOrder),
          }),
        });
        if (res.ok) {
          toast.success("Testimonial updated! 🌸");
          setModalOpen(false);
          fetchTestimonials();
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            city,
            avatar,
            item,
            rating: Number(rating),
            date,
            comment,
            isFeatured,
            displayOrder: Number(displayOrder),
          }),
        });
        if (res.ok) {
          toast.success("Customer testimonial added! 🌸");
          setModalOpen(false);
          fetchTestimonials();
        }
      }
    } catch {
      toast.error("Error saving testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.info("Testimonial removed.");
        setTestimonials(testimonials.filter((t) => t._id !== id));
      }
    } catch {
      toast.error("Failed to delete testimonial.");
    }
  };

  const handleToggleFeatured = async (t: TestimonialItem) => {
    if (!t._id) return;
    try {
      const updated = !t.isFeatured;
      await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: t._id, isFeatured: updated }),
      });
      setTestimonials(
        testimonials.map((item) =>
          item._id === t._id ? { ...item, isFeatured: updated } : item
        )
      );
      toast.success(
        updated
          ? "Featured on storefront homepage!"
          : "Removed from homepage spotlight."
      );
    } catch {
      toast.error("Could not update featured status.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Customer Love & Social Proof
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Customer Testimonials ({testimonials.length})
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Manage reviews and gift-note testimonials featured on your homepage.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs font-semibold text-cocoa-500">
          Loading Testimonials...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center rounded-4xl bg-white border border-[#EFC8D1] shadow-card">
          <MessageSquareHeart className="w-8 h-8 text-dustyrose mx-auto mb-2 opacity-50" />
          <p className="text-sm font-serif font-bold text-cocoa-800">
            No testimonials added yet
          </p>
          <p className="text-xs text-cocoa-500 mt-1">
            Click &quot;Add Testimonial&quot; to highlight customer reviews.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/60 shadow-card flex flex-col justify-between space-y-4 hover:border-[#EFC8D1] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleToggleFeatured(t)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      t.isFeatured
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-cream-100 text-cocoa-500"
                    }`}
                  >
                    {t.isFeatured ? "★ Featured on Home" : "Hidden from Home"}
                  </button>
                </div>
                <p className="font-serif italic text-sm text-cocoa-800 leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-cream-300">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-xs text-cocoa-800">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-cocoa-500">
                      {t.city} • <span className="text-dustyrose font-medium">{t.item}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-xl bg-cream-50 hover:bg-blush-100 text-dustyrose transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-4xl border border-[#EFC8D1] shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-lg font-bold text-cocoa-800">
                {editingItem ? "Edit Testimonial" : "Add Customer Testimonial"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream-100 text-cocoa-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sneha Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Purchased Item
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pastel Tulip Everlasting Bouquet"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Rating (1 to 5)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  >
                    <option value="5">5 Stars ★★★★★</option>
                    <option value="4">4 Stars ★★★★</option>
                    <option value="3">3 Stars ★★★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Customer Avatar URL
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Customer Review Comment
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="“Opening the gift box felt like receiving a hug from an old friend...”"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-dustyrose focus:ring-dustyrose"
                />
                <label
                  htmlFor="featuredCheck"
                  className="text-xs font-semibold text-cocoa-700 cursor-pointer"
                >
                  Feature this review in the 3 cards on the homepage
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-cream-300 text-xs font-semibold text-cocoa-600 hover:bg-cream-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Testimonial"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
