"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Expand, X, ChevronLeft, ChevronRight, ArrowRight, Quote, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/app/home/components/header-section/header";
import FooterSection from "@/app/home/components/footer-section/footer-section";
import CurrencyModal from "@/app/home/components/header-section/currency-modal/currency-modal";
import LanguageModal from "@/app/home/components/header-section/language-modal/language-modal";
import { galleryPhotos, GalleryPhoto } from "@/app/home/components/gallery-preview/gallery-preview";

const categories = [
  "All",
  "Wildlife & Safaris",
  "Mountains & Lakes",
  "Culture & People",
  "City & Lifestyle",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
        {/* Gallery Hero Banner */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>STORIES &amp; MEMORIES FROM THE TRAIL</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight leading-tight">
              Rwanda Through Human Eyes
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore authentic moments captured by our travelers, local hosts, and safari guides across misty volcanoes, pristine lakes, and vibrant communities.
            </p>
          </div>
        </section>

        {/* Content & Filter Section */}
        <section className="py-12 px-4 container mx-auto max-w-7xl space-y-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-800/80 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subheader info */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 px-2">
            <span>Showing {filteredPhotos.length} of {galleryPhotos.length} authentic stories</span>
            <span>Click any photo to read the full traveler story</span>
          </div>

          {/* Grid Layout */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative h-80 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 transition-all"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Badge & Expand */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {photo.category}
                  </span>
                  <div className="bg-slate-950/80 backdrop-blur-md p-1.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="h-3.5 w-3.5 text-amber-300" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2 z-10">
                  <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold">
                    <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-1">
                    {photo.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-2 italic font-serif">
                    &ldquo;{photo.story}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Banner */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Heart className="h-4 w-4 text-amber-400" />
                <span>HANDCRAFTED RWANDAN JOURNEYS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-serif text-white">
                Write Your Own Story in Rwanda
              </h3>
              <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                Whether you dream of gorilla trekking, private lake cruises, or coffee farm immersion, our local team ensures every detail feels warm, seamless, and personal.
              </p>
            </div>
            <Link href="/plan-trip" className="shrink-0">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-2xl shadow-xl shadow-emerald-950/50 text-base flex items-center gap-2">
                <span>Plan Your Experience</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 md:p-8"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <div
                className="relative max-w-5xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white p-3 rounded-full border border-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Photo Viewer */}
                <div className="relative w-full md:w-3/5 h-80 md:h-[520px] bg-black">
                  <Image
                    src={filteredPhotos[selectedPhotoIndex].src}
                    alt={filteredPhotos[selectedPhotoIndex].title}
                    fill
                    className="object-cover"
                  />

                  {/* Previous / Next Controls */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 text-white p-3 rounded-full border border-slate-700 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-900 text-white p-3 rounded-full border border-slate-700 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-slate-900">
                  <div className="space-y-4">
                    <span className="text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40 inline-block">
                      {filteredPhotos[selectedPhotoIndex].category}
                    </span>
                    <h3 className="text-2xl font-black font-serif text-white">
                      {filteredPhotos[selectedPhotoIndex].title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      <span>{filteredPhotos[selectedPhotoIndex].location}</span>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <Quote className="h-5 w-5 text-amber-400 opacity-80" />
                      <p className="text-slate-200 text-sm leading-relaxed italic font-serif">
                        &ldquo;{filteredPhotos[selectedPhotoIndex].story}&rdquo;
                      </p>
                      <span className="text-[11px] font-medium text-slate-400 block pt-1">
                        Captured by {filteredPhotos[selectedPhotoIndex].photographer}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <Link href="/plan-trip" onClick={() => setSelectedPhotoIndex(null)}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50">
                        <span>Book Trip to This Location</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <FooterSection />
      <CurrencyModal />
      <LanguageModal />
    </>
  );
}
