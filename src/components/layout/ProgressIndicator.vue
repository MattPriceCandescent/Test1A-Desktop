<template>
  <aside class="layout-paper fixed right-0 top-16 bottom-0 w-80 bg-paper border-l border-border overflow-y-auto">
    <div class="p-6 pb-24">
      <h2 class="text-base font-bold text-text-primary mb-6">{{ progressHeading }}</h2>

      <!-- Page-level Progress with nested form blocks (current step only) -->
      <div v-if="currentStepConfig" class="relative">
        <!-- Connecting line (z-0 so it stays behind step circles) -->
        <div class="progress-track absolute left-4 top-8 bottom-0 w-0.5 bg-progress-bg z-0"></div>

        <div
          v-for="(page, index) in pages"
          :key="page.id"
          class="relative mb-6"
        >
          <!-- Page indicator -->
          <div
            :class="[
              'flex items-center gap-3 mb-2',
              page.isActive ? 'accent-text text-accent font-bold' : page.completionPercentage === 100 ? 'text-text-secondary' : 'text-text-muted'
            ]"
          >
            <StepProgressCircle
              :percentage="page.completionPercentage"
              :is-active="page.isActive"
              class="relative z-10"
            >
              <!-- Checkmark: blue when active, gray when inactive (completed but not viewed) -->
              <svg
                v-if="page.circleState.isComplete"
                class="w-5 h-5 flex-shrink-0"
                :class="page.isActive ? 'accent-text text-accent' : 'text-text-secondary'"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <!-- Number when not complete: primary on inner circle when active, secondary when inactive -->
              <span
                v-else
                class="text-sm font-semibold"
                :class="page.isActive ? 'accent-text text-accent' : 'text-text-secondary'"
              >{{ index + 1 }}</span>
            </StepProgressCircle>
            <button
              @click="handlePageClick(page.id)"
              :class="[
                'flex-1 text-left cursor-pointer hover:underline',
                page.isActive ? 'font-bold' : 'font-normal'
              ]"
            >
              {{ page.title }}
            </button>
          </div>

          <!-- Form blocks (only visible for active page) -->
          <div v-if="page.isActive && page.blocks.length > 0" class="ml-11 mt-2 space-y-4">
            <button
              v-for="block in page.blocks"
              :key="block.id"
              type="button"
              class="mb-3 w-full text-left rounded cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              @click="handleBlockClick(block, page.id)"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-text-muted">{{ block.title }}</span>
                <span class="text-xs text-text-muted">{{ block.answered }}/{{ block.total }}</span>
              </div>
              <!-- Progress bar -->
              <div class="progress-track w-full bg-progress-bg rounded-full h-1.5">
                <div
                  class="accent-fill bg-progress-fill h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: `${block.percentage}%` }"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <div class="fixed bottom-6 right-6">
        <button class="accent-bg text-inverse w-12 h-12 bg-accent text-text-inverse rounded-full shadow-lg hover:bg-accent-hover transition-colors flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOnboardingStore } from '../../stores/onboardingStore'
import { formData } from '../../data/formData'
import { getStepById, onboardingSteps } from '../../data/onboardingConfig'
import { getStepCircleState } from '../../composables/useStepCircleState'
import StepProgressCircle from './StepProgressCircle.vue'

const route = useRoute()
const router = useRouter()
const store = useOnboardingStore()

const stepId = computed(() => route.params.stepId || '')
const pageId = computed(() => route.params.pageId || '')

const currentStepConfig = computed(() => getStepById(stepId.value))

const progressHeading = computed(() => {
  const config = currentStepConfig.value
  if (!config) return 'Your progress'
  const stepIndex = onboardingSteps.findIndex(s => s.id === config.id)
  const stepNumber = stepIndex >= 0 ? stepIndex + 1 : 0
  const label = config.title.replace(/^Step \d+:\s*/i, '').trim()
  return label ? `${stepNumber}: ${label} progress` : 'Your progress'
})

const pages = computed(() => {
  const config = currentStepConfig.value
  if (!config) return []

  return config.pageIds.map((pid, index) => {
    const pageData = formData[stepId.value]?.[pid]
    const isActive = pageId.value === pid
    const completionPercentage = store.calculatePageCompletionPercentage(stepId.value, pid)

    let blocks = []
    if (pageData) {
      if (pageData.dynamicFormBlocks && pageData.vendorBlockTemplate) {
        const ids = store.getDynamicBlockIds(stepId.value, pid)
        const questions = pageData.vendorBlockTemplate.questions || []
        blocks = ids.map((id, index) => {
          const name = store.getAnswer(stepId.value, pid, id, 'q1')
          const nameStr = typeof name === 'string' ? name.trim() : ''
          const title = nameStr ? `${index + 1}. ${nameStr}` : `${index + 1}. 4th party`
          const { answered, total } = store.getBlockProgressCounts(stepId.value, pid, id, questions)
          const percentage = total > 0 ? Math.round((answered / total) * 100) : 0
          return { id, title, answered, total, percentage }
        })
      } else {
        blocks = (pageData.formBlocks || []).map(block => {
          const { answered, total } = store.getBlockProgressCounts(stepId.value, pid, block.id, block.questions)
          const percentage = total > 0 ? Math.round((answered / total) * 100) : 0
          return {
            id: block.id,
            title: block.title,
            answered,
            total,
            percentage
          }
        })
      }
    }

    const circleState = getStepCircleState(isActive, completionPercentage)

    return {
      id: pid,
      title: pageData ? pageData.title : '',
      isActive,
      completionPercentage,
      circleState,
      blocks
    }
  })
})

const handlePageClick = (targetPageId) => {
  const targetPath = `/step/${stepId.value}/page/${targetPageId}`
  if (route.path !== targetPath) {
    router.push(targetPath)
  }
}

const handleBlockClick = (block, blockPageId) => {
  const blockId = 'block-' + block.id
  if (pageId.value === blockPageId) {
    nextTick(() => {
      const el = document.getElementById(blockId)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  } else {
    router.push(`/step/${stepId.value}/page/${blockPageId}#${blockId}`)
  }
}
</script>
