// INDUSTRIES SILO — 10 audience pages
import type { SiloPage } from "./silo-services";

export const INDUSTRY_PAGES: SiloPage[] = [
  {
    slug: "property-managers",
    name: "Property Managers",
    shortName: "Property Managers",
    eyebrow: "Who we serve",
    tagline: "Single dispatch line for property management portfolios across Canada and the US.",
    intro:
      "Bridgepoint Maintenance is built for property managers. The pain we solve is vendor sprawl. Most property management companies juggle ten to forty vendors per portfolio across plumbing, electrical, HVAC, drywall, painting, locks, and the long tail of small repairs. We consolidate that into one dispatch line, one account, and one work order trail across every trade and every property.",
    scope: [
      {
        title: "Account based dispatch",
        body: "Priority routing on portfolio accounts. Tenant calls, property manager calls, and after hours calls hit the same number and route by the building.",
      },
      {
        title: "Work order software integration",
        body: "Intake from major property management systems. Status updates, photos, and closeout notes back into your portfolio system.",
      },
      {
        title: "Consolidated billing",
        body: "Monthly invoices grouped by property, by category, or by owner. Net thirty available on approved accounts.",
      },
      {
        title: "Recurring service contracts",
        body: "Preventative maintenance contracts per building, scheduled to match the asset class and the owner expectation.",
      },
      {
        title: "Unit turnover programs",
        body: "Multi trade unit turnover service with consistent paint, hardware, and finish specs across the portfolio.",
      },
      {
        title: "Portfolio reporting",
        body: "Monthly reports with response times, spend by category, work order history, and recommended capital planning items.",
      },
    ],
    whyUs:
      "Property managers tell us the same story. Too many vendors. Too much chasing. Not enough documentation when something goes wrong. Our model fixes all three. One number for the portfolio. One project lead inside Bridgepoint on your account. One paper trail that survives an audit, an insurance claim, or an owner review.",
    related: [
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Facility maintenance program", href: "/services/facility-maintenance" },
      { label: "Multi family buildings program", href: "/industries/multi-family-buildings" },
    ],
    faq: [
      {
        q: "How does account setup work?",
        a: "Discovery call, portfolio walk, scope writing, and account onboarding. Most property management accounts go live within two weeks.",
      },
      {
        q: "Do you integrate with my property management software?",
        a: "Yes for the major systems. We can take work orders, push status updates, and return closeout documentation.",
      },
      {
        q: "What does pricing look like for property management accounts?",
        a: "Trade dispatch rates with property manager pricing tiers based on volume. Flat rate quoting per job. Preventative contracts priced per building.",
      },
      {
        q: "Can you handle after hours emergencies on the account?",
        a: "Yes. Twenty four hour priority dispatch with consolidated billing for property management accounts.",
      },
    ],
    metaTitle: "Property Manager Service Line",
    metaDescription:
      "Single dispatch line for property management portfolios. Plumbing, electrical, HVAC, repairs, turnovers, PM contracts. Call 1-855-910-9090.",
    overviewTitle: "Built for property management portfolios.",
    faqTitle: "Property manager FAQ.",
    faqDescription:
      "Common questions from property management companies on account dispatch, integrations, pricing, and after hours coverage.",
    ctaTitle: "Bring Bridgepoint onto the portfolio.",
    ctaBody:
      "One dispatch line, one project lead, one paper trail across every trade and every property in the portfolio. Call to set up an account.",
  },
  {
    slug: "landlords",
    name: "Landlords",
    shortName: "Landlords",
    eyebrow: "Who we serve",
    tagline: "Maintenance service for landlords with one or many rental properties across Canada and the US.",
    intro:
      "Bridgepoint Maintenance serves landlords who own one rental unit or several across Canada and the US. The challenge is the same at every scale. Tenants call, things break, and the wrong move costs you rent days. We give landlords a single trade dispatch line that handles the work order, communicates with the tenant, and closes the issue with documentation that holds up if a dispute arises.",
    scope: [
      {
        title: "Tenant call coordination",
        body: "Tenant calls in, we dispatch, we communicate ETA, and we close out with photo evidence. The landlord gets a clean work order.",
      },
      {
        title: "Emergency response",
        body: "Twenty four hour priority dispatch for active leaks, no heat, no power, and other emergencies that affect the tenant's right to quiet enjoyment.",
      },
      {
        title: "Unit turnovers",
        body: "Multi trade unit turnover between tenants. Paint, repairs, cleaning, and a rent ready handoff.",
      },
      {
        title: "Annual property reviews",
        body: "Annual property walk and condition report so the landlord knows what is coming before the tenant calls about it.",
      },
      {
        title: "Compliance documentation",
        body: "Smoke and carbon monoxide detector testing, electrical safety review, and other compliance items required by jurisdiction.",
      },
      {
        title: "Insurance ready paperwork",
        body: "Photo log and license documentation on every work order, suitable for insurance claims or tenant disputes.",
      },
    ],
    whyUs:
      "Most landlords lose money on maintenance because the work order is never properly documented. Photo missing. License number missing. Receipt missing. Then a dispute happens or an insurance claim shows up and the file is empty. Our model fixes that for landlords at any scale. Documentation by default. No extra effort.",
    related: [
      { label: "Property manager program", href: "/industries/property-managers" },
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Real estate investors program", href: "/industries/real-estate-investors" },
      { label: "Emergency dispatch", href: "/emergency" },
    ],
    faq: [
      {
        q: "Do I need to manage all the tenant communication?",
        a: "We coordinate directly with the tenant on dispatch and access. The landlord receives the work order and the closeout package.",
      },
      {
        q: "What is the minimum size landlord you work with?",
        a: "Single unit landlords are welcome. Our pricing scales by volume but the service model is the same.",
      },
      {
        q: "Can you bill the tenant directly for damage they caused?",
        a: "We invoice the landlord. Billing the tenant for damage is a landlord decision and a landlord conversation.",
      },
      {
        q: "Do you handle compliance items like smoke detector tests?",
        a: "Yes. Compliance items scoped per jurisdiction and documented on the work order.",
      },
    ],
    overviewTitle: "Built for landlords with one or many rentals.",
    faqTitle: "Landlord FAQ.",
    faqDescription:
      "Common questions from landlords on tenant request handling, billing, after hours response, and documentation.",
    ctaTitle: "Hand the maintenance off to Bridgepoint.",
    ctaBody:
      "One number for every rental property, every trade, every issue. Call to set up landlord account access and dispatch.",
    metaTitle: "Landlord Maintenance Service",
    metaDescription:
      "Maintenance service for landlords with rental properties across Canada and the US. One dispatch, documented work orders. Call 1-855-910-9090.",
  },
  {
    slug: "multi-family-buildings",
    name: "Multi Family Buildings",
    shortName: "Multi Family",
    eyebrow: "Who we serve",
    tagline: "Building wide maintenance for apartment complexes, walk ups, and multi family portfolios.",
    intro:
      "Bridgepoint Maintenance serves multi family operators across Canada and the US. Apartment buildings, walk ups, garden style complexes, and high rise rental towers. Our model is built for the volume and complexity multi family generates. Tenant calls every day. Common area issues every week. Unit turnovers running constantly. One vendor across all of it.",
    scope: [
      {
        title: "In unit maintenance",
        body: "Plumbing, electrical, HVAC, drywall, paint, locks, and the long tail of small repairs across every unit in the building.",
      },
      {
        title: "Common area maintenance",
        body: "Lobby, hallway, laundry, gym, and amenity space maintenance scheduled and documented across the building.",
      },
      {
        title: "Unit turnover programs",
        body: "Standardized unit turnover scope with consistent paint, hardware, and finish across every unit so the building reads as one product.",
      },
      {
        title: "Building system service",
        body: "HVAC plants, boilers, central plumbing, electrical distribution, life safety, and common building systems on PM contract.",
      },
      {
        title: "Emergency response",
        body: "Twenty four hour priority dispatch for the building. Account based routing on the property manager line.",
      },
      {
        title: "Capital planning support",
        body: "Asset condition tracking, end of life flags on major equipment, and annual capital planning support across the building.",
      },
    ],
    whyUs:
      "Multi family runs on volume. Most vendors cannot scale to the call count and still hold quality. Our dispatch model is designed for portfolio volume. Tenant calls hit the account number, route through priority routing, and close out on documented work orders. The property manager sees the dashboard. The owner sees the report. The building runs.",
    related: [
      { label: "Property manager program", href: "/industries/property-managers" },
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Institutional asset holders", href: "/industries/institutional-asset-holders" },
    ],
    faq: [
      {
        q: "What size buildings do you serve?",
        a: "Garden style complexes, walk ups, mid rise, and high rise. Our model scales by portfolio not by building size.",
      },
      {
        q: "Can you take over an existing building maintenance program?",
        a: "Yes. Two to four week handoff with a building walk, asset inventory, and vendor transition.",
      },
      {
        q: "Do you integrate with my property management software?",
        a: "Yes for major systems. Work order intake, status updates, and closeout documentation back into your portfolio system.",
      },
      {
        q: "How is multi family pricing structured?",
        a: "Combination of per call dispatch rates, PM contract fees per building, and turnover packages per unit. Scoped to the portfolio.",
      },
    ],
    overviewTitle: "Built for multi family buildings.",
    faqTitle: "Multi family FAQ.",
    faqDescription:
      "Common questions on common area work, unit turnovers, life safety systems, and capital planning across multi family buildings.",
    ctaTitle: "Cover the building with one trade partner.",
    ctaBody:
      "Common areas, in suite repairs, turnovers, and life safety on one dispatch line. Call to scope the building.",
    metaTitle: "Multi Family Building Maintenance",
    metaDescription:
      "Multi family building maintenance for apartment complexes, walk ups, and high rises across Canada and the US. Call 1-855-910-9090.",
  },
  {
    slug: "commercial-property-owners",
    name: "Commercial Property Owners",
    shortName: "Commercial Owners",
    eyebrow: "Who we serve",
    tagline: "Commercial property maintenance for office, retail, industrial, and mixed use assets.",
    intro:
      "Bridgepoint Maintenance serves commercial property owners across Canada and the US. Office buildings, retail centers, industrial parks, and mixed use assets. Our service line handles tenant call ins, common area maintenance, capital projects, and the recurring work that protects asset value. One vendor relationship across the asset.",
    scope: [
      {
        title: "Tenant request coordination",
        body: "Tenant calls in to the building line, we dispatch, we close out. Documentation routes back to the property management team.",
      },
      {
        title: "Common area and base building",
        body: "Common area lighting, HVAC, plumbing, electrical, and the base building systems that affect every tenant.",
      },
      {
        title: "Tenant improvements",
        body: "TI build outs, fit outs, and tenant move in coordination handled by our commercial contracting team.",
      },
      {
        title: "Capital projects",
        body: "Roof, parking lot, exterior envelope, and major mechanical projects coordinated as project managed scopes.",
      },
      {
        title: "Compliance and life safety",
        body: "Fire alarm, sprinkler, emergency lighting, and life safety coordination with the certified specialty vendors.",
      },
      {
        title: "Emergency response",
        body: "Twenty four hour priority dispatch across the building. Building down events handled with multi trade triage.",
      },
    ],
    whyUs:
      "Commercial properties live or die by NOI. Vendor sprawl, slow response, and missed PM all cost basis points. Our service model exists to compress that drag. Fewer vendors. Faster response. Documented PM that keeps insurance premiums in line. Owners see the result on the income statement.",
    related: [
      { label: "Commercial contracting", href: "/services/commercial-contracting" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Retail and office program", href: "/industries/retail-and-office" },
      { label: "Tenant fit out service", href: "/services/tenant-fit-outs" },
    ],
    faq: [
      {
        q: "Do you handle building down emergencies?",
        a: "Yes. Multi trade triage dispatch for whole building events. Plumbing, electrical, HVAC, and life safety coordinated under one project lead.",
      },
      {
        q: "Can you replace our existing facility manager?",
        a: "We supplement or fully replace internal facility management depending on the asset and the owner preference. Discuss scope at onboarding.",
      },
      {
        q: "What about specialty vendors like elevator and fire alarm?",
        a: "We coordinate with the certified specialty vendors required by code while running the rest of the building maintenance ourselves.",
      },
      {
        q: "How is commercial property service priced?",
        a: "Combination of PM contract, per call dispatch, and project pricing for capital work. Scoped to the asset.",
      },
    ],
    overviewTitle: "Built for commercial property owners.",
    faqTitle: "Commercial property FAQ.",
    faqDescription:
      "Common questions on tenant requested work, base building scope, life safety, and capital planning for commercial property owners.",
    ctaTitle: "One trade partner across the portfolio.",
    ctaBody:
      "Base building, tenant requested work, and life safety on one dispatch line. Call to set up the account.",
    metaTitle: "Commercial Property Owner Service",
    metaDescription:
      "Commercial property maintenance for office, retail, industrial, and mixed use assets across Canada and the US. Call 1-855-910-9090.",
  },
  {
    slug: "residential-property-owners",
    name: "Residential Property Owners",
    shortName: "Residential Owners",
    eyebrow: "Who we serve",
    tagline: "Maintenance service for residential property owners. Single homes and small portfolios.",
    intro:
      "Bridgepoint Maintenance serves residential property owners across Canada and the US. Homeowners, vacation property owners, and small residential portfolio holders. Our model gives a residential owner the same dispatch quality and documentation that property management companies expect. Real techs. Stocked trucks. Clean paperwork.",
    scope: [
      {
        title: "Routine home maintenance",
        body: "Plumbing, electrical, HVAC, and general repair calls. Same dispatch line. Same trade quality.",
      },
      {
        title: "Annual property reviews",
        body: "Annual home review with photo log and recommended upkeep items. Catch the small issues before they become big ones.",
      },
      {
        title: "Vacation property service",
        body: "Vacation property opening and closing service, winterization, and remote dispatch coordination for owners who are not local.",
      },
      {
        title: "Renovation coordination",
        body: "Small renovation scopes managed end to end across drywall, paint, flooring, fixtures, and finish work.",
      },
      {
        title: "Emergency response",
        body: "Twenty four hour emergency dispatch for residential events. Active leaks, no heat, no power, and other urgent issues.",
      },
      {
        title: "Pre sale preparation",
        body: "Pre listing inspections, punch list repairs, and presentation work to get a home ready for sale.",
      },
    ],
    whyUs:
      "Residential owners often go through five different vendors a year and rarely get the same trade twice. Our model gives the residential owner the kind of dispatch experience commercial owners are used to. One number, accountable techs, documented work orders, and the same crew next visit when possible.",
    related: [
      { label: "General repairs", href: "/services/general-repairs" },
      { label: "Plumbing services", href: "/services/plumbing" },
      { label: "HVAC services", href: "/services/hvac" },
      { label: "Emergency dispatch", href: "/emergency" },
    ],
    faq: [
      {
        q: "Do I need a maintenance contract or can I just call when I need something?",
        a: "Either works. Pay per call for one off issues. Annual contract for ongoing upkeep and priority dispatch.",
      },
      {
        q: "Can you help with a vacation property when I am not there?",
        a: "Yes. Vacation property service with remote coordination, opening and closing visits, and emergency response on file.",
      },
      {
        q: "What about pre sale repairs?",
        a: "Yes. We scope and execute pre listing repairs and punch list items. Documentation supports the buyer review process.",
      },
      {
        q: "Are emergency calls more expensive after hours?",
        a: "After hours dispatch fees may apply. Quoted before the truck rolls.",
      },
    ],
    overviewTitle: "Built for residential property owners.",
    faqTitle: "Residential owner FAQ.",
    faqDescription:
      "Common questions from homeowners on diagnostic visits, flat rate pricing, financing, and after hours response.",
    ctaTitle: "One number for every trade in your home.",
    ctaBody:
      "Plumbing, electrical, HVAC, drywall, painting, and the long tail of small repairs. Call to schedule or request an emergency dispatch.",
    metaTitle: "Residential Property Owner Service",
    metaDescription:
      "Maintenance service for residential property owners across Canada and the US. Single homes and small portfolios. Call 1-855-910-9090.",
  },
  {
    slug: "retail-and-office",
    name: "Retail and Office",
    shortName: "Retail and Office",
    eyebrow: "Who we serve",
    tagline: "Maintenance service for retail centers, office buildings, and mixed use commercial space.",
    intro:
      "Bridgepoint Maintenance serves retail centers and office buildings across Canada and the US. Strip plazas, shopping centers, office towers, and mixed use commercial space. Our service line handles tenant requests, common area maintenance, fit outs, and the recurring service that keeps the building leasable.",
    scope: [
      {
        title: "Tenant request dispatch",
        body: "Retail and office tenant calls dispatched and closed out with documentation routed to property management.",
      },
      {
        title: "Common area maintenance",
        body: "Lobby, corridor, restroom, parking lot, and common area HVAC, lighting, and plumbing.",
      },
      {
        title: "Tenant fit outs",
        body: "New tenant fit outs, refresh fit outs, and tenant exit punch lists handled by our commercial contracting team.",
      },
      {
        title: "Storefront and signage",
        body: "Storefront repair, signage install and refresh, and exterior facade work for retail tenants.",
      },
      {
        title: "Restroom and amenity service",
        body: "Plumbing fixture service, partition repair, and amenity space upkeep.",
      },
      {
        title: "Emergency response",
        body: "Twenty four hour emergency dispatch for retail and office. Multi trade triage during business hours and after hours.",
      },
    ],
    whyUs:
      "Retail and office buildings have the most dispatch volume per square foot. Tenants need fast response. Owners need clean documentation for tenant chargeback. Our model is designed for the throughput, with priority routing during business hours and twenty four hour emergency response for after hours events.",
    related: [
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
      { label: "Tenant fit outs", href: "/services/tenant-fit-outs" },
      { label: "Commercial contracting", href: "/services/commercial-contracting" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
    ],
    faq: [
      {
        q: "Can you chargeback work to specific tenants?",
        a: "Yes. Work order tagging supports tenant chargeback. Property management can split work orders between landlord and tenant scope at closeout.",
      },
      {
        q: "What about restroom and partition work?",
        a: "Yes. Restroom plumbing, partition repair and replacement, and amenity space upkeep are part of the retail and office scope.",
      },
      {
        q: "Do you do signage installs?",
        a: "Yes. Storefront signage install, refresh, and exterior facade work coordinated with sign vendors when required.",
      },
      {
        q: "How fast is response during business hours?",
        a: "Same day for standard service. Faster for emergencies that affect business operation. Call dispatch for an immediate ETA.",
      },
    ],
    overviewTitle: "Built for retail and office space.",
    faqTitle: "Retail and office FAQ.",
    faqDescription:
      "Common questions on tenant fit outs, after hours work windows, and life safety from retail and office operators.",
    ctaTitle: "Keep the storefront and the office running.",
    ctaBody:
      "Tenant fit outs, after hours service windows, and base building repair on one dispatch line. Call to set up the account.",
    metaTitle: "Retail and Office Maintenance Service",
    metaDescription:
      "Maintenance service for retail centers, office buildings, and mixed use commercial space across Canada and the US. Call 1-855-910-9090.",
  },
  {
    slug: "condominium-corporations",
    name: "Condominium Corporations",
    shortName: "Condo Corps",
    eyebrow: "Who we serve",
    tagline: "Maintenance and capital project service for condominium corporations and condo property managers.",
    intro:
      "Bridgepoint Maintenance serves condominium corporations across Canada and the US. Our service line handles common element maintenance, in suite emergency response, capital projects, and the recurring service required by reserve fund studies. Property management companies servicing condo corporations use us as the trade and project layer behind their account.",
    scope: [
      {
        title: "Common element maintenance",
        body: "Lobby, corridor, parking, mechanical room, and exterior maintenance. Documentation suitable for board review.",
      },
      {
        title: "In suite emergency response",
        body: "Twenty four hour in suite emergency response for owner units. Active leaks, no power, and other urgent calls.",
      },
      {
        title: "Reserve fund work",
        body: "Capital projects identified by the reserve fund study. Roof, mechanical, building envelope, and major systems.",
      },
      {
        title: "Owner unit chargeback support",
        body: "Documentation that supports board chargeback of in suite work to the unit owner where appropriate.",
      },
      {
        title: "Board and meeting support",
        body: "Quarterly or annual reports to the board with work order history, response times, and capital planning notes.",
      },
      {
        title: "Specialty vendor coordination",
        body: "Coordination with elevator, fire alarm, sprinkler, and other specialty vendors required by code.",
      },
    ],
    whyUs:
      "Condominium corporations require documentation and process that match the governance model. Board votes, reserve fund studies, and owner chargebacks all need clean paperwork. Our service model is built for that documentation rigor. Every work order ties back to the right ledger account and the right party.",
    related: [
      { label: "Multi family buildings", href: "/industries/multi-family-buildings" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Building upkeep", href: "/services/building-upkeep" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "Do you work with condo property management companies?",
        a: "Yes. Most of our condo work comes through the property management company on behalf of the corporation.",
      },
      {
        q: "Can you support reserve fund work?",
        a: "Yes. Capital projects identified by the RFS are scoped and project managed by our commercial contracting team.",
      },
      {
        q: "How does chargeback to owner units work?",
        a: "Work order documentation supports chargeback decisions made by the board. We invoice the corporation and the corporation handles owner billing.",
      },
      {
        q: "Can you attend board meetings?",
        a: "Yes for major projects and reviews. Quarterly or annual project lead presence available on contract.",
      },
    ],
    overviewTitle: "Built for condominium corporations.",
    faqTitle: "Condo corporation FAQ.",
    faqDescription:
      "Common questions on board reporting, common element repairs, reserve fund work, and resident communication for condo corporations.",
    ctaTitle: "One trade partner across the building.",
    ctaBody:
      "Common elements, reserve fund work, and resident requested repairs on one dispatch line. Call to brief the board.",
    metaTitle: "Condominium Corporation Service",
    metaDescription:
      "Maintenance and capital project service for condominium corporations across Canada and the US. Call 1-855-910-9090.",
  },
  {
    slug: "institutional-asset-holders",
    name: "Institutional Asset Holders",
    shortName: "Institutional",
    eyebrow: "Who we serve",
    tagline: "Maintenance partner for institutional real estate portfolios. Pension funds, REITs, family offices.",
    intro:
      "Bridgepoint Maintenance serves institutional asset holders across Canada and the US. Pension funds, REITs, family offices, and other institutional owners of large real estate portfolios. Our service model is built for the documentation, the reporting cadence, and the audit requirements institutional capital expects. One operating partner across the building level work that supports the asset level returns.",
    scope: [
      {
        title: "Portfolio level dispatch",
        body: "Single account across the portfolio with property level routing. Consistent service experience across every asset.",
      },
      {
        title: "Standardized PM programs",
        body: "Preventative maintenance programs standardized across the portfolio so every building gets the same baseline service.",
      },
      {
        title: "Audit ready documentation",
        body: "Every work order documented with photo log, license number, and trade documentation suitable for institutional audit.",
      },
      {
        title: "Capital planning support",
        body: "Asset condition tracking across the portfolio with end of life flags and capital project pipeline coordination.",
      },
      {
        title: "Compliance and life safety",
        body: "Fire alarm, sprinkler, elevator, and life safety vendor coordination with documentation tied to compliance calendars.",
      },
      {
        title: "Portfolio reporting",
        body: "Monthly or quarterly portfolio reports with response times, spend by category, capital planning, and compliance status.",
      },
    ],
    whyUs:
      "Institutional capital evaluates operating partners on documentation and consistency. Both are non negotiable. Our service model is built to deliver both at portfolio scale. Standardized PM. Audit ready paperwork. Consistent service experience across geography. Reporting that survives a deep audit.",
    related: [
      { label: "Real estate investors", href: "/industries/real-estate-investors" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Building upkeep", href: "/services/building-upkeep" },
    ],
    faq: [
      {
        q: "Can you serve a portfolio across multiple cities and states?",
        a: "Yes. Our dispatch model scales across Canada and the US with local trades in every market we serve.",
      },
      {
        q: "What does institutional reporting look like?",
        a: "Monthly portfolio reports with response times, spend by category, work order history, compliance status, and capital planning notes.",
      },
      {
        q: "How do you handle audit requests?",
        a: "Every work order has photo log, license number, and trade documentation. Audit packages assembled on request within standard SLA.",
      },
      {
        q: "Can you take on a partial portfolio while we evaluate?",
        a: "Yes. Pilot scope across a subset of buildings is a common starting point with institutional clients.",
      },
    ],
    overviewTitle: "Built for institutional asset holders.",
    faqTitle: "Institutional FAQ.",
    faqDescription:
      "Common questions on portfolio dispatch, vendor consolidation, reporting standards, and audit ready documentation for institutional asset holders.",
    ctaTitle: "Consolidate trade vendors across the portfolio.",
    ctaBody:
      "One dispatch line, one paper trail, and reporting at the portfolio level. Call to scope an institutional account.",
    metaTitle: "Institutional Asset Holder Service",
    metaDescription:
      "Maintenance partner for institutional real estate portfolios across Canada and the US. Audit ready documentation. Call 1-855-910-9090.",
  },
  {
    slug: "real-estate-investors",
    name: "Real Estate Investors",
    shortName: "Investors",
    eyebrow: "Who we serve",
    tagline: "Maintenance service for active real estate investors. Renovations, turnovers, and recurring service.",
    intro:
      "Bridgepoint Maintenance serves real estate investors across Canada and the US. Buy and hold investors, fix and flip operators, and growing portfolios. Our service line handles acquisition due diligence, renovation scopes, turnover programs, and the recurring maintenance that protects rental income. One vendor across acquisition, renovation, and ongoing operation.",
    scope: [
      {
        title: "Acquisition due diligence",
        body: "Property condition assessment, mechanical system review, and a written scope of expected repair and renovation work pre close.",
      },
      {
        title: "Renovation scopes",
        body: "Drywall, paint, flooring, fixture replacement, kitchen and bath refresh, and multi trade renovation work on a project schedule.",
      },
      {
        title: "Turnover programs",
        body: "Multi trade unit turnover service between tenants. Consistent finish levels across the portfolio.",
      },
      {
        title: "Recurring service",
        body: "Plumbing, electrical, HVAC, and general repair calls on per call dispatch or annual contract.",
      },
      {
        title: "Insurance documentation",
        body: "Photo log and license documentation on every work order, suitable for insurance claims and tenant disputes.",
      },
      {
        title: "Portfolio scaling support",
        body: "Standard scopes, standard finishes, and standard documentation across the portfolio so the next acquisition plugs in without rewriting the playbook.",
      },
    ],
    whyUs:
      "Real estate investors live or die by operating margin. The maintenance line item is the one most often overspent because investors take whatever vendor is available rather than running a process. Our service model gives the investor a repeatable process. Same scope. Same standard. Same documentation. Margin holds.",
    related: [
      { label: "Landlord service line", href: "/industries/landlords" },
      { label: "Unit turnover service", href: "/services/unit-turnovers" },
      { label: "Multi family buildings", href: "/industries/multi-family-buildings" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "Can you scope a property before I close on it?",
        a: "Yes. Pre acquisition property condition assessments are part of our standard offering.",
      },
      {
        q: "Do you do fix and flip renovations?",
        a: "Yes. Renovation scopes for resale prep. Quoted lump sum or open book depending on the scope clarity.",
      },
      {
        q: "Can you hold consistent finish levels across my portfolio?",
        a: "Yes. We register the standard finish package per investor and run it across every property we touch.",
      },
      {
        q: "How is investor pricing structured?",
        a: "Combination of per call dispatch rates, turnover packages, and project pricing for renovations. Scoped to the portfolio velocity.",
      },
    ],
    overviewTitle: "Built for real estate investors.",
    faqTitle: "Investor FAQ.",
    faqDescription:
      "Common questions from real estate investors on acquisition inspections, value add scoping, and ongoing maintenance across a rental portfolio.",
    ctaTitle: "One trade partner across the deal flow.",
    ctaBody:
      "Acquisition inspections, value add scoping, and ongoing portfolio maintenance on one dispatch line. Call to onboard.",
    metaTitle: "Real Estate Investor Maintenance Service",
    metaDescription:
      "Maintenance service for real estate investors across Canada and the US. Renovations, turnovers, recurring service. Call 1-855-910-9090.",
  },
  {
    slug: "trades-and-subcontractors",
    name: "Trades and Subcontractors",
    shortName: "Trades and Subs",
    eyebrow: "Who we serve",
    tagline: "Sub work, overflow dispatch, and partnership programs for licensed trade companies.",
    intro:
      "Bridgepoint Maintenance partners with licensed trade companies across Canada and the US on sub work, overflow dispatch, and trade partnerships. If you are a licensed plumber, electrician, HVAC company, or general trade and want overflow work from our dispatch board, we run a trade partnership program. Apply once. We feed work in your service area when our internal trucks are booked.",
    scope: [
      {
        title: "Overflow dispatch",
        body: "Overflow work from our service area when internal trucks are at capacity. Same pricing model, same documentation requirements.",
      },
      {
        title: "Specialty sub work",
        body: "Specialty trades we do not staff internally. Elevator, fire suppression, specialty refrigeration, and other certified specialty work.",
      },
      {
        title: "Geographic coverage extension",
        body: "Trade partners in markets we are expanding into so we can hold same service quality while local dispatch scales.",
      },
      {
        title: "License and insurance verification",
        body: "Onboarding requires license verification, insurance review, and a sample work order audit. Standard for trade partners.",
      },
      {
        title: "Trade partner billing",
        body: "Net thirty payment on documented work orders. Standardized invoicing process across all trade partners.",
      },
      {
        title: "Quality and documentation standards",
        body: "Trade partners follow the Bridgepoint work order standard. Photo log, license number on file, closeout notes.",
      },
    ],
    whyUs:
      "Trade partners get steady overflow work without having to run their own marketing. We get geographic coverage and specialty capability we cannot staff internally everywhere. The partnership is straightforward. Apply, verify, get added to the dispatch board, take overflow when it fits your truck schedule.",
    related: [
      { label: "About Bridgepoint", href: "/about" },
      { label: "Careers and crew", href: "/careers" },
      { label: "Property manager program", href: "/industries/property-managers" },
      { label: "Service areas", href: "/service-areas" },
    ],
    faq: [
      {
        q: "How do I apply to become a trade partner?",
        a: "Email careers at bridgepointmaintenance dot com with your trade, license, insurance, and service area. Onboarding takes one to two weeks.",
      },
      {
        q: "What licenses do you require?",
        a: "Required licenses match the trade and the jurisdiction. Plumbing, electrical, HVAC, and gas all require the appropriate provincial or state licenses.",
      },
      {
        q: "How does payment work?",
        a: "Net thirty on documented work orders. Standardized invoicing process. Trade partner statements monthly.",
      },
      {
        q: "Can I take overflow work outside my truck schedule?",
        a: "No. Trade partners are not required to take every dispatch. The board flexes around your truck schedule.",
      },
    ],
    overviewTitle: "Built for trade partners and subcontractors.",
    faqTitle: "Trades and subs FAQ.",
    faqDescription:
      "Common questions from licensed trades on partner onboarding, dispatch volume, payment terms, and quality standards.",
    ctaTitle: "Join the Bridgepoint trade network.",
    ctaBody:
      "Licensed trades across Canada and the US plug into our dispatch volume on transparent terms. Call to start the conversation.",
    metaTitle: "Trade Partner and Subcontractor Program",
    metaDescription:
      "Overflow dispatch and trade partnerships for licensed trade companies across Canada and the US. Call 1-855-910-9090.",
  },
];

export const getIndustryPage = (slug: string) =>
  INDUSTRY_PAGES.find((p) => p.slug === slug);
