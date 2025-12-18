// Form Kit - Store
// Zustand 기반 폼 상태 관리

import { create } from 'zustand';

interface FormStore {
  // 다단계 폼 상태
  currentStep: number;
  formData: Record<string, unknown>;
  errors: Record<string, string>;
  isSubmitting: boolean;

  // 액션
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setFormData: (data: Record<string, unknown>) => void;
  updateFormData: (key: string, value: unknown) => void;
  setError: (key: string, message: string) => void;
  clearError: (key: string) => void;
  clearErrors: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  formData: {},
  errors: {},
  isSubmitting: false,
};

export const useFormStore = create<FormStore>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

  prevStep: () =>
    set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  setFormData: (data) => set({ formData: data }),

  updateFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),

  setError: (key, message) =>
    set((state) => ({
      errors: { ...state.errors, [key]: message },
    })),

  clearError: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.errors;
      return { errors: rest };
    }),

  clearErrors: () => set({ errors: {} }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  reset: () => set(initialState),
}));
