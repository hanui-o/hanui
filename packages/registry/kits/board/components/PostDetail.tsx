// Board Kit - PostDetail Component
// 게시글 상세 컴포넌트

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  Badge,
  Skeleton,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Textarea,
} from '@hanui/react';
import { Edit, Trash2, ArrowLeft, Send } from 'lucide-react';
import {
  usePost,
  useDeletePost,
  useComments,
  useCreateComment,
  useDeleteComment,
} from '../hooks/usePosts';

interface PostDetailProps {
  postId: string;
  basePath?: string;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function PostDetail({
  postId,
  basePath = '/posts',
  canEdit = true,
  canDelete = true,
}: PostDetailProps) {
  const router = useRouter();
  const { data: post, isLoading, error } = usePost(postId);
  const { data: comments, isLoading: commentsLoading } = useComments(postId);
  const deletePost = useDeletePost();
  const createComment = useCreateComment(postId);
  const deleteComment = useDeleteComment(postId);

  const [commentContent, setCommentContent] = useState('');

  const handleDelete = async () => {
    await deletePost.mutateAsync(postId);
    router.push(basePath);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    await createComment.mutateAsync({ content: commentContent });
    setCommentContent('');
  };

  const handleCommentDelete = async (commentId: string) => {
    await deleteComment.mutateAsync(commentId);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-krds-danger-base">
          게시글을 불러오는 중 오류가 발생했습니다.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push(basePath)}
        >
          목록으로
        </Button>
      </div>
    );
  }

  if (isLoading || !post) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href={basePath}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록
          </Link>
        </Button>

        <div className="flex gap-2">
          {canEdit && (
            <Button variant="outline" asChild>
              <Link href={`${basePath}/${postId}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                수정
              </Link>
            </Button>
          )}

          {canDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="danger">
                  <Trash2 className="w-4 h-4 mr-2" />
                  삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
                  <AlertDialogDescription>
                    정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수
                    없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    삭제
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* 게시글 본문 */}
      <article className="border border-krds-gray-20 rounded-lg p-6">
        <header className="border-b border-krds-gray-10 pb-4 mb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-krds-gray-50">
            <span>{post.author.name}</span>
            <span>{formattedDate}</span>
            <span>조회 {post.views}</span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline-gray">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-krds max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* 댓글 섹션 */}
      <section className="border border-krds-gray-20 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          댓글 {comments?.length ?? 0}
        </h2>

        {/* 댓글 입력 */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <Textarea
            placeholder="댓글을 입력하세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={createComment.isPending || !commentContent.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              댓글 등록
            </Button>
          </div>
        </form>

        {/* 댓글 목록 */}
        {commentsLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : comments?.length === 0 ? (
          <p className="text-center text-krds-gray-50 py-4">
            첫 번째 댓글을 남겨보세요!
          </p>
        ) : (
          <ul className="space-y-4">
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="border-b border-krds-gray-10 pb-4 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-sm text-krds-gray-50 ml-2">
                      {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="mt-2 text-krds-gray-70">{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
