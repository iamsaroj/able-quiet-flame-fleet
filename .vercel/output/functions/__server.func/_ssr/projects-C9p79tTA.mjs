import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Check, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as PROJECT_IDS, p as Button, r as useProgress, s as TRACK_LABEL, u as getLesson } from "./router-2K7q0tXG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-C9p79tTA.js
var import_jsx_runtime = require_jsx_runtime();
var COPY = {
	"html-project": {
		name: "Calling card",
		pitch: "A personal page with landmarks, a work list, and a real form. Structure before skin."
	},
	"css-project": {
		name: "Harbor",
		pitch: "A restaurant landing: flex header, type system, wrapping menu grid. Portfolio piece one."
	},
	"js-project": {
		name: "Ticket board",
		pitch: "Add, toggle, delete. An array is the source of truth. Most “apps” are this shape."
	},
	"react-project": {
		name: "Studio board",
		pitch: "The ticket board, rewritten in React: filter, form, immutable updates. You are a frontend developer."
	}
};
function ProjectsPage() {
	const completed = useProgress((s) => s.completed);
	const done = new Set(completed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-[0.22em] text-subtle",
				children: "Portfolio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl tracking-tight sm:text-5xl",
				children: "Four ships"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-[15px] leading-7 text-muted",
				children: "These are the weeks you show someone. Each one is a complete lesson with a brief, a bench, and a solution if you get stuck. Do them in order if you can."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 grid gap-4 sm:grid-cols-2",
				children: PROJECT_IDS.map((pid, i) => {
					const lesson = getLesson(pid);
					if (!lesson) return null;
					const meta = COPY[pid];
					const isDone = done.has(pid);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent",
									children: [
										"0",
										i + 1,
										" · ",
										TRACK_LABEL[lesson.track]
									]
								}), isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 font-mono text-[11px] text-ok",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Shipped"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-subtle",
									children: ["Week ", lesson.week]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-serif text-3xl tracking-tight",
								children: meta.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 flex-1 text-sm leading-6 text-muted",
								children: meta.pitch
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6 self-start",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/lesson/$id",
									params: { id: pid },
									children: ["Open the bench", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						]
					}, pid);
				})
			})
		]
	});
}
//#endregion
export { ProjectsPage as component };
