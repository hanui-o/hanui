// Search Kit - Hooks
// 검색 관련 React hooks

import { useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';
import {
  search,
  getAutocomplete,
  getPopularSearches,
  logSearch,
} from '../api/search';
import { useSearchStore } from '../stores/searchStore';
import type { SearchParams, AutocompleteItem } from '../types/search';

// 디바운스 hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

import { useState } from 'react';

// 검색 실행 hook
export function useSearch<T = unknown>(params?: Partial<SearchParams>) {
  const { query, setResults, setSearching, addRecentSearch } = useSearchStore();
  const debouncedQuery = useDebounce(query, 300);

  const queryResult = useQuery({
    queryKey: ['search', debouncedQuery, params],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return null;
      setSearching(true);
      const result = await search<T>({ query: debouncedQuery, ...params });
      setResults(result.results, result.total);
      return result;
    },
    enabled: !!debouncedQuery.trim(),
    staleTime: 30 * 1000,
  });

  const executeSearch = useCallback(async () => {
    if (!query.trim()) return;
    addRecentSearch(query, params?.category);
    await logSearch(query, params?.category).catch(() => {});
  }, [query, params?.category, addRecentSearch]);

  return {
    ...queryResult,
    executeSearch,
  };
}

// 자동완성 hook
export function useAutocomplete(category?: string) {
  const { query, setAutocompleteItems, recentSearches, popularSearches } =
    useSearchStore();
  const debouncedQuery = useDebounce(query, 150);

  const { data, isLoading } = useQuery({
    queryKey: ['autocomplete', debouncedQuery, category],
    queryFn: () => getAutocomplete(debouncedQuery, category),
    enabled: debouncedQuery.length >= 1,
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (!query.trim()) {
      // 검색어 없으면 최근 검색어 + 인기 검색어 표시
      const items: AutocompleteItem[] = [
        ...recentSearches.slice(0, 5).map((s) => ({
          id: s.id,
          text: s.query,
          type: 'recent' as const,
          category: s.category,
        })),
        ...popularSearches.slice(0, 5).map((s, i) => ({
          id: `popular-${i}`,
          text: s.query,
          type: 'popular' as const,
        })),
      ];
      setAutocompleteItems(items);
    } else if (data) {
      setAutocompleteItems(data);
    }
  }, [query, data, recentSearches, popularSearches, setAutocompleteItems]);

  return { isLoading };
}

// 인기 검색어 hook
export function usePopularSearches(limit = 10) {
  const { setPopularSearches } = useSearchStore();

  return useQuery({
    queryKey: ['popular-searches', limit],
    queryFn: () => getPopularSearches(limit),
    staleTime: 5 * 60 * 1000, // 5분
    select: (data) => {
      setPopularSearches(data);
      return data;
    },
  });
}

// 키보드 네비게이션 hook
export function useSearchKeyboard(onSelect: (item: AutocompleteItem) => void) {
  const {
    autocompleteItems,
    selectedIndex,
    moveSelection,
    setSelectedIndex,
    setOpen,
  } = useSearchStore();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          moveSelection('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveSelection('up');
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && autocompleteItems[selectedIndex]) {
            onSelect(autocompleteItems[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [
      autocompleteItems,
      selectedIndex,
      moveSelection,
      setSelectedIndex,
      setOpen,
      onSelect,
    ]
  );

  return { handleKeyDown };
}

// 검색 바깥 클릭 감지 hook
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClickOutside]);
}
