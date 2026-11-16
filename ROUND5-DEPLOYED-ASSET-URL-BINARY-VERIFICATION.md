# Phase 2.8 — Round 5 Hosted Homepage Asset URL and Binary Verification

**Date:** 16 November 2026  
**Repository:** prem-pk-dev/TravelGuide  
**Branch:** development/homepage  
**Verified branch HEAD before this report:** 4b2efa61428a4d1e401830a5fc87671cad8917ec  
**Scope:** read-only retrieval and verification of the current hosted homepage image files; this report is the only repository change in this update.

## Executive result

The user clarified that the image source URLs follow the deployed asset pattern:

https://travelguide-9op.pages.dev/assets/images/seasonal-coast.webp

All 21 current image files in src/assets/images/ were retrieved directly from the TravelGuide GitHub branch using the GitHub file-content API in base64 mode. Each decoded byte stream was checked for RIFF/WEBP signature, WebP canvas dimensions, exact byte count and SHA-256. Actual visual previews were rendered and inspected.

| Check | Result |
|---|---:|
| Current image paths in src/assets/images | 21/21 retrieved |
| Binary signatures (RIFF/WEBP) | 21/21 verified |
| Decoded dimensions | 21/21 verified |
| Exact byte sizes | 21/21 verified |
| SHA-256 computed over decoded bytes | 21/21 verified |
| Visual previews | 21/21 inspected |
| Round 2 licensed-photo derivative SHA-256 matches | 12/12 exact |
| Unique binary identities across 21 paths | 19 |
| Homepage placements mapped | 22 |
| Files converted or modified | 0 |
| Homepage code/data references changed | 0 |

The 21 pathnames represent 19 unique image binaries because hero-coast.webp and seasonal-coast.webp are exact copies, while asia.webp and kyoto-street.webp are exact copies. The Matterhorn hikers image is one path, alpine-hiking.webp, reused in two related homepage placements. The 22nd placement is the homepage hero asset outside the homepage JSON content groups.

## 1. Verified hosted image files

The direct URL below follows the deployed asset pattern supplied by the user. File bytes and metadata were retrieved from the GitHub branch. A live HTTP 200 / image/webp / response-body check for each Cloudflare URL was not completed in this run; web retrieval of the example endpoint returned a cache miss. Do not treat the URL list as CDN-response certification.

| File | Hosted URL | Visual subject / provenance | Pixels | Bytes | SHA-256 |
|---|---|---|---:|---:|---|
| africa.webp | https://travelguide-9op.pages.dev/assets/images/africa.webp | AI artwork — Serengeti elephant herd and acacia savannah | 1672×941 | 324842 | 57f2d540b543ff0bde06efc3689d194fcf8a0f631063e522220994569e14ec63 |
| alpine-hiking.webp | https://travelguide-9op.pages.dev/assets/images/alpine-hiking.webp | Licensed Pexels photograph — hikers on Matterhorn trail | 900×680 | 136900 | 0fff6a60c8138f6842f7cdc23b86e1e581e6dc592e07b0e24e0d83158855c51b |
| americas.webp | https://travelguide-9op.pages.dev/assets/images/americas.webp | AI artwork — Machu Picchu / Andean terraces | 900×512 | 65752 | ab8c21c1a120f555399a38b2934a5c1847a32b164fdb35b97bfef7c75ff23d02 |
| asia.webp | https://travelguide-9op.pages.dev/assets/images/asia.webp | AI artwork — Kyoto bamboo garden path | 1672×941 | 482514 | 4d7351d06cc2a9baf262ab9c133bfb2484e4c8e217b49f8cd0a1994ab2fe2543 |
| calendar-planning.webp | https://travelguide-9op.pages.dev/assets/images/calendar-planning.webp | Licensed Pexels photograph — traveller planning over world map | 800×620 | 119502 | 39f6fbd17c1d151eb5e82e0fc6121fed410afba3bb5cbaaaf45234e0f0ed4513 |
| ceramic-workshop.webp | https://travelguide-9op.pages.dev/assets/images/ceramic-workshop.webp | Licensed Pexels photograph — hands shaping a clay vessel | 900×680 | 44818 | 97e56bd232b7afd741b1c744e813ad9ad8bc2af7f4ca1482b4b09c1af98f90d1 |
| europe.webp | https://travelguide-9op.pages.dev/assets/images/europe.webp | AI artwork — Santorini caldera village at sunset | 1672×941 | 306350 | 6de21dfd129806b053042afef7ffa32b3ec46d4a2d5071e8a71ef2ec45688081 |
| hero-coast.webp | https://travelguide-9op.pages.dev/assets/images/hero-coast.webp | AI artwork — Amalfi Coast cliffside village | 1672×941 | 446770 | 853ca39b74ebe5ade547c90664ed490e61e8b62caf23a9347e09b8837b8cf630 |
| japan-rail.webp | https://travelguide-9op.pages.dev/assets/images/japan-rail.webp | Licensed Pexels photograph — Japanese regional train at station | 1000×740 | 151250 | 7d6adf06b1ecefc49399e696e0318a1e4b09d21e82a106af05b40e2aca89638e |
| kyoto-street.webp | https://travelguide-9op.pages.dev/assets/images/kyoto-street.webp | AI artwork — exact binary duplicate of asia.webp | 1672×941 | 482514 | 4d7351d06cc2a9baf262ab9c133bfb2484e4c8e217b49f8cd0a1994ab2fe2543 |
| lisbon-tram.webp | https://travelguide-9op.pages.dev/assets/images/lisbon-tram.webp | AI artwork — yellow Lisbon tram and tiled street | 900×510 | 70556 | 2bca722acb36cf0dd38cdd02558cc27a539ce4d32b84cee68f0ca7a2eac067d5 |
| market-morning.webp | https://travelguide-9op.pages.dev/assets/images/market-morning.webp | Licensed Pexels photograph — vendors and fresh produce | 920×680 | 176696 | aacac6873849f7dca13463719f036ca89cdd205205af24dd5f9d491edee55437 |
| marrakech-courtyard.webp | https://travelguide-9op.pages.dev/assets/images/marrakech-courtyard.webp | Wikimedia photograph — Dar al Bacha courtyard | 960×1200 | 392010 | 0ffe7fcfa63951277c3e7e001e1f3d0bd1bcc8f7c0eecc04fe0c19cc028307f6 |
| marrakech-medina.webp | https://travelguide-9op.pages.dev/assets/images/marrakech-medina.webp | Wikimedia photograph — Marrakech medina lane | 860×720 | 125770 | 91356ceeeb01fed490697258f5e89654a0ee9d9b409fa24ff28cc7b13c7b7091 |
| neighbourhood-cafe.webp | https://travelguide-9op.pages.dev/assets/images/neighbourhood-cafe.webp | AI artwork — coffee cup still life | 519×442 | 22716 | c7fbc02d4560069150814ac6ebf40c7fa79bdb645140101a9fd2623e9d74c8d3 |
| oceania.webp | https://travelguide-9op.pages.dev/assets/images/oceania.webp | Licensed Pexels photograph — Bora Bora lagoon and volcanic ridge | 900×1120 | 229298 | ed8cfac3186cf1b96d7b2e702c2e80862fe9c84adb639d3a21a9ff1d4a3792b5 |
| portugal-coast.webp | https://travelguide-9op.pages.dev/assets/images/portugal-coast.webp | Wikimedia photograph — Azenhas do Mar | 1000×740 | 208908 | ec8f020564c84ae167024351c5aa9271acce81471d8e4a4d73e3cc508271a222 |
| seasonal-coast.webp | https://travelguide-9op.pages.dev/assets/images/seasonal-coast.webp | AI artwork — exact binary duplicate of hero-coast.webp | 1672×941 | 446770 | 853ca39b74ebe5ade547c90664ed490e61e8b62caf23a9347e09b8837b8cf630 |
| slow-train.webp | https://travelguide-9op.pages.dev/assets/images/slow-train.webp | Wikimedia photograph — passenger train near Gurtnellen | 900×680 | 227822 | 4bc6280b06cbc6d840bb171370f631f200921ceb0521f85201d50ebc1a16cc41 |
| train-platform.webp | https://travelguide-9op.pages.dev/assets/images/train-platform.webp | Licensed Pexels photograph — LNER Azuma train at platform | 800×620 | 139634 | 654e009fcac0d853558412ff2b201e9ca1f74046743a3d03621e12e7dd3d64f3 |
| travel-bag.webp | https://travelguide-9op.pages.dev/assets/images/travel-bag.webp | Licensed Pexels photograph — open suitcase and packing items | 800×620 | 164300 | 76911a0f674600610314a19f970de32cbafdcdb0c4f228649c38deb94ce70a50 |

All 21 file bodies begin with RIFF and contain the WEBP marker. Actual byte lengths match the GitHub tree sizes. The 12 documentary-photo derivative SHA-256 values above match the corresponding WebP hashes already recorded in HOMEPAGE-ASSET-MAPPING.md exactly.

## 2. Documentary-photo source and license register

These 12 files have camera-photo source records in HOMEPAGE-PHOTO-CREDITS.md and HOMEPAGE-ASSET-MAPPING.md:

| WebP file | Creator | Source-page license | Original source page |
|---|---|---|---|
| oceania.webp | François Balédent | Pexels License | https://www.pexels.com/photo/scenic-aerial-view-of-bora-bora-lagoon-30422271/ |
| alpine-hiking.webp | Jean-Paul Wettstein | Pexels License | https://www.pexels.com/photo/hikers-on-a-mountain-trail-in-swiss-alps-19244950/ |
| marrakech-courtyard.webp | R Prazeres | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Dar_al_Bacha_Marrakesh_DSCF8822.jpg |
| slow-train.webp | Kabelleger / David Gubler | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:SBB_RBe_540_Gurtnellen.jpg |
| ceramic-workshop.webp | Letícia Alvares | Pexels License | https://www.pexels.com/photo/hands-shaping-clay-on-pottery-wheel-in-studio-36717713/ |
| portugal-coast.webp | Jose Maria Lanca | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Azenhas_do_Mar_(Sintra).jpg |
| japan-rail.webp | 貴彦 佐藤 | Pexels License | https://www.pexels.com/photo/japanese-train-arriving-at-rural-station-platform-35497307/ |
| marrakech-medina.webp | Iainmccurdy | CC0 1.0 | https://commons.wikimedia.org/wiki/File:Marrakech_Medina.jpg |
| market-morning.webp | Mehmet Turgut Kirkgoz | Pexels License | https://www.pexels.com/photo/people-selling-fresh-fruit-and-vegetables-on-a-market-stall-11522046/ |
| calendar-planning.webp | Lara Jameson | Pexels License | https://www.pexels.com/photo/person-writing-on-a-notebook-place-on-a-world-map-8828672/ |
| train-platform.webp | Dan Wright | Pexels License | https://www.pexels.com/photo/modern-train-at-platform-in-urban-station-40247858/ |
| travel-bag.webp | SHVETS production | Pexels License | https://www.pexels.com/photo/clothes-and-sunglasses-in-an-open-suitcase-on-a-rug-8933565/ |

The 12 JPEG masters' source-page dimensions, original byte sizes and source SHA-256 values remain historical provenance records from Round 2. The current GitHub image directory contains the WebP derivatives, not the original JPEG master files. Original downloaded JPEG filenames were not retained in the source-credit table. Derivative binary integrity is now independently confirmed by the exact SHA-256 match.

Platform/source license identification is recorded for all 12. This does not replace image-specific privacy, model/property release or trademark review where applicable. The LNER/Azuma branding is visible in the train-platform image; separate trademark/brand clearance should be reviewed before commercial promotional use.

## 3. AI artwork provenance

The remaining nine file paths resolve to seven unique AI-generated artworks. Their matching source records in MEDIA-ASSETS metadata identify OpenAI ChatGPT image generation and describe them as AI-generated output subject to OpenAI Terms of Use and applicable law; they are not documentary photographs.

| Homepage paths | Underlying artwork |
|---|---|
| africa.webp | Serengeti elephant-safari artwork |
| americas.webp | Machu Picchu-inspired artwork |
| asia.webp and kyoto-street.webp | One Kyoto bamboo-garden artwork |
| europe.webp | Santorini caldera-sunset artwork |
| hero-coast.webp and seasonal-coast.webp | One Amalfi Coast-inspired artwork |
| lisbon-tram.webp | Lisbon tram-inspired artwork |
| neighbourhood-cafe.webp | Coffee-lifestyle artwork |

Visual review notes:
- asia.webp / kyoto-street.webp: the image is a Kyoto bamboo garden path, not Southeast Asian karsts or a conventional machiya street.
- americas.webp: Machu Picchu imagery is visible, with a baked-in caption/footer strip near the lower edge.
- hero-coast.webp / seasonal-coast.webp: Amalfi cliffside village, not the requested natural-cliff-only hero composition; both filenames reference one image. The frame is not season-specific.
- europe.webp: Santorini architecture and caldera at sunset.
- africa.webp: elephant herd, acacia trees and savannah at sunrise.
- lisbon-tram.webp: a yellow tram and tiled street; metadata classifies it as AI artwork, not a documentary city photograph.
- neighbourhood-cafe.webp: a coffee cup still life, not a street-side neighbourhood café scene.

AI provenance must remain explicitly labeled as AI artwork. Do not attribute these as Pexels or Wikimedia photography.

## 4. Duplicate and homepage-slot reconciliation

- 21 file pathnames exist in the image directory.
- Exact binary pair 1: hero-coast.webp = seasonal-coast.webp.
- Exact binary pair 2: asia.webp = kyoto-street.webp.
- alpine-hiking.webp is a single file intentionally reused by the Alpine Hiking and Swiss Trail placements.
- Result: 19 unique image binary identities across 21 pathnames and 22 homepage placements.
- No separate swiss-trail.webp file exists; homepage content reuses alpine-hiking.webp for that related hiking placement.

These duplicate/reuse findings are based on actual SHA-256 values and the current homepage JSON, not filename similarity alone.

## 5. Remaining Round 5 gates

This retrieval resolves the user's correction about the hosted website asset paths and confirms the current 21 WebP project files. It does not mean every replacement gate is complete:

1. The 12 external JPEG source masters are still not present as binary files in the TravelGuide or MEDIA-ASSETS image folders. Their source-page metadata and historic source hashes remain recorded, while the current 12 WebP derivatives are fully hash-verified.
2. The nine previously researched Pexels replacement candidates (Benitachell hero, Ha Long Bay, historic European riverside, African savannah sunset, Fitz Roy Glacier/Lake, Kyoto street, Lisbon tram, Sagres cliffs and street café) have not been acquired as binaries or approved. The nine current legacy placements above are AI artworks, not those nine external documentary candidates.
3. Candidate source release/privacy/property/trademark checks and desktop/mobile crop approvals remain pending.
4. The 21 Cloudflare public asset URLs have not each been independently certified for HTTP 200 + image/webp + body bytes; this report verifies the source bytes stored in the GitHub branch.

**Round 5 remains OPEN — hosted site binaries verified, replacement-candidate and original-master gates still pending. Do not start Round 6.**

## 6. Change and protection record

- This report is documentation-only on development/homepage.
- No image binary was added, removed, overwritten or converted.
- No homepage HTML, CSS, JavaScript, JSON or image reference was changed.
- No MEDIA-ASSETS repository file or branch was modified.
- No main or research branch was modified.
- No merge or production deployment was performed.
