import { ref, computed, type Ref } from 'vue';

export interface UseStepsOptions {
  /** 총 단계 수 */
  count: number;
  /** 초기 단계 (기본: 0) */
  initialStep?: number;
}

export interface UseStepsReturn {
  /** 현재 단계 인덱스 */
  currentStep: Ref<number>;
  /** 특정 단계로 이동 */
  goTo: (step: number) => void;
  /** 다음 단계로 이동 */
  next: () => void;
  /** 이전 단계로 이동 */
  prev: () => void;
  /** 첫 번째 단계인지 */
  isFirst: Ref<boolean>;
  /** 마지막 단계인지 */
  isLast: Ref<boolean>;
  /** 특정 단계가 완료되었는지 */
  isCompleted: (step: number) => boolean;
  /** 모든 단계가 완료되었는지 (마지막 단계에 도달) */
  isAllCompleted: Ref<boolean>;
  /** 초기 단계로 리셋 */
  reset: () => void;
}

/**
 * Step Indicator 상태 관리 composable
 *
 * @example
 * ```vue
 * <script setup>
 * import { useSteps } from '@hanui/vue';
 *
 * const stepper = useSteps({ count: 4 });
 * </script>
 *
 * <template>
 *   <StepIndicator :steps="steps" :current-step="stepper.currentStep.value" @step-click="stepper.goTo" clickable />
 *   <Button @click="stepper.prev" :disabled="stepper.isFirst.value">이전</Button>
 *   <Button @click="stepper.next" :disabled="stepper.isLast.value">다음</Button>
 * </template>
 * ```
 */
export function useSteps({
  count,
  initialStep = 0,
}: UseStepsOptions): UseStepsReturn {
  const currentStep = ref(initialStep);

  const goTo = (step: number) => {
    if (step >= 0 && step < count) {
      currentStep.value = step;
    }
  };

  const next = () => {
    currentStep.value = Math.min(currentStep.value + 1, count - 1);
  };

  const prev = () => {
    currentStep.value = Math.max(currentStep.value - 1, 0);
  };

  const reset = () => {
    currentStep.value = initialStep;
  };

  const isCompleted = (step: number): boolean => step < currentStep.value;

  const isFirst = computed(() => currentStep.value === 0);
  const isLast = computed(() => currentStep.value === count - 1);
  const isAllCompleted = computed(() => currentStep.value === count - 1);

  return {
    currentStep,
    goTo,
    next,
    prev,
    isFirst,
    isLast,
    isCompleted,
    isAllCompleted,
    reset,
  };
}
