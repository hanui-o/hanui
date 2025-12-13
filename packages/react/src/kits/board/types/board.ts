/**
 * Board Kit - Type Definitions
 * 게시판 기능에 필요한 타입 정의
 */

// 게시글 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  attachments?: Attachment[];
}

// 첨부파일 타입
export interface Attachment {
  id: number;
  name: string;
  url: string;
  size: number;
  type: string;
}

// 게시글 목록 응답
export interface PostListResponse {
  data: Post[];
  pagination: Pagination;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 게시글 작성/수정 폼 데이터
export interface PostFormData {
  title: string;
  content: string;
  attachments?: File[];
}

// 게시글 목록 조회 파라미터
export interface PostListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'latest' | 'oldest' | 'views';
}

// 게시글 상세 응답
export interface PostDetailResponse {
  data: Post;
}

// API 응답 기본 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 에러 응답 타입
export interface ApiError {
  success: false;
  message: string;
  code?: string;
}
