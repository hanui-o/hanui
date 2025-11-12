'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-20/40 dark:border-gray-80/40 bg-white/95 dark:bg-gray-95/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-95/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary-60 rounded-md" />
            <span className="text-lg font-bold">HANUI</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm">
          <Link
            href="/components"
            className="text-gray-70 dark:text-gray-30 hover:text-gray-90 dark:hover:text-white transition-colors font-medium"
          >
            Components
          </Link>
          <Link
            href="https://github.com/odada-o/hanui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-70 dark:text-gray-30 hover:text-gray-90 dark:hover:text-white transition-colors font-medium"
          >
            GitHub
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-10 dark:hover:bg-gray-90 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
