"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/app/home/components/header-section/header";
import FooterSection from "@/app/home/components/footer-section/footer-section";
import CurrencyModal from "@/app/home/components/header-section/currency-modal/currency-modal";
import LanguageModal from "@/app/home/components/header-section/language-modal/language-modal";
import { galleryPhotos } from "@/app/home/components/gallery-preview/gallery-preview";

export default function GalleryPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryPhotos.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
        {/* Banner */}
        <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 text-center space-y-4">
          <div className="container mx-auto max-w-4xl space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight">
              Photo Gallery
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore all 16 authentic photos from our journeys across Rwanda. Click any image to view in full resolution.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 px-4 container mx-auto max-w-7xl space-y-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-full text-white border border-slate-700 shadow-lg">
                    <Expand className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Ready to Experience Rwanda?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Let Boundless Souls Tours craft your custom Rwanda itinerary with private drivers, luxury stays, and gorilla permits.
              </p>
            </div>
            <Link href="/plan-trip">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-2xl text-base flex items-center gap-2 shadow-xl shadow-emerald-950/50">
                <span>Plan Your Trip</span>
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-6 right-6 z-50 text-slate-400 hover:text-white bg-slate-900/80 p-3 rounded-full border border-slate-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div
                className="relative max-w-5xl w-full h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryPhotos[selectedPhotoIndex].src}
                  alt={galleryPhotos[selectedPhotoIndex].alt}
                  fill
                  className="object-contain"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3.5 rounded-full border border-slate-700 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3.5 rounded-full border border-slate-700 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-5 py-2 rounded-full border border-slate-700 text-xs text-slate-300 font-semibold">
                  Photo {selectedPhotoIndex + 1} of {galleryPhotos.length}
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
