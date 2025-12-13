/**
 * Board Kit - BoardItem Component
 * 게시글 목록 아이템
 */

'use client';

import type { Post } from '../types/board';

interface BoardItemProps {
  post: Post;
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

export function BoardItem({
  post,
  isSelected,
  onSelect,
  onClick,
}: BoardItemProps) {
  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 border-b hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      {/* 체크박스 */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-4 h-4"
      />

      {/* 제목 */}
      <div className="flex-1 min-w-0" onClick={onClick}>
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{post.title}</span>
          {post.attachments && post.attachments.length > 0 && (
            <span className="text-gray-400 text-sm">
              📎 {post.attachments.length}
            </span>
          )}
        </div>
      </div>

      {/* 작성자 */}
      <span className="w-24 text-center text-sm text-gray-600">
        {post.author}
      </span>

      {/* 작성일 */}
      <span className="w-24 text-center text-sm text-gray-500">
        {formatDate(post.createdAt)}
      </span>

      {/* 조회수 */}
      <span className="w-16 text-center text-sm text-gray-500">
        {post.viewCount}
      </span>
    </div>
  );
}
