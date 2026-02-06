<template>
  <div class="min-h-screen bg-page layout-page">
    <Header />
    <div class="flex">
      <LeftNav />
      <main class="flex-1 ml-64 mr-80 mt-16 mb-20 p-8 pb-24 bg-page layout-page">
        <div
          :class="isFullWidthPage ? 'w-full' : 'max-w-4xl mx-auto'"
          v-if="pageData"
        >
          <h1 class="text-3xl font-bold text-text-primary mb-2">{{ pageData.title }}</h1>
          <p class="text-text-secondary mb-8">{{ pageData.subtitle }}</p>

          <FormBlock
            v-for="block in effectiveFormBlocks"
            :key="block.id"
            :title="block.title"
            :block-id="block.id"
            :step="stepId"
            :page="pageId"
            :questions="block.questions"
            :deletable="!!pageData.dynamicFormBlocks"
            :header-action="block.headerAction || null"
            @delete="onDeleteBlock(block.id)"
            @header-action="onPreview(block.id)"
          >
            <QuestionRow
              v-for="(question, index) in block.questions"
              :key="question.id"
              :is-answered="isQuestionAnswered(block.id, question.id, question.type)"
              :show-separator="index < block.questions.length - 1"
            >
              <FileUpload
                v-if="question.type === 'file'"
                :label="question.label"
                :description="question.description"
                :model-value="getFile(block.id, question.id)"
                :explanation="getExplanation(block.id, question.id)"
                :is-answered="isQuestionAnswered(block.id, question.id, 'file')"
                @update:model-value="updateFile(block.id, question.id, $event)"
                @update:explanation="updateExplanation(block.id, question.id, $event)"
              />
              <component
                v-else
                :is="getComponentType(question.type)"
                v-bind="getComponentProps(question, block.id, question.id)"
                :model-value="getAnswer(block.id, question.id)"
                @update:model-value="updateAnswer(block.id, question.id, $event)"
              />
            </QuestionRow>
          </FormBlock>

          <!-- Add 4th parties listing card (always at bottom when dynamic) -->
          <div
            v-if="pageData.dynamicFormBlocks && pageData.addVendorCard"
            class="layout-surface bg-surface rounded-lg border border-border border-dashed p-8 flex flex-col items-center justify-center text-center"
          >
            <div class="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">{{ pageData.addVendorCard.heading }}</h3>
            <p class="text-text-secondary mb-6 max-w-md">{{ pageData.addVendorCard.description }}</p>
            <button
              type="button"
              class="accent-bg text-inverse inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity"
              @click="onAddVendor"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ pageData.addVendorCard.buttonLabel }}
            </button>
          </div>
        </div>
        <div v-else class="max-w-4xl mx-auto">
          <p class="text-text-secondary">Page not found.</p>
        </div>
      </main>
      <ProgressIndicator />
      <PageNavigation />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useOnboardingStore } from '../stores/onboardingStore'
import { formData } from '../data/formData'
import Header from '../components/layout/Header.vue'
import LeftNav from '../components/layout/LeftNav.vue'
import ProgressIndicator from '../components/layout/ProgressIndicator.vue'
import PageNavigation from '../components/layout/PageNavigation.vue'
import FormBlock from '../components/forms/FormBlock.vue'
import QuestionRow from '../components/forms/QuestionRow.vue'
import RadioGroup from '../components/forms/RadioGroup.vue'
import SelectMenu from '../components/forms/SelectMenu.vue'
import TextArea from '../components/forms/TextArea.vue'
import TextField from '../components/forms/TextField.vue'
import DateInput from '../components/forms/DateInput.vue'
import FileUpload from '../components/forms/FileUpload.vue'
import FeaturedMedia from '../components/forms/FeaturedMedia.vue'
import SupportLinks from '../components/forms/SupportLinks.vue'
import TagPicker from '../components/forms/TagPicker.vue'
import AgreementSignature from '../components/forms/AgreementSignature.vue'

const route = useRoute()
const store = useOnboardingStore()

const stepId = computed(() => route.params.stepId || '')
const pageId = computed(() => route.params.pageId || '')

const pageData = computed(() => {
  const step = formData[stepId.value]
  return step ? step[pageId.value] : null
})

// Full-width layout for Integration agreement (step3 page4)
const isFullWidthPage = computed(() => stepId.value === 'step3' && pageId.value === 'page4')

// For dynamic pages (e.g. 4th party vendors), blocks come from store + template; title = "[order]. [name]"
const effectiveFormBlocks = computed(() => {
  const data = pageData.value
  if (!data) return []
  if (data.dynamicFormBlocks && data.vendorBlockTemplate) {
    const ids = store.getDynamicBlockIds(stepId.value, pageId.value)
    const questions = data.vendorBlockTemplate.questions || []
    return ids.map((id, index) => {
      const name = store.getAnswer(stepId.value, pageId.value, id, 'q1')
      const nameStr = typeof name === 'string' ? name.trim() : ''
      const title = nameStr ? `${index + 1}. ${nameStr}` : `${index + 1}. 4th party`
      return { id, title, questions }
    })
  }
  return data.formBlocks || []
})

function onAddVendor() {
  store.addDynamicBlock(stepId.value, pageId.value)
}

function onDeleteBlock(blockId) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/92d517f3-434b-439d-9bff-8fb598d6a914',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StepPage.vue:onDeleteBlock',message:'onDeleteBlock called',data:{blockId,stepId:stepId.value,pageId:pageId.value},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'H5'})}).catch(()=>{});
  // #endregion
  store.removeDynamicBlock(stepId.value, pageId.value, blockId)
}

function onPreview(blockId) {
  // Preview published page – could open modal or route to public preview
  console.log('Preview storefront block', blockId)
}

// Scroll to form block when route has #block-* hash (e.g. after clicking block in progress sidebar)
watch(
  () => ({ path: route.path, hash: route.hash }),
  ({ hash }) => {
    if (hash && hash.startsWith('#block-')) {
      const id = hash.slice(1)
      nextTick(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  },
  { immediate: true }
)

const getAnswer = (blockId, questionId) => {
  return store.getAnswer(stepId.value, pageId.value, blockId, questionId)
}

const updateAnswer = (blockId, questionId, value) => {
  store.updateAnswer(stepId.value, pageId.value, blockId, questionId, value)
}

const getFile = (blockId, questionId) => {
  const answer = store.getAnswer(stepId.value, pageId.value, blockId, questionId)
  return answer?.file || null
}

const getExplanation = (blockId, questionId) => {
  const answer = store.getAnswer(stepId.value, pageId.value, blockId, questionId)
  return answer?.explanation || ''
}

const updateFile = (blockId, questionId, file) => {
  const currentAnswer = store.getAnswer(stepId.value, pageId.value, blockId, questionId) || {}
  store.updateAnswer(stepId.value, pageId.value, blockId, questionId, {
    ...currentAnswer,
    file
  })
}

const updateExplanation = (blockId, questionId, explanation) => {
  const currentAnswer = store.getAnswer(stepId.value, pageId.value, blockId, questionId) || {}
  store.updateAnswer(stepId.value, pageId.value, blockId, questionId, {
    ...currentAnswer,
    explanation
  })
}

const isQuestionAnswered = (blockId, questionId, questionType) => {
  const answer = store.getAnswer(stepId.value, pageId.value, blockId, questionId)

  if (answer === null || answer === undefined || answer === '') return false

  if (questionType === 'mediaGallery') {
    const list = Array.isArray(answer) ? answer : []
    return list.some(item => (item && (item.file || (item.type === 'youtube' && item.url))))
  }
  if (questionType === 'linkList') {
    const list = Array.isArray(answer) ? answer : []
    return list.some(link => (link && (String(link.title || '').trim() || String(link.url || '').trim())))
  }
  if (questionType === 'tagPicker') {
    const list = Array.isArray(answer) ? answer : []
    return list.length > 0
  }
  if (questionType === 'agreementSignature') {
    return answer === true || (answer && typeof answer === 'object' && answer.signed === true)
  }

  if (typeof answer === 'object' && answer !== null) {
    if (questionType === 'file') {
      return answer.file || answer.explanation
    }
    if (questionType === 'select' && answer.value !== undefined) {
      if (answer.value === 'Other') return Boolean(answer.other && answer.other.trim())
      return true
    }
    return Object.keys(answer).length > 0
  }

  return true
}

const getComponentType = (type) => {
  const components = {
    radio: RadioGroup,
    select: SelectMenu,
    text: TextField,
    textarea: TextArea,
    date: DateInput,
    mediaGallery: FeaturedMedia,
    linkList: SupportLinks,
    tagPicker: TagPicker,
    agreementSignature: AgreementSignature
  }
  return components[type] || TextArea
}

const getComponentProps = (question, blockId, questionId) => {
  const isAnswered = isQuestionAnswered(blockId, questionId, question.type)

  const baseProps = {
    label: question.label,
    name: `${stepId.value}-${pageId.value}-${blockId}-${questionId}`,
    isAnswered
  }

  if (question.type === 'radio') {
    return {
      ...baseProps,
      options: question.options || ['Yes', 'No']
    }
  }

  if (question.type === 'select') {
    return {
      ...baseProps,
      options: question.options || ['Answer A', 'Answer B', 'Answer C'],
      placeholder: 'Select'
    }
  }

  if (question.type === 'text') {
    return {
      ...baseProps,
      placeholder: question.placeholder || ''
    }
  }

  if (question.type === 'date') {
    return {
      ...baseProps,
      placeholder: question.placeholder || 'MM/DD/YYYY'
    }
  }

  if (question.type === 'textarea') {
    return {
      ...baseProps,
      placeholder: question.placeholder || ''
    }
  }

  if (question.type === 'mediaGallery') {
    return {
      ...baseProps,
      description: question.description || ''
    }
  }

  if (question.type === 'linkList') {
    return baseProps
  }

  if (question.type === 'tagPicker') {
    return {
      ...baseProps,
      options: question.options || []
    }
  }

  if (question.type === 'agreementSignature') {
    const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '') + '/'
    return {
      ...baseProps,
      pdfUrl: question.pdfUrl || `${base}examplePDF.pdf`,
      signaturePage: question.signaturePage ?? null
    }
  }

  return baseProps
}
</script>
