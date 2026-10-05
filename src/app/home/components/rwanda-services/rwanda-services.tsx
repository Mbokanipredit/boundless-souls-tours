"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Utensils, Car, PlaneLanding, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
}

export const servicesData: ServiceItem[] = [
  {
    id: "apartment-booking",
    title: "Apartment Booking",
    subtitle: "Looking for a place to stay?",
    tagline: "Your ideal home away from home.",
    description:
      "We can assist you in finding and booking suitable apartments based on your preferences, location, budget, and length of stay. Whether you are visiting for a few days or planning an extended stay, we help make finding your space easier.",
    bullets: [
      "Vetted luxury & cozy apartments",
      "Prime locations in Kigali & Musanze",
      "Short-term & extended stay options",
      "24/7 guest assistance",
    ],
    icon: <Building2 className="h-6 w-6 text-emerald-600" />,
  },
  {
    id: "private-chef",
    title: "Private Chef",
    subtitle: "Personalized Gourmet Dining",
    tagline: "Great food. Personal service. Your space.",
    description:
      "Enjoy a personalized dining experience in the comfort of your accommodation. Whether you are hosting a special gathering, traveling with family or friends, or simply want to enjoy a private meal, we can help connect you with private chef services for a memorable dining experience.",
    bullets: [
      "Custom Rwandan & international menus",
      "Fresh local organic ingredients",
      "In-apartment fine dining service",
      "Special dietary accommodation",
    ],
    icon: <Utensils className="h-6 w-6 text-emerald-600" />,
  },
  {
    id: "private-driver",
    title: "Private Driver",
    subtitle: "Travel Comfortably & Safely",
    tagline: "Travel comfortably. Explore freely.",
    description:
      "Explore Rwanda at your own pace with the convenience of a private driver. Whether you need transportation for a day, a specific journey, business travel, or a personalized itinerary, we can help arrange a driver experience suited to your needs.",
    bullets: [
      "Professional English/French speaking drivers",
      "Clean 4x4 Safari Land Cruisers & SUVs",
      "Flexible daily & trip itineraries",
      "Business & leisure travel support",
    ],
    icon: <Car className="h-6 w-6 text-emerald-600" />,
  },
  {
    id: "pickup-dropoff",
    title: "Pick-Up & Drop-Off",
    subtitle: "Seamless Airport & Inter-City Transfers",
    tagline: "Start and end your journey with ease.",
    description:
      "We offer pick-up and drop-off arrangements to help make your arrival, departure, and movement between destinations smooth and convenient. Whether it is an airport transfer, hotel or apartment pick-up, or transportation to your next destination, we are here to help make your journey easier.",
    bullets: [
      "24/7 Kigali Airport (KGL) transfers",
      "Hotel & apartment door-to-door pickup",
      "Punctual & flight-monitored arrivals",
      "Inter-city transfers (Musanze, Rubavu, Akagera)",
    ],
    icon: <PlaneLanding className="h-6 w-6 text-emerald-600" />,
  },
];

export default function RwandaServices() {
  return (
    <section id="services" className="py-20 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block">
            STAY, TRAVEL & ENJOY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Everything You Need for a <br />
            <span className="text-emerald-600">Smooth Experience.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Your journey should be about enjoying Rwanda—not worrying about every detail. That is why Boundless Souls Tours offers additional services designed to make your stay more comfortable, convenient, and enjoyable.
          </p>
        </div>

        {/* Services Cards 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.6 } }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-slate-50 border-slate-200/90 hover:border-emerald-500 transition-all duration-300 rounded-3xl p-8 shadow-sm hover:shadow-xl space-y-6 flex flex-col justify-between">
                <CardContent className="p-0 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 border border-emerald-200">
                      {service.icon}
                    </div>
                    <span className="text-xs font-serif italic text-emerald-700 font-semibold bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-sm">
                      {service.tagline}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{service.title}</h3>
                    <p className="text-xs font-bold text-emerald-700 mt-1 uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                    {service.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="pt-4 border-t border-slate-200/80">
                  <Link href={`/plan-trip?service=${service.id}`}>
                    <Button variant="outline" className="w-full justify-between border-slate-300 text-slate-900 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 font-bold rounded-xl py-5">
                      <span>Request {service.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
