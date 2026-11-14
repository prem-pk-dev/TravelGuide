# TravelGuide — Task Board

- **Repository:** https://github.com/prem-pk-dev/TravelGuide
- **Production branch:** `main`
- **Research branch:** `research/travel-guide-blueprint`
- **Current development branch:** `development/homepage`
- **Project stage:** Chat 2 — Homepage foundation
- **Rule:** All implementation stays isolated until reviewed. No merge or production deployment without explicit approval.

## 1. Completed research / architecture

- [x] Phase 1 — competitor research.
- [x] Phase 1.5 — Lonely Planet detailed audit.
- [x] Phase 2.1 — Sitemap and URL architecture.
- [x] Phase 2.2 — Static website architecture.
- [x] Phase 2.3 — Destination hierarchy.
- [x] Phase 2.4 — Article/content architecture.
- [x] Phase 2.5 — Internal linking architecture.
- [x] Phase 2.6 — Final architecture documentation and handoff.

## 2. Chat 2 — Homepage foundation

- [x] Verify repository, branch list, main head and starting tree.
- [x] Read all 11 required research/handoff documents.
- [x] Create isolated `development/homepage` from verified `main`.
- [x] Establish source/output separation and basic static build scripts.
- [x] Create shared header/footer and brand treatment.
- [x] Create responsive navigation and desktop mega-menu structure.
- [x] Add homepage JSON content and destination search UI.
- [x] Build homepage section architecture.
- [x] Add preview SEO metadata and noindex defaults.
- [ ] Add actual original/licensed photorealistic WebP image binaries (currently documented, not present).
- [ ] Run Node build/check scripts and inspect generated output.
- [ ] Browser QA desktop/tablet/mobile; test menu focus flow, all interactions and visual breakpoints.
- [ ] Validate every internal anchor. Chat 3–7 target routes intentionally remain unimplemented.
- [ ] Verify production canonical hostname and live Cloudflare Pages build/root/output configuration.
- [ ] Complete accessibility audit and fix any issues found.
- [ ] Create review PR after verification; do not merge without approval.

## 3. Scope boundary

Chat 2 does not build destination detail, itinerary detail, article detail, country/continent or attraction pages. Their canonical URL families remain as defined in `SITEMAP.md` and are assigned to later chats.

## 4. Next development stages

| Chat | Responsibility | Status |
|---|---|---|
| Chat 2 | Homepage/shared shell/navigation/SEO foundation | In progress — code foundation created |
| Chat 3 | Destination directory, continent and country templates | Pending |
| Chat 4 | Region, city, neighbourhood, attraction and things-to-do | Pending |
| Chat 5 | Itinerary index, collections and details | Pending |
| Chat 6 | Article index/details, taxonomies, tips and resources | Pending |
| Chat 7 | Authors, about/contact/legal and site-wide integration | Pending |

## 5. Release gates

- [ ] Actual unique WebP assets exist and have verified formats/dimensions/credits.
- [ ] Build succeeds and generates physical static files.
- [ ] Automated link/SEO/asset checks pass.
- [ ] Manual desktop/tablet/mobile and keyboard QA passes.
- [ ] Unique production canonical is confirmed.
- [ ] Cloudflare configuration is inspected (no changes without approval).
- [ ] Review diff and PR are accepted.
- [ ] Explicit approval before merging to `main` or deploying production.
