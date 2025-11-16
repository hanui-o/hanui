'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Tabs Variants Definition
 *
 * KRDS-compliant tabs with accessibility automation
 * Foundation Layer: ARIA automation + Keyboard navigation + Focus management
 */
const tabsListVariants = cva(
  ['flex', 'border-b', 'border-gray-200', 'dark:border-gray-800'].join(' '),
  {
    variants: {
      variant: {
        default: '',
        pills: 'border-0 gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'whitespace-nowrap',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-b-2',
          'border-transparent',
          '-mb-px',
          'data-[state=active]:border-blue-600',
          'data-[state=active]:text-blue-600',
          'data-[state=active]:dark:text-blue-400',
          'data-[state=active]:dark:border-blue-400',
          'data-[state=inactive]:text-gray-600',
          'data-[state=inactive]:dark:text-gray-400',
          'data-[state=inactive]:hover:text-gray-900',
          'data-[state=inactive]:dark:hover:text-gray-100',
        ].join(' '),
        pills: [
          'rounded-md',
          'data-[state=active]:bg-blue-600',
          'data-[state=active]:text-white',
          'data-[state=inactive]:text-gray-600',
          'data-[state=inactive]:dark:text-gray-400',
          'data-[state=inactive]:hover:bg-gray-100',
          'data-[state=inactive]:dark:hover:bg-gray-800',
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
  /**
   * Default active tab value
   */
  defaultValue?: string;

  /**
   * Controlled active tab value
   */
  value?: string;

  /**
   * Callback when tab changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Visual variant
   */
  variant?: 'default' | 'pills';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements (TabsList, TabsContent)
   */
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
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

/**
 * TabsContent Props
 */
export interface TabsContentProps {
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
 * Tabs Root Component
 *
 * **Foundation Layer Features:**
 * - ARIA Automation: role="tablist", role="tab", role="tabpanel"
 * - Keyboard Navigation: Arrow keys, Home, End
 * - Focus Management: Auto-focus on active tab
 * - WCAG 2.1 Compliance: Keyboard access, Focus visibility
 *
 * **KRDS Standards:**
 * - role="tablist" for tab container
 * - role="tab" for each tab button
 * - role="tabpanel" for content areas
 * - aria-selected="true/false" for selection state
 * - aria-controls and aria-labelledby for tab-panel linking
 * - Keyboard: Tab/Shift+Tab, Enter for selection
 * - Color independence: Border/background changes, not color alone
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
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
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * TabsList Component
 *
 * **Foundation Layer:**
 * - Auto-applies role="tablist"
 * - Manages keyboard navigation across tabs
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, variant: variantProp, ...props }, ref) => {
    const { variant: contextVariant } = useTabsContext();
    const variant = variantProp || contextVariant;
    const internalRef = React.useRef<HTMLDivElement>(null);
    const tabsListRef = ref || internalRef;

    /**
     * Foundation Layer: Keyboard Navigation
     * Arrow Left/Right, Home, End keys
     */
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
 * TabsTrigger Component
 *
 * **Foundation Layer:**
 * - Auto-applies role="tab"
 * - Auto-manages aria-selected
 * - Auto-generates aria-controls
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
 * TabsContent Component
 *
 * **Foundation Layer:**
 * - Auto-applies role="tabpanel"
 * - Auto-manages aria-labelledby
 * - Auto-shows/hides based on active tab
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
