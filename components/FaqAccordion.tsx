"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { q: string; a: string };

export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-steel-100 rounded-lg border border-steel-100 bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left md:px-5"
            >
              <span className="font-display text-sm font-semibold text-navy md:text-base">
                {item.q}
              </span>
              <span
                className={cn(
                  "inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-steel-200 text-navy transition",
                  isOpen && "border-cyan-500 bg-cyan-700 text-white"
                )}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="px-4 pb-4 text-sm leading-relaxed text-steel-500 md:px-5">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
