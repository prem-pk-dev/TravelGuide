# TravelGuide Homepage — Reuse-Authorized Image Review

**Date:** 2026-11-14  
**Branch:** `development/homepage`  
**Decision:** Existing MEDIA-ASSETS WebP files may be reused across multiple homepage sections, per explicit user authorization.

## Verification status

The following selected assets were fetched as original private GitHub binary content and visually inspected in the conversation. The public Cloudflare endpoint tests in the current execution environment returned HTTP 403 / `text/plain`, so public CDN delivery is not approved for any of these newly inspected paths.

| Source | Visual finding | Suitability |
|---|---|---|
| `amalfi-coast-village-v01.webp` | Amalfi cliff village, turquoise Mediterranean water, headland and morning/late-day clear light | Strong coastal subject, but village architecture occupies much of the left side; hero text-safe space/crop requires browser check |
| `santorini-caldera-sunset-v01.webp` | White Santorini buildings, blue domes, caldera, sunset | Suitable Europe/Santorini subject; not hero clear-morning coast |
| `kyoto-bamboo-garden-v01.webp` | Bamboo path, wooden garden gate, red maple foliage | Suitable Kyoto garden/travel feature, not Kyoto machiya street |
| `serengeti-elephant-safari-sunrise-v01.webp` | Acacia trees, elephant herd, golden savannah at sunrise | Suitable Africa/safari concept; does not meet target evening-light wording; native ratio/crop not dimension-verified in this pass |
| `alpine-glacial-lake-v01.webp` | Turquoise lake reflecting snowy alpine mountains and evergreen forest | Suitable alpine lake concept; landscape-to-portrait tile crop not dimension-verified in this pass |
| `alpine_wildflower_meadow.webp` | Alpine meadow full of yellow/purple wildflowers beneath snow-covered peaks | Suitable meadow/wildflower feature; no hiking trail visible |
| `01_alpine_lake_sunrise.webp` | Mountain range, forest, sunrise, still lake with reflection | Strong generic alpine lake scene; no verified Americas geography |
| `tropical_white_sand_beach.webp` | Palm-lined white sand beach and clear turquoise water | Generic tropical beach only; not verified South Pacific island |

## Candidate re-evaluations and decisions

- The previously rejected Ha Long Bay, old Serengeti, Banff and Bora Bora files remain rejected because of baked-in borders/caption footer and incompatible portrait cropping. Reuse authorization does not resolve those defects.
- Ocean Cliffs remains rejected as hero because its stormy rocky coast and headline-safe composition do not match the Mediterranean morning art direction.
- Mountain Hiker remains insufficient as the 900×680 slot: the source is 640×360; the public path previously returned HTML.
- A clean candidate for Oceania's exact South Pacific island and lagoon brief was not confirmed among the newly inspected assets.
- The Machu Picchu Peru inventory image was inspected visually; it depicts the Inca citadel, not a mountain lake. Do not use it for the Americas tile.

## Reuse rules applied

Repeated use is permitted when the visible subject is truthful for each slot:
- Kyoto bamboo-garden file may be used both in Kyoto feature and inspiration menu.
- Serengeti safari file may appear in Africa continent tile and a safari-themed story.
- Alpine glacial lake file may appear in an Americas tile and other alpine-lake content.
- Amalfi coast file may appear in hero and a coast editorial tile only if its subject is accurately labelled and crop-safe.

Never repurpose:
- a lake as an alpine hiking trail;
- a Mediterranean/Italian village as a Portugal coastal village;
- a tropical beach as a South Pacific volcanic island;
- a meadow without a visible path as an alpine hiking trail;
- Santorini sunset as a clear-morning Mediterranean hero.

## CDN check

The current Cloudflare connector fetch method returned HTTP 403 and `text/plain;charset=UTF-8` (65 bytes) for the tested candidate URLs. This environment response does not establish global public failure, but it also does not certify any image URL. Earlier live review established this specific URL as a broken HTML fallback:

`https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp`

**CDN fixed: No.** Accept a URL only after an external regular-browser check confirms HTTP 200, `image/webp`, RIFF/WEBP body bytes, decoded dimensions and visible image output.

## Integration gate

No homepage references have been changed because public CDN delivery has not been verified and several slots still lack exact subject matches. The homepage build script currently points at local `/assets/images/*` paths; switching to CDN URLs requires coordinated manifest/shell/build changes and preserving the existing hero fetch priority, lazy loading, intrinsic dimensions and responsive behavior. Those edits are not made in this review.

---

## 15 November 2026 — Live CDN and current-slot re-audit

- MEDIA-ASSETS Pages deployment was confirmed successful on its private repo main branch; public asset URL delivery works in the available browser environment.
- Nine unique current homepage source files were fetched and decoded. Each returned HTTP 200, Content-Type image/webp, a RIFF/WEBP signature and the dimensions recorded in HOMEPAGE-ASSET-MAPPING.md.
- Source Git blob identities of all nine unique current binaries match the corresponding TravelGuide local WebP blobs. No file has been recompressed or resized.
- MEDIA-ASSETS metadata identifies the selected files as AI-generated illustrative artwork, not documentary photography.
- The previous provisional claim that americas.webp depicts an alpine glacial lake was wrong: it depicts Machu Picchu/Andean terraces. The homepage alt text and mapping now describe the actual visual.
- alpine_wildflower_meadow.webp has no visible trail or hiker. The known thumbnails/travel-mountain-hiker.webp route returns HTML (text/html) and remains rejected.
- oceania.webp is a generic tropical beach, not a verified South Pacific island.
- Amalfi image is a cliffside village with road and sea, not an empty natural coastline. Kyoto image is a bamboo garden path/gate, not a machiya lane. Alt text has been corrected to describe what is visible.
- All current browser-rendered image uses loaded at 360/390/768/1024/1440 widths. Crop geometry and focal positions were measured; exact-subject gaps and native-resolution shortfalls remain.
- Phase 2.8 remains PARTIALLY VERIFIED. No new image generation or binary addition occurred. The missing/unsupported slots remain open as detailed in HOMEPAGE-ASSET-MAPPING.md.

 
## 15 November 2026 — Round 2 missing-image result

- Resolved the two fallback slots and all eleven previously missing subjects with 12 new camera-photo WebP files for 13 slot placements; Matterhorn hikers image is shared by Alpine Hiking and Swiss Trail.
- All source image downloads returned HTTP 200 and image/jpeg; outputs were checked as WebP quality 85, exact target dimensions, RIFF/WEBP and SHA-256.
- Photo credits, creator names, licence and source links are in HOMEPAGE-PHOTO-CREDITS.md.
- Rejected overwater-bungalow Bora photo, watermarked monochrome Portugal candidate, generic tropical beach and alpine meadow fallbacks, and HTML-only hiker thumbnail.
- Nine earlier slots remain legacy AI-generated visuals and differ from parts of the original photography specification. Phase 2.8 is not complete until they are approved/replaced.
