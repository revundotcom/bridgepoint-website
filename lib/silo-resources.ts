// RESOURCES SILO — 5 resource pages
import type { SiloPage } from "./silo-services";

export const RESOURCE_PAGES: SiloPage[] = [
  {
    slug: "blog",
    name: "Bridgepoint Blog",
    shortName: "Blog",
    eyebrow: "Resources",
    tagline: "Maintenance, dispatch, and property operations insights from the Bridgepoint team.",
    intro:
      "The Bridgepoint blog covers what we see across the dispatch board every week. Trends in property maintenance. Operational notes from the field. Capital planning topics for property managers and commercial owners. Most posts run six hundred to twelve hundred words and link to the relevant trade or service line. We publish on a recurring schedule with new posts each month.",
    scope: [
      {
        title: "Trade and dispatch insights",
        body: "Posts from the field on plumbing, electrical, HVAC, and general maintenance dispatch. What we see, what works, what to watch.",
      },
      {
        title: "Property manager guides",
        body: "Operational notes for property managers running portfolios. Work order setup, vendor management, and documentation rigor.",
      },
      {
        title: "Seasonal preparation",
        body: "Spring prep, fall prep, winter readiness, and summer maintenance for residential and commercial properties.",
      },
      {
        title: "Capital planning topics",
        body: "Reserve fund planning, end of life equipment tracking, and capital project sequencing for institutional and commercial owners.",
      },
      {
        title: "Industry trends and regulatory updates",
        body: "Code updates, regulatory shifts, and industry trends that affect property operations across Canada and the US.",
      },
      {
        title: "Case notes and field examples",
        body: "Anonymized field examples from the dispatch board. What we saw, what we did, what worked.",
      },
    ],
    whyUs:
      "Most maintenance company blogs are SEO filler. Ours is field notes. Real posts from real dispatch. The goal is to help property managers, commercial owners, and homeowners understand what a properly run maintenance operation looks like so they recognize the difference when they see it.",
    related: [
      { label: "Maintenance checklists", href: "/resources/maintenance-checklists" },
      { label: "Seasonal preparation", href: "/resources/seasonal-prep" },
      { label: "Case studies", href: "/resources/case-studies" },
      { label: "Compliance and certifications", href: "/resources/compliance-and-certifications" },
    ],
    faq: [
      {
        q: "How often do you publish?",
        a: "New posts on a recurring monthly schedule. Subscribe to our list to get notified when new posts go live.",
      },
      {
        q: "Can I submit a topic suggestion?",
        a: "Yes. Email service at bridgepointmaintenance dot com with topic ideas. We pull from the dispatch board for content, so practical questions get answered.",
      },
      {
        q: "Are these posts written by your team?",
        a: "Yes. Posts come from our operations leadership, dispatch team, and field technicians.",
      },
      {
        q: "Can I republish a post?",
        a: "With attribution and a link back to the original. Email us first.",
      },
    ],
    overviewTitle: "Field notes from real dispatch.",
    faqTitle: "About the blog.",
    faqDescription:
      "Common questions on how the blog is written, who writes it, and how to use it inside your operation.",
    ctaTitle: "Want Bridgepoint on your portfolio?",
    ctaBody:
      "Articles are useful. A single dispatch line for every trade is more useful. Call to scope service or request a quote.",
    metaTitle: "Bridgepoint Maintenance Blog",
    metaDescription:
      "Maintenance, dispatch, and property operations insights from the Bridgepoint team. Field notes from real dispatch.",
  },
  {
    slug: "maintenance-checklists",
    name: "Maintenance Checklists",
    shortName: "Checklists",
    eyebrow: "Resources",
    tagline: "Property maintenance checklists for landlords, property managers, and commercial owners.",
    intro:
      "Bridgepoint Maintenance publishes practical maintenance checklists you can use to run your own property reviews. Annual building reviews, seasonal checklists, move in and move out inspections, and capital planning templates. Built from the dispatch board so the items reflect what actually breaks on real buildings. Print them, use them, or hand them to your property staff.",
    scope: [
      {
        title: "Annual building review checklist",
        body: "Twelve month property review covering envelope, mechanical, electrical, plumbing, and common area items.",
      },
      {
        title: "Seasonal checklists",
        body: "Spring, summer, fall, and winter prep checklists for residential, commercial, and multi family properties.",
      },
      {
        title: "Move in and move out inspections",
        body: "Tenant move in and move out inspection templates for landlords and property managers.",
      },
      {
        title: "Capital planning templates",
        body: "Templates for tracking equipment age, expected end of life, and recommended replacement timing across major systems.",
      },
      {
        title: "Vendor evaluation checklist",
        body: "Criteria to evaluate trade vendors. License verification, insurance, documentation standards, and response time benchmarks.",
      },
      {
        title: "Emergency preparedness",
        body: "Building emergency prep checklists. Storm prep, freeze prep, and heat advisory prep for portfolio operators.",
      },
    ],
    whyUs:
      "Checklists are how good operations stay good. The buildings that lose money are usually the ones where no one runs a recurring review. We publish the same templates our internal team uses on property walks. Free to use. No gate.",
    related: [
      { label: "Seasonal preparation", href: "/resources/seasonal-prep" },
      { label: "Compliance and certifications", href: "/resources/compliance-and-certifications" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Building upkeep", href: "/services/building-upkeep" },
    ],
    faq: [
      {
        q: "Are these checklists free?",
        a: "Yes. Free to download and use. No gate.",
      },
      {
        q: "Can I customize them for my portfolio?",
        a: "Yes. The templates are designed to customize. Add or remove items as your asset class requires.",
      },
      {
        q: "Do you have checklists for commercial buildings?",
        a: "Yes. Commercial, residential, multi family, and mixed use checklists are all published.",
      },
      {
        q: "Can my property staff use these?",
        a: "Yes. Print them, save them, or hand them to your team. They are designed to be operational documents.",
      },
    ],
    overviewTitle: "Checklists straight from the dispatch floor.",
    faqTitle: "About the checklists.",
    faqDescription:
      "Common questions on which checklists are available, how they are sourced, and how to use them on real properties.",
    ctaTitle: "Need a Bridgepoint truck on a property?",
    ctaBody:
      "Checklists help you plan. We dispatch licensed trades when you need the work done. Call to scope service.",
    metaTitle: "Property Maintenance Checklists",
    metaDescription:
      "Practical property maintenance checklists for landlords, property managers, and commercial owners. Built from real dispatch data.",
  },
  {
    slug: "seasonal-prep",
    name: "Seasonal Preparation",
    shortName: "Seasonal Prep",
    eyebrow: "Resources",
    tagline: "Spring, summer, fall, and winter property preparation guides for Canada and the US.",
    intro:
      "Bridgepoint Maintenance publishes seasonal property prep guides for Canada and the US. Winter freeze prep across Canadian and northern US markets. Summer heat advisory prep across southern and warmer climates. Fall transition checklists. Spring exterior reviews. Built from what we see on the dispatch board as the seasons change.",
    scope: [
      {
        title: "Winter freeze prep",
        body: "Pipe insulation, exterior shutoff drain down, furnace inspection, weather seal, and roof prep for winter conditions.",
      },
      {
        title: "Summer heat prep",
        body: "AC system service, refrigerant check, attic ventilation review, and heat advisory readiness.",
      },
      {
        title: "Fall transition",
        body: "Gutter clearing, heating system inspection, exterior caulk review, and storm prep for the fall transition.",
      },
      {
        title: "Spring property review",
        body: "Exterior envelope review, foundation and drainage check, HVAC system transition, and irrigation startup.",
      },
      {
        title: "Storm season preparation",
        body: "Hurricane, tornado, ice storm, and severe weather preparation guides for properties in affected regions.",
      },
      {
        title: "Vacation property prep",
        body: "Property opening and closing checklists for vacation and seasonal properties. Winterization and reopening.",
      },
    ],
    whyUs:
      "Most property losses are preventable if the building is prepped for the season. Burst pipes from freezing. AC failures from skipped service. Roof leaks from clogged gutters. Our seasonal guides exist so owners and managers can run the prep before the season hits. Cheaper than dispatch.",
    related: [
      { label: "Maintenance checklists", href: "/resources/maintenance-checklists" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Emergency dispatch", href: "/emergency" },
      { label: "Burst pipe response", href: "/emergency/burst-pipes" },
    ],
    faq: [
      {
        q: "When should I do winter freeze prep?",
        a: "Late October through November in most northern markets. Before the first overnight freeze.",
      },
      {
        q: "Do you do seasonal prep service?",
        a: "Yes. We run seasonal prep on contract for property managers, commercial owners, and homeowners.",
      },
      {
        q: "What about vacation properties I am not at?",
        a: "We coordinate vacation property opening and closing service for owners who are not local.",
      },
      {
        q: "How much does seasonal prep typically cost?",
        a: "Depends on the property size and the scope. Quoted on the walk before any work begins.",
      },
    ],
    overviewTitle: "Seasonal prep guides for property operators.",
    faqTitle: "About seasonal prep.",
    faqDescription:
      "Common questions on spring, summer, fall, and winter property prep timing and scope.",
    ctaTitle: "Book seasonal prep with Bridgepoint.",
    ctaBody:
      "Spring exterior, summer cooling, fall heating, winter freeze protection. Call to schedule the visit before the season turns.",
    metaTitle: "Seasonal Property Prep Guides",
    metaDescription:
      "Spring, summer, fall, and winter property preparation guides for Canada and the US. Burst pipe prevention, AC readiness, storm prep.",
  },
  {
    slug: "compliance-and-certifications",
    name: "Compliance and Certifications",
    shortName: "Compliance",
    eyebrow: "Resources",
    tagline: "Trade licensing, building compliance, and certification documentation for property owners.",
    intro:
      "Bridgepoint Maintenance publishes reference material on trade licensing, building compliance, and the certification standards property owners need to understand. Plumbing, electrical, gas, and life safety all run on different licensing frameworks across Canada and the US. We document the framework so owners know what to ask for from any vendor, including us.",
    scope: [
      {
        title: "Trade licensing overview",
        body: "Plumbing, electrical, gas, HVAC, and other trade licensing frameworks across Canada and the US.",
      },
      {
        title: "Canadian compliance reference",
        body: "ESA, TSSA, plumbing, building code, AODA, and other Canadian regulatory frameworks property owners interact with.",
      },
      {
        title: "Life safety standards",
        body: "Fire alarm, sprinkler, emergency lighting, and life safety compliance reference for commercial and multi family.",
      },
      {
        title: "Insurance documentation requirements",
        body: "What insurance carriers expect to see in work order documentation, photo logs, and license verification.",
      },
      {
        title: "Audit ready paperwork",
        body: "What audit ready documentation looks like. Photo log standards, license number requirements, and closeout note formats.",
      },
      {
        title: "Vendor due diligence",
        body: "How to verify a trade vendor. License lookup, insurance verification, and reference checks.",
      },
    ],
    whyUs:
      "Compliance and certifications are where bad vendors cut corners. The work looks fine until something goes wrong. Then the file is empty, the license is unverified, and the insurance claim falls apart. Our reference material exists so property owners can demand the right documentation from any vendor and recognize when they are getting it.",
    related: [
      { label: "Maintenance checklists", href: "/resources/maintenance-checklists" },
      { label: "Preventative maintenance", href: "/services/preventative-maintenance" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
      { label: "Institutional asset holders", href: "/industries/institutional-asset-holders" },
    ],
    faq: [
      {
        q: "How do I verify a trade vendor's license?",
        a: "Every Canadian province and US state publishes a license lookup tool. Search the trade and the vendor name or license number.",
      },
      {
        q: "What should be in a properly documented work order?",
        a: "Photo log, license number, scope of work, parts used, and a closeout note. That is the audit ready standard.",
      },
      {
        q: "Do you provide license numbers on your work orders?",
        a: "Yes. License numbers print on every Bridgepoint work order. Available before the truck rolls if requested.",
      },
      {
        q: "What about insurance verification?",
        a: "We provide certificate of insurance to commercial accounts and property management accounts on request.",
      },
    ],
    overviewTitle: "Trade compliance and certifications reference.",
    faqTitle: "About compliance.",
    faqDescription:
      "Common questions on trade licensing, insurance, permits, and audit documentation across US and Canadian jurisdictions.",
    ctaTitle: "Need documentation on a Bridgepoint job?",
    ctaBody:
      "Every work order ships with the trade license, the scope, and the photos. Call for documentation requests or to scope new work.",
    metaTitle: "Compliance and Certifications Reference",
    metaDescription:
      "Trade licensing, building compliance, and certification documentation for property owners. ESA, TSSA, life safety, audit ready.",
  },
  {
    slug: "case-studies",
    name: "Case Studies",
    shortName: "Case Studies",
    eyebrow: "Resources",
    tagline: "Field examples from the Bridgepoint dispatch board. Real buildings, real dispatch, real outcomes.",
    intro:
      "Bridgepoint Maintenance publishes anonymized case studies from the dispatch board. Real buildings, real dispatch decisions, real outcomes. Property manager case studies. Commercial owner case studies. Multi family operator case studies. Each study covers what we walked into, what we recommended, what we did, and what changed for the client.",
    scope: [
      {
        title: "Property management portfolio case study",
        body: "Multi property portfolio onboarding. Vendor consolidation from twelve trade vendors down to one dispatch line.",
      },
      {
        title: "Multi family building case study",
        body: "Building wide PM program rollout. Emergency call volume reduction and tenant satisfaction outcomes.",
      },
      {
        title: "Commercial property case study",
        body: "Commercial property facility maintenance contract. Documentation rigor improvements and audit outcomes.",
      },
      {
        title: "Emergency response case study",
        body: "Major emergency event response. Multi trade coordination during a building wide system failure.",
      },
      {
        title: "Capital project case study",
        body: "Capital project sequencing for a commercial owner. Project schedule compression and documentation outcomes.",
      },
      {
        title: "Unit turnover program case study",
        body: "Multi family turnover program rollout. Days on market reduction and consistency improvements.",
      },
    ],
    whyUs:
      "Case studies are how operations get evaluated. Most maintenance vendor case studies are testimonials. Ours are field notes. Anonymized, but specific. What we walked into. What we did. What the data shows after. The numbers are real.",
    related: [
      { label: "Property manager program", href: "/industries/property-managers" },
      { label: "Multi family buildings", href: "/industries/multi-family-buildings" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
      { label: "Facility maintenance", href: "/services/facility-maintenance" },
    ],
    faq: [
      {
        q: "Why are these anonymized?",
        a: "Client confidentiality. We share the operational specifics without naming the property or the owner.",
      },
      {
        q: "Can I see a case study for my asset class?",
        a: "Yes. We publish across property management, multi family, commercial, and institutional asset classes.",
      },
      {
        q: "Can I provide a testimonial?",
        a: "Yes. Email service at bridgepointmaintenance dot com if you want to share an experience.",
      },
      {
        q: "How recent are these case studies?",
        a: "We update the case study library on a recurring basis as new projects close out.",
      },
    ],
    overviewTitle: "Bridgepoint case studies.",
    faqTitle: "About the case studies.",
    faqDescription:
      "Common questions on case study sourcing, anonymization, and how to use them in vendor selection.",
    ctaTitle: "Want a case study built around your portfolio?",
    ctaBody:
      "Bridgepoint runs a single dispatch line across every trade. Call to scope a pilot building or a portfolio account.",
    metaTitle: "Bridgepoint Maintenance Case Studies",
    metaDescription:
      "Field examples from the Bridgepoint dispatch board. Property management, multi family, commercial, and institutional case studies.",
  },
];

export const getResourcePage = (slug: string) =>
  RESOURCE_PAGES.find((p) => p.slug === slug);
