"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Side: Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              More Than a Tour. <br />
              <span className="text-emerald-600">A Complete Experience.</span>
            </h2>

            <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
              <strong className="text-slate-900 font-bold">Boundless Souls Tours</strong> is dedicated to creating authentic, personalized, and unforgettable experiences across Rwanda.
            </p>

            <p className="text-slate-700 text-base leading-relaxed">
              We believe that the best journeys are not just about the places you visit, but also about the people you meet, the culture you experience, the food you taste, and the memories you create.
            </p>

            <p className="text-slate-700 text-base leading-relaxed">
              From planning your trip and finding the right place to stay to exploring breathtaking destinations and enjoying personalized services, we aim to make your time in Rwanda smooth, exciting, and meaningful.
            </p>

            {/* Featured Quote Card */}
            <div className="p-6 rounded-2xl bg-emerald-900 text-white shadow-lg space-y-2">
              <p className="text-xl font-serif italic text-emerald-200 font-bold">
                &ldquo;You bring the curiosity. We help create the experience.&rdquo;
              </p>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">
                BOUNDLESS SOULS TOURS PHILOSOPHY
              </span>
            </div>
          </div>

          {/* Right Side: Visual Image & Feature Grid */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-200 group">
              <Image
                src="/images/pics/3.jpeg"
                alt="Bigogwe Countryside Rwanda"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 block">
                  Bigogwe Countryside
                </span>
                <h3 className="text-lg font-black">Rural Beauty & Cattle Culture</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white border-slate-200 text-slate-900 p-4 rounded-2xl shadow-sm">
                <CardContent className="p-0 space-y-2">
                  <Heart className="h-5 w-5 text-emerald-600" />
                  <h4 className="text-sm font-bold">Authentic Encounters</h4>
                  <p className="text-xs text-slate-600">Local people, culture, food, and traditions.</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 text-slate-900 p-4 rounded-2xl shadow-sm">
                <CardContent className="p-0 space-y-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h4 className="text-sm font-bold">Smooth & Meaningful</h4>
                  <p className="text-xs text-slate-600">Hassle-free stays, private drivers & chefs.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
