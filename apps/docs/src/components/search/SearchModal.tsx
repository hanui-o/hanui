'use client';

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-krds-gray-10">
          <Search className="w-5 h-5 text-krds-gray-60" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-base text-krds-gray-95 placeholder:text-krds-gray-60"
          />
          <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-krds-gray-20 bg-krds-gray-5 px-2 font-mono text-xs font-medium text-krds-gray-70">
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
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all ${
                      isSelected ? 'bg-krds-gray-5' : 'hover:bg-krds-gray-5'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded ${categoryInfo.color} bg-current/10`}
                    >
                      <Icon className={`w-4 h-4 ${categoryInfo.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-krds-gray-95 truncate">
                          {result.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full bg-current/10 ${categoryInfo.color} flex-shrink-0`}
                        >
                          {categoryInfo.label}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-xs text-krds-gray-70 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </div>

                    {/* Enter Key Hint */}
                    {isSelected && (
                      <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-krds-gray-20 bg-krds-gray-5 px-2 font-mono text-xs font-medium text-krds-gray-70 flex-shrink-0">
                        ↵
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto text-krds-gray-40 mb-3" />
              <p className="text-sm text-krds-gray-70">No results found</p>
              <p className="text-xs text-krds-gray-60 mt-1">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto text-krds-gray-40 mb-3" />
              <p className="text-sm text-krds-gray-70">
                Start typing to search documentation
              </p>
              <div className="mt-6 px-4">
                <p className="text-xs text-krds-gray-60 mb-2">
                  Popular searches:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Button', 'Input', 'Modal', 'Typography', 'Colors'].map(
                    (keyword) => (
                      <button
                        key={keyword}
                        onClick={() => handleSearch(keyword)}
                        className="px-3 py-1 text-xs rounded-full bg-krds-gray-5 text-krds-gray-70 hover:bg-krds-gray-10 transition-colors"
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
        <div className="flex items-center justify-between px-4 py-2 border-t border-krds-gray-10 bg-krds-gray-0 text-xs text-krds-gray-60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-krds-gray-20 bg-white px-1.5 font-mono text-[10px] font-medium">
                ↑
              </kbd>
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-krds-gray-20 bg-white px-1.5 font-mono text-[10px] font-medium">
                ↓
              </kbd>
              <span className="ml-1">to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-krds-gray-20 bg-white px-1.5 font-mono text-[10px] font-medium">
                ↵
              </kbd>
              <span className="ml-1">to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-krds-gray-20 bg-white px-1.5 font-mono text-[10px] font-medium">
                ESC
              </kbd>
              <span className="ml-1">to close</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
