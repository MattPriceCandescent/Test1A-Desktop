<template>
  <div class="agreement-signature">
    <!-- PDF viewer -->
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-text-secondary">Review the agreement below. Use your browser’s zoom and scroll inside the document.</span>
        <button
          v-if="signaturePage"
          type="button"
          @click="jumpToSignaturePage"
          class="text-sm text-accent hover:text-accent-hover font-medium"
        >
          Jump to signature page
        </button>
      </div>
      <div class="rounded-lg border border-border overflow-hidden bg-surface">
        <iframe
          :src="currentPdfSrc"
          class="w-full border-0"
          title="Agreement PDF"
          style="height: 60vh; min-height: 400px;"
        />
      </div>
    </div>

    <!-- Sign here box -->
    <div ref="signBoxRef" class="sign-box-wrapper">
      <button
        v-if="!isSigned"
        type="button"
        @click="onSign"
        class="sign-box sign-box--empty w-full text-left rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        aria-label="Click to sign the agreement"
      >
        <span class="text-text-muted font-medium">Click here to sign the agreement</span>
      </button>
      <div
        v-else
        class="sign-box sign-box--signed rounded-lg border border-border bg-muted flex items-center gap-3 px-4 py-3"
      >
        <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="text-text-primary font-medium">Signed</span>
      </div>
    </div>

    <!-- Jump to sign box (scrolls page to the sign area) -->
    <div class="mt-3 flex justify-end">
      <button
        type="button"
        @click="scrollToSignBox"
        class="text-sm text-accent hover:text-accent-hover font-medium"
      >
        Scroll to sign here
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Boolean, Object],
    default: false
  },
  pdfUrl: {
    type: String,
    default: () => `${(import.meta.env?.BASE_URL || '/').replace(/\/$/, '')}/examplePDF.pdf`
  },
  signaturePage: {
    type: Number,
    default: null
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const signBoxRef = ref(null)
const basePdfUrl = computed(() => {
  if (props.pdfUrl) return props.pdfUrl
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '') + '/'
  return `${base}examplePDF.pdf`
})
const currentPdfSrc = ref(basePdfUrl.value)

const isSigned = computed(() => {
  const v = props.modelValue
  return v === true || (v && typeof v === 'object' && v.signed === true)
})

function jumpToSignaturePage() {
  if (props.signaturePage) {
    currentPdfSrc.value = `${basePdfUrl.value}#page=${props.signaturePage}`
  }
}

function scrollToSignBox() {
  signBoxRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function onSign() {
  if (isSigned.value) return
  emit('update:modelValue', true)
}
</script>

<style scoped>
.sign-box {
  padding: 1rem 1.25rem;
  min-height: 56px;
}
.sign-box--empty {
  cursor: pointer;
}
</style>
