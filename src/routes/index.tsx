import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PresenceMap } from "@/components/presence-map";
import { Button } from "@/components/ui/button";
import { COUNTRY_COUNT, ORG_COUNT } from "@/lib/directory";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
            National institutes in a light international framework.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Who speaks for which country, a quarterly meeting, and room for
            shared work — without replacing the institutes that already exist.
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            It started with a talk at IGLC-33 in Kyoto.{" "}
            <Link
              to="/about"
              className="text-ink underline-offset-2 hover:underline"
            >
              About the origin
            </Link>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <Stat value={String(COUNTRY_COUNT)} label="Countries" />
            <Stat value={String(ORG_COUNT)} label="Organisations" />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PresenceMap />
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
      <dd className="font-display text-3xl text-ink">{value}</dd>
    </div>
  );
}
