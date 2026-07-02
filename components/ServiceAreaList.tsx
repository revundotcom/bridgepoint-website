"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

/**
 * Editorial slab — full-bleed customer-door photograph on left,
 * dignified two-column city list on right. Replaces the prior 12-card grid
 * with a more mature, less templated treatment.
 */
type CityLink = {
  name: string;
  slug: string;
};

const TOP_CITIES: CityLink[] = [
  { name: "Toronto", slug: "toronto" },
  { name: "Vaughan", slug: "vaughan" },
  { name: "Mississauga", slug: "mississauga" },
  { name: "Brampton", slug: "brampton" },
  { name: "Markham", slug: "markham" },
  { name: "Richmond Hill", slug: "richmond-hill" },
  { name: "Oakville", slug: "oakville" },
  { name: "Hamilton", slug: "hamilton" },
  { name: "Burlington", slug: "burlington" },
  { name: "Milton", slug: "milton" },
  { name: "Pickering", slug: "pickering" },
  { name: "Ajax", slug: "ajax" },
];

export default function ServiceAreaList() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-stretch">
      {/* LEFT — full-bleed editorial photograph */}
      <figure className="relative lg:col-span-6 overflow-hidden bg-navy-900">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full">
          <Image
            src={IMAGES.editorialDoor}
            alt={IMAGES.editorialDoorAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/15 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              At your door, on schedule
            </p>
            <p className="mt-2 font-display text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight max-w-md">
              One dispatch line for every trade across the GTA.
            </p>
          </div>
        </div>
      </figure>

      {/* RIGHT — city list, two columns, no cards */}
      <div className="lg:col-span-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-800">
          Where we run, every day
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1 border-t border-steel-200/70">
          {TOP_CITIES.map((c) => (
            <li key={c.slug} className="border-b border-steel-200/70">
              <Link
                href={`/locations/${c.slug}`}
                className="group flex items-center justify-between gap-3 py-3.5 text-navy-700 transition-colors duration-200 hover:text-cyan-700"
              >
                <span className="font-display text-lg md:text-xl font-semibold tracking-tight">
                  {c.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-steel-300 transition-colors duration-200 group-hover:text-cyan-700" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 underline underline-offset-4 decoration-cyan-500/60 hover:text-cyan-800 hover:decoration-cyan-700 transition-colors"
          >
            See every city we serve across Canada and the US
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
