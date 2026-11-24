# Polycheck Landing Page

Marketing + install page for **Polycheck**, the PUP Santa Maria attendance
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
| `NEXT_PUBLIC_WEB_APP_URL` | `https://polycheck-zeta.vercel.app` | Where "Open Web Dashboard" links go (also the canonical metadata base) |

Set it at build time, e.g. when the dashboard moves to a custom domain.

## Notes

- The QR codes on the page are decorative samples with an inert payload; they
  are not real sessions or tokens.
- `plan/LANDING_PAGE_PLAN.md` is the original design plan and predates the
  Flutter client; the source of truth for content is `src/components`.
