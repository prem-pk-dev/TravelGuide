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
