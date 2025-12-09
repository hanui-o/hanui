'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// ============================================================================
// Step Indicator 컴포넌트
// KRDS 단계 표시기 - 사용자가 거쳐야 하는 일련의 단계를 시각화
// ============================================================================

// Step 상태 타입
type StepStatus = 'completed' | 'current' | 'upcoming';

// 개별 Step 데이터 타입
export interface StepItem {
  /** 단계 레이블 */
  label: string;
  /** 단계 설명 (선택) */
  description?: string;
  /** 선택적 단계 여부 */
  optional?: boolean;
}

// Step Indicator 컨테이너 스타일
const stepIndicatorVariants = cva(
  // 기본 스타일
  'krds-step-wrap',
  {
    variants: {
      // 방향
      orientation: {
        horizontal: 'flex flex-row items-start',
        vertical: 'flex flex-col',
      },
      // 크기
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

// 개별 Step 스타일
const stepVariants = cva(
  // 기본 스타일
  'relative flex items-center',
  {
    variants: {
      // 방향에 따른 스타일
      orientation: {
        horizontal: 'flex-1 flex-col',
        vertical: 'flex-row gap-3 pb-8 last:pb-0',
      },
      // 상태에 따른 스타일
      status: {
        completed: 'done',
        current: 'active',
        upcoming: '',
      },
      // 크기
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      status: 'upcoming',
      size: 'md',
    },
  }
);

// Step 번호 원 스타일
const stepCircleVariants = cva(
  // 기본 스타일 - 원형 인디케이터
  'flex items-center justify-center rounded-full font-medium transition-colors shrink-0',
  {
    variants: {
      status: {
        completed: 'bg-krds-primary-base text-white',
        current: 'bg-krds-primary-base text-white ring-4 ring-krds-primary-20',
        upcoming: 'bg-krds-gray-20 text-krds-gray-60',
      },
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
);

// Step 레이블 스타일
const stepLabelVariants = cva(
  // 기본 스타일
  'step-tit font-medium transition-colors',
  {
    variants: {
      status: {
        completed: 'text-krds-gray-70',
        current: 'text-krds-gray-95',
        upcoming: 'text-krds-gray-50',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
);

// Step 설명 스타일
const stepDescriptionVariants = cva(
  // 기본 스타일
  'transition-colors',
  {
    variants: {
      status: {
        completed: 'text-krds-gray-50',
        current: 'text-krds-gray-70',
        upcoming: 'text-krds-gray-40',
      },
      size: {
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
      },
    },
    defaultVariants: {
      status: 'upcoming',
      size: 'md',
    },
  }
);

// 연결선 스타일
const stepConnectorVariants = cva(
  // 기본 스타일
  'transition-colors',
  {
    variants: {
      orientation: {
        horizontal: 'h-0.5 flex-1',
        vertical: 'w-0.5 absolute left-4 top-10 bottom-2',
      },
      status: {
        completed: 'bg-krds-primary-base',
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
      // 수직 방향일 때 크기별 위치 조정
      { orientation: 'vertical', size: 'sm', className: 'left-3 top-8' },
      { orientation: 'vertical', size: 'md', className: 'left-4 top-10' },
      { orientation: 'vertical', size: 'lg', className: 'left-5 top-12' },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      status: 'upcoming',
      size: 'md',
    },
  }
);

// ============================================================================
// StepIndicator Props
// ============================================================================

export interface StepIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLOListElement>, 'children'>,
    VariantProps<typeof stepIndicatorVariants> {
  /** 단계 목록 */
  steps: StepItem[];
  /** 현재 단계 인덱스 (0부터 시작) */
  currentStep: number;
  /** 단계 클릭 핸들러 (적응형 탐색 시 사용) */
  onStepClick?: (stepIndex: number) => void;
  /** 클릭 가능 여부 - true면 완료된 단계 클릭 가능 */
  clickable?: boolean;
  /** 완료 아이콘 표시 여부 */
  showCheckIcon?: boolean;
}

// 체크 아이콘 컴포넌트
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// ============================================================================
// StepIndicator 컴포넌트
// ============================================================================

export const StepIndicator = React.forwardRef<
  HTMLOListElement,
  StepIndicatorProps
>(
  (
    {
      className,
      steps,
      currentStep,
      orientation = 'horizontal',
      size = 'md',
      onStepClick,
      clickable = false,
      showCheckIcon = true,
      ...props
    },
    ref
  ) => {
    // 각 단계의 상태 결정
    const getStepStatus = (index: number): StepStatus => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'current';
      return 'upcoming';
    };

    // 단계 클릭 핸들러
    const handleStepClick = (index: number) => {
      if (!clickable || !onStepClick) return;
      // 완료된 단계만 클릭 가능
      if (index < currentStep) {
        onStepClick(index);
      }
    };

    return (
      <ol
        ref={ref}
        className={cn(stepIndicatorVariants({ orientation, size }), className)}
        aria-label="진행 단계"
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = clickable && status === 'completed';
          const isLast = index === steps.length - 1;

          return (
            <li
              key={index}
              className={cn(stepVariants({ orientation, status, size }))}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {/* 수평 방향: 원 + 연결선 + 콘텐츠 */}
              {orientation === 'horizontal' ? (
                <>
                  {/* 원과 연결선 컨테이너 */}
                  <div className="flex items-center w-full">
                    {/* Step 원 */}
                    <button
                      type="button"
                      className={cn(
                        stepCircleVariants({ status, size }),
                        isClickable &&
                          'cursor-pointer hover:ring-4 hover:ring-krds-primary-20',
                        !isClickable && 'cursor-default'
                      )}
                      onClick={() => handleStepClick(index)}
                      disabled={!isClickable}
                      aria-label={`${index + 1}단계${status === 'current' ? ' (현재 단계)' : ''}${status === 'completed' ? ' (완료)' : ''}: ${step.label}`}
                    >
                      {status === 'completed' && showCheckIcon ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </button>

                    {/* 연결선 (마지막 단계 제외) */}
                    {!isLast && (
                      <div
                        className={cn(
                          stepConnectorVariants({
                            orientation,
                            status:
                              index < currentStep ? 'completed' : 'upcoming',
                            size,
                          }),
                          'mx-2'
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  {/* 레이블과 설명 */}
                  <div className="mt-2 text-center">
                    <span className={cn(stepLabelVariants({ status, size }))}>
                      {step.label}
                      {step.optional && (
                        <span className="text-krds-gray-50 ml-1">(선택)</span>
                      )}
                    </span>
                    {/* 스크린리더용 현재 단계 표시 */}
                    {status === 'current' && (
                      <span className="sr-only">현재 단계</span>
                    )}
                    {step.description && (
                      <p
                        className={cn(
                          stepDescriptionVariants({ status, size }),
                          'mt-1'
                        )}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* 수직 방향 */
                <>
                  {/* Step 원 */}
                  <button
                    type="button"
                    className={cn(
                      stepCircleVariants({ status, size }),
                      isClickable &&
                        'cursor-pointer hover:ring-4 hover:ring-krds-primary-20',
                      !isClickable && 'cursor-default'
                    )}
                    onClick={() => handleStepClick(index)}
                    disabled={!isClickable}
                    aria-label={`${index + 1}단계${status === 'current' ? ' (현재 단계)' : ''}${status === 'completed' ? ' (완료)' : ''}: ${step.label}`}
                  >
                    {status === 'completed' && showCheckIcon ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </button>

                  {/* 연결선 (마지막 단계 제외) */}
                  {!isLast && (
                    <div
                      className={cn(
                        stepConnectorVariants({
                          orientation,
                          status:
                            index < currentStep ? 'completed' : 'upcoming',
                          size,
                        })
                      )}
                      aria-hidden="true"
                    />
                  )}

                  {/* 레이블과 설명 */}
                  <div className="flex flex-col">
                    <span className={cn(stepLabelVariants({ status, size }))}>
                      {step.label}
                      {step.optional && (
                        <span className="text-krds-gray-50 ml-1">(선택)</span>
                      )}
                    </span>
                    {/* 스크린리더용 현재 단계 표시 */}
                    {status === 'current' && (
                      <span className="sr-only">현재 단계</span>
                    )}
                    {step.description && (
                      <p
                        className={cn(
                          stepDescriptionVariants({ status, size }),
                          'mt-0.5'
                        )}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ol>
    );
  }
);

StepIndicator.displayName = 'StepIndicator';

// ============================================================================
// 샘플 데이터
// ============================================================================

export const SAMPLE_STEPS: StepItem[] = [
  { label: '약관 동의', description: '이용약관에 동의해주세요' },
  { label: '정보 입력', description: '기본 정보를 입력해주세요' },
  { label: '본인 인증', description: '본인 인증을 진행해주세요' },
  { label: '가입 완료' },
];

// Variants export
export { stepIndicatorVariants, stepCircleVariants, stepLabelVariants };
