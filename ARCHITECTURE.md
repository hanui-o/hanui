# HANUI Architecture

> Radix UI 기반 + shadcn/ui 배포 모델 전환 완료 ✅

## 📁 프로젝트 구조

```
hanui/
├── packages/
│   ├── react/                    # Radix UI 기반 컴포넌트 소스 저장소
│   │   └── src/
│   │       ├── components/
│   │       │   └── button.tsx    # ✅ KRDS + Radix UI Slot 패턴
│   │       └── lib/
│   │           └── utils.ts      # cn() 유틸리티 함수
│   │
│   ├── cli/                      # shadcn/ui 스타일 CLI 도구
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   │   ├── init.ts      # npx hanui init
│   │   │   │   └── add.ts       # npx hanui add <component>
│   │   │   ├── utils/
│   │   │   │   ├── registry.ts  # Registry 데이터 처리
│   │   │   │   └── installer.ts # 의존성 설치
│   │   │   ├── index.ts         # create-hanui-app (기존)
│   │   │   └── hanui.ts         # hanui CLI (신규) ⭐
│   │   └── package.json
│   │
│   └── registry/                 # 컴포넌트 메타데이터
│       ├── schema.json           # Registry 스키마 정의
│       └── registry.json         # 컴포넌트 메타데이터
│
└── apps/
    └── docs/                     # 문서 사이트
        └── components/
            └── hanui/
                └── button.tsx    # 문서용 (동일한 소스)
```

---

## 🎯 핵심 개념

### 1. **Radix UI Primitives 기반**

모든 컴포넌트는 Radix UI를 기반으로 구축하여 접근성을 자동으로 보장합니다:

```tsx
// ✅ Button Component (packages/react/src/components/button.tsx)
import * as Slot from '@radix-ui/react-slot';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';
    return <Comp {...props} ref={ref} />;
  }
);
```

**장점:**

- ✅ ARIA 속성 자동 처리
- ✅ 키보드 네비게이션 자동 구현
- ✅ 포커스 관리 자동화
- ✅ WCAG 2.1 AA 준수

### 2. **shadcn/ui 배포 모델**

패키지 설치가 아닌 **소스 코드 복사** 방식:

```bash
# ❌ 기존 방식 (패키지 의존성)
npm install @hanui/react

# ✅ 새로운 방식 (소스 코드 복사)
npx hanui init
npx hanui add button
```

**장점:**

- ✅ 사용자가 컴포넌트 완전히 소유
- ✅ 버전 의존성 문제 없음
- ✅ 프로젝트별 자유로운 커스터마이징
- ✅ 번들 크기 최적화

### 3. **Registry 시스템**

컴포넌트 메타데이터를 중앙 관리:

```json
// packages/registry/registry.json
{
  "button": {
    "name": "button",
    "type": "component",
    "description": "KRDS-compliant accessible button",
    "dependencies": [
      "@radix-ui/react-slot@^1.1.0",
      "class-variance-authority@^0.7.0"
    ],
    "files": [
      {
        "path": "button.tsx",
        "type": "component",
        "target": "components/hanui/button.tsx"
      }
    ]
  }
}
```

---

## 🚀 사용 방법

### Step 1: 프로젝트 초기화

```bash
npx hanui init
```

이 명령어는:

1. `components/hanui/` 디렉토리 생성
2. `lib/utils.ts` 생성 (cn 함수)
3. `hanui.json` 설정 파일 생성
4. Tailwind CSS 설정 안내

### Step 2: 컴포넌트 추가

```bash
# 단일 컴포넌트
npx hanui add button

# 여러 컴포넌트
npx hanui add button modal select

# 인터랙티브 선택
npx hanui add
```

### Step 3: 사용

```tsx
import { Button } from '@/components/hanui/button';

export default function Page() {
  return <Button variant="primary">클릭</Button>;
}
```

---

## 📦 컴포넌트 개발 워크플로우

### 1. 새 컴포넌트 추가

1. **Radix UI 기반으로 구현**

   ```bash
   packages/react/src/components/modal.tsx
   ```

2. **Registry에 등록**

   ```json
   // packages/registry/registry.json
   {
     "modal": {
       "name": "modal",
       "dependencies": ["@radix-ui/react-dialog@^1.0.0"],
       "files": [{ "path": "modal.tsx", "type": "component" }]
     }
   }
   ```

3. **CLI 빌드**
   ```bash
   cd packages/cli
   pnpm build
   ```

### 2. 컴포넌트 테스트

```bash
# docs 앱에서 테스트
cd apps/docs
npx hanui add modal
```

---

## 🎨 컴포넌트 우선순위

### Priority 1 (완료)

- [x] **Button** - Radix UI Slot 기반 ✅

### Priority 1 (진행 예정)

- [ ] **Modal/Dialog** - `@radix-ui/react-dialog`
- [ ] **Select** - `@radix-ui/react-select`

### Priority 2

- [ ] Accordion - `@radix-ui/react-accordion`
- [ ] Tabs - `@radix-ui/react-tabs`
- [ ] Dropdown Menu - `@radix-ui/react-dropdown-menu`
- [ ] Popover - `@radix-ui/react-popover`
- [ ] Tooltip - `@radix-ui/react-tooltip`

### Priority 3

- [ ] Checkbox - `@radix-ui/react-checkbox`
- [ ] Radio Group - `@radix-ui/react-radio-group`
- [ ] Switch - `@radix-ui/react-switch`
- [ ] Slider - `@radix-ui/react-slider`

---

## 📚 관련 문서

- [GitHub Issue #7](https://github.com/hanui-o/hanui/issues/7) - 프로젝트 전환 마스터 이슈
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [shadcn/ui Source Code](https://github.com/shadcn-ui/ui)
- [KRDS Design System](https://www.design.go.kr/)

---

## 🔧 개발 환경 설정

### CLI 개발

```bash
cd packages/cli
pnpm dev        # 개발 모드 (watch)
pnpm build      # 프로덕션 빌드
```

### 로컬 테스트

```bash
# CLI를 전역으로 링크
cd packages/cli
npm link

# 테스트 프로젝트에서 사용
cd /path/to/test-project
hanui init
hanui add button
```

---

## ⚠️ Breaking Changes

이 전환은 기존 사용자에게 Breaking Change입니다:

### 기존 방식 (v0.0.x)

```bash
npm install @hanui/react
```

```tsx
import { Button } from '@hanui/react';
```

### 새로운 방식 (v0.1.x+)

```bash
npx hanui add button
```

```tsx
import { Button } from '@/components/hanui/button';
```

### 마이그레이션 가이드

1. `@hanui/react` 패키지 제거
2. `npx hanui init` 실행
3. 필요한 컴포넌트 `npx hanui add` 로 추가
4. import 경로 변경

---

## 🎯 다음 단계

1. **Modal 컴포넌트 Radix 기반 재구축**
2. **Select 컴포넌트 Radix 기반 재구축**
3. **문서 사이트 업데이트** (새로운 사용법 반영)
4. **CLI 도구 배포** (npm publish)
5. **Registry 호스팅** (GitHub Pages or CDN)

---

**이 아키텍처는 접근성과 유연성을 동시에 확보하여 글로벌 공공 웹 시장을 선도하는 UI 프레임워크로 성장하기 위한 기반입니다.** 🚀
