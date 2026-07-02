#!/usr/bin/env python3
"""
Bridge Point Maintenance silo content regeneration v2.

Goal: each of 40 target (city, service) pages has ALL prose generated
from per-service + per-city banks selected deterministically by hash,
so same-service-different-city < 20% and same-city-different-service < 20%.

Strategy:
- Per-service "voice" bank with 6-8 variants each (intro / context / details / each H2 paragraph)
- Per-city localization slots (population, climate, neighborhoods, jurisdictions)
- Hash(city, service, section, idx) picks the variant
- High vocabulary entropy by mixing service-specific verbs/nouns

Output: patch.json mapping {url: {field: value}}
"""
import json, os, re, hashlib
from pathlib import Path

WEBSITE_ROOT = Path(__file__).resolve().parents[2]
BRAND_ROOT = WEBSITE_ROOT.parent
CONTENT_JSON = WEBSITE_ROOT / "lib" / "silo" / "content.json"
BRIEFS_DIR = BRAND_ROOT / "research" / "briefs"
OUT_DIR = Path(__file__).resolve().parent
PATCH_JSON = OUT_DIR / "patch.json"

TARGET_CITIES = [
    "toronto-on", "mississauga-on", "brampton-on", "hamilton-on", "ottawa-on",
    "los-angeles-ca", "san-francisco-ca", "san-diego-ca",
]
TARGET_SLUGS = ["facility-maintenance", "plumber", "electrician", "hvac", "commercial-contracting"]

SERVICE_TO_BRIEF = {
    "facility-maintenance": "building-maintenance",
    "plumber": "commercial-plumbing",
    "electrician": "commercial-electrical",
    "hvac": "commercial-hvac",
    "commercial-contracting": "emergency-building-repair",
}

SERVICE_LABELS = {
    "facility-maintenance": "Facility Maintenance",
    "plumber": "Commercial Plumbing",
    "electrician": "Commercial Electrical",
    "hvac": "Commercial HVAC",
    "commercial-contracting": "Emergency Building Repair",
}

# Service-specific vocabulary banks for high differentiation
SERVICE_VOCAB = {
    "facility-maintenance": {
        "noun_phrases": [
            "preventive maintenance rounds", "lobby and common area upkeep",
            "monthly facility checklist work", "building system inspection cycles",
            "janitorial program oversight", "vendor consolidation under one account",
            "capital reserve condition surveys", "asset class lifecycle planning",
            "tenant complaint triage", "porter dispatched cleanup",
            "elevator pit dewatering rounds", "loading dock maintenance cycles",
            "rooftop access ladder safety inspection", "perimeter door hardware refresh",
            "directional signage refurbishment", "occupant safety drill scheduling",
        ],
        "verbs": ["audits", "schedules", "consolidates", "documents", "stewards"],
        "work_units": ["preventive task", "monthly round", "common area visit", "vendor consolidation report"],
        "failure_modes": [
            "deferred maintenance backlog", "vendor coordination overhead",
            "missed preventive task cycles", "spotty closeout documentation",
        ],
        "deliverables": [
            "monthly facility report",
            "quarterly capital reserve memo",
            "annual condition survey",
            "vendor consolidation savings memo",
        ],
        "kw_anchor": "commercial building maintenance program",
    },
    "plumber": {
        "noun_phrases": [
            "backflow preventer testing", "drain line clearing", "fixture rough in installs",
            "water heater replacement", "sewer line camera inspection",
            "supply line repair", "domestic hot water recirculation tuning",
            "grease trap pump and service", "isolation valve replacement",
            "hose bib winterization rounds", "circulator pump rebuild",
            "expansion tank replacement", "trap primer maintenance",
            "stack vent flashing repair", "PEX manifold install",
        ],
        "verbs": ["restores", "jets", "snakes", "tests", "stubs", "trenches"],
        "work_units": ["pipe repair", "drain clear", "fixture rough in", "water heater swap", "backflow test"],
        "failure_modes": [
            "burst supply lines", "blocked sewer mains", "leaking fixture valves",
            "corroded galvanized risers", "failed water heater anodes",
        ],
        "deliverables": [
            "backflow test certificate",
            "camera inspection video file",
            "permit closeout from plumbing inspector",
            "water heater warranty registration",
        ],
        "kw_anchor": "commercial plumbing service",
    },
    "electrician": {
        "noun_phrases": [
            "service panel upgrades", "EV charger installation", "exit and emergency lighting service",
            "branch circuit additions", "service entrance repair",
            "transfer switch installation", "lighting controls programming",
            "low voltage rough ins", "generator interconnect installation",
            "GFCI receptacle upgrades", "occupancy sensor commissioning",
            "fire alarm tie in work", "data closet UPS rebuild",
            "exterior pole light repair", "subpanel relocation",
        ],
        "verbs": ["energizes", "wires", "lands", "trims", "trips", "terminates"],
        "work_units": ["panel swap", "branch circuit pull", "EV charger install", "exit light fix"],
        "failure_modes": [
            "tripped breakers on overloaded circuits", "burned bus bar connections",
            "dead exit signs out of code", "loose neutral connections at the service",
            "exposed wire on construction perimeters",
        ],
        "deliverables": [
            "ESA permit closeout",
            "AHJ inspection sticker on the panel",
            "load calculation memo",
            "branch circuit map filed with the work order",
        ],
        "kw_anchor": "commercial electrical contractor",
    },
    "hvac": {
        "noun_phrases": [
            "rooftop unit compressor service", "duct rebalancing", "thermostat and BAS controls work",
            "coil and filter cleaning", "refrigerant top ups",
            "boiler combustion tuning", "chiller water treatment",
            "economizer cycle commissioning", "VFD drive replacement",
            "mini split head install", "humidifier service rounds",
            "exhaust fan belt replacement", "make up air unit refresh",
            "variable refrigerant flow startup", "TXV expansion valve change",
        ],
        "verbs": ["recharges", "balances", "commissions", "tunes", "stages", "rebalances"],
        "work_units": ["RTU service visit", "boiler tune", "chiller water treatment round", "coil clean"],
        "failure_modes": [
            "RTU compressor seize", "boiler low water shutdown", "chiller approach temperature drift",
            "duct static pressure climb", "refrigerant leak at TXV",
        ],
        "deliverables": [
            "EPA Section 608 leak log",
            "Title 24 commissioning report",
            "TSSA inspection log filed with gas work",
            "RTU service ticket with refrigerant pressures",
        ],
        "kw_anchor": "commercial HVAC contractor",
    },
    "commercial-contracting": {
        "noun_phrases": [
            "make safe boarding", "structural shoring of damaged framing", "water extraction and structural drying",
            "post incident rebuild scoping", "tarp and dry in for storm damage",
            "vehicle impact stabilization", "fire and smoke containment",
            "insurance carrier coordination on the claim file", "biohazard cleanup",
            "rapid temporary fence install", "scaffold setup for stabilization",
            "moisture meter mapping", "smoke odor mitigation",
            "broken glass removal and replacement", "sewer ejector pit recovery",
        ],
        "verbs": ["stabilizes", "shores", "tarps", "extracts", "boards", "secures", "triages"],
        "work_units": ["make safe", "structural shore", "dry in", "claim scope", "boarding"],
        "failure_modes": [
            "broken curtain wall after impact", "collapsed roof deck under load",
            "burst supply line flooding tenant space", "wind damaged roof field",
            "fire damaged framing requiring shoring",
        ],
        "deliverables": [
            "make safe photo log for the insurer",
            "structural engineer letter for the AHJ",
            "scope of loss document for the property manager",
            "emergency permit filed with the building department",
        ],
        "kw_anchor": "emergency building repair contractor",
    },
}

# Per-state per-service jurisdiction
JURISDICTIONS = {
    "ON": {
        "facility-maintenance": {
            "body": "Ontario Occupational Health and Safety Act and WSIB Coverage",
            "statute": "OHSA RSO 1990 c O.1",
            "url": "https://www.ontario.ca/laws/statute/90o01",
            "summary": "Property managers carry the legal duty to keep building systems in good repair under OHSA. Contractors carry WSIB clearance and named insured Certificates of Insurance on every visit.",
            "regulator": "Ontario Ministry of Labour Training and Skills Development",
        },
        "plumber": {
            "body": "Ontario Building Code Plumbing Provisions",
            "statute": "O Reg 332/12 Part 7",
            "url": "https://www.ontario.ca/laws/regulation/120332",
            "summary": "Every plumbing alteration requires a permit, an inspection, and a licensed plumber under the Ministry of Labour Training and Skills Development.",
            "regulator": "Ontario Building Code Plumbing Division",
        },
        "electrician": {
            "body": "Ontario Electrical Safety Code under the Electrical Safety Authority",
            "statute": "OESC 28th Edition, Ontario Regulation 164/99",
            "url": "https://esasafe.com/contractors/ontario-electrical-safety-code/",
            "summary": "Electrical work is regulated by the ESA. ESA notification, permit, and Licensed Electrical Contractor LEC status are required for any commercial circuit alteration.",
            "regulator": "Electrical Safety Authority ESA",
        },
        "hvac": {
            "body": "Technical Standards and Safety Authority TSSA Gas Code",
            "statute": "B149.1 Natural Gas Installation Code, TSSA Act 2000",
            "url": "https://www.tssa.org/en/fuels/gaseous-fuels.aspx",
            "summary": "HVAC work that touches a gas line falls under TSSA. G1, G2, and G3 ticketed technicians are required for gas appliance service.",
            "regulator": "TSSA Fuels Safety Program",
        },
        "commercial-contracting": {
            "body": "Ontario Building Code Emergency Repair Authority",
            "statute": "OBC Division C 1.3.1",
            "url": "https://www.ontario.ca/laws/regulation/120332",
            "summary": "Emergency structural and life safety repairs can proceed without a pre issued permit when the work protects the building or occupants. A follow up permit is filed inside 48 hours.",
            "regulator": "local Ontario building department for the jurisdiction",
        },
    },
    "CA": {
        "facility-maintenance": {
            "body": "California CSLB B General Building Contractor License",
            "statute": "Business and Professions Code Section 7026",
            "url": "https://www.cslb.ca.gov/Consumers/LegalIssuesForConsumers/General.aspx",
            "summary": "Any commercial maintenance scope that crosses two or more trades requires a B General Building Contractor license from the Contractors State License Board.",
            "regulator": "California Contractors State License Board CSLB",
        },
        "plumber": {
            "body": "California C 36 Plumbing Contractor License",
            "statute": "CSLB BPC 7058, California Plumbing Code 2022",
            "url": "https://www.cslb.ca.gov/Resources/LicenseClassifications/C-36-PlumbingContractor.aspx",
            "summary": "Commercial plumbing is governed by the California Plumbing Code and the C 36 license. Backflow testing is filed with the local water purveyor on a published schedule.",
            "regulator": "CSLB and local water purveyor",
        },
        "electrician": {
            "body": "California C 10 Electrical Contractor License",
            "statute": "CSLB BPC 7058, California Electrical Code 2022",
            "url": "https://www.cslb.ca.gov/Resources/LicenseClassifications/C-10-ElectricalContractor.aspx",
            "summary": "Electrical work requires a C 10 license, DIR certified electricians, and AHJ permits for any service change, panel work, or new branch circuit.",
            "regulator": "California Department of Industrial Relations DIR and local AHJ",
        },
        "hvac": {
            "body": "California C 20 Warm Air Heating Ventilating and Air Conditioning Contractor License",
            "statute": "CSLB BPC 7058, Title 24 Part 6 Energy Code",
            "url": "https://www.cslb.ca.gov/Resources/LicenseClassifications/C-20-Warm-AirHeatingVentilatingandAir-ConditioningContractor.aspx",
            "summary": "HVAC work is regulated by the C 20 license and Title 24 Part 6. EPA Section 608 certification is required for refrigerant handling on commercial RTUs.",
            "regulator": "California Energy Commission CEC and CSLB",
        },
        "commercial-contracting": {
            "body": "California CSLB Emergency Repair Authority",
            "statute": "Title 24 Part 2 Emergency Repair, CSLB Section 7065.3",
            "url": "https://www.cslb.ca.gov/Consumers/LegalIssuesForConsumers/General.aspx",
            "summary": "Emergency building repair may proceed without prior permit when the work is required to make safe. A follow up permit and inspection schedule is filed within 48 hours with the local jurisdiction.",
            "regulator": "local California building department for the jurisdiction",
        },
    },
}

# Per-city UNIQUE detail bank — used to anchor a city-specific paragraph block in every page.
# These do NOT repeat across cities and they include city-only proper nouns to drop shingle overlap.
CITY_DETAIL_PARAGRAPHS = {
    "toronto-on": [
        "Toronto carries the largest stock of pre 1980 high rise rental towers in Canada, mostly along the Don Valley Parkway corridor and the older Yonge Street walk up belt. Cast iron drain stack failures, riser corrosion in the building's hydronic loop, and chiller tower water treatment lapses pull the heaviest reactive work each year.",
        "The Toronto Hydro service entrance pattern, with most commercial assets on 600V three phase delta service, shapes the way Bridge Point quotes electrical work in the Financial District and the Bloor Yorkville pocket. Tap box upgrades, switchgear maintenance, and ESA notifications stack against the dispatch board through every Q1.",
        "From the Beaches to Etobicoke, Toronto runs through the City of Toronto Auditor General's reporting framework for capital reserve management. Bridge Point ships condition data into that format on request, so the City staff property managers see a one to one match between the field visit and the reserve study.",
    ],
    "mississauga-on": [
        "Mississauga's industrial corridor along the Airport Corporate Centre carries a heavy concentration of distribution warehouses tied directly to Pearson Airport throughput. Roof drainage, dock leveler maintenance, and 600 amp service entrance work pull the bulk of the recurring Bridge Point program in this submarket.",
        "Square One area condominium towers, mostly 2008 to 2018 vintage, have started hitting their first major HVAC and domestic water heater replacement cycles. Bridge Point teams stage rooftop unit swaps in Mississauga during shoulder seasons when chiller demand drops and lift scheduling opens up.",
        "Meadowvale Business Park assets file commercial maintenance contracts with the Region of Peel for storm sewer connection testing. Bridge Point coordinates third party flush and camera work into the same dispatch account so property managers do not chase the Region separately.",
    ],
    "brampton-on": [
        "Brampton's 407 industrial corridor turns over warehouse and logistics assets faster than any other corridor in the western GTA. New tenant fit ups, demising wall electrical re feeds, and HVAC zoning changes pile up on the Bridge Point dispatch board in any month a tenant moves in or out.",
        "Bramalea City Centre and the Heart Lake commercial corridor pull a steady cadence of property maintenance and storefront work. Glass break repairs, exterior pressure washing, parking lot drainage, and graffiti removal stack on the seasonal program for retail property managers.",
        "The Region of Peel runs a strict commercial water audit program in Brampton. Backflow preventer testing certificates, dye testing on grease traps, and isolation valve maintenance file directly with Peel Region staff. Bridge Point handles the filings inside the same dispatch flow.",
    ],
    "hamilton-on": [
        "Hamilton's century Edwardian brick stock in the Durand and Strathcona neighborhoods carries parapet condition issues that come up on every freeze thaw cycle. Bridge Point pairs masonry tuckpointing crews with carpentry trades on the same dispatch ticket to clear those scopes inside one mobilization.",
        "The McMaster University adjacent multifamily belt, from Westdale through Ainslie Wood, runs on a four month tenant turnover cycle each August and September. Unit turnover paint, drywall patching, plumbing fixture replacement, and locksmith work pile up in late summer for Hamilton landlords.",
        "Stoney Creek warehouse landlords inside the Centennial Parkway corridor file fire safety plans with Hamilton Fire under the Ontario Fire Code Part 2. Bridge Point coordinates fire pump inspection, sprinkler trim work, and emergency exit sign service on the standing maintenance program.",
    ],
    "ottawa-on": [
        "Ottawa's federal Class A office inventory, mostly inside Public Services and Procurement Canada master leases, files capital maintenance reports through SAP CRM with monthly KPI sheets. Bridge Point ships condition data into the PSPC framework so federal property administrators see the closeout trail without re entering it.",
        "Kanata North tech park assets, anchored by the BlackBerry QNX campus and the Ericsson Canada headquarters, run heavy on the dispatch board through every January cold snap. Make up air units fail when outdoor air sub zero hits, and chilled water loop pressure swings drive emergency calls from Kanata Avenue through to March Road.",
        "Glebe and Centretown triplex stock dates mostly to the early 1900s and pulls the heaviest galvanized supply line replacement work in Ottawa. Bridge Point trenches new copper or PEX runs through unfinished basement, then closes the work with City of Ottawa plumbing inspector sign off.",
    ],
    "los-angeles-ca": [
        "Los Angeles soft story multifamily inventory under Ordinance 183893, mostly in the Mid Wilshire and Koreatown belt, carries mandatory retrofit obligations with hard deadlines. Bridge Point folds retrofit related electrical re feeds, fire egress work, and exterior cladding repair into the standing maintenance program for those buildings.",
        "Wilshire Corridor Class A office between Westwood and Beverly Hills runs heavy on cooling tower makeup water during drought era restrictions. The Department of Water and Power Tier 2 conservation rules push facility managers to optimize tower cycles, blowdown, and chemical treatment, all scopes Bridge Point covers on the standing account.",
        "Vernon and the Alameda Corridor industrial belt pull pre 1970 tilt up concrete with degraded interior walls and obsolete fire suppression. Bridge Point fields make safe boarding, demising wall reconstruction, and Title 24 retrofit electrical for those tilt ups when tenants change over.",
    ],
    "san-francisco-ca": [
        "San Francisco Mandatory Soft Story Program retrofits across the Mission, the Outer Sunset, and the Western Addition still pull heavy carpentry, plumbing, and electrical re work even after the original retrofit closeout. Bridge Point handles the follow up scope on every soft story building added to the standing account.",
        "Financial District Class A office, mostly built between 1970 and 1989, carries cast iron domestic water riser stock that fails on a known cycle. Bridge Point stages riser replacement work in San Francisco against the freight elevator schedule and the tenant move out calendar.",
        "Mission Bay biotech lab space, anchored by UCSF and the Genentech campus, runs heavy on the dispatch board for medical gas line, fume hood exhaust fan, and reverse osmosis water treatment work. Each scope ties back to FDA validation paperwork, so the work order closeout has to ship the certifications with the photos.",
    ],
    "san-diego-ca": [
        "Sorrento Valley biotech tenants, anchored by Illumina and the Scripps Research campus, file cooling tower makeup water audit reports with the San Diego County Water Authority. Bridge Point handles tower drift management, chemical treatment, and blowdown logging inside the same account that runs the standing HVAC program.",
        "Downtown San Diego high rise condominium stock, mostly 2005 to 2015 vintage, has started hitting first major elevator hydraulic and domestic hot water plant replacement cycles. Bridge Point pairs the mechanical scopes with associated electrical re feeds to close the work inside one mobilization.",
        "La Jolla and Pacific Beach coastal multifamily carries chronic salt corrosion on exterior aluminum window frames, copper plumbing, and exposed structural steel. Bridge Point's coastal program pairs corrosion treatment with selective replacement on the same dispatch ticket so property managers do not chase two separate scopes.",
    ],
}

CITIES = {
    "toronto-on": {
        "name": "Toronto", "state": "Ontario", "state_abbr": "ON", "country": "Canada",
        "lat": 43.6532, "lng": -79.3832, "population": "2.9 million",
        "metro_pop": "6.4 million in the Greater Toronto Area",
        "climate_short": "humid continental",
        "climate_full": "humid continental with freeze thaw cycles from December through March and summer dew points above 22 C",
        "neighborhoods": ["Downtown", "North York", "Etobicoke", "Scarborough", "East York", "York"],
        "building_stock": "pre 1980 high rise rental towers, 1990s and 2000s condominium glass on Bloor and in CityPlace, mid century brick walk ups in East York, and post war single family across Scarborough",
        "landmarks": ["the Yonge Street corridor", "the Financial District", "Bloor Yorkville", "the Distillery District", "the Beaches"],
        "season_pressures": "winter pipe freeze, ice damming on flat roofs, salt corrosion on parking garage rebar, and summer cooling load on aging RTUs",
        "asset_types": "Class A and B office towers, condominium corporations, multifamily rentals, retail plazas, and warehouse logistics off Highway 401",
        "regulator_local": "City of Toronto Building Division",
        "wow_fact": "Toronto carries over 200 condominium towers above 30 storeys, the largest concentration in Canada",
    },
    "mississauga-on": {
        "name": "Mississauga", "state": "Ontario", "state_abbr": "ON", "country": "Canada",
        "lat": 43.5890, "lng": -79.6441, "population": "780 thousand",
        "metro_pop": "part of the 6.4 million Greater Toronto Area",
        "climate_short": "humid continental with lake effect",
        "climate_full": "humid continental with lake effect snow off Lake Ontario and freeze thaw cycles that stress flat roof drainage January through March",
        "neighborhoods": ["City Centre", "Square One", "Streetsville", "Port Credit", "Meadowvale", "Erin Mills"],
        "building_stock": "industrial flex space in the Airport Corporate Centre and Meadowvale Business Park, Square One condominium towers, low rise office in the City Centre, and warehouse logistics tied to Pearson Airport",
        "landmarks": ["Square One", "Pearson International Airport", "the Airport Corporate Centre", "Port Credit waterfront"],
        "season_pressures": "winter snow and ice loading on warehouse roofs, summer heat on RTU compressors, and pressure swings on long industrial water mains",
        "asset_types": "logistics warehouses, suburban office, Square One condominium towers, and retail plazas along Hurontario",
        "regulator_local": "City of Mississauga Building Division",
        "wow_fact": "Mississauga sits adjacent to Pearson Airport, the busiest in Canada by passenger and cargo volume",
    },
    "brampton-on": {
        "name": "Brampton", "state": "Ontario", "state_abbr": "ON", "country": "Canada",
        "lat": 43.7315, "lng": -79.7624, "population": "750 thousand",
        "metro_pop": "part of the 6.4 million Greater Toronto Area",
        "climate_short": "humid continental with deeper winter snowfall",
        "climate_full": "humid continental with snowfall totals that exceed Toronto and freeze thaw cycles that crack asphalt and stress roof drainage",
        "neighborhoods": ["Downtown Brampton", "Bramalea", "Mount Pleasant", "Heart Lake", "Springdale", "Castlemore"],
        "building_stock": "newer master planned residential subdivisions, industrial along Steeles Avenue, warehouse and logistics around the 407, and low rise commercial along Queen Street",
        "landmarks": ["the Bramalea City Centre", "Gage Park", "the Powerade Centre", "the 407 industrial corridor"],
        "season_pressures": "deep winter snow loading, summer storms that overwhelm parking lot drainage, and heat strain on suburban HVAC plants",
        "asset_types": "suburban warehouse, residential subdivision common area maintenance, and Queen Street strip plazas",
        "regulator_local": "City of Brampton Building Division",
        "wow_fact": "Brampton is one of the fastest growing cities in Canada with single year population growth above 13 thousand",
    },
    "hamilton-on": {
        "name": "Hamilton", "state": "Ontario", "state_abbr": "ON", "country": "Canada",
        "lat": 43.2557, "lng": -79.8711, "population": "570 thousand",
        "metro_pop": "770 thousand in the Hamilton CMA",
        "climate_short": "humid continental with lake and escarpment microclimate",
        "climate_full": "humid continental with lake effect snow off Lake Ontario and microclimate effects from the Niagara Escarpment",
        "neighborhoods": ["Downtown", "Stoney Creek", "Ancaster", "Dundas", "Hamilton Mountain", "Westdale"],
        "building_stock": "century brick and stone in the Downtown core, steel manufacturing facilities on the bay, post war single family on the Mountain, and newer townhome stock in Stoney Creek and Ancaster",
        "landmarks": ["the Niagara Escarpment", "the Hamilton Harbourfront", "McMaster University", "James Street North"],
        "season_pressures": "industrial corrosion from the steel sector, freeze damage on century brick parapets, and heavy precipitation events on Mountain catchments",
        "asset_types": "heritage Downtown commercial, McMaster adjacent multifamily, Stoney Creek warehouse, and Ancaster suburban office",
        "regulator_local": "City of Hamilton Building Division",
        "wow_fact": "Hamilton holds the largest concentration of heritage Edwardian and Victorian commercial buildings in the GTHA",
    },
    "ottawa-on": {
        "name": "Ottawa", "state": "Ontario", "state_abbr": "ON", "country": "Canada",
        "lat": 45.4215, "lng": -75.6972, "population": "1.02 million",
        "metro_pop": "1.5 million in the Ottawa Gatineau region",
        "climate_short": "cold continental",
        "climate_full": "cold continental with January lows below minus 20 C, deep snowpack December through March, and summer storms that drive rapid temperature swings",
        "neighborhoods": ["Centretown", "Westboro", "Kanata", "Orleans", "Barrhaven", "the Glebe"],
        "building_stock": "federal government office in Centretown and Tunneys Pasture, tech campus space in Kanata, century brick triplex in the Glebe, and suburban single family in Barrhaven and Orleans",
        "landmarks": ["Parliament Hill", "ByWard Market", "the Rideau Canal", "Tunneys Pasture", "the Kanata North tech park"],
        "season_pressures": "extreme cold snaps that freeze exterior supply lines, ice damming on century brick rooflines, and rapid spring melt that loads sump and storm drainage",
        "asset_types": "federal Class A office, Kanata tech campus, century triplex multifamily in the Glebe, and suburban retail in Barrhaven",
        "regulator_local": "City of Ottawa Building Code Services",
        "wow_fact": "Ottawa hosts the largest concentration of federal Class A office space in Canada, with over 11 million square feet inside Public Services and Procurement Canada inventory",
    },
    "los-angeles-ca": {
        "name": "Los Angeles", "state": "California", "state_abbr": "CA", "country": "United States",
        "lat": 34.0522, "lng": -118.2437, "population": "3.9 million",
        "metro_pop": "13.1 million in the Los Angeles metropolitan area",
        "climate_short": "Mediterranean",
        "climate_full": "Mediterranean with dry summers, occasional Santa Ana wind events, and a winter rainy season that compresses precipitation into a five month window",
        "neighborhoods": ["Downtown", "Hollywood", "Mid Wilshire", "the Westside", "Koreatown", "the San Fernando Valley"],
        "building_stock": "pre 1933 unreinforced masonry retrofitted under Ordinance 183893, mid century concrete office on Wilshire, soft story multifamily across the Westside, and tilt up warehouse east of Downtown",
        "landmarks": ["the Wilshire Corridor", "Downtown LA", "Hollywood Boulevard", "Long Beach", "the Port of Los Angeles"],
        "season_pressures": "seismic retrofit obligations under Ordinance 183893 and 184081, drought era water conservation rules, and Santa Ana wind events that stress roof systems",
        "asset_types": "soft story multifamily, Wilshire Corridor Class A office, Downtown converted lofts, and industrial flex in Vernon",
        "regulator_local": "Los Angeles Department of Building and Safety LADBS",
        "wow_fact": "LA carries more pre 1933 unreinforced masonry retrofit obligations than any other US city under Soft Story Ordinance 183893",
    },
    "san-francisco-ca": {
        "name": "San Francisco", "state": "California", "state_abbr": "CA", "country": "United States",
        "lat": 37.7749, "lng": -122.4194, "population": "808 thousand",
        "metro_pop": "4.7 million in the San Francisco Bay Area",
        "climate_short": "marine west coast",
        "climate_full": "marine west coast with cool foggy summers, mild wet winters, and salt air that accelerates exterior corrosion on every coastal asset",
        "neighborhoods": ["SoMa", "the Financial District", "the Mission", "Pacific Heights", "the Sunset", "Bayview"],
        "building_stock": "Victorian and Edwardian wood frame multifamily, Mandatory Soft Story Program retrofits, pre 1989 concrete office, and converted industrial in SoMa and Dogpatch",
        "landmarks": ["the Financial District", "SoMa", "the Embarcadero", "the Mission", "the Presidio"],
        "season_pressures": "seismic retrofit obligations under the Mandatory Soft Story Program, marine air corrosion on copper and steel, and atmospheric river events that overwhelm storm drainage",
        "asset_types": "soft story multifamily, SoMa converted lofts, Financial District Class A office, and biotech lab in Mission Bay",
        "regulator_local": "San Francisco Department of Building Inspection DBI",
        "wow_fact": "San Francisco runs the largest Mandatory Soft Story Program in North America with over 4,800 buildings retrofitted to date",
    },
    "san-diego-ca": {
        "name": "San Diego", "state": "California", "state_abbr": "CA", "country": "United States",
        "lat": 32.7157, "lng": -117.1611, "population": "1.4 million",
        "metro_pop": "3.3 million in the San Diego metropolitan area",
        "climate_short": "Mediterranean with marine layer fog",
        "climate_full": "Mediterranean with mild dry summers, brief winter wet season, and marine layer fog that drives morning condensation on coastal buildings",
        "neighborhoods": ["Downtown", "La Jolla", "Mission Valley", "North Park", "Pacific Beach", "Sorrento Valley"],
        "building_stock": "Downtown high rise condominium, biotech campus in Sorrento Valley, military adjacent multifamily, and beach community wood frame from Pacific Beach to La Jolla",
        "landmarks": ["the Embarcadero", "Balboa Park", "La Jolla cove", "the Sorrento Valley biotech corridor", "the Convention Center"],
        "season_pressures": "salt corrosion on coastal exteriors, drought era water rationing on irrigation and cooling tower makeup, and Santa Ana wind events on inland canyons",
        "asset_types": "Sorrento Valley biotech, Downtown high rise condominium, Mission Valley retail, and coastal multifamily from Ocean Beach to Pacific Beach",
        "regulator_local": "City of San Diego Development Services",
        "wow_fact": "San Diego biotech sits inside the Sorrento Valley corridor, home to more than 1,200 life science companies and a hard cap on water use for cooling tower makeup",
    },
}


def hashpick(seed_parts, options):
    """Deterministic pick from options based on hashed seed parts."""
    s = "|".join(str(x) for x in seed_parts)
    h = int(hashlib.sha256(s.encode()).hexdigest(), 16)
    return options[h % len(options)]


# City rotation index ensures different cities pick DIFFERENT templates for same (slug, section).
# We rank cities deterministically and use rank to offset the hash result.
def hashpick_rotated(seed_parts, options, slug, city_key, section_key):
    """
    Like hashpick but rotates the index by city-rank for the (slug, section).
    Across a state group sharing the same slug+section, each city's index
    gets a different offset, reducing collisions across same-service different-city pairs.
    """
    # State-relative city rank for this slug+section
    state_abbr = CITIES[city_key]["state_abbr"]
    state_cities = sorted([c for c in CITIES if CITIES[c]["state_abbr"] == state_abbr])
    rank = state_cities.index(city_key) if city_key in state_cities else 0
    base = int(hashlib.sha256(("|".join(str(x) for x in seed_parts) + f"|{section_key}|{slug}").encode()).hexdigest(), 16)
    idx = (base + rank * (1 + (base % (len(options) - 1 or 1)))) % len(options)
    return options[idx]


def hashpick_many(seed_parts, options, k):
    """Pick k distinct items deterministically."""
    s = "|".join(str(x) for x in seed_parts)
    h = hashlib.sha256(s.encode()).digest()
    # rotating-hash selection
    pool = list(options)
    out = []
    for i in range(k):
        if not pool:
            break
        idx = h[i % len(h)] % len(pool)
        out.append(pool.pop(idx))
    return out


def join_oxford(items):
    if not items:
        return ""
    if len(items) == 1:
        return items[0]
    if len(items) == 2:
        return f"{items[0]} and {items[1]}"
    return ", ".join(items[:-1]) + ", and " + items[-1]


# ---------- Variant banks ----------

INTRO_TEMPLATES = [
    # 0
    "Bridge Point Maintenance keeps {vocab_anchor} running for {city} property managers, asset owners, and institutional landlords. "
    "The {city} dispatch desk picks up live, captures the address and the failure mode, and routes a licensed trade against the same work order number we use on every other Bridge Point service line. "
    "{wow_fact}, which puts {city_lower} {label} demand on a year round clock that does not slow down. "
    "Bridge Point dispatch holds the rhythm: one call, one quote, one closeout document on every visit.",
    # 1
    "When a {city} property manager needs {vocab_anchor}, the call lands at a Bridge Point dispatch desk that knows the building before the truck rolls. "
    "Across {neigh_phrase}, our {label} crews handle {scope_sample}, all booked against a single live answer dispatch number. "
    "{wow_fact}, and that scale means our {city_lower} {label} program treats high frequency and high consequence work as the standard, not the exception.",
    # 2
    "Building owners and operators across {city} call Bridge Point for {vocab_anchor} because the dispatch model takes vendor coordination off the property manager. "
    "One number, one work order, one quote, one closeout email. {label} work in {city} ranges across {scope_sample}, and every variation closes inside the same flow. "
    "Property managers running portfolios that touch {asset_phrase} reach the same dispatcher, every time. "
    "{wow_fact}, so the {city_lower} {label} program is sized to absorb the volume without ever passing it back to the owner.",
    # 3
    "Bridge Point dispatches {label} crews into every {city} postal area, from {neigh_phrase_short}. "
    "The desk answers in seconds, scopes the call, routes the trade, and confirms ETA against the {city} coverage board. "
    "{label} work runs against {vocab_anchor} norms, which means {scope_sample}. {wow_fact}, which is why local {city_lower} owners keep the Bridge Point dispatch number on speed dial.",
    # 4
    "{city} {label}, the way Bridge Point runs it: live dispatcher, licensed trade, flat rate quoted on site, photo documented closeout, and audit ready paperwork in inbox inside seven days. "
    "{wow_fact}, and that volume drives a service standard that scales with the asset class. "
    "Across {asset_phrase}, the {city_lower} {label} call books on the same flow whether the issue is an emergency or a planned scope.",
    # 5
    "Property managers, asset owners, and operators across {city} hand the {label} program to Bridge Point because the dispatch desk runs it like a single line of business. "
    "{vocab_anchor} pulls the same trades, the same trucks, the same documentation pattern across every visit. {scope_sample} closes inside the same work order flow. "
    "{wow_fact}, and the program is built to handle the cadence without ever dropping the closeout document.",
    # 6
    "There is a reason {city_lower} owners pin the Bridge Point dispatch line to their phone for {label}: the desk answers and the truck rolls. "
    "{scope_sample} all close on the same work order across every {neigh_phrase_short} address on the account. "
    "{wow_fact}, so {city} dispatch never has to learn the city, only the building.",
    # 7
    "{label} in {city} is a dispatch problem before it is a trade problem. Bridge Point treats it that way. "
    "A real dispatcher answers, scopes the issue, routes the right trade, and stays on the line until the truck is on site. "
    "{wow_fact}, which gives the {city_lower} board the depth to handle the call volume without dropping closeouts.",
]

LOCAL_CONTEXT_TEMPLATES = [
    # 0
    "{city} sits inside a {climate_short} climate. The weather profile drives a predictable workload across every season: {season_pressures}. "
    "On top of seasonal stress, {city_lower} {label} work is regulated under {juris_body}. {juris_summary} "
    "The local building authority is the {regulator_local}, and every Bridge Point work order in {city} is scoped against the permitting requirements before the trade leaves the yard.",
    # 1
    "Inside {city}, the {label} call mix is shaped by climate and building stock. "
    "{climate_full}. That pattern hits {city_lower} building stock made up of {building_stock}, and the calls that follow concentrate on {scope_sample}. "
    "Every Bridge Point {label} visit in {city} runs against {juris_body}, with the {regulator_local} as the AHJ for permitting and inspection signoff.",
    # 2
    "What {city} building owners ask Bridge Point to handle on {label} starts with the climate and ends with the regulator. "
    "{climate_full}. The result is a workload that turns over {scope_sample} on a steady cadence, mostly clustered near {landmark_phrase}. "
    "Compliance runs through {juris_body}. {juris_summary}",
    # 3
    "Bridge Point reads {city} as a {climate_short} market with deep building stock variety. "
    "{building_stock_sentence}. Climate stress shows up as {season_pressures}, and the {label} program absorbs that pressure with stocked trucks staged inside the {city} coverage zone. "
    "Compliance touches every job: {juris_body}, scoped against the {regulator_local} AHJ before any work begins.",
    # 4
    "The reason {city} owners and operators sign on for a Bridge Point {label} program is the local complexity. "
    "{wow_fact}. Combined with {climate_full}, the workload pulls {scope_sample} into a routine cadence. "
    "Bridge Point holds the {regulator_local} permit relationships and runs every scope under {juris_body} compliance.",
    # 5
    "{city_lower} {label} demand is concentrated around {landmark_phrase}. Asset classes in those zones include {asset_phrase}. "
    "Climate stress, mostly {season_pressures}, runs the failure cycle on equipment and envelope. "
    "Bridge Point holds {juris_body} compliance posture and {regulator_local} permitting muscle inside the {city} coverage area.",
    # 6
    "The {city_lower} {label} market reflects the city it sits in. {wow_fact}. "
    "The buildings on the dispatch board are mostly {building_stock}. Climate adds {season_pressures} on top of that base. "
    "Bridge Point runs the program under {juris_body} with {regulator_local} permits filed inside the scope of work.",
    # 7
    "Every Bridge Point {label} call into {city} ties into three local realities at once: climate, building stock, and the AHJ. "
    "{climate_full}. {wow_fact}. {juris_summary} The dispatch desk holds all three inside the same work order template.",
]

DETAILS_TEMPLATES = [
    # 0
    "A Bridge Point {label} call in {city} covers {scope_sample}. Every scope is walked on site first. The trade photographs the failure or the condition, writes the scope against the work order, and quotes a flat rate before tools come out. "
    "Approve the quote in person or forward it to the property manager. The trade closes the work, runs a final photo log, and writes the license number on the closeout document. "
    "Permitting through {juris_body} runs through the same dispatcher when the work requires it. The follow up filing with the {regulator_local} closes inside the published window.",
    # 1
    "Inside the {city} {label} program, scope covers {scope_sample}. The dispatch desk routes the right truck for the issue, and the trade arrives stocked for first visit completion on the high frequency work. "
    "Standard deliverables include {deliverable_sample}, all shipped to the inbox inside seven days. "
    "Compliance follows {juris_body}, with permits filed and inspections booked through the {regulator_local} as the work requires.",
    # 2
    "Scope on a {city} {label} dispatch runs through {scope_sample}. Every job opens with a live dispatcher capturing the address and the issue, closes with a photo documented work order, and books permit follow up against {juris_body} when the work needs it. "
    "Trucks roll out of the local Bridge Point yard with parts staged for the most common {city_lower} failure modes: {failure_sample}. "
    "Recurring {city} portfolios sign on for master account billing with one dispatch number across every address.",
    # 3
    "When a {city} owner calls Bridge Point for {label}, the work runs through a documented sequence. The dispatcher answers, captures the scope, and routes the licensed trade. "
    "Common scopes on the {city} board include {scope_sample}. Closeout deliverables typically include {deliverable_sample}, written against {juris_body} compliance and filed with the {regulator_local} when needed. "
    "Pricing runs on flat rate quotes for one off work and fixed monthly programs for recurring portfolios.",
    # 4
    "A {city_lower} {label} call from Bridge Point covers {scope_sample}, sequenced through a standard flow that holds across every asset class on the dispatch board. "
    "The trade walks the issue, photographs the condition, quotes a flat rate, and closes out with the documentation package the property manager needs for the file. "
    "Standard outputs include {deliverable_sample}. Permitting and inspection signoff with the {regulator_local} run as part of the scope when the work calls for it.",
    # 5
    "Bridge Point {label} dispatch into {city} covers the trade scopes that property managers run every week: {scope_sample}. "
    "The crew arrives with stocked trucks for first visit completion, walks the issue with the manager or tenant, and books the follow up paperwork against {juris_body}. "
    "Common deliverables are {deliverable_sample}, all filed to the work order log so the property manager can pull the trail in one place.",
    # 6
    "Inside the {city} dispatch board, {label} ranges through {scope_sample}. The dispatcher pulls the trade ticket that matches the issue. The truck arrives parts stocked for the most common {failure_sample} encountered on {asset_first} stock in {city}. "
    "Photos, scope, license number, and line item invoice ship as the closeout deliverable inside seven days.",
    # 7
    "The shape of a Bridge Point {label} engagement in {city_lower}: one dispatch number, one work order, one trade ticket, one closeout document. Scope ranges across {scope_sample}. "
    "On the high frequency calls, the trade closes the work in a single visit. On the deeper scopes, the project sequence runs against the same account number with daily photo logs.",
]

# Bank of paragraphs per H2 theme. Keyed by theme detection from the H2 title.
H2_THEME_BANKS = {
    "service_types_or_areas": [
        "Across {city}, Bridge Point dispatches into {asset_phrase}. Each property class pulls a different mix of {label_lower} work. Portfolios that combine multiple property classes inside one account see the most efficient response time because the dispatcher knows the call history on every building. {wow_fact}, so the program already handles that scale.",
        "{city} owners run buildings across {asset_phrase}. Bridge Point holds named insured certificates of insurance and the right {juris_body} license posture for each. Whether the call lands on a {asset_first} property or a logistics warehouse, the dispatcher uses the same work order template and the trade rolls with the same stocked truck baseline.",
        "Bridge Point reads {city_lower} as five distinct asset classes: {asset_phrase}. The {label_lower} program adapts the scope to the building, not the other way around. Class A office calls take a different parts list than soft story multifamily. Both close on the same dispatch number.",
        "Asset class shapes the {city_lower} {label_lower} call. {asset_phrase}, each with its own parts list and trade ticket profile. Bridge Point trucks roll out of the {city} yard stocked for the most common scope on the dispatch board for each asset class.",
        "Whichever asset class an owner runs in {city}, the {label_lower} dispatch model holds. {asset_phrase}. Bridge Point reads the building before the truck rolls. The {scope_sample} backlog handles asset class specifics inside one work order.",
        "Across the {asset_phrase} mix in {city}, Bridge Point treats {label_lower} as a single dispatchable service line. The dispatcher knows the building, the trade knows the scope, the property manager sees the closeout. {wow_fact}.",
    ],
    "program_includes": [
        "A Bridge Point {label_lower} program in {city} bundles {scope_sample} on a single dispatch number. Recurring rounds are scheduled by asset class with photo logged checklists. Reactive calls book against the same account with priority routing. Capital planning support pulls the photo log forward into a five year reserve study so the owner can budget against documented condition data.",
        "The {city_lower} {label_lower} program covers planned and reactive work on one account: {scope_sample}. Each work type has its own checklist and its own deliverable. Monthly KPI reviews are available for portfolios with multiple {city} addresses on the same master account.",
        "Bridge Point ships every {city_lower} {label_lower} program with three baseline outputs: {deliverable_sample}. Property managers can scope deeper diagnostics or capital reserve studies on top, and the {regulator_local} permit work folds into the same engagement.",
        "What you get from a {city_lower} {label_lower} program: scheduled preventive rounds, reactive call routing, photo documented closeout on every visit, and recurring KPI reviews. Scope is built up from the {scope_sample} baseline. Capital reserve support runs on request.",
        "Inside a {city_lower} {label_lower} engagement, Bridge Point lines up {scope_sample_alt} on a recurring cadence and routes one off urgent work against the same account. The dispatcher carries the call history, so the trade who shows up already knows the building.",
        "Every {city} {label_lower} program ships with a documented intake, a scope of work memo, and a monthly closeout package. Standard outputs include {deliverable_sample}. The {regulator_local} permitting trail is folded in when the scope calls for it.",
    ],
    "preventive_vs_reactive": [
        "Property managers in {city} choose preventive over reactive after one major failure event. The cost gap between a scheduled coil clean and an emergency {failure_first_word} swap on a {asset_first} can run ten to one on labor alone. Bridge Point publishes a five year preventive versus reactive cost model so {city_lower} owners can put numbers against the maintenance program before signing.",
        "Reactive {label_lower} work in {city} costs the building owner three to ten times what the same scope costs on a planned cadence. After hours dispatch fees, expedited parts, tenant displacement, insurance deductibles, all stack on the invoice. Bridge Point preventive programs close that gap by scheduling the work before failure.",
        "The math on {city_lower} preventive {label_lower} is straightforward. A scheduled visit closes inside one work window. A reactive emergency call pulls premium labor, expedited parts, after hours dispatch fees, and downstream tenant claims. Bridge Point preventive programs price in advance so the owner sees the spread in writing.",
        "{city} owners who run reactive {label_lower} only pay for it twice: once at premium emergency rates and again on the secondary damage. The Bridge Point preventive model swaps that pattern for a scheduled visit cadence with documented condition data.",
        "A five year preventive {label_lower} program in {city} usually runs at thirty to fifty percent of the same scope handled reactively. The savings show up in labor rate, parts cost, tenant claims avoided, and insurance deductible exposure. Bridge Point models that math before contract signing.",
    ],
    "janitorial": [
        "Lobby, washroom, and floor care in {city} runs on a daily or weekly cadence depending on the asset class. Bridge Point day porters work the common areas of {asset_first} buildings in {neigh_phrase_short}, and every visit gets a checklist signoff filed into the work order log.",
        "Common area upkeep on the {city_lower} program covers lobby polish, washroom restocks, glass and floor care, and light janitorial cleanup on the high traffic asset classes. The day porter route is set against the building's tenant traffic pattern.",
        "Bridge Point folds common area work into the same {city_lower} dispatch account that handles {label_lower}. One contact, one invoice, one closeout trail. Day porters file checklist signoffs against the work order log every visit.",
    ],
    "trades_network": [
        "The trades network behind {city_lower} {label_lower} dispatch runs every licensed scope inside one program. Plumbing, electrical, HVAC, drywall, lighting, ceiling repair, and minor mechanical work all close out on the same work order. {juris_body} compliance carries through every visit and the license number prints on the closeout.",
        "Licensed trades run the {city_lower} {label_lower} workload. The dispatcher pulls the trade that matches the issue: plumbing, electrical, HVAC, drywall, lighting, locksmith, ceiling, mechanical. Every visit prints the trade license number on the closeout paperwork filed against {juris_body}.",
        "{city} {label_lower} dispatch holds depth across every licensed trade we touch on a building. Plumbing, electrical, HVAC, drywall and paint, carpentry, locksmith, lighting controls. License numbers, COI, and permit history file against {juris_body} on every visit.",
        "Trade selection on a {city} {label_lower} call is automated against the issue the dispatcher captures. The right ticket holder rolls with the right truck. Every license number prints on the work order. {juris_body} compliance writes through the closeout.",
    ],
    "exterior_seasonal": [
        "Exterior maintenance in {city} is driven by {climate_short} season pressures. {season_pressures_cap}. Bridge Point coordinates snow, salting, landscaping, parking lot care, pressure washing, and graffiti removal on a single dispatch line so the property manager never juggles multiple seasonal vendors.",
        "Seasonal exterior work in {city_lower} climbs in the {climate_short} cycle. {season_pressures_cap}. Bridge Point books snow contracts, landscape rounds, exterior cleanup, and parking lot drainage on one account so portfolios that span {neigh_phrase} run on the same vendor footprint.",
        "The {city_lower} exterior maintenance calendar is set by climate, not by chance. {season_pressures_cap}. Bridge Point holds the seasonal vendor mix inside the same dispatch number that runs the {label_lower} program so the property manager has one trail instead of six.",
    ],
    "emergency_response": [
        "Bridge Point holds a 60 minute on site target inside core {city} zones for emergency {label_lower} calls. Live dispatcher answers in seconds, captures the address, routes the nearest stocked truck, and stays on the line until the trade is on site. After hours rates publish in advance so there is no surprise on the invoice.",
        "The {city_lower} emergency line runs the same {label_lower} crews that handle the planned work. Twenty four hour dispatch, a target on site arrival inside 60 minutes for core zones, and published after hours rates so the property manager knows the cost before the truck rolls.",
        "Twenty four hour {label_lower} dispatch into {city} covers the failure modes that cannot wait: {failure_sample}. The dispatcher captures the address, the issue, and the property type and routes a stocked truck. ETA writes to the work order and texts to the caller before arrival.",
        "Emergency {label_lower} in {city} runs on a live answer, no callback queue, no shortcut to a dispatch board. A real {city} dispatcher stays on the line with the caller until the truck is on site. After hours rates are quoted before the trade rolls.",
    ],
    "compliance_safety": [
        "Every Bridge Point trade in {city} carries named insured certificates of insurance, the relevant {juris_body} license, and proof of workplace safety registration. COI documentation is emailed to the property manager on request before the trade ever rolls. Asset managers running portfolios use the standing COI file as audit ready proof for every {city} address.",
        "Compliance is the foundation of the {city_lower} {label_lower} program. {juris_body} regulates the trade work. Bridge Point holds the license, the COI, and the permitting muscle to keep the program inside the lines. Every closeout work order references the standards the work was performed against.",
        "The Bridge Point {city_lower} compliance stack carries certificates of insurance with the named insured endorsement, the {juris_body} license, workplace safety clearance, and proof of training tickets for every trade. Property managers can pull the COI for any address from the standing file.",
    ],
    "pricing_contract": [
        "Pricing for {city} {label_lower} runs on three options: fixed monthly programs for portfolios on a recurring cadence, time and materials for one off or unscoped emergency work, and project pricing for capital scopes. No long term contract is required to start.",
        "Bridge Point {city_lower} {label_lower} pricing comes in three shapes. Fixed monthly works for portfolio property managers. Time and materials works for one off scopes. Project pricing works for capital reserve work. The dispatcher walks each option on the first call.",
        "There is no contract minimum on the {city_lower} {label_lower} program. {city} owners can book one call, scope a single capital project, or sign on for a fixed monthly recurring schedule. Pricing models are walked on the intake call, in writing before any commitment.",
    ],
    "process_reporting": [
        "Every {city} work order moves through the same four step flow: live dispatcher captures the address and the issue, licensed trade is routed with stocked truck, flat rate is quoted on site before any tools come out, and a photo documented closeout work order emails inside seven days. Monthly KPI reviews are available for portfolio accounts running multiple addresses inside the {city} coverage zone.",
        "The Bridge Point {city_lower} process runs in four documented steps. The dispatcher answers and scopes. The trade rolls and quotes. The work closes and photographs. The work order packages and emails. Monthly portfolio KPI reviews are available for property managers running multiple {city} addresses against the same master account.",
        "Process discipline is what scales {city_lower} {label_lower} accounts cleanly. Live answer, scoped intake, dispatched ticket, on site quote, work performed, photo log, license number, closeout email. Every step files against the same work order so the trail stays in one place.",
    ],
    "why_choose": [
        "Property managers in {city} pick Bridge Point because the dispatch model removes the vendor coordination burden. One number, one work order, one invoice, and one closeout document across every trade that touches the building. {asset_first} portfolios route every issue against the same account, and the dispatcher knows the building history before the call even ends.",
        "What separates Bridge Point inside the {city_lower} market is the single line of business posture. Every trade we run answers to the same dispatcher. Property managers see one invoice, one work order trail, one COI file, one license number list. The portfolio runs lighter as a result.",
        "The Bridge Point edge in {city_lower} {label_lower} is the dispatch model itself. Owners who used to chase six vendors now call one number. The work order trail consolidates. Compliance posture lives inside one file. Monthly closeouts package on a single PDF.",
    ],
    "service_areas": [
        "Bridge Point {label_lower} coverage runs from {neigh_phrase} across {city} and the surrounding {state} service zone. Coverage time inside the dispatch board updates in real time, and the dispatcher confirms on site target before the truck rolls. Portfolios spanning multiple {city} addresses run on a single master account.",
        "The {city_lower} coverage map for Bridge Point {label_lower} spans {neigh_phrase}. The dispatcher coverage board updates as trucks check in across the day, so the on site target the property manager gets is real time, not a generic promise.",
        "{label} dispatch in {city} covers {neigh_phrase}. Portfolios with multiple addresses stack on one account. The dispatcher pulls coverage time from the live board on every call rather than quoting from a static map.",
    ],
    "reviews_results": [
        "Bridge Point ships post visit photo logs and customer satisfaction signoffs after every {city} {label_lower} job. Case files from {neigh_phrase_short} addresses are referenced when {city_lower} property managers ask for proof of similar scope work. Asset managers can pull the {city} performance reports filed against their portfolio at any time.",
        "Proof on the {city_lower} {label_lower} program comes from the work order log. Photo documented closeout on every job, license numbers filed against {juris_body}, and named contact references from {city} property managers running multi address portfolios.",
        "Case studies on Bridge Point {city_lower} {label_lower} work read directly from the work order log. Photo before, photo after, license number on file, COI on file, scope of work signed, line item invoice attached. Reference calls available to {city} property managers evaluating the program.",
    ],
}


def detect_h2_theme(h2):
    t = h2.lower()
    if ("service" in t and ("types" in t or "facility" in t or "areas" in t)) or "facility types" in t or "service area" in t:
        if "area" in t:
            return "service_areas"
        return "service_types_or_areas"
    if "program" in t and ("include" in t or "covers" in t):
        return "program_includes"
    if "preventive" in t and "reactive" in t:
        return "preventive_vs_reactive"
    if "janitor" in t or "common area" in t:
        return "janitorial"
    if "handyman" in t or "trade" in t or ("hvac" in t and "electrical" in t):
        return "trades_network"
    if "exterior" in t or "seasonal" in t or "snow" in t:
        return "exterior_seasonal"
    if "emergency" in t or "24" in t or "24/7" in t:
        return "emergency_response"
    if "compliance" in t or "insurance" in t or "safety" in t:
        return "compliance_safety"
    if "pricing" in t or "contract" in t:
        return "pricing_contract"
    if "process" in t or "audit" in t or "reporting" in t:
        return "process_reporting"
    if "why" in t or "choose" in t:
        return "why_choose"
    if "service area" in t:
        return "service_areas"
    if "review" in t or "case" in t or "result" in t:
        return "reviews_results"
    return None


def render_template(tpl, ctx):
    out = tpl
    for k, v in ctx.items():
        out = out.replace("{" + k + "}", str(v))
    return out


def html_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def build_ctx(slug, city_key):
    c = CITIES[city_key]
    sa = c["state_abbr"]
    juris = JURISDICTIONS[sa][slug]
    vocab = SERVICE_VOCAB[slug]
    label = SERVICE_LABELS[slug]
    label_lower = label.lower()

    # Per-page deterministic scope sample (4 of vocab.noun_phrases)
    scope_items = hashpick_many([city_key, slug, "scope"], vocab["noun_phrases"], 4)
    deliverable_items = hashpick_many([city_key, slug, "deliv"], vocab["deliverables"], 3)
    failure_items = hashpick_many([city_key, slug, "fail"], vocab["failure_modes"], 3)
    neigh_short = c["neighborhoods"][:3]
    neigh_long = c["neighborhoods"]

    ctx = {
        "city": c["name"],
        "city_lower": c["name"].lower(),
        "state": c["state"],
        "state_abbr": sa,
        "label": label,
        "label_lower": label_lower,
        "scope_sample": join_oxford(scope_items),
        "deliverable_sample": join_oxford(deliverable_items),
        "failure_sample": join_oxford(failure_items),
        "failure_first_word": (failure_items[0].split()[0] if failure_items else "RTU"),
        "neigh_phrase": join_oxford(neigh_long[:5]),
        "neigh_phrase_short": join_oxford(neigh_short),
        "landmark_phrase": join_oxford(c["landmarks"][:3]),
        "asset_phrase": c["asset_types"],
        "asset_first": c["asset_types"].split(",")[0].strip().lower(),
        "wow_fact": c["wow_fact"],
        "building_stock": c["building_stock"],
        "building_stock_sentence": (c["building_stock"][0].upper() + c["building_stock"][1:]),
        "climate_short": c["climate_short"],
        "climate_full": c["climate_full"],
        "season_pressures": c["season_pressures"],
        "season_pressures_cap": c["season_pressures"][0].upper() + c["season_pressures"][1:],
        "regulator_local": c["regulator_local"],
        "juris_body": juris["body"],
        "juris_summary": juris["summary"],
        "vocab_anchor": vocab["kw_anchor"],
    }
    return ctx, c, juris, vocab


def intro_text(slug, city_key):
    ctx, c, juris, vocab = build_ctx(slug, city_key)
    tpl = hashpick_rotated([city_key, slug, "intro"], INTRO_TEMPLATES, slug, city_key, "intro")
    return render_template(tpl, ctx)


def local_context_text(slug, city_key):
    ctx, c, juris, vocab = build_ctx(slug, city_key)
    tpl = hashpick_rotated([city_key, slug, "local"], LOCAL_CONTEXT_TEMPLATES, slug, city_key, "local")
    return render_template(tpl, ctx)


def details_text(slug, city_key):
    ctx, c, juris, vocab = build_ctx(slug, city_key)
    tpl = hashpick_rotated([city_key, slug, "details"], DETAILS_TEMPLATES, slug, city_key, "details")
    return render_template(tpl, ctx)


def faq_set(slug, city_key):
    ctx, c, juris, vocab = build_ctx(slug, city_key)
    cn = c["name"]
    label = SERVICE_LABELS[slug]
    label_lower = label.lower()
    sa = c["state_abbr"]

    # Per-service FAQ banks (vary by service so same-city different-service diverges)
    banks = {
        "facility-maintenance": [
            ("What is included in a {city_lower} facility maintenance program?",
             "A Bridge Point facility maintenance program in {cn} bundles preventive rounds, reactive call routing, common area upkeep, monthly KPI reporting, and capital reserve photo logs. Property managers run the work against one dispatch number with monthly summary reports."),
            ("How does Bridge Point keep facility maintenance costs predictable in {cn}?",
             "Fixed monthly programs lock the recurring work into a known number. One off scopes price flat rate. Capital work prices by project. The dispatcher walks the model on the first call so {cn} owners know the pricing structure before any commitment."),
            ("Can a {cn} portfolio consolidate facility vendors under one Bridge Point account?",
             "Yes. Master account billing pulls multiple {cn} addresses under one invoice and one work order trail. Property managers stop chasing six separate vendors for monthly closeouts."),
            ("Does Bridge Point handle capital reserve planning for {cn} buildings?",
             "Yes. The condition data from every preventive round feeds into a rolling five year reserve study. Engineers can pull the report any time the building gets refinanced or repositioned."),
            ("Can Bridge Point run a facility program for {cn} mixed use buildings?",
             "Yes. Mixed use stock with ground floor retail plus residential or office above runs against one work order log. The dispatcher routes scope to the right trade and the right tenant zone."),
            ("Does Bridge Point cover after hours service requests in {cn}?",
             "Yes. The same dispatch number handles overnight and weekend tenant calls. Published after hours rates email to the property manager up front so there is no surprise."),
            ("Does Bridge Point handle elevator maintenance coordination in {cn}?",
             "Bridge Point does not service elevators directly but coordinates with the third party elevator vendor on annual inspection scheduling, breakdown calls, and capital replacement planning."),
            ("Can Bridge Point manage roof inspections on {cn} buildings?",
             "Yes. Twice yearly roof condition surveys with drone photo capture and infrared moisture mapping run inside the standing program. Findings feed into the capital reserve plan."),
            ("Does Bridge Point handle pest control coordination in {cn}?",
             "Yes. Quarterly pest control rounds, IPM documentation, and tenant complaint response coordinate through the same dispatch desk that handles every other maintenance line."),
            ("Can Bridge Point run security and access system maintenance in {cn}?",
             "Yes. Card reader battery replacement, lock cylinder rekeying, CCTV camera service, and intercom troubleshooting all close inside the facility maintenance program."),
        ],
        "plumber": [
            ("Does Bridge Point handle frozen pipe emergencies in {cn}?",
             "Yes. Burst supply line and frozen line response runs through the same dispatcher that handles planned plumbing work. Trucks roll with PEX, copper fittings, and torch kits staged for first visit completion."),
            ("Can Bridge Point replace plumbing in occupied {cn} buildings?",
             "Yes. Crews coordinate with property management to schedule occupied building plumbing replacement against tenant notice requirements. Work is staged to minimize service interruption."),
            ("Does Bridge Point do backflow preventer testing in {cn}?",
             "Yes. Annual backflow testing certificates are filed with the local water purveyor on the published schedule. Test reports email to the property manager and to the purveyor in the format the AHJ requires."),
            ("Does Bridge Point run sewer camera inspection in {cn}?",
             "Yes. High definition sewer cameras with locator transmitters map the line, identify break points, and produce a video file packaged with the work order."),
            ("Can Bridge Point install commercial water heaters in {cn}?",
             "Yes. Tank and tankless commercial water heater replacement closes inside one or two visits depending on venting and gas piping work. Warranty registration ships with the closeout."),
            ("Does Bridge Point handle grease trap pumping for {cn} restaurants?",
             "Yes. Grease trap pumping, line jetting, and waste manifest filing run on a scheduled cadence. Pump out reports go to the food service tenant and to the local water authority."),
            ("Does Bridge Point service domestic hot water plants in {cn}?",
             "Yes. Tank type and instantaneous commercial hot water plants service through annual flushes, anode rod swaps, thermostatic mixing valve calibration, and recirculation loop balancing."),
            ("Can Bridge Point trench new water service to a {cn} building?",
             "Yes. New water service runs from the municipal main to the building entry close through the same dispatch account that handles interior plumbing. Permits and meter coordination handle through the local water purveyor."),
            ("Does Bridge Point install grease interceptors in {cn} commercial kitchens?",
             "Yes. Under sink and in ground grease interceptor installs run against the local plumbing code and the food service health department permit. Interceptor sizing comes from anticipated flow data."),
            ("Can Bridge Point fix sewer ejector pumps in {cn} basements?",
             "Yes. Sewer ejector and sump pump service, float switch replacement, and pit cleaning run on a planned cadence or on an emergency call. Trucks stage with stocked replacement pump units."),
        ],
        "electrician": [
            ("Does Bridge Point pull permits for {cn} electrical work?",
             "Yes. ESA notification in Ontario or AHJ permits in California are filed before the work starts. The inspection signoff returns to the property manager as part of the closeout package."),
            ("Does Bridge Point install EV chargers in {cn}?",
             "Yes. Level 2 and DC fast charger installs run through the same crew that handles panel work. Load calculation, service capacity check, AHJ permit, and final inspection sign off all package into one work order."),
            ("Can Bridge Point work on {cn} commercial service panels live?",
             "Most service panel work is done with the gear de energized for safety. When live troubleshooting is required, the electrician runs the work to the AHJ live work permit and PPE standard."),
            ("Does Bridge Point service exit and emergency lighting in {cn}?",
             "Yes. Annual exit and emergency lighting inspection runs against the fire code requirement. Battery replacement, head replacement, and lamp swaps all close on the same work order."),
            ("Can Bridge Point install backup generators for {cn} buildings?",
             "Yes. Diesel and natural gas standby generators install with automatic transfer switch tie in, fuel delivery, and AHJ commissioning. Annual load bank testing ships as part of the maintenance program."),
            ("Does Bridge Point upgrade {cn} fire alarm systems?",
             "Yes. Fire alarm panel upgrades, addressable initiating device installation, and notification appliance work all run under the local fire marshal permitting."),
            ("Does Bridge Point handle electrical panel relocation in {cn}?",
             "Yes. Service entrance or subpanel relocation runs with utility coordination, temporary power planning, and the local AHJ permit. Most relocations close inside a planned weekend window."),
            ("Can Bridge Point upgrade lighting to LED in {cn} commercial buildings?",
             "Yes. LED retrofit projects include fixture selection, rebate program coordination, install, and post install measurement and verification for any utility rebate program."),
            ("Does Bridge Point install electric vehicle infrastructure for {cn} parking structures?",
             "Yes. Multi port Level 2 and DC fast charger banks install with networking, payment integration, and service entrance upgrades when capacity demands."),
            ("Can Bridge Point integrate {cn} buildings with utility demand response programs?",
             "Yes. Bridge Point electricians install metering equipment, load control hardware, and BAS integration that lets {cn} buildings enroll in demand response and earn the rebate."),
        ],
        "hvac": [
            ("Does Bridge Point do RTU compressor swaps in {cn}?",
             "Yes. RTU compressor and condenser replacement is one of the highest frequency Bridge Point {cn} HVAC scopes. Trucks stage with EPA Section 608 recovery gear, leak detection, and brazing kit for first visit completion."),
            ("Does Bridge Point handle Title 24 compliance for {cn} HVAC retrofits?",
             "Yes. Title 24 Part 6 commissioning paperwork files as part of the install closeout. The signed compliance form returns to the property manager and to the building department as required."),
            ("Does Bridge Point handle gas appliance work in {cn}?",
             "In Ontario, G1 G2 and G3 ticket holders run gas appliance work under TSSA. In California, EPA certified technicians handle refrigerant and gas appliance scopes inside the CSLB C 20 license."),
            ("Can Bridge Point service commercial boilers in {cn}?",
             "Yes. Cast iron, mod con, and commercial boiler tuning, combustion analysis, water treatment, and TSSA inspection support all run inside the standing HVAC program."),
            ("Does Bridge Point service chillers and cooling towers in {cn}?",
             "Yes. Air and water cooled chillers, cooling tower fill replacement, blowdown management, and chemical treatment cycles all run inside one program for {cn} commercial accounts."),
            ("Can Bridge Point install ductless mini splits in {cn}?",
             "Yes. Ductless single and multi zone systems install for office partitions, server room cooling, and tenant build out work."),
            ("Does Bridge Point service rooftop economizers in {cn}?",
             "Yes. Economizer linkage actuators, outside air dampers, and controls retrofit run during the spring shoulder season when cooling demand drops and access is easier."),
            ("Can Bridge Point install variable refrigerant flow systems in {cn}?",
             "Yes. VRF heat pump installs for tenant build out work or partial floor replacement come with refrigerant pressure tests, controls programming, and post install commissioning to the manufacturer standard."),
            ("Does Bridge Point handle indoor air quality testing in {cn}?",
             "Yes. CO2 monitoring, particulate counts, filtration upgrades, and UVC light installation address {cn} indoor air quality concerns inside the standing HVAC program."),
            ("Can Bridge Point integrate {cn} HVAC with the building automation system?",
             "Yes. BACnet, Modbus, LonWorks, and proprietary BAS integration run with the manufacturer rep when needed. Programming, point mapping, and trend log setup ship with the closeout."),
        ],
        "commercial-contracting": [
            ("How fast can Bridge Point reach a {cn} emergency building repair call?",
             "Live answer on the dispatch line. Emergency calls inside core {cn} zones target on site arrival inside 60 minutes when conditions allow. After hours rates publish in advance."),
            ("Does Bridge Point coordinate with insurance carriers on {cn} claims?",
             "Yes. Make safe photo logs, scope of loss documentation, and follow up structural letters file in the format the insurance carrier requires."),
            ("Can Bridge Point pull emergency repair permits in {cn}?",
             "Yes. Emergency work that protects the building or the occupants can start without a pre issued permit. The follow up filing with the local building department closes inside the published window."),
            ("Does Bridge Point handle water damage restoration in {cn}?",
             "Yes. Extraction, structural drying, mould prevention, and rebuild prep all run on the same emergency dispatch. Moisture meter mapping ships with the closeout."),
            ("Can Bridge Point respond to {cn} storm damage events?",
             "Yes. Wind, water, ice, and impact damage triage. Tarping, board up, fence installation, and structural shoring all close inside one mobilization when the call comes in fast."),
            ("Does Bridge Point handle fire damage cleanup in {cn}?",
             "Yes. Smoke and soot removal, structural shoring, content protection, and rebuild scoping all run inside one dispatch account."),
            ("Can Bridge Point handle biohazard cleanup in {cn}?",
             "Yes. Sewer backup, bloodborne pathogen, and biohazard cleanup work runs against the WHMIS or OSHA standard. Disposal manifests file with the local hazardous waste authority."),
            ("Does Bridge Point handle building stabilization after vehicle impact in {cn}?",
             "Yes. Storefront or parking garage vehicle impact triage includes structural assessment, temporary shoring, glass removal, and rebuild scoping. Police and insurance documentation packages with the work."),
            ("Can Bridge Point provide temporary fencing for {cn} emergency sites?",
             "Yes. Temporary chain link, snow fence, and construction barricade install run on emergency dispatch with same day delivery in core {cn} zones."),
            ("Does Bridge Point handle environmental decontamination in {cn}?",
             "Yes. Mould remediation, lead and asbestos abatement coordination, and post incident environmental cleanup file through certified subcontractors under one Bridge Point work order."),
        ],
    }

    # Universal cross-service questions
    universal = [
        ("Do you serve every {cn} postal area on {label_lower}?",
         "Yes. {label} dispatch covers {neigh_phrase_short} and every other {cn} postal area. Tell the dispatcher the address and we confirm the on site target before any truck rolls."),
        ("Are your {cn} {label_lower} crews licensed?",
         "Yes. Every {label_lower} visit in {cn} runs with a trade carrying the licenses the work requires under {juris_body}. The license number is printed on every closeout work order."),
        ("What documentation do I get after the visit?",
         "A closeout work order with before and after photographs, the license number of the trade who ran the call, scope of work, and a line item invoice. Inbox delivery within seven days, audit ready for asset managers and insurance claims."),
    ]

    # Rotated picks across cities for same (state, slug)
    svc_specific = banks[slug]
    state_cities = sorted([cc for cc in CITIES if CITIES[cc]["state_abbr"] == c["state_abbr"]])
    rank = state_cities.index(city_key) if city_key in state_cities else 0
    n = len(svc_specific)
    # Stride 2 with rank shift -> each rank picks 5 unique indices, max overlap 1 across adjacent ranks.
    indices_svc = [(rank * 2 + i) % n for i in range(5)]
    chosen_uni = hashpick_many([city_key, slug, "faq_uni"], list(range(len(universal))), 1)
    items = [svc_specific[i] for i in indices_svc] + [universal[i] for i in chosen_uni]

    rendered = []
    fctx = dict(ctx)
    fctx["cn"] = cn
    for q, a in items:
        rq = render_template(q, fctx)
        ra = render_template(a, fctx)
        rendered.append({"q": rq, "a": ra})
    return rendered


def bold_entities_in_html(html_text, ent_bank):
    """Wrap each entity in <strong> first occurrence only."""
    out = html_text
    for ent in sorted(ent_bank, key=len, reverse=True):
        if not ent or len(ent) < 4:
            continue
        # Avoid double wrap
        pattern = re.compile(
            r"(?<!<strong>)(?<!<strong>\s)(\b" + re.escape(ent) + r"\b)(?!\s*</strong>)",
            re.IGNORECASE,
        )
        out, n = pattern.subn(r"<strong>\1</strong>", out, count=1)
    return out


def deep_dive_html(slug, city_key, brief):
    ctx, c, juris, vocab = build_ctx(slug, city_key)
    cn = c["name"]
    label = SERVICE_LABELS[slug]
    label_lower = label.lower()

    bp = brief["synthesized_blueprint"]
    h2s_full = bp.get("target_h2_outline", [])
    h3_map = bp.get("target_h3_outline_per_h2", {})

    # Per-city H2 subset selection: drop a city-rotated subset to break symmetry on
    # same-state same-service pages. Always keep "Service Areas" and "Services" themed H2s.
    state_abbr = c["state_abbr"]
    state_cities = sorted([cc for cc in CITIES if CITIES[cc]["state_abbr"] == state_abbr])
    rank = state_cities.index(city_key) if city_key in state_cities else 0

    droppable = [h for h in h2s_full if not any(k in h.lower() for k in ["service area", "frequent", "facility types"])]
    # Drop roughly half of droppable H2s. Each city gets a near-disjoint drop set
    # via interleaved offset windows.
    n_drop = max(3, len(droppable) // 2)
    n_state_cities = len(state_cities) if state_cities else 1
    # Slice the droppable list into n_state_cities equal windows starting at offsets.
    # Each city's KEPT set is its window of n_keep H2s; everything else is dropped.
    n_keep = max(2, len(droppable) - n_drop)
    # Different rotation per service so cross-service noise stays
    rot = hashlib.sha256(f"{slug}|drop_base".encode()).digest()[0] % len(droppable)
    start = (rot + rank * n_keep) % len(droppable)
    kept_indices = set((start + i) % len(droppable) for i in range(n_keep))
    to_drop = set(droppable[i] for i in range(len(droppable)) if i not in kept_indices)

    # Reorder remaining H2s using city-specific permutation.
    kept = [h for h in h2s_full if h not in to_drop]
    # Generate a permutation index sequence from hash
    perm_seed = hashlib.sha256(f"{city_key}|{slug}|perm".encode()).digest()
    indices = list(range(len(kept)))
    # Fisher-Yates-ish shuffle using hash bytes
    for i in range(len(indices) - 1, 0, -1):
        j = perm_seed[i % len(perm_seed)] % (i + 1)
        indices[i], indices[j] = indices[j], indices[i]
    h2s = [kept[i] for i in indices]
    bolded = bp.get("bolded_entity_targets", [])
    # Add per-service entities so service differs from city
    bold_set = set(bolded) | set([
        label, vocab["kw_anchor"], juris["body"], juris["regulator"],
    ] + vocab["noun_phrases"][:5] + vocab["deliverables"][:2])

    def fresh_scope(idx, k=3):
        return join_oxford(hashpick_many([city_key, slug, idx, "scope"], vocab["noun_phrases"], k))

    def fresh_deliv(idx, k=2):
        return join_oxford(hashpick_many([city_key, slug, idx, "deliv"], vocab["deliverables"], k))

    def fresh_fail(idx, k=2):
        return join_oxford(hashpick_many([city_key, slug, idx, "fail"], vocab["failure_modes"], k))

    parts = []
    parts.append('<div class="prose-bp deep-dive-grid">')
    lead_options = [
        f"What follows lays out the depth of a Bridge Point {label_lower} program in {cn}: the scope, the standards, the pricing model, and the proof. Every section ties to a real {cn} use case.",
        f"This is the operating model behind a Bridge Point {label_lower} engagement in {cn}. Scope, compliance, pricing, and post visit deliverables, sequenced the way the work actually runs.",
        f"For {cn} property managers and asset owners evaluating a {label_lower} program, the sections below cover what the work looks like inside a Bridge Point dispatch account.",
    ]
    parts.append(f'<p class="deep-dive-lead">{hashpick([city_key, slug, "lead"], lead_options)}</p>')

    # City-only unique paragraph block — high entropy against same-service-different-city
    city_para = hashpick([city_key, slug, "city_detail"], CITY_DETAIL_PARAGRAPHS[city_key])
    parts.append(f'<h2>{html_escape(f"How {cn} shapes the {label_lower} call mix")}</h2>')
    parts.append(f"<p>{city_para}</p>")

    for i, h2 in enumerate(h2s):
        if h2.strip().lower().startswith("frequent"):
            continue
        h2_clean = re.sub(r"\s+", " ", h2).strip().rstrip(": ")
        h2_clean = re.sub(r"\b(Across|In|in)\s+(Ontario|California|the State|California:)\b", lambda m: f"{m.group(1)} {cn}", h2_clean)
        h2_clean = h2_clean.replace("Bridge Point Maintenance", "Bridge Point").replace("Bridgepoint Maintenance", "Bridge Point")
        h2_clean = h2_clean.replace("California:", cn + ":").replace("Ontario:", cn + ":")

        # Per-H2 fresh ctx with new vocab pulls so paragraphs vary across H2s and cities
        h2_ctx = dict(ctx)
        h2_ctx["scope_sample"] = fresh_scope(i, 3)
        h2_ctx["scope_sample_alt"] = fresh_scope(f"{i}-alt", 3)
        h2_ctx["deliverable_sample"] = fresh_deliv(i, 2)
        h2_ctx["failure_sample"] = fresh_fail(i, 2)

        theme = detect_h2_theme(h2)
        if theme and theme in H2_THEME_BANKS:
            bank = H2_THEME_BANKS[theme]
            tpl = hashpick_rotated([city_key, slug, "h2", h2_clean, "para"], bank, slug, city_key, f"h2-{theme}")
            para = render_template(tpl, h2_ctx)
        else:
            generic_bank = [
                f"Bridge Point runs {label_lower} dispatch into {cn} on a documented flow. Property managers see {fresh_scope(f'{i}-g1', 3)} every week. The dispatcher routes the right licensed trade with the right truck for the asset class on the call.",
                f"This part of the {cn} {label_lower} program is built around the scopes property managers ask for most: {fresh_scope(f'{i}-g2', 3)}. Each scope closes inside the same work order so the trail stays in one place.",
                f"For {cn} owners running {h2_ctx['asset_first']} stock, this {label_lower} workflow handles {fresh_scope(f'{i}-g3', 3)} on a single account. {juris['body']} compliance carries through the closeout.",
                f"Property managers in {cn} bring {label_lower} scopes to Bridge Point most often when {fresh_fail(f'{i}-g4', 2)} pull crew time on the same day. The {ctx['regulator_local']} permitting trail closes inside the work order log.",
            ]
            para = hashpick_rotated([city_key, slug, "h2", h2_clean, "para_gen"], generic_bank, slug, city_key, f"h2gen-{h2_clean}")

        # Per-h2 city-specific opener sentence with unique city landmarks/asset specifics.
        landmark_pool = c["landmarks"]
        opener_landmark = hashpick([city_key, slug, h2_clean, "land"], landmark_pool)
        neigh_pool = c["neighborhoods"]
        opener_neigh = hashpick([city_key, slug, h2_clean, "neig"], neigh_pool)
        openers = [
            f"On the {cn} dispatch board, the call pattern around {opener_landmark} sets the cadence for this part of the {label_lower} program.",
            f"In {opener_neigh} and across the broader {cn} coverage zone, this is the scope owners ask Bridge Point to handle.",
            f"For owners running buildings near {opener_landmark}, this section of the {label_lower} program reads as the operating standard.",
            f"From {opener_neigh} south to {hashpick([city_key, slug, h2_clean, 'neig2'], [n for n in neigh_pool if n != opener_neigh])}, Bridge Point holds the same posture on this scope.",
            f"What this looks like on a {cn} address near {opener_landmark}: a documented dispatch flow that does not change between calls.",
        ]
        opener = hashpick([city_key, slug, h2_clean, "opener"], openers)

        parts.append(f'<h2>{html_escape(h2_clean)}</h2>')
        parts.append(f'<p>{opener} {para}</p>')

        # H3 grid
        h3_list = h3_map.get(h2, [])
        if h3_list:
            parts.append('<div class="deep-dive-h3-grid">')
            for j, h3 in enumerate(h3_list[:6]):
                h3_clean = re.sub(r"\s+", " ", h3).strip()
                # Per-(city, service, h2, h3) localized paragraph
                # Fresh per-h3 vocab pulls for variation
                h3_scope = hashpick([city_key, slug, h2_clean, h3_clean, "h3sc"], vocab["noun_phrases"])
                h3_deliv = hashpick([city_key, slug, h2_clean, h3_clean, "h3dl"], vocab["deliverables"])
                h3_fail = hashpick([city_key, slug, h2_clean, h3_clean, "h3fl"], vocab["failure_modes"])
                h3_verb = hashpick([city_key, slug, h2_clean, h3_clean, "h3vb"], vocab["verbs"])
                h3_para_bank = [
                    f"On {cn} accounts, this part of the {label_lower} program logs {h3_scope} against the same work order, with {h3_deliv} on the closeout email.",
                    f"For {ctx['asset_first']} owners in {cn}, this scope pairs with {h3_scope} on the same dispatch visit when the trade is already on site.",
                    f"Inside the Bridge Point {cn} dispatch board, this work routes against the {juris['body']} standard with the license number printed on every closeout. Trade {h3_verb} the issue while the truck is at the address.",
                    f"For {cn} portfolios spanning multiple addresses, this part of the {label_lower} workflow runs against the master account with {h3_deliv} on the consolidated invoice trail.",
                    f"The trade who shows up for this scope in {cn} arrives with the parts stocked for first visit completion on {h3_fail} patterns. {h3_verb.capitalize()} the issue, photograph, quote, close.",
                    f"This scope on the {cn} {label_lower} board pairs {h3_scope} with {h3_deliv} closeout. The trade {h3_verb} the work against the {juris['regulator']} standard.",
                    f"What {cn} property managers see on this part of the {label_lower} engagement: stocked truck, on site walk, flat rate quote, work performed, photo log, license number, line item invoice. {h3_deliv.capitalize()} ships as the deliverable.",
                ]
                h3_para = hashpick([city_key, slug, h2_clean, h3_clean, "h3para"], h3_para_bank)
                parts.append(f'<div class="deep-dive-h3-card"><h3>{html_escape(h3_clean)}</h3><p>{h3_para}</p></div>')
            parts.append('</div>')

    # No template close paragraph — use the rotated CITY_DETAIL second paragraph as the close
    # to add another layer of city-only entropy.
    remaining_city_paras = [pp for pp in CITY_DETAIL_PARAGRAPHS[city_key] if pp != city_para]
    if remaining_city_paras:
        close_para = hashpick([city_key, slug, "close_city"], remaining_city_paras)
        parts.append(f"<h2>Where {label_lower} sits inside the {cn} portfolio call mix</h2>")
        parts.append(f"<p>{close_para}</p>")
    parts.append('</div>')

    html_str = "".join(parts)
    html_str = bold_entities_in_html(html_str, bold_set)
    return html_str


def load_briefs():
    briefs = {}
    for fn in os.listdir(BRIEFS_DIR):
        if not fn.endswith(".json"):
            continue
        with open(BRIEFS_DIR / fn) as f:
            data = json.load(f)
        m = re.match(r"(.*)-(california|ontario)\.json$", fn)
        if not m:
            continue
        service_phrase, state = m.group(1), m.group(2)
        state_abbr = "CA" if state == "california" else "ON"
        briefs[(service_phrase, state_abbr)] = data
    return briefs


def main():
    briefs = load_briefs()
    patch = {}

    for city_key in TARGET_CITIES:
        for slug in TARGET_SLUGS:
            url = f"/{city_key}-{slug}"
            sa = CITIES[city_key]["state_abbr"]
            brief_key = (SERVICE_TO_BRIEF[slug], sa)
            if brief_key not in briefs:
                print(f"MISSING BRIEF {brief_key} for {url}")
                continue
            brief = briefs[brief_key]

            intro = intro_text(slug, city_key)
            local = local_context_text(slug, city_key)
            details = details_text(slug, city_key)
            deep = deep_dive_html(slug, city_key, brief)
            faqs = faq_set(slug, city_key)
            juris = JURISDICTIONS[sa][slug]

            patch[url] = {
                "intro": intro,
                "local_context": local,
                "service_details": details,
                "deep_dive": deep,
                "faq": faqs,
                "authority_citation": {
                    "name": juris["body"],
                    "url": juris["url"],
                    "context": juris["summary"],
                },
                "neighborhoods": CITIES[city_key]["neighborhoods"][:5],
                "jurisdiction": {
                    "body": juris["body"],
                    "statute": juris["statute"],
                    "url": juris["url"],
                },
                "title": f"{SERVICE_LABELS[slug]} in {CITIES[city_key]['name']}, {sa}",
                "service_label": SERVICE_LABELS[slug],
                "meta_description": f"Bridge Point Maintenance {SERVICE_LABELS[slug].lower()} dispatch in {CITIES[city_key]['name']}, {sa}. Licensed crews, flat rate quotes, photo documented closeout. Call 1 855 910 9090.",
            }

    with open(PATCH_JSON, "w") as f:
        json.dump(patch, f, indent=2)
    print(f"Wrote {len(patch)} page patches to {PATCH_JSON}")


if __name__ == "__main__":
    main()
