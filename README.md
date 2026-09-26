# Lando Norris — Local Mirror

A fully self-hosted mirror of [landonorris.com](https://landonorris.com), running the original Webflow + OFF+BRAND JS, Rive 3D animations, and a Three.js / WebGL helmet hero — all from local assets.

## Run

```bash
npm install
npm run dev
# open http://localhost:5173
```

## What's bundled

| Path | Origin | Purpose |
|---|---|---|
| `index.html` | `landonorris.com/` | Original Webflow output, asset URLs rewritten to local paths |
| `css/` | Webflow CDN | Webflow-generated stylesheets |
| `js/lando.gold-v3.js` | `lando.itsoffbrand.io` | Main OFF+BRAND bundle (Rive + WebGL + Lenis + GSAP) |
| `js/transitions-rive-isolate.js` | OFF+BRAND CDN | Rive WASM runtime |
| `js/lando-offbrand.*.js` | Webflow CDN | Webpack chunks (tram.js etc.) |
| `rive/` | OFF+BRAND CDN | All 8 `.riv` files (signature, btn-ui, circuits, reef, phrases, ln4, mob-landscape, page-transition) |
| `gl/` | OFF+BRAND CDN | WebGL assets — KTX2/WebP textures (head, helmet, glass), GLB models, HDRI envmaps, MSDF fonts, Basis & Draco transcoders |

Images, fonts, and `rive.wasm` still load from their public CDNs (`cdn.prod.website-files.com`, `unpkg.com`).

## Patches applied to the original JS

- `https://lando.itsoffbrand.io/rive/` → `/rive/`
- `https://assets.itsoffbrand.io/lando/rive/` → `/rive/`
- `https://lando.itsoffbrand.io/gl/` → `/gl/`
- Preloader auto-dismiss bumped from 1000ms → 3500ms so the lime "LOAD NORRIS" overlay is actually visible
- Click-to-dismiss wired on the "Load Norris" pill

## Notes

- Original integrity (SRI) hashes were stripped from the `<link>` tags since we modified some JS files.
- Klaviyo, iubenda, and analytics scripts are present in the source but commented out (matching the live site's state).
