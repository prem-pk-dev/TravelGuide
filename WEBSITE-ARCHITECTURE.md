# Travel Guide — Static Website Architecture

- **Project:** Travel Guide
- **Phase:** 2.2 — Static Website Architecture
- **Document status:** Architecture blueprint; requires review before implementation
- **Research branch:** `research/travel-guide-blueprint`
- **Production branch:** `main` (not modified)
- **Architecture style:** Multi-page static website (MPA), generated at build time
- **Runtime:** HTML5, CSS3, Vanilla JavaScript and static JSON
- **Hosting target:** Cloudflare Pages
- **Source of truth:** GitHub repository
- **Prerequisite documents:** `COMPETITOR-ANALYSIS.md`, `SITEMAP.md`

---

## 1. Architecture overview

Travel Guide will be a **static, multi-page publishing system**. It is not a single-page application. Every public, indexable route is emitted as an individual HTML5 document with its own page title, metadata, canonical URL, main content, semantic landmarks and crawlable links.

Structured JSON is the content source. A build-time generator reads JSON records and shared templates, validates relationships and produces complete HTML files. Browser-side Vanilla JavaScript enhances interactions such as navigation disclosure, search, table-of-contents behavior and optional filters. JavaScript is not responsible for creating the primary page content or deciding which URL to render.

### 1.1 Architectural flow

```text
AUTHORED SOURCE (GitHub)
  ├── Content JSON (places, articles, itineraries, authors, taxonomy)
  ├── Site configuration (navigation, canonical origin, metadata defaults)
  ├── Page templates (semantic HTML partials and page-type templates)
  ├── CSS (tokens, base, layout, components, page families)
  ├── Vanilla JS modules (progressive enhancement only)
  └── Media assets (photorealistic WebP; AVIF alternatives when available)
           |
           v
BUILD-TIME GENERATION + VALIDATION
  ├── Validate JSON schema and required fields
  ├── Validate IDs, slugs, parent-child relationships and references
  ├── Determine published pages and canonical paths
  ├── Render one HTML document per published page
  ├── Generate internal link targets and breadcrumbs
  ├── Generate metadata and JSON-LD
  ├── Generate search index JSON
  ├── Generate sitemap.xml and robots.txt
  ├── Copy/static-process CSS, JS, fonts and media
  └── Check local links, missing assets and duplicate canonicals
           |
           v
DEPLOY OUTPUT (static files only)
  ├── index.html
  ├── destinations/.../index.html
  ├── articles/.../index.html
  ├── itineraries/.../index.html
  ├── assets/css/*
  ├── assets/js/*
  ├── assets/data/search-index.json
  ├── assets/images/*
  ├── sitemap.xml
  ├── robots.txt
  └── 404.html
           |
           v
CLOUDFLARE PAGES (static file delivery)
           |
           v
BROWSER
  ├── Receives the requested HTML document
  ├── Renders page content without JS data fetching
  ├── Loads responsive images and CSS
  └── Runs optional Vanilla JS enhancements
```

### 1.2 Non-negotiable technical decisions

| Area | Decision |
|---|---|
| Page delivery | Multi-page static HTML; one HTML file per indexable route |
| Markup | HTML5 semantic elements |
| Styling | CSS3; modular files and design tokens |
| Interaction | Vanilla JavaScript modules; no framework runtime |
| Content | Static JSON, validated before build |
| Page generation | Build-time generation into static HTML |
| Client rendering | Not used for primary page content or routing |
| Routing | File/path mapping; no SPA route interception |
| Backend/database | None |
| Authentication/accounts | None |
| Server-side rendering | None |
| Hosting | Cloudflare Pages static assets |
| Version control | GitHub; branch-based review/publishing |
| Media | Original/licensed photorealistic WebP; AVIF as optional additional source |
| SEO | Per-document metadata, canonical, structured data and generated XML sitemap |

### 1.3 Build-time generation is not server-side rendering

The generator runs before deployment, using repository content and templates. It writes regular HTML files to an output folder. Cloudflare Pages serves those files; it does not execute the generator for a visitor request. There is no runtime page rendering, function, API, database or server-side application in this architecture.

---

## 2. Complete repository directory and file structure

The structure below is the recommended **source layout**. It is a target architecture for a later implementation phase; it does not claim that these directories currently exist. The current task creates documentation only.

```text
TravelGuide/
│
├── index.html                         # Generated homepage output (or copied static shell)
├── 404.html                           # Static not-found document
├── robots.txt                         # Generated production crawl rules
├── sitemap.xml                        # Generated sitemap (or sitemap index)
│
├── destinations/
│   ├── index.html
│   ├── continents/
│   │   ├── index.html
│   │   └── asia/index.html
│   └── countries/
│       ├── index.html
│       └── india/
│           ├── index.html
│           ├── regions/
│           │   └── rajasthan/index.html
│           └── cities/
│               └── jaipur/
│                   ├── index.html
│                   ├── neighborhoods/
│                   │   └── old-city/index.html
│                   └── attractions/
│                       └── amber-fort/index.html
│
├── things-to-do/
│   ├── index.html
│   └── india/jaipur/index.html
│
├── travel/
│   ├── index.html
│   ├── food-and-drink/index.html
│   └── culture-and-history/index.html
│
├── travel-styles/
│   ├── index.html
│   └── solo-travel/index.html
│
├── itineraries/
│   ├── index.html
│   ├── india/index.html
│   └── golden-triangle-7-days/index.html
│
├── articles/
│   ├── index.html
│   └── best-time-to-visit-jaipur/index.html
│
├── travel-tips/
│   ├── index.html
│   └── how-to-pack-light/index.html
│
├── resources/
│   ├── index.html
│   └── packing-list/index.html
│
├── authors/
│   ├── index.html
│   └── editorial-author/index.html
│
├── about/index.html
├── contact/index.html
├── privacy-policy/index.html
├── terms-and-conditions/index.html
├── affiliate-disclosure/index.html
│
├── src/
│   ├── config/
│   │   ├── site.json                  # Site identity and runtime/build defaults
│   │   ├── navigation.json            # Header, utility and footer navigation
│   │   ├── canonical.json             # Production canonical origin and path rules
│   │   └── image-policy.json          # Image sizes, format and quality policy
│   │
│   ├── content/
│   │   ├── destinations/
│   │   │   ├── continents/
│   │   │   ├── countries/
│   │   │   ├── regions/
│   │   │   ├── cities/
│   │   │   └── neighborhoods/
│   │   ├── attractions/
│   │   ├── things-to-do/
│   │   ├── taxonomies/
│   │   │   ├── travel-categories/
│   │   │   └── travel-styles/
│   │   ├── itineraries/
│   │   ├── articles/
│   │   ├── travel-tips/
│   │   ├── resources/
│   │   └── authors/
│   │
│   ├── data/
│   │   ├── redirects.json
│   │   ├── featured-content.json
│   │   └── editorial-settings.json
│   │
│   ├── templates/
│   │   ├── layouts/
│   │   │   ├── base.html
│   │   │   ├── article-layout.html
│   │   │   └── directory-layout.html
│   │   ├── partials/
│   │   │   ├── head.html
│   │   │   ├── skip-link.html
│   │   │   ├── site-header.html
│   │   │   ├── primary-navigation.html
│   │   │   ├── mobile-navigation.html
│   │   │   ├── breadcrumbs.html
│   │   │   ├── table-of-contents.html
│   │   │   ├── related-content.html
│   │   │   ├── author-byline.html
│   │   │   ├── affiliate-notice.html
│   │   │   ├── newsletter-module.html
│   │   │   ├── site-footer.html
│   │   │   └── structured-data.html
│   │   └── pages/
│   │       ├── home.html
│   │       ├── destination-index.html
│   │       ├── continent.html
│   │       ├── country.html
│   │       ├── region.html
│   │       ├── city.html
│   │       ├── neighborhood.html
│   │       ├── attraction.html
│   │       ├── things-to-do.html
│   │       ├── taxonomy.html
│   │       ├── itinerary-index.html
│   │       ├── itinerary-detail.html
│   │       ├── article-index.html
│   │       ├── article-detail.html
│   │       ├── travel-tip.html
│   │       ├── resource.html
│   │       ├── author.html
│   │       ├── about.html
│   │       ├── contact.html
│   │       └── legal.html
│   │
│   ├── styles/
│   │   ├── tokens/
│   │   │   ├── colors.css
│   │   │   ├── typography.css
│   │   │   ├── spacing.css
│   │   │   ├── layout.css
│   │   │   ├── shadows.css
│   │   │   └── motion.css
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── document.css
│   │   │   ├── typography.css
│   │   │   └── accessibility.css
│   │   ├── layout/
│   │   │   ├── container.css
│   │   │   ├── header.css
│   │   │   ├── navigation.css
│   │   │   ├── footer.css
│   │   │   └── grid.css
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── breadcrumbs.css
│   │   │   ├── forms.css
│   │   │   ├── search.css
│   │   │   ├── filters.css
│   │   │   ├── toc.css
│   │   │   ├── image-frame.css
│   │   │   └── pagination.css
│   │   ├── pages/
│   │   │   ├── home.css
│   │   │   ├── destination.css
│   │   │   ├── article.css
│   │   │   ├── itinerary.css
│   │   │   └── legal.css
│   │   └── main.css                    # CSS entry point/import order
│   │
│   ├── scripts/
│   │   ├── core/
│   │   │   ├── dom.js
│   │   │   ├── events.js
│   │   │   └── focus.js
│   │   ├── components/
│   │   │   ├── navigation.js
│   │   │   ├── search.js
│   │   │   ├── filters.js
│   │   │   ├── table-of-contents.js
│   │   │   ├── disclosure.js
│   │   │   └── back-to-top.js
│   │   ├── pages/
│   │   │   ├── destination-directory.js
│   │   │   └── article.js
│   │   └── main.js                    # Enhancement entry point
│   │
│   ├── schemas/
│   │   ├── common.schema.json
│   │   ├── destination.schema.json
│   │   ├── attraction.schema.json
│   │   ├── article.schema.json
│   │   ├── itinerary.schema.json
│   │   └── author.schema.json
│   │
│   └── media/
│       ├── images/
│       │   ├── destinations/
│       │   ├── regions/
│       │   ├── cities/
│       │   ├── attractions/
│       │   ├── articles/
│       │   ├── itineraries/
│       │   ├── authors/
│       │   └── general/
│       ├── icons/
│       └── fonts/
│
├── tools/
│   ├── build/                          # Build-time generator and validators
│   ├── validation/                     # Schema, link and asset checks
│   └── media/                          # Optional batch image processing tools
│
├── scripts/
│   ├── build                            # Documented build entry point
│   ├── validate                         # Documented validation entry point
│   └── check-links                      # Internal link checker entry point
│
├── tests/
│   ├── content/
│   ├── links/
│   ├── html/
│   └── accessibility/
│
├── dist/                                # Generated deployment output; not authored
│
├── .gitignore
├── README.md
├── COMPETITOR-ANALYSIS.md
├── SITEMAP.md
└── WEBSITE-ARCHITECTURE.md
```

### 2.1 Source versus generated files

- `src/` contains source content, templates, styles, scripts, schemas and media.
- `tools/` contains build-time tooling; it does not run on Cloudflare visitor requests.
- `dist/` contains generated HTML and static assets for deployment.
- If Cloudflare Pages is configured to deploy the repository root instead of `dist/`, the build workflow must deliberately copy the generated output into the configured output directory. Do not accidentally deploy source JSON/template folders as the production website.
- Generated documents should not be edited manually. Content changes belong in source JSON or templates and should be regenerated.
- The exact choice of build language/tooling is reserved for a future implementation decision. This document does not introduce a dependency or commit production code.

### 2.2 Physical HTML page requirement

Every indexable page is emitted as a separate HTML file:

| Public route | Generated file |
|---|---|
| `/` | `dist/index.html` |
| `/destinations/` | `dist/destinations/index.html` |
| `/destinations/countries/india/` | `dist/destinations/countries/india/index.html` |
| `/destinations/countries/india/cities/jaipur/` | `dist/destinations/countries/india/cities/jaipur/index.html` |
| `/destinations/countries/india/cities/jaipur/attractions/amber-fort/` | `dist/destinations/countries/india/cities/jaipur/attractions/amber-fort/index.html` |
| `/articles/best-time-to-visit-jaipur/` | `dist/articles/best-time-to-visit-jaipur/index.html` |

A directory-style URL is served by the host as its `index.html`. The generated HTML contains the actual page text, not only an empty root node waiting for JavaScript.

---

## 3. Separate HTML page architecture

### 3.1 Multi-page rendering model

A request for `/destinations/countries/india/` returns the India HTML document. A request for a city or article returns that page's own HTML document. Moving between pages is normal browser navigation using anchors.

The build generator may use templates to avoid copy/paste, but each generated document is a complete standalone HTML file.

### 3.2 Common HTML document contract

Every indexable document should include:

- `<!doctype html>`, `<html lang="en">`, character encoding and viewport.
- Unique `<title>` and meta description.
- Absolute canonical URL on the approved production origin.
- Open Graph/Twitter metadata where appropriate.
- CSS links and only the required JS enhancement entry point.
- A skip-to-content link.
- Shared site header and navigation.
- A `<main id="main-content">` landmark.
- Exactly one page-level H1.
- Breadcrumbs on hierarchical pages.
- Meaningful page content and crawlable related links.
- Shared site footer.
- Appropriate JSON-LD script, when applicable.
- No dependence on client-side fetch to display the page's primary content.

Example document outline (illustrative contract only, not production code):

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page-specific title | Travel Guide</title>
  <meta name="description" content="Unique page summary.">
  <link rel="canonical" href="https://PRODUCTION-ORIGIN/example/">
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header><!-- Shared header and navigation --></header>
  <main id="main-content">
    <nav aria-label="Breadcrumb"><!-- Canonical parent links --></nav>
    <article>
      <h1>Unique page heading</h1>
      <!-- Page-specific HTML content already exists in this document -->
    </article>
  </main>
  <footer><!-- Shared footer --></footer>
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

The example is a specification, not a complete page. All indexable content must be emitted in the final HTML by the generator.

### 3.3 Template families

| Template | Data input | Output responsibility |
|---|---|---|
| Home | Site config + curated features | Editorial/discovery home page |
| Directory | Ordered published IDs + labels | Crawlable category/destination index |
| Continent | Continent record + country/region refs | Macro-region page |
| Country | Country record + child region/city IDs | Country guide |
| Region | Region record + parent/city refs | State/province/region guide |
| City | City record + neighborhood/POI refs | City guide |
| Neighborhood | Neighborhood record + city/POI refs | Local guide |
| Attraction | POI record + parent location | Attraction detail |
| Things to do | Curated collection record | Place-specific activities |
| Taxonomy | Taxonomy record + article refs | Travel topic/style archive |
| Itinerary detail | Ordered stops and day data | Route/plan detail |
| Article detail | Article record + author/place refs | Editorial article |
| Resource/tip | Resource record + relationships | Evergreen planning page |
| Author | Author record + published article refs | Author profile |
| Legal/static | Approved content and effective date | About, Contact and policy pages |

A template may be shared by many records. This does not mean pages should share duplicate content or canonical URLs.

---

## 4. Shared header, navigation and footer architecture

Shared elements are rendered into each HTML file at build time. The browser should not fetch a header JSON file and assemble the global navigation after page load.

### 4.1 Header responsibilities

- Logo and homepage link.
- Primary navigation links from `navigation.json`.
- Utility search and contact links.
- Desktop disclosure/mega-menu controls only where the number of links justifies them.
- Mobile navigation trigger.
- Accessible state attributes in the initial markup.
- Consistent active-page indication where appropriate.

### 4.2 Navigation markup and behavior

- Primary navigation is a semantic `<nav aria-label="Primary">` containing ordinary anchors.
- A menu trigger uses a button; it controls a submenu with `aria-expanded` and `aria-controls`.
- The destination tree is not fully expanded into a giant mega menu; link to directories and selected priority destinations.
- Mobile and desktop may use different CSS layouts but share the same navigation destinations and information architecture.
- JavaScript enhances open/close behavior, Escape handling, focus return and outside-click behavior. Links work when scripting is unavailable.

### 4.3 Footer responsibilities

- Grouped links to the major sitemap hubs.
- About and genuine author/editorial information.
- Contact and policy links.
- Affiliate disclosure access.
- Social profile links only when official profiles exist and are active.
- Copyright year emitted at build time or updated by a small optional script; core footer must not depend on JavaScript.

### 4.4 Avoid duplicated maintenance

Navigation and footer link definitions live once in source config. The build generator renders those definitions into every output HTML document. A global navigation change therefore requires one source change and one rebuild, not edits to thousands of page files.

---

## 5. CSS architecture and design tokens

CSS is divided by responsibility to limit global regressions and keep page-family styling reusable.

### 5.1 CSS load order

1. Design tokens (custom properties).
2. Reset/normalization.
3. Document/base typography and defaults.
4. Global layout primitives.
5. Shared components.
6. Page-family styles.
7. Narrow, explicit utility styles if required.

### 5.2 Design token groups

| Token group | Examples of variables | Purpose |
|---|---|---|
| Brand colors | `--color-brand`, `--color-accent` | Stable brand identity |
| Surface colors | `--color-background`, `--color-surface`, `--color-border` | Page/card/panel surfaces |
| Text colors | `--color-text`, `--color-muted`, `--color-inverse` | Readable hierarchy |
| Feedback colors | `--color-success`, `--color-warning`, `--color-error` | State indication |
| Typography | `--font-body`, `--font-heading`, `--font-size-*`, `--line-height-*` | Consistent type scale |
| Spacing | `--space-1` through `--space-*` | Predictable vertical/horizontal rhythm |
| Layout | `--container-*`, `--sidebar-width`, `--header-height` | Common content geometry |
| Radius | `--radius-sm`, `--radius-card`, `--radius-pill` | Shape system |
| Shadow | `--shadow-card`, `--shadow-overlay` | Layer hierarchy |
| Motion | `--motion-fast`, `--motion-standard`, `--ease-standard` | Consistent transitions |
| Breakpoints | Documented media-query values | Responsive behavior |

Final color values, font choices and brand styling should be confirmed as a separate visual-design decision. Do not infer them from competitor brands.

### 5.3 Component CSS

Shared component styles include buttons, navigation, cards, image frames, breadcrumbs, forms, search, filters, pagination, table of contents, callouts and article metadata. Page CSS is reserved for genuinely page-family-specific layout, not duplicate component definitions.

### 5.4 CSS quality rules

- Mobile-first responsive rules.
- Avoid broad element selectors that cause unrelated page regressions.
- Use predictable class naming and component ownership.
- Use logical properties where practical.
- Provide visible keyboard focus.
- Meet WCAG contrast requirements in the final design.
- Respect `prefers-reduced-motion`.
- Avoid layout shifts from late image dimensions or injected content.
- Keep unused page CSS out of documents where practical through later build optimization; measure before adding complexity.

---

## 6. Vanilla JavaScript module architecture

JavaScript is progressive enhancement only. A page must remain a usable static document without it.

### 6.1 Module responsibility table

| Module | Responsibility | Must not do |
|---|---|---|
| `core/dom.js` | Small DOM helper functions | Create the entire page |
| `core/events.js` | Safe event helpers and delegation utilities | Install global handlers unnecessarily |
| `core/focus.js` | Focus movement/return helpers | Trap focus in non-modal navigation |
| `components/navigation.js` | Accessible menu open/close and disclosure state | Replace normal links with JS routing |
| `components/search.js` | Search form enhancement and local index lookup | Require a server API |
| `components/filters.js` | In-page filtering/sorting of already-present directory data | Create indexable routes from arbitrary filters |
| `components/table-of-contents.js` | Optional TOC enhancements/active section indicator | Hide headings from non-JS users |
| `components/disclosure.js` | Optional expandable panels | Break native details/summary behavior |
| `components/back-to-top.js` | Optional smooth return-to-top | Override reduced-motion preference |
| `pages/destination-directory.js` | Page-specific directory behavior | Load the whole destination database |
| `pages/article.js` | Article-only enhancements such as reading progress | Delay article content rendering |
| `main.js` | Initializes supported enhancements safely | Act as a SPA router or content renderer |

### 6.2 Initialization pattern

- Use native ES modules and `type="module"`.
- Each component initializes only when its expected root element exists.
- Use feature detection and null checks.
- Avoid inline event handlers.
- Do not attach duplicate listeners when modules initialize.
- Do not fetch content that should be embedded in the HTML.
- Search can load a generated compact search index only after the visitor starts searching or focuses the search feature.
- Use `defer`/module behavior so JS does not block initial HTML parsing.

### 6.3 No SPA boundaries

The following are explicitly prohibited:

- A single `index.html` with URL fragments or history manipulation rendering every page.
- Client-side route tables that swap page content without a new HTML document.
- Mandatory JS rendering of H1, body text, destination details or metadata.
- Fetch-on-navigation replacing regular anchor navigation.
- React, Next.js, Vue, Angular, Svelte or another application framework.

---

## 7. JSON content management architecture

### 7.1 Content ownership

JSON is the structured source for pages, relationships and editorial metadata. It is not the HTML delivered as the page. Each published JSON record is consumed by the build generator to produce one HTML document (where its content type is indexable).

Use separate JSON files by entity family and optionally by region/country as collections grow. Do not load all destination and article records into every browser page.

### 7.2 Common fields

Every content entity should support a common base:

| Field | Type | Required | Purpose |
|---|---|---:|---|
| `id` | string | Yes | Stable permanent identifier |
| `slug` | string | Yes for pages | Unique URL segment |
| `status` | enum | Yes | `draft`, `published`, `archived` |
| `title` | string | Yes | Editorial/display title |
| `description` | string | Yes for indexable page | Summary/metadata candidate |
| `canonicalPath` | string | Yes for indexable page | Canonical relative path |
| `seo.title` | string | Yes for indexable page | Page title override |
| `seo.description` | string | Yes for indexable page | Page-specific description |
| `seo.indexable` | boolean | Yes | Explicit indexation flag |
| `publishedAt` | ISO date | Where applicable | Publication date |
| `updatedAt` | ISO date | Where maintained | Last substantive update |
| `heroImage` | object/reference | For visual pages | Primary image and alt text |
| `relatedIds` | array | Optional | Related entity references |

### 7.3 Example country record

Illustrative JSON shape:

```json
{
  "id": "country-in",
  "type": "country",
  "slug": "india",
  "status": "published",
  "title": "India Travel Guide",
  "description": "A practical guide to exploring India's regions and cities.",
  "canonicalPath": "/destinations/countries/india/",
  "parentId": "continent-asia",
  "regionIds": ["region-rajasthan"],
  "cityIds": ["city-jaipur"],
  "heroImage": {
    "assetId": "india-hero",
    "alt": "Photographic view of a historic Indian city"
  },
  "seo": {
    "title": "India Travel Guide | Travel Guide",
    "description": "Explore India with destination guides, practical planning and city itineraries.",
    "indexable": true
  },
  "content": {
    "intro": "Original country-specific editorial introduction.",
    "bestTimeToVisit": [],
    "gettingAround": [],
    "culture": [],
    "safety": [],
    "lastFactChecked": "2026-11-01"
  }
}
```

### 7.4 Example city record

```json
{
  "id": "city-jaipur",
  "type": "city",
  "slug": "jaipur",
  "status": "published",
  "title": "Jaipur Travel Guide",
  "canonicalPath": "/destinations/countries/india/cities/jaipur/",
  "countryId": "country-in",
  "regionId": "region-rajasthan",
  "neighborhoodIds": ["neighborhood-old-city"],
  "attractionIds": ["poi-amber-fort"],
  "itineraryIds": ["itinerary-jaipur-2-days"],
  "articleIds": ["article-jaipur-best-time"],
  "heroImage": {
    "assetId": "jaipur-hero",
    "alt": "Photographic view of Jaipur's historic architecture"
  },
  "seo": {
    "title": "Jaipur Travel Guide | Travel Guide",
    "description": "Plan a Jaipur visit with city highlights and practical local guidance.",
    "indexable": true
  },
  "content": {
    "intro": "Original Jaipur-focused introduction.",
    "gettingAround": [],
    "neighborhoodOverview": [],
    "localPlanningNotes": []
  }
}
```

### 7.5 Example article record

```json
{
  "id": "article-jaipur-best-time",
  "type": "article",
  "slug": "best-time-to-visit-jaipur",
  "status": "published",
  "title": "Best Time to Visit Jaipur",
  "canonicalPath": "/articles/best-time-to-visit-jaipur/",
  "authorId": "author-editorial",
  "destinationIds": ["city-jaipur", "region-rajasthan", "country-in"],
  "categoryIds": ["category-planning", "category-weather"],
  "travelStyleIds": [],
  "publishedAt": "2026-11-14",
  "updatedAt": "2026-11-14",
  "heroImage": {
    "assetId": "jaipur-article-season",
    "alt": "Photographic scene in Jaipur during the cooler season"
  },
  "seo": {
    "title": "Best Time to Visit Jaipur | Travel Guide",
    "description": "Understand seasonal considerations when planning a Jaipur trip.",
    "indexable": true
  },
  "sections": [
    {
      "id": "season-overview",
      "heading": "Seasonal overview",
      "body": "Original article content."
    }
  ],
  "sourceNotes": []
}
```

### 7.6 Example attraction record

```json
{
  "id": "poi-amber-fort",
  "type": "attraction",
  "slug": "amber-fort",
  "status": "draft",
  "title": "Amber Fort",
  "canonicalPath": "/destinations/countries/india/cities/jaipur/attractions/amber-fort/",
  "countryId": "country-in",
  "regionId": "region-rajasthan",
  "cityId": "city-jaipur",
  "nearbyAttractionIds": [],
  "coordinates": null,
  "officialWebsite": null,
  "lastFactChecked": null,
  "seo": {
    "title": "Amber Fort Visitor Guide | Travel Guide",
    "description": "A destination guide to Amber Fort.",
    "indexable": false
  }
}
```

The draft status is intentional. The example does not invent visitor hours, fees, coordinates or official links. A page cannot be published as indexable until those fields/content are verified and its editorial scope is unique.

### 7.7 Destination relationship model

```text
CONTINENT
  └── COUNTRY
       └── REGION / STATE / PROVINCE
            └── CITY
                 ├── NEIGHBORHOOD
                 └── ATTRACTION / POI

CITY / REGION / COUNTRY
  ├── THINGS-TO-DO COLLECTIONS
  ├── ITINERARIES
  └── EDITORIAL ARTICLES

ARTICLE
  ├── AUTHOR
  ├── DESTINATION REFERENCES (many-to-many)
  ├── TRAVEL CATEGORY REFERENCES (many-to-many)
  └── TRAVEL STYLE REFERENCES (many-to-many)
```

Relationship rules:

- Use stable IDs for connections; do not use titles as foreign keys.
- Parent ownership and editorial references are different relationships.
- A city can reference multiple attraction IDs; an attraction belongs to one primary canonical parent location.
- An article can mention several places without being a child page under each place.
- Category/style archives reference article IDs; articles do not get duplicated into folders for every taxonomy.
- Itinerary stops store explicit order and point to canonical city/POI IDs.
- Parent-child relationships must be acyclic and all required references must resolve.

### 7.8 Schema validation

JSON Schemas should validate:

- Required field presence and expected data types.
- Enum values for type/status.
- Slug format and canonical path shape.
- Unique IDs and canonical paths.
- Relationship ID arrays.
- Date format and valid chronology.
- Image asset reference and alt-text requirements.
- SEO indexable rules.
- Itinerary ordered-stop structure.

Validation must run before HTML generation. Invalid or incomplete records must not silently produce partial public pages.

---

## 8. Country, region, city and attraction page generation strategy

### 8.1 Common generation sequence

For every entity:

1. Read source record.
2. Validate common fields and entity-specific schema.
3. Confirm status is `published` and indexable is true (where indexable).
4. Resolve parent and related references.
5. Resolve the canonical template.
6. Resolve image assets and alt text.
7. Build breadcrumb data from actual parent relationships.
8. Generate title, description, canonical and structured data.
9. Render page-specific content with the shared layout and partials.
10. Write to the physical path matching the canonical URL.
11. Add its canonical URL to the XML sitemap input set.
12. Run internal-link, metadata and output checks.

### 8.2 Template distinctions

| Page | Unique scope | Relationships and modules |
|---|---|---|
| Country | Countrywide context: entry/planning guidance, geography, culture and travel overview | Regions, cities, major attractions and country-relevant editorial |
| Region/state | Local regional identity, route context and subnational highlights | Country parent, cities and region POIs |
| City | City-specific orientation, districts, movement and local planning | Country/region, neighborhoods, attractions and city itineraries |
| Attraction | One specific point of interest and its visitor purpose | Parent city/region, nearby POIs and relevant local articles |

The template may share modules (hero, TOC, practical information, related links), but every page's actual text, lists, imagery and facts must remain record-specific.

### 8.3 Missing or thin content

- Do not generate public pages for records in draft status.
- Do not index a placeholder detail page that only contains a title and generic paragraph.
- A city may be linked from a country even if a full city page has not been approved; use a directory card only when appropriate.
- If a place has no meaningful child entity pages, omit that intermediate URL level.
- A POI without enough original content and verified practical context remains unpublished.
- Build validation should fail if an indexable child page has a missing canonical parent or invalid breadcrumb path.

---

## 9. Article templates and editorial content management

### 9.1 Article entity and page

Articles use one canonical URL under `/articles/{slug}/` as agreed in `SITEMAP.md`. Their destination and taxonomy references are metadata/relationships, not alternative copies of the same article.

### 9.2 Article data fields

- Stable ID, slug, status, title, excerpt and canonical path.
- Author ID and optional reviewer/editor ID, if genuine.
- Publication and update timestamps.
- Hero image and contextual image references.
- Content blocks/sections with stable heading IDs.
- Destination, topic/category and travel-style ID arrays.
- Sources/fact-check notes where applicable.
- Related article IDs.
- SEO title/description and indexability state.
- Affiliate/sponsored disclosures when applicable.

### 9.3 Article rendering

- Article HTML contains full text at initial delivery.
- Render semantic headings and paragraphs; create a TOC from section IDs.
- Display publication/update information accurately.
- Link the author byline to the author profile.
- Link destination mentions contextually to canonical destination pages.
- Display affiliate disclosures near affected recommendations, not only at the bottom.
- Show related articles only when their references exist and are relevant.
- Preserve an editorial difference between an article, destination guide and itinerary detail.

### 9.4 Editorial workflow

1. Create draft JSON record.
2. Assign author and destination/taxonomy references.
3. Add original copy, fact sources and media references.
4. Run schema and relationship validation.
5. Review images, internal links, metadata, disclosure and factual freshness.
6. Set status to published only after review.
7. Rebuild all affected static outputs.
8. Review generated HTML and preview deployment.
9. Commit and publish through the approved branch workflow.

---

## 10. SEO metadata, canonical URLs and structured data

### 10.1 Metadata source hierarchy

1. Page-specific SEO data on the content record.
2. Entity-specific fallback generated from the page title and editorial summary.
3. Global site defaults only for non-indexable/utility pages or safe fallback.

Do not allow global default metadata to make thousands of pages share the same title or description.

### 10.2 Per-page SEO output

Each indexable HTML document must contain:

- Unique title.
- Unique meta description.
- Exactly one descriptive H1.
- Self-referencing absolute canonical URL.
- Language and viewport declarations.
- Open Graph title/description/image/URL.
- Appropriate robots directive.
- Descriptive image alt text.
- Breadcrumb markup when present.
- Relevant JSON-LD based on the page's visible content.

### 10.3 Canonical origin

A single production origin must be selected before the first deployable implementation. Until a custom domain is confirmed, the current Cloudflare Pages hostname can be used consistently for previews or testing, but canonical policy must not accidentally mix:
- Cloudflare preview hostnames,
- the production Pages hostname,
- GitHub repository URLs,
- localhost.

Build should take the canonical origin from a single configuration field rather than hardcoding it in content records.

### 10.4 Structured data

Examples by page type:

| Page | Possible type | Constraints |
|---|---|---|
| Site | `WebSite`, `Organization` | Real brand/publisher data only |
| Homepage | `WebPage` | Match visible content |
| Directory | `CollectionPage`, `ItemList` | Only items visibly linked on the page |
| Country/region/city | `Place`, `TouristDestination`, `WebPage` | Do not invent geo or visitor data |
| Attraction | `TouristAttraction`, `Place` | Accurate, visible location details only |
| Article | `Article` / `BlogPosting` | Real author and dates |
| Author | `Person`, `ProfilePage` | Genuine contributor identity |
| Breadcrumb | `BreadcrumbList` | Same hierarchy as visible breadcrumb |

Use JSON-LD generated at build time. Validate JSON syntax and consistency with visible HTML. Structured data is not a route generator or ranking guarantee.

---

## 11. Internal linking architecture

Internal links are derived from content relationships but emitted as normal `<a href>` anchors in the HTML source.

### 11.1 Link graph

- Continent → country.
- Country → region and city.
- Region → city.
- City → neighborhood and attraction.
- Attraction → parent destination and relevant nearby POIs.
- Country/region/city → associated things-to-do collections.
- Destination → relevant itineraries and original editorial stories.
- Article → cited/relevant destinations and other useful articles.
- Itinerary → each stop's canonical city/attraction page.
- Taxonomy → curated article collection.
- Article → genuine author profile.
- Author → published articles.
- Resource → related planning articles and destinations.

### 11.2 Link integrity checks

Build-time validation should flag:

- Missing target page.
- Link to a draft or archived record.
- Canonical path mismatch.
- Self-link or cyclic navigation edge where inappropriate.
- Empty anchor text.
- Broken image links.
- Redirect chains where avoidable.
- Orphaned published pages without useful inbound links.
- Invalid breadcrumb ancestors.

A published page should have an intentional path from a directory, parent page or related-content context. Do not add artificial footer keyword lists to force every page into the link graph.

---

## 12. XML sitemap and robots architecture

### 12.1 Generated sitemap

The generator reads the set of successfully rendered pages and includes only pages that are:
- Published.
- Indexable.
- Canonical.
- Successful static HTML output.
- Not redirected, search results, preview-only or utility-only URLs.

Include absolute canonical URLs. Add `lastmod` only from a real substantive update date; do not update it merely because a rebuild ran.

### 12.2 Sitemap scale

- A single sitemap can contain up to 50,000 URLs and be no larger than 50 MB uncompressed under the standard protocol.
- When the site approaches those limits, generate multiple child sitemaps grouped by content type and a sitemap index.
- Validate that every sitemap URL returns the canonical page and no non-indexable URL is included.
- Do not assume an XML sitemap guarantees indexing.

Suggested sitemap families when needed:

```text
sitemap.xml                     # Sitemap index when split is required
sitemap-core.xml
sitemap-destinations-01.xml
sitemap-destinations-02.xml
sitemap-attractions-01.xml
sitemap-articles-01.xml
sitemap-itineraries-01.xml
sitemap-resources-01.xml
```

### 12.3 robots.txt

- Allow crawling of public HTML and media.
- Do not block CSS/JS required to render pages.
- State the production sitemap location.
- Avoid disallow rules that conflict with indexable routes.
- Preview deployment policy should be handled separately through deployment controls/noindex, not by placing preview links in production sitemaps.

---

## 13. WebP and AVIF image asset organization

### 13.1 Format policy

- Photorealistic WebP is the project's required standard delivery asset.
- AVIF may be generated as an additional modern format where the source and toolchain support it.
- Retain a WebP fallback for every image for which AVIF is provided.
- Keep original licensed/source masters in a controlled source location when needed for future reprocessing, but do not serve oversized masters to normal page views.
- Never convert an image by merely changing its file extension; actual format encoding must be verified.

### 13.2 Asset naming and directory strategy

Organize media by entity type and stable asset identity, not by temporary page layout position.

```text
src/media/images/
├── destinations/
│   ├── continents/
│   ├── countries/
│   └── regions/
├── cities/
├── neighborhoods/
├── attractions/
├── articles/
├── itineraries/
├── authors/
└── general/
```

Asset filenames should be:
- Lowercase.
- Descriptive.
- Stable.
- Unique.
- Free of spaces and ambiguous suffixes such as `final-final-2`.

Example:

```text
jaipur-hawa-mahal-hero-1600.webp
jaipur-hawa-mahal-hero-800.webp
jaipur-hawa-mahal-hero-480.webp
jaipur-hawa-mahal-hero-1600.avif
```

The example names represent a variant set, not existing files.

### 13.3 Image manifest

A central or generated manifest should record:

- Asset ID.
- Actual file path for each format/width.
- Width and height.
- Accurate alt text per usage (or content-level alt text).
- Source/licence/credit.
- Intended crop or focal point if relevant.
- File size and optimization result.
- Usage references.

The content record should refer to an asset ID rather than duplicating raw image paths across multiple records. Avoid using one generic image for unrelated places.

---

## 14. Responsive image loading and optimization

### 14.1 Responsive output

Use `<picture>` when AVIF and WebP alternatives exist, then a WebP `<img>` fallback with responsive width candidates. The `srcset`/ `sizes` values should match actual generated dimensions and the real CSS layout.

Illustrative markup only:

```html
<picture>
  <source
    type="image/avif"
    srcset="/assets/images/jaipur-hero-800.avif 800w,
            /assets/images/jaipur-hero-1600.avif 1600w"
    sizes="(max-width: 760px) 100vw, 1200px">
  <source
    type="image/webp"
    srcset="/assets/images/jaipur-hero-480.webp 480w,
            /assets/images/jaipur-hero-800.webp 800w,
            /assets/images/jaipur-hero-1600.webp 1600w"
    sizes="(max-width: 760px) 100vw, 1200px">
  <img
    src="/assets/images/jaipur-hero-800.webp"
    width="1600"
    height="1000"
    alt="Accurate description of the Jaipur scene"
    fetchpriority="high"
    decoding="async">
</picture>
```

Only include real file variants. Never claim AVIF support where no AVIF asset exists.

### 14.2 Loading rules

| Image role | Loading behavior |
|---|---|
| Hero/LCP image | Eager load; high priority only for the actual primary image |
| First viewport supporting image | Eager only if it affects visible layout/experience |
| Below-the-fold editorial image | `loading="lazy"` |
| Related-card thumbnail lower on page | Lazy load |
| Decorative CSS background | Use CSS only when appropriate; avoid large background for key content |
| Small logo/icon | Use an optimized file and explicit dimensions |

### 14.3 CLS and image UX

- Always emit explicit width and height.
- Keep layout aspect ratio stable.
- Use a crop that preserves the focal subject.
- Ensure alt text is meaningful; decorative images use empty alt.
- Use thumbnails for card sizes instead of downloading the hero asset.
- Avoid loading multiple high-resolution copies for one card.
- Do not lazy-load the primary LCP hero image.
- Test on slow mobile networks and verify no large layout shift.

### 14.4 Image pipeline limits

The final image conversion tool, compression quality and automated batch process will be selected in a later implementation task. This document sets the contract; it does not create or upload media. Third-party image transformation/CDN requirements are not assumed.

---

## 15. Cloudflare Pages compatibility

### 15.1 Static hosting model

Cloudflare Pages serves the generated output directory as static assets. The website does not require Workers, Pages Functions, D1, KV, R2, a backend or a database.

Expected routing:

| Requested URL | Static output file |
|---|---|
| `/` | `/index.html` |
| `/destinations/` | `/destinations/index.html` |
| `/articles/example/` | `/articles/example/index.html` |
| Unknown URL | `/404.html` |

The route/file conventions should be tested on the actual Cloudflare Pages project before mass generation. Do not use a catch-all rewrite to `index.html`.

### 15.2 Build and output settings

- GitHub repository is the source.
- Cloudflare Pages build command should run the approved static generator and validators.
- Build output directory should point to the generated deploy folder (recommended `dist`).
- Build must fail on schema errors, duplicate canonicals, missing required assets or invalid internal links.
- No server runtime is needed.
- Preview builds must not publish themselves as production canonicals or enter the production sitemap.

Exact Pages build command and directory are implementation settings and must be confirmed in the connected Cloudflare project. Do not change them during this research-only task.

### 15.3 Cloudflare configuration and static files

- Preserve directory-style URLs through real `index.html` output.
- Include a real `404.html`.
- Use a production `robots.txt` and sitemap URL.
- Configure cache headers only after a deliberate asset/versioning policy is chosen.
- Fingerprinted/versioned assets can be cached for a long time; HTML and sitemap freshness should be considered separately.
- Use immutable cache policy only for assets with versioned filenames.
- Do not place secrets or private credentials in repository source or static files.
- Static hosting does not provide private content security; all deployed files are public.

### 15.4 Static-hosting limits

Cloudflare Pages plan limits, file limits, build limits, bandwidth policy and current product terms can change. Confirm actual account/plan limits before selecting maximum per-build page counts or asset sizes. The architecture avoids assuming a specific current quota.

---

## 16. GitHub-based content publishing workflow

### 16.1 Git branch policy

- `main` is the production branch.
- `research/travel-guide-blueprint` is the research/documentation branch for the current phase.
- Future implementation should use a dedicated implementation branch created from the approved base.
- No merge into `main` without explicit approval.
- Do not modify existing research documents when a task requests a new separate deliverable.
- Every production-content change should be reviewed as a diff before merge.

### 16.2 Publishing stages

```text
AUTHOR / EDITOR
    |
    v
Change JSON / content / media metadata on a working branch
    |
    v
Git commit + push
    |
    v
Validation
  - JSON schemas
  - unique IDs and slugs
  - relationship references
  - canonical uniqueness
  - required media
  - local links
    |
    v
Build static HTML into dist/
    |
    v
HTML / SEO / sitemap / accessibility checks
    |
    v
Cloudflare Pages preview deployment (if configured)
    |
    v
Manual preview QA and review
    |
    v
Approved pull request / explicit merge decision
    |
    v
Production deployment from main
```

### 16.3 Content publishing controls

- Draft records do not generate public indexable pages.
- Published records generate page output only after validation.
- Content edits should update `updatedAt` only for substantive changes.
- Slug changes require a redirect entry.
- Media changes require asset-manifest and dimension checks.
- The build should produce a report of created/updated/removed HTML paths.
- Deleted content should be reviewed for replacement, redirect or 404 behavior.
- A failed validation must stop publication rather than silently dropping content.

### 16.4 Preserve traceability

Every architecture/content release should identify:
- Source branch and commit SHA.
- Files changed.
- Generator/validation result.
- Preview URL when available.
- Approval/merge decision.
- Production commit/deployment reference.

---

## 17. Scalability for thousands of separate HTML pages

### 17.1 What scales well

- Static HTML delivery scales independently of a runtime application server.
- Shared templates reduce maintenance cost while output remains page-specific.
- JSON entity collections support bulk data editing and validation.
- A search index can be pre-generated rather than querying a server.
- Asset variants reduce bandwidth for responsive devices.
- Static files are cacheable at the edge.

### 17.2 Main scaling risks

| Risk | Why it becomes costly | Architecture response |
|---|---|---|
| One huge JSON file | Slow parsing, large browser downloads and merge conflicts | Split by entity/type and region; only build tool loads full data |
| One huge browser search index | High memory and download cost | Generate compact indexes; shard by region/type if needed |
| Rebuilding everything for every change | Build time grows with page count | Start with deterministic full build; optimize to dependency-aware/incremental build only when measurements justify it |
| Duplicate/invalid records | IDs, slugs and parent links drift | Schema and relationship validation |
| Thousands of low-quality pages | Thin content and crawl waste | Editorial indexation gate |
| Asset duplication | Repository/storage and bandwidth waste | Asset manifest, deduplication and variants |
| Huge mega menus | Poor UX and excessive navigation links | Link to directories and curated entry points |
| Orphan pages | Hard to discover and crawl | Parent and contextual internal-link validation |
| Large output sitemap | Protocol limits | Sitemap index and grouped child sitemaps |
| Excessively broad global CSS/JS | More bytes and regression risk | Modular CSS and small shared JS entry |
| Preview URL contamination | Duplicate hosts in search | Canonical host configuration and preview noindex policy |

### 17.3 Full versus incremental builds

Initial recommendation: use a simple deterministic full build. Thousands of pages may still be manageable depending on generator, content size and asset handling. Measure real build duration and failure rate first.

Consider incremental generation only if measured page-count/build-time growth makes full rebuilds impractical. Incremental generation requires a reliable dependency graph (for example, a country change invalidates its related city/directory pages, metadata, search index and sitemap). A stale dependency graph is worse than a slower complete build.

### 17.4 Content partitioning

Partition large datasets by entity type, then optionally by country/region. Avoid partitioning so aggressively that relationships require hundreds of network requests. Build-time tools can load many source JSON files; the deployed site should load only the assets it needs.

### 17.5 Practical page count

The architecture can emit many HTML files, but there is no fixed safe page-count guarantee. Actual limits depend on:
- Total HTML bytes.
- Build duration and memory.
- Number and size of assets.
- Git repository growth.
- Search-index size.
- Cloudflare Pages plan/build constraints.
- Validation and deployment duration.

Benchmark using representative country, region, city, attraction and article records before generating the full catalogue. The number of pages should follow editorial quality and real user value, not a target count alone.

---

## 18. Performance architecture

### 18.1 HTML and resource loading

- Serve pre-generated HTML.
- Keep critical CSS small and avoid render-blocking third-party assets.
- Use native browser behavior wherever possible.
- Load module JS after parsing; keep scripts small and page-aware.
- Avoid loading full content collections on every page.
- Preload only genuinely critical fonts/images and avoid blanket preloading.
- Set explicit dimensions for images and embedded media.
- Use efficient static asset caching.
- Minimize third-party widgets; they are not required by this architecture.

### 18.2 Static search

Search index must be generated from published records. It should hold only fields needed for search (ID, title, type, canonical URL, short excerpt, destination names/tags). Do not put entire article bodies or enormous image metadata into the search index.

Search should be lazy-loaded on intent. For very large content sets, shard by prefix/region/type or use a lightweight browser index with bounded results. Keep the search page itself noindex unless there is a deliberate indexable editorial landing page.

### 18.3 Performance measurement

Measure representative page types on:
- Mobile and desktop viewports.
- Fast and constrained network conditions.
- First and repeat visits.
- Homepage, large destination, long article, attraction and directory pages.

Track at minimum:
- LCP
- INP
- CLS
- HTML transfer size
- JS/CSS transfer size
- Image bytes and request count
- Search-index download/parse cost
- Cloudflare build duration

Do not claim a performance score until tested.

---

## 19. Accessibility architecture

Accessibility is built into generated HTML and enhanced interactions.

### 19.1 HTML requirements

- Semantic landmarks: header, nav, main, article, aside where appropriate, footer.
- Logical heading hierarchy and one page-level H1.
- Visible skip link.
- Descriptive link text.
- Form labels and helpful validation.
- Accurate alt text; decorative image alt is empty.
- Tables have appropriate headers/captions.
- Link and button roles are used correctly; do not use clickable divs for navigation.
- Breadcrumbs are a labelled navigation region.
- Dates use semantic time markup when applicable.

### 19.2 Interactive requirements

- Complete keyboard access.
- Focus visible in all interactive states.
- Menus expose expanded/collapsed state.
- Escape closes open navigation panels where appropriate.
- Focus returns to menu trigger after close.
- No keyboard trap in a non-modal menu.
- Search suggestions announced accessibly if implemented.
- Reduced-motion preferences are respected.
- Touch targets are sufficiently large and do not rely on hover.

### 19.3 Verification

Before implementation sign-off, test with automated HTML/accessibility checks and manual keyboard/screen-reader checks. Automated tests alone do not certify WCAG conformance.

---

## 20. Security, privacy and operational boundaries

- All deployed HTML, CSS, JS, JSON and media are public.
- Never put secrets, API keys, personal data, private editorial drafts or passwords in the deployed asset tree.
- Static frontend cannot securely authenticate users or protect paid/private content.
- Do not create a fake newsletter success state; only use a genuine configured form provider in a later approved task.
- Avoid collecting personal data unless a real, privacy-compliant service and policy are configured.
- External links should use appropriate security attributes when opening a new tab.
- Use a restrictive, tested Content Security Policy only after all required asset and form origins are known; do not blindly deploy a policy that breaks the site.

---

## 21. Known limitations and decisions still requiring confirmation

| Topic | Current architecture decision | What remains to be verified/selected |
|---|---|---|
| Build generator | Static build-time HTML generation | Tool/language and implementation |
| Source folder | `src/` source, `dist/` output | Final repo migration and scripts |
| Deployment output | Cloudflare Pages serves generated static output | Actual Pages build command/output directory |
| Production hostname | One configured canonical origin | Confirm whether current Pages hostname or a custom domain is canonical |
| JSON validation | JSON Schema and relationship checks | Validation tooling and CI implementation |
| Image conversion | WebP mandatory; AVIF optional additional format | Converter, quality, variant widths and optimization benchmark |
| Search | Generated static JSON index | Search UX and sharding threshold |
| Redirects | Static host redirect configuration/data | Cloudflare-compatible redirect implementation and limits |
| Page scale | Thousands are supported architecturally | Benchmark actual HTML/media/build limits |
| Accessibility | Semantic-first, progressive enhancement | Formal manual and automated QA |
| Analytics | Not included by default | Decide later only with privacy requirements |
| Newsletter | No backend/form service assumed | Configure a legitimate third-party provider only if approved |

No plan quota, page-count threshold or performance score is asserted without testing the live project and account settings.

---

## 22. Phase 2.2 acceptance checklist

- [x] Architecture overview and static MPA principles.
- [x] Complete proposed repository directory tree.
- [x] Separate HTML document model for every indexable URL.
- [x] Shared header, navigation and footer rendered at build time.
- [x] CSS tokens, layers and component organization.
- [x] Vanilla JavaScript module responsibilities and no-SPA boundaries.
- [x] JSON content ownership and representative country/city/article/attraction data shapes.
- [x] Destination entity relationships and validation rules.
- [x] Country, region, city and attraction generation workflow.
- [x] Article templates and editorial publishing workflow.
- [x] SEO metadata, canonical URL and structured data architecture.
- [x] Internal linking and link-validation approach.
- [x] XML sitemap and robots architecture.
- [x] WebP/AVIF asset organization and responsive image behavior.
- [x] Lazy loading, LCP and CLS considerations.
- [x] Cloudflare Pages static-hosting model.
- [x] GitHub-based branch, preview and publishing workflow.
- [x] Scalability risks and mitigations for thousands of files.
- [x] Performance and accessibility architecture.
- [x] No production code, deployment setting or main-branch change included.

**Phase 2.2 status:** Architecture blueprint prepared. This document does not implement the generator, schemas, templates, frontend or Cloudflare configuration.

**Next task:** Phase 2.3 — Destination Page Hierarchy. Define the complete destination entity hierarchy, geographic parent-child rules, page relationships, taxonomy boundaries and destination-level navigation before implementation.
