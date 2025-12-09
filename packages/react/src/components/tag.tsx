'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Check, X } from 'lucide-react';

/**
 * Tag 스타일 variants
 * KRDS 디자인 시스템 기반
 */
const tagVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-medium transition-colors',
  {
    variants: {
      variant: {
        // 기본 (filled)
        default: 'bg-krds-gray-10 text-krds-gray-90',
        primary: 'bg-krds-primary-5 text-krds-primary-60',
        secondary: 'bg-krds-gray-5 text-krds-gray-70',
        success: 'bg-krds-success-5 text-krds-success-base',
        warning: 'bg-krds-warning-5 text-krds-warning-40',
        error: 'bg-krds-danger-5 text-krds-danger-base',
        info: 'bg-krds-info-5 text-krds-info-base',
        // 아웃라인
        'outline-default':
          'border border-krds-gray-30 bg-white text-krds-gray-90',
        'outline-primary':
          'border border-krds-primary-30 bg-white text-krds-primary-60',
        'outline-secondary':
          'border border-krds-gray-30 bg-white text-krds-gray-70',
        'outline-success':
          'border border-krds-success-30 bg-white text-krds-success-base',
        'outline-warning':
          'border border-krds-warning-30 bg-white text-krds-warning-40',
        'outline-error':
          'border border-krds-danger-30 bg-white text-krds-danger-base',
        'outline-info':
          'border border-krds-info-30 bg-white text-krds-info-base',
      },
      size: {
        sm: 'text-sm h-6 px-2 rounded',
        md: 'text-sm h-7 px-2.5 rounded-md',
        lg: 'text-base h-8 px-3 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================================================
// Tag (기본 태그)
// ============================================================================

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** 아이콘 (왼쪽) */
  icon?: React.ReactNode;
}

/**
 * Tag 컴포넌트
 *
 * 콘텐츠 분류, 데이터 속성을 표시하는 기본 태그입니다.
 * 비대화형(non-interactive)으로 정보 표시에 사용됩니다.
 *
 * @example
 * ```tsx
 * <Tag>기본 태그</Tag>
 * <Tag variant="primary">Primary</Tag>
 * <Tag variant="outline-default" size="sm">작은 태그</Tag>
 * ```
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

// ============================================================================
// SelectableTag (선택 가능한 태그)
// ============================================================================

export interface SelectableTagProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof tagVariants> {
  /** 선택 상태 */
  selected?: boolean;
  /** 선택 상태 변경 핸들러 */
  onChange?: (selected: boolean) => void;
  /** 체크 아이콘 표시 여부 */
  showCheckIcon?: boolean;
}

/**
 * SelectableTag 컴포넌트
 *
 * 필터링/정렬 옵션으로 사용되는 선택 가능한 태그입니다.
 * 선택 시 체크 아이콘이 표시됩니다.
 *
 * @example
 * ```tsx
 * <SelectableTag selected={isSelected} onChange={setIsSelected}>
 *   선택 가능
 * </SelectableTag>
 * ```
 */
export const SelectableTag = React.forwardRef<
  HTMLButtonElement,
  SelectableTagProps
>(
  (
    {
      className,
      variant = 'outline-default',
      size,
      selected = false,
      onChange,
      showCheckIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      onChange?.(!selected);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={selected}
        onClick={handleClick}
        className={cn(
          tagVariants({ variant, size }),
          'cursor-pointer',
          'hover:bg-krds-gray-5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-1',
          selected &&
            'bg-krds-primary-5 border-krds-primary-60 text-krds-primary-60',
          className
        )}
        {...props}
      >
        {showCheckIcon && selected && (
          <Check className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

SelectableTag.displayName = 'SelectableTag';

// ============================================================================
// RemovableTag (삭제 가능한 태그)
// ============================================================================

export interface RemovableTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onRemove'>,
    VariantProps<typeof tagVariants> {
  /** 삭제 버튼 클릭 핸들러 */
  onRemove?: () => void;
  /** 삭제 버튼 aria-label */
  removeLabel?: string;
}

/**
 * RemovableTag 컴포넌트
 *
 * 삭제 버튼이 있는 태그입니다.
 * 필터링 옵션에서 선택된 조건을 삭제할 때 사용합니다.
 *
 * @example
 * ```tsx
 * <RemovableTag onRemove={() => handleRemove(id)}>
 *   삭제 가능한 태그
 * </RemovableTag>
 * ```
 */
export const RemovableTag = React.forwardRef<
  HTMLSpanElement,
  RemovableTagProps
>(
  (
    {
      className,
      variant = 'outline-default',
      size,
      onRemove,
      removeLabel = '삭제',
      children,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onRemove?.();
      }
    };

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant, size }), 'pr-1.5', className)}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={onRemove}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex items-center justify-center',
            'w-4 h-4 rounded-sm ml-0.5',
            'hover:bg-krds-gray-20 transition-colors',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-krds-primary-60'
          )}
          aria-label={removeLabel}
        >
          <X className="w-3 h-3" aria-hidden="true" />
        </button>
      </span>
    );
  }
);

RemovableTag.displayName = 'RemovableTag';

// ============================================================================
// TagGroup (태그 그룹)
// ============================================================================

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 전체 삭제 버튼 표시 여부 */
  showClearAll?: boolean;
  /** 전체 삭제 버튼 텍스트 */
  clearAllText?: string;
  /** 전체 삭제 핸들러 */
  onClearAll?: () => void;
  /** 태그 간격 */
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingStyles = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

/**
 * TagGroup 컴포넌트
 *
 * 여러 태그를 그룹화하고 일괄 삭제 기능을 제공합니다.
 *
 * @example
 * ```tsx
 * <TagGroup onClearAll={handleClearAll} showClearAll>
 *   <RemovableTag onRemove={() => removeTag(1)}>태그1</RemovableTag>
 *   <RemovableTag onRemove={() => removeTag(2)}>태그2</RemovableTag>
 * </TagGroup>
 * ```
 */
export const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      className,
      showClearAll = false,
      clearAllText = '전체 삭제',
      onClearAll,
      spacing = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex flex-wrap items-center',
          spacingStyles[spacing],
          className
        )}
        {...props}
      >
        {children}
        {showClearAll && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className={cn(
              'text-sm text-krds-gray-60 underline',
              'hover:text-krds-gray-90 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:rounded'
            )}
          >
            {clearAllText}
          </button>
        )}
      </div>
    );
  }
);

TagGroup.displayName = 'TagGroup';

export { tagVariants };
