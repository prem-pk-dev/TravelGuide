import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { createSitemapDocuments, discoverIndexableHtmlUrls, validateSitemapXml } from "./sitemap.mjs";

const root=process.cwd(),dist=path.resolve(root,process.env.TRAVELGUIDE_DIST_DIR??"dist");
const isProductionBuild=(process.env.CF_PAGES_BRANCH??"")==="main";
const site=JSON.parse(await readFile(path.join(root,"src/data/site.json"),"utf8"));
const origin=new URL(site.canonicalOrigin).origin;
const productionIndexingEnabled=isProductionBuild&&site.productionIndexingEnabled===true;
const noindex=!productionIndexingEnabled;
const html=await readFile(path.join(dist,"index.html"),"utf8");
const robotsMeta=(html.match(/<meta\b[^>]*>/gi)||[]).find(tag=>/\bname=["']robots["']/i.test(tag))||"";
const robotsContent=robotsMeta.match(/\bcontent=["']([^"']+)["']/i)?.[1]?.toLowerCase()||"";
const canonical=(html.match(/<link\b[^>]*>/gi)||[]).find(tag=>/\brel=["']canonical["']/i.test(tag))||"";
const canonicalHref=canonical.match(/\bhref=["']([^"']+)["']/i)?.[1]||"";
const robotsTxt=await readFile(path.join(dist,"robots.txt"),"utf8");
const headers=await readFile(path.join(dist,"_headers"),"utf8");
const css=await readFile(path.join(root,"src/assets/css/site.css"),"utf8");
const jsPath=path.join(root,"src/assets/js/site.js");
const jsResult=spawnSync(process.execPath,["--check",jsPath],{encoding:"utf8"});
function cssStructureValid(source){
 const pairs={"}":"{",")":"(","]":"["},stack=[];
 let quote=null,comment=false,escaped=false;
 for(let i=0;i<source.length;i++){
  const ch=source[i],next=source[i+1];
  if(comment){if(ch==="*"&&next==="/"){comment=false;i++;}continue;}
  if(quote){if(escaped){escaped=false;continue;}if(ch==="\\"){escaped=true;continue;}if(ch===quote)quote=null;continue;}
  if(ch==="/"&&next==="*"){comment=true;i++;continue;}
  if(ch==="'"||ch==='"'){quote=ch;continue;}
  if(ch==="{"||ch==="("||ch==="["){stack.push(ch);continue;}
  if(ch==="}"||ch===")"||ch==="]"){if(stack.pop()!==pairs[ch])return false;}
 }
 return stack.length===0&&!quote&&!comment&&!escaped;
}
function attribute(tag,name){
 const match=tag.match(new RegExp("\\b"+name+"=[\"']([^\"']*)[\"']","i"));
 return match?.[1]??match?.[2]??null;
}
const imageTags=[...html.matchAll(/<img\b[^>]*>/gi)].map(match=>match[0]);
const imagesHaveAlt=imageTags.every(tag=>attribute(tag,"alt")!==null&&attribute(tag,"alt").trim().length>0);
const imagesHaveDimensions=imageTags.every(tag=>Number(attribute(tag,"width"))>0&&Number(attribute(tag,"height"))>0);
const ids=[...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(match=>match[1]);
const uniqueIds=ids.length===new Set(ids).size;
const checks=[
 ["HTML5 doctype",/^<!doctype html>/i.test(html)],
 ["One H1",(html.match(/<h1\b/gi)||[]).length===1],
 ["Main landmark",/<main\b[^>]*id="main"/i.test(html)],
 ["Title",/<title>[^<]+<\/title>/.test(html)],
 ["Description",/<meta name="description"/.test(html)],
 ["Production canonical",canonicalHref===origin+"/"],
 ["Robots meta matches branch and launch gate",noindex?robotsContent.includes("noindex"):robotsContent.includes("index")&&!robotsContent.includes("noindex")],
 ["Preview robots allow page fetching and omit Sitemap line",isProductionBuild||(/User-agent: \*/.test(robotsTxt)&&/Allow: \//.test(robotsTxt)&&!/Sitemap:/i.test(robotsTxt))],
 ["Production stays Disallow until approval",!isProductionBuild||productionIndexingEnabled||/Disallow: \//.test(robotsTxt)],
 ["Production advertises sitemap only when approved",productionIndexingEnabled?robotsTxt.includes("Sitemap: "+origin+"/sitemap.xml")&&!/Disallow: \//.test(robotsTxt):!/Sitemap:/i.test(robotsTxt)],
 ["Noindex response header when protected",noindex?/X-Robots-Tag: noindex, nofollow/i.test(headers):!/X-Robots-Tag:.*noindex/i.test(headers)],
 ["Sitemap XML content type rule",/\/sitemap\*\.xml\n  Content-Type: application\/xml; charset=utf-8/.test(headers)],
 ["Robots text content type rule",/\/robots\.txt\n  Content-Type: text\/plain; charset=utf-8/.test(headers)],
 ["Search forms",(html.match(/data-search-form/g)||[]).length>=2],
 ["8+ sections",(html.match(/<section\b/g)||[]).length>=8],
 ["Skip link",/class="skip-link"/.test(html)],
 ["Mobile navigation",/id="mobile-navigation"/.test(html)],
 ["JavaScript syntax (node --check)",jsResult.status===0],
 ["CSS syntax structure (balanced delimiters/strings/comments)",cssStructureValid(css)],
 ["HTML image tags have nonempty alt text",imagesHaveAlt],
 ["HTML image tags have explicit positive dimensions",imagesHaveDimensions],
 ["HTML IDs are unique",uniqueIds]
];
let failed=0;
for(const [label,ok] of checks){console.log((ok?"PASS ":"FAIL ")+label);if(!ok)failed++}
const refs=[...html.matchAll(/src="(\/assets\/images\/[^"]+\.webp)"/g)].map(m=>m[1]);
for(const ref of [...new Set(refs)]){try{const f=await stat(path.join(dist,ref.slice(1)));console.log("PASS "+ref+" "+f.size+" bytes")}catch{console.log("FAIL missing "+ref);failed++}}
const cssUrls=[...css.matchAll(/url\(\s*(?:(["'])(.*?)\1|([^){}]*?))\s*\)/gi)]
 .map(match=>(match[2]??match[3]??"").trim())
 .filter(value=>value&&!/^(?:data:|https?:|#)/i.test(value));
for(const ref of cssUrls){
 const target=ref.startsWith("/")?path.join(dist,ref.slice(1)):path.resolve(dist,"assets/css",ref);
 try{await stat(target);console.log("PASS CSS asset "+ref)}catch{console.log("FAIL missing CSS asset "+ref);failed++}
}
if(cssUrls.length===0)console.log("PASS CSS has no local url() asset references to resolve");
if(jsResult.status!==0)console.log("JavaScript syntax details:",jsResult.stderr||jsResult.stdout);

try{
 const rootXml=await readFile(path.join(dist,"sitemap.xml"),"utf8");
 const rootDoc=validateSitemapXml(rootXml);
 let locations=[];
 if(rootDoc.type==="urlset")locations=rootDoc.locations;
 else for(const childUrl of rootDoc.locations){
  const child=new URL(childUrl);if(child.origin!==origin)throw new Error("Sitemap index has noncanonical child host.");
  const childDoc=validateSitemapXml(await readFile(path.join(dist,path.basename(child.pathname)),"utf8"));
  if(childDoc.type!=="urlset")throw new Error("Sitemap child must be a urlset.");
  locations.push(...childDoc.locations);
 }
 const expected=await discoverIndexableHtmlUrls(dist,origin);
 const match=JSON.stringify([...locations].sort())===JSON.stringify([...expected].sort());
 console.log((match?"PASS ":"FAIL ")+"Sitemap XML membership ("+locations.length+" URLs)");
 if(!match)failed++;
 if(noindex&&locations.length!==0){console.log("FAIL protected sitemap is not empty");failed++}
 else if(noindex)console.log("PASS protected sitemap contains zero URLs");
}catch(e){console.log("FAIL sitemap validation: "+e.message);failed++}
try{
 const fixture=createSitemapDocuments([origin+"/a/",origin+"/b/",origin+"/c/"],origin,{maxUrls:1,maxBytes:4096});
 const index=validateSitemapXml(fixture.rootXml);
 const good=index.type==="sitemapindex"&&fixture.childFiles.length===3&&fixture.childFiles.every(f=>validateSitemapXml(f.xml).type==="urlset");
 console.log((good?"PASS ":"FAIL ")+"Sitemap index chunking test");if(!good)failed++;
}catch(e){console.log("FAIL sitemap chunk test: "+e.message);failed++}
console.log("Build mode:",isProductionBuild?"production":"preview","| indexing:",productionIndexingEnabled?"enabled":"protected/off");
console.log("Sections:",(html.match(/<section\b/g)||[]).length,"| unique WebP:",new Set(refs).size);
if(failed)process.exitCode=1;
