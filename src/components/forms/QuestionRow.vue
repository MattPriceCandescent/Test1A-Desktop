<template>
  <div class="question-row">
    <div
      :class="[
        'question-content',
        isAnswered ? 'answered' : 'unanswered'
      ]"
    >
      <slot />
    </div>
    <div v-if="showSeparator" class="question-separator"></div>
  </div>
</template>

<script setup>
defineProps({
  isAnswered: {
    type: Boolean,
    default: false
  },
  showSeparator: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.question-row {
  position: relative;
}

.question-row:first-child .question-content {
  margin-top: 8px;
}

.question-content {
  padding: 8px 12px 8px 12px;
  margin: 8px 12px -16px 12px;
  border-radius: 8px;
}

.question-content.answered {
  background-color: var(--color-bg-muted);
}

.question-content.unanswered {
  background-color: transparent;
}

.question-separator {
  height: 1px;
  background-color: var(--color-border);
  margin: 24px 12px 0 12px;
}
</style>
