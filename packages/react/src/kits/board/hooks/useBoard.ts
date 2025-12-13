/**
 * Board Kit - React Query Hooks
 * 서버 데이터 관리 (캐싱, 리페치, 뮤테이션)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incrementViewCount,
} from '../api/board';
import type { PostListParams, PostFormData } from '../types/board';

// Query Keys
export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (params: PostListParams) => [...boardKeys.lists(), params] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: number) => [...boardKeys.details(), id] as const,
};

/**
 * 게시글 목록 조회 훅
 */
export function usePosts(params?: PostListParams) {
  return useQuery({
    queryKey: boardKeys.list(params || {}),
    queryFn: () => getPosts(params),
  });
}

/**
 * 게시글 상세 조회 훅
 */
export function usePost(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: boardKeys.detail(id),
    queryFn: async () => {
      // 조회수 증가
      await incrementViewCount(id);
      return getPost(id);
    },
    enabled: !!id,
  });
}

/**
 * 게시글 작성 훅
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}

/**
 * 게시글 수정 훅
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostFormData }) =>
      updatePost(id, data),
    onSuccess: (_, { id }) => {
      // 목록 및 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(id) });
    },
  });
}

/**
 * 게시글 삭제 훅
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}
