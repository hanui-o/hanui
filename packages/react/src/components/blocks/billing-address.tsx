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
import { Button } from '../button';
import { Label } from '../label';
import { Checkbox } from '../checkbox';
import { Select } from '../select';
import { cn } from '@/lib/utils';

const regionOptions = [
  { label: '서울특별시', value: 'seoul' },
  { label: '부산광역시', value: 'busan' },
  { label: '대구광역시', value: 'daegu' },
  { label: '인천광역시', value: 'incheon' },
  { label: '광주광역시', value: 'gwangju' },
  { label: '대전광역시', value: 'daejeon' },
  { label: '울산광역시', value: 'ulsan' },
  { label: '세종특별자치시', value: 'sejong' },
  { label: '경기도', value: 'gyeonggi' },
  { label: '강원도', value: 'gangwon' },
  { label: '충청북도', value: 'chungbuk' },
  { label: '충청남도', value: 'chungnam' },
  { label: '전라북도', value: 'jeonbuk' },
  { label: '전라남도', value: 'jeonnam' },
  { label: '경상북도', value: 'gyeongbuk' },
  { label: '경상남도', value: 'gyeongnam' },
  { label: '제주특별자치도', value: 'jeju' },
];

export interface BillingAddressProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: {
    name: string;
    phone: string;
    zipCode: string;
    region: string;
    address: string;
    addressDetail: string;
    saveAsDefault: boolean;
  }) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
  /** 기본 배송지 저장 체크박스 표시 */
  showSaveDefault?: boolean;
}

export function BillingAddress({
  onSubmit,
  className,
  title = '배송지 정보',
  description = '상품을 받으실 주소를 입력해주세요.',
  showSaveDefault = true,
}: BillingAddressProps) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [addressDetail, setAddressDetail] = React.useState('');
  const [saveAsDefault, setSaveAsDefault] = React.useState(false);

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
      phone,
      zipCode,
      region,
      address,
      addressDetail,
      saveAsDefault,
    });
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
              <Label htmlFor="billing-name">수령인</Label>
              <Input
                id="billing-name"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                clearable
                autoComplete="name"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="billing-phone">연락처</Label>
              <Input
                id="billing-phone"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3 space-y-2">
              <Label htmlFor="billing-zipcode">우편번호</Label>
              <Input
                id="billing-zipcode"
                type="text"
                inputMode="numeric"
                placeholder="00000"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))
                }
                autoComplete="postal-code"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="billing-region">시/도</Label>
              <Select
                options={regionOptions}
                value={region}
                onChange={(value) => setRegion(value)}
                placeholder="시/도 선택"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing-address">주소</Label>
            <Input
              id="billing-address"
              type="text"
              placeholder="도로명 주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="street-address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing-address-detail">상세주소</Label>
            <Input
              id="billing-address-detail"
              type="text"
              placeholder="상세주소 입력"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              clearable
            />
          </div>

          {showSaveDefault && (
            <Checkbox
              id="billing-save-default"
              size="sm"
              label="기본 배송지로 저장"
              checked={saveAsDefault}
              onCheckedChange={(checked) => setSaveAsDefault(checked === true)}
            />
          )}

          <Button type="submit" variant="primary" className="w-full">
            저장
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
