# Competitor Audit: Nomadic Matt

- **Competitor:** Nomadic Matt — https://www.nomadicmatt.com/
- **Audit scope:** Homepage, primary navigation, destination directory, one country page, one city page, one long-form article, resource/affiliate page, responsive-navigation markup, image markup, and publicly observable SEO signals.
- **Research date:** 14 November 2026
- **Research branch:** `research/travel-guide-blueprint`
- **Status:** Detailed page-template audit completed for this competitor; not a full crawl of every URL on the domain.
- **Evidence rule:** “Observed” means visible in the inspected public page or its returned markup. “Not verified” means the available inspection did not establish the behavior. No assumptions about private analytics, CMS configuration, ad contracts, or revenue are presented as facts.

## 1. Audit method and pages inspected

The following pages were inspected:

| Page type | URL | What was examined |
|---|---|---|
| Homepage | https://www.nomadicmatt.com/ | Sections, calls to action, search, nav, images, footer |
| Destination directory | https://www.nomadicmatt.com/travel-guides/ | Destination discovery, regional guides, city-guide pathway, resource links |
| Country page | https://www.nomadicmatt.com/travel-guides/france-travel-tips/ | Country content hierarchy, TOC, costs, practical information, related links |
| City page | https://www.nomadicmatt.com/travel-guides/france-travel-tips/paris/ | City template, attractions, lodging, transport, booking links |
| Long-form article | https://www.nomadicmatt.com/travel-blogs/planning-a-trip/ | Article structure, TOC, imagery, internal/external links, sidebar and footer modules |
| Travel resources | https://www.nomadicmatt.com/travel-resources/ | Affiliate disclosure, commercial categories, tracked outbound links |
| Blog archive | https://www.nomadicmatt.com/travel-blog/ | Recent-post listing and editorial discovery |

This is a representative template audit. It does not claim every page, pagination state, logged-in state, geography-specific variation, or every responsive breakpoint was tested.

## 2. Homepage: observed sections in page order

The currently inspected homepage exposes the following content sequence:

1. **Utility/header area:** Advertiser Disclosure link, social links (Facebook, Instagram, Threads, TikTok), site search, and brand logo.
2. **Primary navigation:** About; Blog; Start Here; Destinations; Booking Resources; Books; Courses; Cards. Several navigation items have nested links.
3. **Hero and destination search:** Headline “Travel smarter, cheaper, longer”; prompt “Where do you want to go?”; destination search field; popular-search links including Southeast Asia, Europe, travel hacking, insurance, and Paris.
4. **Email capture strip:** “Get my best tips sent straight to you!” with first-name and email fields and a “Send Me Tips” action.
5. **Start Planning Your Trip:** Nine image-led planning routes: Getting Inspired; How to Save for a Trip; How to Plan Your Trip; Getting the Right Gear; Finding Cheap Airfare; Finding Accommodation; Life on the Road; Solo Female Travel; Family & Senior Travel.
6. **Author introduction / trust section:** “Hello! I’m Nomadic Matt!”, portrait, mission statement and About link.
7. **Top Articles:** A curated text-link list covering flights, accommodation, backpack selection, trip planning, packing, insurance, first-time travel, hostels, solo female travel, credit cards, scams and overseas work.
8. **Press/social proof:** “My Advice Has Been Featured In” with a publication-logo graphic.
9. **Trip-planning service CTA:** A service pitch and link to the trip-planning-services page.
10. **Favorite Travel Companies CTA:** An editorial recommendation statement, image and link to the detailed resources page.
11. **Books and Destination Guidebooks:** Promoted travel book, memoir and destination guidebooks with cover images and purchase/detail links.
12. **Free Travel Starter Kit:** Email capture module with first name and email. The returned page content contains this signup content twice; this may be intentional duplication across responsive/template modules, but its rendered visual behavior was not independently established.
13. **Footer:** Grouped links for About Us, Travel Tips, Book Your Trip, Books and Services, Follow Me on the Web, and Search, plus legal/contact links.

**Interpretation:** The homepage is a planning funnel, not just a chronological blog feed. It routes visitors from a broad destination intent into trip-planning topics, editorial authority, services, recommended companies and paid guidebooks.

## 3. Header, navigation and search

### Desktop/navigation structure observed in page markup

- About → author/about page.
- Blog → latest posts and selected popular posts.
- Start Here → Get Inspired; Save for a Trip; Plan Your Trip; Gear; Cheap Airfare; Accommodation; Life on the Road; Solo Female Travel; Family and Senior Travel.
- Destinations → travel-guide directory.
- Booking Resources → favorite companies, accommodation, flights, travel insurance, hostels, hotels, walking tours, credit cards and trip-planning services.
- Books → books page.
- Courses → external Superstar Blogging course site.
- Cards → travel-credit-card destinations/pages.

The navigation is hierarchical and content-led. The markup labels several parent items with “Expand” and exposes nested links in the extracted menu. The site also repeats an Advertiser Disclosure link in the header area.

### Search

- The homepage search is a standard HTML GET search form directed to the site root with query parameter `s`.
- The hero search placeholder is “Find your destination”.
- Popular searches are direct links to destination or topic pages.
- The destination directory has a destination search input (“Where in the world do you want to go?”).

**Not verified:** Whether search suggestions/autocomplete are displayed while typing, whether results are ranked by custom logic, or whether search uses a third-party service. The form markup establishes a GET search submission, not its backend implementation.

## 4. Destination directory and destination-page templates

### Destination directory

The `/travel-guides/` directory contains:
- Introductory explanation of what destination guides cover.
- An explicit statement that the destination section is updated twice a year (this is the publisher’s stated policy, not an independently measured update cadence).
- Country selection via a map.
- A destination search input.
- Regional Travel Guides.
- General Travel Tips and Resources, including flights, accommodation, packing, insurance, first-time travel, solo travel, scams, budget ideas and points/miles.
- My Budget City Guides.
- “Book Your Trip Now!” with flight, accommodation, tour, insurance and other recommended companies.
- Free Travel Starter Kit email signup.
- Site footer.

The directory is a hub that connects geography-based discovery to evergreen trip-planning and commercial resources.

### Country template: France

Observed hierarchy:

1. H1 “France Travel Guide” and “Last Updated” date.
2. Large lead photograph and country introduction.
3. Table of Contents with anchored links.
4. “Click Here for City Guides” pathway.
5. Top 5 Things to See and Do.
6. Other Things to See and Do.
7. How to Stay Safe.
8. Where to Stay.
9. France Travel Costs, with accommodation and food subsections.
10. Suggested Budgets with backpacker, midrange and upscale tiers.
11. Money-Saving Tips.
12. How to Get Around.
13. When to Go.
14. Best Booking Resources.
15. Deeper destination guidebook promotion.
16. Related Articles on France.
17. Email signup and footer.

The content combines narrative experience with practical decision support (costs, budget bands, transport, seasonality, safety and accommodation).

### City template: Paris

The inspected Paris page follows substantially the same reusable template:
- H1 and lead city photograph.
- Introductory destination narrative.
- Table of Contents.
- Top 5 Things to See and Do.
- Other Things to See and Do.
- Safety.
- Where to Stay.
- City costs and budget tiers.
- Money-saving advice.
- Getting around.
- Best time to visit.
- Booking resources.
- Destination guidebook CTA.
- Related Paris articles.
- Email capture and footer.

The page uses city-specific images and recommendations, and links back to broader France/country context through the destination hierarchy.

**Architecture implication:** A country and city can share a consistent information schema and template while keeping each page’s editorial text, attraction list, prices, practical advice and related articles distinct. Do not clone content between country and city pages.

## 5. Long-form article layout

The inspected article is “16 Easy Steps for Planning Your Next Trip” and exposes:

- Global site header and navigation.
- H1 article title.
- Updated date (the inspected markup displayed “March 9, 2026”).
- Featured image near the beginning of the article.
- First-person introduction establishing the problem and the author’s experience.
- A linked Table of Contents with 16 numbered anchor destinations.
- Sequential H3 sections, each explaining one planning step.
- Contextual internal links to destination guides and related advice.
- Contextual external links to relevant travel services (including tracked affiliate destinations).
- Product/book promotion within the article flow.
- A sidebar containing an email opt-in module and other promotional/resource content.
- Related Posts and Categories/Resources modules in the lower article area.
- Further email signup module and global footer.

The article is a structured evergreen guide rather than a short news post. Its TOC lets readers jump directly to a specific planning step. The article’s narrative voice is first person, but its headings and anchor structure remain scannable.

**Observed limitation:** The inspected article template showed an updated date but did not establish a visible author byline in the extracted portion. Do not assume every post displays the same author/date combination.

## 6. Images and loading techniques

### Observed image use

- Homepage uses photographic section tiles, an author portrait, publication logos, trip-planning imagery, company imagery and book-cover images.
- Country and city pages use large landscape destination photographs, inline attraction photographs, and related-article thumbnails.
- Article pages use a featured image and multiple contextual images throughout long-form content.
- Image alt attributes are present on many inspected images and describe the subject (for example, destination scenes or the purpose of an image).
- Image sources are split across the main WordPress uploads host and a separate media host, including `media.nomadicmatt.com`.

### Markup/loading evidence

The inspected article markup contained:
- Explicit `width` and `height` attributes on sampled images.
- `decoding="async"` on sampled images.
- `fetchpriority="high"` on the article lead image.
- Lazy-loading-related attributes/classes such as `data-lazy-src`, `data-lazy-srcset`, `data-ll-status="loaded"` and `lazyloaded` on sampled images.
- A small number of images initially represented in returned markup by a data-URI SVG placeholder, with the intended asset held in a lazy-load data attribute.
- Destination lead images with large source dimensions (for example, sampled 2120-pixel-wide hero images); article-body images sampled at 675 × 395; related-post images sampled around 1024 × 599.

### Format observations

The inspected examples included JPEG/JPG and PNG assets. This audit did **not** establish that WebP or AVIF is the default/only delivery format. Do not describe Nomadic Matt as WebP-first based on these samples.

### Lessons for Travel Guide

- Use a real photographic lead image and contextual inline imagery.
- Preserve intrinsic dimensions to reduce layout shift.
- Prioritize only the lead/LCP image; defer below-the-fold images.
- Use responsive image candidates and correct `sizes`.
- Write useful alt text; decorative images should have empty alt text.
- For our own project, use original or licensed WebP assets and do not reuse Nomadic Matt’s images, logo, fonts, graphics or copy.

**Not verified:** Actual image byte sizes, compression quality, CDN cache headers, Core Web Vitals, lazy-load thresholds and AVIF negotiation.

## 7. Ads, affiliate links and commercial placements

### Affiliate disclosure

- An Advertiser Disclosure link is visible in the site header.
- The Travel Resources page contains an explicit disclosure stating that some links are affiliate links and that the publisher may earn a commission at no additional cost to the reader.
- The resource page groups recommendations by commercial intent.

### Commercial categories observed

- Airfare: Skyscanner, Going, Google Flights, Point.me.
- Accommodation: Hostelworld, Booking.com, Trusted Housesitters, Hostel Pass, HomeExchange.
- Travel insurance: SafetyWing, Medjet, InsureMyTrip, World Nomads.
- Tours/activities: Walks, Devour, GetYourGuide, Intrepid and others.
- Gear: REI, Unbound Merino, LifeStraw, Patagonia and others.
- Transport: car rental, rail, ferry, ride-sharing and route-planning services.
- Work/volunteering and blogging resources: a separate commercial category.

### Placement mechanics observed

- Dedicated “My Favorite Travel Companies” homepage CTA to a resources hub.
- Dedicated resource-page sections with product/service logo images, heading, recommendation copy and outbound link.
- Contextual affiliate links inside destination pages and long-form articles (for example, tour tickets, tours, accommodation and travel gear).
- Some outbound URLs contain partner IDs, campaign parameters or affiliate-network tracking parameters.
- The resource page includes an explicit disclosure near the top, before the grouped recommendations.

### Display advertising: evidence boundary

A third-party browser privacy scan dated 20 October 2026 reported advertising-related services including Google AdSense, Google Ad Manager Publisher Tag and Mediavine among detected trackers/third parties. This is evidence that the scan detected advertising/measurement technology on pages it tested; it does **not** establish the exact ad slots, current ad density, ad formats, or that an ad appeared in every page state. The audit’s own extracted page text did not identify reliable in-content ad-slot labels or map their exact positions.

**Lesson:** Distinguish affiliate recommendations from display advertising. Provide a clear disclosure near commercial links and do not disguise sponsored placements as independent editorial recommendations.

## 8. Mobile and responsive design

### Markup evidence

- The site uses a responsive WordPress/Kadence theme structure and includes separate mobile-navigation markup.
- A mobile menu button has the accessible label “Open menu”, targets a mobile drawer and exposes `aria-expanded`.
- A close button is provided for the drawer.
- The mobile navigation is a separate navigation landmark with a primary-navigation label.
- Child-menu controls expose toggle behavior and `aria-expanded`.
- Layout markup includes mobile-specific row/layout classes.
- At least one homepage signup row carries a small-screen visibility class (`kb-v-sm-hidden`), indicating that some modules have breakpoint-specific visibility rules.

### What this supports

The site has an explicit mobile drawer/navigation pattern and responsive layout classes. The mobile menu is not merely a desktop menu assumed to shrink.

### Not verified

- Full visual comparison at all mobile/tablet widths.
- Actual touch-target dimensions and keyboard/screen-reader behavior.
- Whether every mega-menu interaction is usable on touch.
- Mobile Core Web Vitals and real-device loading performance.
- Whether the small-screen-hidden signup module is replaced by a visually equivalent module in every breakpoint.

These require hands-on device/browser QA. Do not claim a complete accessibility or responsive pass from markup alone.

## 9. SEO and information architecture signals

### Observed

- Clear H1 on the inspected country, city and article pages.
- Hierarchical H2/H3 headings for practical destination and article sections.
- Descriptive URL paths:
  - `/travel-guides/`
  - `/travel-guides/france-travel-tips/`
  - `/travel-guides/france-travel-tips/paris/`
  - `/travel-blogs/planning-a-trip/`
  - `/travel-blogs/category/{category-slug}/`
- Country-to-city links and destination-to-article links.
- Article TOC uses in-page anchor links.
- Related destination articles provide contextual internal links.
- Sampled article markup includes a semantic `<time>` element with an ISO-like `datetime` value for its updated date.
- Image alt text is present on sampled editorial images.
- Skip-to-content link is present.
- Extracted HTML exposes schema.org itemtypes such as `WebPage`, `Blog` and `WPHeader` on inspected page types.

### Not verified

- Canonical URL values.
- Meta description content and uniqueness across the site.
- Complete JSON-LD graph or rich-result validity.
- XML sitemap coverage and robots directives.
- Search Console indexing/crawl status.
- Keyword rankings, backlinks, organic traffic and actual SEO performance.

The audit does not infer search performance from URL shape or schema markup.

## 10. Features and interactions observed

| Feature | Evidence/status |
|---|---|
| Site search | GET form with `s` parameter observed |
| Destination search | Search input on homepage and destination directory |
| Popular searches | Direct destination/topic links |
| Dropdown/expanded navigation | Nested menu links and “Expand” labels in menu extraction |
| Mobile drawer | Open/close controls, drawer target and ARIA state in markup |
| TOC jump links | In-page anchor links in country, city and article pages |
| City guide pathway | Country page links to city guides |
| Related content | Related article lists and cross-links |
| Newsletter | First-name/email form with Kit/ConvertKit form endpoint |
| Affiliate routing | Tracked outbound links with partner/campaign identifiers |
| Scroll to top | Link observed in blog archive |
| Social links | Facebook, Instagram, Threads and TikTok links |
| Popup/modal | Not confirmed in inspected pages |
| Live map interaction | Country directory says select a country on the map; the map’s exact interactive behavior was not tested |
| Search autocomplete | Not confirmed |
| Booking widget embedded on-site | Not confirmed; sampled booking links navigate to external providers |

## 11. Strengths and weaknesses for our project

### Strengths to learn from

1. **Clear visitor intent:** Hero search asks where the visitor wants to go.
2. **Guided onboarding:** Start Here and planning topics support inexperienced travelers.
3. **Strong geographic hierarchy:** Global directory → country → city.
4. **Practical destination utility:** Attractions, safety, lodging, costs, budgets, transport, season and money-saving advice.
5. **Deep internal linking:** Country, city, article and topic pages reinforce each other.
6. **Commercial relevance:** Recommendations appear in travel-relevant contexts, not only as generic banners.
7. **Trust and author identity:** First-person experience, author profile, press references and editorial explanations.
8. **Evergreen structure:** TOCs and practical sections make long guides scannable.

### Risks/opportunities for Travel Guide

1. Avoid relying solely on an individual author persona; create transparent editorial standards and author/reviewer information.
2. Use a more systematic country/region/city taxonomy and explicit breadcrumbs.
3. Make search filters and map interactions genuinely usable, not decorative.
4. Keep affiliate disclosures adjacent to relevant commercial links as well as on a central disclosure page.
5. Design display advertising with strict layout-shift and intrusive-ad limits.
6. Use responsive WebP assets with explicit dimensions and verified compression; the inspected competitor samples are not consistently WebP.
7. Make the mobile menu, search, forms and all controls keyboard- and touch-accessible.
8. Avoid duplicate signup blocks if they cause repeated or confusing user prompts.

## 12. Evidence sources

Primary pages:
- Homepage: https://www.nomadicmatt.com/
- Travel Guides directory: https://www.nomadicmatt.com/travel-guides/
- France country guide: https://www.nomadicmatt.com/travel-guides/france-travel-tips/
- Paris city guide: https://www.nomadicmatt.com/travel-guides/france-travel-tips/paris/
- Planning article: https://www.nomadicmatt.com/travel-blogs/planning-a-trip/
- Travel Resources: https://www.nomadicmatt.com/travel-resources/
- Blog archive: https://www.nomadicmatt.com/travel-blog/
- Advertiser disclosure: https://www.nomadicmatt.com/affiliate-disclaimer/

Independent advertising-technology scan:
- https://whogetsmydata.com/website/nomadicmatt.com
- The referenced scan reports a check date of 20 October 2026. It is third-party evidence and not a statement by Nomadic Matt.

## 13. Audit conclusion

Nomadic Matt’s strongest transferable pattern is the combination of a destination-intent homepage, guided trip-planning paths, structured country/city guides, deeply linked evergreen articles, and clearly disclosed travel-resource recommendations.

For Travel Guide, adopt the **information architecture and utility principles**, not the competitor’s branding, exact copy, imagery, layout, or proprietary assets.

**Phase 1 progress:** Nomadic Matt representative-template audit is documented. The other four competitors and all later phases remain untouched in this step.


---

# Competitor Audit: The Points Guy (TPG)

- **Competitor:** The Points Guy — https://thepointsguy.com/
- **Research date:** 14 November 2026
- **Audit scope:** Live homepage and navigation markup; desktop and mobile page captures; Travel and Credit Cards topic hubs; Disney destination hub; Japan points-and-miles guide; 2026 destination inspiration article; current aviation news article; newsletter landing page; sitemap; advertising policy; public page metadata, image URLs and selected HTML attributes.
- **Status:** Detailed audit of representative templates and publicly exposed modules. This is not a full crawl of every TPG URL or a complete browser-based functional, accessibility or performance test.
- **Evidence labels:** **Observed** = visible in the inspected live page, page text, links or returned HTML. **Publisher-stated** = claimed by TPG itself. **Not verified** = requires browser interaction, a real device matrix, analytics, source maps, lab testing or a broader crawl.
- **Important context:** TPG announced a new site design and product enhancements on 10 November 2026. This audit describes the new experience visible during this inspection, not older TPG screenshots or historic navigation.

## 1. Pages inspected and research method

### Primary pages inspected

1. Homepage: https://thepointsguy.com/
2. Travel topic hub: https://thepointsguy.com/travel
3. Credit Cards topic hub: https://thepointsguy.com/credit-cards
4. Disney destination hub: https://thepointsguy.com/disney
5. Japan points-and-miles destination guide: https://thepointsguy.com/loyalty-programs/travel-to-japan-with-points-and-miles
6. Annual destination inspiration guide: https://thepointsguy.com/travel/best-places-to-go-2026
7. Current aviation news article: https://thepointsguy.com/news/faa-groundstop-flights-grounded-nationwide
8. Founder/product announcement: https://thepointsguy.com/news/future-of-tpg
9. Daily Newsletter landing page: https://thepointsguy.com/newsletters/daily
10. Sitemap: https://thepointsguy.com/sitemap/
11. Advertising policy: https://thepointsguy.com/legal/advertising-policy
12. Editorial/about information: https://thepointsguy.com/about and https://thepointsguy.com/about-us

### Method and limitations

- Inspected live public page content and extracted links, image URLs, metadata summaries and HTML for representative templates.
- Captured desktop-width and narrow mobile-width page renderings. HTML was also checked for navigation semantics, sticky-header classes, image attributes and lazy-loading markers.
- Compared the observed content model and navigation with the Nomadic Matt audit already documented above.
- No account was created, no newsletter form was submitted, no credit-card application was started and no commercial transaction was completed.
- Search inputs and AskTPG controls were observed as UI elements; their complete result accuracy, backend behavior and personalization were not independently tested.
- No Lighthouse, PageSpeed Insights, WebPageTest, real-user monitoring or accessibility conformance test was run. Do not treat the observations below as Core Web Vitals or WCAG certification.

## 2. Homepage: sections and layout

The homepage is a multi-purpose editorial and rewards product, not a conventional destination-led travel blog. The visible page modules observed in the November 2026 version include:

1. **Global announcement strip:** A prominent top-of-page message linking to the November 2026 redesign announcement.
2. **Primary navigation:** Credit cards, Rewards, Travel and Offers, plus a New to rewards? entry and Subscribe link. On mobile, the navigation is represented by a menu trigger.
3. **AskTPG entry point:** A question input introduced with “Real answers from the rewards experts,” positioning the homepage as a place to ask questions, not only browse articles.
4. **Trending question prompts:** Suggested questions include how to use Chase points, Delta versus United miles, and beginner travel cards. These act as quick-start prompts for the AskTPG experience.
5. **Editor's picks:** Curated editorial and partner content, including a clearly attributed Capital One Business partner feature and TPG member offers.
6. **Points-intent pathways:** Four broad user goals: learn the basics, earn more points, level up with loyalty, and travel with points.
7. **Spending-to-travel calculator / interactive module:** Visitors can choose a trip intention (for example, beach, bucket-list trip, long weekend, city or family visit) and monthly spending. The page then presents estimated annual points and example travel redemptions. The rendered page exposes a monthly spend control and a “Find the best card for me” CTA. The displayed examples state that taxes and fees may not be included and refer to a points valuation assumption.
8. **Real-reader and staff case studies:** First-person examples describe how named staff or readers used rewards to save money on trips. The page gives a person, role or TPG tenure, a claimed saving amount and a short quotation.
9. **Video / watch section:** A set of video-led editorial cards links to YouTube videos and the TPG YouTube channel.
10. **Daily Newsletter promotion:** A newsletter signup block with an email field, free-join CTA and privacy/terms notice.
11. **Latest content feed:** The page groups recent stories into topical collections, including Rewards, Credit cards, Deals, Travel, Aviation, Hotels and Cruises. Cards display editorial category labels, headlines and reading-time information; some cards are explicitly labelled as partner content.
12. **Further story collections:** Each topic group provides an “Explore more…” link to the relevant category hub.
13. **Reader outcomes / social proof:** More examples of how real people use points are presented as editorial stories, rather than anonymous generic testimonials.
14. **Current welcome offers:** A set of credit-card offer modules displays issuer/product, bonus or offer language, application CTA and “Terms apply” / rates-and-fees links.
15. **Commercial disclosure and footer:** The homepage states that TPG earns when readers apply and links to its advertising disclosure. Footer navigation includes editorial/about, newsletters, legal and privacy destinations, plus a second newsletter signup and transparency copy.

**Layout assessment:** The homepage uses a sequence of task-oriented product modules, content feeds and monetization modules. It has more than one entry path: ask a question, learn rewards, calculate earning potential, read news, watch video, subscribe or inspect a card offer. This is a broader funnel than a typical travel-inspiration homepage.

## 3. Header, navigation and mega menus

### Primary navigation observed

- Credit cards
- Rewards
- Travel
- Offers
- New to rewards?
- Subscribe

A top announcement strip sits above the main navigation. The HTML identifies a sticky global header; the desktop header changes layout at a large-screen breakpoint, while the narrow-screen header exposes a menu button.

### Desktop mega-menu information architecture

The extracted navigation exposes broad mega-menu groups with multiple subcategories:

**Credit cards**
- Credit-card news.
- Best cards by category: overall, travel, cash back, business, hotel and airline.
- Best cards by issuer/brand: American Express, Capital One, Chase, Bank of America, Bilt and Citi.
- Credit-card rewards programmes: Amex Membership Rewards, Capital One miles, Chase Ultimate Rewards, Bilt Rewards and Citi ThankYou.
- Application and account-management education: applying, credit scores, utilization, downgrading/closing and upgrading.

**Rewards**
- Rewards/points/miles news.
- Transfer partners and current transfer bonuses.
- Point valuations.
- Credit-card reward programmes.
- Hotel loyalty programmes: Hilton Honors, IHG One Rewards, Marriott Bonvoy and World of Hyatt.
- Airline loyalty programmes: Alaska Atmos, American AAdvantage, Delta SkyMiles, Southwest Rapid Rewards and United MileagePlus.
- Everyday rewards, dining, retail, cruises and rental-car rewards.

**Travel**
- Travel news.
- Airport security services and programmes: CLEAR, Global Entry and TSA PreCheck.
- Airport lounges.
- Destination discovery.
- Editorial feature links such as State of Loyalty and airline rankings.

**Offers**
- TPG member offers.
- Limited-time card offers.
- Transfer bonuses.

### Mobile menu evidence

- The narrow-screen HTML exposes a button with an accessible label of “Menu”.
- The trigger advertises a dialog through `aria-haspopup="dialog"` and an `aria-expanded` state.
- The extracted menu content includes a Close menu label and the same primary topic groups with nested links.
- The desktop and mobile menu content is substantially richer than the short visible top-level navigation.

### Not verified

- The exact hover, click, focus and escape-key behavior of every desktop mega-menu was not manually exercised.
- Keyboard traversal and screen-reader announcements were not tested end-to-end.
- Tablet-specific menu behavior was not separately validated on a physical tablet.

## 4. Destination pages and travel category pages

### Travel topic hub: /travel

Observed structure:

1. Global announcement and navigation.
2. H1 “Travel” and short positioning copy about flights, hotels, travel news and trip inspiration.
3. “Our top travel guides” editorial card collection. Examples include an annual places-to-visit list, essential travel tips, hotel openings, award-redemption tools and flight-booking timing.
4. A high-visibility limited-time travel-bonus promotion.
5. “Where do you want to go next?” destination tiles: Disney, Mexico, Hawaii, Japan, Caribbean and Italy.
6. “Travel brands” section with image/logo tiles for airlines, hotel chains and other travel suppliers.
7. Search field labelled “Search Travel brands” / “Search more travel brands”.
8. Expanded alphabetical-style brand directory covering airline, hotel and cruise operators.
9. “The latest in travel” and linked editorial collections.
10. Repeated cross-site footer modules, including travel guides, destination links, newsletters and disclosure.

### Destination hub: /disney

The Disney landing page is a topical destination hub rather than a classic country/city guide. It contains:

- H1 and introductory copy explaining the scope: Walt Disney World in Florida, Disneyland in California, Disney Cruise Line and parks/resorts in other countries.
- “Latest disney stories” feed.
- Story cards with photography, category labels, headline, publication date and reading time.
- A broad content mix: park planning, attractions/secrets, hotels, pools, cruise packing, credit cards, points redemption and saving money.
- Internal links into Disney, cruise, hotel, credit-card and loyalty-programme verticals.
- Newsletter and sitewide footer links.

This is useful as a destination/topic cluster: a destination hub can aggregate content from multiple site taxonomies without forcing every article into a single destination-only category.

### Japan destination-focused guide

The inspected Japan guide is a points-and-miles guide rather than a conventional country travel guide. Its content includes:

- Hero photograph and photographer/source credit.
- Named author, job title, short biography and author profile link.
- Publication/update context and estimated reading time.
- “Join the conversation” and “Jump to section” controls.
- Affiliate/advertising disclosure and product-review methodology link near the beginning.
- An editorial note and a generated “Quick summary” block, with a “Show summary” control and feedback prompt.
- “What to consider” bullets.
- Detailed H2 sections by airline loyalty programme, with flight routes, airport codes, award prices, taxes and fees.
- Embedded screenshots/award-search examples and image captions/credits.
- Hotel recommendations and credit-card guidance.
- Related-story links to other TPG guides and loyalty-programme explainers.
- Repeated links to airline, hotel, points and card hubs.

**Destination coverage boundary:** The inspected hub directory highlights a curated set of destination brands/topics. The public sitemap also lists Hawaii, Japan, New York, Paris, Tulum, Cancun and Disney. The evidence does not establish that TPG maintains a comprehensive country-by-country destination directory comparable to Nomadic Matt’s country-guide architecture.

## 5. Article page structure and content layout

Two editorial formats were inspected: a destination inspiration guide and a breaking aviation news story. Their shared template elements include:

1. Global announcement bar and sticky navigation.
2. In-article ad slot / advertisement label where present.
3. Article type/category label such as Guides or News.
4. H1 headline.
5. Hero image and image credit.
6. Author byline, author profile, role and biography; multi-author stories can show multiple contributors.
7. Publication date and estimated reading time.
8. Social/share and comment-related controls.
9. “Join the conversation” and “Jump to section” controls on the inspected Japan guide.
10. Affiliate/advertising disclosure and editorial disclaimer where relevant.
11. Main article content using H2/H3 sections, photographs, captions, lists, tables or screenshots according to the topic.
12. Inline advertising slots: the inspected destination inspiration article includes an “Advertisement” marker between content sections.
13. Internal links to related articles, loyalty-programme pages, airline/hotel profiles and relevant product explainers.
14. Comments section with Community Guidelines notice.
15. Related stories and broader topic-navigation blocks.
16. Newsletter signup and sitewide commercial/transparency footer.

### Editorial content patterns

- **News:** Time-sensitive headline, reporter/editor bylines, role and biography, publication time/date, reading time, short update-oriented paragraphs and follow-up/related coverage.
- **Guides:** Long-form H1, author credentials, reading time, introductory context, quick-summary/consideration blocks in the inspected Japan guide, detailed topic sections, data tables and internal references.
- **Destination inspiration:** A listicle structure with numbered/individual destination sections, destination-specific images, “Best for…” positioning, descriptive narrative, practical tips and hotel/loyalty tie-ins.
- **Reviews:** TPG’s public review methodology describes first-hand evaluation; the homepage and navigation route readers to flight, hotel, cruise and card review content.

The article page is not purely a narrative blog post. It combines editorial reporting with commercial disclosures, topic navigation, author authority, comment participation and conversion links.

## 6. Search and filtering functionality

### Observed controls

- **AskTPG:** Homepage question input with suggested/trending question buttons. The founder’s November 2026 announcement describes AskTPG as an on-site AI resource embedded on the homepage and in the New to Rewards learning hub.
- **Travel brand search:** The Travel hub exposes a “Search Travel brands” input above a much larger airline/hotel/cruise brand directory.
- **Homepage intent calculator:** Visitors can select a travel intention and monthly spending amount; the module presents estimated annual points and possible redemptions.
- **CardMatch:** The Credit Cards hub links to CardMatch and describes a question-based matching flow for spending and travel habits.
- **Category navigation:** The latest-story modules expose topic links and “Explore more stories” links. These are navigational filters/categories, not necessarily interactive client-side filtering.

### Functional verification boundary

- The presence and labels of these controls are observed in the public page.
- The exact live search result behavior, empty-state handling, ranking, autocomplete, filtering latency and query persistence were not tested.
- AskTPG response quality, whether it cites source articles, safety guardrails and account requirements were not tested.
- CardMatch result calculations and card eligibility logic were not tested.
- Do not assume that a visible input proves that a production search or recommendation flow works in every browser or region.

## 7. Photographs and image loading techniques

### Image sources and formats observed

- Editorial photographs are served from a Fastly-hosted TPG media domain, with paths that include original editorial asset names and dates.
- Some images are delivered through the Next.js image endpoint, `/_next/image`, with width and quality parameters.
- Some Sanity-hosted image URLs include transformations such as `fm=webp`, `q=75` and `fit=max`.
- The inspected image set includes destination photography, hotels, aircraft, airport scenes, card/product images, staff portraits, video thumbnails and brand logos.
- Image credits are visible on editorial hero images and within the body where applicable.
- The inspected pages include real travel/editorial photography; the site also uses limited illustration and logo assets for product/navigation modules.

### Loading and responsive evidence

- The homepage HTML sample contains `loading="lazy"` attributes on many image elements, with alt attributes present on the extracted image elements.
- Next.js image URLs include requested widths and quality values; Sanity URLs show explicit WebP transformations in the inspected examples.
- Fastly media URLs are used for full-size editorial photographs.
- Multiple image sizes are requested through the image optimization endpoint in newsletter assets, suggesting responsive image variants are generated.
- The page uses a modern frontend stack with Next.js-style image optimization and responsive CSS utility classes in the returned markup.

### Not verified

- Actual transfer size, decoded dimensions, image cache hit rate, CDN cache headers, AVIF support, browser-selected `srcset` candidate and real network waterfall were not measured.
- No claim is made that every image is WebP or that all images are optimally compressed.
- No image visual-regression or broken-image crawl was run.
- Lazy-loading on all pages and the exact priority treatment of the hero image were not verified.

## 8. Advertising placements and affiliate links

### Visible commercial placements

- Homepage “From our partners at Capital One” content is explicitly attributed to the partner.
- Travel hub includes a limited-time Capital One travel-bonus promotion.
- Homepage and Credit Cards hub contain welcome-offer cards with bonus language, terms/rates-and-fees links and application/learn-more CTAs.
- Homepage includes a disclosure stating that TPG earns when a reader applies.
- The inspected annual destination guide has an “Advertisement” marker near the beginning and another inline advertisement marker within the article body.
- Article pages place a compensation disclosure and links to the advertising policy and product review methodology near the beginning of relevant content.
- The footer repeats “Our commitment to transparency” and the compensation explanation.
- Partner content is identified in story feeds using labels such as “From our partners”.

### Official advertising policy findings

TPG’s own advertising policy states that:
- It has affiliate relationships with credit-card issuers and may receive compensation when readers click links and apply.
- Compensation can affect the placement and visibility of products, including their order in roundups or the frequency with which topics are covered.
- Editorial retains control over ratings, reviews, benefit guides, comparisons and original editorial stories, subject to the stated policy.
- Sponsorship packages can include sponsored articles, banner advertisements, featured placements and other assets, and are described as clearly labelled.
- The policy lists credit-card partners and non-card commercial partners, including travel and retail brands such as Booking.com, Expedia, Hilton, Marriott, cruise providers, travel insurance and luggage sellers.

### Interpretation

TPG’s monetization is diversified: credit-card application referrals, travel/retail affiliate links, partner content, sponsored placements, newsletter distribution and member offers. The strongest commercial emphasis is visible around credit-card and loyalty products, not just conventional hotel/flight booking links.

**Do not infer:** The exact CPM, commission percentage, conversion rate, revenue per visitor, ad network, ad fill rate or per-page number of ad impressions. These are not established by the inspected public pages or policy.

## 9. Newsletter, popups and promotional elements

### Newsletter

- A dedicated Daily Newsletter landing page has a large visual hero, headline, short value proposition, email field and Subscribe/Join for free CTA.
- The landing page includes repeated signup modules in its extracted content.
- The homepage includes a Daily Newsletter module and signup form.
- The sitemap/footer also contains an email signup prompt.
- Signup copy states that the user will receive newsletters and promotional content, links to Terms of Use and Privacy Policy, and says the user may unsubscribe.
- The homepage describes the newsletter as trusted by more than 1.2 million subscribers; this is a publisher-displayed claim, not independently audited subscriber data.

### Promotions and account-based features

- A top announcement strip promotes the November 2026 site redesign.
- Credit-card welcome offers, travel bonus offers and transfer bonuses are prominent across the homepage and topic hubs.
- TPG Member Offers is promoted as a free-account benefit in the site’s redesign announcement.
- The redesign announcement says comments are back and that a free account enables readers to comment, react and view the full discussion.
- The homepage promotes TPG's YouTube videos and social channels.

### Popups

- No modal newsletter popup or timed exit-intent popup was observed in the inspected clean page captures.
- A global announcement banner and newsletter blocks are clearly present.
- Cookie settings are exposed in footer navigation on inspected pages.
- A clean scrape cannot establish that no consent dialog, geotargeted offer, delayed popup or campaign overlay will ever appear. Popup behavior may vary by consent state, geography, browser storage, campaign and time.

## 10. Mobile, tablet and desktop responsive design

### Desktop observations

- Desktop navigation exposes full topic groups and nested mega-menu links.
- The Travel hub has a wide editorial-card layout, destination tiles, travel-brand logo directory and grouped content feeds.
- The homepage uses multi-column card modules, editorial story collections, promotional cards and a wide interactive calculator.

### Mobile observations

- At a narrow viewport, the header uses a compact grid layout and a menu trigger with an accessible “Menu” label.
- The extracted HTML shows the desktop/mobile layout split through responsive utility classes, including `lg:hidden`.
- The global header is sticky (`sticky top-0` in the returned markup).
- Content is still represented as navigable cards and topic groups in the mobile page output.
- Images are served through width-specific optimized URLs in sampled page assets.

### Tablet and responsive limitations

- A 390px mobile capture and a 1440px desktop capture were inspected; a dedicated tablet viewport/device test was not completed.
- Breakpoint class usage indicates responsive layout rules, but exact tablet columns, menu transition, card stacking and touch-target sizing were not measured.
- No physical iOS/Android device, browser zoom, landscape orientation or low-bandwidth test was performed.

## 11. SEO structure and internal linking

### Observed public SEO and IA signals

- Page titles and descriptions are exposed for the inspected homepage and topic hubs.
- The homepage and topic hubs expose a clear H1 and multiple H2 section headings in extracted content.
- Topic pages have descriptive, human-readable paths such as `/travel`, `/credit-cards` and `/disney`.
- Articles use topic-oriented paths such as `/travel/`, `/news/`, `/loyalty-programs/`, `/hotel/` and `/airline/`.
- The public sitemap groups content by topics and article types: credit cards, airlines, hotel chains, points programmes, Guides, News, Reviews and Travel Deals.
- The sitemap lists selected destination hubs and has links to About, Contact, Newsletters, Careers, legal pages and partner information.
- Article templates provide author profiles, dates, reading times, related stories and multiple contextual links into airline, hotel, card and points-programme pages.
- The Japan guide demonstrates dense contextual internal linking between a destination topic, airline programmes, hotel programmes, card rewards and related guides.
- The destination hub uses article cards to route readers to topic-specific guides, including articles in other taxonomies.

### Not verified

- Canonical URL correctness across the site, robots directives, XML sitemap completeness, hreflang, Open Graph/Twitter metadata, structured data validity, pagination canonicalization and indexation status were not independently validated.
- The HTML extraction did not provide sufficient reliable evidence to claim that every page has valid JSON-LD or a specific schema type.
- No backlink profile, ranking data, crawl-depth analysis, duplicate-content check or Google Search Console data was available.
- Do not infer search ranking or organic traffic from visible content structure alone.

## 12. Page performance and accessibility

### Performance evidence

- TPG's November 2026 founder announcement says the site was rebuilt to be faster and easier to explore, with a new homepage, navigation and topic hubs. This is a publisher-stated product claim.
- Returned HTML shows a sticky navigation header and Next.js-style responsive image optimization URLs.
- Sampled homepage markup includes many lazy-loaded image elements.
- Fastly and Sanity image delivery patterns are visible in image URLs.

### Performance not verified

- No Lighthouse score, PageSpeed score, Core Web Vitals, TTFB, LCP, INP, CLS, JS bundle size, hydration timing or network waterfall was measured.
- No comparative speed test against Nomadic Matt was run.
- Therefore, the statement “faster site” is recorded as TPG's claim, not an independently measured result.

### Accessibility evidence

- The mobile menu button exposes an accessible name and dialog-related ARIA attributes in the returned markup.
- The sitemap page includes a “Skip to content” link.
- The sampled homepage HTML includes alt attributes on the extracted image elements.
- The article templates expose visible author names, roles and image credits.
- The HTML uses semantic header, main, nav and heading elements in the inspected samples.

### Accessibility not verified

- No WCAG 2.2 AA audit was conducted.
- Keyboard-only navigation, focus order, visible focus states, screen-reader output, contrast ratios, reduced-motion preferences, form error announcements, captions/transcripts and touch target dimensions were not tested.
- The absence of a skip link in one extracted homepage sample should not be treated as proof that the entire site lacks skip navigation; the sitemap page explicitly exposes one.

## 13. Interactive features and animations

### Observed interactive/product features

- AskTPG question input and suggested prompts.
- Spending-to-points / travel redemption calculator with selectable trip intention and monthly spend.
- CardMatch entry point on the Credit Cards hub.
- Searchable Travel brands directory.
- “Jump to section” navigation on the Japan article.
- “Show summary” and summary-feedback controls in the inspected Japan guide.
- Article comments, with sign-in/create-account links and Community Guidelines.
- Article image carousel/slideshow in the redesign announcement (three labelled slides).
- Newsletter email forms.
- Offer/application CTAs and rates-and-fees links.
- Embedded YouTube/video story cards.
- Cookie settings control in footer navigation.

### Motion and animation evidence

- The HTML declares smooth scrolling behavior through a scroll-smooth class.
- Article feature content includes a three-slide image presentation.
- The page uses responsive UI and interactive modules; no evidence from the static capture proves the exact motion design, transition timing or animation easing.
- No continuous decorative animation or autoplay behavior was confirmed during this inspection.

### Not verified

- Calculator output logic and whether results update correctly for every input combination.
- AskTPG AI responses, source attribution, latency and error states.
- Comment posting, moderation, reactions and account workflows.
- Newsletter form submission and confirmation email delivery.
- Actual menu transitions, animation frame rate and reduced-motion behavior.

## 14. Comparison with Nomadic Matt

| Dimension | Nomadic Matt (audit above) | The Points Guy (this audit) |
|---|---|---|
| Core positioning | Destination-led travel advice and trip planning | Travel, points/miles, loyalty, credit cards and travel news |
| Homepage intent | Help plan a trip and navigate destination guides | Ask a rewards question, earn/use points, browse news, compare offers and travel |
| Primary navigation | Travel-guide and planning-oriented hierarchy | Credit cards, Rewards, Travel and Offers |
| Destination model | Country and city guide hierarchy with destination-specific practical information | Selected destination/topic hubs and rewards-led destination articles |
| Article model | Evergreen, explanatory travel articles and destination guides | News, reviews, guides, listicles, first-hand reports and rewards explainers |
| Search/discovery | Destination/category-oriented search and guide navigation | AskTPG, searchable travel-brand list, card matching and points calculator |
| Visual content | Travel photography and editorial guide imagery | Editorial photography plus product/card images, staff portraits, logos and video thumbnails |
| Monetization | Travel affiliate/resource recommendations and disclosed affiliate links | Credit-card affiliate referrals, travel/retail affiliate links, labelled partner content, sponsorships and member offers |
| Newsletter | Newsletter signup integrated with travel-planning content | Daily Newsletter positioned around points, travel news and partner deals |
| Engagement | Article navigation and destination-guide internal links | Comments/account system, AskTPG, calculator, card match, video and member offers |
| Editorial emphasis | Destination knowledge and trip logistics | Rewards value, airline/hotel loyalty, product comparisons and travel industry news |

### Useful lessons for Travel Guide

1. **Keep destination intent primary.** TPG's strong interactive tools are useful, but its main commercial emphasis is rewards and credit cards. A destination-first Travel Guide should not bury country/city planning beneath unrelated financial-product navigation.
2. **Use destination hubs as curated content clusters.** The Disney hub shows how one destination/topic can aggregate planning guides, hotels, cruises, savings tips and related editorial stories.
3. **Build practical discovery tools only when their output is explainable.** AskTPG and the points calculator reduce friction, but a static site should not imitate AI or dynamic calculations with fake controls or fabricated results.
4. **Make commercial labels explicit.** Partner stories, affiliate disclosures, application CTAs and sponsored placements are visibly separated or disclosed. Travel Guide should label affiliate relationships and sponsored content near the recommendation, not only in the footer.
5. **Show author credentials and first-hand evidence.** TPG article pages expose author names, roles, biographies and contributor credits. Destination guides should identify the researcher/author and last-reviewed date.
6. **Use strong internal-link clusters.** TPG connects destinations with hotels, airlines, loyalty programmes and relevant how-to guides. Travel Guide can connect country, city, attraction, transport, accommodation and itinerary pages without forcing irrelevant links.
7. **Adopt optimized responsive imagery, not just large photographs.** TPG's sampled image pipeline includes responsive width parameters and WebP transformations. Travel Guide should generate properly sized WebP variants, set dimensions and avoid lazy-loading the true above-the-fold hero.
8. **Treat the article page as a product template.** Contents navigation, quick summary, update context, related stories, author details and comment/community features are useful patterns; implement only those that can be maintained accurately.
9. **Avoid copying the rewards-led commercial funnel.** Credit-card offer walls and points calculators do not automatically fit a destination guide. Monetization should match user intent and available, legitimate travel partners.
10. **Measure before claiming speed or accessibility.** TPG publicly claims its new site is faster, but this audit did not independently measure its Web Vitals. Travel Guide should publish measured Lighthouse/Core Web Vitals and accessibility results rather than repeating competitor marketing language.

## 15. Evidence sources

### Primary TPG pages
- Homepage: https://thepointsguy.com/
- Travel hub: https://thepointsguy.com/travel
- Credit Cards hub: https://thepointsguy.com/credit-cards
- Disney destination hub: https://thepointsguy.com/disney
- Japan guide: https://thepointsguy.com/loyalty-programs/travel-to-japan-with-points-and-miles
- 2026 destination inspiration guide: https://thepointsguy.com/travel/best-places-to-go-2026
- Aviation news article: https://thepointsguy.com/news/faa-groundstop-flights-grounded-nationwide
- Redesign / AskTPG announcement: https://thepointsguy.com/news/future-of-tpg
- Daily Newsletter: https://thepointsguy.com/newsletters/daily
- Sitemap: https://thepointsguy.com/sitemap/
- Advertising policy: https://thepointsguy.com/legal/advertising-policy
- About: https://thepointsguy.com/about
- Editorial team and methodology: https://thepointsguy.com/about-us
- Privacy policy: https://thepointsguy.com/legal/privacy-policy

### Research boundaries
- The audit reflects the live public experience inspected on 14 November 2026.
- The redesign announcement and current page structure may change after this date.
- No third-party traffic, revenue, speed, accessibility or ranking metrics are represented as measured facts.

## 16. Audit conclusion

The Points Guy is a rewards-led travel media and product platform. Its strongest differentiators are its deep loyalty-programme taxonomy, commercial comparison funnels, editorial news/review coverage, AskTPG entry point, points calculator, searchable travel-brand directory, author credentials and integrated member/newsletter ecosystem.

For Travel Guide, the most transferable ideas are destination/topic hubs, practical article navigation, author transparency, contextual internal linking, responsive image delivery and clear affiliate disclosure. The site should not be copied as a card-offer or points-rewards portal if the intended product is a destination-first static travel guide.

**Phase 1 progress:** Nomadic Matt and The Points Guy audits are now documented in this file. No other competitor audit, sitemap/architecture phase, design-system phase, monetization-eligibility phase or production development was performed in this step.
