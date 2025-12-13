/**
 * Board Kit
 * 게시판 기능 키트 - API 주소만 바꾸면 바로 사용 가능
 */

// Components
export { BoardList } from './components/BoardList';
export { BoardItem } from './components/BoardItem';
export { BoardDetail } from './components/BoardDetail';
export { BoardForm } from './components/BoardForm';
export { BoardDeleteModal } from './components/BoardDeleteModal';

// Hooks
export {
  usePosts,
  usePost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  boardKeys,
} from './hooks/useBoard';

// Store
export {
  useBoardStore,
  useBoardFilters,
  useBoardSelection,
  useBoardDeleteModal,
} from './store/boardStore';

// API
export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  incrementViewCount,
  api,
} from './api/board';

// Types
export type {
  Post,
  Attachment,
  PostListResponse,
  Pagination,
  PostFormData,
  PostListParams,
  PostDetailResponse,
  ApiResponse,
  ApiError,
} from './types/board';
