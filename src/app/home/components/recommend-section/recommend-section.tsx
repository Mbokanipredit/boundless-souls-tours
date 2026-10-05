"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { navigationMenu } from "@/app/navigation-menu";
import CardMdHotel from "@/components/card-hotel/card-md-hotel";
import { hotels } from "@/data/hotel-data";
import { Button } from "@/components/ui/button";

function RecommendSection() {
  const [_, setInit] = useState<boolean>();
  const prevArrowRef = useRef<HTMLButtonElement>(null);
  const nextArrowRef = useRef<HTMLButtonElement>(null);

  const categories = navigationMenu
    .filter((menuLabel) => menuLabel.label.toLowerCase() === "categories")[0]
    ?.subnav?.map((cat) => cat.label);

  return (
    <section id="recommend" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Recommended
              </h2>
              <p className="mt-2 text-base text-muted-foreground font-medium">
                Hand-picked places for your best travel experience
              </p>
            </div>

            {categories && (
              <select className="h-10 rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-blue-600">
                {categories.map((cat) => (
                  <option key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={4}
              spaceBetween={24}
              breakpoints={{
                1280: { slidesPerView: 4, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                0: { slidesPerView: 1, spaceBetween: 16 },
              }}
              navigation={{
                prevEl: prevArrowRef.current,
                nextEl: nextArrowRef.current,
              }}
              onInit={() => setInit(true)}
              className="py-4"
            >
              {hotels
                .filter((hotel) => hotel.isRecommend)
                .map((hotel) => (
                  <SwiperSlide key={hotel.hotelId}>
                    <Link href="#">
                      <CardMdHotel
                        images={hotel.images! as string[]}
                        isFavourite={hotel.isFavourite}
                        location={hotel.location}
                        rating={hotel.rating}
                        room={hotel.room}
                        totalReviews={hotel.totalReviews}
                        badge={hotel.badge}
                        name={hotel.name}
                      />
                    </Link>
                  </SwiperSlide>
                ))}

              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  ref={prevArrowRef}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-11 w-11 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <Button
                  ref={nextArrowRef}
                  variant="outline"
                  size="icon"
                  className="rounded-full h-11 w-11 border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RecommendSection;
