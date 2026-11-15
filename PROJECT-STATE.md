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

### Public HTTP verification — actual responses (2026-11-15)

**Preview branch alias: `https://development-homepage.travelguide-9op.pages.dev`**
- `GET /robots.txt`: HTTP `200`, `text/plain`; body is `User-agent: *\nAllow: /\n`; response includes `X-Robots-Tag: noindex, nofollow`.
- `GET /`: HTTP `200`, `text/html`; HTML contains `<meta name="robots" content="noindex, nofollow">`; response includes `X-Robots-Tag: noindex, nofollow`.
- Preview canonical and `og:url` both point to `https://travelguide-9op.pages.dev/`.
- `GET /sitemap.xml`: HTTP `404`; returned the project's custom Page not found document.

**Production canonical host: `https://travelguide-9op.pages.dev`**
- `GET /robots.txt`: HTTP `200`, `text/plain`; body is `User-agent: *\nDisallow: /\n`; no `X-Robots-Tag` header was present on the project canonical-host alias response.
- `GET /`: HTTP `200`, `text/html`; HTML contains `<meta name="robots" content="noindex, nofollow">`; no `X-Robots-Tag` header was present on the project canonical-host alias response. Canonical and `og:url` point to `https://travelguide-9op.pages.dev/`.
- `GET /sitemap.xml`: HTTP `404`; returned the project's custom Page not found document.
- Cross-check at immutable production deployment URL `https://ed9365c0.travelguide-9op.pages.dev/robots.txt`: HTTP `200`, body also `Disallow: /`, with `X-Robots-Tag: noindex`.

### Production source and safety review
- Production branch and deployment remain on `main` commit `bab89d7eb14a356dbc194557492fc8de6e980c67`; this verification made no writes to `main`, research branch or Pages settings.
- At the deployed production commit, `src/partials/shell.html` has hard-coded `noindex, nofollow`; `scripts/build.mjs` generates `robots.txt` with `Disallow: /`; `src/data/site.json` sets canonical to `https://travelguide-9op.pages.dev/`.
- The live base-host responses agree with the production source for robots body and HTML meta. However, `Disallow: /` prevents crawlers from fetching the homepage to observe its noindex meta. On the canonical-host alias, no `X-Robots-Tag` header was present. Therefore do not treat the production setup as a reliable de-indexing policy for an already-known URL.
- The immutable production deployment URL did emit `X-Robots-Tag: noindex` on its robots response; the base alias and immutable deployment response headers differ.
- No sitemap source file or sitemap-generation step exists in the inspected production/development sources. Both public sitemap URLs returned HTTP `404`.

### Outcome and remaining issues
- Preview deployment identity and alias: verified.
- Preview indexing restrictions: **PASS** — the live homepage returns both a noindex meta tag and an `X-Robots-Tag: noindex, nofollow` header, while robots.txt allows crawling so the directives can be read.
- Preview/production sitemap accessibility: **FAIL** — both `/sitemap.xml` URLs return HTTP `404`.
- Production indexing policy: **needs correction before launch** — robots.txt disallows all crawling, the homepage meta says noindex, and the canonical-host response does not carry an `X-Robots-Tag` header. This combination can prevent crawlers from seeing the meta directive.
- Overall Preview SEO Isolation is **not marked complete** because the sitemap check fails and production canonical-host crawler behavior has an inconsistency to resolve.
