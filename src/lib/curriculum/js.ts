import type { Lesson } from "./types";
import { jsHas } from "./checks";

export const jsLessons: Lesson[] = [
  {
    id: "js-values",
    week: 5,
    order: 13,
    track: "js",
    title: "Values and names",
    subtitle: "const, strings, numbers — the stuff programs move around",
    minutes: 30,
    youWill: [
      "Name values with const and let",
      "Join strings without making a mess",
      "Do arithmetic the page can show",
    ],
    youShip: "A guest check that totals itself",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "JavaScript is the first language in this path that computes. HTML describes. CSS presents. JS decides. Everything it decides is a value: a string, a number, a boolean, later a list or an object. You hang a name on a value with const (it will not be reassigned) or let (it will).",
      },
      {
        type: "code",
        lang: "js",
        caption: "Template strings interpolate. + also concatenates — prefer the template.",
        code: `const covers = 4;
const plate = 28;
const total = covers * plate;
const line = \`Tonight: \${covers} covers, $\${total}\`;`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "const first",
        text: "Default to const. Switch to let only when you will reassign the name. Never var — it is function-scoped and from a previous era.",
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "\"10\" + 2 is \"102\"",
        text: "The + operator concatenates if either side is a string. Numbers you read from the DOM are strings. Use Number(value) or parseInt(value, 10) before you add.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Check</title>
  </head>
  <body>
    <h1>Guest check</h1>
    <p id="line">The total will land here.</p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; color: #1c1b18; }`,
      js: `const covers = 3;
const plate = 32;
// Compute total. Put a sentence into #line with textContent.`,
    },
    challenge: {
      brief:
        "Multiply covers by plate into a const total. Select #line and set its textContent to a sentence that includes both the cover count and the total. Use a template string.",
      checks: [
        {
          id: "const-total",
          label: "A total is computed",
          hint: "const total = covers * plate;",
          run: (ctx) => jsHas(ctx, /total\s*=\s*covers\s*\*\s*plate/) || jsHas(ctx, /covers\s*\*\s*plate/),
        },
        {
          id: "select",
          label: "The paragraph is selected",
          hint: "document.querySelector('#line') or getElementById('line').",
          run: (ctx) =>
            jsHas(ctx, /querySelector\s*\(\s*['\"]#line['\"]\s*\)/) ||
            jsHas(ctx, /getElementById\s*\(\s*['\"]line['\"]\s*\)/),
        },
        {
          id: "text",
          label: "textContent is set with a template",
          hint: "line.textContent = `...${total}...`",
          run: (ctx) => jsHas(ctx, /textContent/) && jsHas(ctx, /`/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Check</title>
  </head>
  <body>
    <h1>Guest check</h1>
    <p id="line">The total will land here.</p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; color: #1c1b18; }`,
      js: `const covers = 3;
const plate = 32;
const total = covers * plate;
const line = document.querySelector("#line");
line.textContent = \`Tonight: \${covers} covers, $\${total}\`;`,
    },
  },
  {
    id: "js-functions",
    week: 5,
    order: 14,
    track: "js",
    title: "Functions and flow",
    subtitle: "Name a process. Branch. Repeat.",
    minutes: 35,
    youWill: [
      "Write a function that returns a value",
      "Branch with if / else",
      "Walk a list with for...of",
    ],
    youShip: "A price formatter and a small bill",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "A function is a named process with inputs (parameters) and an output (return). You call it. It does not run until you do. Conditions (if) and loops (for...of) are how a process notices the world instead of doing the same thing every time.",
      },
      {
        type: "code",
        lang: "js",
        code: `function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function total(lines) {
  let sum = 0;
  for (const line of lines) {
    sum += line;
  }
  return sum;
}

if (total([1200, 800]) > 2000) {
  console.log("service for 6+");
}`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "Return, do not print",
        text: "Functions that compute should return a value. Let the caller decide whether to put it on the page. console.log is a flashlight, not an output port.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Bill</title>
  </head>
  <body>
    <h1>Bill</h1>
    <p id="out"></p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }`,
      js: `const lines = [2400, 1600, 900]; // cents

// 1. formatPrice(cents) → "$24.00"
// 2. sum the array
// 3. Put a formatted total into #out
`,
    },
    challenge: {
      brief:
        "Write formatPrice(cents) that returns a string like $24.00. Write a loop (or reduce) that sums lines. Set #out’s textContent to the formatted total. If the total is over $50, append the word “party”.",
      checks: [
        {
          id: "fn",
          label: "formatPrice is a function",
          hint: "function formatPrice(cents) { ... return ... }",
          run: (ctx) => jsHas(ctx, /function\s+formatPrice/) || jsHas(ctx, /formatPrice\s*=/),
        },
        {
          id: "return",
          label: "It returns a value",
          hint: "Use the return keyword inside formatPrice.",
          run: (ctx) => jsHas(ctx, /return/),
        },
        {
          id: "loop",
          label: "The list is walked or reduced",
          hint: "for...of, a classic for, or lines.reduce.",
          run: (ctx) => jsHas(ctx, /for\s*\(/) || jsHas(ctx, /\.reduce\s*\(/) || jsHas(ctx, /for\s*\(/),
        },
        {
          id: "out",
          label: "#out is written",
          hint: "querySelector('#out') and textContent.",
          run: (ctx) => jsHas(ctx, /#out|getElementById\(['\"]out['\"]\)/) && jsHas(ctx, /textContent/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Bill</title>
  </head>
  <body>
    <h1>Bill</h1>
    <p id="out"></p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }`,
      js: `const lines = [2400, 1600, 900];

function formatPrice(cents) {
  return "$" + (cents / 100).toFixed(2);
}

let sum = 0;
for (const line of lines) {
  sum += line;
}

const out = document.querySelector("#out");
let text = "Total " + formatPrice(sum);
if (sum > 5000) text += " · party";
out.textContent = text;`,
    },
  },
  {
    id: "js-dom",
    week: 5,
    order: 15,
    track: "js",
    title: "The DOM",
    subtitle: "The page is a tree. You can walk it and change it.",
    minutes: 35,
    youWill: [
      "Select nodes with querySelector",
      "Change text, classes, and attributes",
      "Create a node and put it in the tree",
    ],
    youShip: "A heading rewritten from JavaScript, plus a new line",
    visual: "dom-talk",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "The DOM (Document Object Model) is the live tree the browser built from your HTML. document is the root. querySelector finds one node with a CSS selector. textContent, classList, setAttribute, createElement, append are the verbs. You do not edit the HTML file at runtime — you edit this tree.",
      },
      {
        type: "visual",
        id: "dom-talk",
      },
      {
        type: "code",
        lang: "js",
        code: `const h = document.querySelector("h1");
h.textContent = "Open";
h.classList.add("is-open");

const note = document.createElement("p");
note.textContent = "Walk-ins until 9.";
document.querySelector("main").append(note);`,
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "querySelector returns null",
        text: "If the selector misses, you get null, and null.textContent throws. Select, then check, or make sure the element exists in the HTML before the script runs (script at the end of body, which Kiln already does).",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Board</title>
  </head>
  <body>
    <main>
      <p class="kicker">Harbor</p>
      <h1>Closed</h1>
    </main>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #1c1b18; color: #f4f1ea; }
.is-open { color: #c5cec4; }`,
      js: `// 1. Change the h1 text to Open
// 2. Add class is-open to the h1
// 3. Create a <p> and append it to main
`,
    },
    challenge: {
      brief:
        "Select the h1, set textContent to Open, add the class is-open. Create a paragraph with createElement, give it text, append it to main.",
      checks: [
        {
          id: "h1-text",
          label: "h1 textContent is set",
          hint: "document.querySelector('h1').textContent = 'Open'",
          run: (ctx) => jsHas(ctx, /textContent\s*=/) && jsHas(ctx, /h1/),
        },
        {
          id: "class",
          label: "classList.add is used",
          hint: "h.classList.add('is-open')",
          run: (ctx) => jsHas(ctx, /classList\.add/),
        },
        {
          id: "create",
          label: "A node is created",
          hint: "document.createElement('p')",
          run: (ctx) => jsHas(ctx, /createElement\s*\(/),
        },
        {
          id: "append",
          label: "It is appended",
          hint: "main.append(note) or appendChild.",
          run: (ctx) => jsHas(ctx, /\.append\s*\(/) || jsHas(ctx, /appendChild\s*\(/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Board</title>
  </head>
  <body>
    <main>
      <p class="kicker">Harbor</p>
      <h1>Closed</h1>
    </main>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #1c1b18; color: #f4f1ea; }
.is-open { color: #c5cec4; }`,
      js: `const h = document.querySelector("h1");
h.textContent = "Open";
h.classList.add("is-open");

const note = document.createElement("p");
note.textContent = "Walk-ins until 9.";
document.querySelector("main").append(note);`,
    },
  },
  {
    id: "js-events",
    week: 6,
    order: 16,
    track: "js",
    title: "Events",
    subtitle: "The page waits. A click is a message.",
    minutes: 35,
    youWill: [
      "Listen for click and input",
      "Read a field’s value",
      "preventDefault on a form so the page does not reload",
    ],
    youShip: "A toggle and a field that echoes",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "The browser fires events: click, input, submit, keydown. addEventListener registers a function for a type. The function receives an event object — e.target is the node that was used, e.preventDefault() stops the browser’s default (a form’s default is to navigate).",
      },
      {
        type: "code",
        lang: "js",
        code: `button.addEventListener("click", () => {
  panel.classList.toggle("is-open");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  output.textContent = name;
});`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "Listen, don’t onclick=",
        text: "HTML onclick=\"...\" mixes languages and does not scale to a second listener. addEventListener keeps the HTML about meaning and the script about behavior.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Door</title>
  </head>
  <body>
    <button type="button" id="toggle">Toggle the room</button>
    <div id="room" class="room">The private room is closed.</div>
    <form id="form">
      <label for="guest">Guest name</label>
      <input id="guest" name="guest" />
      <button type="submit">Seat</button>
    </form>
    <p id="ticket">No one seated.</p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }
.room { margin: 1rem 0; padding: 1rem; border: 1px solid #ddd6c8; }
.room.is-open { background: #1c1b18; color: #f4f1ea; }
label, input, button { display: block; margin-top: 8px; }`,
      js: `// Toggle #room's is-open class on #toggle click.
// On form submit: preventDefault, copy #guest value into #ticket.
`,
    },
    challenge: {
      brief:
        "Clicking the toggle must classList.toggle('is-open') on #room. Submitting the form must preventDefault and put the guest’s name into #ticket.",
      checks: [
        {
          id: "listen",
          label: "addEventListener is used",
          hint: "At least one addEventListener call.",
          run: (ctx) => jsHas(ctx, /addEventListener\s*\(/),
        },
        {
          id: "toggle",
          label: "classList.toggle for the room",
          hint: "room.classList.toggle('is-open')",
          run: (ctx) => jsHas(ctx, /classList\.toggle/),
        },
        {
          id: "prevent",
          label: "submit is cancelled",
          hint: "e.preventDefault() inside the submit handler.",
          run: (ctx) => jsHas(ctx, /preventDefault\s*\(/),
        },
        {
          id: "value",
          label: "The input value is read",
          hint: "guest.value (or input.value).",
          run: (ctx) => jsHas(ctx, /\.value/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Door</title>
  </head>
  <body>
    <button type="button" id="toggle">Toggle the room</button>
    <div id="room" class="room">The private room is closed.</div>
    <form id="form">
      <label for="guest">Guest name</label>
      <input id="guest" name="guest" />
      <button type="submit">Seat</button>
    </form>
    <p id="ticket">No one seated.</p>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }
.room { margin: 1rem 0; padding: 1rem; border: 1px solid #ddd6c8; }
.room.is-open { background: #1c1b18; color: #f4f1ea; }
label, input, button { display: block; margin-top: 8px; }`,
      js: `const toggle = document.querySelector("#toggle");
const room = document.querySelector("#room");
toggle.addEventListener("click", () => {
  room.classList.toggle("is-open");
  room.textContent = room.classList.contains("is-open")
    ? "The private room is open."
    : "The private room is closed.";
});

const form = document.querySelector("#form");
const guest = document.querySelector("#guest");
const ticket = document.querySelector("#ticket");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = guest.value.trim();
  ticket.textContent = name ? \`Seated: \${name}\` : "No one seated.";
});`,
    },
  },
  {
    id: "js-data",
    week: 6,
    order: 17,
    track: "js",
    title: "Lists, objects, render",
    subtitle: "Data lives in arrays. The DOM is just a view of it.",
    minutes: 40,
    youWill: [
      "Model a list of records as objects in an array",
      "Render with map and innerHTML or createElement",
      "Treat the array as the source of truth",
    ],
    youShip: "A menu rendered from data, not from typed HTML",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "Once a list can change, you stop writing it in HTML. You keep an array of objects. A render function clears a container and writes the array out. Every click that changes data calls render() again. This idea — UI is a function of state — is the entire reason React exists. You learn it in vanilla JS first so React is not magic.",
      },
      {
        type: "code",
        lang: "js",
        code: `const dishes = [
  { name: "Oyster", note: "Hama Hama" },
  { name: "Trout", note: "Wood fire" },
];

function render() {
  list.innerHTML = dishes
    .map((d) => \`<li><strong>\${d.name}</strong> — \${d.note}</li>\`)
    .join("");
}`,
      },
      {
        type: "callout",
        kind: "why",
        title: "Source of truth",
        text: "If you append a DOM node and also push to the array, you now have two lists that can disagree. Change the array. Render from it. One list.",
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Menu data</title>
  </head>
  <body>
    <h1>Card</h1>
    <ul id="list"></ul>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }
li { margin: 0.5rem 0; }`,
      js: `const dishes = [
  { name: "Oyster", note: "Hama Hama" },
  { name: "Trout", note: "Wood fire" },
  { name: "Tart", note: "Bay leaf custard" },
];

const list = document.querySelector("#list");

function render() {
  // put dishes into #list
}

render();
`,
    },
    challenge: {
      brief:
        "Fill in render() so #list shows every dish. Use map (or a loop) over the dishes array. Each item should include the name. Add a fourth object to the array and see it appear — do not add an <li> in the HTML.",
      checks: [
        {
          id: "fourth",
          label: "A fourth dish in the array",
          hint: "Push another { name, note } into dishes.",
          run: (ctx) => (ctx.js.match(/name\s*:/g) ?? []).length >= 4,
        },
        {
          id: "map-or-loop",
          label: "The array is iterated",
          hint: "dishes.map or for...of dishes.",
          run: (ctx) => jsHas(ctx, /dishes\.map/) || jsHas(ctx, /for\s*\(.*dishes/) || jsHas(ctx, /for\s*\(\s*const/),
        },
        {
          id: "write",
          label: "The list is written",
          hint: "list.innerHTML = ... or append inside the loop.",
          run: (ctx) => jsHas(ctx, /innerHTML/) || jsHas(ctx, /append/) || jsHas(ctx, /insertAdjacentHTML/),
        },
        {
          id: "render-call",
          label: "render() is called",
          hint: "Call render() after you define it.",
          run: (ctx) => jsHas(ctx, /render\s*\(\s*\)/),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Menu data</title>
  </head>
  <body>
    <h1>Card</h1>
    <ul id="list"></ul>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; }
li { margin: 0.5rem 0; }`,
      js: `const dishes = [
  { name: "Oyster", note: "Hama Hama" },
  { name: "Trout", note: "Wood fire" },
  { name: "Tart", note: "Bay leaf custard" },
  { name: "Chicory", note: "Warm, lemon, oil" },
];

const list = document.querySelector("#list");

function render() {
  list.innerHTML = dishes
    .map((d) => \`<li><strong>\${d.name}</strong> — \${d.note}</li>\`)
    .join("");
}

render();`,
    },
  },
  {
    id: "js-project",
    week: 6,
    order: 18,
    track: "js",
    title: "Project: ticket board",
    subtitle: "Add, toggle, delete — a small app with state in an array",
    minutes: 60,
    youWill: [
      "Keep tickets in an array of objects",
      "Render after every change",
      "Wire a form, a toggle, and a delete without fighting the DOM",
    ],
    youShip: "A working ticket board you could use on a shift",
    mode: "web",
    blocks: [
      {
        type: "p",
        text: "This is a real app in miniature. State: an array of { id, title, done }. View: render() writes the list. Events: submit pushes, a button flips done, a button filters the item out. If you can build this, you can build most of what the DOM is for.",
      },
      {
        type: "steps",
        items: [
          { title: "State", text: "let tickets = []. Give each ticket a unique id (Date.now() is fine here)." },
          { title: "render", text: "Wipe #list. For each ticket, an <li> with the title, a Done button, a Remove button. Done tickets get a class." },
          { title: "submit", text: "preventDefault. Push. Clear the input. render()." },
          { title: "buttons", text: "Listen on the list (event delegation) or bind per item inside render." },
        ],
      },
    ],
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Tickets</title>
  </head>
  <body>
    <h1>Tickets</h1>
    <form id="form">
      <label for="title">New ticket</label>
      <input id="title" name="title" required />
      <button type="submit">Add</button>
    </form>
    <ul id="list"></ul>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; color: #1c1b18; }
form { display: flex; gap: 8px; align-items: end; margin: 1rem 0 2rem; }
label { display: block; }
li { display: flex; gap: 8px; align-items: center; margin: 0.4rem 0; }
li.done span { text-decoration: line-through; color: #5c5850; }
button { font: inherit; }`,
      js: `const form = document.querySelector("#form");
const input = document.querySelector("#title");
const list = document.querySelector("#list");

let tickets = [
  { id: 1, title: "Polish the glasses", done: false },
];

function render() {
  // draw tickets
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // push, clear, render
});

render();
`,
    },
    challenge: {
      brief:
        "Finish the board. render() paints the array. Submit adds a ticket. Each item can be marked done and removed. Tickets must live in the array — not as orphan DOM nodes.",
      checks: [
        {
          id: "array",
          label: "tickets is an array you push to",
          hint: "tickets.push({ id, title, done: false })",
          run: (ctx) => jsHas(ctx, /tickets\.push/) || jsHas(ctx, /tickets\s*=\s*\[[\s\S]*\{/),
        },
        {
          id: "render-html",
          label: "render writes the list",
          hint: "innerHTML or createElement inside render.",
          run: (ctx) =>
            jsHas(ctx, /function\s+render/) &&
            (jsHas(ctx, /innerHTML/) || jsHas(ctx, /createElement/)),
        },
        {
          id: "submit",
          label: "submit adds a ticket",
          hint: "preventDefault, read the input, push, render.",
          run: (ctx) => jsHas(ctx, /preventDefault/) && jsHas(ctx, /addEventListener/),
        },
        {
          id: "done-or-remove",
          label: "A ticket can be completed or removed",
          hint: "Flip done or filter the array on a click.",
          run: (ctx) =>
            jsHas(ctx, /done/) && (jsHas(ctx, /\.filter\s*\(/) || jsHas(ctx, /done\s*=\s*!/ ) || jsHas(ctx, /!t\.done/) || jsHas(ctx, /!ticket\.done/) || jsHas(ctx, /\.done/)),
        },
      ],
    },
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Tickets</title>
  </head>
  <body>
    <h1>Tickets</h1>
    <form id="form">
      <label for="title">New ticket</label>
      <input id="title" name="title" required />
      <button type="submit">Add</button>
    </form>
    <ul id="list"></ul>
  </body>
</html>`,
      css: `body { font-family: Georgia, serif; margin: 2rem; background: #f4f1ea; color: #1c1b18; }
form { display: flex; gap: 8px; align-items: end; margin: 1rem 0 2rem; }
label { display: block; }
li { display: flex; gap: 8px; align-items: center; margin: 0.4rem 0; }
li.done span { text-decoration: line-through; color: #5c5850; }
button { font: inherit; }`,
      js: `const form = document.querySelector("#form");
const input = document.querySelector("#title");
const list = document.querySelector("#list");

let tickets = [{ id: 1, title: "Polish the glasses", done: false }];

function render() {
  list.innerHTML = tickets
    .map(
      (t) => \`<li class="\${t.done ? "done" : ""}" data-id="\${t.id}">
        <span>\${t.title}</span>
        <button type="button" data-act="toggle">Done</button>
        <button type="button" data-act="remove">Remove</button>
      </li>\`,
    )
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tickets.push({ id: Date.now(), title, done: false });
  input.value = "";
  render();
});

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const id = Number(btn.closest("li").dataset.id);
  const act = btn.dataset.act;
  if (act === "toggle") {
    tickets = tickets.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }
  if (act === "remove") {
    tickets = tickets.filter((t) => t.id !== id);
  }
  render();
});

render();`,
    },
  },
];
