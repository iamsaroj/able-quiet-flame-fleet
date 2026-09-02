import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as cn } from "./router-2K7q0tXG.mjs";
import { t as transform } from "../_libs/sucrase+ts-interface-checker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sandbox-editor-D-83HL6y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Tiny React-like runtime injected into the lesson iframe. Enough for function
*  components, props, useState, and useEffect — which is all 6 React lessons use. */
var MINI_REACT_SRC = `
window.MiniReact = (function () {
  const Fragment = Symbol.for("kiln.fragment");
  let hookCursor = 0;
  const hooks = [];
  const pendingEffects = [];
  let host = null;
  let tree = null;
  let scheduled = false;

  function flatten(list) {
    const out = [];
    for (const item of list) {
      if (item == null || item === false || item === true) continue;
      if (Array.isArray(item)) out.push.apply(out, flatten(item));
      else out.push(item);
    }
    return out;
  }

  function createElement(type, props) {
    const rest = [].slice.call(arguments, 2);
    const merged = Object.assign({}, props || {});
    const fromProps = merged.children != null ? [].concat(merged.children) : [];
    merged.children = flatten(fromProps.concat(rest));
    return { type: type, props: merged };
  }

  function useState(init) {
    const i = hookCursor++;
    if (hooks[i] === undefined) {
      hooks[i] = typeof init === "function" ? init() : init;
    }
    const set = function (v) {
      const cur = hooks[i];
      const next = typeof v === "function" ? v(cur) : v;
      if (Object.is(next, cur)) return;
      hooks[i] = next;
      schedule();
    };
    return [hooks[i], set];
  }

  function useEffect(fn, deps) {
    const i = hookCursor++;
    const prev = hooks[i];
    var changed = !prev;
    if (prev && deps && prev.deps) {
      changed = deps.length !== prev.deps.length;
      if (!changed) {
        for (var d = 0; d < deps.length; d++) {
          if (!Object.is(deps[d], prev.deps[d])) changed = true;
        }
      }
    } else if (prev && !deps) {
      changed = true;
    }
    hooks[i] = { deps: deps, fn: fn, cleanup: prev && prev.cleanup };
    if (changed) pendingEffects.push(i);
  }

  function eventName(key) {
    return key.slice(2).toLowerCase();
  }

  function applyProps(el, props) {
    for (const key in props) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
      if (key === "children") continue;
      const val = props[key];
      if (key === "className") {
        el.setAttribute("class", val == null ? "" : String(val));
        continue;
      }
      if (key === "htmlFor") {
        el.setAttribute("for", val == null ? "" : String(val));
        continue;
      }
      if (key === "style" && val && typeof val === "object") {
        for (const s in val) {
          if (Object.prototype.hasOwnProperty.call(val, s)) el.style[s] = val[s];
        }
        continue;
      }
      if (key.indexOf("on") === 0 && typeof val === "function") {
        el.addEventListener(eventName(key), val);
        continue;
      }
      if (key === "value" && "value" in el) {
        el.value = val == null ? "" : val;
        continue;
      }
      if (key === "checked") {
        el.checked = !!val;
        continue;
      }
      if (key === "disabled") {
        el.disabled = !!val;
        continue;
      }
      if (val === false || val == null) continue;
      if (val === true) {
        el.setAttribute(key, "");
        continue;
      }
      el.setAttribute(key, String(val));
    }
  }

  function createNode(vnode) {
    if (vnode == null || vnode === false) return document.createComment("");
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(String(vnode));
    }
    if (vnode.type === Fragment) {
      const frag = document.createDocumentFragment();
      const ch = vnode.props.children || [];
      for (var i = 0; i < ch.length; i++) frag.appendChild(createNode(ch[i]));
      return frag;
    }
    if (typeof vnode.type === "function") {
      const rendered = vnode.type(vnode.props);
      return createNode(rendered);
    }
    const el = document.createElement(vnode.type);
    applyProps(el, vnode.props);
    const ch = vnode.props.children || [];
    for (var c = 0; c < ch.length; c++) el.appendChild(createNode(ch[c]));
    return el;
  }

  function flushEffects() {
    for (var i = 0; i < pendingEffects.length; i++) {
      const idx = pendingEffects[i];
      const h = hooks[idx];
      if (!h) continue;
      if (typeof h.cleanup === "function") {
        try { h.cleanup(); } catch (e) {}
      }
      const cl = h.fn();
      if (typeof cl === "function") h.cleanup = cl;
    }
    pendingEffects.length = 0;
  }

  function commit() {
    if (!host || tree == null) return;
    hookCursor = 0;
    pendingEffects.length = 0;
    const node = createNode(tree);
    host.innerHTML = "";
    host.appendChild(node);
    queueMicrotask(flushEffects);
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(function () {
      scheduled = false;
      commit();
    });
  }

  const MiniReactDOM = {
    createRoot: function (container) {
      host = container;
      window.__kilnRendered = true;
      return {
        render: function (vnode) {
          tree = vnode;
          commit();
        },
      };
    },
  };

  return {
    createElement: createElement,
    Fragment: Fragment,
    useState: useState,
    useEffect: useEffect,
    MiniReactDOM: MiniReactDOM,
  };
})();
window.React = window.MiniReact;
window.ReactDOM = window.MiniReact.MiniReactDOM;
window.useState = window.MiniReact.useState;
window.useEffect = window.MiniReact.useEffect;
window.MiniReactDOM = window.MiniReact.MiniReactDOM;
`;
function escapeScript(code) {
	return code.replace(/<\/script/gi, "<\\/script");
}
function injectIntoDocument(html, css, js) {
	const cssBlock = css.trim() ? `<style>\n${css}\n</style>` : "";
	const jsBlock = js.trim() ? `<script>\ntry {\n${escapeScript(js)}\n} catch (err) {\n  document.body.insertAdjacentHTML("afterbegin", "<pre style='color:#8b2e24;padding:12px;font:12px/1.5 ui-monospace,monospace'>"+String(err)+"</pre>");\n}\n<\/script>` : "";
	let out = html;
	if (cssBlock) {
		if (/<\/head>/i.test(out)) out = out.replace(/<\/head>/i, `${cssBlock}\n</head>`);
		else out = `${cssBlock}\n${out}`;
	}
	if (jsBlock) {
		if (/<\/body>/i.test(out)) out = out.replace(/<\/body>/i, `${jsBlock}\n</body>`);
		else out = `${out}\n${jsBlock}`;
	}
	return out;
}
function buildWebSrcdoc(files) {
	const { html, css, js } = files;
	if (/<html/i.test(html)) return injectIntoDocument(html, css, js);
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  html, body { margin: 0; }
</style>
${css.trim() ? `<style>\n${css}\n</style>` : ""}
</head>
<body>
${html}
${js.trim() ? `<script>\ntry {\n${escapeScript(js)}\n} catch (err) {\n  document.body.insertAdjacentHTML("afterbegin", "<pre style='color:#8b2e24;padding:12px;font:12px/1.5 ui-monospace,monospace'>"+String(err)+"</pre>");\n}\n<\/script>` : ""}
</body>
</html>`;
}
function compileJsx(source) {
	try {
		return {
			code: transform(source, {
				transforms: ["jsx"],
				jsxRuntime: "classic",
				jsxPragma: "MiniReact.createElement",
				jsxFragmentPragma: "MiniReact.Fragment",
				production: true
			}).code,
			error: null
		};
	} catch (err) {
		return {
			code: "",
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
function buildReactSrcdoc(files) {
	const { code, error } = compileJsx(files.html.trim());
	const compiled = error ? `document.getElementById("root").innerHTML = ${JSON.stringify(`<pre style="color:#8b2e24;padding:16px;white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace">${error}</pre>`)}` : `${code}
if (!window.__kilnRendered && typeof App === "function") {
  MiniReactDOM.createRoot(document.getElementById("root")).render(MiniReact.createElement(App));
}`;
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  html, body { margin: 0; }
</style>
${files.css.trim() ? `<style>\n${files.css}\n</style>` : ""}
</head>
<body>
<div id="root"></div>
<script>
${MINI_REACT_SRC}
try {
${escapeScript(compiled)}
} catch (err) {
  document.getElementById("root").innerHTML = "<pre style='color:#8b2e24;padding:16px;white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace'>"+String(err)+"</pre>";
}
<\/script>
</body>
</html>`;
}
function buildSrcdoc(mode, files) {
	return mode === "react" ? buildReactSrcdoc(files) : buildWebSrcdoc(files);
}
function SandboxEditor({ files, onChange, mode, className }) {
	const tabs = mode === "react" ? [{
		id: "html",
		label: "JSX"
	}, {
		id: "css",
		label: "CSS"
	}] : [
		{
			id: "html",
			label: "HTML"
		},
		{
			id: "css",
			label: "CSS"
		},
		{
			id: "js",
			label: "JS"
		}
	];
	const [tab, setTab] = (0, import_react.useState)("html");
	const [srcdoc, setSrcdoc] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (mode === "react" && tab === "js") setTab("html");
	}, [mode, tab]);
	(0, import_react.useEffect)(() => {
		const handle = window.setTimeout(() => {
			setSrcdoc(buildSrcdoc(mode, files));
		}, 280);
		return () => window.clearTimeout(handle);
	}, [files, mode]);
	const value = files[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col overflow-hidden rounded-lg bg-inset shadow-[var(--shadow-border)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-1 border-b border-line px-2",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(t.id),
					className: cn("h-10 px-3 font-mono text-xs uppercase tracking-wide", tab === t.id ? "text-fg" : "text-subtle hover:text-muted"),
					children: t.label
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "kiln-editor",
				children: "Lesson code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "kiln-editor",
				spellCheck: false,
				value,
				onChange: (e) => onChange({
					...files,
					[tab]: e.target.value
				}),
				onKeyDown: (e) => {
					if (e.key !== "Tab") return;
					e.preventDefault();
					const el = e.currentTarget;
					const start = el.selectionStart;
					const end = el.selectionEnd;
					const next = value.slice(0, start) + "  " + value.slice(end);
					onChange({
						...files,
						[tab]: next
					});
					requestAnimationFrame(() => {
						el.selectionStart = el.selectionEnd = start + 2;
					});
				},
				className: "h-48 w-full shrink-0 resize-none overflow-auto bg-transparent p-3 font-mono text-xs leading-5 text-fg outline-none lg:h-auto lg:min-h-44 lg:flex-1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-48 flex-1 border-t border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Lesson preview",
					sandbox: "allow-scripts",
					srcDoc: srcdoc,
					className: "h-full min-h-48 w-full bg-paper"
				})
			})
		]
	});
}
//#endregion
export { SandboxEditor as t };
