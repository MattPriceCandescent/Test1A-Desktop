/**
 * Export formData to CSV with columns:
 * step, page, form block title, label, type, description
 */
import { formData } from '../src/data/formData.js';
import { writeFileSync } from 'fs';

function escapeCsv(value) {
  if (value == null || value === '') return '';
  const s = String(value);
  if (/[,"\n\r]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const rows = [];
const header = ['step', 'page', 'form block title', 'label', 'type', 'description'];
rows.push(header.join(','));

for (const [stepId, stepPages] of Object.entries(formData)) {
  for (const [pageId, page] of Object.entries(stepPages)) {
    if (!page || typeof page !== 'object') continue;

    const pageTitle = page.title ?? pageId;

    // Regular form blocks
    const formBlocks = page.formBlocks || [];
    for (const block of formBlocks) {
      const blockTitle = block.title || '';
      const questions = block.questions || [];
      for (const q of questions) {
        rows.push([
          escapeCsv(stepId),
          escapeCsv(pageTitle),
          escapeCsv(blockTitle),
          escapeCsv(q.label),
          escapeCsv(q.type),
          escapeCsv(q.description ?? '')
        ].join(','));
      }
    }

    // Dynamic vendor block template (e.g. step2 page5)
    const template = page.vendorBlockTemplate;
    if (template && template.questions && template.questions.length) {
      const blockTitle = (page.addVendorCard && page.addVendorCard.heading) || 'Vendor block template';
      for (const q of template.questions) {
        rows.push([
          escapeCsv(stepId),
          escapeCsv(pageTitle),
          escapeCsv(blockTitle),
          escapeCsv(q.label),
          escapeCsv(q.type),
          escapeCsv(q.description ?? '')
        ].join(','));
      }
    }
  }
}

const csv = rows.join('\n');
const outPath = new URL('../docs/form-data.csv', import.meta.url);
writeFileSync(outPath, csv, 'utf8');
console.log('Wrote', outPath.pathname);
console.log('Total rows (excluding header):', rows.length - 1);
