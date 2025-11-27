'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// ============================================================================
// Skeleton Variants
// ============================================================================

const skeletonVariants = cva('animate-pulse bg-krds-gray-20', {
  variants: {
    variant: {
      /** 기본 직사각형 */
      rectangular: 'rounded-md',
      /** 둥근 모서리 */
      rounded: 'rounded-lg',
      /** 원형 */
      circular: 'rounded-full',
      /** 텍스트 라인 */
      text: 'rounded h-4 w-full',
    },
  },
  defaultVariants: {
    variant: 'rectangular',
  },
});

// ============================================================================
// Skeleton Props
// ============================================================================

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** 너비 */
  width?: string | number;
  /** 높이 */
  height?: string | number;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

// ============================================================================
// Skeleton Component
// ============================================================================

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      width,
      height,
      disableAnimation = false,
      style,
      ...props
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    // 원형일 때 기본 크기
    if (variant === 'circular' && !width && !height) {
      computedStyle.width = '40px';
      computedStyle.height = '40px';
    }

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant }),
          disableAnimation && 'animate-none',
          className
        )}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// ============================================================================
// SkeletonText - 텍스트 라인 스켈레톤
// ============================================================================

export interface SkeletonTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 라인 수 */
  lines?: number;
  /** 라인 간격 */
  gap?: 'sm' | 'md' | 'lg';
  /** 마지막 라인 너비 비율 (0-100) */
  lastLineWidth?: number;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

const gapClasses = {
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
};

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      className,
      lines = 3,
      gap = 'md',
      lastLineWidth = 70,
      disableAnimation = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(gapClasses[gap], className)}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            disableAnimation={disableAnimation}
            style={{
              width: index === lines - 1 ? `${lastLineWidth}%` : '100%',
            }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

// ============================================================================
// SkeletonAvatar - 아바타 스켈레톤
// ============================================================================

export interface SkeletonAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

const avatarSizes = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = 'md', disableAnimation = false, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={avatarSizes[size]}
        height={avatarSizes[size]}
        disableAnimation={disableAnimation}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

// ============================================================================
// SkeletonCard - 카드 스켈레톤
// ============================================================================

export interface SkeletonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 이미지 포함 여부 */
  hasImage?: boolean;
  /** 이미지 높이 */
  imageHeight?: number;
  /** 아바타 포함 여부 */
  hasAvatar?: boolean;
  /** 텍스트 라인 수 */
  lines?: number;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      className,
      hasImage = true,
      imageHeight = 200,
      hasAvatar = false,
      lines = 3,
      disableAnimation = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-lg border border-krds-gray-20 bg-white',
          className
        )}
        aria-hidden="true"
        {...props}
      >
        {/* 이미지 영역 */}
        {hasImage && (
          <Skeleton
            variant="rectangular"
            height={imageHeight}
            className="rounded-none"
            disableAnimation={disableAnimation}
          />
        )}

        {/* 콘텐츠 영역 */}
        <div className="p-4">
          {/* 아바타 + 제목 */}
          {hasAvatar && (
            <div className="mb-4 flex items-center gap-3">
              <SkeletonAvatar size="md" disableAnimation={disableAnimation} />
              <div className="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width="60%"
                  disableAnimation={disableAnimation}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  disableAnimation={disableAnimation}
                />
              </div>
            </div>
          )}

          {/* 텍스트 라인 */}
          <SkeletonText
            lines={lines}
            lastLineWidth={60}
            disableAnimation={disableAnimation}
          />
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

// ============================================================================
// SkeletonTable - 테이블 스켈레톤
// ============================================================================

export interface SkeletonTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 행 수 */
  rows?: number;
  /** 열 수 */
  columns?: number;
  /** 헤더 포함 여부 */
  hasHeader?: boolean;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  (
    {
      className,
      rows = 5,
      columns = 4,
      hasHeader = true,
      disableAnimation = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-lg border border-krds-gray-20',
          className
        )}
        aria-hidden="true"
        {...props}
      >
        <div className="divide-y divide-krds-gray-20">
          {/* 헤더 */}
          {hasHeader && (
            <div className="flex gap-4 bg-krds-gray-5 px-4 py-3">
              {Array.from({ length: columns }).map((_, index) => (
                <Skeleton
                  key={`header-${index}`}
                  variant="text"
                  className="h-5 flex-1"
                  disableAnimation={disableAnimation}
                />
              ))}
            </div>
          )}

          {/* 행 */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-4 px-4 py-3">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  variant="text"
                  className="h-4 flex-1"
                  disableAnimation={disableAnimation}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SkeletonTable.displayName = 'SkeletonTable';

// ============================================================================
// Exports
// ============================================================================

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  skeletonVariants,
};
