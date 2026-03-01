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
import { Select } from '../select';
import { Textarea } from '../textarea';
import { FileUpload } from '../file-upload';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface ApplicationFormProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: {
    name: string;
    residentNumber: string;
    phone: string;
    address: string;
    applicationType: string;
    content: string;
  }) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
  /** 신청 유형 옵션 */
  applicationTypes?: Array<{ label: string; value: string }>;
}

const defaultApplicationTypes = [
  { label: '민원 상담', value: 'consultation' },
  { label: '서류 발급', value: 'document' },
  { label: '정보 공개 청구', value: 'disclosure' },
  { label: '건의/제안', value: 'suggestion' },
  { label: '기타', value: 'other' },
];

export function ApplicationForm({
  onSubmit,
  className,
  title = '민원신청',
  description = '민원 신청에 필요한 정보를 입력해주세요.',
  applicationTypes = defaultApplicationTypes,
}: ApplicationFormProps) {
  const [name, setName] = React.useState('');
  const [residentNumber, setResidentNumber] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [applicationType, setApplicationType] = React.useState('');
  const [content, setContent] = React.useState('');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      name,
      residentNumber,
      phone,
      address,
      applicationType,
      content,
    });
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 신청인 정보 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-krds-gray-90 border-b border-krds-gray-20 pb-2">
              신청인 정보
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">성명</Label>
                <Input
                  id="app-name"
                  type="text"
                  placeholder="성명"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-resident">주민등록번호</Label>
                <Input
                  id="app-resident"
                  type="text"
                  placeholder="000000-0000000"
                  value={residentNumber}
                  onChange={(e) => setResidentNumber(e.target.value)}
                  maxLength={14}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-phone">연락처</Label>
                <Input
                  id="app-phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-address">주소</Label>
                <Input
                  id="app-address"
                  type="text"
                  placeholder="주소를 입력하세요"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                />
              </div>
            </div>
          </div>

          {/* 신청 내용 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-krds-gray-90 border-b border-krds-gray-20 pb-2">
              신청 내용
            </h3>

            <div className="space-y-2">
              <Label htmlFor="app-type">신청 유형</Label>
              <Select
                options={applicationTypes}
                value={applicationType}
                onChange={(value) => setApplicationType(value)}
                placeholder="신청 유형을 선택하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-content">상세 내용</Label>
              <Textarea
                id="app-content"
                placeholder="신청 내용을 상세히 기재해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          {/* 첨부 파일 */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-krds-gray-90 border-b border-krds-gray-20 pb-2">
              첨부 파일
            </h3>
            <FileUpload
              title="파일 첨부"
              description="PDF, JPG, PNG 파일 (최대 10MB)"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={10 * 1024 * 1024}
              maxFiles={5}
              multiple
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            민원 신청
          </Button>
        </form>
      </CardBody>

      <CardFooter>
        <Body as="span" size="xs" className="text-krds-gray-50">
          ※ 허위 사실을 기재하여 신청하는 경우 관련 법령에 의해 처벌받을 수
          있습니다.
        </Body>
      </CardFooter>
    </Card>
  );
}
