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
themes/base.css       foundation for every deck: typography, layout classes,
                      default tokens (CSS variables)
themes/<name>.css     shared themes (e.g. hsg.css); mostly token overrides
template/index.html   demo deck showing every layout; the base for new decks
decks/<deck>/
  brief.md            idea, audience, context, style notes (written by the user)
  index.html          the deck
  theme.css           optional deck-specific theme
  assets/             images, CSV/JSON data
```

## Reference

The reveal.js documentation at https://revealjs.com/ covers every feature:
config options, fragments, auto-animate, transitions, backgrounds, speaker
notes and speaker view, PDF export (`?print-pdf`), plugins and the JS API.
Check it before building custom behavior. The vendored copy is 6.0.2; the site
documents the latest release.

## Building a deck

1. Read `decks/<deck>/brief.md` and everything in `assets/`.
2. Copy `template/index.html` to `decks/<deck>/index.html` and fix relative
   paths (`../../vendor/...`, `../../themes/...`).
3. Pick the shared theme named in the brief. Put deck-specific styling in
   `decks/<deck>/theme.css`, loaded after the shared theme. CSS load order:
   reveal `reset.css`, `reveal.css`, `themes/base.css`, `themes/<theme>.css`,
   deck `theme.css`. No reveal theme from `vendor/reveal/dist/theme/`.
4. Replace the demo slides with the deck's slides, reusing the demo's
   patterns (title, divider, cols, card, stat, statement, chart, diagram). Ask when the brief leaves something important open
   (audience, length, theme) instead of guessing.  
5. While interacting with the user, if decisions about content and similar things are made, update the brief.md file to reflect the changes.

## Building a deck (interactive)
Similar to "Building a deck" above, but instead of "brief.md" there will be an interactive session with the agent. After all questions have been answered and the context is clear and given, write the brief.md file yourself.

## Rules

- Start every deck from `template/index.html`.
- Load scripts only from `vendor/`. No CDN, no external fonts or
  scripts; anything new gets vendored first, and only after asking.
- Use relative paths only, so decks work under `file://` and under a Pages
  subpath.
- Don't edit `vendor/`. Change a shared theme in `themes/` only when asked,
  since other decks use it; otherwise override in the deck's `theme.css`.
- Use the classes in `themes/base.css` and the deck's themes. If a new class is
  needed, add it to the deck's `theme.css`, not inline `style=""`. Colors and
  fonts always come from the tokens (`--c-*`, `--chart-*`, `--font-*`).
- Slides are top-aligned (`center: false`); add `class="center"` to a section
  to center it vertically.
- One idea per slide. Short text; detail goes in speaker notes
  (`<aside class="notes">`).
- Charts: Chart.js for data charts, inline SVG for diagrams and very simple
  figures. Never screenshots of charts. Follow the template's pattern: a
  `<canvas data-chart="name">` inside `div.chart`, a builder in `CHARTS`, data
  in `DATA`, colors via `token('--chart-1')` and so on. Give every canvas and
  SVG `role="img"` and an `aria-label` that states the data.
- SVG diagrams get `class="diagram"` and are colored only through its classes
  (`node`, `is-accent`, `edge`, `arrowhead`, `label`).
- `fetch()` fails under `file://`, so don't load `assets/*.json` or `.csv` at
  runtime. Put the data inline in `DATA`, copied from `assets/`, which stays
  the source of truth.
- Images need `alt` text.

## Verification

No tests. You may verify the presentation with your internal browser and hosting tools. No need to test PDF download, only that the slides work.
