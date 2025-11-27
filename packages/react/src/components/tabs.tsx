'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Tabs Variants
 * KRDS 접근성 자동화를 포함한 탭 컴포넌트
 */
const tabsListVariants = cva('flex border-b border-krds-gray-20 mb-10', {
  variants: {
    variant: {
      default: '',
      pills: 'border-0 gap-2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center',
    'px-4 py-2 font-medium',
    'transition-colors whitespace-nowrap cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-krds-func-info focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-b-2 border-transparent -mb-px',
          'data-[state=active]:border-krds-primary-base',
          'data-[state=active]:text-krds-primary-base',
          'data-[state=inactive]:text-krds-gray-60',
          'data-[state=inactive]:hover:text-krds-gray-90',
        ].join(' '),
        pills: [
          'rounded-md',
          'data-[state=active]:bg-krds-primary-base',
          'data-[state=active]:text-white',
          'data-[state=inactive]:text-krds-gray-60',
          'data-[state=inactive]:hover:bg-krds-gray-10',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Tabs Root Props
 */
export interface TabsProps {
  /** 초기 활성 탭 (비제어 모드) */
  defaultValue?: string;
  /** 활성 탭 (제어 모드) */
  value?: string;
  /** 탭 변경 시 콜백 */
  onValueChange?: (value: string) => void;
  /** 스타일 변형 */
  variant?: 'default' | 'pills';
  /** 추가 CSS 클래스 */
  className?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

/**
 * TabsList Props
 */
export interface TabsListProps extends VariantProps<typeof tabsListVariants> {
  children: React.ReactNode;
  className?: string;
}

/**
 * TabsTrigger Props
 */
export interface TabsTriggerProps
  extends VariantProps<typeof tabsTriggerVariants> {
  /** 탭 식별자 (필수) */
  value: string;
  children: React.ReactNode;
  className?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/**
 * TabsContent Props
 */
export interface TabsContentProps {
  /** 연결된 탭 식별자 (필수) */
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Tabs Context
 */
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'default' | 'pills';
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined
);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
};

/**
 * Tabs - KRDS 탭 네비게이션 컴포넌트
 *
 * ARIA 자동화, 키보드 네비게이션, 포커스 관리를 자동으로 처리합니다.
 *
 * 접근성 기능:
 * - role="tablist", "tab", "tabpanel" 자동 적용
 * - aria-selected, aria-controls 자동 관리
 * - Arrow, Home, End 키보드 네비게이션
 * - 색상 독립적 선택 상태 표시
 *
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">탭 1</TabsTrigger>
 *     <TabsTrigger value="tab2">탭 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">콘텐츠 1</TabsContent>
 *   <TabsContent value="tab2">콘텐츠 2</TabsContent>
 * </Tabs>
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || ''
    );

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange]
    );

    return (
      <TabsContext.Provider
        value={{ value, onValueChange: handleValueChange, variant }}
      >
        <div ref={ref} className={cn('w-full mt-8', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * TabsList - 탭 버튼 컨테이너
 *
 * role="tablist"와 키보드 네비게이션을 자동으로 처리합니다.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, variant: variantProp, ...props }, ref) => {
    const { variant: contextVariant } = useTabsContext();
    const variant = variantProp || contextVariant;
    const internalRef = React.useRef<HTMLDivElement>(null);
    const tabsListRef = ref || internalRef;

    // 키보드 네비게이션: Arrow Left/Right, Home, End
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const tabsList = 'current' in tabsListRef ? tabsListRef.current : null;
      if (!tabsList) return;

      const tabs = Array.from(
        tabsList.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not([disabled])'
        )
      );
      const currentIndex = tabs.findIndex((tab) => tab === event.target);

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    };

    return (
      <div
        ref={tabsListRef}
        role="tablist"
        tabIndex={-1}
        className={cn(tabsListVariants({ variant }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

/**
 * TabsTrigger - 개별 탭 버튼
 *
 * role="tab", aria-selected, aria-controls를 자동으로 관리합니다.
 */
export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(
  (
    {
      value: triggerValue,
      children,
      className,
      variant: variantProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const { value, onValueChange, variant: contextVariant } = useTabsContext();
    const variant = variantProp || contextVariant;
    const isActive = value === triggerValue;
    const panelId = `tabpanel-${triggerValue}`;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={panelId}
        data-state={isActive ? 'active' : 'inactive'}
        disabled={disabled}
        className={cn(tabsTriggerVariants({ variant }), className)}
        onClick={() => onValueChange(triggerValue)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

/**
 * TabsContent - 탭 콘텐츠 패널
 *
 * role="tabpanel", aria-labelledby를 자동으로 관리합니다.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value: contentValue, children, className, ...props }, ref) => {
    const { value } = useTabsContext();
    const isActive = value === contentValue;
    const panelId = `tabpanel-${contentValue}`;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={`tab-${contentValue}`}
        className={cn('mt-4 focus-visible:outline-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
