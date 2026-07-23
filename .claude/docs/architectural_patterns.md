# Architectural Patterns

Patterns confirmed across multiple files in this codebase.

## Optimistic mutations via TanStack Query

Both the flag-toggle and status-update mutations follow the same shape:
`onMutate` cancels in-flight queries and writes the optimistic value into the
`["app", id]` and `["applications", ...]` query caches directly, then `onSuccess`
invalidates both query keys to reconcile with the server.

- `Frontend/src/App.tsx:39-81` (flag toggle)
- `Frontend/src/components/AppCard.tsx:71-115` (status update)

## Centralized API layer

All network requests currently go through `Frontend/src/lib/api.ts`. Components
consume these functions rather than calling `fetch` directly.

## Sheet composition pattern

`AppCard.tsx` owns the single `useQuery`/`useMutation` set for an application and
passes `data` plus handler callbacks down to purely presentational children:
`SheetStatus`, `SheetLoan`, `SheetIP`, `SheetNotes` (`Frontend/src/components/AppCard.tsx:263-282`).
None of these children fetch their own data.

## Confirm-before-mutate

State-changing actions that aren't easily reversible are gated behind a
confirmation dialog that receives a callback to run on confirm, rather than
mutating directly from the triggering control:

- Status change → `ConfirmDialog` (`AppCard.tsx:252-260`)
- Note deletion → `DeleteDialog` (`AppCard.tsx:243-249`)

## Backend request-handling template

Current route handlers in `Backend/index.js` follow a consistent sequence: read
`db.json` → `JSON.parse` → find the application by `id` → 404 if not found →
mutate → `writeFile` back to `db.json` → return the updated object. All six
routes share the same catch block, distinguishing only `ENOENT` (404) from any
other error (500).
