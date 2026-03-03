'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from '../card';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { Label } from '../label';
import { cn } from '@/lib/utils';

export interface ContactFormProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
}

export function ContactForm({
  onSubmit,
  className,
  title = '문의하기',
  description = '궁금한 점이 있으시면 아래 양식을 작성해주세요.',
}: ContactFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ name, email, subject, message });
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="contact-name">이름</Label>
              <Input
                id="contact-name"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                clearable
                autoComplete="name"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="contact-email">이메일</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                clearable
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">제목</Label>
            <Input
              id="contact-subject"
              type="text"
              placeholder="문의 제목을 입력하세요"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              clearable
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">내용</Label>
            <Textarea
              id="contact-message"
              placeholder="문의 내용을 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              autoResize
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!name || !email || !subject || !message}
          >
            문의 보내기
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
