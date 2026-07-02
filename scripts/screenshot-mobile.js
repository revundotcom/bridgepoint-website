// Screenshot Bridgepoint key pages at mobile (390x844) and desktop (1440x900).
// Saves to /Users/samhabib/Desktop/sam-deliverables/bridgepoint-imagery-pass/.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = "/Users/samhabib/Desktop/sam-deliverables/bridgepoint-imagery-pass";
fs.mkdirSync(OUT, { recursive: true });

const URLS = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["gallery", "/gallery"],
  ["comfort-club", "/comfort-club"],
  ["help", "/help"],
  ["help-furnace", "/help/why-is-my-furnace-short-cycling"],
  ["find-a-technician", "/find-a-technician"],
  ["locations-ontario", "/locations/ontario"],
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const [size, viewport] of [
    ["mobile", { width: 390, height: 844 }],
    ["desktop", { width: 1440, height: 900 }],
  ]) {
    const ctx = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
      userAgent:
        size === "mobile"
          ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
          : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
      hasTouch: size === "mobile",
      isMobile: size === "mobile",
    });

    for (const [name, url] of URLS) {
      const page = await ctx.newPage();
      const target = `https://bridgepointmaintenance.com${url}`;
      try {
        await page.goto(target, { waitUntil: "networkidle", timeout: 30000 });
      } catch (err) {
        console.warn(`  [retry] ${name} (${target}): ${err.message}`);
        try {
          await page.goto(target, { waitUntil: "domcontentloaded", timeout: 30000 });
        } catch (err2) {
          console.warn(`  [skip]  ${name}: ${err2.message}`);
          await page.close();
          continue;
        }
      }
      await page.waitForTimeout(1500);
      const out = path.join(OUT, `${size}-${name}.png`);
      await page.screenshot({ path: out, fullPage: true });
      console.log(`  [ok]   ${size}-${name} -> ${out}`);
      await page.close();
    }
    await ctx.close();
  }

  await browser.close();
})();
