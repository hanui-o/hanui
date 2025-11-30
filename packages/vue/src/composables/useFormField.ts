import type { InjectionKey } from 'vue';

export interface FormFieldContext {
  id: string;
  status?: 'error' | 'success' | 'info';
  disabled?: boolean;
  required?: boolean;
  errorId?: string;
  helperId?: string;
}

export const FormFieldContextKey: InjectionKey<FormFieldContext> =
  Symbol('FormFieldContext');
