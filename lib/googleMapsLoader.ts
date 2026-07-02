// Singleton Google Maps JS API loader.
// Caches the load promise on window so the script tag is only injected once
// even if multiple components call loadGoogleMaps() concurrently.

declare global {
  interface Window {
    __bpGoogleMapsPromise?: Promise<typeof google>;
    google?: typeof google;
  }
}

const CALLBACK_NAME = "__bpGoogleMapsCallback";
const SCRIPT_ID = "bp-google-maps-js";

export function loadGoogleMaps(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadGoogleMaps called on the server"));
  }

  if (window.__bpGoogleMapsPromise) {
    return window.__bpGoogleMapsPromise;
  }

  if (window.google && window.google.maps) {
    window.__bpGoogleMapsPromise = Promise.resolve(window.google);
    return window.__bpGoogleMapsPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(
      new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set")
    );
  }

  window.__bpGoogleMapsPromise = new Promise<typeof google>((resolve, reject) => {
    // If a previous tag exists from a prior failed load, remove it.
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    (window as unknown as Record<string, unknown>)[CALLBACK_NAME] = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error("Google Maps loaded but window.google missing"));
      }
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places&callback=${CALLBACK_NAME}&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      delete window.__bpGoogleMapsPromise;
      reject(new Error("Failed to load Google Maps script"));
    };
    document.head.appendChild(script);
  });

  return window.__bpGoogleMapsPromise;
}

// Brand-aligned map style. Cream land, navy water, cyan road accents.
export const BP_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F5F0E5" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#0F2441" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#F5F0E5" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0F2441" }, { weight: 0.6 }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0F2441" }, { weight: 1 }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#0F2441" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#F5F0E5" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#EDE5D2" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#EDE5D2" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#D9E5C8" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#FFFFFF" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#23BDC8" }, { weight: 0.4 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#FFFFFF" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#23BDC8" }, { lightness: 60 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#23BDC8" }, { weight: 0.8 }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#EDE5D2" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0F2441" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#23BDC8" }],
  },
];

// SVG cyan pin used as the active marker icon.
export function bpMarkerIcon(): google.maps.Symbol | google.maps.Icon {
  return {
    path: "M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z",
    fillColor: "#23BDC8",
    fillOpacity: 1,
    strokeColor: "#0F2441",
    strokeWeight: 1.5,
    scale: 0.9,
    anchor: new google.maps.Point(12, 36),
  };
}
