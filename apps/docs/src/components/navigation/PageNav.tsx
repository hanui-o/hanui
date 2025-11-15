'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  title: string;
  level: number;
}

export function PageNav() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings immediately
    const elements = document.querySelectorAll('h2[id]');
    const items: NavItem[] = Array.from(elements).map((element) => ({
      id: element.id,
      title: element.textContent || '',
      level: parseInt(element.tagName.substring(1)),
    }));

    // Update headings state in a separate microtask to avoid cascading renders
    if (items.length > 0) {
      Promise.resolve().then(() => setHeadings(items));
    }

    // Set up intersection observer for active section highlighting
    if (elements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-80px 0px -80% 0px',
        }
      );

      elements.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
      };
    }
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block w-48 flex-shrink-0">
      <div className="sticky top-24">
        <h4 className="text-sm font-semibold text-krds-gray-95 mb-4">
          이 페이지의 구성
        </h4>
        <ul className="space-y-1.5 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block py-1 transition-colors ${
                    isActive
                      ? 'border-krds-primary-base text-krds-primary-base font-medium'
                      : 'border-krds-gray-20 text-krds-gray-70 hover:text-krds-gray-95 hover:border-krds-gray-40'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {heading.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
