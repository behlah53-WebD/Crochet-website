"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { formatPrice, formatDate } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import {
  Package,
  Heart,
  MapPin,
  LogOut,
  User,
  ShieldCheck,
  Truck,
  Sparkles,
  Gift,
  Clock,
  CheckCircle2,
  ChevronRight,
  Plus,
  Edit3,
  Trash2,
  Copy,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  Award,
  Crown,
  Share2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { wishlistCount } = useCart();

  const [activeSection, setActiveSection] = useState<
    "orders" | "commissions" | "addresses" | "rewards" | "profile"
  >("orders");

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderFilter, setOrderFilter] = useState<"all" | "processing" | "delivered">("all");

  // Mock addresses state with interactive management
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Priyanka Roy",
      type: "Home (Default)",
      street: "Flat 402, Lotus Residency, 12th Cross, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Priyanka Roy",
      type: "Design Studio",
      street: "Studio 18, Brigade Road Arts Complex",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 98765 43210",
      isDefault: false,
    },
  ]);

  const [newAddressModal, setNewAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    type: "Home",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  // Profile editable fields
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210");
  const [profileBirthday, setProfileBirthday] = useState("1998-06-15");
  const [favoriteFiber, setFavoriteFiber] = useState("Combed Milk Cotton");
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
    } else if (session?.user?.name) {
      setProfileName(session.user.name);
    }
  }, [status, router, session]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const all = await res.json();
        setOrders(all);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchUserOrders();
  }, []);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.pincode) {
      toast.error("Please fill in all address fields");
      return;
    }
    const created = {
      id: "addr-" + Date.now(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, created]);
    setNewAddressModal(false);
    setNewAddress({
      name: "",
      type: "Home",
      street: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
    toast.success("Delivery address added to your sanctuary!");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success("Default shipping address updated");
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.length === 1) {
      toast.error("You must have at least one delivery address");
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    toast.success("Sanctuary profile updated successfully! 🧶");
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon ${code} copied to clipboard!`);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "processing") {
      return o.orderStatus === "PROCESSING" || o.orderStatus === "PENDING";
    }
    if (orderFilter === "delivered") {
      return o.orderStatus === "DELIVERED";
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* =================================================================
              1. ARTISAN MEMBER PASSPORT HERO (Unique Boutique Member Banner)
          ================================================================== */}
          <div className="relative rounded-4xl bg-gradient-to-r from-[#F5ECE1] via-[#FDFBF7] to-[#FAF6F0] border border-[#E5DAC6] p-6 sm:p-8 md:p-10 shadow-studio-float overflow-hidden">
            {/* Ambient Background Warm Glow */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-clay-200/25 blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Member Identity Details */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                {/* Monogram Avatar with Pearl Ring */}
                <div className="relative">
                  <div suppressHydrationWarning className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-clay-500 to-clay-600 text-[#FAF6F0] font-serif text-3xl font-bold flex items-center justify-center shadow-md border-2 border-[#FAF6F0] transform hover:rotate-3 transition-transform">
                    {profileName ? profileName.charAt(0).toUpperCase() : "L"}
                  </div>
                  {/* Wax Seal Member Badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center border-2 border-[#FAF6F0] shadow-sm">
                    <Crown className="w-4 h-4 text-amber-100" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-clay-100 text-clay-700 text-[10px] uppercase font-bold tracking-widest border border-clay-200">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Gold Spool Circle
                    </span>
                    <span className="text-[11px] text-espresso-500 font-sans">
                      Member since Oct 2023
                    </span>
                  </div>

                  <h1 suppressHydrationWarning className="font-serif text-2xl sm:text-3xl font-bold text-espresso-800">
                    {profileName || "Valued Crochet Collector"}
                  </h1>
                  <p suppressHydrationWarning className="text-xs text-espresso-600 font-sans">
                    {session?.user?.email || "sanctuary.member@loomandlove.com"}
                  </p>

                  <p className="font-handwriting text-base text-clay-600 pt-0.5">
                    “Woven with love, cherished through the seasons.”
                  </p>
                </div>
              </div>

              {/* Quick Stat Pill Dashboard */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* Orders count */}
                <div className="p-3.5 px-5 rounded-2xl bg-[#FAF6F0] border border-[#E5DAC6] shadow-linen text-center min-w-[100px]">
                  <span className="text-xl font-serif font-bold text-espresso-800 block">
                    {orders.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-espresso-500 font-semibold">
                    Stitched Orders
                  </span>
                </div>

                {/* Spool Points */}
                <div className="p-3.5 px-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-linen text-center min-w-[100px]">
                  <span className="text-xl font-serif font-bold text-amber-700 block">
                    420
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold">
                    Spool Points
                  </span>
                </div>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="p-3.5 px-5 rounded-2xl bg-[#FAF6F0] hover:bg-clay-50 border border-[#E5DAC6] hover:border-clay-300 shadow-linen text-center min-w-[100px] transition-all group"
                >
                  <span className="text-xl font-serif font-bold text-clay-600 group-hover:scale-105 block transition-transform">
                    {wishlistCount}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-espresso-500 font-semibold flex items-center justify-center gap-1">
                    <Heart className="w-2.5 h-2.5 fill-clay-500 text-clay-500" /> Wishlist
                  </span>
                </Link>

                {/* Admin or Sign Out Actions */}
                <div className="flex flex-col gap-2">
                  {(session?.user as any)?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="px-4 py-2 rounded-full bg-espresso-800 hover:bg-espresso-900 text-[#FAF6F0] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Admin Hub</span>
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await signOut({ redirect: false });
                      router.push("/");
                      router.refresh();
                    }}
                    className="px-4 py-2 rounded-full border border-[#E5DAC6] hover:bg-[#F5ECE1] text-espresso-700 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5 text-espresso-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              2. PROFESSIONAL BOUTIQUE TWO-COLUMN WORKSPACE
          ================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar Navigation & Concierge Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Navigation Menu */}
              <div className="p-2 sm:p-3 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-0 lg:space-y-1 scrollbar-none">
                {[
                  {
                    id: "orders",
                    label: "My Stitched Orders",
                    badge: orders.length > 0 ? String(orders.length) : undefined,
                    icon: Package,
                    desc: "Track active & past creations",
                  },
                  {
                    id: "commissions",
                    label: "Bespoke Commissions",
                    badge: "Studio",
                    icon: Sparkles,
                    desc: "Custom order requests & status",
                  },
                  {
                    id: "addresses",
                    label: "Delivery Addresses",
                    badge: String(addresses.length),
                    icon: MapPin,
                    desc: "Home, studio & gifting destinations",
                  },
                  {
                    id: "rewards",
                    label: "Spool Rewards & Perks",
                    badge: "420 pts",
                    icon: Award,
                    desc: "Exclusive artisan vouchers & discounts",
                  },
                  {
                    id: "profile",
                    label: "Sanctuary Profile",
                    icon: User,
                    desc: "Personal preferences & sizing notes",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      suppressHydrationWarning
                      key={item.id}
                      onClick={() => setActiveSection(item.id as any)}
                      className={`min-w-[210px] lg:min-w-0 w-full p-3 sm:p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group shrink-0 lg:shrink ${
                        isActive
                          ? "bg-clay-500 text-[#FAF6F0] shadow-md"
                          : "hover:bg-[#FAF6F0] text-espresso-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-clay-100 text-clay-600 group-hover:bg-clay-200"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-serif font-bold ${
                              isActive ? "text-white" : "text-espresso-800"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p
                            className={`text-[10px] font-sans ${
                              isActive ? "text-[#FAF6F0]/80" : "text-espresso-500"
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/25 text-white"
                              : "bg-[#FAF6F0] text-clay-700 border border-[#E5DAC6]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Artisan Loyalty Tier Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#F5ECE1] to-[#FAF6F0] border border-[#E5DAC6] shadow-linen space-y-3 relative overflow-hidden pearl-pin">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-clay-700">
                    Tier Progress
                  </span>
                  <span className="text-xs font-serif font-bold text-espresso-800">Level 2 of 3</span>
                </div>
                <h4 className="font-serif text-base font-bold text-espresso-800">
                  Gold Spool Collector
                </h4>
                <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                  You are only <strong>1 handmade piece away</strong> from unlocking complimentary gift boxes & lifetime repair privileges!
                </p>
                <div className="w-full bg-[#FAF6F0] rounded-full h-2 overflow-hidden border border-[#E5DAC6]">
                  <div
                    className="bg-gradient-to-r from-clay-400 to-clay-600 h-full rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>

              {/* Personal Artisan Concierge Card */}
              <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-clay-700 uppercase tracking-widest">
                  <MessageCircle className="w-4 h-4 text-clay-600" />
                  <span>Atelier Concierge</span>
                </div>
                <h4 className="font-serif text-base font-bold text-espresso-800">
                  Need Special Custom Care?
                </h4>
                <p className="text-xs text-espresso-600 leading-relaxed font-sans">
                  Have questions about yarn washing, strap adjustments, or bespoke gifting? Our master hook artisans are on standby.
                </p>
                <div className="pt-1 flex gap-2">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-thread-wrap flex-1 py-2.5 px-3 rounded-full bg-moss-700 hover:bg-moss-800 text-[#FAF6F0] text-xs font-semibold text-center uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>WhatsApp Concierge</span>
                  </a>
                  <Link
                    href="/faq"
                    className="p-2.5 rounded-full border border-[#E5DAC6] hover:bg-[#FAF6F0] text-espresso-600 flex items-center justify-center"
                    title="Yarn Care FAQ"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Main Content Area (8 cols) */}
            <div className="lg:col-span-8">
              {/* =============================================================
                  TAB 1: ORDERS ("My Stitched Orders")
              ============================================================== */}
              {activeSection === "orders" && (
                <div className="space-y-6">
                  {/* Top Filter Bar */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-espresso-800">
                        My Stitched Orders
                      </h2>
                      <p className="text-xs text-espresso-500">
                        Review tracking, dispatch status, and receipts for your hand-crocheted treasures.
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF6F0] border border-[#E5DAC6]">
                      <button
                        onClick={() => setOrderFilter("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          orderFilter === "all"
                            ? "bg-clay-500 text-[#FAF6F0] shadow-xs"
                            : "text-espresso-600 hover:text-espresso-800"
                        }`}
                      >
                        All ({orders.length})
                      </button>
                      <button
                        onClick={() => setOrderFilter("processing")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          orderFilter === "processing"
                            ? "bg-clay-500 text-[#FAF6F0] shadow-xs"
                            : "text-espresso-600 hover:text-espresso-800"
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => setOrderFilter("delivered")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          orderFilter === "delivered"
                            ? "bg-clay-500 text-[#FAF6F0] shadow-xs"
                            : "text-espresso-600 hover:text-espresso-800"
                        }`}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>

                  {/* Orders List */}
                  {loadingOrders ? (
                    <div className="p-16 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] text-center space-y-3">
                      <div className="w-10 h-10 border-2 border-clay-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs text-espresso-500 font-sans">
                        Retrieving your handcrafted order history...
                      </p>
                    </div>
                  ) : filteredOrders.length === 0 ? (
                    <div className="p-12 sm:p-16 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-clay-100 text-clay-600 flex items-center justify-center mx-auto border border-clay-200">
                        <Package className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-xl font-bold text-espresso-800">
                          No orders matching this filter
                        </h3>
                        <p className="text-xs text-espresso-500 max-w-sm mx-auto font-sans leading-relaxed">
                          Your future heirloom crochet pieces will appear here once placed. Ready to explore our latest drop?
                        </p>
                      </div>
                      <Link
                        href="/shop"
                        className="btn-thread-wrap inline-flex items-center gap-2 px-7 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
                      >
                        <span>Explore Creations</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {filteredOrders.map((order) => {
                        const isDelivered = order.orderStatus === "DELIVERED";
                        const isShipped = order.orderStatus === "SHIPPED";
                        return (
                          <div
                            key={order._id}
                            className="rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen hover:shadow-clay-bloom transition-all overflow-hidden space-y-4 p-5 sm:p-6"
                          >
                            {/* Order Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-oat-300 text-xs">
                              <div>
                                <span className="font-mono font-bold text-clay-700 text-sm block">
                                  #{order.orderNumber}
                                </span>
                                <span className="text-espresso-400 text-[11px]">
                                  Placed on {formatDate(order.createdAt)}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <span
                                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                    isDelivered
                                      ? "bg-moss-100 text-moss-800 border-moss-200"
                                      : isShipped
                                      ? "bg-amber-100 text-amber-800 border-amber-200"
                                      : "bg-clay-100 text-clay-800 border-clay-200"
                                  }`}
                                >
                                  {order.orderStatus?.replace("_", " ") || "HAND-HOOKING"}
                                </span>

                                <Link
                                  href={`/track-order?orderId=${order.orderNumber}`}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E5DAC6] hover:border-clay-400 text-clay-700 text-xs font-medium transition-colors"
                                >
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Track Package</span>
                                </Link>
                              </div>
                            </div>

                            {/* Order Visual Journey Stepper */}
                            <div className="py-2 px-3 rounded-2xl bg-[#FAF6F0] border border-oat-200">
                              <div className="flex items-center justify-between text-[10px] font-semibold text-espresso-600">
                                <span className="text-clay-700 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-clay-600" /> Stitched with Care
                                </span>
                                <span className="hidden sm:inline text-espresso-400">•</span>
                                <span className={isShipped || isDelivered ? "text-clay-700 font-bold" : "text-espresso-400"}>
                                  Quality Blocked
                                </span>
                                <span className="hidden sm:inline text-espresso-400">•</span>
                                <span className={isDelivered ? "text-moss-700 font-bold" : "text-espresso-400"}>
                                  {isDelivered ? "Delivered & Loved" : "Dispatched"}
                                </span>
                              </div>
                            </div>

                            {/* Items Preview */}
                            <div className="space-y-3 pt-1">
                              {order.items?.map((item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-xs py-1"
                                >
                                  <div className="flex items-center gap-3.5">
                                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-oat-100 border border-oat-300 flex-shrink-0">
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="font-serif font-bold text-espresso-800 text-sm">
                                        {item.title}
                                      </h4>
                                      <div className="flex items-center gap-2 text-[11px] text-espresso-500 mt-0.5">
                                        <span>Qty: {item.quantity}</span>
                                        {item.selectedColor && (
                                          <span className="flex items-center gap-1">
                                            <span>•</span>
                                            {item.selectedColorHex && (
                                              <span
                                                className="w-2 h-2 rounded-full inline-block border border-black/10"
                                                style={{ backgroundColor: item.selectedColorHex }}
                                              />
                                            )}
                                            <span>{item.selectedColor}</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <span className="font-serif font-bold text-espresso-800 text-sm">
                                      {formatPrice(item.price * item.quantity)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Footer Summary */}
                            <div className="pt-3 border-t border-oat-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                              <span className="text-espresso-500">
                                Payment Method:{" "}
                                <strong className="text-espresso-700">
                                  {order.paymentMethod || "Online Pre-paid"}
                                </strong>{" "}
                                ({order.paymentStatus || "PAID"})
                              </span>

                              <div className="flex items-center gap-3">
                                <span className="text-espresso-500">Total Paid:</span>
                                <span className="font-serif text-base font-bold text-espresso-800">
                                  {formatPrice(order.total)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* =============================================================
                  TAB 2: BESPOKE COMMISSIONS
              ============================================================== */}
              {activeSection === "commissions" && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-espresso-800">
                        Bespoke Atelier Commissions
                      </h2>
                      <p className="text-xs text-espresso-500">
                        Track made-to-order requests, custom color palettes, and artisan consultations.
                      </p>
                    </div>

                    <Link
                      href="/custom-order"
                      className="btn-thread-wrap px-5 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>New Custom Request</span>
                    </Link>
                  </div>

                  {/* Active Commission Card */}
                  <div className="p-6 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float space-y-4 pearl-pin">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-oat-300">
                      <div>
                        <span className="text-xs uppercase font-bold tracking-widest text-clay-700">
                          Inquiry Docket #LL-BESPOKE-849
                        </span>
                        <h3 className="font-serif text-lg font-bold text-espresso-800 mt-0.5">
                          Bridal Pearl Daisy Bouquet & Matching Clutch
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                        Quote Prepared • Awaiting Approval
                      </span>
                    </div>

                    <p className="text-xs text-espresso-600 font-sans leading-relaxed">
                      Handcrafted in triple-ply combed milk cotton with custom 30cm strap and embroidered initials “PR”. Estimated craft time: 14 studio hours across 4 days.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                      <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-oat-300">
                        <span className="text-[10px] text-espresso-400 block uppercase">Palette</span>
                        <div className="flex gap-1 mt-1">
                          <span className="w-3.5 h-3.5 rounded-full bg-[#C77B58] border border-black/15" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#FAF6F0] border border-black/15" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#8A9A5B] border border-black/15" />
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-oat-300">
                        <span className="text-[10px] text-espresso-400 block uppercase">Target Date</span>
                        <span className="font-bold text-espresso-800 mt-1 block">Nov 28, 2024</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-oat-300">
                        <span className="text-[10px] text-espresso-400 block uppercase">Monogram</span>
                        <span className="font-bold text-clay-700 mt-1 block">“PR”</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF6F0] border border-oat-300">
                        <span className="text-[10px] text-espresso-400 block uppercase">Estimated Quote</span>
                        <span className="font-serif font-bold text-espresso-800 mt-1 block">₹2,850</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-oat-300 flex items-center justify-between">
                      <span className="text-xs text-espresso-500">
                        Assigned Artisan: <strong className="text-espresso-700">Aanya Verma</strong>
                      </span>
                      <a
                        href="https://wa.me/919876543210"
                        className="text-xs text-clay-600 hover:text-clay-700 font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Discuss changes on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 3: ADDRESSES ("Saved Addresses")
              ============================================================== */}
              {activeSection === "addresses" && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-espresso-800">
                        Saved Delivery Destinations
                      </h2>
                      <p className="text-xs text-espresso-500">
                        Manage your shipping addresses for frictionless 1-click checkout.
                      </p>
                    </div>

                    <button
                      onClick={() => setNewAddressModal(true)}
                      className="btn-thread-wrap px-4 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-6 rounded-3xl border transition-all space-y-3 relative ${
                          addr.isDefault
                            ? "bg-[#FDFBF7] border-clay-500 ring-2 ring-clay-500/20 shadow-studio-float"
                            : "bg-[#FAF6F0] border-[#E5DAC6] shadow-linen"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              addr.isDefault
                                ? "bg-clay-100 text-clay-700 border border-clay-300"
                                : "bg-oat-200 text-espresso-600"
                            }`}
                          >
                            {addr.type}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-espresso-400 hover:text-red-500 transition-colors p-1"
                              title="Delete address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-serif font-bold text-base text-espresso-800">
                            {addr.name}
                          </h4>
                          <p className="text-xs text-espresso-600 font-sans mt-1 leading-relaxed">
                            {addr.street} <br />
                            {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                          </p>
                          <p className="text-xs text-espresso-500 mt-2 font-mono">
                            Phone: {addr.phone}
                          </p>
                        </div>

                        {!addr.isDefault && (
                          <div className="pt-2 border-t border-oat-300">
                            <button
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-xs text-clay-600 hover:underline font-semibold"
                            >
                              Make Default Destination
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Address Modal */}
                  {newAddressModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
                      <div
                        onClick={() => setNewAddressModal(false)}
                        className="fixed inset-0 bg-[#2B2320]/60 backdrop-blur-xs"
                      />
                      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-4xl p-6 sm:p-8 shadow-studio-float border border-[#E5DAC6] space-y-4 z-10">
                        <h3 className="font-serif text-xl font-bold text-espresso-800">
                          Add New Destination
                        </h3>
                        <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                          <div>
                            <label className="text-espresso-700 font-semibold block mb-1">
                              Recipient Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Radhika Sen"
                              value={newAddress.name}
                              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                              className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                            />
                          </div>

                          <div>
                            <label className="text-espresso-700 font-semibold block mb-1">
                              Label (Home, Work, Gift to friend)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Vacation Home"
                              value={newAddress.type}
                              onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                              className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                            />
                          </div>

                          <div>
                            <label className="text-espresso-700 font-semibold block mb-1">
                              Address Details
                            </label>
                            <textarea
                              required
                              rows={2}
                              placeholder="Flat/House number, Building name, Street"
                              value={newAddress.street}
                              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                              className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-espresso-700 font-semibold block mb-1">City</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Bengaluru"
                                value={newAddress.city}
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                              />
                            </div>
                            <div>
                              <label className="text-espresso-700 font-semibold block mb-1">State</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Karnataka"
                                value={newAddress.state}
                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-espresso-700 font-semibold block mb-1">
                                Pincode
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={6}
                                placeholder="6 digits"
                                value={newAddress.pincode}
                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                              />
                            </div>
                            <div>
                              <label className="text-espresso-700 font-semibold block mb-1">Phone</label>
                              <input
                                type="tel"
                                required
                                placeholder="+91 98765 43210"
                                value={newAddress.phone}
                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                              />
                            </div>
                          </div>

                          <div className="pt-3 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setNewAddressModal(false)}
                              className="flex-1 py-2.5 rounded-full border border-[#E5DAC6] text-xs font-semibold text-espresso-600 hover:bg-[#FAF6F0]"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="flex-1 py-2.5 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider"
                            >
                              Save Address
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =============================================================
                  TAB 4: REWARDS ("Spool Rewards & Perks")
              ============================================================== */}
              {activeSection === "rewards" && (
                <div className="space-y-6">
                  {/* Spool Points Banner */}
                  <div className="p-8 rounded-4xl bg-gradient-to-r from-clay-500 via-clay-600 to-amber-600 text-[#FAF6F0] shadow-studio-float flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#FAF6F0]">
                        Yarn Circle Sanctuary Perks
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                        Your Spool Balance: 420 Points
                      </h3>
                      <p className="text-xs text-[#FAF6F0]/90 max-w-md font-sans leading-relaxed">
                        Earn 1 Spool Point for every ₹10 spent on handmade creations. Redeem them at checkout for instant order deductions!
                      </p>
                    </div>

                    <div className="p-4 px-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
                      <span className="text-xs text-[#FAF6F0]/80 block">Current Cash Value</span>
                      <span className="font-serif text-3xl font-bold">₹420 Off</span>
                      <span className="text-[10px] text-amber-200 block mt-0.5">Ready to redeem</span>
                    </div>
                  </div>

                  {/* Available Exclusive Vouchers Grid */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-espresso-800 mb-3">
                      Exclusive Vouchers Ready for You
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Coupon 1 */}
                      <div className="p-5 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-clay-700 bg-clay-100 px-2 py-0.5 rounded-full">
                            ₹200 Discount
                          </span>
                          <h4 className="font-serif font-bold text-sm text-espresso-800">
                            Member Autumn Drop
                          </h4>
                          <p className="text-[11px] text-espresso-500">
                            Valid on any crochet tote or bouquet over ₹1,299
                          </p>
                          <code className="text-xs font-mono font-bold text-clay-600 block pt-1">
                            SANCTUARY200
                          </code>
                        </div>

                        <button
                          onClick={() => copyCoupon("SANCTUARY200")}
                          className="p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-clay-100 text-espresso-700 border border-[#E5DAC6] transition-colors"
                          title="Copy voucher code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Coupon 2 */}
                      <div className="p-5 rounded-3xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-linen flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            Free Gifting Box
                          </span>
                          <h4 className="font-serif font-bold text-sm text-espresso-800">
                            Complimentary Wrap
                          </h4>
                          <p className="text-[11px] text-espresso-500">
                            Satin ribbon, wax seal & handwritten message note
                          </p>
                          <code className="text-xs font-mono font-bold text-amber-700 block pt-1">
                            FREEGIFTWRAP
                          </code>
                        </div>

                        <button
                          onClick={() => copyCoupon("FREEGIFTWRAP")}
                          className="p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-amber-100 text-espresso-700 border border-[#E5DAC6] transition-colors"
                          title="Copy voucher code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================================
                  TAB 5: PROFILE ("Sanctuary Profile & Preferences")
              ============================================================== */}
              {activeSection === "profile" && (
                <div className="p-6 sm:p-8 rounded-4xl bg-[#FDFBF7] border border-[#E5DAC6] shadow-studio-float space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-espresso-800">
                      Sanctuary Profile & Preferences
                    </h2>
                    <p className="text-xs text-espresso-500">
                      Personalize your maker notes, favorite yarn fibers, and contact information.
                    </p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-espresso-700 block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-espresso-700 block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled
                          value={session?.user?.email || "customer@loomandlove.com"}
                          className="w-full p-2.5 rounded-xl bg-oat-200 border border-[#E5DAC6] text-espresso-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-espresso-700 block mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-espresso-700 block mb-1">
                          Birthday (For Special Gift Drops)
                        </label>
                        <input
                          type="date"
                          value={profileBirthday}
                          onChange={(e) => setProfileBirthday(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-espresso-700 block mb-1">
                        Favorite Textile / Yarn Fiber
                      </label>
                      <select
                        suppressHydrationWarning
                        value={favoriteFiber}
                        onChange={(e) => setFavoriteFiber(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E5DAC6] text-espresso-800 focus:outline-none focus:border-clay-500"
                      >
                        <option suppressHydrationWarning value="Combed Milk Cotton">Combed 5-ply Milk Cotton (Silky & Soft)</option>
                        <option suppressHydrationWarning value="Organic Linen Cotton">Organic Linen Cotton (Rustic & Sturdy)</option>
                        <option suppressHydrationWarning value="Merino Wool Blend">Merino Wool Blend (Warm & Plush)</option>
                        <option suppressHydrationWarning value="Recycled Plant Yarn">Recycled Plant Fibers (Eco-Friendly)</option>
                      </select>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-oat-300">
                      <p className="text-[11px] text-espresso-400">
                        All information is secured with SSL 256-bit encryption.
                      </p>

                      <button
                        type="submit"
                        className="btn-thread-wrap px-8 py-3 rounded-full bg-clay-500 hover:bg-clay-600 text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
