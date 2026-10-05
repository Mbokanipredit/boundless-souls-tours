"use client";

import React, { ComponentPropsWithoutRef, RefObject } from "react";
import { MapPin } from "lucide-react";
import { LocationData } from "./useLocationSearchInput";
import { cn } from "@/lib/utils";

type LocationSearchInputProps = {
  queryValue: string;
  locSuggRefPopup: RefObject<HTMLDivElement>;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickInput: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onClickSuggestion: (suggestion: LocationData) => void;
  isSuggFilpToTop: boolean;
  isShowSugg: boolean;
  suggestions: LocationData[];
} & ComponentPropsWithoutRef<"input">;

function LocationSearchInput({
  queryValue,
  onQueryChange,
  onClickSuggestion,
  onClickInput,
  isSuggFilpToTop,
  isShowSugg,
  locSuggRefPopup,
  suggestions,
  className,
  ...inputProps
}: LocationSearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={queryValue}
        onChange={onQueryChange}
        onClick={onClickInput}
        required
        className={cn(
          "w-full border-none bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 placeholder:text-slate-400",
          className
        )}
        {...inputProps}
      />
      {isShowSugg && suggestions.length > 0 && (
        <div
          ref={locSuggRefPopup}
          className={cn(
            "absolute left-0 z-50 w-72 max-h-60 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 animate-in fade-in-50 zoom-in-95",
            isSuggFilpToTop ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          <ul className="space-y-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.city}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
                onClick={() => onClickSuggestion(suggestion)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 block leading-tight">
                    {suggestion.city}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {suggestion.location}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LocationSearchInput;
