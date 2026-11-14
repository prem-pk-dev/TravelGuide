# TravelGuide Homepage — Six-Asset Replacement Sourcing Plan

**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Plan branch:** `development/homepage`  
**Media source repository:** https://github.com/prem-pk-dev/MEDIA-ASSETS (private; source branch `main`)  
**Public CDN:** https://media-assets-4sb.pages.dev  
**Prepared:** 2026-11-14  
**Inputs reviewed:** `HOMEPAGE-ASSET-SPECIFICATION.md`, `HOMEPAGE-ASSET-MAPPING.md`, `HOMEPAGE-ASSET-REVIEW.md`, user-provided original MEDIA-ASSETS inventory (110 URLs), and current MEDIA-ASSETS `ASSET-INDEX.json`, tree and deployment guide.

## 1. Plan outcome

The six previously reviewed source candidates are not suitable for direct homepage use. The MEDIA-ASSETS GitHub repository contains two additional candidates worth a fresh inspection (Amalfi coast and a different Serengeti sunrise scene), but neither was visually/dimensionally certified in this planning pass. They are therefore **re-inspection candidates, not approved reuse**.

| Requirement | Best existing source found | Current sourcing decision |
|---|---|---|
| Hero Mediterranean clear-morning coast | `amalfi-coast-village-v01.webp` is the closest inventory-index candidate; current visual/crop not verified | Re-inspect original bytes; otherwise create a new dedicated master |
| Asia limestone karsts portrait | Existing Ha Long Bay source failed clean-image/portrait spec | New original image required |
| Africa savannah, acacia, warm evening | `serengeti-elephant-safari-sunrise-v01.webp` is an additional candidate; sunrise is not the requested evening light | Re-inspect; if sunrise/landscape framing is confirmed, new evening-portrait master required |
| Americas reflective alpine lake | Existing Banff source failed clean-image/portrait spec; `alpine-glacial-lake-v01.webp` is another inventory candidate but not yet checked | Re-inspect original bytes; otherwise new clean portrait master required |
| Oceania lush South Pacific island/lagoon | Existing Bora Bora source failed clean-image/portrait spec | New original image required |
| Alpine hiking trail | Existing Mountain Hiker thumbnail is only 640×360 and public CDN route returns HTML in the prior verified response | New native-resolution trail master required; repair CDN route separately if retaining thumbnail for any other use |

**Reuse now: 0 of 6.**  
**Re-inspect candidates: 3** (Amalfi, alternate Serengeti, alpine glacial lake).  
**New-image requirements already established by current evidence: 3** (Asia, Oceania, Alpine Hiking); Hero and Africa should also be treated as new-generation fallbacks unless candidate reinspection passes. This plan does not generate any images.

## 2. Six replacement requirements

### 01 — Hero: `hero-coast.webp`

- **Required filename:** `hero-coast.webp`
- **Subject:** Mediterranean coastline in warm clear morning light; pale limestone coast; translucent turquoise water; distant natural headland.
- **Existing source:** `images/travel/destinations/amalfi-coast-village-v01.webp` (ASSET-INDEX lists it as approved and 446,770 bytes).
- **Original source URL:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/amalfi-coast-village-v01.webp
- **Public URL to test after deployment:** https://media-assets-4sb.pages.dev/images/travel/destinations/amalfi-coast-village-v01.webp
- **Actual dimensions:** Not verified in this planning pass. The current Cloudflare fetch returned 403 from this execution environment.
- **Target:** 1920×1200 (1.600:1).
- **Crop:** Wide desktop hero; leave the left third low-detail for headline overlay. Mobile crop must retain a legible coastline/water boundary and horizon. Do not crop a cliffside village into a substitute for the requested natural rugged coast if the subject dominates.
- **Source decision:** **Re-inspect candidate first; otherwise new dedicated master.** If the actual file is village/architecture-led, sunset-lit, captioned, bordered, too small or cannot preserve headline-safe space, do not reuse.
- **New generation needed:** Conditional. Default fallback is a new original clear-morning Mediterranean coast.
- **CDN status:** Unverified; current check from Cloudflare execution returned 403. Not certified public.

### 02 — Asia: `asia.webp`

- **Required filename:** `asia.webp`
- **Subject:** Southeast Asian limestone karsts rising from a quiet emerald/turquoise bay; portrait-led vertical composition; boat only as small scale reference.
- **Existing source:** Ha Long Bay `images/travel/destinations/20-ha-long-bay-vietnam-v01.webp` was visually inspected in the candidate review and rejected: it has baked-in white frame/caption strip and landscape ratio 900×512.
- **Original source URL (rejected):** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/20-ha-long-bay-vietnam-v01.webp
- **Actual dimensions of rejected source:** 900×512; not a suitable delivered portrait master.
- **Target:** 900×1120 (0.804:1).
- **Crop:** Karst silhouettes must extend vertically with enough water context; preserve a strong central focal shape through portrait and smaller mobile crop. No text, border or frame.
- **Source decision:** **New original image required.**
- **New generation needed:** Yes, unless a genuinely clean, native-resolution portrait original is later discovered in inventory.
- **CDN status:** Old source URL was verified in prior review as HTTP 200/image-webp, but it serves a visually rejected file. Do not reuse that URL for homepage integration.

### 03 — Africa: `africa.webp`

- **Required filename:** `africa.webp`
- **Subject:** African savannah with acacia silhouette/trees, warm evening golden-hour light, broad grassland depth. Wildlife may appear in the middle distance but should not overwhelm the landscape.
- **Existing source A:** `images/travel/destinations/05-serengeti-tanzania-v01.webp`, visually inspected and rejected because it has a white left frame/caption footer and is 900×512 landscape.
- **Original source URL A:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/05-serengeti-tanzania-v01.webp
- **Existing source B:** `images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp` (ASSET-INDEX: approved, 324,842 bytes; title/alt explicitly identify elephant herd, golden grass and acacia trees at sunrise).
- **Original source URL B:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp
- **Actual dimensions:** Neither alternative's dimensions were verified in this plan.
- **Target:** 900×1120 (0.804:1).
- **Crop:** Portrait frame must hold the acacia canopy and open savannah; keep any wildlife at a believable middle distance. Evening light, not a sunrise-only orange sky.
- **Source decision:** **Re-inspect source B first.** Index metadata says sunrise, not evening; use it only if actual photo meets light and portrait composition without graphics. Otherwise new evening portrait master.
- **New generation needed:** Conditional; likely yes if the source is landscape/sunrise or has graphics.
- **CDN status:** Source B current URL fetch returned 403 from this execution environment; no live delivery certification.

### 04 — Americas: `americas.webp`

- **Required filename:** `americas.webp`
- **Subject:** Clear mountain lake with dramatic alpine peaks and a strong reflection; editorial landscape with enough vertical depth for portrait crop.
- **Existing source A:** Banff `images/travel/destinations/02-banff-canada-v01.webp` was inspected and rejected: white frame/caption strip; 900×512 landscape.
- **Original source URL A:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/02-banff-canada-v01.webp
- **Existing source B:** `images/travel/destinations/alpine-glacial-lake-v01.webp` (ASSET-INDEX: approved, 416,978 bytes; title describes turquoise glacial lake and snowy peaks; alt indicates reflection).
- **Original source URL B:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/alpine-glacial-lake-v01.webp
- **Actual dimensions:** Source B not verified in this pass.
- **Target:** 900×1120 (0.804:1).
- **Crop:** Preserve both peak skyline and reflected foreground in the portrait center; no caption bar, frame or text. Do not reuse the same alpine scene in another homepage slot.
- **Source decision:** **Re-inspect source B first.** Subject description is promising, but native ratio, actual overlay presence and crop safety are unconfirmed.
- **New generation needed:** Conditional. If source B fails visual/dimension checks, commission a new clean portrait master.
- **CDN status:** Current fetch of source B returned 403 from this execution environment; not certified.

### 05 — Oceania: `oceania.webp`

- **Required filename:** `oceania.webp`
- **Subject:** Lush South Pacific volcanic island with a vivid but natural turquoise lagoon; island/reef landscape clearly dominates, with overwater structures only if they do not distract.
- **Existing source:** Bora Bora `images/travel/destinations/19-bora-bora-french-polynesia-v01.webp` was inspected and rejected: baked-in white frame and caption footer, landscape 900×512, unsuitable portrait crop.
- **Original source URL (rejected):** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/images/travel/destinations/19-bora-bora-french-polynesia-v01.webp
- **Actual dimensions of rejected source:** 900×512.
- **Target:** 900×1120 (0.804:1).
- **Crop:** Tall island profile with lagoon foreground. Maintain both lush green ridge and turquoise water within the portrait crop.
- **Source decision:** **New original image required.**
- **New generation needed:** Yes, unless a separate clean, native-resolution South Pacific portrait original is later found.
- **CDN status:** Existing rejected URL previously returned HTTP 200/image-webp; visual/crop rejection stands.

### 06 — Alpine Hiking: `alpine-hiking.webp`

- **Required filename:** `alpine-hiking.webp`
- **Subject:** Photorealistic alpine hiking trail; visible path leading through an alpine landscape, layered mountains and natural scale. Prefer distant unidentifiable hikers or no people.
- **Existing source:** `thumbnails/travel-mountain-hiker.webp`; original exists in MEDIA-ASSETS, but is only 640×360 (1.7778:1), includes a light edge strip and is below the 900×680 target.
- **Original source URL:** https://github.com/prem-pk-dev/MEDIA-ASSETS/blob/main/thumbnails/travel-mountain-hiker.webp
- **Public CDN URL currently broken:** https://media-assets-4sb.pages.dev/thumbnails/travel-mountain-hiker.webp
- **Actual dimensions of existing original:** 640×360.
- **Target:** 900×680 (1.324:1).
- **Crop:** Trail must remain the visual lead and continue into the midground; enough foreground footpath and mountain context. No aggressive crop, no upscaling a thumbnail to target size.
- **Source decision:** **New native-resolution master required.** Existing thumbnail can be retained only as a small ancillary thumbnail if the CDN route is corrected; it is not a homepage replacement.
- **New generation needed:** Yes.
- **CDN status:** Not fixed. The earlier candidate visual review measured the URL as HTTP 200 but `text/html; charset=utf-8` (2,090-byte HTML fallback), not image/webp. A later direct fetch from the current tool environment returned 403. The GitHub original remains present, but the exact Pages route has not been proven to serve WebP bytes.

## 3. Existing source inventory findings

The current `MEDIA-ASSETS/ASSET-INDEX.json` identifies these extra relevant candidate masters:

| Source file | Index metadata | Suitability for replacement plan | Action |
|---|---|---|---|
| `amalfi-coast-village-v01.webp` | Approved; Mediterranean coastal cliff village; 446,770 bytes | Possible hero location/colour palette; may be architecture-led rather than the requested natural coastline | Inspect actual file and headline-safe crop |
| `serengeti-elephant-safari-sunrise-v01.webp` | Approved; acacia, herd, savannah; 324,842 bytes; sunrise | Subject close, time of day not exact; target is warm evening and portrait | Inspect actual file; likely alternate if sunset/evening required |
| `alpine-glacial-lake-v01.webp` | Approved; glacial lake, snowy peaks, reflection; 416,978 bytes | Strong possible Americas subject, but dimensions/clean crop unknown | Inspect original before deciding |
| `kyoto-bamboo-garden-v01.webp` | Approved; Japan/bamboo garden | Not relevant to any of these six replacements | Do not use |
| `santorini-caldera-sunset-v01.webp` | Approved; sunset village/sea | Architecture-led sunset; not clear-morning natural cliff coastline; not a suitable hero substitute without explicit art-direction change | Do not use by default |

The original inventory's named nature/travel candidates already inspected in the earlier review remain disqualified for their respective targets. No image should be treated as reusable solely because `ASSET-INDEX.json` says `approved`; that field is an asset-library status, not a TravelGuide homepage slot approval.

## 4. CDN delivery investigation — Mountain Hiker

### Known source facts

- Private GitHub file exists: `thumbnails/travel-mountain-hiker.webp` on `MEDIA-ASSETS/main`.
- Original GitHub binary was byte-inspected in the previous verification phase: WebP signature (RIFF/WEBP), 640×360, 28,034 bytes.
- `MEDIA-ASSETS/DEPLOYMENT-GUIDE.md` describes a static Pages build that copies public asset folders to `dist/`; a repository file at `images/.../file.webp` should be served at the same path beneath the Pages hostname.
- The `_headers` file sets cache-control for `/thumbnails/*`; there is no rewrite rule declared there that would make an absent file appear.
- Prior live image fetch observed this exact public path return HTTP 200 with `text/html; charset=utf-8` and an HTML page titled “Media Assets Library”, not WebP. This is consistent with the site's HTML fallback catching an asset miss, but the exact Pages deployment output was not accessible to inspect.
- A later request from the Cloudflare connector execution environment returned 403/text/plain (65 bytes). That environment response cannot establish the response seen by a regular public browser.

### Current decision

**CDN not fixed / not verified.** The original source exists, but a current public HTTP 200 + `Content-Type: image/webp` + RIFF/WEBP byte signature has not been re-confirmed.

### Required CDN repair/verification sequence (not performed)

1. Inspect the latest successful MEDIA-ASSETS Cloudflare Pages deployment and configured output directory.
2. Confirm that `thumbnails/travel-mountain-hiker.webp` is present in the built `dist/thumbnails/` folder. Confirm the build step does not omit or rename it.
3. If file absent in `dist`, correct the build copy/configuration, then redeploy the MEDIA-ASSETS Pages project using its normal linked-Git workflow.
4. If file exists in `dist` but public URL still returns HTML, inspect Pages routing/fallback rules so static asset paths resolve before the SPA/landing HTML fallback.
5. Test in a browser/incognito context and from a command-line HTTP client:
   - exact URL,
   - status 200,
   - `Content-Type: image/webp`,
   - response body starts with RIFF and WEBP bytes,
   - decoded image dimensions 640×360.
6. Only mark fixed after all five checks succeed. Record date, headers, byte length and final URL. Do not substitute a GitHub HTML page as a public media CDN URL.

## 5. Sourcing and acceptance gate

Before any of the six images are placed in TravelGuide:

- Inspect the actual private GitHub original bytes for every proposed existing source.
- Confirm exact pixel dimensions and native aspect ratio.
- Confirm no caption overlays, borders, watermarks, branding or text embedded in pixels.
- Visually compare the subject with the target requirement; the inventory filename/index summary alone is insufficient.
- Simulate desktop and mobile crops with the actual target aspect ratios. No upscaling small assets.
- Confirm the six sources are distinct (SHA-256 + perceptual duplicate comparison) and do not repeat other homepage images.
- Confirm source provenance, rights/usage permission and creator/provider details.
- Convert or export approved masters to exact target WebP dimensions at quality 85, then verify decoded WebP and final byte size.

## 6. Decisions and next action

- **Immediate reuse:** None.
- **Re-inspect before new generation:** Amalfi coast, alternate Serengeti, alpine glacial lake (3 files).
- **New masters required based on current evidence:** Asia, Oceania, Alpine hiking (3 files). Hero and Africa have new-master fallbacks if existing candidates fail.
- **Do not use:** rejected Ha Long Bay, old Serengeti, Banff, Bora Bora, old Ocean Cliffs as hero, and 640×360 Mountain Hiker thumbnail as the required 900×680 hiking image.
- **CDN repair:** Separate investigation/deployment task against MEDIA-ASSETS Pages; this plan has not changed MEDIA-ASSETS or Cloudflare configuration.

**Task boundary:** This is a sourcing plan only. No image generation, conversion, media repo changes, homepage HTML/CSS/JS/JSON changes, image reference changes, merge, deployment or build verification were performed. Only this document is to be committed to `development/homepage`.
