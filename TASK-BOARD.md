# TravelGuide — Task Board

- **Repository:** https://github.com/prem-pk-dev/TravelGuide
- **Production branch:** `main`
- **Research branch:** `research/travel-guide-blueprint`
- **Current development branch:** `development/homepage`
- **Project stage:** Chat 2 — Homepage foundation and asset integration
- **Rule:** Development remains isolated; no merge or production deployment without explicit approval.

## 1. Completed research / architecture

- [x] Phase 1 — competitor research.
- [x] Phase 1.5 — Lonely Planet detailed audit.
- [x] Phase 2.1–2.6 — architecture and final handoff.

## 2. Chat 2 — Homepage

- [x] Static multi-page foundation, shell, navigation, homepage sections and static JSON search.
- [x] Asset specification and initial inventory mapping.
- [x] Six candidate image binary/visual review.
- [x] Reuse authorization recorded: existing MEDIA-ASSETS WebP files may be reused across multiple sections.
- [x] Revised source-candidate previews inspected and proposed reuse register documented.
- [ ] Verify public CDN URLs in a normal browser/network: HTTP 200, image/webp, RIFF/WEBP bytes and decoded dimensions.
- [ ] Repair/verify Mountain Hiker CDN route; current path previously returned HTML fallback.
- [ ] Complete exact subject matches for South Pacific island/lagoon and visible alpine trail.
- [ ] Complete final assignment of all 22 slots with accurate alt text and documented repeated image use.
- [ ] Integrate verified CDN paths into homepage references/build, preserving hero fetch priority, below-fold lazy loading, dimensions and responsive sizing.
- [ ] Confirm responsive variants/srcset/sizes against actual source derivatives; none may be invented.
- [ ] Run Node build/check scripts and inspect output.
- [ ] Browser QA desktop/tablet/mobile, loading, accessibility and all interactions.
- [ ] Create review PR after verification; do not merge/deploy without approval.

## 3. Current image integration blocker

All newly inspected Cloudflare URLs returned HTTP 403/text/plain through the current connector execution environment. This is not proof of a public global outage, but it prevents certifying the CDN delivery URLs. The known Mountain Hiker CDN URL previously returned HTTP 200 with HTML, not WebP. Therefore homepage asset references remain unchanged.

## 4. Later page-family scope

Chat 2 does not implement destination detail, country/continent or itinerary/article/attraction pages. Those are assigned to Chats 3–7.

## 5. Release gates

- [ ] All 22 homepage image slots point to valid, verified WebP files.
- [ ] Alt text describes actual visual subject.
- [ ] Repeated use is intentional and logged; no unrelated subject substitution.
- [ ] Native dimensions and crops meet the image brief or have documented approved exception.
- [ ] Build succeeds and automated asset/link/SEO checks pass.
- [ ] Manual desktop/tablet/mobile and keyboard QA passes.
- [x] Production canonical/Cloudflare project settings inspected at source/API level (public HTTP response verification remains pending).
- [ ] Review diff/PR accepted.
- [ ] Explicit approval before merge to `main` or deployment.


## 6. Preview SEO isolation — live verification (2026-11-15)

- [x] Confirm Cloudflare Pages production branch is `main`, preview policy includes all branches, build command is `npm run build`, output is `dist/`.
- [x] Confirm latest verification deployment identity and branch alias through Cloudflare Pages API.
- [x] Verify preview `/robots.txt` live HTTP response: `200 text/plain`, body `User-agent: * / Allow: /`, response header `X-Robots-Tag: noindex, nofollow`.
- [x] Verify preview homepage live response: HTTP `200`, robots meta `noindex, nofollow`, response header `X-Robots-Tag: noindex, nofollow`.
- [x] Verify preview canonical and `og:url`: both `https://travelguide-9op.pages.dev/`.
- [x] Verify preview `/sitemap.xml`: HTTP `404` (not available).
- [x] Verify production canonical-host homepage: HTTP `200`, robots meta `noindex, nofollow`, canonical `https://travelguide-9op.pages.dev/`; no `X-Robots-Tag` on this alias response.
- [x] Verify production canonical-host `/robots.txt`: HTTP `200`, body `User-agent: * / Disallow: /`.
- [x] Verify production canonical-host `/sitemap.xml`: HTTP `404`.
- [x] Cross-check immutable production deployment URL `ed9365c0.travelguide-9op.pages.dev`: robots.txt HTTP `200`, body `Disallow: /`, response header `X-Robots-Tag: noindex`.
- [x] Inspect production source at deployed main commit `bab89d7eb14a356dbc194557492fc8de6e980c67`: shell meta is noindex; build script outputs Disallow; canonical remains production host.
- [ ] Add/restore a valid sitemap (or explicitly approve omitting one) and ensure the sitemap URL returns HTTP 200.
- [ ] Reconcile production `Disallow: /` with the noindex meta policy so crawlers can read de-indexing directives; add/check response-level header on the canonical alias if production is meant to remain noindex.
- [ ] Do not change `main` or production deployment without separate explicit approval.

### Status
Preview's live indexing restrictions **PASS**. The overall SEO isolation task remains **NOT COMPLETE** because both sitemap endpoints return 404 and production's canonical-host robots/crawler policy needs reconciliation. No source change was made to `main` or `research/travel-guide-blueprint`; no production deployment or merge was performed.


## 7. Phase 2.6 — sitemap strategy and production crawler policy

- [x] Inspect current HTML output and URL architecture; distinguish existing physical HTML pages from planned homepage-card links.
- [x] Add branch-aware sitemap policy with no Preview URL leakage.
- [x] Generate a valid empty Preview sitemap while all Preview documents remain noindex.
- [x] Preserve production noindex and Disallow: / while productionIndexingEnabled remains false.
- [x] Implement production sitemap generation for a future explicitly approved launch; no production indexing is enabled by this task.
- [x] Add automatic physical-HTML canonical/indexability discovery and duplicate canonical protection.
- [x] Add sitemap chunking and sitemap-index generation for large sites.
- [x] Add XML, membership, branch-policy and chunking checks to npm run check; invoke checks from npm run build.
- [x] Complete Cloudflare Preview deployment and confirm latest commit is attached to development-homepage alias (deployment ID 87ecea01-aea8-4a79-ba7c-014d09cc7819, commit 5db2ec3d98746ce9cd84429af30d3e263158c897).
- [x] Verify live Preview robots.txt HTTP 200, Allow: /, no Sitemap directive, and X-Robots-Tag noindex, nofollow.
- [x] Verify live Preview homepage HTTP 200, robots meta noindex, nofollow, X-Robots-Tag noindex, nofollow, and production canonical / og:url.
- [x] Verify live Preview sitemap HTTP 200, application/xml, valid empty urlset, no Preview URLs and X-Robots-Tag noindex, nofollow.
- [ ] Inspect generated Production-mode build output with indexing still disabled (local simulated build only); do not deploy it.
- [x] Keep productionIndexingEnabled false on development branch; production launch indexing remains off until explicit launch approval.
- [ ] Production sitemap rollout remains pending a future approved production release; no production configuration or deployment was changed here.

### Implementation rule
The architecture tree in SITEMAP.md is a future URL plan, not a sitemap allowlist. Only generated physical HTML documents with a canonical self-reference and an explicit index directive can enter the sitemap.


### Phase 2.6 live verification result (2026-11-15)
- [x] Preview deployment succeeded on commit \`5db2ec3d98746ce9cd84429af30d3e263158c897\`; deployment \`87ecea01-aea8-4a79-ba7c-014d09cc7819\`; branch alias confirmed.
- [x] Live Preview \`robots.txt\`: HTTP 200, text/plain, \`Allow: /\`, no production Sitemap directive, response noindex header.
- [x] Live Preview homepage: HTTP 200, noindex meta + response X-Robots-Tag, canonical and og:url point to production origin.
- [x] Live Preview \`sitemap.xml\`: HTTP 200, application/xml, valid empty urlset, response noindex header; XML source newline and namespace verified.
- [x] Production source and deployment inspected and remain unchanged; main still has robots noindex and Disallow: /.
- [ ] Do not turn on production indexing or deploy a Production sitemap without explicit launch approval.

### Correction and final deployment record (2026-11-15)
- [x] Restore sitemap code and build integration after detecting a stale-tree documentation commit; verified branch head `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e` contains the sitemap implementation and launch gate.
- [x] Confirm Cloudflare Preview deployment `be4fe7a5-dc3f-48cb-b2ce-2d0bbc479696` succeeded on `development/homepage` commit `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e` and is attached to the `development-homepage` alias.
- [x] Confirm the corrected sitemap at the live alias returns HTTP 200, `application/xml; charset=utf-8`, an empty valid `urlset`, actual XML newline characters, and `X-Robots-Tag: noindex, nofollow`.
- [x] Confirm the final Preview build logs show all automated build and sitemap validation checks passing.
- [x] Production deployment remains on main SHA `bab89d7eb14a356dbc194557492fc8de6e980c67`; no production deployment, merge, main write or research branch write was made.
- [ ] Production-mode local simulation remains a useful additional test; indexing stays disabled regardless, and no production rollout is authorized.
### Latest branch tip and Preview identity (2026-11-15)
- Sitemap/build implementation commit: `08df2f0cc0e3db7df6ec00f6f69bea165814bf5e`.
- Latest development branch tip after documentation-only commits: `4f2569a9400b42850b680d9bb354d719d0e48552`.
- Cloudflare Preview deployment ID `bc81f2e0-4d84-4e59-947c-e291bd8103ba` successfully deployed that latest SHA and is attached to the `development-homepage` alias.
- Final live homepage scrape on the alias: HTTP 200, noindex meta, noindex response header, canonical and og:url on production origin.
## 8. Phase 2.7 — Production-mode build and SEO regression verification

- [x] Inspect package scripts, source build configuration and Cloudflare Pages root/build/output/branch settings.
- [x] Add isolated Production-mode build simulation using `CF_PAGES_BRANCH=main` and a temporary output directory; clean temporary output after validation.
- [x] Verify Production mode retains `productionIndexingEnabled: false`, HTML noindex, `Disallow: /`, no premature sitemap directive, X-Robots header and empty valid XML sitemap.
- [x] Extend generated-output checks for JavaScript syntax, CSS structural balance, HTML image alt/dimensions, unique IDs and local CSS asset references.
- [x] Cloudflare Preview build and deployment succeeded on code/check commit `d40712463c4c9e35a39b2be3c0add36b27eee8da`; deployment `14e391ff-a24e-4900-810b-02b795ef33bc`.
- [x] Documentation commit `f9b6504d1afb8a1016522bcaa25699138cee8625` was also successfully deployed to the Preview alias; deployment `37ffb7c4-638b-4753-a285-cf043c2bea12`.
- [x] Confirm latest Cloudflare build log reports Production-mode simulation and normal Preview checks passing.
- [x] Inspect `main`, research branch and Production deployment read-only; no writes, merge or Production deployment.
- [ ] Local workstation clone/build: blocked by DNS resolution failure for github.com in the execution environment.
- [x] Fresh live Preview homepage and robots.txt recheck: both HTTP 200; meta/response noindex; production canonical and og:url; robots Allow: / with no Sitemap line.
- [ ] Fresh live `/sitemap.xml` HTTP recheck for latest commit; Cloudflare rate-limited that request with HTTP 429. Current build log's sitemap generation/XML checks passed; prior Phase 2.6 live verification recorded HTTP 200.
- [ ] Capture browser JavaScript runtime/page errors and run actual menu/search/mobile interaction tests; Browser Rendering scrape ignored injected test script, so runtime behavior is not certified.
- [ ] Run full standards-compliant HTML validation and full CSS grammar lint/parse; current tests are structural + Chromium DOM parsing, not W3C/CSS validator certification.
- [ ] Phase 2.7 final closeout after remaining live/browser/local checks.

### Verified safety snapshot (2026-11-15)
- `development/homepage`: `d40712463c4c9e35a39b2be3c0add36b27eee8da`.
- `main`: `bab89d7eb14a356dbc194557492fc8de6e980c67` (unchanged).
- `research/travel-guide-blueprint`: `4e047f49cfac870d17a0347d60c2d1025f62dfd8` (unchanged).
- Cloudflare Production deployment: `ed9365c0-1778-4e4e-aa5b-5510d56074cd` on main SHA above; not redeployed.
- Cloudflare project settings unchanged: production branch `main`, root `/`, build `npm run build`, output `dist`, Preview branches `all`.
- No homepage image reference changed. Phase 2.8 image integration and Chat 3 have not started.
### Latest live Preview follow-up
- [x] Homepage HTTP 200; response X-Robots noindex; meta robots noindex, production canonical and og:url; browser DOM contains main landmark.
- [x] robots.txt HTTP 200 text/plain; `User-agent: *`, `Allow: /`, no Sitemap directive and X-Robots noindex.
- [x] Fresh latest-alias `/sitemap.xml` request: HTTP 200, application/xml; X-Robots noindex; valid empty `urlset`, correct namespace and zero URL entries.
### Final sitemap endpoint check
- [x] Current Preview alias `/sitemap.xml` returned HTTP 200 and `application/xml; charset=utf-8`, with `X-Robots-Tag: noindex, nofollow`.
- [x] Browser XML viewer parsed the sitemap namespace `urlset`; it contained zero `<url>` elements, so no Preview URL or premature Production URL is published.
## 9. Phase 2.7 — Final remaining-gate verification (2026-11-15)

### Completed / verified
- [x] DNS cause identified: local Git/GitHub access failed with `Could not resolve host: github.com`; `getent ahosts github.com` returned no addresses. This is a container DNS/network failure, not an npm build error.
- [x] `package.json` inspected: no dependencies/devDependencies; repository has no package-lock/npm-shrinkwrap. Local node_modules absent; npm cache has 0 bytes/entries. Empty manifest `npm install --offline` test succeeded, but full local site build was not run due missing checkout/DNS.
- [x] Isolated Production-mode simulation and normal Preview `npm run build` passed in Cloudflare Pages runtime (Node 22.23.4/npm 10.9.9); production index flag remained false, `Disallow: /`, no premature Sitemap directive, noindex HTML/headers, valid empty XML sitemap.
- [x] W3C Nu HTML Checker on latest Preview: HTTP 200, version 26.11.14, `messages: []`.
- [x] W3C CSS Validator CSS3 profile on latest Preview stylesheet: `Valid`, 0 errors. 20 warnings remain (variables, vendor extensions and `overflow-x: clip`). SVG paint declarations were moved from stylesheet into SVG markup to resolve the original three CSS3 validator errors.
- [x] Browser interactions: desktop mega-menu, Escape, desktop/header search and Kyoto search suggestion; mobile nav open/close, Escape/focus restoration, header search and hero search; skip-link/search focus; no page/console/unhandled-rejection errors observed during instrumented interactions.
- [x] Responsive browser checks: 360px, 390px, 768px and 1440px have no document/grid horizontal overflow after mobile tile fix. 390px full-page scroll decoded all 11 existing WebP references.
- [x] Latest live Preview homepage, robots.txt and sitemap: HTTP 200; robots meta and response X-Robots noindex; robots Allow: / and no Sitemap line; production canonical/og:url; sitemap valid empty namespace urlset with application/xml MIME and noindex.
- [x] Production safety and branch isolation rechecked; no Production deploy/merge/main/research write.

### Failed checks / blockers
- [ ] **Internal links: FAIL.** 37 unique homepage internal paths probed via browser HEAD; 0 successful, 37 HTTP 404. `/destinations/` also independently navigated to HTTP 404. Current build only emits homepage and 404 HTML; linked destination, article, itinerary, about, travel tips, resources, activities, privacy/contact page families are not generated yet.
- [ ] **Accessibility: FAIL.** axe-core 4.10.3: 38 passes, 1 incomplete, 1 `color-contrast` violation, serious impact, 36 nodes. Rust and muted brand palette contrast examples under 4.5:1; needs design-approved correction.
- [ ] Local workstation full `npm run build`: NOT RUN; DNS failure prevents repository clone and no checkout is mounted. Do not report full local build PASS. Cloudflare build environment does run full build successfully.
- [ ] Full browser HAR/network failure report and pre-injection first-load console capture not certified; injected interaction error listeners did not observe errors.
- [ ] Full keyboard sequential tab order, screen-reader audit and full manual WCAG review remain pending.
- [ ] CSS3 W3C validation has zero errors but 20 warnings; warning remediation not complete.

### Current Safety / SHA snapshot
- Latest code commit before this documentation update: `b9296bb389373323a22fcc1af6b3d31fbfe14be9` on `development/homepage`; Preview deployment `6795fed9-3f5b-4708-87ac-f21721e126b0` successful on the same SHA.
- `main`: `bab89d7eb14a356dbc194557492fc8de6e980c67` unchanged.
- `research/travel-guide-blueprint`: `4e047f49cfac870d17a0347d60c2d1025f62dfd8` unchanged.
- Production deployment `ed9365c0-1778-4e4e-aa5b-5510d56074cd` still on main SHA above; production settings unchanged.
- `productionIndexingEnabled` remains false. No image reference/content changed. No Phase 2.8 integration or Chat 3 handoff started.

### Next development task (before image integration)
- First resolve or consciously sequence the 37 linked-page 404s by creating real page-family HTML/content (not placeholder/dummy pages).
- Then address the 36 contrast failures without changing established brand identity without approval.
- Complete local build when repository checkout/network is available, plus full HAR/console, tablet viewport retest if needed, and sequential keyboard/screen-reader review.
- Phase 2.7 remains **PARTIALLY VERIFIED — NOT COMPLETE**. Phase 2.8 image verification/integration must not start until its release gates are explicitly closed or accepted.
### Documentation tree correction (2026-11-15)
- The documentation commit `ea6e20aa20250bb6f2ef8934bce9498fa1c12e15` was accidentally created without the existing base tree. Cloudflare Preview build consequently failed with `npm error code ENOENT` at `/opt/buildhome/repo/package.json`.
- This was a Git tree construction error, not an application/package build regression. The corrective commit reapplies these verification documents on top of the complete source tree from code commit `b9296bb389373323a22fcc1af6b3d31fbfe14be9`; all existing source, package and asset files are retained.
- Preview build for the corrective commit must be verified before it is considered the latest deployed revision. Production and research branches remain untouched.
## 10. Phase 2.7 — 37 route implementation, contrast and live responsive verification (2026-11-15)

### Completed / PASS
- [x] Add src/data/pages.json: 37 distinct content records with route, type, unique title/description, parent, original sections, related cards and official-source references.
- [x] Add src/partials/content-page.html shared page template; each route outputs its own physical index.html.
- [x] Update static build generator to validate record completeness, path uniqueness, parent existence, breadcrumb cycles, HTTPS sources and internal related-page targets.
- [x] Update sitemap walker for nested files and physical route checker.
- [x] Build logs: 37 generated route HTML documents, page SEO and breadcrumb checks PASS, all root-relative internal href targets resolve, sitemap protection passes, production-mode simulation remains noindex.
- [x] Live Preview GET: 37/37 route responses HTTP 200, each with unique title, description, production self-canonical, Preview noindex, one H1, breadcrumb and page content.
- [x] Source content duplicate audit: no duplicate titles, descriptions, section headings or paragraphs.
- [x] axe-core 4.10.3 at 390px: 39 rules passed, 0 violations, 1 incomplete. Previous 36 serious contrast nodes resolved.
- [x] Responsive: homepage + Kyoto page at 360/390/768/1024/1440; zero horizontal overflow; grid/card/footer bounds fit.
- [x] Navigation/search: mobile open/close, focus movement and Escape restoration; desktop mega-menu; header search and Kyoto hero suggestions all pass.
- [x] Browser error instrumentation at all five widths: no page errors, console errors or unhandled rejections observed.
- [x] GitHub protection: changes restricted to development/homepage; main and research/travel-guide-blueprint unchanged; no merge/Production deploy.

### Family counts
- Geographic directory + destination records: 13 (1 directory, 5 continents, 4 countries, 3 cities).
- Itinerary: 3 (1 index + 2 details).
- Article: 4 (1 index + 3 articles).
- Other: 17 (5 styles, 4 travel tips, 3 activity collections, 1 resources index, About, 2 policies, Contact).
- Total: 37 unique routes. No region/attraction routes were added because none appeared in the verified 37-link homepage inventory.

### Changed files (Phase 2.7 follow-up)
- src/data/pages.json — 37 records.
- src/partials/content-page.html — shared static document template.
- src/assets/css/page.css — content-page layouts.
- src/assets/css/site.css — deeper rust, muted tokens, dark footer tokens and visible focus ring.
- src/partials/shell.html — dynamic Open Graph type token.
- scripts/build.mjs — JSON-driven generation of 37 physical HTML pages and page search records.
- scripts/sitemap.mjs — nested HTML walk correction.
- scripts/check.mjs — generated route, metadata, sitemap and physical internal-link checks; latest follow-up adds duplicate title and parent-cycle checks.

### Pending
- [ ] Fresh W3C CSS Validator run against latest deployed stylesheet after the token/focus update.
- [ ] Full manual keyboard sequence and screen-reader audit; full cross-browser matrix beyond Chromium.
- [ ] Independent local npm run build once a repository checkout is available without DNS failure.
- [ ] Review source recency and destination-specific fact checking before any Production launch approval.
- [ ] Phase 2.8 image integration not started.
- [ ] Phase 2.9 final responsive/accessibility QA not started.
- [ ] Phase 2.10 final homepage review not started.
- [ ] Chat 3 handoff not started.

### Safety and identity
- Before this documentation update the latest successful code Preview was bb7a74687069141e58ad8baf193805915aff6e76, Deployment 1043fd4e-4f46-466d-aace-493ff82829b8.
- Preview alias: https://development-homepage.travelguide-9op.pages.dev/.
- Production indexing flag remains false; Production robots continues to disallow crawling and keep noindex.
- main remains bab89d7eb14a356dbc194557492fc8de6e980c67.
- research/travel-guide-blueprint remains 4e047f49cfac870d17a0347d60c2d1025f62dfd8.
- No Production deployment, branch merge, image integration or Chat 3 handoff occurred.

## 11. Phase 2.8 — homepage image sourcing and integration (2026-11-15)

### Verified
- [x] Re-inspected homepage manifest, image specification, asset mapping and review docs.
- [x] Inspected MEDIA-ASSETS private main inventory: 91 metadata records, 111 WebP files; Pages production deployment is successful and CDN is reachable.
- [x] Nine unique current assets have matching Git blob SHAs against MEDIA-ASSETS originals; no re-encoding/resizing.
- [x] Current homepage: 11 rendered image elements, all HTTP 200, image/webp, RIFF/WEBP, decoded positive natural dimensions.
- [x] Nine unique CDN source files verified HTTP 200 / image/webp / RIFF-WEBP / decoded dimensions.
- [x] Subject verification: Amalfi source reused in hero and seasonal coast; Kyoto bamboo source reused in Asia and Kyoto feature/mega menu. Both repeated source groups are authorised and disclosed.
- [x] Corrected mapping: Americas image is Machu Picchu, not the alpine glacial lake described by earlier provisional mapping.
- [x] Hero remains eager/high-priority; remaining homepage images lazy-load.

### 22 image slots
- [x] Hero coastline — Amalfi coast asset, source is village-led, alt text updated accurately.
- [x] Asia — Kyoto bamboo garden (shared with Kyoto feature).
- [x] Europe — Santorini caldera.
- [x] Africa — Serengeti elephant herd at sunrise; source is landscape format, tile crop still needs visual approval.
- [x] Americas — Machu Picchu.
- [ ] Oceania — current generic tropical beach; exact South Pacific geography not established.
- [x] Kyoto feature — bamboo garden (shared with Asia).
- [x] Lisbon feature — yellow Lisbon tram.
- [ ] Marrakech courtyard — no suitable existing MEDIA-ASSETS source.
- [ ] Slow train — no suitable existing source.
- [ ] Alpine hiking — meadow image has no visible trail/hiker; exact target not fulfilled.
- [ ] Ceramic workshop — no suitable existing source.
- [ ] Portugal coast — Amalfi is Italy, not Portugal; no accurate Portugal-coast source found.
- [ ] Japan rail — no train source.
- [ ] Marrakech medina — no accurate source.
- [ ] Swiss trail — no visible Swiss hiking trail source.
- [x] Seasonal coast — Amalfi reused from hero; accurately described as Amalfi Coast, not a separate seasonal scene.
- [ ] Market morning — no market source.
- [x] Neighbourhood café — coffee image; alt text describes only visible cup/table.
- [ ] Calendar planning — no suitable source.
- [ ] Train platform — no suitable existing source.
- [ ] Travel bag — no suitable existing source.

### Counts and release gate
- Existing approved/current image slots: 9/22.
- Distinct existing source binaries: 9 verified in current homepage (7 approved/conditional plus 2 fallback-only); 7 distinct approved/relevant source binaries support 9 placements because two source pairs repeat.
- Reuse groups: 2 (Amalfi hero/seasonal coast; Kyoto bamboo Asia/Kyoto feature).
- Fallback-only images: 2 (Oceania tropical beach; alpine meadow for hiking).
- Exact source missing: 11.
- Existing rendered homepage image elements tested: 11/11.
- Overall image integration: PARTIALLY COMPLETE — NOT COMPLETE.
- Full desktop/mobile crop acceptance for all 22 cannot be declared while 13 slots remain unresolved or conditional.
- Phase 2.9 must not start until the user authorises it after Phase 2.8 completion.

## 12. Phase 2.8 — live crop recheck and handoff state (2026-11-15)

### Current live Preview
- [x] Cloudflare Preview deployment e788e02e-f77e-4da9-9a87-c5e547cc92e4 succeeded on manifest/mapping commit 63e394dcdc3aea749fca550b502111eddbd9ee96.
- [x] Browser crop probe: 12 current image DOM uses × five widths = 60 observations at 360/390/768/1024/1440; all image uses decoded with positive natural dimensions, no rendered image overflow and no document/body horizontal overflow.
- [x] Africa tile uses object-position 80% center; hero mobile crop uses 62% center, desktop uses 50% 52%.
- [x] Nine unique current CDN WebP binaries verified HTTP 200, image/webp, RIFF/WEBP and decoded natural dimensions; 11 local image file-path references are active, with 9 unique binary identities due to two repeated source groups.
- [x] Hero high-priority eager loading and all other homepage images lazy loading are checked by scripts/check.mjs and pass Cloudflare build.

### 22-slot disposition
- [x] 9 slots currently use subject-relevant existing WebP assets: hero coast (conditional Amalfi cliff village composition), Asia (Kyoto bamboo regional illustration), Europe (Santorini), Africa (Serengeti sunrise), Americas (Machu Picchu), Kyoto feature (bamboo), Lisbon tram, seasonal coast (Amalfi repeated) and neighbourhood café (coffee detail).
- [ ] 2 fallback-only slots must be replaced/accepted after subject review: Oceania generic beach; alpine hiking meadow without visible trail/hiker.
- [ ] 11 missing exact image subjects remain: Marrakech courtyard, slow train, ceramic workshop, Portugal coast, Japan rail, Marrakech medina, Swiss trail, market morning, calendar planning, train platform, travel bag.
- [x] 2 source reuse groups documented and permitted: Amalfi hero + seasonal coast; Kyoto bamboo Asia + Kyoto feature/mega menu.
- Actual current CDN WebP count: 9 unique source binaries verified; 7 support relevant current uses, 2 are fallbacks only. Current homepage image path refs: 11; browser DOM use count: 12; duplicate source groups: 2; exact sources still missing: 11.

### Phase 2.8 gate
- **PARTIALLY VERIFIED — NOT COMPLETE.** Do not start Phase 2.9 until all 22 subjects are correctly sourced, integrated and accepted.
- Phase 2.9 final QA, Phase 2.10 final homepage review and Chat 3 handoff remain not started. No production deployment/merge or updates to main/research branches.

## 13. Phase 2.8 — Round 2 missing-image resolution (2026-11-15)

### Round 2 delivered
- [x] Replaced the Oceania generic-beach fallback with an aerial Bora Bora ridge/lagoon camera photograph; no overwater bungalow resort image.
- [x] Replaced the alpine meadow fallback with hikers on a visible Matterhorn trail.
- [x] Found and integrated camera photographs for Marrakech courtyard, slow train, ceramic workshop, Portugal coast, Japan rail, Marrakech medina, Swiss trail, market, planning, train platform and travel bag.
- [x] Created 12 unique WebP camera-photo derivatives for 13 slot placements; Matterhorn hikers photo is reused only between Alpine Hiking and Swiss Trail.
- [x] Source JPEG downloads returned HTTP 200 and image/jpeg; originals were decoded, SHA-256 hashed, and converted to WebP quality 85 at exact target dimensions. Derivatives have RIFF/WEBP signatures and recorded hashes.
- [x] Added HOMEPAGE-PHOTO-CREDITS.md and complete 22-slot source/crop/hash mapping.

### Round 2 counts
- Fallback/missing placements resolved: 13/13.
- New unique camera-photo WebP files: 12.
- Seven unique old AI-generated artwork binaries remain in nine prior placements.
- Total unique active source binaries after integration: 19.
- Reuse groups: 3 (Amalfi, Kyoto bamboo, Matterhorn hikers).
- Round 2 exact source missing: 0.
- Rejections: generic tropical beach, alpine meadow, Bora overwater-bungalow candidate, watermarked Azenhas candidate and HTML hiker thumbnail.

### Phase 2.8 release gate
- **PARTIALLY VERIFIED — NOT COMPLETE.** Nine Round 1 placements remain based on AI-generated artwork, and several don't match the original photographic scene specification. All 22 placements are populated, but these legacy visuals still require explicit editorial approval or replacement by genuine photographs.
- Phase 2.9 is not started. No main/research branch updates, merge or Production deployment.


## 14. Phase 2.8 — Round 3 independent repository and binary audit (2026-11-15)

### Completed audit checks
- [x] Confirmed `development/homepage` tip `aec0cada4741b4941a928672db6bea3dba73e0d2` and tree `d49868c89e78e0f78112961b9bba889bd55fd1ce`.
- [x] Compared development with `main`: development is 36 commits ahead and 1 behind; branches diverged from merge base `8223a82f3d0a4b21c9edbb8c64a8a55ed7569d41`.
- [x] Reconfirmed `research/travel-guide-blueprint` at `4e047f49cfac870d17a0347d60c2d1025f62dfd8`.
- [x] Inventoried the current 22 slot assignments: 21 path names, 19 unique binary identities and 3 reuse groups.
- [x] Confirmed the 12 Round 2 derivative files are in the TravelGuide development tree and their GitHub tree byte sizes match the mapping table.
- [x] Inspected MEDIA-ASSETS main at `4531d94979224daa5a3f0a6b25244e02655708e0`; its image tree contains 111 WebP files, no JPEG masters and none of the 12 Round 2 derivative basenames.
- [x] Reviewed the listed public source-page/creator/licence records. This is page-level provenance review, not verification of the stored binary bodies.

### Blocked / pending verification
- [ ] Retrieve and preserve all 12 original JPEG master binaries in a durable project asset location.
- [ ] Independently verify source status, MIME, JPEG signature, dimensions, byte size and recomputed SHA-256 for all 12 originals.
- [ ] Retrieve the 12 stored WebP derivatives and independently verify MIME, RIFF/WEBP signature, decoded dimensions, byte length and recomputed SHA-256.
- [ ] Reproduce or verify WebP quality 85 from the actual derivative bytes.
- [ ] Render the actual stored derivatives at desktop/mobile target ratios and accept/reject the crops.
- [ ] Register the approved new derivatives in an approved MEDIA-ASSETS asset path and establish the permitted non-production delivery route; then verify the exact CDN URLs. Do not infer or invent CDN paths and do not deploy to production as part of this task.
- [ ] Complete editorial/spec review or photographic replacement of the nine legacy AI-artwork placements.

### Current gate
- Repository audit: COMPLETE.
- Source/creator/licence page review: PARTIALLY VERIFIED.
- Round 2 asset files and recorded byte lengths in TravelGuide: VERIFIED by repository metadata.
- Original master binary acquisition, independent source/output byte verification, actual derivative crop review and MEDIA-ASSETS CDN delivery: BLOCKED / NOT VERIFIED.
- **Phase 2.8: PARTIALLY VERIFIED — NOT COMPLETE.** Do not start Phase 2.9, Phase 2.10 or Chat 3.
- No homepage binary/code edit, no MEDIA-ASSETS mutation, no main/research update, no merge and no production deployment.

## 15. Phase 2.8 — Round 4 asset recovery, provenance audit and replacement planning (2026-11-15)

### Repository and derivative recovery
- [x] Inspected all TravelGuide branches and current commit refs; confirmed MEDIA-ASSETS has only `main`.
- [x] Inspected TravelGuide and MEDIA-ASSETS recursive trees, relevant image directories, image-path commit history, image manifests, source mapping, credit register, production specification, build copy path and Pages project configuration.
- [x] Recovered the exact 12 derivative filenames from committed Round 2 records; all 12 are present in TravelGuide `src/assets/images/`.
- [x] Compared binary Git object identities across the two repositories: no Round 2 derivative has an identical object in MEDIA-ASSETS under another name.
- [x] Searched the current repository trees and relevant asset history for the source JPEG masters; none of the 12 originals was found.
- [ ] Recover and preserve all 12 original JPEG master binaries.
- [ ] Independently recompute source and output SHA-256 and confirm source/derivative MIME, magic bytes, dimensions, byte lengths and WebP quality 85 from the actual bytes.
- [ ] Freshly verify the 12 exact TravelGuide preview asset URLs at HTTP level and record response MIME/bytes. No MEDIA-ASSETS CDN destination paths are currently registered for these derivatives.

### Legacy artwork audit and candidate sourcing
- [x] Individually reviewed the nine legacy AI-artwork placements and seven unique current CDN source records. All nine are marked for replacement under the existing genuine-photography brief; no formal keep approval was found.
- [x] Identified nine Pexels photographic source-page leads with contributor and page-level license/source details; recorded them as unapproved candidates.
- [x] Reviewed current Pexels license/Terms for commercial use, modification/adaptation, no mandatory attribution and third-party rights cautions.
- [ ] Download and inspect each candidate's actual original binary; confirm exact bytes, metadata, crop, focal subject and desktop/mobile suitability.
- [ ] Complete context-specific people/property/trademark/release checks; confirm the candidate's precise terms at the time of download.
- [ ] Record final source/master hashes, dimensions, creator, attribution, license and commercial/modification rights before any new candidate is accepted.
- [ ] Obtain editorial approval and replace the nine legacy image slots with distinct photographs. Keep the approved Matterhorn reuse between Alpine Hiking and Swiss Trail only.

### Current 22-slot counts
- 22 assigned slots remain populated.
- 12 Round 2 photographic derivatives are present in TravelGuide (13 placements, with the Matterhorn hikers image shared between two related slots).
- 9 legacy AI-artwork slots (7 unique artwork binaries) remain in use and require replacement.
- 9 candidate pages found; 0 candidate binaries acquired or approved.
- Original Round 2 JPEG masters recovered: 0/12.
- Phase 2.8: **PARTIALLY VERIFIED — NOT COMPLETE**. Phase 2.9, Phase 2.10 and Chat 3 remain pending.

### Safety boundary
- Documentation only on `development/homepage`; no source images, CDN objects, image references, homepage design, branding, data, HTML/CSS/JS or manifests were changed.
- No edits to `main`, `research/travel-guide-blueprint`, `development/responsive-fixes` or MEDIA-ASSETS; no merge, Cloudflare configuration change or production deployment.

## 16. Phase 2.8 — Round 5 original recovery, derivative verification and visual approval (2026-11-15)

### Completed checks
- [x] Reconfirmed Round4 starting point on development/homepage and rechecked main, research and responsive-fixes branch refs.
- [x] Retrieved all 12 committed Round2 WebP derivatives as actual binary/base64 file content.
- [x] Independently checked RIFF/WEBP signatures, byte lengths, parsed pixel dimensions and SHA-256 for all 12 derivative binaries; all values match the Round2 ledger.
- [x] Rendered and visually reviewed all 12 actual derivative files at native dimensions.
- [x] Inspected the current homepage CSS/HTML build rules and identified desktop/mobile aspect-ratio crop risks and visible people/branding issues.
- [x] Rechecked source-page and license information for the nine photographic replacement candidate leads.

### Blocked / pending checks
- [ ] Recover the 12 original Round2 JPEG masters; none was present in the inspected current repository trees or relevant image-path histories and the source-host binary fetch route is blocked.
- [ ] Independently recompute original JPEG hashes, signatures, MIME, native dimensions and byte lengths from the exact master files.
- [ ] Reproduce the WebP quality 85 encoder setting from a real conversion record or master-to-output conversion, not by inference from an encoded WebP file.
- [ ] Download the nine replacement candidate original image files; 0/9 candidate binaries were acquired.
- [ ] Independently compute the nine candidate master SHA-256 values and decode their formats/dimensions.
- [ ] Complete candidate-specific model/property/privacy/trademark checks and preserve the exact license/attribution evidence.
- [ ] Capture actual desktop and mobile browser crops for all active images/candidates; visual file renders alone do not certify live CSS cropping.
- [ ] Approve or reject each of the nine replacement candidates editorially. Current candidate decisions: pending 9/9.
- [ ] Recheck HTTP 200, image MIME, byte signature and rendered preview for all exact image delivery paths from a normal browser/network environment. The available execution network returned 403 text/plain for unrelated domains, so no CDN path is certified.
- [ ] Register and publish any approved candidate assets only after source, rights, byte and crop gates pass. No files have been integrated or replaced.

### Current 22-slot status
- 22 slots remain populated.
- 12 current Round2 derivative binaries: independently verified 12/12.
- Original JPEG source masters recovered: 0/12.
- Nine legacy AI artwork placements: unchanged; keep approval 0/9.
- Nine replacement candidate pages found; candidate binary originals acquired 0/9; approvals 0/9.
- Matterhorn hikers reuse between Alpine Hiking and Swiss Trail remains user-authorized; it is subject to final release/crop checks.
- Phase 2.8: **PARTIALLY VERIFIED — NOT COMPLETE**.
- Phase 2.9, Phase 2.10 and Chat 3 remain pending.

### Safety boundary
- Documentation-only changes on development/homepage.
- No image binaries, source references, manifests, HTML/CSS/JS, homepage design or branding changed.
- No MEDIA-ASSETS modification, main/research branch change, merge or production deployment.

## 18. Phase 2.8 — Round 5 resumed source acquisition and approval status (2026-11-15)

### Completed checks
- [x] Rechecked current TravelGuide branch refs and image trees, including development/homepage, main, research/travel-guide-blueprint and development/responsive-fixes.
- [x] Rechecked MEDIA-ASSETS main inventory and relevant image history.
- [x] Confirmed no original JPEG masters in the inspected current branch trees; MEDIA-ASSETS has 111 WebP images.
- [x] Rechecked 12 Round 2 source records and original-file links; no source master was acquired.
- [x] Rechecked all nine Pexels candidate pages, contributors, page dimensions/subjects and current Pexels license/Terms.
- [x] Preserved previous Round 5 verification: 12/12 derivative binary signatures, byte lengths, decoded dimensions and SHA-256 values match the Round 2 ledger.

### Pending work
- [ ] Recover/store the 12 original JPEG masters (current count: 0/12).
- [ ] Recompute original JPEG SHA-256; verify actual source MIME/signature/dimensions/bytes.
- [ ] Download nine candidate original files (current count: 0/9).
- [ ] Compute candidate source hashes and decode actual formats/dimensions.
- [ ] Verify candidate-specific privacy/model/property releases and trademark/logo permissions.
- [ ] Capture/approve actual desktop/mobile browser crops (candidate approvals: 0/9).
- [ ] Certify exact HTTP status, image MIME and body bytes for the 12 Preview/CDN image paths (current count: 0/12).
- [ ] Obtain editorial approval before replacing any of the nine legacy AI-artwork slots.

### Six blocker status
1. Original JPEG recovery — **Pending (0/12)**.
2. Nine candidate photo binaries — **Pending (0/9)**.
3. Commercial/modification license terms — **Page-level verified**; individual release/privacy/property/trademark clearance — **Pending**.
4. Desktop/mobile visual approval — **Pending**.
5. CDN HTTP/MIME/body verification — **Pending (0/12)**.
6. Legacy AI artwork — **9 unchanged; 0 approved replacements**.

### Safety boundary
- Documentation only on \`development/homepage\`.
- No original/candidate binary, active derivative, homepage reference, manifest, HTML/CSS/JS, branding or feature changed.
- No MEDIA-ASSETS modification, main/research mutation, merge or production deployment.
- Phase 2.8 remains **PARTIALLY VERIFIED — NOT COMPLETE**. Do not begin Round 6 without explicit approval.
