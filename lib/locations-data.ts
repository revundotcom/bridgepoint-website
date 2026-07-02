// Province / state + city architecture for Bridgepoint Maintenance.
// Coexists with the legacy /locations/[city] route. New pattern is
// /locations/[province]/[city] so we can add depth without breaking
// the GTA-focused legacy routes.

export type Province = {
 slug: string;
 name: string;
 abbr: string;
 country: "CA" | "US";
 countryName: "Canada" | "United States";
 blurb: string;
 cities: string[];
};

export type ProvinceCity = {
 citySlug: string;
 cityName: string;
 province: Province;
};

const slugify = (s: string) =>
 s
 .toLowerCase()
 .replace(/[^a-z0-9\s-]/g, "")
 .trim()
 .replace(/\s+/g, "-");

export const PROVINCES: Province[] = [
 // ===== CANADA =====
 {
 slug: "ontario",
 name: "Ontario",
 abbr: "ON",
 country: "CA",
 countryName: "Canada",
 blurb:
 "Ontario is Bridgepoint's home market. Operating across Canada and the US, our Ontario coverage spans the GTA, Golden Horseshoe, Ottawa Valley, and Southwestern Ontario corridors with 24/7 emergency dispatch.",
 cities: [
 "Toronto",
 "Ottawa",
 "Mississauga",
 "Brampton",
 "Hamilton",
 "London",
 "Markham",
 "Vaughan",
 "Kitchener",
 "Windsor",
 "Richmond Hill",
 "Oakville",
 "Burlington",
 "Sudbury",
 "Oshawa",
 "Barrie",
 "Guelph",
 "Cambridge",
 "Waterloo",
 "St. Catharines",
 "Niagara Falls",
 "Kingston",
 "Thunder Bay",
 "Whitby",
 "Ajax",
 "Pickering",
 "Milton",
 "Newmarket",
 "Aurora",
 "Caledon",
 "Brantford",
 "Belleville",
 "Peterborough",
 "Sarnia",
 "Welland",
 "North Bay",
 "Cornwall",
 "Sault Ste. Marie",
 "Chatham",
 "Stratford",
 "Orillia",
 "Bradford",
 "Innisfil",
 "Georgina",
 "Halton Hills",
 "Stouffville",
 "King City",
 "Uxbridge",
 "Clarington",
 "Orangeville",
 ],
 },
 {
 slug: "quebec",
 name: "Quebec",
 abbr: "QC",
 country: "CA",
 countryName: "Canada",
 blurb:
 "Quebec dispatch covers Montreal, Laval, Quebec City, and the Greater Montreal Area for property managers and commercial operators with bilingual service intake.",
 cities: [
 "Montreal",
 "Quebec City",
 "Laval",
 "Gatineau",
 "Longueuil",
 "Sherbrooke",
 "Saguenay",
 "Levis",
 "Trois-Rivieres",
 "Terrebonne",
 "Saint-Jean-sur-Richelieu",
 "Repentigny",
 "Brossard",
 "Drummondville",
 "Saint-Jerome",
 ],
 },
 {
 slug: "british-columbia",
 name: "British Columbia",
 abbr: "BC",
 country: "CA",
 countryName: "Canada",
 blurb:
 "British Columbia dispatch supports the Lower Mainland, Vancouver Island, and the Okanagan with coordinated trades response for multifamily and commercial operators.",
 cities: [
 "Vancouver",
 "Surrey",
 "Burnaby",
 "Richmond",
 "Coquitlam",
 "Victoria",
 "Kelowna",
 "Abbotsford",
 "Saanich",
 "Langley",
 "Delta",
 "Nanaimo",
 "Kamloops",
 "Chilliwack",
 "Maple Ridge",
 "Prince George",
 "New Westminster",
 "North Vancouver",
 "West Vancouver",
 "Port Coquitlam",
 ],
 },
 {
 slug: "alberta",
 name: "Alberta",
 abbr: "AB",
 country: "CA",
 countryName: "Canada",
 blurb:
 "Alberta dispatch services Calgary, Edmonton, and the Red Deer corridor with full-trade coverage for commercial, multifamily, and industrial portfolios.",
 cities: [
 "Calgary",
 "Edmonton",
 "Red Deer",
 "Lethbridge",
 "St. Albert",
 "Medicine Hat",
 "Grande Prairie",
 "Airdrie",
 "Spruce Grove",
 "Leduc",
 "Fort McMurray",
 "Camrose",
 "Cochrane",
 "Okotoks",
 "Lloydminster",
 ],
 },
 {
 slug: "manitoba",
 name: "Manitoba",
 abbr: "MB",
 country: "CA",
 countryName: "Canada",
 blurb:
 "Manitoba coverage anchors in Winnipeg with extended dispatch across Brandon and Steinbach for property operators.",
 cities: [
 "Winnipeg",
 "Brandon",
 "Steinbach",
 "Winkler",
 "Portage la Prairie",
 "Selkirk",
 "Morden",
 "Dauphin",
 "Thompson",
 "Flin Flon",
 ],
 },
 {
 slug: "nova-scotia",
 name: "Nova Scotia",
 abbr: "NS",
 country: "CA",
 countryName: "Canada",
 blurb:
 "Nova Scotia dispatch covers Halifax Regional Municipality and the broader Maritimes corridor with coordinated trade response.",
 cities: [
 "Halifax",
 "Dartmouth",
 "Sydney",
 "Truro",
 "New Glasgow",
 "Glace Bay",
 "Kentville",
 "Amherst",
 "Yarmouth",
 "Bridgewater",
 ],
 },

 // ===== UNITED STATES =====
 {
 slug: "florida",
 name: "Florida",
 abbr: "FL",
 country: "US",
 countryName: "United States",
 blurb:
 "Florida dispatch covers South Florida, Central Florida, and the Tampa Bay region with 24/7 trade response for commercial, multifamily, and HOA operators.",
 cities: [
 "Miami",
 "Orlando",
 "Tampa",
 "Jacksonville",
 "Fort Lauderdale",
 "St. Petersburg",
 "Hialeah",
 "Tallahassee",
 "Cape Coral",
 "Port St. Lucie",
 "Pembroke Pines",
 "Hollywood",
 "Gainesville",
 "Coral Springs",
 "Clearwater",
 "Miramar",
 "Lakeland",
 "Pompano Beach",
 "Davie",
 "West Palm Beach",
 "Sunrise",
 "Boca Raton",
 "Deltona",
 "Plantation",
 "Palm Bay",
 "Largo",
 "Deerfield Beach",
 "Melbourne",
 "Boynton Beach",
 "Lauderhill",
 "Weston",
 "Kissimmee",
 "Homestead",
 "Delray Beach",
 "Tamarac",
 "Daytona Beach",
 "Wellington",
 "North Miami",
 "Jupiter",
 "Ocala",
 ],
 },
 {
 slug: "texas",
 name: "Texas",
 abbr: "TX",
 country: "US",
 countryName: "United States",
 blurb:
 "Texas dispatch supports the DFW Metroplex, Greater Houston, Austin-San Antonio corridor, and West Texas markets with full-trade coordinated response.",
 cities: [
 "Houston",
 "Dallas",
 "Austin",
 "San Antonio",
 "Fort Worth",
 "El Paso",
 "Arlington",
 "Plano",
 "Corpus Christi",
 "Lubbock",
 "Laredo",
 "Garland",
 "Irving",
 "Frisco",
 "McKinney",
 "Amarillo",
 "Grand Prairie",
 "Brownsville",
 "Mesquite",
 "Killeen",
 "McAllen",
 "Pasadena",
 "Carrollton",
 "Midland",
 "Waco",
 "Abilene",
 "Denton",
 "Beaumont",
 "Round Rock",
 "Tyler",
 ],
 },
 {
 slug: "california",
 name: "California",
 abbr: "CA",
 country: "US",
 countryName: "United States",
 blurb:
 "California coverage spans the Greater Los Angeles area, Bay Area, San Diego, and Central Valley with coordinated trades dispatch.",
 cities: [
 "Los Angeles",
 "San Diego",
 "San Jose",
 "San Francisco",
 "Fresno",
 "Sacramento",
 "Long Beach",
 "Oakland",
 "Bakersfield",
 "Anaheim",
 "Santa Ana",
 "Riverside",
 "Stockton",
 "Irvine",
 "Chula Vista",
 "Fremont",
 "San Bernardino",
 "Modesto",
 "Fontana",
 "Oxnard",
 "Moreno Valley",
 "Glendale",
 "Huntington Beach",
 "Santa Clarita",
 "Garden Grove",
 "Oceanside",
 "Rancho Cucamonga",
 "Santa Rosa",
 "Ontario",
 "Elk Grove",
 ],
 },
 {
 slug: "new-york",
 name: "New York",
 abbr: "NY",
 country: "US",
 countryName: "United States",
 blurb:
 "New York coverage anchors NYC, Long Island, the Hudson Valley, and the Capital Region with 24/7 emergency response for property operators.",
 cities: [
 "New York City",
 "Buffalo",
 "Yonkers",
 "Rochester",
 "Syracuse",
 "Albany",
 "New Rochelle",
 "Mount Vernon",
 "Schenectady",
 "Utica",
 "White Plains",
 "Hempstead",
 "Troy",
 "Niagara Falls",
 "Binghamton",
 "Rome",
 "Long Beach",
 "Poughkeepsie",
 "North Tonawanda",
 "Jamestown",
 "Ithaca",
 "Elmira",
 "Newburgh",
 "Saratoga Springs",
 "Middletown",
 ],
 },
 {
 slug: "illinois",
 name: "Illinois",
 abbr: "IL",
 country: "US",
 countryName: "United States",
 blurb:
 "Illinois dispatch covers Chicago and the surrounding metro suburbs, with extended coverage to Springfield and the Quad Cities.",
 cities: [
 "Chicago",
 "Aurora",
 "Naperville",
 "Joliet",
 "Rockford",
 "Springfield",
 "Elgin",
 "Peoria",
 "Champaign",
 "Waukegan",
 "Cicero",
 "Bolingbrook",
 "Evanston",
 "Schaumburg",
 "Bloomington",
 "Decatur",
 "Arlington Heights",
 "Palatine",
 "Skokie",
 "Des Plaines",
 ],
 },
 {
 slug: "georgia",
 name: "Georgia",
 abbr: "GA",
 country: "US",
 countryName: "United States",
 blurb:
 "Georgia dispatch supports Metro Atlanta and the broader Peachtree corridor with full-trade response for property operators.",
 cities: [
 "Atlanta",
 "Augusta",
 "Columbus",
 "Macon",
 "Savannah",
 "Athens",
 "Sandy Springs",
 "South Fulton",
 "Roswell",
 "Johns Creek",
 "Albany",
 "Warner Robins",
 "Alpharetta",
 "Marietta",
 "Smyrna",
 "Valdosta",
 "Dunwoody",
 "Brookhaven",
 "Newnan",
 "Gainesville",
 ],
 },
 {
 slug: "north-carolina",
 name: "North Carolina",
 abbr: "NC",
 country: "US",
 countryName: "United States",
 blurb:
 "North Carolina dispatch covers Charlotte, the Triangle, and Triad metros for commercial and multifamily portfolios.",
 cities: [
 "Charlotte",
 "Raleigh",
 "Greensboro",
 "Durham",
 "Winston-Salem",
 "Fayetteville",
 "Cary",
 "Wilmington",
 "High Point",
 "Asheville",
 "Concord",
 "Greenville",
 "Gastonia",
 "Jacksonville",
 "Chapel Hill",
 "Rocky Mount",
 "Burlington",
 "Huntersville",
 "Wilson",
 "Kannapolis",
 ],
 },
 {
 slug: "arizona",
 name: "Arizona",
 abbr: "AZ",
 country: "US",
 countryName: "United States",
 blurb:
 "Arizona dispatch services the Phoenix Valley, Tucson, and northern Arizona corridors with coordinated trades response.",
 cities: [
 "Phoenix",
 "Tucson",
 "Mesa",
 "Chandler",
 "Scottsdale",
 "Glendale",
 "Gilbert",
 "Tempe",
 "Peoria",
 "Surprise",
 "Yuma",
 "Avondale",
 "Goodyear",
 "Flagstaff",
 "Buckeye",
 "Casa Grande",
 "Lake Havasu City",
 "Maricopa",
 "Sierra Vista",
 "Prescott",
 ],
 },
 {
 slug: "colorado",
 name: "Colorado",
 abbr: "CO",
 country: "US",
 countryName: "United States",
 blurb:
 "Colorado dispatch covers the Denver metro, Front Range, and Colorado Springs with full-trade response for property operators.",
 cities: [
 "Denver",
 "Colorado Springs",
 "Aurora",
 "Fort Collins",
 "Lakewood",
 "Thornton",
 "Arvada",
 "Westminster",
 "Pueblo",
 "Centennial",
 "Boulder",
 "Greeley",
 "Longmont",
 "Loveland",
 "Broomfield",
 "Castle Rock",
 "Grand Junction",
 "Commerce City",
 "Parker",
 "Littleton",
 ],
 },
 {
 slug: "new-jersey",
 name: "New Jersey",
 abbr: "NJ",
 country: "US",
 countryName: "United States",
 blurb:
 "New Jersey dispatch supports the entire state from the Gold Coast to South Jersey with multifamily and commercial trades coverage.",
 cities: [
 "Newark",
 "Jersey City",
 "Paterson",
 "Elizabeth",
 "Edison",
 "Woodbridge",
 "Lakewood",
 "Toms River",
 "Hamilton",
 "Trenton",
 "Clifton",
 "Camden",
 "Brick",
 "Cherry Hill",
 "Passaic",
 "Middletown",
 "Union City",
 "Old Bridge",
 "Gloucester Township",
 "East Orange",
 ],
 },
];

export type ProvinceCityRecord = {
 province: string;
 city: string;
};

export function getAllProvinceCities(): ProvinceCityRecord[] {
 const out: ProvinceCityRecord[] = [];
 for (const p of PROVINCES) {
 for (const c of p.cities) {
 out.push({ province: p.slug, city: slugify(c) });
 }
 }
 return out;
}

export function getProvinceBySlug(slug: string): Province | undefined {
 return PROVINCES.find((p) => p.slug === slug);
}

export function getProvinceCityBySlug(
 provinceSlug: string,
 citySlug: string
): { province: Province; cityName: string } | undefined {
 const province = getProvinceBySlug(provinceSlug);
 if (!province) return undefined;
 const cityName = province.cities.find((c) => slugify(c) === citySlug);
 if (!cityName) return undefined;
 return { province, cityName };
}

export function citySlug(name: string): string {
 return slugify(name);
}

export function sisterProvinces(slug: string): Province[] {
 const target = getProvinceBySlug(slug);
 if (!target) return PROVINCES.slice(0, 6);
 return PROVINCES.filter(
 (p) => p.slug !== slug && p.country === target.country
 ).slice(0, 6);
}

export const CANADA_PROVINCES = PROVINCES.filter((p) => p.country === "CA");
export const US_STATES = PROVINCES.filter((p) => p.country === "US");
