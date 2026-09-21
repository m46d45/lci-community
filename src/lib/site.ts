/** Shared site identity and navigation flags. */

export const SITE_NAME = "LCI Community";
export const SITE_TAGLINE = "Lean Construction institutes";
export const SITE_DESCRIPTION =
  "National Lean Construction institutes in a light international framework.";

/** Hide from primary nav until shared work is agreed and listed. */
export const SHOW_ACTIVITIES_IN_NAV = false;

export function pageTitle(page?: string): string {
  return page ? `${page} · ${SITE_NAME}` : SITE_NAME;
}
