"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
  hidden: { opacity: 0, y: 30 },
};

interface Props {
  features?: FeatureItem[];
}

function FeatureSection({ features }: Props) {
  if (!features || features.length === 0) return null;

  return (
    <section id="feature" className="py-16 md:py-20 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={variants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full border-slate-800 bg-slate-850 p-6 shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all rounded-2xl flex flex-col items-center text-center gap-4 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 transition-transform group-hover:scale-110">
                  <Image
                    width={40}
                    height={40}
                    priority
                    src={feature.icon}
                    alt={feature.title}
                  />
                </div>
                <CardContent className="p-0 space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
