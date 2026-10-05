import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

interface BrandProps {
  variant?: "light" | "dark";
  className?: string;
  showText?: boolean;
}

function Brand({
  variant = "dark",
  className,
  showText = true,
}: BrandProps) {
  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer shrink-0", className)}>
      <div className="relative overflow-hidden rounded-full ring-2 ring-emerald-600/30 p-0.5 bg-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
        <Image
          src="/images/logo.jpeg"
          height={44}
          width={44}
          alt="Boundless Souls Tours Logo"
          priority={true}
          className="rounded-full object-cover aspect-square"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={cn(
              "font-extrabold tracking-wide text-base uppercase leading-tight font-serif whitespace-nowrap",
              variant === "light" ? "text-white" : "text-slate-900"
            )}
          >
            BOUNDLESS SOULS
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 whitespace-nowrap">
            TOURS
          </span>
        </div>
      )}
    </div>
  );
}

export default Brand;
