"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Compass, Sparkles, MapPin, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStickyNavigation } from "@/context/navigation-sticky-context";

export default function HeroSection() {
  const { onChangeSticky } = useStickyNavigation();
  const headRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headRef, { margin: "-100px 0px 0px 0px" });

  useEffect(() => {
    if (isInView) {
      onChangeSticky(false);
    }
  }, [isInView, onChangeSticky]);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center bg-slate-950 text-white pt-16 pb-20 px-4 overflow-hidden"
      role="banner"
    >
      {/* High-Resolution Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gorilla-trek.png"
          alt="Mountain Gorilla Rwanda"
          fill
          priority
          className="object-cover opacity-60 scale-100 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl w-full text-center flex flex-col items-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        {/* Brand Label */}
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>BOUNDLESS SOULS TOURS</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1
            ref={headRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] font-serif drop-shadow-md"
          >
            Discover Rwanda <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400">
              With Boundless Souls
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow">
            From mountain gorillas in Musanze & Kinigi to Akagera safaris, Bigogwe countryside, serene lakes, Kigali culture, luxury apartments & private chefs.
          </p>

          <p className="text-sm sm:text-base font-serif italic text-emerald-300 font-semibold tracking-wide">
            &ldquo;Where Every Journey Touches the Soul&rdquo;
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Link href="/experiences">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-full text-base gap-2 shadow-xl shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Compass className="h-5 w-5" />
              <span>Explore Experiences</span>
            </Button>
          </Link>

          <Link href="/plan-trip">
            <Button
              size="lg"
              className="bg-white/95 hover:bg-white text-slate-900 font-extrabold px-8 py-6 rounded-full text-base gap-2 shadow-xl transition-all hover:scale-105"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="h-5 w-5 text-emerald-600" />
            </Button>
          </Link>
        </div>

        {/* Feature Badges Bar */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl border-t border-slate-700/60">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-200 font-bold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
            <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Kinigi & Musanze</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-200 font-bold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Akagera Safari</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-200 font-bold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
            <Heart className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Bigogwe Hills</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-200 font-bold bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Lake Kivu & Kigali</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
