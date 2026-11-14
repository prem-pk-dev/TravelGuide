# TravelGuide Homepage — Existing MEDIA-ASSETS Mapping

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Branch:** `development/homepage`  
**Inventory source:** User-supplied Library file `Pasted markdown.md` (153 lines; 110 listed WebP URLs)  
**CDN:** https://media-assets-4sb.pages.dev  
**Specification:** `HOMEPAGE-ASSET-SPECIFICATION.md`  
**Status:** Candidate mapping only. No asset has passed live URL, dimension, aspect-ratio or visual verification in this run.

## Verification limitation

The inventory file and the complete homepage image specification were read. The inventory contains 110 URLs across travel destinations (30), nature (25), photography (20), technology (10), general (5), and thumbnails (20).

Direct URL opening through the available web reader returned `Internal Error / URL is not accessible via this tool` for the sampled Cloudflare Pages image URLs. The container download path also could not retrieve an image because the URL could not be opened by the web reader first. Therefore:
- **HTTP/load verification:** not established.
- **Actual image dimensions and aspect ratios:** not retrieved; do not infer them from names or target slots.
- **Visual inspection and crop suitability:** not established; filenames and inventory labels are not visual evidence.
- **Verified exact/appropriate matches:** **0 of 22**.
- Candidate means only that the inventory label suggests a potentially relevant subject; it is not approved for homepage use.

No new images were generated. No existing homepage data, references, functionality, or source files were changed.

## Mapping register

| # | Homepage filename | Existing inventory candidate | Public URL | Actual dimensions | Intended section | Homepage alt text | Verification status |
|---:|---|---|---|---|---|---|---|
| 1 | `hero-coast.webp` | Nature — Ocean Cliffs (`05_rugged_ocean_cliffs.webp`) | https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp | Not retrieved | Homepage hero | Sunlit rugged coastline and turquoise Mediterranean water | Candidate only; URL, pixels and left-side headline-safe composition unverified |
| 2 | `asia.webp` | Travel Destinations — Ha Long Bay (`20-ha-long-bay-vietnam-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp | Not retrieved | Asia continent tile | Dramatic limestone karsts rising above a quiet bay in Southeast Asia | Strong subject-name candidate; URL, portrait ratio and crop unverified |
| 3 | `europe.webp` | Travel Destinations — London UK (`12-london-uk-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/12-london-uk-v01.webp | Not retrieved | Europe continent tile | Historic European riverside town with old stone architecture | Not accepted: London city imagery is not evidence of the specified generic historic riverside town |
| 4 | `africa.webp` | Travel Destinations — Serengeti Tanzania (`05-serengeti-tanzania-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/05-serengeti-tanzania-v01.webp | Not retrieved | Africa continent tile | Wide African savannah beneath a warm evening sky | Strong subject-name candidate; savannah composition, evening light, URL and crop unverified |
| 5 | `americas.webp` | Travel Destinations — Banff Canada (`02-banff-canada-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/02-banff-canada-v01.webp | Not retrieved | Americas continent tile | Mountain lake framed by dramatic peaks in the Americas | Strong subject-name candidate; lake reflection, exact framing, URL and crop unverified |
| 6 | `oceania.webp` | Travel Destinations — Bora Bora (`19-bora-bora-french-polynesia-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp | Not retrieved | Oceania continent tile | Turquoise ocean around a lush tropical island | Candidate only; volcanic ridge/lagoon composition, URL and crop unverified |
| 7 | `kyoto-street.webp` | Travel Destinations — Kyoto Japan (`03-kyoto-japan-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/03-kyoto-japan-v01.webp | Not retrieved | Featured Kyoto card; Inspiration mega-menu | Quiet traditional street in Kyoto with wooden machiya houses | Not accepted yet: Kyoto destination label does not prove a quiet machiya lane; URL and composition unverified |
| 8 | `lisbon-tram.webp` | Travel Destinations — Lisbon Portugal (`23-lisbon-portugal-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/23-lisbon-portugal-v01.webp | Not retrieved | Featured Lisbon card | Classic yellow tram passing through a sunlit Lisbon street | Not accepted yet: Lisbon destination label does not prove a visible classic yellow tram; URL and composition unverified |
| 9 | `marrakech-courtyard.webp` | No suitable named candidate in inventory | — | — | Featured Marrakech card | Sunlit architectural courtyard in Marrakech with carved details | Missing; inventory contains no Marrakech courtyard/riad candidate |
| 10 | `slow-train.webp` | No suitable named candidate in inventory | — | — | Travel inspiration card | Train travelling through a green mountain valley | Missing; no scenic train-through-valley candidate listed |
| 11 | `alpine-hiking.webp` | Thumbnails — Mountain Hiker (`travel-mountain-hiker.webp`) | https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp | Not retrieved | Things-to-do / alpine hiking card | Hikers following a trail across an alpine landscape | Candidate only; thumbnail label does not establish alpine trail composition, resolution or crop suitability |
| 12 | `ceramic-workshop.webp` | No suitable named candidate in inventory | — | — | Things-to-do / craft experience card | Artisan shaping a ceramic vessel in a traditional workshop | Missing; no pottery/ceramic workshop candidate listed |
| 13 | `portugal-coast.webp` | Travel Destinations — Lisbon Portugal (`23-lisbon-portugal-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/23-lisbon-portugal-v01.webp | Not retrieved | Portugal itinerary card | Whitewashed Portuguese coastal village overlooking the Atlantic | Not accepted: Lisbon city label does not establish a whitewashed coastal village; avoid reusing Lisbon candidate |
| 14 | `japan-rail.webp` | No suitable named candidate in inventory | — | — | Japan itinerary card | Japanese train crossing a rural landscape with mountains beyond | Missing; no Japanese rail/train landscape candidate listed |
| 15 | `marrakech-medina.webp` | No suitable named candidate in inventory | — | — | Marrakech medina card | Narrow Marrakech medina lane with traditional shops | Missing; no Marrakech medina candidate listed |
| 16 | `swiss-trail.webp` | Travel Destinations — Zermatt Switzerland (`15-zermatt-switzerland-v01.webp`) | https://media-assets-4sb.pages.dev/images/travel/destinations/15-zermatt-switzerland-v01.webp | Not retrieved | Swiss trail card | Mountain footpath winding through a green Swiss alpine valley | Not accepted yet: Zermatt destination label does not prove a green valley footpath; composition and crop unverified |
| 17 | `seasonal-coast.webp` | Nature — Ocean Cliffs (`05_rugged_ocean_cliffs.webp`) | https://media-assets-4sb.pages.dev/images/nature/05_rugged_ocean_cliffs.webp | Not retrieved | Travel journal article card | Coastal landscape in soft light during a shoulder season | Not assigned: same candidate reserved for hero evaluation; no duplicate reuse and no separate verified coast asset |
| 18 | `market-morning.webp` | No suitable named candidate in inventory | — | — | Travel journal article card | Early morning market scene with fresh produce and stalls | Missing; no market scene candidate listed |
| 19 | `neighbourhood-cafe.webp` | No suitable named candidate in inventory | — | — | Travel journal article card | Neighbourhood café opening onto a quiet European street | Missing; no café/neighbourhood scene candidate listed |
| 20 | `calendar-planning.webp` | No suitable named candidate in inventory | — | — | Planning resources card | Travel notebook and map laid out on a wooden table | Missing; no travel notebook/map still-life candidate listed |
| 21 | `train-platform.webp` | No suitable named candidate in inventory | — | — | Planning resources card | Intercity train waiting at a modern station platform | Missing; no station/platform train candidate listed |
| 22 | `travel-bag.webp` | No suitable named candidate in inventory | — | — | Planning resources card | Open travel bag packed neatly with practical essentials | Missing; no luggage/packing still-life candidate listed |

## Duplicate and reuse policy

- No candidate has been assigned to more than one homepage slot as an approved asset.
- The ocean-cliffs candidate is listed for hero evaluation only; it is not reused for the seasonal-coast slot.
- The Lisbon destination candidate is not reused for the Portugal coast slot.
- No exact or visually suitable match is claimed based on a filename alone.

## Summary

| Classification | Count |
|---|---:|
| Verified matches (URL + dimensions + visual fit all confirmed) | **0** |
| Candidate assets requiring live/image inspection | **6** |
| Slots with no suitable inventory candidate identified | **10** |
| Slots with broad or unsuitable candidates that are not approved | **6** |
| Total homepage image slots | **22** |

The six potentially relevant candidate rows are not approved for integration. All remain unverified until the actual image bytes or browser-visible image previews are available for inspection, and dimensions/aspect ratios can be read from the image itself.

## Next step (not performed)

Obtain a usable inventory export with direct image previews or downloadable source bytes, then inspect the six potentially relevant candidates for:
1. successful HTTP response and decoded WebP format;
2. exact pixel dimensions and aspect ratio;
3. subject accuracy and photographic quality;
4. desktop/mobile crop safety;
5. perceptual duplicate similarity against the other selected candidates.

Only after those checks should the mapping be upgraded to verified and any homepage image references be changed. No image generation, conversion, homepage source edit, build, merge or deployment is part of this mapping-only task.
