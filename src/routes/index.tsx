import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SandboxEditor } from "@/components/sandbox-editor";
import { LESSONS, TRACKS, WEEKS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress-store";
import type { Files } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const DEMO: Files = {
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
  js: "",
};

function Home() {
  const completed = useProgress((s) => s.completed);
  const lastId = useProgress((s) => s.lastId);
  const continueId =
    lastId && LESSONS.some((l) => l.id === lastId) ? lastId : LESSONS[0].id;
  const [demo, setDemo] = useState<Files>(DEMO);

  const doneWeeks = useMemo(() => {
    const set = new Set(completed);
    return WEEKS.filter((w) =>
      LESSONS.filter((l) => l.week === w.week).every((l) => set.has(l.id)),
    ).length;
  }, [completed]);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
          Eight-week frontend workshop
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none tracking-tight text-fg sm:text-6xl">
          Stop watching tutorials. Start shipping websites.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
          You already have the playlists. Kiln is the other path: twenty-four lessons, four
          projects, HTML then CSS then JavaScript then React. Every session ends with a page you
          built — sitting in a browser, not in a bookmark folder.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/lesson/$id" params={{ id: continueId }}>
              {completed.length ? "Continue the path" : "Begin week one"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/path">See the eight weeks</Link>
          </Button>
        </div>
        <p className="mt-5 font-mono text-xs tabular-nums text-subtle">
          {completed.length}/{LESSONS.length} lessons · {doneWeeks}/8 weeks shipped
        </p>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t, i) => (
            <Link
              key={t.id}
              to="/path"
              className={cn(
                "group px-4 py-8 sm:px-6",
                i !== 0 && "border-t border-line sm:border-t-0 sm:border-l",
              )}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                {t.weeks}
              </p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-fg">{t.label}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
              Lesson one, live
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">Type. The page answers.</h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted">
              Every lesson is a brief on the left and this bench on the right. Change the heading.
              Break the CSS. There is no video to pause. The preview is the teacher.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              { n: "01", t: "Read a short brief", d: "One idea, stated plainly. A lab when the idea is visual." },
              { n: "02", t: "Change the code", d: "Starter files, not a blank editor. You ship by editing." },
              { n: "03", t: "Check the work", d: "A list of truths the page must satisfy. Then the next lesson." },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-mono text-xs text-accent">{s.n}</span>
                <div>
                  <p className="text-sm font-medium text-fg">{s.t}</p>
                  <p className="text-sm text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 h-[32rem]">
          <SandboxEditor files={demo} onChange={setDemo} mode="web" className="h-full" />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl tracking-tight">Eight weeks. Four ships.</h2>
            <Link to="/path" className="hidden text-sm text-muted hover:text-fg sm:inline">
              Full syllabus
            </Link>
          </div>
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {WEEKS.map((w) => (
              <li key={w.week} className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-4 sm:grid-cols-[4rem_10rem_1fr_auto]">
                <span className="font-mono text-xs tabular-nums text-accent">
                  W{String(w.week).padStart(2, "0")}
                </span>
                <span className="hidden font-medium text-fg sm:inline">{w.title}</span>
                <span className="text-sm text-muted">
                  <span className="font-medium text-fg sm:hidden">{w.title} · </span>
                  {w.ship}
                </span>
                <span className="font-mono text-[11px] text-subtle">{w.hours}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
          A frontend developer is someone who can open a blank file and leave a website.
        </h2>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-muted">
          Kiln will not get you a job offer by Friday. It will take you from “I watched a React
          video” to “I can build Harbor, a ticket board, and a studio app.” That is the actual
          skill.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/lesson/$id" params={{ id: continueId }}>
            Open the bench
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
