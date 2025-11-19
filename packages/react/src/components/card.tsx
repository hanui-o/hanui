'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Variants Definition
 *
 * KRDS-compliant card with elevation, interactive states, and semantic structure
 */
const cardVariants = cva(
  [
    'rounded-lg',
    'border',
    'border-gray-200',
    'dark:border-gray-800',
    'bg-white',
    'dark:bg-gray-900',
    'transition-all',
    'duration-200',
  ].join(' '),
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
      hoverable: false,
    },
  }
);

/**
 * Card Props
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Content to render inside the card
   */
  children: React.ReactNode;

  /**
   * Click handler (makes card interactive)
   */
  onClick?: () => void;
}

/**
 * CardHeader Props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * CardTitle Props
 */
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
  /**
   * Heading level for semantic HTML
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * CardDescription Props
 */
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * CardBody Props
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * CardFooter Props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

/**
 * Card Component
 *
 * KRDS-compliant card with elevation, interactive states, and semantic structure
 *
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description text</CardDescription>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Card content goes here</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant, padding, hoverable, className, onClick, children, ...props },
    ref
  ) => {
    const handleKeyDown = onClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }
      : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
            hoverable: onClick ? true : hoverable,
          }),
          className
        )}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader Component
 *
 * Container for card title and description
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex', 'flex-col', 'space-y-1.5', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle Component
 *
 * Semantic heading for card title
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
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
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription Component
 *
 * Descriptive text for card
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-[15px]',
        'leading-[150%]',
        'text-gray-600 dark:text-gray-400',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

/**
 * CardBody Component
 *
 * Main content area of card
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter Component
 *
 * Footer area for actions or additional info
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex', 'items-center', 'gap-2', 'pt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Export cardVariants for external use
export { cardVariants };
