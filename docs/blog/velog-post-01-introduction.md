# KRDS 준수 React 컴포넌트 라이브러리를 만들고 있습니다

## 🤔 시작하게 된 계기

공공기관 웹사이트를 개발하면서 항상 겪는 문제가 있었습니다.

```
매 프로젝트마다:
1. KRDS 디자인 가이드 PDF 열기
2. 컴포넌트 하나하나 직접 구현
3. 접근성 요구사항 일일이 체크
4. 다음 프로젝트에서 또 반복...
```

"이거 한 번만 제대로 만들어두면 계속 쓸 수 있지 않을까?"

그래서 시작했습니다. **HANUI** - 한국 공공기관을 위한 React 컴포넌트 라이브러리.

## 🎯 HANUI가 해결하려는 문제

### 문제 1: KRDS 준수의 어려움

KRDS(Korea Republic Design System)는 한국 정부가 제공하는 공식 디자인 시스템입니다. 공공 웹사이트는 이를 준수해야 하지만...

- ❌ 공식 React 컴포넌트 라이브러리 없음
- ❌ PDF 가이드만 있어서 매번 코드로 직접 구현
- ❌ 프로젝트마다 일관성 없는 구현

### 문제 2: 접근성 구현의 번거로움

WCAG 2.1 AA 등급 준수는 법적 요구사항이지만:

- ❌ aria 속성 일일이 추가
- ❌ 키보드 네비게이션 직접 구현
- ❌ 스크린 리더 테스트 매번 수동

### 문제 3: 디자인-개발 불일치

디자인 시스템은 있는데 코드는 매번 새로 작성하다 보니:

- ❌ 디자이너가 준 디자인 ≠ 개발자가 만든 코드
- ❌ 프로젝트마다 미묘하게 다른 스타일
- ❌ 유지보수 악몽

## ✨ HANUI의 접근 방식

### 1. shadcn/ui 스타일 CLI

요즘 가장 인기 있는 [shadcn/ui](https://ui.shadcn.com/)의 철학을 차용했습니다.

```bash
# 간단한 명령어로 컴포넌트 추가
npx hanui add button input card

# 내 프로젝트에 직접 코드가 복사됨
# → 완전히 커스터마이징 가능
# → 외부 의존성 최소화
```

### 2. KRDS 100% 준수

모든 컴포넌트는 KRDS 가이드를 따릅니다:

```tsx
// KRDS 색상 시스템
<Button variant="primary">    // krds-primary-base
<Button variant="secondary">  // krds-secondary-base
<Button variant="tertiary">   // krds-tertiary-base

// KRDS 타이포그래피
<Heading level="h1">  // 32px, Bold
<Body size="lg">      // 18px, Regular
```

### 3. 접근성 자동 보장

개발자가 신경 쓸 필요 없이 접근성이 자동으로 구현됩니다:

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  {/* 자동으로 포함됨:
    - aria-modal="true"
    - role="dialog"
    - focus trap
    - ESC 키로 닫기
    - 백그라운드 스크롤 방지
  */}
  <Modal.Title>제목</Modal.Title>
  <Modal.Content>내용</Modal.Content>
</Modal>
```

## 📦 현재 상태 (2025년 1월)

### 완성된 컴포넌트 (13개)

#### 기본 요소

- `Button` - 다양한 variant와 size
- `Input` - 폼 입력 필드
- `Textarea` - 여러 줄 텍스트 입력

#### 선택 컴포넌트

- `Select` - 드롭다운 선택
- `Radio` - 라디오 버튼 그룹
- `Checkbox` - 체크박스

#### 콘텐츠 표시

- `Card` - 콘텐츠 카드
- `Badge` - 뱃지 태그
- `Table` - 데이터 테이블
- `Pagination` - 페이지네이션

#### 인터랙션

- `Modal` - 모달 다이얼로그
- `Tabs` - 탭 네비게이션
- `Breadcrumb` - 경로 네비게이션

### 개발 예정

- Form (검증 및 관리)
- Toast (알림 메시지)
- Dropdown (드롭다운 메뉴)
- Accordion (접을 수 있는 콘텐츠)
- 그리고 더 많은 컴포넌트들...

## 💻 사용 예제

### 설치

```bash
# 1. 프로젝트 초기화
npx hanui init my-project

# 2. 컴포넌트 추가
npx hanui add button input card

# 3. 바로 사용
npm run dev
```

### 코드 예제

```tsx
import { Button, Input, Card } from '@hanui/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full" size="lg">
          로그인
        </Button>
      </div>
    </Card>
  );
}
```

결과:

- ✅ KRDS 준수 디자인
- ✅ 완벽한 접근성
- ✅ 반응형 레이아웃
- ✅ TypeScript 타입 지원

## 🤔 왜 오픈소스로?

### 1. 혼자서는 불가능

공공기관 웹사이트에 필요한 모든 컴포넌트를 혼자 만들기는 불가능합니다. 커뮤니티의 힘이 필요합니다.

### 2. 같은 문제를 겪는 사람들

공공기관 프로젝트를 진행하는 개발자라면 모두 비슷한 고민을 하고 있을 것입니다. 함께 해결하면 더 좋은 결과를 만들 수 있습니다.

### 3. 더 나은 공공 웹을 위해

결국 이 라이브러리가 널리 사용되면, 한국의 공공 웹사이트들이 더 나은 사용자 경험을 제공할 수 있습니다.

## 🚀 앞으로의 계획

### 단기 목표 (1-2개월)

- [ ] 스타터 킷 완성 (Portal/Admin 템플릿)
- [ ] Form 검증 컴포넌트
- [ ] Toast 알림
- [ ] 실제 프로젝트 적용 사례 1개 이상

### 중기 목표 (3-6개월)

- [ ] 모든 기본 컴포넌트 완성
- [ ] Figma 디자인 키트
- [ ] Storybook 문서
- [ ] GitHub Star 100개

### 장기 목표 (1년)

- [ ] 프리미엄 템플릿 출시
- [ ] 공공기관 실사용 사례 10개
- [ ] 커뮤니티 활성화
- [ ] 컨퍼런스 발표

## 🙏 피드백을 기다립니다

HANUI는 아직 개발 초기 단계입니다. 여러분의 피드백이 정말 중요합니다.

- **필요한 컴포넌트가 있나요?** → [이슈 남기기](https://github.com/hanui-o/hanui/issues/new)
- **버그를 발견했나요?** → [버그 리포트](https://github.com/hanui-o/hanui/issues/new)
- **함께 만들고 싶나요?** → [기여 가이드](https://github.com/hanui-o/hanui/blob/main/CONTRIBUTING.md)
- **의견을 나누고 싶나요?** → [디스커션 참여](https://github.com/hanui-o/hanui/discussions)

## 🔗 링크

- **문서**: [hanui.io](https://hanui.io)
- **GitHub**: [github.com/hanui-o/hanui](https://github.com/hanui-o/hanui)
- **NPM**: [@hanui/react](https://www.npmjs.com/package/@hanui/react)
- **이메일**: odada@oddodd.io

---

## 마치며

완벽하지 않습니다. 아직 부족한 부분도 많고, 추가해야 할 컴포넌트도 많습니다.

하지만 시작했습니다. 그리고 계속 개선해나갈 것입니다.

공공 웹사이트 개발로 고민하시는 분들, 함께 만들어가요! 🇰🇷

---

**⭐ 프로젝트가 마음에 드신다면 GitHub Star 부탁드립니다!**

[github.com/hanui-o/hanui](https://github.com/hanui-o/hanui)
