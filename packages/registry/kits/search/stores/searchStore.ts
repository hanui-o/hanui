// Search Kit - Store
// Zustand 기반 검색 상태 관리

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  SearchResult,
  RecentSearch,
  PopularSearch,
  AutocompleteItem,
} from '../types/search';

const MAX_RECENT_SEARCHES = 10;

interface SearchStore {
  // 상태
  query: string;
  isOpen: boolean;
  isSearching: boolean;
  results: SearchResult[];
  recentSearches: RecentSearch[];
  popularSearches: PopularSearch[];
  autocompleteItems: AutocompleteItem[];
  selectedIndex: number;
  totalResults: number;

  // 액션
  setQuery: (query: string) => void;
  setOpen: (isOpen: boolean) => void;
  setSearching: (isSearching: boolean) => void;
  setResults: (results: SearchResult[], total?: number) => void;
  setAutocompleteItems: (items: AutocompleteItem[]) => void;
  setPopularSearches: (searches: PopularSearch[]) => void;
  setSelectedIndex: (index: number) => void;
  moveSelection: (direction: 'up' | 'down') => void;

  // 최근 검색어 관리
  addRecentSearch: (query: string, category?: string) => void;
  removeRecentSearch: (id: string) => void;
  clearRecentSearches: () => void;

  // 초기화
  reset: () => void;
}

const initialState = {
  query: '',
  isOpen: false,
  isSearching: false,
  results: [],
  recentSearches: [],
  popularSearches: [],
  autocompleteItems: [],
  selectedIndex: -1,
  totalResults: 0,
};

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setQuery: (query) => set({ query, selectedIndex: -1 }),

      setOpen: (isOpen) => set({ isOpen, selectedIndex: -1 }),

      setSearching: (isSearching) => set({ isSearching }),

      setResults: (results, total) =>
        set({
          results,
          totalResults: total ?? results.length,
          isSearching: false,
        }),

      setAutocompleteItems: (items) =>
        set({ autocompleteItems: items, selectedIndex: -1 }),

      setPopularSearches: (searches) => set({ popularSearches: searches }),

      setSelectedIndex: (index) => set({ selectedIndex: index }),

      moveSelection: (direction) => {
        const { autocompleteItems, selectedIndex } = get();
        const maxIndex = autocompleteItems.length - 1;

        if (direction === 'down') {
          set({
            selectedIndex: selectedIndex < maxIndex ? selectedIndex + 1 : 0,
          });
        } else {
          set({
            selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : maxIndex,
          });
        }
      },

      addRecentSearch: (query, category) => {
        if (!query.trim()) return;

        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newSearch: RecentSearch = {
          id,
          query: query.trim(),
          timestamp: Date.now(),
          category,
        };

        set((state) => {
          // 중복 제거 후 추가
          const filtered = state.recentSearches.filter(
            (s) => s.query.toLowerCase() !== query.toLowerCase()
          );
          return {
            recentSearches: [newSearch, ...filtered].slice(
              0,
              MAX_RECENT_SEARCHES
            ),
          };
        });
      },

      removeRecentSearch: (id) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s.id !== id),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),

      reset: () =>
        set({
          query: '',
          isOpen: false,
          isSearching: false,
          results: [],
          autocompleteItems: [],
          selectedIndex: -1,
          totalResults: 0,
        }),
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    }
  )
);
