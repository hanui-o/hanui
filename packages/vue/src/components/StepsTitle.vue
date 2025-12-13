<script setup lang="ts">
/**
 * StepsTitle 컴포넌트
 * Steps 내부의 제목
 */
import { computed, inject } from 'vue';
import { cn } from '@/lib/utils';
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

const stepsTitleVariants = cva('font-bold transition-colors', {
  variants: {
    status: {
      completed: 'text-krds-gray-70',
      current: 'text-krds-gray-95',
      upcoming: 'text-krds-gray-50',
    },
    size: {
      sm: 'text-krds-body-xs',
      md: 'text-krds-body-sm',
      lg: 'text-krds-body-md',
    },
  },
  defaultVariants: {
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
  throw new Error('StepsTitle은 StepsItem 컴포넌트 내부에서 사용해야 합니다.');
}

// ============================================================================
// Computed
// ============================================================================

const titleClasses = computed(() =>
  cn(
    stepsTitleVariants({
      status: itemContext.status.value,
      size: stepsContext.size.value,
    }),
    props.class
  )
);
</script>

<template>
  <span :class="titleClasses">
    <slot />
  </span>
</template>
