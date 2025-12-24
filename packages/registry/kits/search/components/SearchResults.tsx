// Search Kit - SearchResults Component
// 검색 결과 컴포넌트

'use client';

import { Card, CardBody, Badge, Skeleton, Pagination } from '@hanui/react';
import { FileText, Image as ImageIcon } from 'lucide-react';
import { useSearchStore } from '../stores/searchStore';
import type { SearchResult } from '../types/search';

interface SearchResultsProps<T = unknown> {
  results?: SearchResult<T>[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onResultClick?: (result: SearchResult<T>) => void;
  renderResult?: (result: SearchResult<T>) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function SearchResults<T = unknown>({
  results: externalResults,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onResultClick,
  renderResult,
  emptyMessage = '검색 결과가 없습니다',
  className,
}: SearchResultsProps<T>) {
  const { results: storeResults, totalResults, query } = useSearchStore();
  const results = externalResults ?? (storeResults as SearchResult<T>[]);

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardBody>
              <div className="flex gap-4">
                <Skeleton className="w-20 h-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <FileText className="w-12 h-12 mx-auto text-krds-gray-30 mb-4" />
        <p className="text-krds-gray-60">{emptyMessage}</p>
        <p className="text-sm text-krds-gray-40 mt-2">
          다른 검색어로 다시 시도해 보세요
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 결과 요약 */}
      <div className="mb-4 text-sm text-krds-gray-60">
        <span className="font-medium text-krds-gray-90">"{query}"</span>에 대한
        검색 결과{' '}
        <span className="font-medium text-krds-primary-base">
          {totalResults}
        </span>
        건
      </div>

      {/* 결과 목록 */}
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id}>
            {renderResult ? (
              renderResult(result)
            ) : (
              <SearchResultCard result={result} onClick={onResultClick} />
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && onPageChange && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

// 기본 결과 카드 컴포넌트
function SearchResultCard<T>({
  result,
  onClick,
}: {
  result: SearchResult<T>;
  onClick?: (result: SearchResult<T>) => void;
}) {
  const handleClick = () => {
    onClick?.(result);
    if (result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardBody>
        <div className="flex gap-4">
          {/* 썸네일 */}
          {result.thumbnail ? (
            <img
              src={result.thumbnail}
              alt=""
              className="w-20 h-20 object-cover rounded flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 bg-krds-gray-10 rounded flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-8 h-8 text-krds-gray-30" />
            </div>
          )}

          {/* 내용 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1">
              <h3
                className="font-medium text-krds-gray-90 line-clamp-1"
                dangerouslySetInnerHTML={{
                  __html: result.highlight?.title || result.title,
                }}
              />
              {result.category && (
                <Badge variant="secondary" className="flex-shrink-0">
                  {result.category}
                </Badge>
              )}
            </div>

            {result.description && (
              <p
                className="text-sm text-krds-gray-60 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: result.highlight?.description || result.description,
                }}
              />
            )}

            {result.url && (
              <p className="text-xs text-krds-gray-40 mt-2 truncate">
                {result.url}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
