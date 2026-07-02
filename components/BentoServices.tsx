"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Wrench,
  Zap,
  Wind,
  Hammer,
  Siren,
  Building2,
  Droplet,
  Waves,
  Flame,
  PaintBucket,
  Phone,
} from "lucide-react";
import { SERVICES } from "@/lib/services";
import { serviceImage } from "@/lib/images";
import { NAP } from "@/lib/constants";

const ICONS = {
  Wrench,
  Zap,
  Wind,
  Hammer,
  Siren,
  Building2,
  Droplet,
  Waves,
  Flame,
  PaintBucket,
} as const;

/**
 * Bento layout for homepage services — premium editorial card design
 * with depth, hover scale, and photographic feature cards.
 *
 * Reference quality: Reliance / Petro / Mister Sparky.
 */
export default function BentoServices() {
  const plumbing = SERVICES.find((s) => s.slug === "plumbing")!;
  const electrical = SERVICES.find((s) => s.slug === "electrical")!;
  const hvac = SERVICES.find((s) => s.slug === "hvac")!;
  const general = SERVICES.find((s) => s.slug === "general-maintenance")!;
  const emergency = SERVICES.find((s) => s.slug === "emergency-repairs")!;
  const building = SERVICES.find((s) => s.slug === "building-services")!;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:auto-rows-[minmax(180px,auto)] lg:gap-7">
      {/* FEATURE CARD: Plumbing — 6 cols, 2 rows */}
      <FeatureCard
        service={plumbing}
        className="lg:col-span-6 lg:row-span-2"
      />

      {/* COMPACT WITH PHOTO: Electrical */}
      <PhotoCompactCard
        service={electrical}
        className="lg:col-span-3 lg:row-span-1"
      />

      {/* COMPACT WITH PHOTO: HVAC */}
      <PhotoCompactCard
        service={hvac}
        className="lg:col-span-3 lg:row-span-1"
      />

      {/* MEDIUM CARD: General — 3 cols, 1 row */}
      <CompactCard
        service={general}
        className="lg:col-span-3 lg:row-span-1"
      />

      {/* EMERGENCY CARD with phone CTA — 3 cols, 1 row */}
      <EmergencyCard
        service={emergency}
        className="lg:col-span-3 lg:row-span-1"
      />

      {/* WIDE BANNER: Building Services — full width */}
      <WideBanner
        service={building}
        className="lg:col-span-12"
      />
    </div>
  );
}

/* ========== Feature card (large with full-bleed photo) ========== */
function FeatureCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const Icon = ICONS[service.icon];
  const img = serviceImage(service.slug);
  return (
    <div className={className}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-md border border-steel-100 bg-navy-700 text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl"
      >
        <div className="relative flex-1 min-h-[320px]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-navy-900 via-navy-900/70 to-cyan-700/20"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none"
          />
          {service.emergency && (
            <span className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full bg-cyan-500 px-3.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy-900 shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-navy-900 animate-pulse" />
              24/7 Emergency
            </span>
          )}
        </div>
        <div className="relative p-7 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-md bg-cyan-700 text-white">
              <Icon className="h-6 w-6" strokeWidth={2.2} aria-hidden />
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 group-hover:border-cyan-300 group-hover:bg-cyan-700 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
            Featured trade
          </p>
          <h3 className="mt-2 font-display font-extrabold leading-[1.04] tracking-tight text-white text-balance text-display-3">
            {service.name}
          </h3>
          <p className="mt-4 max-w-md text-base text-white/85 leading-relaxed">
            {service.tagline}
          </p>
          {/* Hover-reveal scope chips */}
          <ul className="mt-6 flex flex-wrap gap-2 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
            {service.scope.slice(0, 4).map((line) => (
              <li
                key={line}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/90"
              >
                {line.split(".")[0].split(",")[0].slice(0, 36)}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}

/* ========== Photo Compact Card (with hero image) ========== */
function PhotoCompactCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const Icon = ICONS[service.icon];
  const img = serviceImage(service.slug);
  return (
    <div className={className}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-md border border-steel-100 bg-white shadow-sm transition-colors duration-200 hover:border-cyan-300"
      >
        {/* Photo header */}
        <div className="relative h-36 md:h-40 overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/15 to-transparent"
          />
          <span className="absolute top-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-cyan-700 shadow-md backdrop-blur-sm transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          {service.emergency && (
            <span className="absolute top-4 right-4 rounded-full bg-cyan-500 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-navy-900">
              24/7
            </span>
          )}
        </div>
        <div className="relative flex-1 flex flex-col justify-between p-6">
          <div>
            <h3 className="font-display text-lg md:text-xl font-bold text-navy-700 leading-tight tracking-tight">
              {service.shortName}
            </h3>
            <p className="mt-2 text-sm text-steel-600 leading-relaxed line-clamp-3">
              {service.tagline}
            </p>
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-800 transition-all group-hover:gap-2 group-hover:text-cyan-700">
            View service
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ========== Compact card (no photo) ========== */
function CompactCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const Icon = ICONS[service.icon];
  return (
    <div className={className}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-steel-100 bg-white p-7 shadow-sm transition-colors duration-200 hover:border-cyan-300"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/0 blur-2xl transition group-hover:bg-cyan-500/20"
        />
        <div className="relative flex items-start justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700 transition-colors duration-300 group-hover:from-cyan-500 group-hover:to-cyan-600 group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          {service.emergency && (
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-cyan-800">
              24/7
            </span>
          )}
        </div>
        <div className="relative mt-6">
          <h3 className="font-display text-lg md:text-xl font-bold text-navy-700 leading-tight tracking-tight">
            {service.shortName}
          </h3>
          <p className="mt-2 text-sm text-steel-600 leading-relaxed line-clamp-3">
            {service.tagline}
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-800 transition-all group-hover:gap-2">
            Explore
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ========== Emergency card with phone CTA ========== */
function EmergencyCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const Icon = ICONS[service.icon];
  return (
    <div className={className}>
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-cyan-700/30 bg-cyan-700 p-7 shadow-md transition-shadow duration-200 hover:shadow-lg">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -right-1/4 h-[140%] w-[60%] bg-white/15 blur-3xl"
        />
        <div className="relative flex items-start justify-between">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900/25 text-white">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/55 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Live
          </span>
        </div>
        <div className="relative mt-6">
          <h3 className="font-display text-lg md:text-xl font-extrabold text-navy-900 leading-tight tracking-tight">
            {service.shortName}
          </h3>
          <p className="mt-2 text-sm text-navy-900/95 leading-relaxed line-clamp-2">
            {service.tagline}
          </p>
          <a
            href={NAP.phoneTel}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-navy-900 active:scale-[0.98]"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="tabular-nums">{NAP.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ========== Wide banner (full row) ========== */
function WideBanner({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const Icon = ICONS[service.icon];
  const img = serviceImage(service.slug);
  return (
    <div className={className}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-md border border-steel-100 bg-white shadow-sm transition-colors duration-200 hover:border-cyan-300 md:flex-row md:items-stretch"
      >
        <div className="relative aspect-[16/9] md:aspect-auto md:w-2/5 overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:bg-gradient-to-r md:from-transparent md:to-white"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-7 md:p-12">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-700">
              <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-800">
              Portfolio play
            </p>
          </div>
          <h3 className="mt-4 font-display font-extrabold text-navy-700 leading-tight tracking-tight text-balance text-display-3">
            {service.name}
          </h3>
          <p className="mt-4 max-w-2xl text-base text-steel-600 leading-relaxed">
            {service.description}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-cyan-700 transition-colors">
            Explore building services
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
