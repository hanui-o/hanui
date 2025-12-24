// Search Kit - SearchBar Component
// 검색 바 컴포넌트

'use client';

import { useRef, useCallback } from 'react';
import { Input, Button } from '@hanui/react';
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { useSearchStore } from '../stores/searchStore';
import {
  useSearch,
  useAutocomplete,
  useSearchKeyboard,
  useClickOutside,
} from '../hooks/useSearch';
import type { AutocompleteItem } from '../types/search';

interface SearchBarProps {
  placeholder?: string;
  category?: string;
  onSearch?: (query: string) => void;
  onResultClick?: (item: AutocompleteItem) => void;
  className?: string;
}

export function SearchBar({
  placeholder = '검색어를 입력하세요',
  category,
  onSearch,
  onResultClick,
  className,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    isOpen,
    autocompleteItems,
    selectedIndex,
    recentSearches,
    setQuery,
    setOpen,
    setSelectedIndex,
    removeRecentSearch,
    clearRecentSearches,
    addRecentSearch,
  } = useSearchStore();

  const { executeSearch, isLoading } = useSearch({ category });
  const { isLoading: isAutocompleteLoading } = useAutocomplete(category);

  const handleSelect = useCallback(
    (item: AutocompleteItem) => {
      setQuery(item.text);
      setOpen(false);
      addRecentSearch(item.text, category);
      onResultClick?.(item);
      onSearch?.(item.text);
    },
    [setQuery, setOpen, addRecentSearch, category, onResultClick, onSearch]
  );

  const { handleKeyDown } = useSearchKeyboard(handleSelect);

  useClickOutside(containerRef, () => {
    setOpen(false);
    setSelectedIndex(-1);
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      executeSearch();
      setOpen(false);
      onSearch?.(query);
    },
    [query, executeSearch, setOpen, onSearch]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setOpen(true);
    },
    [setQuery, setOpen]
  );

  const handleFocus = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, [setQuery]);

  const getItemIcon = (type: AutocompleteItem['type']) => {
    switch (type) {
      case 'recent':
        return <Clock className="w-4 h-4 text-krds-gray-40" />;
      case 'popular':
        return <TrendingUp className="w-4 h-4 text-krds-primary-base" />;
      default:
        return <Search className="w-4 h-4 text-krds-gray-40" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-krds-gray-40" />
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-20"
            autoComplete="off"
            aria-label="검색"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="search-results"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-7 w-7"
                aria-label="검색어 지우기"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={!query.trim() || isLoading}
            >
              {isLoading || isAutocompleteLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                '검색'
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* 자동완성 드롭다운 */}
      {isOpen && (
        <div
          id="search-results"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-krds-gray-20 rounded-lg shadow-lg overflow-hidden"
        >
          {autocompleteItems.length === 0 && !query ? (
            <div className="p-4 text-center text-krds-gray-50 text-sm">
              검색어를 입력하세요
            </div>
          ) : autocompleteItems.length === 0 ? (
            <div className="p-4 text-center text-krds-gray-50 text-sm">
              검색 결과가 없습니다
            </div>
          ) : (
            <>
              {/* 최근 검색어 섹션 */}
              {!query && recentSearches.length > 0 && (
                <div className="border-b border-krds-gray-10">
                  <div className="flex items-center justify-between px-4 py-2 bg-krds-gray-5">
                    <span className="text-xs font-medium text-krds-gray-60">
                      최근 검색어
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-xs h-6"
                    >
                      전체 삭제
                    </Button>
                  </div>
                </div>
              )}

              {/* 자동완성 목록 */}
              <ul className="max-h-80 overflow-y-auto">
                {autocompleteItems.map((item, index) => (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={selectedIndex === index}
                    className={`
                      flex items-center gap-3 px-4 py-3 cursor-pointer
                      ${selectedIndex === index ? 'bg-krds-primary-5' : 'hover:bg-krds-gray-5'}
                    `}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {getItemIcon(item.type)}
                    <span className="flex-1 text-sm text-krds-gray-90">
                      {item.text}
                    </span>
                    {item.type === 'recent' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(item.id);
                        }}
                        className="h-6 w-6"
                        aria-label="검색어 삭제"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                    {item.category && (
                      <span className="text-xs text-krds-gray-50 bg-krds-gray-10 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
