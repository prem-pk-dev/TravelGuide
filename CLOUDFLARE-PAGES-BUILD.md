# Cloudflare Pages build configuration

The TravelGuide homepage source is maintained in `src/` and generated as a static site in `dist/` by `scripts/build.mjs`.

Cloudflare Pages project `travelguide` must use:

- Root directory: `/`
- Build command: `npm run build`
- Build output directory: `dist`

Do not publish the repository root (`.`) as the static output directory. The repository root does not contain the generated homepage `index.html`.

This configuration is for the isolated `development/homepage` preview workflow. The production branch remains `main`; do not merge or promote without explicit approval.


## Branch-aware crawler and sitemap output

Cloudflare Pages supplies CF_PAGES_BRANCH to build commands. The static build uses it only to distinguish the production branch (main) from Preview branches; it does not equate the main branch with launch approval.

- Project build configuration remains root /, build command npm run build, output dist/.
- CF_PAGES_BRANCH === "main" selects production build behavior. All other values (including local builds with no branch variable) use the safe Preview behavior.
- src/data/site.json carries canonicalOrigin and productionIndexingEnabled. That setting remains false until explicit launch approval.
- Preview: Allow: / in robots.txt (to let bots fetch pages), global X-Robots-Tag: noindex, nofollow, no Sitemap: directive, and a valid empty sitemap.xml.
- Protected Production: Disallow: /, HTML meta noindex, and global response X-Robots-Tag: noindex, nofollow; sitemap exists but is empty because no generated document is currently indexable.
- Approved Production (not activated): only after changing the explicit approval flag, robots.txt allows crawling and advertises the canonical sitemap, HTML index directives are enabled, and sitemap membership is derived from generated HTML.

### Cloudflare static files

- _headers is generated in dist/ so Cloudflare applies branch-specific response headers to static assets, including HTML, robots.txt and XML sitemap files.
- _redirects is not generated: no redirect is required for this architecture, and no rewrite should map unknown routes to the homepage. Unknown paths continue to use the actual 404 page.
- No Pages project settings, production branch settings, environment variables or production deployments are changed by this implementation.
