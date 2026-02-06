<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        class="absolute inset-0 bg-black/50"
        @click="cancel"
      />
      <div
        class="relative z-10 w-full max-w-md rounded-lg border border-border bg-surface shadow-xl p-6"
        @click.stop
      >
        <h2 id="confirm-modal-title" class="text-lg font-semibold text-text-primary mb-2">
          {{ title }}
        </h2>
        <p class="text-text-secondary mb-6">
          {{ message }}
        </p>
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 rounded-md border border-border bg-surface text-text-primary hover:bg-surface-hover transition-colors"
            @click="cancel"
          >
            {{ cancelLabel }}
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            @click="confirm"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Remove 4th party vendor' },
  message: { type: String, required: true },
  cancelLabel: { type: String, default: 'Cancel' },
  confirmLabel: { type: String, default: 'Remove' }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function cancel() {
  emit('update:modelValue', false)
  emit('cancel')
}

function confirm() {
  emit('update:modelValue', false)
  emit('confirm')
}
</script>
