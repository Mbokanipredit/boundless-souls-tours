"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
}

export const galleryPhotos: GalleryPhoto[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: `/images/pics/${i + 1}.jpeg`,
  alt: `Boundless Souls Tours Photo ${i + 1}`,
}));

export default function GalleryPreview() {
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
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-serif">
              Photo Gallery
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore authentic photography captured on our tours and journeys across Rwanda.
            </p>
          </div>

          <Link href="/gallery">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-5 rounded-xl flex items-center gap-2 group transition-all">
              <span>View All 16 Photos</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 cursor-pointer border border-slate-800 shadow-md hover:shadow-xl transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-slate-900/80 backdrop-blur-md p-3 rounded-full text-white border border-slate-700 shadow-lg">
                  <Expand className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center"
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

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 font-semibold">
                Photo {selectedPhotoIndex + 1} of {galleryPhotos.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
