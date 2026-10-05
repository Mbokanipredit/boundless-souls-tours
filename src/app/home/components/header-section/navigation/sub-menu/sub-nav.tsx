import React from "react";
import type { SubNavigationItem } from "@/app/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SubNavProps {
  subMenuDetails: SubNavigationItem[];
  className?: string;
}

function SubMenu({ subMenuDetails: subNavs, className }: SubNavProps) {
  return (
    <ul
      className={cn(
        "hidden group-hover:block absolute left-0 top-full min-w-[200px] rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-xl z-50 animate-in fade-in-50 zoom-in-95",
        className
      )}
    >
      {subNavs.map((subNav) => (
        <li key={subNav.label}>
          <Link
            href={subNav.link || "#"}
            className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {subNav.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SubMenu;
