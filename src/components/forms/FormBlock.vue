<template>
  <div :id="'block-' + blockId" class="form-block-scroll-target layout-surface bg-surface rounded-lg border-x border-b border-border mb-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]">
    <div class="sticky top-16 z-40 flex flex-col bg-page rounded-t-lg -mt-px">
      <div class="form-block-gap h-4 flex-shrink-0 bg-page rounded-t-lg" aria-hidden="true" />
      <div class="form-block-header flex items-center justify-between px-8 py-4 layout-surface border-b border-border">
        <div class="flex items-center gap-2 min-w-0 flex-1">
        <svg
          v-if="isBlockComplete"
          class="w-5 h-5 text-green-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3
          :class="[
            'text-lg font-bold truncate',
            isBlockComplete ? 'text-answered' : 'text-text-primary'
          ]"
        >
          {{ title }}
        </h3>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button
          v-if="headerAction"
          type="button"
          @click="$emit('header-action')"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {{ headerAction.label }}
        </button>
      <div class="flex items-center gap-1">
        <button
          v-if="deletable"
          type="button"
          @click.stop.prevent="onDelete"
          class="p-1.5 text-text-secondary hover:text-red-600 transition-colors rounded"
          aria-label="Delete this vendor"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          @click="toggleExpanded"
          class="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors p-1"
          aria-label="Toggle expand/collapse"
        >
        <svg
          v-if="isExpanded"
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      </div>
      </div>
    </div>
    </div>
    <ConfirmModal
      v-model="showDeleteConfirm"
      title="Remove 4th party vendor"
      :message="DELETE_CONFIRM_MESSAGE"
      cancel-label="Cancel"
      confirm-label="Remove"
      @confirm="onConfirmDelete"
    />
    <div v-if="isExpanded" class="border-t border-border mb-6">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useOnboardingStore } from '../../stores/onboardingStore'
import ConfirmModal from '../layout/ConfirmModal.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  blockId: {
    type: String,
    required: true
  },
  step: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  deletable: {
    type: Boolean,
    default: false
  },
  headerAction: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['delete', 'header-action'])

const DELETE_CONFIRM_MESSAGE =
  'Are you sure you want to remove this 4th party vendor? All information entered for this vendor will be deleted.'

function onDelete() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/92d517f3-434b-439d-9bff-8fb598d6a914',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'FormBlock.vue:onDelete:entry',message:'onDelete called',data:{deletable:props.deletable,blockId:props.blockId},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H1-H4'})}).catch(()=>{});
  // #endregion
  if (!props.deletable) return
  showDeleteConfirm.value = true
}

function onConfirmDelete() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/92d517f3-434b-439d-9bff-8fb598d6a914',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'FormBlock.vue:onConfirmDelete',message:'modal confirm clicked',data:{blockId:props.blockId},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H5'})}).catch(()=>{});
  // #endregion
  emit('delete')
}

const store = useOnboardingStore()
const isExpanded = ref(true)
const showDeleteConfirm = ref(false)
// #region agent log
onMounted(()=>{ fetch('http://127.0.0.1:7242/ingest/92d517f3-434b-439d-9bff-8fb598d6a914',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'FormBlock.vue:onMounted',message:'FormBlock mounted',data:{deletable:props.deletable,blockId:props.blockId},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{}); });
// #endregion

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

const isBlockComplete = computed(() => {
  if (!props.questions || props.questions.length === 0) return false
  return props.questions.every(question =>
    store.isAnswerFilled(store.getAnswer(props.step, props.page, props.blockId, question.id))
  )
})
</script>

<style scoped>
.form-block-scroll-target {
  scroll-margin-top: 5rem; /* leave room for sticky header when scrolling from progress sidebar */
}
.form-block-gap {
  background-color: var(--color-bg-page);
  position: relative;
  z-index: 1;
}
.form-block-header {
  background-color: var(--color-bg-surface);
  min-height: 3.75rem;
  position: relative;
  z-index: 1;
}
</style>

