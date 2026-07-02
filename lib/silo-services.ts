// SERVICES SILO — 12 trade pages
// Renamed slugs map to existing /services/[slug] route. We extend with a new content layer.

export type SiloPage = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  scope: { title: string; body: string }[];
  whyUs: string;
  related: { label: string; href: string }[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  // Optional copy overrides. Use these on any page whose shortName does not read cleanly
  // when substituted into the default "About {x}", "{x} questions, answered.",
  // "Need {x} now?", or "Talk to Bridgepoint about {x}." templates. Hand written copy
  // wins over substitution every time. Emergency pages whose shortName starts with a
  // negation ("No Heat", "No Power", "No Cooling") MUST set ctaTitle.
  overviewTitle?: string;
  faqTitle?: string;
  faqDescription?: string;
  ctaTitle?: string;
  ctaBody?: string;
};

export const SERVICE_PAGES: SiloPage[] = [
  {
    slug: "plumbing",
    name: "Plumbing Services",
    shortName: "Plumbing",
    eyebrow: "Trade services",
    tagline: "Licensed plumbing across North America. Repairs, installs, and fixture work for residential and commercial properties.",
    intro:
      "Bridgepoint Maintenance dispatches licensed plumbing trades for property managers, multifamily operators, commercial owners, and homeowners across Canada and the US. Our plumbing service line covers everything from a kitchen faucet swap to a full water service replacement. Single dispatch line. One work order. One invoice. Greater Toronto Area is our densest coverage market, with US trade partner dispatch in New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin routing through the same service desk.",
    scope: [
      {
        title: "Diagnostic and repair work",
        body: "Leaks, drips, low pressure, slow drains, running toilets, faulty valves, and pinhole pipe failures. Our techs scope on site, photograph the condition, and quote a flat rate before any tools come out.",
      },
      {
        title: "Fixture replacement and installation",
        body: "Faucets, sinks, toilets, tubs, showers, and angle stops. We carry the high runner SKUs on stocked trucks so the swap closes out in one visit whenever possible.",
      },
      {
        title: "Repipe and pipe repair",
        body: "Copper, PEX, and ABS. Whole house repipes, partial repipes after a leak, and section replacements after water damage. Permit pulled when the scope crosses the threshold.",
      },
      {
        title: "Drain cleaning and camera inspection",
        body: "Mechanical augers, hydro jetting, and sewer camera scope. We record the camera pass and share the file so you have evidence for insurance or buyer disclosure.",
      },
      {
        title: "Water heater service",
        body: "Tank swaps, tankless conversions, anode rod replacements, and recirculation pump installs. Gas connections handled by licensed gas technicians.",
      },
      {
        title: "Multifamily and commercial plumbing",
        body: "Recurring service contracts, building wide rough in inspections, riser repairs, and coordination with property management software for work order intake.",
      },
    ],
    whyUs:
      "Property managers tell us the same thing every time. The plumbing call is rarely the actual problem. The problem is the documentation gap, the second visit, and the vendor that disappears mid project. Bridgepoint closes the loop. Licensed techs, stocked trucks, photo evidence on the work order, and a follow up call within seven days.",
    related: [
      { label: "Emergency plumbing dispatch", href: "/emergency/plumbing" },
      { label: "Burst pipe response", href: "/emergency/burst-pipes" },
      { label: "Sewer backup response", href: "/emergency/sewer-backups" },
      { label: "Property manager service line", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "How quickly can a plumber be on site?",
        a: "Same day for standard service requests across our primary GTA radius. Emergency dispatch routes faster. Call 1-855-910-9090 for an ETA based on your address.",
      },
      {
        q: "Are your plumbers licensed?",
        a: "Yes. Bridgepoint dispatches licensed plumbing trades in every jurisdiction we serve. License numbers print on the work order and are available before the truck rolls.",
      },
      {
        q: "Do you take on commercial plumbing contracts?",
        a: "Yes. Recurring service contracts, on call commercial dispatch, and consolidated billing across property portfolios. Talk to dispatch about scoping.",
      },
      {
        q: "What happens if the first visit does not close out the issue?",
        a: "We document why on the work order, source the part, and return at the agreed time. Multi visit work runs against a single quote, not separate trip charges.",
      },
    ],
    metaTitle: "Plumbing Services | Licensed Plumbers, North America",
    metaDescription:
      "Licensed plumbing service for property managers, commercial owners, and homeowners across Canada and the US. Repairs, installs, water heaters, fixtures. Call 1-855-910-9090.",
  },
  {
    slug: "electrical",
    name: "Electrical Services",
    shortName: "Electrical",
    eyebrow: "Trade services",
    tagline: "Licensed electrical work across Canada and the US. Panels, lighting, circuits, EV chargers, and commercial relamping.",
    intro:
      "Bridgepoint Maintenance dispatches licensed electrical trades for residential and commercial buildings across Canada and the US. State and provincial licensed master electricians on every dispatch, with the appropriate regulatory authority (ESA in Ontario, equivalent state bodies in the US) coordinated where required. Property managers and commercial owners use us because the work order, the license number, and the photo log close out on the same document.",
    scope: [
      {
        title: "Service entrance and panel work",
        body: "Panel upgrades, service mast replacement, subpanel installs, and load balancing. Permits pulled and inspection coordinated as part of the scope.",
      },
      {
        title: "Circuit, outlet, and switch installs",
        body: "New circuits for kitchens, basements, garages, and appliance loads. Dedicated lines for window units, dryers, and induction ranges.",
      },
      {
        title: "Lighting design and replacement",
        body: "Interior and exterior lighting layouts, LED retrofits, commercial relamping programs, and emergency lighting compliance work.",
      },
      {
        title: "EV charger installation",
        body: "Level 2 home installs and multifamily charging infrastructure with load management coordination. Rebate paperwork prepared where applicable.",
      },
      {
        title: "Generator and transfer switch",
        body: "Whole home and commercial standby generators, automatic transfer switch installs, and existing system service or fuel conversion.",
      },
      {
        title: "Inspection and code compliance",
        body: "ESA section reviews, fire alarm and life safety follow ups, and remediation of failed inspections. Audit ready documentation provided.",
      },
    ],
    whyUs:
      "Electrical work is where the documentation question gets loud. A handwritten invoice does not pass an insurance audit and does not satisfy a buyer review. Every Bridgepoint electrical job closes with a license number, a permit reference where applicable, and a photo log of the panel or device installed. It is the same package whether the job is one outlet or a service entrance replacement.",
    related: [
      { label: "Emergency electrical response", href: "/emergency/electrical" },
      { label: "No power dispatch", href: "/emergency/no-power" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
      { label: "Building upkeep program", href: "/services/building-upkeep" },
    ],
    faq: [
      {
        q: "Are your electricians licensed?",
        a: "Yes. Bridgepoint dispatches state and provincial licensed electrical contractors and master electricians. License numbers print on the work order.",
      },
      {
        q: "Can you install EV chargers in a condo building?",
        a: "Yes. We work with condo boards, property managers, and building engineers on shared charging infrastructure and individual unit installs.",
      },
      {
        q: "Do you handle commercial panel upgrades?",
        a: "Yes. Service entrance replacements, transformer coordination, and panel work for office, retail, industrial, and multifamily properties.",
      },
      {
        q: "Do you provide audit ready paperwork?",
        a: "Yes. Every job closes with license numbers, permit references, and photo documentation suitable for compliance, insurance, and buyer review.",
      },
    ],
    metaTitle: "Electrical Services | Licensed Electricians, North America",
    metaDescription:
      "Licensed electrical service across Canada and the US. Panel upgrades, EV chargers, lighting, commercial work. State and provincial license numbers on every work order. Call 1-855-910-9090.",
  },
  {
    slug: "hvac",
    name: "HVAC Services",
    shortName: "HVAC",
    eyebrow: "Trade services",
    tagline: "Heating, cooling, ventilation, and gas work. Residential and commercial systems across Canada and the US.",
    intro:
      "Bridgepoint Maintenance dispatches TSSA licensed gas technicians and HVAC trades for furnaces, boilers, heat pumps, air conditioners, ventilation systems, and commercial rooftop units across Canada and the US. Twenty four hour emergency dispatch in winter and summer extremes. Scheduled service contracts for property managers and commercial owners during the shoulder seasons.",
    scope: [
      {
        title: "Furnace service and replacement",
        body: "Gas, electric, and oil furnace diagnostics, ignition and board work, blower motor swaps, and full replacement when the equipment is past the curve.",
      },
      {
        title: "Boiler service and replacement",
        body: "Cast iron, mod con, and hydronic systems. Pump replacements, expansion tank service, and zone valve work.",
      },
      {
        title: "Air conditioning",
        body: "Central, ductless mini split, and rooftop AC. Refrigerant work performed by certified technicians under the appropriate regulatory framework.",
      },
      {
        title: "Heat pump installation",
        body: "Air source and cold climate heat pumps for residential and small commercial. Rebate and incentive paperwork prepared where available.",
      },
      {
        title: "Commercial rooftop and split systems",
        body: "RTU service, preventative maintenance scheduling, filter programs, and refrigerant management for office, retail, and industrial buildings.",
      },
      {
        title: "Ventilation, air handlers, and IAQ",
        body: "ERV and HRV installs, duct cleaning, air quality testing, and ventilation balancing for tighter building envelopes.",
      },
    ],
    whyUs:
      "HVAC is where buildings break first and where the second opinion question gets asked most often. We send a tech, scope the actual problem, and write a flat rate quote with the equipment that will close the job out. No double counted refrigerant charges, no recurring diagnostic fees on the same unit, and a clean handoff to a replacement scope if the repair is no longer economical.",
    related: [
      { label: "Emergency HVAC dispatch", href: "/emergency/hvac" },
      { label: "No heat winter response", href: "/emergency/no-heat" },
      { label: "No cooling summer response", href: "/emergency/no-cooling" },
      { label: "Preventative maintenance program", href: "/services/preventative-maintenance" },
    ],
    faq: [
      {
        q: "Do you respond to no heat calls in winter?",
        a: "Yes. Twenty four hour emergency dispatch for no heat and no cooling. Call 1-855-910-9090 the moment the system goes down.",
      },
      {
        q: "Are your HVAC techs licensed for gas work?",
        a: "Yes. Furnace, boiler, water heater, and gas line work performed by TSSA licensed technicians. License numbers available on request and on the work order.",
      },
      {
        q: "Can you set up a preventative HVAC contract?",
        a: "Yes. Quarterly and seasonal service contracts for property managers, commercial owners, and multifamily operators. Single billing and consolidated reporting.",
      },
      {
        q: "Do you install heat pumps?",
        a: "Yes. Air source and cold climate heat pump installs for residential and small commercial. We help with available rebate paperwork.",
      },
    ],
    metaTitle: "HVAC Services | Heating, Cooling, Gas Work",
    metaDescription:
      "Licensed HVAC and gas service across Canada and the US. Furnaces, boilers, AC, heat pumps, rooftop units. Call 1-855-910-9090.",
  },
  {
    slug: "carpentry",
    name: "Carpentry Services",
    shortName: "Carpentry",
    eyebrow: "Trade services",
    tagline: "Finish carpentry, framing, doors, trim, and small build outs for residential and commercial properties.",
    intro:
      "Bridgepoint Maintenance handles the carpentry layer most property owners hate sourcing on a one off basis. Door swaps, trim packages, baseboard runs, cabinet repairs, and small build outs that fall between full renovation and a quick handyman call. We dispatch carpenters on stocked trucks so doors, hinges, locksets, and trim packages are usually on board for same visit completion.",
    scope: [
      {
        title: "Interior and exterior doors",
        body: "Door slab swaps, prehung installs, frame repairs, and weather sealing. Commercial fire rated door work coordinated with the appropriate inspections.",
      },
      {
        title: "Trim, baseboard, and molding",
        body: "Replacement runs after flooring work, full trim packages for unit turnovers, and matching profile sourcing on older buildings.",
      },
      {
        title: "Cabinetry repair and adjustment",
        body: "Hinge replacement, door realignment, drawer slide repair, and partial cabinet face swaps. Full custom builds referred when appropriate.",
      },
      {
        title: "Framing and partition work",
        body: "Wall framing for small build outs, partition installs in commercial fit outs, and structural backing for fixture mounting.",
      },
      {
        title: "Window and frame repair",
        body: "Sash repair, sill replacement, and frame rebuilds. Full window replacements coordinated through our building upkeep program.",
      },
      {
        title: "Shelving, built ins, and mounting",
        body: "Closet systems, garage shelving, commercial storage racks, and wall mounted equipment. We handle the carpentry and the anchor work.",
      },
    ],
    whyUs:
      "Carpentry rarely sits alone. A door swap usually needs paint touch up. A trim run usually follows a flooring install. Our crews coordinate across trades so the painter, the floor crew, and the carpenter are scheduled in the right order. One work order, one quote, one closeout.",
    related: [
      { label: "Drywall and painting", href: "/services/drywall-and-painting" },
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Tenant fit out program", href: "/services/tenant-fit-outs" },
      { label: "General repairs", href: "/services/general-repairs" },
    ],
    faq: [
      {
        q: "Do you do small carpentry jobs or just big projects?",
        a: "Both. Our property manager accounts run lots of small line items per month. We aggregate them into one dispatch and one invoice.",
      },
      {
        q: "Can you match older trim profiles?",
        a: "Usually yes. Older buildings need a sourcing pass before the job. We scope on site and confirm the match before scheduling the crew.",
      },
      {
        q: "Do you build cabinets from scratch?",
        a: "Stock and semi custom yes. Full custom cabinetry is referred to a cabinet shop with the install handled by our crews.",
      },
      {
        q: "Are your carpenters licensed?",
        a: "Carpentry is a recognized skilled trade. Our crews carry the appropriate trade certifications and WSIB or state equivalent coverage.",
      },
    ],
    metaTitle: "Carpentry Services | Doors, Trim, Build Outs",
    metaDescription:
      "Carpentry services for residential and commercial properties across Canada and the US. Doors, trim, framing, cabinet repair, mounting. Call 1-855-910-9090.",
  },
  {
    slug: "drywall-and-painting",
    name: "Drywall and Painting",
    shortName: "Drywall and Painting",
    eyebrow: "Trade services",
    tagline: "Patch, finish, prime, and paint. One crew handles the wall from board to final coat.",
    intro:
      "Bridgepoint Maintenance runs drywall and painting as a combined workflow. Patching, taping, mudding, sanding, priming, and finishing on the same dispatch. Property managers use us for unit turnovers. Homeowners use us after water damage and renovations. Commercial owners use us for tenant fit outs and common area refresh cycles.",
    scope: [
      {
        title: "Drywall repair and patching",
        body: "Small holes, large openings after a leak, popped fasteners, and texture matching. We carry the common board sizes on the truck.",
      },
      {
        title: "Taping, mudding, and finishing",
        body: "Level 4 and level 5 finishes for residential and commercial. Skim coat work after old wallpaper removal or surface damage.",
      },
      {
        title: "Priming and painting",
        body: "Interior wall, ceiling, trim, and door packages. Spray and roller depending on the scope. Color matching available on site.",
      },
      {
        title: "Touch up and turnover painting",
        body: "Recurring unit turnover programs for property managers with consistent paint specs across the portfolio. Bulk paint sourcing on long contracts.",
      },
      {
        title: "Exterior painting",
        body: "Trim, doors, fences, and accent work. Pressure washing and prep handled as part of the package on residential exteriors.",
      },
      {
        title: "Texture and specialty finishes",
        body: "Knockdown, orange peel, popcorn ceiling repair and matching. Specialty plaster work referred when scope requires.",
      },
    ],
    whyUs:
      "Drywall and paint are the punch list categories that drag a renovation across a deadline. Our crews close out the wall as one workflow. We hold scope, we hold timeline, and we hold the paint color across multi unit turnovers so the building looks consistent six months in.",
    related: [
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Tenant fit outs", href: "/services/tenant-fit-outs" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "General repairs", href: "/services/general-repairs" },
    ],
    faq: [
      {
        q: "Do you do drywall and paint together or are they separate crews?",
        a: "Together. One crew handles board to final coat. Cleaner schedule, cleaner closeout.",
      },
      {
        q: "Can you match an existing wall color?",
        a: "Yes. We color match on site. Bring us a chip if you have one. Otherwise we sample the wall and match against the closest commercial paint code.",
      },
      {
        q: "Do you do exterior painting?",
        a: "Yes. Trim, doors, fences, and small exterior surfaces. Full building exteriors handled through our building upkeep program.",
      },
      {
        q: "How long does a typical unit turnover paint take?",
        a: "Most one bedroom apartment turnovers close in one to two days. We coordinate with cleaning and flooring so the unit is rent ready faster.",
      },
    ],
    metaTitle: "Drywall and Painting | Patch, Finish, Paint",
    metaDescription:
      "Drywall and painting services for residential, commercial, and multifamily properties. Patch, tape, prime, paint. Single crew. Call 1-855-910-9090.",
  },
  {
    slug: "general-repairs",
    name: "General Repairs",
    shortName: "General Repairs",
    eyebrow: "Trade services",
    tagline: "Small line item repairs across the property. Locks, hardware, fixtures, and minor multi trade work.",
    intro:
      "Bridgepoint Maintenance aggregates the long tail of small property repairs that no one trade owns end to end. Door hardware, lock changes, towel bars, faucet replacements, light fixture swaps, weatherstripping, caulking, and the punch list that follows every renovation. One dispatch line, one work order, one invoice across the property.",
    scope: [
      {
        title: "Door hardware and locksets",
        body: "Lock changes, smart lock installs, door closer adjustments, hinge replacements, and weather sealing.",
      },
      {
        title: "Fixture and accessory installs",
        body: "Light fixtures, ceiling fans, towel bars, mirrors, shelving, curtain hardware, and mounted accessories.",
      },
      {
        title: "Caulking, sealing, and weatherization",
        body: "Window and door seals, bathtub and tile caulk, exterior penetration sealing, and drafting fixes.",
      },
      {
        title: "Minor plumbing fixes",
        body: "Faucet swaps, toilet rebuilds, supply line replacement, and small leak repairs that do not need a full plumbing dispatch.",
      },
      {
        title: "Minor electrical fixes",
        body: "Outlet and switch swaps, smoke detector replacement, doorbell installs, and small line item electrical that fits the handyman scope.",
      },
      {
        title: "Punch list coordination",
        body: "Renovation closeout punch lists, building inspection follow ups, and property condition repair lists from inspections or insurance.",
      },
    ],
    whyUs:
      "Property managers tell us repeatedly that the small repair backlog is what kills tenant satisfaction. Big calls get fast attention. Small calls sit. Bridgepoint runs a dispatch model that batches small line items into a single visit, with one work order, one invoice, and one technician on site. The backlog goes down. The tenant feedback goes up.",
    related: [
      { label: "Carpentry services", href: "/services/carpentry" },
      { label: "Drywall and painting", href: "/services/drywall-and-painting" },
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "What is the smallest job you will take?",
        a: "Under our property manager accounts we accept single line item dispatches. For one off residential calls we set a minimum trip charge that is quoted up front.",
      },
      {
        q: "Can you handle a list of small repairs in one visit?",
        a: "Yes. That is the entire point of our general repair program. One technician, one trip, one invoice covering the list.",
      },
      {
        q: "Do you do work that crosses trades?",
        a: "Yes. Most small jobs cross trades in some way. We route the specialist work to the right department when a job needs it.",
      },
      {
        q: "How is the cost quoted?",
        a: "Flat rate by the job when the scope is clear. Hourly with a quoted ceiling when the scope is open ended.",
      },
    ],
    metaTitle: "General Repairs | Handyman and Property Repair",
    metaDescription:
      "General property repair service. Hardware, fixtures, caulking, small plumbing, small electrical. One dispatch, one invoice. Call 1-855-910-9090.",
  },
  {
    slug: "preventative-maintenance",
    name: "Preventative Maintenance",
    shortName: "Preventative Maintenance",
    eyebrow: "Trade services",
    tagline: "Scheduled maintenance contracts that reduce emergency calls and capital surprises.",
    intro:
      "Bridgepoint Maintenance runs preventative maintenance programs for property managers, commercial owners, multifamily operators, and institutional asset holders across Canada and the US. The premise is simple. Inspect and service the building on a calendar so the equipment never breaks at midnight. Our PM programs cover HVAC, plumbing, electrical, building envelope, life safety, and common area systems on schedules that match the asset class.",
    scope: [
      {
        title: "Quarterly HVAC service",
        body: "Filter changes, coil cleaning, refrigerant checks, combustion analysis on gas equipment, and seasonal heat or cool changeovers.",
      },
      {
        title: "Plumbing inspections",
        body: "Annual or biannual building wide plumbing inspections, drain camera passes on at risk lines, and water heater anode rod programs.",
      },
      {
        title: "Electrical safety reviews",
        body: "Panel inspections, emergency lighting testing, exit sign compliance, and battery backup verification across the building.",
      },
      {
        title: "Building envelope checks",
        body: "Roof, flashing, sealant, window, and door inspections. Caulking and weather sealing programs scheduled by season.",
      },
      {
        title: "Life safety coordination",
        body: "Fire alarm, sprinkler, and suppression coordination with the certified vendors required by code. We handle scheduling and access.",
      },
      {
        title: "Common area maintenance",
        body: "Lighting relamping, hardware refresh, paint touch up, and the recurring fixes that keep common areas presenting well.",
      },
    ],
    whyUs:
      "Most property managers do not have a PM program. They have an emergency contact and a wishlist. Our PM contracts close the gap. Calendar based service, photo log per visit, and a single point of accountability across the building systems. Insurance premiums drop. Capital surprises drop. Tenant satisfaction goes up.",
    related: [
      { label: "HVAC services", href: "/services/hvac" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Building upkeep program", href: "/services/building-upkeep" },
      { label: "Compliance and certifications", href: "/resources/compliance-and-certifications" },
    ],
    faq: [
      {
        q: "How is a PM contract priced?",
        a: "Flat monthly or quarterly fee scoped to the building. We walk the property, identify the asset count, and write the contract against the actual systems.",
      },
      {
        q: "What if something breaks between visits?",
        a: "Contract holders get priority emergency dispatch and discounted hourly rates on calls between visits.",
      },
      {
        q: "Do you provide reporting?",
        a: "Yes. Monthly portfolio reports with work order history, photo log, response times, and recommended capital planning items.",
      },
      {
        q: "Can you take over an existing PM program?",
        a: "Yes. We onboard with a building walk, an asset inventory, and a phased rollout of the new schedule against the previous vendor handoff.",
      },
    ],
    metaTitle: "Preventative Maintenance Contracts",
    metaDescription:
      "Scheduled preventative maintenance programs across HVAC, plumbing, electrical, life safety, and building envelope. Call 1-855-910-9090.",
  },
  {
    slug: "unit-turnovers",
    name: "Unit Turnovers",
    shortName: "Unit Turnovers",
    eyebrow: "Trade services",
    tagline: "Multi trade unit turnover service for property managers and multifamily operators.",
    intro:
      "Bridgepoint Maintenance runs unit turnover programs for property managers and multifamily operators across Canada and the US. A turnover is rarely one trade. Paint, drywall, flooring touch up, fixture swaps, hardware changes, lock rekeys, and final cleaning. We package the work as one scope, one quote, and one closeout. Speed to rent ready is the metric we work against.",
    scope: [
      {
        title: "Walkthrough and scope",
        body: "Photo walkthrough, condition assessment, and a flat rate quote against the unit specification. Standard finish levels priced by the unit class.",
      },
      {
        title: "Paint and drywall",
        body: "Patch, prime, and paint to the building standard. Color held consistent across the portfolio so the building reads as one product.",
      },
      {
        title: "Flooring touch up and refresh",
        body: "Floor sand and seal on hardwood, vinyl plank repair, tile replacement, and carpet steam clean or replace. Full reflooring referred when scope requires.",
      },
      {
        title: "Plumbing, electrical, and HVAC",
        body: "Fixture swaps, faucet aerators, light fixture replacement, smoke detector replacement, and HVAC filter or full service depending on the time since last turnover.",
      },
      {
        title: "Hardware and lock changes",
        body: "Lock rekey or full lockset replacement, smart lock installs, and hardware refresh across doors, cabinets, and bathrooms.",
      },
      {
        title: "Final clean and inspection",
        body: "Move out clean, post construction clean, and a final inspection with photo handoff to the property manager so the unit is marketing ready.",
      },
    ],
    whyUs:
      "Vacancy is the most expensive number on a rent roll. Our turnover program compresses days on market by collapsing the scheduling overhead between trades. One dispatch, one project manager, one closeout. Property managers get the keys back. The unit goes live. The owner stops paying for a vacant asset.",
    related: [
      { label: "Drywall and painting", href: "/services/drywall-and-painting" },
      { label: "General repairs", href: "/services/general-repairs" },
      { label: "Tenant fit outs", href: "/services/tenant-fit-outs" },
      { label: "Multi family buildings program", href: "/industries/multi-family-buildings" },
    ],
    faq: [
      {
        q: "How fast is a typical unit turnover?",
        a: "One bedroom standard turnovers close in two to four days end to end. Larger units or scope additions extend on a per item basis.",
      },
      {
        q: "Do you handle the cleaning at the end?",
        a: "Yes. Move out clean and post construction clean are part of the package on every turnover.",
      },
      {
        q: "Can you hold a consistent paint color across the portfolio?",
        a: "Yes. We register the color code per property and source from one supplier so the building reads as one product over time.",
      },
      {
        q: "What if a turnover needs a major repair we did not know about?",
        a: "We document and quote separately so the original turnover scope holds. The repair runs against its own work order.",
      },
    ],
    metaTitle: "Unit Turnover Service for Property Managers",
    metaDescription:
      "Multi trade unit turnover service. Paint, drywall, flooring, fixtures, locks, final clean. One dispatch. One invoice. Call 1-855-910-9090.",
  },
  {
    slug: "commercial-contracting",
    name: "Commercial Contracting",
    shortName: "Commercial Contracting",
    eyebrow: "Trade services",
    tagline: "Commercial general contracting for tenant improvements, fit outs, and building wide projects.",
    intro:
      "Bridgepoint Maintenance runs a commercial contracting line for office, retail, industrial, and mixed use properties across Canada and the US. Smaller scope tenant improvements, fit outs, building system upgrades, and the multi trade projects that fall between full ground up construction and a service call. Project managed end to end with permits, inspections, and trade coordination handled in house.",
    scope: [
      {
        title: "Tenant improvement projects",
        body: "Demising walls, electrical and HVAC routing, ceiling work, lighting, paint, and finishes for incoming commercial tenants.",
      },
      {
        title: "Building system upgrades",
        body: "Lighting retrofits, HVAC equipment swaps, electrical service upgrades, and life safety modernization projects.",
      },
      {
        title: "Permit and inspection coordination",
        body: "Permit pulls, trade inspections, fire and life safety sign offs, and occupancy follow ups handled by our project team.",
      },
      {
        title: "Multi trade scheduling",
        body: "Sequence and coordinate electrical, plumbing, HVAC, drywall, paint, and finish trades so the project lands on schedule.",
      },
      {
        title: "Project documentation",
        body: "Photo logs, permit references, as built drawings where required, and a turnover package at project close.",
      },
      {
        title: "Capital project support",
        body: "Roof replacement coordination, parking lot work, exterior envelope projects, and capital planning support across the portfolio.",
      },
    ],
    whyUs:
      "Property owners come to us for the commercial work that is too small to interest a general contractor but too coordinated for a single trade to own. Our project managers run the sequencing, the permits, and the trade handoffs so the owner sees a single point of contact end to end.",
    related: [
      { label: "Tenant fit outs", href: "/services/tenant-fit-outs" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Building upkeep program", href: "/services/building-upkeep" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "What size commercial projects do you take on?",
        a: "Anything from a small tenant fit out through mid scope capital projects. Ground up construction is referred to general contractors that specialize in new build.",
      },
      {
        q: "Do you pull permits?",
        a: "Yes. Permit pulls and inspection coordination are part of the project management scope.",
      },
      {
        q: "Do you provide a project manager on every job?",
        a: "Yes on commercial contracting scopes. The PM owns the schedule, the budget, and the documentation handoff.",
      },
      {
        q: "How long does a typical commercial fit out take?",
        a: "Small retail fit outs run two to six weeks. Larger office or industrial scopes run on a project schedule scoped at quoting.",
      },
    ],
    metaTitle: "Commercial Contracting | Tenant Improvements and Building Projects",
    metaDescription:
      "Commercial general contracting for tenant improvements, building upgrades, and multi trade projects across Canada and the US. Call 1-855-910-9090.",
  },
  {
    slug: "tenant-fit-outs",
    name: "Tenant Fit Outs",
    shortName: "Tenant Fit Outs",
    eyebrow: "Trade services",
    tagline: "Office, retail, and industrial fit outs for incoming tenants. Build out, finish, and turnkey delivery.",
    intro:
      "Bridgepoint Maintenance handles tenant fit outs for commercial landlords and tenants across Canada and the US. New tenant comes in, scope gets drawn up, and the space needs to be delivered in lease ready condition. We project manage the build out from demising walls to final furniture coordination, with permits and inspections handled in house.",
    scope: [
      {
        title: "Demolition and prep",
        body: "Selective demolition, debris removal, and surface preparation for the new build out. Hazardous material handling coordinated where required.",
      },
      {
        title: "Demising walls and partitions",
        body: "Wall framing, drywall, fire rated assemblies, and acoustic treatment depending on the tenant requirement.",
      },
      {
        title: "Electrical and lighting",
        body: "Power layout, dedicated circuits, lighting design and install, data and low voltage coordination with the IT contractor.",
      },
      {
        title: "Mechanical and HVAC",
        body: "HVAC routing, equipment swaps, ductwork modifications, and refrigerant work to match the new floor plan.",
      },
      {
        title: "Finishes and millwork",
        body: "Paint, flooring, ceiling, doors, and millwork. Coordinated with the tenant design team where applicable.",
      },
      {
        title: "Occupancy and turnover",
        body: "Final inspections, permit closeout, a punch list pass, and a turnover package that closes out the lease commencement.",
      },
    ],
    whyUs:
      "Commercial leases run against a clock. Every day of delay is a day of rent the tenant or landlord eats. Our fit out program is built to compress that schedule. Permits early, trades sequenced, finishes ordered with lead time, and a project manager on site who owns the closeout date.",
    related: [
      { label: "Commercial contracting", href: "/services/commercial-contracting" },
      { label: "Unit turnovers", href: "/services/unit-turnovers" },
      { label: "Retail and office program", href: "/industries/retail-and-office" },
      { label: "Carpentry services", href: "/services/carpentry" },
    ],
    faq: [
      {
        q: "Do you work with the tenant designer?",
        a: "Yes. We coordinate with architects, interior designers, and tenant facilities teams across the build out.",
      },
      {
        q: "Can you handle data and AV work?",
        a: "We coordinate with the tenant IT or AV contractor. Low voltage trades are subbed in where outside our internal scope.",
      },
      {
        q: "How is a fit out priced?",
        a: "Lump sum against a defined scope or open book on time and materials when the scope is still moving. Either way we lock the schedule.",
      },
      {
        q: "What if the lease commencement date moves?",
        a: "We adjust the sequence and notify all trades. Schedule changes are tracked against the project log.",
      },
    ],
    metaTitle: "Tenant Fit Outs | Office, Retail, and Industrial Build Out",
    metaDescription:
      "Tenant fit out construction for office, retail, and industrial spaces. Permit, build, finish, deliver. Call 1-855-910-9090.",
  },
  {
    slug: "facility-maintenance",
    name: "Facility Maintenance",
    shortName: "Facility Maintenance",
    eyebrow: "Trade services",
    tagline: "Building wide facility maintenance contracts for institutional, commercial, and multifamily assets.",
    intro:
      "Bridgepoint Maintenance runs facility maintenance programs for institutional asset holders, commercial owners, multifamily operators, and condominium corporations across Canada and the US. A facility maintenance contract is the operational layer above preventative maintenance. We hold the day to day building operations and route the right trade to the right issue without an internal property staff having to manage the dispatch.",
    scope: [
      {
        title: "Daily operations dispatch",
        body: "Tenant calls, building staff requests, and walk through observations routed to the right trade in real time.",
      },
      {
        title: "Preventative scheduling",
        body: "Calendar based service across HVAC, plumbing, electrical, and building envelope as part of the operational contract.",
      },
      {
        title: "Vendor management",
        body: "Coordination with elevator, fire alarm, sprinkler, and other specialty vendors that the building requires by code.",
      },
      {
        title: "Capital planning support",
        body: "Asset condition tracking, expected end of life flags on major equipment, and a capital planning report at annual review.",
      },
      {
        title: "Reporting and compliance",
        body: "Monthly facility reports with work order history, response times, vendor performance, and compliance documentation.",
      },
      {
        title: "Emergency response coordination",
        body: "Twenty four hour emergency response routing across every trade. One number for the building. We coordinate the rest.",
      },
    ],
    whyUs:
      "Facility maintenance is what large operators normally staff in house. We deliver the same function on a contract basis so portfolio owners can scale without hiring a building operations team per asset. The result reads on the income statement. Lower vacancy. Lower vendor sprawl. Cleaner capital planning.",
    related: [
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Building upkeep program", href: "/services/building-upkeep" },
      { label: "Institutional asset holders", href: "/industries/institutional-asset-holders" },
      { label: "Condominium corporations", href: "/industries/condominium-corporations" },
    ],
    faq: [
      {
        q: "How is a facility maintenance contract scoped?",
        a: "We walk the building, inventory the asset base, review the existing service stack, and write a scope that matches the operational tempo.",
      },
      {
        q: "Do you replace in house building staff?",
        a: "Sometimes. We can supplement or fully replace internal building operations depending on the asset class and the owner preference.",
      },
      {
        q: "What does monthly reporting look like?",
        a: "Work order summary, photo log, response time data, vendor performance, compliance status, and capital planning notes.",
      },
      {
        q: "How quickly can you take over a building?",
        a: "Two to four weeks for a clean handoff. Faster if the prior vendor has good documentation.",
      },
    ],
    metaTitle: "Facility Maintenance Contracts",
    metaDescription:
      "Building wide facility maintenance contracts for commercial, institutional, multifamily, and condo assets. Call 1-855-910-9090.",
  },
  {
    slug: "building-upkeep",
    name: "Building Upkeep",
    shortName: "Building Upkeep",
    eyebrow: "Trade services",
    tagline: "Ongoing building upkeep programs covering envelope, common areas, and presentation.",
    intro:
      "Bridgepoint Maintenance runs building upkeep programs that keep a property presenting at the standard the owner expects. Exterior caulking, paint refresh cycles, common area lighting, hardware, signage, and the long tail of small items that determine how a building reads to tenants and buyers. We package upkeep as an annual scope with quarterly site reviews and recurring small line item dispatch.",
    scope: [
      {
        title: "Exterior envelope maintenance",
        body: "Caulking, sealant refresh, exterior paint touch up, masonry pointing, and weather sealing programs scheduled by season.",
      },
      {
        title: "Common area refresh",
        body: "Hallway and lobby paint refresh, lighting upgrades, hardware swaps, signage updates, and the recurring presentation work.",
      },
      {
        title: "Landscape and exterior",
        body: "Coordination with landscape vendors, exterior lighting, parking lot striping, and signage. We hold the schedule across vendors.",
      },
      {
        title: "Pest and prevention",
        body: "Pest control vendor coordination, building wide quarterly inspections, and prevention work on building penetrations.",
      },
      {
        title: "Window, glass, and door upkeep",
        body: "Window cleaning vendor coordination, door operation tuning, weather seal replacement, and broken glass response.",
      },
      {
        title: "Annual building review",
        body: "Full property walk with photo log, scope of recommended upkeep items, and a budget projection for the coming twelve months.",
      },
    ],
    whyUs:
      "Buildings degrade slowly. The painting that needed touch up two years ago becomes a full repaint by year four. Our upkeep programs front load the small fixes so the building never reaches the point of needing a capital project just to look presentable. Owners hold the asset value. Tenants notice the difference.",
    related: [
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "General repairs", href: "/services/general-repairs" },
      { label: "Condominium corporations", href: "/industries/condominium-corporations" },
    ],
    faq: [
      {
        q: "What is the difference between upkeep and preventative maintenance?",
        a: "Preventative maintenance is the mechanical and life safety layer. Upkeep is the presentation and envelope layer. They overlap on some items and we run them together when an owner contracts for both.",
      },
      {
        q: "How is upkeep priced?",
        a: "Annual scope at a flat fee with quarterly walks and a line item allowance for recurring small work. Larger items quoted separately.",
      },
      {
        q: "Do you handle the landscape and exterior vendors too?",
        a: "We coordinate with the landscape vendor on the building's behalf. Direct landscape contracts sit with the specialty vendor.",
      },
      {
        q: "Can upkeep replace a building manager?",
        a: "For smaller properties yes. Larger buildings usually keep a manager and use us as the trade and upkeep operator behind them.",
      },
    ],
    metaTitle: "Building Upkeep Programs",
    metaDescription:
      "Building upkeep contracts covering envelope, common areas, presentation, and annual reviews. Call 1-855-910-9090.",
  },
];

export const getServicePage = (slug: string) =>
  SERVICE_PAGES.find((p) => p.slug === slug);
