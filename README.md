# ruoxiangxu.com

Interactive terminal-style personal site built with Next.js 15 + Tailwind. This repo is just for my own portfolio, not a template.

## Highlights
- Glassmorphism terminal UI with boot sequence before the prompt unlocks.
- Banner + help commands share the same ASCII art and command listing.
- Copilot-like inline suggestion for command names (Tab accepts the ghost text).
- History navigation with ⬆/⬇, Tab autocompletion dumps multiple matches when needed.
- Countdown redirects (GitHub/LinkedIn) include a cancel tip (Ctrl+C) and respect it.
- Commands include: `help`, `banner`, `about`, `edu`, `contact`, `resume`, `github`, `linkedin`, `clear`, `coffee` (animated steam), `matrix`.
- Auto theme picks light/dark by local time, plus floating theme toggle and GitHub badge.
- Text selection preserved even when clicking the terminal; layout stays centered with floating controls.

## Local Development
```bash
pnpm install
pnpm dev
```
Browse http://localhost:3000. Production build via `pnpm build` and preview with `pnpm start`. Lint using `pnpm lint`.

## Deployment
Static-exported to GitHub Pages from `main` using GitHub Actions.