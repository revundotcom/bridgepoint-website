import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Wind,
  Zap,
  Waves,
  Droplet,
  Hammer,
  ArrowUpRight,
} from "lucide-react";
import { IMAGES } from "@/lib/images";

/**
 * TradesWeCover. 6-tile grid summarizing the broader trade footprint.
 * Used on the homepage and the /property-managers/ page to communicate
 * that Bridgepoint is a multi-trade partner, not just HVAC.
 *
 * Six trades: Plumbing, Heating & Cooling, Electrical, Drain & Sewer,
 * Restoration, Handyman & General Contracting.
 */
type Trade = {
  slug: string;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  image: string;
  alt: string;
};

const TRADES: Trade[] = [
  {
    slug: "plumbing",
    label: "Plumbing",
    description: "Leaks, repipes, fixtures, water mains.",
    Icon: Wrench,
    href: "/services/plumbing",
    image: IMAGES.servicePlumbing,
    alt: IMAGES.servicePlumbingAlt,
  },
  {
    slug: "hvac",
    label: "Heating & Cooling",
    description: "Furnaces, boilers, AC, heat pumps, RTUs.",
    Icon: Wind,
    href: "/services/hvac",
    image: IMAGES.serviceHvac,
    alt: IMAGES.serviceHvacAlt,
  },
  {
    slug: "electrical",
    label: "Electrical",
    description: "Panels, lighting, outlets, EV chargers.",
    Icon: Zap,
    href: "/services/electrical",
    image: IMAGES.serviceElectrical,
    alt: IMAGES.serviceElectricalAlt,
  },
  {
    slug: "sewer-backups",
    label: "Drain and Sewer",
    description: "Hydro jetting, root removal, camera inspection.",
    Icon: Waves,
    href: "/emergency/sewer-backups",
    image: IMAGES.tradeSewerCamera,
    alt: IMAGES.tradeSewerCameraAlt,
  },
  {
    slug: "water-damage",
    label: "Restoration",
    description: "Water mitigation, drying, mould remediation.",
    Icon: Droplet,
    href: "/emergency/water-damage",
    image: IMAGES.tradeRestoration,
    alt: IMAGES.tradeRestorationAlt,
  },
  {
    slug: "drywall-and-painting",
    label: "Drywall and Paint",
    description: "Drywall, paint, fixtures, small renos.",
    Icon: Hammer,
    href: "/services/drywall-and-painting",
    image: IMAGES.tradeDrywall,
    alt: IMAGES.tradeDrywallAlt,
  },
];

export default function TradesWeCover() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TRADES.map(({ slug, label, description, Icon, href, image, alt }) => (
        <li key={slug}>
          <Link
            href={href}
            className="group relative flex h-full flex-col overflow-hidden rounded-md border border-steel-100 bg-white shadow-soft transition-colors hover:border-cyan-500"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-cyan-700 shadow-soft">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-navy leading-tight">
                  {label}
                </h3>
                <ArrowUpRight className="mt-0.5 h-4 w-4 text-steel-500 transition group-hover:text-cyan-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-1.5 text-sm text-steel-500 leading-relaxed">
                {description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
