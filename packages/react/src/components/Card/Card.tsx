import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Card Variants Definition
 */
const cardVariants = cva(['rounded-lg', 'transition-shadow'].join(' '), {
  variants: {
    variant: {
      default: ['bg-white', 'shadow-md', 'border', 'border-gray-200'].join(' '),
      outlined: ['bg-white', 'border-2', 'border-gray-300'].join(' '),
      filled: ['bg-gray-50', 'border-0'].join(' '),
    },
    padding: {
      none: 'p-0',
      small: 'p-4', // 16px
      medium: 'p-6', // 24px
      large: 'p-8', // 32px
    },
    hoverable: {
      true: ['hover:shadow-lg', 'cursor-pointer'].join(' '),
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'medium',
    hoverable: false,
  },
});

/**
 * Card Props Interface
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Card variant (visual style)
   * @default "default"
   */
  variant?: 'default' | 'outlined' | 'filled';

  /**
   * Padding size
   * @default "medium"
   */
  padding?: 'none' | 'small' | 'medium' | 'large';

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
}

/**
 * Card Component
 *
 * KRDS-compliant card component with:
 * - Props-based API (variant, padding)
 * - Hoverable state for interactive cards
 * - Compound component pattern
 * - className escape hatch for layout
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
 * <Card variant="outlined">테두리만</Card>
 * <Card variant="filled">배경색</Card>
 *
 * // With padding
 * <Card padding="small">작은 패딩</Card>
 *
 * // Hoverable (clickable)
 * <Card hoverable onClick={handleClick}>
 *   클릭 가능한 카드
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable }), className)}
        role={hoverable ? 'button' : 'article'}
        tabIndex={hoverable ? 0 : undefined}
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
    className={cn('text-[15px]', 'leading-[150%]', 'text-gray-600', className)}
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
