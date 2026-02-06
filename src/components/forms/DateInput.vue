<template>
  <div class="flex items-start gap-3">
    <label
      :class="[
        'font-medium flex-1 mr-3 min-w-0',
        isAnswered ? 'text-answered' : 'text-text-primary'
      ]"
    >
      {{ label }}
    </label>
    <div class="date-input-wrapper relative flex-shrink-0 w-full min-w-[12rem] max-w-[256px]">
      <input
        type="date"
        :name="name"
        :value="displayValue"
        @input="handleInput"
        class="form-input w-full px-4 py-2 pr-10 focus:outline-none"
      />
      <span
        class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary"
        aria-hidden="true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Date],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'MM/DD/YYYY'
  },
  name: {
    type: String,
    default: ''
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// Value is stored as YYYY-MM-DD (ISO date string)
const displayValue = computed(() => {
  const v = props.modelValue
  if (v == null || v === '') return ''
  if (typeof v === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v
    return v
  }
  if (v instanceof Date) {
    return v.toISOString().slice(0, 10)
  }
  return ''
})

function handleInput(event) {
  const val = event.target.value
  emit('update:modelValue', val || '')
}
</script>

<style scoped>
/* Hide the browser's default calendar icon and extend the invisible click area
   to the right so clicking our styled icon opens the date picker. */
.date-input-wrapper input::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0;
  width: 2.5rem;
  min-height: 100%;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
