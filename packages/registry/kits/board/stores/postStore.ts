// Board Kit - Store
// Zustand 기반 게시글 상태 관리

import { create } from 'zustand';
import type { Post, PostListParams } from '../types/post';

interface PostStore {
  // 상태
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  error: string | null;

  // 필터/페이지네이션
  params: PostListParams;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // 액션
  setPosts: (posts: Post[]) => void;
  setSelectedPost: (post: Post | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setParams: (params: Partial<PostListParams>) => void;
  setPagination: (pagination: PostStore['pagination']) => void;

  // 게시글 조작
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  removePost: (id: string) => void;

  // 초기화
  reset: () => void;
}

const initialState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
  params: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt' as const,
    sortOrder: 'desc' as const,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,

  setPosts: (posts) => set({ posts }),

  setSelectedPost: (post) => set({ selectedPost: post }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setParams: (params) =>
    set((state) => ({
      params: { ...state.params, ...params },
    })),

  setPagination: (pagination) => set({ pagination }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      pagination: {
        ...state.pagination,
        total: state.pagination.total + 1,
      },
    })),

  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      ),
      selectedPost:
        state.selectedPost?.id === id
          ? { ...state.selectedPost, ...updates }
          : state.selectedPost,
    })),

  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      selectedPost: state.selectedPost?.id === id ? null : state.selectedPost,
      pagination: {
        ...state.pagination,
        total: state.pagination.total - 1,
      },
    })),

  reset: () => set(initialState),
}));
