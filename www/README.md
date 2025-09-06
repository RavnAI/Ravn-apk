# Ravn PWA (Vite + React + TypeScript + Tailwind)

Offline-first PWA-demonstrator for meldinger, tale og K-token-økosystemet.

## Kjør lokalt

```bash
npm install
npm run dev
```

Appen starter på http://localhost:5173

## Bygg for produksjon

```bash
npm run build
npm run preview
```

## Deploy (Vercel/Netlify/Cloudflare Pages)

- Deploy `dist/` etter `npm run build`.
- Sørg for at `public/manifest.webmanifest` og `public/service-worker.js` blir servert fra rot (`/manifest.webmanifest`, `/service-worker.js`).

## PWA-funksjoner

- Service worker med offline fallback til `/offline.html`.
- Installér som app via "Installer som app" på Hjem-siden.
- Enkel demo for meldinger og tale.
- Klart for utvidelse til mesh/radio-fallback og K-token wallet.
