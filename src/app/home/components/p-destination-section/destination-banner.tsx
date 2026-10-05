import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  btnText: string;
  imgLink: string;
  width?: number;
  height?: number;
  captionText?: string;
}

function DestinationBanner({
  title,
  btnText,
  imgLink,
  captionText,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl h-[260px] sm:h-[300px] w-full shadow-lg transition-all duration-300 hover:shadow-2xl">
      <Image
        alt={title}
        src={imgLink}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 max-w-md gap-3">
        {captionText && (
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {captionText}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <Button variant="brand" className="mt-2 rounded-full font-semibold px-6 shadow-md">
          {btnText}
        </Button>
      </div>
    </div>
  );
}

export default DestinationBanner;
