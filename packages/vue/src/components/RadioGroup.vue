<script setup lang="ts">
import { computed, provide, watch } from 'vue';
import { cn } from '../lib/utils';

// RadioGroup Context
interface RadioGroupContext {
  modelValue: string | undefined;
  size: 'sm' | 'md' | 'lg';
  status?: 'error' | 'success' | 'info';
  disabled: boolean;
  updateValue: (value: string) => void;
}

const radioGroupKey = Symbol('radioGroup');

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'error' | 'success' | 'info';
    disabled?: boolean;
    orientation?: 'horizontal' | 'vertical';
    class?: string;
  }>(),
  {
    size: 'md',
    disabled: false,
    orientation: 'horizontal',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const updateValue = (value: string) => {
  emit('update:modelValue', value);
};

provide<RadioGroupContext>(radioGroupKey, {
  modelValue: props.modelValue,
  size: props.size,
  status: props.status,
  disabled: props.disabled,
  updateValue,
});

// 반응형으로 context 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    provide<RadioGroupContext>(radioGroupKey, {
      modelValue: newValue,
      size: props.size,
      status: props.status,
      disabled: props.disabled,
      updateValue,
    });
  }
);

const classes = computed(() =>
  cn(
    'flex',
    props.orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-4',
    props.class
  )
);
</script>

<template>
  <div
    role="radiogroup"
    :class="classes"
    :aria-invalid="status === 'error' ? true : undefined"
  >
    <slot />
  </div>
</template>
