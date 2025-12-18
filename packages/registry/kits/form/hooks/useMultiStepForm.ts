// Form Kit - Multi-Step Form Hook
// 다단계 폼 관리 hook

import { useState, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseMultiStepFormOptions<T extends z.ZodType> {
  steps: T[];
  onSubmit: (data: z.infer<T>) => Promise<void>;
  defaultValues?: Partial<z.infer<T>>;
}

interface UseMultiStepFormReturn<T extends z.ZodType> {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  form: UseFormReturn<z.infer<T>>;
  goToStep: (step: number) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export function useMultiStepForm<T extends z.ZodType>({
  steps,
  onSubmit,
  defaultValues = {},
}: UseMultiStepFormOptions<T>): UseMultiStepFormReturn<T> {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSchema = steps[currentStep];
  const totalSteps = steps.length;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: defaultValues as z.infer<T>,
    mode: 'onChange',
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const nextStep = useCallback(async () => {
    const isValid = await form.trigger();
    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return isValid;
  }, [form, isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [isFirstStep]);

  const handleSubmit = useCallback(async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(form.getValues());
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onSubmit]);

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    form,
    goToStep,
    nextStep,
    prevStep,
    handleSubmit,
    isSubmitting,
  };
}
