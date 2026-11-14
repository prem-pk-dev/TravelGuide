# TravelGuide — Project State

- **Repository:** https://github.com/prem-pk-dev/TravelGuide
- **Production branch:** `main`
- **Research branch:** `research/travel-guide-blueprint`
- **Homepage development branch:** `development/homepage`
- **Verified starting point:** `main` at `eb669b8e67f8f2df8f99c25858697dbe8aaa1b26`
- **Phase status:** Research and architecture Phases 1, 1.5 and 2.1–2.6 complete.
- **Implementation status:** Homepage foundation is committed on the isolated development branch; not merged or deployed.

## 1. Architecture contract

- Static multi-page website: HTML5, CSS3, Vanilla JavaScript and static JSON.
- Build-time output to `dist/`; source maintained in `src/`.
- No backend, database, authentication, SPA or frontend framework.
- Physical HTML documents remain the canonical page model.
- Original, photorealistic WebP assets are sourced from private MEDIA-ASSETS and delivered through Cloudflare Pages where public delivery is verified.
- `main` and research branch remain untouched.
- No Cloudflare Pages deployment/settings changed by this phase.

## 2. Homepage foundation

- Shared semantic header/footer, responsive navigation and mega menus.
- Destination search and static JSON content.
- Hero and homepage sections for discovery, destinations, inspiration, itineraries, activities, journal, planning and editorial trust.
- SEO scaffold, responsive CSS and static build/check scripts.

## 3. Image sourcing state — reuse authorized

User explicitly authorized reuse of existing MEDIA-ASSETS WebP assets, including using the same photo across multiple homepage sections. No new image generation is required.

- Six replacement source files have been visually re-evaluated, with possible alternates documented in `HOMEPAGE-ASSET-MAPPING.md` and `HOMEPAGE-ASSET-REVIEW.md`.
- Promising sources include Amalfi coast, Kyoto bamboo garden, Serengeti elephant safari sunrise, alpine glacial lake and alpine wildflower meadow.
- Some subjects remain unmatched exactly: South Pacific island/lagoon, visible alpine hiking trail and several other original homepage slots.
- Current Cloudflare connector fetches to candidate image URLs return 403/text/plain from this execution environment. This does not establish global public CDN failure, but no fresh URL is certified in this phase.
- The known Mountain Hiker CDN route previously returned HTML fallback, not WebP.
- Existing homepage code uses local `/assets/images/*.webp` paths. No homepage reference was changed because no full set of verified CDN URLs is available.
- All 22 slots are not yet integration-complete.

## 4. Preview and production configuration

- Preview canonical: `https://travelguide-9op.pages.dev/` for isolated preview only.
- Preview output has noindex/nofollow.
- Production canonical hostname and live Cloudflare Pages build/root/output settings remain unverified. Do not deploy until inspected and explicitly approved.

## 5. Current phase outcome

- Replacement image reuse policy: accepted and documented.
- Source previews inspected: documented in review.
- Public CDN verification: blocked/unresolved for candidates.
- Homepage integration: pending verification; no HTML/CSS/JS/JSON changes made.
- Branch isolation: maintained.

## 6. Next actions

1. Verify candidate CDN URLs from a normal public browser/network with HTTP 200, `image/webp`, RIFF/WEBP signature and decoded dimensions.
2. Close exact subject gaps for Oceania and alpine hiking, or use a user-approved more general card/alt-text brief.
3. Complete all 22 asset slot assignments, recording reused sources and actual image descriptions.
4. Only then change homepage references/build handling, preserving hero fetch priority, lazy loading, intrinsic width/height and responsive behavior.
5. Run build/check and browser visual QA after integration.
6. Create review PR only after all release gates pass; explicit approval required before merge/deploy.
