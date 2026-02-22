import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - HANUI',
  description:
    'HANUI 개발 과정, KRDS 활용 팁, React 컴포넌트 설계 등 공공 웹 개발에 관한 이야기를 공유합니다.',
  openGraph: {
    title: 'Blog - HANUI',
    description:
      'HANUI 개발 과정, KRDS 활용 팁, React 컴포넌트 설계 등 공공 웹 개발에 관한 이야기',
    url: 'https://hanui.io/blog',
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml',
    },
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="pt-8 pb-8 border-b border-krds-gray-10">
        <h1 className="text-3xl font-bold text-krds-gray-95 mb-2">Blog</h1>
        <p className="text-krds-gray-50">
          HANUI 개발 과정, KRDS 활용 팁, React 컴포넌트 설계 등 공공 웹 개발에
          관한 이야기를 공유합니다.
        </p>
      </div>

      {/* Post List */}
      {posts.length === 0 ? (
        <p className="text-krds-gray-50 py-16 text-center">
          아직 작성된 글이 없습니다.
        </p>
      ) : (
        <div className="divide-y divide-krds-gray-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8"
            >
              {/* Title */}
              <h2 className="text-xl font-bold text-krds-gray-95 mb-2 group-hover:text-krds-primary-base transition-colors leading-snug">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-krds-gray-60 leading-relaxed line-clamp-3 mb-4">
                {post.description}
              </p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-krds-primary-base/8 text-krds-primary-base"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center gap-2 text-sm text-krds-gray-40">
                <time>{formatDate(post.date)}</time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
