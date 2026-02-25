# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 personal portfolio/blog app (`anddre.me`) — no monorepo, no backend services, no databases.

**Tech stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, MDX blog content.

### Running the app

- `npm run dev` — starts the dev server on port 3000
- `npm run build` — production build
- `npm run lint` — ESLint checks (uses `next lint`)
- `npm run start` — serves the production build

### Gotchas

- **Native bindings:** Tailwind CSS 4 depends on `lightningcss` and `@tailwindcss/oxide`, which require platform-specific native binaries. If `npm install` doesn't resolve them (known npm optional-deps bug), install them explicitly:
  ```
  npm install lightningcss-linux-x64-gnu@1.30.2 @tailwindcss/oxide-linux-x64-gnu@4.1.18 --save-optional
  ```
- **No env vars required** for local development. Remote images from Vercel Blob may not load locally but are non-blocking.
- Both `package-lock.json` (npm) and `bun.lockb` (bun) exist; use **npm** in this environment.
- Lint produces warnings (unused vars in `header.tsx`) but zero errors — this is expected.
