"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  tripType: string;
  avatar: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Mark Jenkins",
    role: "Gorilla Trekking Travelers",
    country: "United Kingdom",
    tripType: "Musanze & Kinigi Gorilla Safari",
    avatar: "/user/micheal-dam.jpg",
    comment:
      "Our gorilla trek in Musanze was the most breathtaking experience of our lives! Boundless Souls Tours arranged every single detail seamlessly—from our private 4x4 driver to park permits and luxury lodge stays. Seeing the silverbacks up close was truly unforgettable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Alex Vance",
    role: "Wildlife Safari Enthusiast",
    country: "United States",
    tripType: "Akagera Big Five Safari",
    avatar: "/user/micheal-dam.jpg",
    comment:
      "Akagera National Park blew us away. We saw lions, rhinos, elephants, and giraffes all in one weekend! Our private guide provided by Boundless Souls was super knowledgeable, friendly, and attentive. I cannot recommend them enough.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena & Lucas Dupont",
    role: "Honeymoon Travelers",
    country: "France",
    tripType: "Bigogwe Hills & Lake Kivu",
    avatar: "/user/micheal-dam.jpg",
    comment:
      "We spent a week exploring Bigogwe tea fields, traditional Ankole cattle culture, and relaxing on Lake Kivu. Having a private chef prepare gourmet meals at our lakeside villa made our honeymoon feel exceptionally luxurious and intimate.",
    rating: 5,
  },
  {
    id: 4,
    name: "Kwame Mensah",
    role: "Cultural & Lifestyle Visitor",
    country: "Ghana",
    tripType: "Kigali City & Culinary Tour",
    avatar: "/user/micheal-dam.jpg",
    comment:
      "Kigali is a stunning city, full of vibrant art, history, and amazing food. Boundless Souls Tours made our trip stress-free with quick apartment bookings, smooth airport pickups, and a personalized itinerary. Truly top-notch service!",
    rating: 5,
  },
];

export default function CustomerReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const reviewCountRef = useRef<HTMLSpanElement>(null);
  const isReviewCountInView = useInView(reviewCountRef, { once: true });

  useEffect(() => {
    if (isReviewCountInView) {
      const animation = animate(count, 500, { duration: 2 });
      return () => animation.stop();
    }
  }, [count, isReviewCountInView]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[currentIndex];

  return (
    <section id="customer-review" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column - Overview & Ratings */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                TRAVELER STORIES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight font-serif">
                What Our Visitors Say About Their Journey
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Read authentic feedback from travelers who explored Volcanoes National Park, Akagera safaris, Bigogwe hills, Lake Kivu, and Kigali with Boundless Souls Tours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 border-t border-slate-800 pt-8">
              <div>
                <div className="text-4xl font-extrabold text-emerald-400 flex items-center">
                  <motion.span ref={reviewCountRef}>{rounded}</motion.span>+
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  Happy Guests
                </div>
              </div>

              <div className="h-10 w-[1px] bg-slate-800" />

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-extrabold text-white">5.0</span>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Active Testimonial Card */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-950/90 border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
              <Quote className="absolute top-6 right-6 h-20 w-20 text-slate-800/40 pointer-events-none" />

              <CardContent className="p-0 space-y-8 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Header: User Info & Trip Tag */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-emerald-500 shrink-0">
                          <Image
                            src={activeTestimonial.avatar}
                            alt={activeTestimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-snug">
                            {activeTestimonial.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{activeTestimonial.country}</span>
                            <span>•</span>
                            <span className="text-slate-300">{activeTestimonial.role}</span>
                          </div>
                        </div>
                      </div>

                      <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                        {activeTestimonial.tripType}
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-slate-200 text-base sm:text-lg italic leading-relaxed font-serif">
                      &ldquo;{activeTestimonial.comment}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls & Counter */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex ? "w-8 bg-emerald-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      onClick={handlePrev}
                      className="h-10 w-10 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={handleNext}
                      className="h-10 w-10 rounded-full bg-slate-900 border border-slate-700 text-white hover:bg-emerald-600 hover:border-emerald-600 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
