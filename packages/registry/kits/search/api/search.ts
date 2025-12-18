// Search Kit - API
// 검색 API 호출 함수

import axios from 'axios';
import type {
  SearchParams,
  SearchResponse,
  AutocompleteItem,
  PopularSearch,
} from '../types/search';

// API 기본 URL - 실제 서버 주소로 변경하세요
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 검색 실행
export async function search<T = unknown>(
  params: SearchParams
): Promise<SearchResponse<T>> {
  const response = await apiClient.get<SearchResponse<T>>('/search', {
    params,
  });
  return response.data;
}

// 자동완성 조회
export async function getAutocomplete(
  query: string,
  category?: string
): Promise<AutocompleteItem[]> {
  if (!query.trim()) return [];

  const response = await apiClient.get<AutocompleteItem[]>(
    '/search/autocomplete',
    {
      params: { query, category },
    }
  );
  return response.data;
}

// 인기 검색어 조회
export async function getPopularSearches(limit = 10): Promise<PopularSearch[]> {
  const response = await apiClient.get<PopularSearch[]>('/search/popular', {
    params: { limit },
  });
  return response.data;
}

// 검색어 저장 (분석용)
export async function logSearch(
  query: string,
  category?: string
): Promise<void> {
  await apiClient.post('/search/log', { query, category });
}
