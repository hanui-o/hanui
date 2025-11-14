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
      { title: 'Label', href: '/typography/label' },
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
    title: 'Identity',
    items: [
      { title: 'Masthead', href: '/components/masthead' },
      { title: 'Identifier', href: '/components/identifier' },
      { title: 'Header', href: '/components/header' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { title: 'SkipLink', href: '/components/skiplink' },
      { title: 'Breadcrumb', href: '/components/breadcrumb' },
      { title: 'Pagination', href: '/components/pagination' },
    ],
  },
  {
    title: 'Presentation',
    items: [
      { title: 'Modal', href: '/components/modal' },
      { title: 'Accordion', href: '/components/accordion' },
      { title: 'Tabs', href: '/components/tabs' },
      { title: 'Table', href: '/components/table' },
      { title: 'Card', href: '/components/card' },
    ],
  },
  {
    title: 'Action',
    items: [{ title: 'Button', href: '/components/button' }],
  },
  {
    title: 'Selection',
    items: [{ title: 'Select', href: '/components/select' }],
  },
  {
    title: 'Help',
    items: [{ title: 'Tooltip', href: '/components/tooltip' }],
  },
  {
    title: 'Input',
    items: [
      { title: 'Text Input', href: '/components/input' },
      { title: 'Label', href: '/components/label' },
      { title: 'File Upload', href: '/components/file-upload' },
    ],
  },
];

function SidebarSection({ section }: { section: (typeof navigation)[0] }) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="px-2 text-xs text-gray-500 dark:text-gray-100 mb-3">
        {section.title}
      </h3>
      <ul className="space-y-1">
        {section.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block text-sm py-1 px-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
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
    <aside className="hidden md:block w-64 flex-shrink-0 relative border-r border-gray-200 dark:border-gray-800">
      <nav className="sticky top-12 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 pb-20 scrollbar-hide">
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
