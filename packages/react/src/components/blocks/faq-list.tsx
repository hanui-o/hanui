'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../accordion';
import { Badge } from '../badge';
import { cn } from '@/lib/utils';

export interface FaqItem {
  /** FAQ ID */
  id: string | number;
  /** 질문 */
  question: string;
  /** 답변 (HTML 문자열 또는 ReactNode) */
  answer: React.ReactNode;
  /** 카테고리 */
  category?: string;
}

export interface FaqListProps {
  /** 제목 */
  title?: string;
  /** FAQ 목록 */
  items?: FaqItem[];
  /** 카테고리 필터 표시 여부 */
  showCategoryFilter?: boolean;
  /** 추가 className */
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    id: 1,
    question: '회원가입은 어떻게 하나요?',
    answer:
      '홈페이지 상단의 "회원가입" 버튼을 클릭하여 필요한 정보를 입력하시면 됩니다. 공공 아이디(행정전자서명)를 이용한 간편 가입도 가능합니다.',
    category: '이용안내',
  },
  {
    id: 2,
    question: '비밀번호를 잊어버렸어요.',
    answer:
      '로그인 페이지에서 "비밀번호 찾기"를 클릭하시면 가입 시 등록한 이메일로 임시 비밀번호가 발송됩니다.',
    category: '이용안내',
  },
  {
    id: 3,
    question: '민원 접수 후 처리 기간은 얼마나 걸리나요?',
    answer:
      '일반 민원은 접수일로부터 7일 이내, 복합 민원은 14일 이내에 처리됩니다. 처리 현황은 "나의 민원" 메뉴에서 확인할 수 있습니다.',
    category: '민원',
  },
  {
    id: 4,
    question: '첨부파일 용량 제한이 있나요?',
    answer:
      '개별 파일 최대 50MB, 전체 첨부파일 합계 최대 200MB까지 업로드할 수 있습니다. 지원 형식은 HWP, PDF, DOC, XLS, JPG, PNG입니다.',
    category: '기술지원',
  },
];

/**
 * FaqList 블록
 *
 * 자주 묻는 질문 목록. 아코디언 형식으로 질문/답변을 표시합니다.
 * 접근성 인증에서 키보드 네비게이션과 ARIA 상태를 검증합니다.
 */
export function FaqList({
  title = '자주 묻는 질문',
  items = defaultItems,
  showCategoryFilter = false,
  className,
}: FaqListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );

  const categories = React.useMemo(() => {
    const cats = new Set(items.map((item) => item.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [items]);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <section className={cn('', className)} aria-label={title}>
      <h3 className="text-lg font-bold text-krds-gray-90 mb-4">{title}</h3>

      {showCategoryFilter && categories.length > 1 && (
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="toolbar"
          aria-label="카테고리 필터"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1 rounded-full text-sm transition-colors',
              !selectedCategory
                ? 'bg-krds-primary-base text-white'
                : 'bg-krds-gray-5 text-krds-gray-70 hover:bg-krds-gray-10'
            )}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3 py-1 rounded-full text-sm transition-colors',
                selectedCategory === cat
                  ? 'bg-krds-primary-base text-white'
                  : 'bg-krds-gray-5 text-krds-gray-70 hover:bg-krds-gray-10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <Accordion type="single" collapsible>
        {filteredItems.map((item) => (
          <AccordionItem key={item.id} value={String(item.id)}>
            <AccordionTrigger>
              <span className="flex items-center gap-2 text-left">
                {item.category && (
                  <Badge variant="gray" size="md">
                    {item.category}
                  </Badge>
                )}
                <span>{item.question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-krds-gray-70 leading-relaxed">
                {item.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
