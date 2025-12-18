'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import {
  Code,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  List,
  ListItem,
} from '@hanui/react';

// 타입 정의 코드
const typeCode = `import { z } from 'zod'

// 기본 폼 스키마
export const basicFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, '올바른 전화번호를 입력해주세요'),
  message: z.string().min(10, '최소 10자 이상 입력해주세요'),
})

// 다단계 폼 스키마
export const step1Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, '비밀번호는 8자 이상'),
})

export const step2Schema = z.object({
  name: z.string().min(1),
  phone: z.string(),
  birthDate: z.string(),
})

export const step3Schema = z.object({
  agreeTerms: z.boolean().refine((v) => v, '약관에 동의해주세요'),
  agreePrivacy: z.boolean().refine((v) => v, '개인정보 처리방침에 동의해주세요'),
  agreeMarketing: z.boolean().optional(),
})

// 파일 업로드 스키마
export const fileUploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, '파일을 선택해주세요')
    .refine(
      (files) => files.every((f) => f.size <= 5 * 1024 * 1024),
      '파일 크기는 5MB 이하여야 합니다'
    ),
})

// 동적 필드 스키마
export const dynamicFieldSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ).min(1, '최소 1개 항목을 추가해주세요'),
})`;

// Zustand Store 코드
const storeCode = `import { create } from 'zustand'

interface FormState {
  // 다단계 폼 상태
  currentStep: number
  stepData: Record<number, Record<string, unknown>>

  // 파일 업로드 상태
  uploadProgress: number
  uploadedFiles: File[]

  // Actions
  setStep: (step: number) => void
  saveStepData: (step: number, data: Record<string, unknown>) => void
  resetForm: () => void
  setUploadProgress: (progress: number) => void
  addUploadedFile: (file: File) => void
  removeUploadedFile: (name: string) => void
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 1,
  stepData: {},
  uploadProgress: 0,
  uploadedFiles: [],

  setStep: (currentStep) => set({ currentStep }),
  saveStepData: (step, data) =>
    set((state) => ({
      stepData: { ...state.stepData, [step]: data },
    })),
  resetForm: () => set({ currentStep: 1, stepData: {}, uploadedFiles: [] }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  addUploadedFile: (file) =>
    set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  removeUploadedFile: (name) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((f) => f.name !== name),
    })),
}))`;

// 다단계 폼 예시
const multiStepCode = `'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormStore } from '@/store/formStore'
import { step1Schema, step2Schema, step3Schema } from '@/types/form'

const schemas = [step1Schema, step2Schema, step3Schema]

export function MultiStepForm() {
  const { currentStep, stepData, setStep, saveStepData, resetForm } = useFormStore()
  const schema = schemas[currentStep - 1]

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: stepData[currentStep] || {},
  })

  const onSubmit = (data: Record<string, unknown>) => {
    saveStepData(currentStep, data)

    if (currentStep < 3) {
      setStep(currentStep + 1)
    } else {
      // 최종 제출
      const allData = { ...stepData, [currentStep]: data }
      console.log('제출:', allData)
      resetForm()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 스텝 인디케이터 */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={\`w-8 h-8 rounded-full flex items-center justify-center \${
              step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }\`}
          >
            {step}
          </div>
        ))}
      </div>

      {/* 폼 필드 (현재 스텝에 따라) */}
      {currentStep === 1 && (
        <>
          <input {...form.register('email')} placeholder="이메일" />
          <input {...form.register('password')} type="password" placeholder="비밀번호" />
        </>
      )}
      {currentStep === 2 && (
        <>
          <input {...form.register('name')} placeholder="이름" />
          <input {...form.register('phone')} placeholder="전화번호" />
        </>
      )}
      {currentStep === 3 && (
        <>
          <label>
            <input {...form.register('agreeTerms')} type="checkbox" />
            이용약관 동의
          </label>
          <label>
            <input {...form.register('agreePrivacy')} type="checkbox" />
            개인정보 처리방침 동의
          </label>
        </>
      )}

      <div className="flex gap-2 mt-4">
        {currentStep > 1 && (
          <button type="button" onClick={() => setStep(currentStep - 1)}>
            이전
          </button>
        )}
        <button type="submit">
          {currentStep === 3 ? '제출' : '다음'}
        </button>
      </div>
    </form>
  )
}`;

// 동적 필드 예시
const dynamicFieldCode = `'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { dynamicFieldSchema } from '@/types/form'

type FormData = { items: { name: string; quantity: number; price: number }[] }

export function DynamicFieldForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(dynamicFieldSchema),
    defaultValues: { items: [{ name: '', quantity: 1, price: 0 }] },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onSubmit = (data: FormData) => {
    console.log('제출:', data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <input {...form.register(\`items.\${index}.name\`)} placeholder="상품명" />
          <input
            {...form.register(\`items.\${index}.quantity\`, { valueAsNumber: true })}
            type="number"
            placeholder="수량"
          />
          <input
            {...form.register(\`items.\${index}.price\`, { valueAsNumber: true })}
            type="number"
            placeholder="가격"
          />
          <button type="button" onClick={() => remove(index)}>삭제</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', quantity: 1, price: 0 })}>
        항목 추가
      </button>
      <button type="submit">제출</button>
    </form>
  )
}`;

export default function FormKitPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Form Kit"
        description="폼 키트. 기본 폼, 다단계 폼, 파일 업로드, 동적 필드를 지원합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 기술 스택 */}
          <Section level="h2">
            <Heading level="h2" id="tech-stack" title="기술 스택" />
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline-gray">Zustand</Badge>
              <Badge variant="outline-gray">React Hook Form</Badge>
              <Badge variant="outline-gray">Zod</Badge>
              <Badge variant="outline-gray">TypeScript</Badge>
            </div>
          </Section>

          {/* 기능 */}
          <Section level="h2">
            <Heading level="h2" id="features" title="기능" />
            <List className="mt-4">
              <ListItem>기본 폼 (유효성 검사)</ListItem>
              <ListItem>다단계 폼 (스텝 인디케이터, 데이터 유지)</ListItem>
              <ListItem>
                파일 업로드 (드래그 앤 드롭, 미리보기, 진행률)
              </ListItem>
              <ListItem>동적 필드 (추가/삭제)</ListItem>
              <ListItem>Zod 스키마 기반 유효성 검사</ListItem>
              <ListItem>에러 메시지 자동 표시</ListItem>
            </List>
          </Section>

          {/* 파일 구조 */}
          <Section level="h2">
            <Heading level="h2" id="file-structure" title="파일 구조" />
            <Code variant="block" language="bash">
              {`src/
├── store/
│   └── formStore.ts      # Zustand (폼 상태)
├── components/form/
│   ├── BasicForm.tsx     # 기본 폼
│   ├── MultiStepForm.tsx # 다단계 폼
│   ├── FileUpload.tsx    # 파일 업로드
│   ├── DynamicFields.tsx # 동적 필드
│   └── FormField.tsx     # 재사용 필드 래퍼
├── schemas/
│   └── form.ts           # Zod 스키마
└── types/
    └── form.ts           # 타입 정의`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Heading level="h2" id="installation" title="설치" />

            <Subsection level="h3">
              <Heading level="h3" title="1. 의존성 설치" />
              <Code variant="block" language="bash">
                {`npm install zustand react-hook-form @hookform/resolvers zod`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="2. 코드 복사" />
              <p className="text-krds-gray-70">
                아래 코드 탭에서 필요한 파일들을 복사합니다.
              </p>
            </Subsection>
          </Section>

          {/* 코드 */}
          <Section level="h2">
            <Heading level="h2" id="code" title="코드" />
            <Tabs defaultValue="types">
              <TabsList>
                <TabsTrigger value="types">schemas.ts</TabsTrigger>
                <TabsTrigger value="store">store.ts</TabsTrigger>
                <TabsTrigger value="multistep">MultiStepForm</TabsTrigger>
                <TabsTrigger value="dynamic">DynamicFields</TabsTrigger>
              </TabsList>

              <TabsContent value="types">
                <Code variant="block" language="typescript">
                  {typeCode}
                </Code>
              </TabsContent>
              <TabsContent value="store">
                <Code variant="block" language="typescript">
                  {storeCode}
                </Code>
              </TabsContent>
              <TabsContent value="multistep">
                <Code variant="block" language="tsx">
                  {multiStepCode}
                </Code>
              </TabsContent>
              <TabsContent value="dynamic">
                <Code variant="block" language="tsx">
                  {dynamicFieldCode}
                </Code>
              </TabsContent>
            </Tabs>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />
            <List className="mt-4">
              <ListItem>
                모든 입력 필드에 <Code>label</Code> 연결
              </ListItem>
              <ListItem>
                오류 메시지는 <Code>aria-describedby</Code>로 연결
              </ListItem>
              <ListItem>
                필수 필드에 <Code>aria-required</Code> 적용
              </ListItem>
              <ListItem>
                다단계 폼에서 진행 상태를 <Code>aria-valuenow</Code>로 전달
              </ListItem>
              <ListItem>파일 업로드 영역에 키보드 접근 지원</ListItem>
              <ListItem>동적 필드 추가/삭제 시 포커스 관리</ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 레퍼런스 탭 */}
        <TabsContent value="api">
          {/* Zustand Store */}
          <Section level="h2">
            <Heading level="h2" id="store" title="Zustand Store" />

            <Subsection level="h3">
              <Heading level="h3" title="State" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>currentStep</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>현재 스텝 (다단계 폼)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>stepData</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        Record&lt;number, Record&gt;
                      </Code>
                    </TableCell>
                    <TableCell>각 스텝의 저장된 데이터</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>uploadProgress</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>업로드 진행률 (0-100)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>uploadedFiles</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">File[]</Code>
                    </TableCell>
                    <TableCell>업로드된 파일 목록</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Actions" />
              <Table small className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>함수</TableHead>
                    <TableHead>파라미터</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>setStep</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">step: number</Code>
                    </TableCell>
                    <TableCell>스텝 변경</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>saveStepData</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">step, data</Code>
                    </TableCell>
                    <TableCell>스텝 데이터 저장</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>resetForm</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>폼 초기화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>addUploadedFile</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">file: File</Code>
                    </TableCell>
                    <TableCell>파일 추가</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>removeUploadedFile</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">name: string</Code>
                    </TableCell>
                    <TableCell>파일 제거</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>

          {/* Zod 스키마 */}
          <Section level="h2">
            <Heading level="h2" id="schemas" title="Zod 스키마" />
            <Table small className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>스키마</TableHead>
                  <TableHead>용도</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>basicFormSchema</Code>
                  </TableCell>
                  <TableCell>
                    기본 폼 (이름, 이메일, 전화번호, 메시지)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>step1Schema</Code>
                  </TableCell>
                  <TableCell>다단계 1단계 (이메일, 비밀번호)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>step2Schema</Code>
                  </TableCell>
                  <TableCell>다단계 2단계 (이름, 전화번호, 생년월일)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>step3Schema</Code>
                  </TableCell>
                  <TableCell>다단계 3단계 (약관 동의)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>fileUploadSchema</Code>
                  </TableCell>
                  <TableCell>파일 업로드 (크기 제한 포함)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>dynamicFieldSchema</Code>
                  </TableCell>
                  <TableCell>동적 필드 (상품 목록)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Table Kit', href: '/kits/table' }}
        next={{ title: 'Dashboard Kit', href: '/kits/dashboard' }}
      />
    </>
  );
}
