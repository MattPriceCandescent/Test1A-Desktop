<template>
  <div>
    <div class="flex items-start gap-3">
      <label
        :class="[
          'font-medium flex-1 mr-3 min-w-0',
          isAnswered ? 'text-answered' : 'text-text-primary'
        ]"
      >
        {{ label }}
      </label>
      <select
        :value="selectValue"
        @change="onSelectChange($event)"
        class="form-input flex-shrink-0 w-full min-w-[12rem] max-w-[256px] px-4 py-2 appearance-none pr-10 focus:outline-none"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <input
      v-if="showOtherInput"
      type="text"
      :value="otherValue"
      @input="onOtherInput($event.target.value)"
      placeholder="Please specify"
      class="form-input w-full mt-3 px-4 py-2 focus:outline-none"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Object],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select'
  },
  isAnswered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const hasOtherOption = computed(() => props.options.includes('Other'))

const selectValue = computed(() => {
  const v = props.modelValue
  if (v == null) return ''
  if (typeof v === 'object' && v !== null && 'value' in v) return v.value
  return v
})

const otherValue = computed(() => {
  const v = props.modelValue
  if (typeof v === 'object' && v !== null && v.value === 'Other') return v.other || ''
  return ''
})

const showOtherInput = computed(() => hasOtherOption.value && selectValue.value === 'Other')

function onSelectChange(event) {
  const value = event.target.value
  if (value === 'Other') {
    emit('update:modelValue', { value: 'Other', other: '' })
  } else {
    emit('update:modelValue', value)
  }
}

function onOtherInput(text) {
  emit('update:modelValue', { value: 'Other', other: text })
}
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
  padding-right: 2.5rem;
}
</style>
