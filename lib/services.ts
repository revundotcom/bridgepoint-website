export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  scope: string[];
  emergency: boolean;
  faq: { q: string; a: string }[];
  related: string[];
  icon:
    | "Wrench"
    | "Zap"
    | "Wind"
    | "Hammer"
    | "Siren"
    | "Building2"
    | "Droplet"
    | "Waves"
    | "Flame"
    | "PaintBucket";
  commonIssues?: { title: string; body: string }[];
  triage?: {
    urgent: string[];
    nonUrgent: string[];
  };
};

export const SERVICES: Service[] = [
  {
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    tagline:
      "Licensed plumbing across Canada and the US. emergency response, repairs, and installations.",
    description:
      "Bridgepoint delivers licensed plumbing services across Canada and the US for property managers, commercial owners, and multifamily operators. From burst-pipe emergencies to scheduled fixture installs, we coordinate trades response across our North American service desk and US trade partner network, with single-vendor accountability.",
    scope: [
      "Emergency plumbing. burst pipes, water-main breaks, sewer backups",
      "Drain cleaning, snaking, hydro-jetting, and camera inspections",
      "Water-heater repair, installation, and emergency replacement",
      "Fixture replacement: faucets, toilets, sinks, valves",
      "Pipe repair, repiping, and leak detection",
      "Sewer-line repair and backflow prevention",
      "Commercial and multifamily plumbing maintenance contracts",
    ],
    emergency: true,
    faq: [
      {
        q: "How quickly can a plumber respond in the GTA?",
        a: "Bridgepoint dispatches 24/7 emergency plumbing across the Greater Toronto Area. Response time varies by location, traffic, and current call volume. call 1-855-910-9090 for an immediate ETA.",
      },
      {
        q: "Do you handle commercial and multifamily plumbing?",
        a: "Yes. We work with property managers, multifamily operators, and commercial owners on both reactive emergency response and scheduled preventative maintenance contracts.",
      },
      {
        q: "Are your plumbers licensed?",
        a: "Bridgepoint dispatches state and provincial licensed plumbing trades. Specific license numbers are available on request and disclosed on individual work orders.",
      },
      {
        q: "What service areas do you cover?",
        a: "We serve Canada and the US. Greater Toronto Area is our densest market, with US trade partner coverage across New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin, plus expansion into adjacent markets.",
      },
      {
        q: "Do you offer free estimates?",
        a: "Yes. we provide free estimates for non-emergency plumbing work. Emergency dispatch fees may apply for urgent after-hours calls; quoted before service begins.",
      },
    ],
    related: ["emergency-repairs", "general-maintenance", "building-services"],
    icon: "Wrench",
  },
  {
    slug: "electrical",
    name: "Electrical Services",
    shortName: "Electrical",
    tagline:
      "Licensed electrical service across Canada and the US. emergencies, panels, installs.",
    description:
      "Licensed electrical service across Canada and the US for property managers, commercial owners, and multifamily operators. Bridgepoint coordinates licensed repairs, installations, and emergency response through a single accountability line.",
    scope: [
      "Emergency electrical response. power loss, panel issues, exposed wiring",
      "Panel upgrades and service-entrance work",
      "Lighting design, replacement, and commercial relamping",
      "Outlet, switch, and circuit installations",
      "EV-charger installation",
      "Generator integration and transfer-switch installs",
      "ESA permitting and code-compliance repairs",
    ],
    emergency: true,
    faq: [
      {
        q: "Are your electricians licensed?",
        a: "Bridgepoint dispatches state and provincial licensed electrical contractors and master electricians. License numbers are available on request and printed on work orders requiring permits.",
      },
      {
        q: "Do you respond to commercial electrical emergencies?",
        a: "Yes. 24/7 emergency electrical dispatch across Canada and the US. Call 1-855-910-9090 for immediate response.",
      },
      {
        q: "Can you install EV chargers at multifamily properties?",
        a: "Yes. Bridgepoint installs EV charging infrastructure for multifamily, commercial, and residential properties, including load-management coordination and ESA permitting.",
      },
      {
        q: "Do you handle panel upgrades?",
        a: "Yes. We perform panel upgrades, service-entrance replacements, and load-balancing work for commercial and residential properties across Canada and the US.",
      },
      {
        q: "What information do I need before requesting an estimate?",
        a: "Property address, panel size if known, scope of work, and any prior ESA inspection records help us scope accurately. We'll confirm details on the site visit.",
      },
    ],
    related: ["emergency-repairs", "building-services", "general-maintenance"],
    icon: "Zap",
  },
  {
    slug: "hvac",
    name: "HVAC Services",
    shortName: "HVAC",
    tagline:
      "Furnace, boiler, AC, and heat-pump service across Canada and the US. Licensed gas work.",
    description:
      "HVAC repair, service, and installation across Canada and the US. Bridgepoint dispatches licensed gas technicians for furnaces, boilers, heat pumps, and commercial mechanical systems with 24/7 emergency response.",
    scope: [
      "Furnace and boiler repair, service, and installation",
      "Air-conditioning repair and replacement",
      "Heat-pump installation and service",
      "Ventilation and air-handler service",
      "TSSA-licensed gas-line connections and repairs",
      "Commercial rooftop unit (RTU) maintenance",
      "Seasonal HVAC tune-ups and filter service",
    ],
    emergency: true,
    faq: [
      {
        q: "Do you respond to no-heat emergencies in winter?",
        a: "Yes. 24/7 emergency HVAC dispatch across Canada and the US. Call 1-855-910-9090 for no-heat, no-cool, and gas-leak response.",
      },
      {
        q: "Are you TSSA-licensed for gas work?",
        a: "Bridgepoint dispatches TSSA-licensed gas technicians for furnace, boiler, water-heater, and gas-line work. License numbers available on request.",
      },
      {
        q: "Do you offer preventative maintenance contracts?",
        a: "Yes. Quarterly and seasonal HVAC service contracts for property managers, commercial owners, and multifamily operators. single billing, transparent reporting.",
      },
      {
        q: "Can you service rooftop commercial HVAC units?",
        a: "Yes. We service commercial RTUs, split systems, boilers, and chillers across Canada and the US.",
      },
      {
        q: "Do you install heat pumps for multifamily properties?",
        a: "Yes. heat-pump installation and integration for multifamily and commercial properties, with energy-efficiency rebate documentation where applicable.",
      },
    ],
    related: ["emergency-repairs", "building-services", "general-maintenance"],
    icon: "Wind",
  },
  {
    slug: "general-maintenance",
    name: "General Maintenance",
    shortName: "General Maintenance",
    tagline:
      "Coordinated property maintenance across Canada and the US. single-vendor accountability.",
    description:
      "General maintenance and handyman services for property managers, multifamily operators, and commercial owners across Canada and the US. Bridgepoint coordinates trades response, work-order intake, and transparent reporting through one accountability line.",
    scope: [
      "Routine and reactive property maintenance",
      "Multi-trade work-order coordination",
      "Common-area repairs for multifamily and condo properties",
      "Carpentry, drywall, painting, and finishing work",
      "Door, lock, and hardware repair",
      "Caulking, sealing, and weatherization",
      "Maintenance reporting for property management portfolios",
    ],
    emergency: false,
    faq: [
      {
        q: "What does general maintenance include?",
        a: "Routine repairs, multi-trade coordination, common-area work, carpentry, drywall, painting, hardware fixes, weatherization, and any task that falls outside specialized trade work.",
      },
      {
        q: "Do you offer maintenance contracts for property managers?",
        a: "Yes. preventative maintenance contracts with quarterly inspections, scheduled work, and consolidated billing across portfolios.",
      },
      {
        q: "Can you handle work orders from a property management software?",
        a: "Yes. We integrate with most major property-management systems for work-order intake, status updates, and consolidated reporting.",
      },
      {
        q: "What size properties do you service?",
        a: "From single commercial units to multifamily portfolios across Canada and the US. We scale dispatch capacity to match the property mix.",
      },
      {
        q: "Do you provide reporting for compliance audits?",
        a: "Yes. we provide service records, work-order documentation, and trade-license documentation for compliance and audit purposes.",
      },
    ],
    related: ["building-services", "plumbing", "electrical"],
    icon: "Hammer",
  },
  {
    slug: "emergency-repairs",
    name: "Emergency Repairs",
    shortName: "Emergency Repairs",
    tagline: "24/7 emergency dispatch across Canada and the US. one number, every trade.",
    description:
      "Bridgepoint runs a 24/7 emergency dispatch line for plumbing, electrical, HVAC, and building emergencies across Canada and the US. One number routes to trade-specific on-call response. no waiting on multiple vendors during a crisis.",
    scope: [
      "Burst pipes, water-main breaks, sewer backups",
      "Power loss, panel failures, exposed wiring",
      "No-heat, no-cool, gas-leak response",
      "Roof leaks, water intrusion, flood damage assessment",
      "Lock-out, hardware failure, security door repair",
      "Fire-system, sprinkler, and life-safety coordination",
      "Coordination with insurance adjusters and remediation vendors",
    ],
    emergency: true,
    faq: [
      {
        q: "How fast is emergency response?",
        a: "Response times vary by location, traffic, and current call volume. Call 1-855-910-9090 for an immediate ETA based on the trade and your address.",
      },
      {
        q: "What counts as an emergency?",
        a: "Active leaks, no-heat in winter, no-cool in summer extremes, power loss, gas leaks, sewer backups, life-safety system failures, and any condition causing imminent property damage or tenant harm.",
      },
      {
        q: "Do emergency calls cost more?",
        a: "After-hours and emergency dispatch fees may apply. We quote the dispatch fee before sending a technician so there are no surprises.",
      },
      {
        q: "Do you coordinate with insurance after a loss?",
        a: "Yes. we provide documentation, photos, and service records for insurance claims and coordinate with adjusters and remediation vendors as needed.",
      },
      {
        q: "Can property managers set up a priority dispatch account?",
        a: "Yes. We set up account-based emergency dispatch with priority routing and consolidated billing for property management companies.",
      },
    ],
    related: ["plumbing", "electrical", "hvac"],
    icon: "Siren",
  },
  {
    slug: "building-services",
    name: "Building Services",
    shortName: "Building Services",
    tagline: "Commercial building maintenance across Canada and the US. one accountable partner.",
    description:
      "Building services for commercial, multifamily, institutional, and mixed-use properties across Canada and the US. Bridgepoint provides the single-vendor maintenance layer property owners use to reduce vendor sprawl and tighten response times.",
    scope: [
      "Commercial office, retail, and industrial building maintenance",
      "Multifamily building services and common-area maintenance",
      "Institutional property service contracts",
      "Code-compliance repairs and remediation coordination",
      "Mechanical-system service and inspection",
      "Building envelope and exterior maintenance",
      "Janitorial coordination and minor capital improvements",
    ],
    emergency: false,
    faq: [
      {
        q: "What property types do you service?",
        a: "Commercial, multifamily, institutional, and mixed-use properties across Canada and the US. office buildings, retail, industrial sites, condos, apartment buildings, and institutional facilities.",
      },
      {
        q: "How does single-vendor accountability work?",
        a: "Instead of managing separate vendors for plumbing, electrical, HVAC, and general maintenance, you work with one dispatch line and one billing relationship. We coordinate trades internally.",
      },
      {
        q: "Do you handle code-compliance work?",
        a: "Yes. repairs and inspections supporting state, provincial, and federal building code compliance, with documentation suitable for audits.",
      },
      {
        q: "Can you take over an existing property portfolio?",
        a: "Yes. We onboard portfolios with a property survey, vendor handoff plan, and phased rollout of preventative maintenance contracts.",
      },
      {
        q: "Do you provide consolidated reporting?",
        a: "Yes. monthly portfolio reports with work-order history, response times, spend by category, and recommended preventative work.",
      },
    ],
    related: ["general-maintenance", "hvac", "plumbing"],
    icon: "Building2",
  },
  {
    slug: "water-damage-restoration",
    name: "Water Damage Restoration",
    shortName: "Restoration",
    tagline:
      "24-hour water mitigation, drying, and mould remediation across Canada and the US.",
    description:
      "Bridgepoint dispatches IICRC-aligned restoration crews for emergency water mitigation, structural drying, and mould remediation. We coordinate the water-out, dry-down, and rebuild handoff so a single accountable partner manages the loss start to finish.",
    scope: [
      "24-hour emergency water extraction and mitigation",
      "Industrial dehumidification and structural drying",
      "Mould inspection, containment, and remediation",
      "Sewage backup cleanup and biohazard response",
      "Drywall removal, anti-microbial treatment, and reconstruction prep",
      "Insurance documentation, photo logs, moisture-meter readings",
      "Coordination with adjusters and rebuild trades",
    ],
    emergency: true,
    faq: [
      {
        q: "How fast do you respond to a flood or burst pipe?",
        a: "Restoration crews dispatch 24/7 across Canada and the US. Call 1-855-910-9090 the moment water is moving. minutes matter for category and class containment.",
      },
      {
        q: "Do you handle insurance paperwork?",
        a: "Yes. We document moisture readings, photos, scope of loss, and equipment hours suitable for any major insurer. We coordinate directly with adjusters when authorized.",
      },
      {
        q: "Are you certified for mould remediation?",
        a: "Bridgepoint dispatches restoration crews trained on IICRC standards (S500 water, S520 mould). Specific certifications documented on each job.",
      },
      {
        q: "Do you also rebuild after the dry-out?",
        a: "Yes. our general-contracting trades take the rebuild handoff so you do not have to source a separate vendor. drywall, paint, fixtures, flooring.",
      },
      {
        q: "What about sewage or contaminated water?",
        a: "We respond to Cat-2 and Cat-3 contaminated-water losses with appropriate PPE, containment, and disposal protocols.",
      },
    ],
    related: ["plumbing", "emergency-repairs", "general-maintenance"],
    icon: "Droplet",
  },
  {
    slug: "sewer-line",
    name: "Sewer Line Repair",
    shortName: "Sewer Line",
    tagline:
      "Camera inspection, root removal, and sewer-line replacement across Canada and the US.",
    description:
      "Bridgepoint dispatches sewer specialists for camera inspections, root removal, hydro-jetting, and full lateral replacements. Recurring backups, slow drains across multiple fixtures, and tree-root damage are scoped on-site with video evidence and a flat-rate quote.",
    scope: [
      "Sewer-camera inspection with recorded video",
      "Hydro-jetting and root removal",
      "Spot repair and full sewer-lateral replacement",
      "Trenchless pipe lining where the lateral allows",
      "Backwater valve installation",
      "Municipal sewer-connection coordination",
      "Insurance and warranty documentation",
    ],
    emergency: true,
    faq: [
      {
        q: "How do I know if my sewer line is the problem?",
        a: "Multiple slow drains at once, gurgling toilets, sewage smell in the basement, or recurring backups after heavy rain are the classic signs. A camera inspection confirms in 30-60 minutes.",
      },
      {
        q: "Do you offer trenchless replacement?",
        a: "Yes, where the existing lateral and access points support it. We scope on-site and walk you through the trade-offs before quoting.",
      },
      {
        q: "Can you install a backwater valve?",
        a: "Yes. Bridgepoint installs backwater valves and helps with municipal subsidy paperwork in cities that offer rebates.",
      },
      {
        q: "What does a sewer-camera inspection cost?",
        a: "Flat-rate inspection fee quoted before we arrive. Video footage and a written report are included so you have evidence for insurance or buyer disclosure.",
      },
      {
        q: "How urgent is a recurring sewer backup?",
        a: "Treat it as urgent. each backup risks more damage to the lateral and the basement finish. Call dispatch the same day.",
      },
    ],
    related: ["plumbing", "water-damage-restoration", "emergency-repairs"],
    icon: "Waves",
  },
  {
    slug: "sump-pump",
    name: "Sump Pump Install & Repair",
    shortName: "Sump Pump",
    tagline:
      "Sump pump installs, replacements, battery backups, and basement protection.",
    description:
      "Bridgepoint installs, replaces, and services sump pumps across Canada and the US. We size pumps to the basement footprint, add battery backup options, and tie in alarms for property managers running multifamily basements.",
    scope: [
      "Sump pump replacement and new installs",
      "Battery backup pumps and alarm integration",
      "Basement waterproofing assessment",
      "Sump pit cleaning and discharge-line maintenance",
      "Annual sump-pump inspection contracts",
      "Storm-season readiness checks",
      "Multifamily building sump-system audits",
    ],
    emergency: true,
    faq: [
      {
        q: "When should a sump pump be replaced?",
        a: "Most pumps last 7-10 years. Frequent cycling, strange noises, visible rust, or a pump that fails to engage during a storm test are the warning signs.",
      },
      {
        q: "Do you install battery backup pumps?",
        a: "Yes. Battery backup is the difference between a wet basement and a dry one when power goes out during a storm.",
      },
      {
        q: "Can you respond if my pump fails during a storm?",
        a: "Yes, 24/7. Trucks carry common pump sizes for same-visit replacement.",
      },
      {
        q: "Do you service multifamily sump systems?",
        a: "Yes. We audit, service, and replace sump systems in multifamily and commercial basements, with alarm and reporting integration for property managers.",
      },
      {
        q: "What is a typical sump pump install cost?",
        a: "Quoted on-site after we size the pump and inspect the pit and discharge line. Flat-rate pricing presented before any work begins.",
      },
    ],
    related: ["plumbing", "water-damage-restoration", "emergency-repairs"],
    icon: "Droplet",
  },
  {
    slug: "water-heater",
    name: "Water Heater Repair & Install",
    shortName: "Water Heater",
    tagline:
      "Tank and tankless water heater install, swap, and rental service across Canada and the US.",
    description:
      "Bridgepoint installs and services tank-style and tankless water heaters across Canada and the US. Same-day swaps, rental-tank conversions, and licensed gas connections through one accountability line.",
    scope: [
      "Tank-style water heater install and replacement",
      "Tankless water heater install and conversion",
      "Rental tank takeover and buyout coordination",
      "Anode rod replacement and tank flush service",
      "Recirculation pump installs",
      "TSSA-licensed gas-line connection",
      "Multifamily DHW system service",
    ],
    emergency: true,
    faq: [
      {
        q: "Do you offer same-day water heater replacement?",
        a: "Yes for common tank sizes. Trucks carry standard gas and electric tanks for same-visit swaps. tankless installs are scheduled.",
      },
      {
        q: "Should I pick tank or tankless?",
        a: "Tankless costs more upfront, lasts longer, and never runs out. Tank is cheaper to install and easier to service. Our techs scope your hot-water demand before recommending.",
      },
      {
        q: "Can you take over a rental tank from Enbridge or another provider?",
        a: "Yes. We coordinate the rental buyout and install a customer-owned tank or tankless replacement.",
      },
      {
        q: "Are you TSSA-licensed for gas water heaters?",
        a: "Yes. Bridgepoint dispatches TSSA-licensed gas technicians for any gas-fired water heater install or service.",
      },
      {
        q: "How long does a typical water heater install take?",
        a: "Tank swaps usually close out in 2-4 hours. Tankless installs run 4-8 hours depending on venting and gas-line work.",
      },
    ],
    related: ["plumbing", "hvac", "general-maintenance"],
    icon: "Flame",
  },
  {
    slug: "general-contracting",
    name: "General Contracting & Handyman",
    shortName: "Handyman",
    tagline:
      "Drywall, paint, fixture install, and small reno work across US and Canadian property portfolios.",
    description:
      "Bridgepoint coordinates handyman and small-scale general-contracting work across Canada and the US. Drywall patching, painting, fixture installs, hardware swaps, and small renovations. one trades partner for the long tail of property-maintenance line items.",
    scope: [
      "Drywall repair, patching, and finishing",
      "Interior and exterior painting touch-ups",
      "Fixture and hardware install (lights, faucets, hinges, locks)",
      "Door, window, and trim repair",
      "Tile repair and minor flooring work",
      "Shelving, mounting, and small carpentry",
      "Small reno coordination across multiple trades",
    ],
    emergency: false,
    faq: [
      {
        q: "What counts as handyman work versus a real renovation?",
        a: "Anything that takes one technician under a day, or a small crew under two days, falls into our handyman category. Bigger reno work gets scoped as a general-contracting project.",
      },
      {
        q: "Do you handle paint and drywall together?",
        a: "Yes. Our handyman trades patch, prime, and paint as one workflow.",
      },
      {
        q: "Can you take a list of small repairs from a property manager?",
        a: "Absolutely. We aggregate small line items into one dispatch, one invoice, and one trades contact across your portfolio.",
      },
      {
        q: "Do you price by the hour or by the job?",
        a: "Flat-rate by the job whenever the scope is clear. Some longer-tail work prices by the hour with a quoted ceiling.",
      },
      {
        q: "What is the smallest job you will take on?",
        a: "We accept single line-item dispatches under our property-manager contracts. For one-off residential calls we set a minimum-trip charge that is quoted up front.",
      },
    ],
    related: ["general-maintenance", "building-services", "plumbing"],
    icon: "PaintBucket",
  },
];

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
