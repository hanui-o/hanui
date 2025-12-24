// Board Kit - PostCard Component
// 게시글 카드 컴포넌트

'use client';

import Link from 'next/link';
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
} from '@hanui/react';
import type { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  href?: string;
}

export function PostCard({ post, href }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const CardContent = (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          {post.category && (
            <Badge variant="secondary" className="flex-shrink-0">
              {post.category}
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 mt-1">
          {post.content.replace(/<[^>]*>/g, '').slice(0, 100)}
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="flex items-center justify-between text-sm text-krds-gray-50">
          <span>{post.author.name}</span>
          <div className="flex items-center gap-3">
            <span>조회 {post.views}</span>
            <span>{formattedDate}</span>
          </div>
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
      </CardBody>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
