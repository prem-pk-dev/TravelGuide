# Travel Guide — Final Architecture Handoff

- **Audience:** Chat 2 – Homepage Development and Chats 3–7 – page-family implementation
- **Phase:** 2.6 — Final Architecture Documentation
- **Status:** Implementation handoff; documentation only
- **Research branch:** `research/travel-guide-blueprint`
- **Production branch:** `main` (not modified)
- **Deployment target:** Cloudflare Pages static hosting
- **Source of truth:** GitHub repository and approved JSON source data
- **Do not begin implementation from this handoff until Phase 2.6 is reviewed and the first Chat 2 task explicitly starts.**

---

## 1. Project objective

Build a high-quality, research-led Travel Guide website for destination discovery and trip planning. It must combine:
- a clear homepage and global navigation;
- a structured continent/country/region/city/neighborhood/attraction directory;
- original destination, activity and itinerary content;
- useful editorial articles, travel tips and resources;
- transparent authoring, factual review and commercial disclosure;
- photorealistic WebP media;
- static SEO-friendly HTML documents and robust internal links.

Competitor audits provide design patterns and observed feature references. Do not copy competitor layouts pixel-for-pixel, wording, branding, proprietary images or product/backend features.

## 2. Locked technology and hosting constraints

**Required stack**
- HTML5 semantic markup.
- CSS3, responsive/mobile-first styles and design tokens.
- Vanilla JavaScript only for progressive enhancement.
- Static JSON content records, navigation, taxonomies and site configuration.
- Build-time generation of physical HTML documents.
- GitHub as source of truth.
- Cloudflare Pages as static asset host.

**Prohibited in this project baseline**
- Backend services/API routes.
- Database (including D1 or hosted DB).
- Authentication, accounts or private user sessions.
- SPA routing or one catch-all `index.html`.
- Runtime fetching as the only source of page content.
- Workers/Pages Functions as a required rendering/runtime layer.
- Paid infrastructure assumptions or unapproved external services.

External booking links may navigate to providers. A static frontend must not claim live booking availability, inventory, transactional success or personalized private account features.

## 3. Mandatory repository and build model

Use the source/output separation from `WEBSITE-ARCHITECTURE.md`:

```text
TravelGuide/
  README.md
  ARCHITECTURE-DECISIONS.md
  ARCHITECTURE-AUDIT.md
  FINAL-ARCHITECTURE-HANDOFF.md
  PROJECT-STATE.md
  TASK-BOARD.md
  COMPETITOR-ANALYSIS.md
  SITEMAP.md
  WEBSITE-ARCHITECTURE.md
  DESTINATION-PAGE-HIERARCHY.md
  ARTICLE-CONTENT-ARCHITECTURE.md
  INTERNAL-LINKING-ARCHITECTURE.md
  src/
    config/
    content/
      destinations/
      attractions/
      things-to-do/
      itineraries/
      articles/
      travel-tips/
      resources/
      authors/
      taxonomy/
    data/
      redirects.json
      featured-content.json
    schemas/
    templates/
      layouts/
      partials/
      pages/
    styles/
    scripts/
    media/
      images/
    build/
  dist/
    index.html
    404.html
    robots.txt
    sitemap.xml
    destinations/.../index.html
    articles/.../index.html
    itineraries/.../index.html
    assets/css/
    assets/js/
    assets/images/
```

This is the approved target structure, not an assertion that directories already exist. Exact generator language/tooling and scripts are pending Chat 2/implementation approval. Cloudflare Pages must serve only the generated output directory (`dist/`), not the whole source root.

For each canonical route in `SITEMAP.md`, emit one physical HTML file. The trailing slash route `/a/b/` maps to `dist/a/b/index.html`; homepage maps to `dist/index.html`. No client-side route interception.

## 4. Page families and ownership

| Chat / page family | Responsibility | Primary source specification |
|---|---|---|
| Chat 2 | Homepage, shared shell, navigation, responsive design system and common UI foundations | Sitemap + website architecture + competitor research |
| Chat 3 | Destination directory, continent and country page families | Sitemap + destination hierarchy |
| Chat 4 | Region, city, neighborhood, attraction and things-to-do page families | Sitemap + destination hierarchy + internal linking |
| Chat 5 | Itinerary index/collections/detail and structured route presentation | Sitemap + article/content boundaries + internal linking |
| Chat 6 | Article index/detail, categories, travel styles, tips and resources | Article/content architecture + sitemap + internal linking |
| Chat 7 | Author profiles, about/contact/legal pages, global SEO/QA integration and final cross-page consistency | Sitemap + article/content architecture + architecture audit |

Page responsibilities can be adjusted only in a documented project-state/task-board update; do not let two chats independently create duplicate shared shells or edit the same canonical templates without coordination.

## 5. Chat 2 — Homepage Development: exact first handoff

Chat 2 is the first implementation stage after explicit user instruction. It must produce the shared foundation and homepage, not every destination/article page.

### 5.1 Read first

Before editing:
1. `ARCHITECTURE-DECISIONS.md`
2. `ARCHITECTURE-AUDIT.md`
3. `FINAL-ARCHITECTURE-HANDOFF.md`
4. `SITEMAP.md`
5. `WEBSITE-ARCHITECTURE.md`
6. Relevant competitor homepage/navigation audits in `COMPETITOR-ANALYSIS.md`

Use `PROJECT-STATE.md` and `TASK-BOARD.md` to confirm current branch, active files and next task.

### 5.2 Branch and GitHub workflow

- Create/continue a dedicated feature branch from the approved starting point; do not make direct commits to `main`.
- Confirm the current branch head before editing.
- Work in small, reviewable commits.
- Do not merge or modify production branch until explicit approval.
- After each commit, fetch the actual commit SHA and read back changed files.
- Do not create any unrequested Chat 3–7 page families during Chat 2.

### 5.3 Chat 2 deliverables

1. **Repository/build foundation:** establish source/output separation and a deterministic static build command, once tooling is selected and approved.
2. **Shared document shell:** semantic HTML5 base layout, head metadata partial, skip link, shared header, desktop/mobile navigation, breadcrumb slot, main/footer structure.
3. **Design tokens and CSS:** colors, type scale, spacing, widths, radii, focus states, responsive breakpoints, reduced motion and component styles.
4. **Homepage physical output:** root `index.html` generated or copied into `dist/index.html`, with all primary page content rendered in HTML.
5. **Vanilla JS enhancement:** mobile menu/disclosures and only the homepage interactions actually used. Navigation must work without JS.
6. **Homepage content sections:** build sections from the approved sitemap and researched competitor patterns, with distinct useful content, real links and no repetitive filler.
7. **Media pipeline contract:** WebP-first local assets with genuine/licensed images, dimensions, alt text, responsive sizes and optional AVIF with WebP fallback.
8. **SEO foundation:** title, description, canonical from one verified origin setting, OG metadata, Organization/WebSite structured data only where accurate, robots and initial sitemap wiring when routes exist.
9. **Quality gates:** local links/assets, HTML semantics, keyboard behavior, responsive states, image loading, no broken buttons and no console errors.
10. **Documentation:** update project state/task board with changed files, branch, commit SHA, tests, limitations and next owner.

### 5.4 Homepage section planning

Follow homepage purpose and sitemap. The exact section design is a Chat 2 design task; at minimum it should cover distinct user intents such as:
- destination discovery/search;
- continent/country exploration;
- featured destination stories;
- trip inspiration/itineraries;
- things-to-do and travel experiences;
- useful planning guides/tips;
- travel styles or audience paths;
- selected editorial articles;
- useful resources;
- trust/editorial/about section;
- clear footer and legal/disclosure navigation.

A section should exist only when it has meaningful content and a clear task. Do not pad the page with duplicate cards, fake testimonials, unsupported awards, fabricated user counts, fake ratings or generic filler.

### 5.5 Acceptance criteria

- Homepage is a physical static HTML file under `dist/`.
- Shared shell is reusable by later page families.
- No SPA/router/backend/database/auth.
- Header/footer links point to valid planned canonical routes; links to not-yet-built routes must be tracked as pending and should not ship as broken links.
- Menus are keyboard/touch accessible and have working buttons.
- Layout works at mobile/tablet/desktop breakpoints.
- Genuine/licensed photographs use WebP delivery and actual dimensions.
- Homepage has unique SEO metadata and verified canonical origin policy.
- Build can run deterministically and produces preview output.
- No Pages settings or production deployment changes without explicit permission.

## 6. Chats 3–7 detailed boundaries

### Chat 3 — Destination directory, continent and country
- Implement destination directory and continent/country detail templates.
- Consume stable IDs and canonical route contract; do not invent alternate URLs.
- Display only published/indexable place records.
- Link to regions/cities/articles/itineraries only when related records exist.
- Validate geographic ancestors and breadcrumbs.
- Do not build city, POI or attraction templates assigned to Chat 4.

### Chat 4 — Region, city, neighborhood, attraction and things-to-do
- Implement geographic child templates and activity collections.
- Preserve single `parent_destination_id`.
- Use route hierarchy in `SITEMAP.md`, especially nested city attraction route.
- Attraction pages link to canonical city/country context; things-to-do collections do not become POI parents.
- Use verified nearby data only for "nearby" labels.
- Validate parent/child and ancestor IDs, location links and page indexation.

### Chat 5 — Itineraries
- Implement itinerary directory, destination/city itinerary collections, detail pages and ordered stop/day rendering.
- Use both sitemap route families without conflating a collection route with an individual itinerary route.
- Store ordered stops explicitly and link each stop to canonical destination/POI pages when available.
- Keep itinerary distinct from an article unless a single article is the canonical route content.
- No real-time transport, ticket, hotel or availability assertions.

### Chat 6 — Editorial articles, categories/styles, tips/resources
- Implement article index/detail templates and appropriate type-specific sections.
- Preserve all Phase 2.4 article field names and fourteen article types.
- Keep categories, tags, travel styles, audience and themes distinct.
- Category/style archives only publish when useful and indexable; tag/audience/theme archives are not automatic.
- Travel tips and resources use their separate sitemap URL families and distinct intent.
- Ensure destination/itinerary/resource recommendations have typed valid IDs and disclosures.

### Chat 7 — Authors, about, contact, legal and final integration
- Implement author profiles and corporate/legal pages in their sitemap routes.
- Keep primary author, contributor, reviewer and editor roles distinct and real.
- Author pages show genuinely credited published content only.
- Legal text must be accurate for actual product/business choices; do not fabricate legal promises.
- Run site-wide SEO, breadcrumb, internal-link, canonical, sitemap, redirect, asset and accessibility checks.
- Resolve cross-chat CSS/template conflicts and finalize documentation before any approved merge/deploy.

## 7. Shared page document contract

Every indexable page, regardless of page family, must contain:
- `<!doctype html>`, `<html lang="…">`, UTF-8 and viewport declarations;
- a unique title and description;
- one absolute canonical URL from the verified site-origin configuration;
- exactly one H1 and logical headings;
- semantic header/nav/main/footer landmarks;
- an accessible skip link;
- visible breadcrumbs where required by page family;
- server/build-rendered body content and normal `href` internal links;
- relevant image alt text, intrinsic dimensions and WebP fallback;
- Open Graph/social metadata when appropriate;
- truthful JSON-LD where supported;
- indexation directive consistent with publication state;
- no references to a preview or branch host in production output.

## 8. Data and relationship rules for every chat

1. Stable IDs are identity; slug is presentation/route segment.
2. Canonical URL is unique per indexable entity.
3. Geographic parent-child uses one canonical parent.
4. Editorial many-to-many associations are typed and explicit.
5. Reverse indexes are build-generated and never hand-maintained.
6. No public output or links to drafts/noindex/archived targets.
7. Every association must resolve to an expected entity type.
8. Content records must not duplicate the same page's full copy.
9. Every published article has a valid primary author.
10. New fields require a versioned schema decision; do not silently rename or repurpose an existing field.

## 9. SEO, linking and quality release gates

Before a page family can be considered complete:
- all local links and fragments resolve;
- canonical routes are unique and self-referencing;
- visible breadcrumbs match their JSON-LD;
- no draft/noindex records leak into links;
- sitemap set matches published/indexable generated HTML;
- parent/ancestor references validate;
- pages are reachable from a relevant crawlable hub;
- no route redirects to another redirect;
- images exist, are licensed/original, responsive and WebP-first;
- affiliate/sponsored links are disclosed;
- titles, descriptions and H1s are unique;
- page content is original and not thin/duplicated;
- keyboard, touch, responsive and reduced-motion behaviors are tested;
- static build succeeds and output is inspected.

Broken internal links, duplicate canonical ownership, geographic cycles, missing required page output, invalid sitemap membership or draft leakage are release blockers.

## 10. Cloudflare Pages verification checklist

Before first deploy:
1. Inspect connected repository and branch.
2. Verify whether Pages uses Git integration or an explicitly invoked build.
3. Confirm root/base directory, build command and output directory.
4. Ensure output directory contains generated static files only (`dist/` target).
5. Confirm trailing-slash route resolves to nested `index.html`.
6. Confirm 404 status/page behavior.
7. Confirm redirect config syntax and no redirect loops.
8. Confirm production canonical origin and HTTPS.
9. Confirm robots and XML sitemap use production origin and exclude preview.
10. Test nested route assets and relative/root-relative link policy.
11. Check plan and current product limits before choosing maximum content/assets/build sizes.

Do not change any setting until the user explicitly authorizes the deployment task.

## 11. Chat handoff protocol

At the end of each chat:
- list files created/updated;
- report exact branch and latest commit SHA;
- identify whether changes are committed but unmerged;
- report tests run and exact results (do not claim tests not executed);
- note unresolved decisions/blockers;
- update `PROJECT-STATE.md` and `TASK-BOARD.md`;
- specify exact next chat and its boundary;
- never merge to `main` without explicit user approval.

---

## 12. Final implementation start gate

Chat 2 can start only after the user explicitly requests Homepage Development and the following are confirmed:
- Phase 2.6 handoff is accepted;
- starting branch and commit are verified;
- no unknown changes are overwritten;
- canonical origin and Cloudflare build/output configuration are either verified or represented as safe environment configuration placeholders for preview only;
- build tooling choice is explicitly documented;
- the first implementation remains isolated from `main`.

**This handoff authorizes no code or deployment by itself.**


## 13. Current development-branch implementation note — 16 November 2026

This is a status clarification only; it does not change the Chat 3–7 ownership boundaries or authorize new implementation.

- The current development/homepage branch already contains src/data/pages.json with 37 unique route records and scripts/build.mjs generates a separate physical index.html for each record. The homepage and 404 page are emitted separately.
- The existing Project-State Phase 2.7 record documents the successful Preview build and live verification of all 37 routes (37/37 HTTP 200) on the recorded implementation commit. The older one-document/37-route-404 notes describe the pre-generation state and are superseded.
- These 37 records are existing branch work. Chat 3 has NOT started as a separate phase. Do not create additional country/continent/region/city/attraction page-family work under this continuation unless the user explicitly starts that phase.
- No page source or build code was changed as part of this Round 5 documentation reconciliation.
