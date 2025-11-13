'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useRef, useState } from 'react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Design System',
    items: [
      { title: 'Design Tokens', href: '/design-tokens' },
      { title: 'Spacing', href: '/design-system/spacing' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { title: 'Display', href: '/typography/display' },
      { title: 'Heading', href: '/typography/heading' },
      { title: 'Body', href: '/typography/body' },
      { title: 'NavText', href: '/typography/navtext' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { title: 'Container', href: '/layout/container' },
      { title: 'Box', href: '/layout/box' },
      { title: 'Stack', href: '/layout/stack' },
      { title: 'Section', href: '/layout/section' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Button', href: '/components/button' },
      { title: 'Input', href: '/components/input' },
      { title: 'Label', href: '/components/label' },
      { title: 'Select', href: '/components/select' },
      { title: 'Card', href: '/components/card' },
      { title: 'Table', href: '/components/table' },
      { title: 'Modal', href: '/components/modal' },
      { title: 'Breadcrumb', href: '/components/breadcrumb' },
      { title: 'Pagination', href: '/components/pagination' },
      { title: 'File Upload', href: '/components/file-upload' },
    ],
  },
];

function SidebarSection({ section }: { section: (typeof navigation)[0] }) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    top: 0,
    height: 0,
    opacity: 0,
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const list = listRef.current;
    if (list) {
      const listRect = list.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setIndicatorStyle({
        top: targetRect.top - listRect.top,
        height: targetRect.height,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div>
      <h3 className="px-2 text-xs text-gray-500 dark:text-gray-100 mb-3">
        {section.title}
      </h3>
      <ul
        ref={listRef}
        className="space-y-1 relative"
        onMouseLeave={handleMouseLeave}
      >
        {/* Sliding background indicator */}
        <span
          className="absolute left-0 w-full bg-gray-100 dark:bg-gray-900 rounded-md transition-all duration-300 ease-out pointer-events-none"
          style={{
            top: `${indicatorStyle.top}px`,
            height: `${indicatorStyle.height}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
        {section.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative block text-sm py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
                onMouseEnter={handleMouseEnter}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-48 flex-shrink-0 relative">
      <nav className="sticky top-24 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 pb-20 scrollbar-hide">
        <div className="space-y-8">
          {navigation.map((section) => (
            <SidebarSection key={section.title} section={section} />
          ))}
        </div>
      </nav>

      {/* Bottom gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" /> */}
    </aside>
  );
}
