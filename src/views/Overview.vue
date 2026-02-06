<template>
  <div class="min-h-screen bg-page layout-page">
    <Header />
    <div class="flex">
      <LeftNav />
      <main class="flex-1 ml-64 mr-8 mt-16 mb-20 p-8 pb-24 bg-page layout-page">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-3xl font-bold text-text-primary mb-2">Marketplace Onboarding</h1>
          <p class="text-text-secondary mb-8">
            Complete the three-step marketplace onboarding process to get your solution listed. Each step requires approval before proceeding.
          </p>

          <div class="space-y-6">
            <StepCard
              v-for="(stepConfig, index) in onboardingSteps"
              :key="stepConfig.id"
              :step="index + 1"
              :title="stepConfig.title"
              :description="stepDescriptions[stepConfig.id]"
              :subtitle="stepConfig.id === 'step2' ? '[Company wide questions and documents]' : ''"
              :is-active="isStepActive(stepConfig.id)"
              :is-submitted="store.isStepSubmitted(stepConfig.id)"
              :expected-review-date="getReviewDate(stepConfig.id)"
              :success-message="stepSuccessMessages[stepConfig.id]"
              :support-comments="0"
              :review-time="stepReviewTimes[stepConfig.id]"
              @start="handleStartStep(stepConfig.id)"
              @review="handleReviewStep(stepConfig.id)"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '../stores/onboardingStore'
import { onboardingSteps } from '../data/onboardingConfig'
import Header from '../components/layout/Header.vue'
import LeftNav from '../components/layout/LeftNav.vue'
import StepCard from '../components/overview/StepCard.vue'

const router = useRouter()
const store = useOnboardingStore()

const stepDescriptions = {
  step1: 'Get access to the development sandbox environment to begin testing your integration.',
  step2: '',
  step3: 'Submit your marketplace listing details to showcase your solution to customers.'
}

const stepSuccessMessages = {
  step1: 'Sandbox access is on the way!',
  step2: 'Security & compliance review is in progress!',
  step3: 'Product information review is in progress!'
}

const stepReviewTimes = {
  step1: '1 week review time',
  step2: '3 - 4 week review time',
  step3: '3 - 4 week review time'
}

// Step N is active when it's the next one to do (all previous steps submitted)
function isStepActive(stepId) {
  const index = onboardingSteps.findIndex(s => s.id === stepId)
  for (let i = 0; i < index; i++) {
    if (!store.isStepSubmitted(onboardingSteps[i].id)) return false
  }
  return !store.isStepSubmitted(stepId)
}

const formatDate = (date) => {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getReviewDate(stepId) {
  const reviewDate = store.getExpectedReviewDate(stepId)
  return reviewDate ? formatDate(reviewDate) : ''
}

function getStepFirstPagePath(stepId) {
  const step = onboardingSteps.find(s => s.id === stepId)
  const firstPageId = step?.pageIds[0]
  return firstPageId ? `/step/${stepId}/page/${firstPageId}` : '/'
}

function handleStartStep(stepId) {
  router.push(getStepFirstPagePath(stepId))
}

function handleReviewStep(stepId) {
  router.push(getStepFirstPagePath(stepId))
}
</script>
