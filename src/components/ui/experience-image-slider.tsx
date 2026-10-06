"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

interface ExperienceImageSliderProps {
  images: string[];
  alt: string;
  badge?: string;
  className?: string;
  autoPlayInterval?: number;
}

export default function ExperienceImageSlider({
  images,
  alt,
  badge,
  className = "",
  autoPlayInterval = 4000,
}: ExperienceImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize images array
  const imageList = Array.isArray(images) && images.length > 0 ? images : ["/images/pics/1.jpeg"];

  // Auto-play slideshow when not hovered
  useEffect(() => {
    if (imageList.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageList.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [imageList.length, isHovered, autoPlayInterval]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden group select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Current Image */}
      {imageList.map((src, index) => (
        <div
          key={src + index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
          }`}
        >
          <Image
            src={src}
            alt={`${alt} - photo ${index + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none z-10" />

      {/* Top Left Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-extrabold text-xs tracking-wider shadow-lg border border-emerald-400/30">
            {badge}
          </span>
        </div>
      )}

      {/* Top Right Photo Count Indicator */}
      {imageList.length > 1 && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold border border-slate-700/60 shadow-md">
          <Images className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {currentIndex + 1} / {imageList.length}
          </span>
        </div>
      )}

      {/* Left/Right Navigation Arrows (Visible on hover or when multiple images exist) */}
      {imageList.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous Image"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-emerald-600 text-white backdrop-blur-md border border-slate-700/60 transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleNext}
            type="button"
            aria-label="Next Image"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-emerald-600 text-white backdrop-blur-md border border-slate-700/60 transition-all duration-200 opacity-80 group-hover:opacity-100 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Bottom Dot Indicators */}
      {imageList.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-slate-800/80">
          {imageList.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(e, idx)}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-emerald-400"
                  : "w-2 bg-slate-400/50 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
