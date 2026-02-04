'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/badge';

const activityFeedVariants = cva('', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const activityItemVariants = cva(
  'relative flex gap-3 py-3 border-b border-krds-gray-10 last:border-b-0',
  {
    variants: {
      status: {
        default: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

const statusIndicatorVariants = cva(
  'absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full',
  {
    variants: {
      status: {
        default: 'bg-krds-gray-40',
        success: 'bg-krds-success-base',
        warning: 'bg-krds-warning-base',
        error: 'bg-krds-danger-base',
        info: 'bg-krds-info-base',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

export interface ActivityItem {
  /** 고유 ID */
  id: string;
  /** 활동 제목 */
  title: string;
  /** 활동 설명 */
  description?: string;
  /** 타임스탬프 (ISO 8601 형식) */
  timestamp: string;
  /** 상태 */
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** 태그/뱃지 */
  badge?: string;
  /** 뱃지 색상 */
  badgeVariant?:
    | 'gray'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 사용자/작성자 */
  author?: string;
  /** 클릭 시 동작 */
  onClick?: () => void;
  /** 링크 URL */
  href?: string;
}

export interface ActivityFeedProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'>,
    VariantProps<typeof activityFeedVariants> {
  /** 피드 제목 */
  title?: string;
  /** 활동 항목 목록 */
  items: ActivityItem[];
  /** 최대 표시 개수 */
  maxItems?: number;
  /** 모두 보기 클릭 핸들러 */
  onViewAll?: () => void;
  /** 모두 보기 텍스트 */
  viewAllText?: string;
  /** 빈 상태 메시지 */
  emptyMessage?: string;
  /** 상태 인디케이터 표시 */
  showStatusIndicator?: boolean;
}

/**
 * 상대적 시간 포맷팅 함수
 */
const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 7일 이상이면 날짜 표시
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * 절대 시간 포맷팅 함수 (접근성용)
 */
const formatAbsoluteTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const ActivityItemComponent: React.FC<{
  item: ActivityItem;
  showStatusIndicator: boolean;
}> = ({ item, showStatusIndicator }) => {
  const {
    title,
    description,
    timestamp,
    status = 'default',
    badge,
    badgeVariant = 'gray',
    icon,
    author,
    onClick,
    href,
  } = item;

  const content = (
    <>
      {showStatusIndicator && (
        <span
          className={cn(statusIndicatorVariants({ status }))}
          aria-hidden="true"
        />
      )}
      {icon && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-krds-gray-10 flex items-center justify-center text-krds-gray-60"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className={cn('flex-1 min-w-0', showStatusIndicator && 'pl-4')}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-krds-gray-90 truncate">
              {title}
            </p>
            {description && (
              <p className="mt-0.5 text-sm text-krds-gray-60 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          {badge && (
            <Badge variant={badgeVariant} size="md" className="flex-shrink-0">
              {badge}
            </Badge>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-krds-gray-50">
          <time dateTime={timestamp} title={formatAbsoluteTime(timestamp)}>
            {formatRelativeTime(timestamp)}
          </time>
          {author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{author}</span>
            </>
          )}
        </div>
      </div>
    </>
  );

  const baseClassName = cn(
    activityItemVariants({ status }),
    (onClick || href) &&
      'cursor-pointer hover:bg-krds-gray-5 transition-colors rounded-lg -mx-2 px-2'
  );

  if (href) {
    return (
      <li>
        <a href={href} className={baseClassName}>
          {content}
        </a>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
        <button
          type="button"
          onClick={onClick}
          className={cn(baseClassName, 'w-full text-left')}
        >
          {content}
        </button>
      </li>
    );
  }

  return <li className={baseClassName}>{content}</li>;
};

export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      className,
      size,
      title,
      items,
      maxItems,
      onViewAll,
      viewAllText = '모두 보기',
      emptyMessage = '최근 활동이 없습니다.',
      showStatusIndicator = false,
      ...props
    },
    ref
  ) => {
    const displayItems = maxItems ? items.slice(0, maxItems) : items;
    const hasMore = maxItems && items.length > maxItems;

    return (
      <Card
        ref={ref}
        className={cn(activityFeedVariants({ size }), className)}
        variant="outlined"
        padding="md"
        {...props}
      >
        {title && (
          <CardHeader className="pb-4">
            <CardTitle as="h3" className="text-lg">
              {title}
            </CardTitle>
          </CardHeader>
        )}

        {displayItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-krds-gray-50">
            {emptyMessage}
          </p>
        ) : (
          <ul
            className="divide-y-0"
            role="feed"
            aria-label={title || '활동 피드'}
          >
            {displayItems.map((item) => (
              <ActivityItemComponent
                key={item.id}
                item={item}
                showStatusIndicator={showStatusIndicator}
              />
            ))}
          </ul>
        )}

        {hasMore && onViewAll && (
          <div className="mt-4 pt-4 border-t border-krds-gray-10">
            <button
              type="button"
              onClick={onViewAll}
              className="w-full py-2 text-sm font-medium text-krds-primary-base hover:text-krds-primary-60 transition-colors"
            >
              {viewAllText} ({items.length})
            </button>
          </div>
        )}
      </Card>
    );
  }
);

ActivityFeed.displayName = 'ActivityFeed';

export { activityFeedVariants, activityItemVariants, statusIndicatorVariants };
