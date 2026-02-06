# Progress Circle: Architecture & Backend Plan

This document plans the architecture and backend for the updated progress indicator: **per-page progress circles** that fill as the user makes progress, with six visual states (active/inactive × with progress / without progress / complete), without breaking existing behavior and while staying resilient to form/structure changes.

---

## 1. Design Summary (from UI specs)

- **Per-page progress:** Each step page shows its own progress **regardless of whether that page is currently viewed**.
- **Circle around step number:** A circular ring around each step number; the ring **fills by progress percentage** (0–100%).
- **Six states:**
  - **Active with progress** – Blue theme, partial fill, number in primary.
  - **Active without progress** – Blue theme, no fill (0%), number in primary.
  - **Active complete** – Blue, full/checkmark, no number.
  - **Inactive with progress** – Grey theme, partial fill, number in secondary.
  - **Inactive without progress** – Grey theme, no fill, number in secondary.
  - **Inactive complete** – Grey, full/checkmark.
- **Colors (from specs):**
  - Fill (progress): `primary/main` when active, `text/secondary` when inactive.
  - Track (unfilled part of ring): `grey/200` → map to existing `progress-bg`.
  - Step number: `primary` when active, secondary/muted when inactive.

---

## 2. Current Architecture (what stays)

### 2.1 Single source of truth for structure

| Concern | Source | Location |
|--------|--------|----------|
| Step and page list | `onboardingSteps` + `pageIds` | `src/data/onboardingConfig.js` |
| Page titles, form blocks, questions | `formData[stepId][pageId]` | `src/data/formData.js` |
| Answers | Store: `answers[stepId][pageId][blockId][questionId]` | `src/stores/onboardingStore.js` |

- **Router and navigation** already derive from `onboardingConfig.js` (e.g. `getOrderedPages`, `isValidStepPage`). The progress UI must **only** use `getStepById(stepId)` and `config.pageIds` to know which pages exist for the current step.
- **No progress state is stored.** Progress is always **derived** from `formData` + `answers` (and for dynamic blocks, `dynamicBlockIds`). This is what allows safe restructuring.

### 2.2 Existing progress API (unchanged)

The store already exposes everything needed for per-page progress:

- **`calculatePageCompletionPercentage(step, page)`**  
  Returns 0–100 for **any** `(step, page)`, not only the active page. It:
  - Resolves blocks from `formData` (static `formBlocks` or dynamic blocks via `getDynamicBlockIds` + template questions).
  - Counts answered vs total questions using `isAnswerFilled` and the same question set that defines the form.
- **`getBlockProgressCounts(step, page, blockId, questions)`**  
  Used for per-block breakdown (e.g. block list under the active page). Block definitions come from `formData`, so progress stays correct when questions are added/removed.

No new store state or new backend APIs are required for “progress per page” or for the circle fill percentage.

---

## 3. Data Flow for the Progress Indicator

```
onboardingConfig (stepId → pageIds)
        +
formData[stepId][pageId] (title, formBlocks / dynamicFormBlocks)
        +
onboardingStore: answers, getDynamicBlockIds
        +
route (pageId) → isActive
        ↓
For each pageId in current step:
  - completionPercentage = store.calculatePageCompletionPercentage(stepId, pageId)
  - isActive = (pageId === route.params.pageId)
  - isComplete = (completionPercentage === 100)
  - hasProgress = (completionPercentage > 0)
        ↓
Six-state descriptor: (isActive, hasProgress, isComplete) → UI (circle + label + check/number)
```

- **Page list:** From `currentStepConfig.pageIds` (from config). Key Vue list items by `page.id` (i.e. `pageId`), never by index, so reordering or adding/removing pages does not break reactivity or focus.
- **Per-page data:** For each `pageId`, the component already has (or can derive):
  - `id` (pageId)
  - `title` (from formData)
  - `isActive` (from route)
  - `completionPercentage` (from store)
  - `blocks` (for active page only; from formData + store, used for block-level list and optional future use)

So the **backend contract** for the progress component is: **same as today.** It receives a list of pages, each with `id`, `title`, `isActive`, `completionPercentage`, and optionally `blocks` for the active page. The only change is **how** the component renders each page (circle with fill + six states) instead of a simple circle with number/check.

---

## 4. Six-State Descriptor (derived, no new state)

From existing data, each page can be classified as:

| State | Condition | Use in UI |
|-------|-----------|-----------|
| Active with progress | `isActive && completionPercentage > 0 && completionPercentage < 100` | Blue ring, partial fill, number |
| Active without progress | `isActive && completionPercentage === 0` | Blue ring, 0% fill, number |
| Active complete | `isActive && completionPercentage === 100` | Blue, full ring or solid, checkmark |
| Inactive with progress | `!isActive && completionPercentage > 0 && completionPercentage < 100` | Grey ring, partial fill, number |
| Inactive without progress | `!isActive && completionPercentage === 0` | Grey ring, 0% fill, number |
| Inactive complete | `!isActive && completionPercentage === 100` | Grey, full ring or solid, checkmark |

**Recommendation:** Add a small helper (in the component or a composable) that returns this state descriptor from `(isActive, completionPercentage)` so the template and styles stay consistent and testable, e.g.:

- `getStepCircleState(isActive, completionPercentage)` → `{ isActive, isComplete, hasProgress, progressFraction }`
- Or a single state label: `'active-with-progress' | 'active-without-progress' | 'active-complete' | 'inactive-with-progress' | ...`

No persistence: this is derived on each render from route + store.

---

## 5. Restructuring Safety (scaling and config changes)

- **Adding/removing steps or pages:** Change `onboardingConfig.js` and corresponding `formData` entries. The progress indicator reads `getStepById(stepId).pageIds` and only renders pages that exist in config. New pages get 0% until answers exist; removed pages disappear. No migration of “progress” state is needed because progress is not stored.
- **Adding/removing blocks or questions:** Change `formData` for that page. `calculatePageCompletionPercentage` and `getBlockProgressCounts` use the **current** formData (blocks and question lists). So totals and percentages automatically reflect the new structure; existing answers still keyed by `(stepId, pageId, blockId, questionId)` remain valid where IDs still exist.
- **Reordering pages:** Change `pageIds` order in config. The sidebar order follows `config.pageIds`. Keys are `pageId`, so no duplicate keys or wrong associations.
- **Dynamic blocks (e.g. step2 page5):** Already supported. Block set comes from `getDynamicBlockIds(step, page)` and template questions from formData; progress is computed the same way. No change required for the progress circle logic.

**Important:** Do not introduce stored “progress percentage” or “step index” per page. Keeping progress **derived** from config + formData + answers is what keeps the system robust under restructuring.

---

## 6. File Touch Points

| File | Role | Change |
|------|------|--------|
| `src/data/onboardingConfig.js` | Step/page list | None. |
| `src/data/formData.js` | Page titles, blocks, questions | None. |
| `src/stores/onboardingStore.js` | Answers, `calculatePageCompletionPercentage`, `getBlockProgressCounts` | None for this feature. Optional: expose a tiny helper like `getPageProgressDescriptor(step, page)` that returns `{ percentage, isComplete }` if you want a single place for “page progress” semantics. |
| `src/components/layout/ProgressIndicator.vue` | Renders current step’s pages with circles | **Update:** Use existing `pages` computed (same data); replace the current circle markup with a **circular progress ring** (SVG or CSS) that uses `completionPercentage` for the fill; apply six-state styling (active/inactive, fill color, number vs checkmark). Optionally use a small helper or composable for the state descriptor. |
| `src/style.css` | Design tokens, progress classes | Optional: add classes for progress circle ring (e.g. track = `progress-bg`, fill = accent vs text-secondary by state). Existing `--color-progress-bg`, `--color-progress-fill`, `--color-text-secondary`, and accent already match the UI spec (primary/main, text/secondary, grey/200). |

No new API surface is required from the store for the six states or the circle fill; the existing `pages` computed in `ProgressIndicator.vue` already has `completionPercentage` and `isActive` per page.

---

## 7. Component Contract (ProgressIndicator)

**Inputs (unchanged):**

- Route: `stepId`, `pageId` (current page).
- Store: `calculatePageCompletionPercentage(stepId, pageId)` for each page in the current step.
- Config: `getStepById(stepId)` → `pageIds`; formData for titles (and blocks for active page).

**Output per page (already provided by current `pages` computed):**

- `id` (pageId)
- `title`
- `isActive`
- `completionPercentage` (0–100)
- `blocks` (for active page; used for expandable block list)

**New behavior (UI only):**

- Render a **circular progress ring** around the step number for each page.
- Ring fill = `completionPercentage` (0–100).
- Track (unfilled part): `progress-bg` (grey/200).
- Fill color: active → `primary/main` (accent); inactive → `text/secondary`.
- At 100%: show checkmark instead of number (existing behavior; keep it).
- Number color: active → primary; inactive → secondary/muted.

---

## 8. Summary

- **Backend:** No new state or APIs. Progress per page is already computed by `calculatePageCompletionPercentage(step, page)` for every page in the step.
- **Data flow:** Config + formData + store + route → per-page `completionPercentage` and `isActive` → six-state descriptor → circle fill and styling.
- **Scaling / restructuring:** Safe because page list and progress are derived from config and formData; keys are stable IDs (`pageId`, `blockId`, `questionId`). No stored progress to migrate.
- **Implementation work:** Confined to `ProgressIndicator.vue` (and optionally a small state helper and CSS). Use existing design tokens for fill and track so the progress circle matches the provided UI specs.
