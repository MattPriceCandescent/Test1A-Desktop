# Theme & UI Implementation Knowledge Export

This document captures the decisions and methodology from the light/dark theme and UI consistency work. Use it to preserve context when starting a new chat or onboarding others.

---

## 1. Theme Architecture (Design Tokens)

**Approach:** CSS custom properties as single source of truth; Tailwind `darkMode: 'class'` toggles `.dark` on `<html>`.

- **File:** `src/style.css` — All theme values live in `:root` (light) and `.dark` (dark).
- **File:** `tailwind.config.js` — `theme.extend.colors` maps semantic names to `var(--color-*)` so utilities like `bg-page`, `text-text-primary` exist.
- **Problem encountered:** Tailwind utilities that use these variables often did **not** apply correctly (buttons, borders, layout fills showed wrong or default colors). The fix was **explicit utility classes in style.css** that set the property directly (e.g. `background-color: var(--color-bg-paper)`).

---

## 2. Explicit CSS Classes (Use These, Not Only Tailwind)

These classes in `src/style.css` are the **reliable** way to get the right colors. Prefer them over Tailwind when consistency matters.

| Purpose | Class | What it does |
|--------|--------|---------------|
| **Layout fills** | `.layout-page` | Background = page/default (#FAFAFA / #171717) |
| | `.layout-paper` | Background = paper (#FFFFFF / #252525 dark); also `isolation: isolate` so fixed chrome doesn’t show content through |
| | `.layout-surface` | Background = surface (cards, form blocks) |
| **Primary/accent** | `.accent-bg` | Background = accent (primary blue) |
| | `.accent-text` | Text/icon color = accent |
| | `.accent-border` | Border color = accent |
| | `.accent-fill` | Progress bar fill color |
| | `.accent-muted-bg` | Background = accent-muted (e.g. left nav active) |
| **Primary buttons** | `.text-inverse` | Text color = inverse (white light / dark dark) so label on blue is readable |
| **Secondary outline** | `.btn-secondary-outline` | Blue text + blue border (and `svg` inherits color) |
| **Secondary disabled** | `.btn-secondary-outline-disabled` | Muted text + border, `cursor: not-allowed` |
| **Progress component** | `.progress-track` | Track/inactive circle background (visible grey) |
| | `.progress-step-inactive` | Inactive step circle background |
| | `.progress-step-active` | Active step number uses inverse color (visible on blue circle) |

**Where they’re used:** App root and main = `layout-page`. Header, left nav, right aside, bottom bar = `layout-paper`. Form blocks & StepCard = `layout-surface`. All primary CTAs = `accent-bg` + `text-inverse`. Secondary outline buttons (Save and exit, Previous when enabled) = `btn-secondary-outline`; Previous on page 1 = `btn-secondary-outline-disabled`. Progress indicator: track, circles, active number use the progress classes above.

---

## 3. Design System Color Mapping (From Screenshots)

Tokens in `style.css` align with the provided design system:

- **Primary:** `--color-accent` = primary/main (#1A6CDA light / #71AAF4 dark); `--color-accent-hover` = primary/dark (#14427C / #96CBF8).
- **Backgrounds:** `--color-bg-page` = background/default; `--color-bg-paper` / `--color-bg-surface` = background/paper.
- **Text:** `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse` = text/primary, secondary, disabled, inverse.
- **Borders:** `--color-border` (divider), `--color-border-interactive` (inputs).
- **Progress:** `--color-progress-bg` (track; light mode made visible as #D1D5DB), `--color-progress-fill` = accent.

Dark mode was tuned for **contrast:** paper (#252525) vs page (#171717), stronger borders, lighter secondary/muted text so labels remain readable.

---

## 4. Fixed Chrome and Scroll (No Show-Through)

- **Layout:** Header, left nav, bottom bar, right progress panel use `layout-paper` so they paint with a solid background (`isolation: isolate` helps).
- **Stacking:** `main.layout-page` has `position: relative; z-index: 0` so scrolling content stays **behind** the fixed chrome (z-40/z-50).
- **Bottom bar overlap:** Main content has `pb-24` so when scrolled to the end, the bar sits over padding, not over the last form field.

---

## 5. FOUC and Theme Persistence

- **`index.html`:** A small inline script in `<head>` reads `localStorage.getItem('theme-preference')` and applies `.dark` on `<html>` before first paint (avoids flash of wrong theme).
- **`src/stores/themeStore.js`:** Holds preference (`light` | `dark` | `system`), persists to `localStorage`, applies class to `document.documentElement`, listens to `prefers-color-scheme` when preference is `system`.
- **`main.js`:** After Pinia is installed, calls `useThemeStore().init()` so the app and store stay in sync with the script in the head.

---

## 6. Form Controls and Native Elements

- **Radios/checkboxes:** In `style.css`, `input[type="radio"]` and `input[type="checkbox"]` use `accent-color: var(--color-accent)` so the selected state uses the design system primary.
- **Inputs/textareas:** Default text and placeholder use `var(--color-text-primary)` and `var(--color-text-muted)`; body and `#app` set `color: var(--color-text-primary)` so inherited text follows the theme.

---

## 7. File Reference (Where Things Live)

| What | Where |
|------|--------|
| All theme variables & explicit UI classes | `src/style.css` |
| Tailwind theme (semantic colors, darkMode: 'class') | `tailwind.config.js` |
| Theme state, persistence, apply .dark | `src/stores/themeStore.js` |
| FOUC script | `index.html` <head> |
| Theme init on load | `src/main.js` |
| Bottom nav (primary + secondary buttons) | `src/components/layout/PageNavigation.vue` |
| Progress track/circles/active number | `src/components/layout/ProgressIndicator.vue` |
| Form question types, components, and how to add questions | `docs/FORM_COMPONENTS_KNOWLEDGE.md` |

---

## 8. Quick Checklist for New UI

- **Backgrounds:** Use `layout-page` (page), `layout-paper` (chrome), or `layout-surface` (cards) so fills always apply.
- **Primary buttons:** Use `accent-bg` and `text-inverse` (and keep Tailwind classes for layout if desired).
- **Secondary outline buttons:** Use `btn-secondary-outline`; for disabled, use `btn-secondary-outline-disabled`.
- **Links or text that should be primary blue:** Use `accent-text` (and `accent-border` if bordered).
- **Progress/tracks:** Use `progress-track` and `progress-step-inactive` for visible track/circles; use `progress-step-active` for the number inside the active (blue) circle.
- **New theme-dependent color:** Add the variable in `:root` and `.dark` in `style.css`, then either add a small utility class there or extend `tailwind.config.js` and add an explicit class if the utility doesn’t apply reliably.

This keeps the methodology and decisions preserved for future work or new chats.
