// Board Kit - API
// 게시글 API 호출 함수

import axios from 'axios';
import type {
  Post,
  PostListParams,
  PostListResponse,
  CreatePostInput,
  UpdatePostInput,
  Comment,
  CreateCommentInput,
} from '../types/post';

// API 기본 URL - 실제 서버 주소로 변경하세요
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터: 인증 토큰 추가
apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 게시글 목록 조회
export async function getPosts(
  params?: PostListParams
): Promise<PostListResponse> {
  const response = await apiClient.get<PostListResponse>('/posts', { params });
  return response.data;
}

// 게시글 상세 조회
export async function getPost(id: string): Promise<Post> {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
}

// 게시글 생성
export async function createPost(data: CreatePostInput): Promise<Post> {
  const response = await apiClient.post<Post>('/posts', data);
  return response.data;
}

// 게시글 수정
export async function updatePost(
  id: string,
  data: UpdatePostInput
): Promise<Post> {
  const response = await apiClient.patch<Post>(`/posts/${id}`, data);
  return response.data;
}

// 게시글 삭제
export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}

// 댓글 목록 조회
export async function getComments(postId: string): Promise<Comment[]> {
  const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
}

// 댓글 생성
export async function createComment(
  postId: string,
  data: CreateCommentInput
): Promise<Comment> {
  const response = await apiClient.post<Comment>(
    `/posts/${postId}/comments`,
    data
  );
  return response.data;
}

// 댓글 삭제
export async function deleteComment(
  postId: string,
  commentId: string
): Promise<void> {
  await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
}
