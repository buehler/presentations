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

  // Title (green band)
  'title': `
    Title slide: section.band with a .band-head (green, h1 and optional .lead)
    and a .band-body (.authors with the .presenter in green, .meta, HSG logo
    bottom right). Add author photos or partner logos in .band-body if needed.
  `,

  // Agenda
  'agenda': `
    Plain content slide: centered h2 and a list. .narrow keeps the list in a
    centered column.
  `,

  // Divider
  'divider-text': `
    Chapter divider: section.divider.center, full green, with a .number and an
    h2. No logo on dividers.
  `,

  // Title + subtitle, bullets
  'bullets': `
    The standard HSG content slide: a short centered h2 (the topic) and a green
    p.subtitle right below it (the slide's point). The logo bottom left and the
    slide number bottom right come from the theme.

    Notes can hold lists:
    - one line per point
    - long points can wrap onto the next line
      and stay one point
  `,

  // Step cards + takeaway
  'steps': `
    Three .card elements in .cols, each with a .step number, an h3 and one
    short paragraph. p.takeaway is the bold green conclusion line.
  `,

  // Text + key figure
  'argument-evidence': `
    .cols.wide-left.middle: argument in the wide column, a .stat in the narrow
    one.
  `,

  // Key figures row
  'key-figures': `
    Up to three .stat blocks in .cols, a takeaway and a .source line.
  `,

  // Research questions
  'questions': `
    Research questions as paragraphs with a strong.accent label. Use strong in
    the subtitle to stress words of the main question.
  `,

  // Statement
  'statement': `
    One sentence, centered. em turns green; use class="danger" for red.
  `,

  // Quote
  'quote': `
    blockquote with a cite line.
  `,

  // Divider
  'divider-data': `
    Second chapter divider.
  `,

  // Chart.js
  'chart': `
    Horizontal bar chart in HSG green. Builder in CHARTS, data in DATA, colors
    from the --chart-* tokens. .chart.short leaves room for a takeaway line.
  `,

  // Inline SVG diagram
  'diagram': `
    SVG diagram colored through the diagram classes; .node.is-accent marks the
    highlighted element in light green.
  `,

  // Table
  'table': `
    Table with a green header row, alternating grey rows and a bold first
    column. code inside cells renders in the mono font.
  `,

  // Divider
  'divider-code': `
    Third chapter divider.
  `,

  // Code
  'code': `
    pre.window draws a light code window with three dots. The light syntax
    colors live in theme.css; no dark highlight.js theme is loaded.
  `,

  // Code, negative outcome
  'code-danger': `
    Same code window; p.takeaway.danger turns the verdict red.
  `,

  // Closing (green band)
  'closing': `
    Closing slide: same band layout as the title slide, with contact details.
  `,

};
