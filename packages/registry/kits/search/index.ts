// Search Kit - Entry Point
// 검색 기능 키트

// Types
export type {
  SearchResult,
  SearchParams,
  SearchResponse,
  AutocompleteItem,
  RecentSearch,
  PopularSearch,
  SearchState,
} from './types/search';

// API
export {
  search,
  getAutocomplete,
  getPopularSearches,
  logSearch,
} from './api/search';

// Store
export { useSearchStore } from './stores/searchStore';

// Hooks
export {
  useDebounce,
  useSearch,
  useAutocomplete,
  usePopularSearches,
  useSearchKeyboard,
  useClickOutside,
} from './hooks/useSearch';

// Components
export { SearchBar } from './components/SearchBar';
export { SearchResults } from './components/SearchResults';
export { PopularSearches } from './components/PopularSearches';
