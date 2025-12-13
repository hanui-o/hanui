/**
 * Board Kit - API Functions
 * API 주소만 변경하면 바로 사용 가능
 */

import axios from 'axios';
import type {
  Post,
  PostListResponse,
  PostDetailResponse,
  PostFormData,
  PostListParams,
  ApiResponse,
} from '../types/board';

// ============================================
// API 주소 설정 (이 부분만 수정하세요)
// ============================================
const API_URL = 'https://your-api.com/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 추가 등)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 시 로그아웃 처리 등
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// API 함수들
// ============================================

/**
 * 게시글 목록 조회
 */
export async function getPosts(
  params?: PostListParams
): Promise<PostListResponse> {
  const { data } = await api.get<PostListResponse>('/posts', { params });
  return data;
}

/**
 * 게시글 상세 조회
 */
export async function getPost(id: number): Promise<Post> {
  const { data } = await api.get<PostDetailResponse>(`/posts/${id}`);
  return data.data;
}

/**
 * 게시글 작성
 */
export async function createPost(formData: PostFormData): Promise<Post> {
  const form = new FormData();
  form.append('title', formData.title);
  form.append('content', formData.content);

  if (formData.attachments) {
    formData.attachments.forEach((file) => {
      form.append('attachments', file);
    });
  }

  const { data } = await api.post<ApiResponse<Post>>('/posts', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

/**
 * 게시글 수정
 */
export async function updatePost(
  id: number,
  formData: PostFormData
): Promise<Post> {
  const form = new FormData();
  form.append('title', formData.title);
  form.append('content', formData.content);

  if (formData.attachments) {
    formData.attachments.forEach((file) => {
      form.append('attachments', file);
    });
  }

  const { data } = await api.put<ApiResponse<Post>>(`/posts/${id}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

/**
 * 게시글 삭제
 */
export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}

/**
 * 조회수 증가
 */
export async function incrementViewCount(id: number): Promise<void> {
  await api.post(`/posts/${id}/view`);
}

export { api };
