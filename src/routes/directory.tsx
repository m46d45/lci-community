import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PresenceMap } from "@/components/presence-map";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  COUNTRIES,
  REGIONAL_NETWORKS,
  REGIONS,
  statusLabel,
  type CountryRow,
  type Region,
} from "@/lib/directory";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/directory")({ component: DirectoryPage });

function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");
  const [selectedIso, setSelectedIso] = useState<string | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      if (region !== "All" && c.region !== region) return false;
      if (!q) return true;
      return (
        c.country.toLowerCase().includes(q) ||
        c.organisation.toLowerCase().includes(q) ||
        c.representative.toLowerCase().includes(q) ||
        (c.network ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, region]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-widest text-muted uppercase">
          Parties
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
          Countries and organisations
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Who speaks for Lean Construction in each country, and the regional
          networks that span more than one. One shared list — suggest a
          correction rather than editing the map.
        </p>
      </header>

      <div className="mt-8">
        <PresenceMap
          selectedIso={selectedIso}
          onSelect={(row) => {
            setSelectedIso(row.iso);
            setRegion("All");
            setQuery(row.country);
          }}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, organisation, or representative"
            aria-label="Search directory"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={cn(
                "h-11 rounded-full px-3.5 text-sm",
                region === r
                  ? "bg-accent text-accent-fg"
                  : "bg-surface text-ink-soft shadow-[0_0_0_1px_var(--color-line)] hover:bg-surface-2",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        {rows.length} {rows.length === 1 ? "country" : "countries"}
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-line text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Organisation</th>
              <th className="px-4 py-3 font-medium">Representative</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <CountryTr
                key={row.iso}
                row={row}
                selected={selectedIso === row.iso}
                onSelect={() =>
                  setSelectedIso((cur) => (cur === row.iso ? null : row.iso))
                }
              />
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-muted">
                  No matches.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-medium">Regional networks</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {REGIONAL_NETWORKS.map((n) => (
            <li
              key={n.name}
              className="rounded-lg bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-medium text-ink">{n.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{n.scope}</p>
              {n.representative !== "—" ? (
                <p className="mt-3 text-xs text-muted">{n.representative}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        Name or organisation out of date?{" "}
        <Link
          to="/contact"
          search={{
            kind: "update-representative",
            country: selectedIso
              ? COUNTRIES.find((c) => c.iso === selectedIso)?.country
              : undefined,
          }}
          className="text-ink underline-offset-2 hover:underline"
        >
          Suggest a correction
        </Link>
        .
      </p>
    </main>
  );
}

function CountryTr({
  row,
  selected,
  onSelect,
}: {
  row: CountryRow;
  selected: boolean;
  onSelect: () => void;
}) {
  const label = statusLabel(row.status);
  return (
    <tr
      className={cn(
        "border-b border-line last:border-0",
        selected ? "bg-bg-warm" : "hover:bg-bg",
      )}
    >
      <td className="px-4 py-3 align-top">
        <button
          type="button"
          onClick={onSelect}
          className="text-left font-medium text-ink"
        >
          {row.country}
        </button>
        <div className="mt-1 flex flex-wrap gap-1">
          {row.network ? <Badge>{row.network}</Badge> : null}
          {label ? <Badge>{label}</Badge> : null}
        </div>
      </td>
      <td className="px-4 py-3 align-top text-ink-soft">
        {row.organisation === "—" ? (
          <span className="text-faint">To be confirmed</span>
        ) : (
          row.organisation
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {row.representative ? (
          row.representative
        ) : (
          <span className="text-faint">To be confirmed</span>
        )}
      </td>
    </tr>
  );
}
