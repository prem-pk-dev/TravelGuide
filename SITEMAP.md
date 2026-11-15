# Travel Guide — Complete Website Sitemap & Information Architecture

- **Project:** Travel Guide
- **Phase:** 2.1 — Sitemap & Website Architecture
- **Status:** Proposed architecture baseline
- **Research basis:** `COMPETITOR-ANALYSIS.md` (Phase 1 complete; five competitor audits)
- **Implementation constraint:** Static frontend only — HTML, CSS and Vanilla JavaScript
- **Content storage:** Version-controlled JSON files
- **Production branch:** `main` (not modified by this document)
- **Research branch:** `research/travel-guide-blueprint`

---

## 1. Architecture decisions

This sitemap separates **places**, **editorial content**, **taxonomies**, **itineraries**, **resources** and **site/legal pages** into distinct URL families. A country, city, attraction and article may refer to the same destination, but they are different content entities and must not share copied page text.

### 1.1 Entity model

| Entity | Meaning | Own indexable page? | Relationship |
|---|---|---:|---|
| Continent / macro-region | Top-level geographic discovery group | Yes, where substantial | Parent of countries and travel regions |
| Country | Sovereign destination guide | Yes | Child of macro-region |
| State / province / region | First-level or nested subnational guide | Yes, where substantial | Child of country or parent region |
| City | Urban destination guide | Yes | Child of country or state/region |
| Neighborhood | Local district guide | Conditional | Child of city |
| Attraction / point of interest (POI) | Specific landmark, park, museum, natural feature or venue | Yes, where unique and useful | Located within a city/region |
| Things-to-do collection | Editorially curated activities in a place | Yes, when a genuinely distinct collection exists | Usually scoped to a city, region or country |
| Travel category | Editorial subject taxonomy (e.g. food, culture, transport) | Yes, if it has unique editorial value | Classifies articles |
| Travel style | Audience/experience taxonomy (e.g. solo, family, adventure) | Yes, if substantial | Classifies articles and itineraries |
| Itinerary | A route or trip plan with a defined duration/sequence | Yes | May be scoped to a destination or travel style |
| Article | Original editorial story, guide, report or tutorial | Yes | May reference many destinations and taxonomies |
| Author | Editorial identity and authored work | Yes, for genuine authors | Author-to-article relationship |
| Resource | Evergreen planning tool, checklist or reference | Yes, when it has standalone value | Linked from relevant destination/articles |
| Legal/site page | Corporate, contact or policy content | Yes where appropriate | Global site navigation/footer |

**Important distinction:** A taxonomy archive is not a destination page. An itinerary article is not a city page. An attraction record is not merely a card or an anchor inside a city page. Keep their content, metadata, canonical URL and page template separate.

### 1.2 Static-site publishing model

- Every indexable URL is a separate physical `.html` document.
- JSON stores page content and relationships; it does not replace the HTML document.
- Use shared CSS/JS modules for presentation and interaction only. Do not turn the site into a client-rendered SPA.
- Build or generate the HTML files before deployment. A visitor must receive meaningful HTML for each route without requiring JavaScript to create the page.
- Vanilla JavaScript may progressively enhance search, filters, menus, table of contents and related-content modules.
- No backend, database, server-side rendering, account system or authentication is included.
- GitHub remains the content/code source of truth; Cloudflare Pages serves the static output.

---

## 2. Complete hierarchical sitemap

The tree below is the canonical intended information architecture. Optional/conditional branches should only be published once they contain unique, verified, useful content.

```text
/
├── index.html                                      Homepage
│
├── destinations/
│   ├── index.html                                  Destinations directory
│   ├── continents/
│   │   ├── index.html                              Continent directory
│   │   ├── africa.html
│   │   ├── asia.html
│   │   ├── europe.html
│   │   ├── north-america.html
│   │   ├── south-america.html
│   │   ├── oceania.html
│   │   └── antarctica.html                          Only if meaningful editorial coverage exists
│   └── countries/
│       ├── index.html                              Country directory
│       └── {country-slug}/
│           ├── index.html                          Country guide
│           ├── regions/
│           │   └── {region-slug}/index.html        State/province/region guide
│           ├── cities/
│           │   └── {city-slug}/index.html          City guide
│           └── attractions/
│               └── {attraction-slug}/index.html    Country-level POI only when needed
│
├── places/                                         Optional cross-cutting place finder
│   └── index.html                                  Do not duplicate destination directory
│
├── attractions/
│   ├── index.html                                  Attractions / POI directory
│   └── {attraction-slug}/index.html                Only for globally unambiguous POIs;
│                                                   preferred canonical route is nested
│                                                   under its city/region (see URL rules)
│
├── things-to-do/
│   ├── index.html                                  Things-to-do directory
│   ├── {country-slug}/index.html                   Country activity collection
│   ├── {country-slug}/{city-slug}/index.html       City activity collection
│   └── {country-slug}/{city-slug}/{theme-slug}.html
│                                                   Specific distinct collection
│
├── travel/
│   ├── index.html                                  Travel category directory
│   ├── planning/index.html
│   ├── food-and-drink/index.html
│   ├── culture-and-history/index.html
│   ├── nature-and-wildlife/index.html
│   ├── beaches-and-islands/index.html
│   ├── transport/index.html
│   ├── accommodation/index.html
│   ├── safety/index.html
│   ├── budget-travel/index.html
│   ├── photography/index.html
│   └── sustainable-travel/index.html
│
├── travel-styles/
│   ├── index.html                                  Travel style directory
│   ├── solo-travel/index.html
│   ├── family-travel/index.html
│   ├── couple-travel/index.html
│   ├── adventure-travel/index.html
│   ├── luxury-travel/index.html
│   ├── budget-travel/index.html
│   ├── slow-travel/index.html
│   ├── road-trips/index.html
│   └── accessible-travel/index.html                Publish only with real coverage
│
├── itineraries/
│   ├── index.html                                  Itinerary directory
│   ├── {country-slug}/index.html                   Country itinerary collection
│   ├── {country-slug}/{city-slug}/index.html       City itinerary collection
│   └── {itinerary-slug}/index.html                Individual itinerary detail
│
├── articles/
│   ├── index.html                                  Editorial article directory
│   └── {article-slug}/index.html                   Individual article
│
├── travel-tips/
│   ├── index.html                                  Travel tips hub
│   └── {tip-slug}/index.html                       Standalone tip/guide, if not an article
│
├── resources/
│   ├── index.html                                  Travel resources hub
│   ├── trip-planning-checklist/index.html
│   ├── packing-list/index.html
│   ├── travel-budget-planner/index.html
│   ├── travel-safety-checklist/index.html
│   ├── travel-document-guide/index.html
│   ├── travel-insurance-guide/index.html
│   └── photography-gear-guide/index.html
│
├── authors/
│   ├── index.html                                  Author directory (optional)
│   └── {author-slug}/index.html                    Author profile
│
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── privacy-policy/
│   └── index.html
├── terms-and-conditions/
│   └── index.html
├── affiliate-disclosure/
│   └── index.html
│
├── search/
│   └── index.html                                  Optional noindex client-side search page
│
├── 404.html                                        Static not-found page
├── robots.txt
└── sitemap.xml                                     Generated list of canonical indexable URLs
```

### 2.1 Example geographic hierarchy

The following examples illustrate relationships, not a commitment to publish every page immediately:

```text
/destinations/                                      Global directory
/destinations/continents/asia/                      Asia macro-region
/destinations/countries/india/                      India country guide
/destinations/countries/india/regions/rajasthan/    Rajasthan region guide
/destinations/countries/india/cities/jaipur/        Jaipur city guide
/destinations/countries/india/cities/jaipur/attractions/amber-fort/
                                                    Amber Fort attraction
```

Where a country-level region is not meaningful (for example, a very small country), link directly from country to city. Do not create empty or near-empty intermediary pages simply to complete a URL tree.

### 2.2 Homepage sections and entry pathways

Homepage is one HTML page, composed of distinct content modules rather than duplicated cards:

1. **Primary discovery hero:** Destination search and a small set of curated entry links.
2. **Explore destinations:** Continents and selected country/region features.
3. **Popular city guides:** Individually curated city cards.
4. **Attractions and experiences:** POI and things-to-do discovery.
5. **Plan a trip:** Itinerary and practical planning pathways.
6. **Explore by travel style:** Solo, family, adventure, budget and other supported styles.
7. **Latest editorial:** Recent original articles with author/date metadata.
8. **Travel resources:** Useful evergreen checklists and planning references.
9. **Editorial trust:** About the publication, authors and editorial standards.
10. **Newsletter / updates:** Only if a working, privacy-compliant signup service is configured.
11. **Footer:** Destination discovery, editorial categories, resources, About, Contact and legal links.

Modules are not separate indexable URLs unless they correspond to an entity in the sitemap. Homepage must not reproduce full article or destination content.

---

## 3. URL pattern table

Use lowercase ASCII slugs, hyphens between words, and trailing slashes as the preferred canonical convention. For GitHub Pages/Cloudflare Pages compatibility, each trailing-slash route maps to an actual `index.html` file.

| Page type | Canonical URL pattern | Example URL | Physical HTML path |
|---|---|---|---|
| Homepage | `/` | `https://travelguide.example/` | `/index.html` |
| Destinations directory | `/destinations/` | `/destinations/` | `/destinations/index.html` |
| Continent | `/destinations/continents/{continent}/` | `/destinations/continents/asia/` | `/destinations/continents/asia/index.html` |
| Country directory | `/destinations/countries/` | `/destinations/countries/` | `/destinations/countries/index.html` |
| Country | `/destinations/countries/{country}/` | `/destinations/countries/india/` | `/destinations/countries/india/index.html` |
| State/region | `/destinations/countries/{country}/regions/{region}/` | `.../india/regions/rajasthan/` | Corresponding `index.html` |
| City | `/destinations/countries/{country}/cities/{city}/` | `.../india/cities/jaipur/` | Corresponding `index.html` |
| Neighborhood | `.../cities/{city}/neighborhoods/{neighborhood}/` | `.../jaipur/neighborhoods/old-city/` | Corresponding `index.html` |
| Attraction | `.../cities/{city}/attractions/{attraction}/` | `.../jaipur/attractions/amber-fort/` | Corresponding `index.html` |
| Things to do directory | `/things-to-do/` | `/things-to-do/` | `/things-to-do/index.html` |
| City things to do | `/things-to-do/{country}/{city}/` | `/things-to-do/india/jaipur/` | Corresponding `index.html` |
| Travel category | `/travel/{category}/` | `/travel/food-and-drink/` | Corresponding `index.html` |
| Travel style | `/travel-styles/{style}/` | `/travel-styles/solo-travel/` | Corresponding `index.html` |
| Itinerary directory | `/itineraries/` | `/itineraries/` | `/itineraries/index.html` |
| Itinerary collection | `/itineraries/{country}/{city}/` | `/itineraries/india/jaipur/` | Corresponding `index.html` |
| Individual itinerary | `/itineraries/{itinerary}/` | `/itineraries/golden-triangle-7-days/` | Corresponding `index.html` |
| Article directory | `/articles/` | `/articles/` | `/articles/index.html` |
| Article | `/articles/{article}/` | `/articles/best-time-to-visit-jaipur/` | Corresponding `index.html` |
| Travel tips hub | `/travel-tips/` | `/travel-tips/` | `/travel-tips/index.html` |
| Individual tip | `/travel-tips/{tip}/` | `/travel-tips/how-to-pack-light/` | Corresponding `index.html` |
| Resources hub | `/resources/` | `/resources/` | `/resources/index.html` |
| Resource detail | `/resources/{resource}/` | `/resources/packing-list/` | Corresponding `index.html` |
| Author profile | `/authors/{author}/` | `/authors/editor-name/` | Corresponding `index.html` |
| About | `/about/` | `/about/` | `/about/index.html` |
| Contact | `/contact/` | `/contact/` | `/contact/index.html` |
| Privacy | `/privacy-policy/` | `/privacy-policy/` | `/privacy-policy/index.html` |
| Terms | `/terms-and-conditions/` | `/terms-and-conditions/` | `/terms-and-conditions/index.html` |
| Affiliate disclosure | `/affiliate-disclosure/` | `/affiliate-disclosure/` | `/affiliate-disclosure/index.html` |

**Domain note:** `travelguide.example` is illustrative only. Production canonical URLs must use the verified production custom domain or the current Cloudflare Pages hostname consistently. Do not mix preview, GitHub Pages and production hostnames in canonical tags.

### 3.1 Attraction URL decision

The preferred canonical POI route nests an attraction beneath its geographic parent. Example:

`/destinations/countries/india/cities/jaipur/attractions/amber-fort/`

This resolves ambiguity between attractions with similar names in different cities and makes breadcrumbs meaningful. The top-level `/attractions/` is a directory only; it must not create duplicate detail URLs.

### 3.2 Avoid ambiguous duplicate route families

Do not publish two indexable URLs for the same content, such as:

- `/jaipur/` and `/destinations/countries/india/cities/jaipur/`
- `/amber-fort/` and the nested attraction URL
- `/blog/best-jaipur-food/` and `/articles/best-jaipur-food/`
- `/tips/packing/` and `/travel-tips/packing/`

Choose one canonical route for each entity type. Old routes, if ever introduced, should redirect to the canonical path rather than render a second copy.

---

## 4. Page types and template responsibilities

| Page type | Required unique content | Main child/related links | Key metadata |
|---|---|---|---|
| Homepage | Editorial positioning, discovery options, curated highlights | Continent, country, city, article, itinerary, resources | WebSite, Organization/Publisher |
| Directory | Intro, browse/index controls, curated groupings, pagination where needed | Child entries | CollectionPage, ItemList |
| Continent | Region overview, geography, travel overview and country/region cards | Countries and regions | CollectionPage, BreadcrumbList |
| Country | Distinct overview, entry requirements (only verified), seasons, transport, culture, safety, budget, regions/cities | Regions, cities, POIs, itineraries and articles | TouristDestination / WebPage, BreadcrumbList |
| State/region | Distinct local identity, geography, key places, practical context | Cities, POIs, itineraries, articles | Place / WebPage, BreadcrumbList |
| City | Original city overview, neighborhoods, mobility, practical advice, attractions, food/culture context | Neighborhoods, POIs, things-to-do, itineraries, articles | Place / WebPage, BreadcrumbList |
| Neighborhood | Local orientation, boundaries/context, transit and distinct local highlights | City parent, nearby POIs, articles | Place / WebPage |
| Attraction | Original description, location, visit planning, access, visit duration only if verified, official visitor links | Parent city/region, nearby POIs, related articles | TouristAttraction / Place, BreadcrumbList |
| Things-to-do collection | Curated activity set with editorial rationale; not a generic list | POIs, city, relevant articles | CollectionPage, ItemList |
| Travel category | Category definition and curated relevant article list | Articles, subcategories | CollectionPage |
| Travel style | Style-specific guidance and curated content | Articles and itineraries | CollectionPage |
| Itinerary | Route purpose, day-by-day plan, time/distance notes only when grounded, practical caveats | Places, POIs, related articles | Article or Trip schema only when appropriate |
| Article | Original reporting/advice, author, publication/update dates, sources where relevant | Destination references, topics, style, related articles | Article / BlogPosting |
| Travel tip | One focused, actionable problem/answer | Relevant resources, destination and articles | Article / WebPage |
| Resource | A complete evergreen tool/reference with instructions | Relevant articles and destinations | WebPage; SoftwareApplication only if truly applicable |
| Author | Real bio, expertise, editorial role and authored works | Articles | ProfilePage, Person |
| About | Mission, editorial approach, ownership and trust information | Authors, contact, policy | AboutPage, Organization |
| Contact | Genuine contact route and response expectations | About, policies | ContactPage |
| Legal | Accurate current policy text and effective date | Related legal pages | WebPage |

Do not create a page solely to host a list of links. A page must provide a useful, distinct user purpose.

---

## 5. Navigation hierarchy

Keep global navigation shallow; geographic depth belongs in destination discovery pages, not an enormous first-level menu.

### 5.1 Primary desktop navigation

1. **Destinations** — directory, continents, countries and curated popular places.
2. **Things to Do** — attraction and activity discovery.
3. **Travel Guides** — travel topics, tips and resources.
4. **Itineraries** — destination- and duration-led trip plans.
5. **Travel Styles** — solo, family, adventure, budget and other supported styles.
6. **Articles** — latest editorial and features.
7. **About** — editorial identity and trust.

Utility navigation: Search and Contact. The logo links to `/`.

### 5.2 Navigation dropdown / mega-menu contents

- **Destinations:** Browse continents; country index; selected featured countries and cities. Use compact groups and an explicit “All destinations” link.
- **Things to Do:** Browse activities/topics and selected destination collections; do not display a huge unfiltered POI catalogue in the menu.
- **Travel Guides:** Planning, budget, transport, accommodation, food, culture, safety and resources.
- **Itineraries:** Browse by destination and trip length; link to the itinerary index.
- **Travel Styles:** Solo, family, couple, adventure, luxury, budget, slow travel and road trips where coverage exists.
- **Articles:** Latest, featured and article directory.

### 5.3 Mobile navigation

Use an accessible disclosure/drawer pattern, not a separate content architecture. All links must remain ordinary crawlable anchors. Requirements include visible focus, keyboard operation, Escape-to-close, focus return, correct `aria-expanded`, adequate touch target size and reduced-motion support.

### 5.4 Footer hierarchy

- Explore: Destinations, Things to Do, Itineraries.
- Read: Articles, Travel Guides, Travel Styles, Travel Tips.
- Plan: Resources and checklists.
- Company: About, Authors, Contact.
- Legal: Privacy Policy, Terms and Conditions, Affiliate Disclosure.
- Copyright and social links, only for active official profiles.

---

## 6. Breadcrumb structure

Breadcrumbs represent the canonical parent-child relationship. They are not automatically the visitor's browsing history.

| Page type | Breadcrumb example |
|---|---|
| Continent | Home → Destinations → Continents → Asia |
| Country | Home → Destinations → Continents → Asia → India |
| State/region | Home → Destinations → Asia → India → Rajasthan |
| City | Home → Destinations → Asia → India → Rajasthan → Jaipur |
| Neighborhood | Home → Destinations → India → Jaipur → Old City |
| Attraction | Home → Destinations → India → Jaipur → Attractions → Amber Fort |
| Things to do | Home → Things to Do → India → Jaipur |
| Travel category | Home → Travel Guides → Food and Drink |
| Travel style | Home → Travel Styles → Solo Travel |
| Itinerary collection | Home → Itineraries → India → Jaipur |
| Itinerary detail | Home → Itineraries → Golden Triangle in 7 Days |
| Article | Home → Articles → Best Time to Visit Jaipur |
| Travel tip | Home → Travel Tips → How to Pack Light |
| Resource | Home → Resources → Packing List |
| Author | Home → Authors → Author Name |

Rules:

- Use one visible breadcrumb trail per page.
- The first item links to the homepage.
- Every intermediate item links to its canonical parent page.
- The current page is the final item and should not link to itself.
- Do not place all geographic ancestors into an article breadcrumb unless the article itself is a child of that destination. Articles may instead show destination/topic tags and contextual links.
- Mark up visible breadcrumbs with valid `BreadcrumbList` structured data; structured data must match the rendered breadcrumb.

---

## 7. Canonical URL and SEO rules

### 7.1 Canonical URL policy

1. Each indexable page has exactly one absolute canonical URL.
2. Canonical host and protocol are consistent across all pages (HTTPS; one production hostname).
3. Prefer lowercase paths and hyphen-separated slugs.
4. Preferred directory routes end with a slash and resolve to their physical `index.html`.
5. Canonical tags point to the final public URL, never a preview deployment, branch URL or query-string variant.
6. Pagination pages should use a deliberate, consistent indexation policy; do not canonicalize every page of a genuinely distinct paginated list to page one if doing so hides discoverable content.
7. Tracking parameters (UTM, affiliate click IDs) must not create alternative canonical pages.
8. Search, filtered/sorted views and internal site-search results should generally be `noindex,follow` unless a specific curated filter page is deliberately published as an indexable landing page.
9. Do not publish empty taxonomy pages or thin location pages merely to increase URL count.

### 7.2 Slug policy

- Use stable, readable, descriptive slugs.
- Use the common English place name consistently; preserve official names in page content and aliases in JSON data.
- Do not encode dates, random IDs or mutable rankings in evergreen slugs.
- Avoid stopword-heavy or keyword-stuffed slugs.
- If a name changes or the preferred slug changes, maintain a redirect map from the old URL.
- Never reuse a retired slug for a different place/article.

### 7.3 Duplicate and near-duplicate content prevention

- Country, region, city, neighborhood and attraction pages must have distinct editorial scope and original copy.
- Destination pages may share schema/template but not duplicated paragraphs, generic filler or cloned lists.
- Category and style pages must have different editorial definitions and genuinely relevant article sets.
- An article may be tagged with multiple destinations/categories without generating duplicate article copies under each taxonomy path.
- One article slug resolves to one canonical `/articles/{slug}/` URL.
- An itinerary that is also written up as an article must have a single primary content entity. If a separate itinerary data page is justified, use clearly different content intent and cross-link it; otherwise keep the itinerary as the article.
- Do not create separate pages for trivial spelling variants, nearby attractions with no independent visitor intent, or every keyword permutation.
- Related-content cards must link to the original canonical target, not cloned copies.

### 7.4 On-page SEO and structured data

Each indexable HTML document should include:

- Unique `title` and meta description.
- Exactly one descriptive H1.
- Logical H2/H3 hierarchy.
- Self-referencing canonical URL.
- Descriptive internal anchor text.
- Open Graph and social metadata where appropriate.
- Language declaration and responsive viewport.
- A meaningful meta robots directive.
- Breadcrumb links where the page has a hierarchy.
- Relevant JSON-LD only when it describes visible, accurate page content.

Suggested structured data types, selected by actual content: `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Article` / `BlogPosting`, `Person`, `Place`, `TouristDestination`, `TouristAttraction`, `ItemList`. Do not add ratings, reviews, prices, opening hours, booking availability or first-hand claims unless real and verifiable.

### 7.5 Image SEO and media

- Use original or properly licensed photorealistic WebP images.
- Use unique, accurate alt text for informative images; empty alt for decorative images.
- Set intrinsic width/height to reduce layout shift.
- Supply responsive image candidates where available.
- Prioritize only the lead/LCP image; lazy-load below-the-fold images.
- Use descriptive filenames and stable asset paths.
- Do not reuse one image across unrelated cards/pages merely to fill a layout.
- Do not copy competitor photography, branding, graphics or editorial copy.

### 7.6 Internal linking

- Homepage links to the major top-level hubs.
- Continent pages link to countries and supported regions.
- Country pages link to regions, cities, major POIs, itineraries and useful articles.
- Region pages link to cities and local attractions.
- City pages link to neighborhoods, attractions, activity collections and itineraries.
- Attraction pages link to their parent destination and genuinely nearby POIs.
- Articles link contextually to relevant destination entities and other articles.
- Itineraries link to each stop's canonical city/POI page.
- Category/style pages link to curated articles and itineraries, not every site URL indiscriminately.
- Author pages link to authored articles; articles link back to real author profiles.
- Use HTML anchors for crawlable links. JavaScript-only click handlers must not replace navigation anchors.

---

## 8. Page priority and publishing sequence

| Priority | Page family | Reason | Launch gate |
|---|---|---|---|
| P0 — Essential | Homepage, destinations index, About, Contact, Privacy, Terms, Affiliate Disclosure, 404 | Core discovery, identity, contact and legal foundation | Real copy, working links, correct metadata |
| P1 — Core discovery | Continent directory/pages, country directory, priority country pages | Establish geographic taxonomy and crawl paths | Distinct country content and verified information |
| P1 — Core editorial | Articles index and initial high-quality articles; author profiles | Build editorial usefulness and trust | Original articles, sources, author attribution |
| P2 — Destination depth | Region/state and city guides | Add destination detail and local discovery | Unique content, enough useful local coverage |
| P2 — Activity depth | Things-to-do collections and attraction pages | Enable specific intent and local trip planning | Unique POI value and verified visit details |
| P2 — Planning depth | Itinerary hubs/details, travel categories and styles | Connect destinations to actionable trip plans | Distinct route/category/style content |
| P3 — Supporting | Resources and standalone travel tips | Evergreen utility and topical depth | Complete usable resource, not a thin teaser |
| P3 — Scale | More countries, regions, cities, POIs and editorial pages | Expand coverage based on quality and demand | Editorial QA and relationship integrity |

Priority is a release order, not a permission to publish low-quality pages. A page should remain unpublished until it passes content, metadata, image, link and factual verification checks.

---

## 9. Scalable static content and JSON organization

The exact source tree will be designed in Phase 2.2. This section defines the required data boundaries, not production code.

### 9.1 Suggested content collections

| JSON collection | One record represents | Key relationship fields |
|---|---|---|
| `site.json` | Global site identity, navigation and footer | Navigation link targets |
| `continents.json` | One continent/macro-region | Country/region IDs |
| `countries.json` | One country | Continent ID, region IDs, city IDs |
| `regions.json` | One state/province/region | Country ID, parent region ID, city IDs |
| `cities.json` | One city | Country ID, region ID, neighborhood/POI IDs |
| `neighborhoods.json` | One neighborhood | City ID, POI IDs |
| `attractions.json` | One POI | Parent place ID, coordinates if verified |
| `things-to-do.json` | One curated activity collection | Place ID, POI IDs, taxonomy IDs |
| `travel-categories.json` | One editorial topic | Parent taxonomy ID, article IDs |
| `travel-styles.json` | One audience/experience style | Article IDs, itinerary IDs |
| `itineraries.json` | One route/plan | Destination IDs, ordered stop IDs |
| `articles.json` | One editorial item | Author IDs, place IDs, category/style IDs |
| `travel-tips.json` | One focused tip | Related resource/article/place IDs |
| `resources.json` | One evergreen utility/reference | Related place/article IDs |
| `authors.json` | One real author/contributor | Article IDs |
| `redirects.json` | One legacy-to-canonical mapping | Old path, target path |

### 9.2 Record integrity rules

- Every record has a stable internal ID independent of its slug.
- Every published record has a unique canonical path.
- Foreign-key-like references must resolve to an existing record.
- Parent/child relationships must not form cycles.
- Itinerary stop order must be explicit.
- Author attribution must point to an actual author record.
- Related-content references must not point to missing or unpublished pages.
- Use explicit publication status (draft/published/archived) in source data; only published pages enter generated output and XML sitemap.
- Keep facts with expiry/update dates (for example visa, safety, fees, schedules) separate from evergreen narrative content and re-verify before publication.

### 9.3 Thousands of pages without SPA routing

- Generate one static HTML file per published canonical URL at build time.
- Use a small number of shared page templates to keep markup consistent, while injecting page-specific content at generation time.
- Split JSON into manageable collections/files by entity type and, where necessary, by continent/country; avoid one enormous JSON payload loaded on every page.
- Each HTML page should contain its important text and metadata in the delivered document; client-side fetching must not be required for initial content visibility or indexing.
- Load only the small data needed for progressive enhancement on that page.
- Use deterministic generation so the same source data always produces the same output.
- Generate `sitemap.xml` from published canonical records and chunk it using sitemap index files if URL volume exceeds protocol limits.
- Keep `robots.txt`, canonical host, redirects and 404 behavior aligned with the production deployment.
- Use pagination for large directories; provide crawlable previous/next or page links.
- Do not create thousands of thin placeholder pages simply because the architecture can scale.

---

## 10. Search, filters and directory behavior

Search is a progressive-enhancement feature, not the foundation of page delivery.

- Search should find destinations, cities, attractions, itineraries, articles and resources as distinct result types.
- Every result links to its canonical static HTML file.
- Use a prebuilt lightweight search index (for example, generated JSON) rather than a backend search API.
- Search query results should not become indexable URL variants by default.
- Directory filters may use query parameters for user convenience, but filtered combinations should be noindex unless explicitly curated and published as canonical landing pages.
- When JavaScript is unavailable, core directory links and category navigation must still work.
- Never suggest live availability, prices or schedules unless the site has a verified current data source; static editorial content should disclose when facts were last checked.

---

## 11. Technical URL-to-file and deployment rules

1. Root `/` resolves to `/index.html`.
2. `/destinations/countries/india/` resolves to `/destinations/countries/india/index.html`.
3. Every indexable route must exist as a separate HTML file in deployed output.
4. No catch-all rewrite to a single application shell.
5. Use relative asset paths that work from deeply nested pages, or a tested root-relative asset convention.
6. Internal links must point to the public canonical URL shape, not source JSON paths.
7. Unknown paths return a real `404.html` with an appropriate not-found status as supported by the host.
8. Preview/branch deployments must not be emitted into the production XML sitemap.
9. The current Cloudflare Pages URL is a deployment endpoint; canonical hostname policy should be confirmed before implementation and may change when a custom domain is configured.
10. Static HTML pages must remain readable and navigable without client-side route interception.

---

## 12. Content quality and indexation gates

Before a page is marked published/indexable, confirm:

- It has a distinct search/user intent and is not a duplicate of another URL.
- It contains original, useful content appropriate to its entity type.
- All factual, safety, visa, fee, transport and opening-hour claims have a source and checked date.
- Its title, description, H1, canonical and breadcrumb are unique and consistent.
- It has meaningful internal links to parent, sibling and relevant related pages.
- Every image is genuine, relevant, licensed/original and delivered as WebP.
- All internal links resolve to existing published HTML files.
- Structured data matches visible content.
- No placeholder copy, fake testimonials, invented authors, fake reviews or fabricated first-hand experiences exist.
- Affiliate/sponsored links are clearly disclosed in context.
- Legal text is reviewed for the actual site/business model before launch.

If a page fails these checks, keep it in draft data and omit it from navigation, generated public HTML and XML sitemap.

---

## 13. Explicitly out of scope for Phase 2.1

- No HTML, CSS or JavaScript production implementation.
- No JSON content files.
- No backend, database, authentication or CMS.
- No search service integration.
- No media generation/upload.
- No domain or Cloudflare configuration changes.
- No code or production deployment.
- No branch merge.

These are subsequent architecture/implementation decisions and must be handled in separate approved tasks.

---

## 14. Phase 2.1 completion checklist

- [x] Homepage and all requested content families represented.
- [x] Destinations, continent, country, region, city, neighborhood and attraction hierarchy defined.
- [x] Things-to-do, travel categories and travel styles separated.
- [x] Itineraries separated from editorial articles.
- [x] Travel tips and resources represented.
- [x] Author profiles and corporate/legal pages represented.
- [x] URL patterns and physical HTML mapping defined.
- [x] Breadcrumb hierarchy defined.
- [x] Canonical URL and duplicate-content policy defined.
- [x] Page types, navigation and page priorities defined.
- [x] Static JSON data boundaries and multi-page scaling rules defined.
- [x] Production code and `main` branch left out of scope.

**Next task:** Phase 2.2 — Static Website Architecture (define the directory/file structure, page-generation approach, JSON schemas and build/deployment constraints; do not begin website UI implementation until that architecture is reviewed).


---

## 15. Implemented sitemap generation and current published-page scope

The sitemap is generated from physical HTML output, not from proposed routes in this architecture. At present, the generated site contains only its homepage content HTML; homepage cards reference future routes that do not yet have physical HTML and therefore must not appear in the sitemap.

- \`scripts/sitemap.mjs\` includes only physical HTML with explicit \`index\` robots directive, a self-canonical HTTPS URL on the production origin, and a canonical path mapping to that physical HTML file. It excludes \`404.html\`, noindex documents, noncanonical duplicates and Preview hosts.
- Duplicate canonical ownership fails the build. No unverified \`lastmod\` is emitted.
- Preview: \`Allow: /\` permits crawlers to fetch pages, \`X-Robots-Tag: noindex, nofollow\` prevents indexing, robots.txt does not advertise a production sitemap, and the valid root sitemap is an empty urlset.
- Production with \`productionIndexingEnabled: false\`: preserve \`Disallow: /\`, HTML noindex and the global noindex header; generate a valid empty sitemap, not an indexable URL list.
- Production after separately approved launch: set the explicit flag to true; only then does robots.txt allow crawling and advertise the sitemap, page meta becomes index/follow and eligible physical canonical HTML enters the sitemap.
- Scale: each sitemap child is limited to 45,000 URLs or 45 MiB uncompressed. A single sitemap is emitted as a urlset; multiple chunks are emitted as \`sitemap-N.xml\` files referenced by a root sitemap index. This remains below Google's 50,000 URL / 50 MB sitemap ceilings and supports thousands of static pages. <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>
