import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCoordinatorEmail, submitContact } from "@/lib/contact";
import {
  KIND_LABEL,
  isProposalKind,
  type ProposalKind,
} from "@/lib/proposals";
import { pageTitle } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  validateSearch: (raw: Record<string, unknown>) => ({
    kind: isProposalKind(raw.kind) ? raw.kind : undefined,
    country: typeof raw.country === "string" ? raw.country : undefined,
  }),
  loader: () => getCoordinatorEmail(),
  head: () => ({
    meta: [
      { title: pageTitle("Contact") },
      {
        name: "description",
        content:
          "Write to the coordinator, or suggest a change to the shared directory.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const coordinatorEmail = Route.useLoaderData();
  const submit = useServerFn(submitContact);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const kinds = useMemo(
    () => Object.entries(KIND_LABEL) as Array<[ProposalKind, string]>,
    [],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const organisation = String(data.get("organisation") ?? "").trim();
    const kind = String(data.get("kind") ?? "other") as ProposalKind;
    const change = String(data.get("change") ?? "").trim();
    const reach = String(data.get("reach") ?? "").trim();
    if (!name || !change) return;

    setPending(true);
    try {
      await submit({ data: { name, organisation, kind, change, reach } });
      setSent(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send. Please try again or use email.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          Write to the coordinator
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Use this form to get in touch, or to suggest a change to the
          directory. Suggestions are reviewed; the public list changes when the
          coordinator applies them.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <form
          onSubmit={onSubmit}
          className="space-y-5 lg:col-span-3"
        >
          {sent ? (
            <p
              className="rounded-md bg-bg-warm px-4 py-3 text-sm text-accent"
              role="status"
            >
              Thank you. Your message was sent to the coordinator. The
              directory itself is not edited from this form.
            </p>
          ) : null}

          {error ? (
            <p
              className="rounded-md bg-surface px-4 py-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)]"
              role="alert"
            >
              {error}
              {coordinatorEmail ? (
                <>
                  {" "}
                  Or email{" "}
                  <a
                    className="underline underline-offset-2"
                    href={`mailto:${coordinatorEmail}`}
                  >
                    {coordinatorEmail}
                  </a>
                  .
                </>
              ) : null}
            </p>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" htmlFor="name">
              <Input id="name" name="name" required autoComplete="name" />
            </Field>
            <Field label="Organisation / country" htmlFor="organisation">
              <Input
                id="organisation"
                name="organisation"
                defaultValue={search.country ?? ""}
              />
            </Field>
          </div>

          <Field label="About" htmlFor="kind">
            <select
              id="kind"
              name="kind"
              defaultValue={search.kind ?? "other"}
              className="h-11 w-full rounded-md bg-surface px-3.5 text-base text-ink shadow-[0_0_0_1px_var(--color-line)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {kinds.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message" htmlFor="change">
            <Textarea id="change" name="change" required />
          </Field>

          <Field label="Your email" htmlFor="reach">
            <Input
              id="reach"
              name="reach"
              type="email"
              autoComplete="email"
            />
          </Field>

          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send"}
          </Button>
        </form>

        <aside className="lg:col-span-2">
          <div>
            <h2 className="font-display text-xl font-medium">The shared list</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              One directory of countries and organisations. This site shows the
              public columns. The coordinator holds the internal file, including
              anything that must not be published.
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
              <li>
                <span className="font-medium text-ink">1. Suggest</span>
                {" — "}a correction or a new country, here.
              </li>
              <li>
                <span className="font-medium text-ink">2. Review</span>
                {" — "}the coordinator checks the change.
              </li>
              <li>
                <span className="font-medium text-ink">3. Publish</span>
                {" — "}the public list is updated from one file. Neither map
                is edited directly.
              </li>
            </ol>
            {coordinatorEmail ? (
              <p className="mt-6 text-sm text-muted">
                Prefer email?{" "}
                <a
                  className="text-ink underline-offset-2 hover:underline"
                  href={`mailto:${coordinatorEmail}`}
                >
                  {coordinatorEmail}
                </a>
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
