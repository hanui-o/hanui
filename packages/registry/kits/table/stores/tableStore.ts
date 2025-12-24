// Table Kit - Store
// Zustand 기반 테이블 상태 관리

import { create } from 'zustand';
import type { SortState, FilterState, PaginationState } from '../types/table';

interface TableStore<T = unknown> {
  // 상태
  data: T[];
  isLoading: boolean;
  error: string | null;
  sort: SortState | null;
  filters: FilterState;
  pagination: PaginationState;
  selectedRows: T[];
  search: string;

  // 액션
  setData: (data: T[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSort: (sort: SortState | null) => void;
  toggleSort: (key: string) => void;
  setFilter: (key: string, value: string | string[] | undefined) => void;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  selectRow: (row: T) => void;
  deselectRow: (row: T) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleRow: (row: T) => void;
  reset: () => void;
}

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  sort: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  selectedRows: [],
  search: '',
};

export function createTableStore<T>() {
  return create<TableStore<T>>((set, get) => ({
    ...initialState,

    setData: (data) => set({ data }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    setSort: (sort) => set({ sort }),

    toggleSort: (key) => {
      const currentSort = get().sort;
      if (currentSort?.key === key) {
        if (currentSort.order === 'asc') {
          set({ sort: { key, order: 'desc' } });
        } else {
          set({ sort: null });
        }
      } else {
        set({ sort: { key, order: 'asc' } });
      }
    },

    setFilter: (key, value) =>
      set((state) => ({
        filters: { ...state.filters, [key]: value },
        pagination: { ...state.pagination, page: 1 },
      })),

    setFilters: (filters) =>
      set((state) => ({
        filters,
        pagination: { ...state.pagination, page: 1 },
      })),

    clearFilters: () =>
      set((state) => ({
        filters: {},
        pagination: { ...state.pagination, page: 1 },
      })),

    setPagination: (pagination) =>
      set((state) => ({
        pagination: { ...state.pagination, ...pagination },
      })),

    setPage: (page) =>
      set((state) => ({
        pagination: { ...state.pagination, page },
      })),

    setLimit: (limit) =>
      set((state) => ({
        pagination: { ...state.pagination, limit, page: 1 },
      })),

    setSearch: (search) =>
      set((state) => ({
        search,
        pagination: { ...state.pagination, page: 1 },
      })),

    selectRow: (row) =>
      set((state) => ({
        selectedRows: [...state.selectedRows, row],
      })),

    deselectRow: (row) =>
      set((state) => ({
        selectedRows: state.selectedRows.filter((r) => r !== row),
      })),

    selectAll: () =>
      set((state) => ({
        selectedRows: [...state.data],
      })),

    deselectAll: () => set({ selectedRows: [] }),

    toggleRow: (row) => {
      const { selectedRows } = get();
      if (selectedRows.includes(row)) {
        set({ selectedRows: selectedRows.filter((r) => r !== row) });
      } else {
        set({ selectedRows: [...selectedRows, row] });
      }
    },

    reset: () => set(initialState),
  }));
}

// 기본 테이블 스토어
export const useTableStore = createTableStore();
