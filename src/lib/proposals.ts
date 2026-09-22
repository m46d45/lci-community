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

export type ContactPayload = {
  name: string;
  organisation: string;
  kind: ProposalKind;
  change: string;
  reach: string;
};

export const KIND_LABEL: Record<ProposalKind, string> = {
  "new-country": "New country",
  "update-representative": "Update representative",
  "update-organisation": "Update organisation",
  other: "Other",
};
