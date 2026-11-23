# AGENTS.md

HTML slide decks built on reveal.js. The user supplies the idea, context, style
and data; the agent writes the deck. Decks must open straight from the file
system or from GitHub Pages: no frameworks, no build step, no CDN.

Every deck is self-contained: it carries its own copy of the CSS and any
other files it needs, so changing a template or another deck never breaks an
existing deck. The only shared files are the vendored libraries and fonts in
`vendor/` (reveal.js, Chart.js, web fonts), loaded via `../../vendor/`.

## Layout

```
vendor/reveal/        reveal.js 6.0.2, vendored. Read-only.
  dist/               reveal.js, reveal.css, reset.css, dist/plugin/*.js
  plugin/             plugin sources (TypeScript); never load these
vendor/chart/         Chart.js 4.6.1, UMD build (global `Chart`). Read-only.
vendor/fonts/         vendored web fonts (SIL OFL), one folder per family;
                      the only place fonts live. Read-only once added.
templates/<name>/     copy-ready deck templates; `base` is the default
  index.html          demo deck showing every layout of the template
  notes.js            the demo deck's speaker notes
  base.css            foundation: typography, layout classes, default tokens
  theme.css           the template's token overrides and brand rules
decks/<deck>/         one folder per deck, created by copying a template
  brief.md            idea, audience, context, style notes (written by the user)
  index.html          the deck
  notes.js            speaker notes, one entry per slide id (the user edits these)
  base.css            the deck's own copy of the template's base.css
  theme.css           deck-specific theme (starts as the template's theme.css)
  assets/             images, CSV/JSON data
```

Templates and decks sit at the same depth (`<dir>/<name>/`), so `../../vendor/`
works in both and a template folder can be copied without fixing paths.

## Reference

The reveal.js documentation at https://revealjs.com/ covers every feature:
config options, fragments, auto-animate, transitions, backgrounds, speaker
notes and speaker view, PDF export (`?print-pdf`), plugins and the JS API.
Check it before building custom behavior. The vendored copy is 6.0.2; the site
documents the latest release.

## Building a deck

1. Read `decks/<deck>/brief.md` and everything in `assets/`.
2. Pick the template named in the brief (default: `base`) and copy all of its
   files into `decks/<deck>/`, without overwriting `brief.md` or `assets/`:
   `cp -R templates/<name>/. decks/<deck>/`. Paths need no changes.
3. Put deck-specific styling in the deck's `theme.css`; leave the copied
   `base.css` as it is unless the deck really needs a change there (it only
   affects this deck). CSS load order: reveal `reset.css`, `reveal.css`,
   `base.css`, `theme.css`. No reveal theme from `vendor/reveal/dist/theme/`.
   Fonts are loaded with `@font-face` from `../../vendor/fonts/<family>/`;
   never copy font files into a deck or template.
4. Replace the demo slides with the deck's slides, reusing the demo's
   patterns (title, divider, cols, card, stat, statement, chart, diagram). Ask when the brief leaves something important open
   (audience, length, template) instead of guessing.  
5. While interacting with the user, if decisions about content and similar things are made, update the brief.md file to reflect the changes.

## Templates

- `templates/base/` is the default. Other templates (e.g. an HSG template)
  live next to it as `templates/<name>/`, each a complete, working demo deck
  with the same file set (`index.html`, `notes.js`, `base.css`, `theme.css`).
- To create a template, copy an existing one and change its `theme.css`
  (and `base.css` or demo slides if needed). Templates are previewable at
  `templates/<name>/index.html`.
- Changing a template affects only decks created afterwards. Never update
  existing decks to match a changed template unless the user asks for it.

## Building a deck (interactive)
Similar to "Building a deck" above, but instead of "brief.md" there will be an interactive session with the agent. After all questions have been answered and the context is clear and given, write the brief.md file yourself.

## Rules

- Start every deck by copying a folder from `templates/`.
- Keep decks self-contained: a deck references only files inside its own
  folder, plus `../../vendor/` for reveal.js, Chart.js and fonts. Never link to
  another deck or a template; copy what is needed instead.
  Apart from `vendor/` (libraries and fonts), `python3 -m http.server` run inside the
  deck folder must serve everything the deck uses. To present, serve the repo
  root (or use GitHub Pages) so `../../vendor/` resolves.
- Load scripts and fonts only from `vendor/`. No CDN, no external fonts or
  scripts; anything new gets vendored first, and only after asking. A new font
  goes into `vendor/fonts/<family>/` with its license file.
- Use relative paths only, so decks work under `file://` and under a Pages
  subpath.
- Don't edit `vendor/`. Change a template in `templates/` only when asked.
- Use the classes in the deck's `base.css` and `theme.css`. If a new class is
  needed, add it to the deck's `theme.css`, not inline `style=""`. Colors and
  fonts always come from the tokens (`--c-*`, `--chart-*`, `--font-*`).
- Slides are top-aligned (`center: false`); add `class="center"` to a section
  to center it vertically.
- One idea per slide. Short text; detail goes in speaker notes.
- Speaker notes live in the deck's `notes.js`, not in `index.html`, so the user
  can edit them without touching the slides:
  - Every `<section>` gets a short, unique, kebab-case `id` describing its
    content (`id="attack-chain"`). The id is also the slide's URL
    (`#/attack-chain`), so don't use slide numbers.
  - `notes.js` sets ``window.NOTES = { 'slide-id': `text`, ... }``, in slide
    order, with a `// <slide label>` comment above each entry. Plain text in
    backticks: a blank line starts a paragraph, a line starting with `- ` or
    `1. ` starts a list line, other line breaks become spaces. No HTML.
  - `addNotes()` in the deck's script turns each entry into an
    `<aside class="notes">` before reveal.js starts, so the speaker view and
    `?print-pdf&showNotes=true` work as usual. It warns in the console about
    keys that match no slide.
  - When a slide is added, renamed or removed, update its `notes.js` entry in
    the same change. Don't add inline `<aside class="notes">` to slides.
  - The deck's `notes.js` is unrelated to reveal's notes plugin
    (`vendor/reveal/dist/plugin/notes.js`); decks load both.
- Charts: Chart.js for data charts, inline SVG for diagrams and very simple
  figures. Never screenshots of charts. Follow the template's pattern: a
  `<canvas data-chart="name">` inside `div.chart`, a builder in `CHARTS`, data
  in `DATA`, colors via `token('--chart-1')` and so on. Give every canvas and
  SVG `role="img"` and an `aria-label` that states the data.
- SVG diagrams get `class="diagram"` and are colored only through its classes
  (`node`, `is-accent`, `edge`, `arrowhead`, `label`).
- `fetch()` fails under `file://`, so don't load `assets/*.json` or `.csv`
  (or notes as `.md`/`.json`) at runtime; a `<script src>` works. Put the data
  inline in `DATA`, copied from `assets/`, which stays the source of truth.
- Images need `alt` text.

## Verification

No tests. You may verify the presentation with your internal browser and hosting tools. No need to test PDF download, only that the slides work.
