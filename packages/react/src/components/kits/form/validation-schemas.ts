/**
 * Form Kit - Validation Schemas
 * 한국 공공 웹사이트용 공통 Zod 유효성 검사 스키마
 */

import { z } from 'zod';

// ============================================================================
// 기본 유효성 검사 메시지
// ============================================================================

export const validationMessages = {
  required: '필수 입력 항목입니다',
  email: '올바른 이메일 형식이 아닙니다',
  phone: '올바른 전화번호 형식이 아닙니다',
  mobilePhone: '올바른 휴대폰 번호 형식이 아닙니다',
  date: '올바른 날짜 형식이 아닙니다',
  minLength: (min: number) => `최소 ${min}자 이상 입력해주세요`,
  maxLength: (max: number) => `최대 ${max}자까지 입력 가능합니다`,
  min: (min: number) => `${min} 이상의 값을 입력해주세요`,
  max: (max: number) => `${max} 이하의 값을 입력해주세요`,
  pattern: '올바른 형식이 아닙니다',
  url: '올바른 URL 형식이 아닙니다',
  passwordMismatch: '비밀번호가 일치하지 않습니다',
  terms: '약관에 동의해주세요',
  file: {
    required: '파일을 선택해주세요',
    size: (maxMB: number) => `파일 크기는 ${maxMB}MB 이하여야 합니다`,
    type: '지원하지 않는 파일 형식입니다',
  },
} as const;

// ============================================================================
// 기본 스키마
// ============================================================================

/**
 * 필수 문자열 스키마
 */
export const requiredString = z.string().min(1, validationMessages.required);

/**
 * 이메일 스키마
 */
export const emailSchema = z
  .string()
  .min(1, validationMessages.required)
  .email(validationMessages.email);

/**
 * 선택적 이메일 스키마
 */
export const optionalEmailSchema = z
  .string()
  .email(validationMessages.email)
  .optional()
  .or(z.literal(''));

// ============================================================================
// 한국 전화번호 스키마
// ============================================================================

/**
 * 휴대폰 번호 정규식 (010-XXXX-XXXX 또는 01X-XXX-XXXX)
 */
const mobilePhoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

/**
 * 일반 전화번호 정규식 (0X-XXX-XXXX 또는 0XX-XXX-XXXX)
 */
const phoneRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

/**
 * 휴대폰 번호 스키마
 */
export const mobilePhoneSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(mobilePhoneRegex, validationMessages.mobilePhone);

/**
 * 선택적 휴대폰 번호 스키마
 */
export const optionalMobilePhoneSchema = z
  .string()
  .regex(mobilePhoneRegex, validationMessages.mobilePhone)
  .optional()
  .or(z.literal(''));

/**
 * 전화번호 스키마 (유선 + 휴대폰)
 */
export const phoneSchema = z
  .string()
  .min(1, validationMessages.required)
  .refine(
    (val) => mobilePhoneRegex.test(val) || phoneRegex.test(val),
    validationMessages.phone
  );

// ============================================================================
// 날짜 스키마
// ============================================================================

/**
 * 날짜 문자열 스키마 (YYYY-MM-DD)
 */
export const dateStringSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{4}-\d{2}-\d{2}$/, validationMessages.date);

/**
 * 날짜 객체 스키마
 */
export const dateSchema = z.date({
  required_error: validationMessages.required,
  invalid_type_error: validationMessages.date,
});

/**
 * 날짜 범위 스키마
 */
export const dateRangeSchema = z
  .object({
    startDate: dateSchema,
    endDate: dateSchema,
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: '종료일은 시작일 이후여야 합니다',
    path: ['endDate'],
  });

// ============================================================================
// 비밀번호 스키마
// ============================================================================

/**
 * 기본 비밀번호 스키마 (최소 8자, 영문/숫자/특수문자 조합)
 */
export const passwordSchema = z
  .string()
  .min(8, validationMessages.minLength(8))
  .max(20, validationMessages.maxLength(20))
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    '영문, 숫자, 특수문자를 모두 포함해야 합니다'
  );

/**
 * 비밀번호 확인 스키마 생성 함수
 */
export const createPasswordConfirmSchema = (passwordField = 'password') =>
  z
    .object({
      [passwordField]: passwordSchema,
      passwordConfirm: z.string().min(1, validationMessages.required),
    })
    .refine((data) => data[passwordField] === data.passwordConfirm, {
      message: validationMessages.passwordMismatch,
      path: ['passwordConfirm'],
    });

// ============================================================================
// 한국 고유 식별자 스키마
// ============================================================================

/**
 * 주민등록번호 스키마 (형식만 검증, 유효성 검증은 별도)
 */
export const residentNumberSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{6}-?\d{7}$/, '올바른 주민등록번호 형식이 아닙니다');

/**
 * 사업자등록번호 스키마
 */
export const businessNumberSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{3}-?\d{2}-?\d{5}$/, '올바른 사업자등록번호 형식이 아닙니다');

/**
 * 법인등록번호 스키마
 */
export const corporateNumberSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{6}-?\d{7}$/, '올바른 법인등록번호 형식이 아닙니다');

// ============================================================================
// 주소 스키마
// ============================================================================

/**
 * 우편번호 스키마 (5자리)
 */
export const postalCodeSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{5}$/, '올바른 우편번호 형식이 아닙니다');

/**
 * 주소 스키마
 */
export const addressSchema = z.object({
  postalCode: postalCodeSchema,
  address: requiredString,
  addressDetail: z.string().optional(),
});

// ============================================================================
// 동의 스키마
// ============================================================================

/**
 * 필수 동의 스키마
 */
export const requiredTermsSchema = z.literal(true, {
  errorMap: () => ({ message: validationMessages.terms }),
});

/**
 * 약관 동의 스키마 생성 함수
 */
export const createTermsSchema = (requiredTerms: string[]) => {
  const schema: Record<string, z.ZodLiteral<true> | z.ZodBoolean> = {};
  requiredTerms.forEach((term) => {
    schema[term] = requiredTermsSchema;
  });
  return z.object(schema);
};

// ============================================================================
// 파일 스키마
// ============================================================================

/**
 * 파일 스키마 생성 함수
 */
export const createFileSchema = (options?: {
  maxSizeMB?: number;
  allowedTypes?: string[];
  required?: boolean;
}) => {
  const { maxSizeMB = 10, allowedTypes, required = true } = options ?? {};
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  let schema = z.instanceof(File);

  if (required) {
    schema = schema.refine((file) => file.size > 0, {
      message: validationMessages.file.required,
    });
  }

  schema = schema.refine((file) => file.size <= maxSizeBytes, {
    message: validationMessages.file.size(maxSizeMB),
  });

  if (allowedTypes && allowedTypes.length > 0) {
    schema = schema.refine((file) => allowedTypes.includes(file.type), {
      message: validationMessages.file.type,
    });
  }

  return required ? schema : schema.optional();
};

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 전화번호 포맷팅 (하이픈 추가)
 */
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  if (numbers.length <= 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

/**
 * 사업자등록번호 포맷팅 (하이픈 추가)
 */
export const formatBusinessNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
};

/**
 * 주민등록번호 포맷팅 (하이픈 추가)
 */
export const formatResidentNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 6) return numbers;
  return `${numbers.slice(0, 6)}-${numbers.slice(6, 13)}`;
};

// ============================================================================
// 스키마 조합 유틸리티
// ============================================================================

/**
 * 공통 사용자 정보 스키마
 */
export const userInfoSchema = z.object({
  name: requiredString.max(50, validationMessages.maxLength(50)),
  email: emailSchema,
  phone: mobilePhoneSchema,
});

/**
 * 공통 연락처 스키마
 */
export const contactSchema = z.object({
  name: requiredString,
  email: emailSchema,
  phone: phoneSchema,
  message: requiredString.max(1000, validationMessages.maxLength(1000)),
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
