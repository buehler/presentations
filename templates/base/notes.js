// Speaker notes for this deck, one entry per slide.
//
// Each key is the id of a <section> in index.html, e.g. <section id="agenda">.
// Write plain text between the backticks; indentation doesn't matter.
//   - A blank line starts a new paragraph.
//   - A line starting with "- " or "1. " starts a new line (lists).
//   - Other line breaks are joined with a space, so wrap lines freely.
// Text is shown as-is (no HTML). A key that matches no slide is reported in
// the browser console. Press S in the deck for the speaker view.

window.NOTES = {

  // Title
  'title': `
    Title slide: section.title.center. Kicker, h1, .lead, .meta.
  `,

  // Agenda
  'agenda': `
    Plain content slide: h2 plus a list. Slides are top-aligned by default.
  `,

  // Divider
  'divider-text': `
    Chapter divider: section.divider.center with a .number and an h2.
  `,

  // Bullets with fragments
  'bullets': `
    The kicker labels the slide; the h2 states its point as a sentence.
    Press S for the speaker view (needs a local server).

    Notes can hold lists:
    - one line per point
    - long points can wrap onto the next line
      and stay one point
  `,

  // Cards in columns
  'cards': `
    div.cols makes one equal column per child. div.card gives a tinted box.
  `,

  // Text + key figure
  'argument-evidence': `
    div.cols.wide-left gives a 2:1 split; .middle centers the columns vertically.
  `,

  // Key figures row
  'key-figures': `
    A row of div.stat inside div.cols. Use this instead of a chart when the
    point is a few headline numbers.
  `,

  // Statement
  'statement': `
    section.statement.center. Wrap the key phrase in em to color it.
  `,

  // Quote
  'quote': `
    blockquote with a cite inside. Only quote real sources, with attribution.
  `,

  // Chart.js
  'chart': `
    Chart.js chart. The canvas names a builder in the CHARTS object at the
    bottom of index.html; data sits inline in DATA. Charts build when their
    slide is first shown, so the animation plays on arrival.
  `,

  // Inline SVG diagram
  'diagram': `
    Inline SVG with class="diagram". Color comes from the classes node,
    node is-accent, edge, arrowhead and label, so it follows the theme.
    Never set fill or stroke colors directly.
  `,

  // Table
  'table': `
    Plain table. Put class="num" on numeric cells to right-align them.
  `,

  // Code
  'code': `
    Highlight plugin. Wrap HTML in script type="text/template" so it isn't
    parsed. data-line-numbers="1-3" highlights those lines.

    The id links the slide to its notes in notes.js.
  `,

};
