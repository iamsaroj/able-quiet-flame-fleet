import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as Lightbulb, c as Check, d as ArrowLeft, l as Bookmark, o as Copy, r as RotateCcw, s as CircleAlert, u as ArrowRight } from "./_libs/lucide-react.mjs";
import { f as makeCtx, i as LESSONS, l as getAdjacent, m as cn, n as Route, p as Button, r as useProgress, s as TRACK_LABEL, u as getLesson } from "./_ssr/router-2K7q0tXG.mjs";
import { t as SandboxEditor } from "./_ssr/sandbox-editor-D-83HL6y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-ehYz4xNv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CodeBlock({ code, lang, caption }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-md bg-inset shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px] uppercase tracking-wide text-subtle",
					children: lang
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-9 items-center justify-center rounded-sm text-muted hover:text-fg",
					onClick: async () => {
						await navigator.clipboard.writeText(code);
						setCopied(true);
						window.setTimeout(() => setCopied(false), 1200);
					},
					"aria-label": "Copy code",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: cn("overflow-x-auto p-3 font-mono text-[12px] leading-5 text-fg"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
			}),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "border-t border-line px-3 py-2 text-xs text-muted",
				children: caption
			}) : null
		]
	});
}
var PARTS = [
	{
		id: "open",
		label: "Opening tag",
		sample: "<h1>",
		note: "The name of the element. Attributes live here."
	},
	{
		id: "content",
		label: "Content",
		sample: "Harbor",
		note: "What the visitor reads. Can be text or nested tags."
	},
	{
		id: "close",
		label: "Closing tag",
		sample: "</h1>",
		note: "Same name, with a slash. Turns the element off."
	}
];
function TagAnatomy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Anatomy of a tag"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1 font-mono text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm bg-raised px-2 py-1 text-accent",
						children: PARTS[0].sample
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm bg-paper px-2 py-1 text-paper-fg",
						children: PARTS[1].sample
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm bg-raised px-2 py-1 text-accent",
						children: PARTS[2].sample
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 space-y-2",
				children: PARTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-subtle",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: p.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: p.note
						})
					]
				}, p.id))
			})
		]
	});
}
function Stepper({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-9 items-center justify-center rounded-sm bg-raised text-fg hover:bg-line-strong",
					onClick: () => onChange(Math.max(0, value - 4)),
					"aria-label": `Decrease ${label}`,
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-10 text-center font-mono text-sm tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex size-9 items-center justify-center rounded-sm bg-raised text-fg hover:bg-line-strong",
					onClick: () => onChange(Math.min(48, value + 4)),
					"aria-label": `Increase ${label}`,
					children: "+"
				})
			]
		})]
	});
}
function BoxModelLab() {
	const [margin, setMargin] = (0, import_react.useState)(16);
	const [padding, setPadding] = (0, import_react.useState)(16);
	const [border, setBorder] = (0, import_react.useState)(4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
			children: "Box model — drag the layers"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 sm:grid-cols-[1fr_11rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-faint/40",
					style: { padding: margin },
					title: "margin",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-muted/40",
						style: { padding: border },
						title: "border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-accent/30",
							style: { padding },
							title: "padding",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-paper px-4 py-3 text-center font-mono text-xs text-paper-fg",
								children: "content"
							})
						})
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						label: "Margin",
						value: margin,
						onChange: setMargin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						label: "Border",
						value: border,
						onChange: setBorder
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
						label: "Padding",
						value: padding,
						onChange: setPadding
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							"Width with ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "border-box"
							}),
							" stays put. Margin still sits outside."
						]
					})
				]
			})]
		})]
	});
}
var JUSTIFY = [
	"flex-start",
	"center",
	"space-between",
	"space-around"
];
var ALIGN = [
	"stretch",
	"center",
	"flex-end"
];
function FlexLab() {
	const [justify, setJustify] = (0, import_react.useState)("space-between");
	const [align, setAlign] = (0, import_react.useState)("center");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Flex — one axis"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-28 rounded-md bg-bg px-2 py-2 shadow-[var(--shadow-border)]",
				style: {
					justifyContent: justify,
					alignItems: align,
					gap: 8
				},
				children: [
					1,
					2,
					3
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-10 items-center justify-center rounded-sm bg-accent font-mono text-xs text-accent-fg",
					style: { height: n === 2 ? 40 : 28 },
					children: n
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: JUSTIFY.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setJustify(j),
					className: cn("h-9 rounded-sm px-2.5 font-mono text-[11px]", justify === j ? "bg-paper text-paper-fg" : "bg-raised text-muted hover:text-fg"),
					children: j
				}, j))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: ALIGN.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setAlign(a),
					className: cn("h-9 rounded-sm px-2.5 font-mono text-[11px]", align === a ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
					children: a
				}, a))
			})
		]
	});
}
function GridLab() {
	const [cols, setCols] = (0, import_react.useState)(3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Grid — two axes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` },
				children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 items-center justify-center rounded-sm bg-raised font-mono text-xs text-muted",
					children: i + 1
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2",
				children: [
					1,
					2,
					3
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCols(n),
					className: cn("h-9 rounded-sm px-3 font-mono text-[11px]", cols === n ? "bg-paper text-paper-fg" : "bg-raised text-muted hover:text-fg"),
					children: [
						n,
						" col",
						n > 1 ? "s" : ""
					]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-[11px] text-subtle",
				children: [
					"grid-template-columns: repeat(",
					cols,
					", 1fr)"
				]
			})
		]
	});
}
var LAYERS = [
	{
		spec: "0-0-1",
		sel: "p",
		note: "Element. Default type."
	},
	{
		spec: "0-1-0",
		sel: ".lead",
		note: "Class. Everyday tool."
	},
	{
		spec: "0-1-1",
		sel: "article p",
		note: "Element + ancestor."
	},
	{
		spec: "1-0-0",
		sel: "#hero",
		note: "ID. Too specific — skip."
	}
];
function Cascade() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "Specificity — who wins"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: LAYERS.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-md bg-raised px-3 py-2",
					style: { marginLeft: i * 8 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-12 font-mono text-[11px] tabular-nums text-accent",
							children: l.spec
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-fg",
							children: l.sel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-xs text-muted",
							children: l.note
						})
					]
				}, l.sel))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: "When two rules match, the higher tuple wins. Then source order. Avoid the last row."
			})
		]
	});
}
function DomTalk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "The tree the browser built"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
				className: "font-mono text-xs leading-6 text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "document"
					}),
					"\n",
					"└─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "html"
					}),
					"\n",
					"\xA0\xA0\xA0├─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "head"
					}),
					"\n",
					"\xA0\xA0\xA0└─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "body"
					}),
					"\n",
					"\xA0\xA0\xA0\xA0\xA0\xA0└─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "main"
					}),
					"\n",
					"\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0├─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "h1"
					}),
					"  ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "“Closed”"
					}),
					"\n",
					"\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0└─ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: "p"
					}),
					"   ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "querySelector finds these"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: "JavaScript does not edit the file. It walks this tree and mutates nodes."
			})
		]
	});
}
var STEPS = [
	{
		n: "01",
		t: "Event",
		d: "Click. onClick fires."
	},
	{
		n: "02",
		t: "Setter",
		d: "setCount(count + 1). A request, not an assignment."
	},
	{
		n: "03",
		t: "Render",
		d: "The function runs again with the new state."
	},
	{
		n: "04",
		t: "Commit",
		d: "React writes the new tree to the DOM."
	}
];
function StateLoop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
			children: "The render loop"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-2 sm:grid-cols-2",
			children: STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-md bg-raised px-3 py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-accent",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: s.d
					})
				]
			}, s.n))
		})]
	});
}
function ComponentTree() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "rounded-lg bg-inset p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
				children: "A page is a tree of functions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-1.5 font-mono text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-accent",
						children: "App()"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "pl-4 text-fg",
						children: "Header()"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "pl-8 text-muted",
						children: "<p>Harbor</p>"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "pl-4 text-fg",
						children: "Main()"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "pl-8 text-muted",
						children: "<h1/>"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "pl-4 text-fg",
						children: "Footer()"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: "Each function returns a description. React turns the description into DOM."
			})
		]
	});
}
function LessonVisual({ id }) {
	switch (id) {
		case "tag-anatomy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagAnatomy, {});
		case "box-model": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxModelLab, {});
		case "flex-lab": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlexLab, {});
		case "grid-lab": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GridLab, {});
		case "cascade": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cascade, {});
		case "dom-talk": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DomTalk, {});
		case "state-loop": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateLoop, {});
		case "component-tree": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentTree, {});
	}
}
var CALLOUT = {
	rule: {
		icon: Bookmark,
		label: "Rule",
		className: "border-accent/30"
	},
	pitfall: {
		icon: CircleAlert,
		label: "Pitfall",
		className: "border-danger/40"
	},
	why: {
		icon: Lightbulb,
		label: "Why",
		className: "border-line-strong"
	}
};
function LessonBlocks({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: blocks.map((block, i) => {
			if (block.type === "p") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[15px] leading-7 text-fg/90",
				children: block.text
			}, i);
			if (block.type === "h") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-2xl tracking-tight text-fg",
				children: block.text
			}, i);
			if (block.type === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 pl-0",
				children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-[15px] leading-6 text-fg/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2.5 size-1 shrink-0 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			}, i);
			if (block.type === "code") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				code: block.code,
				lang: block.lang,
				caption: block.caption
			}, i);
			if (block.type === "callout") {
				const meta = CALLOUT[block.kind];
				const Icon = meta.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("rounded-md border bg-raised/60 px-4 py-3", meta.className),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-1 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), meta.label]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-fg",
							children: block.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-muted",
							children: block.text
						})
					]
				}, i);
			}
			if (block.type === "visual") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonVisual, { id: block.id }, i);
			if (block.type === "steps") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: block.items.map((step, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_1fr] gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs tabular-nums text-accent",
						children: String(n + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-fg",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-6 text-muted",
						children: step.text
					})] })]
				}, step.title))
			}, i);
			return null;
		})
	});
}
function LessonPage() {
	const { id } = Route.useParams();
	if (!getLesson(id)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-3xl",
			children: "That lesson is not on the path."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/path",
				children: "Back to the syllabus"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBench, { id });
}
function LessonBench({ id }) {
	const lesson = getLesson(id);
	const { prev, next } = getAdjacent(id);
	const saveDraft = useProgress((s) => s.saveDraft);
	const markComplete = useProgress((s) => s.markComplete);
	const setLast = useProgress((s) => s.setLast);
	const drafts = useProgress((s) => s.drafts);
	const isDone = useProgress((s) => s.completed).includes(id);
	const [files, setFiles] = (0, import_react.useState)(drafts[id] ?? lesson.files);
	const [pane, setPane] = (0, import_react.useState)("learn");
	const [showSolution, setShowSolution] = (0, import_react.useState)(false);
	const [checked, setChecked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setFiles(useProgress.getState().drafts[id] ?? lesson.files);
		setShowSolution(false);
		setChecked(false);
		setPane("learn");
		setLast(id);
	}, [
		id,
		lesson.files,
		setLast
	]);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => saveDraft(id, files), 450);
		return () => window.clearTimeout(t);
	}, [
		files,
		id,
		saveDraft
	]);
	const results = (0, import_react.useMemo)(() => {
		const ctx = makeCtx(files);
		return lesson.challenge.checks.map((c) => ({
			...c,
			pass: (() => {
				try {
					return c.run(ctx);
				} catch {
					return false;
				}
			})()
		}));
	}, [files, lesson.challenge.checks]);
	const passed = results.filter((r) => r.pass).length;
	const allPass = passed === results.length && results.length > 0;
	function completeAndNext() {
		markComplete(id);
		if (next) navigate({
			to: "/lesson/$id",
			params: { id: next.id }
		});
		else navigate({ to: "/path" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-[1400px] flex-col lg:h-[calc(100dvh-4rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-3 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] uppercase tracking-[0.16em] text-accent",
						children: [
							"Week ",
							lesson.week,
							" · ",
							TRACK_LABEL[lesson.track],
							isDone ? " · Done" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-subtle sm:inline",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] tabular-nums text-subtle",
						children: [
							lesson.order,
							"/",
							LESSONS.length,
							" · ",
							lesson.minutes,
							"m"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lesson/$id",
								params: { id: prev.id },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Prev"
								})]
							})
						}) : null, next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lesson/$id",
								params: { id: next.id },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Next"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex border-b border-line lg:hidden",
				children: ["learn", "build"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPane(p),
					className: cn("h-12 flex-1 text-sm font-medium capitalize", pane === p ? "text-fg" : "text-muted"),
					children: p
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: cn("min-h-0 overflow-y-auto px-4 py-6 sm:px-6", pane === "build" ? "hidden lg:block" : "block"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-3xl tracking-tight sm:text-4xl",
							children: lesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: lesson.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-fg",
							children: ["You ship: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: lesson.youShip
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1",
							children: lesson.youWill.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1 shrink-0 rounded-full bg-faint" }), w]
							}, w))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBlocks, { blocks: lesson.blocks })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 rounded-lg bg-raised px-4 py-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium text-fg",
									children: "The work"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-6 text-muted",
									children: lesson.challenge.brief
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-4 space-y-2",
									children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", r.pass ? "bg-ok/20 text-ok" : "bg-inset text-subtle"),
											children: r.pass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-faint" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: r.pass ? "text-fg" : "text-muted",
											children: r.label
										}), !r.pass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-subtle",
											children: r.hint
										}) : null] })]
									}, r.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 font-mono text-[11px] tabular-nums text-subtle",
									children: [
										passed,
										"/",
										results.length,
										" checks"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										disabled: !allPass && !isDone,
										onClick: completeAndNext,
										children: next ? "Complete & next" : "Complete the path"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => {
											markComplete(id);
											setChecked(true);
										},
										children: "Mark done anyway"
									})]
								}),
								checked && !allPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-subtle",
									children: "Recorded. Come back and finish the checks when you want."
								}) : null
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: cn("flex min-h-0 flex-col border-line lg:border-l", pane === "learn" ? "hidden lg:flex" : "flex"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 border-b border-line px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] uppercase tracking-wide text-subtle",
								children: "Bench"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setFiles(lesson.files),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setShowSolution((v) => !v),
									children: showSolution ? "Hide solution" : "Show solution"
								})]
							})]
						}),
						showSolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-line bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs text-muted",
								children: "A finished version. Copy it only after you have tried — this is a workshop, not an answer key class."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setFiles(lesson.solution),
								children: "Load solution onto the bench"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandboxEditor, {
							files,
							onChange: setFiles,
							mode: lesson.mode,
							className: "min-h-[28rem] flex-1 rounded-none shadow-none"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LessonPage as component };
