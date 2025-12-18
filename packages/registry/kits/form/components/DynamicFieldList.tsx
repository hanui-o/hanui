// Form Kit - DynamicFieldList Component
// 동적 필드 목록 컴포넌트

'use client';

import { Button, Input, Label } from '@hanui/react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface DynamicFieldItem {
  id: string;
  [key: string]: unknown;
}

interface FieldConfig {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email';
}

interface DynamicFieldListProps<T extends DynamicFieldItem> {
  items: T[];
  fields: FieldConfig[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<T, 'id'>>) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  canAdd: boolean;
  canRemove: boolean;
  addLabel?: string;
  emptyMessage?: string;
  maxItems?: number;
}

export function DynamicFieldList<T extends DynamicFieldItem>({
  items,
  fields,
  onAdd,
  onRemove,
  onUpdate,
  onMove,
  canAdd,
  canRemove,
  addLabel = '추가',
  emptyMessage = '항목이 없습니다',
  maxItems,
}: DynamicFieldListProps<T>) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 text-krds-gray-50 border border-dashed border-krds-gray-30 rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex items-start gap-3 p-4 border border-krds-gray-20 rounded-lg bg-white"
            >
              {/* 드래그 핸들 */}
              {onMove && (
                <button
                  type="button"
                  className="mt-1 cursor-grab text-krds-gray-40 hover:text-krds-gray-60"
                  aria-label="순서 변경"
                >
                  <GripVertical className="w-5 h-5" />
                </button>
              )}

              {/* 필드들 */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    {field.label && (
                      <Label
                        htmlFor={`${item.id}-${field.name}`}
                        className="text-xs"
                      >
                        {field.label}
                      </Label>
                    )}
                    <Input
                      id={`${item.id}-${field.name}`}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={String(item[field.name] ?? '')}
                      onChange={(e) =>
                        onUpdate(item.id, {
                          [field.name]:
                            field.type === 'number'
                              ? Number(e.target.value)
                              : e.target.value,
                        } as Partial<Omit<T, 'id'>>)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* 삭제 버튼 */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                disabled={!canRemove}
                className="mt-1"
                aria-label="항목 삭제"
              >
                <Trash2 className="w-4 h-4 text-krds-danger-base" />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* 추가 버튼 */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          disabled={!canAdd}
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </Button>

        {maxItems && (
          <span className="text-sm text-krds-gray-50">
            {items.length} / {maxItems}
          </span>
        )}
      </div>
    </div>
  );
}
