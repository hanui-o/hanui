// Table Kit - Hooks
// React Query 기반 테이블 데이터 fetching hooks

import { useQuery } from '@tanstack/react-query';
import type {
  TableParams,
  TableResponse,
  TableColumn,
  ExportOptions,
} from '../types/table';

interface UseTableDataOptions<T> {
  queryKey: string;
  queryFn: (params: TableParams) => Promise<TableResponse<T>>;
  params?: TableParams;
  enabled?: boolean;
}

// 테이블 데이터 조회 hook
export function useTableData<T>({
  queryKey,
  queryFn,
  params = {},
  enabled = true,
}: UseTableDataOptions<T>) {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: () => queryFn(params),
    enabled,
    staleTime: 30 * 1000,
  });
}

// CSV 내보내기 유틸리티
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  columns: TableColumn<T>[],
  options: ExportOptions = {}
) {
  const { filename = 'data', includeHeaders = true } = options;

  const selectedColumns = options.columns
    ? columns.filter((col) => options.columns?.includes(col.key as string))
    : columns;

  const headers = selectedColumns.map((col) => col.header);
  const rows = data.map((row) =>
    selectedColumns.map((col) => {
      const value = row[col.key as keyof T];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
      return String(value);
    })
  );

  const csvContent = includeHeaders
    ? [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
    : rows.map((row) => row.join(',')).join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// 클라이언트 사이드 정렬
export function sortData<T>(
  data: T[],
  sortKey: keyof T | string,
  sortOrder: 'asc' | 'desc'
): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortKey as keyof T];
    const bValue = b[sortKey as keyof T];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const comparison =
      typeof aValue === 'string' && typeof bValue === 'string'
        ? aValue.localeCompare(bValue, 'ko')
        : aValue < bValue
          ? -1
          : 1;

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

// 클라이언트 사이드 필터링
export function filterData<T extends Record<string, unknown>>(
  data: T[],
  filters: Record<string, string | string[] | undefined>,
  searchKeys?: (keyof T)[],
  searchValue?: string
): T[] {
  let filtered = data;

  // 필터 적용
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return;

    filtered = filtered.filter((item) => {
      const itemValue = item[key];
      if (Array.isArray(value)) {
        return value.includes(String(itemValue));
      }
      return String(itemValue).toLowerCase().includes(value.toLowerCase());
    });
  });

  // 검색 적용
  if (searchValue && searchKeys && searchKeys.length > 0) {
    const lowerSearch = searchValue.toLowerCase();
    filtered = filtered.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return value && String(value).toLowerCase().includes(lowerSearch);
      })
    );
  }

  return filtered;
}

// 클라이언트 사이드 페이지네이션
export function paginateData<T>(
  data: T[],
  page: number,
  limit: number
): { data: T[]; total: number; totalPages: number } {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginatedData = data.slice(start, start + limit);

  return { data: paginatedData, total, totalPages };
}
