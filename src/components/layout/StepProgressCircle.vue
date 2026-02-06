<template>
  <div class="relative flex-shrink-0" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg
      class="absolute inset-0 w-full h-full -rotate-90"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <!-- Base disc: opaque paper so vertical connector line doesn't bleed through -->
      <circle
        class="progress-circle-inner"
        fill="currentColor"
        cx="16"
        cy="16"
        :r="radius"
      />
      <!-- Track: full circle (grey/200) -->
      <circle
        class="progress-circle-track"
        fill="none"
        stroke-width="2.5"
        cx="16"
        cy="16"
        :r="radius"
      />
      <!-- Fill: arc by percentage (primary or text-secondary) -->
      <circle
        v-if="progressFraction > 0"
        :class="isActive ? 'progress-circle-fill-active' : 'progress-circle-fill-inactive'"
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        cx="16"
        cy="16"
        :r="radius"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        class="transition-all duration-300"
      />
      <!-- Inner circle: solid disc behind number so it stays visible (paper bg) -->
      <circle
        class="progress-circle-inner"
        fill="currentColor"
        cx="16"
        cy="16"
        :r="innerRadius"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 0-100 */
  percentage: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 32
  }
})

const radius = 14
const innerRadius = 11.5
const circumference = 2 * Math.PI * radius

const progressFraction = computed(() => Math.min(1, Math.max(0, (props.percentage || 0) / 100)))

const strokeDashoffset = computed(() => circumference * (1 - progressFraction.value))
</script>
