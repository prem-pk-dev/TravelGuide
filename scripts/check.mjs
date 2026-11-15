import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { createSitemapDocuments, discoverIndexableHtmlUrls, validateSitemapXml } from "./sitemap.mjs";

const root = process.cwd();
const dist = path.join(root, "dist");
const branch = process.env.CF_PAGES_BRANCH ?? "";
const isProductionBuild = branch === "main";
const site = JSON.parse(await readFile(path.join(root, "src/data/site.json"), "utf8"));
const canonicalOrigin = new URL(site.canonicalOrigin).origin;
const productionIndexingEnabled = isProductionBuild && site.productionIndexingEnabled === true;
const shouldBeNoindex = !productionIndexingEnabled;
const html = await readFile(path.join(dist, "index.html"), "utf8");
const robotsTag = (html.match(/<meta\b[^>]*>/gi) ?? []).find(tag => /\bname=["']robots["']/i.test(tag)) ?? "";
const robotsContent = robotsTag.match(/\bcontent=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? "";
const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? []).find(tag => /\brel=["']canonical["']/i.test(tag)) ?? "";
const canonicalHref = canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? "";
const robotsTxt = await readFile(path.join(dist, "robots.txt"), "utf8");
const headers = await readFile(path.join(dist, "_headers"), "utf8");

const checks = [
  ["HTML5 doctype", /^<!doctype html>/i.test(html)],
  ["One H1", (html.match(/<h1\b/gi) || []).length === 1],
  ["Main landmark", /<main\b[^>]*id="main"/i.test(html)],
  ["Title", /<title>[^<]+<\/title>/.test(html)],
  ["Description", /<meta name="description"/.test(html)],
  ["Canonical points to production root", canonicalHref === canonicalOrigin + "/"],
  ["Robots meta follows branch and launch gate", shouldBeNoindex ? robotsContent.includes("noindex") : robotsContent.includes("index") && !robotsContent.includes("noindex")],
  ["Preview robots.txt allows fetch and advertises no production sitemap", isProductionBuild || (/User-agent: \*/.test(robotsTxt) && /Allow: \//.test(robotsTxt) && !/Sitemap:/i.test(robotsTxt))],
  ["Production crawl block retained until launch approval", !isProductionBuild || productionIndexingEnabled || /Disallow: \//.test(robotsTxt)],
  ["Production sitemap is advertised only after launch approval", isProductionBuild && productionIndexingEnabled ? robotsTxt.includes("Sitemap: " + canonicalOrigin + "/sitemap.xml") : !/Sitemap:/i.test(robotsTxt)],
  ["X-Robots-Tag protection enabled when indexing is off", shouldBeNoindex ? /X-Robots-Tag: noindex, nofollow/i.test(headers) : !/X-Robots-Tag:.*noindex/i.test(headers)],
  ["Sitemap response MIME rule", /\/sitemap\*\.xml\n  Content-Type: application\/xml; charset=utf-8/.test(headers)],
  ["Robots response MIME rule", /\/robots\.txt\n  Content-Type: text\/plain; charset=utf-8/.test(headers)],
  ["Search forms", (html.match(/data-search-form/g) || []).length >= 2],
  ["Eight or more content sections", (html.match(/<section\b/g) || []).length >= 8],
  ["Skip link", /class="skip-link"/.test(html)],
  ["Mobile navigation", /id="mobile-navigation"/.test(html)]
];

let failed = 0;
for (const [label, ok] of checks) {
  console.log((ok ? "PASS " : "FAIL ") + label);
  if (!ok) failed++;
}

const refs = [...html.matchAll(/src="(\/assets\/images\/[^"]+\.webp)"/g)].map(match => match[1]);
for (const ref of [...new Set(refs)]) {
  try {
    const file = await stat(path.join(dist, ref.slice(1)));
    console.log("PASS " + ref + " " + file.size + " bytes");
  } catch {
    console.log("FAIL missing " + ref);
    failed++;
  }
}

try {
  const sitemapXml = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const rootDocument = validateSitemapXml(sitemapXml);
  let sitemapUrls = [];
  if (rootDocument.type === "urlset") {
    sitemapUrls = rootDocument.locations;
  } else {
    for (const childUrl of rootDocument.locations) {
      const child = new URL(childUrl);
      if (child.origin !== canonicalOrigin) throw new Error("Sitemap index references a noncanonical host.");
      const filename = path.basename(child.pathname);
      const childXml = await readFile(path.join(dist, filename), "utf8");
      const childDocument = validateSitemapXml(childXml);
      if (childDocument.type !== "urlset") throw new Error("Child sitemap must be a urlset.");
      sitemapUrls.push(...childDocument.locations);
    }
  }
  const expectedUrls = await discoverIndexableHtmlUrls(dist, canonicalOrigin);
  const matches = JSON.stringify([...sitemapUrls].sort()) === JSON.stringify([...expectedUrls].sort());
  console.log((matches ? "PASS " : "FAIL ") + "Sitemap XML membership (" + sitemapUrls.length + " URL(s))");
  if (!matches) failed++;
  if (!productionIndexingEnabled && sitemapUrls.length !== 0) {
    console.log("FAIL sitemap must remain empty while indexing is disabled");
    failed++;
  } else if (!productionIndexingEnabled) {
    console.log("PASS sitemap contains no URLs while indexing is disabled");
  }
} catch (error) {
  console.log("FAIL sitemap XML validation: " + error.message);
  failed++;
}

try {
  const fixture = createSitemapDocuments(
    [canonicalOrigin + "/a/", canonicalOrigin + "/b/", canonicalOrigin + "/c/"],
    canonicalOrigin,
    { maxUrls: 1, maxBytes: 4096 }
  );
  const index = validateSitemapXml(fixture.rootXml);
  const splitOk = index.type === "sitemapindex" && fixture.childFiles.length === 3 &&
    fixture.childFiles.every(file => validateSitemapXml(file.xml).type === "urlset");
  console.log((splitOk ? "PASS " : "FAIL ") + "Scalable sitemap-index splitting test");
  if (!splitOk) failed++;
} catch (error) {
  console.log("FAIL sitemap splitting test: " + error.message);
  failed++;
}

console.log("Build mode:", isProductionBuild ? "production" : "preview",
  "| production indexing:", productionIndexingEnabled ? "enabled" : "protected/off");
console.log("Section count:", (html.match(/<section\b/g) || []).length,
  "| unique WebP refs:", new Set(refs).size);
if (failed) process.exitCode = 1;
