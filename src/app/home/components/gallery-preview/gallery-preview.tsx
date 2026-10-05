"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
  category: "Wildlife & Gorillas" | "Landscapes & Lakes" | "Culture & Rural Life" | "Urban & Lifestyle";
  location: string;
  description: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: "/images/pics/1.jpeg",
    title: "Mountain Gorilla Trekking",
    category: "Wildlife & Gorillas",
    location: "Volcanoes National Park",
    description: "Close encounter with gentle giants in the bamboo forests of Kinigi.",
  },
  {
    id: 2,
    src: "/images/pics/2.jpeg",
    title: "Akagera Savannah Wildlife",
    category: "Wildlife & Gorillas",
    location: "Akagera National Park",
    description: "Elephants, giraffes, and lions roaming freely in Rwanda's vast savannah.",
  },
  {
    id: 3,
    src: "/images/pics/3.jpeg",
    title: "Bigogwe Hills & Tea Fields",
    category: "Landscapes & Lakes",
    location: "Bigogwe Countryside",
    description: "Rolling green pastures, misty hills, and traditional Ankole cattle farms.",
  },
  {
    id: 4,
    src: "/images/pics/4.jpeg",
    title: "Sunset Over Lake Kivu",
    category: "Landscapes & Lakes",
    location: "Rubavu / Karongi",
    description: "Serene boat rides and glowing sunsets on Africa's Great Lake.",
  },
  {
    id: 5,
    src: "/images/pics/5.jpeg",
    title: "Kigali Modern Skyline",
    category: "Urban & Lifestyle",
    location: "Kigali City",
    description: "Vibrant, clean, and green architecture in the heart of Africa's cleanest city.",
  },
  {
    id: 6,
    src: "/images/pics/6.jpeg",
    title: "Nyungwe Forest Canopy Walk",
    category: "Landscapes & Lakes",
    location: "Nyungwe National Park",
    description: "Suspended canopy walkway amidst ancient rainforest giant trees.",
  },
  {
    id: 7,
    src: "/images/pics/7.jpeg",
    title: "Musanze Volcanic Caves",
    category: "Landscapes & Lakes",
    location: "Musanze",
    description: "Exploring ancient lava tubes formed millions of years ago.",
  },
  {
    id: 8,
    src: "/images/pics/8.jpeg",
    title: "Ankole Cattle Traditions",
    category: "Culture & Rural Life",
    location: "Nyabihu District",
    description: "Learning milk processing and cultural traditions with local farmers.",
  },
  {
    id: 9,
    src: "/images/pics/9.jpeg",
    title: "Twin Lakes Burera & Ruhondo",
    category: "Landscapes & Lakes",
    location: "Northern Province",
    description: "Crisp mountain reflections under the majestic Virunga volcanoes.",
  },
  {
    id: 10,
    src: "/images/pics/10.jpeg",
    title: "Inema Arts & Cultural Hub",
    category: "Urban & Lifestyle",
    location: "Kigali",
    description: "Contemporary African art, live music, and colorful murals.",
  },
  {
    id: 11,
    src: "/images/pics/11.jpeg",
    title: "Rwanda Special Coffee Tasting",
    category: "Culture & Rural Life",
    location: "Lake Kivu Islands",
    description: "From crop to cup: tasting world-class single-origin Rwandan arabica coffee.",
  },
  {
    id: 12,
    src: "/images/pics/12.jpeg",
    title: "Golden Monkey Tracking",
    category: "Wildlife & Gorillas",
    location: "Volcanoes National Park",
    description: "Playful endangered golden monkeys leaping through bamboo canopies.",
  },
  {
    id: 13,
    src: "/images/pics/13.jpeg",
    title: "Traditional Intore Dance",
    category: "Culture & Rural Life",
    location: "Iby'Iwacu Cultural Village",
    description: "Dynamic traditional dance performances showcasing Rwandan heritage.",
  },
  {
    id: 14,
    src: "/images/pics/14.jpeg",
    title: "Luxury Eco-Lodge Retreat",
    category: "Urban & Lifestyle",
    location: "Kinigi Escarpment",
    description: "Cozy fireside hospitality overlooking misty mountain peaks.",
  },
  {
    id: 15,
    src: "/images/pics/15.jpeg",
    title: "Fazenda Sengha Outdoor Adventure",
    category: "Urban & Lifestyle",
    location: "Mount Kigali",
    description: "Thrilling horseback riding and zip-lining adventure above Kigali.",
  },
  {
    id: 16,
    src: "/images/pics/16.jpeg",
    title: "Rwandan Sunrise Over Hills",
    category: "Landscapes & Lakes",
    location: "Thousand Hills",
    description: "Golden rays breaking over the iconic endless rolling hills.",
  },
];

export default function GalleryPreview() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Show first 6 photos on homepage preview
  const previewPhotos = galleryPhotos.slice(0, 6);

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % previewPhotos.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + previewPhotos.length) % previewPhotos.length);
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full">
              <Camera className="h-4 w-4 text-emerald-400" />
              <span>EXPLORE RWANDA THROUGH OUR LENS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
              Moments &amp; Landscapes of Rwanda
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Get a glimpse of real experiences, breathtaking wildlife, pristine lakes, and rich cultural heritage captured across the Land of a Thousand Hills.
            </p>
          </div>

          <Link href="/gallery">
            <Button
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-6 rounded-xl shadow-lg shadow-emerald-900/30 flex items-center gap-2 group transition-all"
            >
              <span>View Full Gallery (16 Photos)</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Gallery Grid Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900 cursor-pointer shadow-xl"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Expand Icon Hover Indicator */}
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="h-4 w-4 text-emerald-400" />
              </div>

              {/* Text Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/40 inline-block">
                  {photo.category}
                </span>
                <h3 className="text-lg font-black font-serif text-white group-hover:text-emerald-200 transition-colors">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{photo.location}</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Modal Box */}
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

              {/* Image Preview */}
              <div className="relative w-full md:w-2/3 h-80 md:h-[500px] bg-black">
                <Image
                  src={previewPhotos[selectedPhotoIndex].src}
                  alt={previewPhotos[selectedPhotoIndex].title}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Buttons */}
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

              {/* Image Details Sidebar */}
              <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-slate-900">
                <div className="space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800 inline-block">
                    {previewPhotos[selectedPhotoIndex].category}
                  </span>
                  <h3 className="text-2xl font-black font-serif text-white">
                    {previewPhotos[selectedPhotoIndex].title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>{previewPhotos[selectedPhotoIndex].location}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {previewPhotos[selectedPhotoIndex].description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <Link href="/plan-trip" onClick={() => setSelectedPhotoIndex(null)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                      <span>Book Trip to This Location</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/gallery" onClick={() => setSelectedPhotoIndex(null)}>
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl">
                      Explore All 16 Photos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
