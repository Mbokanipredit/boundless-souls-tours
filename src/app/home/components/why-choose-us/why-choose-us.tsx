"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Layers, MapPin, Smile, HeartHandshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Personalized Experiences",
      desc: "Every traveler is different. We help create experiences that reflect what you love.",
      icon: <UserCheck className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "More Than Tours",
      desc: "From unforgettable destinations to accommodation, transportation, private dining, and personalized experiences, we help take care of more than just where you go.",
      icon: <Layers className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Local Experiences",
      desc: "Discover Rwanda through its people, culture, landscapes, food, cities, countryside, lakes, rivers, and unforgettable moments.",
      icon: <MapPin className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Convenience",
      desc: "We help make planning and enjoying your experience easier, so you can focus on creating memories.",
      icon: <Smile className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: "Experiences That Stay With You",
      desc: "Our goal is not simply to help you visit Rwanda. We want to help you experience it.",
      icon: <HeartHandshake className="h-6 w-6 text-emerald-600" />,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-100 text-slate-900 border-b border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block">
            WHY BOUNDLESS SOULS TOURS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Discover The Difference
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Our goal is not simply to help you visit Rwanda. We want to help you experience it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5 } }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all text-center flex flex-col items-center justify-between space-y-4 group">
                <CardContent className="p-0 space-y-3 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center transition-transform group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{pillar.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
