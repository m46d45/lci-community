# LCI Community

Public site for national Lean Construction institutes in a light international framework.

Not a new institute. Not a membership body. One shared directory of who speaks for which country.

## Pages

- Home — map of institutes
- About — origin at IGLC-33, Kyoto, June 2025
- Parties — countries, organisations, regional networks
- How we work — quarterly meeting and mutual recognition
- Activities — shared work when agreed (route exists; hidden from nav until listed)
- Contact — write to the coordinator; suggest a directory change

## Data

Canonical directory: `src/data/directory.json` (imported by the app).

Published mirror: `public/directory.json` (and `public/world.svg`).

Emails never appear on the site. Update the workbook, export public columns into `src/data/directory.json`, then:

```bash
npm run sync:directory
```

CI runs `npm run check:directory` so the mirrors cannot drift.

## Contact delivery

The Contact form posts to a server function. Configure **one** of:

| Env | Effect |
|-----|--------|
| `CONTACT_WEBHOOK_URL` | `POST` JSON payload to the webhook |
| `RESEND_API_KEY` + `COORDINATOR_EMAIL` | Email via [Resend](https://resend.com) |
| (neither) | Append to `.data/contact-submissions.jsonl` (local/dev only) |

Optional: `CONTACT_FROM_EMAIL`, and `COORDINATOR_EMAIL` alone (shown as a mailto fallback on the page).

Copy `.env.example` to `.env` for local values.

## Local

```bash
npm install
npm run sync:directory   # after editing src/data or src/assets
npm run dev
```

```bash
npm run typecheck
npm test
npm run check:directory
npm run build
```

## Deploy notes

Auth and the app database stay off for this public site (`.grok/app-env.json`: `VITE_AUTH_ENABLED=false`, `deploy.database=false`). Set contact env vars on the host so suggestions reach the coordinator.
