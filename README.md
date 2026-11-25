# Polycheck Landing Page

Marketing + install page for **Polycheck**, the attendance
management system. It is a fully static Next.js export (`output: "export"`):
there is no server runtime to deploy.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build & deploy

```bash
pnpm build        # static site is written to ./out
```

Deploy the contents of `out/` to any static host (Vercel, Netlify, Cloudflare
Pages, nginx, Coolify static site, ...). Build command `pnpm build`, output
directory `out`.

## How the APK download works

Nothing is bundled in this repo. Every download button points at the permalink

```
https://github.com/AddToKart/polycheck/releases/latest/download/polycheck-release.apk
```

so visitors always get the `polycheck-release.apk` asset attached to the
release marked **latest** in the main `AddToKart/polycheck` repo. Version, size
and SHA-256 shown in the install modal are read live from the GitHub Releases
API, so **shipping a new APK never requires redeploying this site** — just
publish/replace the asset on the latest release (the file name must stay
`polycheck-release.apk`).

All external links live in [`src/lib/config.ts`](src/lib/config.ts).

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WEB_APP_URL` | `https://app.polycheck.live` | Where "Open Web Dashboard" links go |
| `NEXT_PUBLIC_SITE_URL` | `https://polycheck.live` | This page's own address (canonical / Open Graph base) |

| `NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL` | _(empty)_ | Optional address shown in the Contact section of `/privacy` and `/terms`. When empty, the pages point users to their institution's administrator / Data Protection Officer |

Set these at build time, e.g. when the dashboard moves to a custom domain.

## Legal pages

`/privacy` and `/terms` are static pages (`src/app/privacy`, `src/app/terms`) linked from the
footer, the download section and the install modal. They describe what the app collects
(checked against the monorepo's data inventory, Android manifest and retention jobs).
Update `LEGAL_UPDATED` / `LEGAL_VERSION` in `src/lib/legal.ts` whenever they change, and
re-check them if the app starts collecting anything new.

## Ingestion gateway figures

The "Ingestion Gateway" section (`src/components/IngestGateway.tsx`) quotes results from the
monorepo's own load tests and the gateway's default settings (buffer size, batch size, retry and
dead-letter limits). Sources: `plan/ingest-gateway-scaling-plan.md` (§10.8 corrected runs),
`plan/load-simulation-plan.md` (pre-gateway burst) and `services/ingest/src/config.ts`.
When you run a larger or production-grade test, update the numbers in the `stats` array and
the footnote there — keep the test conditions stated next to each figure.

## Notes

- The QR codes on the page are decorative samples with an inert payload; they
  are not real sessions or tokens.

