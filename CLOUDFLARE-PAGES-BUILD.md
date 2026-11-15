# Cloudflare Pages build configuration

The TravelGuide homepage source is maintained in `src/` and generated as a static site in `dist/` by `scripts/build.mjs`.

Cloudflare Pages project `travelguide` must use:

- Root directory: `/`
- Build command: `npm run build`
- Build output directory: `dist`

Do not publish the repository root (`.`) as the static output directory. The repository root does not contain the generated homepage `index.html`.

This configuration is for the isolated `development/homepage` preview workflow. The production branch remains `main`; do not merge or promote without explicit approval.


## Branch-specific crawler and sitemap output

Cloudflare Pages sets \`CF_PAGES_BRANCH\` for the build. The project settings remain root \`/\`, command \`npm run build\`, output \`dist/\`, production branch \`main\`, Preview deployments enabled for all branches.

- \`CF_PAGES_BRANCH === "main"\` selects Production build behavior; all other values use Preview behavior.
- Branch identity is not launch approval. \`src/data/site.json\` has \`productionIndexingEnabled: false\`; Production continues to use noindex and \`Disallow: /\` until a separate approved launch change.
- \`dist/_headers\` carries Preview/protected-Production \`X-Robots-Tag\` and sitemap/robots MIME rules.
- Preview robots.txt allows crawling to permit bots to read noindex headers and does not advertise a sitemap. Its XML sitemap is valid but empty.
- \`_redirects\` is not generated because no redirects are required; unknown routes continue to use the real 404 document. No Pages settings were changed.
