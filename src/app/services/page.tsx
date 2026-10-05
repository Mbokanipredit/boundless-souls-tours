"use client";

import React from "react";
import Link from "next/link";
import HomeLayout from "../home/layout";
import { useData } from "@/context/data-context";
import { CheckCircle2, PhoneCall, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const { services } = useData();

  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        {/* Banner */}
        <section className="relative py-16 bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              STAY, TRAVEL & ENJOY
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Lifestyle & Travel Services
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Your journey should be about enjoying Rwanda—not worrying about every detail. We offer complete accommodation, private dining, and luxury transport services.
            </p>
          </div>
        </section>

        {/* Services In-Depth List */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl space-y-16">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 scroll-mt-32"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Building2 className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white">{service.title}</h2>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mt-1">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-serif italic text-emerald-300 font-semibold bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                    &ldquo;{service.tagline}&rdquo;
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-slate-300 text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.bullets.map((bullet) => (
                        <div key={bullet} className="flex items-center gap-2 text-sm text-slate-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4 text-center">
                    <h3 className="text-lg font-bold text-white">Book {service.title}</h3>
                    <p className="text-xs text-slate-400">
                      Need custom arrangements, long-term options, or specific requests? We customize everything to your preferences.
                    </p>

                    <div className="space-y-2 pt-2">
                      <Link href={`/plan-trip?service=${service.id}`} className="block">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-5">
                          Request {service.title}
                        </Button>
                      </Link>

                      <a
                        href="https://wa.me/250788000000"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full text-xs font-bold text-emerald-400 hover:underline pt-1"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>Instant WhatsApp Booking</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
