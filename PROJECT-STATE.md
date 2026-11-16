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
- Historical Phase 2.6 inventory (before the Phase 2.7 route implementation): one real content document, dist/index.html, plus non-indexable dist/404.html. **Superseded by Phase 2.7, Section 14 below:** the current development/homepage source now contains 37 unique page records and the build generator emits 37 separate route documents in addition to the homepage and 404 page.
- The architecture sitemap remains a future URL plan; only generated physical HTML with an eligible canonical/index directive enters the sitemap.

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
## 12. Phase 2.7 — Production-mode build and SEO regression verification (2026-11-15)

### Environment and scope
- Working branch at the end of Phase 2.7 verification: `development/homepage`, commit `d40712463c4c9e35a39b2be3c0add36b27eee8da`.
- A local workstation clone/build could not be started because the container could not resolve `github.com` (DNS/network error). No claim is made that a local workstation `npm run build` was executed.
- As an equivalent code-path simulation, the Cloudflare Pages Preview build ran `scripts/test-production-build.mjs`. This spawns the actual `scripts/build.mjs` and `scripts/check.mjs` with `CF_PAGES_BRANCH=main` and a unique temporary output directory. The temporary output is removed in `finally`; the normal Preview build then runs into `dist/`.
- Cloudflare Pages runtime used Node.js 22.23.4 and npm 10.9.9. Config inspected: root `/`, command `npm run build`, output `dist/`, production branch `main`, Preview branches `all`.

### Production-mode simulation results
- [PASS] `productionIndexingEnabled` remains `false`.
- [PASS] `CF_PAGES_BRANCH=main` selects Production build branch behavior while the launch gate remains off.
- [PASS] Production-mode HTML robots meta remains `noindex, nofollow`.
- [PASS] Production-mode `robots.txt` contains `User-agent: *` and `Disallow: /`; it does not add `Allow:` or a premature `Sitemap:` directive.
- [PASS] Production-mode `_headers` contains `X-Robots-Tag: noindex, nofollow` and XML/text MIME rules.
- [PASS] Production-mode canonical points to configured production origin.
- [PASS] Production-mode `sitemap.xml` parses as valid XML `urlset` with zero URLs while indexing is disabled.
- [PASS] Production-mode generated-output checker completed successfully; temporary output is cleaned after the test.

### Preview/build and source checks
- Cloudflare Preview deployment for commit `d40712463c4c9e35a39b2be3c0add36b27eee8da`: deployment `14e391ff-a24e-4900-810b-02b795ef33bc`, status `success`, alias `https://development-homepage.travelguide-9op.pages.dev/`.
- The Preview build ran the Production simulation first, then generated normal Preview output and executed `scripts/check.mjs`; the Cloudflare build log reports all test assertions passing.
- [PASS] JavaScript syntax check via Node `--check` on `src/assets/js/site.js`.
- [PASS] CSS structural integrity check (balanced braces, parentheses, brackets, strings and comments). This is a structural check, not a full standards-complete CSS parser/linter.
- [PASS] HTML image tags have nonempty alt attributes and positive width/height dimensions; all 11 current local WebP image references exist in generated output.
- [PASS] HTML document structure checks: doctype, one H1, main landmark, title/description, search forms, at least 8 sections, skip link, mobile navigation and unique IDs.
- [PASS] No local CSS `url()` asset references currently require resolution; remote fonts are linked in the HTML head.
- [PASS] Sitemap XML validation, canonical membership, empty sitemap under noindex policy, and sitemap-index chunking fixture.
- [PASS] Cloudflare parsed three `_headers` rules and deployed the Preview successfully.

### Browser and HTTP coverage / limitations
- A Cloudflare Browser Rendering scrape of the Preview homepage returned HTTP 200 and a browser-parsed HTML document with the expected rendered content, robots meta `noindex, nofollow`, canonical `https://travelguide-9op.pages.dev/` and `og:url` on the production origin. The response header in the scrape was `X-Robots-Tag: noindex, nofollow`.
- The browser scraping endpoint did not execute the attempted injected validation script (the inserted probe element was absent); therefore interactive menu/search/mobile navigation runtime behavior and browser console/page errors were not certified by this Phase 2.7 run.
- A repeat live scrape of Preview homepage and sitemap after the latest checker-only changes was rate-limited by Cloudflare (HTTP 429). The latest build log still passed the Preview SEO output tests; the previous Phase 2.6 live endpoint checks had verified robots.txt/sitemap HTTP 200, MIME and noindex headers, but they are not described as a fresh endpoint request for this exact SHA.
- No W3C HTML validator or full CSS standards parser/linter ran in this environment.

### Production isolation
- `main` branch remains `bab89d7eb14a356dbc194557492fc8de6e980c67`; production deployment remains `ed9365c0-1778-4e4e-aa5b-5510d56074cd` on that SHA.
- Research branch remains `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.
- Cloudflare Production branch remains `main`; build configuration remains unchanged. No Production deployment, branch merge, image change or research-branch write occurred.

### Phase 2.7 disposition
- Production-mode build simulation and automated SEO/source regression checks: **PASS in Cloudflare Preview build environment**.
- Local workstation build: **NOT RUN** because the execution environment could not resolve GitHub DNS.
- Latest Preview homepage and robots.txt were live-rechecked: both HTTP 200; homepage response has `X-Robots-Tag: noindex, nofollow`, robots meta is `noindex, nofollow`, canonical and og:url resolve to production origin, and a real browser-parsed `main` landmark was found. robots.txt returns `text/plain`, `User-agent: *`, `Allow: /`, no Sitemap directive and response `X-Robots-Tag: noindex, nofollow`.
- Latest live `/sitemap.xml` recheck was rate-limited by Cloudflare (HTTP 429). Its generated XML was validated in the same successful Cloudflare build (valid empty urlset, zero URLs, expected MIME header rule); Phase 2.6 previously verified the live sitemap endpoint at HTTP 200. Recheck against the newest Preview endpoint remains pending.
- Full browser JavaScript runtime/interaction error capture remains pending: the browser scraping endpoint ignored the injected validation script. Node syntax validation is passing, but this does not certify runtime behavior.
- Phase 2.7 is therefore **PARTIALLY VERIFIED, NOT FULLY CLOSED**. Keep Production indexing disabled and do not start image integration or Chat 3 until the remaining checks are completed or explicitly accepted as limitations.
### Live Preview endpoint follow-up (after Phase 2.7 code commit)
- Preview alias homepage: live HTTP 200, `text/html; charset=utf-8`, `X-Robots-Tag: noindex, nofollow`; browser scrape found meta robots `noindex, nofollow`, canonical and `og:url` both `https://travelguide-9op.pages.dev/`, and the `<main id="main">` landmark.
- Preview alias robots.txt: live HTTP 200, `text/plain; charset=utf-8`, response `X-Robots-Tag: noindex, nofollow`; body directives `User-agent: *` and `Allow: /`, with no `Sitemap:` directive.
- A fresh `/sitemap.xml` fetch after the preceding live checks was rate-limited (HTTP 429). Sitemap generation and XML validation passed in the successful Preview build log; the prior Phase 2.6 live check recorded HTTP 200 and valid XML. Do not claim a fresh HTTP status for the latest endpoint request.
### Final Phase 2.7 sitemap endpoint result
- Current Preview alias `/sitemap.xml`: HTTP 200; Content-Type `application/xml; charset=utf-8`; X-Robots-Tag `noindex, nofollow`; valid empty `urlset` in the sitemap namespace; zero URL entries. This verifies that Preview does not expose Production or Preview URLs in its sitemap.
## 13. Phase 2.7 — Remaining DNS, browser, standards and accessibility verification (2026-11-15)

### DNS diagnosis and offline dependency feasibility
- Exact local Git fetch error: `fatal: unable to access 'https://github.com/prem-pk-dev/TravelGuide.git/': Could not resolve host: github.com`.
- `getent ahosts github.com` returned no address records. This is a DNS name-resolution failure in the execution container, before Git can connect to GitHub; it is not an npm build or application compilation error.
- Local environment: Node.js `v22.16.0`, npm `10.9.2`; no repository checkout was present at `/` or `/mnt/data`, no `node_modules/`, and no package lockfile was present in the working environment.
- Current development branch `package.json` has only `build`, `check` and `test:production` scripts; it declares no `dependencies` or `devDependencies`. GitHub branch tree inspection found no `package-lock.json`, `npm-shrinkwrap.json` or alternate npm lockfile.
- `npm cache verify` found 0 verified content bytes and 0 index entries. A disposable temp-directory test of `npm install --offline --ignore-scripts --no-audit --no-fund` with an empty package manifest succeeded (`up to date`), demonstrating the dependency install portion is offline-feasible because the project declares no external npm dependencies.
- A complete local `npm run build` was NOT run: the actual repository source tree could not be cloned or mounted because of the DNS failure. Do not interpret the disposable npm install test as a complete site build.
- Cloudflare Pages' actual build environment did run the project `npm run build` successfully on latest code commit `b9296bb389373323a22fcc1af6b3d31fbfe14be9`; it uses Node `22.23.4` / npm `10.9.9` and performed the isolated production-mode simulation plus the normal preview build/check.

### Actual browser runtime and interactions
- Browser Rendering opened the Preview homepage at 1440x960 (HTTP 200). During injected interaction tests, no `window.error`, `console.error` or `unhandledrejection` events were observed. This listener is attached after page scripts have initialized; first-load console capture before injection is not certified.
- Desktop: mega-menu open/toggle-close, Escape dismissal, header-search open/Escape close, Kyoto search suggestions, skip-link focus and search-input focus all passed.
- Mobile 390x844: mobile menu opened, focus moved to Close, Escape closed the menu and restored focus to the toggle, close button worked, header search opened/focused its input and Escape closed it, Kyoto hero-search suggestion appeared, and skip link received focus. Axe scan also ran at this viewport.
- 390px after responsive fix: all 11 image elements decoded successfully after scrolling through the full document; each image had `complete=true` and positive natural dimensions; no failed image remained.
- 768x1024 (tablet) latest preview: document/body width `768px`, no horizontal overflow; continent grid width/scrollWidth `720/720px`, three columns of approximately `231px`; mobile navigation, Escape close and focus restoration passed.
- 360x800 and 390x844 after the responsive correction: document/body widths equal viewport, and continent grid scrollWidth equals clientWidth. At 360px grid width is 324px, tile widths `158,158,158,158,324`; at 390px grid width is 351px, tile widths `171,171,171,171,351`.
- 1440px desktop: document width equals viewport width (1440), no horizontal overflow.
- Resource/network diagnostics are not a complete HAR capture. A bulk concurrent internal-link check once caused Browser Rendering `422 Network connection closed`; sequential same-origin route probes later completed for 37 unique hrefs. Browser page errors during tested interactions were empty, but a full browser-network failure log and initial-load console capture remain limitations.

### Internal route regression — FAILED
- Browser-rendered homepage links were extracted and 37 unique root-relative paths were probed sequentially with same-origin HEAD requests.
- Result: 0 of 37 returned success; all 37 returned HTTP 404 on the Preview alias. The `/destinations/` path was independently verified with a browser navigation as HTTP 404 and title `Page not found | TravelGuide`.
- The failed set includes `/about/`, `/destinations/`, `/itineraries/`, `/articles/`, `/travel-styles/` plus their linked children, `/travel-tips/` and children, `/resources/`, `/things-to-do/` and children, `/editorial-policy/`, `/privacy/` and `/contact/`.
- Source/build inspection confirms why: the current static build writes homepage `dist/index.html`, local assets, robots and headers plus `404.html`; it does not yet generate physical HTML files for destination, itinerary, article, about, travel tips, resources, things-to-do, privacy or contact route families.
- Do not create contentless placeholder pages or invent route content as part of this verification task. Route-page implementation is a material blocker and needs real page-family development / content before these links can be called fixed.

### Standards validation
- W3C Nu HTML Checker against the latest Preview URL returned HTTP 200; checker version `26.11.14`; JSON response contained `messages: []` (no reported HTML errors or warnings).
- W3C CSS Validator against latest Preview `assets/css/site.css`, CSS3 profile: HTTP 200, `x-w3c-validator-status: Valid`, `x-w3c-validator-errors: 0`; it reports “This document validates as CSS level 3”.
- The initial CSS3 run reported three SVG presentation-property errors (`fill`, `stroke`, `stroke-width`) on `.icon-button svg`. The declarations were moved from CSS into the inline SVG elements in the build source; the stylesheet rule now only controls dimensions. Revalidation passed with zero errors.
- CSS Validator still reports 20 warnings: dynamic CSS variables not statically checked, vendor extension `-webkit-font-smoothing`, `overflow-x: clip` marked deprecated by that validator, and `::-webkit-details-marker` vendor extension. Warnings are recorded; zero-error validation is not the same as warning-free.
- The automated build check's CSS delimiter/string/comment balance check is supplemental; the W3C CSS3 validation is the standards parser result.

### Accessibility audit — FAILED
- axe-core `4.10.3` ran in Browser Rendering at 390x844 for WCAG 2 A/AA, WCAG 2.1 A/AA and best-practice tags.
- Result: 38 rules passed, 1 incomplete, 1 violation. The violation is `color-contrast`, impact `serious`, with 36 affected nodes.
- Examples include brand rust `#b66f50` on paper `#f5f3ed` at 3.51:1 (expected 4.5:1), muted `#68736e` on paper at 4.43:1 (expected 4.5:1), rust on intro background `#e9e8de` at 3.17:1 and muted text on that background at 3.99:1.
- Keyboard focus and major menu/search Escape behavior were exercised and passed. This does not certify a complete sequential tab-order, screen-reader or manual WCAG audit.
- No brand colour palette changes were made. Contrast corrections remain open because they affect established brand styling and require a considered design decision.

### Final live Preview SEO regression
- Latest Preview homepage: HTTP 200; response header `X-Robots-Tag: noindex, nofollow`; latest browser page includes robots meta `noindex, nofollow` and production canonical / og:url.
- Latest Preview `/robots.txt`: HTTP 200, `text/plain; charset=utf-8`, response X-Robots noindex; body `User-agent: *` and `Allow: /`; no `Sitemap:` directive.
- Latest Preview `/sitemap.xml`: HTTP 200, `application/xml; charset=utf-8`, response X-Robots noindex; valid sitemap-namespace empty `urlset`, zero `<url>` entries.
- Production-indexing flag remains false; isolated `CF_PAGES_BRANCH=main` simulation confirmed `Disallow: /`, no Allow/Sitemap directives, noindex meta/header and valid empty sitemap. Production deployment remains unchanged.

### Latest code and deployment identity at this verification point
- Code head: `b9296bb389373323a22fcc1af6b3d31fbfe14be9` on `development/homepage`.
- Latest successful Preview deployment: `6795fed9-3f5b-4708-87ac-f21721e126b0`, source SHA matches code head, alias `https://development-homepage.travelguide-9op.pages.dev/`.
- `main` unchanged at `bab89d7eb14a356dbc194557492fc8de6e980c67`; research branch unchanged at `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.
- Cloudflare settings unchanged: production branch `main`, root `/`, command `npm run build`, output `dist/`, Preview branches `all`; no Production deployment, merge or indexing enablement.

### Phase 2.7 final disposition
- Production-mode simulation / Cloudflare build: **PASS**.
- Latest Preview robots, X-Robots, canonical, sitemap live responses: **PASS**.
- W3C Nu HTML and W3C CSS3 validation (zero errors): **PASS**.
- Desktop and mobile interaction checks; image decode on mobile; 360/390/768/1440 responsive horizontal-overflow checks: **PASS**, with the CSS mobile tile correction included.
- Internal homepage routes: **historical pre-generation failure — 37/37 HTTP 404; superseded by Phase 2.7 Section 14, where the generated routes were live-checked at 37/37 HTTP 200**.
- Accessibility: **historical pre-remediation failure — 36 serious colour-contrast nodes; superseded by Phase 2.7 Section 14, where axe-core reported 0 violations and 1 incomplete item. Full manual assistive-technology review remains pending.**
- Local workstation full build: **NOT RUN** due local GitHub DNS failure and absent checkout. Offline dependency install is feasible, but not a full offline build.
- Full HAR/network request report, initial-load console capture, full tab sequence/screen-reader audit and CSS warning cleanup remain incomplete.
- Therefore Phase 2.7 is **PARTIALLY VERIFIED — NOT COMPLETE**. Phase 2.8 image integration and Chat 3 are not started.
### Documentation tree correction (2026-11-15)
- The documentation commit `ea6e20aa20250bb6f2ef8934bce9498fa1c12e15` was accidentally created without the existing base tree. Cloudflare Preview build consequently failed with `npm error code ENOENT` at `/opt/buildhome/repo/package.json`.
- This was a Git tree construction error, not an application/package build regression. The corrective commit reapplies these verification documents on top of the complete source tree from code commit `b9296bb389373323a22fcc1af6b3d31fbfe14be9`; all existing source, package and asset files are retained.
- Preview build for the corrective commit must be verified before it is considered the latest deployed revision. Production and research branches remain untouched.
## 14. Phase 2.7 follow-up — 37 static page route recovery and accessibility repair (2026-11-15)

### Page-family inventory and original 404 cause
- Previous failing homepage links resolved to named destinations/content URLs, but the static build generator emitted only the homepage, assets and a 404 document. No JSON page records, page-family HTML template or physical nested index.html documents existed for those routes; this was a source-generation gap, not a browser SPA-routing issue.
- Added a JSON-driven page record system: src/data/pages.json contains 37 unique records. One shared semantic template renders separate static HTML documents at each canonical route; no client-side route interception or placeholder HTML is used.
- Content records have unique titles, descriptions, headings and paragraphs. Duplicate-content audit found zero duplicate page titles, zero duplicate descriptions, zero duplicate section headings and zero repeated section paragraphs.
- Every record has a valid parent path or root parent. Build validates parent existence and detects parent cycles while rendering breadcrumbs. Internal card links are checked against generated routes; sitemap crawler walks nested HTML documents.
- Page output count is 39 HTML documents: homepage + 37 page routes + static 404 page. Preview sitemap is valid empty urlset because preview pages remain noindex; Production indexing is still disabled.

### 37-route classification
- Geographic: 1 destination directory, 5 continent guides, 4 country guides, 3 city guides (13 routes total). No region or individual attraction route was linked from the homepage inventory; none was fabricated.
- Itinerary: 1 index + 2 detail routes (3).
- Editorial: 1 article index + 3 article routes (4).
- Other linked pages: 1 travel-style index + 4 styles (5); 1 tips index + 3 tips (4); 1 things-to-do index + 2 place collections (3); 1 resource directory; About (1); editorial policy + privacy (2); Contact (1). Total 17.
- Each generated page includes a page-specific title, description, self-canonical on the configured production origin, noindex on preview, a single H1, breadcrumb, shared header/footer, original sections and related internal links. Official source links are preserved in records for destination-specific assertions.
- Route-to-file pattern: /example/path/ → dist/example/path/index.html.

### Build and actual route verification
- Cloudflare Pages Preview build succeeded at code commit bb7a74687069141e58ad8baf193805915aff6e76; deployment id 1043fd4e-4f46-466d-aace-493ff82829b8; alias https://development-homepage.travelguide-9op.pages.dev/.
- Cloudflare build logs confirmed 37 page files generated, 37 route records, page self-canonical/robots/H1/breadcrumb checks, all root-relative internal HTML hrefs resolving to physical files, sitemap membership/protected-empty checks and production-mode indexing-protection simulation.
- Actual Chromium Preview GET check on all 37 distinct page paths: 37/37 HTTP 200. Every result had a unique title, expected production canonical, noindex, nofollow meta, description, breadcrumb, exactly one H1 and non-empty page sections.
- Source-data audit: 37 unique titles and descriptions; no repeated section headings or paragraphs.
- JavaScript startup instrumentation (injected before source page scripts) and interactive browser tests at 360, 390, 768, 1024 and 1440px found no page errors, console errors surfaced by the instrumentation, or unhandled rejections.
- Mobile (360/390/768): menu opens, focus moves to close control, Escape closes and restores focus; header search opens, receives focus, and Escape closes/restores focus; hero search returns Kyoto suggestion.
- Desktop (1024/1440): mega-menu opens/closes; header search and Escape behavior pass; hero search suggestion works; logo, nav and header actions do not overlap.

### Responsive verification
- Homepage and Kyoto city content template rendered in isolated browser iframes at 360, 390, 768, 1024 and 1440 CSS pixels.
- At all 10 page/viewport combinations, document and body scroll widths equalled viewport width; no horizontal overflow. Continent grid and page-card grid scroll widths equalled their client widths. Footer remained within the content container.
- Homepage continent layout: 2 columns at 360/390; 3 columns at 768/1024; 5 columns at 1440.
- Content-card layout: 1 column at 360/390; 2 columns at 768/1024/1440.
- Navigation: mobile toggle at 360/390/768; desktop nav at 1024/1440.
- Hero image element decoded with natural width 1672px and was constrained to viewport width.

### Contrast remediation and audit
- Light-background muted text token changed to #58645e; warm terracotta brand token changed to deeper #8f4b32 while preserving the warm-rust identity.
- Dark footer uses separate lighter terracotta #e5b18f and muted #d9e0d7 tokens so the wordmark and eyebrow text remain legible on dark green.
- Logo tagline now uses the correct light-surface muted token; dark logo tagline has a dedicated muted-on-dark override.
- Focus-visible indicator is now a two-tone forest outline and paper outer ring so it remains visible on light and dark surfaces.
- Contrast calculation across previous failing surface pairs: terracotta foreground now measures 5.25:1–6.52:1; muted foreground 4.97:1–5.57:1; dark-footer rust 7.89:1. Primary button white on forest 12.47:1 and white on forest hover 8.87:1.
- axe-core 4.10.3 against the live Preview homepage at 390px, WCAG 2.0 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA and best-practice tags: 39 rules passed, 0 violations, 1 incomplete. Previous 36 serious contrast nodes are no longer reported. Full manual assistive-technology audit remains a separate release gate.

### Remaining caveats / release gates
- The local workstation full npm build still has not been independently run because the local repository checkout was unavailable due DNS resolution failure. Cloudflare actual full build is successful.
- This pass does not include a complete manual screen-reader audit, user testing, or full cross-browser matrix (only the Chromium Browser Rendering engine was exercised).
- CSS structure check passes in the build. Do not claim the latest branch stylesheet was re-run through W3C CSS Validator in this pass; the previous Phase 2.7 CSS validation had zero errors and warnings, but this updated token/focus stylesheet needs a fresh standards-validator check if required for release.
- The 37 static pages are now physically available, but review factual editorial scope and time-sensitive information before any future Production indexing approval.
- Phase 2.8 image integration, Phase 2.9 final responsive/accessibility QA, Phase 2.10 final homepage review and Chat 3 handoff have not started.
- No image binaries/references changed. No merge, Production deployment or main/research branch update was performed.
- Latest committed SHA for this record will be the documentation/validation follow-up commit created after this entry.

## 15. Phase 2.8 — homepage image integration audit (2026-11-15)

### Scope and source inventory
- Audited src/data/homepage.json, HOMEPAGE-ASSET-SPECIFICATION.md, mapping/review documents, TravelGuide local image binaries and private prem-pk-dev/MEDIA-ASSETS main inventory.
- MEDIA-ASSETS metadata has 91 records and its main tree has 111 WebP files. Its Pages project media-assets is on production branch main; the latest source deployment inspected was successful at SHA 2742502ae5f887f6d20da53a09732c3315c3dce9.
- Nine unique current TravelGuide image binaries were compared by Git blob SHA with original MEDIA-ASSETS source files; the corresponding hashes match exactly. No image was recompressed, resized or otherwise modified during this pass.
- MEDIA-ASSETS metadata identifies selected assets as AI-generated illustrative artwork, not documentary photography. Destination depictions must not be described as verified on-location documentary photographs.
- Public CDN probes for all nine current unique sources returned HTTP 200, Content-Type image/webp, RIFF/WEBP signatures and positive decoded dimensions.

### Verified source asset inventory
1. amalfi-coast-village-v01.webp — 1672×941, 446,770 bytes — Amalfi cliffside village, road, headland and turquoise Mediterranean sea. Used by hero and seasonal coast (approved duplicate).
2. kyoto-bamboo-garden-v01.webp — 1672×941, 482,514 bytes — bamboo garden path and wooden gate. Used by Asia and Kyoto feature/mega menu (approved duplicate; alt text now says bamboo garden, not machiya street).
3. santorini-caldera-sunset-v01.webp — 1672×941, 306,350 bytes — Santorini white buildings, blue domes and caldera at sunset.
4. serengeti-elephant-safari-sunrise-v01.webp — 1672×941, 324,842 bytes — elephant herd and acacia savannah at sunrise.
5. 06-machu-picchu-peru-v01.webp — 900×512, 65,752 bytes — Inca citadel and Andean peaks; this is the actual source for americas.webp. An earlier provisional mapping that described the Americas binary as an alpine glacial lake was incorrect.
6. tropical_white_sand_beach.webp — 1200×800, 71,238 bytes — generic palm-lined tropical beach; no evidence establishes a South Pacific island. It is a fallback visual, not approved as a geographically specific Oceania image.
7. 23-lisbon-portugal-v01.webp — 900×510, 70,556 bytes — yellow Lisbon tram in a tiled street.
8. alpine_wildflower_meadow.webp — 1200×800, 112,872 bytes — alpine wildflower meadow below snowy peaks; no hiking trail or hiker is visible. It is an outdoor-landscape fallback, not an approved alpine-hiking/Swiss-trail replacement.
9. general-coffee-lifestyle.webp — 519×442, 22,716 bytes — latte on a café table; suitable for the café editorial card when described literally.

### 22-slot audit result
- Existing image placements that are currently visually relevant and approved/conditional for integration: 9 (hero coast, Asia, Europe, Africa, Americas, Kyoto garden, Lisbon tram, seasonal coast and neighbourhood café).
- Distinct source binaries behind those placements: 7. Reuse assignments: Amalfi source used by hero + seasonal coast; Kyoto bamboo source used by Asia + Kyoto feature. These repeats are explicitly authorised.
- Existing but unapproved fallback images: 2 (generic tropical beach for Oceania, alpine meadow for hiking).
- Missing exact source files: 11 (Marrakech courtyard, slow train, ceramic workshop, Portugal coast, Japan rail, Marrakech medina, Swiss trail, market morning, calendar planning, train platform, travel bag). No irrelevant substitute was promoted to an approved image.
- No new image was generated in this pass.

### Browser and loading verification
- Current Preview homepage's 11 rendered image elements all returned HTTP 200, image/webp, RIFF/WEBP and loaded with positive natural dimensions.
- Nine unique CDN source files returned HTTP 200 with correct WebP MIME and decoded dimensions.
- Known thumbnails/travel-mountain-hiker.webp still returns HTTP 200 with text/html, not WebP; rejected.
- Hero uses fetchpriority=high, eager loading and async decoding. Below-the-fold homepage images use lazy loading.
- Manifest and build markup now use actual native source dimensions for existing images rather than fictional target dimensions. Africa tile can use a data-driven object-position to keep the herd within its crop.
- Responsive crop acceptance across all 22 slots has not passed; missing slots remain unresolved.

### Status
- Phase 2.8: IN PROGRESS — PARTIALLY VERIFIED. Do not declare the full image phase complete.
- No new binaries added; existing originals retained unchanged. Phase 2.9, Phase 2.10 and Chat 3 have not started.
- No main/research change, merge or Production deployment.

## 16. Phase 2.8 — current Preview crop verification and final slot counts (2026-11-15)

- Latest manifest/mapping commit before this documentation entry: 63e394dcdc3aea749fca550b502111eddbd9ee96.
- Cloudflare Preview deployment: e788e02e-f77e-4da9-9a87-c5e547cc92e4; status success; branch development/homepage; deployed source SHA matches 63e394dcdc3aea749fca550b502111eddbd9ee96.
- Actual live browser crop probe checked 12 DOM image uses at each of 360, 390, 768, 1024 and 1440 CSS pixels (60 use/viewport observations). All 60 uses decoded with positive natural dimensions; no image element overflow or document/body horizontal overflow was observed.
- Hero remains 1672×941 intrinsic, object-fit cover; mobile 360/390 render 360×690 / 390×690, object-position 62% 50%; tablet/desktop position 50% 52%. Africa tile now object-position 80% 50% to retain herd in portrait crop.
- 11 distinct local image path names are referenced by the homepage build. They represent 9 unique source binaries; Amalfi and Kyoto bamboo are the two approved reuse groups. Browser DOM currently contains 12 image uses because the Kyoto mega menu repeats the Kyoto featured image.
- CDN: all 9 unique current source URLs were verified HTTP 200 / image/webp / RIFF-WEBP / positive decoded dimensions. Current source files are already in TravelGuide and their Git blob identities match MEDIA-ASSETS originals; no binaries were added/modified.
- Slot disposition: 9 visually relevant/integrated placements; 2 fallback-only visuals (Oceania generic tropical beach and alpine meadow without a trail/hiker); 11 exact subjects not sourced yet. Reuse groups: 2. Unique CDN WebP source binaries verified: 9 (7 used for relevant placements; 2 fallback only). Current local image path refs: 11.
- The 22-slot mapping and subject/HTTP/MIME/dimension/crop notes are recorded in HOMEPAGE-ASSET-MAPPING.md and HOMEPAGE-ASSET-REVIEW.md. Do not count fallback or missing assets as accepted images.
- Phase 2.8 remains **PARTIALLY VERIFIED — NOT COMPLETE**. Image-source discovery/integration remains open for Oceania, Marrakech courtyard, slow train, alpine hiking, ceramic workshop, Portugal coast, Japan rail, Marrakech medina, Swiss trail, market morning, calendar planning, train platform and travel bag.
- Phase 2.9, Phase 2.10 and Chat 3 have not started. No image-generation operation, binary replacement, main/research change, merge or Production deployment occurred.
- Branch protection snapshot: main remains bab89d7eb14a356dbc194557492fc8de6e980c67; research/travel-guide-blueprint remains 4e047f49cfac870d17a0347d60c2d1025f62dfd8.

## 17. Phase 2.8 — Round 2 missing-image resolution (2026-11-15)

- Completed source search for both fallback slots and all 11 missing image slots.
- Replaced Oceania generic beach with Bora Bora ridge/lagoon photo; replaced alpine meadow with Matterhorn hikers photo.
- Twelve unique new camera-photo WebP derivatives were produced for thirteen placements; Matterhorn image is shared between Alpine Hiking and Swiss Trail under the user's reuse permission.
- All 12 original JPEG downloads returned HTTP 200 / image/jpeg and were decoded at native dimensions. Outputs were encoded as WebP quality 85 at target dimensions, checked for RIFF/WEBP signature, and source/output SHA-256 values recorded.
- Source creators, licence terms and links are in HOMEPAGE-PHOTO-CREDITS.md; file-level hashes/dimensions are in HOMEPAGE-ASSET-MAPPING.md.
- The old alpine-meadow.webp fallback was removed; the generic tropical beach is no longer used.
- Round 2 placement resolution: 13/13. New unique photographic WebP binaries: 12. The revised homepage uses 19 unique WebP binaries: 12 new camera-photo derivatives and seven older legacy AI-artwork binaries. Reuse groups: 3.
- **Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE.** Nine earlier placements still use seven AI-generated MEDIA-ASSETS images and several differ from the original image subject brief. They are not represented as documentary photographs. Phase 2.9 remains unstarted.
- No main/research mutation, merge or Production deployment.


## 18. Phase 2.8 — Round 3 independent repository and binary audit (2026-11-15)

### Repository identity
- Audited current `development/homepage` tip before this documentation update: `aec0cada4741b4941a928672db6bea3dba73e0d2`; tree `d49868c89e78e0f78112961b9bba889bd55fd1ce`.
- `main` remains `bab89d7eb14a356dbc194557492fc8de6e980c67`; GitHub compare reports development 36 commits ahead and 1 behind main, with merge base `8223a82f3d0a4b21c9edbb8c64a8a55ed7569d41`.
- `research/travel-guide-blueprint` remains `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.
- No merge, production deployment, or mutation to main/research was performed.

### Current image inventory
- The development tree contains the 22 slot assignments, represented by 21 image path names and 19 unique binary identities.
- The three reuse groups remain Amalfi hero/seasonal coast, Kyoto bamboo Asia/Kyoto feature, and Matterhorn hikers Alpine Hiking/Swiss Trail.
- Twelve Round 2 camera-photo WebP derivative files are present in TravelGuide. Their current GitHub tree byte sizes match the derivative byte lengths recorded in HOMEPAGE-ASSET-MAPPING.md.
- The previously recorded 12 source URLs, creator names, licence references, source dimensions and source/output SHA-256 values remain documented in HOMEPAGE-ASSET-MAPPING.md and HOMEPAGE-PHOTO-CREDITS.md.

### Binary and CDN limitations found in Round 3
- No original JPEG master files were found in the current TravelGuide image tree or the inspected MEDIA-ASSETS image tree.
- The MEDIA-ASSETS repository was inspected at main commit `4531d94979224daa5a3f0a6b25244e02655708e0`, tree `e9b43b0d7bf7087c4d49b3a35cbef4b532c798a7`. Its 111 tracked image files are WebP; none of the 12 Round 2 derivative basenames is present.
- The Round 2 derivatives are present in TravelGuide, but the current project documents do not register exact MEDIA-ASSETS CDN destination paths for them. CDN delivery is therefore not verified.
- The binary bodies could not be retrieved in the available execution environment. External DNS resolution failed in the local file runtime, and the connected GitHub text reader rejected binary blobs. The Round 2 source/output SHA-256 values, MIME, RIFF/WEBP signatures, decoded dimensions, WebP quality 85 and derivative desktop/mobile crops were not independently reproduced in this audit.
- Recorded source pages and creator/licence metadata were reviewed; page-level rights evidence does not replace binary verification.

### Round 3 disposition
- Repository/branch/commit/tree audit: complete.
- 22 slot assignments and reuse inventory: verified.
- Twelve Round 2 WebP repository presences and byte lengths: verified.
- Original master acquisition and independently reproduced source/output hashes: blocked.
- Independently decoded binary format/MIME/dimensions and derivative crop review: blocked.
- MEDIA-ASSETS registration and CDN delivery of the 12 Round 2 derivatives: unverified.
- Nine legacy AI-artwork placements remain subject to editorial/spec approval or replacement.

**Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE.** Phase 2.9, Phase 2.10 and Chat 3 remain pending. No image binary or homepage code was changed; no MEDIA-ASSETS mutation, branch merge or production deployment was performed.

## 19. Phase 2.8 — Round 4 asset recovery and legacy artwork audit (2026-11-15)

### Repository inventory
- Round 4 started from `development/homepage` at `c040d7648f99237698730f1f425a2e8565e102fc`.
- TravelGuide branches at audit: `development/homepage` `c040d7648f99237698730f1f425a2e8565e102fc`; `development/responsive-fixes` `9e4997bfb018a34da3892f63a2939e63633462d2`; `main` `bab89d7eb14a356dbc194557492fc8de6e980c67`; `research/travel-guide-blueprint` `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.
- MEDIA-ASSETS has only `main`, at `4531d94979224daa5a3f0a6b25244e02655708e0`; 111 tracked image files in the inspected tree are WebP.
- TravelGuide and MEDIA-ASSETS image directory histories, alternate paths, manifests, asset-index records, build path and relevant project documents were inspected.

### Twelve derivative files and original-master search
- Exact Round 2 derivative filenames recovered from committed docs: `oceania.webp`, `alpine-hiking.webp`, `marrakech-courtyard.webp`, `slow-train.webp`, `ceramic-workshop.webp`, `portugal-coast.webp`, `japan-rail.webp`, `marrakech-medina.webp`, `market-morning.webp`, `calendar-planning.webp`, `train-platform.webp`, `travel-bag.webp`.
- All 12 derivatives exist in TravelGuide `src/assets/images/`; none is an exact-name or identical Git blob in the inspected MEDIA-ASSETS tree.
- No original JPEG master for those 12 images was recovered from either repository or the inspected file history. Original masters recovered: **0/12**.
- The current TravelGuide tree records the existing derivative byte lengths; the earlier mapping and photo-credit tables record previous original JPEG and derivative dimensions/bytes/SHA-256. The raw source and output bodies were not independently fetched or hashed in Round 4, so those hashes/MIME/signatures/decoded dimensions/quality metadata remain prior-session documentation, not newly reproduced evidence.
- No exact MEDIA-ASSETS CDN destinations are registered for those 12 derivatives. The build script copies local image files into TravelGuide's branch preview under `/assets/images/`, but the derived preview URL could not be freshly tested for HTTP/MIME/body bytes this session.

### Nine legacy AI-artwork placements
- Nine slots still use seven unique AI-generated artwork binaries: Hero coast, Asia, Europe, Africa, Americas, Kyoto feature, Lisbon, Seasonal coast and Neighbourhood café.
- All nine were individually audited for filename/path, recorded subject, specification fit, prior visual/crop evidence, size/resolution and editorial decision in HOMEPAGE-ASSET-REVIEW.md.
- The exact seven current MEDIA-ASSETS CDN paths were identified. Round 3 had historically verified the seven unique images as successful WebP responses; Round 4 could not refresh the live network response.
- All nine fail the current genuine-photography production requirement or exact-scene brief. No editorial keep approval exists. Replacement is recommended for all nine, with distinct photographs required for Hero vs Seasonal coast and Asia vs Kyoto feature.

### Replacement sourcing
- Nine Pexels candidate source pages and contributor names are listed in HOMEPAGE-ASSET-MAPPING.md.
- Current Pexels terms permit commercial use and modifying/adapting downloaded content without mandatory attribution; the terms still require a context-specific check for model, property, privacy, trademark and other third-party rights. Optional contributor credit should be preserved in the project credit register.
- Candidate pages are not approved assets: no candidate binary was acquired, hashed, converted, crop-tested or integrated. No candidate was added to the asset credit register because none entered the project.

### Updated 22-slot disposition
- 22 slots populated; 21 unique file paths; 19 unique current binary identities.
- 12 Round 2 photographic derivatives are retained provisionally, pending independent source/derivative binary re-verification. These cover 13 slots, with the user-authorized Matterhorn image reused for Alpine Hiking and Swiss Trail.
- Nine legacy slots require photographic replacement; nine candidate leads found, zero approved.
- The two additional duplicate AI artwork groups (Amalfi Hero/Seasonal and Kyoto Asia/Featured Kyoto) are not approved final reuse groups and should be replaced with distinct scenes.
- MEDIA-ASSETS current 111-file inventory has no exact derivative basename and no identical derivative Git object.
- The current Phase 2.8 gate remains **PARTIALLY VERIFIED — NOT COMPLETE**. Phase 2.9, Phase 2.10 and Chat 3 remain pending.
- No image bytes, homepage references, HTML/CSS/JS, data manifests, Cloudflare configuration, MEDIA-ASSETS content, `main`, or research branch changed. No merge or production deployment occurred.

## 20. Phase 2.8 — Round 5 derivative binary verification and approval blockers (2026-11-15)

### Repository identity and safe boundary
- Round 5 started from development/homepage adb5dcbca937c7bbbf2ab368fdfddfc911ca0394 (tree ba0a1ed7041b15f276443dbc07a27ec4fecc14fe).
- main remained bab89d7eb14a356dbc194557492fc8de6e980c67; research/travel-guide-blueprint remained 4e047f49cfac870d17a0347d60c2d1025f62dfd8; development/responsive-fixes remained 9e4997bfb018a34da3892f63a2939e63633462d2.
- MEDIA-ASSETS main remained 4531d94979224daa5a3f0a6b25244e02655708e0. No MEDIA-ASSETS files, Cloudflare configuration or production deployment were changed.

### Round 2 derivative binary result
- Retrieved the actual 12 WebP derivative binaries from TravelGuide GitHub and independently checked base64-decoded byte streams.
- All 12 files have RIFF/WEBP signatures; each independently computed SHA-256, exact byte length and parsed pixel dimensions match the Round 2 ledger in HOMEPAGE-ASSET-MAPPING.md.
- Result: **12/12 derivative binaries verified**.
- This validates the committed derivatives, not the original JPEG source masters. The original sources were not present in the inspected current repository trees/relevant image-path history and could not be downloaded into this environment. Original masters recovered: **0/12**.
- Round2 source JPEG creator/page/license/dimensions/byte/hash fields remain recorded. Round5 did not recompute the source hashes or read the original JPEG bytes.
- The WebP quality 85 encoder parameter remains a historical conversion record; it was not independently reproduced from an encoder invocation/log in Round5.

### Visual and editorial review
- Rendered all 12 actual derivatives at native dimensions and examined their subjects. The content matches the declared image subjects in the source ledger.
- Checked actual homepage CSS crop rules analytically: desktop story cards use 4:3 and narrow cards 16:10; continent tiles use cover, with Oceania becoming a 2.4:1 row at narrow widths.
- Browser-level desktop/mobile crop screenshots and final editorial acceptance were not obtained. Specific concerns include Oceania mobile crop, vertical Marrakech courtyard crop, visible people in market/medina/ceramic/travel bag images, and visible operator/brand marks on Japan rail and LNER/AZUMA train platform images.
- No new source photo was selected or inserted. No existing image was replaced.

### Nine candidate replacement files
- The nine Pexels candidate source pages and page-level creator/subject/dimensions/license information are listed in HOMEPAGE-ASSET-MAPPING.md.
- Candidate master binaries downloaded in Round5: **0/9**. No candidate original hash, decoded file properties, crop or release review was completed. Candidate/editorial approvals: **0/9**.
- Pexels license/Terms permit commercial use and modification/adaptation without mandatory attribution, subject to restrictions including use of identifiable people and implying endorsement; page-level terms do not prove specific model/property releases. Those checks remain open.
- Nine legacy AI artwork placements remain unchanged and without formal editorial keep approval.

### CDN delivery
- The MEDIA-ASSETS tree has no registered destination paths or identical binary copies for the 12 Round2 derivative filenames.
- TravelGuide's build copies the source images into dist/assets/images. Exact build-derived Preview paths were identified, but Round5 could not verify HTTP status/MIME/response bytes: the available network fetch path returned 403 text/plain for unrelated public domains as well. This does not establish a global Pages outage.
- Exact CDN and browser delivery sign-off remains pending.

### Round 5 status
- Derivative binary integrity: **COMPLETE (12/12)**.
- Original JPEG master recovery: **BLOCKED (0/12)**.
- Candidate binary acquisition and approval: **BLOCKED/PENDING (0/9)**.
- Responsive browser crop/release review: **PENDING**.
- CDN response verification: **BLOCKED BY EXECUTION NETWORK LIMITATION**.
- The 22-slot homepage inventory remains populated, with 12 Round2 photographic derivatives, 9 legacy AI-artwork placements and the related Matterhorn reuse between Alpine Hiking/Swiss Trail.
- **Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE.** Phase 2.9, Phase 2.10 and Chat 3 remain pending. No images, home page references, code, branding, design or manifests were changed in this round. No merge or production deployment occurred.

## 22. Phase 2.8 — Round 5 resumed source recovery and final blockers (2026-11-15)

- Resumed from development/homepage commit \`b8a6a4ec89abf90ec2b3fab6cfaf10eaf3b302ea\`.
- Current recursive image trees checked: TravelGuide development/homepage, main, research/travel-guide-blueprint, development/responsive-fixes and MEDIA-ASSETS main. No JPEG/JPG originals were found in those current image trees. MEDIA-ASSETS has 111 WebP images.
- Relevant TravelGuide image commits and MEDIA-ASSETS image publication history were reviewed; the Round 2 homepage commit added 12 WebP derivatives, not the original JPEG masters.
- Original JPEG masters acquired: **0/12**. Existing Round 2 source dimensions, bytes and SHA-256 remain prior records; original master bytes were unavailable to recompute them.
- Nine candidate Pexels pages, contributors, subject descriptions and page dimensions were rechecked. Candidate original binaries acquired: **0/9**. No candidate SHA-256 or decoded file metadata exists for the original files.
- Pexels Terms grant commercial use/modification/adaptation without mandatory attribution, subject to prohibited uses. Separate privacy, personality, property, trademark and other rights may require consent; Pexels does not warrant that all releases exist. Candidate-specific third-party rights are pending.
- Wikimedia Round 2 sources remain CC BY-SA 4.0 (attribution/change notice/share-alike for adaptations) or CC0 1.0; CC0 does not clear unrelated rights.
- The 12 current WebP derivatives remain independently verified in the earlier Round 5 pass (actual bytes, RIFF/WEBP, lengths, dimensions and SHA-256). That does not establish original JPEG availability or independently reproduce the quality-85 conversion log.
- Candidate desktop/mobile crops: **0/9 approved**. Current derivative browser crop screenshots/sign-off remain pending.
- Cloudflare Preview deployment record is successful; exact image HTTP status/MIME/body checks remain pending because the browser tool could not access the image paths and the execution network returned a generic 403 proxy response.
- Nine legacy AI artwork placements remain unchanged; replacement approvals: **0/9**.
- No source master, candidate photo, image reference, manifest, HTML/CSS/JS, brand asset, Cloudflare configuration or MEDIA-ASSETS content was changed. No merge or production deployment occurred.

### Six blocker status
1. **Original JPEG recovery — PENDING:** 0/12 masters recovered.
2. **Nine candidate original photographs — PENDING:** 0/9 candidate binaries acquired.
3. **License verification — PARTIAL:** Pexels/Wikimedia license terms reviewed; individual release/privacy/property/trademark checks pending.
4. **Visual approval — PENDING:** native derivative inspection completed earlier; browser desktop/mobile crop approval and nine candidate decisions pending.
5. **CDN verification — PENDING:** 0/12 exact asset paths certified with live HTTP status, image MIME and body bytes.
6. **Legacy artwork — PENDING:** 9/9 remain unchanged; 0/9 replacements approved.

**Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE. Phase 2.9, Phase 2.10 and Chat 3 remain pending. Do not start Round 6 without explicit approval.**

## 25. Phase 2.8 — Round 5 further alternative-source checks (2026-11-15)

- Rechecked current TravelGuide and MEDIA-ASSETS image trees and relevant image upload history. No original JPEG master was found in the inspected current trees; relevant MEDIA-ASSETS upload commit groups checked contain WebP/SVG assets, not the 12 Round 2 JPEG masters.
- Rechecked public source pages for the 12 existing photo masters. Wikimedia original records expose JPEG MIME, dimensions, file size, author and license. Pexels pages expose creator and source dimensions; historic source byte/hash values remain prior Round 2 records. No original master binary was downloaded and source hashes were not recomputed.
- Original JPEG masters acquired: 0/12.
- Rechecked all nine Pexels replacement candidate pages and page-level dimensions/license status. Exact image previews opened for the Africa and café candidate files (2/9); seven direct image endpoints were not fetchable through the current browser cache. Candidate original files acquired: 0/9; candidate hashes/MIME/signatures from actual local bytes: 0/9.
- Pexels License/Terms permit commercial website use and adaptation without mandatory attribution, subject to standalone-distribution, endorsement and trademark restrictions. They warn that separate privacy, personality, property, design and trademark permissions may be required and do not warrant that all releases exist. Platform-level rights are verified; candidate-specific releases and third-party clearances remain Pending.
- Existing Wikimedia sources remain CC BY-SA 4.0 for courtyard/train/Portugal coast and CC0 1.0 for Marrakech Medina. BY-SA attribution/change notice/share-alike obligations remain; CC0 does not clear unrelated rights.
- Candidate desktop/mobile crop approval: 0/9. Two exact source image previews were visually inspected; the other seven did not render via the browser image endpoint. Page dimensions and native preview do not constitute responsive crop approval.
- The 12 current derivative binaries remain independently verified in the earlier Round 5 pass (RIFF/WEBP, byte length, parsed dimensions and SHA-256).
- All 12 exact Preview image path browser attempts failed as inaccessible/not-fetchable. Live HTTP 200, image/webp MIME and actual body bytes remain unverified for 0/12 paths.
- Nine legacy AI artwork placements remain unchanged; approved replacements 0/9. No image file, homepage reference, manifest, HTML/CSS/JS, branding, Cloudflare setting, MEDIA-ASSETS file or production deployment changed.

### Six blocker status
1. Original JPEG recovery — Pending (0/12).
2. Nine candidate original binaries — Pending (0/9).
3. License — Pexels/Wikimedia platform license classes verified; individual releases/privacy/property/trademark clearance Pending.
4. Visual approval — 2/9 candidate previews rendered; 0/9 actual-file desktop/mobile crop approvals.
5. CDN — 0/12 exact image paths certified by HTTP status, MIME and body bytes.
6. Legacy artwork — 9 unchanged; 0 replacement approvals.

**Phase 2.8 remains PARTIALLY VERIFIED — NOT COMPLETE. Do not start Round 6 without explicit approval.**

## 26. Round 5 current-state reconciliation — 16 November 2026

### Source-of-truth checks on the current development branch
- Branch inspected before this documentation commit: development/homepage at bafc8dc7ec07adcfaa5648b18c0e3561d27550d6.
- src/data/pages.json contains 37 page records and 37 unique canonical route paths.
- scripts/build.mjs loads that registry, asserts exactly 37 unique routes, loops through each page record, creates its route directory and writes a separate index.html. It logs “Generated 37 separate page documents.” The homepage is written separately to dist/index.html; 404.html is separate and non-indexable.
- This is a verified source-code implementation, not an assertion that this task ran a fresh local build. The prior Project-State Phase 2.7 record documents a successful Cloudflare Preview build and live 37/37 HTTP 200 route verification on the recorded implementation commit bb7a74687069141e58ad8baf193805915aff6e76.
- The earlier Phase 2.6 one-document statement and pre-generation 37/37 HTTP 404 result are historical and superseded by the Phase 2.7 route-generation/live-verification record. They must not be presented as current state.
- The 37 records are already existing development/homepage branch work. This task did not start Chat 3 or add/modify any route/page source. Chat 3 remains NOT STARTED as a separate page-family workstream.

### Current Round 5 image status
- Local original masters: 11/12; Swiss Alps local verification BLOCKED until the actual ZIP is attached.
- Remote original verification: 12/12 PASS; existing Round 2 WebP binary/hash/dimension reconciliation: 12/12 PASS.
- Nine candidate source JPEGs: 9/9 previously verified; no repeat download.
- Candidate crop dispositions: 6/9 accepted or conditionally accepted; formal candidate replacement approvals: 0/9.
- Candidate-specific release/third-party rights evidence: 0/9 fully cleared.
- Existing 22 logical slots: 22/22 mapped; 21 unique path URLs; 19 unique binary identities. Alpine Hiking and Swiss Trail share alpine-hiking.webp. No homepage references changed.
- Existing CDN: direct browser visual rendering was confirmed for hero-coast.webp at the development Preview path. That browser display did not expose HTTP status or Content-Type; no existing image URL is newly HTTP/MIME certified in this task. CDN certification remains pending.
- Candidate CDN: 0/9; candidate previews remain local-only/not hosted.

### Scope and protection
- No original/candidate JPEG or existing WebP was downloaded again.
- No homepage code, image reference, alt text, branding, or asset binary changed.
- No MEDIA-ASSETS main, production main, research branch or Cloudflare setting changed.
- No merge or Production deployment occurred.
- Round 5 remains OPEN. Round 6 remains NOT STARTED.


## 27. Round 5 — final blocker and homepage readiness re-audit (16 November 2026)

Source branch was verified at `development/homepage` HEAD `97ef3f01f307362259b26a32677c8ffe6cd1df2e` before this documentation-only update.

- **Swiss Alps original ZIP:** connected private MEDIA-ASSETS `main` tree fully inspected (328 entries, not truncated); no ZIP, exact JPEG name, Pexels ID, Swiss/Alps path, matching code-search result, matching commit-search result or release archive found. The requested ZIP cannot be retrieved from the connected repository. Local original-master verification remains **11/12; Swiss Alps BLOCKED**. No re-download or recreation.
- **Remote original verification:** 12/12 PASS remains the earlier remote check; it does not replace the blocked local original ZIP verification.
- **Nine Pexels candidates:** platform licence verified 9/9; no candidate-specific signed release package surfaced; no photographer contacted; no written confirmation received. Crop dispositions 6/9 accepted/conditional, Europe visual-only, Kyoto rejected as-is, Lisbon not approved as-is. Candidate rights clearance **0/9**, final editorial/publisher approvals **0/9**, final production approvals **0/9**. Café custom crop remains visually accepted only; property permission and final approvals pending.
- **Existing Preview image CDN:** all 21 unique image URLs on `development-homepage.travelguide-9op.pages.dev/assets/images/` returned **HTTP 200 + Content-Type image/webp** in live response metadata; 21/21 accessible and PASS. This is Preview-only; it does not certify production or the separate MEDIA-ASSETS Pages host. Raw response-body signatures were not exposed by this metadata check.
- **22-slot mapping:** 22 logical placements, 21 unique path URLs, 19 unique binary identities; all referenced files exist. Duplicate pairs remain hero/seasonal coast and Asia/Kyoto; authorised Alpine Hiking/Swiss Trail reuse remains `alpine-hiking.webp`. AI artwork, Pexels and Wikimedia provenance/attribution obligations remain recorded. Mapping remains DRAFT; no unapproved candidate integrated.
- **Homepage source audit:** all 21 JSON image references plus the hero resolve to tracked assets; all alt text is non-empty; homepage data and hard-coded navigation paths match the 37-route registry (no unmatched route paths). Hero is eager/high-priority; other generated images are lazy. No custom image-load fallback handler was found.
- **Live visual audit:** 21/21 images rendered in the browser; desktop page inspected; branding appears consistent; Inspiration and Back-to-top worked. Potential mobile hero-heading overflow was flagged, but the browser could not establish a true 390×844 viewport. Plan-your-trip dropdown, header search, keyboard focus, console errors and every link destination were not fully verified.
- **Homepage integration:** NOT STARTED. No candidate replacement integration authorized.
- **Round 5:** OPEN — not ready to close. **Round 6:** NOT STARTED.

The detailed 9-candidate rights matrix, 21-URL HTTP/MIME table and 22-slot mapping are in `HOMEPAGE-ASSET-MAPPING.md`. This update is documentation-only; no code, assets, page records, image references, deployment settings, production branch, MEDIA-ASSETS branch or research branch changed.
