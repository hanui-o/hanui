'use client';

/**
 * Form Kit - FormBuilder Component
 * Schema 기반 폼 빌더 컴포넌트
 */

import * as React from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
} from '@/components/form-field';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Select } from '@/components/select';
import { Checkbox } from '@/components/checkbox';
import { RadioGroup, Radio } from '@/components/radio';
import type { FormFieldConfig } from './use-form-builder';

// ============================================================================
// 타입 정의
// ============================================================================

export interface FormBuilderProps<T extends FieldValues> {
  /** react-hook-form 인스턴스 */
  form: UseFormReturn<T>;
  /** 필드 설정 배열 */
  fields: FormFieldConfig<T>[];
  /** 폼 제출 핸들러 */
  onSubmit: (data: T) => void | Promise<void>;
  /** 폼 ID */
  id?: string;
  /** 추가 className */
  className?: string;
  /** 필드 간격 */
  gap?: 'sm' | 'md' | 'lg';
  /** 레이아웃 */
  layout?: 'vertical' | 'horizontal';
  /** 제출 버튼 렌더링 */
  renderSubmit?: (props: {
    isSubmitting: boolean;
    isValid: boolean;
    isDirty: boolean;
  }) => React.ReactNode;
  /** 폼 푸터 렌더링 */
  renderFooter?: (props: {
    isSubmitting: boolean;
    isValid: boolean;
    isDirty: boolean;
  }) => React.ReactNode;
  /** 폼 속성 */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  /** 필드 감싸기 컴포넌트 */
  fieldWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

export interface FormBuilderFieldProps<T extends FieldValues> {
  /** 필드 설정 */
  field: FormFieldConfig<T>;
  /** react-hook-form 인스턴스 */
  form: UseFormReturn<T>;
  /** 레이아웃 */
  layout?: 'vertical' | 'horizontal';
}

// ============================================================================
// FormBuilderField 컴포넌트
// ============================================================================

/**
 * 개별 폼 필드 렌더링 컴포넌트
 */
export function FormBuilderField<T extends FieldValues>({
  field: fieldConfig,
  form,
  layout = 'vertical',
}: FormBuilderFieldProps<T>) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = form;

  const {
    name,
    label,
    type,
    placeholder,
    helperText,
    required,
    disabled,
    readOnly,
    options,
    className,
    hidden,
    size = 'md',
  } = fieldConfig;

  // 숨김 조건 처리
  const values = watch();
  const isHidden =
    typeof hidden === 'function' ? hidden(values as T) : hidden;

  if (isHidden) {
    return null;
  }

  // 에러 가져오기
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;
  const hasError = !!error;

  // 필드 ID 생성
  const fieldId = `field-${String(name)}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  // 접근성 속성
  const ariaProps = {
    'aria-invalid': hasError ? true : undefined,
    'aria-describedby':
      [hasError ? errorId : undefined, helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined,
    'aria-required': required ? true : undefined,
  };

  // 필드 렌더링
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={fieldId}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            status={hasError ? 'error' : undefined}
            {...register(name)}
            {...ariaProps}
          />
        );

      case 'select':
        return (
          <Select
            options={options || []}
            value={getValues(name) as string}
            onChange={(value) => setValue(name, value as T[Path<T>])}
            placeholder={placeholder}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            size={size}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            id={fieldId}
            label={label}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
            size={size}
            checked={watch(name) as boolean}
            onCheckedChange={(checked) =>
              setValue(name, checked as T[Path<T>])
            }
            {...ariaProps}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            value={getValues(name) as string}
            onValueChange={(value) => setValue(name, value as T[Path<T>])}
            disabled={disabled}
            status={hasError ? 'error' : undefined}
          >
            {options?.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            id={fieldId}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            status={hasError ? 'error' : undefined}
            size={size}
            {...register(name)}
            {...ariaProps}
          />
        );
    }
  };

  // 체크박스는 레이블을 별도로 렌더링하지 않음
  if (type === 'checkbox') {
    return (
      <FormField
        id={fieldId}
        status={hasError ? 'error' : undefined}
        required={required}
        disabled={disabled}
        className={className}
      >
        {renderInput()}
        {hasError && <FormError>{errorMessage}</FormError>}
        {helperText && !hasError && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormField>
    );
  }

  return (
    <FormField
      id={fieldId}
      status={hasError ? 'error' : undefined}
      required={required}
      disabled={disabled}
      className={cn(
        layout === 'horizontal' && 'md:flex md:items-start md:gap-4',
        className
      )}
    >
      <FormLabel
        className={cn(layout === 'horizontal' && 'md:w-40 md:pt-3 md:shrink-0')}
      >
        {label}
      </FormLabel>
      <div className={cn(layout === 'horizontal' && 'md:flex-1')}>
        {renderInput()}
        {hasError && <FormError>{errorMessage}</FormError>}
        {helperText && !hasError && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </div>
    </FormField>
  );
}

FormBuilderField.displayName = 'FormBuilderField';

// ============================================================================
// FormBuilder 컴포넌트
// ============================================================================

/**
 * Schema 기반 폼 빌더 컴포넌트
 *
 * 필드 설정 배열을 기반으로 자동으로 폼을 생성합니다.
 * - label과 input 자동 연결
 * - 에러 시 aria-describedby 자동 설정
 * - 필수 필드 aria-required 자동 설정
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * const fields: FormFieldConfig<z.infer<typeof schema>>[] = [
 *   { name: 'email', label: '이메일', type: 'email', required: true },
 *   { name: 'password', label: '비밀번호', type: 'password', required: true },
 * ];
 *
 * function LoginForm() {
 *   const form = useFormBuilder({ schema, defaultValues: { email: '', password: '' } });
 *
 *   return (
 *     <FormBuilder
 *       form={form}
 *       fields={fields}
 *       onSubmit={async (data) => { await login(data); }}
 *       renderSubmit={({ isSubmitting }) => (
 *         <Button type="submit" disabled={isSubmitting}>
 *           {isSubmitting ? '로그인 중...' : '로그인'}
 *         </Button>
 *       )}
 *     />
 *   );
 * }
 * ```
 */
export function FormBuilder<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  id,
  className,
  gap = 'md',
  layout = 'vertical',
  renderSubmit,
  renderFooter,
  formProps,
  fieldWrapper: FieldWrapper,
}: FormBuilderProps<T>) {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = form;

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(onSubmit)(e);
  };

  const submitProps = { isSubmitting, isValid, isDirty };

  return (
    <form
      id={id}
      onSubmit={handleFormSubmit}
      className={cn('flex flex-col', gapClasses[gap], className)}
      noValidate
      {...formProps}
    >
      {fields.map((fieldConfig) => {
        const fieldElement = (
          <FormBuilderField
            key={String(fieldConfig.name)}
            field={fieldConfig}
            form={form}
            layout={layout}
          />
        );

        if (FieldWrapper) {
          return (
            <FieldWrapper key={String(fieldConfig.name)}>
              {fieldElement}
            </FieldWrapper>
          );
        }

        return fieldElement;
      })}

      {renderSubmit && <div className="mt-2">{renderSubmit(submitProps)}</div>}
      {renderFooter && <div className="mt-4">{renderFooter(submitProps)}</div>}
    </form>
  );
}

FormBuilder.displayName = 'FormBuilder';

// ============================================================================
// FormSection 컴포넌트
// ============================================================================

export interface FormSectionProps {
  /** 섹션 제목 */
  title: string;
  /** 섹션 설명 */
  description?: string;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}

/**
 * 폼 섹션 컴포넌트
 *
 * 관련 필드를 그룹화하는 fieldset 역할을 합니다.
 */
export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <fieldset className={cn('border-none p-0 m-0', className)}>
      <legend className="sr-only">{title}</legend>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-krds-gray-90">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-krds-gray-60">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

FormSection.displayName = 'FormSection';

// ============================================================================
// FormActions 컴포넌트
// ============================================================================

export interface FormActionsProps {
  /** 자식 요소 (버튼 등) */
  children: React.ReactNode;
  /** 정렬 */
  align?: 'left' | 'center' | 'right' | 'between';
  /** 추가 className */
  className?: string;
}

/**
 * 폼 액션 버튼 그룹 컴포넌트
 */
export function FormActions({
  children,
  align = 'right',
  className,
}: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={cn('flex gap-3 mt-6', alignClasses[align], className)}>
      {children}
    </div>
  );
}

FormActions.displayName = 'FormActions';
