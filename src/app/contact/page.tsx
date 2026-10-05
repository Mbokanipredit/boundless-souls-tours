"use client";

import React, { useState } from "react";
import Link from "next/link";
import HomeLayout from "../home/layout";
import { Mail, PhoneCall, MapPin, Send, Check, MessageSquare } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";

export default function ContactPage() {
  const { addContact } = useData();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    subject: "Trip Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact({
      userId: user?.id,
      name: formData.name || user?.name || "Traveler",
      email: formData.email || user?.email || "",
      phone: formData.phone || user?.phone || "",
      subject: formData.subject,
      message: formData.message,
    });
    setSubmitted(true);
  };

  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        {/* Banner */}
        <section className="relative py-16 bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              CONTACT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Let&apos;s Plan Your Journey
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to experience Rwanda with Boundless Souls? Get in touch with us and let the journey begin.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Contact Information & Socials */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
                  <h2 className="text-2xl font-black text-white">Direct Connect</h2>
                  <p className="text-slate-400 text-sm">
                    Have questions or want to discuss an upcoming trip to Rwanda? Reach out directly via WhatsApp, Phone, or Email.
                  </p>

                  <div className="space-y-4 pt-2">
                    <a
                      href="https://wa.me/250788000000"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all group"
                    >
                      <div className="h-12 w-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <PhoneCall className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                          Phone / WhatsApp
                        </span>
                        <span className="text-base font-bold text-white group-hover:underline">
                          +250 788 000 000
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                      <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block">
                          Email Address
                        </span>
                        <span className="text-base font-bold text-white">
                          info@boundlesssoulstours.com
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                      <div className="h-12 w-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs text-purple-400 font-bold uppercase tracking-wider block">
                          Location
                        </span>
                        <span className="text-base font-bold text-white">
                          Kigali, Rwanda
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
                  <h3 className="text-lg font-bold text-white">Follow Us</h3>
                  <p className="text-xs text-slate-400">
                    Discover daily stories, gorilla trekking updates, safari moments, and lifestyle highlights.
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="#"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 text-white transition-colors"
                    >
                      <FaInstagram className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 text-white transition-colors"
                    >
                      <FaTiktok className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 text-white transition-colors"
                    >
                      <FaFacebookF className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#"
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 hover:bg-emerald-600 hover:border-emerald-600 text-white transition-colors"
                    >
                      <FaYoutube className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
                {submitted ? (
                  <div className="text-center space-y-4 py-12">
                    <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Check className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white">Message Sent!</h2>
                    <p className="text-slate-300 text-base max-w-md mx-auto">
                      Thank you for contacting Boundless Souls Tours. Our team will respond to your message within 12 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-white">Send Us A Message</h2>
                      <p className="text-slate-400 text-sm">
                        Fill out your information below and we will get back to you promptly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Your Full Name</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="bg-slate-950 border-slate-800 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Email Address</label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="bg-slate-950 border-slate-800 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Phone / WhatsApp</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 234 567 890"
                          className="bg-slate-950 border-slate-800 text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Subject</label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="General Inquiry / Gorilla Trekking..."
                          className="bg-slate-950 border-slate-800 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Your Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your trip plans, group size, or questions..."
                        className="w-full rounded-md border border-slate-800 bg-slate-950 p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-6 rounded-full text-base gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Send className="h-5 w-5" />
                      <span>Send Inquiry</span>
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
