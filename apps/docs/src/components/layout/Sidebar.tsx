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
  {
    title: 'Design System',
    items: [
      { title: 'Colors', href: '/docs/colors' },
      { title: 'Typography', href: '/docs/typography' },
      { title: 'Spacing', href: '/docs/spacing' },
      { title: 'Layout', href: '/docs/layout' },
    ],
  },
];

const designSystemNavigation = [
  {
    title: 'Design System',
    items: [
      { title: 'Colors', href: '/docs/colors' },
      { title: 'Typography', href: '/docs/typography' },
      { title: 'Spacing', href: '/docs/spacing' },
      { title: 'Border Radius', href: '/docs/border-radius' },
      { title: 'Layout', href: '/docs/layout' },
    ],
  },
];

const componentsNavigation = [
  {
    title: 'Components',
    items: [
      { title: 'Overview', href: '/components' },
      { title: 'Accordion', href: '/components/accordion' },
      { title: 'Alert', href: '/components/alert' },
      { title: 'AlertDialog', href: '/components/alert-dialog' },
      { title: 'AspectRatio', href: '/components/aspect-ratio' },
      { title: 'Badge', href: '/components/badge' },
      { title: 'Body', href: '/components/body' },
      { title: 'Breadcrumb', href: '/components/breadcrumb' },
      { title: 'Button', href: '/components/button' },
      { title: 'Card', href: '/components/card' },
      { title: 'Center', href: '/components/center' },
      { title: 'Checkbox', href: '/components/checkbox' },
      { title: 'Code', href: '/components/code' },
      { title: 'Container', href: '/components/container' },
      { title: 'DataTable', href: '/components/data-table' },
      { title: 'Display', href: '/components/display' },
      { title: 'DropdownMenu', href: '/components/dropdown-menu' },
      { title: 'File Upload', href: '/components/file-upload' },
      { title: 'Flex', href: '/components/flex' },
      { title: 'Footer', href: '/components/footer' },
      { title: 'Form Field', href: '/components/form-field' },
      { title: 'Grid', href: '/components/grid' },
      { title: 'Header', href: '/components/header' },
      { title: 'Heading', href: '/components/heading' },
      { title: 'Identifier', href: '/components/identifier' },
      { title: 'Image', href: '/components/image' },
      { title: 'In-page Navigation', href: '/components/in-page-navigation' },
      { title: 'Input', href: '/components/input' },
      { title: 'Label', href: '/components/label' },
      // { title: 'Link', href: '/components/link' },
      { title: 'List', href: '/components/list' },
      { title: 'Main Menu', href: '/components/mainmenu' },
      { title: 'Masthead', href: '/components/masthead' },
      { title: 'Modal', href: '/components/modal' },
      { title: 'Pagination', href: '/components/pagination' },
      { title: 'Progress', href: '/components/progress' },
      { title: 'Radio', href: '/components/radio' },
      {
        title: 'Section Heading System',
        href: '/components/section-heading-system',
      },
      { title: 'Select', href: '/components/select' },
      { title: 'Side Navigation', href: '/components/side-navigation' },
      { title: 'SimpleGrid', href: '/components/simple-grid' },
      { title: 'Skeleton', href: '/components/skeleton' },
      { title: 'SkipLink', href: '/components/skiplink' },
      { title: 'Slider', href: '/components/slider' },
      { title: 'Spinner', href: '/components/spinner' },
      { title: 'Stack', href: '/components/stack' },
      { title: 'Switch', href: '/components/switch' },
      { title: 'Tab Bars', href: '/components/tabbars' },
      { title: 'Table', href: '/components/table' },
      { title: 'Tabs', href: '/components/tabs' },
      { title: 'Textarea', href: '/components/textarea' },
      { title: 'Toast', href: '/components/toast' },
      { title: 'Tooltip', href: '/components/tooltip' },
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

function SidebarSection({
  section,
  onActiveRef,
}: {
  section: NavigationSection;
  onActiveRef?: (el: HTMLAnchorElement | null) => void;
}) {
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
                ref={isActive ? onActiveRef : undefined}
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
  const activeRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();

  // Determine which navigation to show based on current path
  const getNavigation = () => {
    if (pathname?.startsWith('/docs')) {
      return getStartedNavigation;
    } else if (pathname?.startsWith('/design-system')) {
      return designSystemNavigation;
    } else if (pathname?.startsWith('/components')) {
      return componentsNavigation;
    } else if (pathname?.startsWith('/templates')) {
      return templatesNavigation;
    }
    // Default to components navigation for home page
    return componentsNavigation;
  };

  const navigation = getNavigation();

  // 활성 링크 ref 콜백
  const handleActiveRef = (el: HTMLAnchorElement | null) => {
    activeRef.current = el;
  };

  // 스크롤 위치 저장 (링크 클릭 시)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleClick = () => {
      sessionStorage.setItem('sidebar-scroll', nav.scrollTop.toString());
    };

    nav.addEventListener('click', handleClick);
    return () => nav.removeEventListener('click', handleClick);
  }, []);

  // 스크롤 위치 복원 또는 활성 메뉴로 스크롤
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const savedScroll = sessionStorage.getItem('sidebar-scroll');
    if (savedScroll) {
      // 저장된 스크롤 위치가 있으면 복원
      const timeoutId = setTimeout(() => {
        nav.scrollTop = parseInt(savedScroll, 10);
      }, 0);
      return () => clearTimeout(timeoutId);
    } else if (activeRef.current) {
      // 저장된 위치가 없으면 활성 메뉴로 스크롤
      const timeoutId = setTimeout(() => {
        activeRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'instant',
        });
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 relative border-r border-krds-gray-5">
      <nav
        ref={navRef}
        className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 pb-20 scrollbar-hide"
      >
        <div className="space-y-8">
          {navigation.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              onActiveRef={handleActiveRef}
            />
          ))}
        </div>
      </nav>

      {/* Bottom gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none z-10" /> */}
    </aside>
  );
}
