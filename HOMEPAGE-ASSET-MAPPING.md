# TravelGuide Homepage — Revised MEDIA-ASSETS Mapping (Reuse Policy)

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Branch:** `development/homepage`  
**CDN base:** https://media-assets-4sb.pages.dev  
**Source of truth:** Private `prem-pk-dev/MEDIA-ASSETS` `main` inventory and `ASSET-INDEX.json`  
**Policy update (2026-11-14):** User explicitly authorizes reuse of the same existing MEDIA-ASSETS WebP image across multiple homepage sections. New image generation is not required. Reuse is allowed only where the actual photographed subject is appropriate; it does not waive image/cdn verification.

## Verification boundary

Original files for the candidates described below were fetched from the private GitHub repo as base64 binary, decoded and visually rendered in this session. Their previews show the scenes described below. However, Cloudflare Pages live requests from the available execution environment currently return HTTP 403 / `text/plain` for all candidate endpoints tested. Earlier direct image-reader verification for the Mountain Hiker URL returned HTTP 200 but `text/html` (the Media Assets Library fallback). Therefore:

- Source GitHub binary existence and visual subject can be inspected for listed files.
- **Current public CDN delivery is not verified** for this mapping pass.
- The CDN URLs below are intended path-derived URLs from the MEDIA-ASSETS Pages deployment guide; do not consider them live-certified until a public browser/network check returns HTTP 200, `Content-Type: image/webp` and RIFF/WEBP bytes.
- No homepage references have been changed in code/data. Existing `srcset`, `sizes`, lazy-loading or hero priority logic must be preserved in a later integration step.
- No source file dimensions are inferred from target dimensions. Dimensions not stated here remain unverified in this pass.

## 1. Six previously rejected replacement slots

| Homepage filename | Selected source | Intended use and factual visual content | Source public URL | Target dimensions | Status |
|---|---|---|---|---:|---|
| `hero-coast.webp` | `images/travel/destinations/amalfi-coast-village-v01.webp` | Amalfi cliffside village, pastel buildings, rocky coastline and turquoise Mediterranean water; scene is village-led and not a clean natural cliff-only scene | https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp | 1920×1200 | **Conditional candidate** — visual subject relevant, but left headline-safe area and actual CDN response remain unverified. If this source is accepted, hero alt text must mention Amalfi cliffside village/shoreline, not generic empty coastline. |
| `asia.webp` | `images/travel/destinations/20-ha-long-bay-vietnam-v01.webp` (previously rejected) | Karsts and red-sailed boat are appropriate but the source has baked-in white frame/caption footer; rejected in prior visual review | https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp | 900×1120 | **Rejected / not reused** — explicit reuse permission does not remove burned-in graphics or landscape-to-portrait crop failure. |
| `africa.webp` | `images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp` | Wide Serengeti savannah, acacia trees, elephant herd and sunrise light; subject is accurate, but this is a wide frame and morning light rather than specified warm evening | https://media-assets-4sb.pages.dev/images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp | 900×1120 | **Conditional candidate** — reuse subject is appropriate, but portrait crop/time-of-day mismatch must be accepted or the requirement adjusted. |
| `americas.webp` | `images/travel/destinations/alpine-glacial-lake-v01.webp` | Snow-covered alpine peaks, conifer forest, turquoise glacial lake and clear reflection | https://media-assets-4sb.pages.dev/images/travel/destinations/alpine-glacial-lake-v01.webp | 900×1120 | **Conditional candidate** — good subject, but landscape source to portrait target crop and CDN response are unverified. |
| `oceania.webp` | `images/nature/tropical_white_sand_beach.webp` | Tropical palm-lined white sand beach and clear turquoise water; does not show a distinct lush South Pacific volcanic island/lagoon | https://media-assets-4sb.pages.dev/images/nature/tropical_white_sand_beach.webp | 900×1120 | **Fallback only** — beach is Oceania-adjacent generic tropical imagery, not a verified South Pacific island. Do not label alt text as Bora Bora/South Pacific island unless geography is substantiated. |
| `alpine-hiking.webp` | `images/nature/alpine_wildflower_meadow.webp` | Broad alpine wildflower meadow beneath snowy mountain ridges; no visible path/hiker in the rendered preview | https://media-assets-4sb.pages.dev/images/nature/alpine_wildflower_meadow.webp | 900×680 | **Fallback only** — alpine landscape subject, but hiking trail is not visible. Use only if activity label/alt text is changed to alpine meadow walk/landscape; otherwise the original Mountain Hiker thumbnail remains too small and its CDN path is broken. |

## 2. Other inspected candidates and reuse assignments

| Source | Visually observed content | Possible homepage reuse | Decision |
|---|---|---|---|
| `images/travel/destinations/kyoto-bamboo-garden-v01.webp` | Bamboo-lined Kyoto-style garden path and wooden gate | `kyoto-street.webp`; may also be reused in inspiration mega-menu as same photo | **Good visual subject match**. Alt text must describe bamboo garden path, not machiya street or generic street. |
| `images/travel/destinations/santorini-caldera-sunset-v01.webp` | Whitewashed Santorini buildings, blue domes, caldera and sunset | Europe tile or a general Greece/Santorini editorial card, if suitable | **Not a hero substitute**; sunset and architecture-led scene do not match clear-morning natural coastline. |
| `images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp` | Acacia trees and elephants in golden sunrise savannah | Africa tile plus a separate wildlife/editorial section if that section's subject calls for safari | **Same source reuse allowed**, but the image remains landscape, not portrait. |
| `images/travel/destinations/alpine-glacial-lake-v01.webp` | Turquoise lake, snow peaks and reflection | Americas tile and other mountain-lake editorial sections | **Reuse allowed** only if actual crop works in each slot. |
| `images/nature/01_alpine_lake_sunrise.webp` | Mountain range, sunrise, forest, lake reflection | General alpine landscape or lake-themed editorial section | **Strong generic alpine alternative**, not an exact named Americas place. |
| `images/nature/tropical_white_sand_beach.webp` | Palm-lined tropical white sand beach and water | Tropical beach inspiration / generic island/beach content | **Not a verified Oceania island.** |
| `images/nature/terraced_green_hills.webp` | Terraced green hills and forested mountain backdrop | Travel inspiration / countryside scenery | Not a valid substitute for a different named country/city or hiking trail unless the slot content is changed. |
| `images/travel/destinations/06-machu-picchu-peru-v01.webp` | Inca citadel and steep green mountain | Peru/Andes featured destination | **Not an Americas mountain-lake image**; do not use for `americas.webp`. |
| `thumbnails/travel-mountain-hiker.webp` | Hiker overlooking alpine ridges; original 640×360 | Small thumbnail-only fallback | **Not suitable** for 900×680 target; exact CDN route returned HTML in prior verification. |

## 3. Complete 22-slot mapping register

This register reuses existing image sources where visually appropriate. It records repeated assignments transparently. Any `not selected` entry remains a candidate to be selected only after inspecting its binary and source image; never insert an unverified/dummy placeholder.

| # | Homepage slot | Preferred existing source / CDN path | Repeated source? | Alt text should describe | Current mapping status |
|---:|---|---|---|---|---|
| 1 | `hero-coast.webp` | `/images/travel/destinations/amalfi-coast-village-v01.webp` | No | Amalfi cliffside village above Mediterranean water | Conditional hero candidate; crop/CDN pending |
| 2 | `asia.webp` | `/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp` | No | Ha Long Bay karsts and traditional red-sailed boat | Rejected due baked-in border/caption; do not integrate |
| 3 | `europe.webp` | `/images/travel/destinations/santorini-caldera-sunset-v01.webp` | No | Whitewashed Santorini buildings and blue-domed churches above caldera at sunset | Visual subject match, but target Europe tile dimensions/crop/CDN not verified |
| 4 | `africa.webp` | `/images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp` | Shared with future safari/editorial slot allowed | Elephants crossing golden Serengeti grassland beneath acacia trees at sunrise | Conditional subject match; source is landscape and sunrise |
| 5 | `americas.webp` | `/images/travel/destinations/alpine-glacial-lake-v01.webp` | Shared with alpine lake editorial slot allowed | Turquoise glacial lake reflecting snow-covered alpine peaks and evergreen forest | Conditional subject match; portrait crop/CDN pending |
| 6 | `oceania.webp` | No verified exact existing source; generic fallback `/images/nature/tropical_white_sand_beach.webp` | Reuse allowed | Palm-lined tropical beach and turquoise water (not a named South Pacific island) | Exact South Pacific island match not found in inspected files |
| 7 | `kyoto-street.webp` | `/images/travel/destinations/kyoto-bamboo-garden-v01.webp` | Reused in inspiration mega-menu | Sunlit bamboo-lined garden path leading to a traditional wooden gate in Kyoto | Good visual match to Kyoto garden, not machiya street |
| 8 | `lisbon-tram.webp` | `/images/travel/destinations/23-lisbon-portugal-v01.webp` | No | Must describe actual Lisbon scene after preview inspection | Candidate label only; actual tram presence not verified |
| 9 | `marrakech-courtyard.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 10 | `slow-train.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 11 | `alpine-hiking.webp` | `/images/nature/alpine_wildflower_meadow.webp` (fallback only) | Reusable with meadow/outdoors sections | Alpine wildflower meadow beneath snow-covered peaks | Trail is not visible; do not keep hiking alt/copy unless slot title changes |
| 12 | `ceramic-workshop.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 13 | `portugal-coast.webp` | `/images/travel/destinations/amalfi-coast-village-v01.webp` is not Portugal and must not be used | — | — | No verified Portugal coastal-village source selected |
| 14 | `japan-rail.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 15 | `marrakech-medina.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 16 | `swiss-trail.webp` | `/images/travel/destinations/alpine-glacial-lake-v01.webp` is a lake, not a footpath; `alpine_wildflower_meadow.webp` is a meadow, not a trail | — | — | No valid trail source selected |
| 17 | `seasonal-coast.webp` | `/images/travel/destinations/amalfi-coast-village-v01.webp` | Shared with hero only if user accepts reuse | Amalfi coastal village, cliffs and Mediterranean sea | Candidate source is reused; editorial time-of-year/season not visually established |
| 18 | `market-morning.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 19 | `neighbourhood-cafe.webp` | `/images/general/general-coffee-lifestyle.webp` | No | Coffee/lifestyle scene only, if preview supports it | Candidate not visually inspected; don't assign yet |
| 20 | `calendar-planning.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 21 | `train-platform.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |
| 22 | `travel-bag.webp` | No suitable inspected existing source | — | — | Unverified; no matching file selected |

## 4. Reuse register

The user permits reuse of the same source file across multiple homepage slots. Potential repeat assignments are:

- `amalfi-coast-village-v01.webp`: hero + seasonal coast (only after visual acceptance; the seasonal aspect itself is not established).
- `serengeti-elephant-safari-sunrise-v01.webp`: Africa tile + any safari/wildlife editorial slot where sunrise scene is truthful.
- `alpine-glacial-lake-v01.webp`: Americas tile + other alpine-lake content.
- `kyoto-bamboo-garden-v01.webp`: Kyoto feature + inspiration mega-menu.

Do not use the same image as a shortcut for unrelated subjects (e.g., an alpine lake is not an alpine hiking trail; a Mediterranean village is not a Portuguese town; a tropical beach is not necessarily a South Pacific island).

## 5. CDN and image delivery gate

Current tested Cloudflare connector fetches returned HTTP 403 and `text/plain;charset=UTF-8` (65-byte body) for several new candidate URLs. This is a tool-environment result and does not prove the public Pages project is universally inaccessible. However, these URLs are not certified.

To accept a URL, verify from a normal public browser/network or user-supplied network output:
1. HTTP 200;
2. `Content-Type: image/webp`;
3. non-empty body begins with RIFF/WEBP signature;
4. decoded width and height;
5. browser renders actual image without HTML fallback;
6. desktop/mobile crop at the homepage target ratio.

**Broken known path:** `https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp` — previous direct response was 200 HTML, not image/webp. Do not use it.

## 6. Integration state

- Existing homepage references remain local `/assets/images/*.webp`.
- Current build script uses local static assets and emits native image dimensions from `homepage.json`.
- No new verified CDN URL is ready to replace those local references.
- Consequently no homepage code, CSS, JS or JSON image reference is changed in this pass.
- No image binary is copied into TravelGuide.
- The remaining mapping slots are not declared complete: a CDN URL list alone is not proof that those image URLs load.

**Decision:** Reuse authorized and visually appropriate images where possible, but do not commit unverified CDN URLs into production-facing homepage references. Complete the external CDN verification gate before image integration.

---

# Live CDN and visual re-audit — 15 November 2026

This addendum supersedes provisional CDN/subject statements above where they conflict. Nine unique current homepage source URLs were fetched in a browser. All returned HTTP 200, Content-Type image/webp, RIFF/WEBP bytes and positive decoded dimensions. Source binaries match the private MEDIA-ASSETS Git blob identities. Metadata identifies these files as AI-generated illustrative artwork, not documentary photography.

## Complete 22-slot register

| # | Required slot | Target pixels | Current local file / CDN source | HTTP / MIME | Actual decoded pixels | Visual assessment and crop |
|---:|---|---:|---|---|---:|---|
| 1 | hero-coast.webp | 1920×1200 | src/assets/images/hero-coast.webp → [Amalfi source](https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp) | 200 / image/webp | 1672×941 | Amalfi cliff village, road, cliffs and turquoise sea. Not an empty natural coast; left third has village detail, so headline-safe composition is conditional under the dark scrim. Mobile crop uses 62% horizontal position. |
| 2 | asia.webp | 900×1120 | src/assets/images/asia.webp → [Kyoto bamboo source](https://media-assets-4sb.pages.dev/images/travel/destinations/kyoto-bamboo-garden-v01.webp) | 200 / image/webp | 1672×941 | Bamboo path and wooden gate in a Kyoto/Japan-inspired scene. Asia region is truthful, but the specification's limestone-karst/Ha Long Bay subject is not met. Portrait crop keeps the central path/gate; exact visual requirement remains conditional. |
| 3 | europe.webp | 900×1120 | src/assets/images/europe.webp → [Santorini source](https://media-assets-4sb.pages.dev/images/travel/destinations/santorini-caldera-sunset-v01.webp) | 200 / image/webp | 1672×941 | Santorini buildings, blue domes, caldera and sunset; European region is truthful. The brief asked for a riverside town, so visual concept differs. Portrait crop retains central domes/buildings. |
| 4 | africa.webp | 900×1120 | src/assets/images/africa.webp → [Serengeti source](https://media-assets-4sb.pages.dev/images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp) | 200 / image/webp | 1672×941 | Elephant herd, acacias and savannah. Source is sunrise, not evening. Tile now uses object-position 80% center to retain the herd in a tighter portrait crop. |
| 5 | americas.webp | 900×1120 | src/assets/images/americas.webp → [Machu Picchu source](https://media-assets-4sb.pages.dev/images/travel/destinations/06-machu-picchu-peru-v01.webp) | 200 / image/webp | 900×512 | Actual subject is Machu Picchu/Andes, not an alpine glacial lake. This is relevant to the Americas, but wide-to-portrait crop is severe and may cut terraces/context; a new crop/source or revised art direction is needed. |
| 6 | oceania.webp | 900×1120 | src/assets/images/oceania.webp → [Tropical beach fallback](https://media-assets-4sb.pages.dev/images/nature/tropical_white_sand_beach.webp) | 200 / image/webp | 1200×800 | Generic palm-lined tropical beach and turquoise water. No lush volcanic ridge; no evidence ties it to a specific South Pacific island. Technically valid WebP, not approved as the required Oceania subject. |
| 7 | kyoto-street.webp | 960×1200 | src/assets/images/kyoto-street.webp → [Kyoto bamboo source](https://media-assets-4sb.pages.dev/images/travel/destinations/kyoto-bamboo-garden-v01.webp) | 200 / image/webp | 1672×941 | Kyoto-inspired bamboo garden path and wooden gate, not a machiya street. Current “beyond the famous gates” feature is contextually relevant if title/alt stay truthful. Reused in Asia tile and mega menu; one source binary. |
| 8 | lisbon-tram.webp | 960×1200 | src/assets/images/lisbon-tram.webp → [Lisbon tram source](https://media-assets-4sb.pages.dev/images/travel/destinations/23-lisbon-portugal-v01.webp) | 200 / image/webp | 900×510 | Yellow Lisbon tram in a tiled street; strong subject match. Source is landscape and slightly narrower than target; card crop keeps central tram. No caption/border. |
| 9 | marrakech-courtyard.webp | 960×1200 | No exact source identified | Not applicable | — | Missing. Need authentic Moroccan riad courtyard, zellige fountain, carved cedar and orange tree. |
| 10 | slow-train.webp | 900×680 | No exact source identified | Not applicable | — | Missing. Need passenger train moving through a green mountain valley, with train and landscape together. |
| 11 | alpine-hiking.webp | 900×680 | Current inspiration image src/assets/images/alpine-meadow.webp → [Alpine meadow fallback](https://media-assets-4sb.pages.dev/images/nature/alpine_wildflower_meadow.webp) | 200 / image/webp | 1200×800 | Meadow and snowy peaks are visible, but no trail or hiker. Keep only as a generic meadow/outdoors fallback; it does not fulfil the hiking brief. |
| 12 | ceramic-workshop.webp | 900×680 | No exact source identified | Not applicable | — | Missing. Need artisan hands shaping a clay vessel in a pottery workshop; no fabricated signage. |
| 13 | portugal-coast.webp | 1000×740 | No exact source identified | Not applicable | — | Missing. Amalfi is Italy and must not be reused as Portugal. Need a visibly Portuguese Atlantic coastal town/cliffline. |
| 14 | japan-rail.webp | 1000×740 | No exact source identified | Not applicable | — | Missing. Need a Japanese passenger train in a recognisable rail setting, without invented logos. |
| 15 | marrakech-medina.webp | 860×720 | No exact source identified | Not applicable | — | Missing. Need Marrakech medina lanes, traditional shops/architecture and public-space context. |
| 16 | swiss-trail.webp | 860×720 | No exact source identified | Not applicable | — | Missing. Need an unmistakable hiking footpath in a Swiss alpine valley. A lake or meadow alone is insufficient. |
| 17 | seasonal-coast.webp | 920×680 | src/assets/images/seasonal-coast.webp → [Amalfi source](https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp) | 200 / image/webp | 1672×941 | Same Amalfi source as hero, explicitly permitted reuse. Accurate as an Amalfi Coast example, but not a separate seasonal scene. Duplicate is documented. |
| 18 | market-morning.webp | 920×680 | No exact source identified | Not applicable | — | Missing. Need an early morning produce market with stalls and goods; no invented legible signage. |
| 19 | neighbourhood-cafe.webp | 920×680 | src/assets/images/neighbourhood-cafe.webp → [Coffee source](https://media-assets-4sb.pages.dev/images/general/general-coffee-lifestyle.webp) | 200 / image/webp | 519×442 | Latte on a wooden table beside a leafy plant; not a full neighbourhood or identifiable café. Kept as a limited coffee/café detail with literal alt text. Native resolution is below target; check card sharpness. |
| 20 | calendar-planning.webp | 800×620 | No exact source identified | Not applicable | — | Missing. Need notebook, calendar/planning material and map on a table; no legible generated dates/text. |
| 21 | train-platform.webp | 800×620 | No exact source identified | Not applicable | — | Missing. Need passenger train at a station platform, without fabricated operator branding. |
| 22 | travel-bag.webp | 800×620 | No exact source identified | Not applicable | — | Missing. Need open travel bag and practical travel essentials, without brand cues. |

## Verified counts and duplicate use

- 11 current local image filenames are present in the homepage image directory and referenced in the rendered homepage; the mega menu also repeats the Kyoto source.
- 9 unique binary source files are used by current references. All 9 unique CDN paths tested returned HTTP 200, image/webp, RIFF/WEBP and positive decoded dimensions.
- 2 authorised reuse groups: Amalfi (hero + seasonal coast) and Kyoto bamboo (Asia + Kyoto feature/mega menu).
- 7 unique source binaries support 9 relevant placements; two current files are fallback-only (Oceania tropical beach and alpine meadow).
- 11 exact-source slots have no suitable existing file identified: 9, 10, 12, 13, 14, 15, 16, 18, 20, 21 and 22.
- Known broken thumbnail route thumbnails/travel-mountain-hiker.webp returns HTTP 200 but text/html, not WebP.

## Responsive and loading verification

- Browser Rendering checked 12 image DOM uses at each of 360, 390, 768, 1024 and 1440 CSS pixels: 60 image-use observations; all decoded with positive natural dimensions.
- Object-fit crop geometry and object-position were measured at all five widths. Fallback/missing subjects remain unresolved; the geometry probe does not constitute full visual approval for all 22 source concepts.
- Hero uses fetchpriority=high, loading=eager and async decoding. All other homepage image uses use loading=lazy and async decoding.
- Manifest width/height values and emitted image attributes now match actual decoded source dimensions; no source binary was resized or altered.

**Phase 2.8 status: PARTIALLY VERIFIED — NOT COMPLETE.** Continue resolving unsupported subjects. Do not start Phase 2.9 until all 22 slots are genuinely approved and integrated.
