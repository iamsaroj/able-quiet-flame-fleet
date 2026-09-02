import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { KilnMark } from "@/components/kiln-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LESSONS } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/path", label: "Path" },
  { to: "/projects", label: "Projects" },
  { to: "/playground", label: "Playground" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const completed = useProgress((s) => s.completed);
  const lastId = useProgress((s) => s.lastId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const continueId =
    lastId && LESSONS.some((l) => l.id === lastId) ? lastId : LESSONS[0].id;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-fg">
          <KilnMark className="size-7 text-fg" />
          <span className="font-serif text-xl tracking-tight">Kiln</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex h-11 items-center px-3 text-sm",
                pathname === item.to ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <p className="hidden font-mono text-xs tabular-nums text-muted sm:block">
            {completed.length}/{LESSONS.length}
          </p>
          <Button asChild size="sm" variant="default">
            <Link to="/lesson/$id" params={{ id: continueId }}>
              {completed.length ? "Continue" : "Begin"}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Kiln</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex h-12 items-center text-base text-fg"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
