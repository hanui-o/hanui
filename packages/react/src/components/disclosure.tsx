'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// ============================================================================
// Disclosure 컴포넌트
// KRDS 디스클로저 - 부가적인 정보를 표시하거나 숨기는 데 사용
// Accordion과 달리 단독으로 사용되며, 여러 개를 동시에 열 수 있음
// ============================================================================

// Disclosure 컨테이너 스타일
const disclosureVariants = cva(
  // 기본 스타일
  ['krds-disclosure', 'conts-expand-area'],
  {
    variants: {
      // 변형
      variant: {
        default: '',
        bordered: 'border border-krds-gray-20 rounded-lg',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// 트리거 버튼 스타일
const disclosureTriggerVariants = cva(
  // 기본 스타일
  [
    'btn-conts-expand',
    'flex',
    'items-center',
    'gap-2',
    'text-left',
    'transition-colors',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-krds-primary-base',
    'focus:ring-offset-2',
    'rounded',
  ],
  {
    variants: {
      variant: {
        default: ['text-krds-primary-base', 'hover:text-krds-primary-60'],
        bordered: [
          'w-full',
          'px-4',
          'py-3',
          'text-krds-gray-90',
          'hover:bg-krds-gray-5',
        ],
        ghost: ['text-krds-gray-70', 'hover:text-krds-gray-90'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// 콘텐츠 컨테이너 스타일
const disclosureContentVariants = cva(
  // 기본 스타일
  [
    'expand-wrap',
    'overflow-hidden',
    'transition-all',
    'duration-200',
    'ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'mt-2',
        bordered: 'px-4 pb-4',
        ghost: 'mt-2',
      },
      // 열림/닫힘 상태
      isOpen: {
        true: 'opacity-100',
        false: 'max-h-0 opacity-0',
      },
    },
    compoundVariants: [
      {
        isOpen: true,
        className: 'max-h-[2000px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      isOpen: false,
    },
  }
);

// ============================================================================
// Disclosure Props
// ============================================================================

export interface DisclosureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof disclosureVariants> {
  /** 트리거 텍스트 */
  trigger: React.ReactNode;
  /** 콘텐츠 */
  children: React.ReactNode;
  /** 기본 열림 상태 */
  defaultOpen?: boolean;
  /** 제어 모드에서의 열림 상태 */
  open?: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
}

// ============================================================================
// 아이콘 컴포넌트
// ============================================================================

// 꺾쇠 아이콘
const ChevronIcon = ({
  className,
  isOpen,
}: {
  className?: string;
  isOpen: boolean;
}) => (
  <svg
    className={cn(
      'w-4 h-4 transition-transform duration-200',
      isOpen && 'rotate-180',
      className
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ============================================================================
// Disclosure 컴포넌트
// ============================================================================

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  (
    {
      className,
      variant = 'default',
      trigger,
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    // 내부 상태 (비제어 모드)
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    // 제어/비제어 모드 판단
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // 토글 핸들러
    const handleToggle = () => {
      const newState = !isOpen;

      if (!isControlled) {
        setInternalOpen(newState);
      }

      onOpenChange?.(newState);
    };

    // 고유 ID 생성
    const id = React.useId();
    const triggerId = `disclosure-trigger-${id}`;
    const contentId = `disclosure-content-${id}`;

    return (
      <div
        ref={ref}
        className={cn(disclosureVariants({ variant }), className)}
        {...props}
      >
        {/* 트리거 버튼 */}
        <button
          id={triggerId}
          type="button"
          className={cn(disclosureTriggerVariants({ variant }))}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <ChevronIcon isOpen={isOpen} />
          <span className="text-sm font-medium">{trigger}</span>
        </button>

        {/* 콘텐츠 영역 */}
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className={cn(disclosureContentVariants({ variant, isOpen }))}
        >
          {isOpen && (
            <div className="text-sm text-krds-gray-70">{children}</div>
          )}
        </div>
      </div>
    );
  }
);

Disclosure.displayName = 'Disclosure';

// Variants export
export {
  disclosureVariants,
  disclosureTriggerVariants,
  disclosureContentVariants,
};
