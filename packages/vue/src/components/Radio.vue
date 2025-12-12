<script setup lang="ts">
import { computed, inject } from 'vue';
import { cva } from 'class-variance-authority';
import { Circle } from 'lucide-vue-next';
import { cn } from '../lib/utils';

const radioVariants = cva(
  'aspect-square rounded-full border border-krds-gray-60 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transition-colors',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

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
    value: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    status?: 'error' | 'success' | 'info';
    disabled?: boolean;
    class?: string;
  }>(),
  {
    size: 'md',
    disabled: false,
  }
);

const group = inject<RadioGroupContext | null>(radioGroupKey, null);

const isChecked = computed(() => group?.modelValue === props.value);
const finalSize = computed(() => group?.size || props.size);
const finalStatus = computed(() => group?.status || props.status);
const finalDisabled = computed(() => group?.disabled || props.disabled);
const hasError = computed(() => finalStatus.value === 'error');

const radioClasses = computed(() => {
  const base = radioVariants({ size: finalSize.value });
  const checkedClasses = isChecked.value
    ? 'border-krds-primary-base text-krds-primary-base'
    : '';
  const errorClasses = hasError.value
    ? 'border-krds-danger-60 data-[state=checked]:border-krds-danger-60 data-[state=checked]:text-krds-danger-60'
    : '';
  return cn(base, checkedClasses, errorClasses);
});

const indicatorSize = computed(() => {
  switch (finalSize.value) {
    case 'sm':
      return 8;
    case 'lg':
      return 12;
    default:
      return 10;
  }
});

const labelClasses = computed(() =>
  cn(
    'text-krds-body-md text-krds-gray-90 cursor-pointer select-none',
    finalDisabled.value && 'cursor-not-allowed opacity-60'
  )
);

const handleClick = () => {
  if (!finalDisabled.value && group) {
    group.updateValue(props.value);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    handleClick();
  }
};
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <button
      :id="`radio-${value}`"
      type="button"
      role="radio"
      :aria-checked="isChecked"
      :aria-labelledby="label ? `radio-label-${value}` : undefined"
      :aria-label="!label ? value : undefined"
      :disabled="finalDisabled"
      :class="radioClasses"
      :data-state="isChecked ? 'checked' : 'unchecked'"
      @click="handleClick"
      @keydown="handleKeyDown"
    >
      <span v-if="isChecked" class="flex items-center justify-center">
        <Circle :size="indicatorSize" class="fill-current" :stroke-width="0" />
      </span>
    </button>
    <span
      v-if="label"
      :id="`radio-label-${value}`"
      :class="labelClasses"
      @click="handleClick"
    >
      {{ label }}
    </span>
  </div>
</template>
