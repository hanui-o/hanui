# Footer 컴포넌트 설계 문서

> **KRDS Footer 컴포넌트를 React로 구현하기 위한 기술 설계 문서**
> 작성일: 2025-01-15

---

## 현재 상황 분석

### KRDS Footer 제공 방식

KRDS는 Footer를 다음과 같이 제공합니다:

- **HTML**: 구조 마크업 (`footer.html`)
- **SCSS**: 스타일 정의 (`_footer.scss`)
- **가이드라인**: 사용성 및 접근성 가이드 ([KRDS Footer 가이드라인](https://www.krds.go.kr/html/site/component/component_02_04.html))

### HANUI의 접근 방식

HANUI는 React 컴포넌트 라이브러리로 제공하므로:

- **HTML/SCSS** → **React Component + TypeScript + Tailwind CSS**로 변환 필요
- KRDS 가이드라인 100% 준수
- 기존 컴포넌트 패턴과 일관성 유지 (Header 컴포넌트 참고)

---

## 설계 질문에 대한 답변

### 1. 컴포넌트 구조: Compound Component vs 단일 컴포넌트?

**결론: Compound Component 패턴 사용 (Header와 동일)**

**이유:**

- Header 컴포넌트와 일관성 유지
- 유연한 조합 가능 (필요한 부분만 사용)
- 각 영역을 독립적으로 관리 가능
- 타입 안정성 확보

**구조:**

```tsx
<Footer>
  <Footer.QuickLinks>
    <Footer.QuickLink>...</Footer.QuickLink>
  </Footer.QuickLinks>
  <Footer.Logo />
  <Footer.Content>
    <Footer.Info>...</Footer.Info>
    <Footer.Links>...</Footer.Links>
  </Footer.Content>
  <Footer.Bottom>
    <Footer.PolicyLinks>...</Footer.PolicyLinks>
    <Footer.Copyright>...</Footer.Copyright>
    <Footer.Identifier>...</Footer.Identifier>
  </Footer.Bottom>
</Footer>
```

### 2. 스타일링 방식: SCSS → Tailwind CSS 변환

**결론: Tailwind CSS 사용 (기존 패턴 유지)**

**이유:**

- 기존 컴포넌트들이 모두 Tailwind CSS 사용
- 디자인 토큰 활용 가능 (`@hanui/core`)
- SCSS 컴파일 과정 불필요
- 일관된 스타일링 방식

**KRDS SCSS 변환 전략:**

- CSS 변수 (`var(--krds-*)`) → Tailwind 커스텀 클래스 또는 인라인 스타일
- 반응형 브레이크포인트 (`@include size-medium`) → Tailwind `md:`, `lg:` 등
- Mixin (`@include flex-layout`) → Tailwind 유틸리티 클래스

### 3. KRDS 호환성: 필수 CSS 클래스 및 ID

**결론: KRDS 필수 클래스/ID 모두 유지**

**필수 요소:**

- `#krds-footer` (ID) - 메인 컨테이너
- `.foot-quick` - 관련 사이트 링크 영역
- `.f-logo` - 서비스 로고
- `.f-info` - 주소 및 연락처 정보
- `.f-link` - 푸터 링크
- `.f-btm` - 하단 영역
- `.krds-identifier` - 운영기관 식별자 (기존 Identifier 컴포넌트 재사용)

**시맨틱 HTML:**

- `<footer>` 태그 사용 (접근성 준수)
- 적절한 ARIA 속성 추가

### 4. 기존 컴포넌트 재사용

**재사용 가능한 컴포넌트:**

- `Identifier` - 운영기관 식별자 (Footer.Identifier로 래핑)
- `Button` - SNS 링크 버튼에 활용 가능
- `Container` - 내부 레이아웃 제어
- `Stack` - 간격 관리

---

## 컴포넌트 설계

### API 설계

#### Footer (메인 컨테이너)

```tsx
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Footer variant
   * @default "default"
   */
  variant?: 'default' | 'compact';

  /**
   * Footer content (compound components)
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.QuickLinks (관련 사이트 링크)

```tsx
interface FooterQuickLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Quick links array
   */
  links?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    'aria-label'?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}
```

#### Footer.QuickLink (개별 관련 사이트 링크)

```tsx
interface FooterQuickLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Link label
   */
  children: React.ReactNode;

  /**
   * Link href (if provided, renders as anchor)
   */
  href?: string;

  /**
   * Click handler (if provided without href, renders as button)
   */
  onClick?: () => void;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Logo (서비스 로고)

```tsx
interface FooterLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo image source
   */
  src?: string;

  /**
   * Logo alt text (required for accessibility)
   */
  alt?: string;

  /**
   * Logo link href
   */
  href?: string;

  /**
   * Custom logo element (alternative to src)
   */
  children?: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Content (본문 콘텐츠 래퍼)

```tsx
interface FooterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content children
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Info (연락처 정보)

```tsx
interface FooterInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Address text
   */
  address?: string;

  /**
   * Contact information array
   */
  contacts?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to address/contacts props)
   */
  children?: React.ReactNode;
}
```

#### Footer.Address (주소)

```tsx
interface FooterAddressProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Address text
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Contact (연락처)

```tsx
interface FooterContactProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Contact label (e.g., "대표전화")
   */
  label: string;

  /**
   * Contact value (e.g., "1577-1000")
   */
  value: string;

  /**
   * Additional description (e.g., "유료, 평일 09시~18시")
   */
  description?: string;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Links (유틸리티 링크)

```tsx
interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Links content
   */
  children: React.ReactNode;
}
```

#### Footer.UtilityLinks (찾아오는 길 등)

```tsx
interface FooterUtilityLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Utility links array
   */
  links?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}
```

#### Footer.SocialLinks (SNS 링크)

```tsx
interface FooterSocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Social links array
   */
  links?: Array<{
    platform: 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'blog';
    href: string;
    'aria-label'?: string;
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}
```

#### Footer.Bottom (하단 영역)

```tsx
interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional className
   */
  className?: string;

  /**
   * Bottom content
   */
  children: React.ReactNode;
}
```

#### Footer.PolicyLinks (정책 링크)

```tsx
interface FooterPolicyLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Policy links array
   */
  links?: Array<{
    label: string;
    href: string;
    highlight?: boolean; // 개인정보처리방침 강조
  }>;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Children (alternative to links prop)
   */
  children?: React.ReactNode;
}
```

#### Footer.Copyright (저작권 정보)

```tsx
interface FooterCopyrightProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Copyright text
   */
  children: React.ReactNode;

  /**
   * Additional className
   */
  className?: string;
}
```

#### Footer.Identifier (운영기관 식별자)

```tsx
interface FooterIdentifierProps {
  /**
   * Organization name
   */
  organizationName: string;

  /**
   * Organization logo
   */
  logo?: string | React.ReactNode;

  /**
   * Logo alt text
   */
  logoAlt?: string;

  /**
   * Variant
   */
  variant?: 'light' | 'dark';

  /**
   * Custom text format
   */
  text?: string;

  /**
   * Additional className
   */
  className?: string;
}
```

### 반응형 디자인

KRDS Footer는 다음 브레이크포인트를 사용합니다:

- **모바일**: `@include size-medium` (기본, ~768px)
- **태블릿**: `@include size-medium-to-large` (768px ~ 1024px)
- **웹**: `@include size-large-more` (1024px+)

**Tailwind 변환:**

- 모바일: 기본 스타일 (모바일 우선)
- 태블릿: `md:` prefix
- 웹: `lg:` prefix

### 스타일 매핑 (KRDS SCSS → Tailwind)

#### 주요 색상 토큰

```scss
// KRDS SCSS
var(--krds-light-color-surface-gray-subtler)
var(--krds-light-color-border-gray-light)
var(--krds-light-color-action-secondary)
```

```tsx
// Tailwind (커스텀 클래스 또는 인라인 스타일)
bg-gray-50 dark:bg-gray-900
border-gray-200 dark:border-gray-800
bg-gray-100 hover:bg-gray-200
```

#### 간격 토큰

```scss
// KRDS SCSS
var(--krds-gap-3)    // 12px
var(--krds-gap-5)    // 20px
var(--krds-gap-7)    // 28px
var(--krds-gap-9)    // 36px
var(--krds-padding-6) // 24px
var(--krds-padding-8) // 32px
var(--krds-padding-10) // 40px
```

```tsx
// Tailwind
gap - 3; // 12px
gap - 5; // 20px
gap - 7; // 28px
gap - 9; // 36px
p - 6; // 24px
p - 8; // 32px
p - 10; // 40px
```

### 구현 예시

```tsx
export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <footer
        id="krds-footer"
        ref={ref}
        className={cn(
          'relative z-50',
          'bg-gray-50 dark:bg-gray-900',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </footer>
    );
  }
);
Footer.displayName = 'Footer';

// QuickLinks
const FooterQuickLinks = React.forwardRef<
  HTMLDivElement,
  FooterQuickLinksProps
>(({ links, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'foot-quick',
        'border-t border-b border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        className
      )}
      {...props}
    >
      <div className="inner flex flex-col md:flex-row">
        {links?.map((link, index) => (
          <FooterQuickLink key={index} {...link} />
        ))}
        {children}
      </div>
    </div>
  );
});
FooterQuickLinks.displayName = 'Footer.QuickLinks';

// ... (다른 서브 컴포넌트들)
```

---

## 마이그레이션 계획

### 1단계: 기본 구조 구현

- [ ] Footer 메인 컴포넌트 생성
- [ ] Footer.QuickLinks 컴포넌트
- [ ] Footer.Logo 컴포넌트
- [ ] Footer.Content 래퍼

### 2단계: 콘텐츠 영역 구현

- [ ] Footer.Info 컴포넌트
- [ ] Footer.Address 컴포넌트
- [ ] Footer.Contact 컴포넌트
- [ ] Footer.Links 래퍼
- [ ] Footer.UtilityLinks 컴포넌트
- [ ] Footer.SocialLinks 컴포넌트

### 3단계: 하단 영역 구현

- [ ] Footer.Bottom 래퍼
- [ ] Footer.PolicyLinks 컴포넌트
- [ ] Footer.Copyright 컴포넌트
- [ ] Footer.Identifier (기존 Identifier 컴포넌트 통합)

### 4단계: 스타일링 및 접근성

- [ ] KRDS 스타일 매핑 완료
- [ ] 반응형 스타일 적용
- [ ] 접근성 속성 추가 (ARIA, 키보드 네비게이션)
- [ ] 다크 모드 지원

### 5단계: 문서화 및 테스트

- [ ] 컴포넌트 문서 작성
- [ ] 사용 예시 작성
- [ ] 접근성 테스트
- [ ] 반응형 테스트

---

## 사용 예시

### 기본 사용법

```tsx
import { Footer } from '@hanui/react';

<Footer>
  {/* 관련 사이트 링크 */}
  <Footer.QuickLinks
    links={[
      { label: '관련 사이트 1', href: '/site1' },
      { label: '관련 사이트 2', href: '/site2' },
    ]}
  />

  {/* 로고 */}
  <Footer.Logo src="/logo.svg" alt="KRDS - Korea Design System" href="/" />

  {/* 본문 콘텐츠 */}
  <Footer.Content>
    <Footer.Info
      address="(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단"
      contacts={[
        {
          label: '대표전화',
          value: '1577-1000',
          description: '유료, 평일 09시~18시',
        },
      ]}
    />

    <Footer.Links>
      <Footer.UtilityLinks
        links={[
          { label: '찾아오시는 길', href: '/directions' },
          { label: '이용안내', href: '/guide' },
        ]}
      />

      <Footer.SocialLinks
        links={[
          { platform: 'instagram', href: 'https://instagram.com' },
          { platform: 'youtube', href: 'https://youtube.com' },
        ]}
      />
    </Footer.Links>
  </Footer.Content>

  {/* 하단 영역 */}
  <Footer.Bottom>
    <Footer.PolicyLinks
      links={[
        { label: '개인정보처리방침', href: '/privacy', highlight: true },
        { label: '저작권 정책', href: '/copyright' },
      ]}
    />

    <Footer.Copyright>
      © 2023 National Health Insurance Service. All rights reserved.
    </Footer.Copyright>

    <Footer.Identifier
      organizationName="보건복지부"
      logo="/gov-logo.svg"
      logoAlt="보건복지부 로고"
    />
  </Footer.Bottom>
</Footer>;
```

### Compound Component 패턴 (유연한 조합)

```tsx
<Footer>
  {/* 필요한 부분만 사용 가능 */}
  <Footer.Logo src="/logo.svg" alt="서비스 로고" />

  <Footer.Content>
    <Footer.Info>
      <Footer.Address>주소 정보</Footer.Address>
      <ul>
        <Footer.Contact
          label="대표전화"
          value="1577-1000"
          description="평일 09시~18시"
        />
      </ul>
    </Footer.Info>
  </Footer.Content>

  <Footer.Bottom>
    <Footer.Copyright>© 2023 All rights reserved.</Footer.Copyright>
  </Footer.Bottom>
</Footer>
```

### 기존 Identifier 컴포넌트 재사용

```tsx
import { Footer, Identifier } from '@hanui/react';

<Footer>
  {/* ... 다른 콘텐츠 ... */}

  <Footer.Bottom>
    {/* Footer.Identifier는 내부적으로 Identifier 컴포넌트 사용 */}
    <Footer.Identifier
      organizationName="행정안전부"
      logo="/logo.png"
      logoAlt="행정안전부 로고"
    />

    {/* 또는 직접 Identifier 사용 가능 */}
    <Identifier
      organizationName="행정안전부"
      logo="/logo.png"
      logoAlt="행정안전부 로고"
    />
  </Footer.Bottom>
</Footer>;
```

---

## KRDS 가이드라인 준수 사항

### 필수 요구사항

1. **일관된 위치**: 모든 페이지에 푸터를 일관된 위치에 제공
2. **정보 배치 순서**: 로고 → 연락처 → 유틸리티 링크 → 정책 링크 → 저작권 정보
3. **개인정보처리방침 필수**: 반드시 표시하고 다른 정책과 구분
4. **접근성**: `<footer>` 태그 사용, ARIA 속성, 로고 대체 텍스트
5. **반응형**: 작은 화면에서도 동일한 순서 유지

### CSS 선택자 (KRDS 호환)

- `#krds-footer` - 필수 ID
- `.foot-quick` - 관련기관 링크
- `.f-logo` - 서비스 로고
- `.f-info` - 주소 및 연락처
- `.f-link` - 푸터 링크
- `.f-btm` - 하단 영역
- `.krds-identifier` - 운영기관 식별자

---

## 장점 요약

1. **KRDS 준수**: 공식 가이드라인 100% 준수
2. **유연성**: Compound Component 패턴으로 필요한 부분만 사용 가능
3. **타입 안정성**: TypeScript로 완전한 타입 지원
4. **일관성**: Header 컴포넌트와 동일한 패턴
5. **재사용성**: 기존 컴포넌트(Identifier, Button 등) 재사용
6. **접근성**: WCAG 2.1 / KWCAG 2.2 준수
7. **반응형**: 모바일/태블릿/웹 완벽 지원
8. **다크 모드**: 자동 다크 모드 지원

---

## 참고 자료

- [KRDS Footer 가이드라인](https://www.krds.go.kr/html/site/component/component_02_04.html)
- [KRDS Footer HTML](https://github.com/KRDS-uiux/krds-uiux/blob/main/html/code/footer.html)
- [KRDS Footer SCSS](https://raw.githubusercontent.com/KRDS-uiux/krds-uiux/main/resources/scss/component/_footer.scss)
- [HANUI Header 컴포넌트](../packages/react/src/components/Header/Header.tsx)
- [HANUI Identifier 컴포넌트](../packages/react/src/components/Identifier/Identifier.tsx)

---

## 구현 상태

- [x] 설계 문서 작성 완료 ✅
- [ ] 컴포넌트 구현 (진행 예정)
  - [ ] `packages/react/src/components/Footer/Footer.tsx` 생성
  - [ ] `packages/react/src/components/Footer/index.ts` 생성
  - [ ] `packages/react/src/index.ts`에 export 추가
- [ ] 문서화 (진행 예정)
- [ ] 테스트 (진행 예정)

## 패키지 구조

Footer 컴포넌트는 `@hanui/react` 패키지에 포함됩니다:

```
packages/react/src/
├── components/
│   └── Footer/
│       ├── Footer.tsx      # 메인 컴포넌트 파일
│       └── index.ts        # Export 파일
└── index.ts                # 패키지 메인 export (Footer 추가 필요)
```

**사용 방법:**

```tsx
import { Footer } from '@hanui/react';
// 또는
import { Footer } from '@hanui/react/components/Footer';
```
