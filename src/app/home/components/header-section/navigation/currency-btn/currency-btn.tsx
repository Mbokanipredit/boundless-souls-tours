import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CurrencyBtnProps = PropsWithChildren & ComponentPropsWithoutRef<"button">;

function CurrencyBtn({ children, className, ...props }: CurrencyBtnProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-slate-800/60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default CurrencyBtn;
