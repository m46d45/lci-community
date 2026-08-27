import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities")({
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
          agrees them. None are listed yet.
        </p>
      </header>
    </main>
  );
}
