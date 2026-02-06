<template>
  <div>
    <label
      :class="[
        'block font-medium mb-3',
        isAnswered ? 'text-answered' : 'text-text-primary'
      ]"
    >
      {{ label }}
    </label>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in options"
        :key="tag"
        type="button"
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors',
          selectedSet.has(tag)
            ? 'bg-accent text-inverse border-accent'
            : 'bg-surface border-border text-text-primary hover:border-accent hover:bg-accent-muted/50'
        ]"
        @click="toggle(tag)"
      >
        <template v-if="selectedSet.has(tag)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ tag }}
        </template>
        <template v-else>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ tag }}
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  isAnswered: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const selectedSet = computed(() => new Set(Array.isArray(props.modelValue) ? props.modelValue : []))

function toggle(tag) {
  const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const set = new Set(list)
  if (set.has(tag)) {
    set.delete(tag)
  } else {
    set.add(tag)
  }
  emit('update:modelValue', Array.from(set))
}
</script>
