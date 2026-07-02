const UNSPLASH = "https://images.unsplash.com";

const u = (id: string, w = 1920, q = 80) =>
 `${UNSPLASH}/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/**
 * Locally generated and curated photos.
 * All branded shots live in /public/img/branded/, raw trade scenes in /public/img/trade/,
 * and gallery before/after pairs in /public/img/gallery/.
 *
 * Generated 2026-04-30 via Imagen 4 with cyan-turquoise branding for Bridgepoint.
 */
const LOCAL = {
 // Editorial-grade documentary photography (Imagen 4, May 2026 — premium elevation pass)
 // Documentary 50mm/35mm, golden hour, no AI-tell triggers (no faces toward camera, no signage)
 editorialHero: "/img/hero/hero-tech-van-residential.jpg",
 editorialBasement: "/img/editorial/editorial-tech-basement-plumbing.jpg",
 editorialRooftop: "/img/editorial/editorial-tech-rooftop-hvac.jpg",
 editorialDoor: "/img/editorial/editorial-tech-customer-door.jpg",

 // Interior page editorial heroes (May 2026 elevation, Imagen 4)
 // Documentary photography. Saved as PNG; Next /img tag handles them as static.
 edAboutHero: "/img/editorial/ed-about-hero.png",
 edServicesHero: "/img/editorial/ed-services-hero.png",
 edPlumbingHero: "/img/editorial/ed-plumbing-hero.webp",
 edHeatingHero: "/img/editorial/ed-heating-hero.webp",
 edCoolingHero: "/img/editorial/ed-cooling-hero.png",
 edDrainHero: "/img/editorial/ed-drain-hero.png",
 edWaterDamageHero: "/img/editorial/ed-water-damage-hero.png",
 edPropertyManagersHero: "/img/editorial/ed-property-managers-hero.png",
 edFindTechHero: "/img/editorial/ed-find-tech-hero.png",
 edContactHero: "/img/editorial/ed-contact-hero.png",
 edQuoteHero: "/img/editorial/ed-quote-hero.png",
 edGalleryHero: "/img/editorial/ed-gallery-hero.png",
 edPricingHero: "/img/editorial/ed-pricing-hero.png",
 edHelpHero: "/img/editorial/ed-help-hero.png",
 edLocationsHero: "/img/editorial/ed-locations-hero.png",

 // Original locally generated set
 hero: "/img/hero.jpg",
 fleet: "/img/fleet.jpg",
 workPlumbing: "/img/work-plumbing.jpg",
 workElectrical: "/img/work-electrical.jpg",
 workHvac: "/img/work-hvac.jpg",

 // Bridgepoint-branded vans + techs (Imagen 4, cyan brand palette)
 brandVanResidential: "/img/branded/van-residential.jpg",
 brandVanCondo: "/img/branded/van-condo.jpg",
 brandTechToolbox: "/img/branded/tech-uniform-toolbox.jpg",
 brandTechRooftop: "/img/branded/tech-rooftop-condenser.jpg",
 brandTechPlumbing: "/img/branded/tech-under-sink-plumbing.jpg",
 brandTechsTablet: "/img/branded/techs-tablet-van.jpg",
 brandFleetRow: "/img/branded/fleet-row.jpg",

 // Trade-specific scenes (no people / clean install shots)
 tradeWaterHeater: "/img/trade/trade-water-heater.jpg",
 tradeFurnace: "/img/trade/trade-furnace-basement.jpg",
 tradeThermostat: "/img/trade/trade-thermostat-smart.jpg",
 tradeElectricalPanel: "/img/trade/trade-electrical-panel.jpg",
 tradeDuctwork: "/img/trade/trade-ductwork.jpg",

 // Gallery before/after pairs
 galFurnaceBefore: "/img/gallery/gallery-furnace-before.jpg",
 galFurnaceAfter: "/img/trade/trade-furnace-basement.jpg",
 galPipeBefore: "/img/gallery/gallery-pipe-before.jpg",
 galPipeAfter: "/img/gallery/gallery-pipe-after.jpg",
 galPanelBefore: "/img/gallery/gallery-panel-before.jpg",
 galPanelAfter: "/img/gallery/gallery-panel-after.jpg",
} as const;

export const LOCAL_IMG = LOCAL;

/**
 * Curated Unsplash IDs for trades / contractor visuals.
 * Verified IDs that consistently render trades / HVAC / plumbing / electrical content.
 *
 * Audit 2026-04-30: removed the AAA-Washington tow truck, vintage 1970s crew shot,
 * empty corporate offices, NYC / Tokyo / Chicago skylines that were mis-tagged as
 * GTA cities, web-analytics dashboards, EV-charger with competitor "evnex" branding,
 * brewery industrial pipes, demolition exterior, two-guys-at-a-laptop,
 * iPhone-home-screen, and other clichés. See `audit notes` in commit message.
 */
export const IMAGES = {
 // Editorial documentary photography (premium elevation, May 2026)
 editorialHero: LOCAL.editorialHero,
 editorialHeroAlt:
 "Bridgepoint service technician beside a service van in front of a Toronto residential home at golden hour",
 editorialBasement: LOCAL.editorialBasement,
 editorialBasementAlt:
 "Bridgepoint plumbing technician working on copper pipework in a residential basement",
 editorialRooftop: LOCAL.editorialRooftop,
 editorialRooftopAlt:
 "Bridgepoint HVAC technician servicing a residential rooftop condenser at late afternoon",
 editorialDoor: LOCAL.editorialDoor,
 editorialDoorAlt:
 "Bridgepoint technician handing a clipboard to a homeowner at a residential front door",

 // Interior page editorial heroes (May 2026 elevation pass)
 edAboutHero: LOCAL.edAboutHero,
 edAboutHeroAlt:
 "Documentary view of a Bridgepoint service van parked in front of a brick Toronto residential home at golden hour",
 edServicesHero: LOCAL.edServicesHero,
 edServicesHeroAlt:
 "Tradesman's leather tool belt and copper pipes on a wooden workbench in soft window light",
 edPlumbingHero: LOCAL.edPlumbingHero,
 edPlumbingHeroAlt:
 "A plumber's hand turning a wrench on copper pipework under a residential bathroom sink",
 edHeatingHero: LOCAL.edHeatingHero,
 edHeatingHeroAlt:
 "Residential furnace being serviced with a technician's hands turning a valve in soft natural light",
 edCoolingHero: LOCAL.edCoolingHero,
 edCoolingHeroAlt:
 "Residential AC condenser being serviced with a technician's hands working the unit in late afternoon light",
 edDrainHero: LOCAL.edDrainHero,
 edDrainHeroAlt:
 "Drain auger machine on a residential basement floor with copper plumbing visible above",
 edWaterDamageHero: LOCAL.edWaterDamageHero,
 edWaterDamageHeroAlt:
 "Hands placing a dehumidifier in a residential basement with damp drywall visible nearby",
 edPropertyManagersHero: LOCAL.edPropertyManagersHero,
 edPropertyManagersHeroAlt:
 "Clipboard and tablet on a residential building lobby table with a technician's hands reviewing notes",
 edFindTechHero: LOCAL.edFindTechHero,
 edFindTechHeroAlt:
 "A service van approaching a residential street with brick homes in warm afternoon light",
 edContactHero: LOCAL.edContactHero,
 edContactHeroAlt:
 "A notebook and pen on a clean wooden desk in a small office in soft window light",
 edQuoteHero: LOCAL.edQuoteHero,
 edQuoteHeroAlt:
 "A notebook and fountain pen on a wooden desk beside a coffee cup in soft window light",
 edGalleryHero: LOCAL.edGalleryHero,
 edGalleryHeroAlt:
 "A residential bathroom with copper plumbing visible in soft natural light, before-and-after restoration narrative",
 edPricingHero: LOCAL.edPricingHero,
 edPricingHeroAlt:
 "A clipboard with a written estimate on a wooden workbench beside a wrench and copper fittings",
 edHelpHero: LOCAL.edHelpHero,
 edHelpHeroAlt:
 "An open notebook and coffee cup on a wooden desk with technician's leather work gloves placed beside",
 edLocationsHero: LOCAL.edLocationsHero,
 edLocationsHeroAlt:
 "A residential Toronto street with brick homes lining the road in warm afternoon light",

 // Hero / general service
 homeHero: LOCAL.editorialHero,
 homeHeroAlt:
 "Bridgepoint service technician beside a service van in front of a Toronto residential home at golden hour",
 homeHeroB: LOCAL.brandVanCondo,
 homeHeroBAlt: "Bridgepoint Maintenance branded service van outside a Toronto condo",
 homeHeroC: LOCAL.brandFleetRow,
 homeHeroCAlt: "Row of Bridgepoint Maintenance service vans at golden hour",

 aboutHero: LOCAL.brandVanResidential,
 aboutHeroAlt: "Bridgepoint service van in front of a residential home",

 workCrew: LOCAL.brandTechsTablet,
 workCrewAlt: "Two Bridgepoint technicians reviewing a tablet at the back of the van",
 technicianMeeting: LOCAL.brandTechToolbox,
 technicianMeetingAlt: "Bridgepoint technician in cyan uniform with toolbox",

 buildingTowers: u("photo-1486406146926-c627a92ad1ab", 2000),
 buildingTowersAlt: "Commercial high-rise buildings in downtown Toronto",

 toolsKit: u("photo-1530124566582-a618bc2615dc", 1600),
 toolsKitAlt: "Professional trade tools laid out on workbench",
 // toolsBag: was DEWALT-branded drill (BAD-COMPETITOR). Reuse no-brand tool roll.
 toolsBag: u("photo-1530124566582-a618bc2615dc", 1600),
 toolsBagAlt: "Organized trade tool roll on a workbench",

 // Bridgepoint-branded fleet imagery
 truck: LOCAL.brandVanResidential,
 truckAlt: "Bridgepoint Maintenance branded service van on a residential call",
 truckFleet: LOCAL.brandFleetRow,
 truckFleetAlt: "Bridgepoint Maintenance service van fleet at golden hour",

 // Plumbing imagery
 servicePlumbing: LOCAL.brandTechPlumbing,
 servicePlumbingAlt: "Bridgepoint plumber in cyan uniform working on copper plumbing",
 plumbingPipes: u("photo-1585704032915-c3400ca199e7", 1600),
 plumbingPipesAlt: "Chrome plumbing fixtures installed in a building",
 plumbingRepair: u("photo-1503788943072-cd614c3056cf", 1600),
 plumbingRepairAlt: "Pipe wrenches on a plumbing fitting",
 plumbingWaterHeater: LOCAL.tradeWaterHeater,
 plumbingWaterHeaterAlt: "Tankless water heater install in a residential utility room",
 plumbingDrain: u("photo-1676210134190-3f2c0d5cf58d", 1600),
 plumbingDrainAlt: "Plumber inspecting under-sink drain pipework",

 // Electrical imagery
 serviceElectrical: u("photo-1621905251918-48416bd8575a", 1600),
 serviceElectricalAlt: "Licensed electrician working on a service panel",
 electricalPanel: u("photo-1758101755915-462eddc23f57", 1600),
 electricalPanelAlt: "Open electrical service panel with neat wiring",
 electricalWires: u("photo-1581972327480-e3764d31e5e6", 1600),
 electricalWiresAlt: "Wire connections on an electrical installation",
 electricalEvCharger: LOCAL.tradeElectricalPanel,
 electricalEvChargerAlt:
 "Electrician hands installing a circuit breaker into a residential panel",
 electricalLighting: LOCAL.tradeElectricalPanel,
 electricalLightingAlt:
 "Electrician working on a clean residential electrical panel",

 // HVAC imagery
 serviceHvac: LOCAL.brandTechRooftop,
 serviceHvacAlt:
 "Bridgepoint technician in cyan uniform servicing a rooftop HVAC condenser",
 hvacFurnace: LOCAL.tradeFurnace,
 hvacFurnaceAlt: "Residential high-efficiency furnace newly installed in a basement",
 hvacCondenser: u("photo-1671671584537-5da98a2a884f", 1600),
 hvacCondenserAlt: "Rooftop AC condenser units",
 hvacDuctwork: LOCAL.tradeDuctwork,
 hvacDuctworkAlt: "Newly installed silver galvanized HVAC ductwork in a residential ceiling",
 hvacRooftop: u("photo-1671671584537-5da98a2a884f", 1600),
 hvacRooftopAlt: "Rooftop HVAC condenser equipment on commercial building",

 // General / building
 serviceGeneral: LOCAL.workElectrical,
 serviceGeneralAlt: "Bridgepoint technician working on a residential electrical panel",
 serviceEmergency: LOCAL.brandVanResidential,
 serviceEmergencyAlt: "Bridgepoint emergency service van in a residential driveway",
 serviceBuilding: u("photo-1486406146926-c627a92ad1ab", 1600),
 serviceBuildingAlt: "Commercial building complex",

 // Cities (only verified-correct skylines)
 toronto: u("photo-1517090504586-fde19ea6066f", 1800),
 vaughan: u("photo-1517935706615-2717063c2225", 1800),
 mississauga: u("photo-1486325212027-8081e485255e", 1800),
 brampton: u("photo-1486406146926-c627a92ad1ab", 1800),
 markham: u("photo-1486406146926-c627a92ad1ab", 1800),
 richmondHill: u("photo-1517935706615-2717063c2225", 1800),
 hamilton: u("photo-1486406146926-c627a92ad1ab", 1800),
 oakville: u("photo-1486325212027-8081e485255e", 1800),

 // Office / contact (replaced empty office cliches with branded fleet)
 contactOffice: LOCAL.brandFleetRow,
 contactOfficeAlt: "Bridgepoint Maintenance fleet at the North American service desk",

 // Process / before-after / gallery
 galleryBathroom: u("photo-1676210134188-4c05dd172f89", 1600),
 galleryBathroomAlt: "Bathroom plumbing pipework being repaired",
 galleryKitchen: u("photo-1503788943072-cd614c3056cf", 1600),
 galleryKitchenAlt: "Pipe wrenches on a kitchen plumbing fitting",
 galleryBoiler: LOCAL.tradeFurnace,
 galleryBoilerAlt: "High-efficiency furnace install in a residential basement",
 galleryFurnaceClose: LOCAL.workHvac,
 galleryFurnaceCloseAlt: "Bridgepoint HVAC technician working on a furnace",
 galleryEvInstall: LOCAL.tradeThermostat,
 galleryEvInstallAlt: "Smart thermostat installed on a residential wall",
 galleryHvacInstall: LOCAL.tradeDuctwork,
 galleryHvacInstallAlt: "Newly installed HVAC ductwork in a residential ceiling",
 galleryConcordHq: LOCAL.brandFleetRow,
 galleryConcordHqAlt: "Bridgepoint fleet lined up for dispatch",
 galleryDispatch: LOCAL.brandTechsTablet,
 galleryDispatchAlt: "Bridgepoint dispatcher and tech reviewing a service call on tablet",

 // Trust badge backgrounds
 trustBadgesBg: u("photo-1486406146926-c627a92ad1ab", 1600),
 trustBadgesBgAlt: "Commercial property serviced by Bridgepoint",

 // Customer interaction
 technicianCustomer: LOCAL.brandTechToolbox,
 technicianCustomerAlt: "Bridgepoint technician arriving at a customer property with toolbox",
 technicianCustomerB: LOCAL.brandTechRooftop,
 technicianCustomerBAlt:
 "Bridgepoint HVAC technician working on rooftop equipment",

 // Technology / dashboard imagery (replaced abstract tech imagery with real ops shots)
 techHero: LOCAL.brandTechsTablet,
 techHeroAlt: "Bridgepoint technicians coordinating a service call on tablet",
 techDashboard: LOCAL.brandTechsTablet,
 techDashboardAlt: "Bridgepoint dispatcher reviewing live call data",
 techDispatch: LOCAL.brandFleetRow,
 techDispatchAlt: "Bridgepoint fleet ready for dispatch from the North American service desk",
 techMobileApp: LOCAL.brandTechToolbox,
 techMobileAppAlt: "Bridgepoint technician on site with toolbox",
 techData: LOCAL.brandTechsTablet,
 techDataAlt: "Bridgepoint technicians coordinating on a tablet",
 techCode: LOCAL.brandTechsTablet,
 techCodeAlt: "Bridgepoint operations team reviewing dispatch data",
 techRouting: LOCAL.brandFleetRow,
 techRoutingAlt: "Bridgepoint van fleet at the North American service desk",
 techWorkOrder: LOCAL.brandTechsTablet,
 techWorkOrderAlt: "Bridgepoint dispatcher reviewing a work order on tablet",
 techOpsCenter: LOCAL.brandFleetRow,
 techOpsCenterAlt: "Bridgepoint dispatch center vans ready for service",
 techLaptopField: LOCAL.brandTechToolbox,
 techLaptopFieldAlt: "Bridgepoint field technician on call",

 // Extra city / neighborhood variety (kept the verified-correct ones, swapped the wrong ones)
 cityScarborough: u("photo-1486325212027-8081e485255e", 1800),
 cityScarboroughAlt: "Scarborough area commercial property",
 cityNorthYork: u("photo-1486406146926-c627a92ad1ab", 1800),
 cityNorthYorkAlt: "North York commercial high-rise",
 cityEtobicoke: u("photo-1517935706615-2717063c2225", 1800),
 cityEtobicokeAlt: "Etobicoke commercial property",
 cityDowntown: u("photo-1517090504586-fde19ea6066f", 1800),
 cityDowntownAlt: "Downtown Toronto financial district",
 cityWaterloo: u("photo-1486325212027-8081e485255e", 1800),
 cityWaterlooAlt: "Waterloo region commercial property",
 cityKingston: u("photo-1486325212027-8081e485255e", 1800),
 cityKingstonAlt: "Kingston commercial property",

 // Extra service-specific shots
 servicePlumbingB: u("photo-1676210134190-3f2c0d5cf58d", 1600),
 servicePlumbingBAlt: "Plumber working under a sink",
 serviceElectricalB: LOCAL.tradeElectricalPanel,
 serviceElectricalBAlt: "Electrician hands working on a residential panel",
 serviceHvacB: u("photo-1671671584537-5da98a2a884f", 1600),
 serviceHvacBAlt: "Rooftop AC condenser units",
 serviceEmergencyB: LOCAL.brandVanCondo,
 serviceEmergencyBAlt: "Bridgepoint Maintenance van outside a residential building",

 // V2: trades realism (technicians at work, gear, vehicles)
 trade01: LOCAL.brandTechToolbox,
 trade01Alt: "Bridgepoint technician with toolbox",
 trade02: LOCAL.brandTechPlumbing,
 trade02Alt: "Bridgepoint plumber working on copper plumbing",
 trade03: u("photo-1503788943072-cd614c3056cf", 1600),
 trade03Alt: "Pipe wrenches on a plumbing fitting",
 trade04: u("photo-1530124566582-a618bc2615dc", 1600),
 trade04Alt: "Organized trade tool roll on a workbench",
 trade05: LOCAL.tradeFurnace,
 trade05Alt: "Newly installed residential high-efficiency furnace",
 trade06: LOCAL.tradeDuctwork,
 trade06Alt: "Residential HVAC ductwork inspection",
 trade07: LOCAL.brandVanResidential,
 trade07Alt: "Bridgepoint service van on a residential maintenance call",
 trade08: u("photo-1486406146926-c627a92ad1ab", 1600),
 trade08Alt: "Multi-residential commercial property",
 trade09: u("photo-1503788943072-cd614c3056cf", 1600),
 trade09Alt: "Plumbing tools and pipework",
 trade10: LOCAL.brandTechsTablet,
 trade10Alt: "Bridgepoint trade techs coordinating on site",

 // V2: emergency / disaster realism
 emergency01: u("photo-1676210134190-3f2c0d5cf58d", 1600),
 emergency01Alt: "Plumber inspecting under-sink pipework on emergency call",
 emergency02: LOCAL.galPipeBefore,
 emergency02Alt: "Burst residential pipe before repair",
 emergency03: LOCAL.galPipeAfter,
 emergency03Alt: "Residential plumbing repaired",
 emergency04: LOCAL.brandVanResidential,
 emergency04Alt: "Bridgepoint emergency response van on call",

 // V2: GTA / Ontario neighbourhood imagery
 gta01: u("photo-1517090504586-fde19ea6066f", 1800),
 gta01Alt: "Toronto skyline from the lake at dusk",
 gta02: u("photo-1486406146926-c627a92ad1ab", 1800),
 gta02Alt: "Mid-rise commercial property in the Greater Toronto Area",
 gta03: u("photo-1486325212027-8081e485255e", 1800),
 gta03Alt: "Greater Toronto Area mixed-use property at night",
 gta04: u("photo-1517935706615-2717063c2225", 1800),
 gta04Alt: "Commercial mixed-use property in Toronto",

 // V2: dispatch / portfolio reporting (replaced fake server-room and analytics dashboards)
 dispatch01: LOCAL.brandTechsTablet,
 dispatch01Alt: "Bridgepoint techs reviewing a service call on tablet",
 dispatch02: LOCAL.brandTechToolbox,
 dispatch02Alt: "Bridgepoint technician on a service call",
 dispatch03: LOCAL.brandFleetRow,
 dispatch03Alt: "Bridgepoint fleet at the dispatch yard",
 dispatch04: LOCAL.brandFleetRow,
 dispatch04Alt: "Bridgepoint dispatch fleet ready for service",

 // V3: brand expansion (US footprint, team, before/after, blog)
 teamCrew: LOCAL.brandTechsTablet,
 teamCrewAlt: "Bridgepoint trades crew on site",
 founderStory: LOCAL.brandTechToolbox,
 founderStoryAlt: "Bridgepoint operating lead in cyan uniform on the job site",
 beforeAfterReno: LOCAL.galFurnaceBefore,
 beforeAfterRenoAlt: "Before-and-after of a residential furnace replacement",
 blogSeasonal: LOCAL.tradeFurnace,
 blogSeasonalAlt: "Seasonal HVAC equipment in a residential basement",
 blogPipes: u("photo-1538474705339-e87de81450e8", 1600),
 blogPipesAlt: "Pipework in a mechanical room",
 blogElectrical: u("photo-1758101755915-462eddc23f57", 1600),
 blogElectricalAlt: "Electrician working on a service panel",
 techAtWork: LOCAL.brandTechRooftop,
 techAtWorkAlt: "Bridgepoint HVAC technician on a rooftop service call",
 industrialPipes: u("photo-1538474705339-e87de81450e8", 1600),
 industrialPipesAlt: "Industrial pipework in a mechanical room",
 cityFlorida: u("photo-1574167455363-acc39a6c1d4a", 1600),
 cityFloridaAlt: "Florida coastline aerial view",

 // Local generated photos (real Bridgepoint vehicle and trades imagery)
 localHero: LOCAL.hero,
 localHeroAlt: "Bridgepoint Maintenance technician on site",
 localFleet: LOCAL.brandFleetRow,
 localFleetAlt: "Bridgepoint Maintenance branded service fleet",
 localPlumbing: LOCAL.workPlumbing,
 localPlumbingAlt: "Bridgepoint plumbing technician at work",
 localElectrical: LOCAL.workElectrical,
 localElectricalAlt: "Bridgepoint electrician at work",
 localHvac: LOCAL.workHvac,
 localHvacAlt: "Bridgepoint HVAC technician at work",

 // Bridgepoint-branded shots (new imagery)
 brandVanResidential: LOCAL.brandVanResidential,
 brandVanResidentialAlt:
 "Bridgepoint Maintenance branded van parked at a residential property",
 brandVanCondo: LOCAL.brandVanCondo,
 brandVanCondoAlt: "Bridgepoint Maintenance van outside a Toronto condo building",
 brandTechToolbox: LOCAL.brandTechToolbox,
 brandTechToolboxAlt: "Bridgepoint technician in cyan uniform with toolbox",
 brandTechRooftop: LOCAL.brandTechRooftop,
 brandTechRooftopAlt:
 "Bridgepoint HVAC technician servicing rooftop condenser",
 brandTechPlumbing: LOCAL.brandTechPlumbing,
 brandTechPlumbingAlt:
 "Bridgepoint plumber in cyan uniform working on copper pipes",
 brandTechsTablet: LOCAL.brandTechsTablet,
 brandTechsTabletAlt:
 "Two Bridgepoint technicians coordinating on a tablet at the van",
 brandFleetRow: LOCAL.brandFleetRow,
 brandFleetRowAlt:
 "Three Bridgepoint Maintenance branded vans at the North American service desk at golden hour",

 // Broader trade coverage (added 2026-04-30 for non-HVAC scope)
 // 2026-04-30 second audit: replaced 5 BAD/BROKEN Unsplash refs with verified
 // brand-safe local Imagen assets. See AUDIT.md.
 tradeWaterHeater: LOCAL.tradeWaterHeater,
 tradeWaterHeaterAlt: "Tankless water heater install in a residential utility room",
 // was photo-1610477396975 (404 BROKEN) — use rusted-leaking-pipe still as water-damage hero
 tradeRestoration: LOCAL.galPipeBefore,
 tradeRestorationAlt:
 "Corroded copper pipe with active water leak and ceiling damage from a burst-pipe incident",
 // was photo-1597007030739 (404 BROKEN) — use Bridgepoint plumber for repair-in-progress shot
 tradeRestorationB: LOCAL.brandTechPlumbing,
 tradeRestorationBAlt:
 "Bridgepoint plumber repairing copper pipework during a residential restoration",
 tradeSewerCamera: u("photo-1676210134190-3f2c0d5cf58d", 1600),
 tradeSewerCameraAlt: "Plumber inspecting drain line under a residential sink",
 // was photo-1581094271901 (chemistry lab BAD-OFF-BRAND) — use real basement utility scene
 tradeSumpPump: LOCAL.tradeWaterHeater,
 tradeSumpPumpAlt: "Residential basement utility area with plumbing fixtures",
 // was photo-1581578731548 (woman cleaning shutters BAD-OFF-BRAND) — use real tradesman shot
 tradeDrywall: LOCAL.brandTechToolbox,
 tradeDrywallAlt: "Bridgepoint general-contracting tradesman in cyan uniform with toolbox",
 // was photo-1633793528050 (404 BROKEN, key unused but kept safe)
 tradeEvCharger: LOCAL.tradeElectricalPanel,
 tradeEvChargerAlt: "Electrician installing a circuit breaker for a residential EV charger",
 // was photo-1581094271901 (chemistry lab BAD-OFF-BRAND)
 tradeDrainAuger: u("photo-1676210134190-3f2c0d5cf58d", 1600),
 tradeDrainAugerAlt: "Plumber clearing a residential drain line under a sink",
 tradePainting: u("photo-1562259949-e8e7689d7828", 1600),
 tradePaintingAlt: "Painter rolling fresh paint on an interior wall",

 // Branded cinematic photos for /emergency/no-power (Imagen 4 Ultra, May 2026)
 noPowerHero: "/img/emergency/no-power/hero.png",
 noPowerHeroAlt: "Bridgepoint electrician working an open residential electrical panel under a headlamp during a power outage",
 noPowerServiceEntrance: "/img/emergency/no-power/service-entrance-diagnostics.png",
 noPowerServiceEntranceAlt: "Bridgepoint electrician on a ladder inspecting an exterior service mast and meter base at dusk, branded service van in the driveway",
 noPowerMainPanelFailure: "/img/emergency/no-power/main-panel-failure.png",
 noPowerMainPanelFailureAlt: "Close-up of a burned main breaker in an open residential electrical panel, gloved hand with flashlight inspecting the damage, multimeter in foreground",
 noPowerUtilityCoordination: "/img/emergency/no-power/utility-coordination.png",
 noPowerUtilityCoordinationAlt: "Utility bucket truck working a pole-mounted transformer at night with Bridgepoint service van staged at the curb",
 noPowerStormDamage: "/img/emergency/no-power/storm-damage-response.png",
 noPowerStormDamageAlt: "Downed power line across a residential driveway after a storm, Bridgepoint service van parked at the curb",
 noPowerGeneratorTransfer: "/img/emergency/no-power/generator-and-transfer-switch.png",
 noPowerGeneratorTransferAlt: "Portable generator running outside a residential home during a power outage, extension cord and fuel can on the lawn, Bridgepoint service van in the driveway",
 noPowerCommercialOutage: "/img/emergency/no-power/commercial-building-outages.png",
 noPowerCommercialOutageAlt: "Dark commercial office building at night with only emergency lights inside, Bridgepoint service van parked near the main entrance",
} as const;

export const cityHero = (slug: string): string => {
 switch (slug) {
 case "toronto":
 return IMAGES.toronto;
 case "vaughan":
 return IMAGES.vaughan;
 case "mississauga":
 return IMAGES.mississauga;
 case "brampton":
 return IMAGES.brampton;
 case "markham":
 return IMAGES.markham;
 case "richmond-hill":
 return IMAGES.richmondHill;
 case "hamilton":
 return IMAGES.hamilton;
 case "oakville":
 return IMAGES.oakville;
 default:
 return IMAGES.buildingTowers;
 }
};

export const serviceImage = (slug: string): { src: string; alt: string } => {
 switch (slug) {
 case "plumbing":
 return { src: IMAGES.edPlumbingHero, alt: IMAGES.edPlumbingHeroAlt };
 case "electrical":
 return { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt };
 case "hvac":
 return { src: IMAGES.edHeatingHero, alt: IMAGES.edHeatingHeroAlt };
 case "general-maintenance":
 return { src: IMAGES.serviceGeneral, alt: IMAGES.serviceGeneralAlt };
 case "emergency-repairs":
 return { src: IMAGES.serviceEmergency, alt: IMAGES.serviceEmergencyAlt };
 case "building-services":
 return { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt };
 case "water-damage-restoration":
 return {
 src: IMAGES.edWaterDamageHero,
 alt: IMAGES.edWaterDamageHeroAlt,
 };
 case "sewer-line":
 return {
 src: IMAGES.edDrainHero,
 alt: IMAGES.edDrainHeroAlt,
 };
 case "sump-pump":
 // was photo-1581094271901 (chemistry lab BAD-OFF-BRAND) — use basement utility shot
 return {
 src: LOCAL.tradeWaterHeater,
 alt: "Residential basement utility area where sump pumps are installed",
 };
 case "water-heater":
 return { src: IMAGES.plumbingWaterHeater, alt: IMAGES.plumbingWaterHeaterAlt };
 case "general-contracting":
 // was photo-1581578731548 (woman cleaning shutters BAD-OFF-BRAND)
 return {
 src: LOCAL.brandTechToolbox,
 alt: "Bridgepoint general-contracting tradesman in cyan uniform with toolbox",
 };
 default:
 return { src: IMAGES.workCrew, alt: IMAGES.workCrewAlt };
 }
};

export const galleryImages = (): { src: string; alt: string; caption: string }[] => [
 {
 src: IMAGES.galleryFurnaceClose,
 alt: IMAGES.galleryFurnaceCloseAlt,
 caption: "Furnace install. Mississauga",
 },
 {
 src: IMAGES.electricalPanel,
 alt: IMAGES.electricalPanelAlt,
 caption: "Panel upgrade. Vaughan",
 },
 {
 src: IMAGES.galleryHvacInstall,
 alt: IMAGES.galleryHvacInstallAlt,
 caption: "Ductwork install. Toronto",
 },
 {
 src: IMAGES.plumbingPipes,
 alt: IMAGES.plumbingPipesAlt,
 caption: "Copper repipe. Hamilton",
 },
 {
 src: IMAGES.galleryEvInstall,
 alt: IMAGES.galleryEvInstallAlt,
 caption: "Smart thermostat. Markham",
 },
 {
 src: IMAGES.hvacRooftop,
 alt: IMAGES.hvacRooftopAlt,
 caption: "Rooftop service. Brampton",
 },
 {
 src: IMAGES.galleryBoiler,
 alt: IMAGES.galleryBoilerAlt,
 caption: "Furnace replacement. Oakville",
 },
 {
 src: IMAGES.brandTechRooftop,
 alt: IMAGES.brandTechRooftopAlt,
 caption: "Rooftop HVAC. Richmond Hill",
 },
];

/**
 * Before/after gallery pairs (for /gallery page).
 * Pairs are [before, after] with a caption + city tag.
 */
export const galleryPairs = (): {
 before: string;
 beforeAlt: string;
 after: string;
 afterAlt: string;
 caption: string;
 city: string;
}[] => [
 {
 before: LOCAL.galFurnaceBefore,
 beforeAlt: "Old worn residential furnace before replacement",
 after: LOCAL.galFurnaceAfter,
 afterAlt: "New high-efficiency residential furnace after install",
 caption: "Furnace replacement",
 city: "Mississauga",
 },
 {
 before: LOCAL.galPipeBefore,
 beforeAlt: "Burst residential copper pipe before repair",
 after: LOCAL.galPipeAfter,
 afterAlt: "New copper plumbing after repair",
 caption: "Burst pipe repair",
 city: "Riverdale, Toronto",
 },
 {
 before: LOCAL.galPanelBefore,
 beforeAlt: "Outdated electrical panel before upgrade",
 after: LOCAL.galPanelAfter,
 afterAlt: "Clean new electrical panel after upgrade",
 caption: "Electrical panel upgrade",
 city: "Vaughan",
 },
 {
 before: LOCAL.galPipeBefore,
 beforeAlt: "Leaking pipework before emergency response",
 after: LOCAL.brandTechPlumbing,
 afterAlt: "Bridgepoint plumber repairing copper pipework",
 caption: "Emergency leak response",
 city: "Etobicoke, Toronto",
 },
 {
 before: LOCAL.galFurnaceBefore,
 beforeAlt: "Old basement furnace before replacement",
 after: LOCAL.tradeDuctwork,
 afterAlt: "New ductwork after HVAC retrofit",
 caption: "HVAC retrofit",
 city: "Markham",
 },
 {
 before: LOCAL.galPanelBefore,
 beforeAlt: "Old residential panel before service",
 after: LOCAL.tradeElectricalPanel,
 afterAlt: "Electrician installing new breakers",
 caption: "Breaker upgrade",
 city: "Brampton",
 },
];
