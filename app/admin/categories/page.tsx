"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/types";
import { Plus, Trash2, FolderTree, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim() || undefined,
          description: description.trim(),
          image: imageUrl.trim() || undefined,
          displayOrder: categories.length + 1,
        }),
      });

      if (res.ok) {
        toast.success(`Category "${name}" created! 🌸`);
        setName("");
        setSlug("");
        setDescription("");
        setImageUrl("");
        fetchCategories();
      } else {
        toast.error("Could not save category.");
      }
    } catch {
      toast.error("Error creating category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c._id !== id));
        toast.info("Category removed.");
      }
    } catch {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
          Taxonomy & Organization
        </span>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
          Store Categories ({categories.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories List */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-semibold text-cocoa-500">
              Loading categories...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="p-5 rounded-3xl bg-white border border-[#EFC8D1]/40 shadow-card flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 flex-shrink-0">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-cocoa-800">{cat.name}</h3>
                      <span className="text-[11px] text-dustyrose font-mono">/{cat.slug}</span>
                    </div>
                  </div>

                  <p className="text-xs text-cocoa-600 line-clamp-2">{cat.description}</p>

                  <div className="pt-2 border-t border-cream-200 flex justify-between items-center">
                    <span className="text-[11px] text-cocoa-400">Order #{cat.displayOrder}</span>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-1.5 text-cocoa-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Category Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleAddCategory}
            className="p-6 sm:p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4"
          >
            <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-2 border-b border-cream-200">
              Create New Category
            </h3>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Baby Heirloom Rattles"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Slug (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. baby-heirloom-rattles"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Editorial summary of this category..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? "Adding..." : "Add Category"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
