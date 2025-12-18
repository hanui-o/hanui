// Board Kit - Types
// 게시글 관련 타입 정의

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email?: string;
  };
  category?: string;
  tags?: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: 'createdAt' | 'views' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PostListResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreatePostInput {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentInput {
  content: string;
}
