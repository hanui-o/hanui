'use client';

import * as React from 'react';
import { Body } from '../body';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

export interface TimelineItem {
  /** 연도 또는 날짜 */
  date: string;
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
}

export interface TimelineProps {
  /** 연혁 항목 목록 */
  items: TimelineItem[];
  /** 레이아웃 */
  layout?: 'left' | 'alternate';
  /** 추가 className */
  className?: string;
}

// ============================================================================
// Timeline Component
// ============================================================================

export function Timeline({ items, layout = 'left', className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* 세로선 */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-px bg-krds-gray-20',
          layout === 'left' ? 'left-[60px]' : 'left-1/2'
        )}
      />

      <div className="space-y-8">
        {items.map((item, index) => {
          const isRight = layout === 'alternate' && index % 2 === 1;

          return (
            <div
              key={index}
              className={cn(
                'relative flex items-start gap-6',
                layout === 'alternate' && 'justify-center'
              )}
            >
              {layout === 'left' ? (
                <>
                  {/* 날짜 */}
                  <div className="w-[48px] shrink-0 text-right pt-0.5">
                    <Body
                      size="sm"
                      weight="bold"
                      className="text-krds-primary-base"
                    >
                      {item.date}
                    </Body>
                  </div>

                  {/* 도트 */}
                  <div className="relative z-10 w-3 h-3 rounded-full bg-krds-primary-base border-2 border-white shadow-sm mt-1.5 shrink-0" />

                  {/* 내용 */}
                  <div className="flex-1 pb-2">
                    <Body size="md" weight="medium">
                      {item.title}
                    </Body>
                    {item.description && (
                      <Body size="sm" className="text-krds-gray-60 mt-1">
                        {item.description}
                      </Body>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* 왼쪽 */}
                  <div
                    className={cn(
                      'w-[calc(50%-24px)]',
                      isRight ? 'text-right' : ''
                    )}
                  >
                    {!isRight && (
                      <div>
                        <Body
                          size="sm"
                          weight="bold"
                          className="text-krds-primary-base"
                        >
                          {item.date}
                        </Body>
                        <Body size="md" weight="medium" className="mt-1">
                          {item.title}
                        </Body>
                        {item.description && (
                          <Body size="sm" className="text-krds-gray-60 mt-1">
                            {item.description}
                          </Body>
                        )}
                      </div>
                    )}
                    {isRight && (
                      <Body
                        size="sm"
                        weight="bold"
                        className="text-krds-primary-base pt-0.5"
                      >
                        {item.date}
                      </Body>
                    )}
                  </div>

                  {/* 도트 */}
                  <div className="relative z-10 w-3 h-3 rounded-full bg-krds-primary-base border-2 border-white shadow-sm mt-1.5 shrink-0" />

                  {/* 오른쪽 */}
                  <div className="w-[calc(50%-24px)]">
                    {isRight && (
                      <div>
                        <Body size="md" weight="medium">
                          {item.title}
                        </Body>
                        {item.description && (
                          <Body size="sm" className="text-krds-gray-60 mt-1">
                            {item.description}
                          </Body>
                        )}
                      </div>
                    )}
                    {!isRight && (
                      <Body
                        size="sm"
                        weight="bold"
                        className="text-krds-primary-base pt-0.5"
                      >
                        {item.date}
                      </Body>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
