import React, { forwardRef } from "react";
import { Minus, Plus } from "lucide-react";
import { CounterKey, type CounterState } from "./use-guest-input";
import { cn } from "@/lib/utils";

interface GuestInputPopupProps {
  onIncrement: (type: CounterKey) => void;
  onDecrement: (type: CounterKey) => void;
  guestPopupFlipToTop: boolean;
  onVisibilityChange?: () => void;
  CounterState: CounterState;
}

const GuestInputPopup = forwardRef<HTMLDivElement, GuestInputPopupProps>(
  ({ onIncrement, onDecrement, guestPopupFlipToTop, CounterState }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute right-0 z-50 w-72 p-4 bg-white rounded-2xl shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50 zoom-in-95",
          guestPopupFlipToTop ? "bottom-full mb-2" : "top-full mt-2"
        )}
      >
        {/* Adults */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Adults</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onDecrement(CounterKey.ADULTS)}
              type="button"
              disabled={CounterState.adults === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-slate-900">
              {CounterState.adults}
            </span>
            <button
              onClick={() => onIncrement(CounterKey.ADULTS)}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Children</span>
            <span className="text-[11px] text-slate-400 font-medium">Ages 0 - 17</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onDecrement(CounterKey.CHILDREN)}
              type="button"
              disabled={CounterState.children === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-slate-900">
              {CounterState.children}
            </span>
            <button
              onClick={() => onIncrement(CounterKey.CHILDREN)}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Rooms</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onDecrement(CounterKey.ROOMS)}
              type="button"
              disabled={CounterState.rooms === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-5 text-center text-sm font-bold text-slate-900">
              {CounterState.rooms}
            </span>
            <button
              onClick={() => onIncrement(CounterKey.ROOMS)}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

GuestInputPopup.displayName = "GuestInputPopup";

export default GuestInputPopup;
