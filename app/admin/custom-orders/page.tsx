"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice, formatDate } from "@/lib/utils";
import { CustomOrderRequest } from "@/types";
import { Sparkles, Check, Clock, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminCustomOrdersPage() {
  const [requests, setRequests] = useState<CustomOrderRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<CustomOrderRequest | null>(null);
  const [quotePrice, setQuotePrice] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/custom-orders");
      const data = await res.json();
      setRequests(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendQuote = () => {
    if (!selectedReq || !quotePrice) return;
    const priceNum = parseInt(quotePrice);
    setRequests(
      requests.map((r) =>
        r._id === selectedReq._id
          ? {
              ...r,
              quotedPrice: priceNum,
              status: "QUOTE_SENT",
              adminNotes,
            }
          : r
      )
    );
    setSelectedReq({
      ...selectedReq,
      quotedPrice: priceNum,
      status: "QUOTE_SENT",
      adminNotes,
    });
    setQuotePrice("");
    toast.success(`Quote of ${formatPrice(priceNum)} sent to customer ${selectedReq.customerEmail}! 🌸`);
  };

  const handleStatusChange = (status: any) => {
    if (!selectedReq) return;
    setRequests(
      requests.map((r) =>
        r._id === selectedReq._id ? { ...r, status } : r
      )
    );
    setSelectedReq({ ...selectedReq, status });
    toast.success(`Status updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
          Bespoke Commissions
        </span>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
          Custom Order Requests ({requests.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Requests List */}
        <div className="lg:col-span-6 space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              onClick={() => {
                setSelectedReq(req);
                setAdminNotes(req.adminNotes || "");
              }}
              className={`p-6 rounded-3xl bg-white border cursor-pointer transition-all shadow-card ${
                selectedReq?._id === req._id
                  ? "border-dustyrose ring-2 ring-dustyrose/20"
                  : "border-[#EFC8D1]/40 hover:border-[#EFC8D1]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-dustyrose font-mono">
                    {req.requestNumber}
                  </span>
                  <h3 className="font-serif text-base font-bold text-cocoa-800 mt-0.5">
                    {req.title}
                  </h3>
                  <p className="text-xs text-cocoa-500">
                    By {req.customerName} ({req.customerPhone})
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blush-100 text-dustyrose">
                  {req.status}
                </span>
              </div>

              <p className="text-xs text-cocoa-600 line-clamp-2 mt-2 font-sans">
                {req.description}
              </p>

              <div className="pt-3 mt-3 border-t border-cream-200 flex justify-between items-center text-xs">
                <span className="text-cocoa-400">Received {formatDate(req.createdAt)}</span>
                {req.quotedPrice && (
                  <span className="font-serif font-bold text-dustyrose">
                    Quoted: {formatPrice(req.quotedPrice)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Request Inspection & Quote Tool */}
        <div className="lg:col-span-6">
          {selectedReq ? (
            <div className="p-6 sm:p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-6">
              <div className="pb-3 border-b border-cream-200 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-dustyrose">
                    Manage Request
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cocoa-800">
                    {selectedReq.title}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-cocoa-500">
                  {selectedReq.requestNumber}
                </span>
              </div>

              {/* Customer details */}
              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs space-y-1">
                <p><strong>Customer:</strong> {selectedReq.customerName}</p>
                <p><strong>Email:</strong> {selectedReq.customerEmail}</p>
                <p><strong>WhatsApp / Phone:</strong> {selectedReq.customerPhone}</p>
                {selectedReq.targetDate && <p><strong>Target Date:</strong> {selectedReq.targetDate}</p>}
                {selectedReq.budgetEstimated && (
                  <p><strong>Estimated Budget:</strong> {formatPrice(selectedReq.budgetEstimated)}</p>
                )}
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs">
                <h4 className="font-serif font-bold text-cocoa-800">Specifications & Vision:</h4>
                <p className="text-cocoa-700 bg-cream-50 p-3 rounded-2xl border border-cream-200 leading-relaxed">
                  {selectedReq.description}
                </p>
                {selectedReq.sizePreference && (
                  <p className="text-cocoa-600">Size: <strong>{selectedReq.sizePreference}</strong></p>
                )}
                {selectedReq.personalizationText && (
                  <p className="text-dustyrose font-bold font-mono">
                    Monogram Embroidery: {selectedReq.personalizationText}
                  </p>
                )}
              </div>

              {/* Yarn swatches */}
              {selectedReq.yarnColors && selectedReq.yarnColors.length > 0 && (
                <div>
                  <h4 className="text-xs font-serif font-bold text-cocoa-800 mb-1.5">
                    Selected Yarn Swatches:
                  </h4>
                  <div className="flex gap-2">
                    {selectedReq.yarnColors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quoting Section */}
              <div className="p-4 rounded-2xl bg-blush-50 border border-blush-200 space-y-3">
                <h4 className="font-serif text-sm font-bold text-cocoa-800">
                  Send Price Quotation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Enter Quoted Price in ₹"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl bg-white border border-cream-300 text-cocoa-800"
                  />
                  <button
                    onClick={handleSendQuote}
                    className="px-4 py-2 bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    Send Quote to Customer
                  </button>
                </div>
              </div>

              {/* Status updater */}
              <div className="space-y-2">
                <h4 className="text-xs font-serif font-bold text-cocoa-800">Update Phase:</h4>
                <div className="flex flex-wrap gap-2">
                  {["REVIEWING", "QUOTE_SENT", "APPROVED", "IN_PRODUCTION", "SHIPPED", "COMPLETED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selectedReq.status === st
                          ? "bg-dustyrose text-white shadow-sm"
                          : "bg-cream-100 text-cocoa-700 hover:bg-cream-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-4xl bg-white border border-cream-200 text-center space-y-3 text-cocoa-500 text-xs">
              <Sparkles className="w-8 h-8 mx-auto text-dustyrose" />
              <p>Select a custom request to review specifications and send an artisan price quote.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
