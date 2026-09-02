import type { Lesson } from "./types";
import { hasAttr, hasTag, htmlHas, textOf } from "./checks";

export const htmlLessons: Lesson[] = [
  {
    id: "html-first-page",
    week: 1,
    order: 1,
    track: "html",
    title: "A page is a document",
    subtitle: "Tags, the skeleton, your first heading",
    minutes: 25,
    youWill: [
      "Read an HTML document from the outside in",
      "Use opening and closing tags",
      "Put a real heading and paragraph on a page",
    ],
    youShip: "A one-screen page with your name on it",
    visual: "tag-anatomy",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "HTML is not a programming language. It is a document format: a nested set of tags that tell the browser what each piece of content is. A heading is not big text. A heading is a heading. That distinction is the whole job.",
      },
      {
        type: "visual",
        id: "tag-anatomy",
      },
      {
        type: "h",
        text: "The four lines every page starts with",
      },
      {
        type: "code",
        lang: "html",
        caption: "The document skeleton. Everything you ever build sits inside body.",
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Page title — the tab name</title>
  </head>
  <body>
    <h1>Visible heading</h1>
  </body>
</html>`,
      },
      {
        type: "list",
        items: [
          "<!DOCTYPE html> tells the browser this is modern HTML, not 1998 leftovers.",
          "<html lang=\"en\"> is the root. lang helps screen readers and translation.",
          "<head> is metadata — title, charset, later CSS. Nothing in head paints on the page.",
          "<body> is everything the visitor sees.",
        ],
      },
      {
        type: "callout",
        kind: "rule",
        title: "Tags wrap meaning",
        text: "Almost every tag has an opener <p> and a closer </p>. The content lives between them. <img> and <meta> are the rare empty tags — they point at something instead of wrapping it.",
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "h1 is not a style",
        text: "There is one h1 per page: the title of this document. Do not pick heading levels because they look the right size. You will control size with CSS in week 3. Today, pick the correct meaning.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, Kiln.</h1>
  </body>
</html>`,
      css: "",
      js: "",
    },
    challenge: {
      brief:
        "This page is still a template. Change the <title> to something that is yours. Replace the heading with your name. Add a <p> under it with one honest sentence about why you are here.",
      checks: [
        {
          id: "title",
          label: "Title is no longer the starter text",
          hint: "The <title> inside <head> is what the browser tab shows. Change the words between the tags.",
          run: (ctx) => {
            const t = ctx.doc.querySelector("title")?.textContent?.trim() ?? "";
            return t.length > 0 && t !== "My first page";
          },
        },
        {
          id: "h1",
          label: "h1 is no longer “Hello, Kiln.”",
          hint: "Replace the heading text with your name or the name of the page.",
          run: (ctx) => textOf(ctx, "h1") !== "Hello, Kiln." && textOf(ctx, "h1").length > 1,
        },
        {
          id: "p",
          label: "A paragraph sits under the heading",
          hint: "Add <p>your sentence</p> inside <body>, after the h1.",
          run: (ctx) => hasTag(ctx, "p") && textOf(ctx, "p").length > 8,
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Maya Chen — apprentice</title>
  </head>
  <body>
    <h1>Maya Chen</h1>
    <p>I am here to stop collecting tutorials and start shipping pages.</p>
  </body>
</html>`,
      css: "",
      js: "",
    },
  },
  {
    id: "html-text",
    week: 1,
    order: 2,
    track: "html",
    title: "Text has a hierarchy",
    subtitle: "Headings, paragraphs, lists, emphasis",
    minutes: 30,
    youWill: [
      "Build a heading outline that a screen reader can walk",
      "Mark lists as lists, not as lines with dashes",
      "Use strong and em for meaning, not decoration",
    ],
    youShip: "A recipe card written in honest HTML",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "The browser already knows how to present text if you tell it what the text is. A list of ingredients that is actually a <ul> can be jumped to, copied, and read aloud. The same words in a single <p> with dashes is just a blob.",
      },
      {
        type: "h",
        text: "The outline",
      },
      {
        type: "list",
        items: [
          "h1 — the document. One.",
          "h2 — major sections of that document.",
          "h3 — subsections of the nearest h2. Do not skip from h1 to h3.",
          "p — a paragraph. Not a heading. Not a div.",
          "ul / ol + li — unordered (bullets) or ordered (steps).",
          "strong — importance. em — spoken emphasis. They are not bold and italic; CSS can make them look like anything.",
        ],
      },
      {
        type: "code",
        lang: "html",
        caption: "A section with a list. Notice the nesting: ul contains only li.",
        code: `<h2>Ingredients</h2>
<ul>
  <li>400g tomatoes</li>
  <li>Olive oil</li>
  <li>Salt</li>
</ul>
<h2>Method</h2>
<ol>
  <li>Score the tomatoes.</li>
  <li>Simmer 40 minutes.</li>
</ol>`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "One idea per tag",
        text: "If you are about to put two headings in one h2, you want two h2s. If a line is a step, it is an li, not a p with a number you typed.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Recipe</title>
  </head>
  <body>
    <h1>Weekend sauce</h1>
    <p>Write this like a real recipe: a short intro, ingredients, then steps.</p>
  </body>
</html>`,
      css: "",
      js: "",
    },
    challenge: {
      brief:
        "Turn this into a recipe. Keep one h1. Add an h2 for Ingredients with a ul of at least four items, and an h2 for Method with an ol of at least three steps. Emphasize one word in the intro with <em> or <strong>.",
      checks: [
        {
          id: "h2s",
          label: "Two section headings",
          hint: "Add two <h2> elements — Ingredients and Method are the usual pair.",
          run: (ctx) => ctx.doc.getElementsByTagName("h2").length >= 2,
        },
        {
          id: "ul",
          label: "An unordered list with four items",
          hint: "<ul> with four or more <li> children.",
          run: (ctx) => {
            const ul = ctx.doc.querySelector("ul");
            return !!ul && ul.querySelectorAll("li").length >= 4;
          },
        },
        {
          id: "ol",
          label: "An ordered list with three steps",
          hint: "<ol> with three or more <li> children.",
          run: (ctx) => {
            const ol = ctx.doc.querySelector("ol");
            return !!ol && ol.querySelectorAll("li").length >= 3;
          },
        },
        {
          id: "em",
          label: "Emphasis or importance used once",
          hint: "Wrap a word in <em> or <strong>.",
          run: (ctx) => hasTag(ctx, "em") || hasTag(ctx, "strong"),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Weekend sauce</title>
  </head>
  <body>
    <h1>Weekend sauce</h1>
    <p>A slow tomato sauce. The secret is <em>time</em>, not a longer ingredient list.</p>
    <h2>Ingredients</h2>
    <ul>
      <li>800g ripe tomatoes</li>
      <li>1 onion</li>
      <li>4 cloves garlic</li>
      <li>Olive oil, salt, a bay leaf</li>
    </ul>
    <h2>Method</h2>
    <ol>
      <li>Sweat the onion in oil until translucent.</li>
      <li>Add garlic, then tomatoes and bay.</li>
      <li>Simmer uncovered for 45 minutes. Salt at the end.</li>
    </ol>
  </body>
</html>`,
      css: "",
      js: "",
    },
  },
  {
    id: "html-links-media",
    week: 1,
    order: 3,
    track: "html",
    title: "Links and images",
    subtitle: "The web is connections plus pictures with names",
    minutes: 30,
    youWill: [
      "Write an anchor that goes somewhere",
      "Give every image an alt that earns its place",
      "Group a picture with its caption",
    ],
    youShip: "A tiny profile with a portrait and three links",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "A link is the <a> tag. The href attribute is the address. The text between the tags is what the visitor reads — write it like a label, not “click here”. An image is the <img> tag. It has no closer. It must have src and alt.",
      },
      {
        type: "code",
        lang: "html",
        code: `<a href="https://example.com">The work</a>
<img
  src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80"
  alt="A person at a wooden workbench, hands on a notebook"
/>
<figure>
  <img src="portrait.jpg" alt="Maya Chen, facing camera" />
  <figcaption>Maya, 2026</figcaption>
</figure>`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "alt is not optional",
        text: "If the image is content, alt describes it. If the image is decorative, alt=\"\" (empty) tells the screen reader to skip it. Never put “image of” in alt — the software already knows it is an image.",
      },
      {
        type: "callout",
        kind: "why",
        title: "Why href looks like a URL",
        text: "Absolute links start with https:// and leave the site. Relative links like ./about.html stay next to this file. For now, use real https URLs so the preview can fetch them.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Profile</title>
  </head>
  <body>
    <h1>Your name</h1>
    <p>Add a portrait and a short nav of three places you exist online.</p>
  </body>
</html>`,
      css: `img { max-width: 280px; height: auto; display: block; }`,
      js: "",
    },
    challenge: {
      brief:
        "Add an <img> with a real src and a descriptive alt. Add a <nav> with three <a> links (portfolio, a reference, a contact mailto: is fine). Wrap the image in <figure> with a <figcaption>.",
      checks: [
        {
          id: "img-alt",
          label: "Image has src and alt",
          hint: "<img src=\"...\" alt=\"describe the picture\">. Alt must not be empty for this portrait.",
          run: (ctx) => hasAttr(ctx, "img", "src", 8) && hasAttr(ctx, "img", "alt", 8),
        },
        {
          id: "nav-links",
          label: "Nav with three links",
          hint: "A <nav> containing at least three <a href> elements.",
          run: (ctx) => {
            const nav = ctx.doc.querySelector("nav");
            return !!nav && nav.querySelectorAll("a[href]").length >= 3;
          },
        },
        {
          id: "figure",
          label: "Figure with a caption",
          hint: "Wrap the image in <figure> and add <figcaption>.",
          run: (ctx) => hasTag(ctx, "figure") && hasTag(ctx, "figcaption"),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Maya Chen</title>
  </head>
  <body>
    <h1>Maya Chen</h1>
    <nav>
      <a href="https://github.com">GitHub</a>
      <a href="https://dribbble.com">Work</a>
      <a href="mailto:maya@example.com">Email</a>
    </nav>
    <figure>
      <img
        src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80"
        alt="Craftsperson at a sunlit wooden workbench with a notebook"
      />
      <figcaption>At the bench, 2026</figcaption>
    </figure>
  </body>
</html>`,
      css: `img { max-width: 280px; height: auto; display: block; }`,
      js: "",
    },
  },
  {
    id: "html-semantic",
    week: 2,
    order: 4,
    track: "html",
    title: "Structure is a map",
    subtitle: "header, nav, main, article, footer — stop using div for everything",
    minutes: 35,
    youWill: [
      "Replace a pile of divs with landmarks",
      "Know when article beats section",
      "Give assistive tech a map of the page",
    ],
    youShip: "A two-section studio page with real landmarks",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "div and span mean nothing. They are boxes for CSS. The tags below mean something to browsers, search engines, and screen readers — they are landmarks a keyboard user can jump between.",
      },
      {
        type: "list",
        items: [
          "header — the banner of the page (or of a section). Logo, title, nav.",
          "nav — a set of navigation links. Not every group of links.",
          "main — the unique content of this page. One per document.",
          "article — a self-contained piece that still makes sense if you syndicated it.",
          "section — a themed grouping with its own heading. Not a generic wrapper.",
          "footer — the end matter: credits, lesser links, legal.",
          "aside — tangential. A pull quote, related links.",
        ],
      },
      {
        type: "code",
        lang: "html",
        caption: "A page you could outline with your eyes closed.",
        code: `<body>
  <header>
    <p>North Studio</p>
    <nav>...</nav>
  </header>
  <main>
    <article>
      <h1>Spring collection</h1>
      <p>...</p>
    </article>
  </main>
  <footer>
    <p>© North Studio</p>
  </footer>
</body>`,
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "section without a heading is a div in a costume",
        text: "If you cannot name the section with an h2, you do not have a section. You have a wrapper. Use a div, or rethink the outline.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>North Studio</title>
  </head>
  <body>
    <div class="top">
      <div>North Studio</div>
      <div>
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </div>
    </div>
    <div class="content">
      <div>
        <h1>We make furniture that lasts a decade, not a season.</h1>
        <p>Commissioned tables, chairs, and shelving. Oak, walnut, linen oil.</p>
      </div>
    </div>
    <div class="bottom">
      <p>Portland · by appointment</p>
    </div>
  </body>
</html>`,
      css: "",
      js: "",
    },
    challenge: {
      brief:
        "This page is div soup. Rebuild it with <header>, <nav>, <main>, <article>, and <footer>. Keep the same words. The h1 should live inside main (inside article is even better).",
      checks: [
        {
          id: "header",
          label: "A header landmark",
          hint: "Replace the top wrapper with <header>.",
          run: (ctx) => hasTag(ctx, "header"),
        },
        {
          id: "nav",
          label: "A nav landmark",
          hint: "Wrap the two links in <nav>.",
          run: (ctx) => hasTag(ctx, "nav"),
        },
        {
          id: "main-article",
          label: "main containing an article",
          hint: "One <main>, and an <article> inside it for the pitch.",
          run: (ctx) => !!ctx.doc.querySelector("main article"),
        },
        {
          id: "footer",
          label: "A footer landmark",
          hint: "Replace the bottom wrapper with <footer>.",
          run: (ctx) => hasTag(ctx, "footer"),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>North Studio</title>
  </head>
  <body>
    <header>
      <p>North Studio</p>
      <nav>
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>We make furniture that lasts a decade, not a season.</h1>
        <p>Commissioned tables, chairs, and shelving. Oak, walnut, linen oil.</p>
      </article>
    </main>
    <footer>
      <p>Portland · by appointment</p>
    </footer>
  </body>
</html>`,
      css: "",
      js: "",
    },
  },
  {
    id: "html-forms",
    week: 2,
    order: 5,
    track: "html",
    title: "Forms collect",
    subtitle: "label, input, name — the contract with the server",
    minutes: 35,
    youWill: [
      "Wire a label to an input the right way",
      "Pick the correct input type",
      "Build a form that could actually submit",
    ],
    youShip: "A contact form with name, email, and a message",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "A form is a machine for collecting named values. Every control needs a name (what the field is called when it is submitted) and a label (what a human reads). Clicking the label must focus the input. That is not a courtesy. It is how phones and screen readers work.",
      },
      {
        type: "code",
        lang: "html",
        caption: "id on the input, for on the label — they must match exactly.",
        code: `<form action="/contact" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="msg">Message</label>
  <textarea id="msg" name="message" rows="5"></textarea>

  <button type="submit">Send</button>
</form>`,
      },
      {
        type: "list",
        items: [
          "type=\"text\" — default. Use a more specific type when you can.",
          "type=\"email\" — mobile shows an @ keyboard. The browser can validate.",
          "type=\"password\", \"number\", \"url\", \"date\" — same idea: tell the truth.",
          "textarea — multi-line. It is not an input with a different type.",
          "button type=\"submit\" — inside a form this sends. type=\"button\" does not.",
        ],
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "Placeholder is not a label",
        text: "Placeholder disappears as soon as someone types. A field with only a placeholder has no name once it is filled. Always a visible <label>.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contact</title>
  </head>
  <body>
    <h1>Write to the studio</h1>
    <p>Build a form. Do not style it yet — make it correct.</p>
  </body>
</html>`,
      css: `label { display: block; margin-top: 12px; }
input, textarea { display: block; width: min(100%, 28rem); }
button { margin-top: 12px; }`,
      js: "",
    },
    challenge: {
      brief:
        "Add a <form> with three labeled fields: full name (text), email (email), message (textarea). Each label’s for must match its input’s id. Name attributes on every control. A submit button.",
      checks: [
        {
          id: "form",
          label: "A form element exists",
          hint: "Wrap the fields in <form>.",
          run: (ctx) => hasTag(ctx, "form"),
        },
        {
          id: "email",
          label: "An email input, labeled",
          hint: "<input type=\"email\" id=\"...\"> and a <label for=\"...\"> with the same id.",
          run: (ctx) => {
            const input = ctx.doc.querySelector("input[type='email'][id]");
            if (!input) return false;
            const id = input.getAttribute("id");
            return !!id && !!ctx.doc.querySelector(`label[for="${id}"]`);
          },
        },
        {
          id: "textarea",
          label: "A labeled textarea",
          hint: "textarea needs id + matching label, and a name.",
          run: (ctx) => {
            const t = ctx.doc.querySelector("textarea[id][name]");
            if (!t) return false;
            const id = t.getAttribute("id");
            return !!id && !!ctx.doc.querySelector(`label[for="${id}"]`);
          },
        },
        {
          id: "submit",
          label: "A submit button",
          hint: "<button type=\"submit\"> or <button> inside the form.",
          run: (ctx) =>
            htmlHas(ctx, /<button/i) &&
            (htmlHas(ctx, /type=["']submit["']/i) || !!ctx.doc.querySelector("form button")),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contact</title>
  </head>
  <body>
    <h1>Write to the studio</h1>
    <form action="/contact" method="post">
      <label for="name">Full name</label>
      <input id="name" name="name" type="text" required />

      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>

      <button type="submit">Send</button>
    </form>
  </body>
</html>`,
      css: `label { display: block; margin-top: 12px; }
input, textarea { display: block; width: min(100%, 28rem); }
button { margin-top: 12px; }`,
      js: "",
    },
  },
  {
    id: "html-project",
    week: 2,
    order: 6,
    track: "html",
    title: "Project: calling card",
    subtitle: "Ship a complete personal page with nothing but HTML",
    minutes: 50,
    youWill: [
      "Combine everything from weeks 1–2",
      "Write a page you would actually send someone",
      "Leave CSS for next week on purpose",
    ],
    youShip: "A semantic personal site: identity, links, work list, contact",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "This is the first thing in your portfolio. It will look like a 1995 document. That is correct. A page with honest structure is easier to dress than a pretty page with no bones. Next week you will skin it. Today you ship meaning.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Header",
            text: "Your name as h1, a one-line role, a nav of in-page links to Work and Contact.",
          },
          {
            title: "Main",
            text: "A short bio in an article. Then a section “Selected work” as a list of three projects — each with a name and one sentence.",
          },
          {
            title: "Contact",
            text: "A form with name, email, message. Real labels.",
          },
          {
            title: "Footer",
            text: "City and year. Nothing cute.",
          },
        ],
      },
      {
        type: "callout",
        kind: "why",
        title: "Why unstyled",
        text: "If you reach for inline style=\"color:blue\" you are hiding a structure problem. Resist. The browser’s default stylesheet is a diagnostic: headings should look like headings because they are headings.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Your name — calling card</title>
  </head>
  <body>
    <!-- header, main, footer. You know the landmarks. -->
  </body>
</html>`,
      css: "",
      js: "",
    },
    challenge: {
      brief:
        "Build the calling card from a blank body. Required: header + nav, main with an h1 and a bio paragraph, a list of at least three pieces of work, a labeled contact form, a footer. Use the landmarks. This is the week-2 ship.",
      checks: [
        {
          id: "landmarks",
          label: "header, nav, main, footer",
          hint: "All four landmarks, once each at least.",
          run: (ctx) =>
            hasTag(ctx, "header") && hasTag(ctx, "nav") && hasTag(ctx, "main") && hasTag(ctx, "footer"),
        },
        {
          id: "h1-bio",
          label: "An h1 and a bio paragraph in main",
          hint: "Put the h1 inside main. Add a <p> with more than a few words.",
          run: (ctx) => !!ctx.doc.querySelector("main h1") && textOf(ctx, "main p").length > 20,
        },
        {
          id: "work-list",
          label: "A work list with three items",
          hint: "A ul or ol with at least three li — project names are enough.",
          run: (ctx) => {
            const lists = Array.from(ctx.doc.querySelectorAll("ul, ol"));
            return lists.some((l) => l.querySelectorAll("li").length >= 3);
          },
        },
        {
          id: "form",
          label: "A labeled form",
          hint: "form, an email input, a textarea, a button.",
          run: (ctx) =>
            hasTag(ctx, "form") &&
            !!ctx.doc.querySelector("input[type='email']") &&
            hasTag(ctx, "textarea") &&
            hasTag(ctx, "button"),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Maya Chen — frontend apprentice</title>
  </head>
  <body>
    <header>
      <p>Maya Chen</p>
      <nav>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>Frontend apprentice. I build pages that mean what they look like.</h1>
        <p>I spent a year watching tutorials. I am spending eight weeks shipping websites instead. HTML first, then CSS, then JavaScript, then React — in that order, on purpose.</p>
      </article>
      <section id="work">
        <h2>Selected work</h2>
        <ul>
          <li><strong>Calling card</strong> — this page. Structure before skin.</li>
          <li><strong>Weekend sauce</strong> — a recipe marked up as lists, not decoration.</li>
          <li><strong>Studio contact</strong> — a form with real labels.</li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <form action="/contact" method="post">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" required />
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required />
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
    <footer>
      <p>Portland · 2026</p>
    </footer>
  </body>
</html>`,
      css: "",
      js: "",
    },
  },
];
