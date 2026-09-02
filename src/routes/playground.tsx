import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SandboxEditor } from "@/components/sandbox-editor";
import { Button } from "@/components/ui/button";
import type { Files } from "@/lib/curriculum/types";

export const Route = createFileRoute("/playground")({ component: Playground });

const WEB: Files = {
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
  js: `// document.querySelector("h1").textContent = "Open";`,
};

const REACT: Files = {
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
  js: "",
};

function Playground() {
  const [mode, setMode] = useState<"web" | "react">("web");
  const [web, setWeb] = useState<Files>(WEB);
  const [react, setReact] = useState<Files>(REACT);
  const files = mode === "web" ? web : react;
  const setFiles = mode === "web" ? setWeb : setReact;

  return (
    <main className="mx-auto flex max-w-[1400px] flex-col lg:h-[calc(100dvh-4rem)]">
      <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
        <div>
          <h1 className="font-serif text-3xl tracking-tight">Playground</h1>
          <p className="text-sm text-muted">No brief. No checks. Same bench as the lessons.</p>
        </div>
        <div className="ml-auto flex gap-2">
          {(["web", "react"] as const).map((m) => (
            <Button
              key={m}
              size="sm"
              variant={mode === m ? "default" : "outline"}
              onClick={() => setMode(m)}
            >
              {m === "web" ? "HTML / CSS / JS" : "React"}
            </Button>
          ))}
        </div>
      </div>
      <SandboxEditor
        files={files}
        onChange={setFiles}
        mode={mode}
        className="min-h-[32rem] flex-1 rounded-none lg:rounded-lg lg:mx-6 lg:mb-6"
      />
    </main>
  );
}
