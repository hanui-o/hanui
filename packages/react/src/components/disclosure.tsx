'use client';

import * as React from 'react';
import { CircleChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

// ============================================================================
// Disclosure 컴포넌트
// KRDS 디스클로저 - 부가적인 정보를 표시하거나 숨기는 컴포넌트
// Accordion과 달리 단독으로 사용되며, 여러 개를 동시에 열 수 있음
// ============================================================================

export interface DisclosureProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
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
// Disclosure 컴포넌트
// ============================================================================

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>(
  (
    {
      className,
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
      <div ref={ref} className={className} {...props}>
        {/* 트리거 버튼 */}
        <button
          id={triggerId}
          type="button"
          className="inline-flex items-center gap-2 text-krds-gray-95 hover:text-krds-gray-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 rounded"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <CircleChevronRight
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              isOpen ? 'rotate-90' : 'rotate-0'
            )}
            aria-hidden="true"
          />
          <span>{trigger}</span>
        </button>

        {/* 콘텐츠 영역 - CSS Grid 애니메이션 */}
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          aria-hidden={!isOpen}
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden" {...(!isOpen && { inert: '' })}>
            <div className="mt-1 p-4 rounded text-krds-gray-70 bg-krds-gray-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Disclosure.displayName = 'Disclosure';
