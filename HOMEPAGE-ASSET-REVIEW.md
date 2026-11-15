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


---

## 15 November 2026 — Phase 2.8 Round 3 independent audit

- Confirmed current `development/homepage` tip `aec0cada4741b4941a928672db6bea3dba73e0d2` and current tree `d49868c89e78e0f78112961b9bba889bd55fd1ce`. The branch is 36 commits ahead / 1 behind `main`; no merge was performed.
- Current TravelGuide inventory contains all 22 slot assignments, 21 image path names and 19 unique binary identities. The three documented reuse groups remain Amalfi, Kyoto bamboo and Matterhorn hikers.
- All 12 Round 2 derivative files exist in the TravelGuide development tree. GitHub tree file sizes match the byte lengths recorded in HOMEPAGE-ASSET-MAPPING.md.
- The source URLs, listed creators and licence references were reviewed against the public source pages. Pexels' licence terms and the Wikimedia Commons file records were inspected; CC BY-SA adaptations must retain attribution and share-alike notices, while the Marrakech Medina record identifies CC0 1.0.
- This session did not retrieve any JPEG master or derivative bytes into the file runtime. The repository file reader rejects binary blobs, and the local execution environment cannot resolve external hosts. Therefore source/output SHA-256, JPEG/WebP signatures, decoded dimensions, MIME, encoder quality and derivative crop rendering were not independently reproduced.
- The current MEDIA-ASSETS main tree has 111 WebP image files and none of the 12 Round 2 derivative basenames. No JPEG source masters were found in its image inventory. The Round 2 derivatives have no registered CDN paths in the current project documents, so CDN delivery remains unverified.
- The 12 images remain integrated on `development/homepage`; no assets or homepage code were changed in this audit. Nine legacy AI-artwork placements still require editorial/spec approval or replacement.

**Disposition: BLOCKED / PARTIALLY VERIFIED.** Round 3 has established the repository inventory and documented blockers; it has not independently verified original or derivative binary bytes or CDN delivery. Phase 2.8 is not complete.

---

## 15 November 2026 — Phase 2.8 Round 4: Asset recovery and legacy artwork review

### Asset recovery
- Inspected the current TravelGuide branches and image history, the full TravelGuide asset tree, the MEDIA-ASSETS `main` tree, the mapping/specification/credits documents and current homepage JSON.
- Recovered the exact 12 Round 2 filenames from committed documentation. All 12 WebP derivatives are still present under TravelGuide `src/assets/images/`; none is present by basename or identical Git blob in MEDIA-ASSETS.
- No source JPEG master for any of the 12 derivatives was found in either inspected repository. The previously recorded source and derivative dimensions, bytes and SHA-256 values remain documentary records; this audit could not download binary bodies to independently recompute or inspect them.
- MEDIA-ASSETS holds 111 tracked WebP files. The seven unique legacy artwork binaries are the only TravelGuide homepage binaries found in that asset repository; current path/source crosswalk is in HOMEPAGE-ASSET-MAPPING.md.
- The existing MEDIA-ASSETS CDN paths for the legacy images were browser-verified in Round 3. Round 4 did not obtain a fresh HTTP response for the CDN paths. No registered MEDIA-ASSETS destinations exist for the 12 Round 2 photo derivatives. TravelGuide's build script copies those local files into the branch preview at `/assets/images/<filename>`, but current HTTP/MIME verification of that preview path was not possible.

### Nine legacy placements
| Placement / file | Current CDN asset | Subject match | Visual/crop review | Disposition |
|---|---|---|---|---|
| Hero / `hero-coast.webp` | `amalfi-coast-village-v01.webp` | Mediterranean village/coast, but not a genuine photo or guaranteed left headline-safe landscape | Previous visual review: coherent AI artwork. 1672×941; mobile crop was right-biased. | Replace |
| Asia / `asia.webp` | `kyoto-bamboo-garden-v01.webp` | Kyoto bamboo instead of Southeast Asian karsts/bay | Previous visual review: coherent AI artwork. 1672×941 wide image cropped to a portrait card. | Replace |
| Europe / `europe.webp` | `santorini-caldera-sunset-v01.webp` | Santorini instead of historic riverside town | Previous visual review: coherent AI artwork. 1672×941; portrait crop removes wider location context. | Replace |
| Africa / `africa.webp` | `serengeti-elephant-safari-sunrise-v01.webp` | Serengeti/savannah is broad subject match; sunrise differs from target warm evening | Previous visual review: coherent AI artwork. 1672×941; object position 80% center retains the herd for narrower crops. | Replace |
| Americas / `americas.webp` | `06-machu-picchu-peru-v01.webp` | Machu Picchu instead of Patagonian alpine lake | Previous visual review: coherent AI artwork. 900×512 is landscape and undersized for the 900×1120 portrait brief; severe crop. | Replace |
| Kyoto feature / `kyoto-street.webp` | `kyoto-bamboo-garden-v01.webp` | Bamboo gate/path instead of machiya lane | Same binary as Asia; 1672×941 wide source, portrait crop. Duplicate art across unrelated homepage placements. | Replace with distinct Kyoto photo |
| Lisbon / `lisbon-tram.webp` | `23-lisbon-portugal-v01.webp` | Lisbon AI destination artwork; metadata does not confirm a documentary tram capture | 900×510; wide ratio differs from 960×1200 portrait brief. | Replace |
| Seasonal coast / `seasonal-coast.webp` | `amalfi-coast-village-v01.webp` | Amalfi village instead of separate Atlantic/shoulder-season scene | Same binary as hero; 1672×941. Duplicate image on a separate editorial card. | Replace with distinct coast photo |
| Neighbourhood café / `neighbourhood-cafe.webp` | `general-coffee-lifestyle.webp` | Coffee cup still life instead of a street-side neighbourhood café | 519×442 / 22,716 bytes, below the 920×680 target; image is not the stated scene. | Replace |

The exact current CDN URLs, asset-index source descriptions and per-file byte sizes are recorded in HOMEPAGE-ASSET-MAPPING.md. All seven unique legacy assets are identified as AI-generated in MEDIA-ASSETS metadata. Their metadata's `rightsVerified` flag does not constitute editorial approval. No placement received a formal keep approval in Round 4.

### Replacement sourcing and rights
Nine Pexels photo pages are recorded as source candidates for the nine slots in HOMEPAGE-ASSET-MAPPING.md. Pexels pages identify each as free-to-use. Pexels' current license allows commercial use and modification/adaptation without mandatory attribution; the terms warn that separate privacy, property, trademark or other third-party permissions may still apply. Contributor credits remain recommended editorial practice.

Candidates are leads only. The binary originals were not downloaded into the repository, and exact original bytes, crop, model/property releases, desktop/mobile framing, dimensions for the Africa candidate, and final editorial acceptance remain pending. No candidate should be integrated or described as approved until those checks have passed.

### Final status
- Nine legacy placements individually assessed: complete at repository/metadata and prior visual-review evidence level.
- Candidate pages found: 9/9; approved replacements: 0/9.
- Round 2 derivative file presence: 12/12; original master recovery: 0/12.
- Fresh CDN fetch/MIME/hash check: blocked in this session.
- No file or homepage reference changed.
- Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE; Phase 2.9, 2.10 and Chat 3 remain pending.
