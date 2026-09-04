"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Sparkles,
  X,
  Check,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states for new product
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("crochet-bags");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isMadeToOrder, setIsMadeToOrder] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) {
      toast.error("Please fill in required fields.");
      return;
    }

    try {
      const payload = {
        title,
        category,
        categoryName: category.replace("-", " ").toUpperCase(),
        price: parseInt(price),
        compareAtPrice: compareAtPrice ? parseInt(compareAtPrice) : undefined,
        stock: parseInt(stock),
        images: imageUrl
          ? [imageUrl]
          : [
              "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
            ],
        description,
        shortDescription: shortDescription || description.slice(0, 100),
        isFeatured,
        isMadeToOrder,
        variants: [
          { name: "Standard Blush", colorHex: "#EFC8D1", stock: parseInt(stock) },
        ],
        tags: ["New", "Handmade"],
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Created "${title}" successfully! 🌸`);
        setModalOpen(false);
        // Reset form
        setTitle("");
        setPrice("");
        setCompareAtPrice("");
        setDescription("");
        setShortDescription("");
        setImageUrl("");
        fetchProducts();
      }
    } catch {
      toast.error("Failed to create product.");
    }
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from store catalog?`)) {
      setProducts(products.filter((p) => p._id !== id));
      toast.info(`Removed "${name}" from catalog.`);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Inventory & Catalog
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Handcrafted Products ({products.length})
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Creation</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFC8D1]/40 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-cocoa-400" />
        <input
          type="text"
          placeholder="Filter by title, category, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-cocoa-800 bg-transparent focus:outline-none"
        />
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-3xl border border-[#EFC8D1]/40 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-cream-100 text-cocoa-600 uppercase tracking-wider border-b border-cream-200">
                <th className="p-4 font-semibold">Piece</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map((prod) => (
                <tr key={prod._id} className="hover:bg-cream-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-100 border border-cream-200 flex-shrink-0">
                        <Image
                          src={prod.images?.[0] || "https://placehold.co/100x100?text=Product"}
                          alt={prod.title || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold text-cocoa-800 text-sm">
                          {prod.title}
                        </h4>
                        <span className="text-[11px] text-cocoa-400">
                          {prod.variants?.length || 1} variants
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase tracking-wider text-[11px] font-semibold text-dustyrose">
                    {prod.category}
                  </td>
                  <td className="p-4 font-serif font-bold text-cocoa-800">
                    {formatPrice(prod.price)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-semibold ${
                        prod.stock <= 5 ? "text-amber-700" : "text-cocoa-700"
                      }`}
                    >
                      {prod.stock} in batch
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(prod._id, prod.title)}
                      className="p-1.5 rounded-lg text-cocoa-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl bg-[#FFF9F4] rounded-4xl p-6 sm:p-8 shadow-2xl border border-blush-200 z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-xl font-bold text-cocoa-800">
                Add New Handcrafted Creation
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream-200 text-cocoa-400 hover:text-cocoa-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lavender Blossom Shoulder Tote"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  >
                    <option value="crochet-bags">Crochet Bags</option>
                    <option value="flower-bouquets">Flower Bouquets</option>
                    <option value="amigurumi-plushies">Amigurumi & Plushies</option>
                    <option value="keychains-charms">Keychains & Charms</option>
                    <option value="home-living">Home & Living</option>
                    <option value="gifts-under-999">Gifts Under ₹999</option>
                    <option value="custom-creations">Custom Creations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Stock Units Available
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Selling Price in ₹ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1899"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Compare-at Price (MRP)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2299"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Product Image URL (Cloudinary or Unsplash)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Artisan Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the stitches, texture, and inspiration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-cocoa-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-dustyrose accent-dustyrose rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-cocoa-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMadeToOrder}
                    onChange={(e) => setIsMadeToOrder(e.target.checked)}
                    className="w-4 h-4 text-dustyrose accent-dustyrose rounded"
                  />
                  <span>Made to Order (Production ~3 days)</span>
                </label>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-cream-300 text-xs font-semibold text-cocoa-600 hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
