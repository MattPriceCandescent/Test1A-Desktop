# Form Components & Question Types — Knowledge Base

This document describes how form questions are implemented so future questions and question types can be added consistently. Use it when adding form content, new question types, or changing form UI.

---

## 1. Question types and components

Form blocks are defined in `src/data/formData.js`. Each question has a `type` that determines which component is used. The mapping lives in `src/views/StepPage.vue` (`getComponentType`).

| Question type | Component | Layout | Use for |
|---------------|-----------|--------|---------|
| **radio** | `RadioGroup.vue` | Row (label left, options right) | Yes/No or small fixed set of options |
| **text** | `TextField.vue` | Row (label left, input right) | Short, single-line answers |
| **textarea** | `TextArea.vue` | Stacked (label above, textarea below) | Long / multi-line answers |
| **select** | `SelectMenu.vue` | Row (label left, dropdown right); "Other" follow-up input below when shown | Single choice from a list; supports "Other" with follow-up text |
| **date** | `DateInput.vue` | Row (label left, date input + icon right) | Date; stored as YYYY-MM-DD |
| **file** | `FileUpload.vue` | Stacked (label/description, checkbox, button, file card or explanation) | File upload with optional "I don't have this file" + explanation |
| **mediaGallery** | `FeaturedMedia.vue` | Stacked (label, description, grid of media slots, upload area, YouTube URL) | Featured hero + up to 8 images/videos or YouTube links; value is array of `{ type, file?, url?, preview? }` |
| **linkList** | `SupportLinks.vue` | Stacked (label, repeatable title+URL rows, "Add another" button) | Dynamic list of support links; value is array of `{ title, url }` |
| **tagPicker** | `TagPicker.vue` | Stacked (label, pill buttons for options) | Multi-select tags; value is array of selected option strings; requires `options` |

**Fallback:** Any unknown `type` is rendered with `TextArea`.

**Visual spec:** See `docs/form styling.png` for how each type should look (short text, Yes/No, dropdown, date, file upload states).

---

## 2. Question shape in formData.js

Each question in a block’s `questions` array must have at least `id`, `type`, and `label`. Optional fields depend on type:

| Type | Required | Optional |
|------|----------|----------|
| radio | `id`, `type`, `label` | `options` (default `["Yes", "No"]`) |
| text | `id`, `type`, `label` | `placeholder` |
| textarea | `id`, `type`, `label` | `placeholder` |
| select | `id`, `type`, `label` | `options`, `placeholder` (default "Select"). If `options` includes `"Other"`, a follow-up text field is shown when user selects Other. |
| date | `id`, `type`, `label` | `placeholder` (default "MM/DD/YYYY"; native date input may not show it) |
| file | `id`, `type`, `label` | `description` |
| mediaGallery | `id`, `type`, `label` | `description` |
| linkList | `id`, `type`, `label` | — |
| tagPicker | `id`, `type`, `label` | `options` (array of tag strings) |

**Example:**

```js
{
  id: "q1",
  type: "radio",
  label: "Do you have an existing integration?",
  options: ["Yes", "No"]
},
{
  id: "q2",
  type: "select",
  label: "How often?",
  options: ["Annually", "Quarterly", "Other"],
  placeholder: "Select"
}
```

Use `q1`, `q2`, … per block for `id`. See `docs/PROMPT-form-content.md` for the prompt used when adding questions from a table.

---

## 3. Answer storage and “answered” logic

- **Where:** `src/stores/onboardingStore.js`. Answers are stored as `answers[stepId][pageId][blockId][questionId]`.
- **Values:**
  - **radio, text, textarea, date:** string (or empty string).
  - **file:** object `{ file: File | null, explanation?: string }`.
  - **select (no Other):** string (selected option).
  - **select (with Other):** when user selects "Other", object `{ value: "Other", other: "user text" }`. When user selects a non-Other option, a plain string is stored.

**“Answered” for block/page completion:** The store’s `isAnswerFilled(answer)` decides if a question counts as answered. For select with Other, `value === "Other"` is only filled when `other` is non-empty. FormBlock and progress use this so “Other” without text does not complete the question.

---

## 4. Where things live

| What | Where |
|------|--------|
| Question type → component mapping | `src/views/StepPage.vue` — `getComponentType`, `getComponentProps` |
| Form data (steps, pages, blocks, questions) | `src/data/formData.js` |
| Answer state & isAnswerFilled | `src/stores/onboardingStore.js` |
| Question-type components | `src/components/forms/` — RadioGroup, TextField, TextArea, SelectMenu, DateInput, FileUpload |
| Block wrapper & completion | `src/components/forms/FormBlock.vue` |
| Row wrapper (separator, answered state) | `src/components/forms/QuestionRow.vue` |
| Shared input styling | `src/style.css` — `.form-input` |

---

## 5. Adding new questions (existing types)

1. Open `src/data/formData.js`.
2. Find the page: `formData[stepId][pageId]` (e.g. `step1.page1`).
3. Find the block in that page whose `id` matches your block.
4. Append to that block’s `questions` array an object with `id`, `type`, `label`, and any type-specific fields (see section 2).
5. Keep `id` unique within the block (`q1`, `q2`, …).

Use the prompt in `docs/PROMPT-form-content.md` when adding from a table.

---

## 6. Adding a new question type (new component)

1. **Create the component** in `src/components/forms/` (e.g. `NewType.vue`). Use row or stacked layout and `.form-input` for inputs so it matches the spec.
2. **Register in StepPage.vue:** Import the component and add a mapping in `getComponentType`, e.g. `newType: NewType`.
3. **Pass props in `getComponentProps`:** Add a branch for `question.type === 'newType'` and return `baseProps` plus any type-specific props (e.g. options, placeholder).
4. **Answer handling:** If the answer is not a simple string, extend `isQuestionAnswered` in StepPage and `isAnswerFilled` in the store so block/page completion is correct.
5. **Document:** Add the type and optional fields to this doc (sections 1 and 2) and to `docs/PROMPT-form-content.md`.

---

## 7. Quick reference: types for prompts

When writing prompts or docs that refer to question types, use:

**radio**, **select**, **text**, **textarea**, **date**, **file**

With optional fields: **radio** (`options`), **select** (`options`, `placeholder`), **text** (`placeholder`), **textarea** (`placeholder`), **date** (`placeholder`), **file** (`description`).
