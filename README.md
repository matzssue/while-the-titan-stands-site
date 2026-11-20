# While the Titan Stands: project page

A one-page site about the game *While the Titan Stands*: how it's built, its measured performance, the art pipeline
and how the work is done with Claude Code. The game's own repository is private; this repo holds only the page.

Built with [Astro](https://astro.build) and TypeScript, with no client-side JavaScript. Content lives in
`src/data/content.ts`, and every number there comes from a measurement in the game repo.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + static build to dist/
```

## Gameplay video

The hero clip lives in `public/media/`: `gameplay.webm` (AV1, served first) with `gameplay.mp4` (H.264) as the
fallback for browsers without AV1. Paths are set in `heroVideo` in `src/data/content.ts`.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml` and publishes `dist/` to GitHub Pages.
One-time setup: repo Settings → Pages → Source: **GitHub Actions**.

## Fonts

Titan Header SC (derived from IM Fell English SC) and SN Pro, both SIL Open Font License 1.1. The licence texts are in
`public/fonts/`.
