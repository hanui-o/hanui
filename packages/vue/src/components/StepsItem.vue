<script setup lang="ts">
/**
 * StepsItem 컴포넌트
 * Steps 내부의 각 단계 아이템
 */
import { computed, inject, provide } from 'vue';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';
import {
  StepsContextKey,
  StepsItemContextKey,
  type StepsContextValue,
} from '../composables/stepsContext';

// ============================================================================
// Props
// ============================================================================

const props = defineProps<{
  /** 단계 인덱스 (0부터 시작) */
  index: number;
  /** 추가 className */
  class?: string;
}>();

// ============================================================================
// Variants
// ============================================================================

const stepsItemVariants = cva('relative flex', {
  variants: {
    orientation: {
      horizontal: 'flex-1 flex-col',
      vertical: 'flex-row gap-3 pb-8 last:pb-0',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ============================================================================
// Inject Context
// ============================================================================

const stepsContext = inject<StepsContextValue>(StepsContextKey);

if (!stepsContext) {
  throw new Error('StepsItem은 Steps 컴포넌트 내부에서 사용해야 합니다.');
}

// ============================================================================
// Computed
// ============================================================================

const status = computed(() => stepsContext.getStatus(props.index));

const itemClasses = computed(() =>
  cn(
    stepsItemVariants({ orientation: stepsContext.orientation.value }),
    props.class
  )
);

// ============================================================================
// Provide Item Context
// ============================================================================

provide(StepsItemContextKey, {
  index: props.index,
  status,
});
</script>

<template>
  <li
    :class="itemClasses"
    :aria-current="status === 'current' ? 'step' : undefined"
  >
    <slot />
  </li>
</template>
