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

export interface NotificationChannel {
  /** 채널 ID */
  id: string;
  /** 채널 이름 */
  label: string;
  /** 채널 설명 */
  description?: string;
  /** 이메일 알림 */
  email: boolean;
  /** SMS 알림 */
  sms: boolean;
  /** 푸시 알림 */
  push: boolean;
}

export interface NotificationSettingsProps {
  /** 알림 채널 목록 */
  channels?: NotificationChannel[];
  /** 변경 핸들러 */
  onChange?: (
    channelId: string,
    type: 'email' | 'sms' | 'push',
    enabled: boolean
  ) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
}

const defaultChannels: NotificationChannel[] = [
  {
    id: 'marketing',
    label: '마케팅',
    description: '이벤트, 프로모션 등 마케팅 소식',
    email: true,
    sms: false,
    push: true,
  },
  {
    id: 'security',
    label: '보안',
    description: '로그인 알림, 비밀번호 변경 등',
    email: true,
    sms: true,
    push: true,
  },
  {
    id: 'updates',
    label: '서비스 업데이트',
    description: '새 기능, 점검 안내 등',
    email: true,
    sms: false,
    push: false,
  },
  {
    id: 'social',
    label: '소셜',
    description: '댓글, 좋아요, 팔로우 등',
    email: false,
    sms: false,
    push: true,
  },
];

export function NotificationSettings({
  channels = defaultChannels,
  onChange,
  className,
  title = '알림 설정',
  description = '알림 수신 방법을 설정합니다.',
}: NotificationSettingsProps) {
  const [settings, setSettings] =
    React.useState<NotificationChannel[]>(channels);

  React.useEffect(() => {
    setSettings(channels);
  }, [channels]);

  const handleToggle = (channelId: string, type: 'email' | 'sms' | 'push') => {
    setSettings((prev) =>
      prev.map((ch) =>
        ch.id === channelId ? { ...ch, [type]: !ch[type] } : ch
      )
    );
    const channel = settings.find((ch) => ch.id === channelId);
    if (channel) {
      onChange?.(channelId, type, !channel[type]);
    }
  };

  return (
    <Card variant="outlined" className={cn('w-full max-w-2xl', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardBody>
        {/* Header */}
        <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 pb-3 border-b border-krds-gray-20">
          <span />
          <Body
            as="span"
            size="sm"
            weight="bold"
            className="text-center text-krds-gray-60"
          >
            이메일
          </Body>
          <Body
            as="span"
            size="sm"
            weight="bold"
            className="text-center text-krds-gray-60"
          >
            SMS
          </Body>
          <Body
            as="span"
            size="sm"
            weight="bold"
            className="text-center text-krds-gray-60"
          >
            푸시
          </Body>
        </div>

        {/* Rows */}
        <div className="divide-y divide-krds-gray-10">
          {settings.map((channel) => (
            <div
              key={channel.id}
              className="grid grid-cols-[1fr_80px_80px_80px] gap-2 items-center py-4"
            >
              <div className="space-y-0.5">
                <Label className="font-medium">{channel.label}</Label>
                {channel.description && (
                  <Body size="sm" className="text-krds-gray-50">
                    {channel.description}
                  </Body>
                )}
              </div>
              <div className="flex justify-center">
                <Switch
                  size="sm"
                  checked={channel.email}
                  onCheckedChange={() => handleToggle(channel.id, 'email')}
                  aria-label={`${channel.label} 이메일 알림`}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  size="sm"
                  checked={channel.sms}
                  onCheckedChange={() => handleToggle(channel.id, 'sms')}
                  aria-label={`${channel.label} SMS 알림`}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  size="sm"
                  checked={channel.push}
                  onCheckedChange={() => handleToggle(channel.id, 'push')}
                  aria-label={`${channel.label} 푸시 알림`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
