"use client";

import { useEffect, useRef } from "react";
import { loadGoogleMaps, BP_MAP_STYLES, bpMarkerIcon } from "@/lib/googleMapsLoader";

type Pin = { name: string; lat: number; lng: number };

const COVERAGE_PINS: Pin[] = [
  // Canada
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Montreal", lat: 45.5019, lng: -73.5674 },
  { name: "Calgary", lat: 51.0447, lng: -114.0719 },
  { name: "Ottawa", lat: 45.4215, lng: -75.6972 },
  { name: "Edmonton", lat: 53.5461, lng: -113.4938 },
  { name: "Winnipeg", lat: 49.8951, lng: -97.1384 },
  { name: "Halifax", lat: 44.6488, lng: -63.5752 },
  // United States
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", lat: 29.7604, lng: -95.3698 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "Atlanta", lat: 33.749, lng: -84.388 },
  { name: "Dallas", lat: 32.7767, lng: -96.797 },
  { name: "Denver", lat: 39.7392, lng: -104.9903 },
  { name: "Phoenix", lat: 33.4484, lng: -112.074 },
  { name: "Minneapolis", lat: 44.9778, lng: -93.265 },
];

type Props = {
  caption?: string;
  className?: string;
};

export default function AboutCoverageMap({
  caption = "Bridgepoint dispatch across Canada and the US.",
  className,
}: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapDivRef.current) return;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !mapDivRef.current) return;

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapDivRef.current, {
            center: { lat: 46, lng: -96 },
            zoom: 3,
            disableDefaultUI: true,
            gestureHandling: "cooperative",
            styles: BP_MAP_STYLES,
            backgroundColor: "#F5F0E5",
          });
        }

        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = COVERAGE_PINS.map(
          (p) =>
            new google.maps.Marker({
              position: { lat: p.lat, lng: p.lng },
              map: mapRef.current!,
              icon: bpMarkerIcon(),
              title: `${p.name} coverage`,
            })
        );
      })
      .catch((err) => {
        console.warn("[AboutCoverageMap] map load failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure
      className={[
        "relative w-full overflow-hidden rounded-3xl border border-steel-100 bg-cream-100 shadow-soft",
        className ?? "",
      ].join(" ")}
    >
      <div
        ref={mapDivRef}
        className="h-[360px] w-full sm:h-[420px] lg:h-[460px]"
        aria-label="Bridgepoint Maintenance North American coverage map"
        role="img"
      />
      <figcaption className="px-5 py-3 text-xs font-semibold tracking-wide text-navy sm:px-7 sm:py-4 sm:text-sm">
        <span
          className="mr-2 inline-block h-2.5 w-2.5 translate-y-[1px] rounded-full bg-cyan-500"
          aria-hidden
        />
        {caption}
      </figcaption>
    </figure>
  );
}
