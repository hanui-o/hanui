'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from '../card';
import { Switch } from '../switch';
import { Label } from '../label';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface SettingItem {
  /** 설정 ID */
  id: string;
  /** 설정 라벨 */
  label: string;
  /** 설정 설명 */
  description?: string;
  /** 활성화 여부 */
  enabled: boolean;
}

export interface SettingsSectionProps {
  /** 설정 항목 목록 */
  items: SettingItem[];
  /** 설정 변경 핸들러 */
  onChange?: (id: string, enabled: boolean) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
}

const defaultItems: SettingItem[] = [
  {
    id: 'two-factor',
    label: '2단계 인증',
    description: '로그인 시 추가 인증을 요구합니다.',
    enabled: true,
  },
  {
    id: 'session-timeout',
    label: '자동 로그아웃',
    description: '30분 동안 활동이 없으면 자동으로 로그아웃합니다.',
    enabled: true,
  },
  {
    id: 'login-alert',
    label: '로그인 알림',
    description: '새로운 기기에서 로그인 시 알림을 보냅니다.',
    enabled: false,
  },
  {
    id: 'data-sharing',
    label: '데이터 공유',
    description: '서비스 개선을 위한 익명 데이터 수집에 동의합니다.',
    enabled: false,
  },
];

export function SettingsSection({
  items = defaultItems,
  onChange,
  className,
  title = '설정',
  description = '계정 및 보안 설정을 관리합니다.',
}: SettingsSectionProps) {
  const [settings, setSettings] = React.useState<SettingItem[]>(items);

  React.useEffect(() => {
    setSettings(items);
  }, [items]);

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
    const item = settings.find((s) => s.id === id);
    if (item) {
      onChange?.(id, !item.enabled);
    }
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-lg', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        <div className="divide-y divide-krds-gray-10">
          {settings.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="space-y-0.5 pr-4">
                <Label htmlFor={`setting-${item.id}`} className="font-medium">
                  {item.label}
                </Label>
                {item.description && (
                  <Body size="sm" className="text-krds-gray-50">
                    {item.description}
                  </Body>
                )}
              </div>
              <Switch
                id={`setting-${item.id}`}
                checked={item.enabled}
                onCheckedChange={() => handleToggle(item.id)}
                size="md"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
