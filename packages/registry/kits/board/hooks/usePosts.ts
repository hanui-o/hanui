// Board Kit - Hooks
// React Query 기반 게시글 데이터 fetching hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  deleteComment,
} from '../api/posts';
import { usePostStore } from '../stores/postStore';
import type {
  PostListParams,
  CreatePostInput,
  UpdatePostInput,
  CreateCommentInput,
} from '../types/post';

// 게시글 목록 조회 hook
export function usePosts(params?: PostListParams) {
  const { setPosts, setPagination, setLoading, setError } = usePostStore();

  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
    staleTime: 60 * 1000,
    select: (data) => {
      setPosts(data.data);
      setPagination(data.pagination);
      return data;
    },
  });
}

// 게시글 상세 조회 hook
export function usePost(id: string) {
  const { setSelectedPost } = usePostStore();

  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
    select: (data) => {
      setSelectedPost(data);
      return data;
    },
  });
}

// 게시글 생성 mutation
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { addPost } = usePostStore();

  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: (newPost) => {
      addPost(newPost);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 게시글 수정 mutation
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { updatePost: updatePostInStore } = usePostStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostInput }) =>
      updatePost(id, data),
    onSuccess: (updatedPost) => {
      updatePostInStore(updatedPost.id, updatedPost);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.id] });
    },
  });
}

// 게시글 삭제 mutation
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { removePost } = usePostStore();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, id) => {
      removePost(id);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 댓글 목록 조회 hook
export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
}

// 댓글 생성 mutation
export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentInput) => createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}

// 댓글 삭제 mutation
export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}
