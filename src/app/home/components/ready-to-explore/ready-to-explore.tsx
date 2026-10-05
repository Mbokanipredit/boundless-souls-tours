"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReadyToExplore() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>READY TO EXPLORE?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif">
          Your Rwanda Story Starts Here.
        </h2>

        <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
          From the mountains of Musanze to the wilderness of Akagera, the peaceful beauty of Bigogwe, Rwanda&apos;s lakes and rivers, and the vibrant streets of Kigali, there is so much waiting for you.
        </p>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Whether you need help planning an adventure, booking an apartment, arranging a private driver, enjoying a private chef experience, or simply discovering the beauty of Rwanda, <strong className="text-white">Boundless Souls Tours</strong> is here to help.
        </p>

        <div className="pt-2">
          <p className="text-xl sm:text-2xl font-serif italic text-emerald-300 font-bold max-w-2xl mx-auto">
            &ldquo;Come as a visitor. Explore with curiosity. Leave with unforgettable memories.&rdquo;
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/plan-trip">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-full text-base gap-2 shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all"
            >
              <Compass className="h-5 w-5" />
              <span>Plan Your Experience</span>
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-8 py-6 rounded-full text-base gap-2 hover:scale-105 transition-all shadow-md"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-5 w-5 text-emerald-400" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
