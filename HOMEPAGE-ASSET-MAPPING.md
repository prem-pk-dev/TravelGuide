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

---

# Phase 2.8 — Round 2 image verification (15 November 2026)

## Updated 22-slot register

| # | Slot | Active file | Actual subject / provenance | Pixels | Result |
|---:|---|---|---|---:|---|
| 1 | Hero coast | hero-coast.webp | Amalfi cliff village; legacy AI artwork | 1672×941 | Legacy subject/provenance review open |
| 2 | Asia | asia.webp | Kyoto bamboo garden; legacy AI artwork, not limestone karsts | 1672×941 | Legacy subject/provenance review open |
| 3 | Europe | europe.webp | Santorini; legacy AI artwork, not riverside town | 1672×941 | Legacy subject/provenance review open |
| 4 | Africa | africa.webp | Serengeti elephants at sunrise; legacy AI artwork | 1672×941 | Legacy subject/provenance review open |
| 5 | Americas | americas.webp | Machu Picchu; legacy AI artwork, not Patagonian lake | 900×512 | Legacy subject/provenance review open |
| 6 | Oceania | oceania.webp | Bora Bora volcanic island and turquoise lagoon; François Balédent, Pexels | 900×1120 | Round 2 integrated |
| 7 | Kyoto feature | kyoto-street.webp | Kyoto bamboo garden; legacy AI artwork, not machiya lane | 1672×941 | Legacy subject/provenance review open |
| 8 | Lisbon tram | lisbon-tram.webp | Yellow Lisbon tram; legacy AI artwork | 900×510 | Legacy provenance review open |
| 9 | Marrakech courtyard | marrakech-courtyard.webp | Dar al Basha fountain courtyard; R Prazeres, CC BY-SA 4.0 | 960×1200 | Round 2 integrated |
| 10 | Slow train | slow-train.webp | Passenger train in green Gurtnellen valley; Kabelleger / David Gubler, CC BY-SA 4.0 | 900×680 | Round 2 integrated |
| 11 | Alpine hiking | alpine-hiking.webp | Hikers on Matterhorn footpath; Jean-Paul Wettstein, Pexels | 900×680 | Round 2 integrated |
| 12 | Ceramic workshop | ceramic-workshop.webp | Artisan hands shaping clay on a wheel; Letícia Alvares, Pexels | 900×680 | Round 2 integrated |
| 13 | Portugal coast | portugal-coast.webp | Azenhas do Mar above Atlantic; Jose Maria Lanca, CC BY-SA 4.0 | 1000×740 | Round 2 integrated |
| 14 | Japan rail | japan-rail.webp | Regional passenger train at rural Japanese station; 貴彦 佐藤, Pexels | 1000×740 | Round 2 integrated |
| 15 | Marrakech medina | marrakech-medina.webp | Historic Marrakech lane; Iainmccurdy, CC0 1.0 | 860×720 | Round 2 integrated |
| 16 | Swiss trail | alpine-hiking.webp | Same Matterhorn trail photograph as slot 11, user-authorised reuse | 900×680 | Round 2 integrated — reused |
| 17 | Seasonal coast | seasonal-coast.webp | Amalfi coast, legacy AI artwork, not quiet Atlantic seasonal shore | 1672×941 | Legacy subject/provenance review open |
| 18 | Market morning | market-morning.webp | Outdoor fresh-produce stall and vendors; Mehmet Turgut Kirkgoz, Pexels | 920×680 | Round 2 integrated; time-of-day not asserted |
| 19 | Neighbourhood café | neighbourhood-cafe.webp | Coffee cup on table; legacy AI artwork, not a neighbourhood scene | 519×442 | Legacy subject/resolution review open |
| 20 | Calendar planning | calendar-planning.webp | Notebook on world map; Lara Jameson, Pexels | 800×620 | Round 2 integrated |
| 21 | Train platform | train-platform.webp | Azuma/LNER passenger train at a platform; Dan Wright, Pexels | 800×620 | Round 2 integrated |
| 22 | Travel bag | travel-bag.webp | Open suitcase with folded clothing and essentials; SHVETS production, Pexels | 800×620 | Round 2 integrated |

## Round 2 binary verification

All 12 originals returned HTTP 200 with image/jpeg and were decoded at source dimensions. Output derivatives were generated as WebP quality 85, with exact target dimensions and RIFF/WEBP signature. Source and output SHA-256 are computed over the actual source/output bytes.

| File | Creator | Licence | Source pixels / bytes | Source SHA-256 | WebP pixels / bytes | WebP SHA-256 | Source link |
|---|---|---|---|---|---|---|---|
| oceania.webp | François Balédent | Pexels Free | 4032×2268 / 1,463,065 B | 70dd60164be01a9ee2557558644f4af455ea64cfdf2b19d66aadf7ec541f33e8 | 900×1120 / 229,298 B | ed8cfac3186cf1b96d7b2e702c2e80862fe9c84adb639d3a21a9ff1d4a3792b5 | [Source](https://www.pexels.com/photo/scenic-aerial-view-of-bora-bora-lagoon-30422271/) |
| alpine-hiking.webp | Jean-Paul Wettstein | Pexels Free | 6064×4040 / 3,063,549 B | 8f44c07a0bb00aa2d98370f000a382e99b2a0db651756e895aa5fdcdf6e8aa2d | 900×680 / 136,900 B | 0fff6a60c8138f6842f7cdc23b86e1e581e6dc592e07b0e24e0d83158855c51b | [Source](https://www.pexels.com/photo/hikers-on-a-mountain-trail-in-swiss-alps-19244950/) |
| marrakech-courtyard.webp | R Prazeres | CC BY-SA 4.0 | 4000×3000 / 3,052,596 B | eb459487b1c54612ee3d34626841f3a7c3719aa81d4cdf50546c235236059201 | 960×1200 / 392,010 B | 0ffe7fcfa63951277c3e7e001e1f3d0bd1bcc8f7c0eecc04fe0c19cc028307f6 | [Source](https://commons.wikimedia.org/wiki/File:Dar_al_Bacha_Marrakesh_DSCF8822.jpg) |
| slow-train.webp | Kabelleger / David Gubler | CC BY-SA 4.0 | 5400×3600 / 8,178,536 B | 8d8deb1f7a230f2da37726ac1da81d3a0d7696193a5a45f7c91d0c97840a8f5b | 900×680 / 227,822 B | 4bc6280b06cbc6d840bb171370f631f200921ceb0521f85201d50ebc1a16cc41 | [Source](https://commons.wikimedia.org/wiki/File:SBB_RBe_540_Gurtnellen.jpg) |
| ceramic-workshop.webp | Letícia Alvares | Pexels Free | 5760×3840 / 805,627 B | 1f63805ef22df7b070eb2b866b94ddef4a9363b4f7646dfb58c0557022812ecc | 900×680 / 44,818 B | 97e56bd232b7afd741b1c744e813ad9ad8bc2af7f4ca1482b4b09c1af98f90d1 | [Source](https://www.pexels.com/photo/hands-shaping-clay-on-pottery-wheel-in-studio-36717713/) |
| portugal-coast.webp | Jose Maria Lanca | CC BY-SA 4.0 | 4000×3000 / 2,595,794 B | 6017ccdad2cdcac08e6bd01d872beaeee94f61b9c33550a57b362ad21c2ad78a | 1000×740 / 208,908 B | ec8f020564c84ae167024351c5aa9271acce81471d8e4a4d73e3cc508271a222 | [Source](https://commons.wikimedia.org/wiki/File:Azenhas_do_Mar_(Sintra).jpg) |
| japan-rail.webp | 貴彦 佐藤 | Pexels Free | 5760×3240 / 1,306,872 B | cc5745aae59ff27330759c157fa14bb8cc7bc0599146b61da43e7e47c27fa732 | 1000×740 / 151,250 B | 7d6adf06b1ecefc49399e696e0318a1e4b09d21e82a106af05b40e2aca89638e | [Source](https://www.pexels.com/photo/japanese-train-arriving-at-rural-station-platform-35497307/) |
| marrakech-medina.webp | Iainmccurdy | CC0 1.0 | 5278×3518 / 14,859,583 B | b8d2b8c09729535e460f4913ee88db2e81ea1940468ec3171fc046503f79a150 | 860×720 / 125,770 B | 91356ceeeb01fed490697258f5e89654a0ee9d9b409fa24ff28cc7b13c7b7091 | [Source](https://commons.wikimedia.org/wiki/File:Marrakech_Medina.jpg) |
| market-morning.webp | Mehmet Turgut Kirkgoz | Pexels Free | 4897×3264 / 1,390,284 B | af6265be982c6161b4027ddaeb9c07f7d34ee03280f48285321eea7b93542472 | 920×680 / 176,696 B | aacac6873849f7dca13463719f036ca89cdd205205af24dd5f9d491edee55437 | [Source](https://www.pexels.com/photo/people-selling-fresh-fruit-and-vegetables-on-a-market-stall-11522046/) |
| calendar-planning.webp | Lara Jameson | Pexels Free | 5040×3360 / 2,427,340 B | c91e489d3688cdf98c237c483a85506f24c35941400d6b2488546083b7070009 | 800×620 / 119,502 B | 39f6fbd17c1d151eb5e82e0fc6121fed410afba3bb5cbaaaf45234e0f0ed4513 | [Source](https://www.pexels.com/photo/person-writing-on-a-notebook-place-on-a-world-map-8828672/) |
| train-platform.webp | Dan Wright | Pexels Free | 5952×3968 / 4,123,386 B | bd1f48c74925c34fadc66622f321279b7e808e947d7ffa862f346b44c8356550 | 800×620 / 139,634 B | 654e009fcac0d853558412ff2b201e9ca1f74046743a3d03621e12e7dd3d64f3 | [Source](https://www.pexels.com/photo/modern-train-at-platform-in-urban-station-40247858/) |
| travel-bag.webp | SHVETS production | Pexels Free | 6000×4000 / 4,590,970 B | b0ff513a789e07fea13b775932b4e79a607b0e3e5de68103180555058c9169c7 | 800×620 / 164,300 B | 76911a0f674600610314a19f970de32cbafdcdb0c4f228649c38deb94ce70a50 | [Source](https://www.pexels.com/photo/clothes-and-sunglasses-in-an-open-suitcase-on-a-rug-8933565/) |

## Visual/crop decisions

- Oceania: accepted Bora Bora aerial with lush volcanic ridge, island and turquoise lagoon; no overwater bungalows. Portrait crop preserves ridge and lagoon.
- Alpine Hiking / Swiss Trail: Matterhorn trail photo includes hikers and a clearly visible trail; source repeated only across the two related hiking slots.
- Marrakech courtyard: Dar al Basha fountain, mosaic floor, green courtyard and carved arches remain visible.
- Slow train: train remains readable; green valley and mountains remain the dominant context.
- Ceramic workshop: hands and vessel remain in focus.
- Portugal coast: Azenhas do Mar white village and Atlantic cliffline remain; watermarked monochrome candidate rejected.
- Japan rail: regional train, track and rural station are visible.
- Marrakech medina: alley, donkey, people and traditional façades remain.
- Market: vendors and fresh produce remain visible; do not claim the photograph was taken in the morning.
- Planning, platform and suitcase crops retain their named central subjects.

## Reuse/rejection register

- Three repeated-source groups: Amalfi hero/seasonal coast; Kyoto bamboo Asia/Kyoto feature; Matterhorn hikers Alpine Hiking/Swiss Trail.
- Rejected: generic tropical beach, alpine meadow without trail/hiker, first Bora candidate with overwater villas, black-and-white watermarked Azenhas image, HTML fallback thumbnails/travel-mountain-hiker.webp.
- The old alpine-meadow.webp source file was removed from the active asset directory.

## Counts and release gate

- Round 2 placements resolved: 13/13.
- New unique camera-photo WebP derivatives: 12.
- Seven legacy unique binaries remain across nine earlier placements; MEDIA-ASSETS metadata identifies these as AI-generated artwork, not camera photography.
- Total unique active WebP source binaries after deployment: 19.
- Reuse groups: 3.
- Round 2 missing exact subjects: 0.
- Phase 2.8 remains **PARTIALLY VERIFIED — NOT COMPLETE** because the nine legacy placements still need photographic/spec approval. Do not start Phase 2.9 yet.


---

# Phase 2.8 — Round 3 independent repository and binary audit (15 November 2026)

## Repository baseline

- Repository: `prem-pk-dev/TravelGuide`.
- Audited development branch tip before this documentation update: `aec0cada4741b4941a928672db6bea3dba73e0d2` (commit message: `feat(images): resolve Round 2 homepage photo sources`).
- Development tree: `d49868c89e78e0f78112961b9bba889bd55fd1ce`.
- `main`: `bab89d7eb14a356dbc194557492fc8de6e980c67`.
- GitHub compare reports `development/homepage` is 36 commits ahead and 1 commit behind `main`, with merge base `8223a82f3d0a4b21c9edbb8c64a8a55ed7569d41`. The branches have diverged; this audit does not merge or reconcile them.
- `research/travel-guide-blueprint`: `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.

## Current homepage inventory

- The current development tree contains all 22 homepage slot assignments.
- There are 21 distinct image path names for those 22 assignments because `alpine-hiking.webp` serves both the Alpine Hiking and Swiss Trail slots.
- Those 21 paths resolve to 19 unique binary identities: the three documented reuse groups are Amalfi (hero/seasonal coast), Kyoto bamboo (Asia/Kyoto feature), and Matterhorn hikers (Alpine Hiking/Swiss Trail).
- Twelve Round 2 camera-photo derivatives are present in `src/assets/images/`. Their GitHub tree-reported byte sizes match the corresponding WebP byte lengths recorded in the Round 2 table above.
- The repository tree exposes Git object identifiers and file sizes. Git object identifiers must not be compared directly with the SHA-256 values in the provenance table; they are different hash representations.

## Binary-verification boundary

The Round 2 table and photo-credit register document 12 original JPEG downloads, creator/source/licence details, source dimensions and bytes, derivative dimensions and bytes, and source/output SHA-256 values. In this Round 3 audit:

- The 12 derivative files' repository presence and byte lengths were checked against the current TravelGuide tree.
- The original JPEG master files were not found in the current TravelGuide image tree or the inspected MEDIA-ASSETS image tree.
- The actual binary bodies could not be retrieved into the verification runtime. The available file runtime has no external DNS resolution; the connected GitHub reader accepts UTF-8 text but rejects binary blobs.
- Consequently, this audit did **not** independently recompute source or derivative SHA-256, inspect JPEG/WebP magic bytes, reproduce MIME detection, decode dimensions, confirm the WebP encoder quality setting, or render the stored derivative files.
- Source-page image previews and the recorded creator/licence pages were reviewed. That confirms the visible source subject and page-level rights information, but is not a substitute for reading the exact source and derivative bytes.
- The desktop/mobile crop descriptions in the Round 2 record remain previous-session evidence; this audit did not independently render the stored derivative crops.

## MEDIA-ASSETS repository and CDN status

- Inspected private `prem-pk-dev/MEDIA-ASSETS` `main` at commit `4531d94979224daa5a3f0a6b25244e02655708e0`, tree `e9b43b0d7bf7087c4d49b3a35cbef4b532c798a7`.
- Its recursive tree contains 328 entries and 111 tracked image files; all 111 image files in that tree use the WebP extension.
- None of the 12 Round 2 derivative basenames (`oceania.webp`, `alpine-hiking.webp`, `marrakech-courtyard.webp`, `slow-train.webp`, `ceramic-workshop.webp`, `portugal-coast.webp`, `japan-rail.webp`, `marrakech-medina.webp`, `market-morning.webp`, `calendar-planning.webp`, `train-platform.webp`, `travel-bag.webp`) exists in that tree.
- No original JPEG master files were found in the inspected MEDIA-ASSETS image inventory.
- The current documentation does not register destination CDN paths for the 12 Round 2 derivatives. Therefore no exact CDN URL was available to test. Do not construct a path from a guessed naming convention or count CDN delivery as verified.
- No MEDIA-ASSETS files, branch, Cloudflare configuration or deployment were changed during this audit.

## Round 3 disposition

| Check | Current result |
|---|---|
| Current development branch, commit and tree | Verified |
| 22 homepage slot assignments and reuse groups | Verified from current tree and manifest |
| Presence of 12 Round 2 WebP files | Verified from current tree |
| Recorded WebP byte lengths | Match GitHub tree file sizes |
| Original JPEG master binaries retained in either inspected repository | Not found |
| Source/output SHA-256 independently recomputed | Blocked — binary bytes unavailable |
| JPEG/WebP signatures, MIME and decoded dimensions independently rechecked | Blocked — binary bytes unavailable |
| Stored derivative desktop/mobile crops independently rendered | Blocked — derivative bytes unavailable |
| Round 2 derivatives registered in MEDIA-ASSETS | Not found by exact basename |
| Round 2 derivative CDN delivery | Not verified — no registered destination URL |
| Nine legacy AI-artwork placements | Still require editorial/spec approval or replacement |

**Round 3 status: BLOCKED — DOCUMENTATION AND REPOSITORY INVENTORY AUDITED; ORIGINAL-MASTER RETRIEVAL, INDEPENDENT BINARY RE-VERIFICATION AND CDN DELIVERY NOT VERIFIED.**

Keep Phase 2.8 **PARTIALLY VERIFIED — NOT COMPLETE**. Do not start Phase 2.9, Phase 2.10 or Chat 3 until the 22 slots are accepted and all required verification gates pass. No image binary, homepage reference, stylesheet, script or data file was changed in this audit.

## 19. Phase 2.8 — Round 4 asset recovery, provenance audit and replacement plan (2026-11-15)

### Repository and branch baseline
- TravelGuide `development/homepage` before the Round 4 documentation commit: `c040d7648f99237698730f1f425a2e8565e102fc`.
- TravelGuide branches inspected: `development/homepage` at `c040d7648f99237698730f1f425a2e8565e102fc`; `main` at `bab89d7eb14a356dbc194557492fc8de6e980c67`; `research/travel-guide-blueprint` at `4e047f49cfac870d17a0347d60c2d1025f62dfd8`; and `development/responsive-fixes` at `9e4997bfb018a34da3892f63a2939e63633462d2`.
- Private MEDIA-ASSETS has only `main`, at `4531d94979224daa5a3f0a6b25244e02655708e0` (tree `e9b43b0d7bf7087c4d49b3a35cbef4b532c798a7`). Its recursive tree has 328 entries and 111 image files, all WebP.
- The relevant TravelGuide image path history was inspected. The earlier image-directory commits are `8223a82f3d0a4b21c9edbb8c64a8a55ed7569d41`, `730f85e1592131a1097937f1d4397642f9528da7`, and `ab877b479ba62bd0e37e16147a8f6ef7932f0065`. The MEDIA-ASSETS destination path history has no Round 2 derivative additions. Neither inspected repository tree retains the 12 original JPEG master files.
- Current manifests reviewed: `src/data/homepage.json`, `src/assets/images/README.md`, `HOMEPAGE-ASSET-SPECIFICATION.md`, `HOMEPAGE-ASSET-MAPPING.md`, `HOMEPAGE-ASSET-REVIEW.md`, `HOMEPAGE-ASSET-REPLACEMENT-PLAN.md`, `HOMEPAGE-PHOTO-CREDITS.md`, `PROJECT-STATE.md`, and `TASK-BOARD.md`.

### Exact Round 2 derivative recovery result
The exact 12 filenames below were recovered from the committed Round 2 mapping and photo-credit records. All 12 are present under TravelGuide `src/assets/images/`; none is present by filename or binary-identical Git blob in the inspected MEDIA-ASSETS `main` tree.

| Exact derivative | TravelGuide tree bytes | Round 4 source-master recovery |
|---|---:|---|
| `oceania.webp` | 229,298 | Original JPEG not found |
| `alpine-hiking.webp` | 136,900 | Original JPEG not found |
| `marrakech-courtyard.webp` | 392,010 | Original JPEG not found |
| `slow-train.webp` | 227,822 | Original JPEG not found |
| `ceramic-workshop.webp` | 44,818 | Original JPEG not found |
| `portugal-coast.webp` | 208,908 | Original JPEG not found |
| `japan-rail.webp` | 151,250 | Original JPEG not found |
| `marrakech-medina.webp` | 125,770 | Original JPEG not found |
| `market-morning.webp` | 176,696 | Original JPEG not found |
| `calendar-planning.webp` | 119,502 | Original JPEG not found |
| `train-platform.webp` | 139,634 | Original JPEG not found |
| `travel-bag.webp` | 164,300 | Original JPEG not found |

- Derivative count present in TravelGuide: **12/12**.
- Exact basename matches in MEDIA-ASSETS: **0/12**. Binary-identical Git blob matches under other MEDIA-ASSETS filenames: **0/12**.
- Original JPEG masters physically recovered in either inspected repository: **0/12**.
- The earlier Round 2 source table already records original JPEG dimensions, byte lengths and SHA-256, as well as derivative output dimensions, byte lengths and SHA-256. Those values remain **prior-session records**. Round 4 did not retrieve the actual JPEG/WebP binary bodies and did not recompute any of those SHA-256 values. GitHub tree byte sizes corroborate only the derivative byte lengths; Git blob IDs are not SHA-256 checksums.
- No current Round 2 derivative destination paths are registered in MEDIA-ASSETS. The TravelGuide build script copies `src/assets/images/` into `dist/assets/images/`; therefore the branch-preview URL pattern is `https://development-homepage.travelguide-9op.pages.dev/assets/images/<exact-filename>`. This is a build-derived preview path, not a MEDIA-ASSETS CDN registration. Live HTTP status, MIME and downloaded bytes for that preview path could not be rechecked in this session.
- No URL was guessed for a missing MEDIA-ASSETS registration. No asset was transferred or integrated in Round 4.

### Legacy AI-artwork audit — nine homepage placements
The seven unique binaries behind these nine slots are present in MEDIA-ASSETS. Their legacy public path mapping is exact and was previously browser-verified in Round 3 (HTTP 200, `image/webp`, RIFF/WEBP and decoded dimensions). Round 4 confirmed the path-to-asset-index correspondence and current source metadata. A fresh live HTTP fetch was not available in this session, so availability below is historical Round 3 evidence, not a new Round 4 response test.

| Slot | Current local filename and exact public source URL | Actual recorded subject / fit to brief | Quality and crop observations | Editorial decision |
|---|---|---|---|---|
| Hero coast | `hero-coast.webp` — [Amalfi artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp) | AI-generated Amalfi cliffside village, road and turquoise sea. Coastal subject is broadly relevant, but it is not the specified genuine Mediterranean landscape photograph with a clear left-side text-safe area. | Previously reviewed as clear, coherent illustrative artwork, not a camera photograph. 1672×941 / 446,770 bytes. Hero/mobile cropping was previously measured; the mobile crop is right-biased. The final headline-safe crop has not been approved as a replacement photograph. | **Replace** with a distinct genuine wide coastal photograph; preserve headline-safe negative space. |
| Asia continent | `asia.webp` — [Kyoto bamboo artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/kyoto-bamboo-garden-v01.webp) | AI-generated Kyoto bamboo garden path and wooden gate. Broad Asia relevance, but not the required Southeast Asian limestone karsts and bay. | Previously reviewed as visually coherent artwork, not documentary photography. 1672×941 / 482,514 bytes. The wide source requires a strong portrait crop; the central path/gate remains the focal point, but not the required karst-and-water composition. | **Replace** with a genuine karst/lagoon photograph. |
| Europe continent | `europe.webp` — [Santorini artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/santorini-caldera-sunset-v01.webp) | AI-generated Santorini white buildings and blue domes. European subject at a broad level, but not the specified historic riverside town with reflection. | Previously reviewed as coherent illustrative artwork, not a photo. 1672×941 / 306,350 bytes. Portrait tile crop narrows the town context and river/reflection brief is absent. | **Replace** with a genuine European riverside town photograph. |
| Africa continent | `africa.webp` — [Serengeti artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp) | AI-generated elephant herd, acacia trees and Serengeti grassland. Broad Africa/Safari relevance; sunrise differs from the specified warm evening scene. | Previously reviewed as coherent illustrative artwork, not documentary wildlife photography. 1672×941 / 324,842 bytes. Current `object-position: 80% center` keeps the herd toward the crop; tighter portrait framing remains dependent on the right-biased focal position. | **Replace** with a genuine savannah/acacia photograph; wildlife is optional. |
| Americas continent | `americas.webp` — [Machu Picchu artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/06-machu-picchu-peru-v01.webp) | AI-generated Machu Picchu and Andean terraces. It depicts Peru, not the specified Patagonian alpine lake and jagged mountain reflection. | Previously reviewed as an illustration. 900×512 / 65,752 bytes. The current landscape ratio is incompatible with the intended portrait destination tile and would require a severe crop; native resolution is also materially below the 900×1120 target. | **Replace** with a native portrait/portrait-capable Patagonia lake photograph. |
| Featured Kyoto | `kyoto-street.webp` — same [Kyoto bamboo artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/kyoto-bamboo-garden-v01.webp) as Asia | AI-generated bamboo garden path and gate, not the specified machiya lane with wooden façades, noren and a distant roof. | Same source bytes as `asia.webp`; 1672×941 / 482,514 bytes. Reusing this artwork duplicates the scene in separate homepage contexts; its landscape ratio also requires a portrait crop for the featured destination treatment. | **Replace** with a distinct Kyoto street photograph; do not reuse the Asia replacement. |
| Lisbon featured destination | `lisbon-tram.webp` — [Lisbon artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/23-lisbon-portugal-v01.webp) | MEDIA-ASSETS metadata classifies it as AI-generated Lisbon destination artwork, not a documentary photograph. Earlier rendered visual review described a tram-led Lisbon street; the source metadata itself only guarantees generic Lisbon rooftops/historic streets, so the yellow-tram claim is not independently established by the current asset record. | Previously reviewed as an illustration. 900×510 / 70,556 bytes. Its landscape source ratio differs substantially from the 960×1200 portrait specification; crop suitability for a real tram image must be checked against the replacement master. | **Replace** with a genuine yellow-Lisbon-tram photograph. |
| Seasonal coast article | `seasonal-coast.webp` — same [Amalfi artwork](https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp) as Hero | AI-generated Amalfi cliffside village and sea; not the distinct quieter Atlantic shoulder-season coastal scene described in the specification. | Same source bytes as `hero-coast.webp`; 1672×941 / 446,770 bytes. Reusing the hero image duplicates the exact artwork in a separate article card. | **Replace** with a different genuine Atlantic/shoulder-season coastal photograph. |
| Neighbourhood café article | `neighbourhood-cafe.webp` — [Coffee lifestyle artwork](https://media-assets-4sb.pages.dev/images/general/general-coffee-lifestyle.webp) | AI-generated coffee cup/table/plant still life, not a neighbourhood café opening onto a street. | Previously reviewed as an illustration. 519×442 / 22,716 bytes, below the 920×680 production target; subject and resolution both fail the brief. | **Replace** with a genuine street-side café photograph. |

- The current asset-index metadata labels the seven unique legacy binaries as AI-generated output, marks usage as website/marketing, and reports `rightsVerified: true`. That repository field is metadata, not independent legal advice or formal editorial approval. **No Round 4 editorial keep approval was found.**
- Current registered legacy public URLs are the seven exact paths above. The hero/seasonal and Asia/Kyoto pairs point to shared files. No change to these existing URLs or homepage placements was made.

### Photographic replacement sourcing — candidates only, not approvals
The following page-level candidates match the relevant subjects more closely. Their Pexels pages identify them as free-to-use, and Pexels' current terms allow commercial and non-commercial use plus modification/adaptation, without mandatory attribution. However, Pexels also cautions that separate privacy, property, trademark, model or other third-party permissions may still be needed in context. No candidate master was downloaded into the project, converted, hashed, crop-tested or approved for integration in Round 4.

| Target slot | Candidate source and photographer | Page-listed source dimensions / ratio | Crop/subject assessment and remaining gate |
|---|---|---|---|
| Hero coast | [Stunning Rocky Coastline in Benitachell, Spain](https://www.pexels.com/photo/stunning-rocky-coastline-in-benitachell-spain-30558175/) — Rafael Minguet Delgado | 5702×3801, 3:2 | Genuine Mediterranean cliffs and turquoise water; near-wide source but not as wide as the hero. Check left headline-safe space, horizon and desktop/mobile crops from downloaded original. |
| Asia continent | [Misty Islands in Halong Bay, Vietnam](https://www.pexels.com/photo/misty-islands-in-halong-bay-vietnam-35858996/) — Anh Nguyen | 2400×3000, 4:5 | Page record describes limestone islands and calm water; source ratio closely matches 900×1120. Inspect karst visibility, water balance and focal point in downloaded original. |
| Europe continent | [Historic European Riverside Buildings with Reflection](https://www.pexels.com/photo/historic-european-riverside-buildings-with-reflection-35534814/) — Alexandra H. Maria | 3084×4112, 3:4 | Page record matches riverside architecture/reflection; portrait source is close to target. Check tower/sky/water balance and exact location/subject accuracy. |
| Africa continent | [Sunset in African Savannah Landscape](https://www.pexels.com/photo/sunset-in-african-savannah-landscape-30878973/) — Wussol | Not exposed by the retrieved page | Page describes acacia trees and warm sunset; source preview was visually inspected as a camera landscape with a road, grasses and acacia silhouettes. Obtain source dimensions and verify the intended 900×1120 crop before accepting. |
| Americas continent | [Fitz Roy Glacier and Lake](https://www.pexels.com/photo/fitz-roy-glacier-and-lake-17600486/) — Nazarena Pozza | 3472×4640, 217:290 | Page record describes Fitz Roy, glacial lake and peaks in Patagonia; portrait ratio is close to the 900×1120 tile. Check native detail and retain both principal peak and lake. |
| Featured Kyoto | [Traditional Japanese Street in Kyoto](https://www.pexels.com/photo/traditional-japanese-street-in-kyoto-36889407/) — Ignacio Estevo | 2054×2899, 158:223 | Page record and preview describe a quiet street with traditional wooden houses. Portrait crop is close, but after-rain surface, noren and distant temple roof are not confirmed; review these before accepting. |
| Lisbon featured destination | [Charming Lisbon Street with Historic Tram](https://www.pexels.com/photo/charming-lisbon-street-with-historic-tram-40600060/) — Oleksandra Zelena | 3072×4080, 64:85 | Page record confirms Lisbon and yellow tram; near-portrait crop. Verify the tram remains fully identifiable and any incidental people/signage are suitable. |
| Seasonal coast article | [Dramatic Cliffs over the Atlantic in Sagres, Portugal](https://www.pexels.com/photo/dramatic-cliffs-over-the-atlantic-in-sagres-portugal-36733193/) — Nils Rotura | 5029×2829, approximately 16:9 | Page describes rugged Atlantic cliffs and cloudy conditions; a different coastal scene from the hero. The 920×680 card crop is substantially narrower, so check shoreline/focal detail and whether the mood fits the article. |
| Neighbourhood café article | [Cafe Tables on the Street](https://www.pexels.com/photo/cafe-tables-on-the-street-4210026/) — Anastasia Shuraeva | 5472×3648, 3:2 | Page and retrieved image preview show outdoor café tables on a cobbled street. Crop ratio is reasonably close to 920×680; preview visually matches the brief. Check shop signs/people and prepare the exact web crop from the original. |

General Pexels terms reviewed: https://www.pexels.com/license/ and https://www.pexels.com/terms-of-service/. Pexels credits are not required under the current license, but retaining contributor attribution in the project credit register is recommended as editorial practice. If a Wikimedia source is selected later, record the exact file page, author, license version, attribution text and (for CC BY-SA derivatives) share-alike obligations separately.

### Updated 22-slot status
| # | Homepage slot | Current asset | Current classification | Round 4 status |
|---:|---|---|---|---|
| 1 | Hero coast | `hero-coast.webp` | Legacy AI artwork; duplicated by slot 17 | Replace; photographic lead found |
| 2 | Asia continent | `asia.webp` | Legacy AI artwork; duplicated by slot 7 | Replace; photographic lead found |
| 3 | Europe continent | `europe.webp` | Legacy AI artwork | Replace; photographic lead found |
| 4 | Africa continent | `africa.webp` | Legacy AI artwork | Replace; photographic lead found |
| 5 | Americas continent | `americas.webp` | Legacy AI artwork | Replace; photographic lead found |
| 6 | Oceania continent | `oceania.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 7 | Kyoto featured destination | `kyoto-street.webp` | Legacy AI artwork; same bytes as slot 2 | Replace with a distinct Kyoto street photo |
| 8 | Lisbon featured destination | `lisbon-tram.webp` | Legacy AI destination artwork | Replace; photographic lead found |
| 9 | Marrakech featured destination | `marrakech-courtyard.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 10 | Slow train inspiration | `slow-train.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 11 | Alpine hiking inspiration | `alpine-hiking.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; approved reuse partner with slot 16 |
| 12 | Ceramic workshop inspiration | `ceramic-workshop.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 13 | Portugal coast itinerary | `portugal-coast.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 14 | Japan rail itinerary | `japan-rail.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 15 | Marrakech medina activity | `marrakech-medina.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 16 | Swiss trail activity | `alpine-hiking.webp` | Round 2 licensed camera-photo derivative; shared with slot 11 | Existing related-slot reuse is user-authorized; re-verify binary/crop |
| 17 | Seasonal coast article | `seasonal-coast.webp` | Legacy AI artwork; same bytes as slot 1 | Replace with a distinct Atlantic/seasonal photo |
| 18 | Market morning article | `market-morning.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 19 | Neighbourhood café article | `neighbourhood-cafe.webp` | Legacy AI artwork | Replace; photographic lead found |
| 20 | Calendar planning utility | `calendar-planning.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 21 | Train platform utility | `train-platform.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |
| 22 | Travel bag utility | `travel-bag.webp` | Round 2 licensed camera-photo derivative | Retain provisionally; raw-binary/source re-verification pending |

### Counts and release boundary
- 22 slot assignments remain populated.
- 21 unique current path names map to 19 unique binary identities.
- 12 Round 2 camera-photo derivatives remain present in TravelGuide; **0 original source masters were recovered** in Round 4.
- 9 legacy placements (7 unique AI artwork binaries) remain; none has formal editorial approval. All 9 are marked for replacement under the current genuine-photography specification.
- 9 candidate photo pages were identified; **0 candidates approved or integrated**.
- Existing documented Matterhorn-hikers reuse between Alpine Hiking and Swiss Trail remains the only reuse exception intended to survive the final 22-slot photo set. The duplicate Amalfi and Kyoto legacy-art pairs are not accepted as final reuse groups.
- No image files, source masters, CDN objects, manifests, homepage HTML/CSS/JS, or image references were changed in Round 4. No Cloudflare configuration, deployment, merge, `main` branch or research branch was changed.

**Round 4 disposition: REPOSITORY/PROVENANCE AUDIT COMPLETE; ORIGINAL-MASTER RECOVERY AND INDEPENDENT BINARY/CDN RE-VERIFICATION BLOCKED; 9 PHOTO REPLACEMENT LEADS DOCUMENTED BUT NOT APPROVED. Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE.**
