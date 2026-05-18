# @hanui/react

## 1.0.0

### Major Changes

- 6f5dc8b: # Major Bundle Optimization and Accessibility Improvements

  ## Bundle Optimization (70% size reduction)
  - **BREAKING**: Move Radix UI packages to peerDependencies
  - **BREAKING**: Move lucide-react to peerDependencies
  - Move shiki to optionalDependencies (Code component only)
  - Add @tanstack/react-table and swiper as optional peerDependencies
  - Update vite.config.ts with regex patterns for better tree-shaking

  ## Accessibility Improvements (WCAG 2.1 AA)

  ### React
  - Fix Input clear/password toggle keyboard accessibility (remove tabIndex=-1)
  - Add focus-visible styles to Input action buttons

  ### Vue
  - Add focus trapping to Modal and AlertDialog components
  - Implement arrow key navigation for RadioGroup (ARIA compliant)
  - Auto-focus first element when modal opens
  - Restore focus when modal closes

  ## Migration Guide

  Users upgrading to this version must install peer dependencies:

  ```bash
  # Install all Radix UI packages
  pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip @radix-ui/react-visually-hidden

  # Install other peer dependencies
  pnpm add lucide-react tailwindcss

  # Optional: Install if using specific components
  pnpm add @tanstack/react-table  # For DataTable
  pnpm add swiper  # For Carousel
  pnpm add shiki  # For Code component with syntax highlighting
  ```

  Or use the CLI to auto-install dependencies:

  ```bash
  npx hanui add button  # CLI will prompt to install missing dependencies
  ```

### Minor Changes

- # Visx 기반 차트 4종 추가

  새 차트 컴포넌트 4종을 `@hanui/react/charts` 서브패스로 제공한다. 차트를 안 쓰는 사용자는 visx 의존성을 설치할 필요 없다.

  ## 추가된 컴포넌트
  - **BarChart** — 수직·수평 바 차트
  - **LineChart** — linear·monotone·step 곡선 선 차트
  - **AreaChart** — 영역 채움 차트 (linear·monotone)
  - **PieChart / DonutChart** — 파이·도넛 차트

  ## 공통 기능
  - KRDS 색상 토큰 자동 적용 (`colors` prop으로 오버라이드 가능)
  - 반응형: `width` 미지정 시 `@visx/responsive`의 `ParentSize`로 부모 너비 자동
  - 접근성: SVG `role="img"`, `aria-label`, 데이터별 `role="listitem"`, KWCAG 2.2 대체 데이터 표 토글 (`showTableToggle`)

  ## 사용법

  ```ts
  import { BarChart, type ChartDatum } from '@hanui/react/charts';

  const data: ChartDatum[] = [
    { label: '서울', value: 1000 },
    { label: '부산', value: 800 },
  ];

  <BarChart data={data} title="도시별 수치" unit="명" height={260} />
  ```

  ## 의존성

  `@visx/*` 8개 패키지를 `peerDependenciesMeta.optional`로 추가. 차트를 쓰려는 사용자만 설치하면 됨.

  ```bash
  pnpm add @visx/axis @visx/curve @visx/group @visx/responsive @visx/scale @visx/shape @visx/text @visx/tooltip
  ```

  ## 제거된 것

  기존 `Chart` 컴포넌트(`@hanui/react`의 SVG 직접 구현)는 제거됨. 새 차트로 교체 권장.

## 0.2.0

### Minor Changes

- feat: KRDS 컴포넌트 추가
  - Critical Alerts: 긴급 공지 컴포넌트 (Lucide 아이콘)
  - Tag: SelectableTag, RemovableTag, TagGroup
  - Steps: Compound Component 패턴 + useSteps 훅
  - StepIndicator: 단계 표시기
  - Calendar: 날짜 선택 컴포넌트
  - DateInput: 날짜 입력 필드
  - Disclosure: 아코디언/토글
  - VisuallyHidden: 접근성 유틸리티
  - Carousel: HeroCarousel, ContentCarousel, PreviewCarousel

## 0.1.2

### Patch Changes

- 287d7b6: feat: Header 컴포넌트 Tailwind 버전을 기본으로 변경
  - HeaderWithMegaMenu, HeaderWithNavigation: Tailwind 버전이 기본 export
  - HeaderWithMegaMenuScss, HeaderWithNavigationScss: SCSS 버전 별도 export
