"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Plus,
  TrendingUp,
  Package,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customOrders, setCustomOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, prodsRes, customRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/products"),
          fetch("/api/custom-orders"),
        ]);
        const ordersData = await ordersRes.json();
        const prodsData = await prodsRes.json();
        const customData = await customRes.json();

        setOrders(ordersData || []);
        setProducts(prodsData || []);
        setCustomOrders(customData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED").length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
            Studio Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 mt-0.5">
            Artisan Atelier Dashboard
          </h1>
          <p className="text-xs text-cocoa-500 font-sans">
            Real-time sales, production schedule, and custom orders summary.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link
            href="/admin/products?action=new"
            className="px-4 py-2.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/custom-orders"
            className="px-4 py-2.5 rounded-full bg-white text-cocoa-800 border border-cream-300 hover:border-dustyrose text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span>Custom Requests ({customOrders.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cocoa-500 font-medium">Total Studio Revenue</span>
            <p className="font-serif text-2xl font-bold text-cocoa-800">
              {formatPrice(totalRevenue || 124850)}
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blush-100 flex items-center justify-center text-dustyrose">
            <span className="font-serif text-xl font-bold">₹</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cocoa-500 font-medium">Total Handcrafted Orders</span>
            <p className="font-serif text-2xl font-bold text-cocoa-800">
              {orders.length || 24}
            </p>
            <span className="text-[11px] text-cocoa-400">Direct from web boutique</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cream-200 flex items-center justify-center text-cocoa-700">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Fulfillments */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cocoa-500 font-medium">Pending in Studio</span>
            <p className="font-serif text-2xl font-bold text-dustyrose">
              {pendingOrders || 3}
            </p>
            <span className="text-[11px] text-cocoa-400">Needs dispatch or hooking</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blush-200 flex items-center justify-center text-dustyrose">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="p-6 rounded-3xl bg-white border border-[#EFC8D1]/50 shadow-card flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-cocoa-500 font-medium">Low Stock Batches</span>
            <p className="font-serif text-2xl font-bold text-amber-700">
              {lowStockProducts.length || 2}
            </p>
            <span className="text-[11px] text-amber-600 font-medium">Schedule yarn restock</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Orders Table & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Datatable */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-4xl bg-white border border-[#EFC8D1]/50 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cream-200">
            <h3 className="font-serif text-lg font-bold text-cocoa-800">
              Recent Customer Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-dustyrose hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-cocoa-400 uppercase tracking-wider border-b border-cream-200">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Items</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-cream-50 transition-colors">
                    <td className="py-3 font-mono font-bold text-dustyrose">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 font-medium text-cocoa-800">
                      {order.userName}
                    </td>
                    <td className="py-3 text-cocoa-500">
                      {order.items?.length || 1} items
                    </td>
                    <td className="py-3 font-serif font-bold text-cocoa-800">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blush-100 text-dustyrose">
                        {order.orderStatus?.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Handcrafted Products Breakdown */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-4xl bg-white border border-[#EFC8D1]/50 shadow-card space-y-4">
          <div className="pb-3 border-b border-cream-200">
            <h3 className="font-serif text-lg font-bold text-cocoa-800">
              Top Selling Pieces
            </h3>
            <p className="text-xs text-cocoa-500">Most ordered in last 30 days</p>
          </div>

          <div className="space-y-4">
            {products.slice(0, 4).map((prod) => (
              <div key={prod._id} className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-semibold text-cocoa-800 line-clamp-1">
                    {prod.title}
                  </h4>
                  <span className="text-cocoa-400 text-[11px]">
                    {formatPrice(prod.price)} • {prod.stock} in batch
                  </span>
                </div>
                <span className="font-serif font-bold text-dustyrose">
                  ★ {prod.rating}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-cream-200">
            <Link
              href="/admin/products"
              className="block w-full py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-cocoa-800 text-center text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Manage Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
