<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <label
          :class="[
            'block font-medium',
            isAnswered ? 'text-answered' : 'text-text-primary'
          ]"
        >
          {{ label }}
        </label>
        <p class="text-sm text-text-secondary mt-1">{{ description }}</p>
      </div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="dontHaveFile"
            @change="handleDontHaveFileChange"
            class="w-4 h-4 text-accent border-border rounded focus:ring-accent"
          />
          <span class="text-sm text-text-secondary">I don't have this file</span>
        </label>
        <button
          v-if="!dontHaveFile && !uploadedFile"
          @click="triggerFileInput"
          class="accent-bg text-inverse px-4 py-2 bg-accent text-text-inverse rounded-lg hover:bg-accent-hover transition-colors"
        >
          Upload File
        </button>
        <button
          v-else-if="uploadedFile && !dontHaveFile"
          @click="triggerFileInput"
          class="px-4 py-2 text-accent hover:text-accent-hover transition-colors"
        >
          Upload Another File
        </button>
        <button
          v-else
          disabled
          class="px-4 py-2 bg-muted text-text-muted rounded-lg cursor-not-allowed"
        >
          Upload File
        </button>
      </div>
    </div>

    <input
      ref="fileInput"
      type="file"
      @change="handleFileChange"
      class="hidden"
    />

    <!-- File Card (State 3) -->
    <div v-if="uploadedFile && !dontHaveFile" class="mt-4 bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
      <div class="flex items-center gap-3 flex-1">
        <div class="w-10 h-10 bg-accent-muted rounded flex items-center justify-center">
          <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-text-primary">{{ uploadedFile.name }}</p>
          <p class="text-xs text-text-muted">{{ formatFileSize(uploadedFile.size) }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <button class="text-accent text-sm hover:text-accent-hover">Add comment</button>
        <button @click="downloadFile" class="p-2 text-text-secondary hover:text-text-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button @click="removeFile" class="p-2 text-text-secondary hover:text-red-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Text Area (State 2) -->
    <div v-if="dontHaveFile" class="mt-4">
      <textarea
        :value="explanation"
        @input="$emit('update:explanation', $event.target.value)"
        placeholder="Please detail why and what compliance documentation you can supply"
        rows="1"
        class="form-input w-full px-4 py-2 resize-y min-h-[2.5rem] focus:outline-none"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [File, Object, null],
    default: null
  },
  explanation: {
    type: String,
    default: ''
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:explanation'])

const fileInput = ref(null)
const uploadedFile = ref(props.modelValue)
const dontHaveFile = ref(!!props.explanation && !props.modelValue)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  uploadedFile.value = newValue
  if (newValue) {
    dontHaveFile.value = false
  }
})
watch(() => props.explanation, (newValue) => {
  if (newValue && !props.modelValue) {
    dontHaveFile.value = true
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFile.value = file
    dontHaveFile.value = false
    emit('update:modelValue', file)
  }
}

const handleDontHaveFileChange = (event) => {
  dontHaveFile.value = event.target.checked
  if (dontHaveFile.value) {
    uploadedFile.value = null
    emit('update:modelValue', null)
  }
}

const removeFile = () => {
  uploadedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:modelValue', null)
}

const downloadFile = () => {
  if (uploadedFile.value) {
    const url = URL.createObjectURL(uploadedFile.value)
    const a = document.createElement('a')
    a.href = url
    a.download = uploadedFile.value.name
    a.click()
    URL.revokeObjectURL(url)
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

