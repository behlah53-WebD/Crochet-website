"use client";

import React, { useEffect, useState } from "react";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import { Star, CheckCircle2, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter((r) => r._id !== id));
        toast.info("Review deleted.");
      }
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  const handleToggleStatus = async (rev: Review) => {
    try {
      const newStatus = rev.status === "APPROVED" ? "PENDING" : "APPROVED";
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: rev._id, status: newStatus }),
      });
      setReviews(
        reviews.map((r) => (r._id === rev._id ? { ...r, status: newStatus } : r))
      );
      toast.success(`Review visibility set to ${newStatus}!`);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
          Customer Adoration
        </span>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
          Reviews Moderation ({reviews.length})
        </h1>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs font-semibold text-cocoa-500">
          Loading customer reviews...
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/40 shadow-card flex flex-col sm:flex-row justify-between gap-4 items-start"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex text-gold-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-serif font-bold text-sm text-cocoa-800">
                    {rev.title}
                  </span>
                </div>

                <p className="text-xs text-cocoa-600 font-sans leading-relaxed">
                  “{rev.comment}”
                </p>

                <div className="flex items-center gap-3 text-[11px] text-cocoa-400">
                  <span>
                    By <strong>{rev.userName}</strong>
                  </span>
                  <span>•</span>
                  <span>{formatDate(rev.createdAt)}</span>
                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(rev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    rev.status === "APPROVED"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  {rev.status}
                </button>
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="p-2 text-cocoa-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
