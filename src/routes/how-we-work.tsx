import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: pageTitle("How we work") },
      {
        name: "description",
        content:
          "Meet quarterly, agree shared work there, and recognise one another at home.",
      },
    ],
  }),
  component: HowWeWorkPage,
});

const POINTS = [
  {
    kicker: "01",
    title: "Meet quarterly",
    body: "Representatives of national and regional institutes meet four times a year.",
  },
  {
    kicker: "02",
    title: "Agree shared work there",
    body: "Anything done together is decided in that meeting, for that year.",
  },
  {
    kicker: "03",
    title: "Recognise one another at home",
    body: "Each institute remains the voice of Lean Construction in its own country.",
  },
];

function HowWeWorkPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          How we work
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          A framework, not a headquarters
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Meet, decide what to do together, and leave each national institute
          in place.
        </p>
      </header>

      <ol className="mt-10 space-y-4">
        {POINTS.map((p) => (
          <li
            key={p.kicker}
            className="grid gap-4 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:grid-cols-[5rem_1fr] sm:p-8"
          >
            <p className="font-display text-3xl text-accent">{p.kicker}</p>
            <div>
              <h2 className="font-display text-2xl font-medium">{p.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
