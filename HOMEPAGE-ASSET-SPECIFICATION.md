# TravelGuide Homepage — Production Image Asset Specification

**Document status:** Approved production brief for asset creation (not proof that assets exist)  
**Project:** TravelGuide homepage  
**Repository:** https://github.com/prem-pk-dev/TravelGuide  
**Target branch:** `development/homepage`  
**Asset directory:** `src/assets/images/`  
**Homepage manifest authority:** `src/data/homepage.json` plus the homepage hero image reference in `scripts/build.mjs`  
**Output format:** Genuine WebP photographic files  
**Encoder quality target:** 85 (lossy WebP; verify actual output format)  
**Scope:** Specification only. This document does not generate, add, convert, rename or integrate image binaries, and does not change homepage code or image references.

---

## 1. Production standard

Create 22 independent, original, photorealistic travel/editorial photographs. Each filename represents a unique photographic capture/concept. Do not reuse the same output, near-identical composition, mirrored image, alternate crop, color-graded duplicate or one generic landscape for unrelated subjects.

The visuals must read as credible travel photography commissioned for an editorial travel publication:
- Realistic optics, natural light, plausible geography, architecture, materials, weather and human scale.
- Documentary/editorial framing; visual detail without exaggerated HDR, surreal skies, artificial saturation or synthetic-looking textures.
- No illustrations, paintings, 3D renders, vector art, collages, moodboards, mockups, typography, logos, watermarks, borders or UI.
- No visible fabricated brand signage or legible AI-generated lettering.
- Avoid recognizable private individuals. For people shown incidentally, use distant, unidentifiable figures unless a properly released model is intentionally commissioned.
- No unsafe, disrespectful or culturally stereotyped depictions. Depict real places and cultural settings with contextual accuracy.

### 1.1 Source and master policy

1. Generate or commission each scene independently from its individual prompt below.
2. Keep the highest-quality original generated/licensed master outside the deployed static output until export is approved.
3. Record the source, creator/provider, generation date or capture date, license/terms, commercial-use permission, modification permission and any required credit.
4. Make the WebP file from that master; never change an extension to pretend another format is WebP.
5. Do not upscale a small output and treat it as native detail. Request adequate generation resolution, then downscale to the exact target.
6. The target pixel size is the delivered baseline, not permission to distort the source. Crop proportionally and preserve the focal subject.

---

## 2. Global export, naming and performance targets

### 2.1 WebP export

- Format: WebP, lossy photographic encoding.
- Quality setting: **85** for every file.
- Encoder: use a maintained encoder (for example, libwebp/cwebp or an image-processing library that exposes the WebP quality value).
- Effort/method: use the highest practical encoder effort that does not create excessive processing time; do not alter visual quality target between assets without recording an exception.
- Color: sRGB, embedded/normalized as supported; remove unnecessary metadata from delivery files.
- Orientation: bake correct orientation into pixels before export.
- Transparency: not required; deliver opaque photographic images.
- Verify output by decoding/inspecting the actual file and checking RIFF/WEBP signature or trusted image metadata. MIME type and decoded format must both report WebP.
- Preserve a lossless/high-quality master separately; WebP is the web delivery derivative.

### 2.2 Filename and path policy

All files must live directly in `src/assets/images/` and use exactly these lowercase names:

```text
hero-coast.webp
asia.webp
europe.webp
africa.webp
americas.webp
oceania.webp
kyoto-street.webp
lisbon-tram.webp
marrakech-courtyard.webp
slow-train.webp
alpine-hiking.webp
ceramic-workshop.webp
portugal-coast.webp
japan-rail.webp
marrakech-medina.webp
swiss-trail.webp
seasonal-coast.webp
market-morning.webp
neighbourhood-cafe.webp
calendar-planning.webp
train-platform.webp
travel-bag.webp
```

Do not append `-final`, `-new`, `-2`, or alternate extensions. Responsive variants, if approved and implemented later, should use a predictable suffix such as `hero-coast-960.webp`; they are additional files and do not replace the 22 canonical originals.

### 2.3 File-size budgets

These are optimization targets, not claims about current files. At quality 85, content complexity can vary; if a target is exceeded, inspect visual quality and encoder settings rather than blindly reducing quality.

| Asset class | Count | Target per file | Hard review threshold |
|---|---:|---:|---:|
| Hero (1920 × 1200) | 1 | 220–350 KB | 450 KB |
| Portrait destination / continent (900–960 wide) | 8 | 110–190 KB | 250 KB |
| Editorial landscape (900–1000 wide) | 8 | 90–170 KB | 230 KB |
| Activity / utility landscape (800–920 wide) | 5 | 70–145 KB | 200 KB |

**Total 22-file planning budget:** approximately 2.5–3.8 MB. A total above 4.5 MB requires a review of the heaviest assets. These figures are acceptance budgets, not guaranteed encoder output.

### 2.4 Responsive variants

The existing homepage references one file per scene and does not currently emit `srcset`/ `sizes`. This specification defines a derivative policy for the later responsive-image implementation; do not modify homepage references as part of this specification-only task.

Recommended width candidates:
- Hero: 640, 960, 1440, 1920 px.
- Portrait tiles/cards: 480, 720, 960 px (or the nearest smaller/larger source-supported width).
- Content/editorial landscapes: 480, 720, 960, 1200 px.
- Utility thumbnails: 400, 600, 800 px.

Rules:
- Every candidate must be encoded from the same approved master, with a true proportional resize/crop and the same subject.
- Do not create a larger candidate than the native approved master.
- Use `sizes` matching real CSS card widths; verify actual rendered slot widths during the later responsive QA task.
- Use `<picture>`/AVIF only if real AVIF variants are also created and a WebP fallback remains.
- The hero’s largest appropriate candidate is the only image to receive high fetch priority. Do not preload every candidate or lazy-load the LCP hero.
- Below-the-fold images use native lazy loading and async decoding. Keep intrinsic width/height on every `img`.

---

## 3. Asset-by-asset production brief

The desktop/mobile crop notes below are art-direction requirements. The mobile crop may be an independently composed crop from the same master; it must not be a second unrelated scene.

### 01 — `hero-coast.webp`

- **Role:** Full-width homepage hero; primary LCP visual.
- **Exact target:** 1920 × 1200 px.
- **Ratio:** 1.600:1 (8:5).
- **File budget:** 220–350 KB; review above 450 KB.
- **Subject/composition:** Rugged Mediterranean coastline, translucent turquoise water, pale limestone cliffs, warm clear morning light. Build a layered foreground-to-distance composition: textured coast in lower-left/lower-middle, water and readable horizon through the upper half. Preserve negative space behind the hero headline on the left; do not place the most important cliff edge or a boat under the text.
- **Photorealistic generation prompt:**  
  `Create an original, high-end photorealistic editorial travel photograph of a rugged Mediterranean coastline in warm clear morning light. Show pale limestone cliffs meeting transparent turquoise water, delicate wave texture and a distant natural headland. Compose as a wide 8:5 landscape: foreground rock and shoreline lead from the lower-left toward open water and a calm horizon in the upper-right. Leave the left third relatively low-detail and tonally calm for white website headline overlay, while keeping the coastline clearly legible across the frame. Natural atmospheric perspective, realistic coastal geology, believable color, fine photographic detail, full-frame professional travel photography, 28–35 mm lens look, balanced highlights, no people close to camera. No text, no logo, no watermark, no graphic design, no illustration, no collage, no oversaturated teal, no fantasy sky.`
- **Desktop crop:** Render as cover in a wide hero. Preserve both cliff edge and open water. Keep headline-safe area in the left 35%.
- **Mobile crop:** Prepare a portrait-safe crop from the same master. Reframe around a visible cliff/water boundary and horizon; avoid losing all coastline when the left/right edges are removed. Test at 390 × 844 and 360 × 800. The current CSS uses a centered object crop with a slight right bias; keep the main coastline in the central 60%.
- **Alt text:** Sunlit rugged coastline and turquoise Mediterranean water.
- **Loading:** Eager; `fetchpriority="high"`; `decoding="async"`; never lazy-load.

### 02 — `asia.webp`

- **Role:** Asia continent discovery tile.
- **Exact target:** 900 × 1120 px.
- **Ratio:** 0.804:1 (portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Southeast Asian limestone karsts rising from a quiet emerald/turquoise bay; small traditional boat may provide scale but must not dominate. Strong, distinct vertical rock silhouettes.
- **Prompt:**  
  `Original photorealistic travel editorial photograph of dramatic limestone karsts rising vertically from a quiet Southeast Asian bay. Deep layered karst formations recede into humid atmospheric distance, with a calm emerald-turquoise foreground inlet and one small traditional wooden boat far from camera for scale. Compose vertically 4:5, with the tallest karst in the upper central third and dark water/shore textures anchoring the lower third. Soft natural tropical daylight, realistic limestone texture, authentic haze and believable water reflections, professional destination photography, restrained natural color. No resort logos, no text, no watermark, no illustration, no fantasy cliffs, no collage.`
- **Desktop crop:** Portrait tile; keep principal karst silhouette central with water visible below.
- **Mobile crop:** Keep the tallest karst and waterline within the middle 70%; do not crop out the bay entirely.
- **Alt text:** Dramatic limestone karsts rising above a quiet bay in Southeast Asia.
- **Loading:** Lazy; async decoding.

### 03 — `europe.webp`

- **Role:** Europe continent discovery tile.
- **Exact target:** 900 × 1120 px.
- **Ratio:** 0.804:1 (portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Historic European riverside town; layered stone/pastel architecture, church/civic tower, calm river reflection. Avoid a famous landmark that may misrepresent a generic region.
- **Prompt:**  
  `Original photorealistic editorial travel photograph of a historic European riverside town, with a dense but believable cluster of old stone and muted pastel buildings, a modest church or civic tower rising above the roofline and a calm river reflecting the architecture. Vertical 4:5 framing from across the river, foreground water in the lower quarter, architectural layers in the middle, soft pale sky above. Late-afternoon natural light with subtle warm highlights, realistic old masonry, windows and roof textures, authentic lived-in setting, professional travel magazine photography. No readable signs, no flags used as stereotypes, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve water, town skyline and tower.
- **Mobile crop:** Central tower/building cluster must remain visible in a tighter portrait card; avoid cutting every building edge.
- **Alt text:** Historic European riverside town with old stone architecture.
- **Loading:** Lazy; async decoding.

### 04 — `africa.webp`

- **Role:** Africa continent discovery tile.
- **Exact target:** 900 × 1120 px.
- **Ratio:** 0.804:1 (portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Broad African savannah, acacia silhouettes, escarpment/hills and warm evening sky; wildlife only as distant, contextually plausible silhouettes.
- **Prompt:**  
  `Original photorealistic documentary travel photograph of a broad East African savannah at the end of the day. Low golden grasses and a natural acacia silhouette anchor the foreground, with a distant escarpment and a wide amber-to-muted-blue evening sky. If wildlife appears, show only a few very distant, anatomically realistic elephants or antelope at natural scale; the landscape remains the primary subject. Vertical 4:5 composition with clear depth layers, truthful savannah ecology, natural atmospheric light, detailed but restrained color, professional wildlife-and-landscape travel photography. No staged safari vehicle, no close-up animals, no fantasy sunset, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve a visible sky-to-land balance and one foreground tree.
- **Mobile crop:** Main acacia silhouette and distant horizon remain inside centre 65%; wildlife is optional, not required.
- **Alt text:** Wide African savannah beneath a warm evening sky.
- **Loading:** Lazy; async decoding.

### 05 — `americas.webp`

- **Role:** Americas continent discovery tile.
- **Exact target:** 900 × 1120 px.
- **Ratio:** 0.804:1 (portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Patagonian-style alpine lake and jagged mountain range with reflection, foreground grasses/rocks for depth. Avoid mixing tropical or desert cues.
- **Prompt:**  
  `Original photorealistic travel photograph of a clear mountain lake in Patagonia, framed by rugged jagged peaks with light snow remnants and dark forested slopes. Deep blue water reflects the mountain forms; a small band of native grasses and shoreline stones anchors the foreground. Vertical 4:5 composition, strong central mountain silhouette, reflective water across the lower third, crisp natural daylight with realistic clouds. Professional landscape travel photography, plausible geology and weather, natural color and fine detail. No buildings, no artificial aurora, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep the principal peak and enough lake reflection.
- **Mobile crop:** Center the peak and reflected water; preserve a clean edge at the lower foreground.
- **Alt text:** Mountain lake framed by dramatic peaks in the Americas.
- **Loading:** Lazy; async decoding.

### 06 — `oceania.webp`

- **Role:** Oceania continent discovery tile.
- **Exact target:** 900 × 1120 px.
- **Ratio:** 0.804:1 (portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Distinctive South Pacific island/lagoon with lush volcanic ridge, reef patterns and turquoise water. Do not use generic Maldives-style overwater bungalows.
- **Prompt:**  
  `Original photorealistic destination photograph of a lush South Pacific island with a green volcanic ridge rising behind a brilliant turquoise lagoon. Show natural reef and sand patterns through clear shallow water, deeper blue ocean beyond and a small amount of tropical foliage framing the lower edge. Vertical 4:5 composition from a believable elevated coastal viewpoint, island ridge in the upper-middle and lagoon filling the lower half. Bright but natural tropical daylight, realistic water clarity and vegetation, professional travel magazine photography. No overwater villas, no resort branding, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Retain green ridge and lagoon colour transition.
- **Mobile crop:** Keep at least one landform and the turquoise lagoon visible; avoid a crop containing only water.
- **Alt text:** Turquoise ocean around a lush tropical island.
- **Loading:** Lazy; async decoding.

### 07 — `kyoto-street.webp`

- **Role:** Featured Kyoto destination card; also used in desktop inspiration mega-menu.
- **Exact target:** 960 × 1200 px.
- **Ratio:** 0.800:1 (4:5 portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Quiet Kyoto machiya lane after rain, traditional wooden façades, noren and subtle temple roof in depth. No staged geisha/costume trope; no dense tourist crowd.
- **Prompt:**  
  `Original photorealistic street photograph in Kyoto, Japan: a quiet traditional lane lined with authentic wooden machiya townhouses, understated noren curtains, timber lattice details and a distant temple roof visible at the far end. The street is slightly wet after a light shower, creating subtle natural reflections. Early-morning soft light, no close-up people, no staged traditional costume, no cherry blossoms unless seasonally plausible. Vertical 4:5 editorial travel composition with leading lines toward the distant roof and tactile wooden details at both sides. Realistic Japanese urban architecture and photographic color. No readable signage, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep lane perspective and enough façade on both sides.
- **Mobile crop:** Preserve the vanishing point and at least one distinctive machiya frontage; avoid cutting all context.
- **Alt text:** Quiet traditional street in Kyoto with wooden machiya houses.
- **Loading:** Lazy in card; mega-menu use may load when menu is opened (current static markup references same asset).

### 08 — `lisbon-tram.webp`

- **Role:** Featured Lisbon destination card.
- **Exact target:** 960 × 1200 px.
- **Ratio:** 0.800:1 (4:5 portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Authentic classic yellow Lisbon tram moving around a steep narrow street with tiled façades; tram fully plausible and not distorted.
- **Prompt:**  
  `Original photorealistic editorial travel photograph of a classic yellow Lisbon tram rounding a steep cobbled street in Lisbon, Portugal. The tram is the clear focal subject, shown at a three-quarter angle with realistic proportions, overhead wires and traditional pastel façades with Portuguese azulejo tile detail around it. Bright but soft Atlantic daylight, subtle everyday street life only in the distance. Vertical 4:5 framing with tram within the central 60% and street perspective visible above and below it. Professional documentary street photography, accurate transit details, natural restrained color. No readable signage, no invented route numbers, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve tram front/body and street perspective.
- **Mobile crop:** Tram must remain fully identifiable in centre; do not crop away the front or route context.
- **Alt text:** Classic yellow tram passing through a sunlit Lisbon street.
- **Loading:** Lazy; async decoding.

### 09 — `marrakech-courtyard.webp`

- **Role:** Featured Marrakech destination card.
- **Exact target:** 960 × 1200 px.
- **Ratio:** 0.800:1 (4:5 portrait).
- **File budget:** 110–190 KB; review above 250 KB.
- **Subject/composition:** Quiet Moroccan riad courtyard with zellige fountain, carved cedar and orange tree. Strong architectural framing and warm natural light.
- **Prompt:**  
  `Original photorealistic architectural travel photograph of a tranquil Marrakech riad courtyard. Show a traditional zellige-tiled fountain in the foreground, carved cedar or plaster detailing around the courtyard, a mature orange tree and sunlit walls with authentic ochre tones. Compose vertically 4:5 from a natural standing viewpoint; create depth from fountain to doorway and upper gallery. Warm shafts of late-morning sunlight, believable tile geometry and material texture, professional architectural editorial photography. No luxury-hotel staging, no people posed for camera, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Retain fountain and architectural frame; avoid cutting the tree entirely.
- **Mobile crop:** Fountain and one carved architectural detail must remain visible in a compact portrait card.
- **Alt text:** Sunlit architectural courtyard in Marrakech with carved details.
- **Loading:** Lazy; async decoding.

### 10 — `slow-train.webp`

- **Role:** Slow-travel inspiration card.
- **Exact target:** 900 × 680 px.
- **Ratio:** 1.324:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Passenger train crossing a green mountain valley. Train secondary to journey/landscape; no readable operator branding.
- **Prompt:**  
  `Original photorealistic landscape travel photograph of a modest passenger train travelling through a lush green mountain valley. Show a believable rail line curving gently across the lower-middle of the scene, with the train small enough to establish scale while layered hills and a distant valley create depth. Cloud-filtered natural daylight, detailed vegetation and realistic railway infrastructure, calm contemplative slow-travel mood. Landscape 4:3 framing, editorial travel magazine quality, no railway company logos, no readable text, no watermark, no illustration, no collage.`
- **Desktop crop:** 4:3 card crop keeps the train and valley visible.
- **Mobile crop:** Keep the train in the central horizontal band; if card becomes stacked, do not allow it to disappear at the edge.
- **Alt text:** Train travelling through a green mountain valley.
- **Loading:** Lazy; async decoding.

### 11 — `alpine-hiking.webp`

- **Role:** Outdoor/nature travel inspiration card.
- **Exact target:** 900 × 680 px.
- **Ratio:** 1.324:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Two hikers from behind on a high alpine meadow trail; landscape scale dominates, people provide scale only.
- **Prompt:**  
  `Original photorealistic outdoor travel photograph of two hikers seen from behind, walking along a narrow natural trail through a high alpine meadow. The hikers are small in frame and dressed in practical, non-branded outdoor clothing; dramatic peaks and distant snowfields dominate the composition. Summer wildflowers and grasses provide a realistic foreground, with clear mountain air and natural daylight. Landscape 4:3, trail creates a visual path toward the mountains. Professional documentary adventure photography, credible human proportions and mountain terrain. No close-up faces, no logos, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep both hikers and the path leading into the mountains.
- **Mobile crop:** Keep at least one hiker plus trail/peak context in the central area.
- **Alt text:** Hikers following a trail across an alpine landscape.
- **Loading:** Lazy; async decoding.

### 12 — `ceramic-workshop.webp`

- **Role:** Culture/heritage inspiration card.
- **Exact target:** 900 × 680 px.
- **Ratio:** 1.324:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Artisan’s hands shaping a clay vessel on a wheel in a traditional workshop; focus on craft and material, not a stereotyped portrait.
- **Prompt:**  
  `Original photorealistic editorial photograph inside a real-feeling traditional ceramics workshop. Close documentary view of an artisan's hands shaping a clay vessel on a pottery wheel; the spinning clay form and hands are in crisp focus, with shelves of finished handmade ceramics softly visible behind. Warm natural window light, realistic clay slip and fingerprints, believable workshop tools and subdued earthy palette. Landscape 4:3 composition, hands and vessel placed near the centre with breathing room around them. Respectful cultural craft photography; no identifiable face required. No legible labels, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve both hands and vessel; background remains contextual.
- **Mobile crop:** Hands and vessel stay within central 70%; do not crop the vessel rim.
- **Alt text:** Artisan shaping a ceramic vessel in a traditional workshop.
- **Loading:** Lazy; async decoding.

### 13 — `portugal-coast.webp`

- **Role:** Portugal coastal itinerary card.
- **Exact target:** 1000 × 740 px.
- **Ratio:** 1.351:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Whitewashed Portuguese coastal village descending to Atlantic water; terracotta roofs and rugged shoreline. Realistic scale and geography.
- **Prompt:**  
  `Original photorealistic editorial travel photograph of a whitewashed Portuguese coastal village cascading down a hillside toward the Atlantic Ocean. Show authentic white façades, restrained terracotta roofs, narrow lanes and a rugged natural shoreline with ocean beyond. Viewpoint from a believable elevated overlook; village occupies the middle ground and coastline curves through the background. Landscape 4:3 composition, bright clear afternoon with soft sea haze, natural colors and realistic architecture. Avoid exaggerated cliffs or fantasy-perfect symmetry. No text, no watermark, no illustration, no collage, no resort branding.`
- **Desktop crop:** Keep village and sea horizon; preserve the coastal curve.
- **Mobile crop:** Centre on the meeting point of village and sea, retaining enough water to communicate coastal setting.
- **Alt text:** Whitewashed Portuguese coastal village overlooking the Atlantic.
- **Loading:** Lazy; async decoding.

### 14 — `japan-rail.webp`

- **Role:** Japan rail itinerary card.
- **Exact target:** 1000 × 740 px.
- **Ratio:** 1.351:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Realistic Japanese regional train crossing a rural valley, village and forested mountains. Avoid invented Shinkansen livery or impossible track geometry.
- **Prompt:**  
  `Original photorealistic travel photograph of a Japanese regional passenger train crossing a rural valley. Show a believable modern local train on a properly engineered rail line, with forested mountain layers, patchwork fields and a small village in the distance. Landscape 4:3 composition, train placed in the lower-middle third and landscape remaining the dominant subject. Soft late-afternoon natural light, realistic Japanese countryside, accurate train proportions and infrastructure, calm journey mood. No recognizable operator branding, no invented legible signage, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep train body, tracks and mountain backdrop together.
- **Mobile crop:** Train must survive a centred narrow crop; preserve at least one clear landscape layer.
- **Alt text:** Japanese train crossing a rural landscape with mountains beyond.
- **Loading:** Lazy; async decoding.

### 15 — `marrakech-medina.webp`

- **Role:** Things-to-do activity card.
- **Exact target:** 860 × 720 px.
- **Ratio:** 1.194:1.
- **File budget:** 70–145 KB; review above 200 KB.
- **Subject/composition:** Narrow Marrakech medina lane with authentic timber shopfronts, baskets and spice/market textures. Keep people incidental and unidentifiable.
- **Prompt:**  
  `Original photorealistic documentary street photograph in the old medina of Marrakech, Morocco. Show a narrow pedestrian lane framed by authentic traditional shopfronts, carved timber doors, baskets and restrained spice or produce displays. A few distant pedestrians may add everyday scale but must not be posed or identifiable. Morning light enters naturally between buildings, creating believable shadow and warm stone texture. Landscape 5:4 composition, clear lane perspective leading toward a softly lit distance; no market clutter that obscures the architecture. Respectful, accurate place photography. No readable generated signs, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve lane perspective and at least one market detail.
- **Mobile crop:** Central vanishing point and one side of the lane remain visible.
- **Alt text:** Narrow Marrakech medina lane with traditional shops.
- **Loading:** Lazy; async decoding.

### 16 — `swiss-trail.webp`

- **Role:** Things-to-do activity card.
- **Exact target:** 860 × 720 px.
- **Ratio:** 1.194:1.
- **File budget:** 70–145 KB; review above 200 KB.
- **Subject/composition:** Winding footpath through green Swiss alpine valley; wildflowers, slopes and distant peaks. Trail line must be legible.
- **Prompt:**  
  `Original photorealistic landscape travel photograph of a winding mountain footpath through a lush Swiss alpine valley in summer. The trail enters from the lower foreground and bends naturally toward the middle distance, bordered by alpine grasses and modest wildflowers. Green slopes rise toward distant rocky peaks with a little residual snow. Clear but soft summer daylight, believable mountain vegetation, realistic terrain and professional hiking destination photography. Landscape 5:4 composition with the trail clearly visible in the central third. No hikers required, no cabins used as false landmarks, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve the entire visual trail curve from foreground to middle distance.
- **Mobile crop:** Trail must remain inside the centred crop; do not cut off its entry point at the bottom.
- **Alt text:** Mountain footpath winding through a green Swiss alpine valley.
- **Loading:** Lazy; async decoding.

### 17 — `seasonal-coast.webp`

- **Role:** Editorial article card about choosing the right travel season.
- **Exact target:** 920 × 680 px.
- **Ratio:** 1.353:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Quiet Atlantic shore in shoulder-season light, soft surf, low cliffs and subtle golden grasses. Calm and seasonally neutral.
- **Prompt:**  
  `Original photorealistic editorial travel photograph of a quiet Atlantic coastline in soft shoulder-season light, early autumn or spring. Gentle waves approach a natural beach below low weathered cliffs; muted golden coastal grasses and pale blue-grey sky suggest a calm day outside peak summer. Landscape 4:3 composition with shoreline leading diagonally across the frame and atmospheric distance. Natural overcast/warm-break light, realistic surf and coastal geology, subtle restrained color, high-end travel magazine photography. No people close to camera, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep the diagonal shoreline, surf and sky.
- **Mobile crop:** Preserve one distinct coast/sea boundary; avoid an empty sky-only crop.
- **Alt text:** Coastal landscape in soft light during a shoulder season.
- **Loading:** Lazy; async decoding.

### 18 — `market-morning.webp`

- **Role:** Editorial article card about thoughtful travel days.
- **Exact target:** 920 × 680 px.
- **Ratio:** 1.353:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Local produce market in early morning; fresh vegetables/citrus, stall details and vendors in middle distance. Authentic activity, not staged.
- **Prompt:**  
  `Original photorealistic documentary travel photograph of a local produce market in the early morning. Foreground includes carefully observed fresh vegetables, citrus and market textures; a vendor and shoppers may appear naturally in the middle distance but are not posed or identifiable. Soft warm daylight enters the market aisle, with layered stalls receding into depth. Landscape 4:3 composition, focal produce in the lower-left/centre and enough environmental context to identify a real market. Accurate food textures and natural skin tones. No legible AI lettering or price labels, no logos, no text overlay, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep foreground produce plus a readable market aisle.
- **Mobile crop:** Preserve one foreground produce group and distant human/market context.
- **Alt text:** Early morning market scene with fresh produce and stalls.
- **Loading:** Lazy; async decoding.

### 19 — `neighbourhood-cafe.webp`

- **Role:** Editorial article card about feeling local.
- **Exact target:** 920 × 680 px.
- **Ratio:** 1.353:1.
- **File budget:** 90–170 KB; review above 230 KB.
- **Subject/composition:** Small neighbourhood café opening onto a quiet Lisbon/European side street, chairs, patterned pavement, natural lived-in details. Avoid brand marks.
- **Prompt:**  
  `Original photorealistic editorial street photograph of a small independent neighbourhood café opening onto a quiet Lisbon side street. Show a modest storefront, a few outdoor chairs, traditional patterned pavement and neighbouring pastel façades, with warm morning sunlight creating natural shadows. If people appear, they should be incidental and distant rather than staged. Landscape 4:3 composition with the café and street context both readable, authentic lived-in details and realistic urban proportions. No recognizable café branding, no legible sign text, no watermark, no illustration, no collage.`
- **Desktop crop:** Include both café threshold and surrounding street.
- **Mobile crop:** Keep the storefront doorway and a small amount of pavement/streetscape in view.
- **Alt text:** Neighbourhood café opening onto a quiet European street.
- **Loading:** Lazy; async decoding.

### 20 — `calendar-planning.webp`

- **Role:** Travel planning resource card about timing and preparation.
- **Exact target:** 800 × 620 px.
- **Ratio:** 1.290:1.
- **File budget:** 70–145 KB; review above 200 KB.
- **Subject/composition:** Overhead/oblique still life of open blank travel notebook, folded map, simple compass and pencil on wood beside window light. No legible text or real itinerary details.
- **Prompt:**  
  `Original photorealistic editorial still-life photograph for a travel planning guide. Show an open notebook with genuinely blank or softly out-of-focus pages, a folded paper map with no readable place names, a simple analog compass and pencil arranged naturally on a warm wooden table near a window. Soft morning daylight and subtle shadows, tactile paper and wood grain, thoughtful unhurried mood. Landscape 4:3 composition, objects grouped in the central 70% with a small amount of clear tabletop around them. No legible text, no digital devices, no logos, no watermark, no illustration, no collage.`
- **Desktop crop:** Keep notebook, map and compass together.
- **Mobile crop:** Maintain all three key objects; do not crop the compass or map completely.
- **Alt text:** Travel notebook and map laid out on a wooden table.
- **Loading:** Lazy; async decoding.

### 21 — `train-platform.webp`

- **Role:** Travel planning resource card about getting around.
- **Exact target:** 800 × 620 px.
- **Ratio:** 1.290:1.
- **File budget:** 70–145 KB; review above 200 KB.
- **Subject/composition:** Intercity train stopped at a clean contemporary European station platform; strong perspective/leading lines, no prominent operator logos or AI text.
- **Prompt:**  
  `Original photorealistic travel photograph of an intercity passenger train waiting at a clean modern European railway platform. Show the train from a three-quarter side angle with believable carriage windows and platform canopy; perspective lines lead into the distance. Soft natural daylight, a small number of distant passengers may provide scale without becoming focal subjects. Landscape 4:3 composition, train occupies the right or central portion with platform architecture clearly readable. Realistic rail infrastructure, no identifiable operator branding, no readable platform signs, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Preserve train and platform lines; keep carriage clearly identifiable.
- **Mobile crop:** Keep train front/side and platform context within the central crop.
- **Alt text:** Intercity train waiting at a modern station platform.
- **Loading:** Lazy; async decoding.

### 22 — `travel-bag.webp`

- **Role:** Travel planning resource card about packing light.
- **Exact target:** 800 × 620 px.
- **Ratio:** 1.290:1.
- **File budget:** 70–145 KB; review above 200 KB.
- **Subject/composition:** Open carry-on bag packed neatly with neutral clothes, practical shoes, camera and toiletry pouch on a bench near daylight. Natural editorial still life; avoid brand logos.
- **Prompt:**  
  `Original photorealistic editorial still-life photograph of an open durable carry-on travel bag neatly packed for a thoughtful trip. Visible items include folded neutral clothing, practical walking shoes, a compact unbranded camera and a small toiletry pouch arranged realistically, not floating or perfectly symmetrical. Place the bag on a wooden bench beside a bright window with soft natural daylight and restrained warm tones. Landscape 4:3 composition, entire bag and key contents fully visible within the central 75%. Realistic fabric, zippers and material texture. No brand logos, no passport details, no personal information, no text, no watermark, no illustration, no collage.`
- **Desktop crop:** Show the full open bag and its packed contents.
- **Mobile crop:** Keep bag rim and all key contents visible; compose with additional safe margin on both sides.
- **Alt text:** Open travel bag packed neatly with practical essentials.
- **Loading:** Lazy; async decoding.

---

## 4. Crop and composition acceptance policy

1. **Focal safe area:** The primary subject must remain within the central 70% of the source frame unless a specific desktop negative-space layout is documented (hero).
2. **No destructive crop:** Never cut off the defining subject (tram front, pottery vessel, train body, bag contents, main mountain peak) in either desktop or mobile test crop.
3. **No stretch:** Never alter aspect ratio through non-proportional scaling.
4. **Separate crops only when needed:** If one source cannot support both portrait and landscape card crops, create two intentional crops from the same approved master and record their crop coordinates. Do not generate a second unrelated scene just to fill a crop.
5. **Mobile is not an automatic centre crop:** Check actual CSS object-position and art direct the focal point. The mobile crop must still tell the same story.
6. **Text overlays:** Hero must maintain a calm low-detail area behind headline and search field with sufficient contrast after the CSS scrim is applied.
7. **Visual consistency:** Warm, natural editorial grading across the collection; do not apply identical color overlays that make different places appear artificially uniform.

---

## 5. Rights, licensing and originality

### 5.1 Acceptable sources

Use one of:
- Image generation from an approved model/provider whose terms grant the account/user the rights needed for the intended use.
- Commissioned original photography with a written license/assignment and model/property releases where needed.
- A stock/licensed photograph with an explicit license covering website publication, commercial use where relevant, modification/cropping, static CDN delivery and the relevant geographic/temporal scope.

### 5.2 Prohibited sources and practices

- Do not download competitor photographs or copy Nomadic Matt, Lonely Planet, Booking.com or another travel publisher's visual assets.
- Do not use search-engine thumbnails, social media images, Pinterest pins or scraped image URLs as rights evidence.
- Do not use unlicensed photographer portfolios or images with unclear ownership.
- Do not remove watermarks from stock imagery.
- Do not assume that a public URL, free download or AI output automatically grants unrestricted commercial rights.
- Do not use a source whose terms prohibit redistribution, website embedding, modifications or the intended commercial context.
- Do not train or fine-tune on a photographer's image without the required permissions.

### 5.3 Provenance manifest

Before commit, maintain a provenance record for every file (can be a separate CSV/JSON in a later approved asset-integration task). Minimum fields:
- exact filename and asset ID;
- creator/photographer or generation provider/model;
- source/master file identifier;
- creation/capture date;
- license name/version and source URL or transaction/license reference;
- commercial web use permitted (yes/no);
- crop/edit/optimization permitted (yes/no);
- attribution required and exact credit;
- model/property release status where applicable;
- reviewer and approval date.

For AI-generated visuals, retain the exact prompt, provider/model/version, generation date, output identifier and the terms applicable on that date. Check provider terms at the time of generation; do not assume terms are static.

---

## 6. Accessibility and SEO metadata

- Use the approved alt text below as the descriptive baseline; revise only if the final image materially differs.
- Alt text describes the actual visible content and purpose, not keywords or marketing slogans.
- Do not include "image of", "photo of" or a list of SEO phrases.
- If the final photograph differs (e.g. no boat, no tower, no visible tram), revise the alt text to match reality before publication.
- Decorative duplicates of meaningful adjacent content should use empty alt only when the image genuinely adds no information; do not blank out the 22 meaningful content images by default.
- Maintain intrinsic dimensions on the HTML image element to reserve layout space.
- For Open Graph hero use the approved hero rendition with crop tested for social previews; ensure dimensions and aspect ratio match the chosen OG layout.

---

## 7. Asset QA and release checklist

### 7.1 Per-file technical validation

- [ ] All 22 expected filenames exist exactly once in `src/assets/images/`.
- [ ] Every file decodes successfully in a real image decoder.
- [ ] Every file is actually WebP (container/magic bytes and decoded MIME/type agree).
- [ ] WebP encoder reports quality value 85 in build/export log or conversion manifest.
- [ ] Pixel dimensions equal the approved target dimensions in Section 3.
- [ ] Color/orientation are normalized; no accidental rotation.
- [ ] File size meets target or has a documented exception.
- [ ] No zero-byte, truncated or corrupt file.
- [ ] No unexpected alpha channel, metadata payload or oversized embedded profile.
- [ ] No unexpected extra image format or filename in the canonical asset set.

### 7.2 Per-file visual validation

- [ ] Actual content matches its specific brief and alt text.
- [ ] Photorealistic, editorial-quality result; not an illustration or render.
- [ ] No visible generator artifacts: malformed buildings/vehicles/hands, repeated windows, broken rails, impossible geometry, melted text or distorted wildlife.
- [ ] No unintended logos, watermarks, invented signage or readable gibberish.
- [ ] No duplicate scene or composition among the 22 images.
- [ ] No mirrored/near-duplicate substitutions.
- [ ] Desktop crop passes at the actual CSS card dimensions.
- [ ] Mobile crop passes at 360 px and 390 px viewport widths.
- [ ] Hero overlay text remains readable and subject remains identifiable.
- [ ] Focal subject does not conflict with overlaid text or controls.

### 7.3 Duplicate and integrity validation

- [ ] Compute SHA-256 for all 22 encoded files; exact hash duplicates are rejected.
- [ ] Compute perceptual hashes (pHash/dHash) and review near-duplicates; do not rely on file hashes alone.
- [ ] Inspect contact sheet to compare scene, subject and composition.
- [ ] Compare image dimensions and aspect ratios to the manifest.
- [ ] Verify every HTML/JSON image reference resolves to a committed file.
- [ ] Verify there are no unreferenced deliverables unless explicitly listed as responsive derivatives.
- [ ] Verify original source/master files and license records are retained outside public output.

### 7.4 Integration and performance validation (later task, not this specification commit)

- [ ] The homepage references each canonical WebP filename exactly as intended.
- [ ] All image requests return successfully from the built static output.
- [ ] Hero has eager loading and `fetchpriority="high"`; hero is not lazy-loaded.
- [ ] Below-the-fold card images use `loading="lazy"` and `decoding="async"`.
- [ ] Responsive `srcset` and `sizes` use real, present candidate files only.
- [ ] Correct intrinsic width and height are present.
- [ ] No layout shift occurs while image files load.
- [ ] No browser console/network image errors.
- [ ] Mobile/desktop visual screenshot review is complete.

### 7.5 Rights and governance validation

- [ ] License/provenance record exists for every file.
- [ ] Intended website use and modifications are expressly permitted.
- [ ] Model/property releases have been reviewed where necessary.
- [ ] Attribution is included where required.
- [ ] No competitor or scraped assets are present.
- [ ] Image reviewer signs off the final set.

---

## 8. Asset register — filenames, target dimensions and alt text

| # | Exact filename | Dimensions | Ratio | Alt text |
|---:|---|---:|---:|---|
| 1 | `hero-coast.webp` | 1920 × 1200 | 1.600 | Sunlit rugged coastline and turquoise Mediterranean water |
| 2 | `asia.webp` | 900 × 1120 | 0.804 | Dramatic limestone karsts rising above a quiet bay in Southeast Asia |
| 3 | `europe.webp` | 900 × 1120 | 0.804 | Historic European riverside town with old stone architecture |
| 4 | `africa.webp` | 900 × 1120 | 0.804 | Wide African savannah beneath a warm evening sky |
| 5 | `americas.webp` | 900 × 1120 | 0.804 | Mountain lake framed by dramatic peaks in the Americas |
| 6 | `oceania.webp` | 900 × 1120 | 0.804 | Turquoise ocean around a lush tropical island |
| 7 | `kyoto-street.webp` | 960 × 1200 | 0.800 | Quiet traditional street in Kyoto with wooden machiya houses |
| 8 | `lisbon-tram.webp` | 960 × 1200 | 0.800 | Classic yellow tram passing through a sunlit Lisbon street |
| 9 | `marrakech-courtyard.webp` | 960 × 1200 | 0.800 | Sunlit architectural courtyard in Marrakech with carved details |
| 10 | `slow-train.webp` | 900 × 680 | 1.324 | Train travelling through a green mountain valley |
| 11 | `alpine-hiking.webp` | 900 × 680 | 1.324 | Hikers following a trail across an alpine landscape |
| 12 | `ceramic-workshop.webp` | 900 × 680 | 1.324 | Artisan shaping a ceramic vessel in a traditional workshop |
| 13 | `portugal-coast.webp` | 1000 × 740 | 1.351 | Whitewashed Portuguese coastal village overlooking the Atlantic |
| 14 | `japan-rail.webp` | 1000 × 740 | 1.351 | Japanese train crossing a rural landscape with mountains beyond |
| 15 | `marrakech-medina.webp` | 860 × 720 | 1.194 | Narrow Marrakech medina lane with traditional shops |
| 16 | `swiss-trail.webp` | 860 × 720 | 1.194 | Mountain footpath winding through a green Swiss alpine valley |
| 17 | `seasonal-coast.webp` | 920 × 680 | 1.353 | Coastal landscape in soft light during a shoulder season |
| 18 | `market-morning.webp` | 920 × 680 | 1.353 | Early morning market scene with fresh produce and stalls |
| 19 | `neighbourhood-cafe.webp` | 920 × 680 | 1.353 | Neighbourhood café opening onto a quiet European street |
| 20 | `calendar-planning.webp` | 800 × 620 | 1.290 | Travel notebook and map laid out on a wooden table |
| 21 | `train-platform.webp` | 800 × 620 | 1.290 | Intercity train waiting at a modern station platform |
| 22 | `travel-bag.webp` | 800 × 620 | 1.290 | Open travel bag packed neatly with practical essentials |

---

## 9. Task boundary and handoff

This document establishes the production specification only.

**Included now:**
- All 22 image subjects, composition guidance and individual prompts.
- Target dimensions, aspect ratios, crop requirements and file budgets.
- WebP quality 85 export requirements.
- Licensing/provenance requirements.
- Per-file, duplicate, visual, accessibility and integration validation checklists.

**Explicitly not included:**
- Image generation or downloads.
- WebP binary creation or conversion.
- Changes to `src/assets/images/` (except this specification document is placed at repository root).
- Changes to `src/data/homepage.json`, `src/partials/shell.html`, CSS, JS or build scripts.
- Build verification, browser QA or responsive QA.
- Merge to `main` or deployment.

**Next task:** Generate/commission the 22 independent images, convert to verified WebP at quality 85, add provenance records, commit the actual binaries and run asset-integrity validation. Build verification and responsive QA follow after the asset integration task.
