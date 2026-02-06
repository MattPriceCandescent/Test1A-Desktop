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
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      rows="1"
      class="form-input w-full px-4 py-2 resize-y min-h-[2.5rem] focus:outline-none"
    ></textarea>
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
  isAnswered: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

