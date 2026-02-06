<template>
  <div class="layout-surface bg-surface rounded-lg shadow-sm border border-border overflow-hidden">
    <div class="p-6">
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-4 flex-1">
        <!-- Icon -->
        <div
          :class="[
            'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
            (isActive || isSubmitted) ? 'bg-accent-muted' : 'bg-muted'
          ]"
        >
          <!-- Step 1 Icon -->
          <svg v-if="step === 1" :class="['w-6 h-6', (isActive || isSubmitted) ? 'text-accent' : 'text-text-muted']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <!-- Step 2 Icon -->
          <svg v-else-if="step === 2" :class="['w-6 h-6', (isActive || isSubmitted) ? 'text-accent' : 'text-text-muted']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <!-- Step 3 Icon -->
          <svg v-else :class="['w-6 h-6', (isActive || isSubmitted) ? 'text-accent' : 'text-text-muted']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <h3 class="text-lg font-bold text-text-primary mb-1">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-sm text-text-muted mb-2">{{ subtitle }}</p>
          <p v-if="description" class="text-text-secondary mb-4">{{ description }}</p>

          <!-- Status Tags -->
          <div class="flex items-center gap-4 flex-wrap">
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm',
                (isActive || isSubmitted) ? 'bg-accent-muted text-accent-muted-text' : 'bg-muted text-text-secondary'
              ]"
            >
              {{ statusText }}
            </span>
            <span class="text-sm text-text-muted flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {{ supportComments }} Support comments
            </span>
            <span class="text-sm text-text-muted flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ reviewTime }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex items-center gap-2">
        <button
          v-if="isSubmitted"
          @click="$emit('review')"
          class="btn-secondary-outline px-6 py-2 bg-surface border rounded-lg hover:bg-accent-muted transition-colors flex items-center gap-2"
        >
          Review submission
        </button>
        <button
          v-else-if="isActive"
          @click="$emit('start')"
          class="accent-bg text-inverse px-6 py-2 bg-accent text-text-inverse rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-2"
        >
          {{ step === 1 ? 'Start' : 'Open' }}
        </button>
        <button
          v-else
          disabled
          class="px-6 py-2 bg-muted text-text-muted rounded-lg cursor-not-allowed flex items-center gap-2"
        >
          Locked
        </button>
        <button class="p-2 text-text-muted hover:text-text-secondary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
    </div>

    <!-- Status banner: flush to bottom of card, full width, no surrounding spacing -->
    <div v-if="isSubmitted" class="border-t border-border bg-accent-muted px-6 py-4 rounded-b-lg">
      <div class="flex items-start gap-3">
        <svg class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="flex-1">
          <p class="text-sm text-text-primary mb-2">{{ successMessage }}</p>
          <p class="text-sm text-text-secondary">
            Review expected by <span class="font-semibold">{{ expectedReviewDate }}</span>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  step: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isSubmitted: {
    type: Boolean,
    default: false
  },
  expectedReviewDate: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  supportComments: {
    type: Number,
    default: 0
  },
  reviewTime: {
    type: String,
    default: ''
  }
})

defineEmits(['start', 'review'])

const statusText = computed(() => {
  if (props.isSubmitted) return 'Submitted'
  return props.isActive ? 'Ready to start' : 'Not ready to start'
})
</script>
