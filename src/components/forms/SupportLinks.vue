<template>
  <div>
    <label
      :class="[
        'block font-medium mb-2',
        isAnswered ? 'text-answered' : 'text-text-primary'
      ]"
    >
      {{ label }}
    </label>
    <div
      v-for="(link, index) in items"
      :key="index"
      class="flex flex-wrap items-center gap-3 mb-3"
    >
      <input
        type="text"
        :value="link.title"
        @input="updateLink(index, 'title', $event.target.value)"
        placeholder="Link Title"
        class="form-input flex-1 min-w-[140px] px-4 py-2 focus:outline-none"
      />
      <input
        type="url"
        :value="link.url"
        @input="updateLink(index, 'url', $event.target.value)"
        placeholder="Link URL"
        class="form-input flex-1 min-w-[200px] px-4 py-2 focus:outline-none"
      />
      <button
        type="button"
        @click="removeLink(index)"
        class="p-2 text-text-secondary hover:text-red-600 rounded transition-colors"
        aria-label="Remove link"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <button
      type="button"
      class="text-accent hover:text-accent-hover font-medium text-sm flex items-center gap-1"
      @click="addLink"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      Add another support link
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: {
    type: Array,
    default: () => []
  },
  isAnswered: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const items = computed(() => {
  const list = (Array.isArray(props.modelValue) ? props.modelValue : []).map(l => ({ title: l.title || '', url: l.url || '' }))
  return list.length ? list : [{ title: '', url: '' }]
})

function updateLink(index, field, value) {
  const list = items.value.map((l, i) => (i === index ? { ...l, [field]: value } : l))
  emit('update:modelValue', list)
}

function addLink() {
  emit('update:modelValue', [...items.value, { title: '', url: '' }])
}

function removeLink(index) {
  const list = items.value.filter((_, i) => i !== index)
  emit('update:modelValue', list.length ? list : [])
}
</script>
