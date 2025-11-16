# HANUI 스타터킷 필수 설정 가이드

> HANUI 기반 프로젝트를 시작할 때 반드시 적용해야 할 설정 및 규칙

**작성일**: 2025-11-15
**대상**: 새로운 HANUI 프로젝트를 시작하는 개발자
**상태**: 작성 완료

---

## 📋 목차

1. [필수 컴포넌트 현황](#필수-컴포넌트-현황)
2. [스타터킷 예제 페이지](#스타터킷-예제-페이지)
3. [KRDS 색상 시스템 설정](#krds-색상-시스템-설정)
4. [Tailwind CSS 설정](#tailwind-css-설정)
5. [타이포그래피 설정](#타이포그래피-설정)
6. [다크 모드 설정](#다크-모드-설정)
7. [프로젝트 구조](#프로젝트-구조)
8. [필수 의존성](#필수-의존성)

---

## 1. 필수 컴포넌트 현황

### 1.1 현재 제공 중인 컴포넌트 (26개)

#### Typography (5개)

- **Display** - 대형 제목 (36px, 44px, 60px)
- **Heading** - 제목 (17px ~ 40px)
- **Body** - 본문 (13px ~ 19px)
- **NavText** - 네비게이션 텍스트
- **Label** - 라벨 (폼 필드용)

#### Layout (5개)

- **Container** - 컨테이너 (max-width 제한)
- **Stack** - 수직/수평 스택 레이아웃
- **Section** - 섹션 래퍼
- **Box** - 범용 박스 컴포넌트
- **Card** - 카드 (Header, Body, Footer)

#### Form (5개)

- **Input** - 텍스트 입력
- **Select** - 드롭다운 선택
- **FileUpload** - 파일 업로드
- **Label** - 폼 라벨
- **Button** - 버튼
- 🔜 **Checkbox** - 체크박스 (v1.0 필수)
- 🔜 **Radio** - 라디오 버튼 (v1.0 필수)
- 🔜 **Textarea** - 텍스트 영역 (v1.0 필수)

#### Navigation (5개)

- **Breadcrumb** - 경로 표시
- **Pagination** - 페이지네이션
- **Tabs** - 탭
- **Header** - 헤더 (Identity)
- **SkipLink** - 스킵 링크 (접근성)
- 🔜 **Footer** - 푸터 (v1.0 권장)
- 🔜 **Link** - 링크 컴포넌트 (v1.1)

#### Feedback (2개)

- **Modal** - 모달 대화상자
- **Tooltip** - 툴팁
- 🔜 **Alert** - 알림 배너 (v1.0 필수)
- 🔜 **Badge** - 뱃지/태그 (v1.0 권장)
- 🔜 **Toast** - 토스트 알림 (v1.1)
- 🔜 **Spinner** - 로딩 (v1.1)

#### Data Display (2개)

- **Table** - 테이블
- **Accordion** - 아코디언
- 🔜 **List** - 리스트 (v1.1)

#### Identity (2개)

- **Masthead** - 마스트헤드 (정부 사이트 상단)
- **Identifier** - 신원 표시

### 1.2 v1.0 출시 전 필수 추가 컴포넌트

실무에서 정부 사이트를 구축하려면 최소한 다음 컴포넌트가 필요합니다:

#### 🔥 High Priority (v1.0 필수)

1. **Checkbox** - 가장 많이 사용되는 폼 요소
2. **Radio** - 단일 선택 폼 요소
3. **Textarea** - 긴 텍스트 입력
4. **Alert** - 에러/성공/경고 메시지 표시
5. **Badge** - 상태 표시 (신규, 진행중, 완료 등)
6. **Footer** - Header와 세트 (저작권, 주소, 연락처 필수)
7. **Link** - 접근성 고려한 링크 컴포넌트

### 1.3 컴포넌트 완성도 목표

```
v1.0 (스타터킷 출시)  → 33개 (현재 26개 + 필수 7개)
v1.1 (첫 업데이트)    → 37개 (Toast, Spinner, FormField, Nav)
v1.2 (두번째 업데이트) → 40개 (List, Divider, Skeleton)
v2.0 (메이저 업데이트) → 45개+ (고급 기능)
```

---

## 2. 스타터킷 예제 페이지

### 2.1 필수 포함 페이지

스타터킷을 사용해 정부 사이트를 만들 때, 최소한 다음 페이지를 구현할 수 있어야 합니다:

#### 1) 메인 페이지 (`/`)

```tsx
// app/page.tsx
import {
  Masthead,
  Header,
  Container,
  Section,
  Heading,
  Body,
  Card,
  Button,
  Footer,
} from '@hanui/react';

export default function HomePage() {
  return (
    <>
      <Masthead />
      <Header />

      <main>
        {/* Hero Section */}
        <Section className="bg-primary-5 dark:bg-primary-95">
          <Container>
            <Heading level="h1" size="xl">
              대한민국 정부 서비스
            </Heading>
            <Body size="lg" className="mt-4">
              국민을 위한 디지털 서비스를 제공합니다.
            </Body>
            <Button variant="primary" size="lg" className="mt-6">
              서비스 시작하기
            </Button>
          </Container>
        </Section>

        {/* Features */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <Card.Header>
                  <Card.Title>빠른 민원 처리</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Body>온라인으로 간편하게 민원을 신청하세요.</Body>
                </Card.Body>
              </Card>
              {/* More cards... */}
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
```

#### 2) 폼 페이지 (`/apply`)

민원 신청, 회원가입 등 폼이 필요한 페이지:

```tsx
// app/apply/page.tsx
import {
  Container,
  Heading,
  Body,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Button,
  Alert,
} from '@hanui/react';

export default function ApplyPage() {
  return (
    <Container>
      <Heading level="h1">민원 신청</Heading>

      <Alert variant="information" className="mt-4">
        모든 항목을 정확히 입력해주세요.
      </Alert>

      <form className="mt-6 space-y-6">
        {/* 이름 */}
        <div>
          <Label htmlFor="name">이름</Label>
          <Input id="name" placeholder="홍길동" required />
        </div>

        {/* 연락처 */}
        <div>
          <Label htmlFor="phone">연락처</Label>
          <Input id="phone" type="tel" placeholder="010-1234-5678" />
        </div>

        {/* 민원 종류 */}
        <div>
          <Label htmlFor="type">민원 종류</Label>
          <Select
            id="type"
            options={[
              { value: 'complaint', label: '불편 신고' },
              { value: 'suggestion', label: '건의 사항' },
              { value: 'inquiry', label: '문의 사항' },
            ]}
          />
        </div>

        {/* 민원 내용 */}
        <div>
          <Label htmlFor="content">민원 내용</Label>
          <Textarea
            id="content"
            rows={5}
            placeholder="상세한 내용을 입력하세요"
          />
        </div>

        {/* 동의 체크박스 */}
        <Checkbox id="agree">
          <Label htmlFor="agree">개인정보 수집 및 이용에 동의합니다.</Label>
        </Checkbox>

        {/* 알림 수신 라디오 */}
        <div>
          <Body size="sm" className="mb-2">
            처리 결과 알림 수신 방법
          </Body>
          <Radio name="notification" value="email">
            이메일
          </Radio>
          <Radio name="notification" value="sms">
            SMS
          </Radio>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          신청하기
        </Button>
      </form>
    </Container>
  );
}
```

#### 3) 목록 페이지 (`/notices`)

공지사항, 게시판 등 목록 페이지:

```tsx
// app/notices/page.tsx
import {
  Container,
  Heading,
  Table,
  Badge,
  Pagination,
  Input,
  Button,
} from '@hanui/react';

export default function NoticesPage() {
  return (
    <Container>
      <Heading level="h1">공지사항</Heading>

      {/* 검색 */}
      <div className="flex gap-2 mt-6">
        <Input placeholder="검색어를 입력하세요" className="flex-1" />
        <Button variant="primary">검색</Button>
      </div>

      {/* 테이블 */}
      <Table className="mt-6">
        <Table.Header>
          <Table.Row>
            <Table.Head>번호</Table.Head>
            <Table.Head>제목</Table.Head>
            <Table.Head>작성일</Table.Head>
            <Table.Head>상태</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>시스템 점검 안내</Table.Cell>
            <Table.Cell>2025-11-15</Table.Cell>
            <Table.Cell>
              <Badge variant="danger">긴급</Badge>
            </Table.Cell>
          </Table.Row>
          {/* More rows... */}
        </Table.Body>
      </Table>

      {/* 페이지네이션 */}
      <Pagination currentPage={1} totalPages={10} className="mt-6" />
    </Container>
  );
}
```

#### 4) 상세 페이지 (`/notices/[id]`)

공지사항 상세, 민원 조회 등:

```tsx
// app/notices/[id]/page.tsx
import {
  Container,
  Heading,
  Body,
  Badge,
  Breadcrumb,
  Card,
  Button,
} from '@hanui/react';

export default function NoticeDetailPage() {
  return (
    <Container>
      {/* 경로 표시 */}
      <Breadcrumb>
        <Breadcrumb.Item href="/">홈</Breadcrumb.Item>
        <Breadcrumb.Item href="/notices">공지사항</Breadcrumb.Item>
        <Breadcrumb.Item current>시스템 점검 안내</Breadcrumb.Item>
      </Breadcrumb>

      {/* 제목 */}
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Badge variant="danger">긴급</Badge>
          <Heading level="h1">시스템 점검 안내</Heading>
        </div>
        <Body size="sm" className="text-gray-60 mt-2">
          작성일: 2025-11-15 | 조회수: 1,234
        </Body>
      </div>

      {/* 내용 */}
      <Card className="mt-6">
        <Card.Body>
          <Body>
            시스템 점검으로 인해 2025년 11월 20일 02:00 ~ 06:00까지 서비스
            이용이 일시 중단됩니다.
          </Body>
          <Body className="mt-4">이용에 불편을 드려 죄송합니다.</Body>
        </Card.Body>
      </Card>

      {/* 버튼 */}
      <div className="flex gap-2 mt-6">
        <Button variant="outline" href="/notices">
          목록으로
        </Button>
        <Button variant="primary">이전 글</Button>
        <Button variant="primary">다음 글</Button>
      </div>
    </Container>
  );
}
```

#### 5) 에러 페이지 (`app/error.tsx`)

```tsx
// app/error.tsx
'use client';

import { Container, Heading, Body, Button, Alert } from '@hanui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container className="py-20 text-center">
      <Alert variant="danger" className="mb-6">
        오류가 발생했습니다
      </Alert>
      <Heading level="h1">서비스 오류</Heading>
      <Body className="mt-4">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </Body>
      <div className="flex gap-2 justify-center mt-6">
        <Button variant="primary" onClick={reset}>
          다시 시도
        </Button>
        <Button variant="outline" href="/">
          홈으로
        </Button>
      </div>
    </Container>
  );
}
```

### 2.2 페이지 구성 체크리스트

스타터킷으로 최소한 다음 페이지를 만들 수 있어야 실무 사용 가능:

- [ ] **메인 페이지** - Hero, Features, CTA
- [ ] **폼 페이지** - 민원 신청, 회원가입
- [ ] **목록 페이지** - 공지사항, 게시판
- [ ] **상세 페이지** - 공지사항 상세, 민원 조회
- [ ] **에러 페이지** - 404, 500 에러
- [ ] **로그인 페이지** - 이메일/비밀번호 폼
- [ ] **마이페이지** - 사용자 정보 수정

### 2.3 현재 불가능한 페이지

다음 컴포넌트가 없어서 현재는 만들기 어려운 페이지:

- **회원가입** - Checkbox, Radio 없음
- **설정 페이지** - Checkbox, Radio 없음
- **리뷰/댓글** - Textarea 없음
- **알림 센터** - Alert, Badge 없음
- **로딩 상태** - Spinner 없음

---

## 3. KRDS 색상 시스템 설정

### 3.1 globals.css 설정

**파일**: `src/app/globals.css` (Next.js) 또는 `src/index.css` (Vite)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import 'pretendard/dist/web/static/pretendard.css';

:root {
  --font-pretendard:
    'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  /* KRDS Color Tokens - Light Mode */
  /* Primary */
  --krds-color-light-primary-5: #ecf2fe;
  --krds-color-light-primary-10: #d8e5fd;
  --krds-color-light-primary-20: #b1cefb;
  --krds-color-light-primary-30: #86aff9;
  --krds-color-light-primary-40: #4c87f6;
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0b50d0;
  --krds-color-light-primary-70: #083891;
  --krds-color-light-primary-80: #052561;
  --krds-color-light-primary-90: #03163a;
  --krds-color-light-primary-95: #020f27;

  /* Secondary */
  --krds-color-light-secondary-5: #eef2f7;
  --krds-color-light-secondary-10: #d6e0eb;
  --krds-color-light-secondary-20: #bacbde;
  --krds-color-light-secondary-30: #90b0d5;
  --krds-color-light-secondary-40: #6b96c7;
  --krds-color-light-secondary-50: #346fb2;
  --krds-color-light-secondary-60: #1c589c;
  --krds-color-light-secondary-70: #063a74;
  --krds-color-light-secondary-80: #052b57;
  --krds-color-light-secondary-90: #031f3f;
  --krds-color-light-secondary-95: #02162c;

  /* Gray */
  --krds-color-light-gray-5: #f4f5f6;
  --krds-color-light-gray-10: #e6e8ea;
  --krds-color-light-gray-20: #cdd1d5;
  --krds-color-light-gray-30: #b1b8be;
  --krds-color-light-gray-40: #8a949e;
  --krds-color-light-gray-50: #6d7882;
  --krds-color-light-gray-60: #58616a;
  --krds-color-light-gray-70: #464c53;
  --krds-color-light-gray-80: #33363d;
  --krds-color-light-gray-90: #1e2124;
  --krds-color-light-gray-95: #131416;

  /* Danger */
  --krds-color-light-danger-5: #fdefec;
  --krds-color-light-danger-10: #fcdfd9;
  --krds-color-light-danger-20: #f7afa1;
  --krds-color-light-danger-30: #f48771;
  --krds-color-light-danger-40: #f05f42;
  --krds-color-light-danger-50: #de3412;
  --krds-color-light-danger-60: #bd2c0f;
  --krds-color-light-danger-70: #8a240f;
  --krds-color-light-danger-80: #5c180a;
  --krds-color-light-danger-90: #390d05;
  --krds-color-light-danger-95: #260903;

  /* Warning */
  --krds-color-light-warning-5: #fff3db;
  --krds-color-light-warning-10: #ffe0a3;
  --krds-color-light-warning-20: #ffc95c;
  --krds-color-light-warning-30: #ffb114;
  --krds-color-light-warning-40: #c78500;
  --krds-color-light-warning-50: #9e6a00;
  --krds-color-light-warning-60: #8a5c00;
  --krds-color-light-warning-70: #614100;
  --krds-color-light-warning-80: #422c00;
  --krds-color-light-warning-90: #2e1f00;
  --krds-color-light-warning-95: #241800;

  /* Success */
  --krds-color-light-success-5: #eaf6ec;
  --krds-color-light-success-10: #d8eedd;
  --krds-color-light-success-20: #a9dab4;
  --krds-color-light-success-30: #7ec88e;
  --krds-color-light-success-40: #3fa654;
  --krds-color-light-success-50: #228738;
  --krds-color-light-success-60: #267337;
  --krds-color-light-success-70: #285d33;
  --krds-color-light-success-80: #1f4727;
  --krds-color-light-success-90: #122b18;
  --krds-color-light-success-95: #0e2012;

  /* Information */
  --krds-color-light-information-5: #e7f4fe;
  --krds-color-light-information-10: #d3ebfd;
  --krds-color-light-information-20: #9ed2fa;
  --krds-color-light-information-30: #5fb5f7;
  --krds-color-light-information-40: #2098f3;
  --krds-color-light-information-50: #0b78cb;
  --krds-color-light-information-60: #096ab3;
  --krds-color-light-information-70: #085691;
  --krds-color-light-information-80: #053961;
  --krds-color-light-information-90: #03253f;
  --krds-color-light-information-95: #021a2c;

  /* Point */
  --krds-color-light-point-5: #fbeff0;
  --krds-color-light-point-10: #f5d6d9;
  --krds-color-light-point-20: #ebadb2;
  --krds-color-light-point-30: #e0858c;
  --krds-color-light-point-40: #d65c66;
  --krds-color-light-point-50: #d63d4a;
  --krds-color-light-point-60: #ab2b36;
  --krds-color-light-point-70: #7a1f26;
  --krds-color-light-point-80: #521419;
  --krds-color-light-point-90: #310c0f;
  --krds-color-light-point-95: #21080a;
}

.dark {
  /* KRDS Color Tokens - Dark Mode */
  /* Primary - 다크모드에서는 밝은 톤 사용 */
  --krds-color-light-primary-5: #020f27;
  --krds-color-light-primary-10: #03163a;
  --krds-color-light-primary-20: #052561;
  --krds-color-light-primary-30: #083891;
  --krds-color-light-primary-40: #0b50d0;
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #4c87f6;
  --krds-color-light-primary-70: #86aff9;
  --krds-color-light-primary-80: #b1cefb;
  --krds-color-light-primary-90: #d8e5fd;
  --krds-color-light-primary-95: #ecf2fe;

  /* Secondary - 다크모드용 청록색 톤 */
  --krds-color-light-secondary-5: #091f25;
  --krds-color-light-secondary-10: #0e3139;
  --krds-color-light-secondary-20: #113b45;
  --krds-color-light-secondary-30: #17505e;
  --krds-color-light-secondary-40: #1f687a;
  --krds-color-light-secondary-50: #268097;
  --krds-color-light-secondary-60: #3d9fb8;
  --krds-color-light-secondary-70: #75c0d1;
  --krds-color-light-secondary-80: #abd8e3;
  --krds-color-light-secondary-90: #d5ebf1;
  --krds-color-light-secondary-95: #edf6f8;

  /* Gray - 반전 */
  --krds-color-light-gray-5: #131416;
  --krds-color-light-gray-10: #1e2124;
  --krds-color-light-gray-20: #33363d;
  --krds-color-light-gray-30: #464c53;
  --krds-color-light-gray-40: #58616a;
  --krds-color-light-gray-50: #6d7882;
  --krds-color-light-gray-60: #8a949e;
  --krds-color-light-gray-70: #b1b8be;
  --krds-color-light-gray-80: #cdd1d5;
  --krds-color-light-gray-90: #e6e8ea;
  --krds-color-light-gray-95: #f4f5f6;

  /* Danger - 다크모드에서 살짝 밝게 */
  --krds-color-light-danger-5: #260903;
  --krds-color-light-danger-10: #390d05;
  --krds-color-light-danger-20: #5c180a;
  --krds-color-light-danger-30: #8a240f;
  --krds-color-light-danger-40: #bd2c0f;
  --krds-color-light-danger-50: #de3412;
  --krds-color-light-danger-60: #f05f42;
  --krds-color-light-danger-70: #f48771;
  --krds-color-light-danger-80: #f7afa1;
  --krds-color-light-danger-90: #fcdfd9;
  --krds-color-light-danger-95: #fdefec;

  /* Warning - 다크모드에서 밝은 노란색 */
  --krds-color-light-warning-5: #241800;
  --krds-color-light-warning-10: #2e1f00;
  --krds-color-light-warning-20: #422c00;
  --krds-color-light-warning-30: #614100;
  --krds-color-light-warning-40: #8a5c00;
  --krds-color-light-warning-50: #9e6a00;
  --krds-color-light-warning-60: #c78500;
  --krds-color-light-warning-70: #ffb114;
  --krds-color-light-warning-80: #ffc95c;
  --krds-color-light-warning-90: #ffe0a3;
  --krds-color-light-warning-95: #fff3db;

  /* Success - 다크모드에서 밝은 녹색 */
  --krds-color-light-success-5: #0e2012;
  --krds-color-light-success-10: #122b18;
  --krds-color-light-success-20: #1f4727;
  --krds-color-light-success-30: #285d33;
  --krds-color-light-success-40: #267337;
  --krds-color-light-success-50: #228738;
  --krds-color-light-success-60: #3fa654;
  --krds-color-light-success-70: #7ec88e;
  --krds-color-light-success-80: #a9dab4;
  --krds-color-light-success-90: #d8eedd;
  --krds-color-light-success-95: #eaf6ec;

  /* Information - 다크모드에서 밝은 파란색 */
  --krds-color-light-information-5: #021a2c;
  --krds-color-light-information-10: #03253f;
  --krds-color-light-information-20: #053961;
  --krds-color-light-information-30: #085691;
  --krds-color-light-information-40: #096ab3;
  --krds-color-light-information-50: #0b78cb;
  --krds-color-light-information-60: #2098f3;
  --krds-color-light-information-70: #5fb5f7;
  --krds-color-light-information-80: #9ed2fa;
  --krds-color-light-information-90: #d3ebfd;
  --krds-color-light-information-95: #e7f4fe;

  /* Point - 다크모드에서 밝은 핑크 */
  --krds-color-light-point-5: #21080a;
  --krds-color-light-point-10: #310c0f;
  --krds-color-light-point-20: #521419;
  --krds-color-light-point-30: #7a1f26;
  --krds-color-light-point-40: #ab2b36;
  --krds-color-light-point-50: #d63d4a;
  --krds-color-light-point-60: #d65c66;
  --krds-color-light-point-70: #e0858c;
  --krds-color-light-point-80: #ebadb2;
  --krds-color-light-point-90: #f5d6d9;
  --krds-color-light-point-95: #fbeff0;
}

body {
  font-family: var(--font-pretendard);
}

@layer base {
  * {
    @apply border-gray-20 dark:border-gray-80;
  }

  html {
    /* KRDS 기본 폰트 크기: 17px (Pretendard GOV 최적화) */
    font-size: 17px;
    line-height: 1.5; /* 150% */
  }

  body {
    @apply bg-white dark:bg-gray-95 text-gray-90 dark:text-gray-10;
    font-size: 1rem; /* 17px */
  }
}
```

### 3.2 중요한 설계 결정

#### 제거된 스케일

- `gray-0`과 `gray-100` 제거
- 이유: Tailwind 스케일과 충돌 방지
- 사용 가능: `gray-5`부터 `gray-95`까지

#### CSS 변수 네이밍

- 라이트/다크 모드 모두 `--krds-color-light-*` 사용
- 이유: KRDS 공식 네이밍 규칙 준수

#### 🎨 다크 모드 전략

- Primary/Secondary/Information: 밝기 반전
- Gray: 완전 반전 (5↔95, 10↔90)
- Danger/Warning/Success: 밝기 증가 (가독성 개선)

---

## 4. Tailwind CSS 설정

### 4.1 tailwind.config.ts 필수 설정

**파일**: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // ⭐ 필수: 다크 모드 class 방식
  theme: {
    extend: {
      fontFamily: {
        krona: ['var(--font-krona-one)'],
      },
      fontSize: {
        // KRDS Typography Scale
        'body-xs': ['13px', { lineHeight: '150%' }],
        'body-sm': ['15px', { lineHeight: '150%' }],
        'body-md': ['17px', { lineHeight: '150%' }], // 기본값
        'body-lg': ['19px', { lineHeight: '150%' }],

        'heading-xs': ['17px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-sm': ['19px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-md': ['24px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-lg': ['32px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-xl': ['40px', { lineHeight: '150%', fontWeight: '700' }],

        'display-sm': ['36px', { lineHeight: '150%', fontWeight: '700' }],
        'display-md': ['44px', { lineHeight: '150%', fontWeight: '700' }],
        'display-lg': ['60px', { lineHeight: '150%', fontWeight: '700' }],

        // Tailwind 기본값 오버라이드
        base: ['17px', { lineHeight: '150%' }],
      },
      spacing: {
        // KRDS Spacing (8-point grid)
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      colors: {
        // ⭐ 중요: KRDS 색상 시스템
        // 참고: CSS 변수 사용 - 라이트/다크 모드 자동 대응
        primary: {
          DEFAULT: 'var(--krds-color-light-primary-60)',
          // KRDS 스케일 (5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95)
          5: 'var(--krds-color-light-primary-5)',
          10: 'var(--krds-color-light-primary-10)',
          20: 'var(--krds-color-light-primary-20)',
          30: 'var(--krds-color-light-primary-30)',
          40: 'var(--krds-color-light-primary-40)',
          50: 'var(--krds-color-light-primary-50)',
          60: 'var(--krds-color-light-primary-60)',
          70: 'var(--krds-color-light-primary-70)',
          80: 'var(--krds-color-light-primary-80)',
          90: 'var(--krds-color-light-primary-90)',
          95: 'var(--krds-color-light-primary-95)',
          // Tailwind 호환 스케일 (100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
          100: 'var(--krds-color-light-primary-10)',
          200: 'var(--krds-color-light-primary-20)',
          300: 'var(--krds-color-light-primary-30)',
          400: 'var(--krds-color-light-primary-40)',
          500: 'var(--krds-color-light-primary-50)',
          600: 'var(--krds-color-light-primary-60)',
          700: 'var(--krds-color-light-primary-70)',
          800: 'var(--krds-color-light-primary-80)',
          900: 'var(--krds-color-light-primary-90)',
          950: 'var(--krds-color-light-primary-95)',
        },
        // gray, secondary, danger, warning, success, information, point도 동일 구조
        // ... (생략)
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4.2 색상 사용 규칙

#### KRDS 스케일 사용 (권장)

```tsx
// 권장: KRDS 공식 스케일 사용
<div className="bg-primary-60 text-gray-10">
  <button className="hover:bg-primary-70">클릭</button>
</div>
```

#### Tailwind 스케일 사용 (호환)

```tsx
// 호환: Tailwind 스케일도 사용 가능 (같은 CSS 변수 참조)
<div className="bg-primary-600 text-gray-100">
  <button className="hover:bg-primary-700">클릭</button>
</div>
```

#### 사용 금지

```tsx
// gray-0과 gray-100은 제거됨
<div className="bg-gray-0">  // 사용 불가
<div className="bg-gray-100"> // 사용 불가 (gray-10 사용)
```

---

## 5. 타이포그래피 설정

### 5.1 Pretendard 폰트 설치

```bash
pnpm add pretendard
```

### 5.2 폰트 적용

**Next.js App Router**:

```typescript
// app/layout.tsx
import 'pretendard/dist/web/static/pretendard.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-pretendard">{children}</body>
    </html>
  );
}
```

### 5.3 타이포그래피 컴포넌트 사용

```tsx
import { Heading, Body } from '@hanui/react';

// Heading 사용
<Heading level="h1">페이지 제목</Heading>
<Heading level="h2" size="lg">섹션 제목</Heading>

// Body 사용
<Body size="md">본문 텍스트 (기본: 17px)</Body>
<Body size="sm">작은 텍스트 (15px)</Body>
```

---

## 6. 다크 모드 설정

### 6.1 next-themes 설치 (Next.js)

```bash
pnpm add next-themes
```

### 6.2 ThemeProvider 설정

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 6.3 다크 모드 자동 전환

```tsx
// 권장: CSS 변수가 자동으로 전환됨
<div className="bg-primary-60 text-gray-10">
  라이트 모드: 진한 파란색 배경
  다크 모드: 밝은 파란색 배경 (자동 전환)
</div>

// 불필요: dark: 접두사 사용할 필요 없음
<div className="bg-primary-60 dark:bg-primary-40">
  CSS 변수가 자동 전환되므로 이렇게 할 필요 없음
</div>
```

**예외**: CSS 변수를 사용하지 않는 Tailwind 유틸리티는 `dark:` 접두사 필요:

```tsx
<div className="opacity-50 dark:opacity-70">
<div className="shadow-lg dark:shadow-xl">
```

---

## 7. 프로젝트 구조

### 7.1 권장 폴더 구조

```
my-hanui-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css         # ⭐ KRDS CSS 변수 정의
│   │
│   ├── components/             # React 컴포넌트
│   │   ├── ui/                # HANUI 컴포넌트 재export
│   │   └── features/          # 기능별 컴포넌트
│   │
│   └── styles/                # 추가 스타일
│
├── public/                     # 정적 파일
├── tailwind.config.ts          # ⭐ KRDS 색상 매핑
├── tsconfig.json
└── package.json
```

---

## 8. 필수 의존성

### 8.1 package.json

```json
{
  "dependencies": {
    "@hanui/react": "^0.1.0",
    "next": "^15.0.0",
    "next-themes": "^0.4.0",
    "pretendard": "^1.3.9",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.7.0"
  }
}
```

---

## 9. 체크리스트

### 프로젝트 시작 전

- [ ] `globals.css`에 KRDS CSS 변수 추가
- [ ] `tailwind.config.ts`에 KRDS 색상 매핑 추가
- [ ] `darkMode: 'class'` 설정
- [ ] Pretendard 폰트 설치 및 적용
- [ ] next-themes 설치 및 ThemeProvider 설정

### 코드 작성 시

- [ ] **KRDS 스케일 사용** (5, 10, 20, ..., 95)
- [ ] `gray-0`, `gray-100` 사용 금지
- [ ] CSS 변수 기반 색상은 `dark:` 접두사 불필요
- [ ] Heading/Body 컴포넌트 사용
- [ ] 접근성 고려 (WCAG 2.1 AA)

---

## 10. 참고 문서

- [KRDS 공식 색상 가이드](https://www.krds.go.kr/html/site/utility/utility_03.html)
- [KRDS 리소스 가이드](./KRDS_RESOURCES.md)
- [디자인 토큰 페이지](../../apps/docs/src/app/design-tokens/page.tsx)

---

**작성자**: @odada-o
**업데이트**: 2025-11-15
**Status**: 스타터킷 가이드 작성 완료 (컴포넌트 현황 및 예제 페이지 추가)

**다음 작업**:

- [ ] v1.0 필수 컴포넌트 7개 구현 (Checkbox, Radio, Textarea, Alert, Badge, Footer, Link)
- [ ] 스타터킷 예제 프로젝트 생성 (create-hanui-app)
- [ ] 컴포넌트 문서 작성 (각 컴포넌트별 상세 가이드)

**관련 이슈**:

- KRDS 색상 시스템 통합
- 타이포그래피 시스템
- 다크 모드 구현
- v1.0 필수 컴포넌트 개발
