'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  // Card 스타일 variants (elevation, 인터랙티브 상태)
  [
    'relative',
    'rounded-lg',
    'border',
    'border-krds-gray-5',
    'bg-krds-gray-5',
    'transition-all',
    'duration-200',
    'space-y-4',
  ].join(' '),
  {
    variants: {
      variant: {
        outlined: ['bg-krds-white', 'border border-krds-gray-10'].join(' '),
        shadow: [
          'bg-krds-white',
          'shadow-md',
          'border border-krds-gray-5',
        ].join(' '),
        filled: ['bg-krds-gray-5'].join(' '),
        elevated: ['bg-krds-white', 'shadow-md', 'border-0'].join(' '),
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
        // 패딩 크기 (none, sm, md, lg)
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hoverable: {
        true: [
          'hover:shadow-xl',
          'hover:-translate-y-0.5',
          'cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-krds-primary-base',
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

export interface CardProps // Card Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void; // 클릭 핸들러 (제공 시 카드가 인터랙티브해짐)
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // CardHeader Props
  className?: string;
  children: React.ReactNode;
}

export interface CardTitleProps // CardTitle Props
  extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // 시맨틱 HTML 헤딩 레벨 (기본값: h3)
}

export interface CardDescriptionProps // CardDescription Props
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  // CardBody Props
  className?: string;
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  // CardFooter Props
  className?: string;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>( // KRDS 기반 Card 컴포넌트 (elevation, 인터랙티브, 시맨틱 구조)
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

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>( // CardHeader 컴포넌트 (제목과 설명 컨테이너)
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

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>( // CardTitle 컴포넌트 (시맨틱 헤딩)
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

export const CardDescription = React.forwardRef<
  // CardDescription 컴포넌트 (설명 텍스트)
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-[15px]',
        'leading-[150%]',
        'text-krds-gray-60',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>( // CardBody 컴포넌트 (메인 콘텐츠 영역)
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>( // CardFooter 컴포넌트 (액션 또는 추가 정보 영역)
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

export { cardVariants }; // cardVariants 내보내기 (외부 확장용)
