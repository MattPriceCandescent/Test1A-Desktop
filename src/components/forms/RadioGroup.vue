<template>
  <div class="flex items-center justify-between">
    <label
      :class="[
        'font-medium flex-1 mr-3',
        isAnswered ? 'text-answered' : 'text-text-primary'
      ]"
    >
      {{ label }}
    </label>
    <div class="flex items-center gap-4">
      <label
        v-for="option in options"
        :key="option"
        :class="[
          'flex items-center gap-2 cursor-pointer',
          modelValue === option ? 'text-accent' : isAnswered ? 'text-answered' : 'text-text-secondary'
        ]"
      >
        <input
          type="radio"
          :name="name"
          :value="option"
          :checked="modelValue === option"
          @change="$emit('update:modelValue', option)"
          class="w-4 h-4 text-accent border-border focus:ring-accent"
        />
        <span>{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

