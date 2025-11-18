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
        default: '',
        outlined: 'shadow-none',
        elevated: 'shadow-md hover:shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

const cardHeaderVariants = cva(['flex', 'flex-col', 'space-y-1.5'].join(' '), {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

const cardBodyVariants = cva('', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

const cardFooterVariants = cva(['flex', 'items-center'].join(' '), {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

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
export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
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
export interface CardBodyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardBodyVariants> {
  className?: string;
  children: React.ReactNode;
}

/**
 * CardFooter Props
 */
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {
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
    { variant, padding, interactive, className, onClick, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
            interactive: onClick ? true : interactive,
          }),
          className
        )}
        onClick={onClick}
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
  ({ padding, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ padding }), className)}
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
          'text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100',
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
      className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
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
  ({ padding, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardBodyVariants({ padding }), className)}
        {...props}
      >
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
  ({ padding, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
