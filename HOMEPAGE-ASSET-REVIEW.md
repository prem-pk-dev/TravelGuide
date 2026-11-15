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

---

## 15 November 2026 — Phase 2.8 Round 5: actual derivative-byte verification and visual approval gate

### What was independently verified
- Retrieved the actual 12 committed WebP files from the TravelGuide development branch as base64 binary content, decoded the bytes, checked RIFF/WEBP signatures, parsed image dimensions and independently computed SHA-256.
- All 12 byte lengths, dimensions and SHA-256 values exactly match the prior Round 2 records. See HOMEPAGE-ASSET-MAPPING.md for the full per-file ledger.
- Rendered each retrieved derivative at native resolution and checked its visible subject. The photographs correspond to their declared editorial scenes. Visible people/hands are present in the market, Marrakech medina, ceramic, and travel-bag images; train/operator branding is visible in the Japan rail and LNER/AZUMA platform images.
- Inspected current homepage CSS. Story-card image frames use 4:3 by default and 16:10 at narrow widths; continent tiles use cover, with a special very-wide 2.4:1 mobile Oceania tile. The Round 2 derivative crops can therefore be screened analytically, but no browser screenshot of each live desktop/mobile crop was captured in Round 5. Crop status is not yet formally approved.

### Original masters and encoder provenance
- Original JPEG master binaries recovered: 0/12. Current repository trees and relevant image path histories do not contain them.
- The source page, creator, license, prior master dimensions/byte counts and prior master hashes remain documented. Because the exact original bytes could not be retrieved, source SHA-256 and JPEG signature/dimensions were not recomputed in this round.
- The 12 derivative SHA-256 values match Round 2, but the exact WebP encoder quality=85 setting cannot be inferred conclusively from the output file alone. The original export log/master-to-output reproducibility evidence remains outstanding.
- Pexels/Wikimedia license terms and attribution obligations were checked at the source-page/terms level. This is not a substitute for a file-specific model/property release or a separate check for visible people, property and logos.

### Native image inspection and crop watchlist
- Oceania: volcanic ridge and lagoon are visible. Mobile 2.4:1 cover treatment is severe for a 900×1120 portrait source; crop/reponsive source decision pending.
- Marrakech courtyard: architectural framing, trees and fountain are visible. Portrait image inside 4:3 and 16:10 cards requires substantial top/bottom crop; browser crop pending.
- Slow train: train, track and valley read clearly in source. Desktop frame ratio close to 4:3; mobile crop needs browser check.
- Alpine/Swiss trail: Matterhorn, footpath and hikers visible; hikers appear small in the wide frame. Reuse remains user-authorized only between these related slots.
- Ceramic workshop: hands/vessel are legible. Card ratios are close; release/context review remains pending.
- Portugal coast: Azenhas do Mar village and cliffline remain identifiable. Browser crop check pending.
- Japan rail: train and rural platform are legible, with visible operator/vehicle marks. Trademark/editorial context check remains pending.
- Marrakech medina: lane and donkey are legible; several identifiable people appear. Privacy/personality context review and mobile crop check remain pending.
- Market: produce and vendors are visible; several people are identifiable. Privacy/release check remains pending. Time of day must not be described as morning unless confirmed.
- Calendar planning: notebook/map scene remains legible; map lettering is visible. Mobile crop check pending.
- Train platform: LNER/AZUMA branding is visible. Trademark/editorial context check and mobile crop remain pending.
- Travel bag: packed suitcase remains legible; hands appear. Release/context and mobile crop checks remain pending.

### Nine legacy placements — candidates are pending, not approvals
The nine Round4 Pexels source leads are retained in HOMEPAGE-ASSET-MAPPING.md. Their source pages/terms were checked for stated subject and Pexels free-use/commercial-use/modification terms. No candidate original binary was downloaded or decoded in Round 5, and no candidate was hashed, cropped, checked for releases or visually approved. All nine decisions remain **Pending**. None of the legacy artwork files was changed.

| Slot | Candidate source | Page-level fit | Round 5 decision |
|---|---|---|---|
| Hero coast | Rafael Minguet Delgado — Benitachell rocky Mediterranean coast | Subject match at page level; 3:2 master requires both desktop-wide and mobile-tall crop review | Pending |
| Asia | Anh Nguyen — Halong Bay misty limestone islands | Strong page-level karst/bay match; 4:5 source near target ratio | Pending |
| Europe | Alexandra H. Maria — historic riverside buildings/reflection | Page-level match; portrait source near target ratio | Pending |
| Africa | Wussol — savannah sunset/acacia landscape | Subject described, but source dimensions not exposed; binary needed | Pending |
| Americas | Nazarena Pozza — Fitz Roy Glacier and Lake | Patagonia/lake page-level match; near portrait | Pending |
| Kyoto | Ignacio Estevo — traditional Kyoto street | Kyoto street/wooden houses described; exact machiya/noren brief needs visual confirmation | Pending |
| Lisbon | Oleksandra Zelena — Lisbon street/historic tram | Page title identifies historic tram; original framing and incidental people/signs need review | Pending |
| Seasonal coast | Nils Rotura — Sagres Atlantic cliffs | Distinct Atlantic scene; shoulder-season relevance not established by the page alone | Pending |
| Neighbourhood café | Anastasia Shuraeva — street-side café tables | Page/preview matches street-side café; people/signs and card crop need review | Pending |

Pexels permits commercial/non-commercial use and modifications without mandatory attribution under its published license. It also restricts uses that misrepresent identifiable people or imply a brand/product endorsement. Individual people/property releases were not verified in Round 5. For Wikimedia CC BY-SA sources, attribution and share-alike obligations remain required; CC0 does not automatically resolve other third-party rights.

### Delivery test
- MEDIA-ASSETS has no registered paths for the 12 Round 2 derivatives; no destination CDN URL was invented.
- Exact TravelGuide branch-preview paths are derived from the actual build copy rule: /assets/images/<filename> on the Round4 Preview hostname. Fresh HTTP status/MIME/body checks could not be completed because the available fetch route returned 403 text/plain even for an unrelated example.com request.
- Therefore the execution route is not suitable to diagnose Cloudflare public delivery, and the 12 CDN URLs are still not certified. A normal browser/network test must confirm HTTP 200, correct image MIME and actual image bytes.

### Round 5 editorial decision
- Existing Round 2 derivative binary integrity: verified 12/12.
- Existing photo editorial/crop approvals: still pending for slots with visible people/branding or substantial CSS crop.
- Candidate replacements downloaded/approved: 0/9.
- Legacy AI artwork keep approvals: 0/9.
- No asset replacement, page reference, manifest, CSS/JS/HTML, branding, or deployment change.
- Phase 2.8 remains **PARTIALLY VERIFIED — NOT COMPLETE**. Phase 2.9, Phase 2.10 and Chat 3 remain pending.

---

## 15 November 2026 — Round 5 resumed: acquisition and approval status

### Original JPEG masters
- Rechecked current TravelGuide image trees for development/homepage, main, research/travel-guide-blueprint and development/responsive-fixes, plus MEDIA-ASSETS main. No JPEG/JPG originals are present in these trees.
- Relevant TravelGuide image commits and MEDIA-ASSETS image publication/history were checked. Round 2 added 12 WebP derivatives, not original JPEG masters.
- Original JPEGs acquired: **0/12**. The prior source hashes/byte sizes/dimensions remain historic ledger values, not newly reproduced evidence.
- Direct download attempts against a Pexels original and a Wikimedia original failed through the available download environment. No HTML preview is counted as an image binary.

### Nine replacement candidates
| Slot | Candidate | Page-level evidence | Acquisition/crop/decision |
|---|---|---|---|
| Hero | Benitachell coast — Rafael Minguet Delgado | 5702×3801; cliffs and turquoise sea | No source binary/crop; **Pending** |
| Asia | Ha Long Bay — Anh Nguyen | 2400×3000; misty karsts | No source binary/crop; **Pending** |
| Europe | Historic riverside — Alexandra H. Maria | 3084×4112; buildings/reflection | No source binary/crop; **Pending** |
| Africa | Savannah sunset — Wussol | Dimensions not exposed; acacia/sunset preview | Preview only; no source binary/crop; **Pending** |
| Americas | Fitz Roy lake — Nazarena Pozza | 3472×4640; Patagonia peak/lake | No source binary/crop; **Pending** |
| Kyoto | Traditional Kyoto street — Ignacio Estevo | 2054×2899; wooden houses/power lines | Full machiya/noren brief not proven; no binary/crop; **Pending** |
| Lisbon | Yellow tram street — Oleksandra Zelena | 3072×4080; Lisbon/tram | No source binary/crop; **Pending** |
| Seasonal coast | Sagres cliffs — Nils Rotura | 5029×2829; Atlantic coast | Season not established; no binary/crop; **Pending** |
| Café | Street café — Anastasia Shuraeva | 5472×3648; outdoor tables/cobbled lane | People/signage visible in preview; no binary/release/crop; **Pending** |

Candidate original binaries acquired: **0/9**. None is approved.

### Licensing and third-party rights
Pexels current license/Terms grant commercial use and modification/adaptation without mandatory attribution, subject to prohibited-use conditions. The Terms restrict standalone redistribution, implied endorsement and certain commercial uses of images depicting trademarks/logos/brands. They also caution that privacy, personality, property and other third-party permissions may be required; Pexels does not warrant that all releases exist. Thus commercial/modification rights are page-level verified, while individual model/property releases and trademark/privacy clearance remain **Pending**.

Wikimedia Round 2 sources remain CC BY-SA 4.0 (attribution/change notice/share-alike for adaptations) or CC0 1.0. CC0 does not resolve unrelated third-party rights.

### Visual and CDN status
- All 12 existing derivatives had actual native-file visual inspections and independent byte/hash/dimension verification in the previous Round 5 pass. Browser-confirmed desktop/mobile crops remain pending.
- Candidate original binaries were not obtained; candidate crop approvals: 0/9.
- Cloudflare Preview deployment succeeded at deployment-record level, but the 12 direct asset paths were inaccessible to the available browser tool. The execution network returned 403 text/plain even for unrelated hosts, so this is not a verified origin HTTP status. Certified CDN paths: 0/12.

### Legacy artwork
Nine AI-generated placements remain unchanged. Replacement remains recommended, but no candidate passed the binary, release, crop or editorial approval gates. No replacement was made.

**Resumed disposition:** masters 0/12; candidate binaries 0/9; candidate approvals 0/9; CDN paths 0/12 certified. Phase 2.8 remains partially verified.
