# Prompt: Add form content from table

Use this prompt as-is, then paste your table below it.

---

**Add the questions below to `src/data/formData.js`.** Full spec: `docs/FORM_COMPONENTS_KNOWLEDGE.md`.

- **Target:** Update the `questions` array for the form block(s) in the table. Page = `formData[stepId][pageId]` (e.g. step1.page1, step2.page4). Block = the block whose `id` matches (e.g. `existing-integration`, `files-to-upload`).
- **Question shape:** `{ id, type, label, ... }`. Use `q1`, `q2`, … per block. **Types and optional fields:**
  - **radio** — `options` (default `["Yes", "No"]`)
  - **text** — `placeholder`
  - **textarea** — `placeholder`
  - **select** — `options`, `placeholder` (default "Select"). If options include `"Other"`, a follow-up text field is shown when user selects Other.
  - **date** — `placeholder` (default "MM/DD/YYYY"); value stored as YYYY-MM-DD
  - **file** — `description`
- **Only change:** The `questions` arrays for the specified blocks. Do not add/remove blocks or change step/page structure.

Table:
