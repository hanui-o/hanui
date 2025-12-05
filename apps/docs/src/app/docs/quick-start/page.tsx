'use client';

import { useState } from 'react';
import { Check, Copy, Sparkles, Zap } from 'lucide-react';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// UI components - from @hanui/react
import {
  List,
  ListItem,
  Code,
  Body,
  Card,
  Link,
  Button,
  Modal,
  Alert,
} from '@hanui/react';

const AI_PROMPT_ALL = `HANUI 라이브러리를 설치하고 모든 컴포넌트를 추가해줘.

1. CLI 설치: npm install -D @hanui/cli
2. 초기화: npx hanui init -y
3. 모든 컴포넌트 설치: npx hanui add all -y

설치 후 사용법:
import { Button, Card, Header, Footer } from '@/components/hanui'

공식 문서: https://hanui.io/docs/quick-start`;

export default function QuickStartPage() {
  const [aiCopied, setAiCopied] = useState(false);

  const handleAiCopy = async () => {
    await navigator.clipboard.writeText(AI_PROMPT_ALL);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  return (
    <>
      <Heading
        level="h1"
        title="Quick Start"
        description="HANUI의 기본 사용법을 빠르게 익혀보세요. 5분이면 충분합니다!"
      />

      {/* Getting Started */}
      <Section>
        <Heading level="h2" id="getting-started" title="시작하기" />

        <Body className="mb-6 text-krds-gray-70">
          React/Next.js 프로젝트에 HANUI를 추가합니다. CLI가 KRDS 디자인 토큰과
          Tailwind 설정을 자동으로 구성합니다.
        </Body>

        <Subsection level="h3">
          <Heading level="h3" title="1. CLI 설치" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            npm install -D @hanui/cli
          </Code>
          <Body className="text-krds-gray-60 mt-2 text-sm">
            devDependency로 설치하면 짧은 명령어로 사용할 수 있습니다.
          </Body>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="2. 프로젝트 초기화" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            npx hanui init
          </Code>
          <Alert variant="info" className="mt-4" title="init이 하는 일">
            <List variant="check" className="mt-2 text-sm">
              <ListItem>
                <Code>variables.css</Code> 생성 — KRDS 색상, 타이포그래피 CSS
                변수
              </ListItem>
              <ListItem>
                <Code>tailwind.config</Code> 수정 — KRDS 색상을 Tailwind
                유틸리티로 매핑
              </ListItem>
              <ListItem>
                <Code>globals.css</Code> 수정 — CSS 변수 import 추가
              </ListItem>
              <ListItem>
                <Code>components/hanui</Code> 디렉토리 생성
              </ListItem>
            </List>
          </Alert>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="3. 컴포넌트 추가" />
          <Code variant="block" language="bash" showLineNumbers={false}>
            {`# 단일 컴포넌트
npx hanui add button

# 여러 컴포넌트
npx hanui add button card input

# 모든 컴포넌트 한 번에 설치
npx hanui add all -y`}
          </Code>
          <Body className="text-krds-gray-70 mt-3">
            컴포넌트 소스 코드가 <Code>components/hanui/</Code>에 복사됩니다.
          </Body>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="4. 사용하기" />
          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { Button, Card } from '@/components/hanui'

export default function Page() {
  return (
    <Card>
      <Button variant="primary">시작하기</Button>
    </Card>
  )
}`}
          </Code>
        </Subsection>

        {/* AI 프롬프트 섹션 */}
        <Card
          variant="outlined"
          className="mt-6 border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-violet-600" />
                <Heading level="h3" title="AI로 한 번에 설치하기" />
              </div>
              <Body className="text-krds-gray-70 text-sm mb-3">
                Cursor, Claude, ChatGPT 등 AI에게 아래 프롬프트를 전달하면 모든
                컴포넌트를 한 번에 설치할 수 있습니다.
              </Body>
              <div className="relative">
                <Code variant="block" language="text">
                  {AI_PROMPT_ALL}
                </Code>
                <button
                  onClick={handleAiCopy}
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600"
                >
                  {aiCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      AI 프롬프트 복사
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="info" className="mt-6">
          <Heading level="h3" title="왜 소스 코드 복사 방식인가요?" />
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <strong>완전한 소유권:</strong> 컴포넌트 코드가 프로젝트 안에 있어
              자유롭게 수정 가능
            </ListItem>
            <ListItem>
              <strong>버전 의존성 없음:</strong> 패키지 업데이트로 인한 Breaking
              Change 걱정 불필요
            </ListItem>
            <ListItem>
              <strong>번들 최적화:</strong> 사용하는 컴포넌트만 포함되어 번들
              크기 최소화
            </ListItem>
            <ListItem>
              <strong>프로젝트 맞춤 커스터마이징:</strong> 디자인 시스템에 맞게
              자유롭게 변경
            </ListItem>
          </List>
        </Card>
      </Section>

      {/* Common Patterns */}
      <Section>
        <Heading level="h2" id="common-patterns" title="자주 사용하는 패턴" />

        <Subsection level="h3">
          <Heading
            level="h3"
            title="폼 만들기"
            description="먼저 필요한 컴포넌트를 추가합니다:"
          />

          <Code variant="block" language="bash" showLineNumbers={false}>
            npx hanui add button input
          </Code>

          <Body className="text-krds-gray-70 mt-4">
            그 다음 간단한 로그인 폼을 만들 수 있습니다:
          </Body>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { Input } from '@/components/hanui/input';
// Button already imported from @hanui/react above

function LoginForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label htmlFor="email" className="block mb-2 font-medium">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 font-medium">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        로그인
      </Button>
    </form>
  );
}`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading
            level="h3"
            title="카드 레이아웃"
            description="Container와 Card 컴포넌트를 추가하고 깔끔한 레이아웃을 구성하세요:"
          />

          <Code variant="block" language="bash" showLineNumbers={false}>
            npx hanui add container card
          </Code>

          <Body className="text-krds-gray-70 mt-4">대시보드 UI 예제:</Body>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { Container } from '@/components/hanui/container';
// Card already imported from @hanui/react above

function Dashboard() {
  return (
    <Container maxWidth="xl">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-xl font-semibold mb-2">방문자 수</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">신규 회원</h2>
          <p className="text-3xl font-bold text-green-600">56</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">문의사항</h2>
          <p className="text-3xl font-bold text-orange-600">12</p>
        </Card>
      </div>
    </Container>
  );
}`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading
            level="h3"
            title="모달 사용하기"
            description="Modal과 Button 컴포넌트로 사용자 인터랙션을 추가합니다:"
          />

          <Code variant="block" language="bash" showLineNumbers={false}>
            npx hanui add modal button
          </Code>

          <Body className="text-krds-gray-70 mt-4">확인 다이얼로그 예제:</Body>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`import { useState } from 'react';
// Modal already imported from @hanui/react above
// Button already imported from @hanui/react above

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        삭제하기
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="정말 삭제하시겠습니까?"
      >
        <p className="mb-4">
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // 삭제 로직
              setIsOpen(false);
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>
    </>
  );
}`}
          </Code>
        </Subsection>
      </Section>

      {/* TypeScript Support */}
      <Section>
        <Heading
          level="h2"
          id="typescript-support"
          title="TypeScript 지원"
          description="HANUI 컴포넌트는 TypeScript로 작성되어 완벽한 타입 지원을 제공합니다. 복사된 소스 코드에는 모든 타입 정의가 포함되어 있어 즉시 사용 가능합니다:"
        />

        <Code variant="block" language="tsx" showLineNumbers={false}>
          {`import { Button, type ButtonProps } from '@/components/hanui/button';

// Props의 타입이 자동으로 추론됩니다
function CustomButton(props: ButtonProps) {
  return (
    <Button
      variant="primary"  // 자동완성 지원
      size="md"          // 잘못된 값은 에러 표시
      {...props}
    />
  );
}

// 이벤트 핸들러도 타입 안전
<Button onClick={(e: React.MouseEvent) => {
  console.log(e.currentTarget);
}}>
  클릭
</Button>`}
        </Code>

        <Card variant="info" className="mt-4">
          <Body>
            <strong>장점:</strong> 소스 코드가 프로젝트 안에 있어 타입 정의를
            직접 수정하여 프로젝트 요구사항에 맞게 확장할 수 있습니다.
          </Body>
        </Card>
      </Section>

      {/* Styling Customization */}
      <Section>
        <Heading
          level="h2"
          id="styling-customization"
          title="스타일 커스터마이징"
          description="소스 코드를 직접 소유하므로 자유롭게 커스터마이징할 수 있습니다. Tailwind CSS 클래스나 컴포넌트 소스 코드를 직접 수정하세요:"
        />

        <Subsection level="h3">
          <Heading level="h3" title="방법 1: className prop으로 간단히 수정" />

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`// Button already imported from @hanui/react above

<Button className="w-full rounded-full shadow-lg">
  전체 너비 둥근 버튼
</Button>

<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  그라데이션 버튼
</Button>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="방법 2: 소스 코드를 직접 수정">
            <Body className="text-krds-gray-70">
              <Code>components/hanui/button.tsx</Code> 파일을 열어 variant를
              추가하거나 수정하세요:
            </Body>
          </Heading>

          <Code variant="block" language="typescript" showLineNumbers={false}>
            {`// components/hanui/button.tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 ...',
  {
    variants: {
      variant: {
        primary: 'bg-[#256ef4] text-white hover:bg-[#0b50d0]',
        // 새로운 variant 추가! 🎨
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        // 기존 variant 수정도 자유롭게
      },
    },
  }
);`}
          </Code>

          <Body className="text-krds-gray-70 mt-3">
            이제 프로젝트에서 새로운 variant를 사용할 수 있습니다:
          </Body>

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`<Button variant="gradient">그라데이션 버튼</Button>`}
          </Code>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section>
        <Heading
          level="h2"
          id="accessibility"
          title="접근성 (Accessibility)"
          description="HANUI는 Radix UI Primitives 기반으로 구축되어 웹 접근성을 기본으로 제공합니다:"
        />

        <Card variant="filled">
          <List variant="check" className="text-krds-gray-90">
            <ListItem>
              <strong>Radix UI 기반:</strong> WAI-ARIA 표준을 준수하는 Headless
              UI 컴포넌트 사용
            </ListItem>
            <ListItem>
              <strong>키보드 네비게이션:</strong> Tab, Enter, Space, Escape 키로
              모든 컴포넌트 조작 가능
            </ListItem>
            <ListItem>
              <strong>스크린 리더:</strong> ARIA 레이블과 역할이 자동으로
              적용되어 스크린 리더 호환
            </ListItem>
            <ListItem>
              <strong>포커스 관리:</strong> 명확한 포커스 표시 및 논리적인
              포커스 순서
            </ListItem>
            <ListItem>
              <strong>WCAG 2.1 AA 준수:</strong> KRDS 디자인 시스템의 색상 대비
              기준 적용
            </ListItem>
          </List>
        </Card>

        <Card variant="outlined" className="mt-4">
          <Body>
            <strong>참고:</strong> 복사된 소스 코드에 모든 접근성 기능이
            포함되어 있으며, 코드 내 주석으로 자세한 설명이 제공됩니다.
          </Body>
        </Card>
      </Section>

      {/* Best Practices */}
      <Section>
        <Heading level="h2" id="best-practices" title="모범 사례" />

        <Subsection level="h3">
          <Heading level="h3" title="✓ Do: 시맨틱 HTML 사용" />

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`<Container as="main">
  <h1>페이지 제목</h1>
  <Button type="submit">제출</Button>
</Container>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="✓ Do: 명확한 레이블 제공" />

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`<label htmlFor="email">이메일</label>
<Input id="email" type="email" />`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <Heading level="h3" title="✗ Don't: 접근성 무시" />

          <Code variant="block" language="tsx" showLineNumbers={false}>
            {`<div onClick={handleClick}>  {/* 버튼이 아님 */}
  클릭하세요
</div>`}
          </Code>
        </Subsection>
      </Section>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Installation', href: '/docs/installation' }}
      />
    </>
  );
}
