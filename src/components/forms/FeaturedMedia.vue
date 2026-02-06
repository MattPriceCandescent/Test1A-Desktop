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
    <p class="text-sm text-text-secondary mb-4">{{ description }}</p>

    <!-- Grid: featured (first) + slots 2–8 -->
    <div class="grid grid-cols-4 gap-3 mb-4">
      <div
        v-for="(item, index) in displayItems"
        :key="index"
        :class="[
          'relative rounded-lg border-2 border-dashed overflow-hidden bg-muted flex items-center justify-center min-h-[120px]',
          index === 0 ? 'col-span-2 row-span-2 min-h-[200px]' : ''
        ]"
      >
        <template v-if="item.type === 'youtube'">
          <div class="absolute inset-0 flex items-center justify-center bg-black/40">
            <span class="text-white text-xs px-2 truncate max-w-full">{{ item.url || 'YouTube' }}</span>
          </div>
          <button
            type="button"
            @click="removeItem(index)"
            class="absolute top-1 right-1 p-1 rounded bg-black/50 text-white hover:bg-black/70"
            aria-label="Remove"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </template>
        <template v-else-if="item.file">
          <img
            v-if="item.preview"
            :src="item.preview"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
          />
          <button
            type="button"
            @click="removeItem(index)"
            class="absolute top-1 right-1 p-1 rounded bg-black/50 text-white hover:bg-black/70"
            aria-label="Remove"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </template>
        <template v-else>
          <span class="text-text-muted text-sm">{{ index === 0 ? 'Featured' : index + 1 }}</span>
        </template>
      </div>
    </div>

    <!-- Upload area -->
    <div
      class="rounded-lg border-2 border-dashed border-border p-6 text-center mb-4 cursor-pointer hover:border-accent hover:bg-accent-muted/30 transition-colors"
      @click="triggerFileInput"
      @dragover.prevent="dragging = true"
      @dragleave="dragging = false"
      @drop.prevent="onDrop"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*,video/*"
        multiple
        class="hidden"
        @change="onFileChange"
      />
      <svg class="w-10 h-10 mx-auto text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="text-sm text-text-secondary">Drag & drop or click here.</p>
    </div>

    <!-- YouTube -->
    <div class="flex gap-3 items-start">
      <div class="flex-1 flex gap-2">
        <input
          v-model="youtubeUrl"
          type="url"
          placeholder="Insert video with the URL"
          class="form-input flex-1 px-4 py-2 focus:outline-none"
          @keydown.enter.prevent="addYoutube"
        />
        <button
          type="button"
          class="accent-bg text-inverse px-4 py-2 rounded-md font-medium hover:opacity-90 flex items-center gap-2 whitespace-nowrap"
          @click="addYoutube"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Add YouTube video
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  description: { type: String, default: '' },
  modelValue: {
    type: Array,
    default: () => []
  },
  isAnswered: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const youtubeUrl = ref('')
const dragging = ref(false)

// Normalize value: array of { type: 'file'|'youtube', file?, url?, preview? }
const displayItems = computed(() => {
  const list = Array.isArray(props.modelValue) ? props.modelValue : []
  const out = []
  for (let i = 0; i < 8; i++) {
    out.push(list[i] ? { ...list[i] } : { type: 'file', file: null, url: '', preview: null })
  }
  return out
})

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const files = Array.from(e.target?.files || [])
  if (!files.length) return
  const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  for (const file of files) {
    if (list.length >= 8) break
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    list.push({ type: 'file', file, url: '', preview })
  }
  emit('update:modelValue', list)
  if (fileInput.value) fileInput.value.value = ''
}

function onDrop(e) {
  dragging.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  if (!files.length) return
  const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  for (const file of files) {
    if (list.length >= 8) break
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    list.push({ type: 'file', file, url: '', preview })
  }
  emit('update:modelValue', list)
}

function addYoutube() {
  const url = (youtubeUrl.value || '').trim()
  if (!url) return
  const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  if (list.length >= 8) return
  list.push({ type: 'youtube', url, file: null, preview: null })
  emit('update:modelValue', list)
  youtubeUrl.value = ''
}

function removeItem(index) {
  const list = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const item = list[index]
  if (item?.preview) URL.revokeObjectURL(item.preview)
  list.splice(index, 1)
  emit('update:modelValue', list)
}
</script>
