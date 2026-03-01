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
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface OtpVerifyProps {
  /** 인증번호 제출 핸들러 */
  onSubmit?: (data: { code: string }) => void;
  /** 재전송 핸들러 */
  onResend?: () => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
  /** 인증번호 자릿수 */
  codeLength?: number;
  /** 재전송 버튼 표시 */
  showResend?: boolean;
}

export function OtpVerify({
  onSubmit,
  onResend,
  className,
  title = '인증번호 입력',
  description = '이메일로 전송된 인증번호를 입력해주세요.',
  codeLength = 6,
  showResend = true,
}: OtpVerifyProps) {
  const [codes, setCodes] = React.useState<string[]>(
    Array(codeLength).fill('')
  );
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value.slice(-1);
    setCodes(newCodes);

    if (value && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    const newCodes = [...codes];
    for (let i = 0; i < Math.min(pastedData.length, codeLength); i++) {
      newCodes[i] = pastedData[i];
    }
    setCodes(newCodes);
    const focusIndex = Math.min(pastedData.length, codeLength - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ code: codes.join('') });
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-md', className)}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {codes.map((code, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold"
                aria-label={`인증번호 ${index + 1}번째 자리`}
              />
            ))}
          </div>

          <Button type="submit" variant="primary" className="w-full">
            인증하기
          </Button>
        </form>
      </CardBody>

      {showResend && (
        <CardFooter className="justify-center text-sm">
          <Body as="span" size="sm" className="text-krds-gray-60">
            인증번호를 받지 못하셨나요?
          </Body>
          <button
            type="button"
            onClick={onResend}
            className="text-krds-primary-base hover:underline ml-1 cursor-pointer"
          >
            재전송
          </button>
        </CardFooter>
      )}
    </Card>
  );
}
