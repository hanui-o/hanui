'use client';

import * as React from 'react';
import { Card, CardBody } from '../card';
import { Badge } from '../badge';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface ServiceCardItem {
  /** 서비스 ID */
  id: string;
  /** 서비스 이름 */
  title: string;
  /** 서비스 설명 */
  description: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 링크 href */
  href?: string;
  /** 뱃지 (새 서비스, 인기 등) */
  badge?: string;
  /** 뱃지 variant */
  badgeVariant?: 'primary' | 'success' | 'warning' | 'error' | 'gray';
}

export interface ServiceCardGridProps {
  /** 서비스 카드 목록 */
  services?: ServiceCardItem[];
  /** 카드 클릭 핸들러 */
  onCardClick?: (serviceId: string) => void;
  /** 칼럼 수 */
  columns?: 2 | 3 | 4;
  /** 추가 className */
  className?: string;
}

function DefaultServiceIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

const defaultServices: ServiceCardItem[] = [
  {
    id: 'resident-cert',
    title: '주민등록등본 발급',
    description: '주민등록등본/초본을 온라인으로 발급받을 수 있습니다.',
    badge: '인기',
    badgeVariant: 'primary',
  },
  {
    id: 'tax-payment',
    title: '세금 납부',
    description: '지방세, 자동차세 등 각종 세금을 납부합니다.',
  },
  {
    id: 'civil-complaint',
    title: '민원 상담',
    description: '생활 불편, 건의사항 등을 접수하고 처리 현황을 확인합니다.',
  },
  {
    id: 'welfare',
    title: '복지 서비스',
    description: '맞춤형 복지 서비스를 검색하고 신청합니다.',
    badge: '신규',
    badgeVariant: 'success',
  },
  {
    id: 'business-reg',
    title: '사업자 등록',
    description: '사업자 등록 및 변경 신청을 할 수 있습니다.',
  },
  {
    id: 'education',
    title: '교육 서비스',
    description: '학교 정보, 학원 등록, 교육 지원 서비스를 이용합니다.',
  },
];

export function ServiceCardGrid({
  services = defaultServices,
  onCardClick,
  columns = 3,
  className,
}: ServiceCardGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-4', gridCols, className)}>
      {services.map((service) => {
        const Wrapper = service.href ? 'a' : 'button';
        const wrapperProps = service.href
          ? { href: service.href }
          : {
              type: 'button' as const,
              onClick: () => onCardClick?.(service.id),
            };

        return (
          <Wrapper key={service.id} {...wrapperProps} className="text-left">
            <Card
              variant="outlined"
              className="h-full transition-all hover:border-krds-primary-base hover:shadow-sm cursor-pointer"
            >
              <CardBody className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-krds-primary-10 flex items-center justify-center text-krds-primary-base flex-shrink-0">
                    {service.icon || <DefaultServiceIcon />}
                  </div>
                  {service.badge && (
                    <Badge
                      variant={service.badgeVariant || 'primary'}
                      size="md"
                    >
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-krds-gray-95">
                    {service.title}
                  </h3>
                  <Body size="sm" className="text-krds-gray-60">
                    {service.description}
                  </Body>
                </div>
              </CardBody>
            </Card>
          </Wrapper>
        );
      })}
    </div>
  );
}
