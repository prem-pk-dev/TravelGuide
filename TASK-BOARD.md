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
- [ ] Production canonical/Cloudflare settings inspected.
- [ ] Review diff/PR accepted.
- [ ] Explicit approval before merge to `main` or deployment.


## 6. Preview SEO isolation — live verification (2026-11-15)

- [x] Confirm Cloudflare Pages project production branch is `main` and preview deployment policy includes all branches.
- [x] Confirm successful preview deployment ID `e09510f2-66a3-46cd-a04f-46a44f685fc3`, branch `development/homepage`, commit `421028ebb0cf6fad6e24981148a006d6fb97c463`, and branch alias `https://development-homepage.travelguide-9op.pages.dev`.
- [x] Review preview build-time robots meta branch logic and generated preview `X-Robots-Tag` header rule.
- [x] Inspect production source on `main`: robots meta remains hard-coded `noindex, nofollow`; canonical remains `https://travelguide-9op.pages.dev/`; build emits `robots.txt` with `Allow: /`.
- [ ] Independently verify actual public HTTP response for preview `robots.txt`, homepage HTML robots meta/canonical, and `X-Robots-Tag` header.
- [ ] Independently verify preview sitemap endpoint. No sitemap source file or build generation was found; decide whether sitemap should be added or intentionally omitted.
- [ ] Independently verify production public robots.txt, homepage robots meta/canonical and sitemap endpoint.
- [ ] Decide production indexing policy before launch: current main source is `noindex, nofollow`, which is safe from indexing but not SEO-ready for a public searchable launch.

### Verification blocker / evidence
- Direct container HTTP requests failed hostname resolution for the Pages domains.
- Web fetch returned inaccessible/cache-miss errors.
- Cloudflare Browser Rendering was rate limited (HTTP 429); one production-host request returned network/DNS failure.
- Those failures do not establish public HTTP response statuses. This phase remains **not complete** until ordinary public HTTP evidence is obtained.

