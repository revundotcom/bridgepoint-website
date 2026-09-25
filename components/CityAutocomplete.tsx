"use client";

import { useEffect, useRef, useState } from "react";
import { Check, MapPin, X } from "lucide-react";
import { searchLocations, type ResolvedLocation } from "@/lib/location-search";

export type { ResolvedLocation };

interface Props {
  value: ResolvedLocation | null;
  onChange: (location: ResolvedLocation | null) => void;
  onClearError?: () => void;
  error?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  onClearError,
  error,
  required = true,
  className = "",
  inputClassName = "",
}: Props) {
  const [inputValue, setInputValue] = useState(value?.displayText || "");
  const [results, setResults] = useState<ResolvedLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync external value changes (e.g. form reset or pre-population)
  useEffect(() => {
    if (value) {
      setInputValue(value.displayText);
    } else if (!inputValue) {
      setInputValue("");
    }
  }, [value]);

  // Debounced search (~120ms)
  useEffect(() => {
    const query = inputValue.trim();

    // If query matches current resolved location text, don't reopen search
    if (value && query.toLowerCase() === value.displayText.toLowerCase()) {
      return;
    }

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      setActiveIndex(-1);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      const hits = searchLocations(query, 35);
      setResults(hits);
      setIsOpen(true);
      setActiveIndex(hits.length > 0 ? 0 : -1);
      setHasSearched(true);
    }, 120);

    return () => clearTimeout(timer);
  }, [inputValue, value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto scroll active item into view during keyboard navigation
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLLIElement>("li");
      const target = items[activeIndex];
      if (target) {
        target.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  function handleSelect(item: ResolvedLocation) {
    setInputValue(item.displayText);
    onChange(item);
    if (onClearError) onClearError();
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleClear() {
    setInputValue("");
    onChange(null);
    if (onClearError) onClearError();
    setResults([]);
    setIsOpen(false);
    setActiveIndex(-1);
    setHasSearched(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && inputValue.trim().length >= 2) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) {
        const itemToSelect = activeIndex >= 0 && activeIndex < results.length ? results[activeIndex] : results[0];
        if (itemToSelect) {
          handleSelect(itemToSelect);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    if (onClearError) onClearError();
    // If candidate modified text away from selected location, un-verify
    if (value && val.trim().toLowerCase() !== value.displayText.toLowerCase()) {
      onChange(null);
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        City / Residential Location {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input container */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
            <MapPin className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          </div>

          <input
            ref={inputRef}
            type="text"
            name="residential_location_display"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (onClearError) onClearError();
              if (results.length > 0 && inputValue.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            autoComplete="off"
            placeholder="Search city or province (e.g. Toronto, Jaipur, Ontario, Skopje)..."
            className={`w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all ${
              error
                ? "border-red-500 ring-2 ring-red-500/20"
                : "border-slate-200 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
            } ${inputClassName}`}
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear location"
              aria-label="Clear location"
            >
              <X className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Dropdown popup menu underneath */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/5">
            {results.length > 0 ? (
              <ul ref={listRef} role="listbox" className="space-y-0.5">
                {results.map((item, index) => {
                  const isItemActive = index === activeIndex;
                  const isSelected = value?.id === item.id;

                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`group flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        isItemActive || isSelected
                          ? "bg-[#F0FDF7] text-slate-900"
                          : "text-slate-700 hover:bg-[#F0FDF7] hover:text-slate-900"
                      }`}
                    >
                      {/* Country Code Badge without brackets, clean slate-100 pill */}
                      <span className="shrink-0 rounded-md border border-slate-200 bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-bold text-slate-600 tracking-wide">
                        {item.country_code}
                      </span>

                      {/* MapPin Icon in subtle gray outline */}
                      <MapPin
                        className="h-4 w-4 shrink-0 text-slate-400 stroke-[1.75]"
                        aria-hidden="true"
                      />

                      {/* Bold City/State Name & Subtle (State/Province, Country) */}
                      <div className="min-w-0 flex-1 truncate">
                        <span className="font-bold text-slate-900">{item.boldText}</span>
                        <span className="ml-1.5 text-xs text-slate-500 font-normal">
                          {item.subtleText}
                        </span>
                      </div>

                      {/* Checkmark for currently selected item */}
                      {isSelected && (
                        <Check className="ml-auto h-4 w-4 shrink-0 text-[#10B981]" aria-hidden="true" />
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : hasSearched ? (
              <div className="p-4 text-center">
                <p className="text-xs font-medium leading-relaxed text-slate-500">
                  No matching location found. Try searching for a nearby major city, district, or your state/province name.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Hidden inputs to guarantee FormData passes all resolved location keys */}
      <input type="hidden" name="city" value={value?.city || ""} />
      <input type="hidden" name="state" value={value?.state || ""} />
      <input type="hidden" name="province" value={value?.province || ""} />
      <input type="hidden" name="state_province" value={value?.state_province || ""} />
      <input type="hidden" name="country" value={value?.country || ""} />
      <input type="hidden" name="country_code" value={value?.country_code || ""} />
      <input type="hidden" name="residential_location" value={value?.residential_location || ""} />

      {/* Validation error message */}
      {error && !isOpen && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
