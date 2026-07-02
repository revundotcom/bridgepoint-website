export interface Role {
  slug: string;
  title: string;
  department: string;
  type: string;
  city: string;
  province: string;
  country: string;
  locationDisplay: string;
  jobId: string;
  postingStartDate: string;
  compensation: string;
  summary: string;
  responsibilities: string[];
  requiredSkills: string[];
  goodToHaveSkills: string[];
  educationAndExperience: string[];
  additionalInfo: string | null;
  htmlDescription?: string;
  workType: "remote" | "hybrid";
  category: string;
}

interface ApiJob {
  Job_Description?: string;
  Pay_Disclosure?: string;
  Salary?: string;
  Work_Type?: string | null;
  City?: string;
  State?: string;
  Country?: string;
  slug: string;
  Posting_Title?: string;
  Industry?: string;
  Job_Type?: string;
  zoho_id?: string;
  Date_Opened?: string;
  Role_Category?: string;
}

export async function fetchRolesLocal(): Promise<Role[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || "https://portal.revun.com";
  const url = `${baseUrl}/api/v1/job-postings?client_name=Bridgepoint+Maintenance`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch roles", res.status);
      return [];
    }
    const json = await res.json();
    const apiJobs = json.data || [];
    return apiJobs.map((job: ApiJob) => {
      let rawHtml = job.Job_Description || "";

      // Selectively strip font-size, font-family, and colors to preserve other formatting (like bold/headings)
      const styleStripRegex = /(font-family|font-size|color|background-color|background|line-height)\s*:[^;]+;?/gi;

      const cleanStyles = (html: string) => {
        let cleanedHtml = html.replace(/style="([^"]*)"/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, "").trim();
          return cleaned ? `style="${cleaned}"` : "";
        });
        cleanedHtml = cleanedHtml.replace(/style='([^']*)'/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, "").trim();
          return cleaned ? `style='${cleaned}'` : "";
        });
        return cleanedHtml;
      };

      // Replace outer span with div to prevent hydration mismatches from nested block-level elements
      rawHtml = rawHtml.replace(/<span id="spandesc">/gi, "<div>");
      rawHtml = rawHtml.replace(/<\/span>(?:<br\s*\/?>|\n|\s)*$/gi, "</div>");

      rawHtml = cleanStyles(rawHtml);

      // Strip <font> tags but keep the content inside them
      rawHtml = rawHtml.replace(/<\/?font[^>]*>/gi, "");

      // Clean up messy Zoho HTML artifacts (non-breaking spaces, empty trailing br tags)
      rawHtml = rawHtml.replace(/&nbsp;/gi, " ");

      // 1. Convert bold headings in single block
      rawHtml = rawHtml.replace(/<(div|p)[^>]*>\s*(?:<b>|<strong>)([^<:]+):\s*(?:<\/b>|<\/strong>)(?:&nbsp;|\s|<br\s*\/?>)*<\/\1>/gi, "\n<h3>$2</h3>\n");

      // 2. Convert plain text headings in single block
      rawHtml = rawHtml.replace(/<(div|p)[^>]*>\s*([^<:]+):\s*(?:&nbsp;|\s|<br\s*\/?>)*<\/\1>/gi, "\n<h3>$2</h3>\n");

      // 3. Format plain text lists (- item or • item) into HTML <ul><li>
      rawHtml = rawHtml.replace(/(?:<div[^>]*>|<p[^>]*>)\s*[-•]\s*(.*?)\s*(?:<br\s*\/?>)?\s*(?:<\/div>|<\/p>)/gi, "<li>$1</li>");
      rawHtml = rawHtml.replace(/(?:\s*<li>.*?<\/li>\s*)+/g, (match) => `\n<ul>${match.trim()}</ul>\n`);

      const hidePay =
        job.Pay_Disclosure === "Do not disclose pay" ||
        job.Salary === "Do not disclose pay";
      let compensation = hidePay ? "" : job.Salary || "";
      if (compensation && /\d/.test(compensation)) {
        compensation = compensation.replace(/\$/g, "").trim();

        // Add commas to numbers 1000 and above
        compensation = compensation.replace(/\d{4,}/g, (match) => {
          return Number(match).toLocaleString("en-US");
        });

        if (compensation.includes("CAD")) {
          compensation = compensation.replace(/CAD\s*/g, "CAD $");
        } else {
          // Prepend $ to numbers if not present
          compensation = compensation.replace(/(\d[\d,]*)/g, "$$$1");
        }
      }

      const isRemote = job.Work_Type == null || String(job.Work_Type).toLowerCase() === "remote";
      const workTypeSuffix = isRemote ? "Remote" : "Hybrid";

      const locParts = [];
      if (job.City) locParts.push(job.City);
      if (job.State) locParts.push(job.State);
      if (job.Country) locParts.push(job.Country);

      const locationDisplay = locParts.length > 0
        ? `${locParts.join(", ")} · ${workTypeSuffix}`
        : workTypeSuffix;

      return {
        slug: job.slug,
        title: job.Posting_Title || "Untitled Role",
        department: job.Industry || "Careers",
        type: job.Job_Type || "Full time",
        city: job.City || "",
        province: job.State || "",
        country: job.Country || "",
        locationDisplay,
        jobId: job.zoho_id || "",
        postingStartDate: job.Date_Opened ? job.Date_Opened.split("T")[0] : "",
        compensation,
        summary: "",
        responsibilities: [],
        requiredSkills: [],
        goodToHaveSkills: [],
        educationAndExperience: [],
        additionalInfo: null,
        htmlDescription: rawHtml,
        workType: isRemote ? "remote" : "hybrid",
        category: job.Role_Category || "Other",
      };
    });
  } catch (error) {
    console.error("Failed to fetch roles from API", error);
    return [];
  }
}

export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  const roles = await fetchRolesLocal();
  return roles.find((r) => r.slug === slug);
}

export async function getAllRoleSlugs(): Promise<string[]> {
  const roles = await fetchRolesLocal();
  return roles.map((r) => r.slug);
}

export interface CityGroup {
  city: string;
  roles: Role[];
}

export interface RegionGroup {
  region: string;
  cities: CityGroup[];
}

export interface CountryGroup {
  country: string;
  regions: RegionGroup[];
}

export function groupRolesByCountry(roles: Role[]): CountryGroup[] {
  const countryOrder: string[] = [];
  const countryMap = new Map<
    string,
    {
      regionOrder: string[];
      regionMap: Map<
        string,
        { cityOrder: string[]; cityMap: Map<string, Role[]> }
      >;
    }
  >();

  for (const role of roles) {
    const countryKey = role.country || "Other";
    if (!countryMap.has(countryKey)) {
      countryOrder.push(countryKey);
      countryMap.set(countryKey, {
        regionOrder: [],
        regionMap: new Map(),
      });
    }
    const country = countryMap.get(countryKey)!;

    const regionKey = role.province || "Other";
    if (!country.regionMap.has(regionKey)) {
      country.regionOrder.push(regionKey);
      country.regionMap.set(regionKey, {
        cityOrder: [],
        cityMap: new Map(),
      });
    }
    const region = country.regionMap.get(regionKey)!;

    const cityKey = role.city || "Remote";
    if (!region.cityMap.has(cityKey)) {
      region.cityOrder.push(cityKey);
      region.cityMap.set(cityKey, []);
    }
    region.cityMap.get(cityKey)!.push(role);
  }

  // Sort countries alphabetically
  countryOrder.sort((a, b) => a.localeCompare(b));

  return countryOrder.map((countryKey) => {
    const country = countryMap.get(countryKey)!;
    return {
      country: countryKey,
      regions: country.regionOrder.map((regionKey) => {
        const region = country.regionMap.get(regionKey)!;
        return {
          region: regionKey,
          cities: region.cityOrder.map((cityKey) => ({
            city: cityKey,
            roles: region.cityMap.get(cityKey)!,
          })),
        };
      }),
    };
  });
}
