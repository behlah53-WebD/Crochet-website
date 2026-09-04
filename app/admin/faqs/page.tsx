"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, HelpCircle, Save, X, Check } from "lucide-react";
import { toast } from "sonner";

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  // Form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [displayOrder, setDisplayOrder] = useState("1");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      setFaqs(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setCategory("General");
    setDisplayOrder(String(faqs.length + 1));
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category || "General");
    setDisplayOrder(String(faq.displayOrder || 1));
    setIsActive(faq.isActive !== false);
    setModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast.error("Please fill in question and answer.");
      return;
    }

    setSaving(true);
    try {
      if (editingFaq && editingFaq._id) {
        // Edit existing
        const res = await fetch("/api/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: editingFaq._id,
            question,
            answer,
            category,
            displayOrder: Number(displayOrder),
            isActive,
          }),
        });
        if (res.ok) {
          toast.success("FAQ updated successfully! 🌸");
          setModalOpen(false);
          fetchFaqs();
        }
      } else {
        // Create new
        const res = await fetch("/api/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            answer,
            category,
            displayOrder: Number(displayOrder),
            isActive,
          }),
        });
        if (res.ok) {
          toast.success("New FAQ created! 🌸");
          setModalOpen(false);
          fetchFaqs();
        }
      }
    } catch {
      toast.error("Error saving FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.info("FAQ deleted.");
        setFaqs(faqs.filter((f) => f._id !== id));
      }
    } catch {
      toast.error("Failed to delete FAQ.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Customer Help & Guidance
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Store FAQs Manager ({faqs.length})
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Add, update, or remove questions displayed on the storefront FAQ page.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-5 py-3 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-semibold text-cocoa-500">
          Loading FAQs...
        </div>
      ) : faqs.length === 0 ? (
        <div className="p-12 text-center rounded-4xl bg-white border border-[#EFC8D1] shadow-card">
          <HelpCircle className="w-8 h-8 text-dustyrose mx-auto mb-2 opacity-50" />
          <p className="text-sm font-serif font-bold text-cocoa-800">
            No FAQs added yet
          </p>
          <p className="text-xs text-cocoa-500 mt-1">
            Click &quot;Add New FAQ&quot; above to create your first question.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/60 shadow-card flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-[#EFC8D1] transition-all"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blush-100 text-dustyrose text-[10px] font-bold uppercase tracking-wider">
                    {faq.category || "General"}
                  </span>
                  <span className="text-[10px] text-cocoa-400">
                    Order #{faq.displayOrder}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-cocoa-800">
                  {faq.question}
                </h3>
                <p className="text-xs text-cocoa-600 font-sans leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-2 rounded-xl bg-cream-50 hover:bg-blush-100 text-dustyrose transition-colors"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                {editingFaq ? "Edit FAQ Question" : "Create New FAQ Question"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-cream-100 text-cocoa-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Do the crochet flowers really last forever?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Answer
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="e.g. Yes! Unlike real flowers that wilt within a week..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="General / Care Guide / Materials"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                </div>
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
                  <span>{saving ? "Saving..." : "Save Question"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
