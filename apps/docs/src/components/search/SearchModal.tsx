'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchDocumentation, type SearchItem } from '@/lib/search-data';
import {
  Search,
  FileText,
  Layers,
  BookOpen,
  Users,
  Sparkles,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryConfig = {
  'get-started': {
    label: 'Get Started',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  'design-system': {
    label: 'Design System',
    icon: Layers,
    color: 'text-purple-600',
  },
  components: { label: 'Components', icon: FileText, color: 'text-green-600' },
  templates: { label: 'Templates', icon: Sparkles, color: 'text-orange-600' },
  community: { label: 'Community', icon: Users, color: 'text-pink-600' },
  showcase: { label: 'Showcase', icon: Sparkles, color: 'text-yellow-600' },
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search function
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const searchResults = searchDocumentation(searchQuery);
      setResults(searchResults);
      setSelectedIndex(-1); // Reset to -1 so first arrow down selects first item
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, []);

  // Navigate to selected result
  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
      setQuery('');
      setResults([]);
    },
    [router, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => {
            // If nothing is selected (-1), select first item (0)
            if (prev < 0) return 0;
            // Otherwise move down, but don't exceed last item
            return Math.min(prev + 1, results.length - 1);
          });
        }
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => {
            // If at first item or nothing selected, go back to input field
            if (prev <= 0) return -1;
            // Otherwise move up
            return prev - 1;
          });
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, handleSelect, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 border border-krds-gray-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-krds-gray-10 bg-krds-gray-0">
          <Search className="w-5 h-5 text-krds-gray-60 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-base text-krds-gray-95 placeholder:text-krds-gray-60"
            style={{ fontSize: '1.6rem' }}
          />
          <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded-md border border-krds-gray-20 bg-white px-2.5 font-mono text-xs font-medium text-krds-gray-70 shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto overscroll-contain"
        >
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => {
                const categoryInfo = categoryConfig[result.category];
                const Icon = categoryInfo.icon;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={result.href}
                    onClick={() => handleSelect(result.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-start gap-4 px-6 py-4 text-left transition-all border-l-4 ${
                      isSelected
                        ? 'bg-krds-primary-base/5 border-l-krds-primary-base'
                        : 'hover:bg-krds-gray-0 border-l-transparent'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg ${categoryInfo.color} bg-current/10`}
                    >
                      <Icon className={`w-5 h-5 ${categoryInfo.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base font-semibold text-krds-gray-95 truncate">
                          {result.title}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full bg-current/10 ${categoryInfo.color} flex-shrink-0 font-medium`}
                        >
                          {categoryInfo.label}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-sm text-krds-gray-70 line-clamp-2 leading-relaxed">
                          {result.description}
                        </p>
                      )}
                    </div>

                    {/* Enter Key Hint */}
                    {isSelected && (
                      <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded-md border border-krds-primary-base/30 bg-krds-primary-base/5 px-2.5 font-mono text-xs font-medium text-krds-primary-base flex-shrink-0 shadow-sm">
                        ↵
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-krds-gray-5 flex items-center justify-center">
                <Search className="w-8 h-8 text-krds-gray-40" />
              </div>
              <p className="text-base font-medium text-krds-gray-95 mb-1">
                검색 결과가 없습니다
              </p>
              <p className="text-sm text-krds-gray-60">
                다른 키워드로 검색해보세요
              </p>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-krds-primary-base/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-krds-primary-base" />
              </div>
              <p className="text-base font-medium text-krds-gray-95 mb-1">
                문서 검색
              </p>
              <p className="text-sm text-krds-gray-60 mb-6">
                검색어를 입력하여 문서를 찾아보세요
              </p>
              <div className="mt-8 px-6">
                <p className="text-sm font-medium text-krds-gray-70 mb-3">
                  인기 검색어
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Button', 'Input', 'Modal', 'Typography', 'Colors'].map(
                    (keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleSearch(keyword)}
                        className="px-4 py-2 text-sm rounded-lg bg-krds-gray-5 text-krds-gray-70 hover:bg-krds-primary-base/10 hover:text-krds-primary-base transition-all border border-krds-gray-10 hover:border-krds-primary-base/30 font-medium"
                      >
                        {keyword}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="flex items-center justify-between px-6 py-3 border-t border-krds-gray-10 bg-krds-gray-0 text-xs text-krds-gray-60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border border-krds-gray-20 bg-white px-2 font-mono text-xs font-medium shadow-sm">
                ↑
              </kbd>
              <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border border-krds-gray-20 bg-white px-2 font-mono text-xs font-medium shadow-sm">
                ↓
              </kbd>
              <span className="ml-1 text-sm">이동</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border border-krds-gray-20 bg-white px-2 font-mono text-xs font-medium shadow-sm">
                ↵
              </kbd>
              <span className="ml-1 text-sm">선택</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="inline-flex h-6 select-none items-center gap-1 rounded-md border border-krds-gray-20 bg-white px-2 font-mono text-xs font-medium shadow-sm">
                ESC
              </kbd>
              <span className="ml-1 text-sm">닫기</span>
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
