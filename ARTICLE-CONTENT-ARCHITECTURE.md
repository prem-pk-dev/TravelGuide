# Travel Guide — Article & Content Architecture

- **Project:** Travel Guide
- **Phase:** 2.4 — Article & Content Architecture
- **Document status:** Research and content-system specification
- **Research branch:** `research/travel-guide-blueprint`
- **Production branch:** `main` (not modified)
- **Prerequisites:** `COMPETITOR-ANALYSIS.md`, `SITEMAP.md`, `WEBSITE-ARCHITECTURE.md`, `DESTINATION-PAGE-HIERARCHY.md`
- **Technical model:** Static JSON source → validated build-time generation → individual HTML documents
- **Scope:** Content types, article templates, taxonomy, schemas, authorship, editorial workflow, SEO and linking

---

## 1. Purpose and architecture decisions

Travel Guide content must be organized so editorial stories, destination entities, itineraries, things-to-do collections, resources and taxonomy pages have distinct purposes. A story may reference multiple places, but it remains one editorial entity and one canonical HTML page.

### 1.1 Core publishing model

1. Content records are authored and maintained as static JSON in GitHub.
2. Every record has a stable ID, type, publication state and (when indexable) one canonical URL.
3. Build-time validation checks schemas, IDs, taxonomy references, author references, destination relationships, media and canonical uniqueness.
4. Approved, published content is rendered into individual HTML documents using shared templates.
5. The final HTML contains the article text, headings, metadata, breadcrumbs and links at first delivery.
6. Vanilla JavaScript only enhances the page; it does not create the article body or route between content pages.
7. Only canonical, indexable, successfully generated pages enter the XML sitemap.

### 1.2 Entity boundaries

| Entity | Primary purpose | Own canonical page? | Key relationships |
|---|---|---:|---|
| Destination | Geographic place identity and local planning | Yes, if useful and substantial | Parent place, child places, editorial content |
| Article | Original editorial story, guide or advice | Yes | Authors, destinations, categories, tags, styles, audiences, itineraries |
| Itinerary | Ordered route/day-by-day plan | Yes | Destinations, POIs, related articles |
| Things-to-do collection | Curated activities for a place | Yes, if distinct | Primary destination, POIs, articles |
| Travel tip | Focused practical advice | Usually under `/travel-tips/{slug}/` | Destinations, resources, articles |
| Resource | Reusable reference/checklist/tool content | Yes, if standalone | Articles and destinations |
| Category | Main editorial subject classification | Archive page when substantial | Articles and subcategories |
| Tag | Specific cross-cutting subject label | No by default | Articles |
| Travel style | Travel approach/experience classification | Archive page when substantial | Articles and itineraries |
| Audience type | Intended reader group | Optional curated archive | Articles and resources |
| Content theme | Editorial planning lens/campaign | Usually no; internal curation | Articles, destinations, itineraries |
| Author/contributor | Real contributor identity | Yes, when appropriate | Articles, profile data |
| Reviewer/editor | Editorial quality responsibility | Profile only if meaningful and consented | Review events and article revisions |

Do not create category, tag, style and audience pages that all repeat the same list of articles. They answer different classification questions.

### 1.3 Consistency with previous phases

- Article detail URL follows `SITEMAP.md`: `/articles/{article-slug}/`.
- Article taxonomies use dedicated hubs/archives under the travel/category and travel-style URL families where an indexable page is justified.
- Itineraries remain separate entities under `/itineraries/`; an article about an itinerary may be linked to the itinerary but is not automatically a duplicate itinerary record.
- Destination IDs and relationship rules follow `DESTINATION-PAGE-HIERARCHY.md`.
- Common JSON fields and build-time HTML generation follow `WEBSITE-ARCHITECTURE.md`.
- No SPA, backend, database, CMS server, authentication or runtime content rendering is introduced.

---

## 2. Article types and editorial requirements

An article's `article_type` determines its primary template and required content blocks. Category, tags, travel style and audience are separate descriptive dimensions.

### 2.1 Article type registry

| Article type | Intent | Required content | Special checks |
|---|---|---|---|
| Destination guides | Help readers understand and plan a destination | Overview, planning context, highlights, practical information, local links | Must not clone the destination entity page; define distinct editorial scope |
| City guides | Local urban planning and orientation | City context, neighborhoods, attractions, transport, local experiences | If a canonical city page exists, article must serve a separate intent or be the city page itself |
| Travel itineraries | Explain a route/day-by-day visit plan | Duration, ordered days/stops, map/route context if verified, practical notes | Prefer the dedicated itinerary entity when route data is structured; avoid duplicate detail pages |
| Things to do guides | Curated activity discovery | Curatorial introduction, grouped experiences, linked POIs | Distinguish collection page from individual attraction records |
| Travel tips | Solve one practical travel problem | Problem/context, clear advice, steps/checklist, caveats | Keep scope focused; link to broader resources |
| Budget travel guides | Help estimate/control trip costs | Cost categories, assumptions, budget method, money-saving advice | Currency and price data need source/date/location/context; no stale universal prices |
| Luxury travel guides | Explain premium travel options/experiences | Criteria, experiences, planning considerations, trade-offs | Disclose commercial relationships; no unsupported superiority claims |
| Adventure travel | Plan outdoor/active experiences safely | Activity requirements, season, equipment, skill level, safety and permits | Safety facts need authoritative sources and date checks |
| Food and culture guides | Explain local cuisine, customs and cultural context | Context, etiquette, cuisine/experience sections, local distinctions | Avoid stereotyping; distinguish editorial recommendations from reviews |
| Hotel and accommodation guides | Explain areas and accommodation types | Where to stay, area comparisons, accommodation considerations | No fabricated hotel reviews, current availability or unverified rates |
| Transportation guides | Explain transport choices and route planning | Modes, route context, ticketing/boarding advice, accessibility | Timetables/fares need authoritative sources and last-checked date |
| Travel planning guides | Help plan a trip end to end or through a key stage | Planning sequence, decision points, checklists, relevant resources | Maintain evergreen structure; review changes in rules/providers |
| Seasonal travel guides | Explain seasonal and timing choices | Climate context, high/low season, seasonal activities and limitations | Weather/climate distinction; date and source for event/calendar facts |
| Comparison and recommendation articles | Compare choices for a defined decision | Criteria, methodology, evidence, trade-offs, conclusion | Declare affiliate/sponsorship; avoid fake tests, rankings or first-hand experience |

### 2.2 Type-specific content contract

Each type can use a shared article layout but must render a type-specific section sequence.

**Destination guide article**
- Scope statement that distinguishes it from the canonical destination page.
- A specific angle (for example, a planning problem, a region-focused guide or a first-visit decision).
- Links to the destination entity page and relevant sub-destinations.
- No repeated country/city overview copied from the destination record.

**City guide article**
- Must serve a distinct editorial task (for example, a weekend route, transport explainer or food-focused guide).
- If it is the authoritative full city guide, publish it as the city destination page instead of creating a second city guide article.
- Use city POIs/neighborhoods as references.

**Travel itinerary article**
- If it contains a route with structured day/stop data and a standalone route intent, use the itinerary entity and `/itineraries/{slug}/`.
- If it is narrative reporting with an incidental route, use an article and link to the itinerary if one exists.
- Never publish identical day-by-day copy at both routes.

**Things-to-do guide**
- Keep collection selection and ordering in the collection record where it is a maintained destination collection.
- A long-form editorial article may discuss “best things to do” only if it offers distinct analysis/storytelling and is not a second copy of the collection archive.

**Travel tip**
- Short focused answers may use the `travel-tips` family.
- A long research-led tutorial can use `article_type=travel_tip` but must have one canonical route. Select either the article URL or tip URL; do not publish both.

**Budget and luxury guides**
- Explain the audience/decision criteria in the content, not just in a tag.
- Budget and luxury are not opposite values on every destination; don't reuse a generic cost paragraph.
- Show sources, assumptions, currencies and last-checked dates for changing prices.

**Adventure travel**
- Explicitly communicate skill/fitness, equipment, weather, permits, risk and professional guidance requirements where relevant.
- Never imply that a dangerous activity is safe for everyone.

**Food and culture**
- Attribute interviews, quotes, recipes and cultural observations accurately.
- Avoid invented personal tasting experiences or generalized cultural claims.
- Restaurant features are editorial guides, not live reservation/availability feeds.

**Hotel and accommodation**
- Distinguish accommodation type, neighborhood, traveler need and comparison criteria.
- Disclose affiliate links and paid relationships next to relevant links.
- Do not fabricate guest reviews, prices, star ratings or availability.

**Transportation**
- Distinguish stable planning advice from changing schedules/fares.
- Use official operator and authority sources where possible.
- Avoid implying live timetable data where none exists.

**Seasonal travel**
- Use climate normals as climate context, not a guaranteed forecast.
- Date-stamp events and seasonal access details.
- Explain where conditions vary within the destination.

**Comparison and recommendations**
- State the comparison set and selection criteria.
- Explain exclusions, trade-offs and commercial relationships.
- Label first-hand testing only where it actually occurred.
- If evidence is not sufficient to rank options, use a neutral comparison instead of invented scores.

---

## 3. Article template system

### 3.1 Shared article page structure

Every article detail page uses a shared shell with type-aware modules:

1. Breadcrumbs (Home → Articles → article title).
2. Article category/section labels (not a pile of tags).
3. H1 title.
4. Standfirst/excerpt.
5. Author byline and genuine contributor profile link.
6. Published and substantively updated dates.
7. Hero image with responsive sources, dimensions and accurate alt text.
8. Affiliate/sponsored disclosure where relevant, placed before or beside commercial content.
9. Optional table of contents generated from actual section IDs.
10. Main article content with a logical H2/H3 sequence.
11. Contextual destination links.
12. Contextual itinerary/POI/resource links.
13. Inline media/gallery where editorially useful.
14. Sources/notes for time-sensitive or research-led content.
15. Article update/fact-check note where justified.
16. Related articles.
17. Related destinations and itineraries.
18. Author box/profile link.
19. Footer and legal/disclosure links.

### 3.2 Heading hierarchy rules

- Article title is the single H1.
- Major content sections use H2.
- Subsections use H3; H4 only when a real nested outline requires it.
- Do not choose heading levels for visual size.
- TOC anchors use stable section IDs, not heading text transformations at runtime.
- Decorative labels and card titles do not create misleading heading levels.
- Do not emit empty headings or generic “More Information” sections without useful content.

### 3.3 Hero image and gallery contract

- Hero image is a relevant, original or appropriately licensed photorealistic asset.
- Prefer WebP as the required image delivery; AVIF may be an additional `<picture>` source if generated, with WebP fallback.
- Image references resolve through the asset manifest.
- Store meaningful alt text for each usage; do not rely only on a filename.
- Emit intrinsic width/height and responsive `srcset`/`sizes`.
- Prioritize only the actual LCP hero image; lazy-load below-fold gallery images.
- Gallery items should add genuine editorial value; no repeated filler shots.
- Add photographer/source/rights information where required.
- If no suitable image is licensed/available, omit it or use an approved asset—not a random generic image.

### 3.4 Type-specific template section plans

#### A. Destination guide article
- H1 and distinct angle.
- Introduction and intended reader.
- Destination context (short; link to destination hub).
- Main topic sections (planning/areas/experiences as relevant).
- Specific advice and caveats.
- Related city/region/attraction links.
- Suggested itinerary or practical resource.
- Sources/update note.

#### B. City guide article
- H1 with the unique city-task intent.
- City context and reader need.
- Local areas or neighborhoods.
- Relevant POIs/experiences.
- Getting around/route or timing section.
- Local practical details.
- Links to canonical city page and POIs.
- Related articles and itinerary.

#### C. Travel itinerary article
- H1 and trip duration/audience.
- Route summary.
- Map/route only when grounded.
- Day-by-day or stop-by-stop H2 sections.
- Travel time/distance only when verified and clearly qualified.
- Practical logistics and alternatives.
- Links to canonical stops and itinerary entity if separate.
- Update/source note.

#### D. Things-to-do guide
- H1 and curation scope.
- Selection/editorial method.
- Grouped experience H2 sections.
- Linked POI cards with unique concise descriptions.
- Timing/booking/safety context when verified.
- Related city and itinerary links.
- Disclosure near partner links.

#### E. Travel tips
- H1 phrased around the problem.
- Quick answer or summary.
- Situation/context.
- Step-by-step advice.
- Common mistakes/limitations.
- Checklist or resource link.
- Related destinations/articles.

#### F. Budget travel guide
- H1 and trip assumptions.
- Currency, location and date context.
- Expense categories.
- Budget ranges with source/method.
- Cost-saving choices and trade-offs.
- Example budget only if calculations and assumptions are explicit.
- Related itinerary/resource links.
- Last fact-checked date.

#### G. Luxury travel guide
- H1 and scope (destination, experience or planning question).
- Criteria used to describe premium/luxury.
- Accommodation/transport/experience categories.
- Distinctions and trade-offs.
- Practical reservations/planning context, not live inventory.
- Sponsored/affiliate disclosure.
- Related destination and itinerary links.

#### H. Adventure travel
- H1 and activity/destination scope.
- Required experience/skill and physical demands.
- Season, terrain and access.
- Gear/equipment.
- Permits/operators where applicable.
- Safety, emergency and environmental considerations.
- Official sources and review date.
- Related destination/POI links.

#### I. Food and culture
- H1 and cultural/culinary scope.
- Historical/local context with sources.
- Food traditions or experience categories.
- Etiquette and respectful visitor guidance.
- Specific named places only when independently verified.
- Avoid stereotypes and unsupported authenticity labels.
- Related neighborhood, attraction and city links.

#### J. Hotel and accommodation
- H1 and choice being explained.
- Area/neighborhood context.
- Accommodation types and decision criteria.
- Accessibility/family/solo/price considerations where evidenced.
- Named properties only with reliable source and clear relationship disclosure.
- No invented review or current price/availability claim.
- Related destination and transport guidance.

#### K. Transportation
- H1 and route/mode scope.
- Available modes and decision criteria.
- Journey/connection context.
- Ticket purchase/validation advice with official references.
- Accessibility/luggage/local etiquette details where verified.
- Service-change caveat and checked date.
- Related destination and itinerary links.

#### L. Travel planning
- H1 and planning stage.
- Sequence of decisions.
- Checklist or step-by-step blocks.
- Destination-specific caveats.
- Relevant safety/entry/insurance references, source-dated.
- Downloadable/static resource link if available.
- Related guides.

#### M. Seasonal travel
- H1 and date/season scope.
- Climate and seasonal context.
- Peak/shoulder/low season trade-offs.
- Seasonal activities and accessibility.
- Event calendar dates only with authoritative source.
- Local variation and uncertainty.
- Related destination pages and itineraries.

#### N. Comparison and recommendation
- H1 with comparison scope.
- Summary of criteria and comparison date.
- Methodology and data/source note.
- Structured comparison table with fair criteria.
- Detailed option-by-option discussion.
- Limitations and who each option suits.
- Transparent conclusion; disclose commissions/sponsorship.
- No fabricated ratings, user reviews or test results.

### 3.5 Article table of contents

- TOC is generated from eligible H2 sections at build time or authored as stable section references.
- Only include sections that exist in the final HTML.
- TOC links are ordinary same-page anchors.
- Keep TOC useful; omit it for short pages where it adds no value.
- TOC works without JavaScript.
- Any active-section enhancement is optional JavaScript.

---

## 4. Editorial taxonomy architecture

Taxonomy dimensions answer different questions. They should not be interchangeable labels.

| Dimension | Answers | Example | Controls |
|---|---|---|---|
| Article type | What kind of editorial format is this? | comparison, travel planning guide | Template and required fields |
| Main category | What is the main subject area? | Transportation | Primary archive/navigation |
| Subcategory | Which narrower branch of that subject? | Rail travel | Nested category archive |
| Tag | Which precise subjects/entities are mentioned? | train tickets, overnight train | Cross-cutting retrieval |
| Travel style | What kind of travel approach/experience? | Slow travel | Style archives and filters |
| Audience type | Who is this primarily intended to help? | Family travellers | Audience filter/curated landing |
| Content theme | What editorial lens or campaign groups it? | First trip, seasonal planning | Internal curation, usually not a public taxonomy archive |

### 4.1 Main categories and subcategories

Use a controlled tree with one primary category per article and optional secondary categories only when clearly relevant.

| Main category | Example subcategories |
|---|---|
| Destinations & Places | Country guides, city guides, regions, islands, neighborhoods |
| Trip Planning | First trip, trip preparation, documents, planning process, checklists |
| Budget & Money | Budgeting, saving money, currency, fees and costs |
| Transport | Flights, trains, buses, driving, ferries, local transit |
| Accommodation | Hotels, hostels, guesthouses, resorts, alternative stays |
| Things to Do & Experiences | Attractions, outdoor activities, tours, events, family activities |
| Food & Drink | Local cuisine, markets, dining culture, food experiences |
| Culture & History | Heritage, architecture, customs, museums, local context |
| Nature & Wildlife | National parks, wildlife, mountains, forests, marine environments |
| Safety & Wellbeing | Travel safety, health preparation, accessibility and wellbeing |
| Seasonal Travel | Weather, seasons, festivals and seasonal access |
| Gear & Photography | Packing gear, travel photography, equipment guides |
| Sustainable Travel | Responsible travel, conservation, community-led tourism |

Avoid creating a public category for every keyword. A category archive should have a clear editorial definition and enough original supporting content.

### 4.2 Category rules

- Exactly one primary category is required for a published article.
- Secondary categories are optional and limited to genuinely relevant subjects.
- A subcategory must have one parent category.
- Category IDs are stable and not derived from display names.
- Category slugs are unique among siblings; canonical paths are globally unique.
- Category archive pages are indexable only when curated, distinct and useful.
- Category archive copy is unique; it is not the same as the first article excerpt repeated many times.

### 4.3 Tags

Tags identify specific cross-cutting subjects, entities or recurring concepts, e.g.:
- railway journeys
- national parks
- monsoon
- first-time visitors
- travel insurance
- photography
- UNESCO heritage

Rules:
- Tags are not synonyms for categories.
- Tags are not used to describe travel styles or audiences if those dimensions already exist.
- Tags do not create public pages by default.
- Create an indexable tag archive only when there is a deliberate editorial landing page with unique value and enough relevant published content.
- Use one preferred tag ID and keep spelling aliases in the taxonomy record.
- Avoid one-off tags used for only one page unless the editorial reason is clear.
- Do not create tags for every destination when destination IDs already provide that relationship.

### 4.4 Travel styles

Controlled travel style registry:
- Budget travel
- Luxury travel
- Solo travel
- Family travel
- Couple travel
- Adventure travel
- Slow travel
- Road trips
- Sustainable/responsible travel
- Accessible travel (only when there is real expertise/content coverage)
- Wellness travel (when editorial coverage exists)

Travel style describes the approach/experience, not the article format. A comparison article can be about budget travel; a city guide can be relevant to family travel.

Rules:
- Multiple styles can be attached if supported by the actual content.
- Use IDs, not free-text style labels.
- Style archives belong under `/travel-styles/{style}/`.
- Publish an archive only when it offers enough unique introductory context and useful content discovery.

### 4.5 Audience types

Controlled audience registry examples:
- First-time travellers
- Solo travellers
- Families with children
- Couples
- Older travellers
- Students / young adults
- Outdoor/adventure travellers
- Business travellers
- Travellers with accessibility needs

Audience type is not a sensitive personal profile and should be used as content intent only. Do not infer characteristics about individual visitors.

Rules:
- Use audience IDs only when the article materially serves that group.
- Do not tag every article with “everyone”.
- Audience archives are optional and generally noindex unless deliberately curated.
- Do not duplicate travel styles: “solo traveller” can be an audience; “solo travel” is a style/use case. Keep both only if the article genuinely supports both.

### 4.6 Content themes

Themes group editorial initiatives or repeated planning lenses, for example:
- First trip essentials
- Weekend breaks
- Seasonal planning
- Rail journeys
- Photography-led travel
- Responsible travel
- Festival calendar
- Family trip preparation

Themes are primarily editorial-curation metadata, not SEO taxonomies. They can change over time without changing canonical article URLs.

### 4.7 Classification decision tree

1. Select `article_type` for the required template.
2. Select one `primary_category_id`.
3. Add optional secondary category IDs only for a distinct second subject.
4. Add precise tag IDs for specific recurring concepts.
5. Add travel style IDs for an actual travel approach.
6. Add audience IDs for readers the piece is explicitly designed to serve.
7. Add theme IDs for editorial campaign/curation needs.
8. Add geographic destination IDs separately.

This prevents “budget travel” from being simultaneously a category, tag, style and theme on the same record merely because the words recur.

---

## 5. Article JSON schema and field specification

### 5.1 Top-level article fields

| Field | Type | Required | Validation and purpose |
|---|---|---:|---|
| `article_id` | string | Yes | Globally unique stable ID; never changes on title/slug edit |
| `title` | string | Yes | Non-empty editorial H1 |
| `slug` | string | Yes | Lowercase hyphenated path segment; unique among article records |
| `excerpt` | string | Yes | Unique concise summary; not copied across pages |
| `content` | object/array | Yes | Structured sections/blocks; must render meaningful HTML |
| `article_type` | enum | Yes | One approved type from the registry |
| `primary_category_id` | string | Yes | Exactly one valid main category |
| `category_ids` | string[] | Yes | Includes primary; no duplicates; all IDs resolve |
| `tag_ids` | string[] | Optional | Controlled tag registry IDs |
| `travel_style_ids` | string[] | Optional | Controlled travel style IDs |
| `audience_ids` | string[] | Optional | Controlled audience registry IDs |
| `theme_ids` | string[] | Optional | Editorial theme registry IDs |
| `destination_ids` | string[] | Optional | Valid destination IDs from destination hierarchy |
| `itinerary_ids` | string[] | Optional | Valid itinerary record IDs |
| `attraction_ids` | string[] | Optional | Valid POI IDs; may be derivable through destination references but useful for explicit editorial links |
| `related_article_ids` | string[] | Optional | Valid, published related article IDs; no self-link |
| `author_id` | string | Yes for published article | One accountable primary author |
| `contributor_ids` | string[] | Optional | Genuine contributors with defined roles |
| `reviewer_id` | string/null | Conditional | Real reviewer/editor when review is claimed |
| `hero_image` | object/null | Required for visual template | Asset ID, alt text and display context |
| `gallery` | object[] | Optional | Valid media IDs, order, alt text and credits |
| `published_at` | ISO date-time/null | Conditional | Required on publication |
| `updated_at` | ISO date-time/null | Conditional | Set after a substantive update |
| `status` | enum | Yes | draft/review/approved/published/archived |
| `canonical_url` | string | Yes once approved for publishing | Must match `/articles/{slug}/` and global uniqueness |
| `seo_metadata` | object | Yes | Unique title, description, indexability and social fields |
| `fact_check` | object | Conditional | Sources and checked date for time-sensitive content |
| `disclosures` | object | Optional | Affiliate/sponsorship/editorial notices where applicable |
| `revision` | object | Recommended | Content revision and editorial audit data |

### 5.2 Common content block types

Use a controlled block system. It keeps content structured while allowing templates to render semantic HTML.

| Block type | Fields | Use |
|---|---|---|
| `paragraph` | text | Standard prose |
| `heading` | level, text, section_id | H2/H3 sections |
| `list` | ordered, items | Steps/checklists |
| `image` | asset_id, alt, caption, credit | Inline image |
| `quote` | text, attribution, source | Attributed quotation |
| `callout` | tone, title, text | Important contextual note |
| `table` | caption, headers, rows | Structured comparisons |
| `destination_ref` | destination_id, presentation | Contextual destination card/link |
| `attraction_ref` | destination_id, presentation | POI link/card |
| `itinerary_ref` | itinerary_id, presentation | Itinerary link/card |
| `resource_ref` | resource_id, presentation | Checklist/resource link |
| `related_article_ref` | article_id | Related article link |
| `disclosure` | disclosure_id, text | Commercial disclosure |
| `embed` | provider, approved URL, title | Only approved, accessible third-party embed; avoid by default |

Block content is authored text, not arbitrary executable HTML or JavaScript. Validate block type, fields and heading order before rendering.

### 5.3 JSON Schema-style contract

The following is a concise structural schema specification. The final machine-readable JSON Schema files will be created during the implementation/schema task; this document defines their contract.

```json
{
  "type": "object",
  "required": [
    "article_id",
    "title",
    "slug",
    "excerpt",
    "content",
    "article_type",
    "primary_category_id",
    "category_ids",
    "author_id",
    "status",
    "seo_metadata"
  ],
  "properties": {
    "article_id": { "type": "string", "minLength": 3 },
    "title": { "type": "string", "minLength": 8 },
    "slug": { "type": "string", "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    "excerpt": { "type": "string", "minLength": 40 },
    "article_type": {
      "enum": [
        "destination_guide",
        "city_guide",
        "travel_itinerary",
        "things_to_do",
        "travel_tip",
        "budget_travel",
        "luxury_travel",
        "adventure_travel",
        "food_culture",
        "accommodation",
        "transportation",
        "travel_planning",
        "seasonal_travel",
        "comparison_recommendation"
      ]
    },
    "primary_category_id": { "type": "string" },
    "category_ids": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
    "tag_ids": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
    "destination_ids": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
    "itinerary_ids": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
    "author_id": { "type": "string" },
    "published_at": { "type": ["string", "null"], "format": "date-time" },
    "updated_at": { "type": ["string", "null"], "format": "date-time" },
    "status": { "enum": ["draft", "review", "approved", "published", "archived"] },
    "canonical_url": { "type": ["string", "null"] },
    "seo_metadata": {
      "type": "object",
      "required": ["title", "description", "indexable"],
      "properties": {
        "title": { "type": "string" },
        "description": { "type": "string" },
        "indexable": { "type": "boolean" }
      }
    }
  }
}
```

Cross-record checks (ID existence, canonical uniqueness, published author and taxonomy references) cannot be guaranteed by this record schema alone; the build validator must perform them across the complete content dataset.

### 5.4 Complete example article record

```json
{
  "article_id": "article-jaipur-season-guide",
  "title": "When to Visit Jaipur: A Seasonal Planning Guide",
  "slug": "when-to-visit-jaipur",
  "excerpt": "Understand Jaipur's seasonal travel conditions and plan a visit around weather, activities and practical considerations.",
  "article_type": "seasonal_travel",
  "primary_category_id": "category-seasonal-travel",
  "category_ids": [
    "category-seasonal-travel",
    "category-trip-planning"
  ],
  "tag_ids": [
    "tag-weather",
    "tag-seasonal-planning"
  ],
  "travel_style_ids": [
    "style-cultural-travel"
  ],
  "audience_ids": [
    "audience-first-time-travellers"
  ],
  "theme_ids": [
    "theme-first-trip"
  ],
  "destination_ids": [
    "city-jaipur",
    "region-rajasthan",
    "country-in"
  ],
  "itinerary_ids": [
    "itinerary-jaipur-2-days"
  ],
  "attraction_ids": [
    "poi-amber-fort"
  ],
  "related_article_ids": [],
  "author_id": "author-editorial",
  "contributor_ids": [],
  "reviewer_id": null,
  "hero_image": {
    "asset_id": "jaipur-season-hero",
    "alt": "Photorealistic view of Jaipur city in daylight",
    "caption": null,
    "credit": "Travel Guide original media",
    "priority": "high"
  },
  "gallery": [],
  "content": {
    "introduction": [
      {
        "type": "paragraph",
        "text": "Original article introduction with a specific seasonal-planning purpose."
      }
    ],
    "sections": [
      {
        "section_id": "seasonal-overview",
        "heading": "Understanding Jaipur's seasons",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Original researched content with source notes."
          }
        ]
      },
      {
        "section_id": "planning-considerations",
        "heading": "Planning considerations",
        "blocks": [
          {
            "type": "list",
            "ordered": false,
            "items": [
              "Check current local conditions before travel.",
              "Confirm attraction access through official sources."
            ]
          }
        ]
      }
    ],
    "conclusion": [
      {
        "type": "paragraph",
        "text": "A concise conclusion that answers the article's planning question."
      }
    ]
  },
  "fact_check": {
    "last_checked_at": "2026-11-14",
    "sources": []
  },
  "disclosures": {
    "affiliate": false,
    "sponsored": false,
    "notes": []
  },
  "published_at": null,
  "updated_at": null,
  "status": "draft",
  "canonical_url": "/articles/when-to-visit-jaipur/",
  "seo_metadata": {
    "title": "When to Visit Jaipur: Seasonal Guide | Travel Guide",
    "description": "Plan a Jaipur visit with a guide to seasonal conditions and practical timing considerations.",
    "indexable": false,
    "open_graph_image_asset_id": "jaipur-season-hero"
  },
  "revision": {
    "version": 1,
    "change_summary": "Initial draft",
    "review_events": []
  }
}
```

The sample remains `draft` and `indexable=false`. It is a schema example, not a statement that the article's facts have been independently researched or approved.

### 5.5 Field validation details

- `article_id`: immutable, globally unique and never derived from current title.
- `title`: required, human-readable, one H1 after rendering.
- `slug`: unique in the article collection and compatible with canonical route.
- `excerpt`: unique summary; do not reuse the same excerpt for multiple articles.
- `content`: non-empty structured content; headings and block ordering must be valid.
- `article_type`: one enum; do not invent new values without updating the template registry.
- `primary_category_id`: one valid primary category.
- `category_ids`: must include the primary category exactly once and contain no duplicates.
- `tag_ids`, `travel_style_ids`, `audience_ids`, `theme_ids`: all IDs must exist and be active.
- `destination_ids`: all IDs must exist in destination data; preserve an explicit list order only where order is editorially meaningful.
- `itinerary_ids`: all references must resolve to itinerary records.
- `author_id`: required accountable author for published editorial content.
- `contributor_ids`: resolve to genuine profile records and contribution roles.
- `reviewer_id`: reviewer must exist and have participated; never add a reviewer name solely as a trust signal.
- `hero_image`: asset must exist and be an appropriate image format; alt text must be accurate and usage-specific.
- `gallery`: unique media IDs unless a repeated crop has a justified editorial purpose.
- `published_at`: set at first publication; do not change on every rebuild.
- `updated_at`: change only after a substantive content/research correction.
- `status`: follows the lifecycle below; a `review` or `approved` record is not public.
- `canonical_url`: must match the chosen route and global canonical uniqueness.
- `seo_metadata`: unique title/description; indexable can only be true when status is published and checks pass.
- `fact_check`: required for volatile practical facts, prices, laws, transport schedules or safety information.
- `disclosures`: accurate flags and visible disclosure content when applicable.

---

## 6. Author, contributor and reviewer architecture

### 6.1 Roles

| Role | Meaning | Public profile? | Responsibility |
|---|---|---:|---|
| Author | Accountable author of the editorial work | Yes when genuine and useful | Original writing and source transparency |
| Contributor | Person who materially contributed reporting, photography, research or a section | Optional | Defined contribution and attribution |
| Editor | Editorial owner responsible for editing/approval | Optional | Clarity, style, integrity and quality |
| Reviewer | Subject-matter reviewer who actually checked a relevant subject | Optional | Review scope and date |
| Photographer | Creator/rightsholder of media | Optional | Media credit and licensing |
| Fact-checker | Person who verified material facts where applicable | Optional | Source/date/check scope |

One individual may hold more than one role, but the record must state the actual role for the article. Do not fabricate staff bios, experience, credentials or reviewer approvals.

### 6.2 Author profile record

Suggested fields:

| Field | Type | Purpose |
|---|---|---|
| `author_id` | string | Stable unique ID |
| `slug` | string | Profile route |
| `display_name` | string | Public byline |
| `role` | enum/string | Author, contributor, editor etc. |
| `bio` | string/blocks | Accurate profile biography |
| `expertise` | string[] | Evidence-supported subject areas |
| `profile_image_asset_id` | string/null | Genuine licensed/approved portrait |
| `social_links` | object[] | Official public links only |
| `website_url` | string/null | Verified official link |
| `status` | enum | draft/published/archived |
| `article_ids` | string[] or derived | Authored article references |
| `seo_metadata` | object | Profile title/description/indexability |
| `canonical_url` | string | `/authors/{author-slug}/` |

### 6.3 Example author record

```json
{
  "author_id": "author-editorial",
  "slug": "editorial-author",
  "display_name": "Travel Guide Editorial Team",
  "role": "author",
  "bio": "An editorial profile describing the team's actual research and publishing responsibilities.",
  "expertise": [
    "destination research",
    "travel planning"
  ],
  "profile_image_asset_id": null,
  "social_links": [],
  "website_url": null,
  "status": "draft",
  "article_ids": [],
  "canonical_url": "/authors/editorial-author/",
  "seo_metadata": {
    "title": "Editorial Author | Travel Guide",
    "description": "Editorial information and published work.",
    "indexable": false
  }
}
```

This is a structural example. The profile remains draft until the public identity, bio and authorship record are genuine and approved.

### 6.4 Article attribution

- Every published article has one primary `author_id`.
- Contributors are attributed with explicit contribution roles (for example, reporting, photography or research).
- The primary author is displayed near the H1/byline area and links to the author profile if published.
- A profile page lists articles actually authored by that person, not articles merely reviewed.
- Editorial reviewer and fact-checker details are shown only when the work occurred and scope/date are recorded.
- Do not use “Reviewed by” as a generic trust badge.
- If content is created by an editorial team, use a transparent team profile and explain the process accurately.

### 6.5 Author-to-article relationships

Canonical authority is the article record's `author_id` and `contributor_ids[]`. Author page article lists can be derived during build. Do not maintain a second manually edited list that drifts from article records.

---

## 7. Article relationships to destinations and other content

### 7.1 Relationship fields

| Article field | Targets | Relationship meaning |
|---|---|---|
| `destination_ids[]` | Continent/country/region/city/neighborhood/attraction IDs | Article relevance/context |
| `country_ids[]` | Country IDs | Optional derived shortcut from destinations |
| `city_ids[]` | City IDs | Optional derived shortcut |
| `attraction_ids[]` | Attraction IDs | Directly discussed/referenced POIs |
| `itinerary_ids[]` | Itinerary IDs | Route/plan connections |
| `related_article_ids[]` | Article IDs | Editorially selected related work |
| `author_id` | Author ID | Primary accountability |
| `contributor_ids[]` | Author/person IDs | Named contributions |
| `category_ids[]` | Category IDs | Editorial subjects |
| `tag_ids[]` | Tag IDs | Specific cross-cutting topics |
| `travel_style_ids[]` | Travel style IDs | Travel approach |
| `audience_ids[]` | Audience IDs | Intended reader group |
| `theme_ids[]` | Theme IDs | Editorial planning/campaign |

### 7.2 Country/city/attraction associations

- An article may reference a country and one or more cities.
- Country/city IDs can be derived from its destination IDs; if shortcuts are materialized for performance, validation must confirm consistency.
- A city article can reference POI IDs for the attractions it actually discusses.
- Do not attach an article to every ancestor automatically if that creates irrelevant country/city archive links. Choose relevant destination IDs deliberately.
- A parent destination may show a curated subset of articles; build can derive all associated articles and then apply editorial ordering.
- Article breadcrumbs remain article taxonomy breadcrumbs, not the full geographic chain.

### 7.3 Itinerary linking

- Structured route/day-by-day plans belong to itinerary records.
- Articles can explain, review, contextualize or report on an itinerary.
- An article links to the itinerary detail and vice versa where useful.
- Do not create two indexable full itinerary pages from identical section data.
- If the article itself is the authoritative itinerary, use the article record alone and do not create a duplicate itinerary record.

### 7.4 Related article rules

- Related articles must be directly relevant, published and indexable where linked as editorial content.
- No self-reference.
- No reciprocal-link requirement; relevance is more important than symmetry.
- Avoid identical lists repeated on every article.
- Related items can be manually curated; derived recommendations must use a transparent relevance model and not create fabricated rankings.

---

## 8. Duplicate content prevention and URL governance

### 8.1 Unique identifiers and routes

- `article_id` is globally unique and immutable.
- `slug` is unique among article records.
- `canonical_url` is globally unique across all content types, not just articles.
- The canonical route is `/articles/{slug}/`.
- Alternative spellings belong in aliases/search terms, not duplicate pages.
- A slug change requires a redirect entry from the old route.
- Never assign a retired slug to a different article.

### 8.2 Category/tag/style/audience validation

- Category ID must resolve to one active category.
- Subcategory must belong to the chosen category tree.
- Primary category appears once in `category_ids`.
- Tag IDs must resolve to tags, not category IDs.
- Travel styles must resolve to style records, not tags.
- Audience IDs must resolve to audience records.
- Theme IDs must resolve to editorial theme records.
- Duplicate IDs across a field are invalid.
- Do not convert every tag into a public archive.
- Do not mix a destination ID into a tag field.

### 8.3 Similarity and near-duplicate checks

A build-time validator may flag possible duplicates using:
- Same canonical route or slug.
- Similar titles/excerpts.
- Identical or highly overlapping content blocks.
- Same hero and same section sequence with only place-name substitutions.
- Duplicate itinerary day/stop content.
- Near-identical category archive introductions.
- Similarity between destination page content and article page content.

Automated similarity is a review signal, not a final editorial verdict. A human editor decides whether two pages have genuinely different intent and original value.

### 8.4 Country vs city content boundaries

- Country page owns national overview, countrywide entry context and macro-level planning.
- City page owns local orientation, districts, local transit and local experiences.
- Article owns a focused editorial topic or narrative.
- If an article is intended to be the comprehensive canonical city guide, it should become the city destination page, not coexist as a duplicate “City Travel Guide” article.
- Child pages can carry short parent context and link to the country guide; no paragraph cloning.
- Shared facts should be referenced from one data source and displayed consistently.

### 8.5 Article vs itinerary vs travel tip

Choose one entity type based on the primary user task:
- Editorial story/explainer/report → article.
- Structured route with ordered stops/day data → itinerary.
- Focused practical answer/checklist → travel tip or resource.
- Curated list of POIs → things-to-do collection.
- Geographic overview/visitor reference → destination page.

A related article is allowed, but it must add another purpose and not replicate the same full content.

### 8.6 Canonical and redirect rules

- Every indexable article has an absolute production canonical URL in rendered HTML.
- Canonical URL is self-referencing for the preferred route.
- Tracking parameters do not create canonical variants.
- Search and filter result states are generally noindex.
- Old slugs redirect to the final route using the static-host-compatible redirect mechanism selected during implementation.
- Redirect chains should be avoided; update old routes to point directly to the final destination.
- Do not canonicalize genuinely distinct articles to a category or destination page.
- Draft, review and approved pages are absent from production output and sitemap.
- Archived content is either retired with an appropriate 404/410/redirect policy or maintained if it remains accurate and useful; do not leave stale pages indexable without review.

---

## 9. Editorial publishing workflow

### 9.1 Lifecycle

```text
DRAFT
  |
  v
REVIEW
  |
  v
APPROVED
  |
  v
PUBLISHED
  |
  v
UPDATED  <---- substantive change/review of published content
  |  \
  |   \----> REVIEW / APPROVED before republishing when material
  v
ARCHIVED
```

`UPDATED` is an event/state for a changed published article, not a replacement for its original publication history. Keep `published_at` stable and update `updated_at` only on a substantive revision.

### 9.2 State definitions

| Status | Meaning | Public HTML? | Sitemap? |
|---|---|---:|---:|
| `draft` | Author is preparing content | No | No |
| `review` | Submitted for editorial/fact/media review | No | No |
| `approved` | Review complete; ready for release | Not until publish commit/state | No |
| `published` | Approved and live in production | Yes | Yes only if indexable |
| `updated` | Existing published content received substantive changes; treated as a publishing event before returning to published | Existing live page remains until approved deployment; new version after release | Yes if still indexable |
| `archived` | Retired or withdrawn from active publication | No new indexable page by default | No |

The requested lifecycle is represented by explicit status plus version history/review events. If the implementation later models “updated” as a published record with revision metadata instead of a distinct status, preserve the same workflow semantics.

### 9.3 Review checklist

**Editorial**
- Does the article answer one clear reader intent?
- Is the content original and distinct from destination pages and other articles?
- Are all claims properly attributed/sourced where necessary?
- Are headings, TOC and section structure logical?
- Are destination and related-content links useful?

**Accuracy**
- Are visa, safety, fees, hours, price and transport details sourced and dated?
- Are seasonal claims accurate and qualified?
- Are comparison criteria explicit?
- Are no fake personal experiences or fabricated reviews included?

**Media**
- Do images match the actual place/activity?
- Are they original/licensed?
- Is WebP available?
- Are dimensions, alt, credits and gallery ordering correct?

**Commercial integrity**
- Are affiliate/sponsored links identified?
- Is disclosure placed before/near affected links?
- Are recommendations justified rather than disguised ads?

**SEO and technical**
- Unique title, meta description, H1, canonical and OG metadata.
- Valid category/tag/style/audience IDs.
- Valid author and destination IDs.
- No duplicate slug/canonical.
- Internal links resolve.
- Structured data matches visible page.
- Sitemap inclusion is correct.

### 9.4 GitHub publishing workflow

1. Create/update the article JSON and media manifest on a working branch.
2. Commit changes with a meaningful message.
3. Run JSON Schema validation.
4. Run cross-record validation for IDs, authors, categories, tags, destinations, itineraries and canonical paths.
5. Run duplicate/near-duplicate review checks.
6. Generate the static HTML preview output.
7. Validate metadata, structured data, links, images and sitemap membership.
8. Inspect the Cloudflare Pages preview if configured.
9. Resolve editor/reviewer comments and approve the content.
10. Merge to `main` only after explicit approval.
11. Production Pages deployment serves the generated static files.
12. Record release commit, publication date and substantive update date.

No GitHub write is implied by this documented workflow; the actual content-publishing pipeline is an implementation task.

### 9.5 Revision history

Keep the following per article:
- Revision number.
- Commit SHA (captured by the publishing workflow).
- Editor/author responsible.
- Date/time.
- Change summary.
- Review outcome.
- Fact-check date/sources.
- Previous canonical slug if changed.

Git commit history is the durable source of text changes. JSON revision metadata gives the editor a concise summary; it should not attempt to duplicate the entire Git history.

---

## 10. Article SEO specification

### 10.1 Title tags and H1

- One unique `<title>` per canonical article.
- H1 communicates the article's actual purpose.
- Title and H1 can differ slightly but must be semantically consistent.
- Do not stuff multiple destinations/categories into the title.
- Do not put a year in an evergreen title unless the content is genuinely year-specific.
- If the content becomes outdated, update the facts and visible date rather than only changing the title year.

### 10.2 Meta description

- Unique, accurate summary of the article's value and scope.
- Do not reuse the excerpt blindly across the whole site.
- Avoid claims not supported in the article.
- Do not treat a character count as a guaranteed search snippet length; search engines can rewrite snippets.

### 10.3 Canonical tag

- Absolute HTTPS production URL.
- One canonical host.
- Self-referencing preferred canonical route.
- No query tracking strings.
- Slug changes require redirect and canonical update.
- Article references from destinations/taxonomies never create alternate URLs.

### 10.4 Article structured data

Use JSON-LD appropriate to a genuine article, typically `Article` or `BlogPosting`, with:
- headline.
- image URL(s) corresponding to visible article media.
- datePublished.
- dateModified only when a substantive update exists.
- author as a real Person or Organization record.
- publisher as the actual site organization.
- mainEntityOfPage as canonical article URL.
- description where applicable.

Do not invent author credentials, dates, awards, review ratings or first-hand expertise. Structured data must match visible page content.

### 10.5 Author structured data

- Author profile pages may use `ProfilePage` with a genuine `Person` or `Organization` as main entity.
- Article JSON-LD author must match the visible byline.
- Contributor/reviewer may be represented only when actually credited and semantically appropriate.
- `sameAs` is limited to official, verified profile URLs.

### 10.6 Breadcrumb structured data

Article breadcrumb:
- Home
- Articles
- Current article

A category path can be used instead only if it is the actual visible, approved navigation hierarchy. Do not insert the article's country/city as a breadcrumb parent simply because it is associated with that destination.

The JSON-LD `BreadcrumbList` must mirror the visible breadcrumb order, labels and URLs.

### 10.7 Open Graph and social metadata

At minimum, emit:
- `og:type=article` where appropriate.
- `og:title`
- `og:description`
- `og:url` canonical URL.
- `og:image` using an absolute approved media URL.
- Article publication/update dates and author attribution where supported by platform metadata.
- Twitter/X card type and image metadata when configured.

Use a suitable image crop and avoid sending a tiny thumbnail or unrelated photo. Do not include unpublished preview URLs.

### 10.8 Internal links

- Article → canonical destination(s) discussed.
- Article → relevant attraction/POI pages.
- Article → itinerary detail if the route is independently structured.
- Article → useful travel tips/resources.
- Article → one or more genuinely related articles.
- Article → author profile.
- Destination → relevant articles, selected by editorial relevance.
- Itinerary → related article and stop pages.
- Category/style archive → canonical articles.
- Author profile → articles actually authored.

Use normal crawlable anchors. Avoid excessive sitewide “related” links, unrelated exact-match anchors and arbitrary auto-generated link blocks.

### 10.9 Sitemap inclusion

An article URL enters `sitemap.xml` only when:
- `status=published`.
- `seo_metadata.indexable=true`.
- Canonical URL is unique and valid.
- Static HTML output exists.
- Required editorial/SEO validation passes.
- No redirect or duplicate canonical conflict exists.

Use `published_at` as original publication context. Use `updated_at`/lastmod only for meaningful content changes. Preview branches and draft content never enter the production sitemap.

---

## 11. Article archive and taxonomy page architecture

### 11.1 Article index

`/articles/`:
- Unique editorial introduction.
- Featured/most useful articles selected editorially.
- Latest articles with meaningful date/author information.
- Browse by main category and travel style.
- Crawlable pagination when needed.
- No duplicated full article body.

### 11.2 Category archives

Use `/travel/{category}/` or the matching subcategory path defined when a taxonomy archive is created. Examples:
- `/travel/transport/`
- `/travel/food-and-drink/`
- `/travel/budget-travel/`

A category page needs:
- A unique definition and reader intent.
- Curated subcategory navigation.
- Relevant article cards.
- Useful intro/editorial context.
- Canonical, metadata and structured data.
- No generic archive pages with one or two thin results unless deliberately noindex.

### 11.3 Travel-style archives

Use `/travel-styles/{style}/`, for example:
- `/travel-styles/solo-travel/`
- `/travel-styles/family-travel/`
- `/travel-styles/adventure-travel/`

A travel-style page is not an article category archive. It can curate both articles and itineraries where useful.

### 11.4 Tags, audiences and themes

- Tag pages are not public by default.
- Audience pages are optional and typically noindex unless a distinct curated landing page exists.
- Content themes are editorial metadata and do not create URLs by default.
- Search/filter combinations are not indexable by default.
- Never index an empty taxonomy page.

---

## 12. Static page generation and file paths

The generator uses type-aware templates but produces a physical HTML document per published indexable route.

| Content record | Canonical URL | Generated file |
|---|---|---|
| Article | `/articles/{slug}/` | `dist/articles/{slug}/index.html` |
| Travel tip | `/travel-tips/{slug}/` | `dist/travel-tips/{slug}/index.html` |
| Category archive | `/travel/{category}/` | `dist/travel/{category}/index.html` |
| Travel style archive | `/travel-styles/{style}/` | `dist/travel-styles/{style}/index.html` |
| Itinerary | `/itineraries/{slug}/` | `dist/itineraries/{slug}/index.html` |
| Author | `/authors/{slug}/` | `dist/authors/{slug}/index.html` |

Build steps:
1. Load article, author and taxonomy JSON.
2. Validate all local and cross-content relationships.
3. Resolve template by `article_type`.
4. Generate category/style labels and author byline.
5. Build article breadcrumb (not geographic breadcrumb).
6. Generate TOC from final heading structure.
7. Resolve destinations, itineraries, gallery and sources.
8. Generate canonical/SEO/OG/JSON-LD metadata.
9. Emit standalone HTML.
10. Update search index and sitemap input.
11. Run output link and duplicate checks.

The browser receives complete article content. No SPA shell or client-side JSON-to-page renderer is permitted.

---

## 13. Static search and content discovery

A build-time search index may contain:
- article ID.
- title.
- excerpt.
- article type.
- primary category label.
- selected tags.
- destination labels.
- canonical URL.
- published date.

It must not include full article bodies or draft records. Load the index on user intent; shard by type/region only if measurements show that is necessary. Search result URLs and arbitrary filter combinations remain noindex by default.

---

## 14. Accessibility and media quality

- Use semantic article, header, main, nav, aside and footer landmarks.
- Use one H1 and structured heading levels.
- Provide a visible skip link and keyboard focus indicators.
- TOC links use real section IDs and work without JS.
- Tables have captions and proper header cells.
- Images have useful alt text or empty alt when decorative.
- Gallery controls, if any, have accessible names and keyboard behavior.
- Affiliate/sponsored labels are understandable as text, not color alone.
- Embedded content is minimized and must be keyboard/accessibility tested.
- Respect reduced-motion preferences.
- Do not claim WCAG conformance until tested with automated and manual checks.

---

## 15. Quality control and publishing gates

Before release, every article must pass:

| Gate | Validation |
|---|---|
| Identity | Unique article ID and slug |
| Type | Valid article type and correct template |
| Content | Meaningful original content and valid headings/blocks |
| Taxonomy | Primary category and all classification references resolve |
| Geography | Destination/country/city/attraction references resolve |
| Itinerary | Itinerary references exist and serve a distinct purpose |
| Authorship | Real primary author and valid contributor/reviewer attribution |
| Media | Hero/gallery asset exists, image format/size/alt/credit valid |
| Accuracy | Volatile claims have reliable sources and check date |
| Commercial | Affiliate/sponsorship disclosures present where required |
| Duplication | No duplicate slug, canonical or near-duplicate page intent |
| SEO | Unique title, description, canonical, OG and appropriate schema |
| Linking | All local links resolve; no orphan/unintended self-links |
| Sitemap | Only published/indexable successfully generated URL is included |
| Accessibility | Semantic HTML, keyboard and media requirements pass |

A validation failure blocks publication. Do not silently omit invalid references or publish partial content.

---

## 16. Phase 2.4 decisions and limitations

| Topic | Decision | Implementation still required |
|---|---|---|
| Article types | Fourteen approved types | Implement template registry and validation |
| Taxonomy | Categories, tags, travel styles, audiences and themes separated | Create controlled JSON registries |
| Article schema | Stable IDs, relationships, lifecycle and SEO | Create machine-readable schema files |
| Authors | Primary author + named contributors + optional reviewer/editor | Populate only genuine profile records |
| Relationships | Many-to-many editorial references; one canonical page | Build indexes/validators |
| Duplicate handling | Slug/canonical checks and similarity review flags | Select tools and editorial review procedure |
| Workflow | Draft → Review → Approved → Published → Updated → Archived | GitHub branch/preview/release automation |
| SEO | Per-page metadata, JSON-LD, OG and sitemap gating | Generator implementation and current standards validation |
| Search | Static generated index | Search UX and indexing strategy |
| Analytics/newsletter | Not included by default | Separate privacy and provider decision |

No live prices, operating hours, first-hand experiences, review scores, author credentials or publishing activity are asserted by the examples in this document.

---

## 17. Phase 2.4 acceptance checklist

- [x] Fourteen requested article types and their content requirements defined.
- [x] Shared article template and type-specific page structures defined.
- [x] Heading hierarchy, hero, TOC, main content and related modules specified.
- [x] Affiliate/sponsored disclosure placement defined.
- [x] Main categories and subcategories defined.
- [x] Tags separated from categories.
- [x] Travel styles, audience types and editorial themes separated.
- [x] Article JSON fields, types, purpose and validation specified.
- [x] JSON schema-style contract and complete example record included.
- [x] Author, contributor, reviewer and editor architecture defined.
- [x] Article-to-destination/country/city/attraction/itinerary/related-article relationships defined.
- [x] Duplicate content, slug, canonical, taxonomy and redirect rules defined.
- [x] Country versus city/article content boundaries defined.
- [x] Draft → Review → Approved → Published → Updated → Archived workflow defined.
- [x] GitHub publishing/review workflow specified.
- [x] Title, description, canonical, Article/Author/Breadcrumb schema, OG and sitemap SEO specified.
- [x] Static HTML generation and file paths remain consistent with SITEMAP.md and WEBSITE-ARCHITECTURE.md.
- [x] No production code, database, backend or main-branch change included.

**Phase 2.4 status:** Article & Content Architecture specification prepared. No production templates, JSON content files, schema files, generator, scripts or Cloudflare settings have been implemented.

**Next task:** Phase 2.5 — Internal Linking Architecture. Define the full site-wide link graph and link rules across destinations, articles, attractions, itineraries, taxonomy archives, resources and authors, including static link generation, validation, orphan detection and crawl paths.
