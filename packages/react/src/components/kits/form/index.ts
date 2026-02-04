/**
 * Form Kit
 * 고급 폼 기능 키트 - React Hook Form + Zod 기반
 *
 * @description
 * Schema 기반 폼 빌더, 다단계 폼, 자동 저장 폼 등
 * 고급 폼 기능을 제공하는 키트입니다.
 *
 * @requires react-hook-form
 * @requires zod
 * @requires @hookform/resolvers
 */

// ============================================================================
// Form Builder
// ============================================================================

export {
  FormBuilder,
  FormBuilderField,
  FormSection,
  FormActions,
} from './form-builder';

export type {
  FormBuilderProps,
  FormBuilderFieldProps,
  FormSectionProps,
  FormActionsProps,
} from './form-builder';

// ============================================================================
// Multi-Step Form
// ============================================================================

export {
  MultiStepForm,
  MultiStepFormStepContent,
  useMultiStepFormContext,
} from './multi-step-form';

export type {
  MultiStepFormStep,
  MultiStepFormProps,
  MultiStepFormStepProps,
  MultiStepFormContextValue,
} from './multi-step-form';

// ============================================================================
// Auto-Save Form
// ============================================================================

export {
  AutoSaveForm,
  AutoSaveStatus,
  AutoSaveFormProvider,
  useAutoSaveContext,
  useAutoSaveIndicator,
} from './auto-save-form';

export type {
  SaveStatus,
  AutoSaveFormProps,
  AutoSaveStatusProps,
  AutoSaveFormProviderProps,
  UseAutoSaveIndicatorOptions,
  UseAutoSaveIndicatorReturn,
} from './auto-save-form';

// ============================================================================
// Hooks
// ============================================================================

export {
  useFormBuilder,
  useAutoSave,
  useMultiStepForm,
} from './use-form-builder';

export type {
  FormFieldConfig,
  UseFormBuilderOptions,
  UseFormBuilderReturn,
  UseAutoSaveOptions,
  UseAutoSaveReturn,
  UseMultiStepFormOptions,
  UseMultiStepFormReturn,
} from './use-form-builder';

// ============================================================================
// Validation Schemas
// ============================================================================

export {
  // Messages
  validationMessages,
  // Basic schemas
  requiredString,
  emailSchema,
  optionalEmailSchema,
  // Phone schemas
  mobilePhoneSchema,
  optionalMobilePhoneSchema,
  phoneSchema,
  // Date schemas
  dateStringSchema,
  dateSchema,
  dateRangeSchema,
  // Password schemas
  passwordSchema,
  createPasswordConfirmSchema,
  // Korean ID schemas
  residentNumberSchema,
  businessNumberSchema,
  corporateNumberSchema,
  // Address schemas
  postalCodeSchema,
  addressSchema,
  // Terms schemas
  requiredTermsSchema,
  createTermsSchema,
  // File schemas
  createFileSchema,
  // Utility functions
  formatPhoneNumber,
  formatBusinessNumber,
  formatResidentNumber,
  // Composite schemas
  userInfoSchema,
  contactSchema,
} from './validation-schemas';

export type {
  UserInfoFormData,
  ContactFormData,
  AddressFormData,
} from './validation-schemas';
