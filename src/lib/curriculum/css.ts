import type { Lesson } from "./types";
import { cssHas, hasTag, textOf } from "./checks";

export const cssLessons: Lesson[] = [
  {
    id: "css-selectors",
    week: 3,
    order: 7,
    track: "css",
    title: "Selectors and the cascade",
    subtitle: "Who gets the style, and who wins when they fight",
    minutes: 35,
    youWill: [
      "Target elements, classes, and descendants",
      "See why a class beats an element selector",
      "Keep specificity low on purpose",
    ],
    youShip: "A page where headings, a tag, and a muted line each have a job",
    visual: "cascade",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "CSS is a matching language. A selector finds nodes. A declaration list says what to do with them. When two rules match the same node, the cascade decides: origin, then specificity, then order. You will almost never need !important if you keep selectors simple.",
      },
      {
        type: "visual",
        id: "cascade",
      },
      {
        type: "code",
        lang: "css",
        caption: "Element, class, descendant. Specificity 0-0-1, 0-1-0, 0-1-1.",
        code: `h1 { font-size: 2rem; }
.tag { letter-spacing: 0.12em; text-transform: uppercase; }
article p { color: #4a4741; }
article p.lead { color: #1c1b18; }`,
      },
      {
        type: "list",
        items: [
          "Element selectors (h1, p) — good for defaults.",
          "Class selectors (.lead) — your everyday tool. Reusable, low drama.",
          "ID selectors (#hero) — too specific. Skip them for styling.",
          "Inline style=\"\" — wins almost everything. Keep style in the CSS pane.",
        ],
      },
      {
        type: "callout",
        kind: "rule",
        title: "Class names describe purpose, not appearance",
        text: ".lead is a lead paragraph. .muted is secondary. .red is a trap — the day it has to become green you are lying in the HTML.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Cascade</title>
  </head>
  <body>
    <p class="tag">North Studio</p>
    <h1>Tables that outlast the room they sit in.</h1>
    <p class="lead">Commissioned furniture in oak and walnut. One shop. No catalogue.</p>
    <p>Visit the loft on Thurman, Thursdays by appointment.</p>
  </body>
</html>`,
      css: `body {
  font-family: Georgia, serif;
  margin: 2rem;
  background: #f4f1ea;
  color: #1c1b18;
}

/* Target .tag, h1, .lead, and the last paragraph. */`,
      js: "",
    },
    challenge: {
      brief:
        "Style .tag as small uppercase tracked-out text. Make h1 large. Make .lead slightly larger than the following paragraph. Color the unmarked paragraph a muted brown. Use classes and elements only — no ids, no !important.",
      checks: [
        {
          id: "tag",
          label: ".tag is styled",
          hint: "A .tag { } rule. letter-spacing or text-transform is the usual pair.",
          run: (ctx) => cssHas(ctx, /\.tag\s*\{[^}]+\}/s),
        },
        {
          id: "h1",
          label: "h1 has a font-size",
          hint: "h1 { font-size: ... }",
          run: (ctx) => cssHas(ctx, /h1\s*\{[^}]*font-size/s),
        },
        {
          id: "lead",
          label: ".lead is distinct",
          hint: "A .lead rule with font-size or color.",
          run: (ctx) => cssHas(ctx, /\.lead\s*\{[^}]+\}/s),
        },
        {
          id: "no-important",
          label: "No !important, no id selectors",
          hint: "Keep specificity low. Delete #ids and !important if you added them.",
          run: (ctx) => !/!important/.test(ctx.css) && !/#[a-zA-Z]/.test(ctx.css),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Cascade</title>
  </head>
  <body>
    <p class="tag">North Studio</p>
    <h1>Tables that outlast the room they sit in.</h1>
    <p class="lead">Commissioned furniture in oak and walnut. One shop. No catalogue.</p>
    <p>Visit the loft on Thurman, Thursdays by appointment.</p>
  </body>
</html>`,
      css: `body {
  font-family: Georgia, serif;
  margin: 2rem;
  background: #f4f1ea;
  color: #1c1b18;
}
.tag {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.75rem;
}
h1 { font-size: 2.4rem; line-height: 1.15; }
.lead { font-size: 1.15rem; }
p { color: #5c5850; }
p.lead { color: #1c1b18; }`,
      js: "",
    },
  },
  {
    id: "css-box",
    week: 3,
    order: 8,
    track: "css",
    title: "The box model",
    subtitle: "Content, padding, border, margin — every node is a rectangle",
    minutes: 40,
    youWill: [
      "See padding as inner space and margin as outer space",
      "Use border-box so width means what you think",
      "Build a card without guessing numbers",
    ],
    youShip: "A card with a measured box — padding, border, radius",
    visual: "box-model",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "Every element is a box. From the inside out: content, padding, border, margin. Width by default is the content width — padding and border add on, so a 300px box with 20px padding is 340px on screen. This is the oldest practical joke in CSS.",
      },
      {
        type: "visual",
        id: "box-model",
      },
      {
        type: "code",
        lang: "css",
        caption: "Put this at the top of every stylesheet you ever write.",
        code: `*, *::before, *::after {
  box-sizing: border-box;
}`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "border-box",
        text: "With border-box, width includes padding and border. You say 320px, you get 320px. Margin still sits outside. Margin is not part of the box — it is the gap between boxes.",
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "Margin collapse",
        text: "Vertical margins between siblings collapse to the larger of the two. That is why two 24px-margin paragraphs are 24px apart, not 48. Use padding on a parent when you want inner space that does not collapse.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Box</title>
  </head>
  <body>
    <article class="card">
      <p class="tag">Menu</p>
      <h1>Sourdough, butter, salt.</h1>
      <p>Baked on iron. Served with cultured butter from the next valley.</p>
    </article>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #1c1b18;
  font-family: Georgia, serif;
}

/* .card needs a background, padding, a thin border, and a max-width. */`,
      js: "",
    },
    challenge: {
      brief:
        "Style .card as a real card: background, padding at least 24px, a 1px border, a max-width, and a border-radius. Keep box-sizing: border-box on the universal selector.",
      checks: [
        {
          id: "border-box",
          label: "Universal border-box",
          hint: "*, *::before, *::after { box-sizing: border-box; }",
          run: (ctx) => cssHas(ctx, /box-sizing\s*:\s*border-box/),
        },
        {
          id: "padding",
          label: ".card has padding",
          hint: ".card { padding: 24px; } — 1.5rem or more is fine.",
          run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*padding\s*:/s),
        },
        {
          id: "border",
          label: ".card has a border",
          hint: "border: 1px solid ...",
          run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*border\s*:/s),
        },
        {
          id: "radius",
          label: ".card has a radius",
          hint: "border-radius on .card.",
          run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*border-radius/s),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Box</title>
  </head>
  <body>
    <article class="card">
      <p class="tag">Menu</p>
      <h1>Sourdough, butter, salt.</h1>
      <p>Baked on iron. Served with cultured butter from the next valley.</p>
    </article>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #1c1b18;
  font-family: Georgia, serif;
}
.card {
  background: #f4f1ea;
  color: #1c1b18;
  padding: 32px;
  border: 1px solid #cfc8ba;
  border-radius: 16px;
  max-width: 360px;
}
.tag {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.7rem;
  margin: 0 0 12px;
}
h1 { font-size: 1.8rem; margin: 0 0 12px; line-height: 1.2; }
p { margin: 0; color: #5c5850; }`,
      js: "",
    },
  },
  {
    id: "css-type-color",
    week: 3,
    order: 9,
    track: "css",
    title: "Type, color, space",
    subtitle: "The three knobs that make a page feel designed",
    minutes: 35,
    youWill: [
      "Set a type scale instead of random font-sizes",
      "Limit color to ink, paper, and one accent",
      "Space with a consistent rhythm",
    ],
    youShip: "A readable article on a paper field",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "Most “this looks cheap” pages fail three ways: too many fonts, too many colors, and spacing that was typed by feel. Pick one body face. Pick one display face if you must. Body size 16–18px, line-height around 1.5, measure (line length) under 70 characters. Then stop.",
      },
      {
        type: "code",
        lang: "css",
        caption: "A small type system. Everything else inherits.",
        code: `:root {
  --ink: #1c1b18;
  --paper: #f4f1ea;
  --muted: #5c5850;
  --space: 8px;
}
body {
  font-family: "Iowan Old Style", Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.55;
  color: var(--ink);
  background: var(--paper);
  max-width: 42rem;
  margin: 0 auto;
  padding: calc(var(--space) * 6) calc(var(--space) * 3);
}`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "Space is a scale",
        text: "8, 16, 24, 32, 48. Not 13 and 27. If two things are related, the gap between them is a step on that scale — usually 8 or 16, not a coin-flip.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Essay</title>
  </head>
  <body>
    <article>
      <p class="kicker">Field notes</p>
      <h1>The shop opens at six because dough does not negotiate.</h1>
      <p>We mill in small bags. The crust is dark because pale bread is unfinished bread. Butter is a course, not a garnish.</p>
      <p>If you are in a hurry, the loaf at the front is yesterday’s. Take it. Today’s is still in the oven.</p>
    </article>
  </body>
</html>`,
      css: `/* Build a type system. Custom properties on :root, then body and article. */`,
      js: "",
    },
    challenge: {
      brief:
        "Declare --ink, --paper, and --muted on :root. Style body with a serif, a comfortable font-size and line-height, and a max-width. Distinguish the kicker from the h1 from the paragraphs. No more than three colors.",
      checks: [
        {
          id: "vars",
          label: "Custom properties on :root",
          hint: ":root { --ink: ...; --paper: ...; } — at least two variables.",
          run: (ctx) => cssHas(ctx, /:root\s*\{/) && (ctx.css.match(/--[a-zA-Z-]+\s*:/g) ?? []).length >= 2,
        },
        {
          id: "body-type",
          label: "Body has font-size and line-height",
          hint: "body { font-size: 1.125rem; line-height: 1.5; }",
          run: (ctx) =>
            cssHas(ctx, /body\s*\{[^}]*font-size/s) && cssHas(ctx, /body\s*\{[^}]*line-height/s),
        },
        {
          id: "measure",
          label: "A max-width on body or article",
          hint: "max-width so lines do not run the full screen. 40rem is a good start.",
          run: (ctx) => cssHas(ctx, /max-width\s*:/),
        },
        {
          id: "kicker",
          label: ".kicker is styled",
          hint: "Small, tracked, uppercase — a kicker is a label, not a heading.",
          run: (ctx) => cssHas(ctx, /\.kicker\s*\{[^}]+\}/s),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Essay</title>
  </head>
  <body>
    <article>
      <p class="kicker">Field notes</p>
      <h1>The shop opens at six because dough does not negotiate.</h1>
      <p>We mill in small bags. The crust is dark because pale bread is unfinished bread. Butter is a course, not a garnish.</p>
      <p>If you are in a hurry, the loaf at the front is yesterday’s. Take it. Today’s is still in the oven.</p>
    </article>
  </body>
</html>`,
      css: `:root {
  --ink: #1c1b18;
  --paper: #f4f1ea;
  --muted: #5c5850;
}
body {
  font-family: Georgia, serif;
  font-size: 1.125rem;
  line-height: 1.55;
  color: var(--ink);
  background: var(--paper);
  max-width: 42rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}
.kicker {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--muted);
}
h1 {
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 500;
}
p { color: var(--muted); }
h1 + p { color: var(--ink); }`,
      js: "",
    },
  },
  {
    id: "css-flex",
    week: 4,
    order: 10,
    track: "css",
    title: "Flexbox",
    subtitle: "One axis. Alignment on that axis. This is most of layout.",
    minutes: 40,
    youWill: [
      "Point a flex container down a row or a column",
      "Push items apart with justify-content and gap",
      "Build a header: mark on the left, links on the right",
    ],
    youShip: "A navigation bar that behaves",
    visual: "flex-lab",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "Flexbox is for one-dimensional layout: a row of items, or a column of items. You put display: flex on the parent. The children become flex items. You then say how they distribute leftover space, and how they align on the cross axis.",
      },
      {
        type: "visual",
        id: "flex-lab",
      },
      {
        type: "code",
        lang: "css",
        caption: "The header pattern you will write for the rest of your career.",
        code: `.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
nav {
  display: flex;
  gap: 24px;
}`,
      },
      {
        type: "list",
        items: [
          "flex-direction: row (default) or column.",
          "justify-content — main axis: start, center, space-between, space-around.",
          "align-items — cross axis: stretch (default), center, start, end.",
          "gap — space between items. Prefer gap over margin on children.",
          "flex: 1 — this item may grow to fill leftover space.",
        ],
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Header</title>
  </head>
  <body>
    <header class="site-header">
      <p class="mark">Harbor</p>
      <nav>
        <a href="#menu">Menu</a>
        <a href="#hours">Hours</a>
        <a href="#book">Book</a>
      </nav>
    </header>
    <main>
      <h1>Supper on the river.</h1>
    </main>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}
.mark { font-style: italic; }
a { color: inherit; text-decoration: none; }
main { padding: 3rem 2rem; }

/* Make .site-header a flex row: mark left, nav right, items centered. */
/* Make nav a flex row with a gap. */`,
      js: "",
    },
    challenge: {
      brief:
        "Turn .site-header into a flex row with space-between and centered items, with padding. Turn nav into a flex row with a gap of at least 16px. Links should sit on one line, on the right.",
      checks: [
        {
          id: "header-flex",
          label: "Header is a flex container",
          hint: ".site-header { display: flex; }",
          run: (ctx) => cssHas(ctx, /\.site-header\s*\{[^}]*display\s*:\s*flex/s),
        },
        {
          id: "between",
          label: "space-between on the header",
          hint: "justify-content: space-between;",
          run: (ctx) => cssHas(ctx, /justify-content\s*:\s*space-between/),
        },
        {
          id: "nav-flex",
          label: "nav is a flex row with gap",
          hint: "nav { display: flex; gap: 24px; }",
          run: (ctx) => cssHas(ctx, /nav\s*\{[^}]*display\s*:\s*flex/s) && cssHas(ctx, /gap\s*:/),
        },
        {
          id: "align",
          label: "Items vertically centered",
          hint: "align-items: center on the header.",
          run: (ctx) => cssHas(ctx, /align-items\s*:\s*center/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Header</title>
  </head>
  <body>
    <header class="site-header">
      <p class="mark">Harbor</p>
      <nav>
        <a href="#menu">Menu</a>
        <a href="#hours">Hours</a>
        <a href="#book">Book</a>
      </nav>
    </header>
    <main>
      <h1>Supper on the river.</h1>
    </main>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd6c8;
}
.mark { font-style: italic; margin: 0; font-size: 1.25rem; }
nav { display: flex; gap: 24px; }
a { color: inherit; text-decoration: none; }
main { padding: 3rem 2rem; }`,
      js: "",
    },
  },
  {
    id: "css-grid",
    week: 4,
    order: 11,
    track: "css",
    title: "Grid",
    subtitle: "Two axes at once — rows and columns that know about each other",
    minutes: 40,
    youWill: [
      "Define columns with repeat and minmax",
      "Drop items on a grid without floats",
      "Make a layout that stacks on a narrow screen",
    ],
    youShip: "A responsive three-card feature row",
    visual: "grid-lab",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "Flex wraps, but it does not know about the row below. Grid does. You declare the tracks, then let items fill them. For cards, galleries, and page shells (sidebar + main), grid is the tool. For a nav, flex is still the tool.",
      },
      {
        type: "visual",
        id: "grid-lab",
      },
      {
        type: "code",
        lang: "css",
        caption: "The one grid you will copy into every marketing page.",
        code: `.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

@media (min-width: 800px) {
  .page {
    grid-template-columns: 240px 1fr;
  }
}`,
      },
      {
        type: "callout",
        kind: "why",
        title: "auto-fit + minmax",
        text: "Each column wants to be at least 220px and may grow. As the screen shrinks, columns drop. No breakpoint required for the common card row. That is the whole trick.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Menu</title>
  </head>
  <body>
    <h1>Evening</h1>
    <section class="features">
      <article>
        <h2>Oyster</h2>
        <p>Hama Hama, mignonette, black pepper.</p>
      </article>
      <article>
        <h2>Beet</h2>
        <p>Smoked, goat cheese, rye crumb.</p>
      </article>
      <article>
        <h2>Duck</h2>
        <p>Roasted, cherry, wilted chicory.</p>
      </article>
    </section>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  padding: 2rem;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}
article {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #ddd6c8;
}

/* .features should be a grid that becomes 3 columns when there is room. */`,
      js: "",
    },
    challenge: {
      brief:
        "Make .features a grid with a gap. Use repeat(auto-fit, minmax(200px, 1fr)) so three cards sit in a row on a wide pane and stack when the preview is narrow. Give article a border-radius.",
      checks: [
        {
          id: "grid",
          label: ".features is a grid",
          hint: "display: grid;",
          run: (ctx) => cssHas(ctx, /\.features\s*\{[^}]*display\s*:\s*grid/s),
        },
        {
          id: "cols",
          label: "Columns use minmax or repeat",
          hint: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
          run: (ctx) =>
            cssHas(ctx, /grid-template-columns\s*:/) &&
            (cssHas(ctx, /minmax/) || cssHas(ctx, /repeat/) || cssHas(ctx, /1fr/)),
        },
        {
          id: "gap",
          label: "A gap between tracks",
          hint: "gap: 24px; on the grid.",
          run: (ctx) => cssHas(ctx, /gap\s*:/),
        },
        {
          id: "radius",
          label: "Cards have a radius",
          hint: "border-radius on article.",
          run: (ctx) => cssHas(ctx, /border-radius\s*:/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Menu</title>
  </head>
  <body>
    <h1>Evening</h1>
    <section class="features">
      <article>
        <h2>Oyster</h2>
        <p>Hama Hama, mignonette, black pepper.</p>
      </article>
      <article>
        <h2>Beet</h2>
        <p>Smoked, goat cheese, rye crumb.</p>
      </article>
      <article>
        <h2>Duck</h2>
        <p>Roasted, cherry, wilted chicory.</p>
      </article>
    </section>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  padding: 2rem;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
article {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #ddd6c8;
  border-radius: 12px;
}
h2 { margin: 0 0 8px; font-size: 1.25rem; }
p { margin: 0; color: #5c5850; }`,
      js: "",
    },
  },
  {
    id: "css-project",
    week: 4,
    order: 12,
    track: "css",
    title: "Project: Harbor",
    subtitle: "A restaurant landing page — header, hero, menu grid, footer",
    minutes: 60,
    youWill: [
      "Compose flex and grid on one page",
      "Set a type and color system",
      "Ship something you could put in a portfolio",
    ],
    youShip: "Harbor — a complete landing page",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "You have the pieces. This week’s ship is a one-page restaurant site. It must look considered at 400px and at 1000px. No JavaScript. If a layout breaks when you drag the preview narrower, fix the grid, do not freeze the width.",
      },
      {
        type: "steps",
        items: [
          { title: "Tokens", text: "Ink, paper, muted on :root. box-sizing on *." },
          { title: "Header", text: "Flex, space-between. Mark + three links." },
          { title: "Hero", text: "A large h1 and a one-sentence pitch. Padding, not height hacks." },
          { title: "Menu", text: "A grid of at least three dishes that wraps." },
          { title: "Footer", text: "Address and hours. Quiet." },
        ],
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Harbor</title>
  </head>
  <body>
    <header class="site-header">
      <p class="mark">Harbor</p>
      <nav>
        <a href="#menu">Menu</a>
        <a href="#hours">Hours</a>
        <a href="#visit">Visit</a>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>Supper on the river.</h1>
        <p class="lead">Fish, fire, and a room that faces west.</p>
      </section>
      <section id="menu" class="features">
        <article>
          <h2>Oyster</h2>
          <p>Hama Hama, mignonette.</p>
        </article>
        <article>
          <h2>Trout</h2>
          <p>Wood fire, brown butter, caper.</p>
        </article>
        <article>
          <h2>Tart</h2>
          <p>Bay leaf custard, last of the plums.</p>
        </article>
      </section>
    </main>
    <footer id="visit">
      <p>12 River Road · Wed–Sun from 5</p>
    </footer>
  </body>
</html>`,
      css: `*, *::before, *::after { box-sizing: border-box; }
/* Tokens, header flex, hero type, menu grid, footer. Make it a site. */`,
      js: "",
    },
    challenge: {
      brief:
        "Finish Harbor. :root tokens, a flex header, a distinct hero, a wrapping menu grid with gap, a styled footer. The page must use both display: flex and display: grid.",
      checks: [
        {
          id: "tokens",
          label: ":root tokens",
          hint: "At least two custom properties.",
          run: (ctx) => cssHas(ctx, /:root\s*\{/) && (ctx.css.match(/--[a-zA-Z-]+\s*:/g) ?? []).length >= 2,
        },
        {
          id: "flex",
          label: "Flex is used",
          hint: "display: flex on the header (or nav).",
          run: (ctx) => cssHas(ctx, /display\s*:\s*flex/),
        },
        {
          id: "grid",
          label: "Grid is used",
          hint: "display: grid on the menu section.",
          run: (ctx) => cssHas(ctx, /display\s*:\s*grid/),
        },
        {
          id: "hero",
          label: "Hero type is large",
          hint: "A font-size of 2rem or more on h1, or a .hero rule.",
          run: (ctx) =>
            cssHas(ctx, /h1\s*\{[^}]*font-size/s) || cssHas(ctx, /\.hero\s*\{[^}]*font-size/s),
        },
        {
          id: "footer",
          label: "Footer is styled",
          hint: "A footer { } rule — padding or border-top is enough.",
          run: (ctx) => cssHas(ctx, /footer\s*\{[^}]+\}/s),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Harbor</title>
  </head>
  <body>
    <header class="site-header">
      <p class="mark">Harbor</p>
      <nav>
        <a href="#menu">Menu</a>
        <a href="#hours">Hours</a>
        <a href="#visit">Visit</a>
      </nav>
    </header>
    <main>
      <section class="hero">
        <h1>Supper on the river.</h1>
        <p class="lead">Fish, fire, and a room that faces west.</p>
      </section>
      <section id="menu" class="features">
        <article>
          <h2>Oyster</h2>
          <p>Hama Hama, mignonette.</p>
        </article>
        <article>
          <h2>Trout</h2>
          <p>Wood fire, brown butter, caper.</p>
        </article>
        <article>
          <h2>Tart</h2>
          <p>Bay leaf custard, last of the plums.</p>
        </article>
      </section>
    </main>
    <footer id="visit">
      <p>12 River Road · Wed–Sun from 5</p>
    </footer>
  </body>
</html>`,
      css: `:root {
  --ink: #1c1b18;
  --paper: #f4f1ea;
  --muted: #5c5850;
  --line: #ddd6c8;
}
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Georgia, serif;
  background: var(--paper);
  color: var(--ink);
}
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--line);
}
.mark { margin: 0; font-style: italic; font-size: 1.35rem; }
nav { display: flex; gap: 24px; }
a { color: inherit; text-decoration: none; }
.hero { padding: 4rem 2rem 3rem; }
h1 { font-size: 3rem; line-height: 1.1; font-weight: 500; margin: 0 0 12px; }
.lead { font-size: 1.2rem; color: var(--muted); margin: 0; }
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 0 2rem 4rem;
}
article {
  padding: 1.5rem;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}
h2 { margin: 0 0 8px; }
article p { margin: 0; color: var(--muted); }
footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
}`,
      js: "",
    },
  },
];
