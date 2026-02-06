<template>
  <div class="layout-paper fixed bottom-0 left-64 right-80 bg-paper border-t border-border px-6 py-4 flex flex-col gap-3 z-40">
    <!-- Message above buttons (on last page of each step) -->
    <div v-if="isLastPageOfCurrentStep" class="text-sm text-text-muted text-right">
      You'll be able to come back and add to your application after you submit it.
    </div>

    <!-- Buttons row -->
    <div class="flex items-center justify-end gap-4">
      <!-- Save & Exit -->
      <button
        @click="handleSaveAndExit"
        class="btn-secondary-outline px-4 py-2 bg-surface border rounded-lg hover:bg-accent-muted transition-colors"
      >
        Save and exit
      </button>

      <!-- Previous Button -->
      <button
        @click="handlePrevious"
        :disabled="!canGoPrevious"
        :class="[
          'px-4 py-2 bg-surface border rounded-lg transition-colors flex items-center gap-2',
          canGoPrevious
            ? 'btn-secondary-outline hover:bg-accent-muted'
            : 'btn-secondary-outline-disabled'
        ]"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>

      <!-- Primary Button (Continue/Submit) -->
      <button
        @click="handlePrimary"
        class="accent-bg text-inverse px-6 py-2 bg-accent text-text-inverse rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-2"
      >
        <span>{{ primaryButtonText }}</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { getOrderedPages, isLastPageOfStep } from '../../data/onboardingConfig'

const router = useRouter()
const route = useRoute()
const store = useOnboardingStore()

const stepId = computed(() => route.params.stepId || '')
const pageId = computed(() => route.params.pageId || '')

const orderedPages = getOrderedPages()
const currentIndex = computed(() => {
  return orderedPages.findIndex(p => p.stepId === stepId.value && p.pageId === pageId.value)
})

const canGoPrevious = computed(() => {
  return currentIndex.value > 0
})

const isLastPageOfCurrentStep = computed(() => {
  return isLastPageOfStep(stepId.value, pageId.value)
})

const primaryButtonText = computed(() => {
  return isLastPageOfCurrentStep.value ? 'Submit' : 'Continue'
})

const handleSaveAndExit = () => {
  router.push('/')
}

const handlePrevious = () => {
  if (!canGoPrevious.value) return
  const prev = orderedPages[currentIndex.value - 1]
  router.push(`/step/${prev.stepId}/page/${prev.pageId}`)
}

const handlePrimary = () => {
  store.markPageComplete(stepId.value, pageId.value)
  if (isLastPageOfCurrentStep.value) {
    store.markStepComplete(stepId.value)
    router.push('/')
  } else {
    const next = orderedPages[currentIndex.value + 1]
    router.push(`/step/${next.stepId}/page/${next.pageId}`)
  }
}
</script>
