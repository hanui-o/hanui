// Board Kit - Entry Point
// 게시판 기능 키트

// Types
export type {
  Post,
  PostListParams,
  PostListResponse,
  CreatePostInput,
  UpdatePostInput,
  Comment,
  CreateCommentInput,
} from './types/post';

// API
export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  deleteComment,
} from './api/posts';

// Store
export { usePostStore } from './stores/postStore';

// Hooks
export {
  usePosts,
  usePost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  useComments,
  useCreateComment,
  useDeleteComment,
} from './hooks/usePosts';

// Components
export { PostCard } from './components/PostCard';
export { PostList } from './components/PostList';
export { PostDetail } from './components/PostDetail';
export { PostForm } from './components/PostForm';
