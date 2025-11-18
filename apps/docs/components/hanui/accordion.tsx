'use client';

import { cva, type VariantProps } from 'class-variance-authority';
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
      line: 'divide-y divide-gray-200 dark:divide-gray-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionItemVariants = cva(
  ['border', 'border-gray-200', 'dark:border-gray-800', 'rounded-lg'].join(' '),
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
    'focus-visible:ring-blue-500',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-50 dark:hover:bg-gray-900',
        line: 'hover:bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionContentVariants = cva(
  ['overflow-hidden', 'transition-all'].join(' '),
  {
    variants: {
      state: {
        open: 'animate-accordion-down',
        closed: 'animate-accordion-up',
      },
    },
    defaultVariants: {
      state: 'closed',
    },
  }
);

/**
 * Accordion Root Props
 */
export interface AccordionProps extends VariantProps<typeof accordionVariants> {
  /**
   * Accordion type: single (one at a time) or multiple (multiple can be open)
   */
  type?: 'single' | 'multiple';

  /**
   * Allow collapsing the active item (only for type="single")
   */
  collapsible?: boolean;

  /**
   * Default open item value(s)
   */
  defaultValue?: string | string[];

  /**
   * Controlled open item value(s)
   */
  value?: string | string[];

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string | string[]) => void;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (AccordionItem)
   */
  children: React.ReactNode;
}

/**
 * AccordionItem Props
 */
export interface AccordionItemProps
  extends VariantProps<typeof accordionItemVariants> {
  /**
   * Unique value for this item
   */
  value: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (AccordionTrigger, AccordionContent)
   */
  children: React.ReactNode;
}

/**
 * AccordionTrigger Props
 */
export interface AccordionTriggerProps
  extends VariantProps<typeof accordionTriggerVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (heading text)
   */
  children: React.ReactNode;

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * AccordionContent Props
 */
export interface AccordionContentProps
  extends VariantProps<typeof accordionContentVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (panel content)
   */
  children: React.ReactNode;
}

/**
 * Accordion Context
 */
interface AccordionContextValue {
  type: 'single' | 'multiple';
  collapsible: boolean;
  value: string[];
  onValueChange: (value: string) => void;
  variant: 'default' | 'line';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
};

/**
 * AccordionItem Context
 */
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionTrigger and AccordionContent must be used within AccordionItem'
    );
  }
  return context;
};

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
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = 'single',
      collapsible = false,
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
    const [internalValue, setInternalValue] = React.useState<string[]>(() => {
      if (defaultValue === undefined) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    });

    const value = React.useMemo(() => {
      if (controlledValue === undefined) return internalValue;
      return Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue];
    }, [controlledValue, internalValue]);

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        let newValue: string[];

        if (type === 'single') {
          // Single mode: only one item can be open
          const isOpen = value.includes(itemValue);
          if (isOpen && !collapsible) {
            // If collapsible=false, cannot close the open item
            return;
          }
          newValue = isOpen ? [] : [itemValue];
        } else {
          // Multiple mode: toggle the clicked item
          const isOpen = value.includes(itemValue);
          newValue = isOpen
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue];
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        onValueChange?.(type === 'single' ? newValue[0] || '' : newValue);
      },
      [type, collapsible, value, controlledValue, onValueChange]
    );

    return (
      <AccordionContext.Provider
        value={{
          type,
          collapsible,
          value,
          onValueChange: handleValueChange,
          variant: variant as 'default' | 'line',
        }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

/**
 * AccordionItem Component
 *
 * **Foundation Layer:**
 * - Auto-generates unique IDs for aria-controls and aria-labelledby
 * - Provides context for trigger and content components
 */
export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, variant: variantProp, className, children, ...props }, ref) => {
  const { value: openValues, variant: contextVariant } = useAccordionContext();
  const variant = (variantProp ?? contextVariant) as 'default' | 'line';
  const isOpen = openValues.includes(value);

  const triggerId = React.useMemo(() => `accordion-trigger-${value}`, [value]);
  const contentId = React.useMemo(() => `accordion-content-${value}`, [value]);

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen, triggerId, contentId }}
    >
      <div
        ref={ref}
        className={cn(accordionItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
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
  HTMLButtonElement,
  AccordionTriggerProps
>(({ variant: variantProp, className, children, disabled, ...props }, ref) => {
  const { onValueChange, variant: contextVariant } = useAccordionContext();
  const { value, isOpen, triggerId, contentId } = useAccordionItemContext();
  const variant = (variantProp ?? contextVariant) as 'default' | 'line';

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      disabled={disabled}
      className={cn(accordionTriggerVariants({ variant }), className)}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
        {children}
      </span>
      <svg
        className={cn(
          'h-4 w-4 flex-shrink-0 transition-transform text-gray-500 dark:text-gray-400',
          isOpen && 'rotate-180'
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';

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
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen, triggerId, contentId } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn(
        accordionContentVariants({ state: isOpen ? 'open' : 'closed' }),
        className
      )}
      style={{
        height: isOpen ? 'auto' : 0,
      }}
      {...props}
    >
      <div className="px-4 pb-3 pt-0 text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
});

AccordionContent.displayName = 'AccordionContent';
