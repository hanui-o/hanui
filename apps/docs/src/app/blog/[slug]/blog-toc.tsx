'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function BlogToc() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 헤딩 추출
  useEffect(() => {
    const content = document.querySelector('[data-blog-content]');
    if (!content) return;

    const elements = content.querySelectorAll('h2, h3');
    const items: TocItem[] = Array.from(elements).map((el) => {
      // id가 없으면 텍스트로 생성
      if (!el.id) {
        el.id =
          el.textContent
            ?.trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w가-힣-]/g, '') ?? '';
      }
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: Number(el.tagName[1]),
      };
    });
    setHeadings(items);
  }, []);

  // 스크롤 스파이
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block absolute left-full top-10 ml-6 w-48 h-full">
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-krds-gray-50 mb-3">목차</h3>
        <nav className="flex flex-col gap-0.5">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className={`block py-1 text-sm leading-snug transition-colors ${
                h.level === 3 ? 'pl-3' : ''
              } ${
                activeId === h.id
                  ? 'text-krds-primary-base font-semibold'
                  : 'text-krds-gray-40 hover:text-krds-gray-70'
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
