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
    <input
      type="text"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="form-input flex-shrink-0 w-full min-w-[12rem] max-w-[256px] px-4 py-2 focus:outline-none"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
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

defineEmits(['update:modelValue'])
</script>
