"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { Mail, Phone, MapPin, Send, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [settings, setSettings] = useState<any>({
    studioAddress: "Indiranagar, Bengaluru, Karnataka - 560038",
    contactEmail: "hello@loomandlove.com",
    phone: "+91 98765 43210",
    workingHours: "Mon–Sat, 10am to 6pm IST",
    appointmentNote:
      "Feel our yarn swatches and witness our weavers in action by booking an artisan appointment.",
  });

  React.useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings((prev: any) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success("Message received! 🌸", {
        description: "Our studio care team will get back to you within 24 business hours.",
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F4]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-dustyrose">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-cocoa-800 font-bold">
              We’d Love to Hear From You
            </h1>
            <p className="text-xs sm:text-sm text-cocoa-600 max-w-md mx-auto font-sans">
              Have a question about an order, customized colorways, or wholesale inquiries? Send our artisan studio a note.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Contact details */}
            <div className="md:col-span-5 p-8 rounded-4xl bg-gradient-to-b from-[#F8E9EC] to-white border border-[#EFC8D1] shadow-card space-y-6">
              <h3 className="font-serif text-xl font-bold text-cocoa-800">
                The Artisan Studio
              </h3>

              <div className="space-y-4 text-xs text-cocoa-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-dustyrose flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Studio Location:</strong>
                    <span>{settings.studioAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-dustyrose flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Artisan Email:</strong>
                    <span>{settings.contactEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-dustyrose flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Studio Helpline:</strong>
                    <span>
                      {settings.phone} ({settings.workingHours})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blush-200 text-xs text-cocoa-600 space-y-1">
                <span className="font-serif font-bold text-cocoa-800 block">
                  Studio Visits by Appointment:
                </span>
                <p>{settings.appointmentNote}</p>
              </div>
            </div>

            {/* Message form */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-7 p-8 rounded-4xl bg-white border border-[#EFC8D1] shadow-card space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Iyer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Custom Bridal Bouquet Inquiry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cocoa-700 block mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our crochet artisans help you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl bg-cream-50 border border-cream-300 text-cocoa-800 focus:outline-none focus:border-dustyrose"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-full bg-dustyrose hover:bg-[#A3707F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? "Sending Note..." : "Send Note to Loom & Love"}</span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
