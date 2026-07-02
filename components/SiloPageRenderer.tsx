import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowUpRight,
  AlertTriangle,
  Building2,
  Wrench,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FaqAccordion from "@/components/FaqAccordion";
import CTASection from "@/components/CTASection";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import type { SiloPage } from "@/lib/silo-services";
import { SERVICE_PAGES } from "@/lib/silo-services";
import { EMERGENCY_PAGES } from "@/lib/silo-emergency";
import { INDUSTRY_PAGES } from "@/lib/silo-industries";

// Editorial scope image pool — rotates through trade imagery so 35+ silo pages
// don't look identical. Each silo slug maps to a 3-image set used in the
// scope-of-work editorial grid below.
const SCOPE_IMAGES_DEFAULT = [
  { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
  { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
  { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
  { src: IMAGES.tradeWaterHeater, alt: IMAGES.tradeWaterHeaterAlt },
  { src: IMAGES.hvacDuctwork, alt: IMAGES.hvacDuctworkAlt },
];

const SCOPE_IMAGES_BY_SLUG: Record<string, { src: string; alt: string }[]> = {
  plumbing: [
    { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
    { src: IMAGES.plumbingPipes, alt: IMAGES.plumbingPipesAlt },
    { src: IMAGES.plumbingWaterHeater, alt: IMAGES.plumbingWaterHeaterAlt },
    { src: IMAGES.plumbingDrain, alt: IMAGES.plumbingDrainAlt },
    { src: IMAGES.plumbingRepair, alt: IMAGES.plumbingRepairAlt },
    { src: IMAGES.tradeWaterHeater, alt: IMAGES.tradeWaterHeaterAlt },
  ],
  electrical: [
    { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt },
    { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
    { src: IMAGES.electricalWires, alt: IMAGES.electricalWiresAlt },
    { src: IMAGES.tradeEvCharger, alt: IMAGES.tradeEvChargerAlt },
    { src: IMAGES.electricalLighting, alt: IMAGES.electricalLightingAlt },
    { src: IMAGES.electricalEvCharger, alt: "Licensed electrician installing a breaker" },
  ],
  hvac: [
    { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
    { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
    { src: IMAGES.hvacCondenser, alt: IMAGES.hvacCondenserAlt },
    { src: IMAGES.hvacDuctwork, alt: IMAGES.hvacDuctworkAlt },
    { src: IMAGES.hvacFurnace, alt: "Residential furnace install" },
    { src: IMAGES.galleryEvInstall, alt: "Smart thermostat install" },
  ],
  carpentry: [
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.toolsBag, alt: IMAGES.toolsBagAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
  ],
  "drywall-and-painting": [
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
  ],
  "general-repairs": [
    { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.technicianMeeting, alt: IMAGES.technicianMeetingAlt },
  ],
  "preventative-maintenance": [
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.hvacFurnace, alt: "Furnace inspection" },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
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
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
  ],
  "tenant-fit-outs": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.tradeDrywall, alt: IMAGES.tradeDrywallAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
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
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.tradePainting, alt: IMAGES.tradePaintingAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
  ],

  // Emergency
  "water-damage": [
    { src: IMAGES.edWaterDamageHero, alt: IMAGES.edWaterDamageHeroAlt },
    { src: IMAGES.tradeRestoration, alt: IMAGES.tradeRestorationAlt },
    { src: IMAGES.tradeRestorationB, alt: IMAGES.tradeRestorationBAlt },
    { src: IMAGES.emergency02, alt: IMAGES.emergency02Alt },
    { src: IMAGES.emergency03, alt: IMAGES.emergency03Alt },
    { src: IMAGES.emergency04, alt: IMAGES.emergency04Alt },
  ],
  "burst-pipes": [
    { src: IMAGES.emergency02, alt: IMAGES.emergency02Alt },
    { src: IMAGES.emergency03, alt: IMAGES.emergency03Alt },
    { src: IMAGES.tradeRestoration, alt: IMAGES.tradeRestorationAlt },
    { src: IMAGES.tradeRestorationB, alt: IMAGES.tradeRestorationBAlt },
    { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
    { src: IMAGES.plumbingRepair, alt: IMAGES.plumbingRepairAlt },
  ],
  "no-heat": [
    { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
    { src: IMAGES.hvacFurnace, alt: "Residential furnace serviced" },
    { src: IMAGES.edHeatingHero, alt: IMAGES.edHeatingHeroAlt },
    { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
    { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
    { src: IMAGES.galleryEvInstall, alt: "Smart thermostat install" },
  ],
  "no-cooling": [
    { src: IMAGES.hvacCondenser, alt: IMAGES.hvacCondenserAlt },
    { src: IMAGES.edCoolingHero, alt: IMAGES.edCoolingHeroAlt },
    { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
    { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
    { src: IMAGES.galleryEvInstall, alt: "Smart thermostat install" },
  ],
  "no-power": [
    { src: IMAGES.noPowerServiceEntrance, alt: IMAGES.noPowerServiceEntranceAlt },
    { src: IMAGES.noPowerMainPanelFailure, alt: IMAGES.noPowerMainPanelFailureAlt },
    { src: IMAGES.noPowerUtilityCoordination, alt: IMAGES.noPowerUtilityCoordinationAlt },
    { src: IMAGES.noPowerStormDamage, alt: IMAGES.noPowerStormDamageAlt },
    { src: IMAGES.noPowerGeneratorTransfer, alt: IMAGES.noPowerGeneratorTransferAlt },
    { src: IMAGES.noPowerCommercialOutage, alt: IMAGES.noPowerCommercialOutageAlt },
  ],
  "roof-damage": [
    { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.emergency04, alt: IMAGES.emergency04Alt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
  ],
  "storm-damage": [
    { src: IMAGES.emergency04, alt: IMAGES.emergency04Alt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.tradeRestoration, alt: IMAGES.tradeRestorationAlt },
    { src: IMAGES.tradeRestorationB, alt: IMAGES.tradeRestorationBAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
  ],
  "sewer-backups": [
    { src: IMAGES.edDrainHero, alt: IMAGES.edDrainHeroAlt },
    { src: IMAGES.tradeDrainAuger, alt: IMAGES.tradeDrainAugerAlt },
    { src: IMAGES.plumbingDrain, alt: IMAGES.plumbingDrainAlt },
    { src: IMAGES.tradeSewerCamera, alt: IMAGES.tradeSewerCameraAlt },
    { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
    { src: IMAGES.emergency01, alt: IMAGES.emergency01Alt },
  ],
  "boiler-failure": [
    { src: IMAGES.hvacFurnace, alt: IMAGES.hvacFurnaceAlt },
    { src: IMAGES.hvacFurnace, alt: "Boiler service" },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
    { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  ],

  // Industries
  "property-managers": [
    { src: IMAGES.edPropertyManagersHero, alt: IMAGES.edPropertyManagersHeroAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.technicianCustomer, alt: IMAGES.technicianCustomerAlt },
  ],
  landlords: [
    { src: IMAGES.edPropertyManagersHero, alt: IMAGES.edPropertyManagersHeroAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.technicianCustomer, alt: IMAGES.technicianCustomerAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
  ],
  "multi-family-buildings": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
  ],
  "commercial-property-owners": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
    { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
  ],
  "residential-property-owners": [
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
    { src: IMAGES.technicianCustomer, alt: IMAGES.technicianCustomerAlt },
    { src: IMAGES.editorialHero, alt: IMAGES.editorialHeroAlt },
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.editorialDoor, alt: IMAGES.editorialDoorAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
  ],
  "retail-and-office": [
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
    { src: IMAGES.electricalPanel, alt: IMAGES.electricalPanelAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
  ],
  "condominium-corporations": [
    { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
  ],
  "institutional-asset-holders": [
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.industrialPipes, alt: IMAGES.industrialPipesAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.hvacRooftop, alt: IMAGES.hvacRooftopAlt },
  ],
  "real-estate-investors": [
    { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
    { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
    { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
  ],
  "trades-and-subcontractors": [
    { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
    { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt },
    { src: IMAGES.toolsKit, alt: IMAGES.toolsKitAlt },
    { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt },
    { src: IMAGES.brandTechsTablet, alt: IMAGES.brandTechsTabletAlt },
    { src: IMAGES.brandVanResidential, alt: IMAGES.brandVanResidentialAlt },
  ],
};

// Case-study image per silo type (used in the editorial outcome band).
const CASE_STUDY_IMAGES_BY_SILO: Record<string, { src: string; alt: string }> = {
  "/services": { src: IMAGES.editorialBasement, alt: IMAGES.editorialBasementAlt },
  "/emergency": { src: IMAGES.brandVanResidential, alt: "Bridgepoint emergency response van on a residential call" },
  "/industries": { src: IMAGES.buildingTowers, alt: IMAGES.buildingTowersAlt },
};

const INDUSTRY_TRIPTYCH: { slug: string; label: string; tagline: string; img: { src: string; alt: string } }[] = [
  {
    slug: "property-managers",
    label: "Property managers",
    tagline: "Single dispatch, consolidated billing, portfolio reporting.",
    img: { src: IMAGES.edPropertyManagersHero, alt: IMAGES.edPropertyManagersHeroAlt },
  },
  {
    slug: "multi-family-buildings",
    label: "Multi family operators",
    tagline: "In-unit emergency response and recurring common-area service.",
    img: { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
  },
  {
    slug: "commercial-property-owners",
    label: "Commercial owners",
    tagline: "Office, retail, industrial. Code-compliance and mechanical work.",
    img: { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  },
];

type Props = {
  page: SiloPage;
  siloRoot: string; // e.g. "/services", "/emergency", "/industries", "/locations", "/resources"
  siloLabel: string;
  heroImage?: string;
  emergency?: boolean;
};

// Top metros for cross-linking from any silo detail page. Each links into the
// new province-nested locations route.
const FEATURED_METROS = [
  { name: "Toronto", href: "/locations/ontario/toronto" },
  { name: "New York City", href: "/locations/new-york/new-york-city" },
  { name: "Miami", href: "/locations/florida/miami" },
  { name: "Houston", href: "/locations/texas/houston" },
  { name: "Los Angeles", href: "/locations/california/los-angeles" },
  { name: "Chicago", href: "/locations/illinois/chicago" },
];

const FEATURED_INDUSTRIES = [
  { name: "Property managers", href: "/industries/property-managers" },
  { name: "Multi family buildings", href: "/industries/multi-family-buildings" },
  { name: "Commercial owners", href: "/industries/commercial-property-owners" },
  { name: "Condominium corporations", href: "/industries/condominium-corporations" },
];

export default function SiloPageRenderer({
  page,
  siloRoot,
  siloLabel,
  heroImage,
  emergency,
}: Props) {
  const url = `${BRAND.url}${siloRoot}/${page.slug}`;
  const image = heroImage || IMAGES.edServicesHero;
  // Location pages (cities) need different default copy than service/industry
  // pages, since "About toronto." reads awkwardly. Location defaults frame the
  // page around dispatch into the city.
  const isLocation = siloRoot === "/locations" || siloRoot === "/service-areas";
  const cityName = page.shortName;

  const defaultOverview = isLocation
    ? `Bridgepoint dispatch in ${cityName}.`
    : `About ${page.shortName.toLowerCase()}.`;
  const defaultFaqTitle = isLocation
    ? `${cityName} service questions, answered.`
    : `${page.shortName} questions, answered.`;
  const defaultFaqDescription = isLocation
    ? `Common questions about Bridgepoint Maintenance dispatch in ${cityName}.`
    : `Common questions about ${page.shortName.toLowerCase()} from property managers, commercial owners, and homeowners.`;
  const defaultCtaTitle = isLocation
    ? `Need a Bridgepoint truck in ${cityName}?`
    : emergency
      ? `Need ${page.shortName.toLowerCase()} now?`
      : `Talk to Bridgepoint about ${page.shortName.toLowerCase()}.`;
  const defaultCtaBody = isLocation
    ? `Call dispatch to scope service, request a quote, or set up a maintenance contract in ${cityName}.`
    : emergency
      ? "Call dispatch for trade routed emergency response across Canada and the US."
      : "Call dispatch to scope service, request a quote, or set up a maintenance contract.";

  // Cross-link calculations for SEO interlinking ("related services" from a
  // services or emergency page; "matching emergency" lookups when slugs align).
  const inServices = siloRoot === "/services";
  const inEmergency = siloRoot === "/emergency";
  const inIndustries = siloRoot === "/industries";

  // Map a service slug to its emergency counterpart and vice versa when one exists.
  const matchingEmergency = inServices
    ? EMERGENCY_PAGES.find((e) => e.slug === page.slug)
    : null;
  const matchingService = inEmergency
    ? SERVICE_PAGES.find((s) => s.slug === page.slug)
    : null;

  // 4 related services across the silo (not including self).
  const relatedServices = (
    inServices
      ? SERVICE_PAGES.filter((s) => s.slug !== page.slug)
      : inEmergency
        ? SERVICE_PAGES
        : SERVICE_PAGES
  ).slice(0, 4);

  // 4 related industries
  const relatedIndustries = inIndustries
    ? INDUSTRY_PAGES.filter((i) => i.slug !== page.slug).slice(0, 4)
    : INDUSTRY_PAGES.slice(0, 4);

  return (
    <>
      <SchemaJsonLd
        id={`ld-silo-${siloRoot.replace(/\//g, "")}-${page.slug}`}
        data={serviceSchema(page.name, page.tagline)}
      />
      <SchemaJsonLd
        id={`ld-silo-faq-${siloRoot.replace(/\//g, "")}-${page.slug}`}
        data={faqSchema(page.faq)}
      />
      <SchemaJsonLd
        id={`ld-silo-crumb-${siloRoot.replace(/\//g, "")}-${page.slug}`}
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: siloLabel, url: `${BRAND.url}${siloRoot}` },
          { name: page.name, url },
        ])}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={page.name}
        description={page.tagline}
        crumbs={[
          { name: "Home", href: "/" },
          { name: siloLabel, href: siloRoot },
          { name: page.shortName },
        ]}
        image={image}
        imageAlt={page.name}
        size="compact"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {emergency ? `24/7 Emergency · ${NAP.phone}` : NAP.phone}
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Editorial stat row — page-specific trust pillars (no NA / "US + CA" filler
          on internal pages). Industries get a workflow-pillar row, emergency gets
          a response row, services get a service row. No icons; large numerals. */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative grid grid-cols-2 divide-x divide-white/10 py-7 md:grid-cols-4 md:py-9">
          {(emergency
            ? [
                { k: "24 / 7", v: "Live dispatch line" },
                { k: "60 min", v: "On-site target" },
                { k: "Published", v: "After hours rates" },
                { k: "Photo", v: "Documented closeout" },
              ]
            : inIndustries
              ? [
                  { k: "One", v: "Single point of contact" },
                  { k: "Portfolio", v: "Bulk dispatch and reporting" },
                  { k: "Photo", v: "Documented work order" },
                  { k: "Net 30", v: "Master account billing" },
                ]
              : [
                  { k: "Licensed", v: "Trade on every visit" },
                  { k: "Quote", v: "Flat rate before work starts" },
                  { k: "Photo", v: "Documented closeout" },
                  { k: "One", v: "Accountable team" },
                ]
          ).map(({ k, v }) => (
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

      {/* OVERVIEW */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={page.eyebrow}
              title={page.overviewTitle ?? defaultOverview}
              description={page.intro}
            />

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {page.scope.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-steel-100 bg-steel-50/50 p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-700" />
                    <div>
                      <h3 className="font-display text-base font-semibold text-navy-700">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-steel-600 leading-snug">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="prose-bp mt-12">
              <h2>Why owners and managers call Bridgepoint</h2>
              <p>{page.whyUs}</p>
            </div>

            {/* What to expect — extra depth for thin pages */}
            <div className="mt-12 rounded-2xl border border-steel-100 bg-white p-7 shadow-soft">
              <h2 className="font-display text-2xl font-bold text-navy">
                What to expect when you call
              </h2>
              <ol className="mt-5 space-y-4 text-sm text-steel-700">
                <li className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-700">
                    1
                  </span>
                  <span>
                    Live dispatcher answers, captures the address, the issue,
                    and the property type. Shutoff or safe state guidance over
                    the phone while the truck rolls.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-700">
                    2
                  </span>
                  <span>
                    Licensed trade is routed and an ETA written to the work
                    order. You see the dispatch confirmation in your inbox.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-700">
                    3
                  </span>
                  <span>
                    Tech scopes on site, photographs the condition, and quotes
                    a flat rate before any tools come out. Approve in person or
                    forward to the listed property manager.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cyan-500/10 text-xs font-bold text-cyan-700">
                    4
                  </span>
                  <span>
                    Closeout work order with photos, license number, and a
                    follow up call lands in your inbox within seven days.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
                {emergency ? "24/7 emergency dispatch" : "Talk to dispatch"}
              </p>
              <p className="font-display text-2xl font-bold text-navy mb-1">
                {NAP.phone}
              </p>
              <p className="text-sm text-steel-500 mb-5 leading-relaxed">
                {emergency
                  ? "Live answer 24/7. Trade on site, not a callback queue."
                  : "Scope service, request a quote, or set up a maintenance contract."}
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

            <div className="card">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-4">
                Why Bridgepoint
              </h3>
              <ul className="space-y-3 text-sm">
                {(emergency
                  ? [
                      "Live dispatcher 24/7. No callback queue.",
                      "On-site target inside 60 minutes in covered metros.",
                      "After hours rates published before the truck rolls.",
                      "Photo log and license number on every closeout.",
                    ]
                  : inIndustries
                    ? [
                        "Single point of contact across your portfolio.",
                        "Bulk dispatch with one consolidated work queue.",
                        "Master account billing with line item invoicing.",
                        "Portfolio reporting on response and resolution times.",
                      ]
                    : [
                        "Licensed trade on every visit.",
                        "Flat rate quote before any tools come out.",
                        "Stocked trucks for first visit completion.",
                        "Photo log and audit ready work order.",
                      ]
                ).map((label) => (
                  <li
                    key={label}
                    className="flex items-start gap-3 text-steel-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-700 flex-none" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {matchingEmergency && (
              <div className="card border-emergency/30 bg-emergency/5">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emergency mb-3">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  If this is an emergency
                </h3>
                <p className="text-sm text-steel-700 leading-snug mb-3">
                  Active leak, no heat, no power, or after hours dispatch needed
                  in {page.shortName.toLowerCase()}?
                </p>
                <Link
                  href={`/emergency/${matchingEmergency.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-emergency hover:underline"
                >
                  Go to {matchingEmergency.name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            {matchingService && (
              <div className="card">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 mb-3">
                  <Wrench className="h-3.5 w-3.5" />
                  Not an emergency?
                </h3>
                <p className="text-sm text-steel-700 leading-snug mb-3">
                  For scheduled work and standard repair calls, see our
                  {" "}
                  {matchingService.shortName.toLowerCase()} service line.
                </p>
                <Link
                  href={`/services/${matchingService.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-cyan-700 hover:underline"
                >
                  Go to {matchingService.name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            <div className="card">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-4">
                Related Bridgepoint pages
              </h3>
              <ul className="space-y-2 text-sm">
                {page.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="flex items-center justify-between text-navy hover:text-cyan-700"
                    >
                      <span>{r.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* EDITORIAL SCOPE GRID — image + text cards, one per scope item.
          Replaces the contractor-template look with documentary photography
          paired to each sub-trade. */}
      {page.scope.length > 0 && (
        <section className="bg-steel-50/40 section">
          <div className="container-bp">
            <SectionHeading
              eyebrow="Scope of work"
              title={
                isLocation
                  ? `What Bridgepoint dispatches in ${cityName}.`
                  : `Everything covered under ${page.shortName.toLowerCase()}.`
              }
              description={
                isLocation
                  ? `Twelve trade lines route through one dispatch number into ${cityName}. Here is the work the trucks roll for.`
                  : `Each work line below routes through the same dispatch desk. Tell us which one matches the issue and we will route the right licensed trade.`
              }
              className="mb-12"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {page.scope.slice(0, 6).map((item, i) => {
                const pool =
                  SCOPE_IMAGES_BY_SLUG[page.slug] || SCOPE_IMAGES_DEFAULT;
                const img = pool[i % pool.length];
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
                      <p className="text-sm text-steel-600 leading-relaxed">
                        {item.body}
                      </p>
                      <a
                        href={NAP.phoneTel}
                        className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
                      >
                        Talk to dispatch
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                {emergency ? `24/7 dispatch · ${NAP.phone}` : NAP.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* EDITORIAL 4-STEP PROCESS — large numerals, no icons. Mirrors MSR's
          5-step process narrative but tuned to dispatch + trade workflow. */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How dispatch works"
              title={
                emergency
                  ? "From the first ring to the closeout photo."
                  : "From the first call to the closeout photo."
              }
              description={
                emergency
                  ? "Bridgepoint runs a live emergency desk. The flow below is the same every time, in every market we cover."
                  : "Every Bridgepoint work order moves through the same four-step flow. Documented at every step so property managers, owners, and accountants can audit any visit."
              }
            />
            <div className="mt-7 hidden lg:block">
              <Link href="/contact" className="btn-primary">
                Start a request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                t: emergency ? "Live dispatcher answers" : "Live dispatcher answers",
                b: emergency
                  ? "A real person picks up around the clock. They capture the address, the issue, and any safety steps you can take while the truck rolls."
                  : "A dispatcher captures the address, the issue, and the property type, then writes the work order against the right trade line.",
              },
              {
                n: "02",
                t: "Licensed trade is routed",
                b: emergency
                  ? `${page.shortName} routes to the nearest stocked truck. ETA writes to the work order. You get a dispatch confirmation in your inbox.`
                  : `${page.shortName} routes to the nearest licensed trade. ETA is written to the work order and emailed before the truck rolls.`,
              },
              {
                n: "03",
                t: "Scoped and quoted on site",
                b: "The tech walks the issue, photographs the condition, and quotes a flat rate before any tools come out. Approve in person or forward the quote to the property manager.",
              },
              {
                n: "04",
                t: "Photo documented closeout",
                b: "Photos, license number, and line-item invoice land in your inbox within seven days. Every job is audit ready if an insurance claim or property transfer follows.",
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
                <p className="mt-2 text-sm text-steel-600 leading-relaxed">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
          <div className="lg:hidden">
            <Link href="/contact" className="btn-primary">
              Start a request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CASE STUDY BAND — single full-width editorial image + caption with
          outcome stat. Replaces the contractor-template look with documentary
          proof. */}
      {(() => {
        const cs =
          CASE_STUDY_IMAGES_BY_SILO[siloRoot] ||
          { src: IMAGES.editorialBasement, alt: IMAGES.editorialBasementAlt };
        return (
          <section className="relative overflow-hidden bg-navy-900 text-white">
            <Image
              src={cs.src}
              alt={cs.alt}
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
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300 mb-4">
                  Case file
                </p>
                <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {emergency
                    ? `${page.shortName} call closed in under two hours.`
                    : `${page.shortName} program running on a Greater Toronto Area portfolio.`}
                </h2>
                <p className="mt-5 max-w-2xl text-base text-white/85 leading-relaxed">
                  {emergency
                    ? `A property manager called in an active ${page.shortName.toLowerCase()} incident on a multi-unit residential building. Dispatch routed the nearest stocked Bridgepoint truck. The licensed trade was on site inside 60 minutes, scoped the work, photographed the condition, and closed the job out the same visit. Closeout work order with photos and license number was emailed to the manager that night.`
                    : `Bridgepoint picked up a recurring ${page.shortName.toLowerCase()} program across a Greater Toronto Area residential portfolio. Single dispatch line. Master account billing. Photo-documented work orders on every visit. The asset manager runs one report at month end instead of chasing six different vendors for invoices.`}
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {(emergency
                    ? [
                        { k: "< 60 min", v: "On site target" },
                        { k: "1", v: "Visit closeout" },
                        { k: "100%", v: "Photo documented" },
                        { k: "24 / 7", v: "Live dispatcher" },
                      ]
                    : [
                        { k: "1", v: "Dispatch number" },
                        { k: "12", v: "Trade lines" },
                        { k: "Net 30", v: "Master billing" },
                        { k: "100%", v: "Photo closeout" },
                      ]
                  ).map(({ k, v }) => (
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
        );
      })()}

      {/* INDUSTRY TRIPTYCH — three audience cards routing into /industries. */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Built for"
            title="The owners and operators who keep buildings running."
            description="Bridgepoint runs dedicated programs for the audiences that own and operate buildings. Pick the program that matches your asset class for the full dispatch model."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {INDUSTRY_TRIPTYCH.map((card) => (
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
                    <p className="mt-2 text-sm text-white/85 leading-snug">
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

      {/* DARK CROSS-LINK BAND — related silos for SEO + UX */}
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
            {(inServices || inEmergency) && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-3">
                  Related services
                </p>
                <ul className="space-y-2 text-sm">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                      >
                        <span>{s.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {inIndustries && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-3">
                  Other industries we serve
                </p>
                <ul className="space-y-2 text-sm">
                  {relatedIndustries.map((i) => (
                    <li key={i.slug}>
                      <Link
                        href={`/industries/${i.slug}`}
                        className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                      >
                        <span>{i.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!inIndustries && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-3">
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
            )}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-3">
                Available in
              </p>
              <ul className="space-y-2 text-sm">
                {FEATURED_METROS.map((m) => (
                  <li key={m.href}>
                    <Link
                      href={m.href}
                      className="group flex items-center justify-between text-white/85 hover:text-cyan-300"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                        {m.name}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 hover:underline"
                  >
                    View all service areas
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
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
              title={page.faqTitle ?? defaultFaqTitle}
              description={page.faqDescription ?? defaultFaqDescription}
            />
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={page.faq} />
          </div>
        </div>
      </section>

      <CTASection
        variant={emergency ? "emergency" : "default"}
        title={page.ctaTitle ?? defaultCtaTitle}
        body={page.ctaBody ?? defaultCtaBody}
      />
    </>
  );
}
