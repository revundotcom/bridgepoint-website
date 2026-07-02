"use client";

import { Star, Quote } from "lucide-react";

// Anonymized stand-in reviews. Replace with real Google reviews as collection workflow comes online.
const REVIEWS = [
  {
    name: "Property Manager",
    location: "Vaughan, ON",
    body: "Called at 11pm on a Sunday for a burst riser in a 40-unit building. Tech was on site within 90 minutes, isolated the line, and had a permanent repair scheduled by Tuesday with photo documentation. Single invoice, single point of contact, no finger-pointing between trades.",
  },
  {
    name: "Multifamily Owner",
    location: "Toronto, ON",
    body: "Switched our HVAC and plumbing dispatch to Bridgepoint after years of bouncing between vendors. The consolidated monthly invoice alone saves my office two days of reconciliation. Response times have been within posted windows on every single ticket so far.",
  },
  {
    name: "Commercial Owner",
    location: "Mississauga, ON",
    body: "Code-compliance work on a mixed-use property that the previous contractor left half-finished. Bridgepoint diagnosed it accurately, gave me a flat-rate quote before any work started, and finished on time with all paperwork ready for the inspector.",
  },
  {
    name: "Director of Operations",
    location: "Greater Toronto Area",
    body: "Their preventative maintenance contract has caught two small problems before they turned into capital projects. The before-and-after photo log on every visit makes board reporting straightforward.",
  },
  {
    name: "Property Manager",
    location: "Markham, ON",
    body: "After-hours dispatcher actually answers and actually understands the trade. That is rarer than it should be. Tickets close with documentation that matches the work performed, not generic boilerplate. Genuine accountability.",
  },
];

export default function ReviewsPlaceholder() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className={
              "group relative flex flex-col overflow-hidden border-t border-cyan-700/40 bg-white p-8 md:p-10 shadow-sm transition-colors duration-200 hover:border-cyan-700 " +
              (i === 0 ? "lg:col-span-2" : "")
            }
          >
            {/* Monumental quote glyph — bumped from 9rem to 14rem, restrained color */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 right-4 select-none font-display italic text-[14rem] leading-none text-cyan-700/10"
            >
              &ldquo;
            </span>

            <header className="relative flex items-center justify-between">
              <ul
                className="flex items-center gap-0.5"
                aria-label="Five-star rating"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-cyan-700 text-cyan-700"
                  />
                ))}
              </ul>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-800">
                <Quote className="h-3 w-3" />
                Google review
              </span>
            </header>

            <blockquote
              className={
                "relative mt-5 font-display text-navy-700 leading-[1.35] tracking-tight text-balance flex-1 " +
                (i === 0
                  ? "text-xl md:text-2xl lg:text-[1.65rem]"
                  : "text-lg md:text-xl")
              }
              style={{ letterSpacing: "-0.018em" }}
            >
              {r.body}
            </blockquote>

            <footer className="relative mt-6 flex items-center gap-3 border-t border-steel-100 pt-5">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-700 text-white font-display font-bold text-sm"
              >
                {r.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-700">{r.name}</p>
                <p className="text-xs text-steel-500">{r.location}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
