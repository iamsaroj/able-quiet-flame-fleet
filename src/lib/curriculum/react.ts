import type { Lesson } from "./types";
import { jsHas } from "./checks";

function srcHas(ctx: { html: string; js: string }, re: RegExp): boolean {
  return re.test(ctx.html) || re.test(ctx.js);
}

export const reactLessons: Lesson[] = [
  {
    id: "react-why",
    week: 7,
    order: 19,
    track: "react",
    title: "UI is a function of state",
    subtitle: "Components replace document.querySelector as the way you think",
    minutes: 35,
    youWill: [
      "See a page as a tree of functions that return markup",
      "Stop mutating the DOM by hand",
      "Write your first function component",
    ],
    youShip: "A page split into Header, Main, Footer components",
    visual: "component-tree",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "In the ticket board you called render() yourself after every change. React’s job is to call the equivalent of render() for you whenever state changes, and to update only what needs updating. The unit of UI is a function: it receives data (props), it returns a description of the screen (JSX). You do not appendChild. You return a tree.",
      },
      {
        type: "visual",
        id: "component-tree",
      },
      {
        type: "code",
        lang: "jsx",
        caption: "A component is a function whose name is Capitalized. It must return one tree.",
        code: `function Header() {
  return (
    <header>
      <p>Harbor</p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>Supper on the river.</main>
    </div>
  );
}`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "App is the root",
        text: "Kiln looks for a function named App and mounts it. Return JSX from App. Child components are just functions you call with <Name />.",
      },
      {
        type: "callout",
        kind: "why",
        title: "Why not innerHTML",
        text: "innerHTML is a string. A component tree is data: React can diff it, reuse nodes, and keep input focus. The ticket board already wanted this. React makes it the default.",
      },
    ],
    files: {
      html: `function Header() {
  return (
    <header>
      <p className="mark">Harbor</p>
    </header>
  );
}

function App() {
  return (
    <div className="page">
      <Header />
      {/* Add a Main and a Footer, then render them here. */}
    </div>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
.page { min-height: 100vh; display: flex; flex-direction: column; }
header, footer { padding: 1rem 2rem; }
header { border-bottom: 1px solid #ddd6c8; }
footer { border-top: 1px solid #ddd6c8; color: #5c5850; margin-top: auto; }
main { padding: 3rem 2rem; }
.mark { font-style: italic; margin: 0; }
h1 { font-weight: 500; }`,
      js: "",
    },
    challenge: {
      brief:
        "Write function Main() and function Footer(). Main should return <main> with an h1. Footer should return <footer> with a line of address. Render both inside App next to Header.",
      checks: [
        {
          id: "main-fn",
          label: "A Main component",
          hint: "function Main() { return (<main>...</main>); }",
          run: (ctx) => srcHas(ctx, /function\s+Main\s*\(/),
        },
        {
          id: "footer-fn",
          label: "A Footer component",
          hint: "function Footer() { return (<footer>...</footer>); }",
          run: (ctx) => srcHas(ctx, /function\s+Footer\s*\(/),
        },
        {
          id: "used",
          label: "Both are used in App",
          hint: "Put <Main /> and <Footer /> inside App’s return.",
          run: (ctx) => srcHas(ctx, /<Main\s*\/>/) && srcHas(ctx, /<Footer\s*\/>/),
        },
        {
          id: "h1",
          label: "An h1 exists in the tree",
          hint: "Return an <h1> from Main.",
          run: (ctx) => srcHas(ctx, /<h1[\s>]/),
        },
      ],
    },
    solution: {
      html: `function Header() {
  return (
    <header>
      <p className="mark">Harbor</p>
    </header>
  );
}

function Main() {
  return (
    <main>
      <h1>Supper on the river.</h1>
      <p>Fish, fire, and a room that faces west.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p>12 River Road · Wed–Sun from 5</p>
    </footer>
  );
}

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
.page { min-height: 100vh; display: flex; flex-direction: column; }
header, footer { padding: 1rem 2rem; }
header { border-bottom: 1px solid #ddd6c8; }
footer { border-top: 1px solid #ddd6c8; color: #5c5850; margin-top: auto; }
main { padding: 3rem 2rem; }
.mark { font-style: italic; margin: 0; }
h1 { font-weight: 500; }`,
      js: "",
    },
  },
  {
    id: "react-jsx-props",
    week: 7,
    order: 20,
    track: "react",
    title: "JSX and props",
    subtitle: "Markup in JavaScript. Data in, tree out.",
    minutes: 35,
    youWill: [
      "Pass data into a component with props",
      "Interpolate with curly braces",
      "Use className, not class",
    ],
    youShip: "A Dish card you can reuse three times",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "JSX looks like HTML and compiles to function calls. Attributes become props — a single object argument. class is a reserved word in JavaScript, so the DOM class is className. style is an object, not a string. Children sit between the tags and arrive as props.children.",
      },
      {
        type: "code",
        lang: "jsx",
        code: `function Dish({ name, note }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{note}</p>
    </article>
  );
}

<Dish name="Oyster" note="Hama Hama" />`,
      },
      {
        type: "list",
        items: [
          "{name} interpolates a value into the tree.",
          "props are read-only. A component never assigns to them.",
          "Boolean props: <Button primary /> means primary={true}.",
          "Anything between the tags is children.",
        ],
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "class vs className",
        text: "If a style does not apply, you probably wrote class. In Kiln’s runtime, className is the one that becomes class on the node.",
      },
    ],
    files: {
      html: `function Dish(props) {
  return (
    <article className="card">
      {/* use props.name and props.note — or destructure */}
    </article>
  );
}

function App() {
  return (
    <section className="grid">
      <Dish name="Oyster" note="Hama Hama" />
      {/* two more */}
    </section>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 2rem;
}
.card {
  padding: 1.25rem;
  border: 1px solid #ddd6c8;
  border-radius: 12px;
  background: #fff;
}
h2 { margin: 0 0 8px; font-size: 1.2rem; }
p { margin: 0; color: #5c5850; }`,
      js: "",
    },
    challenge: {
      brief:
        "Render name and note inside Dish. Use the component three times with different props. Destructure { name, note } if you want — either style is correct.",
      checks: [
        {
          id: "interpolate",
          label: "Props are interpolated",
          hint: "Put {name} or {props.name} in the JSX.",
          run: (ctx) => srcHas(ctx, /\{name\}|\{props\.name\}/) && srcHas(ctx, /\{note\}|\{props\.note\}/),
        },
        {
          id: "three",
          label: "Dish is used three times",
          hint: "Three <Dish ... /> elements in App.",
          run: (ctx) => (ctx.html.match(/<Dish\b/g) ?? []).length >= 3,
        },
        {
          id: "classname",
          label: "className, not class, on the card",
          hint: "className=\"card\" — already on the starter; keep it.",
          run: (ctx) => srcHas(ctx, /className/),
        },
      ],
    },
    solution: {
      html: `function Dish({ name, note }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p>{note}</p>
    </article>
  );
}

function App() {
  return (
    <section className="grid">
      <Dish name="Oyster" note="Hama Hama" />
      <Dish name="Trout" note="Wood fire" />
      <Dish name="Tart" note="Bay leaf custard" />
    </section>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 2rem;
}
.card {
  padding: 1.25rem;
  border: 1px solid #ddd6c8;
  border-radius: 12px;
  background: #fff;
}
h2 { margin: 0 0 8px; font-size: 1.2rem; }
p { margin: 0; color: #5c5850; }`,
      js: "",
    },
  },
  {
    id: "react-state",
    week: 7,
    order: 21,
    track: "react",
    title: "State",
    subtitle: "useState is the reason the screen can change",
    minutes: 40,
    youWill: [
      "Hold a value that survives a render",
      "Update it with the setter, never by mutation",
      "Let the component re-render itself",
    ],
    youShip: "A covers counter and a room toggle",
    visual: "state-loop",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "Props come from the parent. State belongs to the component. useState(initial) returns a pair: the current value, and a setter. Calling the setter queues a re-render. You never write count = count + 1. You never write state.flag = true. You pass the next value to the setter.",
      },
      {
        type: "visual",
        id: "state-loop",
      },
      {
        type: "code",
        lang: "jsx",
        code: `function Counter() {
  const [covers, setCovers] = useState(2);
  return (
    <div>
      <p>{covers} covers</p>
      <button onClick={() => setCovers(covers + 1)}>Add</button>
    </div>
  );
}`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "The setter is a request",
        text: "setCovers(3) does not change covers on the next line. It asks React to render again with 3. If you need the previous value, pass a function: setCovers((c) => c + 1).",
      },
    ],
    files: {
      html: `function App() {
  // covers starts at 2
  // open starts at false
  return (
    <main>
      <h1>The room</h1>
      <p>Covers: {/* covers */}</p>
      <button>Add cover</button>
      <button>Toggle open</button>
      <p>{/* Open or Closed */}</p>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #1c1b18; color: #f4f1ea; }
main { padding: 2rem; }
button { font: inherit; margin-right: 8px; margin-top: 8px; padding: 8px 12px; }
h1 { font-weight: 500; }`,
      js: "",
    },
    challenge: {
      brief:
        "useState for covers (number) and open (boolean). Add cover increments. Toggle open flips the boolean. The paragraph must read Open or Closed from state — not from a string you typed once.",
      checks: [
        {
          id: "usestate",
          label: "useState is called",
          hint: "const [covers, setCovers] = useState(2)",
          run: (ctx) => srcHas(ctx, /useState\s*\(/),
        },
        {
          id: "onclick",
          label: "onClick handlers",
          hint: "onClick={() => setCovers(covers + 1)}",
          run: (ctx) => srcHas(ctx, /onClick\s*=/),
        },
        {
          id: "covers",
          label: "covers is rendered",
          hint: "Put {covers} in the JSX.",
          run: (ctx) => srcHas(ctx, /\{covers\}/),
        },
        {
          id: "toggle",
          label: "A boolean is flipped",
          hint: "setOpen(!open) or setOpen((v) => !v)",
          run: (ctx) => srcHas(ctx, /set[A-Za-z]+\(\s*!/) || srcHas(ctx, /=>\s*!/),
        },
      ],
    },
    solution: {
      html: `function App() {
  const [covers, setCovers] = useState(2);
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1>The room</h1>
      <p>Covers: {covers}</p>
      <button onClick={() => setCovers(covers + 1)}>Add cover</button>
      <button onClick={() => setOpen(!open)}>Toggle open</button>
      <p>{open ? "Open" : "Closed"}</p>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #1c1b18; color: #f4f1ea; }
main { padding: 2rem; }
button { font: inherit; margin-right: 8px; margin-top: 8px; padding: 8px 12px; }
h1 { font-weight: 500; }`,
      js: "",
    },
  },
  {
    id: "react-lists",
    week: 8,
    order: 22,
    track: "react",
    title: "Lists and forms",
    subtitle: "map with keys. Controlled inputs. This is the ticket board, in React.",
    minutes: 45,
    youWill: [
      "Render arrays with map and a stable key",
      "Make an input controlled — value plus onChange",
      "Add to a list immutably",
    ],
    youShip: "A guest list you can add to",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "Lists: guests.map((g) => <li key={g.id}>{g.name}</li>). The key tells React which item is which when the list changes. Use the data’s id, never the index if the list can reorder. Forms: the input’s value is state, onChange updates that state. That is a controlled input. Submit reads state, then setGuests([...guests, next]).",
      },
      {
        type: "code",
        lang: "jsx",
        code: `const [name, setName] = useState("");
const [guests, setGuests] = useState([]);

function onSubmit(e) {
  e.preventDefault();
  setGuests([...guests, { id: Date.now(), name }]);
  setName("");
}

<input value={name} onChange={(e) => setName(e.target.value)} />`,
      },
      {
        type: "callout",
        kind: "rule",
        title: "Immutable updates",
        text: "Spread to add ([...list, item]). filter to remove. map to change one item. Never guests.push in React — push mutates, and React will not see it.",
      },
    ],
    files: {
      html: `function App() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState([
    { id: 1, name: "Ada" },
  ]);

  function onSubmit(e) {
    e.preventDefault();
    // add, then clear name
  }

  return (
    <main>
      <h1>Bookings</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Guest</label>
        <input id="name" />
        <button type="submit">Seat</button>
      </form>
      <ul>
        {/* map guests */}
      </ul>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
main { padding: 2rem; max-width: 28rem; }
form { display: flex; gap: 8px; align-items: end; margin: 1rem 0; }
label { display: block; }
input, button { font: inherit; padding: 8px; }
li { margin: 0.4rem 0; }`,
      js: "",
    },
    challenge: {
      brief:
        "Control the input (value={name} onChange). On submit, add a guest immutably and clear the field. Render the list with map and key={g.id}.",
      checks: [
        {
          id: "controlled",
          label: "Input is controlled",
          hint: "value={name} and onChange={(e) => setName(e.target.value)}",
          run: (ctx) => srcHas(ctx, /value=\{name\}/) && srcHas(ctx, /onChange/),
        },
        {
          id: "map",
          label: "guests.map with a key",
          hint: "guests.map((g) => <li key={g.id}>...",
          run: (ctx) => srcHas(ctx, /guests\.map/) && srcHas(ctx, /key=\{/),
        },
        {
          id: "spread",
          label: "An immutable add",
          hint: "setGuests([...guests, { id: Date.now(), name }])",
          run: (ctx) => srcHas(ctx, /\.\.\.guests/) || srcHas(ctx, /concat\s*\(/),
        },
        {
          id: "prevent",
          label: "Form does not reload",
          hint: "e.preventDefault() in onSubmit — already started for you.",
          run: (ctx) => srcHas(ctx, /preventDefault/),
        },
      ],
    },
    solution: {
      html: `function App() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState([{ id: 1, name: "Ada" }]);

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setGuests([...guests, { id: Date.now(), name: trimmed }]);
    setName("");
  }

  return (
    <main>
      <h1>Bookings</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Guest</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Seat</button>
      </form>
      <ul>
        {guests.map((g) => (
          <li key={g.id}>{g.name}</li>
        ))}
      </ul>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #f4f1ea; color: #1c1b18; }
main { padding: 2rem; max-width: 28rem; }
form { display: flex; gap: 8px; align-items: end; margin: 1rem 0; }
label { display: block; }
input, button { font: inherit; padding: 8px; }
li { margin: 0.4rem 0; }`,
      js: "",
    },
  },
  {
    id: "react-effects",
    week: 8,
    order: 23,
    track: "react",
    title: "Effects",
    subtitle: "After paint — load data, sync the outside world",
    minutes: 40,
    youWill: [
      "Run code after a render with useEffect",
      "Depend on the right values",
      "Load a list when the component mounts",
    ],
    youShip: "A board that fills itself on first paint",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "Rendering must be pure: given props and state, return the same tree. Talking to the outside world — fetch, timers, document.title — happens after paint, in useEffect. The function runs after the screen updates. The dependency array says when to run it again. [] means once, after mount.",
      },
      {
        type: "code",
        lang: "jsx",
        code: `const [rows, setRows] = useState([]);
const [status, setStatus] = useState("loading");

useEffect(() => {
  const data = [
    { id: 1, title: "Fire the kiln" },
    { id: 2, title: "Proof the loaves" },
  ];
  setRows(data);
  setStatus("ready");
}, []);`,
      },
      {
        type: "callout",
        kind: "pitfall",
        title: "Do not fetch in the component body",
        text: "A fetch in the function body runs every render, which can loop. Effects are the door to the world. (In later React you will meet loaders and queries. The rule stays: keep render pure.)",
      },
    ],
    files: {
      html: `const SEED = [
  { id: 1, title: "Fire the kiln" },
  { id: 2, title: "Proof the loaves" },
  { id: 3, title: "Set the pass" },
];

function App() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading");

  // Load SEED into rows after mount. Then set status to ready.

  return (
    <main>
      <h1>Pass</h1>
      <p>{status}</p>
      <ul>
        {rows.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #1c1b18; color: #f4f1ea; }
main { padding: 2rem; }
p { color: #c5cec4; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.75rem; }`,
      js: "",
    },
    challenge: {
      brief:
        "useEffect with an empty dependency array. Inside, setRows(SEED) and setStatus('ready'). The list should appear after the first paint, not from the initial state.",
      checks: [
        {
          id: "effect",
          label: "useEffect is called",
          hint: "useEffect(() => { ... }, [])",
          run: (ctx) => srcHas(ctx, /useEffect\s*\(/),
        },
        {
          id: "deps",
          label: "Empty dependency array",
          hint: "The second argument is [] so it runs once.",
          run: (ctx) => srcHas(ctx, /useEffect\s*\([\s\S]*?,\s*\[\s*\]\s*\)/),
        },
        {
          id: "setrows",
          label: "setRows is used in the effect",
          hint: "setRows(SEED) inside the effect.",
          run: (ctx) => srcHas(ctx, /setRows\s*\(/),
        },
        {
          id: "ready",
          label: "status becomes ready",
          hint: "setStatus('ready')",
          run: (ctx) => srcHas(ctx, /setStatus\s*\(\s*['\"]ready['\"]\s*\)/),
        },
      ],
    },
    solution: {
      html: `const SEED = [
  { id: 1, title: "Fire the kiln" },
  { id: 2, title: "Proof the loaves" },
  { id: 3, title: "Set the pass" },
];

function App() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setRows(SEED);
    setStatus("ready");
  }, []);

  return (
    <main>
      <h1>Pass</h1>
      <p>{status}</p>
      <ul>
        {rows.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </main>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #1c1b18; color: #f4f1ea; }
main { padding: 2rem; }
p { color: #c5cec4; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.75rem; }`,
      js: "",
    },
  },
  {
    id: "react-project",
    week: 8,
    order: 24,
    track: "react",
    title: "Project: studio board",
    subtitle: "The last ship — a small React app with list, filter, and form",
    minutes: 70,
    youWill: [
      "Compose components, props, state, lists, and an effect",
      "Filter a list without mutating it",
      "Leave Kiln with a React app in your portfolio",
    ],
    youShip: "Studio board — tickets, filter, add",
    mode: "react",
    blocks: [
      {
        type: "p",
        text: "This is the same ticket board you built in JavaScript, rewritten as a frontend developer would write it. State holds the tickets and the filter. An effect can seed the list. A form adds. Buttons toggle and remove. Filter is a derived value: tickets.filter(...), computed during render, never stored twice.",
      },
      {
        type: "steps",
        items: [
          { title: "State", text: "tickets, draft (the input), filter ('all' | 'open' | 'done')." },
          { title: "Derived", text: "const visible = tickets.filter(...) based on filter." },
          { title: "Seed", text: "useEffect once to load two starter tickets if you want them." },
          { title: "UI", text: "Title, three filter buttons, form, list with Done and Remove." },
        ],
      },
      {
        type: "callout",
        kind: "why",
        title: "You are a frontend developer",
        text: "Not because you finished a playlist. Because you can take a blank file and ship a page, a layout, a DOM app, and a React app — and you know which tool is which. That is the job.",
      },
    ],
    files: {
      html: `function App() {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Glaze the tiles", done: false },
    { id: 2, title: "Call the mill", done: true },
  ]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = tickets;

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="shell">
      <header>
        <p className="mark">Studio</p>
        <h1>Board</h1>
      </header>
      <div className="filters">
        <button type="button">All</button>
        <button type="button">Open</button>
        <button type="button">Done</button>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="draft">Ticket</label>
        <input id="draft" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {visible.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <span>{t.title}</span>
            <button type="button">Done</button>
            <button type="button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #111210; color: #e9e6de; }
.shell { max-width: 32rem; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
.mark { font-style: italic; margin: 0; color: #c5cec4; }
h1 { font-weight: 500; margin: 0 0 1.5rem; }
.filters { display: flex; gap: 8px; margin-bottom: 1.25rem; }
form { display: flex; gap: 8px; align-items: end; margin-bottom: 1.5rem; }
label { display: block; font-size: 0.8rem; color: #9c9a92; }
input, button { font: inherit; padding: 8px 10px; }
input { flex: 1; background: #1b1d1b; color: inherit; border: 1px solid #2a2c2a; }
button { background: #c5cec4; color: #111210; border: 0; }
li {
  display: flex; gap: 8px; align-items: center;
  padding: 8px 0; border-bottom: 1px solid #2a2c2a;
}
li.done span { color: #6e6d67; text-decoration: line-through; }
span { flex: 1; }
li button { background: transparent; color: #c5cec4; padding: 4px 8px; }`,
      js: "",
    },
    challenge: {
      brief:
        "Wire it. Controlled input. Submit adds immutably. Filter buttons set filter and visible is derived. Done toggles one ticket with map. Remove uses filter. This is the last check in Kiln.",
      checks: [
        {
          id: "controlled",
          label: "Draft input is controlled",
          hint: "value={draft} onChange={... setDraft}",
          run: (ctx) => srcHas(ctx, /value=\{draft\}/) && srcHas(ctx, /setDraft/),
        },
        {
          id: "add",
          label: "Submit adds with spread",
          hint: "setTickets([...tickets, { id: Date.now(), title: draft, done: false }])",
          run: (ctx) => srcHas(ctx, /setTickets\s*\(/) && srcHas(ctx, /\.\.\.tickets/),
        },
        {
          id: "filter",
          label: "A derived filter",
          hint: "tickets.filter(...) based on the filter state, assigned to visible — or used inline.",
          run: (ctx) => srcHas(ctx, /\.filter\s*\(/) && srcHas(ctx, /setFilter/),
        },
        {
          id: "toggle",
          label: "Toggle done with map",
          hint: "setTickets(tickets.map(... done: !t.done))",
          run: (ctx) => srcHas(ctx, /\.map\s*\(/) && srcHas(ctx, /done/),
        },
        {
          id: "buttons",
          label: "onClick on the filter or row buttons",
          hint: "The All / Open / Done buttons need onClick.",
          run: (ctx) => (ctx.html.match(/onClick/g) ?? []).length >= 3,
        },
      ],
    },
    solution: {
      html: `function App() {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Glaze the tiles", done: false },
    { id: 2, title: "Call the mill", done: true },
  ]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = tickets.filter((t) => {
    if (filter === "open") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  function onSubmit(e) {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setTickets([...tickets, { id: Date.now(), title, done: false }]);
    setDraft("");
  }

  function toggle(id) {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id) {
    setTickets(tickets.filter((t) => t.id !== id));
  }

  return (
    <div className="shell">
      <header>
        <p className="mark">Studio</p>
        <h1>Board</h1>
      </header>
      <div className="filters">
        <button type="button" onClick={() => setFilter("all")}>All</button>
        <button type="button" onClick={() => setFilter("open")}>Open</button>
        <button type="button" onClick={() => setFilter("done")}>Done</button>
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="draft">Ticket</label>
        <input
          id="draft"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {visible.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <span>{t.title}</span>
            <button type="button" onClick={() => toggle(t.id)}>Done</button>
            <button type="button" onClick={() => remove(t.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      css: `body { margin: 0; font-family: Georgia, serif; background: #111210; color: #e9e6de; }
.shell { max-width: 32rem; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
.mark { font-style: italic; margin: 0; color: #c5cec4; }
h1 { font-weight: 500; margin: 0 0 1.5rem; }
.filters { display: flex; gap: 8px; margin-bottom: 1.25rem; }
form { display: flex; gap: 8px; align-items: end; margin-bottom: 1.5rem; }
label { display: block; font-size: 0.8rem; color: #9c9a92; }
input, button { font: inherit; padding: 8px 10px; }
input { flex: 1; background: #1b1d1b; color: inherit; border: 1px solid #2a2c2a; }
button { background: #c5cec4; color: #111210; border: 0; }
li {
  display: flex; gap: 8px; align-items: center;
  padding: 8px 0; border-bottom: 1px solid #2a2c2a;
}
li.done span { color: #6e6d67; text-decoration: line-through; }
span { flex: 1; }
li button { background: transparent; color: #c5cec4; padding: 4px 8px; }`,
      js: "",
    },
  },
];
