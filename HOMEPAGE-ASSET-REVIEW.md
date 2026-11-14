# TravelGuide Homepage — Candidate Image Verification Review

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Branch:** `development/homepage`  
**Review date:** 2026-11-14  
**Source documents read:** `HOMEPAGE-ASSET-MAPPING.md`, `HOMEPAGE-ASSET-SPECIFICATION.md`, original user-provided MEDIA-ASSETS inventory (153 lines; 110 listed URLs).  
**Scope:** Six mapped candidates only. No image generation, homepage code/data/reference changes, branch merge, deployment or build verification.

## Important verification boundary

The CDN was queried via a live page/image fetch. The result exposed HTTP status and content type, and in four image cases it also returned image-node evidence or an image-specific visual summary. However, it did **not** provide downloadable image bytes to the execution environment. Therefore this review cannot truthfully state pixel dimensions, file sizes, decoded file signatures, exact aspect ratios, perceptual hashes, exact duplicate status, or desktop/mobile crops. Textual image summaries are preliminary visual evidence, not a substitute for inspecting full-resolution pixels.

For every candidate, `actual bytes`, `dimensions`, `aspect ratio`, `crop safety`, and `pixel-level duplicate checks` remain **not verified** unless otherwise stated. Do not treat any provisional match as approved for homepage integration.

## Individual candidate results

| Candidate / intended homepage slot | URL | HTTP | Reported content type | Actual dimensions | Aspect ratio | Visual evidence available | Decision |
|---|---|---:|---|---:|---:|---|---|
| hero-coast | [Open asset](https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp) | 200 | image/webp | Not retrieved | Not computed | Rugged cliffs, rough water, cloudy sky, foreground grass/flowers; not the specified Mediterranean clear morning / calm turquoise scene; left headline-safe area not established. | Rejected for hero target; could only be reconsidered for generic coast after direct pixel review. |
| asia | [Open asset](https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp) | 200 | image/webp | Not retrieved | Not computed | A boat with red sails on turquoise sea, surrounded by mountains; karst geometry and focal placement cannot be confirmed fully from textual image summary. | Unverified; provisional subject match, not approved until dimensions and visual crop review. |
| africa | [Open asset](https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp) | 200 | image/webp | Not retrieved | Not computed | Summary indicates sunset, acacia tree and elephants grazing; target requires broad African savannah under warm evening sky; focal crop/savannah width not confirmed. | Provisional thematic match; not approved pending pixel/crop checks. |
| americas | [Open asset](https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp) | 200 | image/webp | Not retrieved | Not computed | Summary describes lake, mountains, trees and reflection under blue sky; broadly aligns with mountain-lake brief. | Provisional thematic match; not approved pending dimensions and crop checks. |
| oceania | [Open asset](https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp) | 200 | image/webp | Not retrieved | Not computed | HTTP metadata said image/webp but image extraction returned no image and summary was generic destination prose, not a description of the actual image pixels. | Not verified; do not approve based on URL/metadata alone. |
| alpine-hiking | [Open asset](https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp) | 200 | text/html; charset=utf-8 | Not retrieved | Not computed | Returned Media Assets Library HTML page, not image bytes. | Rejected: wrong resource/content type; thumbnail path is not a valid image response. |

### Individual notes

1. **hero-coast** — HTTP 200 and `image/webp`. The returned image summary describes rugged cliffs, turbulent waves, dramatic cloud/sun rays and green/purple foreground vegetation. This materially differs from the approved brief's warm clear morning, pale Mediterranean limestone, translucent turquoise water and quiet left-third headline-safe space. **Reject for hero** based on the available description; dimensions/crop remain unverified.
2. **asia** — HTTP 200 and `image/webp`. Returned image summary describes a red-sailed boat on turquoise water among mountains. Ha Long Bay relevance is plausible from the inventory label and summary, but the exact karst composition, portrait framing and crop cannot be certified without pixels. **Provisional only; not approved.**
3. **africa** — HTTP 200 and `image/webp`. Returned image summary describes sunset, an acacia tree and elephants grazing. The region/theme aligns, but the composition may be safari/elephant-led rather than the wide savannah brief. **Provisional only; not approved.**
4. **americas** — HTTP 200 and `image/webp`. Returned summary describes a lake, surrounding mountains/trees and reflection under a bright blue sky. Broadly consistent with the Banff mountain-lake target; exact framing, ratio and mobile crop remain unverified. **Provisional only; not approved.**
5. **oceania** — Fetch metadata reports HTTP 200 and `image/webp`, but the image extractor returned no image node and supplied only generic destination prose. No image-specific visual content was established. **Unverified; not approved.**
6. **alpine-hiking** — HTTP 200 but content type is `text/html; charset=utf-8`, and the returned title is “Media Assets Library”. This is not a WebP response. **Reject this URL as a broken/wrong asset path.**

## Preview availability

The live extractor returned the following image resource nodes: hero-coast, asia, africa and americas. It returned no image node for oceania, and the alpine-hiking URL resolved to an HTML page. No raw image bytes or reusable preview files were supplied to the workspace, so embedded binary previews are not included in this Markdown review. The direct links above are the only verified preview route currently available.

## Duplicate and composition checks

| Check | Result |
|---|---|
| Exact byte/hash duplicate detection | Not possible — source bytes unavailable |
| Perceptual hash / near-duplicate detection | Not possible — source pixels unavailable |
| Repeated composition / matching framing | Not possible to certify from metadata-only summaries |
| Known repeated candidate assignments from mapping | None approved; hero ocean-cliffs was not reused for seasonal-coast; Lisbon is not reused |

No duplicate-free claim is made. The fact that candidate URLs differ does not establish that their image contents differ.

## Crop and target suitability

| Candidate | Desktop crop | Mobile crop | Target fit |
|---|---|---|---|
| hero-coast | Not verified; described scene conflicts with brief's left text-safe calm-water composition | Not verified | Reject for current hero brief |
| asia | Not verified | Not verified | Plausible location, unapproved |
| africa | Not verified | Not verified | Plausible region, composition uncertain |
| americas | Not verified | Not verified | Plausible subject, ratio/crop unknown |
| oceania | Not verified | Not verified | No image-specific preview |
| alpine-hiking | Not applicable — URL returned HTML | Not applicable | Reject wrong content type |

## Missing-asset calculation (22 required homepage slots)

The earlier mapping had 10 slots with no named candidate and 6 with broad/unsuitable candidates, plus the 6 candidates now under inspection. This verification did not produce any fully approved match because dimensions, aspect ratios and crop checks could not be completed.

- **Strictly approved/verified existing matches: 0 of 22.**
- **Slots with no suitable candidate identified in the inventory: 10.**
- **Candidate slots still unresolved after this review: 12** (six candidates evaluated here, including rejected/provisional assets, and six broader/unaccepted mappings such as London, generic Kyoto/Lisbon/Zermatt, generic Portugal-coast, and seasonal-coast reuse conflict).
- **Assets that must be newly sourced or generated to complete the 22-slot spec on current evidence: 22**, unless later byte-level review approves one or more existing candidates. This is the only defensible strict count at this stage; “10 missing” was merely the count of inventory slots with no named candidate, not the fully verified final missing count.

## Separate generation/sourcing plan for the 10 previously unmapped slots

No generation has been performed. The following ten are the slots with no suitable candidate named in the original inventory:

| Filename | Target | Unique generation/sourcing brief |
|---|---:|---|
| `marrakech-courtyard.webp` | 960×1200 | Photorealistic Marrakech riad courtyard, carved plaster, zellij tilework, central fountain, daylight; portrait composition, no people close-up |
| `slow-train.webp` | 900×680 | Scenic passenger train moving through a green mountain valley; train clearly visible, believable rail infrastructure |
| `ceramic-workshop.webp` | 900×680 | Artisan hands shaping a clay vessel on a pottery wheel inside a real traditional ceramic workshop; documentary detail |
| `japan-rail.webp` | 1000×740 | Japanese regional train crossing a rural valley with layered mountains; authentic train geometry, no legible signage |
| `marrakech-medina.webp` | 860×720 | Narrow Marrakech medina lane with traditional shopfronts and textured architecture; natural street perspective |
| `market-morning.webp` | 920×680 | Early morning produce market, authentic stalls, fresh vegetables and soft ambient light; editorial candid framing |
| `neighbourhood-cafe.webp` | 920×680 | Independent European neighbourhood café opening onto a quiet street; inviting but documentary, no legible branding |
| `calendar-planning.webp` | 800×620 | Travel notebook, paper map and pen on a wooden table; editorial still life, no readable/generated text |
| `train-platform.webp` | 800×620 | Intercity passenger train at a modern station platform; strong train/platform context, no legible signage |
| `travel-bag.webp` | 800×620 | Open travel bag neatly packed with practical travel essentials; realistic fabric, natural window light, no visible logos |

All ten briefs inherit the global image policy in the specification: independent photorealistic editorial scenes, genuine WebP output, target dimensions, quality 85, provenance/license record and no duplicate concepts. Generation should wait until the user explicitly starts that phase.

## Required evidence to close this review

Obtain the six original files as downloadable attachments or provide a contact sheet plus original downloadable images. A contact sheet alone is useful for composition comparison but cannot verify native dimensions or file hashes. Once source files exist, compute SHA-256, perceptual hashes, decode using an image library, record exact width/height/ratio/format, and review crops at desktop and mobile viewports.

**Final decision:** No candidate is approved for homepage integration from the available evidence. Do not update homepage image references until a byte-level review is complete and the user approves the final mapping.
