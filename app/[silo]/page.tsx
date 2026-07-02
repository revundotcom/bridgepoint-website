// AUTO-GENERATED route. Hand-edited 2026-05-21 for MSR-quality design lift.
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  MapPin,
  Building2,
  Wrench,
  ShieldCheck,
  Clock,
  AlertTriangle,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import bundle from "@/lib/silo/content.json";

type Params = { params: { silo: string } };

type SiloPage = {
  type: "city_hub" | "service_in_city" | "blog";
  url: string;
  title: string;
  meta_description: string;
  city: string;
  city_key: string;
  state_abbr: string;
  state: string;
  country?: string;
  lat?: number;
  lng?: number;
  intro?: string;
  local_context?: string;
  service_details?: string;
  deep_dive?: string;
  service_slug?: string;
  service_label?: string;
  service_blurb?: string;
  authority_citations?: Array<{ name: string; url: string; context?: string }>;
  authority_citation?: { name: string; url: string; context?: string };
  faq?: Array<{ q: string; a: string }>;
  image: string;
  image_alt: string;
  neighborhoods?: string[];
  jurisdiction?: { body: string; statute: string; url: string };
  city_hub_url?: string;
  national_service_url?: string;
  legacy_hub_url?: string;
};

const ALL_PAGES = bundle.pages as SiloPage[];
const FLAT_PAGES = ALL_PAGES.filter((p) => p.type !== "blog");
const CITY_HUBS = ALL_PAGES.filter((p) => p.type === "city_hub");

// City emergency hub URLs synthesized from every city hub.
// Pattern: /{city-slug}-{state_abbr}-emergency
// e.g. city_hub /toronto-on-maintenance-services -> /toronto-on-emergency
const CITY_EMERGENCY_HUB_URLS = CITY_HUBS.map((p) => {
  const base = p.url.replace(/-maintenance-services$/, "");
  return `${base}-emergency`;
});
const CITY_EMERGENCY_HUB_SET = new Set(CITY_EMERGENCY_HUB_URLS);

function findCityHubForEmergency(url: string): SiloPage | undefined {
  // url like /toronto-on-emergency -> look up city hub /toronto-on-maintenance-services
  const base = url.replace(/-emergency$/, "");
  const hubUrl = `${base}-maintenance-services`;
  return CITY_HUBS.find((p) => p.url === hubUrl);
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const baseParams = FLAT_PAGES.map((p) => ({ silo: p.url.replace(/^\//, "") }));
  const emergencyParams = CITY_EMERGENCY_HUB_URLS.map((url) => ({
    silo: url.replace(/^\//, ""),
  }));
  return [...baseParams, ...emergencyParams];
}

// Meta descriptions in the content bundle are truncated mid-sentence at ~130 chars.
// This helper returns a clean sentence-complete description.
function cleanMetaDescription(page: SiloPage): string {
  const raw = page.meta_description || "";
  if (raw.match(/[.!?]$/)) return raw;
  if (page.service_label && page.city && page.state_abbr) {
    const blurb = page.service_blurb
      ? page.service_blurb.replace(/\.$/, "") + "."
      : `Professional ${page.service_label.toLowerCase()} services in ${page.city}, ${page.state_abbr}.`;
    return `${BRAND.name} ${page.service_label} in ${page.city}, ${page.state_abbr}. ${blurb}`;
  }
  if (page.city && page.state_abbr) {
    return `${BRAND.name} maintenance services in ${page.city}, ${page.state_abbr}. Plumbing, electrical, HVAC, and building services with 24/7 dispatch.`;
  }
  return raw;
}

export function generateMetadata({ params }: Params) {
  const url = `/${params.silo}`;
  const page = FLAT_PAGES.find((p) => p.url === url);
  if (page) {
    const description = cleanMetaDescription(page);
    return {
      title: page.title,
      description,
      alternates: { canonical: `${BRAND.url}${page.url}` },
      openGraph: {
        title: page.title,
        description,
        url: `${BRAND.url}${page.url}`,
        siteName: BRAND.name,
        type: "website",
      },
    };
  }
  if (CITY_EMERGENCY_HUB_SET.has(url)) {
    const cityHub = findCityHubForEmergency(url);
    if (cityHub) {
      const title = `24/7 Emergency Dispatch in ${cityHub.city}, ${cityHub.state_abbr}`;
      const description = `Twenty four hour Bridgepoint Maintenance emergency dispatch across ${cityHub.city}, ${cityHub.state_abbr}. Plumbing, electrical, HVAC, water damage, storm, sewer, boiler. Call ${NAP.phone}.`;
      return {
        title: `${title} | ${BRAND.name}`,
        description,
        alternates: { canonical: `${BRAND.url}${url}` },
        openGraph: {
          title,
          description,
          url: `${BRAND.url}${url}`,
          siteName: BRAND.name,
          type: "website",
        },
      };
    }
  }
  return {};
}

function buildSchema(page: SiloPage) {
  const graph: any[] = [
    breadcrumbSchema([
      { name: "Home", url: BRAND.url },
      { name: page.title, url: `${BRAND.url}${page.url}` },
    ]),
  ];

  if (page.type === "city_hub") {
    graph.push({
      "@type": "LocalBusiness",
      "@id": `${BRAND.url}${page.url}#localbusiness`,
      name: `${BRAND.name} - ${page.city}, ${page.state_abbr}`,
      url: `${BRAND.url}${page.url}`,
      telephone: NAP.phoneE164,
      areaServed: {
        "@type": "City",
        name: page.city,
        containedInPlace: { "@type": "State", name: page.state },
      },
      geo:
        page.lat && page.lng
          ? {
              "@type": "GeoCoordinates",
              latitude: page.lat,
              longitude: page.lng,
            }
          : undefined,
    });
  } else if (page.type === "service_in_city") {
    graph.push({
      "@type": "Service",
      "@id": `${BRAND.url}${page.url}#service`,
      name: `${page.service_label} in ${page.city}, ${page.state_abbr}`,
      provider: { "@type": "LocalBusiness", name: BRAND.name, url: BRAND.url },
      areaServed: { "@type": "City", name: page.city },
      description: page.service_blurb,
    });
  }

  if (page.faq && page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ----- Editorial image pools (distinct images per card — no duplicate-image issue) -----
const SERVICE_IMAGE_POOLS: Record<string, { src: string; alt: string }[]> = {
  plumbing: [
    { src: IMAGES.edPlumbingHero, alt: IMAGES.edPlumbingHeroAlt },
    { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
    { src: IMAGES.editorialBasement, alt: IMAGES.editorialBasementAlt },
    { src: IMAGES.plumbingDrain, alt: IMAGES.plumbingDrainAlt },
    { src: IMAGES.plumbingWaterHeater, alt: IMAGES.plumbingWaterHeaterAlt },
    { src: IMAGES.tradeWaterHeater, alt: IMAGES.tradeWaterHeaterAlt },
  ],
  electrical: [
    { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt },
    { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
    { src: IMAGES.electricalWires, alt: IMAGES.electricalWiresAlt },
    { src: IMAGES.electricalLighting, alt: IMAGES.electricalLightingAlt },
    { src: IMAGES.tradeEvCharger, alt: IMAGES.tradeEvChargerAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  ],
  hvac: [
    { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
    { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
    { src: IMAGES.hvacCondenser, alt: IMAGES.hvacCondenserAlt },
    { src: IMAGES.hvacDuctwork, alt: IMAGES.hvacDuctworkAlt },
    { src: IMAGES.editorialRooftop, alt: IMAGES.editorialRooftopAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
  ],
  carpentry: [
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  ],
  "drywall-and-painting": [
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  ],
  "general-repairs": [
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.technicianMeeting, alt: IMAGES.technicianMeetingAlt },
  ],
  "preventative-maintenance": [
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
  ],
  "unit-turnovers": [
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  ],
  "commercial-contracting": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  ],
  "tenant-fit-outs": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  ],
  "facility-maintenance": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  ],
  "building-upkeep": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
  ],
};

const SERVICE_HERO_MAP: Record<string, { src: string; alt: string }> = {
  plumbing: { src: IMAGES.edPlumbingHero, alt: IMAGES.edPlumbingHeroAlt },
  electrical: { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt },
  hvac: { src: IMAGES.edHeatingHero, alt: IMAGES.edHeatingHeroAlt },
  carpentry: { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  "drywall-and-painting": { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
  "general-repairs": { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
  "preventative-maintenance": { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  "unit-turnovers": { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
  "commercial-contracting": { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  "tenant-fit-outs": { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  "facility-maintenance": { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
  "building-upkeep": { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
};

const FALLBACK_POOL: { src: string; alt: string }[] = [
  { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
  { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
  { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
  { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
];

const CITY_HUB_POOL: { src: string; alt: string }[] = [
  { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
  { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
  { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
  { src: IMAGES.editorialBasement, alt: IMAGES.editorialBasementAlt },
  { src: IMAGES.editorialRooftop, alt: IMAGES.editorialRooftopAlt },
  { src: IMAGES.editorialDoor, alt: IMAGES.editorialDoorAlt },
];

const FEATURED_INDUSTRIES = [
  { name: "Property managers", href: "/industries/property-managers" },
  { name: "Multi family buildings", href: "/industries/multi-family-buildings" },
  { name: "Commercial owners", href: "/industries/commercial-property-owners" },
  { name: "Condominium corporations", href: "/industries/condominium-corporations" },
];

// 6 service-line "scope of work" cards, used to enrich every silo page.
function buildScopeCards(serviceLabel: string, city: string): { title: string; body: string }[] {
  return [
    {
      title: "Live dispatch desk",
      body: `A real ${city} dispatcher answers, captures the address and the issue, and routes the right licensed trade. No callback queue.`,
    },
    {
      title: "Licensed trade on every visit",
      body: `${serviceLabel} work in ${city} is run by trades carrying the licenses and permits the work requires. License number prints on every work order.`,
    },
    {
      title: "Stocked trucks for first visit completion",
      body: `Most common ${serviceLabel.toLowerCase()} calls close on the first visit. Trucks roll into ${city} with high-runner parts already on board.`,
    },
    {
      title: "Flat rate before tools come out",
      body: `The tech walks the issue on site, photographs the condition, and quotes a flat rate. You approve before any work starts.`,
    },
    {
      title: "Photo documented closeout",
      body: `Every job ships a closeout work order with photos, license number, and a line item invoice. Audit ready for asset managers and insurance claims.`,
    },
    {
      title: "Maintenance contract on request",
      body: `For ${city} portfolios that need recurring service, we set up master account billing with one dispatch line across every trade we run.`,
    },
  ];
}

function buildHubScopeCards(city: string): { title: string; body: string }[] {
  return [
    {
      title: "One dispatch number, every trade",
      body: `Plumbing, electrical, HVAC, carpentry, drywall and paint, general repairs, preventative maintenance, unit turnovers, commercial contracting, and facility maintenance routing through one ${city} dispatch desk.`,
    },
    {
      title: "Licensed local trades",
      body: `${city} work runs through trades carrying the right local licenses and permits. License numbers are printed on every work order.`,
    },
    {
      title: "Live dispatcher, no callback queue",
      body: `A real person answers in seconds. The dispatcher captures the address, the issue, the property type, and writes the work order against the right trade line.`,
    },
    {
      title: "Flat rate quote first",
      body: `The tech walks the issue on site, photographs the condition, and quotes a flat rate before any tools come out. Approve in person or forward to the property manager.`,
    },
    {
      title: "Photo documented closeout",
      body: `Photo log, license number, and line item invoice email within seven days. Audit ready for property managers, asset owners, and accountants.`,
    },
    {
      title: "Master account billing",
      body: `${city} portfolios with multiple addresses can run on one master account with consolidated invoicing and portfolio reporting.`,
    },
  ];
}

const SILO_SERVICE_SLUGS = [
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
];

const SERVICE_LABEL_MAP: Record<string, string> = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  hvac: "HVAC",
  carpentry: "Carpentry",
  "drywall-and-painting": "Drywall and Painting",
  "general-repairs": "General Repairs",
  "preventative-maintenance": "Preventative Maintenance",
  "unit-turnovers": "Unit Turnovers",
  "commercial-contracting": "Commercial Contracting",
  "tenant-fit-outs": "Tenant Fit Outs",
  "facility-maintenance": "Facility Maintenance",
  "building-upkeep": "Building Upkeep",
};

// 12 emergency trade lines available on every city emergency hub. The first three
// (plumbing, electrical, hvac) link to a per-city silo page when one exists for the
// city. The remaining nine link to the national emergency response pages. Every
// card is a one-click path to dispatch or to a real page so the visitor never
// hits a dead end.
const EMERGENCY_TRADES: { slug: string; label: string; blurb: string }[] = [
  {
    slug: "plumbing",
    label: "Emergency plumbing",
    blurb: "Active leaks, ruptured supply lines, overflow events.",
  },
  {
    slug: "electrical",
    label: "Emergency electrical",
    blurb: "Power loss, panel failure, exposed wiring, life safety.",
  },
  {
    slug: "hvac",
    label: "Emergency HVAC",
    blurb: "No heat, no cooling, gas smell, equipment failure.",
  },
  {
    slug: "water-damage",
    label: "Water damage response",
    blurb: "Extraction, structural drying, mould prevention, rebuild prep.",
  },
  {
    slug: "burst-pipes",
    label: "Burst pipe response",
    blurb: "Frozen line failure and burst supply line repair.",
  },
  {
    slug: "no-heat",
    label: "No heat response",
    blurb: "Furnace, boiler, and heat pump emergency restoration.",
  },
  {
    slug: "no-cooling",
    label: "No cooling response",
    blurb: "AC, heat pump, and commercial RTU emergency response.",
  },
  {
    slug: "no-power",
    label: "No power response",
    blurb: "Service entrance, panel, and main circuit emergencies.",
  },
  {
    slug: "roof-damage",
    label: "Roof damage response",
    blurb: "Active leaks, temporary dry in, storm damage scoping.",
  },
  {
    slug: "storm-damage",
    label: "Storm damage response",
    blurb: "Wind, water, ice, and impact damage triage.",
  },
  {
    slug: "sewer-backups",
    label: "Sewer backup response",
    blurb: "Line clearing, biohazard containment, camera inspection.",
  },
  {
    slug: "boiler-failure",
    label: "Boiler failure response",
    blurb: "Cast iron, mod con, commercial boiler emergency service.",
  },
];

const EMERGENCY_TRADE_IMAGE_POOL: { src: string; alt: string }[] = [
  { src: IMAGES.edPlumbingHero, alt: IMAGES.edPlumbingHeroAlt },
  { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt },
  { src: IMAGES.edHeatingHero, alt: IMAGES.edHeatingHeroAlt },
  { src: IMAGES.edCoolingHero, alt: IMAGES.edCoolingHeroAlt },
  { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
  { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
  { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
  { src: IMAGES.editorialBasement, alt: IMAGES.editorialBasementAlt },
  { src: IMAGES.editorialRooftop, alt: IMAGES.editorialRooftopAlt },
  { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
  { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
  { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
];

function CityEmergencyHub({ cityHub }: { cityHub: SiloPage }) {
  const cityName = cityHub.city;
  const stateAbbr = cityHub.state_abbr;
  const stateName = cityHub.state;
  const title = `24/7 Emergency Dispatch in ${cityName}, ${stateAbbr}`;
  const description = `One dispatch number for every emergency trade across ${cityName}, ${stateAbbr}. Live answer, licensed trades, photo documented closeout.`;
  const heroImage = IMAGES.serviceEmergency;
  const url = cityHub.url.replace(/-maintenance-services$/, "-emergency");
  const cityPages = ALL_PAGES.filter((p) => p.city_key === cityHub.city_key);

  // Build a per-trade href:
  // - if a per-city silo page exists for that trade (emergency-plumbing/electrical/hvac), link to it
  // - otherwise link to the national /emergency/{slug} page
  const tradeCards = EMERGENCY_TRADES.map((t, i) => {
    const cityTradeUrl = `/${cityHub.city_key}-emergency-${t.slug}`;
    const cityTradePage = cityPages.find((p) => p.url === cityTradeUrl);
    const href = cityTradePage ? cityTradePage.url : `/emergency/${t.slug}`;
    const img = EMERGENCY_TRADE_IMAGE_POOL[i % EMERGENCY_TRADE_IMAGE_POOL.length];
    return { ...t, href, img };
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema([
        { name: "Home", url: BRAND.url },
        { name: "Emergency", url: `${BRAND.url}/emergency` },
        { name: `${cityName} emergency`, url: `${BRAND.url}${url}` },
      ]),
      {
        "@type": "EmergencyService",
        "@id": `${BRAND.url}${url}#emergencyservice`,
        name: `${BRAND.name} - 24/7 Emergency Dispatch in ${cityName}, ${stateAbbr}`,
        url: `${BRAND.url}${url}`,
        telephone: NAP.phoneE164,
        areaServed: {
          "@type": "City",
          name: cityName,
          containedInPlace: { "@type": "State", name: stateName },
        },
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          opens: "00:00",
          closes: "23:59",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How fast can Bridgepoint reach a ${cityName} emergency?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Live answer on the dispatch line. Emergency calls in core ${cityName} zones target on site arrival inside 60 minutes when conditions allow. Call ${NAP.phone} for an immediate ETA.`,
            },
          },
          {
            "@type": "Question",
            name: `What emergency trades does Bridgepoint run in ${cityName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Plumbing, electrical, HVAC, water damage, burst pipes, no heat, no cooling, no power, roof damage, storm damage, sewer backups, and boiler failure.`,
            },
          },
          {
            "@type": "Question",
            name: `Are after hours rates published?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. After hours dispatch fees and trade rates are quoted to the caller before any truck rolls so there are no surprises on the invoice.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <SchemaJsonLd id={`ld-city-emergency-${cityHub.city_key}`} data={schema} />

      <PageHero
        eyebrow={`${cityName} Emergency Dispatch`}
        title={title}
        description={`Live dispatch answers in seconds. Licensed trades roll into ${cityName}, ${stateAbbr} for any emergency. Photo documented closeout on every visit.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Emergency", href: "/emergency" },
          { name: `${cityName} emergency` },
        ]}
        image={heroImage}
        imageAlt={`Bridgepoint Maintenance emergency dispatch in ${cityName}`}
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
          <Link href={cityHub.url} className="btn-ghost-light">
            {cityName} hub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Trust band — 4 emergency-specific commitments */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative grid grid-cols-2 divide-x divide-white/10 py-7 md:grid-cols-4 md:py-9">
          {[
            { k: "24/7", v: `${cityName} dispatch` },
            { k: "60 min", v: "On site target" },
            { k: "Photo", v: "Documented closeout" },
            { k: "Published", v: "After hours rates" },
          ].map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1 px-4 md:px-8">
              <div className="font-display text-2xl font-bold leading-none text-white md:text-3xl">
                {k}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300 md:text-xs">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12 emergency trade lines */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow={`${cityName} response lines`}
            title={`Twelve emergency trade lines on one ${cityName} dispatch number.`}
            description={`Every Bridgepoint emergency call in ${cityName} routes through the same number. Tell the dispatcher the issue. The right trade rolls with the right truck and the dispatcher stays on the line until arrival.`}
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tradeCards.map((card, i) => (
              <Link
                key={card.slug}
                href={card.href}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-steel-100 transition hover:shadow-elevated hover:ring-cyan-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emergency-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-soft">
                    <AlertTriangle className="h-3 w-3" />
                    24/7 dispatch
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <h3 className="font-display text-lg font-semibold text-navy">
                    {card.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-steel-600">
                    {card.blurb}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-cyan-700 group-hover:text-cyan-900">
                    Open response page
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4-step dispatch process */}
      <section className="bg-steel-50/60 section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How dispatch works"
              title={`From the first ${cityName} ring to the closeout photo.`}
              description={`Every Bridgepoint ${cityName} emergency call moves through the same four step flow. Documented at every step.`}
            />
            <div className="mt-7 hidden lg:flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                {NAP.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Request service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                t: "Live dispatcher answers",
                b: `A real ${cityName} dispatcher picks up. They capture the address, the issue, and the property type and route the call against the right emergency trade line.`,
              },
              {
                n: "02",
                t: "Licensed trade rolls",
                b: `The nearest licensed truck inside the ${cityName} emergency coverage zone is routed. ETA writes to the work order and texts to the caller before arrival.`,
              },
              {
                n: "03",
                t: "Quote before tools",
                b: "The tech walks the issue, photographs the condition, and quotes a flat rate before any tools come out. After hours rates are published and quoted up front.",
              },
              {
                n: "04",
                t: "Photo documented closeout",
                b: "Photos, license number, scope of work, and a line item invoice email within seven days. Audit ready for property managers and insurance adjusters.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-7 shadow-soft transition hover:border-cyan-300 hover:shadow-cyan-glow"
              >
                <span className="font-display text-5xl font-extrabold tabular-nums text-cyan-700 leading-none">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ — emergency specific */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title={`${cityName} emergency questions, answered.`}
              description={`Common questions from ${cityName} property managers, commercial owners, and homeowners about twenty four hour Bridgepoint dispatch.`}
            />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion
              items={[
                {
                  q: `How fast can a Bridgepoint truck reach a ${cityName} emergency?`,
                  a: `Live answer on the dispatch line. Emergency calls in core ${cityName} zones target on site arrival inside 60 minutes when conditions allow. Call ${NAP.phone} for an immediate ETA based on the address and current dispatch board.`,
                },
                {
                  q: `What counts as an emergency call?`,
                  a: `Active leaks, burst pipes, no heat in winter, no cooling in heat advisories, no power, exposed wiring, smoke or burning smell from a circuit, gas smell, water entering the building, roof damage, sewer backup, and any condition that places the property or occupants at risk.`,
                },
                {
                  q: `Are after hours rates published?`,
                  a: `Yes. After hours dispatch fees and trade rates are quoted to the caller before any truck rolls. No surprise invoice items after the visit.`,
                },
                {
                  q: `Are your ${cityName} emergency trades licensed?`,
                  a: `Yes. Every emergency visit runs with a trade carrying the local license and permits the work requires. License numbers print on the closeout work order.`,
                },
                {
                  q: `Can ${cityName} property managers set up priority dispatch?`,
                  a: `Yes. Account based emergency dispatch with priority routing, master account billing, and consolidated invoicing for property management companies running portfolios in ${cityName}.`,
                },
                {
                  q: `What documentation do I get after an emergency call?`,
                  a: `Photos of the failure condition, photos of the completed work, license number of the trade who ran the call, scope of work, and a line item invoice. Inbox delivery within seven days. Audit ready for insurance claims.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Cross link back to city hub + national emergency hub */}
      <section className="relative overflow-hidden bg-navy-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Link
            href={cityHub.url}
            className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:border-cyan-300/60 hover:bg-white/[0.08]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              {cityName} city hub
            </p>
            <p className="mt-3 font-display text-xl font-semibold text-white">
              All trades Bridgepoint runs in {cityName}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300">
              Open the hub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href="/emergency"
            className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:border-cyan-300/60 hover:bg-white/[0.08]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              National emergency hub
            </p>
            <p className="mt-3 font-display text-xl font-semibold text-white">
              All twelve Bridgepoint emergency response pages
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300">
              Open the hub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <a
            href={NAP.phoneTel}
            className="group block rounded-2xl border border-cyan-300/40 bg-cyan-500/15 p-7 backdrop-blur transition hover:bg-cyan-500/25"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
              Live dispatch
            </p>
            <p className="mt-3 font-display text-xl font-semibold text-white">
              {NAP.phone}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cyan-200">
              <Phone className="h-3.5 w-3.5" />
              Call now
            </span>
          </a>
        </div>
      </section>

      <CTASection
        title={`Bridgepoint emergency in ${cityName}?`}
        body={`Call dispatch now. Live answer, licensed trades, photo documented closeout on every visit across ${cityName}, ${stateAbbr}.`}
      />
    </>
  );
}

export default function SiloFlatPage({ params }: Params) {
  const url = `/${params.silo}`;

  // City emergency hub — synthesized page for /{city}-{state_abbr}-emergency
  if (CITY_EMERGENCY_HUB_SET.has(url)) {
    const cityHub = findCityHubForEmergency(url);
    if (!cityHub) notFound();
    return <CityEmergencyHub cityHub={cityHub} />;
  }

  const page = FLAT_PAGES.find((p) => p.url === url);
  if (!page) notFound();

  const cityPages = ALL_PAGES.filter((p) => p.city_key === page.city_key);
  const siblingServices = cityPages.filter(
    (p) => p.type === "service_in_city" && p.url !== page.url
  );
  const cityHub = cityPages.find((p) => p.type === "city_hub");
  const cityBlogs = cityPages.filter((p) => p.type === "blog");

  const isHub = page.type === "city_hub";
  const cityName = page.city;
  const serviceLabel = page.service_label || "maintenance";
  const serviceSlug = page.service_slug || "";

  // Hero image selection — service-specific for service_in_city, hub-pool for city hub.
  const heroImage = isHub
    ? IMAGES.editorialHero
    : (SERVICE_HERO_MAP[serviceSlug]?.src ?? IMAGES.editorialHero);

  // Scope image pool for the 6-card editorial section. Distinct per service.
  const scopePool = isHub
    ? CITY_HUB_POOL
    : (SERVICE_IMAGE_POOLS[serviceSlug] ?? FALLBACK_POOL);

  const scopeCards = isHub
    ? buildHubScopeCards(cityName)
    : buildScopeCards(serviceLabel, cityName);

  // Replace placeholder copy on city_hub pages so live content is real.
  const introCopy = (() => {
    const raw = page.intro || "";
    if (raw.startsWith("Placeholder") || !raw.trim()) {
      return `${BRAND.name} runs maintenance dispatch into ${cityName}, ${page.state_abbr}. One live desk, twelve trade lines, photo documented closeout on every visit. Property managers, landlords, and commercial owners across ${cityName} call one number for every trade we cover.`;
    }
    return raw;
  })();

  const localContextCopy = (() => {
    const raw = page.local_context || "";
    if (raw.startsWith("Placeholder") || !raw.trim()) {
      return `${cityName} is a busy ${page.state} maintenance market. Mixed residential, multi family, and commercial stock keeps trade calls running year round. Bridgepoint dispatches licensed trades into every neighborhood we cover, with stocked trucks rolling for first visit completion.`;
    }
    return raw;
  })();

  const detailsCopy = (() => {
    const raw = page.service_details || "";
    if (raw.startsWith("Placeholder") || !raw.trim()) {
      return isHub
        ? `Every Bridgepoint ${cityName} call routes through one dispatch number. Whether the issue is a leak, a panel trip, a furnace that will not start, or a unit turnover scope, the same flow runs end to end. Dispatcher captures it. Licensed trade is routed. Flat rate is quoted on site. Photos and license number ship in the closeout work order.`
        : `${BRAND.name} ${serviceLabel.toLowerCase()} service in ${cityName} runs licensed trades on every visit. Trucks come stocked, quotes are flat rate before tools come out, and every job closes out with photos and a license number on file. Property managers, landlords, and owners can scope a one off call or set up a recurring maintenance contract through the same dispatch line.`;
    }
    return raw;
  })();

  // Build neighborhood links string for the local body section.
  const neighborhoodsText = page.neighborhoods && page.neighborhoods.length > 0
    ? page.neighborhoods.join(", ")
    : null;

  // 3 case-style "by the numbers" stats for the dark band.
  const numbersBand = isHub
    ? [
        { k: "One", v: "Dispatch number" },
        { k: "12", v: "Trade lines covered" },
        { k: "Photo", v: "Documented closeout" },
        { k: "Net 30", v: "Master billing" },
      ]
    : [
        { k: "Licensed", v: `${serviceLabel} trade` },
        { k: "Flat rate", v: "Quote before tools" },
        { k: "Photo", v: "Documented closeout" },
        { k: "60 min", v: `${cityName} on-site target` },
      ];

  // Cross-link siblings: cap at 12 for the city hub, 8 for service_in_city.
  const siblingDisplay = isHub
    ? siblingServices.slice(0, 12)
    : siblingServices.slice(0, 8);

  // Industry triptych — three audience cards using distinct images
  const industryTriptych = [
    {
      slug: "property-managers",
      label: "Property managers",
      tagline: `Single dispatch and master billing across the buildings you run in ${cityName}.`,
      img: { src: IMAGES.edPropertyManagersHero, alt: IMAGES.edPropertyManagersHeroAlt },
    },
    {
      slug: "multi-family-buildings",
      label: "Multi family operators",
      tagline: `In-unit emergency response and recurring common area service for ${cityName} portfolios.`,
      img: { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    },
    {
      slug: "commercial-property-owners",
      label: "Commercial owners",
      tagline: `Office, retail, and industrial maintenance on a single ${cityName} dispatch desk.`,
      img: { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    },
  ];

  // FAQ — expand thin placeholder FAQs into a richer 6-question set.
  const faqItems: { q: string; a: string }[] = (() => {
    const supplied = page.faq && page.faq.length > 0
      ? page.faq.filter((f) => !/Do you serve/.test(f.q))
      : [];
    const filler = isHub
      ? [
          {
            q: `Does Bridgepoint cover all of ${cityName}?`,
            a: `Yes. We dispatch across ${cityName} and the surrounding service zone. Tell the dispatcher the address and they confirm coverage in real time before the truck rolls.`,
          },
          {
            q: `What trades does Bridgepoint run in ${cityName}?`,
            a: `Plumbing, electrical, HVAC, carpentry, drywall and paint, general repairs, preventative maintenance, unit turnovers, commercial contracting, tenant fit outs, facility maintenance, and building upkeep.`,
          },
          {
            q: `How fast can a Bridgepoint truck reach my ${cityName} address?`,
            a: `Live answer on the dispatch line. Emergency calls in core ${cityName} zones target an on site arrival inside 60 minutes. Scheduled work books inside one business day.`,
          },
          {
            q: `Are your trades licensed for ${cityName} work?`,
            a: `Yes. Every visit runs with a trade carrying the local license and permits the work requires. License numbers print on the work order.`,
          },
          {
            q: `Can ${cityName} property managers run a portfolio account?`,
            a: `Yes. We set up master account billing with consolidated invoicing, work order routing by address, and portfolio reporting at month end.`,
          },
          {
            q: `What documentation do I get after the job?`,
            a: `A closeout work order with photographs, the license number of the trade who ran the call, and a line item invoice. Inbox delivery within seven days.`,
          },
        ]
      : [
          {
            q: `Do you run ${serviceLabel.toLowerCase()} in ${cityName}?`,
            a: `Yes. ${BRAND.name} dispatches licensed ${serviceLabel.toLowerCase()} into ${cityName} every day. Tell the dispatcher the address and the issue and the truck rolls.`,
          },
          {
            q: `Are your ${serviceLabel.toLowerCase()} trades licensed?`,
            a: `Yes. ${serviceLabel} calls in ${cityName} run with trades carrying the local license and permits. The license number is printed on every closeout work order.`,
          },
          {
            q: `How fast is a ${cityName} ${serviceLabel.toLowerCase()} call?`,
            a: `Live answer on the dispatch line. Emergency ${serviceLabel.toLowerCase()} calls target on site inside 60 minutes in core ${cityName} zones. Scheduled work books inside one business day.`,
          },
          {
            q: `Do you quote a flat rate before starting?`,
            a: `Yes. The tech walks the ${serviceLabel.toLowerCase()} issue on site, photographs the condition, and quotes a flat rate before any tools come out. You approve in person or forward to the property manager.`,
          },
          {
            q: `Can I set up a recurring ${serviceLabel.toLowerCase()} contract?`,
            a: `Yes. ${cityName} portfolios can sign on for scheduled ${serviceLabel.toLowerCase()} service on a recurring cadence with master account billing.`,
          },
          {
            q: `What documentation do I get after a ${serviceLabel.toLowerCase()} call?`,
            a: `Photos, license number, scope of work, and a line item invoice email within seven days. Audit ready for property managers and asset owners.`,
          },
        ];
    return [...supplied, ...filler].slice(0, 6);
  })();

  const heroEyebrow = isHub
    ? `${cityName} Coverage`
    : `${serviceLabel} in ${cityName}`;

  return (
    <>
      <SchemaJsonLd id={`ld-silo-${params.silo}`} data={buildSchema(page)} />

      {/* HERO — editorial full-bleed, service-specific image */}
      <PageHero
        eyebrow={heroEyebrow}
        title={page.title}
        description={page.meta_description}
        crumbs={[
          { name: "Home", href: "/" },
          { name: page.city, href: cityHub?.url || "/" },
          ...(page.type === "service_in_city"
            ? [{ name: page.service_label || "" }]
            : []),
        ]}
        image={heroImage}
        imageAlt={page.image_alt}
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* TRUST BAND — page-specific stat row, large numerals, no icons */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative grid grid-cols-2 divide-x divide-white/10 py-7 md:grid-cols-4 md:py-9">
          {numbersBand.map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1 px-4 md:px-8">
              <div className="font-display text-2xl font-bold leading-none text-white md:text-3xl">
                {k}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300 md:text-xs">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW — 2-col layout with body prose + sticky aside */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={isHub ? "City coverage" : `${serviceLabel} dispatch`}
              title={isHub
                ? `${BRAND.name} dispatch in ${cityName}.`
                : `${serviceLabel} dispatch into ${cityName}.`}
              description={introCopy}
            />

            <div className="prose-bp mt-8">
              <p>{localContextCopy}</p>
              <p>{detailsCopy}</p>
              {neighborhoodsText && (
                <p>
                  Neighborhoods we run into across {cityName} include {neighborhoodsText}.
                </p>
              )}
            </div>

            {page.jurisdiction && (
              <div className="mt-8 rounded-2xl border border-steel-100 bg-steel-50/60 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                  Local jurisdiction
                </p>
                <p className="mt-2 text-sm text-steel-700">
                  Maintenance work in {cityName} is governed by{" "}
                  <a
                    href={page.jurisdiction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy underline underline-offset-2 hover:text-cyan-700"
                  >
                    {page.jurisdiction.body}
                  </a>{" "}
                  ({page.jurisdiction.statute}). Bridgepoint dispatched trades
                  carry the licenses the local work requires.
                </p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-cyan-300/40 bg-cyan-50/40 p-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                Talk to dispatch
              </p>
              <p className="font-display text-2xl font-bold text-navy mb-1">
                {NAP.phone}
              </p>
              <p className="mb-5 text-sm leading-relaxed text-steel-700">
                Live answer 24/7. Scope service, request a quote, or set up a
                maintenance contract in {cityName}.
              </p>
              <div className="flex flex-col gap-3">
                <a href={NAP.phoneTel} className="btn-accent w-full">
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
                <Link href="/contact" className="btn-secondary w-full">
                  Request service online
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-steel-100 bg-white p-7 shadow-soft">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                Why owners and managers call
              </h3>
              <ul className="space-y-3 text-sm text-steel-700">
                {[
                  "Live dispatcher 24/7. No callback queue.",
                  "Licensed trade on every visit.",
                  "Flat rate quote before tools come out.",
                  "Photo log and audit ready closeout.",
                  "Master account billing on request.",
                ].map((label) => (
                  <li key={label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {cityHub && !isHub && (
              <Link
                href={cityHub.url}
                className="block rounded-2xl border border-steel-100 bg-cream-100 p-6 transition hover:border-cyan-500 hover:shadow-soft"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                  {cityName} city hub
                </p>
                <p className="mt-2 font-display text-base font-semibold text-navy">
                  See every Bridgepoint service in {cityName}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
                  Open the hub
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}

            {/* City-level emergency hub cross-link — visible on every silo page */}
            <Link
              href={`/${page.city_key}-emergency`}
              className="block rounded-2xl border border-emergency/30 bg-emergency/[0.06] p-6 transition hover:border-emergency hover:shadow-soft"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emergency-700">
                24/7 {cityName} emergency
              </p>
              <p className="mt-2 font-display text-base font-semibold text-navy">
                Every emergency trade on one {cityName} dispatch number
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emergency-700">
                Open emergency hub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {page.national_service_url && (
              <Link
                href={page.national_service_url}
                className="block rounded-2xl border border-steel-100 bg-white p-6 transition hover:border-cyan-500 hover:shadow-soft"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                  National service line
                </p>
                <p className="mt-2 font-display text-base font-semibold text-navy">
                  {serviceLabel} across Canada and the US
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
                  Open the service page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            )}
          </aside>
        </div>
      </section>

      {/* DEEP DIVE — brief-driven H2/H3 grid rendered from per-page deep_dive HTML */}
      {page.deep_dive && (
        <section className="bg-white section-tight">
          <div className="container-bp">
            <SectionHeading
              eyebrow={isHub ? `${cityName} program depth` : `${serviceLabel} in ${cityName}, in depth`}
              title={isHub
                ? `How the ${cityName} dispatch program runs end to end.`
                : `What a ${serviceLabel.toLowerCase()} engagement looks like inside ${cityName}.`}
              className="mb-8"
            />
            <div
              className="deep-dive-content"
              dangerouslySetInnerHTML={{ __html: page.deep_dive }}
            />
          </div>
        </section>
      )}

      {/* EDITORIAL SCOPE GRID — 6 cards, image+text, distinct image per card */}
      <section className="bg-steel-50/40 section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Scope of work"
            title={isHub
              ? `What Bridgepoint dispatches across ${cityName}.`
              : `What a Bridgepoint ${serviceLabel.toLowerCase()} call covers in ${cityName}.`}
            description={isHub
              ? `Twelve trade lines route through one ${cityName} dispatch number. Every call runs the same flow end to end.`
              : `Every ${serviceLabel.toLowerCase()} call in ${cityName} runs the same flow. Tell us what is happening, we route the right trade, you get the photo documented closeout.`}
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scopeCards.map((item, i) => {
              const img = scopePool[i % scopePool.length];
              return (
                <article
                  key={item.title}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-steel-100 transition hover:shadow-elevated hover:ring-cyan-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/35 via-transparent to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-800 shadow-soft">
                      {String(i + 1).padStart(2, "0")} / Scope
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-6">
                    <h3 className="font-display text-lg font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-steel-600">
                      {item.body}
                    </p>
                    <a
                      href={NAP.phoneTel}
                      className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
                    >
                      Talk to {cityName} dispatch
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-STEP PROCESS — large numerals, no icons */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How dispatch works"
              title="From the first call to the closeout photo."
              description={`Every Bridgepoint ${cityName} work order moves through the same four step flow. Documented at every step so property managers, owners, and accountants can audit any visit.`}
            />
            <div className="mt-7 hidden lg:flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                {NAP.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Start a request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                t: "Live dispatcher answers",
                b: `A real ${cityName} dispatcher picks up. They capture the address, the issue, the property type, and write the work order against the right trade line.`,
              },
              {
                n: "02",
                t: "Licensed trade is routed",
                b: `${serviceLabel} routes to the nearest licensed truck inside the ${cityName} coverage zone. ETA writes to the work order and emails before the visit.`,
              },
              {
                n: "03",
                t: "Scoped and quoted on site",
                b: "The tech walks the issue, photographs the condition, and quotes a flat rate before any tools come out. Approve in person or forward to the property manager.",
              },
              {
                n: "04",
                t: "Photo documented closeout",
                b: "Photos, license number, scope of work, and a line item invoice email within seven days. Audit ready for property managers, asset owners, and accountants.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-7 shadow-soft transition hover:border-cyan-300 hover:shadow-cyan-glow"
              >
                <span className="font-display text-5xl font-extrabold tabular-nums text-cyan-700 leading-none">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-600">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SISTER SERVICES IN CITY — internal link map. City hubs show 12,
          service_in_city pages show siblings in the same city. */}
      {siblingDisplay.length > 0 && (
        <section className="bg-cream-100 section">
          <div className="container-bp">
            <SectionHeading
              eyebrow={isHub ? "Service lines in this city" : "Other services in this city"}
              title={isHub
                ? `What Bridgepoint runs in ${cityName}.`
                : `Other Bridgepoint services in ${cityName}.`}
              description={isHub
                ? `Pick a trade line for the full Bridgepoint dispatch model in ${cityName}.`
                : `Stack ${serviceLabel.toLowerCase()} with another Bridgepoint trade on the same work order. One dispatch number routes them.`}
              className="mb-10"
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblingDisplay.map((s) => (
                <li key={s.url}>
                  <Link
                    href={s.url}
                    className="group block h-full rounded-2xl border border-steel-100 bg-white p-6 transition hover:border-cyan-500 hover:shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                          {s.service_label || "Service"}
                        </p>
                        <p className="mt-2 font-display text-base font-semibold text-navy">
                          {s.title}
                        </p>
                        {s.service_blurb && (
                          <p className="mt-2 line-clamp-2 text-sm text-steel-600">
                            {s.service_blurb}
                          </p>
                        )}
                      </div>
                      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-steel-50 text-cyan-700 transition group-hover:bg-cyan-500 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CASE STUDY DARK BAND — full-bleed editorial image + stat grid */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={IMAGES.editorialBasement}
          alt={IMAGES.editorialBasementAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/35"
        />
        <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              {cityName} case file
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {isHub
                ? `Twelve trade lines on one ${cityName} dispatch desk.`
                : `${serviceLabel} call closed inside one visit.`}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
              {isHub
                ? `A ${cityName} residential portfolio handed twelve trade lines to Bridgepoint on a single dispatch number. Master account billing. Photo documented work orders on every visit. The asset manager now runs one report at month end instead of chasing six different vendors for invoices.`
                : `A ${cityName} property manager called in a ${serviceLabel.toLowerCase()} issue on a multi unit residential building. Dispatch routed the nearest stocked Bridgepoint truck. The licensed trade was on site, scoped the work, photographed the condition, and closed the job the same visit. Closeout work order emailed to the manager that night.`}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "1", v: "Dispatch number" },
                { k: "100%", v: "Photo documented" },
                { k: "Licensed", v: "Trades on call" },
                { k: "Net 30", v: "Master billing" },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur"
                >
                  <div className="font-display text-2xl font-bold leading-none text-white">
                    {k}
                  </div>
                  <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY TRIPTYCH — three audience cards with distinct industry images */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Built for"
            title={`The ${cityName} owners and operators we run service for.`}
            description={`Bridgepoint runs dedicated programs for the audiences that own and operate buildings in ${cityName}. Pick the program that matches your asset class for the full dispatch model.`}
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {industryTriptych.map((card) => (
              <Link
                key={card.slug}
                href={`/industries/${card.slug}`}
                className="group relative block overflow-hidden rounded-2xl shadow-soft ring-1 ring-steel-100 transition hover:ring-cyan-300 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Program
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                      {card.label}
                    </h3>
                    <p className="mt-2 text-sm leading-snug text-white/85">
                      {card.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-300">
                      See the program
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY SOURCES (if present in content) */}
      {(page.authority_citations || page.authority_citation) && (
        <section className="bg-steel-50/60 section-tight">
          <div className="container-bp">
            <SectionHeading
              eyebrow="Local authority sources"
              title={`Cited references for ${cityName}.`}
              align="left"
              className="mb-6"
            />
            <ul className="grid gap-3 max-w-3xl">
              {((page.authority_citations || []).concat(
                page.authority_citation ? [page.authority_citation] : []
              ) as Array<{ name: string; url: string; context?: string }>).map(
                (a, i) =>
                  a && a.url ? (
                    <li key={i} className="flex items-start gap-3 rounded-xl border border-steel-100 bg-white p-4">
                      <ExternalLink className="mt-1 h-4 w-4 flex-none text-cyan-700" />
                      <div>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-navy underline hover:text-cyan-700"
                        >
                          {a.name}
                        </a>
                        {a.context && (
                          <p className="mt-1 text-sm text-steel-600">
                            {a.context}
                          </p>
                        )}
                      </div>
                    </li>
                  ) : null
              )}
            </ul>
          </div>
        </section>
      )}

      {/* CROSS LINK DARK BAND — industries + featured metros */}
      <section className="relative overflow-hidden bg-navy-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-3xl"
        />
        <div className="container-bp relative section">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                Industries we serve
              </p>
              <ul className="space-y-2 text-sm">
                {FEATURED_INDUSTRIES.map((i) => (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="h-3.5 w-3.5 text-cyan-300" />
                        {i.name}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {!isHub && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Other {cityName} services
                </p>
                <ul className="space-y-2 text-sm">
                  {SILO_SERVICE_SLUGS.filter((s) => s !== serviceSlug)
                    .slice(0, 6)
                    .map((s) => {
                      const sibling = siblingServices.find(
                        (p) => p.service_slug === s
                      );
                      if (!sibling) return null;
                      return (
                        <li key={s}>
                          <Link
                            href={sibling.url}
                            className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                          >
                            <span className="flex items-center gap-2">
                              <Wrench className="h-3.5 w-3.5 text-cyan-300" />
                              {SERVICE_LABEL_MAP[s] || s}
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {isHub && (
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                  Local guides
                </p>
                <ul className="space-y-2 text-sm">
                  {cityBlogs.slice(0, 6).map((b) => (
                    <li key={b.url}>
                      <Link
                        href={b.url}
                        className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
                          <span className="line-clamp-1">{b.title}</span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                  {cityBlogs.length === 0 && (
                    <li className="text-white/65 text-sm">
                      <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-cyan-300" />
                        Local guides publishing soon
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                Service area
              </p>
              <ul className="space-y-2 text-sm">
                {cityHub && (
                  <li>
                    <Link
                      href={cityHub.url}
                      className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                        {cityName} hub
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/locations"
                    className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                      All service areas
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <a
                    href={NAP.phoneTel}
                    className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-cyan-300" />
                      {NAP.phone}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-steel-50 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQ"
              title={isHub
                ? `${cityName} maintenance questions, answered.`
                : `${serviceLabel} in ${cityName}, answered.`}
              description={`Common questions from ${cityName} property managers, commercial owners, and homeowners about Bridgepoint dispatch.`}
            />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CITY BLOGS — only render if there are blogs for this city */}
      {cityBlogs.length > 0 && (
        <section className="bg-white section">
          <div className="container-bp">
            <SectionHeading
              eyebrow="Local guides"
              title={`More from ${cityName}.`}
              className="mb-8"
            />
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cityBlogs.slice(0, 6).map((b) => (
                <li key={b.url}>
                  <Link
                    href={b.url}
                    className="group block h-full rounded-2xl border border-steel-100 bg-white p-6 transition hover:border-cyan-500 hover:shadow-soft"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
                      {cityName} guide
                    </p>
                    <p className="mt-2 font-display text-base font-semibold text-navy line-clamp-3">
                      {b.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-700">
                      Read the guide
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection
        title={isHub
          ? `Need a Bridgepoint truck in ${cityName}?`
          : `Need ${serviceLabel.toLowerCase()} in ${cityName}?`}
        body={`Call dispatch to scope service, request a quote, or set up a maintenance contract in ${cityName}.`}
      />
    </>
  );
}
