"use client";

import { City, updatedDestinationData } from "@/data/destination-data";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatNumber } from "@/util/formatNumber";
import { cn } from "@/lib/utils";

function DestinationSection() {
  const [isMount, setIsMount] = useState(false);
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [tabCities, setTabCities] = useState<City[]>(
    updatedDestinationData["all"]
  );

  const tabs = Object.keys(updatedDestinationData).map((value, i) => ({
    id: i + 1,
    value,
  }));

  const handleTabClick = (tab: { id: number; value: string }) => {
    if (!tab.value) return;
    setTabCities(updatedDestinationData[tab.value]);
    setActiveTabId(tab.id);
  };

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
  }, [isMount]);

  if (!isMount) {
    return null;
  }

  return (
    <section id="destination" className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Destinations We Love
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Explore curated locations offering rich history, culture, and memorable stays
          </p>
        </div>

        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <Button
                  key={tab.id}
                  type="button"
                  variant={isActive ? "brand" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all",
                    !isActive && "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  )}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.value}
                </Button>
              );
            })}
          </div>

          {/* Grid list of cities */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tabCities.map((city, i) => (
              <li key={i}>
                <Link
                  href="#"
                  className="group flex flex-col p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
                >
                  <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {city.city}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 font-medium">
                    {formatNumber(city.properties)} properties
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default DestinationSection;
