# TravelGuide Homepage — Candidate Image Verification Review

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Branch:** `development/homepage`  
**Review date:** 2026-11-14  
**Source documents read:** `HOMEPAGE-ASSET-MAPPING.md`, `HOMEPAGE-ASSET-SPECIFICATION.md`, original MEDIA-ASSETS inventory (153 lines; 110 URLs).  
**Original binary source:** private repository `prem-pk-dev/MEDIA-ASSETS`, branch `main`.  
**Scope:** Six mapped candidates only. No homepage HTML/CSS/JS, data or image-reference changes; no generation, merge, deployment or build verification.

## Verification method

All six original source entries were fetched from the private MEDIA-ASSETS GitHub repository as base64 binary content and decoded in memory. The five candidate CDN image URLs were also imported by CloudConvert for independent file metadata inspection. Actual WebP RIFF/WEBP signatures were checked from the source bytes; width/height were parsed from the WebP bitstream, and SHA-256 was calculated over the decoded original bytes. The original WebP image previews were rendered and visually inspected in this review conversation.

**Important:** The exact CDN URL for the Mountain Hiker entry does not serve the image: it returns an HTML Media Assets Library page. The corresponding GitHub source file exists and is a valid WebP file, so its binary metadata and SHA-256 below refer to that GitHub source—not to the HTML response at the CDN URL.

## Six-candidate verification table

| Candidate / homepage slot | Source bytes | Actual format | Dimensions | Ratio | SHA-256 | Status |
|---|---:|---|---:|---:|---|---|
| Ocean Cliffs / `hero-coast.webp` | 376,526 | WebP | 1672×941 | 1.778 | `537b5817f340750df596ac5bfdb31969017c00bbb8500c321765a76c559c86c6` | **Rejected** |
| Ha Long Bay / `asia.webp` | 57,722 | WebP | 900×512 | 1.758 | `452711da14c97ed8ea902701b84407d09d9c7cfcb5ad20a88e2e86c8614965af` | **Needs Replacement** |
| Serengeti / `africa.webp` | 54,958 | WebP | 900×512 | 1.758 | `7751fcf29abf302ea3f60ff809101b1e41ad344b3b3c8c7db21e3ecb054581c5` | **Needs Replacement** |
| Banff / `americas.webp` | 70,682 | WebP | 900×512 | 1.758 | `5eb7a2094d22d3e20a34880c7cbd7054f94676461fede42b66c679b49ebc7515` | **Needs Replacement** |
| Bora Bora / `oceania.webp` | 47,138 | WebP | 900×512 | 1.758 | `8ba6e3d6291310f3d369dbc1dbb772c4f7efc20e76dde3cd6f1368261279fc68` | **Needs Replacement** |
| Mountain Hiker / `alpine-hiking.webp` | 28,034 | WebP | 640×360 | 1.778 | `3e169cb51e79ee73677ec417a07d077eb7d95023261749980d4661007743efca` | **Needs Replacement** |

All six decoded GitHub source files begin with the `RIFF` container signature and `WEBP` format identifier. The five CDN destination/coast URLs returned HTTP 200 and `image/webp` in the live image fetch. The Mountain Hiker CDN URL returned HTTP 200 but `text/html; charset=utf-8`; CloudConvert independently identified the downloaded response as HTML (2,090 bytes), title “Media Assets Library”.

## Original files and previews

These links refer to the original binary assets in MEDIA-ASSETS. For the first five entries the Cloudflare URLs are also usable as direct image references. The Mountain Hiker Cloudflare URL is currently incorrect and the GitHub original is linked instead.

### 1. Ocean Cliffs — hero candidate

![Ocean Cliffs original preview](https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp)

- CDN: https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/nature/05_rugged_ocean_cliffs.webp
- Actual scene: rugged green-topped dark cliffs, turbulent surf, overcast/dramatic sky and foreground grass/flowers.
- Target comparison: the brief requires pale Mediterranean limestone, clear warm morning light, calm translucent turquoise water and a quiet left-third headline-safe zone. The actual scene is materially different.
- Crop: at desktop hero ratio 1.6, a modest horizontal crop is possible, but it does not fix the geographic/light/colour mismatch. The narrow mobile crop cannot retain the full coastline context and text-safe composition.
- **Decision: Rejected for `hero-coast.webp`.** The image may be useful in another generic-coast context, but not for this hero brief.

### 2. Ha Long Bay — Asia tile

![Ha Long Bay original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp)

- CDN: https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp
- Actual scene: red-sailed tourist boat on turquoise water, surrounded by karst-like limestone islands.
- Target comparison: subject/location is relevant to Asia and Ha Long Bay.
- Crop: source is landscape 1.758:1 while the required tile is portrait 0.804:1. A cover crop would retain only about 46% of source width; the boat and surrounding karsts would be difficult to preserve together. The source also visibly contains a white side margin and an embedded dark caption/title strip at the bottom.
- **Decision: Needs Replacement.** Find a clean, native portrait composition without baked-in title treatment.

### 3. Serengeti — Africa tile

![Serengeti original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp)

- CDN: https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/05-serengeti-tanzania-v01.webp
- Actual scene: acacia tree in the foreground, elephant group on grassland and warm sunset.
- Target comparison: broadly matches African savannah and evening light; elephants make the composition more safari-led than the requested wide savannah landscape.
- Crop: landscape source vs portrait 0.804 target means roughly 46% width retained. A portrait crop risks losing either the acacia canopy or the elephant group. The preview also shows a white side margin and embedded caption/title strip at the bottom.
- **Decision: Needs Replacement.** Use a clean portrait savannah composition with no embedded text or framing.

### 4. Banff — Americas tile

![Banff original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp)

- CDN: https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/02-banff-canada-v01.webp
- Actual scene: turquoise alpine lake reflecting snow-covered mountain peaks, with forested slopes.
- Target comparison: strong subject match for the mountain-lake brief.
- Crop: source ratio 1.758 vs target 0.804 would require discarding about 54% of the source width. The centred lake and peaks may remain identifiable, but edge forests and peak context are lost. The original also has a white side margin and a visible embedded dark caption/title strip along the bottom.
- **Decision: Needs Replacement.** Subject is right, production asset treatment and portrait crop are not.

### 5. Bora Bora — Oceania tile

![Bora Bora original preview](https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp)

- CDN: https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp
- Actual scene: lush volcanic island rising above bright turquoise lagoon, with overwater bungalows.
- Target comparison: strong subject/location match for the tropical-island tile.
- Crop: source is landscape 1.758 vs target portrait 0.804; a cover crop keeps about 46% of the width and may clip the lagoon/bungalow context. The source preview shows a white side margin and embedded caption/title strip at the bottom.
- **Decision: Needs Replacement.** Keep this as a subject reference only; source a clean, portrait-native photo.

### 6. Mountain Hiker — alpine hiking card

![Mountain Hiker original preview](https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/thumbnails/travel-mountain-hiker.webp?raw=1)

- CDN URL (currently wrong): https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp
- GitHub original: https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/thumbnails/travel-mountain-hiker.webp
- Actual GitHub source: a lone hiker standing on a rocky overlook above a green mountain valley; this is a thumbnail image, not a trail-following scene.
- Format/dimensions: valid WebP, 640×360, only 28,034 bytes.
- CDN response: HTTP 200, but `text/html; charset=utf-8` (2,090 bytes), not an image.
- Crop: target is 900×680 (1.324). The 640×360 source would require horizontal cropping and upscaling by about 1.9× to reach target height. The image does not clearly show hikers following a trail, and it lacks enough native resolution for the specified card.
- **Decision: Needs Replacement.** Correct the CDN publishing path only if this original is still required elsewhere; source a higher-resolution image showing an alpine trail for this homepage slot.

## Duplicate detection

| Check | Result |
|---|---|
| Exact duplicate (SHA-256) | **No duplicates.** All six SHA-256 values are different. |
| Visual/perceptual comparison | No pair shows the same scene or near-identical framing in the six original previews. |
| Shared design artifact | Ha Long Bay, Serengeti, Banff and Bora Bora share a similar white side margin and bottom caption/title-strip treatment. This is a repeated graphic treatment, not an exact or near-duplicate photograph. |
| Algorithmic pHash | Not computed; the visual comparison was performed on the original rendered previews. |

## Desktop/mobile crop assessment

The homepage spec calls for portrait 900×1120 continent tiles and a wide 1920×1200 hero. Four continent candidates (Ha Long Bay, Serengeti, Banff and Bora Bora) are 900×512 landscape files. Cropping those to the required portrait 0.804 ratio retains only approximately 46% of source width. Their subject/context cannot be preserved reliably, and embedded caption strips would remain part of the image. They are not approved for either desktop or mobile tile crops.

The hero source is 1672×941, ratio 1.778 vs target 1.600. Desktop crop loss is moderate, but the photograph itself does not match the Mediterranean brief. A portrait mobile crop would remove most of the wide coastline context.

The hiking thumbnail is 640×360 vs target 900×680, ratio 1.778 vs 1.324. It needs substantial upscaling after crop and does not show the specified trail activity. It is not approved.

## Status summary and remaining homepage image count

| Result for these six candidates | Count |
|---|---:|
| Approved | **0** |
| Rejected for intended slot | **1** |
| Needs Replacement | **5** |
| Total candidates checked | **6** |

Across all 22 required homepage images:
- **0 of 22 are currently approved for integration.**
- **6 candidate slots now have a conclusive rejection/replacement decision.**
- **10 other slots still have no suitable named candidate in the original inventory.**
- **6 broad or unaccepted candidate slots from the previous mapping remain unverified** (London/Europe, Kyoto, Lisbon, Portugal coast, Zermatt/Swiss trail and seasonal coast).
- Therefore **16 slots definitely require a new/replacement source on current evidence** (the six reviewed here plus the ten unmapped slots), while six additional slots remain pending their own inspection. If none of those six later passes, all 22 will need new/replacement assets.

## Ten-slot separate generation/sourcing plan

No generation was performed. These are the ten slots with no suitable named candidate in the original 110-URL inventory:

| Filename | Target | Unique production brief |
|---|---:|---|
| `marrakech-courtyard.webp` | 960×1200 | Photorealistic Marrakech riad courtyard, carved plaster, zellij tilework, central fountain, daylight; portrait composition |
| `slow-train.webp` | 900×680 | Scenic passenger train through a green mountain valley; train and rail infrastructure clearly visible |
| `ceramic-workshop.webp` | 900×680 | Artisan hands shaping a clay vessel on a pottery wheel in a traditional workshop |
| `japan-rail.webp` | 1000×740 | Japanese regional train crossing a rural valley with layered mountains; no legible signage |
| `marrakech-medina.webp` | 860×720 | Narrow Marrakech medina lane with traditional shopfronts and textured architecture |
| `market-morning.webp` | 920×680 | Early morning produce market with authentic stalls, fresh vegetables and soft ambient light |
| `neighbourhood-cafe.webp` | 920×680 | Independent European neighbourhood café opening onto a quiet street; no visible branding |
| `calendar-planning.webp` | 800×620 | Travel notebook, paper map and pen on a wooden table; no readable/generated text |
| `train-platform.webp` | 800×620 | Intercity passenger train at a modern station platform; no legible signage |
| `travel-bag.webp` | 800×620 | Open travel bag neatly packed with practical essentials; realistic fabric, natural light, no visible logos |

All deliverables must satisfy the approved production specification: photorealistic editorial scene, exact target dimensions, WebP quality 85, no baked-in text/borders/watermarks, source/license provenance, and no duplicated scene or composition. Generation is out of scope until separately requested.

## Final decision

**None of the six candidates is approved for homepage integration.** Do not change any homepage image references until the six replacement decisions and the remaining six unverified mapping candidates are reviewed and the user approves the final asset map.

Only this review document is updated on `development/homepage`. No new images were generated, no image binaries were added to TravelGuide, and no source code, data, image references, `main`, or `research/travel-guide-blueprint` branches were changed.
