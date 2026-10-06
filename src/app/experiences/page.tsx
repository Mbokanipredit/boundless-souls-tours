"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomeLayout from "../home/layout";
import { MapPin, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/data-context";

export default function ExperiencesPage() {
  const { experiences } = useData();

  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        {/* Page Banner */}
        <section className="relative py-16 bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              EXPLORE RWANDA WITH US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Discover Rwanda With Boundless Souls
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              From gorilla encounters in Volcanoes National Park to Big Five safaris, green countryside, and tranquil lakes. Discover authentic Rwandan experiences.
            </p>
          </div>
        </section>

        {/* Experiences Detailed Showcase */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl space-y-20">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const imgSrc = exp.image && !exp.image.endsWith(".png") ? exp.image : `/images/Pics/${(idx % 16) + 1}.jpeg`;

              return (
                <div
                  key={exp.id}
                  id={exp.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-32"
                >
                  {/* Image Side */}
                  <div
                    className={`lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={imgSrc}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs tracking-wider shadow-md">
                        {exp.badge}
                      </span>
                    </div>
                  </div>

                  {/* Details Side */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.title}</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                        {exp.subtitle}
                      </h2>
                    </div>

                    <p className="text-slate-300 text-base leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                      <p className="text-sm font-serif italic text-emerald-400 font-semibold">
                        &ldquo;{exp.tagline}&rdquo;
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Experience Highlights:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-300">
                        {exp.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <Link href={`/plan-trip?destination=${exp.id}`}>
                        <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-8 py-6 gap-2 shadow-lg shadow-emerald-500/20">
                          <span>Plan {exp.title} Experience</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Link href="/contact">
                        <Button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold rounded-full px-6 py-6 shadow-md">
                          Inquire Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Custom Experience Banner */}
        <section className="container mx-auto px-4 max-w-7xl pt-10">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Want a Tailored Multi-Destination Itinerary?
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto">
              Combine gorillas in Kinigi, game drives in Akagera, cattle culture in Bigogwe, and Lake Kivu relaxation into one seamless journey.
            </p>
            <Link href="/plan-trip">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-full gap-2 shadow-xl shadow-emerald-500/30">
                <Compass className="h-5 w-5" />
                <span>Build Custom Experience</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
