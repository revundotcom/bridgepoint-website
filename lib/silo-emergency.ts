// EMERGENCY SILO — 12 emergency pages
import type { SiloPage } from "./silo-services";

export const EMERGENCY_PAGES: SiloPage[] = [
  {
    slug: "plumbing",
    name: "Emergency Plumbing",
    shortName: "Emergency Plumbing",
    eyebrow: "24/7 emergency",
    tagline: "Twenty four hour plumbing dispatch. Active leaks, ruptured supply lines, and overflow events.",
    intro:
      "When water is moving in the wrong direction, every minute counts. Bridgepoint Maintenance runs a twenty four hour emergency plumbing line that routes to licensed plumbing trades across Canada and the US. We dispatch on receipt of the call, confirm an ETA, and roll a truck with the parts most likely to close out the issue same visit. Call 1-855-910-9090 the moment the leak starts.",
    scope: [
      {
        title: "Active leak response",
        body: "Visible water from a pipe, fixture, or appliance line. Shutoff guidance over the phone while the truck rolls.",
      },
      {
        title: "Ruptured supply line",
        body: "Burst supply line under a sink, behind a wall, or in the basement. Same trade response, same visit close out when the part is in stock.",
      },
      {
        title: "Overflow events",
        body: "Toilet overflow, sink overflow, tub overflow, and appliance overflow. Mitigation guidance and crew dispatch.",
      },
      {
        title: "Water heater leaks",
        body: "Tank leaks from corrosion, valve failure, or relief valve discharge. Same day swap on common tank sizes when needed.",
      },
      {
        title: "No water events",
        body: "Whole building no water condition, frozen line response, and supply restoration after a municipal shutoff.",
      },
      {
        title: "Commercial and multifamily emergencies",
        body: "Building wide plumbing emergencies for property managers and commercial owners. Priority routing on account.",
      },
    ],
    whyUs:
      "Emergency plumbing is a clock against damage. Our dispatch model is built around that clock. The dispatcher coaches the caller through the shutoff if needed, the truck rolls with the right part, and the work order documents the loss so the insurance file has the evidence it needs. Faster, cleaner, and the property loses less.",
    related: [
      { label: "Plumbing services overview", href: "/services/plumbing" },
      { label: "Burst pipe response", href: "/emergency/burst-pipes" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "Sewer backup response", href: "/emergency/sewer-backups" },
    ],
    faq: [
      {
        q: "How fast can a plumber get to me?",
        a: "Response time varies by location and traffic. Call 1-855-910-9090 for an immediate ETA based on your address.",
      },
      {
        q: "What should I do while I wait?",
        a: "Shut the main water supply if you can find it. If not, shut the closest valve to the leak. The dispatcher will coach you through it.",
      },
      {
        q: "Do emergency calls cost more than scheduled work?",
        a: "After hours dispatch fees may apply. We quote the dispatch fee before sending the truck so there are no surprises.",
      },
      {
        q: "Can my property manager set up priority dispatch?",
        a: "Yes. Account based emergency dispatch with priority routing and consolidated billing for property management companies.",
      },
    ],
    metaTitle: "24/7 Emergency Plumbing Dispatch",
    metaDescription:
      "Twenty four hour emergency plumbing across Canada and the US. Active leaks, burst pipes, overflows. Call 1-855-910-9090 now.",
    overviewTitle: "How the emergency plumbing line works.",
    faqTitle: "Emergency plumbing, answered.",
    faqDescription:
      "Common questions about twenty four hour plumbing dispatch from property managers, commercial owners, and homeowners.",
    ctaTitle: "Plumbing emergency in progress?",
    ctaBody:
      "Call dispatch now. The truck rolls on the call and the dispatcher coaches you through shutoff while it arrives.",
  },
  {
    slug: "electrical",
    name: "Emergency Electrical",
    shortName: "Emergency Electrical",
    eyebrow: "24/7 emergency",
    tagline: "Twenty four hour electrical emergency dispatch. Power loss, panel failure, exposed wiring, and life safety.",
    intro:
      "Bridgepoint Maintenance runs twenty four hour emergency electrical dispatch across Canada and the US. Licensed electricians on call for whole property power loss, panel failure, smoke or burning smell from a circuit, exposed wiring, and any life safety condition that needs immediate attention. Call 1-855-910-9090 and stay on the line for safety guidance while the truck rolls.",
    scope: [
      {
        title: "Whole property power loss",
        body: "Outage at the main panel or service entrance. Diagnose utility versus property side and restore power as quickly as the condition allows.",
      },
      {
        title: "Panel failure",
        body: "Burning smell, melted breaker, panel buzz, or active arc. Immediate dispatch and same visit replacement where the condition allows.",
      },
      {
        title: "Exposed or sparking wiring",
        body: "Damaged wiring from rodents, water, or impact. Isolation, repair, and code restoration.",
      },
      {
        title: "Smoke or burning smell",
        body: "Electrical smell from a wall, outlet, or device. Treat as urgent. Dispatcher will coach on safe isolation while the truck rolls.",
      },
      {
        title: "Storm damage response",
        body: "Tree contact with service lines, water in panels after a flood, and damage from lightning or wind events.",
      },
      {
        title: "Commercial and multifamily emergencies",
        body: "Whole building outages, dedicated equipment failures, and life safety system response for property managers and commercial owners.",
      },
    ],
    whyUs:
      "Electrical emergencies are where untrained dispatch causes more damage than the original event. Our dispatcher is trained to walk the caller through safety first, isolation second, and crew arrival third. The licensed electrician finishes the work with documentation that survives an insurance review.",
    related: [
      { label: "Electrical services overview", href: "/services/electrical" },
      { label: "No power dispatch", href: "/emergency/no-power" },
      { label: "Storm damage response", href: "/emergency/storm-damage" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "What counts as an electrical emergency?",
        a: "Power loss, exposed wiring, smoke or burning smell, sparking devices, panel failure, and any condition that risks fire or shock.",
      },
      {
        q: "Should I touch the panel?",
        a: "No. Stay clear, call dispatch, and follow the safety guidance the dispatcher gives you over the phone.",
      },
      {
        q: "Are emergency electricians licensed?",
        a: "Yes. Bridgepoint dispatches licensed electricians on every emergency call. License numbers print on the work order.",
      },
      {
        q: "Do you coordinate with the utility after a storm?",
        a: "Yes. We coordinate with the utility on service drop damage and other utility side conditions while we restore the property side.",
      },
    ],
    metaTitle: "24/7 Emergency Electrical Dispatch",
    metaDescription:
      "Twenty four hour emergency electrical service across Canada and the US. Power loss, panel failure, exposed wiring. Call 1-855-910-9090.",
    overviewTitle: "How the emergency electrical line works.",
    faqTitle: "Emergency electrical, answered.",
    faqDescription:
      "Common questions about twenty four hour electrical emergency dispatch from property managers, commercial owners, and homeowners.",
    ctaTitle: "Electrical emergency right now?",
    ctaBody:
      "Call dispatch and stay on the line. The dispatcher walks you through safe isolation while the licensed electrician rolls.",
  },
  {
    slug: "hvac",
    name: "Emergency HVAC",
    shortName: "Emergency HVAC",
    eyebrow: "24/7 emergency",
    tagline: "Twenty four hour HVAC emergency dispatch. No heat, no cooling, gas smell, and system failure.",
    intro:
      "Bridgepoint Maintenance runs twenty four hour HVAC emergency dispatch across Canada and the US. Furnaces fail at midnight in February. Air conditioning fails on the hottest day of August. We hold a stocked truck and a TSSA licensed gas tech on call so the call closes the same shift it lands. Call 1-855-910-9090 for HVAC emergencies.",
    scope: [
      {
        title: "No heat response",
        body: "Furnace, boiler, or heat pump no heat condition. Diagnose, repair, or replace within the same dispatch when conditions allow.",
      },
      {
        title: "No cooling response",
        body: "Central AC, ductless, or RTU no cooling condition. Refrigerant work performed by certified techs.",
      },
      {
        title: "Gas smell",
        body: "Suspected gas leak. Call dispatch, call the utility, and leave the building. Our TSSA licensed tech responds after the area is clear.",
      },
      {
        title: "Equipment failure",
        body: "Boiler shutdown, RTU compressor failure, blower motor seizure, and any system level failure requiring same shift response.",
      },
      {
        title: "Frozen evaporator or coil",
        body: "AC system iced over from low refrigerant or airflow restriction. Diagnose root cause and restore operation.",
      },
      {
        title: "Commercial and multifamily emergencies",
        body: "Building wide heating or cooling loss, RTU failures, and equipment swaps coordinated with property management software.",
      },
    ],
    whyUs:
      "HVAC emergencies hit when the building is most occupied. Tenants in winter need heat now. Tenants in summer need cooling now. Our dispatch model is built to compress the gap between call and equipment running. Stocked trucks, gas licensed techs, and a documentation trail that closes the work order on the same shift.",
    related: [
      { label: "HVAC services overview", href: "/services/hvac" },
      { label: "No heat winter response", href: "/emergency/no-heat" },
      { label: "No cooling summer response", href: "/emergency/no-cooling" },
      { label: "Boiler failure response", href: "/emergency/boiler-failure" },
    ],
    faq: [
      {
        q: "How fast can an HVAC tech get on site?",
        a: "Response time varies by location and traffic. Call 1-855-910-9090 for an ETA based on your address and the current dispatch board.",
      },
      {
        q: "Do you carry parts on the truck?",
        a: "Yes. Common ignition components, motors, boards, and gas valves ride on the truck for same shift close outs.",
      },
      {
        q: "What about a no heat call in a rental property?",
        a: "Priority dispatch for property manager accounts. We document the call in line with landlord obligations on heat in winter.",
      },
      {
        q: "Are your gas techs licensed?",
        a: "Yes. Gas work performed by state and provincial licensed technicians (TSSA in Ontario, state body equivalents in the US). License numbers available on the work order.",
      },
    ],
    metaTitle: "24/7 Emergency HVAC Dispatch",
    metaDescription:
      "Twenty four hour HVAC emergency service across Canada and the US. No heat, no cooling, gas smell, system failure. Call 1-855-910-9090.",
    overviewTitle: "How the emergency HVAC line works.",
    faqTitle: "Emergency HVAC, answered.",
    faqDescription:
      "Common questions about twenty four hour heating and cooling dispatch from property managers, commercial owners, and homeowners.",
    ctaTitle: "Heat or cooling out right now?",
    ctaBody:
      "Call dispatch. Licensed gas techs on call across Canada and the US with stocked trucks for same shift close out.",
  },
  {
    slug: "water-damage",
    name: "Water Damage Response",
    shortName: "Water Damage",
    eyebrow: "24/7 emergency",
    tagline: "Active water mitigation and restoration response. Water out, dry down, and rebuild prep.",
    intro:
      "Bridgepoint Maintenance dispatches water mitigation crews twenty four hours across Canada and the US. When a pipe bursts, a roof leaks, or a basement floods, the next hour determines how much of the building is salvageable. Our crews follow IICRC aligned protocols for water extraction, structural drying, anti microbial treatment, and rebuild prep. Call 1-855-910-9090 the moment water is moving.",
    scope: [
      {
        title: "Emergency water extraction",
        body: "Industrial extractors for standing water, carpets, padding, and structural cavities. Stop the spread first.",
      },
      {
        title: "Structural drying",
        body: "Dehumidifiers, air movers, and moisture meter readings logged daily until the building hits target moisture content.",
      },
      {
        title: "Anti microbial treatment",
        body: "Treatment of affected surfaces and cavities to inhibit mould growth. Containment built where needed.",
      },
      {
        title: "Demolition and removal",
        body: "Drywall, insulation, flooring, and cabinetry removal where the materials cannot be salvaged. Photographed and documented.",
      },
      {
        title: "Insurance documentation",
        body: "Moisture readings, photo log, scope of loss, and equipment hours documented for any major insurer. Coordination with adjusters when authorized.",
      },
      {
        title: "Rebuild handoff",
        body: "Our drywall, paint, flooring, and finish trades handle the rebuild scope once dry down completes. One vendor end to end.",
      },
    ],
    whyUs:
      "Water damage is the loss that gets worse every hour. Mould risk starts at twenty four hours under the right conditions. Our crews respond fast, document the loss properly, and run the dry down to target moisture so the insurance file holds up and the rebuild starts on solid ground. One vendor from extraction to repaint.",
    related: [
      { label: "Burst pipe response", href: "/emergency/burst-pipes" },
      { label: "Sewer backup response", href: "/emergency/sewer-backups" },
      { label: "Plumbing services", href: "/services/plumbing" },
      { label: "Drywall and painting", href: "/services/drywall-and-painting" },
    ],
    faq: [
      {
        q: "How fast can the mitigation crew arrive?",
        a: "Response time varies by location and traffic. Call 1-855-910-9090 the moment water is moving. The first hour matters most.",
      },
      {
        q: "Do you handle the insurance claim paperwork?",
        a: "We document moisture readings, photos, and scope of loss to a standard that supports any major insurer. We coordinate with adjusters when authorized.",
      },
      {
        q: "What about sewage water or contaminated water?",
        a: "Category 2 and category 3 contaminated water response handled with appropriate PPE, containment, and disposal protocols.",
      },
      {
        q: "Will mould grow if dry down is delayed?",
        a: "Yes. Mould risk starts at roughly twenty four hours under the right conditions. Time is the variable that matters most.",
      },
    ],
    metaTitle: "Water Damage Response and Restoration",
    metaDescription:
      "Water damage mitigation, structural drying, and rebuild prep across Canada and the US. Twenty four hour response. Call 1-855-910-9090.",
    overviewTitle: "How water damage response works.",
    faqTitle: "Water damage, answered.",
    faqDescription:
      "Common questions about water extraction, structural drying, and insurance coordination from property managers, commercial owners, and homeowners.",
    ctaTitle: "Water moving through the building?",
    ctaBody:
      "Call dispatch now. IICRC aligned mitigation crews and a documented dry down so the insurance file holds up.",
  },
  {
    slug: "burst-pipes",
    name: "Burst Pipe Response",
    shortName: "Burst Pipes",
    eyebrow: "24/7 emergency",
    tagline: "Burst supply line, frozen pipe, and ruptured plumbing response. Stop the water, fix the pipe.",
    intro:
      "Bridgepoint Maintenance dispatches burst pipe response twenty four hours across Canada and the US. Frozen lines in January. Aging copper that finally fails. Supply line that lets go behind a wall. Whatever the cause, the move is the same. Stop the water. Repair the pipe. Document the loss for insurance. Call 1-855-910-9090 immediately when a pipe bursts.",
    scope: [
      {
        title: "Shutoff guidance",
        body: "Dispatcher walks the caller through the closest shutoff while the truck rolls so the loss does not compound.",
      },
      {
        title: "Pipe location and repair",
        body: "Locate the burst, isolate the affected section, and complete the repair with the right material for the system.",
      },
      {
        title: "Frozen pipe thaw and repair",
        body: "Controlled thaw to reduce additional pipe failure, repair the burst section, and recommendations on insulation and prevention.",
      },
      {
        title: "Wall and ceiling access",
        body: "Drywall opening where the burst is hidden in a wall or ceiling. Patch and paint follow up scoped at the same time.",
      },
      {
        title: "Loss documentation",
        body: "Photo log of the burst, the affected materials, and the repair so the insurance file has the evidence it needs.",
      },
      {
        title: "Mitigation handoff",
        body: "Direct handoff to our water mitigation crew if extraction and dry down are required.",
      },
    ],
    whyUs:
      "A burst pipe is the highest cost emergency a property faces because the loss compounds every hour the water keeps moving. Our dispatch model compresses that timeline. Phone coaching on shutoff. Truck rolling with repair material. Mitigation team on the way if the loss reached the floor. One vendor across the full event.",
    related: [
      { label: "Emergency plumbing", href: "/emergency/plumbing" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "Plumbing services", href: "/services/plumbing" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "What should I do before the truck arrives?",
        a: "Shut the closest valve you can find. If you cannot find a closer valve, shut the main supply. Move valuables clear of the water.",
      },
      {
        q: "How long does a burst pipe repair take?",
        a: "Most accessible burst repairs close in one to three hours on site. Pipes inside walls add demo and patch time.",
      },
      {
        q: "Will my insurance cover this?",
        a: "Most homeowner and commercial policies cover sudden burst events. We document the loss to a standard that supports an insurance claim.",
      },
      {
        q: "Can you prevent another burst this winter?",
        a: "Yes. We recommend insulation, heat trace, or system modifications based on what caused the original burst.",
      },
    ],
    metaTitle: "Burst Pipe Emergency Response",
    metaDescription:
      "Burst pipe emergency response across Canada and the US. Frozen lines, ruptured supply, and water damage coordination. Call 1-855-910-9090.",
    overviewTitle: "How burst pipe response works.",
    faqTitle: "Burst pipes, answered.",
    faqDescription:
      "Common questions about burst supply lines, frozen pipe failures, and ruptured plumbing from property managers, commercial owners, and homeowners.",
    ctaTitle: "Burst pipe right now?",
    ctaBody:
      "Call dispatch. The dispatcher coaches you through shutoff while the truck rolls with repair material.",
  },
  {
    slug: "no-heat",
    name: "No Heat Response",
    shortName: "No Heat",
    eyebrow: "24/7 emergency",
    tagline: "Winter no heat dispatch. Furnace, boiler, and heat pump emergency response.",
    intro:
      "Bridgepoint Maintenance runs winter no heat dispatch twenty four hours across Canada and the US. Furnaces fail at the worst possible moment and the building loses temperature fast. We hold TSSA licensed gas techs on call with the most common ignition, board, and motor parts ready to roll. Call 1-855-910-9090 the moment the heat goes out in winter.",
    scope: [
      {
        title: "Furnace no heat diagnosis",
        body: "Ignition, board, sensor, motor, and gas valve diagnostics. Most no heat conditions resolve within the same dispatch.",
      },
      {
        title: "Boiler no heat diagnosis",
        body: "Pilot or ignition failure, pump failure, zone valve failure, expansion tank issues, and water side loss diagnostics.",
      },
      {
        title: "Heat pump no heat diagnosis",
        body: "Refrigerant, reversing valve, and defrost control diagnostics. Cold climate heat pump backup heat verification.",
      },
      {
        title: "Equipment replacement when needed",
        body: "Same shift replacement on common furnace sizes when the equipment is unrepairable and the building cannot wait.",
      },
      {
        title: "Tenant communication",
        body: "Documentation suitable for property managers reporting on landlord heat obligations to tenants and municipal requirements.",
      },
      {
        title: "Temporary heat coordination",
        body: "Coordination on temporary heating units when the main system cannot be restored on the same shift.",
      },
    ],
    whyUs:
      "No heat in winter is the call where dispatch speed shows. Property managers have heat obligations to tenants. Owners watch the property temperature drop and the frozen pipe risk go up. Our dispatch model is tuned to compress the gap between call and restored heat. Trucks stocked. Techs on call. Documentation tight.",
    related: [
      { label: "Emergency HVAC", href: "/emergency/hvac" },
      { label: "Boiler failure response", href: "/emergency/boiler-failure" },
      { label: "HVAC services overview", href: "/services/hvac" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "How fast can someone get to my no heat call?",
        a: "Response time varies by location and dispatch volume during cold snaps. Call 1-855-910-9090 for an immediate ETA.",
      },
      {
        q: "What should I do while I wait?",
        a: "Keep the building above freezing if possible. Open cabinet doors near plumbing to prevent freezing on supply lines.",
      },
      {
        q: "Do you bring replacement equipment if my furnace cannot be repaired?",
        a: "We carry common ignition and motor parts. Full equipment replacements are scheduled same or next day depending on the unit size and availability.",
      },
      {
        q: "How is this billed during after hours?",
        a: "After hours dispatch fee plus the repair scope. Quoted before the truck rolls.",
      },
    ],
    metaTitle: "No Heat Emergency Dispatch",
    metaDescription:
      "Winter no heat emergency dispatch for furnaces, boilers, and heat pumps across Canada and the US. Call 1-855-910-9090.",
    overviewTitle: "How winter no heat dispatch works.",
    faqTitle: "Winter no heat, answered.",
    faqDescription:
      "Common questions about furnace, boiler, and heat pump no heat conditions from property managers, commercial owners, and homeowners.",
    ctaTitle: "Lost heat in winter?",
    ctaBody:
      "Call dispatch now. Licensed gas techs on call with ignition, board, and motor parts ready to restore heat the same shift.",
  },
  {
    slug: "no-cooling",
    name: "No Cooling Response",
    shortName: "No Cooling",
    eyebrow: "24/7 emergency",
    tagline: "Summer no cooling dispatch. AC, heat pump, and commercial RTU emergency response.",
    intro:
      "Bridgepoint Maintenance runs no cooling emergency dispatch twenty four hours across Canada and the US. Air conditioning fails in heat waves when the building is most occupied. Commercial RTUs fail and the office shuts down. Our dispatch model holds certified techs on call with refrigerant, motors, and electrical components ready to roll. Call 1-855-910-9090 the moment the cooling goes out.",
    scope: [
      {
        title: "Central AC no cool diagnosis",
        body: "Compressor, contactor, capacitor, refrigerant, and airflow diagnostics. Most residential no cool conditions resolve within the same dispatch.",
      },
      {
        title: "Heat pump no cool diagnosis",
        body: "Refrigerant, reversing valve, defrost control, and air handler diagnostics. Documentation across both heating and cooling modes.",
      },
      {
        title: "Commercial RTU no cool",
        body: "Rooftop unit diagnostics, compressor work, refrigerant top off, and same shift component replacement where stock allows.",
      },
      {
        title: "Frozen evaporator response",
        body: "Iced over coil from low refrigerant or airflow restriction. Thaw, diagnose root cause, and restore operation.",
      },
      {
        title: "Vulnerable occupant priority",
        body: "Priority routing on commercial properties with vulnerable occupants and on rental properties during heat advisories.",
      },
      {
        title: "Temporary cooling coordination",
        body: "Coordination on portable cooling units when the main system cannot be restored on the same shift.",
      },
    ],
    whyUs:
      "Summer no cooling calls are deceptively dangerous. Vulnerable occupants face real risk in heat advisories. Our dispatch model holds certified refrigerant techs on call and tracks heat advisories so priority routing kicks in when the temperature outside crosses the threshold. Call now and we will tell you exactly when the truck arrives.",
    related: [
      { label: "Emergency HVAC", href: "/emergency/hvac" },
      { label: "HVAC services overview", href: "/services/hvac" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "What can I do while I wait for the tech?",
        a: "Close blinds and curtains. Run fans. Move vulnerable occupants to the coolest room. Open windows only if outside is cooler than inside.",
      },
      {
        q: "Do you have refrigerant on the truck?",
        a: "Yes. Common refrigerants ride on the truck. Certified refrigerant work performed by certified techs under the appropriate regulatory framework.",
      },
      {
        q: "How fast is dispatch during a heat wave?",
        a: "Heat advisory periods trigger priority routing. Call 1-855-910-9090 for an immediate ETA.",
      },
      {
        q: "Can you service commercial RTUs the same day?",
        a: "Yes for common unit sizes. Larger RTUs may require parts ordering. We confirm scope and timeline on the first visit.",
      },
    ],
    metaTitle: "No Cooling Emergency Dispatch",
    metaDescription:
      "Summer no cooling emergency dispatch for AC, heat pumps, and commercial RTUs across Canada and the US. Call 1-855-910-9090.",
    overviewTitle: "How summer no cooling dispatch works.",
    faqTitle: "Summer no cooling, answered.",
    faqDescription:
      "Common questions about AC, heat pump, and commercial RTU no cooling conditions from property managers, commercial owners, and homeowners.",
    ctaTitle: "AC down in a heat wave?",
    ctaBody:
      "Call dispatch now. Certified refrigerant techs on call with priority routing during heat advisories.",
  },
  {
    slug: "no-power",
    name: "No Power Response",
    shortName: "No Power",
    eyebrow: "24/7 emergency",
    tagline: "Whole property no power dispatch. Service entrance, panel, and main circuit emergency response.",
    intro:
      "Bridgepoint Maintenance runs no power emergency dispatch twenty four hours across Canada and the US. When the entire property goes dark, the issue could be utility side or property side. Our dispatcher helps you isolate the source while the truck rolls. Call 1-855-910-9090 the moment the power goes out and stays out.",
    scope: [
      {
        title: "Service entrance diagnostics",
        body: "Service mast, meter base, and main disconnect diagnostics to isolate utility versus property side conditions.",
      },
      {
        title: "Main panel failure",
        body: "Burned main breaker, damaged bus bar, panel buzz or arc, and immediate replacement when conditions allow.",
      },
      {
        title: "Utility coordination",
        body: "Coordination with the utility on service drop damage and other utility side conditions. Restoration of property side after utility restores service.",
      },
      {
        title: "Storm damage response",
        body: "Tree contact with service lines, water in panels after flood events, and wind damage to overhead service.",
      },
      {
        title: "Generator and transfer switch",
        body: "Existing standby generator activation, transfer switch troubleshooting, and emergency portable generator coordination.",
      },
      {
        title: "Commercial building outages",
        body: "Whole building outages, retail and office power loss, and life safety system response.",
      },
    ],
    whyUs:
      "Power loss is the highest stakes electrical call. Wrong move risks fire or shock. Right move restores service safely. Our dispatcher is trained to walk the caller through isolation safely while the licensed electrician arrives. The work order documents the cause, the repair, and the path forward so the next storm does not cause the same issue.",
    related: [
      { label: "Emergency electrical", href: "/emergency/electrical" },
      { label: "Storm damage response", href: "/emergency/storm-damage" },
      { label: "Electrical services overview", href: "/services/electrical" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "How do I know if it is the utility or my building?",
        a: "Check whether neighbors have power. If they do, the issue is property side. If not, the issue is utility side. Call dispatch either way and we will help.",
      },
      {
        q: "Should I touch the main breaker?",
        a: "Only if it is safe to do so without standing in water and without a burning smell from the panel. When in doubt, stay clear and call dispatch.",
      },
      {
        q: "What about food in the freezer?",
        a: "A closed freezer holds for roughly forty eight hours. A closed fridge holds four to six hours. Decide what to save based on dispatch ETA.",
      },
      {
        q: "Do you do generator installs?",
        a: "Yes. Whole home and commercial standby generator installs and automatic transfer switch work. Scheduled or emergency response.",
      },
    ],
    metaTitle: "No Power Emergency Dispatch",
    metaDescription:
      "Whole property no power emergency dispatch across Canada and the US. Service entrance, panel, and main circuit response. Call 1-855-910-9090.",
    overviewTitle: "How whole property no power dispatch works.",
    faqTitle: "No power, answered.",
    faqDescription:
      "Common questions about service entrance, panel, and main circuit power loss from property managers, commercial owners, and homeowners.",
    ctaTitle: "Power out right now?",
    ctaBody:
      "Call dispatch. The dispatcher helps you isolate utility versus property side while the licensed electrician rolls.",
  },
  {
    slug: "roof-damage",
    name: "Roof Damage Response",
    shortName: "Roof Damage",
    eyebrow: "24/7 emergency",
    tagline: "Active roof leak and storm damage response. Temporary patch, dry in, and rebuild coordination.",
    intro:
      "Bridgepoint Maintenance dispatches roof damage response twenty four hours across Canada and the US. Active leaks from rain or snow. Storm damage from wind, hail, or fallen branches. Our crews stabilize the building first with a temporary dry in, then scope the permanent repair. Call 1-855-910-9090 the moment water shows up through a ceiling.",
    scope: [
      {
        title: "Temporary roof tarp",
        body: "Emergency tarp install over the affected section to stop water entry while the permanent repair gets scoped.",
      },
      {
        title: "Active leak mitigation",
        body: "Interior water damage mitigation in parallel with the roof work. Containment so the loss does not spread.",
      },
      {
        title: "Storm damage scoping",
        body: "Wind, hail, and impact damage scoping. Documentation for the insurance claim.",
      },
      {
        title: "Tree and debris removal",
        body: "Coordination on tree and debris removal from the roof and around the building.",
      },
      {
        title: "Insurance documentation",
        body: "Photo log, scope of loss, and a written summary suitable for any major insurer.",
      },
      {
        title: "Permanent repair handoff",
        body: "Permanent repair scoping with appropriate roofing trades. Coordination from dry in through final repair.",
      },
    ],
    whyUs:
      "Roof damage is a two stage event. The first stage is stopping the water and protecting the interior. The second stage is the permanent repair. Most owners run those stages with different vendors and lose time and money in the handoff. Bridgepoint coordinates both ends so the property is protected fast and rebuilt right.",
    related: [
      { label: "Storm damage response", href: "/emergency/storm-damage" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "Building upkeep program", href: "/services/building-upkeep" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "Can you do a permanent roof replacement?",
        a: "We coordinate with appropriate roofing trades for full replacements. Our scope is the emergency dry in, the loss documentation, and the project management of the rebuild.",
      },
      {
        q: "Will the tarp protect my building through a storm?",
        a: "A properly installed emergency tarp protects the building through normal weather. Severe weather may require additional protection.",
      },
      {
        q: "How do I document the damage for insurance?",
        a: "Our crew documents the damage with photos and a written scope of loss before the temporary repair goes on. The file supports an insurance claim.",
      },
      {
        q: "What if a tree is still on the roof?",
        a: "We coordinate with arborists and tree removal services to clear the tree before the roof work begins.",
      },
    ],
    metaTitle: "Roof Damage Emergency Response",
    metaDescription:
      "Active roof leak and storm damage response across Canada and the US. Temporary dry in and permanent repair coordination. Call 1-855-910-9090.",
    overviewTitle: "How roof damage response works.",
    faqTitle: "Roof damage, answered.",
    faqDescription:
      "Common questions about active leaks, storm damage, and temporary dry in from property managers, commercial owners, and homeowners.",
    ctaTitle: "Active roof leak right now?",
    ctaBody:
      "Call dispatch. Crews stabilize the building with a temporary dry in first, then scope the permanent repair.",
  },
  {
    slug: "storm-damage",
    name: "Storm Damage Response",
    shortName: "Storm Damage",
    eyebrow: "24/7 emergency",
    tagline: "Twenty four hour storm damage dispatch. Wind, water, ice, and impact damage response.",
    intro:
      "Bridgepoint Maintenance runs storm damage emergency dispatch twenty four hours across Canada and the US. Wind storms bring down trees and tear off roofing. Ice storms break service lines. Flooding pushes water into basements and panels. Our dispatch model triages across trades so the right crews show up in the right order. Call 1-855-910-9090 immediately after any storm damage event.",
    scope: [
      {
        title: "Multi trade triage",
        body: "Dispatcher triages the call across plumbing, electrical, HVAC, and structural so the right trades roll in the right order.",
      },
      {
        title: "Roof and exterior damage",
        body: "Emergency dry in, debris removal, and damage scoping for insurance.",
      },
      {
        title: "Water intrusion",
        body: "Mitigation, extraction, and structural drying for water that entered during the storm.",
      },
      {
        title: "Electrical safety",
        body: "Power loss diagnosis, water in panel response, and service entrance damage from fallen trees or wind.",
      },
      {
        title: "Tree contact and removal",
        body: "Coordination with arborists for tree removal and immediate stabilization of structures hit by falling debris.",
      },
      {
        title: "Insurance and recovery",
        body: "Coordinated documentation across trades for a single insurance claim. Single point of contact across the recovery.",
      },
    ],
    whyUs:
      "Storm damage events overwhelm single trade vendors. The roofer cannot help with the water in the panel. The electrician cannot help with the tree on the roof. Our dispatch model puts one team on top of the whole event with trade specialists rolling in coordinated order. The recovery moves faster and the insurance file is clean.",
    related: [
      { label: "Roof damage response", href: "/emergency/roof-damage" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "No power response", href: "/emergency/no-power" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "What do I do first after a storm?",
        a: "Make sure everyone is safe. Stay clear of downed wires and standing water. Then call dispatch and let us coordinate the response.",
      },
      {
        q: "Can I file one insurance claim across all the damage?",
        a: "Yes. We document the full scope across trades so one claim covers the event. Coordination with your adjuster runs through one project lead.",
      },
      {
        q: "How fast can a crew get to me after a major storm?",
        a: "Major storm events generate high dispatch volume. We prioritize by safety risk. Call 1-855-910-9090 for ETA and risk triage.",
      },
      {
        q: "Do you work with my insurance company?",
        a: "Yes. We coordinate directly with adjusters when authorized and provide documentation to any major insurer.",
      },
    ],
    metaTitle: "Storm Damage Emergency Response",
    metaDescription:
      "Twenty four hour storm damage dispatch across Canada and the US. Wind, water, ice, and impact damage response. Call 1-855-910-9090.",
    overviewTitle: "How storm damage response works.",
    faqTitle: "Storm damage, answered.",
    faqDescription:
      "Common questions about wind, water, ice, and impact damage triage from property managers, commercial owners, and homeowners.",
    ctaTitle: "Storm damage to report?",
    ctaBody:
      "Call dispatch now. Multi trade triage so the right crews show up in the right order on a single insurance claim.",
  },
  {
    slug: "sewer-backups",
    name: "Sewer Backup Response",
    shortName: "Sewer Backups",
    eyebrow: "24/7 emergency",
    tagline: "Active sewer backup response. Clearing, containment, and biohazard cleanup.",
    intro:
      "Bridgepoint Maintenance dispatches sewer backup response twenty four hours across Canada and the US. A sewer backup is more than a clogged drain. It is a biohazard event that needs careful containment. Our crews clear the line, contain the affected area, and run a category three water cleanup with appropriate PPE and disposal. Call 1-855-910-9090 immediately when sewage backs up into the building.",
    scope: [
      {
        title: "Line clearing",
        body: "Mechanical auger and hydro jet clearing of the main sewer line. Camera inspection to identify the cause.",
      },
      {
        title: "Containment",
        body: "Containment of the affected area to prevent contamination spread. Plastic barriers, negative air, and access control.",
      },
      {
        title: "Biohazard cleanup",
        body: "Category three contaminated water cleanup with appropriate PPE, anti microbial treatment, and disposal protocols.",
      },
      {
        title: "Camera inspection",
        body: "Sewer camera inspection of the main line to identify root intrusion, broken pipe, or city side issues.",
      },
      {
        title: "Repair scoping",
        body: "Spot repair, full lateral replacement, or trenchless pipe lining options scoped on site with a written quote.",
      },
      {
        title: "Insurance documentation",
        body: "Photo log, scope of contamination, and disposal records suitable for any major insurer.",
      },
    ],
    whyUs:
      "Sewer backups are where many vendors take shortcuts. Clear the drain. Mop up. Done. That is not how a properly handled sewer backup ends. Our crews follow category three contamination protocols, document the cleanup, and identify the root cause with camera inspection so the same event does not happen again next month.",
    related: [
      { label: "Emergency plumbing", href: "/emergency/plumbing" },
      { label: "Water damage response", href: "/emergency/water-damage" },
      { label: "Plumbing services", href: "/services/plumbing" },
      { label: "Property manager program", href: "/industries/property-managers" },
    ],
    faq: [
      {
        q: "Why is a sewer backup different from a clogged drain?",
        a: "Sewer backup means wastewater from outside the building entered the space. That is a biohazard. The cleanup follows different protocols than a simple drain clear.",
      },
      {
        q: "Should I clean it up myself?",
        a: "No. Category three contaminated water needs appropriate PPE, containment, and disposal. Call dispatch and stay clear of the affected area.",
      },
      {
        q: "What causes a sewer backup?",
        a: "Most common causes are root intrusion, broken sewer lateral, grease and debris buildup, and city side issues like an overloaded main during heavy rain.",
      },
      {
        q: "Can you prevent it from happening again?",
        a: "Yes. Camera inspection identifies the root cause. Backwater valves, lateral repairs, and pipe lining options prevent recurrence.",
      },
    ],
    metaTitle: "Sewer Backup Emergency Response",
    metaDescription:
      "Sewer backup emergency response across Canada and the US. Clearing, containment, biohazard cleanup. Call 1-855-910-9090.",
    overviewTitle: "How sewer backup response works.",
    faqTitle: "Sewer backups, answered.",
    faqDescription:
      "Common questions about line clearing, biohazard containment, and root cause inspection from property managers, commercial owners, and homeowners.",
    ctaTitle: "Sewage in the building?",
    ctaBody:
      "Call dispatch now. Category three contamination protocols, line clearing, and camera inspection so it does not happen again.",
  },
  {
    slug: "boiler-failure",
    name: "Boiler Failure Response",
    shortName: "Boiler Failure",
    eyebrow: "24/7 emergency",
    tagline: "Commercial and residential boiler emergency response. Same shift restoration where conditions allow.",
    intro:
      "Bridgepoint Maintenance runs boiler failure emergency dispatch twenty four hours across Canada and the US. Commercial boilers fail and the building loses heat or hot water. Residential boilers fail in the middle of winter. We hold TSSA licensed gas techs on call with the diagnostic tools and parts needed to restore most failures the same shift. Call 1-855-910-9090 for boiler emergencies.",
    scope: [
      {
        title: "Cast iron boiler diagnostics",
        body: "Pilot, ignition, board, and gas valve diagnostics on cast iron systems. Pump and zone valve work as needed.",
      },
      {
        title: "Mod con boiler diagnostics",
        body: "Modulating condensing boiler diagnostics including combustion analysis, sensor calibration, and board work.",
      },
      {
        title: "Hydronic system service",
        body: "Pump replacement, expansion tank service, air separator work, and zone valve repair across the heating loop.",
      },
      {
        title: "Commercial boiler service",
        body: "Commercial boiler diagnostics, refractory work, and same shift component replacement on common parts.",
      },
      {
        title: "Backup heat coordination",
        body: "Coordination on portable heaters or temporary boiler rental when same shift restoration is not possible.",
      },
      {
        title: "Replacement scoping",
        body: "Equipment replacement scoping when the unit is past serviceable life. New unit sourcing and install scheduling.",
      },
    ],
    whyUs:
      "Boiler emergencies stop the building. Heat, hot water, sometimes both. Our dispatch model holds gas licensed techs on call and stocks the high failure parts on the trucks. Most boiler emergencies close the same shift. When they do not, we coordinate temporary heat so the building stays operational.",
    related: [
      { label: "Emergency HVAC", href: "/emergency/hvac" },
      { label: "No heat response", href: "/emergency/no-heat" },
      { label: "HVAC services", href: "/services/hvac" },
      { label: "Commercial property owners", href: "/industries/commercial-property-owners" },
    ],
    faq: [
      {
        q: "What if my boiler cannot be repaired the same shift?",
        a: "We coordinate temporary heat through portable heaters or temporary boiler rental while the permanent repair or replacement gets scheduled.",
      },
      {
        q: "Are your gas techs TSSA licensed?",
        a: "Yes. Boiler service performed by state and provincial licensed gas technicians. License numbers print on the work order.",
      },
      {
        q: "How long do boilers usually last?",
        a: "Cast iron boilers run twenty to thirty years. Mod con boilers run fifteen to twenty. Past those numbers, the failure pattern shifts toward replacement.",
      },
      {
        q: "Can you service commercial boilers?",
        a: "Yes. Commercial boiler service, parts replacement, and refractory work coordinated with the appropriate inspections.",
      },
    ],
    metaTitle: "Boiler Failure Emergency Response",
    metaDescription:
      "Twenty four hour boiler failure emergency dispatch across Canada and the US. Commercial and residential. Call 1-855-910-9090.",
    overviewTitle: "How boiler failure response works.",
    faqTitle: "Boiler failure, answered.",
    faqDescription:
      "Common questions about commercial and residential boiler failures from property managers, commercial owners, and homeowners.",
    ctaTitle: "Boiler down right now?",
    ctaBody:
      "Call dispatch. TSSA licensed gas techs on call with high failure parts on the trucks for same shift restoration.",
  },
];

export const getEmergencyPage = (slug: string) =>
  EMERGENCY_PAGES.find((p) => p.slug === slug);
