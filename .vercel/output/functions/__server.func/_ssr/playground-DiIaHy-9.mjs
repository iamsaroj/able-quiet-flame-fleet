import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { p as Button } from "./router-2K7q0tXG.mjs";
import { t as SandboxEditor } from "./sandbox-editor-D-83HL6y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playground-DiIaHy-9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEB = {
	html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Playground</title>
  </head>
  <body>
    <h1>Blank clay.</h1>
    <p>Build anything. This bench is not graded.</p>
  </body>
</html>`,
	css: `*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  padding: 2rem;
  font-family: Georgia, serif;
  background: #f4f1ea;
  color: #1c1b18;
}`,
	js: `// document.querySelector("h1").textContent = "Open";`
};
var REACT = {
	html: `function App() {
  const [n, setN] = useState(0);
  return (
    <main>
      <h1>Studio</h1>
      <p>{n} shots</p>
      <button onClick={() => setN(n + 1)}>Take one</button>
    </main>
  );
}`,
	css: `body { margin: 0; font-family: Georgia, serif; background: #111210; color: #e9e6de; }
main { padding: 2rem; }
button { font: inherit; padding: 8px 12px; }`,
	js: ""
};
function Playground() {
	const [mode, setMode] = (0, import_react.useState)("web");
	const [web, setWeb] = (0, import_react.useState)(WEB);
	const [react, setReact] = (0, import_react.useState)(REACT);
	const files = mode === "web" ? web : react;
	const setFiles = mode === "web" ? setWeb : setReact;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-[1400px] flex-col lg:h-[calc(100dvh-4rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl tracking-tight",
				children: "Playground"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No brief. No checks. Same bench as the lessons."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ml-auto flex gap-2",
				children: ["web", "react"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: mode === m ? "default" : "outline",
					onClick: () => setMode(m),
					children: m === "web" ? "HTML / CSS / JS" : "React"
				}, m))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandboxEditor, {
			files,
			onChange: setFiles,
			mode,
			className: "min-h-[32rem] flex-1 rounded-none lg:rounded-lg lg:mx-6 lg:mb-6"
		})]
	});
}
//#endregion
export { Playground as component };
