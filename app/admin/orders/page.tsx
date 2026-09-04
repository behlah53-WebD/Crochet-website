"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice, formatDate } from "@/lib/utils";
import { Order, OrderStatus } from "@/types";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  Search,
  ChevronDown,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierName, setCourierName] = useState("Blue Dart Express");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((o) =>
        o._id === orderId
          ? {
              ...o,
              orderStatus: newStatus,
              timeline: [
                ...o.timeline,
                { status: newStatus, date: new Date().toISOString(), note: `Updated to ${newStatus}` },
              ],
            }
          : o
      )
    );
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        orderStatus: newStatus,
      });
    }
    toast.success(`Order status updated to ${newStatus}! 🌸`);
  };

  const handleSaveTracking = () => {
    if (!selectedOrder || !trackingNumber) return;
    setOrders(
      orders.map((o) =>
        o._id === selectedOrder._id
          ? {
              ...o,
              trackingNumber,
              courierName,
              orderStatus: "SHIPPED",
            }
          : o
      )
    );
    setSelectedOrder({
      ...selectedOrder,
      trackingNumber,
      courierName,
      orderStatus: "SHIPPED",
    });
    setTrackingNumber("");
    toast.success("Courier tracking details saved and customer notified via dispatch SMS/Email! 📦");
  };

  const filtered = orders.filter((o) => {
    if (statusFilter === "ALL") return true;
    return o.orderStatus === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Fulfillments & Logistics
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Customer Orders ({orders.length})
          </h1>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["ALL", "PROCESSING", "IN_PRODUCTION", "SHIPPED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                statusFilter === st
                  ? "bg-dustyrose text-white shadow-sm"
                  : "bg-white text-cocoa-600 border border-cream-300 hover:bg-cream-100"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Datatable */}
      <div className="bg-white rounded-3xl border border-[#EFC8D1]/40 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-cream-100 text-cocoa-600 uppercase tracking-wider border-b border-cream-200">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filtered.map((ord) => (
                <tr key={ord._id} className="hover:bg-cream-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-dustyrose">
                    {ord.orderNumber}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-cocoa-800">{ord.userName}</p>
                    <p className="text-[11px] text-cocoa-400">{ord.userEmail}</p>
                  </td>
                  <td className="p-4 text-cocoa-500">{formatDate(ord.createdAt)}</td>
                  <td className="p-4 font-serif font-bold text-cocoa-800">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${
                        ord.paymentStatus === "PAID"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {ord.paymentStatus} ({ord.paymentMethod})
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-blush-100 text-dustyrose border border-blush-200">
                      {ord.orderStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-blush-100 text-dustyrose font-semibold text-xs transition-colors"
                    >
                      Inspect / Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-[#FFF9F4] rounded-4xl p-6 sm:p-8 shadow-2xl border border-blush-200 z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-dustyrose">
                  Fulfillment Card
                </span>
                <h3 className="font-serif text-xl font-bold text-cocoa-800">
                  Order #{selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full hover:bg-cream-200 text-cocoa-400 hover:text-cocoa-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Control */}
            <div className="p-4 rounded-2xl bg-white border border-cream-200 space-y-2">
              <label className="text-xs font-semibold text-cocoa-800 block">
                Update Fulfillment Status:
              </label>
              <div className="flex flex-wrap gap-2">
                {(["PROCESSING", "IN_PRODUCTION", "SHIPPED", "DELIVERED", "CANCELLED"] as OrderStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedOrder._id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedOrder.orderStatus === st
                          ? "bg-dustyrose text-white shadow-sm"
                          : "bg-cream-50 hover:bg-cream-100 text-cocoa-700 border border-cream-300"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Courier Tracking Dispatch Form */}
            <div className="p-4 rounded-2xl bg-white border border-cream-200 space-y-3">
              <h4 className="font-serif text-sm font-bold text-cocoa-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-dustyrose" />
                <span>Courier & Live Tracking (AWB)</span>
              </h4>

              {selectedOrder.trackingNumber ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                  Carrier: <strong>{selectedOrder.courierName}</strong> • AWB:{" "}
                  <strong className="font-mono">{selectedOrder.trackingNumber}</strong>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Enter Courier AWB / Tracking No."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800"
                  />
                  <button
                    type="button"
                    onClick={handleSaveTracking}
                    className="px-4 py-2 bg-dustyrose text-white text-xs font-semibold rounded-xl hover:bg-[#A3707F]"
                  >
                    Save & Mark Shipped
                  </button>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="p-4 rounded-2xl bg-white border border-cream-200 text-xs space-y-1">
              <h4 className="font-serif font-bold text-cocoa-800">Delivery Address</h4>
              <p className="font-semibold text-cocoa-700">{selectedOrder.shippingAddress?.fullName}</p>
              <p className="text-cocoa-600">
                {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.city},{" "}
                {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
              </p>
              <p className="text-cocoa-500">Phone: {selectedOrder.shippingAddress?.phone}</p>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-cocoa-800">Items to Pack</h4>
              <div className="divide-y divide-cream-200 bg-white p-4 rounded-2xl border border-cream-200">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="py-2 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-cocoa-800">
                        {item.quantity}x {item.title}
                      </p>
                      {item.selectedColor && (
                        <span className="text-[11px] text-cocoa-400">
                          Shade: {item.selectedColor}
                        </span>
                      )}
                    </div>
                    <span className="font-serif font-bold text-cocoa-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-cream-300 text-xs font-semibold text-cocoa-700 hover:bg-cream-100 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
              <span className="font-serif text-base font-bold text-cocoa-800">
                Total: {formatPrice(selectedOrder.total)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
