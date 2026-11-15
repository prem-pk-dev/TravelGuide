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


## 8. Phase 2.6 — Sitemap strategy and crawler policy (2026-11-15)

### Actual published-page inventory
- The current static build emits one real content document: dist/index.html. It also emits dist/404.html, which is non-indexable.
- Homepage cards and the architecture sitemap document reference many future routes, but no physical HTML documents for those route families exist in this branch yet. Those routes are not placed in the XML sitemap.

### Implemented sitemap design on development/homepage
- scripts/sitemap.mjs discovers URLs from generated HTML, not navigation links or proposed URL architecture.
- A URL is included only when its physical HTML file has an explicit index robots token, has a self-canonical URL on the configured HTTPS production origin, and the canonical route maps to that same physical output file. 404.html, noindex pages, noncanonical duplicates and preview URLs are excluded.
- Current productionIndexingEnabled is false. Preview and protected Production therefore emit a well-formed empty urlset; there are presently no eligible indexable pages to list.
- The sitemap generator splits large sites at 45,000 URLs or 45 MiB per child file and switches root sitemap.xml to a sitemap index when required. No fabricated lastmod is included.
- Build and npm run check validate sitemap XML, membership and a multi-file splitting fixture. The Pages build command will run the check automatically after generation.

### Preview and Production crawler policy
- Preview: robots.txt allows crawling but does not advertise a sitemap; all static responses carry X-Robots-Tag: noindex, nofollow; homepage meta is noindex; canonical points to the production origin.
- Production is deliberately held behind productionIndexingEnabled: false: Disallow: / remains, HTML meta remains noindex, and response-level noindex stays in place. No change to main or to the deployed Production service was made.
- Only a separately approved launch change may turn this switch on. That future action will set index/follow, allow crawling, publish the sitemap directive and list verified physical canonical pages.

### Cloudflare Pages behavior
- The configured Pages project remains root /, npm run build, output dist/, production branch main, Preview branches enabled.
- Branch selection uses Cloudflare's CF_PAGES_BRANCH; _headers is generated to dist/. No _redirects file is needed because no redirect is currently required.
- No Cloudflare project settings, main branch, research branch, production deployment or merge was changed.


## 9. Phase 2.6 — Preview sitemap and crawler verification addendum (2026-11-15)

### Final deployment
- Preview deployment ID: \`87ecea01-aea8-4a79-ba7c-014d09cc7819\`.
- Deployment status: \`success\`; branch: \`development/homepage\`; deployed commit: \`5db2ec3d98746ce9cd84429af30d3e263158c897\`.
- Branch alias: \`https://development-homepage.travelguide-9op.pages.dev/\`.
- Cloudflare build log shows \`npm run build\` and \`npm run check\` completed successfully. Generated sitemap was an empty \`urlset\` (0 URLs), and all build checks passed. Cloudflare parsed three valid static header rules and completed deployment.

### Live Preview HTTP evidence
- \`GET /robots.txt\`: HTTP \`200\`; \`Content-Type: text/plain; charset=utf-8\`; body directives: \`User-agent: *\` and \`Allow: /\`; response \`X-Robots-Tag: noindex, nofollow\`; no \`Sitemap:\` line, so no production sitemap is advertised from Preview.
- \`GET /\`: HTTP \`200\`; \`Content-Type: text/html; charset=utf-8\`; response \`X-Robots-Tag: noindex, nofollow\`; rendered HTML robots meta is \`noindex, nofollow\`; canonical and \`og:url\` both resolve to \`https://travelguide-9op.pages.dev/\`.
- \`GET /sitemap.xml\`: HTTP \`200\`; \`Content-Type: application/xml; charset=utf-8\`; response \`X-Robots-Tag: noindex, nofollow\`. The XML parser recognizes the sitemap namespace and \`urlset\` root. Scraped XML source has actual newline characters and no literal backslash-n sequences. URL count is zero, as no physical content HTML page currently explicitly declares indexability with a self-canonical production URL.
- No Preview URL or Preview host is present in sitemap entries (the sitemap is empty).

### Production policy and safety
- Development \`src/data/site.json\` keeps \`productionIndexingEnabled: false\`. Even a \`main\` branch build remains noindex + \`Disallow: /\` until this flag is deliberately changed in a separate approved launch task.
- Production source on \`main\` was read-only inspected and remains unchanged: \`scripts/build.mjs\` blob \`8d3d4b2a195e99f6721c0a3f69024304a0c45b82\`; \`src/partials/shell.html\` blob \`9462b46dbabb061d6664d8783f3afbb5fa8d38cf\`; \`src/data/site.json\` blob \`59633c70cffaca51b4d70556e6f5440a3e149883\`.
- Cloudflare Production remains on \`main\` commit \`bab89d7eb14a356dbc194557492fc8de6e980c67\`, deployment ID \`ed9365c0-1778-4e4e-aa5b-5510d56074cd\`, status successful. No Production deployment or configuration modification was made.
- Pages settings remain root \`/\`, build command \`npm run build\`, output directory \`dist/\`, production branch \`main\`, Preview deployments enabled for all branches.
- \`dist/_headers\` is generated branch-specifically and Cloudflare accepted its three rules. No \`_redirects\` file is required or generated.

### Current status
- Preview sitemap endpoint and robots/indexing isolation: **LIVE VERIFIED**.
- Production indexing: **still disabled/protected**; implementation is prepared on development branch, not activated in Production.
- Sitemap currently empty by design because no content page is yet eligible. Future page families enter only after physical HTML generation with explicit \`index, follow\` and an exact self-canonical URL on the production origin.
- Production sitemap rollout and indexing switch remain release-gated; no merge, Production deployment, image integration or Chat 3 work was performed.

## 10. Corrected branch-tree and final Pages deployment verification (2026-11-15)

- A documentation update was initially prepared from an older tree base and unintentionally reverted the sitemap implementation in the development branch. This was detected by reading the branch tree and corrected with commit `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e`, based on the then-current branch tree. The sitemap module, build/check integration, launch gate and package script are present again at this verified branch head.
- Sitemap implementation restoration commit: `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e` (subsequently followed by documentation-only commits).
- Successful Preview for the implementation restoration: deployment `be4fe7a5-dc3f-48cb-b2ce-2d0bbc479696`; branch `development/homepage`; source SHA `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e`; branch alias `https://development-homepage.travelguide-9op.pages.dev/`.
- The final Preview build log ran `npm run build` with `node scripts/build.mjs && node scripts/check.mjs`. It reported an empty `urlset` (0 eligible URLs) and passed all automated HTML, canonical, robots policy, X-Robots, MIME, asset, sitemap membership, protected-empty-sitemap and chunking checks. Cloudflare parsed the three static header rules and deployment completed successfully.
- After the corrected generator was deployed, the live alias `/sitemap.xml` returned HTTP `200`, `application/xml; charset=utf-8`, and `X-Robots-Tag: noindex, nofollow`. The parsed XML source was a valid sitemap namespace `urlset`, contained actual newline characters (not literal `\\n` sequences), and contained zero `<url>` items.
- Preview homepage, robots.txt and canonical results were live-verified against the immediately preceding Preview deployment with the same implementation: homepage HTTP 200, robots meta and X-Robots noindex, production canonical and og:url; robots HTTP 200 with `Allow: /`, no `Sitemap:` directive and X-Robots noindex. The corrected final deployment build log independently passed those same source/output checks. A repeated live homepage scrape after the final deployment was rate limited; no new HTTP status is claimed for that repeat.
- Production deployment remains `main` commit `bab89d7eb14a356dbc194557492fc8de6e980c67`; no main/research branch writes, production deploy, Pages configuration change, merge, image integration or Chat 3 work occurred.
## 11. Final documentation-only branch/deployment identity (2026-11-15)

- Latest branch head after the verification documentation commits: `4f2569a9400b42850b680d9bb354d719d0e48552` (documentation-only changes following implementation commit `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e`).
- Preview deployment for the latest branch head: `bc81f2e0-4d84-4e59-947c-e291bd8103ba`; status successful; source SHA `4f2569a9400b42850b680d9bb354d719d0e48552`; branch alias `https://development-homepage.travelguide-9op.pages.dev/`.
- Final live homepage scrape on that alias returned HTTP 200 with `X-Robots-Tag: noindex, nofollow`; robots meta was `noindex, nofollow`; canonical and og:url were both the production origin. The live sitemap was already rechecked on the same implementation and returned HTTP 200 with valid empty XML and noindex header.