# Claude Rules

## 작업 전 선행 작업 안내

사용자가 작업을 요청할 때, 빠뜨리거나 잘못할 수 있는 선행 작업이 있으면 작업 시작 전에 반드시 알려준다.

예시:

- "사이트맵 만들자" → 요구사항 정의, 사용자 유형 정리가 선행되어야 함을 안내
- "와이어프레임 만들자" → 사이트맵이 먼저 확정되어야 함을 안내
- "코드 작업하자" → 기획/디자인이 확정되었는지 확인

사용자의 요청을 거부하는 것이 아니라, "이 작업 전에 이런 것도 필요한데, 같이 할까요?" 형태로 제안한다.

## 작업 순서 조정 제안

사용자가 "이거 해보자"라고 했을 때, 현재 진행 중인 작업 흐름상 다른 작업을 먼저 해야 한다면 적극적으로 순서 변경을 제안한다.

예시:

- "와이어프레임 만들자" → 사이트맵이 아직 확정 안 됐다면 "사이트맵 먼저 확정하고 와이어프레임 하는 게 좋을 것 같은데, 사이트맵부터 할까요?"
- "어드민 코드 작성하자" → 퍼블릭 기획이 안 끝났다면 "퍼블릭 기획 먼저 마무리하고 어드민 넘어가는 게 좋을 것 같아요"

단, 사용자가 순서를 바꾸겠다고 하면 그대로 따른다.

## 프로젝트 컨텍스트

### hanui CMS

- 공공기관 입찰(무응찰 소규모) 타겟의 범용 CMS
- 기획서: Notion "hanui CMS 기획" (https://www.notion.so/31b600de613681ef9d54ea74eba6949d)

### 기술 스택

- 디자인 시스템: KRDS(정부 표준) 기반 + hanui(React 컴포넌트)
- 프론트엔드: Next.js x 2 (퍼블릭 + 어드민) 모노레포
- 백엔드: 전자정부프레임워크 v5 (Spring Boot)
- DB: PostgreSQL + MyBatis
- 에디터: Tiptap (분할 화면 미리보기, velog 스타일)
- 배포: Docker (온프레미스 우선)

### 작업 순서

기획 → 프론트(퍼블릭, 어드민) 제작 → 백엔드

### 핵심 컨셉

- 담당자가 직접 운영 (인라인 편집 + 게시글 에디터)
- 페이지 디자인/레이아웃은 개발자가 납품 시 세팅, 담당자는 내용만 관리
- 콘텐츠 작성 시 접근성 실시간 자동 검사
- 대시보드에서 성과보고서 자동 생성 (PDF/엑셀)

### 1차 범위 (Phase 1-A ~ 4)

- Phase 1-A (MVP): 로그인, 게시판 CRUD, 고정 페이지 편집(일반 에디터), 파일 업로드, 사이트 설정, 휴지통
- Phase 1-B: 인라인 편집, 분할 미리보기, 예약발행, 상단고정, 대시보드
- Phase 2: 접근성 검사, 대시보드 인사이트, HWP/PDF 뷰어
- Phase 3: 보안/운영
- Phase 4: 입찰 준비

### 다음 차수 (Phase 5)

AI 글쓰기 도우미, 긴급공지 모드, 게시글 템플릿, 승인 워크플로우(옵션)

## hanui 컴포넌트 구분 체계

### Component (기본 컴포넌트)

- **위치**: `packages/react/src/components/*.tsx`
- **파일 구조**: 단일 파일
- **역할**: UI의 원자 단위. 하나의 역할만 수행
- **의존성**: 최소 (radix-ui, lucide-react, CVA)
- **상태 관리**: 없음 (부모가 관리)
- **비즈니스 로직**: 없음. 순수 프레젠테이션
- **Props**: HTML 속성 확장 (variant, size 등 UI 중심)
- **예시**: Button, Input, Card, Modal, Table, Header, Footer

### Block (기능 블록)

- **위치**: `packages/react/src/components/blocks/*.tsx`
- **파일 구조**: 단일 파일
- **역할**: 여러 Component를 조합한 완성된 UI 패턴
- **의존성**: 다른 Component들을 import하여 조합
- **상태 관리**: 로컬만 (useState)
- **비즈니스 로직**: 가벼운 로직 (폼 제출 등)
- **Props**: 도메인 중심 (onSubmit, title, showForgotPassword 등)
- **예시**: LoginForm, EmptyState, StatsCard, SearchBar, ErrorPage

### Kit (기능 키트)

- **위치**: `packages/react/src/kits/*`, `packages/react/src/components/kits/*`
- **파일 구조**: 폴더 (types, api, hooks, store, components 분리)
- **역할**: 특정 도메인의 완전한 기능 집합
- **의존성**: 매우 높음 (axios, React Query, Zustand, Zod 등)
- **상태 관리**: 전역 (Zustand) + 서버 상태 (React Query)
- **비즈니스 로직**: API 통신, 캐싱, 검증, 에러 처리 모두 포함
- **Props**: 도메인 Props + 내부에서 hooks/store 직접 사용
- **예시**: Board Kit (게시판 CRUD), Authentication Kit, Dashboard Kit

### 구분 기준 요약

```
Component: 단일 파일 / UI만 / 상태 없음 / 어디서든 재사용
    ↓ 조합
Block: 단일 파일 / Component 조합 / 로컬 상태 / Props로 제어
    ↓ 확장
Kit: 폴더 구조 / API+상태+훅 포함 / 도메인 완전 기능 / API 주소만 바꾸면 사용
```

## 코드 패턴 (새 컴포넌트/블록/킷 작성 시 반드시 따를 것)

### Component 코드 패턴

```tsx
'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

// 1) CVA variants 정의 (KRDS 토큰 사용)
const exampleVariants = cva('기본 클래스들', {
  variants: {
    variant: { primary: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

// 2) Props: HTML 속성 확장 + VariantProps
export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {
  // 추가 props
}

// 3) forwardRef + displayName
export const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(exampleVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Example.displayName = 'Example';

// 4) Named export (default export 사용 안 함)
export { exampleVariants };
```

### Block 코드 패턴

```tsx
'use client';
import * as React from 'react';
// 상대경로로 컴포넌트 import
import { Card, CardHeader, CardBody } from '../card';
import { Button } from '../button';
import { cn } from '@/lib/utils';

// 1) JSDoc 주석으로 Props 설명
export interface ExampleBlockProps {
  /** 폼 제출 핸들러 */
  onSubmit?: (data: { field: string }) => void;
  /** 추가 className */
  className?: string;
  /** 제목 */
  title?: string;
}

// 2) 함수형 컴포넌트 (forwardRef 미사용)
export function ExampleBlock({
  onSubmit,
  className,
  title = '기본 제목',
}: ExampleBlockProps) {
  // 3) useState로 로컬 상태만
  const [field, setField] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ field });
  };

  return <Card className={cn('...', className)}>{/* Component 조합 */}</Card>;
}
```

### Kit 폴더 구조 패턴

```
kits/[kit-name]/
├── index.ts              # 공개 API (영역별 그룹 export)
├── types/[name].ts       # 도메인 타입 (엔티티, 응답, 파라미터, 에러)
├── api/[name].ts         # Axios 인스턴스 + CRUD 함수
├── hooks/use[Name].ts    # React Query 훅 (queryKeys 계층화)
├── store/[name]Store.ts  # Zustand store + 셀렉터
└── components/           # Kit 전용 컴포넌트
    ├── [Name]List.tsx
    ├── [Name]Detail.tsx
    └── [Name]Form.tsx
```

### 데모 페이지 패턴 (문서 사이트)

```
위치: apps/docs/src/app/[components|blocks|kits]/[name]/page.tsx
레이아웃: DocsContentLayout (사이드바 + 메인 + 목차)
```

```tsx
'use client';
import {
  Heading,
  PageSection,
  ComponentPreview,
  FrameworkCodeBlock,
  Installation,
} from '@/components/content';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@hanui/react';
import { ExampleComponent } from '@hanui/react';

export default function ExamplePage() {
  return (
    <>
      <Heading level="h1" title="Example" description="설명" />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <PageSection>
            <ComponentPreview>
              <ExampleComponent />
            </ComponentPreview>
          </PageSection>
          <PageSection>
            <FrameworkCodeBlock reactCode="..." />
          </PageSection>
          <Installation componentName="example" />
        </TabsContent>
      </Tabs>
    </>
  );
}
```

### Registry 등록 패턴

```
위치: packages/registry/registry.json
```

```json
{
  "example": {
    "name": "example",
    "type": "ui|block|kit",
    "description": "설명",
    "dependencies": ["npm 패키지들"],
    "registryDependencies": ["hanui 내부 컴포넌트들"],
    "files": [{ "path": "components/example.tsx", "type": "component" }]
  }
}
```

### 핵심 규칙

- `'use client'` 최상단 필수
- Named export만 (default export 금지)
- KRDS 색상 토큰 사용 (`krds-primary-*`, `krds-gray-*`)
- `cn()` 유틸로 className 병합
- 접근성: aria 속성, 키보드 네비게이션, 개발 환경 경고
- 컴포넌트 상대경로 import (`../card`), 유틸은 절대경로 (`@/lib/utils`)
- **hanui 사이트(docs 등) 작업 시 기존 hanui 컴포넌트/블록을 우선 사용** — 직접 HTML/Tailwind로 만들지 말고 `@hanui/react`에서 import
