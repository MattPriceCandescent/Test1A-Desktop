# Progress Circle: Execution Plan

This plan turns the [architecture](PROGRESS-CIRCLE-ARCHITECTURE.md) into concrete, ordered steps. Complete phases in order; each phase can be verified before moving on.

---

## Phase 1: Six-state helper and CSS tokens

**Goal:** Centralize state logic and ensure design tokens exist for the circle.

### 1.1 Add step-circle state helper

- **Where:** Either inside `ProgressIndicator.vue` (script) or a small composable e.g. `src/composables/useStepCircleState.js`.
- **What:** A function that takes `(isActive, completionPercentage)` and returns a consistent descriptor, e.g.:
  - `{ isActive, isComplete, hasProgress, stateKey }` where `stateKey` is one of:  
    `'active-with-progress' | 'active-without-progress' | 'active-complete' | 'inactive-with-progress' | 'inactive-without-progress' | 'inactive-complete'`
  - Optionally also `progressFraction` (0–1) for the ring.
- **Why:** Single place for the six-state logic; template and tests use the same rules.

**Check:** Unit test or manual test that all six combinations of (active/inactive, 0% / 1–99% / 100%) map to the correct `stateKey`.

### 1.2 CSS: progress circle tokens and classes

- **Where:** `src/style.css`
- **What:**
  - Confirm or add:
    - Track (unfilled ring): already have `--color-progress-bg` (grey/200).
    - Fill active: `--color-accent` / `--color-progress-fill` (primary/main).
    - Fill inactive: `--color-text-secondary`.
  - Add utility classes if needed, e.g.:
    - `.progress-circle-fill-active` → fill uses accent/primary.
    - `.progress-circle-fill-inactive` → fill uses text-secondary.
    - `.progress-circle-track` → track uses progress-bg.
- **Why:** UI spec colors in one place; circle component uses these classes.

**Check:** Classes/vars exist and are used in Tailwind or direct CSS; no hardcoded hex in the circle.

---

## Phase 2: Circular progress ring component

**Goal:** Reusable ring that shows 0–100% fill and respects active/inactive styling.

### 2.1 Implement the ring

- **Where:** New component e.g. `src/components/layout/StepProgressCircle.vue` (or a section inside `ProgressIndicator.vue` if you prefer fewer files).
- **Props:** e.g. `percentage` (0–100), `isActive` (boolean), `size` (optional, default ~32px to match current circle).
- **Behavior:**
  - SVG (or CSS conic gradient) circle with:
    - **Track:** full circle, color = progress-bg (grey/200).
    - **Fill:** arc from 0% to `percentage` of circumference; color = primary when active, text-secondary when inactive.
  - Common approach: SVG circle with `stroke-dasharray` / `stroke-dashoffset` to draw the arc; or a second circle for the fill arc.
- **Center content:** Slot or default for number/checkmark (Phase 3 will pass this in).

**Check:** Story or isolated view: ring at 0%, 33%, 100% for both active and inactive; correct track and fill colors.

### 2.2 Accessible and responsive

- **What:** Keep `w-8 h-8` (or equivalent) so layout doesn’t shift; ensure ring is visible in light and dark theme.
- **Check:** Visual pass in both themes; no layout shift when percentage changes.

---

## Phase 3: Integrate into ProgressIndicator

**Goal:** Replace the current step circle with the new ring and apply the six states end-to-end.

### 3.1 Use state helper in `pages` computed

- **Where:** `ProgressIndicator.vue` script.
- **What:** For each page in the `pages` computed, add the step-circle state (from Phase 1.1), e.g.:
  - `circleState: getStepCircleState(page.isActive, page.completionPercentage)`  
  so each page has `circleState.stateKey`, `circleState.isComplete`, etc.

**Check:** `pages` still has `id`, `title`, `isActive`, `completionPercentage`, `blocks`, and now `circleState`.

### 3.2 Replace circle markup with StepProgressCircle

- **Where:** `ProgressIndicator.vue` template, inside the `v-for="(page, index) in pages"` block.
- **What:**
  - Remove the current `<div>` that wraps the number/checkmark (the one with `progress-step-active` / `progress-step-inactive`).
  - Insert `StepProgressCircle` (or equivalent) with:
    - `:percentage="page.completionPercentage"`
    - `:is-active="page.isActive"`
  - Use the component’s slot (or default) for:
    - **Number:** `index + 1` when not complete (`!page.circleState.isComplete`).
    - **Checkmark:** when `page.circleState.isComplete` (same SVG as current checkmark).
  - Apply text color for the number from state: active → primary/accent, inactive → text-secondary/muted (via class on the slot content or wrapper).

**Check:** All six states appear correctly when navigating and changing completion (0%, partial, 100%) on different pages.

### 3.3 Label and row styling

- **What:** Keep existing row behavior:
  - Page title button (click → navigate).
  - Row text/label: active = bold + accent; inactive complete = text-secondary; inactive incomplete = text-muted.
  - Connecting line and block list only for active page.
- **Check:** No regressions: navigation, expand/collapse of blocks, connecting line alignment.

---

## Phase 4: Polish and verification

**Goal:** Match UI spec and ensure nothing is broken.

### 4.1 Six-state visual audit

- **What:** Manually verify each state against the UI spec screenshots:
  - Active with progress, active without progress, active complete.
  - Inactive with progress, inactive without progress, inactive complete.
- **Check:** Fill color (primary vs text-secondary), track (grey/200), number vs checkmark, number color.

### 4.2 Restructuring smoke test

- **What:** (Optional) Temporarily change `onboardingConfig.js` (e.g. reorder `pageIds` or add a page in formData and config) and confirm:
  - Progress sidebar shows the new order and new page.
  - Progress percentages still correct; no console errors; list keyed by `page.id`.
- **Check:** Revert config; confirm no lasting breakage.

### 4.3 Cross-step and dynamic blocks

- **What:** Test step2 (multiple pages) and, if applicable, step2 page5 (dynamic blocks). Confirm:
  - Each page shows its own progress in the sidebar.
  - Completing questions on one page updates that page’s circle only; switching pages shows correct percentages.
- **Check:** Per-page progress is correct; block list under active page still works.

---

## Summary checklist

| Phase | Deliverable | Done |
|-------|-------------|------|
| 1.1   | Step-circle state helper (six states from isActive + percentage) | ☑ |
| 1.2   | CSS tokens/classes for circle track and fill (active/inactive) | ☑ |
| 2.1   | StepProgressCircle (or inline) ring with percentage + active/inactive | ☑ |
| 2.2   | Ring works in both themes, no layout shift | ☑ |
| 3.1   | `pages` computed includes circleState | ☑ |
| 3.2   | ProgressIndicator uses ring + number/checkmark for each page | ☑ |
| 3.3   | Row/label styling and block list unchanged | ☑ |
| 4.1   | Six-state visual audit vs UI spec | ☐ |
| 4.2   | Restructuring smoke test (optional) | ☐ |
| 4.3   | Multi-page and dynamic-block test | ☐ |

---

## File changes overview

| File | Action |
|------|--------|
| `src/components/layout/ProgressIndicator.vue` | Extend `pages` with circleState; replace circle with ring component; keep rest of layout. |
| `src/components/layout/StepProgressCircle.vue` | **New.** Ring SVG + slot for number/check. |
| `src/composables/useStepCircleState.js` | **New** (optional). Six-state helper. |
| `src/style.css` | Add/confirm progress-circle fill/track classes. |
| `docs/PROGRESS-CIRCLE-ARCHITECTURE.md` | Reference only; no code changes. |

---

## Dependencies

- **Phase 2** can start in parallel with Phase 1 if you stub the state (e.g. always pass `isActive` and `percentage`).
- **Phase 3** depends on Phase 1 (state) and Phase 2 (ring component).
- **Phase 4** runs after Phase 3.

Estimated order: **1 → 2 → 3 → 4**. Small team or single dev: do 1.1 and 1.2 first, then 2, then 3, then 4.
