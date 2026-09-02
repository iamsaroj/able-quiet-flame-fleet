import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as WEEKS, i as LESSONS, m as cn, o as TRACKS, p as Button, r as useProgress } from "./router-2K7q0tXG.mjs";
import { t as SandboxEditor } from "./sandbox-editor-D-83HL6y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BnmoKIFw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMO = {
	html: `<h1>Harbor</h1>
<p>Supper on the river.</p>`,
	css: `body {
  margin: 0;
  min-height: 100%;
  padding: 2rem;
  font-family: Georgia, serif;
  background: #1c1b18;
  color: #f4f1ea;
}
h1 { font-size: 2.4rem; font-weight: 500; margin: 0 0 8px; }
p { margin: 0; color: #c5cec4; }`,
	js: ""
};
function Home() {
	const completed = useProgress((s) => s.completed);
	const lastId = useProgress((s) => s.lastId);
	const continueId = lastId && LESSONS.some((l) => l.id === lastId) ? lastId : LESSONS[0].id;
	const [demo, setDemo] = (0, import_react.useState)(DEMO);
	const doneWeeks = (0, import_react.useMemo)(() => {
		const set = new Set(completed);
		return WEEKS.filter((w) => LESSONS.filter((l) => l.week === w.week).every((l) => set.has(l.id))).length;
	}, [completed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.22em] text-subtle",
					children: "Eight-week frontend workshop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl font-serif text-5xl leading-none tracking-tight text-fg sm:text-6xl",
					children: "Stop watching tutorials. Start shipping websites."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg",
					children: "You already have the playlists. Kiln is the other path: twenty-four lessons, four projects, HTML then CSS then JavaScript then React. Every session ends with a page you built — sitting in a browser, not in a bookmark folder."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lesson/$id",
							params: { id: continueId },
							children: [completed.length ? "Continue the path" : "Begin week one", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/path",
							children: "See the eight weeks"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 font-mono text-xs tabular-nums text-subtle",
					children: [
						completed.length,
						"/",
						LESSONS.length,
						" lessons · ",
						doneWeeks,
						"/8 weeks shipped"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4",
				children: TRACKS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/path",
					className: cn("group px-4 py-8 sm:px-6", i !== 0 && "border-t border-line sm:border-t-0 sm:border-l"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] uppercase tracking-[0.16em] text-subtle",
							children: t.weeks
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl tracking-tight text-fg",
							children: t.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted",
							children: t.blurb
						})
					]
				}, t.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2 lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.22em] text-subtle",
						children: "Lesson one, live"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl tracking-tight",
						children: "Type. The page answers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-[15px] leading-7 text-muted",
						children: "Every lesson is a brief on the left and this bench on the right. Change the heading. Break the CSS. There is no video to pause. The preview is the teacher."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-4",
					children: [
						{
							n: "01",
							t: "Read a short brief",
							d: "One idea, stated plainly. A lab when the idea is visual."
						},
						{
							n: "02",
							t: "Change the code",
							d: "Starter files, not a blank editor. You ship by editing."
						},
						{
							n: "03",
							t: "Check the work",
							d: "A list of truths the page must satisfy. Then the next lesson."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[auto_1fr] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-accent",
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: s.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: s.d
						})] })]
					}, s.n))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 h-[32rem]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandboxEditor, {
					files: demo,
					onChange: setDemo,
					mode: "web",
					className: "h-full"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-4xl tracking-tight",
						children: "Eight weeks. Four ships."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/path",
						className: "hidden text-sm text-muted hover:text-fg sm:inline",
						children: "Full syllabus"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-8 divide-y divide-line border-y border-line",
					children: WEEKS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[4rem_10rem_1fr_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-accent",
								children: ["W", String(w.week).padStart(2, "0")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden font-medium text-fg sm:inline",
								children: w.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium text-fg sm:hidden",
									children: [w.title, " · "]
								}), w.ship]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-subtle",
								children: w.hours
							})
						]
					}, w.week))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl",
					children: "A frontend developer is someone who can open a blank file and leave a website."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-[15px] leading-7 text-muted",
					children: "Kiln will not get you a job offer by Friday. It will take you from “I watched a React video” to “I can build Harbor, a ticket board, and a studio app.” That is the actual skill."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/lesson/$id",
						params: { id: continueId },
						children: ["Open the bench", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
