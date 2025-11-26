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
   * 선택된 값 (다중 선택 시 배열)
   */
  value?: T | T[];

  /**
   * 값 변경 핸들러
   */
  onChange?: (value: T | T[]) => void;

  /**
   * 검색/필터 기능 활성화
   * @default false
   */
  searchable?: boolean;

  /**
   * 다중 선택 허용
   * @default false
   */
  multiple?: boolean;

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
 * 표시 값 가져오기
 */
function getDisplayValue<T>(
  options: SelectOption<T>[],
  value: T | T[] | undefined,
  multiple: boolean,
  placeholder?: string
): string {
  if (value === undefined || (Array.isArray(value) && value.length === 0)) {
    return placeholder || '선택하세요';
  }

  if (multiple && Array.isArray(value)) {
    const selectedOptions = options.filter((opt) => value.includes(opt.value));
    if (selectedOptions.length === 0) return placeholder || '선택하세요';
    return `${selectedOptions.length}개 선택됨`;
  }

  const selectedOption = options.find((opt) => opt.value === value);
  return selectedOption?.label || placeholder || '선택하세요';
}

/**
 * 배열에서 값 제거
 */
function removeValue<T>(values: T[], valueToRemove: T): T[] {
  return values.filter((v) => v !== valueToRemove);
}

/**
 * Select 컴포넌트 (기본 - Radix UI Select)
 *
 * KRDS 준수 Select 컴포넌트 (Radix UI Select 기반, 완전한 접근성 제공)
 * 참고: Radix UI Select는 다중 선택 및 검색 기능을 지원하지 않음
 */
function BasicSelect<T = string>({
  options,
  value,
  onChange,
  multiple = false,
  placeholder,
  disabled = false,
  error = false,
  status,
  className,
  renderOption,
  label,
}: Omit<SelectProps<T>, 'searchable'>) {
  // FormField 컨텍스트 (선택적)
  let formField: ReturnType<typeof useFormField> | null = null;
  try {
    formField = useFormField();
  } catch {
    // FormField 없음, 독립 모드
  }

  const selectedValue = value ?? (multiple ? [] : undefined);

  // Warn if multiple is used (Radix UI Select doesn't support multiple)
  React.useEffect(() => {
    if (multiple) {
      console.warn(
        'Select: Radix UI Select does not support multiple selection. Please use a different approach or wait for future implementation.'
      );
    }
  }, [multiple]);

  // For multiple, show warning and return placeholder
  if (multiple) {
    return (
      <div className={cn('relative', className)}>
        {label && (
          <label className="block text-[15px] leading-[150%] font-medium text-krds-gray-70 mb-1">
            {label}
          </label>
        )}
        <div className="relative w-full cursor-not-allowed rounded-md border border-krds-gray-30 bg-krds-gray-5 py-2 pl-3 pr-10 text-left text-krds-gray-40">
          <span className="block truncate">
            {getDisplayValue(options, selectedValue, multiple, placeholder)}
          </span>
        </div>
        <p className="mt-1 text-xs text-krds-danger-text">
          Multiple selection is not yet supported with Radix UI Select
        </p>
      </div>
    );
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

  const currentValue = selectedValue as T | undefined;
  const stringValue =
    currentValue !== undefined ? String(currentValue) : undefined;

  return (
    <SelectPrimitive.Root
      value={stringValue}
      onValueChange={handleValueChange}
      disabled={finalDisabled}
    >
      <div className={cn('relative', className)}>
        {label && (
          <label className="block text-[15px] leading-[150%] font-medium text-krds-gray-70 mb-1">
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
            'flex h-10 w-full items-center justify-between rounded-md border bg-krds-white px-3 py-2 text-[17px] leading-[150%] shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-krds-primary-60 focus:ring-offset-2',
            hasError
              ? 'border-krds-danger-60 focus:ring-krds-danger-60'
              : 'border-krds-gray-30 hover:border-krds-gray-40',
            finalDisabled &&
              'cursor-not-allowed bg-krds-gray-5 text-krds-gray-40',
            'data-[placeholder]:text-krds-gray-50'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder || '선택하세요'} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-krds-white text-[17px] leading-[150%] shadow-md',
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

/**
 * Select 컴포넌트 (검색 가능)
 *
 * 참고: Radix UI Select는 기본적으로 검색 기능을 지원하지 않음.
 * 경고를 표시하고 기본 Select로 폴백됨.
 */
function SearchableSelect<T = string>({
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
}: Omit<SelectProps<T>, 'searchable' | 'multiple'>) {
  React.useEffect(() => {
    console.warn(
      'Select: Radix UI Select does not support searchable functionality. Using basic select instead.'
    );
  }, []);

  // 기본 Select로 폴백
  return (
    <BasicSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      status={status}
      className={className}
      renderOption={renderOption}
      label={label}
    />
  );
}

/**
 * Select 컴포넌트
 *
 * Radix UI 기반 접근성을 고려한 선택 목록 컴포넌트
 * FormField와 통합하여 label, error, helper text를 일관되게 관리할 수 있음
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
export function Select<T = string>(props: SelectProps<T>) {
  if (props.searchable) {
    if (props.multiple) {
      console.warn(
        'Select: searchable + multiple is not supported. Using basic multiple select.'
      );
      return <BasicSelect {...props} />;
    }
    return <SearchableSelect {...props} />;
  }

  return <BasicSelect {...props} />;
}

Select.displayName = 'Select';
