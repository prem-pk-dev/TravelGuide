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
