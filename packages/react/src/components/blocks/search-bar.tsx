'use client';

import * as React from 'react';
import { Input } from '../input';
import { Button } from '../button';
import { Select } from '../select';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  /** 검색 핸들러 */
  onSearch?: (data: { query: string; category: string }) => void;
  /** 카테고리 옵션 */
  categories?: Array<{ label: string; value: string }>;
  /** 추가 className */
  className?: string;
  /** placeholder */
  placeholder?: string;
  /** 카테고리 선택 표시 */
  showCategory?: boolean;
}

const defaultCategories = [
  { label: '전체', value: 'all' },
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
  { label: '작성자', value: 'author' },
];

export function SearchBar({
  onSearch,
  categories = defaultCategories,
  className,
  placeholder = '검색어를 입력하세요',
  showCategory = true,
}: SearchBarProps) {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState(categories[0]?.value || 'all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({ query, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex items-end gap-3', className)}
    >
      {showCategory && (
        <div className="w-32 flex-shrink-0">
          <Select
            options={categories}
            value={category}
            onChange={(value) => setCategory(value)}
            size="md"
            aria-label="검색 카테고리"
          />
        </div>
      )}

      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          clearable
        />
      </div>

      <Button type="submit" variant="primary" className="flex-shrink-0">
        검색
      </Button>
    </form>
  );
}
