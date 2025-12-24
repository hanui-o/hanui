// Search Kit - PopularSearches Component
// 인기 검색어 컴포넌트

'use client';

import { Badge, Skeleton } from '@hanui/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { usePopularSearches } from '../hooks/useSearch';
import { useSearchStore } from '../stores/searchStore';
import type { PopularSearch } from '../types/search';

interface PopularSearchesProps {
  limit?: number;
  title?: string;
  onSearchClick?: (query: string) => void;
  showRank?: boolean;
  showTrend?: boolean;
  layout?: 'list' | 'inline';
  className?: string;
}

export function PopularSearches({
  limit = 10,
  title = '인기 검색어',
  onSearchClick,
  showRank = true,
  showTrend = true,
  layout = 'list',
  className,
}: PopularSearchesProps) {
  const { isLoading, data } = usePopularSearches(limit);
  const { setQuery, setOpen, addRecentSearch } = useSearchStore();

  const handleClick = (search: PopularSearch) => {
    setQuery(search.query);
    addRecentSearch(search.query);
    setOpen(false);
    onSearchClick?.(search.query);
  };

  const getTrendIcon = (trend?: PopularSearch['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-krds-danger-base" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-krds-primary-base" />;
      default:
        return <Minus className="w-3 h-3 text-krds-gray-40" />;
    }
  };

  if (isLoading) {
    return (
      <div className={className}>
        <h3 className="text-sm font-medium text-krds-gray-90 mb-3">{title}</h3>
        {layout === 'list' ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-20" />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  if (layout === 'inline') {
    return (
      <div className={className}>
        <h3 className="text-sm font-medium text-krds-gray-90 mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {data.map((search, index) => (
            <button
              key={search.query}
              onClick={() => handleClick(search)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-krds-gray-5 hover:bg-krds-gray-10 rounded-full transition-colors"
            >
              {showRank && (
                <span
                  className={`text-xs font-bold ${
                    index < 3 ? 'text-krds-primary-base' : 'text-krds-gray-50'
                  }`}
                >
                  {index + 1}
                </span>
              )}
              <span className="text-sm text-krds-gray-90">{search.query}</span>
              {showTrend && getTrendIcon(search.trend)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-krds-gray-90 mb-3">{title}</h3>
      <ol className="space-y-1">
        {data.map((search, index) => (
          <li key={search.query}>
            <button
              onClick={() => handleClick(search)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-krds-gray-5 rounded-lg transition-colors"
            >
              {showRank && (
                <span
                  className={`w-5 text-center text-sm font-bold ${
                    index < 3 ? 'text-krds-primary-base' : 'text-krds-gray-50'
                  }`}
                >
                  {index + 1}
                </span>
              )}
              <span className="flex-1 text-left text-sm text-krds-gray-90 truncate">
                {search.query}
              </span>
              {showTrend && (
                <span className="flex items-center gap-1">
                  {getTrendIcon(search.trend)}
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
