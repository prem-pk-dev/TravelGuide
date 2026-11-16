# Phase 2.8 — Round 5 MEDIA-ASSETS GitHub Binary and Slot-Matching Audit

**Date:** 16 November 2026  
**TravelGuide branch:** `development/homepage`  
**TravelGuide baseline:** `f46901075fab9294f4933f3870d1e65eeabddde1`  
**MEDIA-ASSETS repository/branch:** `prem-pk-dev/MEDIA-ASSETS` / `main`  
**MEDIA-ASSETS head:** `4531d94979224daa5a3f0a6b25244e02655708e0`  
**Scope:** Read-only catalog and binary inspection; documentation-only TravelGuide change.

## 1. Catalog and file inventory

| Source | GitHub object | Result |
|---|---|---|
| MEDIA-ASSETS `ASSET-INDEX.json` | Blob `17ade1c8ec1dd5d24ccfce1bdbdaa968cd0c2338` | 5 indexed/approved WebP records |
| MEDIA-ASSETS `metadata/assets.json` | Blob `31f36ce8043272e2592a1fe765c779b59a8cbae0` | 91 records |
| MEDIA-ASSETS `main` recursive tree | Commit `4531d94979224daa5a3f0a6b25244e02655708e0` | 90 image files under `images/`, all WebP; no JPEG/JPG |
| Extra Everyday entry | `everyday/sunrise-colours.webp` | One WebP outside `images/` |

All 91 metadata records declare source **OpenAI ChatGPT image generation**. Their license field says “AI-generated output; subject to OpenAI Terms of Use and applicable law.” The metadata's `rightsVerified: true` is a catalogue assertion for those generated outputs; it is not a documentary-photo licence, photographer release, stock-photo licence or proof that a scene depicts the named place accurately.

The 5 approved index entries are:
- `images/travel/destinations/alpine-glacial-lake-v01.webp`
- `images/travel/destinations/amalfi-coast-village-v01.webp`
- `images/travel/destinations/kyoto-bamboo-garden-v01.webp`
- `images/travel/destinations/santorini-caldera-sunset-v01.webp`
- `images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp`

**Key distinction:** the MEDIA-ASSETS WebP catalogue is a generated-artwork library. It does not contain the 12 original Pexels/Wikimedia JPEG masters or the nine researched external documentary-photo candidates.

## 2. Actual GitHub binary retrieval and independent verification

The following 14 selected files were retrieved from the private GitHub repository through the GitHub file-content connector in base64 mode. Hashes were calculated over decoded bytes, not filenames or catalogue metadata. Each file passed RIFF/WEBP signature validation and its VP8 canvas width/height were decoded from its binary header. Every file was visually rendered from the retrieved bytes.

| # | Exact repository path | Git blob SHA-1 | Actual pixels | Bytes | SHA-256 | Visual / editorial finding |
|---:|---|---|---:|---:|---|---|
| 1 | `images/travel/destinations/19-bora-bora-french-polynesia-v01.webp` | `dc004d7725ac3f19c6f0e6d869aee70d2ed4452d` | 900×512 | 47,138 | `b796ee2c57d7bcad7b3ab184c3e749ebb6e1ce73309834310ee7d389e52ae472` | AI Bora Bora-inspired lagoon and overwater bungalows. White vertical border and black baked-in caption strip; small derivative. Not the François Balédent Pexels photo. |
| 2 | `images/travel/destinations/15-zermatt-switzerland-v01.webp` | `7a315b4a9c05b34459f1ff886a705fb9fa0656e1` | 900×509 | 49,252 | `1d148befe46408f37a7e5458721fb5e9c6c8eaf18053f9c006c93f51a542fe04` | AI Matterhorn/alpine-lake artwork. White edge and black caption strip; no hikers or trail. Not the Jean-Paul Wettstein Pexels photo. |
| 3 | `images/travel/destinations/20-ha-long-bay-vietnam-v01.webp` | `58b8a51b435c42ef529ecc4ff84bf3bf1764b803` | 900×512 | 57,722 | `0805cf0846cc3752380a765782cf258946d7690d7702f770e9aa2a6b8cf90daf` | AI Ha Long Bay-inspired karsts and red-sailed boat. White edge and caption band. Not Anh Nguyen's documentary photograph. |
| 4 | `images/travel/destinations/23-lisbon-portugal-v01.webp` | `e410021cbbff69204b10acde2d53d7aae546365d` | 900×510 | 70,556 | `61a3e5df730bfe4347f846a0c41d25953b62e1dd7fecbf9b7e4a7ea4b8e3aadd` | AI Lisbon yellow-tram street scene. White edge and bottom caption band. Not Oleksandra Zelena's Pexels original. |
| 5 | `images/travel/destinations/03-kyoto-japan-v01.webp` | `694b2a5e27f36ac8458da39548eee54831d285a1` | 900×510 | 73,354 | `9a8bfb801a17f2fa0c9e82d7862224dec903c0397833ba98614c1a99a989a77f` | AI Japan-inspired pagoda/cherry blossom scene with Mount Fuji in background; white edge and caption band. Not a Kyoto street documentary photo. |
| 6 | `images/travel/destinations/serengeti-elephant-safari-sunrise-v01.webp` | `5d0687aa9c402383cd261483f2dcae07ffd6f2f2` | 1672×941 | 324,842 | `f6cd6c9fb655d78c94ecf0d8e5e0689a897e81be273d7ea8a30a631a142c4387` | Wide AI savannah scene with elephant herd and acacias. Suitable only as clearly labelled AI destination artwork, not documentary wildlife evidence. |
| 7 | `images/travel/destinations/alpine-glacial-lake-v01.webp` | `f204e09d5fca52064ddbef0cdbe4c8e4e40fdb5e` | 1672×941 | 416,978 | `fb7e25e883e41cd55aa834a0b9dd69846341d8946916738cfa4402ff5ba4ff11` | Wide AI glacial lake and snowy mountain range. No hikers/trail; not a documentary Matterhorn image. |
| 8 | `images/nature/01_alpine_lake_sunrise.webp` | `8879b6db0794359d568ab4a793e06b5f5226c435` | 1672×941 | 308,276 | `0f64e272ca784e508250a67f84d85718b529085a12187ea30eaacfd349eccfd3` | Wide AI alpine lake at sunrise, mountains and mist; separate composition from alpine-glacial-lake-v01. |
| 9 | `images/nature/05_rugged_ocean_cliffs.webp` | `81958d9048ece4dfa9a917391000877236f378ec` | 1672×941 | 376,526 | `1f924322ec12156ad38d6881bfe9ebbdfbc0b18b52234f5aad6465b24efcf8a6` | Wide AI rugged Atlantic-style cliffs and surf. Generic coast only; not verified Benitachell or Sagres photography. |
| 10 | `images/general/general-coffee-lifestyle.webp` | `b628612c052594a2f22192dd78643b00e3118c01` | 519×442 | 22,716 | `ab51ddae322c403fd6136c0135b31d6a41fbd650b309ff28235ec3f72504332a` | AI close-up latte still life, not a neighbourhood street café; low resolution for a large homepage card. |
| 11 | `images/travel/destinations/04-amalfi-coast-italy-v01.webp` | `761de20ed12adda61b20bfca9ac9d6cdd188e8f0` | 900×512 | 74,892 | `6b07271e92890b1bba22305b2f43b3a67da0c51a42d9a70bf31f59a890e685be` | AI Amalfi-inspired coastal village, white edge and caption band. Italy, not Portugal/Azenhas do Mar; not documentary. |
| 12 | `images/travel/destinations/06-machu-picchu-peru-v01.webp` | `3d590df3d8016ba16049ac463b86576c9829167b` | 900×512 | 65,752 | `77dab47dcde63445915d07fda644f4c9bff8a8c29f615a05fe70c7b734fdb05d` | AI Machu Picchu-inspired scene; white edge/caption band; low-resolution derivative, not documentary. |
| 13 | `images/travel/destinations/kyoto-bamboo-garden-v01.webp` | `1abb4f37856b672265ea6eb118935ac782e6ec66` | 1672×941 | 482,514 | `1d957c44e42a73cdc68b01f03b4f754453b07267b9ea913513ed596070dbdc1b` | Wide AI bamboo garden path and wooden gate; strongest generated concept match for a Kyoto garden card, but not documentary photography. |
| 14 | `images/travel/destinations/santorini-caldera-sunset-v01.webp` | `54b5597cbe266383b3f1644322291f095d7c9919` | 1672×941 | 306,350 | `621f3e5164ccce8ad514f7d784bbf2829ff262d64165c111df14a0c3f44529e8` | Wide AI Santorini caldera/village sunset scene. Strong Europe/Santorini concept match, not a documentary photograph. |

**Binary result:** 14/14 actual GitHub bytes retrieved; 14/14 valid WebP signatures; 14/14 dimensions decoded; 14/14 byte sizes measured; 14/14 SHA-256 computed; 14/14 visuals inspected. All 14 SHA-256 values are unique, so there are no exact binary duplicates within this 14-file selection. This is not a byte-level duplicate scan of all 90 MEDIA-ASSETS images.

## 3. Category and homepage-slot matching

### MEDIA-ASSETS subject matches — AI artwork only

| Homepage slot / source requirement | Closest MEDIA-ASSETS repository asset | Classification | Decision |
|---|---|---|---|
| Hero / Mediterranean coast | `nature/05_rugged_ocean_cliffs.webp`; Amalfi assets | AI generic coastline / AI Italy-inspired village | **Not approved** as Benitachell documentary replacement |
| Asia | `20-ha-long-bay-vietnam-v01.webp`; Kyoto bamboo asset | AI destination artwork | Subject inspiration only; not the original replacement photograph |
| Europe | `santorini-caldera-sunset-v01.webp`; Amalfi asset | AI destination artwork | Not a historic riverside photo |
| Africa | `serengeti-elephant-safari-sunrise-v01.webp` | AI savannah/wildlife artwork | Concept match only, not Wussol's original photograph |
| Americas | `06-machu-picchu-peru-v01.webp` | AI Peru-inspired artwork | Not the candidate Fitz Roy Glacier/Lake photo |
| Oceania / Bora Bora | `19-bora-bora-french-polynesia-v01.webp` | AI Bora Bora-inspired artwork | Not François Balédent's Pexels photo |
| Kyoto feature | `kyoto-bamboo-garden-v01.webp`; `03-kyoto-japan-v01.webp` | AI Japan-inspired artwork | Garden concept match only; not a documentary Kyoto street photo |
| Lisbon | `23-lisbon-portugal-v01.webp` | AI Lisbon/tram artwork | Subject concept match only; not Oleksandra Zelena's Pexels photo |
| Seasonal coast / Sagres | `nature/05_rugged_ocean_cliffs.webp` | AI generic Atlantic-style coast | Does not prove Sagres or season; not approved |
| Neighbourhood café | `general/general-coffee-lifestyle.webp` | AI coffee still life | Not a street café; low resolution |
| Alpine hiking / Swiss trail | `15-zermatt-switzerland-v01.webp`, `alpine-glacial-lake-v01.webp`, `01_alpine_lake_sunrise.webp` | AI mountain/lake artwork | No hikers or trail; not approved for the Matterhorn hikers requirement |
| Marrakech courtyard / medina | No exact subject match in the 91 metadata entries | Missing | **No match** |
| Pottery workshop | No exact subject match | Missing | **No match** |
| Gurtnellen slow train / Japanese rail / train platform | No train/rail photographic asset in this selected inventory | Missing | **No match** |
| Market morning | No produce-market asset | Missing | **No match** |
| Calendar planning | No planning/map still-life asset | Missing | **No match** |
| Travel bag | No luggage/suitcase asset | Missing | **No match** |
| Azenhas do Mar / Portugal documentary coast | Generic cliffs and Amalfi (Italy) only | Non-exact AI subjects | **No match** |

### Nine candidate source requirements

The nine Pexels requirements from Round 5 remain distinct from the AI-generated repository assets:

1. Benitachell / Rafael Minguet Delgado — no source JPEG; rugged-ocean AI art is generic, not the source image.
2. Ha Long Bay / Anh Nguyen — AI Ha Long Bay artwork exists, but it is not the original photograph.
3. Historic European riverside / Alexandra H. Maria — no subject-specific repository match.
4. Savannah sunset / Wussol — Serengeti AI artwork is thematically related but is not the candidate photo.
5. Fitz Roy Glacier and Lake / Nazarena Pozza — no Fitz Roy source photo or exact generated match verified.
6. Traditional Kyoto street / Ignacio Estevo — Kyoto-themed AI assets exist, but not the original street photograph.
7. Lisbon tram / Oleksandra Zelena — Lisbon tram-inspired AI artwork exists, but is not the source photo.
8. Sagres cliffs / Nils Rotura — generic AI ocean cliffs exist, but are not the source photograph.
9. Street-side café / Anastasia Shuraeva — coffee still-life AI art is not a street café image.

**Exact documentary-photo candidates found in MEDIA-ASSETS: 0/9.** The category catalogue must not be used to claim recovery of the Pexels originals.

## 4. License and provenance interpretation

- The 91 metadata entries record OpenAI ChatGPT image generation and the AI-generated-output license description. This is not a Pexels/Wikimedia source license and must not be attributed to an external photographer.
- The 14 selected binary files all map to that same AI provenance in the metadata. Their `rightsVerified: true` value is a repository catalogue field, not documentary-photo release evidence.
- The existing 12 TravelGuide Round 2 derivatives are different assets and have their separate Pexels/Wikimedia source credits in `HOMEPAGE-PHOTO-CREDITS.md`.
- Pexels/Wikimedia original source JPEGs are not present in the MEDIA-ASSETS current tree. Four Wikimedia page records and eight Pexels source pages remain source references from prior research, not files recovered from MEDIA-ASSETS.

## 5. Public URL / CDN check

The user-supplied URL pattern is:
`https://media-assets-4sb.pages.dev/<repository path>`

The connected Chrome tab successfully opened the MEDIA-ASSETS public root and `ASSET-INDEX.json`. However:
- Browser/web open attempts for individual image URLs returned cache-miss/inaccessible results.
- A direct fetch test from the available execution environment returned a generic HTTP 403 text/plain response for the selected image paths. This same execution route has previously returned generic 403 responses for unrelated hosts; it cannot be treated as an origin response.
- Therefore the GitHub source binaries are verified, but individual Cloudflare HTTP 200, `image/webp` response MIME and body bytes are not certified by this run. Do not mark the CDN response check complete or assert the public URLs are broken.

## 6. TravelGuide hosted homepage assets — separate asset set

The deployed homepage paths have the form:
`https://travelguide-9op.pages.dev/assets/images/<filename>.webp`

The TravelGuide branch already has a separate Round 5 report, `ROUND5-DEPLOYED-ASSET-URL-BINARY-VERIFICATION.md`, which records actual GitHub binary verification for all 21 current `src/assets/images/` paths:
- 21/21 WebP binaries retrieved and verified,
- 12/12 documentary-photo derivative SHA-256 values match Round 2,
- 9 AI artwork paths correspond to 7 unique AI images,
- 21 paths represent 19 unique binaries because two pairs are exact duplicates,
- one licensed Matterhorn-hikers photo is reused between Alpine Hiking and Swiss Trail.

That hosted TravelGuide asset set is not the same as the 90-image MEDIA-ASSETS WebP catalogue. Do not conflate their filenames or provenance.

## 7. Protected project state

- TravelGuide working branch before this report: `development/homepage` at `f46901075fab9294f4933f3870d1e65eeabddde1`.
- MEDIA-ASSETS `main`: `4531d94979224daa5a3f0a6b25244e02655708e0`; read-only, unchanged.
- TravelGuide `main`: `bab89d7eb14a356dbc194557492fc8de6e980c67`; untouched.
- TravelGuide `research/travel-guide-blueprint`: `4e047f49cfac870d17a0347d60c2d1025f62dfd8`; untouched.
- TravelGuide `development/responsive-fixes`: `9e4997bfb018a34da3892f63a2939e63633462d2`; untouched.
- No image, source reference, homepage HTML/CSS/JS/JSON, asset manifest, branding, Cloudflare configuration or deployment was changed.
- This report is documentation-only on `development/homepage`. No merge, production deployment or Round 6 work was performed.

**Round 5 remains OPEN — MEDIA-ASSETS WebP binaries inspected; original documentary sources, candidate approvals and CDN response certification remain separate pending gates.**
