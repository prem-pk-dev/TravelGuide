# Phase 2.8 — Round 5 Media History and Candidate Acquisition Audit

**Audit date:** 15 November 2026  
**Repository:** `prem-pk-dev/TravelGuide`  
**Working branch:** `development/homepage`  
**Baseline commit:** `e9fd8539a881ba6fdd3ab66d1695a7b1971d4a2c`  
**Scope:** Read-only investigation of `prem-pk-dev/MEDIA-ASSETS` and nine Pexels candidate originals. This document is the only intended project change.

## 1. MEDIA-ASSETS repository history audit

### Branch and commit coverage

- Repository visibility: private.
- Authenticated repository metadata: default branch `main`.
- Authenticated branch search returned **one branch: `main`**.
- Authenticated commit search returned **98 commits**. All 98 returned commits were individually fetched and their changed file paths/statuses reviewed.
- Current MEDIA-ASSETS head used for the audit: `4531d94979224daa5a3f0a6b25244e02655708e0`.
- No other branch was returned by the connected GitHub search.

### Findings

| Check | Result |
|---|---|
| JPEG/JPG/JFIF paths in 98 inspected commit changes | **0 found** |
| Deleted JPEG paths in inspected commit changes | **0 found** |
| Current `.gitattributes` | Not present (404) |
| Historical `.gitattributes` paths in inspected changes | **0 found** |
| Git LFS pointer signature in available textual commit patches | **0 found** |
| Git LFS configuration/pointers evidenced by inspected history | **None found** |
| MEDIA-ASSETS repository mutations | **None** |

The inspected upload commits added WebP images and SVG brand/icon assets. The current metadata registry identifies its image sources as generated assets; the latest README records 90 WebP files in `images/`. The wider current repository image inventory previously inspected contains WebP image files, not JPEG masters.

**LFS limitation:** The connected GitHub interface exposed branch/commit/file reads but did not expose a direct enumeration of the repository's LFS object store. Therefore this audit checked tracked attributes, all returned commit changes and available textual pointer evidence; it cannot certify the absence of orphaned or otherwise unreferenced LFS objects outside those accessible records.

### Recovery result — 12 Round 2 original JPEG masters

None of the source JPEG master files was recoverable from the accessible MEDIA-ASSETS Git history. The creator, subject, dimensions and source license below are preserved from the existing Round 2 provenance register; they are not evidence that the original bytes were recovered in this pass.

| # | Original source record | Prior source dimensions | License record | Binary disposition |
|---:|---|---:|---|---|
| 1 | François Balédent / Pexels — Bora Bora | 4032×2268 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 2 | Jean-Paul Wettstein / Pexels — Matterhorn hikers | 6064×4040 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 3 | R Prazeres / Wikimedia — Dar al Bacha | 4000×3000; 3,052,596 bytes on source record | CC BY-SA 4.0 | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 4 | Kabelleger / David Gubler / Wikimedia — Gurtnellen train | 5400×3600; about 7.8 MB on source record | CC BY-SA 4.0 | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 5 | Letícia Alvares / Pexels — pottery wheel | 5760×3840 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 6 | Jose Maria Lanca / Wikimedia — Azenhas do Mar | 4000×3000; 2.48 MB on source record | CC BY-SA 4.0 | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 7 | 貴彦 佐藤 / Pexels — Japanese train | 5760×3240 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 8 | Iainmccurdy / Wikimedia — Marrakech Medina | 5278×3518; 14.17 MB on source record | CC0 1.0 | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 9 | Mehmet Turgut Kirkgoz / Pexels — market stall | 4897×3264 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 10 | Lara Jameson / Pexels — planning map | 5040×3360 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 11 | Dan Wright / Pexels — LNER platform train | 5952×3968 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |
| 12 | SHVETS production / Pexels — suitcase | 6000×4000 | Pexels Free | **Unrecoverable from inspected MEDIA-ASSETS history; external recovery Pending** |

**Master recovery:** 0/12. No original source byte stream was acquired, so no original source MIME/signature, byte length or SHA-256 was recomputed. For the four Wikimedia entries, the dimensions/file sizes above are prior file-page metadata records; they are not newly verified local binaries.

## 2. Nine candidate photographs — original binary acquisition

The Pexels API documentation describes a `src.original` field containing the unresized original image. Its Photo API requires authorization. No Pexels API key is available in this connected execution context.

A direct request for the Hero candidate's standard Pexels CDN original URL was attempted from the working runtime and failed before HTTP transfer with:

```
curl: (6) Could not resolve host: images.pexels.com
```

No file was created from this attempt. The two source-image previews previously opened for Africa and Café remain previews only; they are not original binary acquisitions. The other seven are page-level candidate records only.

| # | Slot | Candidate / photographer | Page dimensions | Page-level composition | Binary / release / crop state |
|---:|---|---|---:|---|---|
| 1 | Hero | [Benitachell Mediterranean cliffs](https://www.pexels.com/photo/stunning-rocky-coastline-in-benitachell-spain-30558175/) — Rafael Minguet Delgado | 5702×3801 (3:2) | Mediterranean cliffs and turquoise water | **Pending** — original not acquired; desktop-wide/mobile-portrait crop and headline-safe area not approved |
| 2 | Asia | [Ha Long Bay limestone islands](https://www.pexels.com/photo/misty-islands-in-halong-bay-vietnam-35858996/) — Anh Nguyen | 2400×3000 (4:5) | Limestone karsts and calm bay | **Pending** — original not acquired; actual tile crop not approved |
| 3 | Europe | [Historic riverside buildings with reflection](https://www.pexels.com/photo/historic-european-riverside-buildings-with-reflection-35534814/) — Alexandra H. Maria | 3084×4112 (3:4) | Riverside architecture and reflection | **Pending** — original not acquired; actual framing/crop not approved |
| 4 | Africa | [African savannah sunset](https://www.pexels.com/photo/sunset-in-african-savannah-landscape-30878973/) — Wussol | Not exposed in the retrieved record | Previously viewed preview shows sunset, acacia silhouettes, grass and a dirt road; portrait crop loses lateral context | **Pending** — preview only; original, dimensions, crop and release review pending |
| 5 | Americas | [Fitz Roy Glacier and Lake](https://www.pexels.com/photo/fitz-roy-glacier-and-lake-17600486/) — Nazarena Pozza | 3472×4640 (217:290) | Patagonian mountain peak and glacial lake | **Pending** — original not acquired; peak/lake crop not approved |
| 6 | Kyoto | [Traditional Japanese street in Kyoto](https://www.pexels.com/photo/traditional-japanese-street-in-kyoto-36889407/) — Ignacio Estevo | 2054×2899 (158:223) | Traditional wooden street and houses | **Pending** — requested machiya/noren/distant-roof details not fully established; original/crop pending |
| 7 | Lisbon | [Historic Lisbon street with tram](https://www.pexels.com/photo/charming-lisbon-street-with-historic-tram-40600060/) — Oleksandra Zelena | 3072×4080 (64:85) | Lisbon street and yellow tram | **Pending** — original not acquired; crop must retain the tram; signage/person review pending |
| 8 | Seasonal coast | [Sagres Atlantic cliffs](https://www.pexels.com/photo/dramatic-cliffs-over-the-atlantic-in-sagres-portugal-36733193/) — Nils Rotura | 5029×2829 (approx. 16:9) | Atlantic cliffs and rugged coastline | **Pending** — page does not prove shoulder-season context; original/card crop pending |
| 9 | Neighbourhood café | [Street-side café tables](https://www.pexels.com/photo/cafe-tables-on-the-street-4210026/) — Anastasia Shuraeva | 5472×3648 (3:2) | Previously viewed preview shows café tables and cobbled street; identifiable people/signage are visible | **Pending** — preview only; original, releases/signage and crop pending |

**Candidate original acquisition:** 0/9. No source file has been locally acquired. Consequently, actual file format/signature, native decoded dimensions, byte size and SHA-256 are **not verified for any candidate**. None of the nine candidates is approved or integrated. None is categorized Unrecoverable because its source page remains a candidate lead and the obstacle is binary retrieval from this runtime.

## 3. Licensing and provenance

- The nine candidates are recorded on Pexels pages as free/Pexels License. The Pexels license permits commercial and non-commercial use and modification without mandatory attribution, subject to restrictions including standalone redistribution, implied endorsement and trademark/brand use.
- Pexels' Terms caution that identifiable people, property, logos, trademarks and other third-party rights may require separate permissions. Pexels does not warrant that every required release or consent exists.
- Candidate-specific model/property releases, identifiable-person permissions and logo/signage/trademark clearance remain **Pending**. Platform license terms alone do not constitute full per-image clearance.
- Existing Wikimedia master records: Dar al Bacha, Gurtnellen train and Azenhas do Mar are recorded as CC BY-SA 4.0 (attribution, license link, change notice and share-alike obligations for adaptations); Marrakech Medina is recorded as CC0 1.0. Separate third-party rights can still apply.

## 4. Three-category disposition

### Verified

- **12/12 existing Round 2 WebP derivatives:** remain previously verified for actual RIFF/WEBP signature, file byte length, decoded dimensions and SHA-256. This verification applies to the committed WebP derivatives, not their missing JPEG source masters.
- **98/98 MEDIA-ASSETS commit change lists:** inspected through authenticated GitHub reads.
- **1/1 MEDIA-ASSETS branch:** `main` was returned by authenticated branch search.
- **9/9 candidate source pages:** contributor and page-level subject/dimension records are present in the project register; this is page metadata verification, not file verification.

### Pending

- **12 JPEG source masters:** no original bytes acquired; source hashes not recomputed.
- **9 candidate original photos:** 0/9 acquired; 0/9 byte signatures, actual MIME, byte sizes or SHA-256 values verified.
- Candidate-specific third-party releases/trademark clearance: pending.
- Candidate desktop/mobile crop approvals: 0/9.
- CDN certification for the existing 12 image paths: 0/12 live HTTP 200 + image MIME + response-body checks certified.
- Legacy artwork replacement approvals: 0/9; all nine legacy placements remain unchanged.

### Unrecoverable

- **12 JPEG masters from the accessible MEDIA-ASSETS Git history:** no tracked JPEG path, deleted JPEG path or Git LFS pointer was found in the 98 inspected commit changes. This classification is limited to this repository history; it does **not** establish that a source copy is lost globally.
- The nine Pexels candidates are **not** classified Unrecoverable. Their source pages remain identified, but original binary acquisition is blocked by the current execution network/API-access limitations.

## 5. Repository protection and change log

This audit made no changes to MEDIA-ASSETS. It did not alter any image binary, asset source reference, manifest, HTML, CSS, JavaScript, branding, Cloudflare setting or deployment.

Protected refs recorded before this audit:
- TravelGuide `main`: `bab89d7eb14a356dbc194557492fc8de6e980c67`
- `research/travel-guide-blueprint`: `4e047f49cfac870d17a0347d60c2d1025f62dfd8`
- `development/responsive-fixes`: `9e4997bfb018a34da3892f63a2939e63633462d2`
- MEDIA-ASSETS `main`: `4531d94979224daa5a3f0a6b25244e02655708e0` (read-only; unchanged by this audit)

Only this report is to be committed on TravelGuide `development/homepage`. No merge and no production deployment are authorized. Round 6 must not start without explicit approval.

## 6. Round 5 status

**Round 5 remains OPEN — PARTIALLY VERIFIED, NOT COMPLETE.**

The repository-history search is complete for all 98 commits and the one accessible branch returned by GitHub. Full enumeration of unreferenced LFS storage objects is unavailable through the connected GitHub interface. Candidate original binary acquisition is still blocked, and all approval/CDN/replacement gates remain open.
