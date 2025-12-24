// Board Kit - PostList Component
// 게시글 목록 컴포넌트

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Pagination,
  Skeleton,
} from '@hanui/react';
import { Search, Plus } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { usePostStore } from '../stores/postStore';
import { PostCard } from './PostCard';

interface PostListProps {
  basePath?: string;
  categories?: string[];
}

export function PostList({
  basePath = '/posts',
  categories = [],
}: PostListProps) {
  const [searchInput, setSearchInput] = useState('');
  const { params, setParams } = usePostStore();
  const { data, isLoading, error } = usePosts(params);

  const handleSearch = () => {
    setParams({ search: searchInput, page: 1 });
  };

  const handleCategoryChange = (category: string) => {
    setParams({ category: category === 'all' ? undefined : category, page: 1 });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-') as [
      'createdAt' | 'views' | 'title',
      'asc' | 'desc',
    ];
    setParams({ sortBy, sortOrder, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setParams({ page });
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-krds-danger-base">
          게시글을 불러오는 중 오류가 발생했습니다.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상단 필터 영역 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Input
              placeholder="검색어를 입력하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
              aria-label="검색"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {categories.length > 0 && (
            <Select
              value={params.category || 'all'}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select
            value={`${params.sortBy}-${params.sortOrder}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">최신순</SelectItem>
              <SelectItem value="createdAt-asc">오래된순</SelectItem>
              <SelectItem value="views-desc">조회수순</SelectItem>
              <SelectItem value="title-asc">제목순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button asChild>
          <Link href={`${basePath}/new`}>
            <Plus className="w-4 h-4 mr-2" />
            글쓰기
          </Link>
        </Button>
      </div>

      {/* 게시글 목록 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-krds-gray-50">게시글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              href={`${basePath}/${post.id}`}
            />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
