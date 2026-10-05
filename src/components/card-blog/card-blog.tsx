import React from "react";
import Image from "next/image";
import { formatDate } from "@/util/formatDate";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardBlogProps {
  imgLink: string;
  title: string;
  size?: "sm" | "md" | "lg";
  shadow?: "none" | "shadow-subtle" | "shadow-soft";
  date: Date;
  extraSmallText?: string;
}

function CardBlog({
  imgLink,
  title,
  size = "lg",
  date,
  extraSmallText,
}: CardBlogProps) {
  return (
    <Card className="group overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={imgLink}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-5 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Calendar className="h-3.5 w-3.5 text-blue-600" />
          <span>{formatDate(date)}</span>
        </div>

        <h3 className="line-clamp-2 text-base font-bold text-foreground group-hover:text-blue-600 transition-colors leading-snug">
          {title}
        </h3>

        {extraSmallText && (
          <p className="line-clamp-2 text-xs text-muted-foreground mt-1">
            {extraSmallText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default CardBlog;
