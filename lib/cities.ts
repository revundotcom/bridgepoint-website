export type City = {
 slug: string;
 name: string;
 region: "GTA" | "Golden Horseshoe" | "Eastern Ontario" | "Southwestern Ontario";
 postalPrefix: string;
 blurb: string;
 neighborhoods: string[];
 responseNote: string;
 nearbyCities: string[];
};

export const CITIES: City[] = [
 {
 slug: "toronto",
 name: "Toronto",
 region: "GTA",
 postalPrefix: "M",
 blurb:
 "Toronto is one of Bridgepoint's largest service zones. a dense urban core, hundreds of high-rise residential and commercial buildings, and Ontario's busiest emergency-response market. We dispatch trades across downtown, midtown, North York, Scarborough, and Etobicoke.",
 neighborhoods: [
 "Downtown",
 "Midtown",
 "North York",
 "Scarborough",
 "Etobicoke",
 "York",
 "East York",
 "The Annex",
 "Liberty Village",
 "Yorkville",
 ],
 responseNote:
 "Average GTA dispatch covers Toronto core within standard response windows; ETAs confirmed at intake.",
 nearbyCities: ["vaughan", "mississauga", "markham"],
 },
 {
 slug: "vaughan",
 name: "Vaughan",
 region: "GTA",
 postalPrefix: "L",
 blurb:
 "Vaughan is a core service area for Bridgepoint. Concord, Maple, Woodbridge, Thornhill, and Kleinburg neighborhoods all see active dispatch for plumbing, electrical, HVAC, and emergency response.",
 neighborhoods: ["Concord", "Maple", "Woodbridge", "Thornhill", "Kleinburg"],
 responseNote:
 "Vaughan is an active service area with standard response windows for emergency dispatch.",
 nearbyCities: ["toronto", "richmond-hill", "markham"],
 },
 {
 slug: "mississauga",
 name: "Mississauga",
 region: "GTA",
 postalPrefix: "L",
 blurb:
 "Mississauga is one of Ontario's largest commercial and multifamily markets. Square One, Port Credit, Streetsville, and Meadowvale. Bridgepoint dispatches plumbing, electrical, HVAC, and building maintenance across Mississauga's commercial corridors and high-density residential neighborhoods.",
 neighborhoods: [
 "Square One",
 "Port Credit",
 "Streetsville",
 "Meadowvale",
 "Erin Mills",
 "Cooksville",
 "Lakeview",
 ],
 responseNote:
 "Mississauga is within our primary GTA dispatch radius.",
 nearbyCities: ["brampton", "oakville", "toronto"],
 },
 {
 slug: "brampton",
 name: "Brampton",
 region: "GTA",
 postalPrefix: "L",
 blurb:
 "Brampton's mix of commercial industrial parks and residential growth makes it a strong market for preventative maintenance contracts and emergency dispatch. Bridgepoint serves Brampton with full plumbing, electrical, HVAC, and building services coverage.",
 neighborhoods: [
 "Downtown Brampton",
 "Bramalea",
 "Heart Lake",
 "Mount Pleasant",
 "Springdale",
 ],
 responseNote:
 "Brampton sits within our primary GTA dispatch radius. standard response windows apply.",
 nearbyCities: ["mississauga", "vaughan", "toronto"],
 },
 {
 slug: "markham",
 name: "Markham",
 region: "GTA",
 postalPrefix: "L",
 blurb:
 "Markham is a major commercial and tech corridor with significant multifamily growth. Bridgepoint dispatches across Unionville, Cornell, Markville, and Milliken for property management portfolios and emergency response.",
 neighborhoods: [
 "Unionville",
 "Cornell",
 "Markville",
 "Milliken",
 "Berczy Village",
 "Cathedraltown",
 ],
 responseNote:
 "Markham is within our primary GTA dispatch radius.",
 nearbyCities: ["richmond-hill", "vaughan", "toronto"],
 },
 {
 slug: "richmond-hill",
 name: "Richmond Hill",
 region: "GTA",
 postalPrefix: "L",
 blurb:
 "Richmond Hill is a high-density residential and growing commercial market north of Toronto. Bridgepoint provides fast dispatch across Oak Ridges, Bayview Hill, Mill Pond, and Richmond Heights neighborhoods.",
 neighborhoods: [
 "Oak Ridges",
 "Bayview Hill",
 "Mill Pond",
 "Richmond Heights",
 "Jefferson",
 ],
 responseNote:
 "Richmond Hill is within our primary GTA dispatch radius.",
 nearbyCities: ["vaughan", "markham", "aurora"],
 },
 {
 slug: "hamilton",
 name: "Hamilton",
 region: "Golden Horseshoe",
 postalPrefix: "L",
 blurb:
 "Hamilton's industrial heritage and growing downtown make it one of Ontario's most diverse maintenance markets. Bridgepoint dispatches plumbing, electrical, HVAC, and building services across Hamilton's commercial, multifamily, and institutional properties.",
 neighborhoods: [
 "Downtown Hamilton",
 "Westdale",
 "Stoney Creek",
 "Ancaster",
 "Dundas",
 "Waterdown",
 ],
 responseNote:
 "Hamilton is within our extended Golden Horseshoe dispatch range. ETAs confirmed at intake.",
 nearbyCities: ["burlington", "oakville", "mississauga"],
 },
 {
 slug: "oakville",
 name: "Oakville",
 region: "Golden Horseshoe",
 postalPrefix: "L",
 blurb:
 "Oakville's high-end residential, commercial, and institutional properties demand reliable maintenance partners. Bridgepoint serves Oakville with full-trade dispatch and preventative maintenance contracts.",
 neighborhoods: [
 "Bronte",
 "Glen Abbey",
 "Old Oakville",
 "West Oak Trails",
 "Uptown Core",
 ],
 responseNote:
 "Oakville is within our Golden Horseshoe dispatch range.",
 nearbyCities: ["burlington", "mississauga", "hamilton"],
 },
];

export const getCity = (slug: string): City | undefined =>
 CITIES.find((c) => c.slug === slug);
