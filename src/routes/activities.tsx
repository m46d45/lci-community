import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: pageTitle("Activities") },
      {
        name: "description",
        content:
          "Shared work appears here after the representatives’ meeting agrees it.",
      },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          Activities
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          Shared work, when agreed
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Initiatives will appear here after the representatives’ meeting
          agrees them. None are listed yet — this page stays out of the main
          navigation until then.
        </p>
        <p className="mt-6 text-sm text-muted">
          See{" "}
          <Link
            to="/how-we-work"
            className="text-ink underline-offset-2 hover:underline"
          >
            How we work
          </Link>{" "}
          for the meeting cadence, or{" "}
          <Link
            to="/contact"
            search={{ kind: undefined, country: undefined }}
            className="text-ink underline-offset-2 hover:underline"
          >
            contact the coordinator
          </Link>
          .
        </p>
      </header>
    </main>
  );
}
