<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

"BOOKNOOK" — a book library / borrowing client. Next.js 16.4.3 App Router, **plain JavaScript** (`.js`/`.jsx`, no TypeScript; no typecheck step). Path alias `@/*` → `./src/*` (jsconfig).

- App entry: `src/app/layout.js` (Navbar + Footer wrap every page) and `src/app/page.js`.
- `src/components/Navbar.jsx` links to planned routes (`/allbooks`, `/addbooks`, `/mybooks`, `/myborrow`) that don't exist yet.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build`
- `npm run lint` — bare `eslint` flat config (`eslint-config-next/core-web-vitals`)
- No tests, no formatter, no CI workflows. Verification is lint + build only.

Known: `npm run lint` currently fails with 2 pre-existing `react-hooks/set-state-in-effect` errors in vendored shadcn code (`src/components/ui/carousel.jsx`, `src/hooks/use-mobile.js`). Don't reintroduce that pattern in new code.

## Config quirks (next.config.mjs)

- React Compiler is on (`reactCompiler: true` + `babel-plugin-react-compiler`) — don't hand-memoize.
- `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback: true` (the latter generates the block above).
- **Gotcha**: `cacheComponents` prerendering forbids `new Date()` (also `Math.random()`) evaluated in client components — the build fails with "unstable value `new Date()`". Swiper v14 reads `new Date()` at module scope (autoplay/a11y modules), so any page rendering Swiper must wrap it in `<Suspense>`; see `src/app/page.js`.
- Turbopack loader rule routes `*.css` through `@tailwindcss/turbopack`.

## Styling & UI

- **Tailwind CSS v4, CSS-first**: no `tailwind.config` file. Theme tokens live in `src/app/globals.css` under `@theme inline` + oklch CSS variables. New colors/spacing go there, not in JS config.
- shadcn is initialized in **base-nova style on `@base-ui/react` primitives — not Radix** (see `components.json`, `"tsx": false`). `src/components/ui/` holds ~70 vendored components; edit them directly, don't regenerate wholesale.
- `cn` comes from the `cn` npm package: `import { cn } from "cn"`. `src/lib/utils.js` only re-exports it. Follow this convention, not the classic shadcn `@/lib/utils` import.
