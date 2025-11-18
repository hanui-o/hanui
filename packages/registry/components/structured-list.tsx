'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import styles from './structured-list.module.scss';

export interface StructuredListDate {
  /** 날짜 레이블 (예: "신청 기간") */
  label: string;
  /** 날짜 값 (예: "2023.00.00-2024.00.00") */
  value: string;
}

export interface StructuredListItem {
  /** 아이템 ID */
  id: string;
  /** 배지 텍스트 (선택사항) */
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'secondary';
  };
  /** 타이틀 */
  title: string;
  /** 설명 (최대 3줄) */
  description: string;
  /** 날짜 정보 (선택사항) */
  date?: StructuredListDate;
  /** 태그 배열 (선택사항) */
  tags?: string[];
  /** 링크 URL */
  href: string;
  /** 액션 버튼 (선택사항) */
  action?: {
    label: string;
    onClick?: () => void;
  };
  /** 공유 버튼 활성화 (선택사항) */
  showShare?: boolean;
  /** 찜 버튼 활성화 (선택사항) */
  showLike?: boolean;
}

export interface StructuredListProps {
  /** 아이템 배열 */
  items: StructuredListItem[];
  /** 레이아웃 타입 (type-full: 가로형, 기본: 세로형) */
  variant?: 'default' | 'full';
  /** 카드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 공유 버튼 클릭 핸들러 */
  onShare?: (item: StructuredListItem) => void;
  /** 찜 버튼 클릭 핸들러 */
  onLike?: (item: StructuredListItem) => void;
  /** 추가 className */
  className?: string;
}

/**
 * StructuredList - KRDS 구조화 목록 컴포넌트
 *
 * @description
 * 복잡한 콘텐츠를 카드 형식으로 정리하여 표시하는 리스트 컴포넌트입니다.
 * 배지, 타이틀, 설명, 날짜, 태그, 액션 버튼 등을 포함할 수 있습니다.
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: '1',
 *     badge: { text: '진행중', variant: 'primary' },
 *     title: '청년 주거 지원 사업',
 *     description: '만 19세~34세 무주택 청년에게 월세 지원',
 *     date: { label: '신청 기간', value: '2024.01.01-2024.12.31' },
 *     tags: ['청년', '주거지원'],
 *     href: '/programs/youth-housing',
 *     action: { label: '신청하기' },
 *     showShare: true,
 *     showLike: true
 *   }
 * ];
 *
 * <StructuredList items={items} variant="full" />
 * ```
 */
export function StructuredList({
  items,
  variant = 'default',
  size = 'md',
  onShare,
  onLike,
  className,
}: StructuredListProps) {
  const handleShare = (item: StructuredListItem) => {
    onShare?.(item);
  };

  const handleLike = (item: StructuredListItem) => {
    onLike?.(item);
  };

  return (
    <ul
      className={cn(
        styles['krds-structured-list'],
        variant === 'full' && styles['type-full'],
        size === 'sm' && styles['sm'],
        size === 'lg' && styles['lg'],
        className
      )}
    >
      {items.map((item) => (
        <li key={item.id} className={styles['structured-item']}>
          <div className={styles['in']}>
            {/* Badge */}
            {item.badge && (
              <div className={styles['card-top']}>
                <span
                  className={cn(
                    'krds-badge',
                    item.badge.variant === 'primary' && 'bg-light-primary',
                    item.badge.variant === 'success' && 'bg-light-success',
                    item.badge.variant === 'secondary' && 'bg-secondary'
                  )}
                >
                  {item.badge.text}
                </span>
              </div>
            )}

            {/* Card Body */}
            <div className={styles['card-body']}>
              <a href={item.href} className={styles['c-text']}>
                <p className={styles['c-tit']}>
                  <span className={styles['span']}>{item.title}</span>
                </p>
                <p className={styles['c-txt']}>{item.description}</p>
                {item.date && (
                  <p className={styles['c-date']}>
                    <strong className={styles['key']}>{item.date.label}</strong>
                    <span className={styles['value']}>{item.date.value}</span>
                  </p>
                )}
              </a>

              {/* Action Button */}
              {item.action && (
                <div className={styles['c-btn']}>
                  <button
                    type="button"
                    className="krds-btn secondary"
                    onClick={item.action.onClick}
                    title={item.title}
                  >
                    {item.action.label}
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className={styles['card-btm']}>
                {item.tags.map((tag, index) => (
                  <span key={index} className={styles['tag']}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share/Like Buttons */}
            {(item.showShare || item.showLike) && (
              <div className={styles['card-btn']}>
                {item.showShare && (
                  <button
                    type="button"
                    className="krds-btn medium text"
                    onClick={() => handleShare(item)}
                    title={`${item.title} 공유하기`}
                  >
                    <i className="svg-icon ico-share"></i> 공유하기
                  </button>
                )}
                {item.showLike && (
                  <button
                    type="button"
                    className="krds-btn medium text"
                    onClick={() => handleLike(item)}
                    title={`${item.title} 찜하기`}
                  >
                    <i className="svg-icon ico-like"></i> 찜하기
                  </button>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
