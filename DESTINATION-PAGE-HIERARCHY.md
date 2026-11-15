# Travel Guide — Destination Page Hierarchy

- **Project:** Travel Guide
- **Phase:** 2.3 — Destination Page Hierarchy
- **Document status:** Research and information-architecture specification
- **Research branch:** `research/travel-guide-blueprint`
- **Production branch:** `main` (not modified)
- **Prerequisites:** `COMPETITOR-ANALYSIS.md`, `SITEMAP.md`, `WEBSITE-ARCHITECTURE.md`
- **Technical model:** Static JSON source → build-time validation/generation → separate HTML documents
- **Scope:** Geographic entity hierarchy, destination-page responsibilities, relationships, URL/breadcrumb rules, content boundaries and scalability

---

## 1. Purpose and architecture decisions

This document defines how Travel Guide represents geographic places and how each geographic entity becomes an individual static page when it has enough original, useful content.

The hierarchy is:

**Continent / Macro-region → Country → State / Province / Region → City → Neighborhood → Attraction / Point of Interest (POI)**

This is a **preferred geographic browse hierarchy**, not a claim that every place in the world fits one rigid six-level chain. Some countries do not use states, some destinations have islands or autonomous territories, some cities are outside a formal state hierarchy, and some attractions are rural or belong to a national park rather than a city. The data model therefore supports optional levels and explicit parent-child links.

### 1.1 Canonical decisions

| Concern | Decision |
|---|---|
| Place identity | Every geographic entity has one permanent `destination_id` |
| Geographic type | Explicit `destination_type` enum |
| Geographic parent | One primary `parent_destination_id` for a canonical tree |
| Additional geographic context | References such as `country_id`, `region_id`, `city_id` |
| Editorial relationship | Separate many-to-many lists for articles, itineraries and collections |
| Child discovery | `child_destination_ids` or generated child lookup; do not maintain conflicting duplicate lists |
| URL | One canonical path per published destination page |
| Static output | One HTML file per indexable destination record |
| Page template | Shared type-specific template; unique record content |
| Breadcrumb | Generated from the canonical parent chain |
| Duplicate control | Unique stable IDs, slugs within the defined namespace and canonical paths globally |
| Missing hierarchy level | Optional; no fake parent page is created |
| Publishing | Only validated, substantial published records generate indexable HTML |

### 1.2 Two relationship systems — keep them separate

1. **Geographic ownership:** parent/child, such as Jaipur → Rajasthan → India → Asia. This relationship determines the canonical URL hierarchy and breadcrumbs.
2. **Editorial association:** an article, itinerary or thing-to-do collection may be relevant to Jaipur, Rajasthan and India at the same time. This is a set of references, not multiple page parents.

An article associated with three destinations still has one article URL. An attraction has one primary geographic parent and one canonical detail URL. Never create duplicate pages because several places or articles reference the same entity.

---

## 2. Complete geographic hierarchy

```text
GLOBAL DESTINATION DIRECTORY
└── CONTINENT / MACRO-REGION
    └── COUNTRY
        └── STATE / PROVINCE / REGION (optional)
            └── CITY / TOWN / SETTLEMENT
                └── NEIGHBORHOOD / DISTRICT (optional)
                    └── ATTRACTION / POINT OF INTEREST (POI)

Exceptions supported:
- Country → City (no published region page)
- Country → Region → Attraction (rural/regional attraction)
- Region → Attraction (national park, natural landmark, remote site)
- City → Attraction (when a region page is absent)
- Country → Island / Sub-region entity (typed as a region)
- Continent → Country or recognized travel macro-region
```

The directory layer may show additional editorial groupings (popular places, trending destinations, travel regions), but those groupings do not automatically become additional geographic parents.

### 2.1 Continent / macro-region

**Purpose:** Global/regional orientation and a directory of countries and recognized travel regions.

**Responsibilities**
- Introduce geographic scope and travel context.
- Link to supported countries and sub-regions.
- Explain regional distinctions only where editorially useful.
- Feature a limited selection of priority destinations.
- Link to relevant regional travel planning articles and itineraries.

**Not responsible for**
- Detailed country-specific visa advice.
- City-level transport instructions.
- Attraction visitor details.
- A long list of every city on the continent.

**Page sections**
1. Continent/macro-region title and distinct introduction.
2. Geography and orientation.
3. Featured countries.
4. Recognized travel regions/island groups (where relevant).
5. Major travel themes and experiences.
6. Regional itinerary examples.
7. Related planning guides.
8. Links to child country/region pages.

**Page generation:** one continent record → one continent HTML document, only if the page has a meaningful purpose and useful child discovery.

### 2.2 Country

**Purpose:** A country-wide travel guide and parent hub for subnational destination pages.

**Required/optional content modules**
1. Country overview: identity, geography and orientation.
2. Original introduction explaining what a traveller should understand before exploring.
3. Best time to visit at national level, including climate variation across major regions.
4. Regions, states or provinces with links to published child pages.
5. Major cities and settlements.
6. Popular attractions and nationally significant POIs.
7. Things to do across the country, with links to genuinely useful collections.
8. Country-level travel guides and articles.
9. Country itinerary collections and representative routes.
10. Travel information: language, currency, time zone, electricity, entry/document information and other practical topics, only where verified.
11. General transport context (national rail/air/road networks, not city route instructions).
12. Safety and health/travel advisories with source and checked date.
13. Related countries or regional destinations where a meaningful travel connection exists.
14. Last-reviewed/fact-checked information where applicable.

**Country-level editorial boundary**
- Describe national rules and broad patterns.
- Link to official government sources for entry requirements and advisories.
- Avoid stating that one national climate, cost or transport pattern applies uniformly to every state/city.
- Do not repeat full city descriptions or attraction visitor guides from child pages.
- City names may appear in short child cards with a one-sentence distinction; deeper detail stays on the city page.

### 2.3 State / province / region

**Purpose:** A geographically meaningful subdivision with its own identity, routes, cities and local attractions.

**Page sections**
1. Region overview and distinct introduction.
2. Parent country link and geographic orientation.
3. Region-specific best time to visit and seasonality, where it materially differs from national guidance.
4. Major cities and settlements.
5. Important regional attractions and natural/cultural areas.
6. Regional experiences and things-to-do collections.
7. Local transport and route context.
8. Region-specific itineraries.
9. Region-relevant travel articles and tips.
10. Related neighboring regions.

**Boundary**
- Explain the region; do not reprint the whole country page.
- Keep national facts on the country page and link to them.
- A state/province is a region subtype, not a second duplicate page type.
- Create a region page only if it has distinct visitor intent and enough verified original content.

### 2.4 City / town / settlement

**Purpose:** A practical local guide to one urban destination or settlement.

**Page sections**
1. City overview, orientation and original introduction.
2. Location within its parent region/country.
3. Neighborhoods and districts.
4. Major attractions / POIs.
5. Things to do in this city.
6. Restaurants, cafés, markets and local experiences as editorial guides only; no live inventory or booking/availability claims.
7. Best time to visit, including local seasonality and events where verified.
8. Getting around: airport/rail arrival context, local transit, walking and local transport guidance.
9. City itineraries by duration or theme.
10. Practical local information: safety, money, local etiquette and visitor considerations.
11. Related city articles and travel tips.
12. Parent country/region and nearby destination links.

**City-level boundary**
- Describe local conditions and neighbourhood differences.
- Use the country page for nationwide entry, currency and policy information; link back rather than copying entire sections.
- Do not duplicate each attraction's full detail; provide curated cards with short summaries and links.
- Do not imply that an editorial restaurant list represents real-time opening status, prices, reservation slots or ratings.

### 2.5 Neighborhood / district

**Purpose:** A local sub-area of a city with a distinct identity and useful visitor context.

**Page sections**
1. Neighborhood introduction and where it sits in the city.
2. Local character and practical orientation.
3. Streets/areas or micro-areas where useful.
4. Relevant attractions, markets and experiences.
5. Getting there and moving around.
6. Suggested visit context or itinerary links, when supported.
7. Related city page and nearby neighborhood links.

**Boundary**
- Neighborhood is subordinate to a city, not a second city page.
- Do not create neighborhood pages for every named locality. Require distinguishable user intent and original useful content.
- Avoid unverified claims about safety, boundaries, opening times or local identity.
- If there is not enough unique content, list the neighborhood on the city page without publishing a separate indexable page.

### 2.6 Attraction / Point of Interest

**Purpose:** A specific place that a visitor may want to understand or visit: monument, museum, park, religious/cultural site, natural feature, viewpoint, beach, trail, national park, market or other attraction.

**Page sections**
1. Attraction name, category and original summary.
2. Geographic location and parent destination.
3. What the place is and why it is notable.
4. What visitors may experience or see.
5. Practical visiting guidance, with verification date.
6. Access and transport context.
7. Official website/contact reference when verified.
8. Fees, opening hours, booking or accessibility details only when authoritative and current.
9. Photography/media with accurate credits and alt text.
10. Nearby attractions and related city/region guides.
11. Related articles and itineraries.

**Boundary**
- An attraction page is not an article archive or an attraction card expanded into generic filler.
- Facts that change (hours, prices, closures, tickets) require an explicit source and last-checked date.
- If the attraction is rural or belongs to a national park, its canonical parent may be the region or park rather than an unrelated nearby city.
- Every POI must have one primary geographic parent, even if it is displayed on several city/region collections.

### 2.7 Things-to-do pages

A things-to-do page is a **curated editorial collection**, not a geographic administrative level and not a POI entity.

Examples:
- `/things-to-do/india/jaipur/`
- `/things-to-do/india/jaipur/heritage-and-culture/`

**Page sections**
1. Clear place and activity intent.
2. Editorial introduction explaining the scope and curation basis.
3. Categorized experiences.
4. Linked POI cards with short unique summaries.
5. Practical planning context.
6. Relevant itinerary links.
7. Related articles and parent destination links.

**Rules**
- It references attraction IDs; it does not clone attraction descriptions.
- It has its own URL only when it serves a distinct, useful collection intent.
- An arbitrary filter combination should not automatically create an indexable page.
- The directory page is a collection, whereas each attraction remains a place entity.

---

## 3. Geographic entity type system

Use a fixed enum in the validated content model.

| `destination_type` | Meaning | Geographic parent type | Child types typically allowed |
|---|---|---|---|
| `continent` | Continent or top-level macro-region | None | country, region (when the macro-region is an editorially recognized geographic region) |
| `country` | Country | continent | region, city, attraction (exceptional) |
| `region` | State, province, territory, island group or subnational region | country or parent region | region, city, attraction |
| `city` | City, town or settlement | country or region | neighborhood, attraction |
| `neighborhood` | Neighborhood, district or local quarter | city | attraction |
| `attraction` | POI or visitor place | city, neighborhood, region or country | No canonical geographic children by default |

A POI may reference another POI as a related/nearby point, but this is not a parent-child relationship. Large sites with internal exhibits/sub-attractions may be modelled as separate POIs only if each page has a distinct visitor purpose.

### 3.1 Administrative versus editorial geography

Not every geographic concept should be a page in the same tree:
- Continents and countries are major geographic levels.
- State/province/region is a flexible subnational level.
- City, neighborhood and POI represent local visitor geography.
- Travel themes such as “Northern India”, “Rajasthan heritage circuit” or “European Alps” may be useful editorial travel regions, but must not be mistaken for formal state/province administrative units.
- Store a subtype/classification to distinguish administrative, physical and editorial travel regions.

Suggested `region_subtype` values: `state`, `province`, `territory`, `island`, `archipelago`, `subregion`, `travel_region`, `national_park_region`, `other`.

---

## 4. Final static JSON data relationship model

This schema extends the ID-based architecture in `WEBSITE-ARCHITECTURE.md` and the geographic path rules in `SITEMAP.md`.

### 4.1 Canonical destination record

Every place entity uses a common base record. Type-specific fields are optional or held in a type-specific content object.

| Field | Type | Required | Rule |
|---|---|---:|---|
| `destination_id` | string | Yes | Globally unique, stable and permanent |
| `destination_type` | enum | Yes | Continent/country/region/city/neighborhood/attraction |
| `slug` | string | Yes | Stable lowercase URL segment |
| `name` | string | Yes | Canonical display name |
| `status` | enum | Yes | draft/published/archived |
| `parent_destination_id` | string/null | Conditional | One primary geographic parent; null only for top-level continents |
| `continent_id` | string | Except continent | Resolved continent reference |
| `country_id` | string | Country and all lower types | Resolved country reference |
| `region_id` | string/null | Region and descendants where applicable | Canonical immediate relevant region reference; null if no region level |
| `city_id` | string/null | City descendants where applicable | Nearest canonical city reference; null for country/region-level entities |
| `neighborhood_id` | string/null | Neighborhood and nested POI only | Relevant neighborhood context |
| `canonical_url` | string | Yes for published page | Unique canonical path, consistent with SITEMAP.md |
| `child_destination_ids` | string[] | Generated/optional | Derived from parent links; never manually maintained as a second authority |
| `related_destination_ids` | string[] | Optional | Editorial suggestions; not children |
| `related_article_ids` | string[] | Optional | Many-to-many editorial references |
| `related_itinerary_ids` | string[] | Optional | Many-to-many itinerary references |
| `related_collection_ids` | string[] | Optional | Things-to-do and other editorial collections |
| `hero_image_id` | string/null | For published visual page | Media manifest reference |
| `seo` | object | Yes for indexable page | Page-specific title, description and indexable flag |
| `content` | object | Type-specific | Original, entity-specific page sections |
| `last_fact_checked` | date/null | For volatile facts | Required for time-sensitive practical detail |
| `created_at` / `updated_at` | date-time | Recommended | Audit and change tracking |

### 4.2 Why store both parent ID and ancestor IDs?

- `parent_destination_id` is the single authoritative geographic tree edge.
- `continent_id`, `country_id`, `region_id`, `city_id` and `neighborhood_id` are denormalized ancestor/context references for fast validation, filtering and content queries.
- The generator must derive or validate ancestor references from the parent chain. They cannot contradict the parent chain.
- `child_destination_ids` should be calculated from all records whose `parent_destination_id` points to the current entity. If a materialized list is cached in data, validation must compare it to the derived set.

### 4.3 Example continent record

```json
{
  "destination_id": "continent-asia",
  "destination_type": "continent",
  "slug": "asia",
  "name": "Asia",
  "status": "published",
  "parent_destination_id": null,
  "continent_id": "continent-asia",
  "country_id": null,
  "region_id": null,
  "city_id": null,
  "canonical_url": "/destinations/continents/asia/",
  "related_destination_ids": [],
  "related_article_ids": [],
  "related_itinerary_ids": [],
  "seo": {
    "title": "Asia Travel Guides | Travel Guide",
    "description": "Explore country and regional travel guides across Asia.",
    "indexable": true
  },
  "content": {
    "introduction": "Original Asia-level overview.",
    "geographic_overview": [],
    "travel_context": []
  }
}
```

### 4.4 Example country record

```json
{
  "destination_id": "country-in",
  "destination_type": "country",
  "slug": "india",
  "name": "India",
  "status": "published",
  "parent_destination_id": "continent-asia",
  "continent_id": "continent-asia",
  "country_id": "country-in",
  "region_id": null,
  "city_id": null,
  "canonical_url": "/destinations/countries/india/",
  "related_destination_ids": ["country-np", "country-bt"],
  "related_article_ids": ["article-india-seasons"],
  "related_itinerary_ids": ["itinerary-golden-triangle"],
  "related_collection_ids": [],
  "content": {
    "overview": "Countrywide original introduction.",
    "best_time_to_visit": [],
    "travel_information": [],
    "national_transport": []
  },
  "seo": {
    "title": "India Travel Guide | Travel Guide",
    "description": "Plan a trip around India's regions, cities and practical travel context.",
    "indexable": true
  }
}
```

### 4.5 Example region/state record

```json
{
  "destination_id": "region-rajasthan",
  "destination_type": "region",
  "region_subtype": "state",
  "slug": "rajasthan",
  "name": "Rajasthan",
  "status": "published",
  "parent_destination_id": "country-in",
  "continent_id": "continent-asia",
  "country_id": "country-in",
  "region_id": "region-rajasthan",
  "city_id": null,
  "canonical_url": "/destinations/countries/india/regions/rajasthan/",
  "related_destination_ids": [],
  "related_article_ids": [],
  "related_itinerary_ids": [],
  "content": {
    "overview": "Original Rajasthan-focused overview.",
    "best_time_to_visit": [],
    "cities_summary": [],
    "regional_transport": []
  },
  "seo": {
    "title": "Rajasthan Travel Guide | Travel Guide",
    "description": "Explore Rajasthan's destinations and regional trip-planning context.",
    "indexable": true
  }
}
```

### 4.6 Example city record

```json
{
  "destination_id": "city-jaipur",
  "destination_type": "city",
  "slug": "jaipur",
  "name": "Jaipur",
  "status": "published",
  "parent_destination_id": "region-rajasthan",
  "continent_id": "continent-asia",
  "country_id": "country-in",
  "region_id": "region-rajasthan",
  "city_id": "city-jaipur",
  "canonical_url": "/destinations/countries/india/cities/jaipur/",
  "related_destination_ids": ["city-udaipur", "city-jodhpur"],
  "related_article_ids": ["article-best-time-jaipur"],
  "related_itinerary_ids": ["itinerary-jaipur-2-days"],
  "related_collection_ids": ["things-jaipur"],
  "content": {
    "overview": "Original Jaipur city introduction.",
    "neighborhood_overview": [],
    "getting_around": [],
    "local_experiences": []
  },
  "seo": {
    "title": "Jaipur City Guide | Travel Guide",
    "description": "Discover Jaipur neighborhoods, attractions and practical city guidance.",
    "indexable": true
  }
}
```

### 4.7 Example neighborhood record

```json
{
  "destination_id": "neighborhood-jaipur-old-city",
  "destination_type": "neighborhood",
  "slug": "old-city",
  "name": "Jaipur Old City",
  "status": "draft",
  "parent_destination_id": "city-jaipur",
  "continent_id": "continent-asia",
  "country_id": "country-in",
  "region_id": "region-rajasthan",
  "city_id": "city-jaipur",
  "neighborhood_id": "neighborhood-jaipur-old-city",
  "canonical_url": "/destinations/countries/india/cities/jaipur/neighborhoods/old-city/",
  "related_destination_ids": [],
  "related_article_ids": [],
  "related_itinerary_ids": [],
  "content": {
    "overview": "A distinct, original neighborhood introduction.",
    "visitor_orientation": [],
    "getting_around": []
  },
  "seo": {
    "title": "Jaipur Old City Guide | Travel Guide",
    "description": "Explore Jaipur Old City with local orientation and useful visitor context.",
    "indexable": false
  }
}
```

### 4.8 Example attraction record

```json
{
  "destination_id": "poi-amber-fort",
  "destination_type": "attraction",
  "slug": "amber-fort",
  "name": "Amber Fort",
  "status": "draft",
  "parent_destination_id": "city-jaipur",
  "continent_id": "continent-asia",
  "country_id": "country-in",
  "region_id": "region-rajasthan",
  "city_id": "city-jaipur",
  "neighborhood_id": null,
  "canonical_url": "/destinations/countries/india/cities/jaipur/attractions/amber-fort/",
  "related_destination_ids": [],
  "related_article_ids": [],
  "related_itinerary_ids": [],
  "related_collection_ids": ["things-jaipur"],
  "location": {
    "latitude": null,
    "longitude": null,
    "address": null
  },
  "visitor_facts": {
    "official_url": null,
    "opening_hours": null,
    "fees": null,
    "last_fact_checked": null
  },
  "seo": {
    "title": "Amber Fort Visitor Guide | Travel Guide",
    "description": "A practical editorial guide to Amber Fort.",
    "indexable": false
  }
}
```

### 4.9 Example things-to-do collection (not a destination entity)

```json
{
  "collection_id": "things-jaipur",
  "collection_type": "things_to_do",
  "slug": "jaipur",
  "status": "published",
  "primary_destination_id": "city-jaipur",
  "destination_ids": ["city-jaipur", "region-rajasthan", "country-in"],
  "attraction_ids": ["poi-amber-fort"],
  "canonical_url": "/things-to-do/india/jaipur/",
  "related_article_ids": ["article-best-time-jaipur"],
  "seo": {
    "title": "Things to Do in Jaipur | Travel Guide",
    "description": "Explore a curated selection of Jaipur experiences and places.",
    "indexable": true
  }
}
```

A collection has a separate ID and type. It is not inserted as a geographic child between city and attraction.

---

## 5. Content ownership and duplicate-prevention boundaries

### 5.1 Country versus city responsibility matrix

| Topic | Country page | City page | Rule |
|---|---|---|---|
| Overview | National orientation | Local urban orientation | Different scale and original wording |
| Introduction | Countrywide visitor context | City-specific identity and orientation | Never reuse the same intro paragraph |
| Best time to visit | National seasonality and regional variation | Local climate/event considerations | City page may summarize local differences and link to country context |
| Regions/states | Primary index of regions | Mention parent region and other nearby areas only when useful | Child directory lives on country/region |
| Major cities | Short curated city discovery cards | City-specific districts, routes and local context | Do not duplicate the city guide |
| Attractions | Nationally notable highlights, concise links | Curated local attractions, concise summaries | Full visitor detail lives on the attraction page |
| Things to do | Countrywide experience themes/collections | Local activities and collections | Collection page owns the curation and linked POIs |
| Restaurants | Country cuisine and food culture | City restaurant/café/local food editorial | No fabricated reviews or live operating claims |
| Transport | National arrival and intercity network context | Local transit, walking and city movement | Detailed transport content stays at the correct level |
| Itineraries | National/multi-region route collections | City-duration and local route options | Itinerary detail owns the day-by-day plan |
| Travel information | National entry, currency, language, time zone and official advisories | Local practical context and links to national information | Avoid restating full policy text on every city page |
| Related articles | Country-wide editorial references | City-specific references | Same article URL may be linked from both pages |
| Related destinations | Neighboring countries/regions | Nearby cities/neighborhoods | Keep relationships distinct from parent IDs |

### 5.2 One source of truth for volatile facts

Facts can be shared across pages without repeating separate unmaintained copies.

Examples:
- National currency, country-level time zone or entry source: owned by country-level data/reference record.
- City public transport or arrival guidance: owned by city record.
- Attraction admission and schedule: owned by the attraction record, with source and checked date.

A child page can display a short summary or link to the authoritative data owner. Do not copy full volatile detail into dozens of records. If a short display summary is materialized for build output, it must derive from the same source and validation must detect divergence.

### 5.3 Content block reuse rules

Allowed:
- Shared page structure and semantic components.
- Shared factual source data displayed in multiple contexts.
- A short excerpt on a parent page linking to the full child page.
- A common glossary definition or policy link.
- A related-content card generated from an entity reference.

Not allowed:
- Copying an entire country introduction to city pages.
- Reprinting the full city attraction guide under each country/region page.
- Reusing the same generic “best time to visit” paragraph on every destination.
- Generating multiple URLs for an article solely because it is associated with multiple destinations.
- Creating unique-looking titles around identical page body content.
- Auto-publishing thin pages just to complete the hierarchy.

### 5.4 Minimum publishing gate

A destination may be included as a card in its parent's directory before it qualifies for its own indexable detail page, but the link must have a real target or clearly behave as a non-link teaser. A page is indexable only when it has:

- Distinct visitor/search intent.
- Original useful introduction and relevant sections.
- Correct parent and geographic context.
- Enough unique content to serve the page type.
- Verified facts where facts can change.
- Accurate media/credits and meaningful alt text.
- Unique metadata and canonical URL.
- Working parent, sibling and related links.

---

## 6. Destination-to-article and destination-to-itinerary relationships

### 6.1 Articles are editorial entities, not geographic children

Article record stores:
- `article_id`
- `canonical_url`
- `destination_ids[]`
- `category_ids[]`
- `travel_style_ids[]`
- `author_id`
- `related_article_ids[]`

A destination record may store a curated `related_article_ids[]` list, or the generator may build the reverse relationship by finding articles whose `destination_ids[]` include that destination. Pick one authored ordering source; compute the reverse index at build time.

### 6.2 Itineraries

An itinerary is a distinct travel-plan entity with:
- One canonical URL.
- Optional primary destination.
- Related destination IDs.
- Ordered day/stop data.
- Links to canonical city, region and POI pages.
- Its own content and editorial intent.

A country page may link to a multi-city itinerary. A city page may link to a local duration-based itinerary. Neither destination page should reproduce the entire itinerary detail.

### 6.3 Things-to-do collections

A collection:
- Has one primary destination context.
- Can reference multiple relevant destination IDs.
- Lists POI IDs and optionally editorially curated experience blocks.
- Links to the canonical attraction detail page.
- Does not become a geographic parent.

### 6.4 Related destination logic

Keep two different fields:

- `parent_destination_id`: strict geographic parent, one only.
- `related_destination_ids[]`: contextual travel recommendations such as nearby cities, related regions or neighboring countries.

A related destination is never automatically inserted into the breadcrumb or canonical URL.

---

## 7. Canonical URL hierarchy

The patterns below follow `SITEMAP.md` exactly.

| Level | Canonical pattern | Example |
|---|---|---|
| Global directory | `/destinations/` | `/destinations/` |
| Continent | `/destinations/continents/{continent}/` | `/destinations/continents/asia/` |
| Country directory | `/destinations/countries/` | `/destinations/countries/` |
| Country | `/destinations/countries/{country}/` | `/destinations/countries/india/` |
| State/province/region | `/destinations/countries/{country}/regions/{region}/` | `/destinations/countries/india/regions/rajasthan/` |
| City | `/destinations/countries/{country}/cities/{city}/` | `/destinations/countries/india/cities/jaipur/` |
| Neighborhood | `.../cities/{city}/neighborhoods/{neighborhood}/` | `/destinations/countries/india/cities/jaipur/neighborhoods/old-city/` |
| Attraction under city | `.../cities/{city}/attractions/{attraction}/` | `/destinations/countries/india/cities/jaipur/attractions/amber-fort/` |
| Attraction under region | `.../regions/{region}/attractions/{attraction}/` | `/destinations/countries/india/regions/rajasthan/attractions/example-fort/` |
| Attraction under country | `.../countries/{country}/attractions/{attraction}/` | `/destinations/countries/india/attractions/example-landmark/` |

### 7.1 Optional geographic level rules

- If a state/province page is not published, a city page still uses the country path defined by the sitemap. Its `parent_destination_id` may be the country.
- If a city is not the correct parent of an attraction (for example, a remote national park), nest the attraction under its true region/country parent and use the matching parent path.
- Do not create an artificial state or city solely to make a route deeper.
- If a formal state/region exists but has no published detail page, do not put a fake URL segment into the canonical route. Parent context can still be represented in data through an unindexed/place-directory record, but public URL ancestry must remain deterministic.
- Once a route is public and indexed, changing its parent path requires redirect and canonical migration planning.

### 7.2 Slug and uniqueness rules

- Slugs are lowercase ASCII with hyphens.
- A slug must be unique among siblings of the same type under the same parent.
- Canonical paths must be globally unique across all published records and collections.
- Two different places may share the same display name, but their canonical paths must differ by geographic parent.
- Do not create duplicate page routes from aliases, transliterations or alternative spellings. Store those in `aliases[]` for search only.
- Never use `related_destination_ids` to form URL paths.

---

## 8. Breadcrumb relationships

Breadcrumbs are generated from the primary geographic parent chain and match the canonical path. They are not based on the order a visitor clicked through the site.

| Page level | Example breadcrumb |
|---|---|
| Continent | Home → Destinations → Continents → Asia |
| Country | Home → Destinations → Continents → Asia → India |
| State/region | Home → Destinations → Continents → Asia → India → Rajasthan |
| City | Home → Destinations → Continents → Asia → India → Rajasthan → Jaipur |
| City where no region page exists | Home → Destinations → Continents → Asia → India → Jaipur |
| Neighborhood | Home → Destinations → Asia → India → Rajasthan → Jaipur → Old City |
| Attraction | Home → Destinations → Asia → India → Rajasthan → Jaipur → Attractions → Amber Fort |
| Region-level rural attraction | Home → Destinations → Asia → India → Rajasthan → Attractions → Attraction Name |
| Country-level POI | Home → Destinations → Asia → India → Attractions → Attraction Name |

### 8.1 Breadcrumb rules

1. First crumb is Home and links to `/`.
2. Directory/hub crumbs link to their canonical URL.
3. Every actual ancestor crumb links to that ancestor's canonical page when it is published.
4. Current page is last and is not self-linked.
5. A non-published administrative parent must not be linked to a 404 page. The breadcrumb builder should use the nearest published ancestor and preserve a clear label only where the URL/IA supports it.
6. A related/nearby destination never appears in the breadcrumb.
7. Article and itinerary breadcrumbs follow their own sitemap hierarchy, not the destination tree. Their destination associations are contextual tags/links.
8. Visible breadcrumb and JSON-LD `BreadcrumbList` must match.

---

## 9. Parent-child and internal linking rules

### 9.1 Parent to child

- Continent page → country and meaningful regional destination cards.
- Country page → states/provinces/regions and major cities.
- Region page → cities, settlements and region-level POIs.
- City page → neighborhoods, local attractions and city activity collections.
- Neighborhood page → relevant attractions and its parent city.
- Parent pages show a concise child summary with a clear link to the complete child guide.

### 9.2 Child to parent

- Country → continent/destinations parent.
- Region → country.
- City → region, or country if no region page exists.
- Neighborhood → city.
- Attraction → its true primary parent (city, neighborhood, region or country).

Use breadcrumbs and one relevant contextual parent link. Do not add repeated “back to parent” blocks throughout the content.

### 9.3 Sibling and contextual links

- Region pages may link to sibling regions only when there is a genuine travel connection.
- City pages may link to nearby or related cities; this is not geographic parentage.
- Neighborhood pages may link to nearby districts without treating them as children.
- Attraction pages may link to genuinely nearby attractions.
- Contextual links should explain the relationship (“nearby”, “within this city”, “part of this region”) rather than use generic keyword anchors.

### 9.4 Internal-link integrity

Build-time checks must ensure:
- Every parent link resolves.
- Every child ID exists and points back to the correct parent.
- Every related page is published or intentionally omitted.
- Every internal href resolves to an emitted HTML file.
- Breadcrumbs have no loops or missing published targets.
- A destination does not link to itself through a related list.
- Orphaned published destination pages are reported.
- The number of parent cards is curated/paginated where large.

---

## 10. Navigation and discovery hierarchy

### 10.1 Global navigation

Global navigation remains shallow:
- Destinations
- Things to Do
- Travel Guides
- Itineraries
- Travel Styles
- Articles
- About

The destination mega-menu should expose:
- Browse continents.
- Browse countries.
- A controlled set of featured/popular countries and cities.
- A link to all destinations.

It should not render thousands of cities, neighborhoods or attractions in the header. Full discovery belongs in directory pages and contextual child listings.

### 10.2 Destination directory

The destination directory links to the continent and country indexes. Continent pages then reveal country-level browsing. Directory cards should show a distinct image, destination name, parent context and short unique description; do not reuse duplicate-looking cards/content to inflate the catalogue.

### 10.3 Local page discovery

Every parent destination page should provide child navigation blocks relevant to its type. Large child sets should use paginated crawlable lists or grouped indexes rather than huge initial client-rendered menus.

---

## 11. Static HTML generation compatibility

### 11.1 Generation rule

For each published, indexable destination record:
1. Validate its ID/type/parent/ancestor fields.
2. Resolve one canonical path.
3. Resolve the type-specific template.
4. Derive breadcrumbs.
5. Resolve child and editorial relationship lists.
6. Render page-specific content to HTML at build time.
7. Include metadata and structured data.
8. Emit the HTML into the matching directory path.
9. Add the canonical URL to sitemap input.
10. Verify every generated internal link and asset.

Example:

| Record | Public path | Generated file |
|---|---|---|
| `continent-asia` | `/destinations/continents/asia/` | `dist/destinations/continents/asia/index.html` |
| `country-in` | `/destinations/countries/india/` | `dist/destinations/countries/india/index.html` |
| `region-rajasthan` | `/destinations/countries/india/regions/rajasthan/` | Corresponding `index.html` |
| `city-jaipur` | `/destinations/countries/india/cities/jaipur/` | Corresponding `index.html` |
| `neighborhood-jaipur-old-city` | `.../neighborhoods/old-city/` | Corresponding `index.html` |
| `poi-amber-fort` | `.../attractions/amber-fort/` | Corresponding `index.html` |

### 11.2 No SPA behavior

- Clicking a child destination uses a regular HTML anchor and requests the child's HTML file.
- JS may filter a directory list already emitted in HTML.
- JS does not build the country/city/attraction page from JSON after page load.
- JSON is consumed at build time; any browser JSON is auxiliary search/filter data only.
- No catch-all route serves the same application shell for every destination.

---

## 12. SEO, indexation and structured data for destination pages

### 12.1 Metadata by destination type

Every destination page gets:
- Unique SEO title.
- Unique meta description.
- One H1.
- Canonical URL.
- Appropriate robots directive.
- Open Graph metadata.
- Breadcrumb structured data.
- Type-appropriate schema only when accurate.
- Accurate hero/media alt text.
- Last-updated or fact-checked date only when meaningful and truthful.

### 12.2 Suggested structured data

| Page | Schema candidates |
|---|---|
| Continent / macro-region | `Place`, `WebPage`, `CollectionPage`, `BreadcrumbList` |
| Country | `Country`/ `Place` where supported, `TouristDestination`, `WebPage`, `BreadcrumbList` |
| Region/state | `Place`, `AdministrativeArea` where appropriate, `WebPage` |
| City | `City`/ `Place`, `TouristDestination`, `WebPage` |
| Neighborhood | `Place`, `WebPage`, `BreadcrumbList` |
| Attraction | `TouristAttraction`, `Place`, `WebPage`, `BreadcrumbList` |
| Things-to-do collection | `CollectionPage`, `ItemList` |

Schema vocabulary/type availability should be validated against the current vocabulary and search-engine guidelines at implementation time. Do not invent reviews, ratings, opening hours, coordinates or prices.

### 12.3 Indexation gate

A page with `status=draft`, `seo.indexable=false`, missing canonical path, missing parent or failed content gate must not enter the public XML sitemap. Thin child entities can remain in JSON and be shown selectively in a directory only if their link target behavior is valid.

---

## 13. Validation rules for thousands of destination records

### 13.1 IDs

- `destination_id` is globally unique across the complete destination dataset.
- IDs never change when a name or slug changes.
- Prefixes may aid humans (`continent-`, `country-`, `region-`, `city-`, `neighborhood-`, `poi-`) but must not replace validation.
- IDs are not public URLs and should not be exposed as user-facing slugs.

### 13.2 Parent-child validation

- Every non-continent destination has one existing `parent_destination_id`.
- The parent type must be allowed for the child type.
- Parent chains must be acyclic.
- A continent has no parent.
- A country must resolve to one continent.
- Region's country ancestry must be consistent.
- City must resolve to one country; region is optional.
- Neighborhood must resolve to one city.
- Attraction must resolve to one appropriate primary parent.
- An ancestor field such as `country_id` must agree with the derived parent chain.

### 13.3 Missing parent detection

Build fails or publication is blocked when:
- A referenced parent ID does not exist.
- A child has a missing required parent.
- A parent's type is invalid.
- A city references a region that belongs to a different country.
- An attraction references a city inconsistent with its parent chain.
- A published page breadcrumb cannot be built.
- A referenced child/related record is malformed.

A draft incomplete entity may exist for research, but must be reported and omitted from published HTML/sitemap until corrected.

### 13.4 Duplicate slug/canonical prevention

Use at least three unique constraints:
1. Unique `destination_id`.
2. Unique sibling route segment: (parent ID, destination type, normalized slug).
3. Globally unique `canonical_url` for every published indexable page, including non-destination page families.

A display-name collision is allowed. A duplicate canonical URL is not.

### 13.5 Other checks

- Missing parent pages.
- Invalid entity type.
- Inconsistent ancestor IDs.
- Child list mismatch.
- Duplicate child IDs.
- Related-content references to missing/draft entities.
- Missing unique SEO title/description.
- Incorrect breadcrumb order.
- Invalid media IDs or missing image files.
- Missing alt text for informative images.
- Broken local links.
- Duplicate page content/near-duplicate detection flag for editorial review.
- Missing fact-check date for volatile visitor facts.
- Sitemap inclusion of draft/noindex records.

### 13.6 Publishing states

| Status | Public HTML generated? | Indexable? | Parent directory treatment |
|---|---:|---:|---|
| draft | No | No | Omit or show as non-linked editorial placeholder only where appropriate |
| published + indexable | Yes | Yes | Link to canonical page |
| published + noindex | Yes only if there is a legitimate user-facing reason | No | Link only if user value and robots/canonical rules are intentional |
| archived | No new indexable page by default | No | Remove from active browse lists; redirect/retire deliberately |

Noindex is not a substitute for deciding whether a page should exist. Thin, redundant pages should normally remain unpublished.

---

## 14. Scalability strategy

### 14.1 Data lookup strategy

- Load all records in the build process, not in the visitor browser.
- Build indexes by ID, parent ID, type and canonical path.
- Derive child arrays with a single pass over records.
- Resolve ancestor chains once and reuse the result for URLs and breadcrumbs.
- Cache resolved relationships during one build.
- Emit compact page-specific child/related data into each HTML page.

### 14.2 Avoid N-squared work

Do not, for each of thousands of parent records, scan every destination record repeatedly to find children. Build a map such as `childrenByParentId` once, then read the mapped child IDs. Similarly build `articlesByDestinationId`, `itinerariesByDestinationId` and `collectionsByDestinationId` indexes.

### 14.3 Directory performance

- Large country/city/attraction indexes should be grouped and paginated.
- Pagination pages, if indexable, need distinct canonical URLs and meaningful content, following the sitemap's pagination policy.
- Search/filter state should not create an uncontrolled set of indexable URL permutations.
- Browser search uses a generated lightweight index and does not load every destination object.

### 14.4 Build dependencies

A country content change may affect:
- The country HTML page.
- The country directory/continent child listing if summary fields changed.
- The static search index.
- Breadcrumb/metadata on descendants only if ancestor URL/name rules require it.
- The XML sitemap if publication/indexability/path changed.

A city change may affect:
- City HTML.
- Parent region/country child lists or excerpts.
- Related things-to-do collection cards.
- Search index.
- Sitemaps if path/status changes.

Begin with deterministic full generation. Incremental generation is a later optimization and must invalidate every dependent page, relationship index and sitemap entry correctly.

### 14.5 No target page-count promise

Thousands of page records can be represented by this architecture, but build time, Git size, deployment limits, HTML weight, asset volume and search-index download must be measured with representative content. Do not fabricate pages just to reach a target number.

---

## 15. Example end-to-end relationship map

This example demonstrates one geographic chain and separate editorial relationships:

```text
continent-asia
└── country-in
    └── region-rajasthan
        └── city-jaipur
            ├── neighborhood-jaipur-old-city
            └── poi-amber-fort

city-jaipur
├── related_article_ids
│   └── article-best-time-jaipur
├── related_itinerary_ids
│   └── itinerary-jaipur-2-days
└── related_collection_ids
    └── things-jaipur

article-best-time-jaipur
└── destination_ids
    ├── city-jaipur
    ├── region-rajasthan
    └── country-in

itinerary-jaipur-2-days
└── ordered_stops
    ├── city-jaipur
    └── poi-amber-fort

things-jaipur
└── attraction_ids
    └── poi-amber-fort
```

The same article/itinerary/attraction may be linked from multiple relevant pages, but each entity has exactly one canonical URL.

---

## 16. Phase 2.3 acceptance checklist

- [x] Full geographic hierarchy defined.
- [x] Optional/missing geographic levels supported.
- [x] Continent/macro-region responsibilities defined.
- [x] Country page structure and scope defined.
- [x] Region/state/province page structure and scope defined.
- [x] City page structure and scope defined.
- [x] Neighborhood page structure and scope defined.
- [x] Attraction/POI page structure and scope defined.
- [x] Things-to-do collection separated from geographic destination entities.
- [x] Unique IDs, types and parent relationships defined.
- [x] Ancestor IDs and child derivation rules defined.
- [x] JSON examples for continent, country, region, city, neighborhood, attraction and collection included.
- [x] Destination/article/itinerary relationship rules defined.
- [x] Country/city content boundaries and duplication prevention rules defined.
- [x] Sitemap URL patterns followed.
- [x] Breadcrumb rules and examples defined.
- [x] Parent-child and contextual internal linking rules defined.
- [x] Static HTML generation compatibility specified.
- [x] Missing parent, duplicate slug, canonical and orphan checks defined.
- [x] Scalability approach for thousands of records specified.
- [x] No production code or main-branch change included.

**Phase 2.3 status:** Destination hierarchy specification prepared. No HTML, CSS, JavaScript, JSON content records, generator or Cloudflare configuration has been implemented.

**Next task:** Phase 2.4 — Article & Content Architecture. Define article/content types, editorial taxonomy, content schemas, authoring and review model, article URL/metadata rules, and the relationships between articles, destinations, travel styles and itineraries.
