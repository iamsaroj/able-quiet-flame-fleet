import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Menu, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog, u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-2K7q0tXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function KilnMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M7 23V13c0-3.4 2.6-6 9-6s9 2.6 9 6v10",
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "11",
			y: "16.5",
			width: "10",
			height: "7.5",
			rx: "1.2",
			fill: "currentColor",
			className: "text-accent"
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-paper text-paper-fg hover:bg-paper/90",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-raised",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-raised",
			subtle: "bg-raised text-fg hover:bg-raised/80"
		},
		size: {
			default: "h-11 rounded-md px-4 text-sm",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-md px-5 text-base",
			icon: "size-11 rounded-md",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/70 data-[state=open]:animate-in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 z-50 flex w-[min(100%,20rem)] flex-col bg-surface p-6 shadow-[var(--shadow-border)]", side === "right" ? "right-0" : "left-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 flex size-11 items-center justify-center rounded-sm text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-serif text-2xl text-fg", className),
		...props
	});
}
function parseHtml(html) {
	return new DOMParser().parseFromString(html || "<div></div>", "text/html");
}
function makeCtx(files) {
	return {
		html: files.html,
		css: files.css,
		js: files.js,
		doc: parseHtml(files.html)
	};
}
function hasTag(ctx, tag, min = 1) {
	return ctx.doc.getElementsByTagName(tag).length >= min;
}
function hasAttr(ctx, selector, attr, minLen = 1) {
	const el = ctx.doc.querySelector(selector);
	if (!el) return false;
	const v = el.getAttribute(attr);
	return v !== null && v.trim().length >= minLen;
}
function textOf(ctx, selector) {
	return (ctx.doc.querySelector(selector)?.textContent ?? "").trim();
}
function htmlHas(ctx, re) {
	return re.test(ctx.html);
}
function cssHas(ctx, re) {
	return re.test(ctx.css) || re.test(ctx.html);
}
function jsHas(ctx, re) {
	return re.test(ctx.js) || re.test(ctx.html);
}
var htmlLessons = [
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
			"Put a real heading and paragraph on a page"
		],
		youShip: "A one-screen page with your name on it",
		visual: "tag-anatomy",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "HTML is not a programming language. It is a document format: a nested set of tags that tell the browser what each piece of content is. A heading is not big text. A heading is a heading. That distinction is the whole job."
			},
			{
				type: "visual",
				id: "tag-anatomy"
			},
			{
				type: "h",
				text: "The four lines every page starts with"
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
</html>`
			},
			{
				type: "list",
				items: [
					"<!DOCTYPE html> tells the browser this is modern HTML, not 1998 leftovers.",
					"<html lang=\"en\"> is the root. lang helps screen readers and translation.",
					"<head> is metadata — title, charset, later CSS. Nothing in head paints on the page.",
					"<body> is everything the visitor sees."
				]
			},
			{
				type: "callout",
				kind: "rule",
				title: "Tags wrap meaning",
				text: "Almost every tag has an opener <p> and a closer </p>. The content lives between them. <img> and <meta> are the rare empty tags — they point at something instead of wrapping it."
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "h1 is not a style",
				text: "There is one h1 per page: the title of this document. Do not pick heading levels because they look the right size. You will control size with CSS in week 3. Today, pick the correct meaning."
			}
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
			js: ""
		},
		challenge: {
			brief: "This page is still a template. Change the <title> to something that is yours. Replace the heading with your name. Add a <p> under it with one honest sentence about why you are here.",
			checks: [
				{
					id: "title",
					label: "Title is no longer the starter text",
					hint: "The <title> inside <head> is what the browser tab shows. Change the words between the tags.",
					run: (ctx) => {
						const t = ctx.doc.querySelector("title")?.textContent?.trim() ?? "";
						return t.length > 0 && t !== "My first page";
					}
				},
				{
					id: "h1",
					label: "h1 is no longer “Hello, Kiln.”",
					hint: "Replace the heading text with your name or the name of the page.",
					run: (ctx) => textOf(ctx, "h1") !== "Hello, Kiln." && textOf(ctx, "h1").length > 1
				},
				{
					id: "p",
					label: "A paragraph sits under the heading",
					hint: "Add <p>your sentence</p> inside <body>, after the h1.",
					run: (ctx) => hasTag(ctx, "p") && textOf(ctx, "p").length > 8
				}
			]
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
			js: ""
		}
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
			"Use strong and em for meaning, not decoration"
		],
		youShip: "A recipe card written in honest HTML",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "The browser already knows how to present text if you tell it what the text is. A list of ingredients that is actually a <ul> can be jumped to, copied, and read aloud. The same words in a single <p> with dashes is just a blob."
			},
			{
				type: "h",
				text: "The outline"
			},
			{
				type: "list",
				items: [
					"h1 — the document. One.",
					"h2 — major sections of that document.",
					"h3 — subsections of the nearest h2. Do not skip from h1 to h3.",
					"p — a paragraph. Not a heading. Not a div.",
					"ul / ol + li — unordered (bullets) or ordered (steps).",
					"strong — importance. em — spoken emphasis. They are not bold and italic; CSS can make them look like anything."
				]
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
</ol>`
			},
			{
				type: "callout",
				kind: "rule",
				title: "One idea per tag",
				text: "If you are about to put two headings in one h2, you want two h2s. If a line is a step, it is an li, not a p with a number you typed."
			}
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
			js: ""
		},
		challenge: {
			brief: "Turn this into a recipe. Keep one h1. Add an h2 for Ingredients with a ul of at least four items, and an h2 for Method with an ol of at least three steps. Emphasize one word in the intro with <em> or <strong>.",
			checks: [
				{
					id: "h2s",
					label: "Two section headings",
					hint: "Add two <h2> elements — Ingredients and Method are the usual pair.",
					run: (ctx) => ctx.doc.getElementsByTagName("h2").length >= 2
				},
				{
					id: "ul",
					label: "An unordered list with four items",
					hint: "<ul> with four or more <li> children.",
					run: (ctx) => {
						const ul = ctx.doc.querySelector("ul");
						return !!ul && ul.querySelectorAll("li").length >= 4;
					}
				},
				{
					id: "ol",
					label: "An ordered list with three steps",
					hint: "<ol> with three or more <li> children.",
					run: (ctx) => {
						const ol = ctx.doc.querySelector("ol");
						return !!ol && ol.querySelectorAll("li").length >= 3;
					}
				},
				{
					id: "em",
					label: "Emphasis or importance used once",
					hint: "Wrap a word in <em> or <strong>.",
					run: (ctx) => hasTag(ctx, "em") || hasTag(ctx, "strong")
				}
			]
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
			js: ""
		}
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
			"Group a picture with its caption"
		],
		youShip: "A tiny profile with a portrait and three links",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "A link is the <a> tag. The href attribute is the address. The text between the tags is what the visitor reads — write it like a label, not “click here”. An image is the <img> tag. It has no closer. It must have src and alt."
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
</figure>`
			},
			{
				type: "callout",
				kind: "rule",
				title: "alt is not optional",
				text: "If the image is content, alt describes it. If the image is decorative, alt=\"\" (empty) tells the screen reader to skip it. Never put “image of” in alt — the software already knows it is an image."
			},
			{
				type: "callout",
				kind: "why",
				title: "Why href looks like a URL",
				text: "Absolute links start with https:// and leave the site. Relative links like ./about.html stay next to this file. For now, use real https URLs so the preview can fetch them."
			}
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
			js: ""
		},
		challenge: {
			brief: "Add an <img> with a real src and a descriptive alt. Add a <nav> with three <a> links (portfolio, a reference, a contact mailto: is fine). Wrap the image in <figure> with a <figcaption>.",
			checks: [
				{
					id: "img-alt",
					label: "Image has src and alt",
					hint: "<img src=\"...\" alt=\"describe the picture\">. Alt must not be empty for this portrait.",
					run: (ctx) => hasAttr(ctx, "img", "src", 8) && hasAttr(ctx, "img", "alt", 8)
				},
				{
					id: "nav-links",
					label: "Nav with three links",
					hint: "A <nav> containing at least three <a href> elements.",
					run: (ctx) => {
						const nav = ctx.doc.querySelector("nav");
						return !!nav && nav.querySelectorAll("a[href]").length >= 3;
					}
				},
				{
					id: "figure",
					label: "Figure with a caption",
					hint: "Wrap the image in <figure> and add <figcaption>.",
					run: (ctx) => hasTag(ctx, "figure") && hasTag(ctx, "figcaption")
				}
			]
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
			js: ""
		}
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
			"Give assistive tech a map of the page"
		],
		youShip: "A two-section studio page with real landmarks",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "div and span mean nothing. They are boxes for CSS. The tags below mean something to browsers, search engines, and screen readers — they are landmarks a keyboard user can jump between."
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
					"aside — tangential. A pull quote, related links."
				]
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
</body>`
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "section without a heading is a div in a costume",
				text: "If you cannot name the section with an h2, you do not have a section. You have a wrapper. Use a div, or rethink the outline."
			}
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
			js: ""
		},
		challenge: {
			brief: "This page is div soup. Rebuild it with <header>, <nav>, <main>, <article>, and <footer>. Keep the same words. The h1 should live inside main (inside article is even better).",
			checks: [
				{
					id: "header",
					label: "A header landmark",
					hint: "Replace the top wrapper with <header>.",
					run: (ctx) => hasTag(ctx, "header")
				},
				{
					id: "nav",
					label: "A nav landmark",
					hint: "Wrap the two links in <nav>.",
					run: (ctx) => hasTag(ctx, "nav")
				},
				{
					id: "main-article",
					label: "main containing an article",
					hint: "One <main>, and an <article> inside it for the pitch.",
					run: (ctx) => !!ctx.doc.querySelector("main article")
				},
				{
					id: "footer",
					label: "A footer landmark",
					hint: "Replace the bottom wrapper with <footer>.",
					run: (ctx) => hasTag(ctx, "footer")
				}
			]
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
			js: ""
		}
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
			"Build a form that could actually submit"
		],
		youShip: "A contact form with name, email, and a message",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "A form is a machine for collecting named values. Every control needs a name (what the field is called when it is submitted) and a label (what a human reads). Clicking the label must focus the input. That is not a courtesy. It is how phones and screen readers work."
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
</form>`
			},
			{
				type: "list",
				items: [
					"type=\"text\" — default. Use a more specific type when you can.",
					"type=\"email\" — mobile shows an @ keyboard. The browser can validate.",
					"type=\"password\", \"number\", \"url\", \"date\" — same idea: tell the truth.",
					"textarea — multi-line. It is not an input with a different type.",
					"button type=\"submit\" — inside a form this sends. type=\"button\" does not."
				]
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "Placeholder is not a label",
				text: "Placeholder disappears as soon as someone types. A field with only a placeholder has no name once it is filled. Always a visible <label>."
			}
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
			js: ""
		},
		challenge: {
			brief: "Add a <form> with three labeled fields: full name (text), email (email), message (textarea). Each label’s for must match its input’s id. Name attributes on every control. A submit button.",
			checks: [
				{
					id: "form",
					label: "A form element exists",
					hint: "Wrap the fields in <form>.",
					run: (ctx) => hasTag(ctx, "form")
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
					}
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
					}
				},
				{
					id: "submit",
					label: "A submit button",
					hint: "<button type=\"submit\"> or <button> inside the form.",
					run: (ctx) => htmlHas(ctx, /<button/i) && (htmlHas(ctx, /type=["']submit["']/i) || !!ctx.doc.querySelector("form button"))
				}
			]
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
			js: ""
		}
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
			"Leave CSS for next week on purpose"
		],
		youShip: "A semantic personal site: identity, links, work list, contact",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "This is the first thing in your portfolio. It will look like a 1995 document. That is correct. A page with honest structure is easier to dress than a pretty page with no bones. Next week you will skin it. Today you ship meaning."
			},
			{
				type: "steps",
				items: [
					{
						title: "Header",
						text: "Your name as h1, a one-line role, a nav of in-page links to Work and Contact."
					},
					{
						title: "Main",
						text: "A short bio in an article. Then a section “Selected work” as a list of three projects — each with a name and one sentence."
					},
					{
						title: "Contact",
						text: "A form with name, email, message. Real labels."
					},
					{
						title: "Footer",
						text: "City and year. Nothing cute."
					}
				]
			},
			{
				type: "callout",
				kind: "why",
				title: "Why unstyled",
				text: "If you reach for inline style=\"color:blue\" you are hiding a structure problem. Resist. The browser’s default stylesheet is a diagnostic: headings should look like headings because they are headings."
			}
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
			js: ""
		},
		challenge: {
			brief: "Build the calling card from a blank body. Required: header + nav, main with an h1 and a bio paragraph, a list of at least three pieces of work, a labeled contact form, a footer. Use the landmarks. This is the week-2 ship.",
			checks: [
				{
					id: "landmarks",
					label: "header, nav, main, footer",
					hint: "All four landmarks, once each at least.",
					run: (ctx) => hasTag(ctx, "header") && hasTag(ctx, "nav") && hasTag(ctx, "main") && hasTag(ctx, "footer")
				},
				{
					id: "h1-bio",
					label: "An h1 and a bio paragraph in main",
					hint: "Put the h1 inside main. Add a <p> with more than a few words.",
					run: (ctx) => !!ctx.doc.querySelector("main h1") && textOf(ctx, "main p").length > 20
				},
				{
					id: "work-list",
					label: "A work list with three items",
					hint: "A ul or ol with at least three li — project names are enough.",
					run: (ctx) => {
						return Array.from(ctx.doc.querySelectorAll("ul, ol")).some((l) => l.querySelectorAll("li").length >= 3);
					}
				},
				{
					id: "form",
					label: "A labeled form",
					hint: "form, an email input, a textarea, a button.",
					run: (ctx) => hasTag(ctx, "form") && !!ctx.doc.querySelector("input[type='email']") && hasTag(ctx, "textarea") && hasTag(ctx, "button")
				}
			]
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
			js: ""
		}
	}
];
var cssLessons = [
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
			"Keep specificity low on purpose"
		],
		youShip: "A page where headings, a tag, and a muted line each have a job",
		visual: "cascade",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "CSS is a matching language. A selector finds nodes. A declaration list says what to do with them. When two rules match the same node, the cascade decides: origin, then specificity, then order. You will almost never need !important if you keep selectors simple."
			},
			{
				type: "visual",
				id: "cascade"
			},
			{
				type: "code",
				lang: "css",
				caption: "Element, class, descendant. Specificity 0-0-1, 0-1-0, 0-1-1.",
				code: `h1 { font-size: 2rem; }
.tag { letter-spacing: 0.12em; text-transform: uppercase; }
article p { color: #4a4741; }
article p.lead { color: #1c1b18; }`
			},
			{
				type: "list",
				items: [
					"Element selectors (h1, p) — good for defaults.",
					"Class selectors (.lead) — your everyday tool. Reusable, low drama.",
					"ID selectors (#hero) — too specific. Skip them for styling.",
					"Inline style=\"\" — wins almost everything. Keep style in the CSS pane."
				]
			},
			{
				type: "callout",
				kind: "rule",
				title: "Class names describe purpose, not appearance",
				text: ".lead is a lead paragraph. .muted is secondary. .red is a trap — the day it has to become green you are lying in the HTML."
			}
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
			js: ""
		},
		challenge: {
			brief: "Style .tag as small uppercase tracked-out text. Make h1 large. Make .lead slightly larger than the following paragraph. Color the unmarked paragraph a muted brown. Use classes and elements only — no ids, no !important.",
			checks: [
				{
					id: "tag",
					label: ".tag is styled",
					hint: "A .tag { } rule. letter-spacing or text-transform is the usual pair.",
					run: (ctx) => cssHas(ctx, /\.tag\s*\{[^}]+\}/s)
				},
				{
					id: "h1",
					label: "h1 has a font-size",
					hint: "h1 { font-size: ... }",
					run: (ctx) => cssHas(ctx, /h1\s*\{[^}]*font-size/s)
				},
				{
					id: "lead",
					label: ".lead is distinct",
					hint: "A .lead rule with font-size or color.",
					run: (ctx) => cssHas(ctx, /\.lead\s*\{[^}]+\}/s)
				},
				{
					id: "no-important",
					label: "No !important, no id selectors",
					hint: "Keep specificity low. Delete #ids and !important if you added them.",
					run: (ctx) => !/!important/.test(ctx.css) && !/#[a-zA-Z]/.test(ctx.css)
				}
			]
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
			js: ""
		}
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
			"Build a card without guessing numbers"
		],
		youShip: "A card with a measured box — padding, border, radius",
		visual: "box-model",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "Every element is a box. From the inside out: content, padding, border, margin. Width by default is the content width — padding and border add on, so a 300px box with 20px padding is 340px on screen. This is the oldest practical joke in CSS."
			},
			{
				type: "visual",
				id: "box-model"
			},
			{
				type: "code",
				lang: "css",
				caption: "Put this at the top of every stylesheet you ever write.",
				code: `*, *::before, *::after {
  box-sizing: border-box;
}`
			},
			{
				type: "callout",
				kind: "rule",
				title: "border-box",
				text: "With border-box, width includes padding and border. You say 320px, you get 320px. Margin still sits outside. Margin is not part of the box — it is the gap between boxes."
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "Margin collapse",
				text: "Vertical margins between siblings collapse to the larger of the two. That is why two 24px-margin paragraphs are 24px apart, not 48. Use padding on a parent when you want inner space that does not collapse."
			}
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
			js: ""
		},
		challenge: {
			brief: "Style .card as a real card: background, padding at least 24px, a 1px border, a max-width, and a border-radius. Keep box-sizing: border-box on the universal selector.",
			checks: [
				{
					id: "border-box",
					label: "Universal border-box",
					hint: "*, *::before, *::after { box-sizing: border-box; }",
					run: (ctx) => cssHas(ctx, /box-sizing\s*:\s*border-box/)
				},
				{
					id: "padding",
					label: ".card has padding",
					hint: ".card { padding: 24px; } — 1.5rem or more is fine.",
					run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*padding\s*:/s)
				},
				{
					id: "border",
					label: ".card has a border",
					hint: "border: 1px solid ...",
					run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*border\s*:/s)
				},
				{
					id: "radius",
					label: ".card has a radius",
					hint: "border-radius on .card.",
					run: (ctx) => cssHas(ctx, /\.card\s*\{[^}]*border-radius/s)
				}
			]
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
			js: ""
		}
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
			"Space with a consistent rhythm"
		],
		youShip: "A readable article on a paper field",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "Most “this looks cheap” pages fail three ways: too many fonts, too many colors, and spacing that was typed by feel. Pick one body face. Pick one display face if you must. Body size 16–18px, line-height around 1.5, measure (line length) under 70 characters. Then stop."
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
}`
			},
			{
				type: "callout",
				kind: "rule",
				title: "Space is a scale",
				text: "8, 16, 24, 32, 48. Not 13 and 27. If two things are related, the gap between them is a step on that scale — usually 8 or 16, not a coin-flip."
			}
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
			js: ""
		},
		challenge: {
			brief: "Declare --ink, --paper, and --muted on :root. Style body with a serif, a comfortable font-size and line-height, and a max-width. Distinguish the kicker from the h1 from the paragraphs. No more than three colors.",
			checks: [
				{
					id: "vars",
					label: "Custom properties on :root",
					hint: ":root { --ink: ...; --paper: ...; } — at least two variables.",
					run: (ctx) => cssHas(ctx, /:root\s*\{/) && (ctx.css.match(/--[a-zA-Z-]+\s*:/g) ?? []).length >= 2
				},
				{
					id: "body-type",
					label: "Body has font-size and line-height",
					hint: "body { font-size: 1.125rem; line-height: 1.5; }",
					run: (ctx) => cssHas(ctx, /body\s*\{[^}]*font-size/s) && cssHas(ctx, /body\s*\{[^}]*line-height/s)
				},
				{
					id: "measure",
					label: "A max-width on body or article",
					hint: "max-width so lines do not run the full screen. 40rem is a good start.",
					run: (ctx) => cssHas(ctx, /max-width\s*:/)
				},
				{
					id: "kicker",
					label: ".kicker is styled",
					hint: "Small, tracked, uppercase — a kicker is a label, not a heading.",
					run: (ctx) => cssHas(ctx, /\.kicker\s*\{[^}]+\}/s)
				}
			]
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
			js: ""
		}
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
			"Build a header: mark on the left, links on the right"
		],
		youShip: "A navigation bar that behaves",
		visual: "flex-lab",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "Flexbox is for one-dimensional layout: a row of items, or a column of items. You put display: flex on the parent. The children become flex items. You then say how they distribute leftover space, and how they align on the cross axis."
			},
			{
				type: "visual",
				id: "flex-lab"
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
}`
			},
			{
				type: "list",
				items: [
					"flex-direction: row (default) or column.",
					"justify-content — main axis: start, center, space-between, space-around.",
					"align-items — cross axis: stretch (default), center, start, end.",
					"gap — space between items. Prefer gap over margin on children.",
					"flex: 1 — this item may grow to fill leftover space."
				]
			}
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
			js: ""
		},
		challenge: {
			brief: "Turn .site-header into a flex row with space-between and centered items, with padding. Turn nav into a flex row with a gap of at least 16px. Links should sit on one line, on the right.",
			checks: [
				{
					id: "header-flex",
					label: "Header is a flex container",
					hint: ".site-header { display: flex; }",
					run: (ctx) => cssHas(ctx, /\.site-header\s*\{[^}]*display\s*:\s*flex/s)
				},
				{
					id: "between",
					label: "space-between on the header",
					hint: "justify-content: space-between;",
					run: (ctx) => cssHas(ctx, /justify-content\s*:\s*space-between/)
				},
				{
					id: "nav-flex",
					label: "nav is a flex row with gap",
					hint: "nav { display: flex; gap: 24px; }",
					run: (ctx) => cssHas(ctx, /nav\s*\{[^}]*display\s*:\s*flex/s) && cssHas(ctx, /gap\s*:/)
				},
				{
					id: "align",
					label: "Items vertically centered",
					hint: "align-items: center on the header.",
					run: (ctx) => cssHas(ctx, /align-items\s*:\s*center/)
				}
			]
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
			js: ""
		}
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
			"Make a layout that stacks on a narrow screen"
		],
		youShip: "A responsive three-card feature row",
		visual: "grid-lab",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "Flex wraps, but it does not know about the row below. Grid does. You declare the tracks, then let items fill them. For cards, galleries, and page shells (sidebar + main), grid is the tool. For a nav, flex is still the tool."
			},
			{
				type: "visual",
				id: "grid-lab"
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
}`
			},
			{
				type: "callout",
				kind: "why",
				title: "auto-fit + minmax",
				text: "Each column wants to be at least 220px and may grow. As the screen shrinks, columns drop. No breakpoint required for the common card row. That is the whole trick."
			}
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
			js: ""
		},
		challenge: {
			brief: "Make .features a grid with a gap. Use repeat(auto-fit, minmax(200px, 1fr)) so three cards sit in a row on a wide pane and stack when the preview is narrow. Give article a border-radius.",
			checks: [
				{
					id: "grid",
					label: ".features is a grid",
					hint: "display: grid;",
					run: (ctx) => cssHas(ctx, /\.features\s*\{[^}]*display\s*:\s*grid/s)
				},
				{
					id: "cols",
					label: "Columns use minmax or repeat",
					hint: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));",
					run: (ctx) => cssHas(ctx, /grid-template-columns\s*:/) && (cssHas(ctx, /minmax/) || cssHas(ctx, /repeat/) || cssHas(ctx, /1fr/))
				},
				{
					id: "gap",
					label: "A gap between tracks",
					hint: "gap: 24px; on the grid.",
					run: (ctx) => cssHas(ctx, /gap\s*:/)
				},
				{
					id: "radius",
					label: "Cards have a radius",
					hint: "border-radius on article.",
					run: (ctx) => cssHas(ctx, /border-radius\s*:/)
				}
			]
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
			js: ""
		}
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
			"Ship something you could put in a portfolio"
		],
		youShip: "Harbor — a complete landing page",
		mode: "web",
		blocks: [{
			type: "p",
			text: "You have the pieces. This week’s ship is a one-page restaurant site. It must look considered at 400px and at 1000px. No JavaScript. If a layout breaks when you drag the preview narrower, fix the grid, do not freeze the width."
		}, {
			type: "steps",
			items: [
				{
					title: "Tokens",
					text: "Ink, paper, muted on :root. box-sizing on *."
				},
				{
					title: "Header",
					text: "Flex, space-between. Mark + three links."
				},
				{
					title: "Hero",
					text: "A large h1 and a one-sentence pitch. Padding, not height hacks."
				},
				{
					title: "Menu",
					text: "A grid of at least three dishes that wraps."
				},
				{
					title: "Footer",
					text: "Address and hours. Quiet."
				}
			]
		}],
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
			js: ""
		},
		challenge: {
			brief: "Finish Harbor. :root tokens, a flex header, a distinct hero, a wrapping menu grid with gap, a styled footer. The page must use both display: flex and display: grid.",
			checks: [
				{
					id: "tokens",
					label: ":root tokens",
					hint: "At least two custom properties.",
					run: (ctx) => cssHas(ctx, /:root\s*\{/) && (ctx.css.match(/--[a-zA-Z-]+\s*:/g) ?? []).length >= 2
				},
				{
					id: "flex",
					label: "Flex is used",
					hint: "display: flex on the header (or nav).",
					run: (ctx) => cssHas(ctx, /display\s*:\s*flex/)
				},
				{
					id: "grid",
					label: "Grid is used",
					hint: "display: grid on the menu section.",
					run: (ctx) => cssHas(ctx, /display\s*:\s*grid/)
				},
				{
					id: "hero",
					label: "Hero type is large",
					hint: "A font-size of 2rem or more on h1, or a .hero rule.",
					run: (ctx) => cssHas(ctx, /h1\s*\{[^}]*font-size/s) || cssHas(ctx, /\.hero\s*\{[^}]*font-size/s)
				},
				{
					id: "footer",
					label: "Footer is styled",
					hint: "A footer { } rule — padding or border-top is enough.",
					run: (ctx) => cssHas(ctx, /footer\s*\{[^}]+\}/s)
				}
			]
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
			js: ""
		}
	}
];
var jsLessons = [
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
			"Do arithmetic the page can show"
		],
		youShip: "A guest check that totals itself",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "JavaScript is the first language in this path that computes. HTML describes. CSS presents. JS decides. Everything it decides is a value: a string, a number, a boolean, later a list or an object. You hang a name on a value with const (it will not be reassigned) or let (it will)."
			},
			{
				type: "code",
				lang: "js",
				caption: "Template strings interpolate. + also concatenates — prefer the template.",
				code: `const covers = 4;
const plate = 28;
const total = covers * plate;
const line = \`Tonight: \${covers} covers, $\${total}\`;`
			},
			{
				type: "callout",
				kind: "rule",
				title: "const first",
				text: "Default to const. Switch to let only when you will reassign the name. Never var — it is function-scoped and from a previous era."
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "\"10\" + 2 is \"102\"",
				text: "The + operator concatenates if either side is a string. Numbers you read from the DOM are strings. Use Number(value) or parseInt(value, 10) before you add."
			}
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
// Compute total. Put a sentence into #line with textContent.`
		},
		challenge: {
			brief: "Multiply covers by plate into a const total. Select #line and set its textContent to a sentence that includes both the cover count and the total. Use a template string.",
			checks: [
				{
					id: "const-total",
					label: "A total is computed",
					hint: "const total = covers * plate;",
					run: (ctx) => jsHas(ctx, /total\s*=\s*covers\s*\*\s*plate/) || jsHas(ctx, /covers\s*\*\s*plate/)
				},
				{
					id: "select",
					label: "The paragraph is selected",
					hint: "document.querySelector('#line') or getElementById('line').",
					run: (ctx) => jsHas(ctx, /querySelector\s*\(\s*['\"]#line['\"]\s*\)/) || jsHas(ctx, /getElementById\s*\(\s*['\"]line['\"]\s*\)/)
				},
				{
					id: "text",
					label: "textContent is set with a template",
					hint: "line.textContent = `...${total}...`",
					run: (ctx) => jsHas(ctx, /textContent/) && jsHas(ctx, /`/)
				}
			]
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
line.textContent = \`Tonight: \${covers} covers, $\${total}\`;`
		}
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
			"Walk a list with for...of"
		],
		youShip: "A price formatter and a small bill",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "A function is a named process with inputs (parameters) and an output (return). You call it. It does not run until you do. Conditions (if) and loops (for...of) are how a process notices the world instead of doing the same thing every time."
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
}`
			},
			{
				type: "callout",
				kind: "rule",
				title: "Return, do not print",
				text: "Functions that compute should return a value. Let the caller decide whether to put it on the page. console.log is a flashlight, not an output port."
			}
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
`
		},
		challenge: {
			brief: "Write formatPrice(cents) that returns a string like $24.00. Write a loop (or reduce) that sums lines. Set #out’s textContent to the formatted total. If the total is over $50, append the word “party”.",
			checks: [
				{
					id: "fn",
					label: "formatPrice is a function",
					hint: "function formatPrice(cents) { ... return ... }",
					run: (ctx) => jsHas(ctx, /function\s+formatPrice/) || jsHas(ctx, /formatPrice\s*=/)
				},
				{
					id: "return",
					label: "It returns a value",
					hint: "Use the return keyword inside formatPrice.",
					run: (ctx) => jsHas(ctx, /return/)
				},
				{
					id: "loop",
					label: "The list is walked or reduced",
					hint: "for...of, a classic for, or lines.reduce.",
					run: (ctx) => jsHas(ctx, /for\s*\(/) || jsHas(ctx, /\.reduce\s*\(/) || jsHas(ctx, /for\s*\(/)
				},
				{
					id: "out",
					label: "#out is written",
					hint: "querySelector('#out') and textContent.",
					run: (ctx) => jsHas(ctx, /#out|getElementById\(['\"]out['\"]\)/) && jsHas(ctx, /textContent/)
				}
			]
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
out.textContent = text;`
		}
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
			"Create a node and put it in the tree"
		],
		youShip: "A heading rewritten from JavaScript, plus a new line",
		visual: "dom-talk",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "The DOM (Document Object Model) is the live tree the browser built from your HTML. document is the root. querySelector finds one node with a CSS selector. textContent, classList, setAttribute, createElement, append are the verbs. You do not edit the HTML file at runtime — you edit this tree."
			},
			{
				type: "visual",
				id: "dom-talk"
			},
			{
				type: "code",
				lang: "js",
				code: `const h = document.querySelector("h1");
h.textContent = "Open";
h.classList.add("is-open");

const note = document.createElement("p");
note.textContent = "Walk-ins until 9.";
document.querySelector("main").append(note);`
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "querySelector returns null",
				text: "If the selector misses, you get null, and null.textContent throws. Select, then check, or make sure the element exists in the HTML before the script runs (script at the end of body, which Kiln already does)."
			}
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
`
		},
		challenge: {
			brief: "Select the h1, set textContent to Open, add the class is-open. Create a paragraph with createElement, give it text, append it to main.",
			checks: [
				{
					id: "h1-text",
					label: "h1 textContent is set",
					hint: "document.querySelector('h1').textContent = 'Open'",
					run: (ctx) => jsHas(ctx, /textContent\s*=/) && jsHas(ctx, /h1/)
				},
				{
					id: "class",
					label: "classList.add is used",
					hint: "h.classList.add('is-open')",
					run: (ctx) => jsHas(ctx, /classList\.add/)
				},
				{
					id: "create",
					label: "A node is created",
					hint: "document.createElement('p')",
					run: (ctx) => jsHas(ctx, /createElement\s*\(/)
				},
				{
					id: "append",
					label: "It is appended",
					hint: "main.append(note) or appendChild.",
					run: (ctx) => jsHas(ctx, /\.append\s*\(/) || jsHas(ctx, /appendChild\s*\(/)
				}
			]
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
document.querySelector("main").append(note);`
		}
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
			"preventDefault on a form so the page does not reload"
		],
		youShip: "A toggle and a field that echoes",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "The browser fires events: click, input, submit, keydown. addEventListener registers a function for a type. The function receives an event object — e.target is the node that was used, e.preventDefault() stops the browser’s default (a form’s default is to navigate)."
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
});`
			},
			{
				type: "callout",
				kind: "rule",
				title: "Listen, don’t onclick=",
				text: "HTML onclick=\"...\" mixes languages and does not scale to a second listener. addEventListener keeps the HTML about meaning and the script about behavior."
			}
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
`
		},
		challenge: {
			brief: "Clicking the toggle must classList.toggle('is-open') on #room. Submitting the form must preventDefault and put the guest’s name into #ticket.",
			checks: [
				{
					id: "listen",
					label: "addEventListener is used",
					hint: "At least one addEventListener call.",
					run: (ctx) => jsHas(ctx, /addEventListener\s*\(/)
				},
				{
					id: "toggle",
					label: "classList.toggle for the room",
					hint: "room.classList.toggle('is-open')",
					run: (ctx) => jsHas(ctx, /classList\.toggle/)
				},
				{
					id: "prevent",
					label: "submit is cancelled",
					hint: "e.preventDefault() inside the submit handler.",
					run: (ctx) => jsHas(ctx, /preventDefault\s*\(/)
				},
				{
					id: "value",
					label: "The input value is read",
					hint: "guest.value (or input.value).",
					run: (ctx) => jsHas(ctx, /\.value/)
				}
			]
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
});`
		}
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
			"Treat the array as the source of truth"
		],
		youShip: "A menu rendered from data, not from typed HTML",
		mode: "web",
		blocks: [
			{
				type: "p",
				text: "Once a list can change, you stop writing it in HTML. You keep an array of objects. A render function clears a container and writes the array out. Every click that changes data calls render() again. This idea — UI is a function of state — is the entire reason React exists. You learn it in vanilla JS first so React is not magic."
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
}`
			},
			{
				type: "callout",
				kind: "why",
				title: "Source of truth",
				text: "If you append a DOM node and also push to the array, you now have two lists that can disagree. Change the array. Render from it. One list."
			}
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
`
		},
		challenge: {
			brief: "Fill in render() so #list shows every dish. Use map (or a loop) over the dishes array. Each item should include the name. Add a fourth object to the array and see it appear — do not add an <li> in the HTML.",
			checks: [
				{
					id: "fourth",
					label: "A fourth dish in the array",
					hint: "Push another { name, note } into dishes.",
					run: (ctx) => (ctx.js.match(/name\s*:/g) ?? []).length >= 4
				},
				{
					id: "map-or-loop",
					label: "The array is iterated",
					hint: "dishes.map or for...of dishes.",
					run: (ctx) => jsHas(ctx, /dishes\.map/) || jsHas(ctx, /for\s*\(.*dishes/) || jsHas(ctx, /for\s*\(\s*const/)
				},
				{
					id: "write",
					label: "The list is written",
					hint: "list.innerHTML = ... or append inside the loop.",
					run: (ctx) => jsHas(ctx, /innerHTML/) || jsHas(ctx, /append/) || jsHas(ctx, /insertAdjacentHTML/)
				},
				{
					id: "render-call",
					label: "render() is called",
					hint: "Call render() after you define it.",
					run: (ctx) => jsHas(ctx, /render\s*\(\s*\)/)
				}
			]
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

render();`
		}
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
			"Wire a form, a toggle, and a delete without fighting the DOM"
		],
		youShip: "A working ticket board you could use on a shift",
		mode: "web",
		blocks: [{
			type: "p",
			text: "This is a real app in miniature. State: an array of { id, title, done }. View: render() writes the list. Events: submit pushes, a button flips done, a button filters the item out. If you can build this, you can build most of what the DOM is for."
		}, {
			type: "steps",
			items: [
				{
					title: "State",
					text: "let tickets = []. Give each ticket a unique id (Date.now() is fine here)."
				},
				{
					title: "render",
					text: "Wipe #list. For each ticket, an <li> with the title, a Done button, a Remove button. Done tickets get a class."
				},
				{
					title: "submit",
					text: "preventDefault. Push. Clear the input. render()."
				},
				{
					title: "buttons",
					text: "Listen on the list (event delegation) or bind per item inside render."
				}
			]
		}],
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
`
		},
		challenge: {
			brief: "Finish the board. render() paints the array. Submit adds a ticket. Each item can be marked done and removed. Tickets must live in the array — not as orphan DOM nodes.",
			checks: [
				{
					id: "array",
					label: "tickets is an array you push to",
					hint: "tickets.push({ id, title, done: false })",
					run: (ctx) => jsHas(ctx, /tickets\.push/) || jsHas(ctx, /tickets\s*=\s*\[[\s\S]*\{/)
				},
				{
					id: "render-html",
					label: "render writes the list",
					hint: "innerHTML or createElement inside render.",
					run: (ctx) => jsHas(ctx, /function\s+render/) && (jsHas(ctx, /innerHTML/) || jsHas(ctx, /createElement/))
				},
				{
					id: "submit",
					label: "submit adds a ticket",
					hint: "preventDefault, read the input, push, render.",
					run: (ctx) => jsHas(ctx, /preventDefault/) && jsHas(ctx, /addEventListener/)
				},
				{
					id: "done-or-remove",
					label: "A ticket can be completed or removed",
					hint: "Flip done or filter the array on a click.",
					run: (ctx) => jsHas(ctx, /done/) && (jsHas(ctx, /\.filter\s*\(/) || jsHas(ctx, /done\s*=\s*!/) || jsHas(ctx, /!t\.done/) || jsHas(ctx, /!ticket\.done/) || jsHas(ctx, /\.done/))
				}
			]
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

render();`
		}
	}
];
function srcHas(ctx, re) {
	return re.test(ctx.html) || re.test(ctx.js);
}
var reactLessons = [
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
			"Write your first function component"
		],
		youShip: "A page split into Header, Main, Footer components",
		visual: "component-tree",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "In the ticket board you called render() yourself after every change. React’s job is to call the equivalent of render() for you whenever state changes, and to update only what needs updating. The unit of UI is a function: it receives data (props), it returns a description of the screen (JSX). You do not appendChild. You return a tree."
			},
			{
				type: "visual",
				id: "component-tree"
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
}`
			},
			{
				type: "callout",
				kind: "rule",
				title: "App is the root",
				text: "Kiln looks for a function named App and mounts it. Return JSX from App. Child components are just functions you call with <Name />."
			},
			{
				type: "callout",
				kind: "why",
				title: "Why not innerHTML",
				text: "innerHTML is a string. A component tree is data: React can diff it, reuse nodes, and keep input focus. The ticket board already wanted this. React makes it the default."
			}
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
			js: ""
		},
		challenge: {
			brief: "Write function Main() and function Footer(). Main should return <main> with an h1. Footer should return <footer> with a line of address. Render both inside App next to Header.",
			checks: [
				{
					id: "main-fn",
					label: "A Main component",
					hint: "function Main() { return (<main>...</main>); }",
					run: (ctx) => srcHas(ctx, /function\s+Main\s*\(/)
				},
				{
					id: "footer-fn",
					label: "A Footer component",
					hint: "function Footer() { return (<footer>...</footer>); }",
					run: (ctx) => srcHas(ctx, /function\s+Footer\s*\(/)
				},
				{
					id: "used",
					label: "Both are used in App",
					hint: "Put <Main /> and <Footer /> inside App’s return.",
					run: (ctx) => srcHas(ctx, /<Main\s*\/>/) && srcHas(ctx, /<Footer\s*\/>/)
				},
				{
					id: "h1",
					label: "An h1 exists in the tree",
					hint: "Return an <h1> from Main.",
					run: (ctx) => srcHas(ctx, /<h1[\s>]/)
				}
			]
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
			js: ""
		}
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
			"Use className, not class"
		],
		youShip: "A Dish card you can reuse three times",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "JSX looks like HTML and compiles to function calls. Attributes become props — a single object argument. class is a reserved word in JavaScript, so the DOM class is className. style is an object, not a string. Children sit between the tags and arrive as props.children."
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

<Dish name="Oyster" note="Hama Hama" />`
			},
			{
				type: "list",
				items: [
					"{name} interpolates a value into the tree.",
					"props are read-only. A component never assigns to them.",
					"Boolean props: <Button primary /> means primary={true}.",
					"Anything between the tags is children."
				]
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "class vs className",
				text: "If a style does not apply, you probably wrote class. In Kiln’s runtime, className is the one that becomes class on the node."
			}
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
			js: ""
		},
		challenge: {
			brief: "Render name and note inside Dish. Use the component three times with different props. Destructure { name, note } if you want — either style is correct.",
			checks: [
				{
					id: "interpolate",
					label: "Props are interpolated",
					hint: "Put {name} or {props.name} in the JSX.",
					run: (ctx) => srcHas(ctx, /\{name\}|\{props\.name\}/) && srcHas(ctx, /\{note\}|\{props\.note\}/)
				},
				{
					id: "three",
					label: "Dish is used three times",
					hint: "Three <Dish ... /> elements in App.",
					run: (ctx) => (ctx.html.match(/<Dish\b/g) ?? []).length >= 3
				},
				{
					id: "classname",
					label: "className, not class, on the card",
					hint: "className=\"card\" — already on the starter; keep it.",
					run: (ctx) => srcHas(ctx, /className/)
				}
			]
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
			js: ""
		}
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
			"Let the component re-render itself"
		],
		youShip: "A covers counter and a room toggle",
		visual: "state-loop",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "Props come from the parent. State belongs to the component. useState(initial) returns a pair: the current value, and a setter. Calling the setter queues a re-render. You never write count = count + 1. You never write state.flag = true. You pass the next value to the setter."
			},
			{
				type: "visual",
				id: "state-loop"
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
}`
			},
			{
				type: "callout",
				kind: "rule",
				title: "The setter is a request",
				text: "setCovers(3) does not change covers on the next line. It asks React to render again with 3. If you need the previous value, pass a function: setCovers((c) => c + 1)."
			}
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
			js: ""
		},
		challenge: {
			brief: "useState for covers (number) and open (boolean). Add cover increments. Toggle open flips the boolean. The paragraph must read Open or Closed from state — not from a string you typed once.",
			checks: [
				{
					id: "usestate",
					label: "useState is called",
					hint: "const [covers, setCovers] = useState(2)",
					run: (ctx) => srcHas(ctx, /useState\s*\(/)
				},
				{
					id: "onclick",
					label: "onClick handlers",
					hint: "onClick={() => setCovers(covers + 1)}",
					run: (ctx) => srcHas(ctx, /onClick\s*=/)
				},
				{
					id: "covers",
					label: "covers is rendered",
					hint: "Put {covers} in the JSX.",
					run: (ctx) => srcHas(ctx, /\{covers\}/)
				},
				{
					id: "toggle",
					label: "A boolean is flipped",
					hint: "setOpen(!open) or setOpen((v) => !v)",
					run: (ctx) => srcHas(ctx, /set[A-Za-z]+\(\s*!/) || srcHas(ctx, /=>\s*!/)
				}
			]
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
			js: ""
		}
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
			"Add to a list immutably"
		],
		youShip: "A guest list you can add to",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "Lists: guests.map((g) => <li key={g.id}>{g.name}</li>). The key tells React which item is which when the list changes. Use the data’s id, never the index if the list can reorder. Forms: the input’s value is state, onChange updates that state. That is a controlled input. Submit reads state, then setGuests([...guests, next])."
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

<input value={name} onChange={(e) => setName(e.target.value)} />`
			},
			{
				type: "callout",
				kind: "rule",
				title: "Immutable updates",
				text: "Spread to add ([...list, item]). filter to remove. map to change one item. Never guests.push in React — push mutates, and React will not see it."
			}
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
			js: ""
		},
		challenge: {
			brief: "Control the input (value={name} onChange). On submit, add a guest immutably and clear the field. Render the list with map and key={g.id}.",
			checks: [
				{
					id: "controlled",
					label: "Input is controlled",
					hint: "value={name} and onChange={(e) => setName(e.target.value)}",
					run: (ctx) => srcHas(ctx, /value=\{name\}/) && srcHas(ctx, /onChange/)
				},
				{
					id: "map",
					label: "guests.map with a key",
					hint: "guests.map((g) => <li key={g.id}>...",
					run: (ctx) => srcHas(ctx, /guests\.map/) && srcHas(ctx, /key=\{/)
				},
				{
					id: "spread",
					label: "An immutable add",
					hint: "setGuests([...guests, { id: Date.now(), name }])",
					run: (ctx) => srcHas(ctx, /\.\.\.guests/) || srcHas(ctx, /concat\s*\(/)
				},
				{
					id: "prevent",
					label: "Form does not reload",
					hint: "e.preventDefault() in onSubmit — already started for you.",
					run: (ctx) => srcHas(ctx, /preventDefault/)
				}
			]
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
			js: ""
		}
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
			"Load a list when the component mounts"
		],
		youShip: "A board that fills itself on first paint",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "Rendering must be pure: given props and state, return the same tree. Talking to the outside world — fetch, timers, document.title — happens after paint, in useEffect. The function runs after the screen updates. The dependency array says when to run it again. [] means once, after mount."
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
}, []);`
			},
			{
				type: "callout",
				kind: "pitfall",
				title: "Do not fetch in the component body",
				text: "A fetch in the function body runs every render, which can loop. Effects are the door to the world. (In later React you will meet loaders and queries. The rule stays: keep render pure.)"
			}
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
			js: ""
		},
		challenge: {
			brief: "useEffect with an empty dependency array. Inside, setRows(SEED) and setStatus('ready'). The list should appear after the first paint, not from the initial state.",
			checks: [
				{
					id: "effect",
					label: "useEffect is called",
					hint: "useEffect(() => { ... }, [])",
					run: (ctx) => srcHas(ctx, /useEffect\s*\(/)
				},
				{
					id: "deps",
					label: "Empty dependency array",
					hint: "The second argument is [] so it runs once.",
					run: (ctx) => srcHas(ctx, /useEffect\s*\([\s\S]*?,\s*\[\s*\]\s*\)/)
				},
				{
					id: "setrows",
					label: "setRows is used in the effect",
					hint: "setRows(SEED) inside the effect.",
					run: (ctx) => srcHas(ctx, /setRows\s*\(/)
				},
				{
					id: "ready",
					label: "status becomes ready",
					hint: "setStatus('ready')",
					run: (ctx) => srcHas(ctx, /setStatus\s*\(\s*['\"]ready['\"]\s*\)/)
				}
			]
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
			js: ""
		}
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
			"Leave Kiln with a React app in your portfolio"
		],
		youShip: "Studio board — tickets, filter, add",
		mode: "react",
		blocks: [
			{
				type: "p",
				text: "This is the same ticket board you built in JavaScript, rewritten as a frontend developer would write it. State holds the tickets and the filter. An effect can seed the list. A form adds. Buttons toggle and remove. Filter is a derived value: tickets.filter(...), computed during render, never stored twice."
			},
			{
				type: "steps",
				items: [
					{
						title: "State",
						text: "tickets, draft (the input), filter ('all' | 'open' | 'done')."
					},
					{
						title: "Derived",
						text: "const visible = tickets.filter(...) based on filter."
					},
					{
						title: "Seed",
						text: "useEffect once to load two starter tickets if you want them."
					},
					{
						title: "UI",
						text: "Title, three filter buttons, form, list with Done and Remove."
					}
				]
			},
			{
				type: "callout",
				kind: "why",
				title: "You are a frontend developer",
				text: "Not because you finished a playlist. Because you can take a blank file and ship a page, a layout, a DOM app, and a React app — and you know which tool is which. That is the job."
			}
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
			js: ""
		},
		challenge: {
			brief: "Wire it. Controlled input. Submit adds immutably. Filter buttons set filter and visible is derived. Done toggles one ticket with map. Remove uses filter. This is the last check in Kiln.",
			checks: [
				{
					id: "controlled",
					label: "Draft input is controlled",
					hint: "value={draft} onChange={... setDraft}",
					run: (ctx) => srcHas(ctx, /value=\{draft\}/) && srcHas(ctx, /setDraft/)
				},
				{
					id: "add",
					label: "Submit adds with spread",
					hint: "setTickets([...tickets, { id: Date.now(), title: draft, done: false }])",
					run: (ctx) => srcHas(ctx, /setTickets\s*\(/) && srcHas(ctx, /\.\.\.tickets/)
				},
				{
					id: "filter",
					label: "A derived filter",
					hint: "tickets.filter(...) based on the filter state, assigned to visible — or used inline.",
					run: (ctx) => srcHas(ctx, /\.filter\s*\(/) && srcHas(ctx, /setFilter/)
				},
				{
					id: "toggle",
					label: "Toggle done with map",
					hint: "setTickets(tickets.map(... done: !t.done))",
					run: (ctx) => srcHas(ctx, /\.map\s*\(/) && srcHas(ctx, /done/)
				},
				{
					id: "buttons",
					label: "onClick on the filter or row buttons",
					hint: "The All / Open / Done buttons need onClick.",
					run: (ctx) => (ctx.html.match(/onClick/g) ?? []).length >= 3
				}
			]
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
			js: ""
		}
	}
];
var TRACKS = [
	{
		id: "html",
		label: "HTML",
		weeks: "Weeks 1–2",
		blurb: "Meaning. Landmarks, text, forms. A calling card with bones."
	},
	{
		id: "css",
		label: "CSS",
		weeks: "Weeks 3–4",
		blurb: "Skin. Cascade, box, type, flex, grid. A restaurant you could open."
	},
	{
		id: "js",
		label: "JavaScript",
		weeks: "Weeks 5–6",
		blurb: "Behavior. The DOM, events, data as source of truth. A ticket board."
	},
	{
		id: "react",
		label: "React",
		weeks: "Weeks 7–8",
		blurb: "Components. Props, state, lists, effects. A studio app."
	}
];
var WEEKS = [
	{
		week: 1,
		track: "html",
		title: "The document",
		hours: "5–7 hrs",
		ship: "A page, a recipe, a profile",
		blurb: "Tags, hierarchy, links. You stop treating HTML as a styling language."
	},
	{
		week: 2,
		track: "html",
		title: "The map",
		hours: "5–7 hrs",
		ship: "Calling card site",
		blurb: "Landmarks and forms. You ship a personal page with nothing but meaning."
	},
	{
		week: 3,
		track: "css",
		title: "The box",
		hours: "6–8 hrs",
		ship: "A card, an article",
		blurb: "Cascade, box model, type. Pages start to look considered."
	},
	{
		week: 4,
		track: "css",
		title: "The layout",
		hours: "6–8 hrs",
		ship: "Harbor landing",
		blurb: "Flex and grid. A restaurant page that holds at 400px and at 1000px."
	},
	{
		week: 5,
		track: "js",
		title: "The nerves",
		hours: "6–8 hrs",
		ship: "A live check, a rewritten heading",
		blurb: "Values, functions, the DOM. The page is no longer static."
	},
	{
		week: 6,
		track: "js",
		title: "The app",
		hours: "6–8 hrs",
		ship: "Ticket board",
		blurb: "Events and arrays. UI becomes a function of state — in vanilla JS."
	},
	{
		week: 7,
		track: "react",
		title: "The tree",
		hours: "6–8 hrs",
		ship: "Components with state",
		blurb: "Function components, props, useState. The ticket board’s idea, named."
	},
	{
		week: 8,
		track: "react",
		title: "The studio",
		hours: "6–8 hrs",
		ship: "Studio board",
		blurb: "Lists, forms, effects. You leave with a React app you built yourself."
	}
];
var LESSONS = [
	...htmlLessons,
	...cssLessons,
	...jsLessons,
	...reactLessons
];
var PROJECT_IDS = [
	"html-project",
	"css-project",
	"js-project",
	"react-project"
];
function getLesson(id) {
	return LESSONS.find((l) => l.id === id);
}
function getLessonIndex(id) {
	return LESSONS.findIndex((l) => l.id === id);
}
function getAdjacent(id) {
	const i = getLessonIndex(id);
	return {
		prev: i > 0 ? LESSONS[i - 1] : void 0,
		next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : void 0
	};
}
function isProject(id) {
	return PROJECT_IDS.includes(id);
}
var TRACK_LABEL = {
	html: "HTML",
	css: "CSS",
	js: "JavaScript",
	react: "React"
};
var KEY = "kiln-progress-v1";
function readSnapshot() {
	if (typeof window === "undefined") return {
		completed: [],
		drafts: {},
		lastId: null
	};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {
			completed: [],
			drafts: {},
			lastId: null
		};
		const parsed = JSON.parse(raw);
		return {
			completed: Array.isArray(parsed.completed) ? parsed.completed : [],
			drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
			lastId: typeof parsed.lastId === "string" ? parsed.lastId : null
		};
	} catch {
		return {
			completed: [],
			drafts: {},
			lastId: null
		};
	}
}
function writeSnapshot(state) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify({
		completed: state.completed,
		drafts: state.drafts,
		lastId: state.lastId
	}));
}
var useProgress = create((set, get) => ({
	hydrated: false,
	completed: [],
	drafts: {},
	lastId: null,
	hydrate: () => {
		set({
			...readSnapshot(),
			hydrated: true
		});
	},
	markComplete: (id) => {
		const { completed, drafts, lastId } = get();
		const next = completed.includes(id) ? completed : [...completed, id];
		writeSnapshot({
			completed: next,
			drafts,
			lastId: id
		});
		set({
			completed: next,
			lastId: id
		});
	},
	saveDraft: (id, files) => {
		const { completed, drafts, lastId } = get();
		const nextDrafts = {
			...drafts,
			[id]: files
		};
		writeSnapshot({
			completed,
			drafts: nextDrafts,
			lastId
		});
		set({ drafts: nextDrafts });
	},
	setLast: (id) => {
		const { completed, drafts } = get();
		writeSnapshot({
			completed,
			drafts,
			lastId: id
		});
		set({ lastId: id });
	},
	resetAll: () => {
		const snap = {
			completed: [],
			drafts: {},
			lastId: null
		};
		writeSnapshot(snap);
		set(snap);
	}
}));
var NAV = [
	{
		to: "/path",
		label: "Path"
	},
	{
		to: "/projects",
		label: "Projects"
	},
	{
		to: "/playground",
		label: "Playground"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const completed = useProgress((s) => s.completed);
	const lastId = useProgress((s) => s.lastId);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	const continueId = lastId && LESSONS.some((l) => l.id === lastId) ? lastId : LESSONS[0].id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:h-16 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KilnMark, { className: "size-7 text-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-xl tracking-tight",
						children: "Kiln"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-4 hidden items-center gap-1 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("flex h-11 items-center px-3 text-sm", pathname === item.to ? "text-fg" : "text-muted hover:text-fg"),
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden font-mono text-xs tabular-nums text-muted sm:block",
							children: [
								completed.length,
								"/",
								LESSONS.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "default",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lesson/$id",
								params: { id: continueId },
								children: completed.length ? "Continue" : "Begin"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Kiln" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "mt-8 flex flex-col gap-1",
									children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: item.to,
										className: "flex h-12 items-center text-base text-fg",
										children: item.label
									}, item.to))
								})]
							})]
						})
					]
				})
			]
		})
	});
}
var styles_default = "/assets/styles-DZIAUm54.css";
var APP_NAME = "Kiln";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Kiln is an 8-week project-based frontend workshop. HTML, CSS, JavaScript, then React — by shipping websites, not watching tutorials."
			},
			{
				name: "theme-color",
				content: "#0c0d0c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	const hydrate = useProgress((s) => s.hydrate);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$4 = () => import("./routes-BnmoKIFw.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./path-DocTNost.mjs");
var Route$3 = createFileRoute("/path")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./playground-DiIaHy-9.mjs");
var Route$2 = createFileRoute("/playground")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./projects-C9p79tTA.mjs");
var Route$1 = createFileRoute("/projects")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_id-ehYz4xNv.mjs");
var Route = createFileRoute("/lesson/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$4.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	PathRoute: Route$3.update({
		id: "/path",
		path: "/path",
		getParentRoute: () => Route$5
	}),
	PlaygroundRoute: Route$2.update({
		id: "/playground",
		path: "/playground",
		getParentRoute: () => Route$5
	}),
	ProjectsRoute: Route$1.update({
		id: "/projects",
		path: "/projects",
		getParentRoute: () => Route$5
	}),
	LessonIdRoute: Route.update({
		id: "/lesson/$id",
		path: "/lesson/$id",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { PROJECT_IDS as a, WEEKS as c, isProject as d, makeCtx as f, LESSONS as i, getAdjacent as l, cn as m, Route as n, TRACKS as o, Button as p, useProgress as r, TRACK_LABEL as s, router_exports as t, getLesson as u };
