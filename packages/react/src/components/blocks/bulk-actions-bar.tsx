'use client';

import * as React from 'react';
import { Button } from '../button';
import { Badge } from '../badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../dropdown-menu';
import { cn } from '@/lib/utils';
import { Trash2, ChevronDown, X } from 'lucide-react';

// ============================================================================
// 타입 정의
// ============================================================================

export interface BulkAction {
  /** 액션 식별자 */
  value: string;
  /** 표시 레이블 */
  label: string;
}

export interface BulkActionsBarProps {
  /** 선택된 항목 수 */
  selectedCount: number;
  /** 액션 실행 핸들러 */
  onAction?: (action: string) => void;
  /** 전체 선택 */
  onSelectAll?: () => void;
  /** 선택 해제 */
  onDeselectAll?: () => void;
  /** 상태 변경 옵션 */
  statusActions?: BulkAction[];
  /** 카테고리 변경 옵션 */
  categoryActions?: BulkAction[];
  /** 삭제 표시 여부 */
  showDelete?: boolean;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// 기본 옵션
// ============================================================================

const DEFAULT_STATUS_ACTIONS: BulkAction[] = [
  { value: 'publish', label: '발행' },
  { value: 'private', label: '비공개' },
  { value: 'draft', label: '임시저장' },
];

const DEFAULT_CATEGORY_ACTIONS: BulkAction[] = [
  { value: 'cat-news', label: '소식' },
  { value: 'cat-policy', label: '정책' },
  { value: 'cat-project', label: '사업안내' },
  { value: 'cat-recruit', label: '채용' },
  { value: 'cat-etc', label: '기타' },
];

// ============================================================================
// BulkActionsBar 블록
// ============================================================================

export function BulkActionsBar({
  selectedCount,
  onAction,
  onSelectAll,
  onDeselectAll,
  statusActions = DEFAULT_STATUS_ACTIONS,
  categoryActions = DEFAULT_CATEGORY_ACTIONS,
  showDelete = true,
  className,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-krds-primary-base/20 bg-krds-primary-base/5 px-4 py-3',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        className
      )}
      role="toolbar"
      aria-label="일괄 작업"
    >
      {/* 선택 개수 */}
      <Badge variant="primary" className="font-medium">
        {selectedCount}개 선택됨
      </Badge>

      {/* 전체 선택 / 해제 */}
      <div className="flex gap-1 border-r border-krds-gray-20 pr-3">
        <Button variant="ghost" size="sm" onClick={onSelectAll}>
          전체 선택
        </Button>
        <Button variant="ghost" size="sm" onClick={onDeselectAll}>
          <X className="mr-1 h-3.5 w-3.5" />
          해제
        </Button>
      </div>

      {/* 상태 변경 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            상태 변경
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusActions.map((action) => (
            <DropdownMenuItem
              key={action.value}
              onClick={() => onAction?.(action.value)}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 카테고리 변경 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            카테고리 변경
            <ChevronDown className="ml-1 h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categoryActions.map((action) => (
            <DropdownMenuItem
              key={action.value}
              onClick={() => onAction?.(action.value)}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 삭제 */}
      {showDelete && (
        <Button
          variant="outline"
          size="sm"
          className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onAction?.('delete')}
        >
          <Trash2 className="mr-1 h-3.5 w-3.5" />
          삭제
        </Button>
      )}
    </div>
  );
}
