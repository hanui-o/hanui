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
import { cn } from '@/lib/utils';

export interface BillingAddressData {
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  saveAsDefault: boolean;
}

export interface AddressSearchResult {
  zipCode: string;
  address: string;
}

/** 다음 우편번호 API 기본 검색 (페이지 내 오버레이) */
function openDaumPostcode(): Promise<AddressSearchResult | null> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
    });

    const wrap = document.createElement('div');
    Object.assign(wrap.style, {
      width: '100%',
      maxWidth: '500px',
      height: '600px',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#fff',
    });
    overlay.appendChild(wrap);

    const cleanup = () => {
      overlay.remove();
    };

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        cleanup();
        resolve(null);
      }
    });

    document.body.appendChild(overlay);

    const loadAndEmbed = () => {
      new (window as any).daum.Postcode({
        oncomplete: (data: any) => {
          cleanup();
          resolve({
            zipCode: data.zonecode,
            address: data.roadAddress || data.jibunAddress,
          });
        },
        onclose: () => {
          cleanup();
          resolve(null);
        },
        width: '100%',
        height: '100%',
      }).embed(wrap);
    };

    if ((window as any).daum?.Postcode) {
      loadAndEmbed();
    } else {
      const script = document.createElement('script');
      script.src =
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.onload = loadAndEmbed;
      script.onerror = () => {
        cleanup();
        resolve(null);
      };
      document.head.appendChild(script);
    }
  });
}

export interface BillingAddressProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: BillingAddressData) => void;
  /** 주소 검색 핸들러 (기본: 다음 우편번호 API) */
  onAddressSearch?: () => Promise<AddressSearchResult | null>;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
  /** 기본 배송지 저장 체크박스 표시 */
  showSaveDefault?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
}

export function BillingAddress({
  onSubmit,
  onAddressSearch,
  className,
  title = '배송지 정보',
  description = '상품을 받으실 주소를 입력해주세요.',
  showSaveDefault = true,
  loading = false,
}: BillingAddressProps) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [addressDetail, setAddressDetail] = React.useState('');
  const [saveAsDefault, setSaveAsDefault] = React.useState(false);
  const [searching, setSearching] = React.useState(false);

  const detailRef = React.useRef<HTMLInputElement>(null);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const searchFn = onAddressSearch ?? openDaumPostcode;

  const handleAddressSearch = async () => {
    setSearching(true);
    try {
      const result = await searchFn();
      if (result) {
        setZipCode(result.zipCode);
        setAddress(result.address);
        detailRef.current?.focus();
      }
    } finally {
      setSearching(false);
    }
  };

  const isComplete =
    !!name && phone.length >= 13 && zipCode.length === 5 && !!address;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete || loading) return;
    onSubmit?.({
      name,
      phone,
      zipCode,
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="billing-zipcode">우편번호</Label>
              <Input
                id="billing-zipcode"
                type="text"
                placeholder="00000"
                value={zipCode}
                readOnly
                autoComplete="postal-code"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddressSearch}
              disabled={searching || loading}
              loading={searching}
            >
              주소 검색
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing-address">주소</Label>
            <Input
              id="billing-address"
              type="text"
              placeholder="주소 검색을 이용해주세요"
              value={address}
              readOnly
              autoComplete="street-address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing-address-detail">상세주소</Label>
            <Input
              ref={detailRef}
              id="billing-address-detail"
              type="text"
              placeholder="상세주소 입력 (동/호수)"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              clearable
              disabled={loading}
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

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!isComplete || loading}
            loading={loading}
          >
            저장
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
