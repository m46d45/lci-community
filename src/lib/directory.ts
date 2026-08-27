/**
 * Public columns from the shared directory file.
 * Emails never appear here. The coordinator publishes this file from the
 * internal workbook; this site does not edit it.
 */
import data from "@/data/directory.json";

export type MouParty = "Yes" | "Pending" | "No";
export type Region = "Americas" | "Europe" | "Asia-Pacific" | "Middle East";
export type RowStatus = "listed" | "in-formation" | "gap" | "incomplete";
export type StudyStatus = "existed" | "joined" | "studied" | "published";

export type CountryRow = {
  country: string;
  iso: string;
  organisation: string;
  representative: string;
  mouParty: MouParty;
  region: Region;
  network?: string;
  status: RowStatus;
};

export type RegionalNetwork = {
  name: string;
  scope: string;
  representative: string;
  mouParty: MouParty;
};

export const DIRECTORY_UPDATED = data.meta.updated;

export const COUNTRIES: CountryRow[] = data.countries.map((c) => ({
  country: c.country,
  iso: c.iso,
  organisation: c.organisation,
  representative: c.representative,
  mouParty: c.mouParty as MouParty,
  region: c.region as Region,
  network: c.network,
  status: c.communityStatus as RowStatus,
}));

export const REGIONAL_NETWORKS: RegionalNetwork[] = data.networks.map((n) => ({
  name: n.name,
  scope: n.scope,
  representative: n.representative,
  mouParty: n.mouParty as MouParty,
}));

export const REGIONS: Array<Region | "All"> = [
  "All",
  "Americas",
  "Europe",
  "Asia-Pacific",
  "Middle East",
];

export const COUNTRY_COUNT = COUNTRIES.length;
export const ORG_COUNT = new Set(
  COUNTRIES.map((c) => c.organisation).filter((o) => o !== "—"),
).size;
export const GAP_COUNT = COUNTRIES.filter(
  (c) => c.status === "gap" || c.status === "incomplete",
).length;

export function statusLabel(status: RowStatus): string {
  switch (status) {
    case "in-formation":
      return "In formation";
    case "gap":
      return "Contact gap";
    case "incomplete":
      return "Incomplete";
    default:
      return "";
  }
}
