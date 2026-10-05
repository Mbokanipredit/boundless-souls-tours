"use client";

import type { NavigationItem as NavItemType } from "@/app/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import CategoryNavigation from "./category-navigation/category-navigation";
import SubMenu from "./sub-menu/sub-nav";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  navigationContent: NavItemType[];
  isSidebar: boolean;
}

function NavigationItem({
  navigationContent,
  isSidebar,
}: NavigationItemProps) {
  const path = usePathname();
  const [navs, setNavs] = useState<NavItemType[]>(
    navigationContent.map((item) => ({
      ...item,
      isSubnavActive: false,
    }))
  );

  const handleSubnavToggle = (label: string) => {
    setNavs((prev) =>
      prev.map((nav) =>
        nav.label.toLowerCase() === label.toLowerCase()
          ? { ...nav, isSubnavActive: !nav.isSubnavActive }
          : nav
      )
    );
  };

  if (isSidebar) {
    return (
      <ul className="flex flex-col gap-2 w-full">
        {navs.map((nav, idx) => (
          <li key={idx} className="w-full">
            <div className="flex flex-col w-full">
              <button
                onClick={() => handleSubnavToggle(nav.label)}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2.5 text-base font-semibold rounded-xl transition-colors",
                  nav.link === path ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-slate-800"
                )}
              >
                <span>{nav.label}</span>
                {nav.subnav && (
                  nav.isSubnavActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {nav.subnav && nav.isSubnavActive && (
                <div className="pl-4 mt-2">
                  {nav.label.toLowerCase() === "categories" ? (
                    <CategoryNavigation
                      catNavDetails={nav.subnav}
                      isSidebar={true}
                    />
                  ) : (
                    <ul className="space-y-1 border-l border-slate-800 pl-3">
                      {nav.subnav.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.link || "#"}
                            className="block py-1.5 text-sm font-medium text-slate-300 hover:text-white"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex items-center gap-1">
      {navs.map((nav, idx) => {
        const isActive = nav.link === path || (nav.link === "/" && path === "/home");
        return (
          <li key={idx} className="relative group px-1 py-2">
            <Link
              href={nav.link}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all",
                isActive
                  ? "text-blue-400 bg-slate-800/80"
                  : "text-slate-200 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <span>{nav.label}</span>
              {nav.subnav && <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:rotate-180" />}
            </Link>

            {nav.subnav && nav.label.toLowerCase() !== "categories" && (
              <SubMenu subMenuDetails={nav.subnav} />
            )}

            {nav.subnav && nav.label.toLowerCase() === "categories" && (
              <CategoryNavigation catNavDetails={nav.subnav} isSidebar={false} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default NavigationItem;
