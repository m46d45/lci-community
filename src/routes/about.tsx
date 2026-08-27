import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: AboutPage });

const INVITATIONS = [
  "Coach students who lack well-informed advisors — and include those advisors when they are willing.",
  "Create and support Lean Construction institutes in more countries.",
  "Promote Lean Construction in the public sector, internationally.",
  "Help practitioners help researchers — for example by testing hypotheses.",
  "Help researchers help practitioners — for example by translating selected papers into plain language.",
  "Get Lean Construction teaching materials into education at every level.",
  "Train and coach Lean Construction consultants.",
  "Engage other construction-industry organisations: owners, architects, engineers, trades.",
];

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          About
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          Institutes already existed. The missing piece was working together.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          A light international framework among national Lean Construction
          institutes — not a new institute, and not a replacement for the ones
          at home.
        </p>
      </header>

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-2xl font-medium">Kyoto, June 2025</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            On 6 June 2025, at the close of IGLC-33 in Kyoto, Glenn Ballard
            presented{" "}
            <span className="italic text-ink">
              Lean Transformation of the Global Construction Industry
            </span>
            .
          </p>
          <p>
            He noted that Lean Construction was already being advanced in some
            29 countries, through about 26 national institutes and communities.
            Each was doing useful work at home. None of that work, on its own,
            would transform the industry worldwide.
          </p>
          <p>
            His proposal was simple: the institutes should work together. This
            community exists for that purpose.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl font-medium">
          The invitation from that talk
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          These were the kinds of work he asked the institutes to take on
          together. They are the origin of the community — not a list of
          programmes already adopted.
        </p>
        <ol className="mt-6 space-y-3">
          {INVITATIONS.map((item, i) => (
            <li
              key={item}
              className="grid gap-3 rounded-lg bg-surface px-5 py-4 shadow-[var(--shadow-border)] sm:grid-cols-[2.5rem_1fr] sm:items-baseline"
            >
              <span className="font-display text-lg text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <h2 className="font-display text-2xl font-medium">What it is</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>
              A light framework so national and regional institutes can
              recognise one another.
            </li>
            <li>A directory of who speaks for which country or network.</li>
            <li>
              A quarterly meeting, and room for shared work when that meeting
              agrees it.
            </li>
          </ul>
        </div>
        <div className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
          <h2 className="font-display text-2xl font-medium">What it is not</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li>A new institute that replaces the national ones.</li>
            <li>A membership body with dues.</li>
            <li>A publisher of company-level data.</li>
          </ul>
        </div>
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
        The first gathering was held online on 9 January 2026. How the
        community meets now is on{" "}
        <Link to="/how-we-work" className="text-ink underline-offset-2 hover:underline">
          How we work
        </Link>
        . Who speaks for each country is on{" "}
        <Link to="/directory" className="text-ink underline-offset-2 hover:underline">
          Parties
        </Link>
        .
      </p>
    </main>
  );
}
