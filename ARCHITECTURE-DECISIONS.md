# Travel Guide — Architecture Decisions

- **Phase:** 2.6 — Final Architecture Documentation
- **Status:** Consolidated architecture decision record for implementation planning
- **Research branch:** `research/travel-guide-blueprint`
- **Production branch:** `main` (not modified)
- **Authority:** This file resolves cross-document ambiguities; detailed source specifications remain preserved in their original phase documents.

---

## 1. Purpose and decision authority

This document freezes the project-level implementation baseline after Phases 2.1–2.5. It does not replace the detailed research documents or silently rewrite them.

### 1.1 Precedence when documents differ

Apply this authority order:

1. **Sitemap / URL and physical page contract:** `SITEMAP.md` (Phase 2.1).
2. **Runtime, source tree, templates, build output and hosting model:** `WEBSITE-ARCHITECTURE.md` (Phase 2.2).
3. **Geographic entity types, parent/ancestor identity and geographic record shape:** `DESTINATION-PAGE-HIERARCHY.md` (Phase 2.3).
4. **Article, taxonomy, authorship and editorial content contracts:** `ARTICLE-CONTENT-ARCHITECTURE.md` (Phase 2.4).
5. **Rendered relationship, recommendation and link validation policies:** `INTERNAL-LINKING-ARCHITECTURE.md` (Phase 2.5), provided they do not contradict items 1–4.
6. **Competitor research:** `COMPETITOR-ANALYSIS.md` is supporting design evidence, never a route/schema/technical authority.

A future approved architecture change must update the owning source document and this decision record together, with reason and migration impact.

### 1.2 Global technical baseline

| Concern | Final decision |
|---|---|
| Site type | Multi-page static website (MPA) |
| Markup | HTML5 semantic documents |
| Styling | CSS3, modular styles and design tokens |
| Browser behavior | Vanilla JavaScript progressive enhancement only |
| Content source | Version-controlled static JSON |
| Rendering | Deterministic build-time generation |
| Public output | Individual physical HTML document for every indexable URL |
| Hosting | Cloudflare Pages static assets |
| Repository source of truth | GitHub |
| Backend/API server | None |
| Database | None |
| Authentication/accounts | None |
| SPA/client-side router | None |
| Media | Original or licensed photorealistic WebP as required delivery format; AVIF optional with WebP fallback |
| SEO | Per-page metadata, canonical, structured data when valid, generated sitemap/robots |
| Research/development separation | Research branch remains separate; no merge to `main` without explicit approval |

Build-time generation is not SSR: the generator runs before deploy and emits files; Cloudflare Pages serves files only. Do not add Workers, Functions, D1, KV, R2, external CMS runtime or account system as part of this baseline.

---

## 2. Page and URL contract

### 2.1 Canonical route policy

Use the exact route patterns in `SITEMAP.md`, lowercase ASCII slugs, hyphens and trailing slash canonical paths. Every trailing-slash page route maps to its own `index.html` under the generated deployment output.

| Page family | Final canonical route |
|---|---|
| Home | `/` |
| Destination directory | `/destinations/` |
| Continent | `/destinations/continents/{continent}/` |
| Country directory | `/destinations/countries/` |
| Country | `/destinations/countries/{country}/` |
| Region/state | `/destinations/countries/{country}/regions/{region}/` |
| City | `/destinations/countries/{country}/cities/{city}/` |
| Neighborhood | `/destinations/countries/{country}/cities/{city}/neighborhoods/{neighborhood}/` |
| Attraction | `/destinations/countries/{country}/cities/{city}/attractions/{attraction}/` |
| Things-to-do directory | `/things-to-do/` |
| City things-to-do | `/things-to-do/{country}/{city}/` |
| Travel category | `/travel/{category}/` |
| Travel style | `/travel-styles/{style}/` |
| Itinerary directory | `/itineraries/` |
| Itinerary collection | `/itineraries/{country}/{city}/` |
| Individual itinerary | `/itineraries/{itinerary}/` |
| Article directory | `/articles/` |
| Article | `/articles/{article}/` |
| Travel tips hub/detail | `/travel-tips/`, `/travel-tips/{tip}/` |
| Resources hub/detail | `/resources/`, `/resources/{resource}/` |
| Author profile | `/authors/{author}/` |
| Site/legal pages | Exact routes in `SITEMAP.md` |

The canonical route table in `SITEMAP.md` wins over inconsistent illustrative URLs in other documents. Do not add `/blog/`, alternate root-level city/attraction URLs, duplicate tip routes or any competing route family without a documented route migration.

### 2.2 Attraction URL resolution

Use nested city path as canonical: `/destinations/countries/{country}/cities/{city}/attractions/{attraction}/`. The top-level attraction directory, if implemented, is a directory only and must not host duplicate attraction detail pages.

### 2.3 Physical output rule

For every indexable page route `/x/y/`, generate `dist/x/y/index.html`; home generates `dist/index.html`. Include a real `404.html`. There is no catch-all rewrite to a shared SPA shell.

Generated HTML contains the initial visible content, canonical URL, headings, breadcrumb (where required), essential internal anchors and page metadata before the browser executes JavaScript.

---

## 3. Geographic model and relationship decisions

### 3.1 Two relationship graphs

Keep two systems distinct:

- **Geographic containment graph:** a destination has at most one canonical `parent_destination_id`; child collections are derived from that field. Optional geographic levels may be omitted.
- **Editorial/semantic association graph:** explicit typed many-to-many relationships connect destinations, articles, itineraries, tips, resources, attractions and taxonomy. These links never change geographic parentage.

A Things-to-do collection is an editorial collection, not a geographic parent. Articles and itineraries are not geographic children of destinations.

### 3.2 Geographic identity

- Stable unique `destination_id`.
- `destination_type` from the controlled hierarchy vocabulary.
- `parent_destination_id` for one canonical parent, or null for a root.
- Ancestor IDs such as `continent_id`, `country_id`, `region_id`, `city_id` are validated against the resolved parent chain.
- `slug` is route identity only within its approved route scope; it is not a relationship key.
- `canonical_url` is computed/validated against the route registry, not manually inferred by concatenating arbitrary parent slugs.
- Children are generated from `parent_destination_id`; do not store a conflicting independently maintained child list.

### 3.3 Content ownership and geography

A destination record owns geographic containment. Articles own their destination associations. Itineraries own destination associations and ordered stops. Attraction records own their geographic parent and may have editorial cross-references. One association does not create a second canonical page or a second parent.

---

## 4. Content, taxonomy and authorship decisions

### 4.1 Article contract

Use the stable Phase 2.4 core fields and exact meanings:

- `article_id`, `title`, `slug`, `excerpt`, `content`, `article_type`
- `primary_category_id`, `category_ids`, `tag_ids`, `travel_style_ids`, `audience_ids`, `theme_ids`
- `destination_ids`, `itinerary_ids`, `attraction_ids`, `related_article_ids`
- `author_id`, `contributor_ids`, `reviewer_id`
- `hero_image`, `gallery`
- `published_at`, `updated_at`, `status`, `canonical_url`, `seo_metadata`, and editorial fact-check/disclosure/revision metadata as specified in Phase 2.4.

Do not rename `destination_ids` to `place_ids`, `author_id` to `writer_id`, or replace the category/style/tag fields with a generic taxonomy field.

### 4.2 Taxonomy boundaries

- Category = primary topic/subject.
- Subcategory = child node in a category tree.
- Tag = specific cross-cutting descriptor; no public tag archive by default.
- Travel style = mode/approach to travel, with archive only when sufficient useful content exists.
- Audience = intended reader group; no public archive by default.
- Theme = internal editorial campaign/curation; no public archive by default.
- An article has one primary category; optional secondary category membership is controlled and not a substitute for tags/styles.

### 4.3 Authors

- Every published article has a valid primary `author_id` and visible byline.
- `contributor_ids` and `reviewer_id` preserve distinct credited roles.
- Author profiles link to genuinely credited published work.
- Do not publish empty/thin author archives solely because an ID exists. Author detail routes are defined in `SITEMAP.md`; author index inclusion is optional until a meaningful directory is approved.

### 4.4 Itinerary distinction

An itinerary is a structured route/day/stops entity. An article about a journey is a separate editorial entity only when it has a distinct purpose. Avoid duplicate route guides with nearly identical content. Itinerary collections and detail pages use the specific distinct route patterns in `SITEMAP.md`.

---

## 5. Breadcrumb and internal-link decisions

### 5.1 Breadcrumbs

Breadcrumbs follow the approved sitemap and actual canonical hierarchy, not examples that introduce non-canonical intermediary pages.

- Destination: Home → Destinations → actual canonical geographic ancestors → current page. Skip missing optional levels.
- Attraction: use its actual canonical city-nested route. Do not insert an `Attractions` directory crumb unless that directory is made an actual canonical parent route in a future approved sitemap change.
- Things-to-do: Home → Things to Do → the collection's canonical parent/index path; country/city references are navigational context, not geographic parentage.
- Article: Home → Articles → Article.
- Category: Home → Travel Guides/Travel → Category, using the approved category hub route.
- Travel style: Home → Travel Styles → Style.
- Itinerary collection: Home → Itineraries → Collection; individual itinerary: Home → Itineraries → Itinerary.
- Travel tip: Home → Travel Tips → Tip.
- Resource: Home → Resources → Resource.
- Author: Home → Authors → Author only when a useful Authors index is actually published; otherwise use Home → Author profile with no fabricated index link.
- Legal/site pages follow exact sitemap routes.

The visible breadcrumb and JSON-LD `BreadcrumbList` must match exactly. All ancestor crumbs link to canonical targets; current item is not a self-link. Do not set an article breadcrumb parent to a destination just because it references that destination.

### 5.2 Link generation

Use stable entity IDs in source JSON. Build-time page registry maps IDs to entity type, canonical URL and generated output path. Render ordinary HTML anchors after reference/type/publication validation. Browser JavaScript is not required for core navigation or relationship discovery.

### 5.3 Recommendations

Curated links first, relevance-ranked candidates second. Exclude self, duplicate canonical URLs, unpublished/noindex/draft/archived/redirect targets, invalid relationships and editor-suppressed records. Use "nearby" only with verified geographic evidence; "popular" only with real analytics or a clearly disclosed editorial selection method. Deduplicate repeated cards across modules.

---

## 6. SEO and metadata contract

Every indexable HTML page must have:
- unique `<title>`, meta description and one H1;
- exactly one absolute HTTPS self-canonical using the verified production origin;
- appropriate index/follow directives;
- semantic heading hierarchy and descriptive internal anchors;
- responsive viewport and language declaration;
- Open Graph/social metadata where appropriate;
- JSON-LD schema only when it matches visible, verified content;
- breadcrumb UI + matching `BreadcrumbList` on page types requiring breadcrumbs;
- real WebP image URLs, relevant alt text, dimensions and responsive variants;
- inclusion in generated XML sitemap only when published, indexable, canonical and output HTML exists.

Search/filter states are noindex by default. Tracking parameters never create alternate canonical records. Redirect aliases are not canonical pages; internal links should point directly to final routes.

---

## 7. Images and static assets

- Original/licensed photorealistic WebP is the required standard delivery asset.
- AVIF is optional as an additional `<picture>` source only when an actual variant exists; retain WebP fallback.
- Generate responsive width variants for actual page/card roles and set intrinsic dimensions.
- Load priority is reserved for the real above-the-fold/LCP image; lazy-load below-the-fold imagery.
- Keep an asset manifest with stable asset identity, path, format, dimensions, alt text/credit/license and content association as required by the implementation architecture.
- Never use competitor images, logos, copy or proprietary brand assets.
- Verify actual delivered format/weight; file extensions alone do not prove performance.

---

## 8. Cloudflare Pages and GitHub decisions

- GitHub is source of truth; use isolated work branches and review/preview before production merge.
- Cloudflare Pages serves static generated `dist/` output.
- Build command and output directory must be checked against the live Pages project settings before first implementation deploy.
- Keep source `src/` separate from generated `dist/`; never accidentally publish JSON/templates as the public root.
- No catch-all SPA rewrite.
- Include tested static 404, robots, sitemap and redirect behavior.
- Use the single verified production origin for canonical generation. The existing Pages hostname is a deployment endpoint; custom domain/hostname status is not established by these research documents.
- No Cloudflare settings, domain, deployment, Pages Functions, Workers or paid storage integrations are changed by Phase 2.6.

---

## 9. Scale and operations decisions

- Load JSON collections once per build.
- Validate IDs/types/relationships once; build forward and reverse indexes in O(N + E).
- Use `destinationById`, `childrenByParentId`, content-by-destination/category/style/author indexes, canonical URL and page registries, and redirect indexes.
- Avoid all-pairs matching; use inverted indexes and bounded candidates.
- Generate deterministic static HTML and compare source eligible routes, generated HTML routes and sitemap URLs.
- Use pagination/directory pages for large collections, not unbounded link dumps.
- Run full build first. Incremental rebuilds are permitted only after proving equivalence against a full build.
- Link/canonical/parent/redirect/sitemap failures block release; unverifiable external link responses are reported separately from confirmed broken links.

---

## 10. Explicit unresolved implementation choices

These are not architecture contradictions and must be decided/tested before the corresponding production task:
1. Actual production canonical hostname and whether a custom domain is configured.
2. Live Cloudflare Pages project build command, root/base directory and output directory.
3. Exact pinned build-time generator/tooling and template rendering library (must not introduce a browser runtime framework).
4. Exact machine-readable JSON Schema files and schema versioning for destination, itinerary, travel tip, resource, author, taxonomy and relationship edge records.
5. Precise ownership/field paths for reverse relationships not present in the existing approved core schemas.
6. Page-family-specific pagination size, indexation/canonical behavior and sitemap partitioning after expected page counts are known.
7. Cloudflare-compatible redirect/404 behavior verified in deployed previews.
8. Image converter, WebP quality target, responsive widths, AVIF production and asset license metadata.
9. Search index format and measured sharding threshold.
10. Actual content coverage, content-quality gates, and whether optional directory index pages (authors/attractions) should be published.

No unresolved item permits replacing static MPA with a backend, database, SPA or server-rendering system.

---

## 11. Change-control rule

Do not resolve ambiguity by quietly changing an existing data field or URL. Record:
- source document and section;
- old decision and affected examples;
- proposed new behavior;
- route/data migration requirements;
- redirect/canonical impacts;
- affected templates/indexes/sitemap;
- approval and effective commit.

**Final architecture baseline:** The decisions above govern the first implementation. Detailed specifications in Phases 2.1–2.5 remain the supporting references.
