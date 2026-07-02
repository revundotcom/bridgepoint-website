import { BRAND } from "@/lib/constants";
import { SERVICE_PAGES } from "@/lib/silo-services";
import { EMERGENCY_PAGES } from "@/lib/silo-emergency";
import { INDUSTRY_PAGES } from "@/lib/silo-industries";
import { LOCATION_PAGES } from "@/lib/silo-locations";
import { RESOURCE_PAGES } from "@/lib/silo-resources";
import { SILO_PAGES, CITY_HUBS } from "@/lib/silo";
import { PROVINCES, citySlug } from "@/lib/locations-data";

export const dynamic = "force-static";

const STATIC_PAGES = [
  "",
  "/about",
  "/contact",
  "/careers",
  "/quote",
  "/faq",
  "/privacy",
  "/terms",
  "/accessibility",
  "/help",
  "/gallery",
  "/blog",
  "/pricing",
  "/reviews",
];

const HUB_PAGES = [
  "/services",
  "/emergency",
  "/industries",
  "/service-areas",
  "/locations",
  "/resources",
];

export function GET() {
  const today = new Date().toISOString().split("T")[0];

  const provinceUrls = PROVINCES.map((p) => `${BRAND.url}/locations/${p.slug}`);
  const provinceCityUrls = PROVINCES.flatMap((p) =>
    p.cities.map((c) => `${BRAND.url}/locations/${p.slug}/${citySlug(c)}`)
  );

  // City-level emergency hubs synthesized from every silo city hub.
  // URL pattern: /{city-slug}-{state_abbr}-emergency
  const cityEmergencyHubUrls = CITY_HUBS.map(
    (p) => `${BRAND.url}${p.url.replace(/-maintenance-services$/, "-emergency")}`
  );

  const urls: string[] = [
    ...SILO_PAGES.map((p) => `${BRAND.url}${p.url}`),
    ...STATIC_PAGES.map((p) => `${BRAND.url}${p}`),
    ...HUB_PAGES.map((p) => `${BRAND.url}${p}`),
    ...SERVICE_PAGES.map((s) => `${BRAND.url}/services/${s.slug}`),
    ...EMERGENCY_PAGES.map((s) => `${BRAND.url}/emergency/${s.slug}`),
    ...INDUSTRY_PAGES.map((s) => `${BRAND.url}/industries/${s.slug}`),
    ...LOCATION_PAGES.map((s) => `${BRAND.url}/service-areas/${s.slug}`),
    ...RESOURCE_PAGES.map((s) => `${BRAND.url}/resources/${s.slug}`),
    ...provinceUrls,
    ...provinceCityUrls,
    ...cityEmergencyHubUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
