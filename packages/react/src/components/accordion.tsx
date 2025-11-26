'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

const accordionVariants = cva('w-full', {
  // Accordion 스타일 variants (default, line)
  variants: {
    variant: {
      default: 'space-y-2',
      line: 'divide-y divide-krds-gray-20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva('border border-krds-gray-20 rounded-lg', {
  // Accordion 아이템 스타일 variants
  variants: {
    variant: {
      default: '',
      line: 'border-0 rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionTriggerVariants = cva(
  // Accordion 트리거 버튼 스타일 variants
  'flex w-full items-center justify-between px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
  {
    variants: {
      variant: {
        default: 'hover:bg-krds-gray-5',
        line: 'hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionContentVariants = cva(
  // Accordion 콘텐츠 영역 스타일 (애니메이션 포함)
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
);

interface AccordionSinglePropsBase // 단일 선택 Accordion Props
  extends Omit<AccordionPrimitive.AccordionSingleProps, 'type'>,
    VariantProps<typeof accordionVariants> {
  type?: 'single';
  collapsible?: boolean;
}

interface AccordionMultiplePropsBase // 다중 선택 Accordion Props
  extends Omit<AccordionPrimitive.AccordionMultipleProps, 'type'>,
    VariantProps<typeof accordionVariants> {
  type: 'multiple';
}

export type AccordionProps = // Accordion Root Props (단일/다중 선택 통합 타입)
  AccordionSinglePropsBase | AccordionMultiplePropsBase;

export interface AccordionItemProps // AccordionItem Props
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {
  className?: string;
}

export interface AccordionTriggerProps // AccordionTrigger Props
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  className?: string;
}

export interface AccordionContentProps // AccordionContent Props
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {
  className?: string;
}

const AccordionContext = React.createContext<{
  // variant를 자식 컴포넌트로 전달하는 Context
  variant: 'default' | 'line';
}>({ variant: 'default' });

export const Accordion = React.forwardRef<
  // KRDS 기반 Accordion 컴포넌트 (ARIA, 키보드 내비게이션 자동화)
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'default', type, children, ...props }, ref) => {
  const accordionType = type ?? 'single'; // 기본값: 단일 선택 타입

  if (accordionType === 'single') {
    const singleProps = props as Omit<
      AccordionSinglePropsBase,
      'type' | 'variant' | 'className'
    >;
    const collapsible = singleProps.collapsible ?? true;

    return (
      <AccordionContext.Provider
        value={{ variant: variant as 'default' | 'line' }}
      >
        <AccordionPrimitive.Root
          ref={ref}
          type="single"
          collapsible={collapsible}
          className={cn(accordionVariants({ variant }), className)}
          {...singleProps}
        >
          {children}
        </AccordionPrimitive.Root>
      </AccordionContext.Provider>
    );
  }

  const multipleProps = props as Omit<
    // 다중 선택 타입
    AccordionMultiplePropsBase,
    'type' | 'variant' | 'className'
  >;

  return (
    <AccordionContext.Provider
      value={{ variant: variant as 'default' | 'line' }}
    >
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        className={cn(accordionVariants({ variant }), className)}
        {...multipleProps}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<
  // AccordionItem 컴포넌트 (ARIA ID 자동 생성)
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant: variantProp, ...props }, ref) => {
  const { variant: contextVariant } = React.useContext(AccordionContext);
  const variant = variantProp || contextVariant;

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  // AccordionTrigger 컴포넌트 (버튼 role, aria-expanded 자동 관리)
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, variant: variantProp, ...props }, ref) => {
  const { variant: contextVariant } = React.useContext(AccordionContext);
  const variant = variantProp || contextVariant;

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        <span className="flex-1 font-medium text-krds-gray-90">{children}</span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 text-krds-gray-50" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  // AccordionContent 컴포넌트 (role="region", aria-labelledby 자동 관리)
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants(), className)}
    {...props}
  >
    <div className="p-4 text-krds-gray-70">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
