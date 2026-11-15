import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { validateSitemapXml } from "./sitemap.mjs";

const root = process.cwd();
const temporaryOutput = await mkdtemp(path.join(os.tmpdir(), "travelguide-production-mode-"));
const env = { ...process.env, CF_PAGES_BRANCH: "main", TRAVELGUIDE_DIST_DIR: temporaryOutput };

function run(label, args) {
  const result = spawnSync(process.execPath, args, { cwd: root, env, encoding: "utf8" });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) throw new Error(label + " failed with exit code " + result.status);
}
function assert(condition, label) {
  console.log((condition ? "PASS " : "FAIL ") + label);
  if (!condition) throw new Error("Production-mode regression: " + label);
}

try {
  const site = JSON.parse(await readFile(path.join(root, "src/data/site.json"), "utf8"));
  assert(site.productionIndexingEnabled === false, "Production indexing launch gate remains false");
  run("Production-mode static build", ["scripts/build.mjs"]);
  run("Production-mode generated-output checks", ["scripts/check.mjs"]);

  const robots = await readFile(path.join(temporaryOutput, "robots.txt"), "utf8");
  const headers = await readFile(path.join(temporaryOutput, "_headers"), "utf8");
  const html = await readFile(path.join(temporaryOutput, "index.html"), "utf8");
  const sitemapXml = await readFile(path.join(temporaryOutput, "sitemap.xml"), "utf8");
  const robotsMeta = (html.match(/<meta\b[^>]*>/gi) || []).find(tag => /\bname=["']robots["']/i.test(tag)) || "";
  const robotsContent = robotsMeta.match(/\bcontent=["']([^"']+)["']/i)?.[1]?.toLowerCase() || "";
  const canonical = (html.match(/<link\b[^>]*>/gi) || []).find(tag => /\brel=["']canonical["']/i.test(tag)) || "";
  const canonicalHref = canonical.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
  const sitemap = validateSitemapXml(sitemapXml);
  const origin = new URL(site.canonicalOrigin).origin;

  assert(/^User-agent: \*/m.test(robots), "Production robots.txt contains a user-agent group");
  assert(/^Disallow: \/$/m.test(robots), "Production robots.txt keeps Disallow: /");
  assert(!/^Allow:/m.test(robots), "Production robots.txt does not accidentally allow crawling");
  assert(!/^Sitemap:/im.test(robots), "Production robots.txt does not advertise a sitemap before launch approval");
  assert(robotsContent.includes("noindex") && robotsContent.includes("nofollow"), "Production HTML robots meta remains noindex, nofollow");
  assert(canonicalHref === origin + "/", "Production-mode canonical resolves to configured production origin");
  assert(/X-Robots-Tag: noindex, nofollow/i.test(headers), "Production static response header keeps X-Robots-Tag noindex");
  assert(sitemap.type === "urlset" && sitemap.locations.length === 0, "Production sitemap is valid XML and empty while indexing is disabled");
  assert(/\/sitemap\*\.xml\n  Content-Type: application\/xml; charset=utf-8/.test(headers), "Production sitemap has XML response content type rule");
  assert(/\/robots\.txt\n  Content-Type: text\/plain; charset=utf-8/.test(headers), "Production robots.txt has text response content type rule");
  console.log("PASS Production-mode simulation complete");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await rm(temporaryOutput, { recursive: true, force: true });
}
