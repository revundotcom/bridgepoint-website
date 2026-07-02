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
} from "lucide-react";
import type { Service } from "@/lib/services";
import { serviceImage } from "@/lib/images";

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

type Variant = "image" | "icon";

export default function ServiceCard({
  service,
  variant = "image",
}: {
  service: Service;
  variant?: Variant;
}) {
  const Icon = ICONS[service.icon];

  if (variant === "icon") {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-steel-100 bg-white p-7 transition hover:-translate-y-0.5 hover:border-navy hover:shadow-card"
      >
        <div className="flex items-start justify-between mb-5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-cyan-700 group-hover:bg-accent group-hover:text-white transition">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          {service.emergency && (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cyan-800">
              24/7
            </span>
          )}
        </div>
        <h3 className="font-display text-xl font-semibold text-navy mb-2">
          {service.shortName}
        </h3>
        <p className="text-sm text-steel-500 mb-5 flex-1 leading-relaxed">
          {service.tagline}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-cyan-700">
          Explore service
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    );
  }

  const img = serviceImage(service.slug);
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-steel-100 bg-white shadow-soft transition-colors hover:border-cyan-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent" />
        {service.emergency && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-cyan-700 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            24/7 Emergency
          </span>
        )}
        <span className="absolute bottom-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-navy shadow-soft">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-navy mb-2">
          {service.name}
        </h3>
        <p className="text-sm text-steel-500 mb-5 flex-1 leading-relaxed">
          {service.tagline}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:text-cyan-700">
          Explore {service.shortName.toLowerCase()}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
