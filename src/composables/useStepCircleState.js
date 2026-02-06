/**
 * Step progress circle: six states from (isActive, completionPercentage).
 * Used by ProgressIndicator to drive ring fill and number/check styling.
 *
 * @param {boolean} isActive - Whether this step page is the current route
 * @param {number} completionPercentage - 0-100
 * @returns {{ isActive: boolean, isComplete: boolean, hasProgress: boolean, stateKey: string, progressFraction: number }}
 */
export function getStepCircleState(isActive, completionPercentage) {
  const pct = Math.min(100, Math.max(0, Number(completionPercentage) || 0))
  const isComplete = pct === 100
  const hasProgress = pct > 0

  let stateKey
  if (isActive) {
    stateKey = isComplete ? 'active-complete' : hasProgress ? 'active-with-progress' : 'active-without-progress'
  } else {
    stateKey = isComplete ? 'inactive-complete' : hasProgress ? 'inactive-with-progress' : 'inactive-without-progress'
  }

  return {
    isActive,
    isComplete,
    hasProgress,
    stateKey,
    progressFraction: pct / 100
  }
}
