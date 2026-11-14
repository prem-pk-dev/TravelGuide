# Travel Guide — Task Board

- **Repository:** https://github.com/prem-pk-dev/TravelGuide
- **Current branch:** `research/travel-guide-blueprint`
- **Latest verified branch head before this task's commit:** `f20382a5f5493e6cab205fcc4b2e8c0f6fae5064`
- **Project stage:** Phase 2.6 — Final Architecture Documentation
- **Rule:** Research and implementation changes stay isolated from `main`; no merge without explicit approval.

---

## 1. Completed

### Research / architecture
- [x] Phase 1 — Competitor research, five competitors.
- [x] Phase 1.5 — Lonely Planet detailed competitor audit.
- [x] Phase 2.1 — Sitemap and URL architecture.
- [x] Phase 2.2 — Static website architecture.
- [x] Phase 2.3 — Destination page hierarchy.
- [x] Phase 2.4 — Article and content architecture.
- [x] Phase 2.5 — Internal linking architecture.

### Phase 2.6 documentation deliverables (this commit)
- [x] Cross-document audit of six existing source documents.
- [x] Final architecture decision record.
- [x] Conflict/ambiguity register with source, impact, recommendation and decision.
- [x] Final architecture handoff for Chat 2–7.
- [x] Project state and task board.

## 2. Pending architecture/implementation gates

- [ ] Verify production canonical hostname/custom domain.
- [ ] Inspect Cloudflare Pages root/base directory, build command and output directory.
- [ ] Select and document deterministic build-time generator/toolchain.
- [ ] Create versioned machine-readable schemas for all record families.
- [ ] Finalize relationship field ownership for itinerary, travel tip, resource and typed edges.
- [ ] Resolve optional Authors index and attraction directory publication in the sitemap if required.
- [ ] Define pagination/page-size and sitemap partition thresholds based on real content volume.
- [ ] Implement and test Cloudflare-compatible redirects, 404, robots and sitemap behavior.
- [ ] Finalize WebP converter, quality setting, responsive dimensions and optional AVIF production.
- [ ] Benchmark real generated output/build limits before asserting capacity at thousands-of-pages scale.

## 3. Development stages

| Chat | Planned responsibility | Status |
|---|---|---|
| Chat 2 | Homepage, shared shell, navigation, tokens, CSS foundation, build output and home SEO | Next |
| Chat 3 | Destination directory, continent and country templates | Pending |
| Chat 4 | Region, city, neighborhood, attraction and things-to-do templates | Pending |
| Chat 5 | Itinerary index, collections, details and stop/day rendering | Pending |
| Chat 6 | Article index/detail, categories, travel styles, tips and resources | Pending |
| Chat 7 | Author profiles, about/contact/legal, cross-page SEO/link validation and integration | Pending |

## 4. Exact next task — Chat 2: Homepage Development

Start only after the user explicitly requests Chat 2.

1. Verify the starting branch head and existing repository tree; do not assume the research branch should be modified for production.
2. Create a dedicated implementation branch from the user-approved base.
3. Read `ARCHITECTURE-DECISIONS.md`, `ARCHITECTURE-AUDIT.md`, `FINAL-ARCHITECTURE-HANDOFF.md`, `SITEMAP.md` and `WEBSITE-ARCHITECTURE.md`.
4. Verify Cloudflare Pages settings before a deployable build; no deployment changes are authorized by this task board.
5. Establish `src/` source and `dist/` output separation with the approved static build toolchain.
6. Implement shared HTML shell, accessible header/nav/footer, CSS tokens and responsive layout.
7. Implement homepage content only; do not build the Chat 3–7 page families.
8. Use genuine/licensed photorealistic WebP images, meaningful alt text and real dimensions.
9. Validate semantics, responsive behavior, keyboard navigation, links, assets, canonical and metadata.
10. Commit small changes, read back files and record exact SHA/test results.

## 5. Global completion gates for Chats 2–7

- [ ] All indexable routes are individual physical HTML files.
- [ ] No SPA, backend, database or authentication.
- [ ] Every internal link resolves to one valid canonical route.
- [ ] Every public page has unique metadata and correct canonical.
- [ ] Breadcrumbs match canonical route and structured data.
- [ ] Geographic parent IDs/ancestor IDs validate.
- [ ] Editorial relationships and author credit resolve.
- [ ] Draft/noindex content is excluded from public links and sitemap.
- [ ] WebP assets exist, are licensed/original and have responsive variants.
- [ ] Sitemap matches eligible generated HTML.
- [ ] 404 and redirects work on Cloudflare Pages.
- [ ] Mobile, keyboard and accessibility behaviors have been tested.
- [ ] Production deployment and merge occur only after explicit approval.

## 6. Current release / branch state

- Research branch contains architecture documents only.
- The Phase 2.6 commit SHA will be recorded after actual commit verification.
- `main` has not been merged or modified by the research work.
- No production website implementation or Cloudflare configuration change is authorized by Phase 2.6.
