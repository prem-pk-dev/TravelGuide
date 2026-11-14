# TravelGuide Homepage — Candidate Image Verification Review

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Branch:** `development/homepage`  
**Review date:** 2026-11-14  
**Source image repository:** https://github.com/prem-pk-dev/MEDIA-ASSETS (private, `main` branch)  
**CDN:** https://media-assets-4sb.pages.dev  
**Homepage specification:** `HOMEPAGE-ASSET-SPECIFICATION.md`  
**Inventory:** User-provided `Pasted markdown.md` (153 lines, 110 listed URLs)

## Executive result

All six original source files were retrieved from the private MEDIA-ASSETS repository as base64-encoded binary content, decoded for byte-level checks, and visually inspected from the original bytes.

- **Approved:** 0
- **Rejected:** 1
- **Needs Replacement:** 5
- **Exact-byte duplicates:** 0 (all six SHA-256 values differ)
- **Visual repeated-composition finding:** Four destination images share the same white left strip and dark bottom caption-band treatment. They are not the same photograph, but that repeated graphic framing violates the clean-photo production brief.
- **Homepage changes:** none. This review does not authorize integration.

The original bytes were obtained through GitHub's file-content endpoint and the corresponding source paths are linked below. Five CDN image URLs returned HTTP 200 with `image/webp`; the Mountain Hiker CDN URL returned an HTML page instead of an image. The original Mountain Hiker file itself does exist as a valid WebP in the private GitHub repository.

## 1. Individual verification table

Aspect ratio is calculated as width divided by height. SHA-256 values below were calculated from decoded source bytes, not from filenames or GitHub blob object IDs.

| Candidate / homepage slot | Actual source file | CDN HTTP / content type | Actual format | Dimensions | Ratio | Bytes | SHA-256 | Status |
|---|---|---|---|---:|---:|---:|---|---|
| Ocean Cliffs / `hero-coast.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/nature/05_rugged_ocean_cliffs.webp) | 200 / image/webp | WebP | 1672×941 | 1.7768 | 376,526 | `537b5817f340750df596ac5bfdb31969017c00bbb8500c321765a76c559c86c6` | **Rejected** |
| Ha Long Bay / `asia.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp) | 200 / image/webp | WebP | 900×512 | 1.7578 | 57,722 | `452711da14c97ed8ea902701b84407d09d9c7cfcb5ad20a88e2e86c8614965af` | **Needs Replacement** |
| Serengeti / `africa.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/05-serengeti-tanzania-v01.webp) | 200 / image/webp | WebP | 900×512 | 1.7578 | 54,958 | `7751fcf29abf302ea3f60ff809101b1e41ad344b3b3c8c7db21e3ecb054581c5` | **Needs Replacement** |
| Banff / `americas.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/02-banff-canada-v01.webp) | 200 / image/webp | WebP | 900×512 | 1.7578 | 70,682 | `5eb7a2094d22d3e20a34880c7cbd7054f94676461fede42b66c679b49ebc7515` | **Needs Replacement** |
| Bora Bora / `oceania.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp) | 200 / image/webp | WebP | 900×512 | 1.7578 | 47,138 | `8ba6e3d6291310f3d369dbc1dbb772c4f7efc20e76dde3cd6f1368261279fc68` | **Needs Replacement** |
| Mountain Hiker / `alpine-hiking.webp` | [Source file](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/thumbnails/travel-mountain-hiker.webp) | 200 / text/html (CDN path returns HTML) | WebP in GitHub source; CDN response is HTML | 640×360 (source file) | 1.7778 | 28,034 | `3e169cb51e79ee73677ec417a07d077eb7d95023261749980d4661007743efca` | **Needs Replacement** |

### Exact public CDN URLs

1. Ocean Cliffs: https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp
2. Ha Long Bay: https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp
3. Serengeti: https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp
4. Banff: https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp
5. Bora Bora: https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp
6. Mountain Hiker (broken image route): https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp

## 2. Original visual previews

The previews below refer to the original source images, not generated substitutes. The same six original images were rendered in the review conversation from the retrieved original bytes.

### 2.1 Ocean Cliffs — hero candidate

![Ocean Cliffs original preview](https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp)

**Visual finding:** Rugged dark rocky headland, rough ocean/surf, dramatic overcast sky and green/pink-flowered foreground. This does not depict the specified calm, sunlit Mediterranean limestone coast with translucent turquoise water and a low-detail left headline-safe zone.

**Crop finding:** Source ratio 1.7768 versus hero target 1.600. Desktop cover would remove about 166 px of source width in total (about 83 px per side if centred). A 390×844 mobile portrait crop would retain only about 26% of the original width at full source height, losing much of the coastal panorama. Mobile crop suitability is poor for the specified scene.

**Decision: Rejected.** Wrong visual subject/lighting for the approved hero brief. Source also falls short of the exact 1920×1200 target; do not upscale it to meet the specification.

### 2.2 Ha Long Bay — Asia candidate

![Ha Long Bay original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp)

**Visual finding:** Turquoise bay, limestone karsts and a red-sailed traditional boat. Location/theme is a good conceptual match. However, the source visibly includes a white vertical strip at the left and a dark caption/footer band at the bottom, with lettering in the band. These are baked into the image.

**Crop finding:** Source is 900×512 landscape; target is 900×1120 portrait (0.8036 ratio). A portrait cover crop retains only about 412 px of source width (about 45.8%), and the 512 px source height would have to be enlarged to 1120 px (about 2.19×). The bottom caption band remains in a centre crop; removing it would further reduce usable pixels. Desktop and mobile portrait card crops are therefore not acceptable.

**Decision: Needs Replacement.** The destination subject is relevant, but the supplied file is not a clean production photograph and does not meet target dimensions/ratio.

### 2.3 Serengeti — Africa candidate

![Serengeti original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp)

**Visual finding:** Acacia tree, elephants on open grassland and warm sunset. The subject is relevant to the African savannah brief. The same white left strip and dark bottom caption band/lettering appear in the image.

**Crop finding:** Source is 900×512 landscape; target is 900×1120 portrait. Portrait cover would retain about 45.8% of source width and require about 2.19× vertical upscaling. A centred crop risks losing the acacia tree and/or elephant group, while the caption band remains. Poor desktop/mobile portrait-card suitability.

**Decision: Needs Replacement.** Relevant destination theme, but the baked-in graphics, landscape ratio and low source height make it unsuitable as the specified portrait tile.

### 2.4 Banff — Americas candidate

![Banff original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp)

**Visual finding:** Snow-capped mountain range, evergreen forest and reflective turquoise alpine lake. It broadly matches the mountain-lake concept for the Americas tile. The same white left strip and dark caption/footer band are baked into the image.

**Crop finding:** Source is 900×512 landscape; target is 900×1120 portrait. A portrait crop retains about 45.8% of source width and requires about 2.19× upscaling in height. The central peak/reflection may remain, but side mountains and lake context are lost; the footer band remains visible. Not suitable for the specified portrait production slot.

**Decision: Needs Replacement.** Correct broad subject, but repeated overlay treatment and incompatible dimensions/crop disqualify the current file.

### 2.5 Bora Bora — Oceania candidate

![Bora Bora original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp)

**Visual finding:** Lush volcanic island ridge, bright turquoise lagoon and overwater bungalows. The subject matches the tropical-island direction for Oceania. The same white vertical strip and dark caption/footer band are present.

**Crop finding:** Source is 900×512 landscape; target is 900×1120 portrait. A centred portrait crop retains only about 45.8% of source width; it may remove the overwater bungalows on the right or reduce the island/lagoon context. The source height must be enlarged about 2.19× and the caption band remains. Not acceptable for the portrait card.

**Decision: Needs Replacement.** Good theme, but graphic overlays and portrait-resolution/crop mismatch prevent approval.

### 2.6 Mountain Hiker — alpine hiking candidate

![Mountain Hiker original preview](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/thumbnails/travel-mountain-hiker.webp?raw=1)

**Visual finding:** A single hiker in a red jacket with a backpack faces a broad alpine mountain landscape. The main subject is suitable for the alpine hiking activity concept. The composition appears to have a light left-edge strip; it is a thumbnail-sized image rather than the commissioned editorial landscape.

**Crop finding:** Source is 640×360; target is 900×680 (1.3235 ratio). A cover crop would retain roughly 477 px of source width (about 74.5%) before resizing, and matching the target size would require about 1.89× enlargement in both dimensions after crop. The hiker remains in a centred crop, but native detail is insufficient for the required slot size. Do not upscale it to pretend it meets the brief.

**CDN issue:** Exact URL https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp returned HTTP 200 but `text/html; charset=utf-8` (the “Media Assets Library” page), not an image. The valid WebP original exists in the private GitHub source path linked above.

**Decision: Needs Replacement.** Subject is relevant, but the image is undersized for the target and its public CDN URL is not serving the image.

## 3. Duplicate and repeated-composition review

| Test | Result |
|---|---|
| SHA-256 exact duplicate check | **No exact duplicates.** Six distinct SHA-256 values were computed from source bytes. |
| Visual near-duplicate review | No pair appears to depict the same scene or be a simple alternate crop of another. |
| Repeated graphic composition | **Yes.** Ha Long Bay, Serengeti, Banff and Bora Bora share the same white left strip and dark caption/footer band treatment. |
| Ocean Cliffs / Mountain Hiker | Distinct scenes and framing from the four destination images. |
| Perceptual-hash algorithm | Not run. Visual near-duplicate review is recorded separately; no pHash/dHash score is claimed. |

The shared framing treatment is a repeated template, not an exact or near-identical photograph. All six originals remain distinct by SHA-256.

## 4. Desktop and mobile crop suitability summary

| Candidate | Target dimension / ratio | Source dimension / ratio | Desktop target crop | Mobile crop | Outcome |
|---|---|---|---|---|---|
| Ocean Cliffs | 1920×1200 / 1.600 | 1672×941 / 1.7768 | Moderate ratio crop; scene does not satisfy hero art direction | Severe panoramic-to-portrait crop; only ~26% width visible | Reject |
| Ha Long Bay | 900×1120 / 0.8036 | 900×512 / 1.7578 | Portrait tile would discard ~54% horizontal width and upscale height ~2.19× | Same portrait crop plus footer overlay | Replace |
| Serengeti | 900×1120 / 0.8036 | 900×512 / 1.7578 | Same severe portrait crop/upscale | Risks cutting tree/elephants; footer remains | Replace |
| Banff | 900×1120 / 0.8036 | 900×512 / 1.7578 | Central mountain/lake can remain but much of scene is discarded | Portrait crop narrows the range; footer remains | Replace |
| Bora Bora | 900×1120 / 0.8036 | 900×512 / 1.7578 | Portrait crop may remove bungalows or island context | Same crop and footer issue | Replace |
| Mountain Hiker | 900×680 / 1.3235 | 640×360 / 1.7778 | About 25.5% source width removed; ~1.89× enlargement needed | Target is a landscape card; no independent mobile crop is provided | Replace |

## 5. What is missing now?

For the six candidates reviewed here:

- **0 of 6 are approved for use as-is.**
- **1 is rejected outright** (Ocean Cliffs for hero).
- **5 need replacement** (four destination images and Mountain Hiker).

For the full 22-image homepage specification, the current verified-approved count remains **0 of 22**. The other 16 slots have not been byte-level/visual verified in this phase, so this is a count of *not yet approved assets*, not a claim that those 16 have all been inspected and rejected. No new image generation is included in this phase.

## 6. Exact source files and access note

The original files are present in the private `prem-pk-dev/MEDIA-ASSETS` repository on `main` at the six source paths listed above. They were fetched as base64 content through the connected GitHub repository integration, decoded for SHA-256 and displayed as previews. The private source links require repository access.

The only currently identified incorrect public delivery URL is:

`https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp`

It returns HTML instead of the original WebP. The source file itself does not need to be supplied again; the public Pages deployment/path needs to be corrected or a new valid public asset URL provided.

## 7. Task boundary

- No homepage HTML, CSS, JS, JSON, manifest or image reference modified.
- No new images generated.
- No files added to the homepage image directory.
- No changes made to `main` or `research/travel-guide-blueprint`.
- No merge, deployment or build verification performed.

**Final decision:** Do not integrate any of these six candidates. Replace/re-source them according to the decisions above, then obtain approval for the revised asset mapping before homepage integration.
