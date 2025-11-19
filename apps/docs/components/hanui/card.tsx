'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Variants Definition
 */
const cardVariants = cva(
  ['rounded-lg', 'transition-all', 'duration-200', 'flex', 'flex-col'].join(
    ' '
  ),
  {
    variants: {
      variant: {
        outlined: [
          'bg-white dark:bg-gray-800',
          'border border-gray-300 dark:border-gray-600',
        ].join(' '),
        shadow: [
          'bg-white dark:bg-gray-800',
          'shadow-md dark:shadow-gray-900/50',
          'border border-gray-200 dark:border-gray-700',
        ].join(' '),
        filled: [
          'bg-gray-50 dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-800',
        ].join(' '),
        elevated: [
          'bg-white dark:bg-gray-800',
          'shadow-lg dark:shadow-gray-900/50',
          'border-0',
        ].join(' '),
        info: [
          'bg-blue-50 dark:bg-blue-950',
          'border border-blue-200 dark:border-blue-800',
        ].join(' '),
        success: [
          'bg-green-50 dark:bg-green-950',
          'border border-green-200 dark:border-green-800',
        ].join(' '),
        warning: [
          'bg-yellow-50 dark:bg-yellow-950',
          'border border-yellow-200 dark:border-yellow-800',
        ].join(' '),
        danger: [
          'bg-red-50 dark:bg-red-950',
          'border border-red-200 dark:border-red-800',
        ].join(' '),
        // Deprecated: use 'danger' instead
        error: [
          'bg-red-50 dark:bg-red-950',
          'border border-red-200 dark:border-red-800',
        ].join(' '),
      },
      padding: {
        none: 'p-0',
        sm: 'p-4', // 16px
        md: 'p-6', // 24px
        lg: 'p-8', // 32px
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-4', // 16px
        md: 'gap-6', // 24px
        lg: 'gap-8', // 32px
      },
      hoverable: {
        true: [
          'hover:shadow-xl dark:hover:shadow-gray-900/70',
          'hover:-translate-y-0.5',
          'cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      padding: 'md',
      gap: 'none',
      hoverable: false,
    },
  }
);

/**
 * Card Props Interface
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Card variant (visual style)
   * @default "outlined"
   */
  variant?:
    | 'outlined'
    | 'shadow'
    | 'filled'
    | 'elevated'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'error'; // deprecated: use 'danger' instead

  /**
   * Padding size
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Gap size between child elements
   * @default "none"
   */
  gap?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Enable hover effect
   * Makes card clickable with enhanced shadow on hover
   * @default false
   */
  hoverable?: boolean;

  /**
   * Additional className for layout adjustments
   */
  className?: string;

  /**
   * Optional accessible label for the card
   */
  'aria-label'?: string;
}

/**
 * Card Component (카드)
 *
 * **Foundation Layer Features:**
 * - Semantic HTML: article role for content cards
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Keyboard navigation, focus management
 * - Screen Reader Support: Proper ARIA attributes and semantic structure
 * - Visual Hierarchy: Consistent spacing and shadow system
 * - Dark Mode: Automatic dark mode support with optimized colors
 *
 * **Design Principles:**
 * - Flexible container for grouping related content
 * - Multiple variants for different visual emphasis levels
 * - Compound component pattern for structured content
 * - Hoverable state for interactive cards
 * - Responsive padding options
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Card>
 *   <Card.Header>
 *     <Card.Title>제목</Card.Title>
 *     <Card.Description>설명</Card.Description>
 *   </Card.Header>
 *   <Card.Body>내용</Card.Body>
 *   <Card.Footer>
 *     <Button>확인</Button>
 *   </Card.Footer>
 * </Card>
 *
 * // With variants
 * <Card>테두리 (기본)</Card>
 * <Card variant="shadow">그림자 + 테두리</Card>
 * <Card variant="filled">배경색</Card>
 * <Card variant="elevated">강한 그림자</Card>
 * <Card variant="info">정보 카드</Card>
 * <Card variant="success">성공 카드</Card>
 * <Card variant="warning">경고 카드</Card>
 * <Card variant="danger">위험 카드</Card>
 *
 * // With gap (spacing between children)
 * <Card gap="sm">16px gap</Card>
 * <Card gap="md">24px gap</Card>
 * <Card gap="lg">32px gap</Card>
 *
 * // Hoverable (clickable)
 * <Card hoverable onClick={handleClick}>
 *   클릭 가능한 카드
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, gap, hoverable, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (hoverable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        (e.currentTarget as HTMLDivElement).click();
      }
      props.onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, gap, hoverable }),
          className
        )}
        role={hoverable ? 'button' : 'article'}
        tabIndex={hoverable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

/**
 * Card Header Component
 *
 * Container for card title and description
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex', 'flex-col', 'space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card Title Component
 *
 * Main heading for the card
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-[24px]',
      'font-semibold',
      'leading-[150%]',
      'tracking-tight',
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

/**
 * Card Description Component
 *
 * Subtitle or description text for the card
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-[15px]',
      'leading-[150%]',
      'text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * Card Body Component
 *
 * Main content area of the card
 */
export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
CardBody.displayName = 'CardBody';

/**
 * Card Footer Component
 *
 * Footer area for actions (buttons, etc.)
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex', 'items-center', 'gap-2', 'pt-4', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

/**
 * Export cardVariants for extending
 */
export { cardVariants };
