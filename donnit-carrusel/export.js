// Exporta cada slide_XX.html a PNG de 1080x1080 usando el Chromium local.
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const DIR = __dirname;
const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: [
      "--no-sandbox",
      "--force-color-profile=srgb",
      "--font-render-hinting=none",
    ],
  });

  const files = fs
    .readdirSync(DIR)
    .filter((f) => /^slide_\d+\.html$/.test(f))
    .sort();

  for (const file of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await page.goto("file://" + path.join(DIR, file), {
      waitUntil: "networkidle0",
    });
    // pequeña espera para que rendericen los emojis a color
    await new Promise((r) => setTimeout(r, 250));
    const el = await page.$(".slide");
    const out = file.replace(".html", ".png");
    await el.screenshot({ path: path.join(DIR, out) });
    console.log("exported", out);
    await page.close();
  }

  await browser.close();
  console.log("DONE");
})();
