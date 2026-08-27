import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Mark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/directory", label: "Parties" },
  { to: "/how-we-work", label: "How we work" },
  { to: "/activities", label: "Activities" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-ink no-underline"
            onClick={() => setOpen(false)}
          >
            <Mark className="size-8 text-accent" />
            <span className="leading-tight">
              <span className="block font-display text-lg font-medium">
                The Community
              </span>
              <span className="hidden text-xs tracking-widest text-muted uppercase sm:block">
                Lean Construction institutes
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm no-underline transition-colors duration-150",
                    active
                      ? "bg-surface-2 text-ink"
                      : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {open ? (
          <nav
            className="border-t border-line bg-surface px-4 py-3 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block rounded-sm px-3 py-3 text-base text-ink no-underline hover:bg-surface-2"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      <div id="main" className="flex-1">
        {children}
      </div>

      <footer className="mt-16 border-t border-line bg-surface-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-lg">The Community</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              National and regional Lean Construction institutes in a light
              international framework.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Footer">
            {NAV.filter((item) => item.to !== "/").map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-ink-soft no-underline hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
