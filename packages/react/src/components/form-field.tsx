'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, Info, CircleX } from 'lucide-react';

/**
 * Form Field Context
 * Provides form field state to child components
 */
interface FormFieldContextValue {
  id: string;
  status?: 'error' | 'success' | 'info';
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  errorId?: string;
  helperId?: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null
);

const useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      'Form components must be used within a FormField component'
    );
  }
  return context;
};

/**
 * Optional version of useFormField that returns null if not within FormField
 * Use this for components that can work both standalone and within FormField
 */
const useFormFieldOptional = () => {
  return React.useContext(FormFieldContext);
};

/**
 * FormField Props
 */
export interface FormFieldProps {
  /**
   * Unique identifier for the form field
   */
  id?: string;

  /**
   * Status state
   * Shows visual feedback for different states
   * - error: Shows error styling
   * - success: Shows success styling
   * - info: Shows info styling
   */
  status?: 'error' | 'success' | 'info';

  /**
   * @deprecated Use status="error" instead
   * Error state (kept for backwards compatibility)
   */
  error?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required field
   */
  required?: boolean;

  /**
   * Show clear button when input has value
   */
  clearable?: boolean;

  /**
   * Form field content (Label, Input, Error, Helper)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FormField Component
 * Container for form field components with shared state
 *
 * @example
 * ```tsx
 * <FormField id="email" error={!!errors.email} required>
 *   <FormLabel>이메일</FormLabel>
 *   <Input type="email" placeholder="example@email.com" />
 *   {errors.email && <FormError>{errors.email}</FormError>}
 * </FormField>
 * ```
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      id: providedId,
      status,
      error,
      disabled,
      required,
      clearable,
      children,
      className,
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = providedId || generatedId;

    // Determine final status (backwards compatibility with error prop)
    const finalStatus = status || (error ? 'error' : undefined);
    const hasError = finalStatus === 'error';

    const errorId = hasError ? `${id}-error` : undefined;
    const helperId = `${id}-helper`;

    return (
      <FormFieldContext.Provider
        value={{
          id,
          status: finalStatus,
          error: hasError,
          disabled,
          required,
          clearable,
          errorId,
          helperId,
        }}
      >
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = 'FormField';

/**
 * FormLabel Props
 */
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormLabel Component
 * Label for form field with automatic htmlFor binding
 *
 * @example
 * ```tsx
 * <FormLabel>이메일</FormLabel>
 * ```
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, ...props }, ref) => {
    const { id, required } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          'text-[17px] font-medium text-krds-gray-90 leading-[140%]',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <>
            <span className="text-krds-danger-50 ml-1" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(필수)</span>
          </>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

/**
 * FormError Props
 */
export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormError Component
 * Error message for form field
 *
 * @example
 * ```tsx
 * <FormError>이메일 형식이 올바르지 않습니다</FormError>
 * ```
 */
export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ children, className, ...props }, ref) => {
    const { errorId } = useFormField();

    return (
      <div
        ref={ref}
        id={errorId}
        className={cn(
          'flex items-center gap-1 text-[15px] text-krds-danger-60 leading-[150%]',
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <span className="text-krds-danger-60 shrink-0" aria-hidden="true">
          <CircleX className="w-4 h-4" />
        </span>
        <span>{children}</span>
      </div>
    );
  }
);

FormError.displayName = 'FormError';

/**
 * FormHelperText Props
 */
export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormHelperText Component
 * Helper text for form field
 *
 * @example
 * ```tsx
 * <FormHelperText>example@email.com 형식으로 입력하세요</FormHelperText>
 * ```
 */
export const FormHelperText = React.forwardRef<
  HTMLDivElement,
  FormHelperTextProps
>(({ children, className, ...props }, ref) => {
  const { helperId, status } = useFormField();

  // Get status-based color
  const getStatusColor = () => {
    if (status === 'error') return 'text-krds-danger-60';
    if (status === 'success') return 'text-krds-success-60';
    if (status === 'info') return 'text-krds-info-60';
    return 'text-krds-gray-70';
  };

  // Get status-based icon
  const getStatusIcon = () => {
    if (status === 'success') return <Check className="w-4 h-4" />;
    if (status === 'info') return <Info className="w-4 h-4" />;
    return null;
  };

  const icon = getStatusIcon();

  return (
    <div
      ref={ref}
      id={helperId}
      className={cn(
        'text-[15px] leading-[150%]',
        icon ? 'flex items-center gap-1' : '',
        getStatusColor(),
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn('shrink-0', getStatusColor())} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
});

FormHelperText.displayName = 'FormHelperText';

/**
 * Export useFormField for advanced usage
 */
export { useFormField, useFormFieldOptional };
