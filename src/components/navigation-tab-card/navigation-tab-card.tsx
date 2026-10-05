import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NavigationTabCardProps {
  imgLink: string;
  imgSize?: {
    width: number;
    height: number;
  };
  title: string;
  btnText: string;
}

function NavigationTabCard({
  imgLink,
  title,
  btnText,
}: NavigationTabCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl h-[260px] w-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Image
        fill
        alt={title}
        priority
        src={imgLink}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col items-start gap-3">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        <Link
          href="/home"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 transition-all hover:bg-white hover:text-blue-600 shadow-sm"
        >
          <span>{btnText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default NavigationTabCard;
