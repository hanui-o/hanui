'use client';

import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  title: string;
  level: number;
}

export function PageNav() {
  const [headings, setHeadings] = useState<NavItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Wait for content to be fully rendered before extracting headings
    const extractHeadings = () => {
      const elements = document.querySelectorAll('h2[id]');
      const items: NavItem[] = Array.from(elements).map((element) => ({
        id: element.id,
        title: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      }));

      // Only update if we found headings
      if (items.length > 0) {
        setHeadings(items);
      }
    };

    // Extract immediately
    extractHeadings();

    // Also try after a short delay to handle client-side rendering
    const timer = setTimeout(extractHeadings, 100);

    // Set up intersection observer for active section highlighting
    const setupObserver = () => {
      const elements = document.querySelectorAll('h2[id]');
      if (elements.length === 0) return null;

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
      return observer;
    };

    const observer = setupObserver();
    const observerTimer = setTimeout(() => {
      if (!observer) {
        setupObserver();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(observerTimer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block w-48 flex-shrink-0">
      <div className="sticky top-24">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          이 페이지 구성
        </h4>
        <ul className="space-y-1.5 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block py-1 transition-colors border-l-2 pl-3 ${
                    isActive
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-gray-600'
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
