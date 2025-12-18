// Form Kit - Types
// 폼 관련 타입 정의

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'date';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface MultiStepFormData {
  currentStep: number;
  totalSteps: number;
  data: Record<string, unknown>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface FileUploadState {
  file: File | null;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export interface DynamicFieldItem {
  id: string;
  [key: string]: unknown;
}
