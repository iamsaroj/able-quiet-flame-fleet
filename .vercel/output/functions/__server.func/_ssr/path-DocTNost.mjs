import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Check } from "../_libs/lucide-react.mjs";
import { c as WEEKS, d as isProject, i as LESSONS, m as cn, p as Button, r as useProgress, s as TRACK_LABEL } from "./router-2K7q0tXG.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-DocTNost.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-1 w-full overflow-hidden rounded-full bg-raised", className),
	value,
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full bg-accent transition-transform duration-500 ease-out",
		style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
	})
}));
Progress.displayName = "Progress";
function PathPage() {
	const completed = useProgress((s) => s.completed);
	const done = new Set(completed);
	const pct = Math.round(completed.length / LESSONS.length * 100);
	const allDone = completed.length === LESSONS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-[0.22em] text-subtle",
				children: "Syllabus"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl tracking-tight sm:text-5xl",
				children: "The eight weeks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-[15px] leading-7 text-muted",
				children: "Linear on purpose. Jump around if you want — nothing is locked — but the path is written so each ship uses yesterday’s tools."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: pct,
					className: "flex-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs tabular-nums text-muted",
					children: [
						completed.length,
						"/",
						LESSONS.length
					]
				})]
			}),
			allDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-8 rounded-lg bg-raised px-5 py-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl text-fg",
						children: "You shipped the path."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: "Calling card. Harbor. Ticket board. Studio board. That is a portfolio, not a certificate. Open the projects and pick the next site yourself."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projects",
							children: "See what you built"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 space-y-12",
				children: WEEKS.map((week) => {
					const items = LESSONS.filter((l) => l.week === week.week);
					const weekDone = items.filter((l) => done.has(l.id)).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent",
								children: [
									"Week ",
									week.week,
									" · ",
									TRACK_LABEL[week.track]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-serif text-3xl tracking-tight",
								children: week.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: week.blurb
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs tabular-nums text-subtle",
							children: [
								weekDone,
								"/",
								items.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line border-y border-line",
						children: items.map((lesson) => {
							const isDone = done.has(lesson.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lesson/$id",
								params: { id: lesson.id },
								className: "flex items-center gap-3 py-3.5 hover:bg-raised/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex size-7 shrink-0 items-center justify-center rounded-full", isDone ? "bg-accent text-accent-fg" : "bg-raised text-subtle"),
										children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] tabular-nums",
											children: lesson.order
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm text-fg",
											children: lesson.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs text-muted",
											children: lesson.subtitle
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-subtle",
										children: isProject(lesson.id) ? "Project" : `${lesson.minutes}m`
									})
								]
							}) }, lesson.id);
						})
					})] }, week.week);
				})
			})
		]
	});
}
//#endregion
export { PathPage as component };
