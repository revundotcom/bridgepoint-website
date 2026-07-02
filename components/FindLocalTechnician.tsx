"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapPin, Search, Navigation2, Phone, Loader2 } from "lucide-react";
import { NAP } from "@/lib/constants";
import { loadGoogleMaps, BP_MAP_STYLES, bpMarkerIcon } from "@/lib/googleMapsLoader";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
};

const COVERAGE_HINTS = [
  "Toronto",
  "Vancouver",
  "Montreal",
  "Calgary",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
];

const COVERAGE_PINS: { name: string; lat: number; lng: number }[] = [
  { name: "Toronto", lat: 43.6532, lng: -79.3832 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Montreal", lat: 45.5019, lng: -73.5674 },
  { name: "Calgary", lat: 51.0447, lng: -114.0719 },
  { name: "Ottawa", lat: 45.4215, lng: -75.6972 },
  { name: "Edmonton", lat: 53.5461, lng: -113.4938 },
  { name: "Winnipeg", lat: 49.8951, lng: -97.1384 },
  { name: "Halifax", lat: 44.6488, lng: -63.5752 },
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

type Status = "idle" | "loading" | "success" | "error";

export default function FindLocalTechnician({
  variant = "light",
  className,
  compact = false,
}: Props) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const placeRef = useRef<google.maps.places.PlaceResult | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Always-on coverage overview map (rendered before user searches)
  const overviewDivRef = useRef<HTMLDivElement>(null);
  const overviewMapRef = useRef<google.maps.Map | null>(null);
  const overviewMarkersRef = useRef<google.maps.Marker[]>([]);

  const isDark = variant === "dark";

  // Wire up Places Autocomplete after Google Maps loads.
  useEffect(() => {
    let cancelled = false;
    if (!inputRef.current) return;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !inputRef.current) return;
        if (autocompleteRef.current) return;

        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
            componentRestrictions: { country: ["ca", "us"] },
            fields: ["geometry", "formatted_address", "name"],
          }
        );
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place) {
            placeRef.current = place;
            if (place.formatted_address) setValue(place.formatted_address);
          }
        });

        geocoderRef.current = new google.maps.Geocoder();
      })
      .catch((err) => {
        // Non-fatal: form still works as plain submit.
        console.warn("[FindLocalTechnician] Google Maps load failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Render the always-on NA coverage overview map (only when not in a search-result state and not compact).
  useEffect(() => {
    if (compact) return;
    if (status === "success") return;
    if (!overviewDivRef.current) return;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !overviewDivRef.current) return;

        if (!overviewMapRef.current) {
          overviewMapRef.current = new google.maps.Map(overviewDivRef.current, {
            center: { lat: 46, lng: -96 },
            zoom: 3,
            disableDefaultUI: true,
            gestureHandling: "cooperative",
            styles: BP_MAP_STYLES,
            backgroundColor: "#F5F0E5",
          });
        }

        overviewMarkersRef.current.forEach((m) => m.setMap(null));
        overviewMarkersRef.current = COVERAGE_PINS.map(
          (p) =>
            new google.maps.Marker({
              position: { lat: p.lat, lng: p.lng },
              map: overviewMapRef.current!,
              icon: bpMarkerIcon(),
              title: `${p.name} coverage`,
            })
        );
      })
      .catch((err) => {
        console.warn("[FindLocalTechnician] overview map failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [compact, status]);

  // Render / update the map when coords change.
  useEffect(() => {
    if (!coords || !mapDivRef.current) return;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !mapDivRef.current) return;

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapDivRef.current, {
            center: coords,
            zoom: 11,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: "cooperative",
            styles: BP_MAP_STYLES,
            backgroundColor: "#F5F0E5",
          });
        } else {
          mapRef.current.setCenter(coords);
          mapRef.current.setZoom(11);
        }

        if (markerRef.current) markerRef.current.setMap(null);
        markerRef.current = new google.maps.Marker({
          position: coords,
          map: mapRef.current,
          icon: bpMarkerIcon(),
          title: "Routed to your local Bridgepoint technician",
        });

        if (circleRef.current) circleRef.current.setMap(null);
        circleRef.current = new google.maps.Circle({
          map: mapRef.current,
          center: coords,
          radius: 35000,
          strokeColor: "#23BDC8",
          strokeOpacity: 0.85,
          strokeWeight: 2,
          fillColor: "#23BDC8",
          fillOpacity: 0.1,
        });
      })
      .catch((err) => {
        console.warn("[FindLocalTechnician] map render failed:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [coords]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value.trim()) return;
    setStatus("loading");
    setErrorMsg(null);

    // 1) Prefer geometry from Places Autocomplete selection.
    const place = placeRef.current;
    if (place && place.geometry && place.geometry.location) {
      setCoords({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setStatus("success");
      return;
    }

    // 2) Fallback to Geocoding API for typed-only input.
    try {
      const google = await loadGoogleMaps();
      if (!geocoderRef.current) geocoderRef.current = new google.maps.Geocoder();
      const result = await geocoderRef.current.geocode({
        address: value,
        componentRestrictions: { country: "CA" },
      });
      const first =
        result.results.find((r) =>
          r.address_components.some((c) =>
            ["CA", "US"].includes(c.short_name)
          )
        ) || result.results[0];

      if (!first || !first.geometry || !first.geometry.location) {
        throw new Error("No matching location");
      }
      setCoords({
        lat: first.geometry.location.lat(),
        lng: first.geometry.location.lng(),
      });
      setStatus("success");
    } catch (err) {
      // Try a US fallback if CA-restricted geocode fails.
      try {
        const google = await loadGoogleMaps();
        if (!geocoderRef.current)
          geocoderRef.current = new google.maps.Geocoder();
        const result = await geocoderRef.current.geocode({ address: value });
        const first = result.results[0];
        if (!first || !first.geometry?.location) throw new Error("not found");
        setCoords({
          lat: first.geometry.location.lat(),
          lng: first.geometry.location.lng(),
        });
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMsg(
          "We could not locate that address. Try a fuller city, postal code, or street address."
        );
      }
    }
  }

  return (
    <div
      className={[
        "rounded-2xl border p-6 sm:p-7 lg:p-8",
        isDark
          ? "border-white/10 bg-navy-700/60 backdrop-blur-sm"
          : "border-steel-100 bg-white shadow-card",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            isDark ? "bg-cyan-500/20 text-cyan-300" : "bg-cyan-50 text-cyan-700",
          ].join(" ")}
          aria-hidden
        >
          <MapPin className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p
            className={[
              "text-xs font-bold uppercase tracking-[0.22em]",
              isDark ? "text-cyan-300" : "text-cyan-700",
            ].join(" ")}
          >
            Find a local technician
          </p>
          <h3
            className={[
              "font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight",
              isDark ? "text-white" : "text-navy-700",
            ].join(" ")}
          >
            Enter your city or postal code
          </h3>
        </div>
      </div>

      <form className={compact ? "mt-5" : "mt-6"} onSubmit={handleSubmit}>
        <label htmlFor="bp-find-tech" className="sr-only">
          City, neighbourhood, or postal code
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
          <div className="relative flex-1">
            <Search
              className={[
                "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2",
                isDark ? "text-cyan-300" : "text-cyan-700",
              ].join(" ")}
            />
            <input
              ref={inputRef}
              id="bp-find-tech"
              type="text"
              required
              placeholder="e.g. Toronto, M5V 2T6"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                placeRef.current = null;
              }}
              autoComplete="off"
              className={[
                "w-full rounded-full border px-12 py-3 text-sm font-medium outline-none transition focus:ring-2 focus:ring-cyan-500/40 sm:rounded-l-full sm:rounded-r-none",
                isDark
                  ? "border-white/20 bg-navy-800/80 text-white placeholder:text-white/75"
                  : "border-steel-200 bg-white text-navy-700 placeholder:text-steel-500",
              ].join(" ")}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-navy-700 shadow-cyan-glow transition hover:bg-cyan-600 hover:text-white disabled:opacity-70 sm:rounded-l-none sm:rounded-r-full"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation2 className="h-4 w-4" />
            )}
            {status === "loading" ? "Routing" : "Find"}
          </button>
        </div>

        {status === "success" ? (
          <div
            className={[
              "mt-4 rounded-xl border p-4",
              isDark
                ? "border-cyan-400/40 bg-cyan-500/10"
                : "border-cyan-500/30 bg-cyan-50",
            ].join(" ")}
            role="status"
            aria-live="polite"
          >
            <p
              className={[
                "text-[11px] font-bold uppercase tracking-[0.22em]",
                isDark ? "text-cyan-300" : "text-cyan-700",
              ].join(" ")}
            >
              Routed
            </p>
            <p
              className={[
                "mt-1 font-display text-base font-bold leading-tight",
                isDark ? "text-white" : "text-navy-700",
              ].join(" ")}
            >
              Routed to your local Bridgepoint technician. We will reach out within one business day.
            </p>
            <p
              className={[
                "mt-1.5 text-sm",
                isDark ? "text-white/85" : "text-steel-700",
              ].join(" ")}
            >
              Coverage confirmed for {value || "your address"}. Call{" "}
              <a
                href={NAP.phoneTel}
                className={[
                  "font-semibold underline-offset-2 hover:underline",
                  isDark ? "text-cyan-300" : "text-cyan-700",
                ].join(" ")}
              >
                {NAP.phone}
              </a>{" "}
              for an immediate ETA.
            </p>
          </div>
        ) : status === "error" ? (
          <div
            className={[
              "mt-4 rounded-xl border p-4",
              isDark
                ? "border-amber-300/40 bg-amber-400/10"
                : "border-amber-500/30 bg-amber-50",
            ].join(" ")}
            role="alert"
            aria-live="polite"
          >
            <p
              className={[
                "text-sm",
                isDark ? "text-amber-100" : "text-amber-900",
              ].join(" ")}
            >
              {errorMsg ?? "Something went wrong. Try again."}
            </p>
          </div>
        ) : (
          <p
            className={[
              "mt-3 text-xs",
              isDark ? "text-white/80" : "text-steel-600",
            ].join(" ")}
          >
            Service available across Canada and the US.{" "}
            <Link
              href="/locations"
              className={[
                "font-semibold underline-offset-2 hover:underline",
                isDark ? "text-cyan-300" : "text-cyan-700",
              ].join(" ")}
            >
              See all locations
            </Link>
            .
          </p>
        )}
      </form>

      {/* Live Google Map. Renders only after a successful lookup. */}
      {status === "success" && coords && (
        <div
          className={[
            "mt-6 overflow-hidden rounded-xl border",
            isDark ? "border-white/10" : "border-steel-100",
          ].join(" ")}
        >
          <div
            ref={mapDivRef}
            className="h-64 w-full sm:h-72"
            aria-label="Coverage map for the routed address"
            role="img"
          />
        </div>
      )}

      {!compact && (
        <>
          {/* Real Google Map showing US + Canada coverage. Replaces the old decorative placeholder. */}
          {status !== "success" && (
            <div
              className={[
                "mt-6 overflow-hidden rounded-xl border",
                isDark ? "border-white/10" : "border-steel-100",
              ].join(" ")}
            >
              <div
                ref={overviewDivRef}
                className="h-48 w-full sm:h-56"
                aria-label="Bridgepoint Canada and US coverage map"
                role="img"
              />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {COVERAGE_HINTS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setValue(c);
                  placeRef.current = null;
                }}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isDark
                    ? "border-white/15 bg-white/5 text-white/80 hover:border-cyan-300 hover:text-cyan-300"
                    : "border-steel-200 bg-cream-100 text-navy-700 hover:border-cyan-500 hover:text-cyan-700",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>

          <div
            className={[
              "mt-6 flex flex-col gap-2 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between",
              isDark
                ? "border-white/10 text-white/70"
                : "border-steel-100 text-steel-600",
            ].join(" ")}
          >
            <span>Need service now?</span>
            <a
              href={NAP.phoneTel}
              className={[
                "inline-flex items-center gap-1.5 font-bold",
                isDark ? "text-cyan-300" : "text-cyan-700",
              ].join(" ")}
            >
              <Phone className="h-3.5 w-3.5" />
              {NAP.phone} (24/7 dispatch)
            </a>
          </div>
        </>
      )}
    </div>
  );
}
