'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Container } from '@hanui/react';
import { ExternalLinkIcon } from 'lucide-react';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// GitHub Sponsors 설정 후 활성화 예정
// const HeartIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//   >
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsFixed(scrollY > 56);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're in docs section (any docs-related page)
  const isInDocs =
    pathname?.startsWith('/docs') ||
    pathname?.startsWith('/design-system') ||
    pathname?.startsWith('/design-tokens') ||
    pathname?.startsWith('/components') ||
    pathname?.startsWith('/typography') ||
    pathname?.startsWith('/layout') ||
    pathname?.startsWith('/templates');

  // Get current subsection within docs
  const getCurrentSubSection = () => {
    if (pathname?.startsWith('/docs')) return 'get-started';
    if (
      pathname?.startsWith('/design-system') ||
      pathname?.startsWith('/design-tokens')
    )
      return 'design-system';
    if (
      pathname?.startsWith('/components') ||
      pathname?.startsWith('/typography') ||
      pathname?.startsWith('/layout')
    )
      return 'components';
    if (pathname?.startsWith('/templates')) return 'templates';
    return null;
  };

  const currentSubSection = getCurrentSubSection();

  // Sub-navigation items for Docs section
  const docsSubNavItems = [
    { label: 'Get Started', href: '/docs/introduction', key: 'get-started' },
    {
      label: 'Design System',
      href: '/design-system/colors',
      key: 'design-system',
    },
    { label: 'Components', href: '/components', key: 'components' },
    { label: 'Templates', href: '/templates', key: 'templates' },
  ];

  return (
    <header
      id="header"
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        top: isFixed ? '-56px' : '0',
      }}
      className={`z-50 w-full bg-krds-white/95 backdrop-blur supports-[backdrop-filter]:bg-krds-white/60 ${isMainPage ? '' : 'border-b border-krds-gray-10'}`}
    >
      {/* Main Header */}
      <Container maxWidth="full" className="h-14 flex items-center gap-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 flex-shrink-0 text-krds-gray-95"
        >
          <Logo />
          <span className="text-lg font-bold font-krona">HANUI</span>
        </Link>

        {/* Center: Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-8">
          <Link
            href="/docs/introduction"
            className={`transition-colors px-4 py-2 whitespace-nowrap ${
              isInDocs
                ? 'text-krds-gray-95 font-semibold bg-krds-gray-5 rounded-md'
                : 'text-krds-gray-70 hover:text-krds-gray-95'
            }`}
          >
            Docs
          </Link>
          <Link
            href="/showcase"
            className="text-krds-gray-70 hover:text-krds-gray-95 transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="/community"
            className="text-krds-gray-70 hover:text-krds-gray-95 transition-colors"
          >
            Community
          </Link>
          <Link
            href="https://velog.io/@hanui/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-krds-gray-70 hover:text-krds-gray-95 transition-colors"
          >
            Blog <ExternalLinkIcon className="w-4 h-4 text-krds-gray-70" />
          </Link>
        </nav>

        {/* Right: Version + Sponsor + Search + GitHub + Theme */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Sponsor - GitHub Sponsors 설정 후 활성화 예정 */}
          {/* <Link
            href="https://github.com/sponsors/hanui-o"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 h-9 px-3 font-medium text-red-600 hover:text-red-700 rounded-md hover:bg-red-50 transition-colors"
          >
            <HeartIcon />
            <span>Sponsor</span>
          </Link> */}

          {/* Version */}
          <button className="hidden lg:flex items-center gap-1.5 h-9 px-3 text-sm font-medium text-krds-gray-70 rounded-md hover:bg-krds-gray-5 transition-colors border border-krds-gray-20 whitespace-nowrap">
            <span>v0.1.0-beta</span>
            <ChevronDownIcon />
          </button>

          {/* Search */}
          <button className="hidden sm:flex items-center gap-2 h-9 w-full max-w-sm px-3 text-krds-gray-70 rounded-md hover:bg-krds-gray-5 transition-colors bg-krds-gray-5">
            <SearchIcon />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-krds-gray-20 bg-krds-gray-0 px-1.5 font-mono text-xs font-medium text-krds-gray-70 ml-auto">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* GitHub */}
          <Link
            href="https://github.com/hanui-o/hanui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 h-9 px-3 text-sm font-medium text-krds-gray-70 rounded-md hover:bg-krds-gray-5 transition-colors"
          >
            <GitHubIcon />
            <span className="hidden">GitHub</span>
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center text-lg h-9 w-9 text-krds-gray-70 rounded-md hover:bg-krds-gray-5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>
      </Container>

      {/* Sub Navigation - Only show when in Docs section */}
      {isInDocs && (
        <div>
          <Container maxWidth="full" className="h-11">
            <nav className="flex items-center h-full overflow-x-auto scrollbar-hide">
              <div className="flex items-center space-x-1 text-sm">
                {docsSubNavItems.map((item) => {
                  const isActive = currentSubSection === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center h-11 px-4 py-2 whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-krds-primary-base font-semibold border-b border-krds-primary-base'
                          : 'text-krds-gray-70 hover:text-krds-gray-95 border-b border-transparent'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
