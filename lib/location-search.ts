import { Country, State, City, type ICountry, type IState, type ICity } from 'country-state-city';

export interface ResolvedLocation {
  id: string;
  type: 'city' | 'state';
  name: string;
  boldText: string;
  subtleText: string;
  displayText: string;
  city: string;
  state: string;
  province: string;
  state_province: string;
  country: string;
  country_code: string;
  residential_location: string;
}

// Country name overrides for accurate, modern international naming
const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  MK: 'North Macedonia',
  US: 'United States',
  GB: 'United Kingdom',
  AE: 'United Arab Emirates',
  KR: 'South Korea',
  KP: 'North Korea',
  RU: 'Russia',
  VN: 'Vietnam',
  TW: 'Taiwan',
  CD: 'DR Congo',
  CG: 'Congo',
  PS: 'Palestine',
  VA: 'Vatican City',
  SY: 'Syria',
  LA: 'Laos',
  IR: 'Iran',
  BO: 'Bolivia',
  TZ: 'Tanzania',
  VE: 'Venezuela',
  MD: 'Moldova',
  BN: 'Brunei',
};

// Aliases to help multi-word or alternative country searches
const COUNTRY_ALIASES: Record<string, string[]> = {
  MK: ['macedonia', 'north macedonia', 'fyrom'],
  US: ['usa', 'united states', 'united states of america', 'america'],
  GB: ['uk', 'united kingdom', 'great britain', 'england', 'scotland', 'wales'],
  AE: ['uae', 'emirates', 'united arab emirates'],
  KR: ['korea', 'south korea'],
  IN: ['india', 'bharat'],
  CA: ['canada'],
};

// Priority boost for key operational countries when matching identical city names
const COUNTRY_PRIORITY: Record<string, number> = {
  CA: 50,
  US: 40,
  IN: 30,
  GB: 25,
  MK: 20,
};

interface SearchIndex {
  countries: ICountry[];
  countryByCode: Map<string, string>;
  states: IState[];
  stateByCodeAndCountry: Map<string, string>;
  allCities: ICity[];
}

let cachedIndex: SearchIndex | null = null;

function getSearchIndex(): SearchIndex {
  if (cachedIndex) return cachedIndex;

  const countries = Country.getAllCountries();
  const countryByCode = new Map<string, string>();

  for (const c of countries) {
    const name = COUNTRY_NAME_OVERRIDES[c.isoCode] || c.name;
    countryByCode.set(c.isoCode, name);
  }

  const states = State.getAllStates();
  const stateByCodeAndCountry = new Map<string, string>();

  for (const s of states) {
    stateByCodeAndCountry.set(`${s.countryCode}:${s.isoCode}`, s.name);
  }

  const allCities = City.getAllCities();

  cachedIndex = {
    countries,
    countryByCode,
    states,
    stateByCodeAndCountry,
    allCities,
  };

  return cachedIndex;
}

/**
 * Searches global cities and states/provinces offline using country-state-city.
 * Full global coverage for all 250 countries.
 */
export function searchLocations(query: string, maxResults = 40): ResolvedLocation[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const index = getSearchIndex();
  const results: ResolvedLocation[] = [];
  const seenKeys = new Set<string>();

  function addResult(item: ResolvedLocation): boolean {
    if (!seenKeys.has(item.id) && results.length < maxResults) {
      seenKeys.add(item.id);
      results.push(item);
      return true;
    }
    return false;
  }

  // Parse potential comma separation (e.g. "Toronto, Canada" or "Jaipur, Rajasthan")
  let primaryQuery = trimmed;
  let contextQuery = '';

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim());
    primaryQuery = parts[0] || '';
    contextQuery = parts.slice(1).join(' ').trim();
  }

  if (primaryQuery.length < 2) {
    primaryQuery = trimmed;
    contextQuery = '';
  }

  function matchesContext(sName: string, cName: string, cCode: string): boolean {
    if (!contextQuery) return true;
    const sLower = sName.toLowerCase();
    const cLower = cName.toLowerCase();
    const codeLower = cCode.toLowerCase();
    const aliases = COUNTRY_ALIASES[cCode.toUpperCase()] || [];

    return (
      sLower.includes(contextQuery) ||
      cLower.includes(contextQuery) ||
      codeLower === contextQuery ||
      aliases.some((a) => a.includes(contextQuery))
    );
  }

  // -------------------------------------------------------------
  // 1. STATE / PROVINCE MATCHING (e.g. "Rajasthan", "Ontario", "California")
  // -------------------------------------------------------------
  const matchedStates: IState[] = [];
  for (const s of index.states) {
    const sLower = s.name.toLowerCase();
    if (sLower === primaryQuery || sLower.startsWith(primaryQuery)) {
      const cName = index.countryByCode.get(s.countryCode) || s.countryCode;
      if (matchesContext(s.name, cName, s.countryCode)) {
        matchedStates.push(s);
      }
    }
  }

  // Sort states: prioritize exact match, then operational country priority
  matchedStates.sort((a, b) => {
    const aExact = a.name.toLowerCase() === primaryQuery ? 1 : 0;
    const bExact = b.name.toLowerCase() === primaryQuery ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    const aPri = COUNTRY_PRIORITY[a.countryCode] || 0;
    const bPri = COUNTRY_PRIORITY[b.countryCode] || 0;
    return bPri - aPri;
  });

  // If user searched for a State/Province:
  // The State/Province appears as the FIRST option
  // PLUS, all cities belonging to that state/province are listed underneath it
  for (const s of matchedStates) {
    const cName = index.countryByCode.get(s.countryCode) || s.countryCode;
    const stateId = `state:${s.countryCode}:${s.isoCode}`;
    const stateDisplay = `${s.name}, ${cName}`;

    addResult({
      id: stateId,
      type: 'state',
      name: s.name,
      boldText: s.name,
      subtleText: `(Province / State, ${cName})`,
      displayText: stateDisplay,
      city: s.name, // sets city = state name when a province/state is selected
      state: s.name,
      province: s.name,
      state_province: s.name,
      country: cName,
      country_code: s.countryCode,
      residential_location: stateDisplay,
    });

    // Add cities in this state/province
    const citiesInState = City.getCitiesOfState(s.countryCode, s.isoCode);
    for (const c of citiesInState) {
      if (results.length >= maxResults) break;
      const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`;
      const cityDisplay = `${c.name}, ${s.name}, ${cName}`;

      addResult({
        id: cityId,
        type: 'city',
        name: c.name,
        boldText: c.name,
        subtleText: `(${s.name}, ${cName})`,
        displayText: cityDisplay,
        city: c.name,
        state: s.name,
        province: s.name,
        state_province: s.name,
        country: cName,
        country_code: c.countryCode,
        residential_location: cityDisplay,
      });
    }
  }

  // -------------------------------------------------------------
  // 2. CITY SEARCH (Exact match & Prefix match)
  // (e.g. "Jaipur", "Toronto", "Skopje", "Chicago")
  // -------------------------------------------------------------
  const cityMatches: Array<{ city: ICity; exact: boolean; priority: number }> = [];

  for (let i = 0; i < index.allCities.length; i++) {
    const c = index.allCities[i];
    const cLower = c.name.toLowerCase();

    const isExact = cLower === primaryQuery;
    const isPrefix = !isExact && cLower.startsWith(primaryQuery);

    if (isExact || isPrefix) {
      const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || '';
      const cName = index.countryByCode.get(c.countryCode) || c.countryCode;

      if (matchesContext(sName, cName, c.countryCode)) {
        cityMatches.push({
          city: c,
          exact: isExact,
          priority: COUNTRY_PRIORITY[c.countryCode] || 0,
        });
      }
    }
  }

  // Sort city matches: exact matches first, then country priority, then shorter names
  cityMatches.sort((a, b) => {
    if (a.exact !== b.exact) return a.exact ? -1 : 1;
    if (a.priority !== b.priority) return b.priority - a.priority;
    return a.city.name.length - b.city.name.length;
  });

  for (const { city: c } of cityMatches) {
    if (results.length >= maxResults) break;
    const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || '';
    const cName = index.countryByCode.get(c.countryCode) || c.countryCode;
    const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`;
    const subtle = sName ? `(${sName}, ${cName})` : `(${cName})`;
    const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${cName}`;

    addResult({
      id: cityId,
      type: 'city',
      name: c.name,
      boldText: c.name,
      subtleText: subtle,
      displayText: cityDisplay,
      city: c.name,
      state: sName,
      province: sName,
      state_province: sName,
      country: cName,
      country_code: c.countryCode,
      residential_location: cityDisplay,
    });
  }

  // -------------------------------------------------------------
  // 3. SUBSTRING STATES (if space remains)
  // (e.g. "Greater Skopje" when user types "skopje")
  // -------------------------------------------------------------
  if (results.length < maxResults) {
    for (const s of index.states) {
      if (results.length >= maxResults) break;
      const sLower = s.name.toLowerCase();
      if (!sLower.startsWith(primaryQuery) && sLower.includes(primaryQuery)) {
        const cName = index.countryByCode.get(s.countryCode) || s.countryCode;
        if (matchesContext(s.name, cName, s.countryCode)) {
          const stateId = `state:${s.countryCode}:${s.isoCode}`;
          const stateDisplay = `${s.name}, ${cName}`;

          addResult({
            id: stateId,
            type: 'state',
            name: s.name,
            boldText: s.name,
            subtleText: `(Province / State, ${cName})`,
            displayText: stateDisplay,
            city: s.name,
            state: s.name,
            province: s.name,
            state_province: s.name,
            country: cName,
            country_code: s.countryCode,
            residential_location: stateDisplay,
          });
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 4. SUBSTRING CITIES (if space remains)
  // -------------------------------------------------------------
  if (results.length < maxResults) {
    for (let i = 0; i < index.allCities.length && results.length < maxResults; i++) {
      const c = index.allCities[i];
      const cLower = c.name.toLowerCase();

      if (!cLower.startsWith(primaryQuery) && cLower.includes(primaryQuery)) {
        const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || '';
        const cName = index.countryByCode.get(c.countryCode) || c.countryCode;

        if (matchesContext(sName, cName, c.countryCode)) {
          const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${cLower}`;
          const subtle = sName ? `(${sName}, ${cName})` : `(${cName})`;
          const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${cName}`;

          addResult({
            id: cityId,
            type: 'city',
            name: c.name,
            boldText: c.name,
            subtleText: subtle,
            displayText: cityDisplay,
            city: c.name,
            state: sName,
            province: sName,
            state_province: sName,
            country: cName,
            country_code: c.countryCode,
            residential_location: cityDisplay,
          });
        }
      }
    }
  }

  return results;
}
