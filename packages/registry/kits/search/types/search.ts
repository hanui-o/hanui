// Search Kit - Types
// 검색 관련 타입 정의

export interface SearchResult<T = unknown> {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  thumbnail?: string;
  data?: T;
  highlight?: {
    title?: string;
    description?: string;
  };
}

export interface SearchParams {
  query: string;
  category?: string;
  page?: number;
  limit?: number;
  filters?: Record<string, string | string[]>;
}

export interface SearchResponse<T = unknown> {
  results: SearchResult<T>[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
  suggestions?: string[];
}

export interface AutocompleteItem {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'suggestion';
  category?: string;
}

export interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
  category?: string;
}

export interface PopularSearch {
  query: string;
  count: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface SearchState {
  query: string;
  isOpen: boolean;
  isSearching: boolean;
  results: SearchResult[];
  recentSearches: RecentSearch[];
  popularSearches: PopularSearch[];
  autocompleteItems: AutocompleteItem[];
  selectedIndex: number;
}
