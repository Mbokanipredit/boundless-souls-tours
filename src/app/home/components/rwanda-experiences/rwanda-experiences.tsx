"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/data-context";
import ExperienceImageSlider from "@/components/ui/experience-image-slider";

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  images?: string[];
  highlights: string[];
  badge: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "kinigi-musanze",
    title: "KINIGI & MUSANZE",
    subtitle: "Meet the Mountain Gorillas",
    tagline: "An experience you will never forget.",
    description:
      "Journey into Rwanda's breathtaking northern landscapes and experience one of the world's most extraordinary wildlife adventures. Discover the beauty of Musanze, the volcanic landscapes surrounding Kinigi, and gorilla trekking in Volcanoes National Park.",
    image: "/images/Kinigi/1.jpeg",
    images: [
      "/images/Kinigi/1.jpeg",
      "/images/Kinigi/2.jpeg",
      "/images/Kinigi/3.jpeg",
      "/images/Kinigi/4.jpeg",
    ],
    badge: "Gorilla Safari",
    highlights: [
      "Mountain Gorilla Trekking",
      "Volcanoes National Park",
      "Musanze Cave Exploration",
      "Cultural Village Tours",
    ],
  },
  {
    id: "akagera",
    title: "AKAGERA",
    subtitle: "Discover Rwanda's Wild Side",
    tagline: "Step into the wild.",
    description:
      "Experience the beauty and excitement of Rwanda's wilderness. From breathtaking savannah landscapes to incredible Big Five wildlife encounters, Akagera offers an unforgettable safari experience for travelers looking to experience nature.",
    image: "/images/Akagera/1.jpeg",
    images: [
      "/images/Akagera/1.jpeg",
      "/images/Akagera/2.jpeg",
      "/images/Akagera/3.jpeg",
      "/images/Akagera/4.jpeg",
      "/images/Akagera/5.jpeg",
      "/images/Akagera/6.jpeg",
      "/images/Akagera/7.jpeg",
    ],
    badge: "Wildlife Safari",
    highlights: [
      "Big 5 Game Drives",
      "Lake Ihema Boat Safaris",
      "Giraffe & Elephant Tracking",
      "Luxury Safari Lodges",
    ],
  },
  {
    id: "bigogwe",
    title: "BIGOGWE",
    subtitle: "Experience the Beauty of Rural Rwanda",
    tagline: "Beautiful views. Authentic experiences. Unforgettable memories.",
    description:
      "Escape into the breathtaking countryside of Bigogwe. Discover beautiful rolling green tea landscapes, experience Rwanda's unique long-horned Ankole cattle culture, and enjoy a peaceful and authentic side of the country.",
    image: "/images/Bigogwe/1.jpeg",
    images: [
      "/images/Bigogwe/1.jpeg",
      "/images/pics/3.jpeg",
      "/images/pics/7.jpeg",
    ],
    badge: "Cultural & Countryside",
    highlights: [
      "Ankole Cattle Culture",
      "Emerald Tea Plantation Walks",
      "Traditional Camping & Hiking",
      "Local Farm-to-Table Meals",
    ],
  },
  {
    id: "lakes-rivers",
    title: "LAKES & RIVERS",
    subtitle: "Discover Rwanda's Natural Beauty",
    tagline: "Slow down. Explore. Take it all in.",
    description:
      "Experience the peaceful and breathtaking beauty of Rwanda's lakes and rivers. From relaxing moments by the water of Lake Kivu to scenic boat journeys on Twin Lakes Burera & Ruhondo surrounded by volcanic peaks.",
    image: "/images/Rivers%20and%20Lakes/1.jpeg",
    images: [
      "/images/Rivers%20and%20Lakes/1.jpeg",
      "/images/Rivers%20and%20Lakes/2.jpeg",
      "/images/Rivers%20and%20Lakes/3.jpeg",
    ],
    badge: "Lakeside Relaxation",
    highlights: [
      "Lake Kivu Sunset Cruises",
      "Twin Lakes Kayaking",
      "Coffee Island Excursions",
      "Lakeside Resort Relaxation",
    ],
  },
  {
    id: "kigali",
    title: "KIGALI",
    subtitle: "Discover the Heart of Rwanda",
    tagline: "Explore Kigali differently.",
    description:
      "Experience the vibrant energy of Kigali through its rich culture, gastronomy, lifestyle, entertainment, beautiful views, and hidden gems. Let us help you discover a side of Africa's cleanest city that goes beyond tourist spots.",
    image: "/images/Kigali/1.jpeg",
    images: [
      "/images/Kigali/1.jpeg",
      "/images/Kigali/2.jpeg",
      "/images/Kigali/3.jpeg",
      "/images/pics/9.jpeg",
    ],
    badge: "Urban & Lifestyle",
    highlights: [
      "Art Galleries & Craft Markets",
      "Kigali Genocide Memorial",
      "Rooftop Culinary Experience",
      "Nightlife & Cultural Gems",
    ],
  },
  {
    id: "nyungwe",
    title: "NYUNGWE",
    subtitle: "Ancient Rainforest & Canopy Walk",
    tagline: "High above the rainforest canopy.",
    description:
      "Walk among ancient rainforest giants in Nyungwe National Park. Experience thrilling canopy walks, chimpanzee tracking, and scenic waterfalls in one of Africa's oldest montane rainforests.",
    image: "/images/Nyungwe/1.jpeg",
    images: [
      "/images/Nyungwe/1.jpeg",
      "/images/Nyungwe/2.jpeg",
      "/images/Nyungwe/3.jpeg",
      "/images/Nyungwe/4.jpeg",
      "/images/Nyungwe/5.jpeg",
    ],
    badge: "Rainforest Safari",
    highlights: [
      "Canopy Walkway Experience",
      "Chimpanzee Tracking",
      "Kamiranzovu Waterfall Trails",
      "Endemic Bird Watching",
    ],
  },
  {
    id: "murukari",
    title: "MURUKARI",
    subtitle: "Cultural Heritage & Scenic Hills",
    tagline: "Authentic culture and landscapes.",
    description:
      "Explore the historic and scenic Murukari region. Discover serene green landscapes, local community heritage, and unforgettable Rwandan hospitality.",
    image: "/images/Murukari/1.jpeg",
    images: [
      "/images/Murukari/1.jpeg",
      "/images/Murukari/2.jpeg",
      "/images/pics/14.jpeg",
    ],
    badge: "Cultural Heritage",
    highlights: [
      "Scenic Hill Walks",
      "Community Heritage Tours",
      "Traditional Artisan Crafts",
      "Panoramic Viewpoints",
    ],
  },
];

export default function RwandaExperiences() {
  const { experiences: ctxExperiences } = useData();
  const activeExperiences = ctxExperiences && ctxExperiences.length > 0 ? ctxExperiences : experiencesData;
  const heroExp = activeExperiences[0] || experiencesData[0];
  const gridExps = activeExperiences.slice(1);

  const heroImages = heroExp.images && heroExp.images.length > 0
    ? heroExp.images
    : [heroExp.image || "/images/Kinigi/1.jpeg"];

  return (
    <section id="experiences" className="py-20 bg-slate-950 text-white relative">
      <div className="container mx-auto px-4 max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
              <Compass className="h-3.5 w-3.5" />
              <span>EXPLORE RWANDA WITH US</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Breathtaking Destinations. <br />
              <span className="text-emerald-400">Unforgettable Encounters.</span>
            </h2>
            <p className="text-slate-400 text-base">
              From gorilla trekking in volcanic mist to savannah game drives, emerald hills, and lakeside sunsets.
            </p>
          </div>

          <Link href="/plan-trip">
            <Button variant="brand" className="gap-2 rounded-full font-bold px-6 shadow-lg shadow-emerald-500/20">
              <span>Plan Custom Experience</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Featured Large Hero Card (Kinigi & Musanze) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-emerald-500/40 transition-all">
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[440px]">
            <ExperienceImageSlider
              images={heroImages}
              alt={heroExp.title}
              badge={heroExp.badge}
            />
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                <MapPin className="h-4 w-4" />
                <span>{heroExp.title}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {heroExp.subtitle}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {heroExp.description}
              </p>
              <p className="text-sm font-serif italic text-emerald-400 font-semibold">
                &ldquo;{heroExp.tagline}&rdquo;
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                {heroExp.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link href={`/experiences#${heroExp.id}`} className="block pt-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-6">
                  Explore {heroExp.title} Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Grid for Remaining Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridExps.map((exp, idx) => {
            const expImages = exp.images && exp.images.length > 0
              ? exp.images
              : [exp.image || `/images/pics/${(idx % 16) + 1}.jpeg`];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.6 } }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden rounded-2xl flex flex-col justify-between shadow-xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <ExperienceImageSlider
                      images={expImages}
                      alt={exp.title}
                      badge={exp.badge}
                    />
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                        {exp.title}
                      </span>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.subtitle}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-3">
                      <p className="text-xs font-serif italic text-slate-300">
                        &ldquo;{exp.tagline}&rdquo;
                      </p>
                      <Link href={`/experiences#${exp.id}`} className="block">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs py-2.5 shadow-md shadow-emerald-600/20 transition-all">
                          View Experience Photos & Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
