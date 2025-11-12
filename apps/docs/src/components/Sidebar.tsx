'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    title: 'Components',
    items: [
      { title: 'Button', href: '/components/button' },
      { title: 'Input', href: '/components/input' },
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 border-r border-gray-20 dark:border-gray-80">
      <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
        <div className="space-y-8">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-90 dark:text-gray-10 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block text-sm px-3 py-1.5 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary-60 text-white font-medium'
                            : 'text-gray-60 dark:text-gray-40 hover:text-gray-90 dark:hover:text-gray-10 hover:bg-gray-10 dark:hover:bg-gray-90'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
