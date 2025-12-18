// Settings Kit - SettingsSection Component
// 설정 섹션 컴포넌트

'use client';

import {
  Card,
  Switch,
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectItem,
} from '@hanui/react';
import type {
  SettingGroup,
  SettingItem,
  SettingOption,
} from '../types/settings';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <section className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-krds-gray-90">{title}</h3>
        {description && (
          <p className="text-sm text-krds-gray-60 mt-1">{description}</p>
        )}
      </div>
      <Card>
        <div className="divide-y divide-krds-gray-10">{children}</div>
      </Card>
    </section>
  );
}

interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsRow({
  label,
  description,
  children,
  className,
}: SettingsRowProps) {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <div className="flex-1 mr-4">
        <span className="text-sm font-medium text-krds-gray-90">{label}</span>
        {description && (
          <p className="text-xs text-krds-gray-50 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

interface SettingsToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function SettingsToggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: SettingsToggleProps) {
  return (
    <SettingsRow label={label} description={description}>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={label}
      />
    </SettingsRow>
  );
}

interface SettingsSelectProps {
  label: string;
  description?: string;
  value: string;
  options: SettingOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SettingsSelect({
  label,
  description,
  value,
  options,
  onChange,
  disabled,
}: SettingsSelectProps) {
  return (
    <SettingsRow label={label} description={description}>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        aria-label={label}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </SettingsRow>
  );
}

interface SettingsRadioGroupProps {
  label: string;
  description?: string;
  value: string;
  options: SettingOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SettingsRadioGroup({
  label,
  description,
  value,
  options,
  onChange,
  disabled,
}: SettingsRadioGroupProps) {
  return (
    <div className="p-4">
      <div className="mb-3">
        <span className="text-sm font-medium text-krds-gray-90">{label}</span>
        {description && (
          <p className="text-xs text-krds-gray-50 mt-0.5">{description}</p>
        )}
      </div>
      <RadioGroup value={value} onValueChange={onChange} disabled={disabled}>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-start gap-3">
              <Radio value={option.value} id={`radio-${option.value}`} />
              <label
                htmlFor={`radio-${option.value}`}
                className="flex-1 cursor-pointer"
              >
                <span className="text-sm text-krds-gray-90">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-krds-gray-50 mt-0.5">
                    {option.description}
                  </p>
                )}
              </label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

interface SettingsInputProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export function SettingsInput({
  label,
  description,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled,
  required,
  error,
}: SettingsInputProps) {
  return (
    <div className="p-4">
      <div className="mb-2">
        <label className="text-sm font-medium text-krds-gray-90">
          {label}
          {required && <span className="text-krds-danger-base ml-1">*</span>}
        </label>
        {description && (
          <p className="text-xs text-krds-gray-50 mt-0.5">{description}</p>
        )}
      </div>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-label={label}
        className={error ? 'border-krds-danger-base' : ''}
      />
      {error && <p className="text-xs text-krds-danger-base mt-1">{error}</p>}
    </div>
  );
}
