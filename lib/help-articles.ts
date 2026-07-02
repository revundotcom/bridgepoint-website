/**
 * Help library — short common-problem articles for the /help/ scaffold.
 * Each article: H1, intro, three sections, CTA.
 */
export type HelpArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  category:
    | "Plumbing"
    | "HVAC"
    | "Electrical"
    | "Emergency"
    | "Drain & Sewer"
    | "Restoration"
    | "Heating";
  intro: string;
  sections: { heading: string; body: string }[];
  related: { slug: string; label: string }[];
  serviceLink?: { href: string; label: string };
};

export const HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "how-to-replace-a-sump-pump",
    title: "How to know when your sump pump needs replacing",
    shortTitle: "Replace a sump pump",
    category: "Plumbing",
    intro:
      "Sump pumps quietly do the most important job in your basement. when they fail, you usually find out the hard way. Here is what to watch for.",
    sections: [
      {
        heading: "Signs your sump pump is failing",
        body:
          "Strange noises during a normal cycle, frequent on-off cycling, visible rust on the unit, or a unit older than 7 years are all reasons to think about replacement before the next big storm.",
      },
      {
        heading: "What a Bridgepoint replacement looks like",
        body:
          "Our plumber pulls the existing unit, checks the pit and discharge line, sizes the new pump for your basement footprint, and installs with a battery backup option if you want one. Most replacements close out same-visit.",
      },
      {
        heading: "When to call us right now",
        body:
          "Standing water in the pit and the float not engaging is an emergency. call dispatch now. We carry common pump sizes on the truck.",
      },
    ],
    related: [
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
      { slug: "signs-of-a-failing-water-heater", label: "Signs of a failing water heater" },
    ],
    serviceLink: { href: "/services/plumbing", label: "See plumbing services" },
  },
  {
    slug: "why-is-my-furnace-short-cycling",
    title: "Why is my furnace short-cycling?",
    shortTitle: "Furnace short-cycling",
    category: "HVAC",
    intro:
      "Short-cycling is when your furnace turns on and off faster than it should. it almost always points to one of three things, and ignoring it stresses the unit and your gas bill.",
    sections: [
      {
        heading: "The three usual suspects",
        body:
          "Most short-cycling traces back to a clogged air filter, an oversized furnace, or a flame-sensor issue. Two of the three are cheap fixes if caught early.",
      },
      {
        heading: "What you can check yourself",
        body:
          "Replace the air filter. clear vents and returns of furniture or dust. Check that the thermostat is not in direct sun and is set away from heat sources.",
      },
      {
        heading: "When to call Bridgepoint",
        body:
          "If the filter is clean and short-cycling continues, call dispatch. Our HVAC techs scope flame sensors, gas pressure, and ductwork sizing in one visit.",
      },
    ],
    related: [
      { slug: "common-ac-problems-summer", label: "Common AC problems in summer" },
      { slug: "signs-of-a-failing-water-heater", label: "Signs of a failing water heater" },
    ],
    serviceLink: { href: "/services/hvac", label: "See HVAC services" },
  },
  {
    slug: "when-to-call-an-emergency-plumber",
    title: "When to call an emergency plumber (and when it can wait)",
    shortTitle: "Emergency plumber decision",
    category: "Emergency",
    intro:
      "Not every leak is an emergency. Some really are. Here is the framework Bridgepoint dispatchers use to triage your call.",
    sections: [
      {
        heading: "Call us right now if",
        body:
          "Active flooding, sewage backup, no hot water in winter, a major appliance leaking, or burst supply lines all qualify as emergency dispatch. Shut the main water valve while you wait if you can find it safely.",
      },
      {
        heading: "Schedule for the next business day if",
        body:
          "A slow drip under a faucet, a single slow drain, a running toilet, or a cosmetic issue can usually wait. Same-day windows are still available during business hours.",
      },
      {
        heading: "What to have ready when you call",
        body:
          "Address, the trade you need, model number on the equipment, and a one-line description. It cuts intake time roughly in half.",
      },
    ],
    related: [
      { slug: "signs-of-a-failing-water-heater", label: "Signs of a failing water heater" },
      { slug: "how-to-replace-a-sump-pump", label: "How to replace a sump pump" },
    ],
    serviceLink: { href: "/emergency", label: "See emergency dispatch" },
  },
  {
    slug: "signs-of-a-failing-water-heater",
    title: "Signs your water heater is on its last leg",
    shortTitle: "Failing water heater",
    category: "Plumbing",
    intro:
      "Water heaters fail in patterns. Knowing which pattern your unit is showing tells you whether you have a week of warning or thirty seconds.",
    sections: [
      {
        heading: "Slow signs (you have weeks)",
        body:
          "Lukewarm water, sediment noises during heating, rust-colored water from hot taps, or a unit older than 10 years all mean it is time to plan a replacement.",
      },
      {
        heading: "Fast signs (you have minutes)",
        body:
          "Visible water around the base of the tank or any moisture on the unit means the tank is failing. shut the water and gas (or breaker) immediately and call dispatch.",
      },
      {
        heading: "Tank or tankless?",
        body:
          "Tankless costs more upfront, lasts longer, and runs out of hot water far less. Tank is cheaper to install and easier to service. Bridgepoint installs both. our techs scope your usage before recommending one.",
      },
    ],
    related: [
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
      { slug: "how-to-replace-a-sump-pump", label: "How to replace a sump pump" },
    ],
    serviceLink: { href: "/services/plumbing", label: "See plumbing services" },
  },
  {
    slug: "common-ac-problems-summer",
    title: "Common AC problems in a Toronto summer",
    shortTitle: "Common AC problems",
    category: "HVAC",
    intro:
      "Toronto summers are short and brutal. when an AC fails on a 31C afternoon, the call queue triples. Here are the three issues we see most often.",
    sections: [
      {
        heading: "AC running but not cooling",
        body:
          "Most often a refrigerant leak, a dirty condenser coil, or a frozen evaporator. The first one needs a technician; the second is a routine maintenance tune-up.",
      },
      {
        heading: "AC short-cycling",
        body:
          "Same logic as a furnace short-cycle: filter, sizing, or thermostat placement. Cheap fixes if caught early.",
      },
      {
        heading: "AC outdoor unit not running",
        body:
          "Tripped breaker, contactor failure, or capacitor failure. Bridgepoint techs carry replacement caps and contactors on the truck for same-visit fixes.",
      },
    ],
    related: [
      { slug: "why-is-my-furnace-short-cycling", label: "Why is my furnace short-cycling?" },
    ],
    serviceLink: { href: "/services/hvac", label: "See HVAC services" },
  },
  {
    slug: "burst-pipe-emergency-steps",
    title: "Burst pipe? Five steps to take in the first 10 minutes",
    shortTitle: "Burst pipe steps",
    category: "Plumbing",
    intro:
      "A burst pipe inside the wall or ceiling can cost thousands every minute. Here is the field-guide we walk callers through while a tech is en route.",
    sections: [
      {
        heading: "Step 1. Shut the water main",
        body:
          "Find the main shut-off valve, usually near the water meter or in the basement utility room. Turn clockwise until it stops. that kills supply to the entire house.",
      },
      {
        heading: "Step 2. Cut power to wet circuits",
        body:
          "If water is anywhere near outlets, fixtures, or the panel, flip the breakers feeding those circuits. when in doubt, flip the main.",
      },
      {
        heading: "Step 3. Open faucets and document",
        body:
          "Open the lowest faucets in the house to drain the lines and reduce pressure. Take photos and a short video of the damage. you will want it for insurance.",
      },
      {
        heading: "When to call us right now",
        body:
          "Call dispatch the moment water is moving. Bridgepoint trucks carry pipe-repair fittings for same-visit fixes on the most common materials.",
      },
    ],
    related: [
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
      { slug: "water-damage-first-24-hours", label: "Water damage. the first 24 hours" },
    ],
    serviceLink: { href: "/services/plumbing", label: "See plumbing services" },
  },
  {
    slug: "breaker-keeps-tripping",
    title: "Why does my breaker keep tripping?",
    shortTitle: "Breaker tripping",
    category: "Electrical",
    intro:
      "A breaker doing its job is a good thing. one that trips repeatedly is asking for help. Here is what is usually causing it.",
    sections: [
      {
        heading: "The three usual suspects",
        body:
          "Overloaded circuit, a short between hot and neutral, or a ground fault. Older homes also see breaker fatigue. an aging breaker that trips at lower amperage than it should.",
      },
      {
        heading: "What you can check yourself",
        body:
          "Unplug everything on the affected circuit, reset the breaker, and plug devices back in one at a time. if the breaker holds with nothing plugged in, the issue is one of the loads.",
      },
      {
        heading: "When to call Bridgepoint",
        body:
          "If the breaker trips with the circuit empty, or if you smell anything warm or burnt at the panel, call dispatch and stop using the circuit. That is an electrician visit, not a DIY.",
      },
    ],
    related: [
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
    ],
    serviceLink: { href: "/services/electrical", label: "See electrical services" },
  },
  {
    slug: "sewer-backup-warning-signs",
    title: "Sewer backup warning signs (and what to do)",
    shortTitle: "Sewer backup signs",
    category: "Drain & Sewer",
    intro:
      "A sewer backup rarely shows up out of nowhere. There are usually 3-4 weeks of warnings if you know what to look for.",
    sections: [
      {
        heading: "Warning signs",
        body:
          "Multiple slow drains across the house, gurgling toilets when the washing machine drains, or a faint sewage smell in the basement are all early signals.",
      },
      {
        heading: "What to do right now",
        body:
          "Stop running water. that includes laundry, dishwasher, and showers. then call dispatch for a same-day camera inspection of the lateral.",
      },
      {
        heading: "How Bridgepoint scopes it",
        body:
          "We run a camera down the cleanout, find the blockage or break, and walk you through the repair options on screen. trenchless when feasible, spot repair when not.",
      },
    ],
    related: [
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
      { slug: "burst-pipe-emergency-steps", label: "Burst pipe? Five steps in 10 minutes" },
    ],
    serviceLink: { href: "/emergency/sewer-backups", label: "See sewer line services" },
  },
  {
    slug: "water-damage-first-24-hours",
    title: "Water damage: the first 24 hours decide everything",
    shortTitle: "Water damage 24h",
    category: "Restoration",
    intro:
      "What you do in the first 24 hours after a water loss decides whether you have a $3,000 fix or a $30,000 rebuild. Speed and documentation matter most.",
    sections: [
      {
        heading: "Hour 0-2: stop the water and document",
        body:
          "Shut the source, kill power to wet circuits, and start photographing everything before you move it. Insurance adjusters care about provenance.",
      },
      {
        heading: "Hour 2-12: extract and start drying",
        body:
          "Standing water needs to come up fast. extraction equipment removes more in 30 minutes than mops and towels can in a full day. the longer water sits, the more category creep you risk.",
      },
      {
        heading: "Hour 12-24: dehumidify and air-move",
        body:
          "Industrial dehumidifiers and air movers run continuously. drywall and carpet have a roughly 24-hour window before mould risk climbs sharply.",
      },
      {
        heading: "When Bridgepoint takes over",
        body:
          "We respond 24/7 with extraction, drying, and remediation. Insurance documentation is built into the workflow. you get the photos, moisture logs, and equipment hours filed for the claim.",
      },
    ],
    related: [
      { slug: "burst-pipe-emergency-steps", label: "Burst pipe? Five steps in 10 minutes" },
      { slug: "when-to-call-an-emergency-plumber", label: "When to call an emergency plumber" },
    ],
    serviceLink: { href: "/emergency/water-damage", label: "See restoration services" },
  },
  {
    slug: "no-heat-troubleshooting",
    title: "No heat? Troubleshooting before you call",
    shortTitle: "No heat",
    category: "Heating",
    intro:
      "Before you wait for a tech, run through these. Half of no-heat calls get resolved without a service visit when callers check these first.",
    sections: [
      {
        heading: "The basics",
        body:
          "Confirm the thermostat is set to heat and at least 5 degrees above ambient. Check that the breaker for the furnace is on. Make sure the furnace switch (looks like a light switch) is on.",
      },
      {
        heading: "The filter",
        body:
          "A clogged filter is the most common cause of furnace shutdowns. Pull the filter and hold it up to a light. if you cannot see through it, replace it before calling.",
      },
      {
        heading: "The flame and venting",
        body:
          "If the unit is firing but no heat is coming through vents, vents may be closed or blocked. If the unit is not firing at all, the flame sensor or igniter is the usual culprit. that is a tech visit.",
      },
      {
        heading: "Call dispatch",
        body:
          "If basics check out and you still have no heat in winter, call now. cold-weather no-heat is treated as emergency dispatch.",
      },
    ],
    related: [
      { slug: "why-is-my-furnace-short-cycling", label: "Why is my furnace short-cycling?" },
      { slug: "common-ac-problems-summer", label: "Common AC problems in summer" },
    ],
    serviceLink: { href: "/services/hvac", label: "See HVAC services" },
  },
];
