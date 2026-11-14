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
