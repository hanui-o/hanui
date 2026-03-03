'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from '../card';
import { Input } from '../input';
import { Button } from '../button';
import { Label } from '../label';
import { Body } from '../body';
import { cn } from '@/lib/utils';

// ── 카드 브랜드 감지 ──────────────────────────────────────
type CardBrand = 'visa' | 'mastercard' | 'amex' | 'domestic' | 'unknown';

function detectCardBrand(number: string): CardBrand {
  const digits = number.replace(/\s/g, '');
  if (!digits) return 'unknown';
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^9/.test(digits)) return 'domestic';
  return 'unknown';
}

const brandLabels: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  domestic: '국내카드',
  unknown: '',
};

export interface PaymentCardProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  }) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
  /** 결제 금액 표시 */
  amount?: string;
  /** 에러 메시지 */
  error?: string;
  /** 로딩 상태 */
  loading?: boolean;
}

export function PaymentCard({
  onSubmit,
  className,
  title = '카드 결제',
  description = '결제 카드 정보를 입력해주세요.',
  amount,
  error,
  loading = false,
}: PaymentCardProps) {
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardHolder, setCardHolder] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const brand = detectCardBrand(cardNumber);
  const isAmex = brand === 'amex';

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, isAmex ? 15 : 16);
    if (isAmex) {
      // Amex: 4-6-5
      return digits.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
        [a, b, c].filter(Boolean).join(' ')
      );
    }
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      const month = parseInt(digits.slice(0, 2), 10);
      const validMonth = Math.min(Math.max(month, 1), 12);
      const mm = validMonth.toString().padStart(2, '0');
      if (digits.length >= 3) {
        return `${mm}/${digits.slice(2)}`;
      }
      return mm;
    }
    return digits;
  };

  const isExpired = React.useMemo(() => {
    if (expiryDate.length < 5) return false;
    const [mm, yy] = expiryDate.split('/').map(Number);
    const now = new Date();
    const expiryMonth = mm;
    const expiryYear = 2000 + yy;
    return (
      expiryYear < now.getFullYear() ||
      (expiryYear === now.getFullYear() && expiryMonth < now.getMonth() + 1)
    );
  }, [expiryDate]);

  const isComplete =
    cardNumber.replace(/\s/g, '').length >= (isAmex ? 15 : 16) &&
    cardHolder &&
    expiryDate.length === 5 &&
    !isExpired &&
    cvv.length >= (isAmex ? 4 : 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete || loading) return;
    onSubmit?.({ cardNumber, cardHolder, expiryDate, cvv });
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-md', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="payment-card-number">카드 번호</Label>
              {brand !== 'unknown' && (
                <Body
                  as="span"
                  size="xs"
                  className="text-krds-primary-text font-medium"
                >
                  {brandLabels[brand]}
                </Body>
              )}
            </div>
            <Input
              id="payment-card-number"
              type="text"
              inputMode="numeric"
              placeholder={isAmex ? '0000 000000 00000' : '0000 0000 0000 0000'}
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={isAmex ? 17 : 19}
              autoComplete="cc-number"
              clearable
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-card-holder">카드 소유자</Label>
            <Input
              id="payment-card-holder"
              type="text"
              placeholder="카드에 표시된 이름"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              clearable
              autoComplete="cc-name"
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="payment-expiry">유효기간</Label>
              <Input
                id="payment-expiry"
                type="text"
                inputMode="numeric"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(formatExpiryDate(e.target.value))
                }
                maxLength={5}
                autoComplete="cc-exp"
                disabled={loading}
                status={isExpired ? 'error' : undefined}
                className={isExpired ? 'border-krds-danger-60' : undefined}
                aria-invalid={isExpired}
              />
              {isExpired && (
                <Body size="xs" className="text-krds-danger-60">
                  만료된 카드입니다
                </Body>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="payment-cvv">CVV</Label>
              <Input
                id="payment-cvv"
                type="password"
                inputMode="numeric"
                placeholder={isAmex ? '0000' : '000'}
                value={cvv}
                onChange={(e) =>
                  setCvv(
                    e.target.value.replace(/\D/g, '').slice(0, isAmex ? 4 : 3)
                  )
                }
                maxLength={isAmex ? 4 : 3}
                autoComplete="cc-csc"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <Body
              size="sm"
              className="text-krds-danger-60 text-center"
              role="alert"
            >
              {error}
            </Body>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!isComplete || loading}
            loading={loading}
          >
            {amount ? `${amount} 결제하기` : '결제하기'}
          </Button>
        </form>
      </CardBody>

      <CardFooter className="justify-center">
        <Body as="span" size="xs" className="text-krds-gray-50">
          결제 정보는 안전하게 암호화되어 전송됩니다.
        </Body>
      </CardFooter>
    </Card>
  );
}
