import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomeLayout from "../home/layout";
import { Sparkles, Heart, Compass, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us - Boundless Souls Tours",
  description:
    "More Than a Tour. A Complete Experience. Discover our story, mission, and commitment to authentic Rwanda travel.",
};

export default function AboutPage() {
  return (
    <HomeLayout>
      <main className="bg-slate-950 text-white min-h-screen pt-28 pb-20">
        {/* Hero Banner */}
        <section className="relative py-20 bg-slate-900 border-b border-slate-800 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-4 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              ABOUT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              More Than a Tour. <br />
              <span className="text-emerald-400">A Complete Experience.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Boundless Souls Tours is dedicated to creating authentic, personalized, and unforgettable experiences across Rwanda.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-12">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white">Our Philosophy</h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  We believe that the best journeys are not just about the places you visit, but also about the people you meet, the culture you experience, the food you taste, and the memories you create.
                </p>
                <p className="text-slate-300 text-base leading-relaxed">
                  From planning your trip and finding the right place to stay to exploring breathtaking destinations and enjoying personalized services, we aim to make your time in Rwanda smooth, exciting, and meaningful.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/40 text-center space-y-3">
                <p className="text-2xl font-serif italic text-emerald-300 font-bold">
                  &ldquo;You bring the curiosity. We help create the experience.&rdquo;
                </p>
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                  BOUNDLESS SOULS TOURS PHILOSOPHY
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <Heart className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Authentic Encounters</h3>
                  <p className="text-xs text-slate-400">
                    Connect directly with local artists, tea farmers, cattle keepers, and conservationists.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <Compass className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Tailored Comfort</h3>
                  <p className="text-xs text-slate-400">
                    Custom itineraries matching your exact pace, budget, and travel preferences.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Complete Support</h3>
                  <p className="text-xs text-slate-400">
                    Stays, private chefs, 4x4 drivers, and airport transfers fully arranged.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6 pt-6">
              <h2 className="text-3xl font-black text-white">Ready to Discover Rwanda with Boundless Souls?</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                Where Every Journey Touches the Soul.
              </p>
              <Link href="/plan-trip">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-6 rounded-full gap-2 shadow-xl shadow-emerald-500/20">
                  <span>Plan Your Journey</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
