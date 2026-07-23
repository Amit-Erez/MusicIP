# Music IP Funding Review Dashboard

Internal-tool simulation for reviewing catalogue-backed funding applications from
independent labels, publishers, and rights holders. Portfolio/educational project,
not production software — the backend uses a flat JSON file (`Backend/db.json`) as
its datastore instead of a real database.

## Tech Stack

**Frontend** (`Frontend/`): React 19, TypeScript, Vite, Tailwind CSS v4, TanStack
Query v5, Radix UI/shadcn primitives, Vitest + React Testing Library.

**Backend** (`Backend/`): Node.js (ESM), Express 5, Zod for request validation,
morgan for logging, `db.json` as the persistence layer.

## Key Directories

- `Backend/index.js` — the entire API: all routes, validation, and datastore access live in this one file.
- `Frontend/src/components/` — flat directory of feature components (`Sheet*`, `App*`, dialogs); `components/ui/` holds shadcn/Radix primitives.
- `Frontend/src/lib/api.ts` — sole boundary for backend communication; components never call `fetch` directly.
- `Frontend/src/types.ts` — single shared file for all domain types (`Application`, `Status`, `Note`, etc.).
- Tests are co-located as `*.test.tsx` next to the component they cover, not in a separate tree.

## Essential Commands

Frontend (`cd Frontend`):
- `npm run dev` — Vite dev server
- `npm run build` — typecheck (`tsc -b`) + production build
- `npm test` — Vitest (pass a name to filter, e.g. `npm test -- SheetStatus`)
- `npm run lint` — ESLint

Backend (`cd Backend`):
- `npm run dev` — nodemon
- `npm start` — node
- No test or lint script exists for the backend.

## Important Project Conventions

- All frontend network calls go through `Frontend/src/lib/api.ts` — add new endpoints there, not inline in components.
- Shared domain types currently live in `Frontend/src/types.ts`; follow this convention unless splitting types would clearly improve maintainability.
- The backend uses `db.json` without transactions or concurrent-write protection; treat it as development-only persistence.
- See `.claude/docs/architectural_patterns.md` for the optimistic-update, sheet-composition, and backend-handler patterns used consistently across the codebase.

## Additional Documentation

- [.claude/docs/architectural_patterns.md](.claude/docs/architectural_patterns.md)
