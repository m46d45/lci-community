import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PresenceMap } from "@/components/presence-map";
import { Button } from "@/components/ui/button";
import { COUNTRY_COUNT, ORG_COUNT } from "@/lib/directory";
import { SITE_NAME, SITE_TAGLINE, pageTitle } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle() },
      {
        name: "description",
        content:
          "National Lean Construction institutes in a light international framework.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="relative isolate min-h-[min(100dvh,52rem)] overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <PresenceMap variant="bleed" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_oklab,var(--color-bg)_92%,transparent)_0%,color-mix(in_oklab,var(--color-bg)_78%,transparent)_42%,color-mix(in_oklab,var(--color-bg)_35%,transparent)_72%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(100dvh,52rem)] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 lg:justify-center lg:pb-16 lg:pt-20">
          <p className="animate-[fade-up_700ms_var(--ease-out)_both] font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {SITE_NAME}
          </p>
          <p className="mt-2 animate-[fade-up_700ms_var(--ease-out)_80ms_both] text-sm tracking-[0.18em] text-muted uppercase">
            {SITE_TAGLINE}
          </p>
          <h1 className="mt-6 max-w-xl animate-[fade-up_700ms_var(--ease-out)_140ms_both] font-display text-2xl leading-snug font-medium tracking-tight text-ink sm:text-3xl">
            National institutes in a light international framework.
          </h1>
          <p className="mt-4 max-w-md animate-[fade-up_700ms_var(--ease-out)_200ms_both] text-base leading-relaxed text-ink-soft">
            Who speaks for which country, a quarterly meeting, and room for
            shared work — without replacing the institutes that already exist.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3 animate-[fade-up_700ms_var(--ease-out)_260ms_both]">
            <Link to="/directory" className="no-underline">
              <Button>
                Parties
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link to="/how-we-work" className="no-underline">
              <Button variant="outline">How we work</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
          It started with a talk at IGLC-33 in Kyoto.{" "}
          <Link
            to="/about"
            className="text-ink underline-offset-2 hover:underline"
          >
            About the origin
          </Link>
          . The shared list covers {COUNTRY_COUNT} countries and {ORG_COUNT}{" "}
          organisations.
        </p>
      </section>
    </main>
  );
}
