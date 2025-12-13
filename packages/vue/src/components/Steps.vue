<script setup lang="ts">
/**
 * Steps 컴포넌트
 * Compound Component 패턴의 단계 표시기
 */
import { computed, provide, toRef } from 'vue';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
  StepsContextKey,
  type StepsOrientation,
  type StepsSize,
  type StepStatus,
} from '../composables/stepsContext';

// ============================================================================
// Variants
// ============================================================================

const stepsListVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'flex flex-row items-start',
      vertical: 'flex flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// ============================================================================
// Props & Emits
// ============================================================================

const props = withDefaults(
  defineProps<{
    /** 현재 단계 (0부터 시작) */
    step: number;
    /** 총 단계 수 */
    count: number;
    /** 방향 */
    orientation?: StepsOrientation;
    /** 크기 */
    size?: StepsSize;
    /** 추가 className */
    class?: string;
  }>(),
  {
    orientation: 'horizontal',
    size: 'md',
  }
);

const emit = defineEmits<{
  (e: 'update:step', step: number): void;
}>();

// ============================================================================
// Context Functions
// ============================================================================

function getStatus(index: number): StepStatus {
  if (index < props.step) return 'completed';
  if (index === props.step) return 'current';
  return 'upcoming';
}

const goTo = (newStep: number) => {
  if (newStep >= 0 && newStep < props.count) {
    emit('update:step', newStep);
  }
};

const next = () => {
  if (props.step < props.count - 1) {
    emit('update:step', props.step + 1);
  }
};

const prev = () => {
  if (props.step > 0) {
    emit('update:step', props.step - 1);
  }
};

// ============================================================================
// Provide Context
// ============================================================================

provide(StepsContextKey, {
  step: toRef(props, 'step'),
  count: toRef(props, 'count'),
  orientation: toRef(props, 'orientation'),
  size: toRef(props, 'size'),
  getStatus,
  goTo,
  next,
  prev,
});

// ============================================================================
// Computed
// ============================================================================

const isFirst = computed(() => props.step === 0);
const isLast = computed(() => props.step === props.count - 1);
const isComplete = computed(() => props.step >= props.count);

const listClasses = computed(() =>
  cn(stepsListVariants({ orientation: props.orientation }), props.class)
);

// Expose for parent components
defineExpose({
  goTo,
  next,
  prev,
  isFirst,
  isLast,
  isComplete,
});
</script>

<template>
  <div class="steps-root">
    <ol
      :class="listClasses"
      aria-label="진행 단계"
    >
      <slot />
    </ol>
  </div>
</template>
