# 📝 문서 내용 검증 및 품질 체크

모든 문서 페이지(40개)의 내용이 정확하고 1차 오픈에 적합한지 검증합니다.

## 🎯 검증 목표

모든 문서 페이지가 다음 기준을 충족하는지 확인:

- ✅ 컴포넌트 실제 구현과 문서 일치
- ✅ API 레퍼런스 정확성
- ✅ 1차 오픈에 적합한 내용 수준

---

## 📋 검증 체크리스트

### 1️⃣ 컴포넌트 유무 체크

**목적**: 문서화된 모든 컴포넌트가 실제로 존재하는지 확인

**체크 항목**:

- [ ] 문서에 기재된 컴포넌트가 `/packages/react/src/components/` 에 실제로 존재하는가?
- [ ] 컴포넌트 import 경로가 올바른가? (`@hanui/react`에서 export되는가?)
- [ ] Compound Component의 경우 모든 하위 컴포넌트가 존재하는가? (예: `Header.Branding`, `Header.Logo`)
- [ ] 문서에 없지만 존재하는 컴포넌트가 있는가? (누락된 문서)

**검증 방법**:

```bash
# 컴포넌트 존재 확인
ls packages/react/src/components/

# Export 확인
grep "export.*ComponentName" packages/react/src/index.ts
```

---

### 2️⃣ 컴포넌트 API 레퍼런스 정확성 체크

**목적**: 문서의 Props 테이블이 실제 컴포넌트 구현과 일치하는지 확인

**체크 항목**:

- [ ] **Props 이름**: 문서의 prop 이름이 실제 컴포넌트 인터페이스와 동일한가?
- [ ] **타입 정의**: 문서의 타입이 실제 TypeScript 타입과 일치하는가?
- [ ] **기본값**: 문서의 default 값이 실제 컴포넌트 기본값과 동일한가?
- [ ] **필수/선택**: required props가 올바르게 표시되어 있는가?
- [ ] **설명**: prop 설명이 명확하고 정확한가?

**이미 발견된 불일치 (수정 완료)**:

- ✅ **Label**: 문서 `font-weight: bold (700)` → 실제 `font-weight: normal (400)` (수정됨)
- ✅ **FileUpload**: 문서 `onChange: (files: File[])` → 실제 `onChange: (files: UploadedFile[])` (수정됨)

**검증 방법**:

```typescript
// 1. 컴포넌트 파일에서 Props 인터페이스 확인
// 2. 문서 API 테이블과 대조
// 3. 불일치 발견 시 문서 수정
```

**Radix UI 사용 체크**:

```bash
# 컴포넌트가 Radix UI를 사용하는지 확인
grep -r "@radix-ui" packages/react/src/components/ComponentName/
```

- [ ] Radix UI를 사용하는 컴포넌트에 "Radix UI 기능" 섹션이 문서화되어 있는가?
- [ ] Radix UI가 자동으로 제공하는 ARIA 속성이 설명되어 있는가?
- [ ] Radix UI의 기본 키보드 네비게이션이 문서화되어 있는가?
- [ ] Radix UI Props (asChild 등)가 필요한 경우 문서화되어 있는가?

---

### 3️⃣ 1차 오픈 적합성 체크

**목적**: 문서 내용이 1차 오픈 버전에 적합한 수준인지 확인

#### 3-1. 내용 완성도

- [ ] **설치 방법**: CLI 설치 명령어가 정확한가?
- [ ] **기본 설명**: "~란?" 섹션에 컴포넌트의 목적과 용도가 명확히 설명되어 있는가?
- [ ] **예제 코드**: 모든 예제 코드가 동작 가능한가? (import 경로, prop 사용법 등)
- [ ] **사용 방법**: 실제 사용 시나리오가 잘 설명되어 있는가?
- [ ] **모범 사례**: Do/Don't 가이드가 명확한가?

#### 3-2. 접근성 정보

- [ ] WCAG/KWCAG 준수 사항이 명시되어 있는가?
- [ ] 키보드 네비게이션 가이드가 포함되어 있는가?
- [ ] 스크린 리더 지원 사항이 설명되어 있는가?

#### 3-3. KRDS 표준 준수

- [ ] KRDS 필수 ID/클래스가 문서화되어 있는가?
- [ ] KRDS 디자인 원칙이 설명되어 있는가?
- [ ] 정부 서비스 전용 컴포넌트 여부가 명시되어 있는가?

#### 3-4. Foundation Layer 문서화

- [ ] 컴포넌트가 자동으로 처리하는 기능이 명확히 나열되어 있는가?
- [ ] 개발자가 수동으로 관리할 필요가 없는 부분이 설명되어 있는가?

#### 3-5. 코드 품질

- [ ] **코드 예제**: 모든 코드 블록에 올바른 언어 syntax highlight가 적용되어 있는가?
- [ ] **일관성**: 모든 페이지가 동일한 구조를 따르는가? (Tabs > Overview/API)
- [ ] **네비게이션**: PageNavigation의 previous/next 링크가 올바른가?
  - **중요**: 모든 페이지는 **알파벳 순서**로 이전/다음 링크가 설정되어야 함
  - 예: Accordion ← Body → Breadcrumb (올바름)
  - 예: Typography ← Body → Display (잘못됨 - 알파벳 순서가 아님)
  - 아래 "PageNavigation 순서 검증 목록" 참조
- [ ] **타이포**: 오타나 문법 오류가 없는가?

---

### 4️⃣ 추가 검증 항목

#### 누락된 중요 정보 체크

- [ ] **Variant 설명**: 컴포넌트에 variant가 있다면 모든 variant가 문서화되어 있는가?
- [ ] **성능 고려사항**: 성능에 영향을 주는 prop이 있다면 설명되어 있는가?
- [ ] **제약사항**: 사용 시 주의사항이나 제약사항이 명확히 설명되어 있는가?

#### Radix UI 사용 컴포넌트 특별 체크

- [ ] **"Radix UI 기능" 섹션 존재**: API 탭에 Radix UI 기능을 설명하는 별도 섹션이 있는가?
- [ ] **Radix 패키지 명시**: 어떤 Radix UI 패키지를 사용하는지 명시되어 있는가? (예: `@radix-ui/react-tabs`)
- [ ] **자동 ARIA 속성**: Radix UI가 자동으로 추가하는 ARIA 속성이 문서화되어 있는가?
- [ ] **Compound Component 구조**: Radix UI의 Compound Component 패턴이 설명되어 있는가?
- [ ] **Portal 사용**: Portal을 사용하는 컴포넌트의 경우 이에 대한 설명이 있는가?
- [ ] **asChild prop**: asChild prop이 지원되는 경우 문서화되어 있는가?

**Radix UI 사용 컴포넌트 목록** (확인 필요):

- Select (`@radix-ui/react-select`)
- Tabs (`@radix-ui/react-tabs`)
- Tooltip (`@radix-ui/react-tooltip`)
- Modal/Dialog (`@radix-ui/react-dialog`)
- Accordion (`@radix-ui/react-accordion`)
- 기타 Radix 기반 컴포넌트

#### 이미지 및 미디어

- [ ] 예제 이미지가 있다면 적절한 alt 텍스트가 있는가?
- [ ] 플레이스홀더 이미지 URL이 적절한가?

#### 링크 및 참조

- [ ] 외부 링크가 있다면 유효한가?
- [ ] 내부 링크(앵커)가 올바르게 작동하는가?
- [ ] 관련 컴포넌트 참조가 정확한가?

#### SEO 및 메타데이터

- [ ] **페이지 제목**: 각 페이지의 title이 명확하고 검색 최적화되어 있는가?
- [ ] **메타 설명**: description이 컴포넌트의 핵심 기능을 잘 설명하는가?
- [ ] **OG 태그**: Open Graph 태그가 적절히 설정되어 있는가?

#### 브라우저 호환성

- [ ] **주요 브라우저**: Chrome, Safari, Firefox, Edge에서 모두 정상 작동하는가?
- [ ] **모바일 브라우저**: iOS Safari, Chrome Mobile에서 정상 작동하는가?
- [ ] **다크모드**: 라이트/다크 모드 전환 시 스타일이 깨지지 않는가?

#### 성능 최적화

- [ ] **이미지 최적화**: 모든 이미지가 최적화되어 있는가? (WebP, 적절한 해상도)
- [ ] **번들 크기**: 컴포넌트가 불필요하게 큰 번들을 생성하지 않는가?
- [ ] **Lazy Loading**: 큰 컴포넌트나 이미지가 필요한 경우 lazy loading이 적용되어 있는가?
- [ ] **초기 로딩 속도**: 페이지 로드 시간이 3초 이내인가?

#### 실제 사용 시나리오 테스트

- [ ] **복사-붙여넣기 테스트**: 문서의 코드 예제를 복사해서 실제로 동작하는가?
- [ ] **Props 조합 테스트**: 여러 props를 함께 사용했을 때 예상대로 동작하는가?
- [ ] **Edge Case**: 빈 배열, null, undefined 등 극단적인 경우가 문서화되어 있는가?
- [ ] **에러 처리**: 잘못된 props 사용 시 명확한 에러 메시지가 표시되는가?

#### 컴포넌트 기능 테스트 (실제 동작 확인)

- [ ] **인터랙션 테스트**: 클릭, 호버, 포커스 등 모든 인터랙션이 정상 작동하는가?
  - Button: 클릭 시 onClick 이벤트 발생
  - Input: 입력 시 onChange 이벤트 발생, value 업데이트
  - Select: 옵션 선택 시 값 변경
  - Tooltip: 호버 시 툴팁 표시, 포커스 시 표시
  - Modal: 열기/닫기 동작, ESC 키로 닫기, 외부 클릭 시 닫기
  - Tabs: 탭 전환 시 콘텐츠 변경
  - Accordion: 확장/축소 애니메이션
- [ ] **상태 관리**: 컴포넌트 상태가 올바르게 업데이트되는가?
  - Controlled vs Uncontrolled 모드 모두 동작
  - defaultValue vs value 동작 차이 확인
- [ ] **폼 제출**: 폼 컴포넌트가 실제 폼 제출 시 올바르게 동작하는가?
  - Input, Select, FileUpload 등이 폼 제출 시 값 전달
  - 유효성 검사 동작
- [ ] **네비게이션**: 링크/네비게이션 컴포넌트가 올바르게 작동하는가?
  - Link: 클릭 시 페이지 이동
  - MainMenu: 드롭다운 열기/닫기, 마우스 호버, 키보드 네비게이션
  - SideNavigation: 섹션 확장/축소, active 상태 표시
  - Pagination: 페이지 변경 이벤트
  - Breadcrumb: 링크 클릭 시 이동
- [ ] **드롭다운/오버레이**: 드롭다운이 올바르게 열리고 닫히는가?
  - Select: 드롭다운 열기/닫기
  - MainMenu: 서브메뉴 표시/숨김
  - Tooltip: 포지셔닝 (상하좌우 자동 조정)
- [ ] **파일 업로드**: FileUpload 컴포넌트가 정상 동작하는가?
  - 파일 선택 시 onChange 이벤트
  - 다중 파일 업로드
  - 파일 삭제
  - 드래그 앤 드롭 (지원하는 경우)
- [ ] **반응형 동작**: 화면 크기에 따라 동작이 변경되는가?
  - Header: 모바일에서 햄버거 메뉴 표시
  - Responsive 컴포넌트들의 레이아웃 변경
- [ ] **애니메이션**: 모든 애니메이션이 부드럽게 작동하는가?
  - Transition 효과 (fade, slide, zoom)
  - Hover 효과
  - 로딩 애니메이션 (있는 경우)

#### 문서 일관성

- [ ] **용어 통일**: 같은 개념을 설명할 때 동일한 용어를 사용하는가?
  - 예: "누리집" vs "웹사이트", "컴포넌트" vs "요소"
- [ ] **톤앤매너**: 모든 페이지에서 일관된 톤앤매너를 유지하는가?
- [ ] **섹션 순서**: 모든 페이지가 동일한 섹션 순서를 따르는가?
  - Installation → What is it → Preview → Usage → Best Practices → Accessibility → Foundation Layer → API
- [ ] **예제 스타일**: 모든 코드 예제가 동일한 스타일 가이드를 따르는가?

#### 접근성 실제 테스트

- [ ] **스크린 리더 테스트**: NVDA 또는 VoiceOver로 페이지를 탐색했을 때 이해 가능한가?
- [ ] **키보드만으로 테스트**: 마우스 없이 Tab/Enter/Esc만으로 모든 인터랙션이 가능한가?
- [ ] **색상 대비**: WCAG AA 기준(4.5:1)을 모든 텍스트에서 충족하는가?
- [ ] **포커스 표시**: 키보드 포커스가 항상 명확하게 보이는가?

#### KRDS 디자인 가이드 준수

- [ ] **필수 ID/클래스 사용**: KRDS에서 요구하는 필수 ID/클래스가 적용되어 있는가?
  - `#krds-header`, `#krds-masthead`, `.krds-main-menu` 등
- [ ] **스타일 일관성**: KRDS 공식 디자인과 스타일이 일치하는가?
  - 색상 (Primary, Secondary, Gray 스케일)
  - 타이포그래피 (폰트 크기, 행간, 자간)
  - 간격 (Spacing, Padding, Margin)
  - Border radius
- [ ] **컴포넌트 구조**: KRDS 표준 구조를 따르는가?
  - Header: Masthead → Header → MainMenu 순서
  - Footer: 콘텐츠 → Identifier 순서
  - Navigation: GNB(MainMenu), LNB(SideNavigation) 위치
- [ ] **반응형 브레이크포인트**: KRDS 표준 브레이크포인트를 사용하는가?
  - Mobile: < 768px
  - Tablet: 768px ~ 1024px
  - Desktop: > 1024px
- [ ] **정부 브랜딩**: 정부 서비스 전용 컴포넌트가 올바르게 표시되는가?
  - Masthead: "대한민국 공식 전자정부" 텍스트
  - Identifier: 운영 기관 로고 및 이름
- [ ] **KRDS 원본 클래스명**: 공식 SCSS 클래스명을 유지하는가?
  - `.lnb-*` (SideNavigation)
  - `.gnb-*` (MainMenu)
  - `.krds-*` (공통 컴포넌트)

**KRDS 검증 방법**:

```bash
# 1. KRDS 공식 문서와 비교
# https://uiux.egovframe.go.kr/

# 2. 필수 ID/클래스 존재 확인
grep -r "krds-header\|krds-masthead\|krds-main-menu" apps/docs/src/

# 3. 색상 사용 확인 (Tailwind 클래스)
# Primary: bg-krds-blue-*, text-krds-blue-*
# Gray: bg-krds-gray-*, text-krds-gray-*

# 4. KRDS 원본 SCSS 클래스명 사용 확인
grep -r "\.lnb-\|\.gnb-\|\.krds-" packages/react/src/components/ --include="*.scss"
```

**주요 KRDS 필수 요구사항**:

- **Masthead**: `#krds-masthead` ID 필수, 페이지 최상단 배치
- **Header**: `#krds-header` ID 필수, Masthead 바로 다음 배치
- **MainMenu**: `.krds-main-menu` 클래스 필수, Header 내부 또는 바로 아래 배치
- **Footer**: Footer 내 마지막에 Identifier 배치 필수
- **SideNavigation**: `.lnb-*` 클래스 사용, KRDS 표준 스타일 유지
- **색상**: KRDS 표준 색상 팔레트 사용 (커스텀 색상 사용 시 주의)

#### 법적/정책 준수

- [ ] **라이선스 표기**: 사용된 오픈소스 라이브러리의 라이선스가 명시되어 있는가?
- [ ] **저작권 표기**: 이미지나 코드 예제의 출처가 명확한가?
- [ ] **개인정보**: 예제 코드에 실제 개인정보가 포함되어 있지 않은가?

#### 실제 프로젝트 통합 테스트

- [ ] **새 프로젝트 테스트**: 완전히 새로운 프로젝트에서 설치부터 사용까지 테스트했는가?
- [ ] **TypeScript 타입**: TypeScript 프로젝트에서 타입 에러가 없는가?
- [ ] **ESLint/Prettier**: 코드 예제가 일반적인 린터 규칙을 통과하는가?

#### 버전 관리

- [ ] **버전 명시**: 문서에 HANUI 버전이 명시되어 있는가?
- [ ] **Breaking Changes**: 향후 변경될 가능성이 있는 API에 경고가 있는가?
- [ ] **Deprecation**: 더 이상 사용하지 않는 기능에 대한 안내가 있는가?

---

## 🔗 PageNavigation 순서 검증 목록

**목적**: 모든 문서 페이지의 이전/다음 링크가 알파벳 순서를 따르는지 확인

### ✅ 올바른 알파벳 순서 (전체 40개 페이지)

다음은 모든 페이지를 **알파벳 순서**로 정렬한 목록입니다. 각 페이지의 `PageNavigation`은 이 순서에 따라 `prev`와 `next`를 설정해야 합니다.

1. **Accordion** → `/components/accordion`
   - prev: 없음 (첫 페이지)
   - next: Body
2. **Body** → `/components/body`
   - prev: Accordion
   - next: Border Radius
3. **Border Radius** → `/components/border-radius`
   - prev: Body
   - next: Breadcrumb
4. **Breadcrumb** → `/components/breadcrumb`
   - prev: Border Radius
   - next: Breakpoints
5. **Breakpoints** → `/components/breakpoints`
   - prev: Breadcrumb
   - next: Button
6. **Button** → `/components/button`
   - prev: Breakpoints
   - next: Card
7. **Card** → `/components/card`
   - prev: Button
   - next: Code
8. **Code** → `/components/code`
   - prev: Card
   - next: Colors
9. **Colors** → `/components/colors`
   - prev: Code
   - next: Container
10. **Container** → `/components/container`
    - prev: Colors
    - next: Display
11. **Display** → `/components/display`
    - prev: Container
    - next: File Upload
12. **File Upload** → `/components/file-upload`
    - prev: Display
    - next: Footer
13. **Footer** → `/components/identity/footer`
    - prev: File Upload
    - next: Header
14. **Header** → `/components/header`
    - prev: Footer
    - next: Heading
15. **Heading** → `/components/heading`
    - prev: Header
    - next: Identifier
16. **Identifier** → `/components/identifier`
    - prev: Heading
    - next: In-page Navigation
17. **In-page Navigation** → `/components/inpagenavigation`
    - prev: Identifier
    - next: Installation
18. **Installation** → `/docs/installation`
    - prev: In-page Navigation
    - next: Introduction
19. **Introduction** → `/docs/introduction`
    - prev: Installation
    - next: Label
20. **Label** → `/components/label`
    - prev: Introduction
    - next: Link
21. **Link** → `/components/link`
    - prev: Label
    - next: List
22. **List** → `/components/list`
    - prev: Link
    - next: Main Menu
23. **Main Menu** → `/components/mainmenu`
    - prev: List
    - next: Masthead
24. **Masthead** → `/components/masthead`
    - prev: Main Menu
    - next: Modal
25. **Modal** → `/components/modal`
    - prev: Masthead
    - next: NavText
26. **NavText** → `/components/navtext`
    - prev: Modal
    - next: Pagination
27. **Pagination** → `/components/pagination`
    - prev: NavText
    - next: Quick Start
28. **Quick Start** → `/docs/quick-start`
    - prev: Pagination
    - next: Section
29. **Section** → `/components/section`
    - prev: Quick Start
    - next: Section Heading System
30. **Section Heading System** → `/components/section-heading-system`
    - prev: Section
    - next: Select
31. **Select** → `/components/select`
    - prev: Section Heading System
    - next: Side Navigation
32. **Side Navigation** → `/components/sidenavigation`
    - prev: Select
    - next: SimpleGrid
33. **SimpleGrid** → `/components/simple-grid`
    - prev: Side Navigation
    - next: SkipLink
34. **SkipLink** → `/components/skiplink`
    - prev: SimpleGrid
    - next: Spacing
35. **Spacing** → `/components/spacing`
    - prev: SkipLink
    - next: Stack
36. **Stack** → `/components/stack`
    - prev: Spacing
    - next: Structured List
37. **Structured List** → `/components/structured-list`
    - prev: Stack
    - next: Tab Bars
38. **Tab Bars** → `/components/tabbars`
    - prev: Structured List
    - next: Table
39. **Table** → `/components/table`
    - prev: Tab Bars
    - next: Tabs
40. **Tabs** → `/components/tabs`
    - prev: Table
    - next: Text Input
41. **Text Input** → `/components/input`
    - prev: Tabs
    - next: Tooltip
42. **Tooltip** → `/components/tooltip`
    - prev: Text Input
    - next: Typography
43. **Typography** → `/components/typography`
    - prev: Tooltip
    - next: Wrap
44. **Wrap** → `/components/wrap`
    - prev: Typography
    - next: 없음 (마지막 페이지)

### 🔍 검증 방법

#### 자동 검증 스크립트 (권장)

```bash
# 모든 page.tsx 파일에서 PageNavigation 컴포넌트 찾기
grep -r "PageNavigation" apps/docs/src/app/ --include="page.tsx" -A 3

# 특정 페이지의 PageNavigation 확인
grep -A 3 "PageNavigation" apps/docs/src/app/components/body/page.tsx
```

#### 수동 검증 체크리스트

각 페이지를 검증할 때 다음을 확인:

- [ ] `prev` 링크가 위 목록의 이전 페이지를 가리키는가?
- [ ] `next` 링크가 위 목록의 다음 페이지를 가리키는가?
- [ ] `prev.title`과 `next.title`이 정확한가?
- [ ] `prev.href`와 `next.href`가 정확한 경로인가?
- [ ] 첫 페이지(Accordion)는 `prev`가 없어야 함
- [ ] 마지막 페이지(Wrap)는 `next`가 없어야 함

#### 발견된 PageNavigation 오류 예시

**Body 페이지** (`/apps/docs/src/app/components/body/page.tsx`):

```tsx
// ❌ 잘못된 순서 (현재)
<PageNavigation
  prev={{ title: 'Typography', href: '/components/typography' }}
  next={{ title: 'Display', href: '/components/display' }}
/>

// ✅ 올바른 순서 (수정 필요)
<PageNavigation
  prev={{ title: 'Accordion', href: '/components/accordion' }}
  next={{ title: 'Border Radius', href: '/components/border-radius' }}
/>
```

### 📝 검증 진행 상황

- [ ] Accordion
- [ ] Body (❌ 오류 발견 - 수정 필요)
- [ ] Border Radius
- [ ] Breadcrumb
- [ ] Breakpoints
- [ ] Button
- [ ] Card
- [ ] Code
- [ ] Colors
- [ ] Container
- [ ] Display
- [ ] File Upload
- [ ] Footer
- [ ] Header
- [ ] Heading
- [ ] Identifier
- [ ] In-page Navigation
- [ ] Installation
- [ ] Introduction
- [ ] Label
- [ ] Link
- [ ] List
- [ ] Main Menu
- [ ] Masthead
- [ ] Modal
- [ ] NavText
- [ ] Pagination
- [ ] Quick Start
- [ ] Section
- [ ] Section Heading System
- [ ] Select
- [ ] Side Navigation
- [ ] SimpleGrid
- [ ] SkipLink
- [ ] Spacing
- [ ] Stack
- [ ] Structured List
- [ ] Tab Bars
- [ ] Table
- [ ] Tabs
- [ ] Text Input
- [ ] Tooltip
- [ ] Typography
- [ ] Wrap

---

## 📂 검증 대상 페이지 (40개)

### 📖 Getting Started (3)

- [ ] Introduction - `/apps/docs/src/app/docs/introduction/page.tsx`
- [ ] Installation - `/apps/docs/src/app/docs/installation/page.tsx`
- [ ] Quick Start - `/apps/docs/src/app/docs/quick-start/page.tsx`

### 🎨 Design System (5)

- [ ] Colors - `/apps/docs/src/app/components/colors/page.tsx`
- [ ] Typography - `/apps/docs/src/app/components/typography/page.tsx`
- [ ] Border Radius - `/apps/docs/src/app/components/border-radius/page.tsx`
- [ ] Spacing - `/apps/docs/src/app/components/spacing/page.tsx`
- [ ] Breakpoints - `/apps/docs/src/app/components/breakpoints/page.tsx`

### 📝 Typography (4)

- [ ] Body - `/apps/docs/src/app/components/body/page.tsx`
- [ ] Display - `/apps/docs/src/app/components/display/page.tsx`
- [ ] Heading - `/apps/docs/src/app/components/heading/page.tsx`
- [ ] NavText - `/apps/docs/src/app/components/navtext/page.tsx`

### 📦 Layout (11)

- [ ] Accordion - `/apps/docs/src/app/components/accordion/page.tsx`
- [ ] Card - `/apps/docs/src/app/components/card/page.tsx`
- [ ] Code - `/apps/docs/src/app/components/code/page.tsx`
- [ ] Container - `/apps/docs/src/app/components/container/page.tsx`
- [ ] List - `/apps/docs/src/app/components/list/page.tsx`
- [ ] Modal - `/apps/docs/src/app/components/modal/page.tsx`
- [ ] Section - `/apps/docs/src/app/components/section/page.tsx`
- [ ] Section Heading System - `/apps/docs/src/app/components/section-heading-system/page.tsx`
- [ ] SimpleGrid - `/apps/docs/src/app/components/simple-grid/page.tsx`
- [ ] Stack - `/apps/docs/src/app/components/stack/page.tsx`
- [ ] Structured List - `/apps/docs/src/app/components/structured-list/page.tsx`
- [ ] Table - `/apps/docs/src/app/components/table/page.tsx`
- [ ] Tabs - `/apps/docs/src/app/components/tabs/page.tsx`
- [ ] Wrap - `/apps/docs/src/app/components/wrap/page.tsx`

### 📋 Form (3)

- [ ] File Upload - `/apps/docs/src/app/components/file-upload/page.tsx`
- [ ] Label - `/apps/docs/src/app/components/label/page.tsx`
- [ ] Text Input - `/apps/docs/src/app/components/input/page.tsx`

### ☑️ Selection (1)

- [ ] Select - `/apps/docs/src/app/components/select/page.tsx`

### ❓ Help (1)

- [ ] Tooltip - `/apps/docs/src/app/components/tooltip/page.tsx`

### 🧭 Navigation (8)

- [ ] Breadcrumb - `/apps/docs/src/app/components/breadcrumb/page.tsx`
- [ ] In-page Navigation - `/apps/docs/src/app/components/inpagenavigation/page.tsx`
- [ ] Link - `/apps/docs/src/app/components/link/page.tsx`
- [ ] Main Menu - `/apps/docs/src/app/components/mainmenu/page.tsx`
- [ ] Pagination - `/apps/docs/src/app/components/pagination/page.tsx`
- [ ] Side Navigation - `/apps/docs/src/app/components/sidenavigation/page.tsx`
- [ ] SkipLink - `/apps/docs/src/app/components/skiplink/page.tsx`
- [ ] Tab Bars - `/apps/docs/src/app/components/tabbars/page.tsx`

### 🆔 Identity (4)

- [ ] Footer - `/apps/docs/src/app/components/identity/footer/page.tsx`
- [ ] Header - `/apps/docs/src/app/components/header/page.tsx`
- [ ] Identifier - `/apps/docs/src/app/components/identifier/page.tsx`
- [ ] Masthead - `/apps/docs/src/app/components/masthead/page.tsx`

### 🎬 Action (1)

- [ ] Button - `/apps/docs/src/app/components/button/page.tsx`

---

## 🔍 검증 프로세스

### Step 1: 자동 검증 (필수)

```bash
# 1. 빌드 테스트 - 모든 페이지가 정상 빌드되는지 확인
npm run build

# 2. TypeScript 타입 체크 - 타입 에러 확인
npm run type-check

# 3. Lint 체크 - 코드 스타일 일관성 확인
npm run lint

# 4. 모든 컴포넌트가 export되는지 확인
grep -r "export.*from" packages/react/src/index.ts

# 5. Radix UI 사용 컴포넌트 찾기
grep -r "@radix-ui" packages/react/src/components/ --include="*.tsx" --include="*.ts"

# 6. 깨진 import 찾기 (선택사항)
# grep -r "from '@/" apps/docs/src/app/ --include="*.tsx" | grep -v "@/components/hanui"
```

**성공 기준**:

- ✅ Build: `✓ Generating static pages (57/57)` 또는 그 이상
- ✅ Type check: 에러 0개
- ✅ Lint: 에러 0개 (warning은 허용)

### Step 2: 브라우저 테스트 (필수)

```bash
# 개발 서버 실행
npm run dev

# 새 터미널에서 Lighthouse 테스트 (선택사항)
# npx lighthouse http://localhost:3000 --only-categories=accessibility
```

**테스트 항목**:

1. **모든 페이지 방문**: 각 페이지를 브라우저에서 열어 시각적으로 확인
2. **탭 전환**: Overview/API 탭이 정상 작동하는지 확인
3. **다크모드 토글**: 라이트/다크 전환 시 스타일 깨짐 없는지 확인
4. **반응형**: 브라우저 창 크기 조절하여 모바일 뷰 확인

### Step 2.5: 컴포넌트 기능 테스트 (필수)

**중요**: 각 컴포넌트 페이지에서 실제로 동작하는지 직접 테스트합니다.

#### 우선 테스트 대상 (반드시 확인)

**인터랙티브 컴포넌트**:

```bash
# 브라우저에서 각 페이지를 열고 실제로 조작해보기
http://localhost:3000/components/button        # Button 클릭
http://localhost:3000/components/input           # Input 입력
http://localhost:3000/components/file-upload     # FileUpload 파일 선택
http://localhost:3000/components/select     # Select 옵션 선택
http://localhost:3000/components/tooltip         # Tooltip 호버
http://localhost:3000/components/tabs                     # Tabs 전환
http://localhost:3000/components/accordion                # Accordion 열기/닫기
http://localhost:3000/components/modal                    # Modal 열기/닫기
http://localhost:3000/components/mainmenu  # MainMenu 드롭다운
http://localhost:3000/components/sidenavigation  # SideNavigation 확장/축소
http://localhost:3000/components/pagination      # Pagination 클릭
```

**체크 사항**:

- [ ] **Button**: onClick 이벤트가 발생하는가? 콘솔에 로그가 출력되는가?
- [ ] **Input**:
  - [ ] 텍스트 입력 시 값이 표시되는가?
  - [ ] onChange 이벤트가 발생하는가?
  - [ ] placeholder가 표시되는가?
  - [ ] disabled 상태가 작동하는가?
- [ ] **Select**:
  - [ ] 클릭 시 드롭다운이 열리는가?
  - [ ] 옵션 선택 시 값이 변경되는가?
  - [ ] 키보드 (↑↓ Arrow, Enter)로 선택 가능한가?
  - [ ] 외부 클릭 시 드롭다운이 닫히는가?
- [ ] **FileUpload**:
  - [ ] 파일 선택 시 onChange 이벤트가 발생하는가?
  - [ ] 선택한 파일 이름이 표시되는가?
  - [ ] 다중 파일 선택이 되는가? (multiple prop 사용 시)
  - [ ] 파일 삭제 버튼이 작동하는가?
- [ ] **Tooltip**:
  - [ ] 마우스 호버 시 툴팁이 나타나는가?
  - [ ] 마우스 벗어나면 툴팁이 사라지는가?
  - [ ] 포커스 시 툴팁이 나타나는가?
  - [ ] 툴팁 위치가 자동으로 조정되는가? (화면 끝에서)
- [ ] **Tabs**:
  - [ ] 탭 클릭 시 콘텐츠가 전환되는가?
  - [ ] 키보드 (←→ Arrow)로 탭 이동이 가능한가?
  - [ ] defaultValue가 올바르게 작동하는가?
- [ ] **Accordion**:
  - [ ] 클릭 시 확장/축소되는가?
  - [ ] 애니메이션이 부드럽게 작동하는가?
  - [ ] 다중 항목 확장이 가능한가? (collapsible prop에 따라)
- [ ] **Modal**:
  - [ ] 열기 버튼 클릭 시 모달이 나타나는가?
  - [ ] ESC 키로 모달이 닫히는가?
  - [ ] 외부 클릭(Backdrop) 시 모달이 닫히는가?
  - [ ] 모달 열릴 때 배경이 스크롤 불가능해지는가?
- [ ] **MainMenu**:
  - [ ] 메뉴 항목 호버 시 드롭다운이 나타나는가?
  - [ ] 클릭으로도 드롭다운이 열리는가?
  - [ ] 키보드 네비게이션(Tab, Enter, Esc)이 작동하는가?
  - [ ] 외부 클릭 시 드롭다운이 닫히는가?
- [ ] **SideNavigation**:
  - [ ] 섹션 클릭 시 확장/축소되는가?
  - [ ] active 상태인 항목의 섹션이 자동으로 확장되는가?
  - [ ] 링크 클릭 시 페이지 이동이 되는가?
- [ ] **Pagination**:
  - [ ] 페이지 번호 클릭 시 onPageChange 이벤트가 발생하는가?
  - [ ] 이전/다음 버튼이 작동하는가?
  - [ ] 첫/마지막 페이지에서 버튼이 disabled 되는가?
  - [ ] Ellipsis(...)가 올바르게 표시되는가?

#### 발견된 버그 기록 템플릿

```markdown
### [컴포넌트명] 기능 버그

- **문제**: 구체적인 버그 설명
- **재현 방법**:
  1. 단계별 재현 방법
  2. 예상 동작 vs 실제 동작
- **환경**: 브라우저 (Chrome 120, Safari 17 등)
- **스크린샷**: (있으면 첨부)
- **우선순위**: 🔴 High / 🟡 Medium / 🟢 Low
```

### Step 3: 실제 사용 테스트 (권장)

```bash
# 1. 새 Next.js 프로젝트 생성
npx create-next-app@latest test-hanui --typescript

# 2. HANUI 설치
cd test-hanui
npm install @hanui/react

# 3. 문서에서 코드 예제 복사하여 테스트
# - 최소 5개 주요 컴포넌트 테스트
# - Button, Input, Select, Tooltip, Pagination 등
```

**테스트 시나리오**:

- [ ] 코드 복사 → 붙여넣기 → 실행 → 정상 동작
- [ ] TypeScript 타입 자동완성 동작
- [ ] ESLint 에러 없음

### Step 4: 접근성 테스트 (권장)

**키보드 네비게이션**:

- [ ] Tab: 모든 포커스 가능 요소를 순서대로 탐색
- [ ] Shift+Tab: 역순 탐색
- [ ] Enter: 버튼/링크 활성화
- [ ] Space: 체크박스/버튼 활성화
- [ ] Esc: 모달/드롭다운 닫기
- [ ] Arrow Keys: 메뉴/탭 네비게이션

**스크린 리더** (macOS VoiceOver 또는 Windows NVDA):

```bash
# macOS VoiceOver 실행: Cmd + F5
# 테스트할 주요 페이지:
# - Button, Input, Select (폼 요소)
# - MainMenu, SideNavigation (네비게이션)
# - Tooltip, Modal (오버레이)
```

### Step 5: 크로스 체크 (권장)

1. **카테고리별 일관성**: 같은 카테고리의 컴포넌트끼리 내용 스타일 비교
2. **용어 통일**: "누리집" vs "웹사이트" 등 용어 일관성 확인
3. **예제 코드 스타일**: import 문, 들여쓰기, 변수명 등 일관성
4. **섹션 순서**: 모든 페이지가 동일한 섹션 순서를 따르는지 확인

### Step 6: 성능 측정 (선택사항)

```bash
# Lighthouse 성능 테스트
npx lighthouse http://localhost:3000 --view

# Bundle 크기 분석
npm run build
npx @next/bundle-analyzer
```

**목표 수치**:

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s

---

## 🐛 발견된 이슈 기록

이슈 발견 시 아래 형식으로 기록:

### [컴포넌트명] 이슈 제목

- **타입**: API 불일치 / 내용 오류 / 누락 / 타이포
- **위치**: 섹션명 또는 줄번호
- **현재 내용**: ...
- **수정 필요 내용**: ...
- **우선순위**: 🔴 High / 🟡 Medium / 🟢 Low

---

## ✅ 완료 기준

### 필수 완료 항목

- [ ] **모든 40개 페이지 검증 완료**
- [ ] **발견된 모든 High/Medium 우선순위 이슈 수정 완료**
- [ ] **최종 빌드 성공** (`npm run build`)
- [ ] **모든 페이지가 브라우저에서 정상 렌더링** (Chrome, Safari, Firefox)
- [ ] **TypeScript 타입 에러 없음** (`npm run type-check`)
- [ ] **접근성 자동 테스트 통과** (Lighthouse Accessibility Score 90+)

### 실제 테스트 완료

- [ ] **컴포넌트 기능 테스트**: 모든 인터랙티브 컴포넌트의 실제 동작 확인 완료
  - Button, Input, Select, FileUpload, Tooltip (필수)
  - Tabs, Accordion, Modal, MainMenu, SideNavigation, Pagination (필수)
  - 발견된 버그 모두 수정 완료
- [ ] **복사-붙여넣기 테스트**: 최소 5개 주요 컴포넌트의 예제 코드가 실제로 동작함을 확인
- [ ] **키보드 네비게이션**: 모든 인터랙티브 컴포넌트가 키보드만으로 조작 가능
- [ ] **스크린 리더 테스트**: 최소 3개 주요 페이지를 VoiceOver/NVDA로 테스트
- [ ] **모바일 반응형**: iOS Safari와 Chrome Mobile에서 주요 페이지 확인
- [ ] **다크모드 테스트**: 모든 컴포넌트가 다크모드에서 정상 작동

### 문서 품질

- [ ] **API 정확성**: 모든 Props 테이블이 실제 컴포넌트 인터페이스와 일치
- [ ] **Radix UI 문서화**: Radix UI 사용 컴포넌트에 "Radix UI 기능" 섹션 존재
- [ ] **코드 예제 검증**: 모든 코드 블록에 올바른 syntax highlight 적용
- [ ] **링크 검증**: 모든 내부/외부 링크가 유효함

### 리뷰 및 배포

- [ ] **PR 리뷰 완료**
- [ ] **최종 QA 승인**
- [ ] **배포 준비 완료** (환경 변수, 도메인 설정 등)

---

## 📚 참고 자료

- [KRDS 공식 문서](https://uiux.egovframe.go.kr/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [KWCAG 2.2 한국형 웹 콘텐츠 접근성 지침](https://www.wa.or.kr/m1/sub1.asp)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

**담당자**: @odada-o
**예상 소요 시간**: 2-3일
**우선순위**: 🔴 High (1차 오픈 전 필수)
**관련 이슈**: #14 (문서 마이그레이션)
