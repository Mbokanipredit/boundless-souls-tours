"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Check, Send, PhoneCall, Lock, UserCheck, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import AuthModal from "@/components/auth/auth-modal";

export default function CustomExperienceBuilder() {
  const { addBooking } = useData();
  const { user, loginUser } = useAuth();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["Kinigi & Musanze"]);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Private Driver"]);
  const [travelers, setTravelers] = useState<string>("2 Adults");
  const [dateRange, setDateRange] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmailOrPhone(user.email || "");
    }
  }, [user]);

  const destinationsList = [
    "Kinigi & Musanze (Gorillas)",
    "Akagera Safari (Big Five)",
    "Bigogwe Countryside & Tea",
    "Lakes & Rivers (Lake Kivu)",
    "Kigali City & Culture",
  ];

  const servicesList = [
    "Apartment Booking",
    "Private Chef",
    "Private Driver (4x4)",
    "Airport Pick-Up & Drop-Off",
    "Gorilla Permit Assistance",
  ];

  const toggleDestination = (item: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const toggleService = (item: string) => {
    setSelectedServices((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    addBooking({
      userId: user.id,
      clientName: name || user.name || "Traveler",
      email: emailOrPhone.includes("@") ? emailOrPhone : (user.email || "contact-pending@boundlesssouls.com"),
      phone: emailOrPhone.includes("@") ? (user.phone || "") : emailOrPhone,
      destinations: selectedDestinations,
      services: selectedServices,
      travelers: parseInt(travelers) || 2,
      dateRange: dateRange || "Flexible",
      notes,
    });
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const message = `Hello Boundless Souls Tours! I would like to plan a custom journey.%0A%0ADestinations: ${selectedDestinations.join(
      ", "
    )}%0AServices: ${selectedServices.join(
      ", "
    )}%0ATravelers: ${travelers}%0APpreferred Dates: ${dateRange || "Flexible"}`;
    window.open(`https://wa.me/250788000000?text=${message}`, "_blank");
  };

  return (
    <section id="plan-trip" className="py-20 bg-slate-950 text-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              YOUR EXPERIENCE, YOUR WAY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Have Something Specific In Mind?
            </h2>
            <p className="text-slate-300 text-base">
              We create personalized experiences based on your interests, schedule, preferences, and travel style. Whether you want adventure, wildlife, culture, lakeside relaxation—or a little bit of everything.
            </p>
            <p className="text-lg font-serif italic text-emerald-400 font-semibold">
              &ldquo;Your journey. Your way.&rdquo;
            </p>
          </div>

          {!user ? (
            /* Auth Required Gate Banner */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950/80 border border-amber-500/30 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl"
            >
              <div className="h-16 w-16 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Lock className="h-8 w-8 text-amber-400" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl font-black font-serif text-white">
                  Sign In Required to Plan Your Trip
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  To customize itineraries, manage tour requests, and receive direct updates from our travel concierge team in your personal dashboard, please log in or create a traveler account.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-2xl gap-2 shadow-lg shadow-emerald-950/50 text-base"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In or Register to Continue</span>
                </Button>
              </div>
            </motion.div>
          ) : submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-950/60 border border-emerald-500/40 p-8 rounded-2xl text-center space-y-4"
            >
              <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, {name || user?.name || "Traveler"}! Our Rwanda travel specialist is reviewing your custom choices and will get in touch shortly with a tailored itinerary. You can track this request in your dashboard.
              </p>
              <Button
                onClick={handleWhatsAppDirect}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-6 py-3 gap-2 mt-2"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Chat Instantly on WhatsApp</span>
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Signed In User Pill */}
              <div className="bg-emerald-950/60 border border-emerald-800/60 px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <UserCheck className="h-4 w-4 text-emerald-400" />
                  <span>Logged in as <strong className="text-white">{user.name}</strong> ({user.email})</span>
                </div>
                <span className="text-emerald-400 font-semibold">Account Connected ✓</span>
              </div>

              {/* Step 1: Select Destinations */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>1. Choose Destinations You Want to Visit</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {destinationsList.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest);
                    return (
                      <button
                        key={dest}
                        type="button"
                        onClick={() => toggleDestination(dest)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                        }`}
                      >
                        {isSelected ? `✓ ${dest}` : `+ ${dest}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Services */}
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>2. Select Accommodation &amp; Lifestyle Services</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {servicesList.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? "bg-blue-600 border-blue-500 text-white shadow-md"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                        }`}
                      >
                        {isSelected ? `✓ ${service}` : `+ ${service}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Dates, Travelers, Contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Travelers / Group Size</label>
                  <Input
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    placeholder="e.g. 2 Adults, 1 Child"
                    className="bg-slate-900 border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Approximate Travel Dates</label>
                  <Input
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    placeholder="e.g. Oct 15 - Oct 22"
                    className="bg-slate-900 border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Your Name</label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="bg-slate-900 border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Email or WhatsApp Number</label>
                  <Input
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="yourname@email.com or +250..."
                    className="bg-slate-900 border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Special Notes or Preferences</label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us what you love (food, luxury, hiking...)"
                    className="bg-slate-900 border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/80">
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-full text-base gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Send className="h-5 w-5" />
                  <span>Request Custom Itinerary</span>
                </Button>

                <Button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  variant="outline"
                  className="w-full sm:w-auto border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold px-6 py-6 rounded-full gap-2 text-sm"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Instant WhatsApp Planning</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </section>
  );
}
