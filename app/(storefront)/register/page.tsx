"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Heart, Lock, Mail, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully! 🌸", {
          description: "You may now sign in with your credentials.",
        });
        router.push("/login");
      } else {
        toast.error(data.error || "Failed to create account.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blush-200 text-dustyrose flex items-center justify-center mx-auto shadow-sm">
              <Heart className="w-6 h-6 fill-dustyrose" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-cocoa-800">
              Join Loom & Love
            </h1>
            <p className="text-xs text-cocoa-500 font-sans">
              Create an account to save custom creations, track orders, and cherish handcrafted slow fashion.
            </p>
          </div>

          <div className="p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-float space-y-6">
            <form suppressHydrationWarning onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
                  <input
                    suppressHydrationWarning
                    type="text"
                    required
                    placeholder="e.g. Radhika Sen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
                  <input
                    suppressHydrationWarning
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                  />
                </div>
              </div>

              <button
                suppressHydrationWarning
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-cocoa-500 pt-2 border-t border-cream-200">
              Already have an account?{" "}
              <Link href="/login" className="text-dustyrose font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
