'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Navigation by section
const getStartedNavigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
];

const componentsNavigation = [
  {
    title: 'Components',
    items: [
      { title: 'Overview', href: '/components' },
      { title: 'Accordion', href: '/components/accordion' },
      { title: 'Body', href: '/components/body' },
      { title: 'Border Radius', href: '/components/border-radius' },
      { title: 'Breadcrumb', href: '/components/breadcrumb' },
      { title: 'Breakpoints', href: '/components/breakpoints' },
      { title: 'Button', href: '/components/button' },
      { title: 'Card', href: '/components/card' },
      { title: 'Code', href: '/components/code' },
      { title: 'Colors', href: '/components/colors' },
      { title: 'Container', href: '/components/container' },
      { title: 'Display', href: '/components/display' },
      { title: 'File Upload', href: '/components/file-upload' },
      { title: 'Header', href: '/components/header' },
      { title: 'Heading', href: '/components/heading' },
      { title: 'Identifier', href: '/components/identifier' },
      { title: 'In-page Navigation', href: '/components/inpagenavigation' },
      { title: 'Input', href: '/components/input' },
      { title: 'Label', href: '/components/label' },
      { title: 'Link', href: '/components/link' },
      { title: 'List', href: '/components/list' },
      { title: 'Main Menu', href: '/components/mainmenu' },
      { title: 'Masthead', href: '/components/masthead' },
      { title: 'Modal', href: '/components/modal' },
      { title: 'NavText', href: '/components/navtext' },
      { title: 'Pagination', href: '/components/pagination' },
      { title: 'Section', href: '/components/section' },
      {
        title: 'Section Heading System',
        href: '/components/section-heading-system',
      },
      { title: 'Select', href: '/components/select' },
      { title: 'Side Navigation', href: '/components/sidenavigation' },
      { title: 'SimpleGrid', href: '/components/simple-grid' },
      { title: 'SkipLink', href: '/components/skiplink' },
      { title: 'Spacing', href: '/components/spacing' },
      { title: 'Stack', href: '/components/stack' },
      { title: 'Structured List', href: '/components/structured-list' },
      { title: 'Tab Bars', href: '/components/tabbars' },
      { title: 'Table', href: '/components/table' },
      { title: 'Tabs', href: '/components/tabs' },
      { title: 'Tooltip', href: '/components/tooltip' },
      { title: 'Typography', href: '/components/typography' },
      { title: 'Wrap', href: '/components/wrap' },
    ],
  },
];

const templatesNavigation = [
  {
    title: 'Templates',
    items: [
      { title: 'Overview', href: '/templates' },
      { title: 'Basic Layout', href: '/templates/basic-layout' },
    ],
  },
];

type NavigationSection = {
  title: string;
  items: { title: string; href: string }[];
};

function SidebarSection({ section }: { section: NavigationSection }) {
  const pathname = usePathname();

  return (
    <div>
      <h3 className="px-2 text-xs text-krds-gray-50 mb-3">{section.title}</h3>
      <ul className="space-y-1">
        {section.items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-1 px-2 rounded-md transition-colors text-sm ${
                  isActive
                    ? 'bg-krds-primary-base text-white font-medium'
                    : 'text-krds-gray-70 hover:bg-krds-gray-5 hover:text-krds-gray-95'
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
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Determine which navigation to show based on current path
  const getNavigation = () => {
    if (pathname?.startsWith('/docs')) {
      return getStartedNavigation;
    } else if (pathname?.startsWith('/components')) {
      return componentsNavigation;
    } else if (pathname?.startsWith('/templates')) {
      return templatesNavigation;
    }
    // Default to components navigation for home page
    return componentsNavigation;
  };

  const navigation = getNavigation();

  // Save scroll position before navigation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleClick = () => {
      sessionStorage.setItem('sidebar-scroll', nav.scrollTop.toString());
    };

    nav.addEventListener('click', handleClick);
    return () => nav.removeEventListener('click', handleClick);
  }, []);

  // Restore scroll position after navigation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const savedScroll = sessionStorage.getItem('sidebar-scroll');
    if (savedScroll) {
      nav.scrollTop = parseInt(savedScroll, 10);
    }
  }, [pathname]);

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 relative border-r border-krds-gray-5">
      <nav
        ref={navRef}
        className="sticky top-12 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 pb-20 scrollbar-hide"
      >
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
