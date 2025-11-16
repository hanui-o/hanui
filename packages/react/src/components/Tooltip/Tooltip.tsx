import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Tooltip Variants Definition
 *
 * KRDS-compliant tooltip with accessibility automation
 * Foundation Layer: Focus management + ARIA automation + Keyboard navigation
 */
const tooltipVariants = cva(
  [
    'absolute',
    'z-50',
    'px-3',
    'py-2',
    'text-sm',
    'rounded-md',
    'shadow-lg',
    'pointer-events-none',
    'max-w-xs',
    'break-words',
    'animate-in',
    'fade-in-0',
    'zoom-in-95',
  ].join(' '),
  {
    variants: {
      /**
       * Variant - Visual style
       * KRDS default: dark tooltip with white text
       */
      variant: {
        default: ['bg-gray-900', 'text-white'].join(' '),
        light: ['bg-white', 'text-gray-900', 'border', 'border-gray-200'].join(
          ' '
        ),
      },
      /**
       * Position - Tooltip placement
       */
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'top',
    },
  }
);

/**
 * Tooltip Props Interface
 *
 * Foundation Layer auto-implementation:
 * - aria-labelledby auto-connection (KRDS 2.2 requirement)
 * - Focus management (mouse hover + keyboard focus)
 * - ESC key handler with focus restoration
 */
export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /**
   * Tooltip content text
   */
  content: React.ReactNode;

  /**
   * Child element that triggers the tooltip
   */
  children: React.ReactElement;

  /**
   * Delay before showing tooltip (ms)
   * @default 200
   */
  delay?: number;

  /**
   * Whether tooltip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for tooltip container
   */
  className?: string;

  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
}

/**
 * Tooltip Component
 *
 * **Foundation Layer Features:**
 * - Focus Management: Mouse hover + keyboard focus detection + Blur handling
 * - ARIA Automation: aria-labelledby auto-connection (KRDS 2.2)
 * - Keyboard Navigation: ESC key closes tooltip and restores focus
 * - WCAG 2.2 Compliance: 1.4.13 Content on Hover or Focus
 *
 * **KRDS 2.2 Standards:**
 * - aria-labelledby connects activation button to tooltip content
 * - Blur: Tab/Shift+Tab moves focus and hides tooltip
 * - ESC: Closes tooltip and returns focus to activation button
 * - Dark background with white text (contrast ratio >7:1)
 *
 * @example
 * ```tsx
 * <Tooltip content="Save your changes">
 *   <Button>Save</Button>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * <Tooltip content="Delete item" position="right" variant="light">
 *   <Button variant="danger">Delete</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      variant,
      position,
      delay = 200,
      disabled = false,
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [tooltipId] = React.useState(
      () => `tooltip-${Math.random().toString(36).substr(2, 9)}`
    );
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLElement | null>(null);

    /**
     * Foundation Layer: Focus Management
     * Show tooltip on mouse enter or focus
     */
    const handleShow = React.useCallback(() => {
      if (disabled) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [disabled, delay]);

    /**
     * Foundation Layer: Focus Management
     * Hide tooltip on mouse leave or blur
     */
    const handleHide = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }, []);

    /**
     * Foundation Layer: Keyboard Navigation
     * ESC key closes tooltip and restores focus to activation button (KRDS 2.2)
     */
    const handleKeyDown = React.useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isVisible) {
          handleHide();
          // KRDS: Restore focus to activation button after ESC
          if (buttonRef.current) {
            buttonRef.current.focus();
          }
        }
      },
      [isVisible, handleHide]
    );

    /**
     * Foundation Layer: Event Listeners Setup
     * Mouse hover + keyboard focus + blur + ESC key
     */
    React.useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const child = wrapper.firstElementChild as HTMLElement;
      if (!child) return;

      // Store reference to activation button for ESC focus restoration
      buttonRef.current = child;

      // Mouse events (KRDS: Mouseover/Mouseleave)
      child.addEventListener('mouseenter', handleShow);
      child.addEventListener('mouseleave', handleHide);

      // Focus events (KRDS: Focus shows, Blur hides on Tab/Shift+Tab)
      child.addEventListener('focus', handleShow);
      child.addEventListener('blur', handleHide);

      // ESC key handler (KRDS: Close and restore focus)
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        child.removeEventListener('mouseenter', handleShow);
        child.removeEventListener('mouseleave', handleHide);
        child.removeEventListener('focus', handleShow);
        child.removeEventListener('blur', handleHide);
        document.removeEventListener('keydown', handleKeyDown);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [handleShow, handleHide, handleKeyDown]);

    /**
     * Foundation Layer: ARIA Automation
     * Clone child with aria-labelledby auto-connection (KRDS 2.2 requirement)
     */
    const childWithAria = React.cloneElement(children, {
      'aria-labelledby': isVisible ? tooltipId : undefined,
    } as React.HTMLAttributes<HTMLElement>);

    return (
      <div
        ref={wrapperRef}
        className={cn('relative inline-block', wrapperClassName)}
        {...props}
      >
        {childWithAria}

        {/* Tooltip Content */}
        {isVisible && !disabled && (
          <div
            ref={ref}
            id={tooltipId}
            role="tooltip"
            className={cn(tooltipVariants({ variant, position }), className)}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
