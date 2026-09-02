import { transform } from "sucrase";
import { MINI_REACT_SRC } from "@/lib/mini-react";
import type { Files } from "@/lib/curriculum/types";

function escapeScript(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script");
}

function injectIntoDocument(html: string, css: string, js: string): string {
  const cssBlock = css.trim() ? `<style>\n${css}\n</style>` : "";
  const jsBlock = js.trim()
    ? `<script>\ntry {\n${escapeScript(js)}\n} catch (err) {\n  document.body.insertAdjacentHTML("afterbegin", "<pre style='color:#8b2e24;padding:12px;font:12px/1.5 ui-monospace,monospace'>"+String(err)+"</pre>");\n}\n<\/script>`
    : "";
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

export function buildWebSrcdoc(files: Files): string {
  const { html, css, js } = files;
  if (/<html/i.test(html)) {
    return injectIntoDocument(html, css, js);
  }
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
${
  js.trim()
    ? `<script>\ntry {\n${escapeScript(js)}\n} catch (err) {\n  document.body.insertAdjacentHTML("afterbegin", "<pre style='color:#8b2e24;padding:12px;font:12px/1.5 ui-monospace,monospace'>"+String(err)+"</pre>");\n}\n<\/script>`
    : ""
}
</body>
</html>`;
}

export function compileJsx(source: string): { code: string; error: string | null } {
  try {
    const result = transform(source, {
      transforms: ["jsx"],
      jsxRuntime: "classic",
      jsxPragma: "MiniReact.createElement",
      jsxFragmentPragma: "MiniReact.Fragment",
      production: true,
    });
    return { code: result.code, error: null };
  } catch (err) {
    return { code: "", error: err instanceof Error ? err.message : String(err) };
  }
}

export function buildReactSrcdoc(files: Files): string {
  const source = files.html.trim();
  const { code, error } = compileJsx(source);
  const compiled = error
    ? `document.getElementById("root").innerHTML = ${JSON.stringify(
        `<pre style="color:#8b2e24;padding:16px;white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace">${error}</pre>`,
      )}`
    : `${code}
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

export function buildSrcdoc(mode: "web" | "react", files: Files): string {
  return mode === "react" ? buildReactSrcdoc(files) : buildWebSrcdoc(files);
}
