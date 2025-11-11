import { Combobox, Listbox, Transition } from '@headlessui/react';
import * as React from 'react';
import { cn } from '../../lib/utils';

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
 * Select Component (Basic - Listbox)
 *
 * KRDS-compliant select using Headless UI Listbox with full accessibility
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

  // Group options by group property
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, SelectOption<T>[]> = {};
    const ungrouped: SelectOption<T>[] = [];

    options.forEach((option) => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [options]);

  const handleChange = (newValue: T | T[]) => {
    onChange?.(newValue);
  };

  const handleRemoveTag = (valueToRemove: T) => {
    if (multiple && Array.isArray(selectedValue)) {
      const newValues = removeValue(selectedValue as T[], valueToRemove);
      onChange?.(newValues as T[] & T);
    }
  };

  return (
    <Listbox
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      multiple={multiple as false}
    >
      {({ open }) => (
        <div className={cn('relative', className)}>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </Listbox.Label>
          )}

          {/* Selected tags for multiple selection */}
          {multiple &&
            Array.isArray(selectedValue) &&
            selectedValue.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedValue.map((val) => {
                  const option = options.find((opt) => opt.value === val);
                  if (!option) return null;
                  return (
                    <span
                      key={String(val)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(val);
                        }}
                        className="hover:text-blue-900"
                        aria-label={`${option.label} 제거`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

          <Listbox.Button
            className={cn(
              'relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#256ef4] focus:border-transparent',
              error
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 hover:border-gray-400',
              disabled && 'cursor-not-allowed bg-gray-50 text-gray-400'
            )}
          >
            <span className="block truncate">
              {getDisplayValue(options, selectedValue, multiple, placeholder)}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {/* Ungrouped options */}
              {groupedOptions.ungrouped.map((option) => (
                <Listbox.Option
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      active ? 'bg-[#256ef4] text-white' : 'text-gray-900',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={cn(
                          'block truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {renderOption ? renderOption(option) : option.label}
                      </span>
                      {selected && (
                        <span
                          className={cn(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-[#256ef4]'
                          )}
                        >
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}

              {/* Grouped options */}
              {Object.entries(groupedOptions.groups).map(
                ([groupName, groupOptions]) => (
                  <React.Fragment key={groupName}>
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                      {groupName}
                    </div>
                    {groupOptions.map((option) => (
                      <Listbox.Option
                        key={String(option.value)}
                        value={option.value}
                        disabled={option.disabled}
                        className={({ active }) =>
                          cn(
                            'relative cursor-pointer select-none py-2 pl-6 pr-9',
                            active
                              ? 'bg-[#256ef4] text-white'
                              : 'text-gray-900',
                            option.disabled && 'cursor-not-allowed opacity-50'
                          )
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={cn(
                                'block truncate',
                                selected && 'font-semibold'
                              )}
                            >
                              {renderOption
                                ? renderOption(option)
                                : option.label}
                            </span>
                            {selected && (
                              <span
                                className={cn(
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                  active ? 'text-white' : 'text-[#256ef4]'
                                )}
                              >
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </React.Fragment>
                )
              )}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

/**
 * Select Component (Searchable - Combobox)
 *
 * KRDS-compliant searchable select using Headless UI Combobox
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
  const [query, setQuery] = React.useState('');

  const filteredOptions = React.useMemo(() => {
    if (query === '') return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const handleChange = (newValue: T | T[] | null) => {
    if (newValue !== null && !Array.isArray(newValue)) {
      onChange?.(newValue);
    }
  };

  return (
    <Combobox value={value} onChange={handleChange} disabled={disabled}>
      {({ open }) => (
        <div className={cn('relative', className)}>
          {label && (
            <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </Combobox.Label>
          )}

          <div className="relative">
            <Combobox.Input
              className={cn(
                'w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-[#256ef4] focus:border-transparent',
                error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
                disabled && 'cursor-not-allowed bg-gray-50 text-gray-400'
              )}
              displayValue={(val: T) => {
                const option = options.find((opt) => opt.value === val);
                return option?.label || '';
              }}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder || '검색...'}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Combobox.Button>
          </div>

          <Transition
            show={open}
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  검색 결과가 없습니다.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={String(option.value)}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active }) =>
                      cn(
                        'relative cursor-pointer select-none py-2 pl-3 pr-9',
                        active ? 'bg-[#256ef4] text-white' : 'text-gray-900',
                        option.disabled && 'cursor-not-allowed opacity-50'
                      )
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn(
                            'block truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          {renderOption ? renderOption(option) : option.label}
                        </span>
                        {selected && (
                          <span
                            className={cn(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-[#256ef4]'
                            )}
                          >
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      )}
    </Combobox>
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
