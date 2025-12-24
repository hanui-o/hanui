// Dashboard Kit - ActivityFeed Component
// 활동 피드 컴포넌트

'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Skeleton,
  Badge,
} from '@hanui/react';
import type { Activity } from '../types/dashboard';

interface ActivityFeedProps {
  activities: Activity[];
  isLoading?: boolean;
  title?: string;
  maxItems?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function ActivityFeed({
  activities,
  isLoading = false,
  title = '최근 활동',
  maxItems = 10,
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      create: '➕',
      update: '✏️',
      delete: '🗑️',
      login: '🔐',
      comment: '💬',
      like: '❤️',
      share: '🔗',
      default: '📌',
    };
    return icons[type] || icons.default;
  };

  const getActivityBadge = (type: string) => {
    const variants: Record<
      string,
      'primary' | 'secondary' | 'danger' | 'success'
    > = {
      create: 'success',
      update: 'primary',
      delete: 'danger',
      default: 'secondary',
    };
    return variants[type] || variants.default;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : displayActivities.length === 0 ? (
          <div className="text-center py-8 text-krds-gray-50">
            활동 내역이 없습니다
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b border-krds-gray-10 last:border-0 last:pb-0"
              >
                {/* 아이콘/아바타 */}
                <div className="w-10 h-10 rounded-full bg-krds-gray-5 flex items-center justify-center flex-shrink-0">
                  {activity.user?.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">
                      {getActivityIcon(activity.type)}
                    </span>
                  )}
                </div>

                {/* 내용 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={getActivityBadge(activity.type)}
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-krds-gray-90 font-medium">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="text-sm text-krds-gray-60 mt-0.5 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    {activity.user && (
                      <span className="text-xs text-krds-gray-50">
                        {activity.user.name}
                      </span>
                    )}
                    <span className="text-xs text-krds-gray-40">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
