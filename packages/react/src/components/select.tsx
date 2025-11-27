import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { useFormField } from './form-field';

/**
 * Select 옵션 인터페이스
 */
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Select Props 인터페이스
 */
export interface SelectProps<T = string> {
  /**
   * 옵션 목록
   */
  options: SelectOption<T>[];

  /**
   * 선택된 값
   */
  value?: T;

  /**
   * 값 변경 핸들러
   */
  onChange?: (value: T) => void;

  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 에러 상태
   * @deprecated status="error" 사용 권장
   */
  error?: boolean;

  /**
   * 상태 (error: 에러, success: 성공, info: 정보)
   */
  status?: 'error' | 'success' | 'info';

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 커스텀 옵션 렌더러
   */
  renderOption?: (option: SelectOption<T>) => React.ReactNode;

  /**
   * Select 레이블
   * @deprecated FormLabel 컴포넌트 사용 권장
   */
  label?: string;
}

/**
 * Select 컴포넌트
 *
 * KRDS 준수 Select 컴포넌트 (Radix UI Select 기반, 완전한 접근성 제공)
 *
 * @example
 * ```tsx
 * // 기본 Select (독립 사용)
 * <Select
 *   options={[
 *     { value: '1', label: '서울' },
 *     { value: '2', label: '부산' }
 *   ]}
 *   value={value}
 *   onChange={setValue}
 *   placeholder="도시를 선택하세요"
 * />
 *
 * // FormField와 함께 사용 (권장)
 * <FormField id="city" required status="error">
 *   <FormLabel>도시</FormLabel>
 *   <Select
 *     options={cities}
 *     value={value}
 *     onChange={setValue}
 *     placeholder="도시를 선택하세요"
 *   />
 *   <FormError>도시를 선택해주세요</FormError>
 * </FormField>
 * ```
 */
export function Select<T = string>({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  status,
  className,
  renderOption,
  label,
}: SelectProps<T>) {
  // FormField 컨텍스트 (선택적)
  let formField: ReturnType<typeof useFormField> | null = null;
  try {
    formField = useFormField();
  } catch {
    // FormField 없음, 독립 모드
  }

  // 최종 status 결정 (우선순위: Select status > FormField status > error prop)
  const finalStatus =
    status || formField?.status || (error ? 'error' : undefined);
  const hasError = finalStatus === 'error';

  // disabled, id 결정
  const finalDisabled = formField?.disabled || disabled;
  const finalId = formField?.id;

  const handleValueChange = (newValue: string) => {
    onChange?.(newValue as T);
  };

  const stringValue = value !== undefined ? String(value) : undefined;

  return (
    <SelectPrimitive.Root
      value={stringValue}
      onValueChange={handleValueChange}
      disabled={finalDisabled}
    >
      <div className={cn('relative', className)}>
        {label && (
          <label className="block text-krds-body-sm leading-[150%] font-medium text-krds-gray-70 mb-1">
            {label}
          </label>
        )}

        <SelectPrimitive.Trigger
          id={finalId}
          aria-invalid={hasError ? true : undefined}
          aria-required={formField?.required || undefined}
          aria-describedby={
            [formField?.errorId, formField?.helperId]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={cn(
            'flex h-14 w-full items-center justify-between rounded-md border bg-krds-white pl-4 pr-12 py-2 text-krds-body-lg leading-[150%] shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
            hasError
              ? 'border-krds-danger-60 focus:ring-krds-danger-60'
              : 'border-krds-gray-60 hover:border-krds-gray-40',
            finalDisabled &&
              'cursor-not-allowed bg-krds-gray-5 text-krds-gray-40',
            'data-[placeholder]:text-krds-gray-50'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder || '선택하세요'} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-krds-white text-krds-body-md leading-[150%] shadow-md',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
            )}
            position="popper"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 outline-none',
                    'focus:bg-krds-primary-60 focus:text-krds-white',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    option.disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2 flex w-4 items-center justify-center">
                    <CheckIcon className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>
                    {renderOption ? renderOption(option) : option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </div>
    </SelectPrimitive.Root>
  );
}

Select.displayName = 'Select';
