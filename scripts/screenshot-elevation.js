// Screenshot home full-scroll on mobile (390x844) + desktop (1440x900).
// Saves to /Users/samhabib/Desktop/sam-deliverables/bpm-premium-elevation/
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = "/Users/samhabib/Desktop/sam-deliverables/bpm-premium-elevation";
fs.mkdirSync(OUT, { recursive: true });

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

    const page = await ctx.newPage();
    const target = "https://bridgepointmaintenance.com/";
    try {
      await page.goto(target, { waitUntil: "networkidle", timeout: 45000 });
    } catch (err) {
      console.warn(`  [retry] ${size}: ${err.message}`);
      await page.goto(target, { waitUntil: "domcontentloaded", timeout: 45000 });
    }
    await page.waitForTimeout(2500);
    // scroll the page so lazy/in-view content paints
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const dist = 600;
        const t = setInterval(() => {
          window.scrollBy(0, dist);
          total += dist;
          if (total >= document.body.scrollHeight) {
            clearInterval(t);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });
    await page.waitForTimeout(1200);

    // above-the-fold
    const fold = path.join(OUT, `${size}-home-fold.png`);
    await page.screenshot({ path: fold, fullPage: false });
    console.log(`  [ok]   ${size} fold -> ${fold}`);

    // full scroll
    const full = path.join(OUT, `${size}-home-full.png`);
    await page.screenshot({ path: full, fullPage: true });
    console.log(`  [ok]   ${size} full -> ${full}`);

    await page.close();
    await ctx.close();
  }

  await browser.close();
})();
