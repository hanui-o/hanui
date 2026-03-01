'use client';

import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '../card';
import { Button } from '../button';
import { Badge } from '../badge';
import { Body } from '../body';
import { List, ListItem } from '../list';
import { cn } from '@/lib/utils';

export interface PricingPlan {
  /** 플랜 이름 */
  name: string;
  /** 가격 */
  price: string;
  /** 가격 단위 (예: /월) */
  period?: string;
  /** 설명 */
  description?: string;
  /** 기능 목록 */
  features: string[];
  /** 추천 플랜 여부 */
  recommended?: boolean;
  /** CTA 버튼 텍스트 */
  buttonText?: string;
}

export interface PricingTableProps {
  /** 플랜 목록 */
  plans?: PricingPlan[];
  /** 플랜 선택 핸들러 */
  onSelect?: (planName: string) => void;
  /** 추가 className */
  className?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    name: '무료',
    price: '₩0',
    period: '/월',
    description: '개인 프로젝트에 적합',
    features: ['프로젝트 3개', '기본 분석', '커뮤니티 지원', '1GB 스토리지'],
    buttonText: '무료로 시작',
  },
  {
    name: '프로',
    price: '₩29,000',
    period: '/월',
    description: '성장하는 팀에 적합',
    features: [
      '프로젝트 무제한',
      '고급 분석',
      '우선 지원',
      '100GB 스토리지',
      'API 접근',
      '팀 협업',
    ],
    recommended: true,
    buttonText: '프로 시작',
  },
  {
    name: '엔터프라이즈',
    price: '맞춤 견적',
    description: '대규모 조직에 적합',
    features: [
      '프로젝트 무제한',
      '엔터프라이즈 분석',
      '전담 지원',
      '무제한 스토리지',
      'API 접근',
      'SSO / SAML',
      'SLA 보장',
    ],
    buttonText: '문의하기',
  },
];

export function PricingTable({
  plans = defaultPlans,
  onSelect,
  className,
}: PricingTableProps) {
  return (
    <div
      className={cn(
        'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {plans.map((plan) => (
        <Card
          key={plan.name}
          variant="outlined"
          className={cn(
            'relative flex flex-col',
            plan.recommended && 'border-krds-primary-base border-2'
          )}
        >
          {plan.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="primary" size="md">
                추천
              </Badge>
            </div>
          )}

          <CardHeader className="text-center">
            <CardTitle>{plan.name}</CardTitle>
            <div className="mt-2">
              <Body
                as="span"
                weight="bold"
                className="text-3xl text-krds-gray-95"
              >
                {plan.price}
              </Body>
              {plan.period && (
                <Body as="span" size="sm" className="text-krds-gray-50">
                  {plan.period}
                </Body>
              )}
            </div>
            {plan.description && (
              <Body size="sm" className="text-krds-gray-60 mt-1">
                {plan.description}
              </Body>
            )}
          </CardHeader>

          <CardBody className="flex-1">
            <List variant="check" spacing="default">
              {plan.features.map((feature) => (
                <ListItem key={feature}>{feature}</ListItem>
              ))}
            </List>
          </CardBody>

          <CardFooter>
            <Button
              variant={plan.recommended ? 'primary' : 'outline'}
              className="w-full"
              onClick={() => onSelect?.(plan.name)}
            >
              {plan.buttonText || '선택'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
