# Cloudflare Pages build configuration

The TravelGuide homepage source is maintained in `src/` and generated as a static site in `dist/` by `scripts/build.mjs`.

Cloudflare Pages project `travelguide` must use:

- Root directory: `/`
- Build command: `npm run build`
- Build output directory: `dist`

Do not publish the repository root (`.`) as the static output directory. The repository root does not contain the generated homepage `index.html`.

This configuration is for the isolated `development/homepage` preview workflow. The production branch remains `main`; do not merge or promote without explicit approval.
