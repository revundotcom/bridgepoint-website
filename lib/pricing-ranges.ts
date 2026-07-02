/**
 * Typical residential service price ranges (CAD) for the Bridgepoint Cost Estimator.
 * Used by /components/CostEstimator.tsx — kept conservative and flagged as estimates.
 */

export type ServiceKey =
  | "plumbing-repair"
  | "drain-clear"
  | "water-heater-replace"
  | "furnace-tune-up"
  | "furnace-replace"
  | "ac-tune-up"
  | "ac-replace"
  | "electrical-repair"
  | "panel-upgrade"
  | "ev-charger";

export type CityKey =
  | "toronto"
  | "mississauga"
  | "brampton"
  | "vaughan"
  | "markham"
  | "richmond-hill"
  | "hamilton"
  | "oakville";

type Range = { low: number; high: number };

const BASE: Record<ServiceKey, { label: string; range: Range; unit?: string }> = {
  "plumbing-repair": { label: "Plumbing repair", range: { low: 180, high: 650 } },
  "drain-clear": { label: "Drain cleaning", range: { low: 220, high: 480 } },
  "water-heater-replace": {
    label: "Water heater replacement",
    range: { low: 1850, high: 4400 },
  },
  "furnace-tune-up": { label: "Furnace tune-up", range: { low: 149, high: 269 } },
  "furnace-replace": {
    label: "Furnace replacement",
    range: { low: 4800, high: 9200 },
  },
  "ac-tune-up": { label: "AC tune-up", range: { low: 169, high: 289 } },
  "ac-replace": { label: "AC system replacement", range: { low: 4200, high: 8600 } },
  "electrical-repair": { label: "Electrical repair", range: { low: 195, high: 720 } },
  "panel-upgrade": { label: "Electrical panel upgrade", range: { low: 1850, high: 3900 } },
  "ev-charger": { label: "EV charger install", range: { low: 1200, high: 2900 } },
};

const CITY_FACTOR: Record<CityKey, number> = {
  toronto: 1.08,
  mississauga: 1.04,
  brampton: 1.0,
  vaughan: 1.05,
  markham: 1.06,
  "richmond-hill": 1.07,
  hamilton: 0.96,
  oakville: 1.05,
};

export const SERVICE_OPTIONS: { key: ServiceKey; label: string }[] = (
  Object.entries(BASE) as [ServiceKey, { label: string; range: Range }][]
).map(([key, v]) => ({ key, label: v.label }));

export const CITY_OPTIONS: { key: CityKey; label: string }[] = [
  { key: "toronto", label: "Toronto" },
  { key: "mississauga", label: "Mississauga" },
  { key: "brampton", label: "Brampton" },
  { key: "vaughan", label: "Vaughan" },
  { key: "markham", label: "Markham" },
  { key: "richmond-hill", label: "Richmond Hill" },
  { key: "hamilton", label: "Hamilton" },
  { key: "oakville", label: "Oakville" },
];

export function estimate(service: ServiceKey, city: CityKey): Range {
  const base = BASE[service].range;
  const f = CITY_FACTOR[city];
  return {
    low: Math.round((base.low * f) / 5) * 5,
    high: Math.round((base.high * f) / 5) * 5,
  };
}

export function serviceLabel(service: ServiceKey) {
  return BASE[service].label;
}
