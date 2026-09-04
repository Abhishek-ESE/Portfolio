// Renders tools/resume/resume.html → public/Abhishek_Agrahari_Resume.pdf (A4, one page).
//
//   npm run resume
//
// Needs Microsoft Edge (or set EDGE_PATH to any Chromium binary). The photo is
// tools/resume/photo.jpg — regenerate it with `npm run photo` after changing source.jpg.
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const HERE = __dirname;
const ROOT = path.resolve(HERE, "..", "..");
const OUT_PDF = path.join(ROOT, "public", "Abhishek_Agrahari_Resume.pdf");
const EDGE =
  process.env.EDGE_PATH ||
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

const A4_PX = 1123; // 297mm at 96dpi

(async () => {
  const photo = fs.readFileSync(path.join(HERE, "photo.jpg")).toString("base64");
  const html = fs
    .readFileSync(path.join(HERE, "resume.html"), "utf8")
    .replace("{{PHOTO}}", `data:image/jpeg;base64,${photo}`);

  const browser = await puppeteer.launch({ executablePath: EDGE, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: A4_PX, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const height = await page.evaluate(() => Math.ceil(document.body.getBoundingClientRect().height));
  const fits = height <= A4_PX;
  console.log(`content height ${height}px of ${A4_PX}px — ${fits ? "fits one page" : "OVERFLOWS by " + (height - A4_PX) + "px"}`);

  await page.pdf({
    path: OUT_PDF,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  const bytes = fs.readFileSync(OUT_PDF);
  const pages = (bytes.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`wrote ${path.relative(ROOT, OUT_PDF)} (${(bytes.length / 1024).toFixed(0)} KB, ${pages} page${pages === 1 ? "" : "s"})`);
  if (!fits || pages !== 1) process.exit(1);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
