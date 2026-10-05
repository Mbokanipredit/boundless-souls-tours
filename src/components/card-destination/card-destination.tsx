import Image from "next/image";
import React, { ComponentPropsWithoutRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CardDestinationProps = {
  imgLink: string;
  title: string;
  size: "xs" | "sm" | "md" | "lg";
  extraSmallText?: string;
} & ComponentPropsWithoutRef<"article">;

function CardDestination({
  imgLink,
  title,
  size,
  extraSmallText,
  className,
  ...rest
}: CardDestinationProps) {
  if (size === "lg") {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-[380px] w-full",
          className
        )}
        {...rest}
      >
        <Image
          src={imgLink}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col items-start gap-2">
          {extraSmallText && (
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              {extraSmallText}
            </span>
          )}
          <h3 className="text-2xl font-extrabold text-white">{title}</h3>
          <Button
            variant="brand"
            size="sm"
            className="mt-2 rounded-full font-medium"
          >
            Discover
          </Button>
        </div>
      </article>
    );
  }

  const heightClasses = {
    md: "h-[280px]",
    sm: "h-[220px]",
    xs: "h-[170px]",
  };

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full",
        heightClasses[size] || "h-[240px]",
        className
      )}
      {...rest}
    >
      <Image
        src={imgLink}
        alt={title}
        fill
        priority
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        {extraSmallText && (
          <p className="text-xs text-gray-300 mt-0.5">{extraSmallText}</p>
        )}
      </div>
    </article>
  );
}

export default CardDestination;
