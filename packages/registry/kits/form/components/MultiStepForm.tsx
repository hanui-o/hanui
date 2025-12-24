// Form Kit - MultiStepForm Component
// 다단계 폼 컴포넌트

'use client';

import {
  Button,
  Progress,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '@hanui/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  children: React.ReactNode;
  isSubmitting?: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrev: () => void;
  onNext: () => Promise<boolean>;
  onSubmit: () => Promise<void>;
  submitLabel?: string;
}

export function MultiStepForm({
  steps,
  currentStep,
  children,
  isSubmitting = false,
  isFirstStep,
  isLastStep,
  onPrev,
  onNext,
  onSubmit,
  submitLabel = '제출',
}: MultiStepFormProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  const handleNext = async () => {
    if (isLastStep) {
      await onSubmit();
    } else {
      await onNext();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {/* 스텝 인디케이터 */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${
                    index < currentStep
                      ? 'bg-krds-primary-base text-white'
                      : index === currentStep
                        ? 'bg-krds-primary-base text-white'
                        : 'bg-krds-gray-10 text-krds-gray-50'
                  }
                `}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-12 sm:w-24 h-0.5 mx-2
                    ${index < currentStep ? 'bg-krds-primary-base' : 'bg-krds-gray-20'}
                  `}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      <CardHeader>
        <CardTitle>{currentStepData.title}</CardTitle>
        {currentStepData.description && (
          <CardDescription>{currentStepData.description}</CardDescription>
        )}
      </CardHeader>

      <CardBody>{children}</CardBody>

      <CardFooter className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep || isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          이전
        </Button>

        <div className="text-sm text-krds-gray-50">
          {currentStep + 1} / {steps.length}
        </div>

        <Button type="button" onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting ? (
            '처리 중...'
          ) : isLastStep ? (
            <>
              {submitLabel}
              <Check className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              다음
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
