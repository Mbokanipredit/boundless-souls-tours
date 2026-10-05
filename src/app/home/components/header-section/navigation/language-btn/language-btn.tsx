import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LanguageBtnProps = PropsWithChildren &
  ComponentPropsWithoutRef<"button"> & {
    flagCode?: string;
    countryCode?: string;
  };

function LanguageBtn({
  children,
  countryCode = "US",
  className,
  ...props
}: LanguageBtnProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-slate-800/60",
        className
      )}
      {...props}
    >
      <Image
        width={20}
        height={20}
        src={`https://flagsapi.com/${countryCode}/flat/24.png`}
        alt="flag"
        className="rounded-full shrink-0"
      />
      <div className="flex items-center gap-1">{children}</div>
    </button>
  );
}

export default LanguageBtn;
