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
}

export function PaymentCard({
  onSubmit,
  className,
  title = '카드 결제',
  description = '결제 카드 정보를 입력해주세요.',
  amount,
}: PaymentCardProps) {
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardHolder, setCardHolder] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Label htmlFor="payment-card-number">카드 번호</Label>
            <Input
              id="payment-card-number"
              type="text"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              autoComplete="cc-number"
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
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="payment-cvv">CVV</Label>
              <Input
                id="payment-cvv"
                type="password"
                inputMode="numeric"
                placeholder="000"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                maxLength={4}
                autoComplete="cc-csc"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full">
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
