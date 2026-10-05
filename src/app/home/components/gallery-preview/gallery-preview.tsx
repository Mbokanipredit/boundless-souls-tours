"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, ChevronLeft, ChevronRight, MapPin, Expand, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
  category: "Wildlife & Safaris" | "Mountains & Lakes" | "Culture & People" | "City & Lifestyle";
  location: string;
  story: string;
  photographer: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: "/images/pics/1.jpeg",
    title: "Gentle Giants of Kinigi",
    category: "Wildlife & Safaris",
    location: "Volcanoes National Park",
    story: "Standing face-to-face with a mountain gorilla family in the bamboo mist is a moment that stays with you forever.",
    photographer: "Jean-Luc (Lead Safari Guide)",
  },
  {
    id: 2,
    src: "/images/pics/2.jpeg",
    title: "Golden Hour in Akagera",
    category: "Wildlife & Safaris",
    location: "Akagera National Park",
    story: "As the sun sets over Lake Ihema, giraffes and elephants gather along the shore under golden African skies.",
    photographer: "Sarah M. (Traveler, UK)",
  },
  {
    id: 3,
    src: "/images/pics/3.jpeg",
    title: "Morning Mist over Bigogwe",
    category: "Mountains & Lakes",
    location: "Bigogwe Countryside",
    story: "Waking up to green rolling tea pastures and sharing fresh morning milk with local cattle herders.",
    photographer: "Fabrice K. (Boundless Host)",
  },
  {
    id: 4,
    src: "/images/pics/4.jpeg",
    title: "Sunset Serenity on Lake Kivu",
    category: "Mountains & Lakes",
    location: "Karongi / Rubavu",
    story: "Cruising calm waters while local singing fishermen set sail into the evening twilight.",
    photographer: "Elena & David (Travelers, Canada)",
  },
  {
    id: 5,
    src: "/images/pics/5.jpeg",
    title: "Warmth & Rhythm of Kigali",
    category: "City & Lifestyle",
    location: "Kigali City",
    story: "Exploring bustling coffee houses, contemporary art galleries, and the warm smiles of Africa's cleanest city.",
    photographer: "Divine (Concierge Team)",
  },
  {
    id: 6,
    src: "/images/pics/6.jpeg",
    title: "Canopy Walk Above Rainforest",
    category: "Mountains & Lakes",
    location: "Nyungwe Forest National Park",
    story: "Suspended 70 meters in the air, listening to chimpanzee calls echoing across ancient treetops.",
    photographer: "Marcus B. (Traveler, Germany)",
  },
  {
    id: 7,
    src: "/images/pics/7.jpeg",
    title: "Echoes of Musanze Caves",
    category: "Mountains & Lakes",
    location: "Musanze",
    story: "Exploring millions of years of volcanic history guided by local community historians.",
    photographer: "Jean-Luc (Lead Safari Guide)",
  },
  {
    id: 8,
    src: "/images/pics/8.jpeg",
    title: "Herding Traditions of Nyabihu",
    category: "Culture & People",
    location: "Nyabihu Countryside",
    story: "Honoring centuries-old Ankole cattle heritage and learning traditional farm-to-table hospitality.",
    photographer: "Fabrice K. (Boundless Host)",
  },
  {
    id: 9,
    src: "/images/pics/9.jpeg",
    title: "Reflections on Twin Lakes",
    category: "Mountains & Lakes",
    location: "Burera & Ruhondo",
    story: "Quiet morning paddle boarding surrounded by dramatic volcanic silhouettes.",
    photographer: "Chloe & Liam (Travelers, Australia)",
  },
  {
    id: 10,
    src: "/images/pics/10.jpeg",
    title: "Vibrant Expressions at Inema",
    category: "Culture & People",
    location: "Kigali Art District",
    story: "Connecting with local painters, sculptors, and musicians shaping modern African creativity.",
    photographer: "Divine (Concierge Team)",
  },
  {
    id: 11,
    src: "/images/pics/11.jpeg",
    title: "From Bean to Cup in Kivu",
    category: "Culture & People",
    location: "Lake Kivu Coffee Islands",
    story: "Hand-picking ripe coffee cherries with island farmers and roasting them over open wood flames.",
    photographer: "Thomas & Nina (Travelers, France)",
  },
  {
    id: 12,
    src: "/images/pics/12.jpeg",
    title: "Playful Golden Monkeys",
    category: "Wildlife & Safaris",
    location: "Volcanoes Escarpment",
    story: "Watching endangered golden monkeys leap through bright bamboo leaves with boundless energy.",
    photographer: "Jean-Luc (Lead Safari Guide)",
  },
  {
    id: 13,
    src: "/images/pics/13.jpeg",
    title: "Intore Dance & Cultural Celebration",
    category: "Culture & People",
    location: "Iby'Iwacu Village",
    story: "Experiencing the powerful rhythm, grace, and joy of Rwanda's historic warrior dance.",
    photographer: "Grace T. (Boundless Host)",
  },
  {
    id: 14,
    src: "/images/pics/14.jpeg",
    title: "Fireside Warmth at Eco-Lodge",
    category: "City & Lifestyle",
    location: "Kinigi Escarpment",
    story: "Gathering around open wood fires after a long trek, sharing stories and warm spiced tea.",
    photographer: "Sophie R. (Traveler, Switzerland)",
  },
  {
    id: 15,
    src: "/images/pics/15.jpeg",
    title: "Overlooking the Thousand Hills",
    category: "City & Lifestyle",
    location: "Mount Kigali Trail",
    story: "A gentle trail ride above the capital as sunset paints the valleys in gold.",
    photographer: "Grace T. (Boundless Host)",
  },
  {
    id: 16,
    src: "/images/pics/16.jpeg",
    title: "Dawn Over the Valleys",
    category: "Mountains & Lakes",
    location: "Northern Province Escarpment",
    story: "First light breaking over mist-covered valleys—the peaceful soul of Rwanda.",
    photographer: "Jean-Luc (Lead Safari Guide)",
  },
];

export default function GalleryPreview() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Show 6 curated photos for homepage preview
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
      {/* Subtle Warm Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight">
              Rwanda Through the Eyes of Our Guests &amp; Guides
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every photograph tells an authentic human story—from quiet mornings in misty bamboo forests to warm conversations over Rwandan coffee with local hosts.
            </p>
          </div>

          <Link href="/gallery">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-6 rounded-2xl shadow-xl shadow-emerald-950/40 flex items-center gap-2.5 group transition-all">
              <span>Explore Full Photo Storybook</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-96 rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 transition-all"
            >
              {/* Image */}
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge & Expand Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-200 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30">
                  {photo.category}
                </span>
                <div className="bg-slate-950/80 backdrop-blur-md p-2 rounded-full border border-slate-700/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="h-4 w-4 text-amber-300" />
                </div>
              </div>

              {/* Card Bottom Story */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-10">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{photo.location}</span>
                </div>

                <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {photo.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 italic font-serif">
                  &ldquo;{photo.story}&rdquo;
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Photo by {photo.photographer}</span>
                  <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                    View Story &rarr;
                  </span>
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

              {/* Photo Display */}
              <div className="relative w-full md:w-3/5 h-80 md:h-[520px] bg-black">
                <Image
                  src={previewPhotos[selectedPhotoIndex].src}
                  alt={previewPhotos[selectedPhotoIndex].title}
                  fill
                  className="object-cover"
                />

                {/* Nav Buttons */}
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

              {/* Story Sidebar */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-slate-900">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider uppercase text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40 inline-block">
                      {previewPhotos[selectedPhotoIndex].category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black font-serif text-white">
                    {previewPhotos[selectedPhotoIndex].title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <span>{previewPhotos[selectedPhotoIndex].location}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <Quote className="h-5 w-5 text-amber-400 opacity-80" />
                    <p className="text-slate-200 text-sm leading-relaxed italic font-serif">
                      &ldquo;{previewPhotos[selectedPhotoIndex].story}&rdquo;
                    </p>
                    <span className="text-[11px] font-medium text-slate-400 block pt-1">
                      Captured by {previewPhotos[selectedPhotoIndex].photographer}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <Link href="/plan-trip" onClick={() => setSelectedPhotoIndex(null)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50">
                      <span>Experience This Place with Us</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/gallery" onClick={() => setSelectedPhotoIndex(null)}>
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold py-3 rounded-xl">
                      Browse All 16 Photos &amp; Stories
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
