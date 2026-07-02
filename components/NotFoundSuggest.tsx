"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ArrowUpRight, MapPin, AlertTriangle, Phone } from "lucide-react";
import bundle from "@/lib/silo/content.json";
import { NAP } from "@/lib/constants";

type SiloPage = {
  type: string;
  url: string;
  city?: string;
  city_key?: string;
  state_abbr?: string;
  state?: string;
  service_slug?: string;
  service_label?: string;
  lat?: number;
  lng?: number;
};

const ALL_PAGES = bundle.pages as SiloPage[];
const CITY_HUBS = ALL_PAGES.filter((p) => p.type === "city_hub");

// All known state abbreviations we cover.
const KNOWN_STATES = new Set(["on", "ca", "tx", "fl", "ny", "il"]);

// All silo service slugs.
const KNOWN_SERVICES = new Set([
  "plumbing",
  "electrical",
  "hvac",
  "carpentry",
  "drywall-and-painting",
  "general-repairs",
  "preventative-maintenance",
  "unit-turnovers",
  "commercial-contracting",
  "tenant-fit-outs",
  "facility-maintenance",
  "building-upkeep",
  "emergency-plumbing",
  "emergency-electrical",
  "emergency-hvac",
  "maintenance-services",
  "emergency",
]);

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  const dp = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) dp[j] = j;
  for (let i = 1; i <= al; i++) {
    let prev = i - 1;
    dp[0] = i;
    for (let j = 1; j <= bl; j++) {
      const tmp = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[bl];
}

function haversine(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

type Parsed = {
  citySlug: string;
  stateAbbr: string;
  serviceSlug: string;
};

// Parse a URL like /loretto-on-plumbing -> { city: "loretto", state: "on", service: "plumbing" }
function parseSiloUrl(path: string): Parsed | null {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!clean) return null;
  const parts = clean.split("-");
  if (parts.length < 2) return null;

  // Walk backwards to find the state slug (2-letter abbr)
  let stateIdx = -1;
  for (let i = parts.length - 1; i >= 1; i--) {
    if (KNOWN_STATES.has(parts[i].toLowerCase())) {
      stateIdx = i;
      break;
    }
  }
  if (stateIdx === -1) return null;

  const citySlug = parts.slice(0, stateIdx).join("-");
  const stateAbbr = parts[stateIdx];
  const serviceSlug = parts.slice(stateIdx + 1).join("-") || "maintenance-services";

  return { citySlug, stateAbbr, serviceSlug };
}

export default function NotFoundSuggest() {
  const pathname = usePathname() || "";

  const suggestions = useMemo(() => {
    const parsed = parseSiloUrl(pathname);
    if (!parsed) return [];

    const sameStateHubs = CITY_HUBS.filter(
      (h) => h.state_abbr?.toLowerCase() === parsed.stateAbbr
    );

    if (sameStateHubs.length === 0) return [];

    // Rank by string similarity on city slug, tiebreak by geographic proximity if possible.
    const ranked = sameStateHubs
      .map((h) => {
        const hubCitySlug = h.url
          .replace(/^\//, "")
          .replace(/-maintenance-services$/, "")
          .replace(/-[a-z]{2}$/, "");
        const dist = levenshtein(parsed.citySlug, hubCitySlug);
        return { hub: h, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 4);

    // Build href: prefer the requested service slug if known, else city hub.
    const serviceIsKnown = KNOWN_SERVICES.has(parsed.serviceSlug);
    return ranked.map(({ hub }) => {
      const base = hub.url.replace(/-maintenance-services$/, "");
      let href: string;
      let label: string;
      if (parsed.serviceSlug === "emergency") {
        href = `${base}-emergency`;
        label = `${hub.city}, ${hub.state_abbr} emergency`;
      } else if (serviceIsKnown && parsed.serviceSlug !== "maintenance-services") {
        href = `${base}-${parsed.serviceSlug}`;
        // If the service-in-city page exists in the bundle, point straight there;
        // otherwise fall back to the city hub which covers every trade.
        const exists = ALL_PAGES.some((p) => p.url === href);
        if (!exists) {
          href = hub.url;
          label = `${hub.city}, ${hub.state_abbr} maintenance`;
        } else {
          label = `${hub.city}, ${hub.state_abbr}`;
        }
      } else {
        href = hub.url;
        label = `${hub.city}, ${hub.state_abbr}`;
      }
      return { href, label };
    });
  }, [pathname]);

  if (suggestions.length === 0) return null;

  return (
    <section className="bg-cream-100 section-tight">
      <div className="container-bp max-w-4xl">
        <div className="rounded-2xl border border-steel-100 bg-white p-7 shadow-soft md:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-800">
            Closest coverage we run
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy md:text-3xl">
            We do not have a page for that city yet.
          </h2>
          <p className="mt-3 text-base text-steel-600">
            Bridgepoint dispatches across Canada and the US. The closest cities
            we cover in the same state or province are listed below. If your
            address is between coverage zones, call dispatch and we will route a
            licensed trade.
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-steel-100 bg-steel-50/40 p-4 transition hover:border-cyan-500 hover:bg-white hover:shadow-soft"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-white text-cyan-700">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="font-display text-sm font-semibold text-navy">
                      {s.label}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-cyan-700 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={NAP.phoneTel} className="btn-accent">
              <Phone className="h-4 w-4" />
              {NAP.phone}
            </a>
            <Link href="/service-areas" className="btn-secondary">
              See every coverage zone
            </Link>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emergency-700">
            <AlertTriangle className="h-3.5 w-3.5" />
            For an active emergency, call dispatch first
          </p>
        </div>
      </div>
    </section>
  );
}
