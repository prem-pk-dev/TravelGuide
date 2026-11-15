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
