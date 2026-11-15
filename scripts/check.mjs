import { readFile, readdir, stat } from "node:fs/promises";
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
const pageCss=await readFile(path.join(root,"src/assets/css/page.css"),"utf8");
const pageData=JSON.parse(await readFile(path.join(root,"src/data/pages.json"),"utf8"));
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
 ["Page-family CSS syntax structure",cssStructureValid(pageCss)],
 ["HTML image tags have nonempty alt text",imagesHaveAlt],
 ["HTML image tags have explicit positive dimensions",imagesHaveDimensions],
 ["HTML IDs are unique",uniqueIds]
];
let failed=0;
for(const [label,ok] of checks){console.log((ok?"PASS ":"FAIL ")+label);if(!ok)failed++}
const refs=[...html.matchAll(/src="(\/assets\/images\/[^"]+\.webp)"/g)].map(m=>m[1]);
for(const ref of [...new Set(refs)]){
 try{
  const target=path.join(dist,ref.slice(1));
  const f=await stat(target);
  const bytes=await readFile(target);
  const webp=bytes.length>12&&bytes.toString("ascii",0,4)==="RIFF"&&bytes.toString("ascii",8,12)==="WEBP";
  console.log((webp?"PASS ":"FAIL ")+ref+" "+f.size+" bytes, "+(webp?"RIFF/WEBP":"invalid WebP signature"));
  if(!webp)failed++;
 }catch{console.log("FAIL missing "+ref);failed++}
}
const heroTag=imageTags.find(tag=>/src=["']\/assets\/images\/hero-coast\.webp["']/.test(tag))||"";
const heroPriority=/fetchpriority=["']high["']/.test(heroTag)&&/loading=["']eager["']/.test(heroTag);
console.log((heroPriority?"PASS ":"FAIL ")+"hero uses eager high-priority loading");
if(!heroPriority)failed++;
const nonHeroImages=imageTags.filter(tag=>!/hero-coast\.webp/.test(tag));
const nonHeroLazy=nonHeroImages.every(tag=>/loading=["']lazy["']/.test(tag));
console.log((nonHeroLazy?"PASS ":"FAIL ")+"all other homepage images use lazy loading");
if(!nonHeroLazy)failed++;
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

async function listHtmlFiles(directory){
 const results=[];
 for(const entry of await readdir(directory,{withFileTypes:true})){
  const absolute=path.join(directory,entry.name);
  if(entry.isDirectory())results.push(...await listHtmlFiles(absolute));
  else if(entry.isFile()&&entry.name.toLowerCase().endsWith(".html"))results.push(absolute);
 }
 return results;
}
function htmlAttribute(tag,name){const m=tag.match(new RegExp("\\b"+name+"=[\\\"']([^\\\"']*)[\\\"']","i"));return m?.[1]??null;}
const routeRecords=pageData.pages??[];
const routePaths=routeRecords.map(page=>page.path);
const expectedUnique=routePaths.length===new Set(routePaths).size;
const routeByPath=new Map(routeRecords.map(page=>[page.path,page]));
const dataTitles=routeRecords.map(page=>page.title.trim());
const dataDescriptions=routeRecords.map(page=>page.description.trim());
const duplicateDataTitles=dataTitles.length!==new Set(dataTitles).size;
const duplicateDataDescriptions=dataDescriptions.length!==new Set(dataDescriptions).size;
let invalidParent=false,parentCycle=false;
for(const page of routeRecords){
 if(page.parent!=="/"&&!routeByPath.has(page.parent)){invalidParent=true;continue;}
 const visited=new Set();let cursor=page;
 while(cursor&&cursor.parent!=="/"){
  if(visited.has(cursor.path)){parentCycle=true;break;}
  visited.add(cursor.path);cursor=routeByPath.get(cursor.parent);
  if(!cursor){invalidParent=true;break;}
 }
}
console.log((!duplicateDataTitles&&!duplicateDataDescriptions?"PASS ":"FAIL ")+"unique source page titles and descriptions");
if(duplicateDataTitles||duplicateDataDescriptions)failed++;
console.log((!invalidParent&&!parentCycle?"PASS ":"FAIL ")+"page parent references and acyclic breadcrumbs");
if(invalidParent||parentCycle)failed++;
console.log((routeRecords.length===37&&expectedUnique?"PASS ":"FAIL ")+"37 unique page route records");
if(routeRecords.length!==37||!expectedUnique)failed++;
const htmlFiles=await listHtmlFiles(dist);
const linkFailures=[];
const pageFailures=[];
const canonicalValues=[];
const renderedTitles=[];
for(const page of routeRecords){
 const target=path.join(dist,page.path.slice(1),"index.html");
 try{
  const output=await readFile(target,"utf8");
  const title=(output.match(/<title>([^<]+)<\/title>/i)||[])[1]??"";
  const description=(output.match(/<meta\b[^>]*name="description"[^>]*>/i)||[])[0]??"";
  const canon=(output.match(/<link\b[^>]*rel="canonical"[^>]*>/i)||[])[0]??"";
  const canonHref=htmlAttribute(canon,"href");
  const robots=(output.match(/<meta\b[^>]*name="robots"[^>]*>/i)||[])[0]??"";
  const robotsValue=htmlAttribute(robots,"content")??"";
  const valid=title.toLowerCase().includes("travelguide")&&description&&canonHref===origin+page.path&&(/noindex, nofollow/i.test(robotsValue)===noindex)&&((output.match(/<h1\b/gi)||[]).length===1)&&/aria-label="Breadcrumb"/.test(output);
  if(!valid)pageFailures.push({path:page.path,title,canonical:canonHref,robots:robotsValue});
  if(canonHref)canonicalValues.push(canonHref);
  if(title)renderedTitles.push(title);
 }catch{pageFailures.push({path:page.path,missing:true});}
}
console.log((pageFailures.length===0?"PASS ":"FAIL ")+routeRecords.length+" generated HTML page files, unique self-canonicals, robots, H1 and breadcrumbs");
if(pageFailures.length){console.log("Page failures:",JSON.stringify(pageFailures));failed++;}
if(canonicalValues.length!==new Set(canonicalValues).size){console.log("FAIL duplicate page canonical URLs");failed++;}
else console.log("PASS unique canonical URLs");
if(renderedTitles.length!==new Set(renderedTitles).size){console.log("FAIL duplicate rendered page titles");failed++;}
else console.log("PASS unique rendered page titles");
for(const file of htmlFiles){
 const output=await readFile(file,"utf8");
 for(const match of output.matchAll(/\bhref="([^"]+)"/gi)){
  const href=match[1].replace(/&amp;/g,"&");
  if(!href.startsWith("/")||href.startsWith("//"))continue;
  const pathname=href.split(/[?#]/)[0];
  const relative=pathname==="/"?"index.html":pathname.endsWith("/")?pathname.slice(1)+"index.html":pathname.slice(1);
  try{await stat(path.join(dist,relative));}
  catch{linkFailures.push({file:path.relative(dist,file),href});}
 }
}
console.log((linkFailures.length===0?"PASS ":"FAIL ")+"all root-relative internal HTML links resolve to physical files");
if(linkFailures.length){console.log("Broken internal links:",JSON.stringify(linkFailures));failed++;}
console.log("Static HTML documents:",htmlFiles.length,"| page family records:",routeRecords.length);

if(failed)process.exitCode=1;
