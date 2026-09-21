# Frontend Test

Starter frontend: **Vite + React 19 + TypeScript**, Tailwind CSS v4, shadcn/ui, TanStack Query, Axios, Zustand, React Router, Lucide.

It currently hosts the **Homerun home page**, built from the `final-homerun` Figma file.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5173
```

No `.env` is needed to start — every variable has a default. Copy `.env.example`
to `.env` only when you want to point at a different API.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check + production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |
| `npm run typecheck` | Type-check only |
| `npm run ui:add -- <name>` | Add a shadcn component, e.g. `npm run ui:add -- dialog` |

## Environment variables

Optional. Declared in `.env` (template in `.env.example`), typed in
[src/vite-env.d.ts](src/vite-env.d.ts) and read in [src/lib/env.ts](src/lib/env.ts),
which falls back to the defaults below and warns in dev.

| Variable | Default | Meaning |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | API base URL |
| `VITE_APP_NAME` | `Frontend Test` | Display name of the app |

`.env` is git-ignored; only `.env.example` is committed.

## Structure

```
src/
├── components/
│   ├── ui/            # shadcn components (CLI-generated, safe to edit)
│   ├── brand-*.tsx    # Homerun button and logo
│   ├── site-*.tsx     # shared header and footer
│   ├── chat-*.tsx     # chatbot FAB + panel
│   └── reveal.tsx     # scroll-reveal wrapper
├── features/
│   ├── home/          # home-page sections and their data
│   └── posts/         # demo feature — delete when the real project starts
├── hooks/             # shared hooks (in-view, media-query, scrolled, theme)
├── layouts/           # root-layout: header + footer + chatbot shell
├── lib/               # api-client (axios), query-client, env, utils, motion, text
├── pages/             # page components, lazy-loaded by the router
├── providers/         # app-wide providers
├── routes/            # router declaration
└── stores/            # zustand stores (auth, ui)
public/images/         # assets exported from Figma
```

The `@/*` alias points at `src/*` (declared in [vite.config.ts](vite.config.ts) and [tsconfig.app.json](tsconfig.app.json)).

## Conventions

**API calls** — every request goes through `request()` in [src/lib/api-client.ts](src/lib/api-client.ts). An interceptor attaches `Authorization` from `useAuthStore` and, on a 401, logs out and clears the cache.

**Data fetching** — each feature has `*.api.ts` (plain HTTP functions) and `*.queries.ts` (TanStack Query hooks + a query-key factory). See [src/features/posts/api/](src/features/posts/api/) for the pattern.

**State** — server state lives in TanStack Query; only client state (auth, UI) belongs in Zustand.

**Adding shadcn components**

```bash
npm run ui:add -- dialog table form
```

**Theme** — `useUIStore` holds `light | dark | system` and `useTheme` toggles the `dark` class on `<html>`. The Homerun design is **light-only**, so the default is `light`; switching to `system` on a dark OS turns `--popover` black and activates shadcn's `dark:bg-input/30`.

## Design system

Tokens live in [src/index.css](src/index.css) and follow the Figma file.

- **Colours** — brand tokens sit in their own namespace (`--color-brand`, `--color-tier-*`, `--color-slate-line`, …) so shadcn's `--primary` / `--background` stay untouched.
- **Type scale** — `type-h1` … `type-body`, **not** `text-*`. See the gotcha below.
- **Breakpoints** — the default scale plus `hd` (90rem = 1440px), Figma's desktop frame.
- **Container** — `.container-hr` gives a 1440 max frame with a 72 gutter, i.e. 1296 of content.

### Two Tailwind gotchas worth knowing

**1. Custom font sizes must not start with `text-`.** `cn()` is clsx + tailwind-merge. tailwind-merge does not recognise custom font sizes, so it files `text-h3` under the *colour* group and silently deletes any `text-white` sitting beside it. That is why the type scale is named `type-*`.

**2. Do not stack width or padding utilities on `.container-hr`.** Its padding comes from `@apply`, which tailwind-merge cannot see, so overrides such as `container-hr max-w-5xl` are dropped and the later-defined rule wins. Write a plain wrapper instead.

