'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../card';
import { Select, type SelectOption } from '../select';
import { Switch } from '../switch';
import { DateInput } from '../date-input';
import { Button } from '../button';
import { Input } from '../input';
import { Badge } from '../badge';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// ============================================================================
// 타입 정의
// ============================================================================

export interface PublishSettingsState {
  /** 발행 상태 */
  status: string;
  /** 예약 발행일 (YYYY-MM-DD) */
  scheduledDate: string;
  /** 상단 고정 */
  pinned: boolean;
  /** 카테고리 */
  category: string;
  /** 태그 목록 */
  tags: string[];
}

export interface PublishSettingsProps {
  /** 설정 변경 핸들러 */
  onChange?: (settings: PublishSettingsState) => void;
  /** 발행 핸들러 */
  onPublish?: (settings: PublishSettingsState) => void;
  /** 임시저장 핸들러 */
  onSaveDraft?: (settings: PublishSettingsState) => void;
  /** 초기값 */
  initialSettings?: Partial<PublishSettingsState>;
  /** 상태 옵션 */
  statusOptions?: SelectOption[];
  /** 카테고리 옵션 */
  categoryOptions?: SelectOption[];
  /** 추가 className */
  className?: string;
}

// ============================================================================
// 기본 옵션
// ============================================================================

const DEFAULT_STATUS_OPTIONS: SelectOption[] = [
  { value: 'draft', label: '임시저장' },
  { value: 'published', label: '발행' },
  { value: 'scheduled', label: '예약 발행' },
  { value: 'private', label: '비공개' },
];

const DEFAULT_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'news', label: '소식' },
  { value: 'policy', label: '정책' },
  { value: 'project', label: '사업안내' },
  { value: 'recruit', label: '채용' },
  { value: 'etc', label: '기타' },
];

const INITIAL_SETTINGS: PublishSettingsState = {
  status: 'draft',
  scheduledDate: '',
  pinned: false,
  category: 'news',
  tags: [],
};

// ============================================================================
// PublishSettings 블록
// ============================================================================

export function PublishSettings({
  onChange,
  onPublish,
  onSaveDraft,
  initialSettings,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  categoryOptions = DEFAULT_CATEGORY_OPTIONS,
  className,
}: PublishSettingsProps) {
  const [settings, setSettings] = React.useState<PublishSettingsState>({
    ...INITIAL_SETTINGS,
    ...initialSettings,
  });
  const [tagInput, setTagInput] = React.useState('');

  const update = <K extends keyof PublishSettingsState>(
    key: K,
    value: PublishSettingsState[K]
  ) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    onChange?.(next);
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !settings.tags.includes(tag)) {
      update('tags', [...settings.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    update(
      'tags',
      settings.tags.filter((t) => t !== tag)
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle>발행 설정</CardTitle>
      </CardHeader>
      <CardBody className="space-y-5">
        {/* 발행 상태 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-krds-gray-70">
            상태
          </label>
          <Select
            options={statusOptions}
            value={settings.status}
            onChange={(value) => update('status', value)}
            size="sm"
          />
        </div>

        {/* 예약 발행일 */}
        {settings.status === 'scheduled' && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-krds-gray-70">
              예약 발행일
            </label>
            <DateInput
              value={settings.scheduledDate}
              onChange={(value) => update('scheduledDate', value)}
              showCalendarButton
              placeholder="YYYY-MM-DD"
            />
          </div>
        )}

        {/* 카테고리 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-krds-gray-70">
            카테고리
          </label>
          <Select
            options={categoryOptions}
            value={settings.category}
            onChange={(value) => update('category', value)}
            size="sm"
          />
        </div>

        {/* 상단 고정 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-krds-gray-70">
            상단 고정
          </label>
          <Switch
            checked={settings.pinned}
            onChange={(checked) => update('pinned', checked)}
          />
        </div>

        {/* 태그 */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-krds-gray-70">
            태그
          </label>
          <Input
            type="text"
            placeholder="태그 입력 후 Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            size="sm"
          />
          {settings.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {settings.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 hover:text-red-500"
                    aria-label={`${tag} 태그 삭제`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-2 border-t border-krds-gray-10 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onSaveDraft?.(settings)}
          >
            임시저장
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onPublish?.(settings)}
          >
            {settings.status === 'scheduled' ? '예약 발행' : '발행'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
