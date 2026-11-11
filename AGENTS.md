# AGENTS.md

HTML slide decks built on reveal.js. The user supplies the idea, context, style
and data; the agent writes the deck. Decks must open straight from the file
system or from GitHub Pages: no frameworks, no build step, no CDN.

## Layout

```
vendor/reveal/        reveal.js 6.0.2, vendored. Read-only.
  dist/               reveal.js, reveal.css, reset.css, dist/plugin/*.js
  plugin/             plugin sources (TypeScript); never load these
vendor/chart/         Chart.js 4.6.1, UMD build (global `Chart`). Read-only.
themes/<name>.css     shared themes (e.g. hsg.css)
template/index.html   starter deck wired to vendor + a shared theme
decks/<deck>/
  brief.md            idea, audience, context, style notes (written by the user)
  index.html          the deck
  theme.css           optional deck-specific theme
  assets/             images, CSV/JSON data
```

## Building a deck

1. Read `decks/<deck>/brief.md` and everything in `assets/`.
2. Copy `template/index.html` to `decks/<deck>/index.html` and fix relative
   paths (`../../vendor/...`, `../../themes/...`).
3. Pick the shared theme named in the brief. Put deck-specific styling in
   `decks/<deck>/theme.css`, loaded after the shared theme.
4. Write the slides. Ask when the brief leaves something important open
   (audience, length, theme) instead of guessing.

## Rules

- Start every deck from `template/index.html`.
- Load scripts only from `vendor/`. No CDN, no external fonts or
  scripts; anything new gets vendored first, and only after asking.
- Use relative paths only, so decks work under `file://` and under a Pages
  subpath.
- Don't edit `vendor/`. Change a shared theme in `themes/` only when asked,
  since other decks use it; otherwise override in the deck's `theme.css`.
- Use the classes a deck's themes define. If a new class is needed, add it to
  the deck's `theme.css`, not inline `style=""`.
- One idea per slide. Short text; detail goes in speaker notes
  (`<aside class="notes">`).
- Charts: Chart.js for data charts, inline SVG for diagrams and very simple
  figures. Never screenshots of charts. Take colors and fonts from the theme's
  CSS variables so charts match the deck.
- `fetch()` fails under `file://`, so don't load `assets/*.json` or `.csv` at
  runtime. Put the data inline in a `<script>` in the deck, copied from
  `assets/`, which stays the source of truth.
- Images need `alt` text.

## Verification

No tests, and don't launch a browser or server. The user checks decks by hand:

- open `index.html` in a browser; arrow keys navigate, `Esc` shows the overview
- speaker notes (`S`) need a local server: `python3 -m http.server`
- PDF: append `?print-pdf` to the URL and print to PDF
