# TravelGuide — Project State

- **Repository:** https://github.com/prem-pk-dev/TravelGuide
- **Production branch:** `main`
- **Research branch:** `research/travel-guide-blueprint`
- **Homepage development branch:** `development/homepage`
- **Verified starting point:** `main` at `eb669b8e67f8f2df8f99c25858697dbe8aaa1b26`
- **Phase status:** Research and architecture Phases 1, 1.5 and 2.1–2.6 complete.
- **Implementation status:** Homepage foundation is committed on the isolated development branch and has a successful Cloudflare Preview deployment; not merged to `main` and not production-deployed.

## 1. Architecture contract

- Static multi-page website: HTML5, CSS3, Vanilla JavaScript and static JSON.
- Build-time output to `dist/`; source maintained in `src/`.
- No backend, database, authentication, SPA or frontend framework.
- Physical HTML documents remain the canonical page model.
- Original, photorealistic WebP assets are sourced from private MEDIA-ASSETS and delivered through Cloudflare Pages where public delivery is verified.
- `main` and research branch remain untouched.
- No Cloudflare Pages project settings were changed. Git pushes to `development/homepage` trigger Preview builds; no production deployment was initiated.

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

- Cloudflare Pages project: `travelguide`; production branch: `main`; Preview deployments enabled for all branches.
- Build command: `npm run build`; output directory: `dist/`; root directory: `/`.
- The `previewCanonical` value in `src/data/site.json` is `https://travelguide-9op.pages.dev/`, the production canonical hostname. Preview pages use this canonical target while also carrying preview-specific noindex rules.
- Preview branch build logic sets `noindex, nofollow` and generates an `X-Robots-Tag: noindex, nofollow` header rule.
- Main source currently contains `noindex, nofollow` in the shell; production is protected from indexing but not yet configured for search indexing.
- No `sitemap.xml` source file or sitemap-generation step is present in the inspected build/source. Actual public sitemap response remains unverified.
- Cloudflare production deployment record: branch `main`, commit `bab89d7eb14a356dbc194557492fc8de6e980c67`, successful deployment. No production deployment performed during the SEO verification task.

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


## 7. Preview SEO isolation — verification log (2026-11-15)

### Cloudflare deployment evidence
- Cloudflare Pages project: `travelguide`; configured production branch: `main`; preview deployments enabled for all branches.
- The SEO code deployment ID `e09510f2-66a3-46cd-a04f-46a44f685fc3` succeeded for commit `421028ebb0cf6fad6e24981148a006d6fb97c463`; it was associated with `https://development-homepage.travelguide-9op.pages.dev`.
- The subsequent documentation-only branch commit `b880d492b74f8962dc7cb7a58a4f11aaaf7e3897` also reached a successful Preview deployment (deployment ID `bae0af4f-5b64-4420-b9aa-6e960f7bd7e2`) and was associated with the same branch alias.
- Production deployment record remains on `main` commit `bab89d7eb14a356dbc194557492fc8de6e980c67`; no production deploy or configuration write was performed in this verification.

### Source-level SEO configuration reviewed
- Preview build logic in `scripts/build.mjs` derives environment from Cloudflare's `CF_PAGES_BRANCH`: `main` -> `index, follow`; non-main -> `noindex, nofollow`.
- Preview build emits `dist/_headers` with `X-Robots-Tag: noindex, nofollow`; it does not emit this preview-only headers file for main.
- Build emits `robots.txt` with `User-agent: *` and `Allow: /`. This is intentional so crawlers can fetch HTML and observe noindex; robots.txt alone does not block indexing.
- Preview canonical remains `https://travelguide-9op.pages.dev/` (the configured production canonical host).
- No root `sitemap.xml` exists in the inspected source branch, and `scripts/build.mjs` does not generate a sitemap. Sitemap accessibility is not verified and remains an issue.

### Public HTTP verification limitations
- Direct HTTPS requests from the current execution container could not resolve the `*.pages.dev` hostnames.
- Web fetches of preview and production robots/sitemap/HTML endpoints returned inaccessible/cache-miss errors.
- Cloudflare Browser Rendering content requests were rate-limited (HTTP 429); a separate production-host request returned a network-connection-closed/DNS error. These are tooling/network failures, not evidence of the site's HTTP status.
- Therefore actual public HTTP status, response headers, rendered robots meta, canonical tag, robots.txt body and sitemap status have **not** been independently verified. Do not mark SEO isolation complete until these are checked from an ordinary public HTTP client/browser.

### Production source safety review
- `main` source remains unchanged by this phase.
- Main shell currently hard-codes `<meta name="robots" content="noindex, nofollow">`; production is therefore protected from indexing at source level, but production search indexing is not enabled.
- Main `site.json` canonical remains `https://travelguide-9op.pages.dev/`.
- Main build script emits permissive `robots.txt` (`Allow: /`) and does not generate a sitemap.
- No source changes, deployment, or Cloudflare configuration changes were made to `main` or `research/travel-guide-blueprint`.

### Outcome
- Preview build-time noindex rules and deployment/alias identity are source/API verified.
- Public HTTP verification is blocked; SEO isolation is **not certified complete**.
- Remaining: fetch the live preview and production responses externally; confirm the `X-Robots-Tag` header, robots meta, canonical and robots.txt body; establish or intentionally omit sitemap; then reconcile production's current noindex directive with the desired launch indexing policy.
