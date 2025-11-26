# HANUI 문서

> **shadcn/ui 방식의 CLI 복붙 설치 디자인 시스템**
> KRDS(대한민국 디자인 시스템) 기반 React 컴포넌트 라이브러리

---

## 📚 문서 목차

### [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 가이드 ⭐

HANUI 개발에 필요한 모든 내용이 담긴 핵심 문서입니다.

**포함 내용:**

1. **프로젝트 개요**
   - HANUI란 무엇인가?
   - 왜 CLI 복붙 방식인가?

2. **CLI 복붙 설치 방식**
   - 작동 원리
   - 왜 Tailwind 클래스를 사용해야 하는가?
   - 기술적 배경

3. **KRDS 변수 시스템**
   - 색상 변수 구조 (3단계)
   - CSS 변수 정의 (globals.css)
   - Tailwind 매핑 (tailwind.config.ts)
   - 컴포넌트 사용법

4. **컴포넌트 개발 가이드**
   - 핵심 원칙
   - 체크리스트 (KRDS 준수, 다크 모드, Radix UI, 코드 정리)
   - 컴포넌트 예시

5. **문서 페이지 마이그레이션**
   - 페이지 구조 (개요 → 설치 → 사용법 → 예제 → 접근성)
   - 기본 템플릿
   - 중요 주의사항

👉 **개발하기 전에 반드시 읽어야 할 문서**

---

## 🎯 핵심 개념

### CLI 복붙 방식이란?

```bash
# ❌ npm 패키지 방식 (일반적)
npm install @hanui/react

# ✅ CLI 복붙 방식 (HANUI - shadcn/ui 스타일)
hanui add button
```

**작동 원리:**

```
사용자 실행: hanui add button
    ↓
소스 파일 복사: button.tsx → src/components/hanui/
    ↓
Tailwind 빌드: 복사된 파일 스캔 → 필요한 CSS만 생성
```

**왜 이 방식인가?**

- ✅ **완전한 커스터마이징**: 소스 코드를 직접 수정 가능
- ✅ **번들 사이즈 최적화**: 사용하는 컴포넌트만 포함
- ✅ **의존성 최소화**: 외부 패키지 의존성 없음
- ✅ **프로젝트 통제권**: 컴포넌트 동작을 완전히 제어

### Tailwind 클래스 사용 필수!

```tsx
// ❌ CSS 변수 문법 (Tailwind 빌드 안 됨!)
<button className="bg-[var(--krds-color-light-primary-50)]">
  버튼
</button>

// ✅ Tailwind 클래스 (정상 작동!)
<button className="bg-krds-primary-50">
  버튼
</button>
```

**이유:** 사용자 프로젝트에 복사된 파일을 Tailwind가 스캔해야 CSS가 생성됩니다.

---

## 🚀 빠른 시작

### 1. 개발 가이드 읽기

```bash
# DEVELOPMENT.md 읽기
cat docs/DEVELOPMENT.md
```

### 2. GitHub Issues 확인

현재 진행 중인 작업:

- [#24: 컴포넌트 페이지 마이그레이션](https://github.com/hanui-o/hanui/issues/24)
  - Section Heading System 적용
  - 문서 페이지 구조 표준화
  - 개요 → 설치 → 사용법 → 예제 → 접근성 순서

- [#25: Tailwind 클래스 변환](https://github.com/hanui-o/hanui/issues/25)
  - CSS 변수 → Tailwind 클래스
  - `bg-[var(--krds-primary-50)]` → `bg-krds-primary-50`

### 3. 컴포넌트 개발

```tsx
// packages/react/src/components/button.tsx

// ✅ Tailwind 클래스 사용
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-krds-primary-50 text-white hover:bg-krds-primary-60',
        secondary: 'bg-krds-gray-10 text-krds-gray-90',
      },
    },
  }
);
```

### 4. 문서 페이지 작성

```tsx
// apps/docs/src/app/components/[component]/page.tsx

export default function ComponentPage() {
  return (
    <>
      <Heading level="h1" title="컴포넌트명" description="설명" />

      <Tabs defaultValue="overview">
        <TabsContent value="overview">
          {/* 1. 개요 */}
          {/* 2. 설치 */}
          {/* 3. 사용법 */}
          {/* 4. 예제 */}
          {/* 5. 접근성 (선택) */}
        </TabsContent>

        <TabsContent value="api">{/* API 레퍼런스 */}</TabsContent>
      </Tabs>
    </>
  );
}
```

---

## 📖 참고 자료

### 내부 문서

- [DEVELOPMENT.md](./DEVELOPMENT.md) - 개발 가이드 (필수)
- [archive/](./archive/) - 이전 기획/기술 문서

### GitHub Issues

- [#24](https://github.com/hanui-o/hanui/issues/24) - 컴포넌트 페이지 마이그레이션
- [#25](https://github.com/hanui-o/hanui/issues/25) - Tailwind 클래스 변환
- [전체 이슈 목록](https://github.com/hanui-o/hanui/issues)

### 외부 참고

- [KRDS 공식](https://www.krds.go.kr/) - 대한민국 디자인 시스템
- [shadcn/ui](https://ui.shadcn.com/) - CLI 복붙 방식 참고
- [Tailwind CSS](https://tailwindcss.com/) - 커스텀 색상 설정

---

## 💡 자주 묻는 질문

### Q1. 왜 CSS 변수 대신 Tailwind 클래스를 사용하나요?

**A:** CLI 복붙 방식이기 때문입니다.

- 소스 파일이 사용자 프로젝트에 복사됨
- Tailwind가 복사된 파일을 빌드 타임에 스캔
- `bg-krds-primary-50` 같은 클래스를 발견하면 CSS 생성
- CSS 변수 문법(`bg-[var(--krds-primary-50)]`)은 스캔 안 됨

### Q2. 다크 모드는 어떻게 하나요?

**A:** 현재 HANUI는 다크 모드를 지원하지 않습니다.

- `dark:` 접두사를 사용하지 마세요
- 기존 코드에 `dark:` 접두사가 있다면 삭제하세요

### Q3. 어떤 컴포넌트부터 개발하나요?

**A:** [#24 이슈](https://github.com/hanui-o/hanui/issues/24)의 미완료 목록을 참고하세요.

완료된 컴포넌트:

- ✅ Button
- ✅ Accordion
- ✅ Label

미완료 컴포넌트:

- ⏳ Alert, Badge, Card, Checkbox, Dialog, Input, Radio, Select, Switch, Textarea, Toast 등

---

## 🤝 기여하기

1. **이슈 확인**: [GitHub Issues](https://github.com/hanui-o/hanui/issues)
2. **개발 가이드 읽기**: [DEVELOPMENT.md](./DEVELOPMENT.md)
3. **브랜치 생성**: `feature/component-name` or `docs/page-name`
4. **PR 생성**: 작업 완료 후 Pull Request

---

**작성일**: 2025-11-26
**관련 이슈**: #24, #25
**버전**: v0.2.0

**Next**: [DEVELOPMENT.md](./DEVELOPMENT.md) 읽기 →
