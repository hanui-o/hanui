'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Accordion Variants Definition
 *
 * KRDS-compliant accordion with accessibility automation
 * Foundation Layer: ARIA automation + Keyboard navigation + Semantic headings
 */
const accordionVariants = cva(['w-full'].join(' '), {
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

const accordionItemVariants = cva(
  ['border', 'border-krds-gray-20', 'rounded-lg'].join(' '),
  {
    variants: {
      variant: {
        default: '',
        line: 'border-0 rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionTriggerVariants = cva(
  [
    'flex',
    'w-full',
    'items-center',
    'justify-between',
    'px-4',
    'py-3',
    'text-left',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-krds-primary-50',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    '[&[data-state=open]>svg]:rotate-180',
  ].join(' '),
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
  'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
);

/**
 * Accordion Root Props for Single Type
 */
interface AccordionSinglePropsBase
  extends Omit<AccordionPrimitive.AccordionSingleProps, 'type'>,
    VariantProps<typeof accordionVariants> {
  type?: 'single';
  collapsible?: boolean;
}

/**
 * Accordion Root Props for Multiple Type
 */
interface AccordionMultiplePropsBase
  extends Omit<AccordionPrimitive.AccordionMultipleProps, 'type'>,
    VariantProps<typeof accordionVariants> {
  type: 'multiple';
}

/**
 * Accordion Root Props
 */
export type AccordionProps =
  | AccordionSinglePropsBase
  | AccordionMultiplePropsBase;

/**
 * AccordionItem Props
 */
export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AccordionTrigger Props
 */
export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * AccordionContent Props
 */
export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;
}

// Context to pass variant down to children
const AccordionContext = React.createContext<{
  variant: 'default' | 'line';
}>({ variant: 'default' });

/**
 * Accordion Root Component
 *
 * **Foundation Layer Features:**
 * - ARIA Automation: aria-expanded, aria-controls, aria-labelledby
 * - Keyboard Navigation: Enter, Space to toggle
 * - Semantic Headings: Supports h1-h6 wrapper for accessibility
 * - WCAG 2.1 Compliance: Keyboard access, Focus visibility
 *
 * **KRDS Standards:**
 * - Semantic heading structure (<h1>-<h6>)
 * - Button role for header interaction
 * - aria-expanded state indication
 * - Tab/Shift+Tab navigation
 * - Enter/Space activation
 * - Visual expand/collapse direction
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ className, variant = 'default', type, children, ...props }, ref) => {
  // Default to single type with collapsible
  const accordionType = type ?? 'single';

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

  // Multiple type
  const multipleProps = props as Omit<
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

/**
 * AccordionItem Component
 *
 * **Foundation Layer:**
 * - Auto-generates unique IDs for aria-controls and aria-labelledby
 * - Provides context for trigger and content components
 */
export const AccordionItem = React.forwardRef<
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

/**
 * AccordionTrigger Component
 *
 * **Foundation Layer:**
 * - Auto-applies button role
 * - Auto-manages aria-expanded
 * - Auto-generates aria-controls
 * - Keyboard: Enter, Space
 *
 * **KRDS Note:**
 * Wrap this in a semantic heading tag (h1-h6) for screen reader navigation
 *
 * @example
 * ```tsx
 * <h3>
 *   <AccordionTrigger>Section Title</AccordionTrigger>
 * </h3>
 * ```
 */
export const AccordionTrigger = React.forwardRef<
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

/**
 * AccordionContent Component
 *
 * **Foundation Layer:**
 * - Auto-applies role="region"
 * - Auto-manages aria-labelledby
 * - Auto-shows/hides based on open state
 * - Smooth height animation
 */
export const AccordionContent = React.forwardRef<
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
