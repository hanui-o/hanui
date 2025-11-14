import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Form Field Context
 *
 * Provides automatic ID generation and connection between
 * label, input, description, and error message
 */
interface FormFieldContextValue {
  id: string;
  name?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null
);

/**
 * Hook to access form field context
 */
function useFormField() {
  const context = React.useContext(FormFieldContext);

  if (!context) {
    throw new Error('useFormField must be used within FormField');
  }

  return context;
}

/**
 * FormField Props Interface
 */
export interface FormFieldProps {
  /**
   * Field name (for form submission)
   */
  name?: string;

  /**
   * Error state
   */
  error?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Required state
   */
  required?: boolean;

  /**
   * Children components (FormLabel, Input, FormError, etc.)
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}

/**
 * FormField Component
 *
 * Wraps form inputs with automatic accessibility connections
 *
 * @example
 * ```tsx
 * <FormField name="email" error={!!errors.email} required>
 *   <FormLabel>이메일</FormLabel>
 *   <Input type="email" />
 *   <FormDescription>회사 이메일을 입력하세요</FormDescription>
 *   {errors.email && <FormError>{errors.email}</FormError>}
 * </FormField>
 * ```
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      name,
      error = false,
      disabled = false,
      required = false,
      children,
      className,
    },
    ref
  ) => {
    // Generate unique ID using React 18's useId hook
    const generatedId = React.useId();
    const id = name ? `form-field-${name}` : generatedId;

    const contextValue: FormFieldContextValue = {
      id,
      name,
      error,
      disabled,
      required,
    };

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div ref={ref} className={cn('space-y-2', className)}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormField.displayName = 'FormField';

/**
 * FormLabel Props Interface
 */
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Children (label text)
   */
  children: React.ReactNode;
}

/**
 * FormLabel Component
 *
 * Automatically connects to the input via htmlFor
 */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { id, required, error } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          'block text-[15px] leading-[150%] font-medium',
          error ? 'text-red-600' : 'text-gray-700',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-red-500" aria-label="필수">
            *
          </span>
        )}
      </label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

/**
 * FormDescription Props Interface
 */
export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description text
   */
  children: React.ReactNode;
}

/**
 * FormDescription Component
 *
 * Provides help text for the input field
 * Automatically connected via aria-describedby
 */
export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, children, ...props }, ref) => {
  const { id } = useFormField();

  return (
    <p
      ref={ref}
      id={`${id}-description`}
      className={cn('text-[13px] leading-[150%] text-gray-600', className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormDescription.displayName = 'FormDescription';

/**
 * FormError Props Interface
 */
export interface FormErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Error message
   */
  children: React.ReactNode;
}

/**
 * FormError Component
 *
 * Displays error message
 * Automatically connected via aria-describedby and aria-live for screen readers
 */
export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => {
    const { id } = useFormField();

    return (
      <p
        ref={ref}
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={cn(
          'text-[13px] leading-[150%] text-red-600 font-medium',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormError.displayName = 'FormError';

/**
 * FormMessage Props Interface
 */
export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Message text
   */
  children?: React.ReactNode;
}

/**
 * FormMessage Component
 *
 * Generic message component (can be used for errors or info)
 */
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  const { id, error } = useFormField();

  if (!children) return null;

  return (
    <p
      ref={ref}
      id={`${id}-message`}
      role={error ? 'alert' : undefined}
      aria-live={error ? 'polite' : undefined}
      className={cn(
        'text-[13px] leading-[150%]',
        error ? 'text-red-600 font-medium' : 'text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

/**
 * Hook to get aria-describedby IDs
 *
 * Used by form inputs to connect to description and error messages
 */
export function useFormFieldIds() {
  const { id } = useFormField();

  return {
    inputId: id,
    descriptionId: `${id}-description`,
    errorId: `${id}-error`,
    messageId: `${id}-message`,
  };
}

/**
 * Hook to get form field props for inputs
 *
 * Returns all necessary props for accessible form inputs
 */
export function useFormFieldProps() {
  const { name, error, disabled, required } = useFormField();
  const ids = useFormFieldIds();

  return {
    id: ids.inputId,
    name,
    'aria-invalid': error,
    'aria-required': required,
    disabled,
  };
}
