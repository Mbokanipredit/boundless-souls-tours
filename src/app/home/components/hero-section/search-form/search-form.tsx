"use client";

import type { FormEvent } from "react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import GuestInputPopup from "@/components/ui/inputs/guest-input-popup/guest-input-popup";
import { useGuestInput } from "@/components/ui/inputs/guest-input-popup/use-guest-input";

import LocationSearchInput from "@/components/ui/inputs/location-search-input/location-search-input";
import { useLocationSearchInput } from "@/components/ui/inputs/location-search-input/useLocationSearchInput";

import MyDateRange from "@/components/ui/inputs/my-date-range/my-date-range";
import { useDateRange } from "@/components/ui/inputs/my-date-range/useDateRange";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SearchForm() {
  const isTabletPortrait = useMediaQuery({ query: "(max-device-width: 900px)" });

  const {
    handleChange,
    selectedDateRange,
    onRangeFocusChange,
    isVisible,
    dateRangeRef,
    popupDateRangeRef,
    isDateFlipToTop,
    onVisibilityChange,
    formattedDateRangeVal: { startDate, endDate },
  } = useDateRange();

  const {
    onInputChange,
    onClickInput,
    isShowSugg,
    isSuggFilpToTop,
    locSuggRefPopup,
    locSuggInputRef,
    query,
    suggestions,
    onSugLocClick,
  } = useLocationSearchInput();

  const {
    state: counterState,
    popupRef: guestPopupRef,
    rootElRef: guestRootElRef,
    handleDecrement,
    handleIncrement,
    onGuestPopupVisibility,
    popupFlipToTop: guestPopupFlipToTop,
  } = useGuestInput();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query && selectedDateRange && counterState) {
      const FormData = {
        query: query.trim(),
        checkInOutDate: {
          startDate: selectedDateRange.startDate,
          endDate: selectedDateRange.endDate,
        },
        guests: {
          adults: counterState.adults,
          children: counterState.children,
          room: counterState.rooms,
        },
      };
      console.log(FormData);
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row items-stretch md:items-center justify-between bg-white text-gray-900 rounded-2xl md:rounded-full p-2 md:p-3 shadow-2xl gap-3 border border-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 gap-2 md:gap-0">
        {/* Location Input */}
        <div
          className="relative flex flex-col justify-center px-4 py-2 hover:bg-slate-50 transition-colors rounded-xl md:rounded-l-full cursor-pointer"
          ref={locSuggInputRef}
        >
          <div className="flex items-center gap-2 mb-1 text-slate-500">
            <MapPin className="h-4 w-4 text-blue-600" />
            <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Location
            </label>
          </div>
          <LocationSearchInput
            onQueryChange={onInputChange}
            queryValue={query}
            onClickInput={onClickInput}
            suggestions={suggestions}
            isShowSugg={isShowSugg}
            locSuggRefPopup={locSuggRefPopup}
            onClickSuggestion={onSugLocClick}
            isSuggFilpToTop={isSuggFilpToTop}
            placeholder="Where are you going?"
            id="location"
            name="location"
            autoComplete="off"
            className="w-full border-none bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 placeholder:text-slate-400"
          />
        </div>

        {/* Date Input */}
        <div
          className="relative flex flex-col justify-center px-4 py-2 hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
          ref={dateRangeRef}
        >
          <div className="flex items-center gap-2 mb-1 text-slate-500">
            <Calendar className="h-4 w-4 text-blue-600" />
            <label htmlFor="checkin" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Check in - Check out
            </label>
          </div>
          <input
            onClick={onVisibilityChange}
            className="w-full border-none bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 cursor-pointer placeholder:text-slate-400"
            value={`${startDate} - ${endDate}`}
            readOnly
            required
          />

          {isVisible && (
            <div
              ref={popupDateRangeRef}
              className={cn(
                "absolute left-0 z-50 mt-2 p-2 bg-white rounded-2xl shadow-2xl border border-gray-200",
                isDateFlipToTop ? "bottom-full mb-2" : "top-full mt-2"
              )}
            >
              <MyDateRange
                onChange={handleChange}
                ranges={[selectedDateRange]}
                onVisibleChange={onVisibilityChange}
                onRangeFocusChange={onRangeFocusChange}
                months={isTabletPortrait ? 1 : 2}
              />
            </div>
          )}
        </div>

        {/* Guest Input */}
        <div
          className="relative flex flex-col justify-center px-4 py-2 hover:bg-slate-50 transition-colors rounded-xl md:rounded-r-full cursor-pointer"
          ref={guestRootElRef}
        >
          <div className="flex items-center gap-2 mb-1 text-slate-500">
            <Users className="h-4 w-4 text-blue-600" />
            <label htmlFor="guest" className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Guests
            </label>
          </div>
          <input
            id="guest"
            className="w-full border-none bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 cursor-pointer truncate"
            onClick={() => onGuestPopupVisibility()}
            value={`${counterState.adults} adults · ${counterState.children} children · ${counterState.rooms} room`}
            required
            readOnly
          />

          {counterState.isVisible && (
            <GuestInputPopup
              CounterState={counterState}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              onVisibilityChange={onGuestPopupVisibility}
              guestPopupFlipToTop={guestPopupFlipToTop}
              ref={guestPopupRef}
            />
          )}
        </div>
      </div>

      <Button
        size="lg"
        variant="brand"
        type="submit"
        className="rounded-xl md:rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <Search className="h-5 w-5" />
        <span>Search</span>
      </Button>
    </form>
  );
}

export default SearchForm;
