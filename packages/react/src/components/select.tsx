import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';

/**
 * Select Option Interface
 */
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Select Props Interface
 */
export interface SelectProps<T = string> {
  /**
   * Options list
   */
  options: SelectOption<T>[];

  /**
   * Selected value (or values for multiple)
   */
  value?: T | T[];

  /**
   * Change handler
   */
  onChange?: (value: T | T[]) => void;

  /**
   * Enable search/filter functionality
   * @default false
   */
  searchable?: boolean;

  /**
   * Allow multiple selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Custom option renderer
   */
  renderOption?: (option: SelectOption<T>) => React.ReactNode;

  /**
   * Label for the select
   */
  label?: string;
}

/**
 * Get display value
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
 * Remove value from array
 */
function removeValue<T>(values: T[], valueToRemove: T): T[] {
  return values.filter((v) => v !== valueToRemove);
}

/**
 * Select Component (Basic - Radix UI Select)
 *
 * KRDS-compliant select using Radix UI Select with full accessibility
 * Note: Multiple selection and searchable are not supported by Radix UI Select
 */
function BasicSelect<T = string>({
  options,
  value,
  onChange,
  multiple = false,
  placeholder,
  disabled = false,
  error = false,
  className,
  renderOption,
  label,
}: Omit<SelectProps<T>, 'searchable'>) {
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
          <label className="block text-[15px] leading-[150%] font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left text-gray-400">
          <span className="block truncate">
            {getDisplayValue(options, selectedValue, multiple, placeholder)}
          </span>
        </div>
        <p className="mt-1 text-xs text-red-600">
          Multiple selection is not yet supported with Radix UI Select
        </p>
      </div>
    );
  }

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
      disabled={disabled}
    >
      <div className={cn('relative', className)}>
        {label && (
          <label className="block text-[15px] leading-[150%] font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <SelectPrimitive.Trigger
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-[17px] leading-[150%] shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[#256ef4] focus:ring-offset-2',
            error
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400',
            disabled && 'cursor-not-allowed bg-gray-50 text-gray-400',
            'data-[placeholder]:text-gray-500'
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder || '선택하세요'}>
            {currentValue !== undefined
              ? options.find((opt) => opt.value === currentValue)?.label
              : null}
          </SelectPrimitive.Value>
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-[17px] leading-[150%] shadow-md',
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
                    'focus:bg-[#256ef4] focus:text-white',
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
 * Select Component (Searchable)
 *
 * Note: Radix UI Select does not support searchable functionality natively.
 * This is a placeholder that shows a warning and falls back to basic select.
 */
function SearchableSelect<T = string>({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  className,
  renderOption,
  label,
}: Omit<SelectProps<T>, 'searchable' | 'multiple'>) {
  React.useEffect(() => {
    console.warn(
      'Select: Radix UI Select does not support searchable functionality. Using basic select instead.'
    );
  }, []);

  // Fallback to basic select
  return (
    <BasicSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      className={className}
      renderOption={renderOption}
      label={label}
    />
  );
}

/**
 * Select Component
 *
 * Unified Select component that switches between Listbox and Combobox based on searchable prop
 *
 * @example
 * ```tsx
 * // Basic Select
 * <Select
 *   options={[
 *     { value: '1', label: '서울' },
 *     { value: '2', label: '부산' }
 *   ]}
 *   value={value}
 *   onChange={setValue}
 * />
 *
 * // Searchable Select
 * <Select
 *   options={cities}
 *   value={value}
 *   onChange={setValue}
 *   searchable
 *   placeholder="도시 검색..."
 * />
 *
 * // Multiple Select
 * <Select
 *   options={cities}
 *   value={values}
 *   onChange={setValues}
 *   multiple
 * />
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
