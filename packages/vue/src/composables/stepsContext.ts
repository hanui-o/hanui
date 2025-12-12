import type { InjectionKey, Ref, ComputedRef } from 'vue';

// ============================================================================
// Types
// ============================================================================

export type StepStatus = 'completed' | 'current' | 'upcoming';
export type StepsOrientation = 'horizontal' | 'vertical';
export type StepsSize = 'sm' | 'md' | 'lg';

// ============================================================================
// Steps Context
// ============================================================================

export interface StepsContextValue {
  step: Ref<number>;
  count: Ref<number>;
  orientation: Ref<StepsOrientation>;
  size: Ref<StepsSize>;
  getStatus: (index: number) => StepStatus;
  goTo: (step: number) => void;
  next: () => void;
  prev: () => void;
}

export const StepsContextKey: InjectionKey<StepsContextValue> =
  Symbol('StepsContext');

// ============================================================================
// StepsItem Context
// ============================================================================

export interface StepsItemContextValue {
  index: number;
  status: ComputedRef<StepStatus>;
}

export const StepsItemContextKey: InjectionKey<StepsItemContextValue> =
  Symbol('StepsItemContext');
