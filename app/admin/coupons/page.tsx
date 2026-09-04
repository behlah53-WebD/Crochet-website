"use client";

import React, { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Coupon } from "@/types";
import { Plus, Trash2, Tag, Check, TicketPercent } from "lucide-react";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("999");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      setCoupons(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discountValue) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discountType,
          discountValue: parseInt(discountValue),
          minOrderValue: parseInt(minOrderValue) || 0,
          isActive: true,
        }),
      });

      if (res.ok) {
        toast.success(`Coupon "${code.toUpperCase()}" activated! 🏷️`);
        setCode("");
        setDiscountValue("");
        fetchCoupons();
      } else {
        toast.error("Failed to activate coupon.");
      }
    } catch {
      toast.error("Error creating coupon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (coup: Coupon) => {
    try {
      const updated = !coup.isActive;
      await fetch("/api/coupons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: coup._id, isActive: updated }),
      });
      setCoupons(
        coupons.map((c) => (c._id === coup._id ? { ...c, isActive: updated } : c))
      );
      toast.success(updated ? "Coupon enabled" : "Coupon disabled");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/coupons?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCoupons(coupons.filter((c) => c._id !== id));
        toast.info("Coupon deleted.");
      }
    } catch {
      toast.error("Failed to delete coupon.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
          Promotions & Discounts
        </span>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
          Promotional Coupons ({coupons.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coupons List */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-semibold text-cocoa-500">
              Loading coupons...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coupons.map((coup) => (
                <div
                  key={coup._id}
                  className="p-5 rounded-3xl bg-white border border-[#EFC8D1]/40 shadow-card flex flex-col justify-between space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-base font-bold text-dustyrose tracking-wider">
                        {coup.code}
                      </span>
                      <p className="text-xs font-semibold text-cocoa-800 mt-1">
                        {coup.discountType === "PERCENTAGE"
                          ? `${coup.discountValue}% OFF`
                          : `${formatPrice(coup.discountValue)} Flat Discount`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle(coup)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        coup.isActive
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-cream-200 text-cocoa-500"
                      }`}
                    >
                      {coup.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <p className="text-xs text-cocoa-500">
                    Min order: {formatPrice(coup.minOrderValue)} • Used {coup.usageCount} times
                  </p>

                  <div className="pt-2 border-t border-cream-200 flex justify-end">
                    <button
                      onClick={() => handleDelete(coup._id)}
                      className="text-cocoa-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Coupon Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleCreateCoupon}
            className="p-6 sm:p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4"
          >
            <h3 className="font-serif text-lg font-bold text-cocoa-800 pb-2 border-b border-cream-200">
              Create New Promo Code
            </h3>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Coupon Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SPRINGLOVE"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 uppercase tracking-widest text-cocoa-800 focus:outline-none focus:border-dustyrose font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Type
                </label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Flat (₹)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Discount Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder={discountType === "PERCENTAGE" ? "10" : "150"}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                Minimum Cart Value in ₹
              </label>
              <input
                type="number"
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <TicketPercent className="w-4 h-4" />
              <span>{isSubmitting ? "Activating..." : "Activate Coupon"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
