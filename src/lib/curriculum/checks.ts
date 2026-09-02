import type { CheckContext, Files } from "./types";

export function parseHtml(html: string): Document {
  return new DOMParser().parseFromString(html || "<div></div>", "text/html");
}

export function makeCtx(files: Files): CheckContext {
  return {
    html: files.html,
    css: files.css,
    js: files.js,
    doc: parseHtml(files.html),
  };
}

export function hasTag(ctx: CheckContext, tag: string, min = 1): boolean {
  return ctx.doc.getElementsByTagName(tag).length >= min;
}

export function hasAttr(ctx: CheckContext, selector: string, attr: string, minLen = 1): boolean {
  const el = ctx.doc.querySelector(selector);
  if (!el) return false;
  const v = el.getAttribute(attr);
  return v !== null && v.trim().length >= minLen;
}

export function textOf(ctx: CheckContext, selector: string): string {
  return (ctx.doc.querySelector(selector)?.textContent ?? "").trim();
}

export function htmlHas(ctx: CheckContext, re: RegExp): boolean {
  return re.test(ctx.html);
}

export function cssHas(ctx: CheckContext, re: RegExp): boolean {
  return re.test(ctx.css) || re.test(ctx.html);
}

export function jsHas(ctx: CheckContext, re: RegExp): boolean {
  return re.test(ctx.js) || re.test(ctx.html);
}

export function countTags(ctx: CheckContext, tag: string): number {
  return ctx.doc.getElementsByTagName(tag).length;
}
