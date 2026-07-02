#!/usr/bin/env node
/**
 * Pre-projects Natural Earth country geometry to a static viewBox-coordinate
 * SVG path string for Canada, the USA, and Mexico. Output is committed JSON
 * so the client never ships D3 or topojson to the browser.
 *
 *   node scripts/build-na-paths.js
 */

const fs = require("fs");
const path = require("path");
const { feature } = require("topojson-client");
const { geoAlbers, geoPath } = require("d3-geo");

const ROOT = path.join(__dirname, "..");
// 50m has higher detail; 110m is smaller. Default to 50m for nicer borders.
const SRC = path.join(
  ROOT,
  "lib",
  "data",
  process.env.BP_RES === "110" ? "world-110m.json" : "world-50m.json"
);
const NA_OUT = path.join(ROOT, "lib", "data", "north-america.json");
const PATHS_OUT = path.join(ROOT, "lib", "data", "north-america-paths.json");

const WIDTH = 960;
const HEIGHT = 600;

// ISO 3166-1 numeric codes
const NUM = { CA: "124", US: "840", MX: "484" };

const topo = JSON.parse(fs.readFileSync(SRC, "utf8"));
const countries = feature(topo, topo.objects.countries);

const wanted = countries.features.filter(
  (f) => f.id === NUM.CA || f.id === NUM.US || f.id === NUM.MX
);

const naCollection = {
  type: "FeatureCollection",
  features: wanted.map((f) => ({
    ...f,
    properties: {
      ...(f.properties || {}),
      iso_n3: f.id,
      code:
        f.id === NUM.CA ? "CA" : f.id === NUM.US ? "US" : f.id === NUM.MX ? "MX" : "",
    },
  })),
};

fs.writeFileSync(NA_OUT, JSON.stringify(naCollection));
console.log(`Wrote ${path.relative(ROOT, NA_OUT)} (${wanted.length} features)`);

// Albers projection tuned for North America. Fit to width/height with padding.
const projection = geoAlbers()
  .rotate([96, 0])
  .center([-0.6, 38])
  .parallels([29.5, 45.5])
  .scale(720)
  .translate([WIDTH / 2, HEIGHT / 2]);

projection.fitExtent(
  [
    [12, 12],
    [WIDTH - 12, HEIGHT - 12],
  ],
  naCollection
);

const pathBuilder = geoPath(projection);

const out = {
  width: WIDTH,
  height: HEIGHT,
  features: naCollection.features.map((f) => ({
    code: f.properties.code,
    name:
      f.properties.code === "CA"
        ? "Canada"
        : f.properties.code === "US"
        ? "United States"
        : "Mexico",
    d: pathBuilder(f) || "",
  })),
};

// City pins (approximate lon, lat). Toronto = HQ.
const PINS = [
  { name: "Toronto", lon: -79.3832, lat: 43.6532, hq: true },
  { name: "Vaughan", lon: -79.5167, lat: 43.8361 },
  { name: "Mississauga", lon: -79.6441, lat: 43.589 },
  { name: "Brampton", lon: -79.7624, lat: 43.7315 },
  { name: "Hamilton", lon: -79.8711, lat: 43.2557 },
  { name: "Markham", lon: -79.337, lat: 43.8561 },
  { name: "Ottawa", lon: -75.6972, lat: 45.4215 },
  { name: "Montreal", lon: -73.5673, lat: 45.5017 },
  { name: "Vancouver", lon: -123.1216, lat: 49.2827 },
  { name: "Calgary", lon: -114.0719, lat: 51.0447 },
  { name: "New York", lon: -74.006, lat: 40.7128 },
  { name: "Chicago", lon: -87.6298, lat: 41.8781 },
  { name: "Miami", lon: -80.1918, lat: 25.7617 },
  { name: "Dallas", lon: -96.797, lat: 32.7767 },
  { name: "Los Angeles", lon: -118.2437, lat: 34.0522 },
  { name: "Atlanta", lon: -84.388, lat: 33.749 },
  { name: "Phoenix", lon: -112.074, lat: 33.4484 },
  { name: "Denver", lon: -104.9903, lat: 39.7392 },
];

out.pins = PINS.map((p) => {
  const proj = projection([p.lon, p.lat]);
  return {
    name: p.name,
    hq: !!p.hq,
    x: proj ? +proj[0].toFixed(2) : null,
    y: proj ? +proj[1].toFixed(2) : null,
  };
}).filter((p) => p.x !== null && p.y !== null);

fs.writeFileSync(PATHS_OUT, JSON.stringify(out));
console.log(
  `Wrote ${path.relative(ROOT, PATHS_OUT)} (${out.features.length} paths, ${out.pins.length} pins)`
);
