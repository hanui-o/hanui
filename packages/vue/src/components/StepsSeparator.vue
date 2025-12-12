<script setup lang="ts">
/**
 * StepsSeparator 컴포넌트
 * Steps 아이템 사이의 구분선
 */
import { computed, inject } from 'vue';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';
import {
  StepsContextKey,
  StepsItemContextKey,
  type StepsContextValue,
  type StepsItemContextValue,
} from '../composables/stepsContext';

// ============================================================================
// Props
// ============================================================================

const props = defineProps<{
  /** 추가 className */
  class?: string;
}>();

// ============================================================================
// Variants
// ============================================================================

const stepsSeparatorVariants = cva('transition-colors', {
  variants: {
    orientation: {
      horizontal: 'h-[3px] flex-1 mx-2',
      vertical: 'w-[3px] absolute left-4 top-10 bottom-2',
    },
    status: {
      completed: 'bg-krds-gray-50',
      current: 'bg-krds-gray-20',
      upcoming: 'bg-krds-gray-20',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'vertical', size: 'sm', className: 'left-3 top-8' },
    { orientation: 'vertical', size: 'md', className: 'left-4 top-10' },
    { orientation: 'vertical', size: 'lg', className: 'left-5 top-12' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    status: 'upcoming',
    size: 'md',
  },
});

// ============================================================================
// Inject Context
// ============================================================================

const stepsContext = inject<StepsContextValue>(StepsContextKey);
const itemContext = inject<StepsItemContextValue>(StepsItemContextKey);

if (!stepsContext || !itemContext) {
  throw new Error('StepsSeparator는 StepsItem 컴포넌트 내부에서 사용해야 합니다.');
}

// ============================================================================
// Computed
// ============================================================================

const status = computed<'completed' | 'current' | 'upcoming'>(() =>
  itemContext.index < stepsContext.step.value ? 'completed' : 'upcoming'
);

const separatorClasses = computed(() =>
  cn(
    stepsSeparatorVariants({
      orientation: stepsContext.orientation.value,
      status: status.value,
      size: stepsContext.size.value,
    }),
    props.class
  )
);
</script>

<template>
  <div
    :class="separatorClasses"
    aria-hidden="true"
  />
</template>
