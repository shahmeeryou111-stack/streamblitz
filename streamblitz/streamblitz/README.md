# StreamBlitz — Live Sports Streaming (Static Demo)

A premium-looking, fully static React + Vite + Tailwind sports streaming platform. All data is simulated. Deploys to Cloudflare Pages (or any static host).

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to Cloudflare Pages

**Option A — via Git (recommended)**

1. Push this folder to a GitHub repo.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Framework preset: `None` (or Vite).
6. Deploy. Cloudflare will build & serve; `HashRouter` avoids any 404 on refresh.

**Option B — direct upload**

1. `npm install && npm run build`
2. Cloudflare Dashboard → Pages → Create → Upload assets → drag the `dist/` folder.

## Structure

- `src/pages/` — Home, Sport, Match, Schedule, Search, NotFound
- `src/components/` — Navbar, Footer, MatchCard, MatchesSchema
- `src/data/matches.js` — Hardcoded sports + matches
- `public/` — favicon, robots.txt, sitemap.xml
- `index.html` — Meta tags + JSON-LD (Organization, WebSite, WebPage, FAQPage)

## Notes

Static site — no backend. `HashRouter` is used so deep links (`/#/match/xxx`) work on any static host including Cloudflare Pages with zero config.
