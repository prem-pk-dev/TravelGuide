import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";

const LF = String.fromCharCode(10);
const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>' + LF;
const URLSET_START = '<urlset xmlns="' + NS + '">' + LF;
const URLSET_END = "</urlset>" + LF;
const INDEX_START = '<sitemapindex xmlns="' + NS + '">' + LF;
const INDEX_END = "</sitemapindex>" + LF;

function xmlEscape(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function xmlUnescape(value) {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}
function normalizeOrigin(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Sitemap origin must be a clean HTTPS origin without a path, query or fragment.");
  }
  return url.origin;
}
function readAttribute(tag, attribute) {
  const match = tag.match(new RegExp("\\b" + attribute + "=(?:\"([^\"]*)\"|'([^']*)')", "i"));
  return match?.[1] ?? match?.[2] ?? null;
}
function expectedPathForHtml(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (normalized === "index.html") return "/";
  if (normalized.endsWith("/index.html")) return "/" + normalized.slice(0, -"index.html".length);
  return "/" + normalized;
}
async function walkHtml(directory, root = directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkHtml(absolutePath, root));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) files.push(absolutePath);
  }
  return files.map(file => ({ absolutePath: file, relativePath: path.relative(root, file) }));
}

/** Include only generated physical HTML with explicit indexability and a production self-canonical. */
export async function discoverIndexableHtmlUrls(outputDirectory, originValue) {
  const origin = normalizeOrigin(originValue);
  const files = await walkHtml(outputDirectory);
  const owners = new Map();
  for (const file of files) {
    const relativePath = file.relativePath.split(path.sep).join("/");
    if (relativePath === "404.html") continue;
    const html = await readFile(file.absolutePath, "utf8");
    const robotsTag = (html.match(/<meta\b[^>]*>/gi) ?? []).find(tag => readAttribute(tag, "name")?.toLowerCase() === "robots");
    if (!robotsTag) continue;
    const robotsTokens = (readAttribute(robotsTag, "content") ?? "").toLowerCase().split(",").map(token => token.trim());
    if (robotsTokens.includes("noindex") || robotsTokens.includes("none") || !robotsTokens.includes("index")) continue;
    const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? []).find(tag => (readAttribute(tag, "rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"));
    const canonicalValue = canonicalTag ? readAttribute(canonicalTag, "href") : null;
    if (!canonicalValue) continue;
    let canonical;
    try { canonical = new URL(canonicalValue.replace(/&amp;/g, "&")); } catch { continue; }
    if (canonical.origin !== origin || canonical.search || canonical.hash || canonical.username || canonical.password) continue;
    if (canonical.pathname !== expectedPathForHtml(relativePath)) continue;
    const canonicalUrl = canonical.origin + canonical.pathname;
    const previousOwner = owners.get(canonicalUrl);
    if (previousOwner && previousOwner !== relativePath) throw new Error("Duplicate self-canonical URL in generated HTML: " + canonicalUrl);
    owners.set(canonicalUrl, relativePath);
  }
  return [...owners.keys()].sort();
}
function makeUrlset(urls) {
  const entries = urls.map(url => "  <url>" + LF + "    <loc>" + xmlEscape(url) + "</loc>" + LF + "  </url>" + LF).join("");
  return XML_HEADER + URLSET_START + entries + URLSET_END;
}
function makeIndex(urls) {
  const entries = urls.map(url => "  <sitemap>" + LF + "    <loc>" + xmlEscape(url) + "</loc>" + LF + "  </sitemap>" + LF).join("");
  return XML_HEADER + INDEX_START + entries + INDEX_END;
}

/** Split at 45,000 URLs or 45 MiB, below protocol limits. */
export function createSitemapDocuments(urls, originValue, options = {}) {
  const origin = normalizeOrigin(originValue);
  const maxUrls = options.maxUrls ?? 45000;
  const maxBytes = options.maxBytes ?? 45 * 1024 * 1024;
  if (!Number.isInteger(maxUrls) || maxUrls < 1 || !Number.isFinite(maxBytes) || maxBytes < 256) {
    throw new Error("Sitemap chunk limits must be positive and large enough for valid XML.");
  }
  const normalizedUrls = [...new Set(urls)].sort();
  for (const value of normalizedUrls) {
    const url = new URL(value);
    if (url.origin !== origin || url.search || url.hash || url.username || url.password) {
      throw new Error("Sitemap URL must be absolute, canonical and on the configured origin: " + value);
    }
  }
  const chunks = [];
  let current = [];
  let byteCount = Buffer.byteLength(XML_HEADER + URLSET_START + URLSET_END, "utf8");
  for (const url of normalizedUrls) {
    const entry = "  <url>" + LF + "    <loc>" + xmlEscape(url) + "</loc>" + LF + "  </url>" + LF;
    const entryBytes = Buffer.byteLength(entry, "utf8");
    if (current.length > 0 && (current.length >= maxUrls || byteCount + entryBytes > maxBytes)) {
      chunks.push(current);
      current = [];
      byteCount = Buffer.byteLength(XML_HEADER + URLSET_START + URLSET_END, "utf8");
    }
    if (byteCount + entryBytes > maxBytes) throw new Error("A single sitemap URL exceeds the configured byte limit.");
    current.push(url);
    byteCount += entryBytes;
  }
  if (current.length || chunks.length === 0) chunks.push(current);
  const childDocuments = chunks.map((chunk, index) => ({filename:"sitemap-"+(index+1)+".xml",xml:makeUrlset(chunk)}));
  if (childDocuments.length === 1) return {rootXml:childDocuments[0].xml,childFiles:[],urlCount:normalizedUrls.length,sitemapCount:1,rootType:"urlset"};
  return {
    rootXml:makeIndex(childDocuments.map(child=>origin+"/"+child.filename)),
    childFiles:childDocuments,
    urlCount:normalizedUrls.length,
    sitemapCount:childDocuments.length+1,
    rootType:"sitemapindex"
  };
}

/** Validate exact XML urlset/index documents emitted by this generator. */
export function validateSitemapXml(xmlValue) {
  const xml = String(xmlValue).replace(/\r\n/g, LF);
  if (!xml.startsWith(XML_HEADER)) throw new Error("Sitemap XML declaration is missing or malformed.");
  const urlsetMatch = xml.match(/^<\?xml version="1\.0" encoding="UTF-8"\?>\n<urlset xmlns="([^"]+)">\n([\s\S]*)<\/urlset>\n$/);
  if (urlsetMatch) {
    if (urlsetMatch[1] !== NS) throw new Error("Unexpected sitemap namespace.");
    let rest=urlsetMatch[2]; const locations=[];
    const entryPattern=/^  <url>\n    <loc>([^<]+)<\/loc>\n  <\/url>\n/;
    while(rest.length) {
      const entry=rest.match(entryPattern);
      if(!entry) throw new Error("Malformed sitemap urlset element.");
      const location=xmlUnescape(entry[1]); const parsed=new URL(location);
      if(parsed.protocol!=="https:") throw new Error("Sitemap loc must use HTTPS.");
      locations.push(location); rest=rest.slice(entry[0].length);
    }
    return {type:"urlset",locations};
  }
  const indexMatch=xml.match(/^<\?xml version="1\.0" encoding="UTF-8"\?>\n<sitemapindex xmlns="([^"]+)">\n([\s\S]*)<\/sitemapindex>\n$/);
  if(indexMatch) {
    if(indexMatch[1]!==NS) throw new Error("Unexpected sitemap index namespace.");
    let rest=indexMatch[2]; const locations=[];
    const entryPattern=/^  <sitemap>\n    <loc>([^<]+)<\/loc>\n  <\/sitemap>\n/;
    while(rest.length) {
      const entry=rest.match(entryPattern);
      if(!entry) throw new Error("Malformed sitemap index element.");
      const location=xmlUnescape(entry[1]); const parsed=new URL(location);
      if(parsed.protocol!=="https:") throw new Error("Sitemap index loc must use HTTPS.");
      locations.push(location); rest=rest.slice(entry[0].length);
    }
    return {type:"sitemapindex",locations};
  }
  throw new Error("Sitemap root element is not urlset or sitemapindex.");
}
export async function writeStaticSitemap({outputDirectory,origin}) {
  const urls=await discoverIndexableHtmlUrls(outputDirectory,origin);
  const documents=createSitemapDocuments(urls,origin);
  await writeFile(path.join(outputDirectory,"sitemap.xml"),documents.rootXml,"utf8");
  for(const child of documents.childFiles) await writeFile(path.join(outputDirectory,child.filename),child.xml,"utf8");
  return {urlCount:documents.urlCount,sitemapCount:documents.sitemapCount,rootType:documents.rootType};
}
