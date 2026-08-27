export type ProposalKind =
  | "new-country"
  | "update-representative"
  | "update-organisation"
  | "other";

export const PROPOSAL_KINDS: ProposalKind[] = [
  "new-country",
  "update-representative",
  "update-organisation",
  "other",
];

export function isProposalKind(value: unknown): value is ProposalKind {
  return (
    typeof value === "string" &&
    (PROPOSAL_KINDS as string[]).includes(value)
  );
}

export type DirectoryProposal = {
  id: string;
  createdAt: string;
  name: string;
  organisation: string;
  kind: ProposalKind;
  change: string;
  reach: string;
};

const KEY = "community-directory-proposals";

export function loadProposals(): DirectoryProposal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DirectoryProposal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProposal(
  input: Omit<DirectoryProposal, "id" | "createdAt">,
): DirectoryProposal {
  const next: DirectoryProposal = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const all = [next, ...loadProposals()].slice(0, 20);
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return next;
}

export const KIND_LABEL: Record<ProposalKind, string> = {
  "new-country": "New country",
  "update-representative": "Update representative",
  "update-organisation": "Update organisation",
  other: "Other",
};
