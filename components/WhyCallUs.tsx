"use client";

import { PhoneCall, Clock, Receipt, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * Editorial slab — photo column on left, numbered editorial reassurances on right.
 * Replaces the icon-circle grid with a more mature, less templated layout.
 * Reference: Reliance, Petro — slab with photographic moment + editorial copy.
 */
const POINTS = [
  {
    Icon: PhoneCall,
    title: "Real human dispatch",
    body: "A live dispatcher answers, 24 hours a day. No voicemail, no callback queue.",
  },
  {
    Icon: Clock,
    title: "Same-day appointments",
    body: "Most non-emergency calls get a same-day or next-day window. Emergencies dispatch immediately.",
  },
  {
    Icon: Receipt,
    title: "Flat-rate pricing",
    body: "Repair price quoted before work begins. No per-hour billing surprises after the fact.",
  },
  {
    Icon: BadgeCheck,
    title: "Licensed Master techs",
    body: "State and provincial licensed plumbing, electrical, gas, and HVAC trades. Bonded and insured.",
  },
];

export default function WhyCallUs() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
      {/* LEFT — editorial photograph column */}
      <figure className="relative lg:col-span-5 overflow-hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={IMAGES.editorialBasement}
            alt={IMAGES.editorialBasementAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-800">
          On site, GTA &nbsp;&middot;&nbsp; Same-day repair
        </figcaption>
      </figure>

      {/* RIGHT — numbered editorial points, no cards */}
      <ol className="lg:col-span-7 divide-y divide-steel-200/70 border-t border-b border-steel-200/70">
        {POINTS.map(({ Icon, title, body }, i) => (
          <li key={title} className="relative flex gap-6 py-7 md:py-8">
            <span
              aria-hidden
              className="font-display text-3xl md:text-4xl font-bold tabular-nums leading-none tracking-tight text-cyan-700 pt-1 min-w-[2.5rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2.5">
                <Icon
                  className="h-4 w-4 text-cyan-700"
                  strokeWidth={2.2}
                  aria-hidden
                />
                <h3 className="font-display text-xl md:text-2xl font-semibold text-navy-700 leading-tight tracking-tight">
                  {title}
                </h3>
              </div>
              <p className="mt-2 text-[0.95rem] md:text-base text-steel-700 leading-relaxed max-w-xl">
                {body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
