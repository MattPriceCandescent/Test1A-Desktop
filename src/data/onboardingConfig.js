/**
 * Single source of truth for onboarding step and page structure.
 * Router, store, navigation, and progress all derive from this config.
 */

export const onboardingSteps = [
  { id: 'step1', title: 'Step 1: Get access to the sandbox', pageIds: ['page1'] },
  { id: 'step2', title: 'Step 2: Security & compliance', pageIds: ['page1', 'page2', 'page3', 'page4', 'page5'] },
  { id: 'step3', title: 'Step 3: Product information', pageIds: ['page1', 'page2', 'page3', 'page4'] }
]

/**
 * Flatten to ordered list of { stepId, pageId } for prev/next navigation and progress.
 * @returns { Array<{ stepId: string, pageId: string }> }
 */
export function getOrderedPages() {
  const ordered = []
  for (const step of onboardingSteps) {
    for (const pageId of step.pageIds) {
      ordered.push({ stepId: step.id, pageId })
    }
  }
  return ordered
}

/**
 * Get index of (stepId, pageId) in the ordered page list, or -1 if not found.
 * @param {string} stepId
 * @param {string} pageId
 * @returns {number}
 */
export function getOrderedPageIndex(stepId, pageId) {
  const ordered = getOrderedPages()
  return ordered.findIndex(p => p.stepId === stepId && p.pageId === pageId)
}

/**
 * Check if (stepId, pageId) is the last page of its step (submit page).
 * @param {string} stepId
 * @param {string} pageId
 * @returns {boolean}
 */
export function isLastPageOfStep(stepId, pageId) {
  const step = onboardingSteps.find(s => s.id === stepId)
  if (!step) return false
  const lastPageId = step.pageIds[step.pageIds.length - 1]
  return pageId === lastPageId
}

/**
 * Get step config by id.
 * @param {string} stepId
 * @returns {{ id: string, title: string, pageIds: string[] } | undefined}
 */
export function getStepById(stepId) {
  return onboardingSteps.find(s => s.id === stepId)
}

/**
 * Check if (stepId, pageId) exists in config.
 * @param {string} stepId
 * @param {string} pageId
 * @returns {boolean}
 */
export function isValidStepPage(stepId, pageId) {
  const step = getStepById(stepId)
  return !!step && step.pageIds.includes(pageId)
}
