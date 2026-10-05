"use client";

import { Fragment, useState } from "react";
import { SubNavigationItem, TabCard, TabDetail } from "@/app/navigation-menu";
import NavigationTabCard from "@/components/navigation-tab-card/navigation-tab-card";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabCardProps {
  catNavDetails: SubNavigationItem[];
  className?: string;
  isSidebar?: boolean;
}

function CategoryNavigation({
  catNavDetails: subNavs,
  className,
  isSidebar,
}: TabCardProps) {
  const [catNavs, setCatNavs] = useState(
    subNavs.map((nav, i) => ({ ...nav, isActive: i === 0 }))
  );

  const handleTabSelected = (selectedNav: SubNavigationItem) => {
    setCatNavs((prev) =>
      prev.map((nav) => ({
        ...nav,
        isActive: nav.label.toLowerCase() === selectedNav.label.toLowerCase(),
      }))
    );
  };

  const activeNav = catNavs.find((nav) => nav.isActive) || catNavs[0];

  if (isSidebar) {
    return (
      <div className="flex flex-col gap-2 py-2">
        {catNavs.map((nav) => (
          <div key={nav.label} className="space-y-2">
            <button
              onClick={() => handleTabSelected(nav)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-lg transition-colors",
                nav.isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <span>{nav.label}</span>
              {nav.isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {nav.isActive && nav.tabDetails && (
              <div className="pl-4 space-y-3 border-l border-slate-800 my-2">
                {nav.tabDetails.map((detail) => (
                  <div key={detail.title} className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {detail.title}
                    </p>
                    {detail.list.map((item) => (
                      <Link
                        key={item.label}
                        href={item.link}
                        className="block text-sm text-slate-300 hover:text-white py-0.5"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "hidden group-hover:flex absolute left-1/2 -translate-x-1/2 top-full w-[900px] rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 gap-6",
        className
      )}
    >
      {/* Category Sidebar List */}
      <div className="w-1/4 border-r border-slate-800 pr-4 space-y-1">
        {catNavs.map((nav) => (
          <button
            key={nav.label}
            onMouseEnter={() => handleTabSelected(nav)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl text-left transition-all",
              nav.isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <span>{nav.label}</span>
            <ChevronRight className="h-4 w-4 opacity-70" />
          </button>
        ))}
      </div>

      {/* Category Details & Card */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {activeNav.tabDetails?.map((tab) => (
            <div key={tab.title} className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {tab.title}
              </h4>
              <ul className="space-y-1.5">
                {tab.list.map((list) => (
                  <li key={list.label}>
                    <Link
                      href={list.link}
                      className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      {list.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {activeNav.tabCard && (
          <div className="col-span-1">
            <NavigationTabCard
              imgLink={activeNav.tabCard.imgSrc || "/navigation-card/tour.jpg"}
              btnText={activeNav.tabCard.btnText || "Learn More"}
              title={activeNav.tabCard.heading || "Things to do on your trip"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryNavigation;
