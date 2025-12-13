/**
 * Board Kit - Zustand Store
 * 클라이언트 UI 상태 관리 (검색, 필터, 선택 등)
 */

import { create } from 'zustand';
import type { PostListParams } from '../types/board';

interface BoardState {
  // 검색/필터 상태
  searchKeyword: string;
  sortBy: PostListParams['sortBy'];
  page: number;
  limit: number;

  // 선택된 항목
  selectedIds: number[];

  // 모달 상태
  isDeleteModalOpen: boolean;
  deleteTargetId: number | null;

  // Actions
  setSearchKeyword: (keyword: string) => void;
  setSortBy: (sortBy: PostListParams['sortBy']) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;

  // 선택 관련
  toggleSelect: (id: number) => void;
  selectAll: (ids: number[]) => void;
  clearSelection: () => void;

  // 삭제 모달 관련
  openDeleteModal: (id: number) => void;
  closeDeleteModal: () => void;
}

const initialState = {
  searchKeyword: '',
  sortBy: 'latest' as const,
  page: 1,
  limit: 10,
  selectedIds: [],
  isDeleteModalOpen: false,
  deleteTargetId: null,
};

export const useBoardStore = create<BoardState>((set) => ({
  ...initialState,

  // 검색/필터 Actions
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  resetFilters: () =>
    set({
      searchKeyword: '',
      sortBy: 'latest',
      page: 1,
    }),

  // 선택 관련 Actions
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((i) => i !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),

  // 삭제 모달 Actions
  openDeleteModal: (id) => set({ isDeleteModalOpen: true, deleteTargetId: id }),
  closeDeleteModal: () =>
    set({ isDeleteModalOpen: false, deleteTargetId: null }),
}));

// 셀렉터 (성능 최적화)
export const useBoardFilters = () =>
  useBoardStore((state) => ({
    searchKeyword: state.searchKeyword,
    sortBy: state.sortBy,
    page: state.page,
    limit: state.limit,
  }));

export const useBoardSelection = () =>
  useBoardStore((state) => ({
    selectedIds: state.selectedIds,
    toggleSelect: state.toggleSelect,
    selectAll: state.selectAll,
    clearSelection: state.clearSelection,
  }));

export const useBoardDeleteModal = () =>
  useBoardStore((state) => ({
    isDeleteModalOpen: state.isDeleteModalOpen,
    deleteTargetId: state.deleteTargetId,
    openDeleteModal: state.openDeleteModal,
    closeDeleteModal: state.closeDeleteModal,
  }));
