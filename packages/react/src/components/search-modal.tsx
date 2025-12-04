'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  Search,
  SearchCheck,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  X,
  Minus,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { FormField, FormLabel } from './form-field';

/**
 * 인기검색어 순위 상태
 */
export type RankingState = 'up' | 'down' | 'same';

/**
 * 인기검색어 항목
 */
export interface PopularKeyword {
  text: string;
  state: RankingState;
  change?: number;
}

/**
 * 최근검색어 항목
 */
export interface RecentKeyword {
  text: string;
}

/**
 * 자동완성 검색 결과 항목
 */
export interface SearchSuggestion {
  text: string;
  highlight?: string;
  url?: string;
}

/**
 * SearchModal Props
 */
export interface SearchModalProps {
  /** 모달 열림 상태 */
  open?: boolean;
  /** 모달 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 인기검색어 목록 */
  popularKeywords?: PopularKeyword[];
  /** 최근검색어 목록 */
  recentKeywords?: RecentKeyword[];
  /** 자동완성 결과 목록 */
  suggestions?: SearchSuggestion[];
  /** 검색어 변경 콜백 */
  onSearchChange?: (value: string) => void;
  /** 검색 실행 콜백 */
  onSearch?: (value: string) => void;
  /** 최근검색어 삭제 콜백 */
  onDeleteRecentKeyword?: (keyword: string) => void;
  /** 최근검색어 전체 삭제 콜백 */
  onDeleteAllRecentKeywords?: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * SearchModal - KRDS 통합검색 모달 컴포넌트
 *
 * 전체화면 검색 모달로 인기검색어, 최근검색어, 자동완성 기능 제공
 */
export const SearchModal = React.forwardRef<HTMLDivElement, SearchModalProps>(
  (
    {
      open,
      onOpenChange,
      popularKeywords = [],
      recentKeywords = [],
      suggestions = [],
      onSearchChange,
      onSearch,
      onDeleteRecentKeyword,
      onDeleteAllRecentKeywords,
      className,
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState('');
    const [internalRecentKeywords, setInternalRecentKeywords] =
      React.useState<RecentKeyword[]>(recentKeywords);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // props 변경 시 내부 상태 동기화
    React.useEffect(() => {
      setInternalRecentKeywords(recentKeywords);
    }, [recentKeywords]);

    // 모달 열릴 때 input 포커스
    React.useEffect(() => {
      if (open) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, [open]);

    // 최근검색어 개별 삭제
    const handleDeleteRecentKeyword = (keyword: string) => {
      setInternalRecentKeywords((prev) =>
        prev.filter((item) => item.text !== keyword)
      );
      onDeleteRecentKeyword?.(keyword);
    };

    // 최근검색어 전체 삭제
    const handleDeleteAllRecentKeywords = () => {
      setInternalRecentKeywords([]);
      onDeleteAllRecentKeywords?.();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      onSearchChange?.(value);
    };

    const handleSearch = () => {
      onSearch?.(searchValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    const showSuggestions = searchValue.length > 0 && suggestions.length > 0;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          {/* full 타입에서는 backdrop 숨김 */}
          <Dialog.Overlay className="hidden" />
          <Dialog.Content
            ref={ref}
            className={cn(
              // krds-modal base (full type)
              'fixed inset-0 z-[1010] w-full h-full',
              'bg-krds-gray-5',
              'transition-opacity duration-200',
              // data-state animations
              'data-[state=open]:animate-in data-[state=open]:fade-in-0',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
              className
            )}
            data-type="full"
          >
            {/* modal-dialog (full type) */}
            <div className="flex items-center relative z-[1020] w-full h-full mx-auto p-0">
              {/* modal-content (full type) */}
              <div className="flex flex-col items-center relative w-full h-full max-h-full bg-transparent border-none rounded-none mx-auto">
                {/* Accessibility: VisuallyHidden Title & Description */}
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>통합검색</Dialog.Title>
                </VisuallyHidden.Root>
                <VisuallyHidden.Root asChild>
                  <Dialog.Description>
                    검색어를 입력하여 통합검색을 수행할 수 있습니다.
                    인기검색어와 최근검색어를 확인할 수 있습니다.
                  </Dialog.Description>
                </VisuallyHidden.Root>
                {/* //Accessibility */}

                {/* modal contents (full type) */}
                <div className="flex flex-col relative overflow-y-auto w-full p-0">
                  {/* 통합검색 */}
                  <div className="max-w-[860px] w-full mx-auto px-4 pt-16 pb-12 md:px-6 md:pt-24">
                    {/* 통합검색 정보입력 영역 */}
                    <FormField
                      id="search-total-input-id"
                      className="mb-6 gap-0"
                    >
                      {/* 검색어 타이틀 */}
                      <div className="flex items-center justify-between mb-4">
                        <FormLabel className="text-krds-heading-sm font-bold text-krds-gray-90 md:text-krds-heading-md">
                          검색어를 입력해주세요
                        </FormLabel>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-krds-body-md font-medium text-krds-gray-70 hover:text-krds-primary-60 transition-colors"
                        >
                          검색에 어려움이 있으신가요?
                          <ChevronRight
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                      {/* //검색어 타이틀 */}

                      {/* 검색어 입력 폼 */}
                      <div className="flex flex-col gap-3">
                        <div className="relative flex items-center">
                          <input
                            ref={inputRef}
                            type="text"
                            className={cn(
                              'w-full px-6 pr-16 rounded-xl',
                              'bg-white border border-krds-gray-20',
                              'text-krds-body-md text-krds-gray-90 placeholder:text-krds-gray-50 md:text-krds-body-lg',
                              'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:border-transparent',
                              'transition-all duration-200',
                              'h-14 md:h-16'
                            )}
                            id="search-total-input-id"
                            placeholder="검색어를 입력해주세요."
                            value={searchValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 w-10 h-10 min-w-0 text-krds-gray-70 hover:text-krds-primary-60"
                            onClick={handleSearch}
                            aria-label="검색"
                          >
                            <Search className="w-6 h-6" aria-hidden="true" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="self-start min-w-0 h-auto !px-1 text-krds-gray-70 hover:text-krds-primary-60 hover:bg-transparent"
                        >
                          <SearchCheck className="w-4 h-4" aria-hidden="true" />
                          고급검색
                        </Button>
                      </div>
                      {/* //검색어 입력 폼 */}
                    </FormField>
                    {/* //통합검색 정보입력 영역 */}

                    {/* 구분선 */}
                    <hr className="border-t border-krds-gray-20 my-6" />

                    {/* 검색어 리스트 */}
                    <div>
                      {!showSuggestions ? (
                        /* 검색어 입력 전 - 2컬럼 레이아웃 */
                        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                          {/* 인기검색어 */}
                          <div className="flex-1">
                            <h3 className="text-krds-body-lg font-bold text-krds-gray-90 mb-4">
                              인기검색어
                            </h3>
                            <ol className="space-y-2">
                              {popularKeywords.map((keyword, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-3 py-1"
                                >
                                  <span className="w-6 text-krds-body-md text-krds-gray-60 tabular-nums">
                                    {index + 1}
                                  </span>
                                  <span className="flex-1 text-krds-body-md text-krds-gray-90">
                                    {keyword.text}
                                  </span>
                                  <span
                                    className={cn(
                                      'text-krds-body-sm tabular-nums',
                                      keyword.state === 'up' &&
                                        'text-krds-accent-50',
                                      keyword.state === 'down' &&
                                        'text-krds-primary-60',
                                      keyword.state === 'same' &&
                                        'text-krds-gray-50'
                                    )}
                                  >
                                    <em className="sr-only">
                                      {keyword.state === 'up'
                                        ? '상승'
                                        : keyword.state === 'down'
                                          ? '하락'
                                          : '동일'}
                                    </em>
                                    {keyword.state === 'up' && (
                                      <>
                                        <ArrowUp
                                          className="w-3 h-3 inline"
                                          aria-hidden="true"
                                        />
                                        {keyword.change}
                                      </>
                                    )}
                                    {keyword.state === 'down' && (
                                      <>
                                        <ArrowDown
                                          className="w-3 h-3 inline"
                                          aria-hidden="true"
                                        />
                                        {keyword.change}
                                      </>
                                    )}
                                    {keyword.state === 'same' && (
                                      <Minus
                                        className="w-3 h-3 inline"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* 최근검색어 */}
                          <div className="flex-1 flex flex-col border-t border-krds-gray-20 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                            <h3 className="text-krds-body-lg font-bold text-krds-gray-90 mb-4">
                              최근검색어
                            </h3>
                            <ul className="space-y-2" aria-live="polite">
                              {internalRecentKeywords.map((keyword, index) => (
                                <li
                                  key={index}
                                  className="flex items-center justify-between py-1"
                                >
                                  <span className="text-krds-body-md text-krds-gray-90">
                                    {keyword.text}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-6 h-6 min-w-0 text-krds-gray-50 hover:text-krds-gray-70"
                                    onClick={() =>
                                      handleDeleteRecentKeyword(keyword.text)
                                    }
                                    aria-label="삭제"
                                  >
                                    <X className="w-4 h-4" aria-hidden="true" />
                                  </Button>
                                </li>
                              ))}
                            </ul>
                            {internalRecentKeywords.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-auto self-start"
                                onClick={handleDeleteAllRecentKeywords}
                              >
                                최근검색어 전체 삭제
                                <X className="w-4 h-4" aria-hidden="true" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* 검색어 입력 후 - 자동완성 */
                        <ul className="space-y-1" aria-live="polite">
                          {suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="py-3 px-2 rounded-lg hover:bg-krds-gray-10 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <p
                                  className="text-krds-body-md text-krds-gray-90"
                                  dangerouslySetInnerHTML={{
                                    __html: suggestion.text.replace(
                                      new RegExp(`(${searchValue})`, 'gi'),
                                      '<span class="font-bold text-krds-primary-60">$1</span>'
                                    ),
                                  }}
                                />
                                {suggestion.url && (
                                  <a
                                    href={suggestion.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-krds-body-sm font-medium text-krds-primary-60 hover:text-krds-primary-70 transition-colors max-w-[200px] truncate"
                                    onClick={(e: React.MouseEvent) =>
                                      e.stopPropagation()
                                    }
                                  >
                                    {suggestion.url}
                                    <SquareArrowOutUpRight
                                      className="inline-block ml-1 flex-shrink-0"
                                      size={14}
                                      aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                      {' '}
                                      (새 창 열림)
                                    </span>
                                  </a>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* //검색어 리스트 */}
                  </div>
                  {/* //통합검색 */}
                </div>
                {/* //modal contents */}

                {/* close button (full type) */}
                <Dialog.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'absolute z-[901]',
                      'top-6 right-6 md:top-7 md:right-7',
                      'w-12 h-12 min-w-0 md:w-14 md:h-14'
                    )}
                    aria-label="닫기"
                  >
                    <X className="w-5 h-5 md:w-10 md:h-10" aria-hidden="true" />
                  </Button>
                </Dialog.Close>
                {/* //close button */}
              </div>
            </div>
            {/* //modal-dialog */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

SearchModal.displayName = 'SearchModal';

// 샘플 데이터
export const SAMPLE_POPULAR_KEYWORDS: PopularKeyword[] = [
  { text: '안전보건교육', state: 'up', change: 1 },
  { text: '산업재해조사표', state: 'same' },
  { text: '퇴직금계산기', state: 'up', change: 3 },
  { text: '육아휴직급여', state: 'same' },
  { text: '실업인정신청', state: 'same' },
  { text: '국민내일배움', state: 'down', change: 1 },
  { text: '노사협의회', state: 'down', change: 1 },
  { text: '산업안전보건', state: 'same' },
  { text: '국민내일배움카드신청', state: 'up', change: 11 },
  { text: '안전보건교육', state: 'same' },
];

export const SAMPLE_RECENT_KEYWORDS: RecentKeyword[] = [
  { text: '안전보건교육' },
  { text: '퇴직금계산' },
  { text: '실업급여' },
];

export const SAMPLE_SUGGESTIONS: SearchSuggestion[] = [
  {
    text: '나의 퇴직금 계산해 보기',
    url: 'https://labor.moel.go.kr/cmmt/calRtrmnt.do',
  },
  { text: '퇴직금 계산기' },
  { text: '퇴직금 중간정산' },
  { text: '퇴직금 미지급' },
  { text: '일용직 퇴직금' },
  { text: '육아휴직 퇴직금' },
  { text: '연차수당 퇴직금' },
];
