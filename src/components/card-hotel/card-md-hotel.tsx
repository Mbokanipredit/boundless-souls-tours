import React from "react";
import { Heart } from "lucide-react";
import { GoogleLocation, Rating, Room } from "@/data/hotel-data";
import { formattedPrice } from "@/util/formatPrice";
import { SwiperImageSlide } from "../slider/swiper-image-slide";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CardHotelProps {
  name: string;
  isFavourite: boolean;
  location: GoogleLocation;
  rating: Rating;
  room: Room;
  badge?: string;
  totalReviews: number;
  images: string[];
}

function CardMdHotel({
  name,
  isFavourite,
  location,
  rating,
  images,
  badge,
  room,
  totalReviews,
}: CardHotelProps) {
  return (
    <Card className="group overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-2xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <SwiperImageSlide images={images} title={name} />
        {badge && (
          <Badge className="absolute left-3 top-3 z-10 bg-blue-600 font-semibold text-white shadow-sm">
            {badge}
          </Badge>
        )}
        <button
          aria-label="Add to favourites"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-gray-700 shadow-md transition-colors hover:bg-white hover:text-red-500"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavourite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      <CardContent className="p-5 flex flex-col justify-between gap-3">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {location.address}, {location.city}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="flex h-7 px-2.5 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
            {rating.score}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {rating.type}
          </span>
          <span className="text-xs text-muted-foreground">
            ({totalReviews} reviews)
          </span>
        </div>

        <div className="mt-2 border-t border-border/50 pt-3 flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">Starting from</span>
          <p className="text-base font-bold text-foreground">
            <span className="text-xl font-extrabold text-blue-600">
              {room.price.currency}
              {formattedPrice(room.price.amount, room.price.currency)}
            </span>
            <span className="text-xs font-normal text-muted-foreground"> / night</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardMdHotel;
