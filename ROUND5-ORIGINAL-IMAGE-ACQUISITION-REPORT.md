# Phase 2.8 — Round 5 Actual Original Image Acquisition Report

**Date:** 15 November 2026  
**Repository:** `prem-pk-dev/TravelGuide`  
**Write scope:** Documentation only on `development/homepage`  
**Status:** **OPEN — original binary acquisition blocked (0/21)**

## Executive result

No original image binary was downloaded into the working filesystem during this attempt. Browser-rendered previews and Pexels/Wikimedia source-page metadata are not counted as acquired files.

| Requirement | Result |
|---|---:|
| Round 2 JPEG masters acquired | **0/12** |
| Replacement candidate originals acquired | **0/9** |
| Total actual original files acquired | **0/21** |
| Actual binary signatures / MIME verified | **0/21** |
| Actual native byte lengths verified | **0/21** |
| SHA-256 computed from original binary bytes | **0/21** |
| Desktop/mobile source crops approved | **0/21** |
| Image binary or website asset changed | **0** |

No file has been fabricated, reconstructed from a preview, renamed from another photograph, or substituted with a contact sheet or derivative.

## 1. Acquisition capability tests and blockers

### Direct network retrieval

- A direct Pexels original-image transfer from `images.pexels.com` failed in the local runtime with `curl: (6) Could not resolve host: images.pexels.com`.
- A direct Wikimedia original-image transfer from `upload.wikimedia.org` failed with the same DNS-resolution error.
- `container.download` attempts for an opened Pexels image URL and a Wikimedia original-image URL also failed. No output file was created.
- The browser/web reader can render a small number of image endpoints as visual previews, but it does not expose a raw downloaded binary file into the local working filesystem. Those previews are not accepted as source acquisitions.

### Available backup locations checked

- **Cloudflare R2:** a read-only bucket-list request returned HTTP 403, error code 10042, with the message “Please enable R2 through the Cloudflare Dashboard.” No R2 bucket/object listing was available. No Cloudflare setting or bucket was changed.
- **ChatGPT Library:** searches scoped to the Library for the specified source IDs, original JPEG photographs and ZIP/JPG/JPEG backups returned no matching original image/archive. A “Travel Guide: 22 Scenic WebP Assets.png” contact-sheet item exists, but it is a PNG preview/contact sheet and not the 21 original source files. It was not used as an image source.
- No local original-image files were present in `/mnt/data` at the time of the checks.

### Missing capability

The current execution container has no working outbound DNS/routing to the Pexels or Wikimedia image hosts, and the available web reader cannot materialize the raw image body as a file. No authenticated Pexels API key is available. Cloudflare R2 is not enabled for this account. The source pages remain reachable in some browser-reader cases, but that does not provide file bytes to hash or inspect.

**Required to unblock:** either restore outbound image-host downloads in the execution environment, enable and populate an accessible backup object store (without changing MEDIA-ASSETS), or have the user upload the original downloaded files as one ZIP with filenames unchanged.

## 2. Round 2 original JPEG masters — source register and current binary state

The source URLs below are the exact original source pages recorded in the project's photographic credit register. For Pexels, use the page's **Free download** control. For Wikimedia Commons, open the file page and choose **Original file**. Do not save a page screenshot, thumbnail, or resized preview in place of the original.

| # | Derivative slot / subject | Creator | Original source page | Source-page record | Actual binary state |
|---:|---|---|---|---|---|
| 1 | `oceania.webp` — Bora Bora lagoon | François Balédent | https://www.pexels.com/photo/scenic-aerial-view-of-bora-bora-lagoon-30422271/ | Pexels Free; prior source record 4032×2268 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 2 | `alpine-hiking.webp` — Swiss Alps hikers | Jean-Paul Wettstein | https://www.pexels.com/photo/hikers-on-a-mountain-trail-in-swiss-alps-19244950/ | Pexels Free; prior source record 6064×4040 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 3 | `marrakech-courtyard.webp` — Dar al Bacha courtyard | R Prazeres | https://commons.wikimedia.org/wiki/File:Dar_al_Bacha_Marrakesh_DSCF8822.jpg | CC BY-SA 4.0; page record 4000×3000, 3,052,596 bytes | **Not acquired** — values are source-page metadata, not local binary verification |
| 4 | `slow-train.webp` — Gurtnellen rail scene | Kabelleger / David Gubler | https://commons.wikimedia.org/wiki/File:SBB_RBe_540_Gurtnellen.jpg | CC BY-SA 4.0; page record 5400×3600, about 7.8 MB | **Not acquired** — values are source-page metadata, not local binary verification |
| 5 | `ceramic-workshop.webp` — pottery wheel | Letícia Alvares | https://www.pexels.com/photo/hands-shaping-clay-on-pottery-wheel-in-studio-36717713/ | Pexels Free; prior source record 5760×3840 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 6 | `portugal-coast.webp` — Azenhas do Mar | Jose Maria Lanca | https://commons.wikimedia.org/wiki/File:Azenhas_do_Mar_(Sintra).jpg | CC BY-SA 4.0; page record 4000×3000, about 2.48 MB | **Not acquired** — values are source-page metadata, not local binary verification |
| 7 | `japan-rail.webp` — Japanese rail | 貴彦 佐藤 | https://www.pexels.com/photo/japanese-train-arriving-at-rural-station-platform-35497307/ | Pexels Free; prior source record 5760×3240 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 8 | `marrakech-medina.webp` — Marrakech Medina | Iainmccurdy | https://commons.wikimedia.org/wiki/File:Marrakech_Medina.jpg | CC0 1.0; page record 5278×3518, 14.17 MB | **Not acquired** — values are source-page metadata, not local binary verification |
| 9 | `market-morning.webp` — market stall | Mehmet Turgut Kirkgoz | https://www.pexels.com/photo/people-selling-fresh-fruit-and-vegetables-on-a-market-stall-11522046/ | Pexels Free; prior source record 4897×3264 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 10 | `calendar-planning.webp` — travel planning | Lara Jameson | https://www.pexels.com/photo/person-writing-on-a-notebook-place-on-a-world-map-8828672/ | Pexels Free; prior source record 5040×3360 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 11 | `train-platform.webp` — LNER train at platform | Dan Wright | https://www.pexels.com/photo/modern-train-at-platform-in-urban-station-40247858/ | Pexels Free; prior source record 5952×3968 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |
| 12 | `travel-bag.webp` — suitcase/travel gear | SHVETS production | https://www.pexels.com/photo/clothes-and-sunglasses-in-an-open-suitcase-on-a-rug-8933565/ | Pexels Free; prior source record 6000×4000 | **Not acquired** — actual bytes, MIME, size and SHA-256 unavailable |

### Master binary verification fields

For every one of the 12 rows above:

- Actual detected file format and signature: **Not verified — file absent**.
- Actual decoded width × height: **Not verified from acquired bytes**.
- Actual file size in bytes: **Not verified from acquired bytes**.
- SHA-256: **Not computed — no original bytes available**.
- Source-page dimensions and file-size metadata, where shown, are retained only as page-level reference values.

## 3. Nine replacement candidate originals — source register and current binary state

The Pexels page URLs below point to the selected photographs from the previous candidate research. Use the page's **Free download** control and retain the downloaded filename. A page thumbnail, embedded preview, screenshot or cropped variant is not acceptable as the original.

| # | Slot | Candidate and photographer | Original source page | Page-level dimensions / composition record | Actual binary state |
|---:|---|---|---|---|---|
| 1 | Hero | Benitachell Mediterranean cliffs — Rafael Minguet Delgado | https://www.pexels.com/photo/stunning-rocky-coastline-in-benitachell-spain-30558175/ | 5702×3801 (3:2); cliffs and turquoise Mediterranean water | **Not acquired** — original bytes/hash/MIME/size absent |
| 2 | Asia | Ha Long Bay — Anh Nguyen | https://www.pexels.com/photo/misty-islands-in-halong-bay-vietnam-35858996/ | 2400×3000 (4:5); limestone karsts and misty bay | **Not acquired** — original bytes/hash/MIME/size absent |
| 3 | Europe | Historic riverside buildings — Alexandra H. Maria | https://www.pexels.com/photo/historic-european-riverside-buildings-with-reflection-35534814/ | 3084×4112 (3:4); buildings and water reflection | **Not acquired** — original bytes/hash/MIME/size absent |
| 4 | Africa | Savannah sunset — Wussol | https://www.pexels.com/photo/sunset-in-african-savannah-landscape-30878973/ | Dimensions not present in the retrieved record; preview shows acacias, central dirt road and sunset | **Not acquired** — preview is not a binary |
| 5 | Americas | Fitz Roy Glacier and Lake — Nazarena Pozza | https://www.pexels.com/photo/fitz-roy-glacier-and-lake-17600486/ | 3472×4640 (217:290); mountain peak and glacial lake | **Not acquired** — original bytes/hash/MIME/size absent |
| 6 | Kyoto | Traditional Kyoto street — Ignacio Estevo | https://www.pexels.com/photo/traditional-japanese-street-in-kyoto-36889407/ | 2054×2899 (158:223); traditional wooden houses and street | **Not acquired** — original bytes/hash/MIME/size absent |
| 7 | Lisbon | Yellow Lisbon tram — Oleksandra Zelena | https://www.pexels.com/photo/charming-lisbon-street-with-historic-tram-40600060/ | 3072×4080 (64:85); historic tram on a Lisbon street | **Not acquired** — original bytes/hash/MIME/size absent |
| 8 | Seasonal coast | Sagres Atlantic cliffs — Nils Rotura | https://www.pexels.com/photo/dramatic-cliffs-over-the-atlantic-in-sagres-portugal-36733193/ | 5029×2829 (approx. 16:9); Atlantic cliffs; shoulder-season context not proven | **Not acquired** — original bytes/hash/MIME/size absent |
| 9 | Neighbourhood café | Street café tables — Anastasia Shuraeva | https://www.pexels.com/photo/cafe-tables-on-the-street-4210026/ | 5472×3648 (3:2); outdoor tables and cobbled street; people/signage visible in preview | **Not acquired** — preview is not a binary |

### Limited visual preview observations (not approvals)

Two Pexels pages exposed original-download links that the browser reader could render as full-image previews:

- **Africa / Wussol:** a wide landscape composition with a large warm sky, acacia silhouettes, grassland and a road running into the scene near the centre. A portrait tile would cut substantial side context. This is a preview-only observation, not a verified original-file crop test.
- **Café / Anastasia Shuraeva:** outdoor tables occupy much of the left/foreground, with a cobbled lane receding through the centre and people/signage in the right background. A narrow portrait crop may lose street context or the table group. The visible people/signage require separate clearance review.

The other seven candidate images were not rendered as usable source originals in the available image reader. No desktop/mobile crop screenshots were created. Candidate crop approvals remain **0/9**.

## 4. Commercial-use license and provenance review

### Pexels

The official Pexels License page says photos and videos can be used for free, attribution is not required, and modification is permitted; it lists restrictions including unaltered-copy sales, implied endorsement, standalone redistribution to stock/wallpaper platforms and trademark/service-mark use. It also lists website/blog/app use as an allowed use case.

Official references:
- https://www.pexels.com/license/
- https://www.pexels.com/terms-of-service/

Pexels Terms additionally warn that identifiable people, logos, brands, buildings/property and other third-party rights may require separate permissions, and Pexels does not warrant that every consent or license exists. Therefore:

- Pexels platform license and commercial-use permissions: **license-level verified**.
- Candidate/source-specific model and property releases: **Pending**.
- Identifiable people, visible business signage, logos and trademark clearance: **Pending where present**.
- No Pexels candidate is cleared for integration solely by its “Free” page badge.

### Wikimedia Commons

The four Round 2 Wikimedia source records are:
- Dar al Bacha courtyard — CC BY-SA 4.0.
- Gurtnellen train — CC BY-SA 4.0.
- Azenhas do Mar — CC BY-SA 4.0.
- Marrakech Medina — CC0 1.0.

For the three CC BY-SA 4.0 sources, preserve appropriate author attribution, source link, license link and change notice; adapted derivatives must comply with the share-alike requirement. CC0 permits broad copyright reuse but does not automatically clear unrelated privacy, property or trademark rights.

## 5. Exact files required from the user to unblock

Please upload **one ZIP containing the 21 original downloaded image files**, retaining each site's downloaded filename and original dimensions:

- 12 original master files from the source pages in Section 2.
- 9 candidate original files from the source pages in Section 3.

Download steps:
1. Open each Pexels source page and choose **Free download**. Do not use a displayed thumbnail, preview-sized derivative or screenshot.
2. Open each Wikimedia Commons file page and choose **Original file**.
3. Keep the downloaded filenames unchanged. Do not rename files to imitate project slots.
4. Put the 21 originals in one ZIP and attach it to this conversation. A short text manifest mapping each file to its source-page URL is helpful if the downloaded filenames are ambiguous.

Once the ZIP is attached in this conversation, the files can be checked from their actual bytes for format signature, MIME, dimensions, byte length and SHA-256. Composition review can then use the acquired sources and the existing homepage target aspect ratios. Candidate-specific rights/release checks and editorial approval will still be separate gates.

## 6. Protection and disposition

- Existing 12 committed WebP derivatives are preserved and untouched.
- No homepage HTML/CSS/JS/JSON, image reference, manifest, logo, branding or binary changed.
- No MEDIA-ASSETS file, branch, setting or deployment changed.
- No production merge or deployment occurred.
- No edits were made to `main`, `research/travel-guide-blueprint` or `development/responsive-fixes`.
- This report is the only intended change on `development/homepage`.

**Round 5 remains OPEN — ACTUAL ORIGINAL IMAGE ACQUISITION BLOCKED (0/21). Do not start Round 6.**
